import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { sendInquiryEmails } from "@/lib/email";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";

export async function PUT(req: NextRequest) {
  const auth = await authenticateRequest(req, "tutor");
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { assignmentId, action } = await req.json();

    if (!assignmentId || !["accepted", "declined"].includes(action)) {
      return NextResponse.json({ success: false, error: "Valid assignmentId and action (accepted/declined) are required" }, { status: 400 });
    }

    const updated = await TutorStorage.updateAssignmentStatus(Number(assignmentId), action as "accepted" | "declined");
    if (!updated) {
      return NextResponse.json({ success: false, error: "Assignment not found" }, { status: 404 });
    }

    const tutor = await TutorStorage.getTutorById(updated.tutorId);

    // Log audit event
    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email || tutor?.email,
      action: `ASSIGNMENT_${action.toUpperCase()}`,
      resource: "assignments",
      resourceId: String(assignmentId),
      details: { assignmentId, action, tutorId: updated.tutorId, studentName: updated.studentName },
    });

    // Notify Admin and Parent about assignment response
    try {
      await sendInquiryEmails({
        type: "contact",
        parentName: updated.parentName,
        email: updated.parentEmail,
        subject: `[Assignment ${action.toUpperCase()}] ${updated.subject} with ${updated.studentName}`,
        notes: `Tutor ${tutor?.fullName || "Tutor"} has ${action} the teaching assignment for student ${updated.studentName} (${updated.subject}).`,
        source: "Tutor Assignment Workflow",
      });
    } catch (e) {
      console.error("Assignment response notification error:", e);
    }

    return NextResponse.json({
      success: true,
      message: `Assignment successfully ${action}.`,
      assignment: updated,
    });
  } catch (error: any) {
    console.error("PUT /api/tutors/assignment error:", error);
    return NextResponse.json({ success: false, error: "Failed to update assignment status" }, { status: 500 });
  }
}
