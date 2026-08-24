import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { sendInquiryEmails } from "@/lib/email";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";
import { isValidEmail, sanitizeString, validatePositiveNumber } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req, "admin");
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const assignments = await TutorStorage.getAllAssignments();
    return NextResponse.json({ success: true, assignments });
  } catch (error) {
    console.error("GET /api/admin/assignments error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch assignments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req, "admin");
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const { tutorId, studentName, parentName, parentEmail, subject, gradeLevel, learningMode, tutorRate, parentPrice, notes } = body;

    const email = sanitizeString(parentEmail, 255);
    const student = sanitizeString(studentName, 255);
    const subj = sanitizeString(subject, 100);

    if (!tutorId || !student || !subj || !email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Valid tutorId, studentName, parentEmail, and subject are required" },
        { status: 400 }
      );
    }

    const tutor = await TutorStorage.getTutorById(Number(tutorId));
    if (!tutor) {
      return NextResponse.json({ success: false, error: "Tutor not found" }, { status: 404 });
    }

    const rate = validatePositiveNumber(tutorRate, tutor.finalRate || 40);
    const price = validatePositiveNumber(parentPrice, tutor.sellingPrice || 75);

    const assignment = await TutorStorage.createAssignment({
      tutorId: Number(tutorId),
      studentName: student,
      parentName: sanitizeString(parentName, 255) || "Parent",
      parentEmail: email,
      subject: subj,
      gradeLevel: sanitizeString(gradeLevel, 100) || "K-12",
      learningMode: sanitizeString(learningMode, 50) || "Online",
      status: "pending",
      tutorRate: rate,
      parentPrice: price,
      margin: price - rate,
      notes: sanitizeString(notes, 1000) || "",
    });

    // Audit log
    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email,
      action: "CREATE_STUDENT_ASSIGNMENT",
      resource: "assignments",
      resourceId: String(assignment.id),
      details: { tutorId, studentName: student, parentEmail: email, rate, price },
    });

    // Notify tutor of new assignment
    try {
      await sendInquiryEmails({
        type: "contact",
        parentName: parentName || "Parent",
        email: tutor.email,
        phone: tutor.phone,
        subject: `[New Student Assignment] ${student} - ${subj}`,
        notes: `You have been assigned a new student: ${student} (${subj}). Log into your Tutor Portal to Accept or Decline this assignment.\nRate: $${rate}/hr`,
        source: "ACE Admin Tutor Assignment",
      });
    } catch (e) {
      console.error("Failed sending assignment email notification to tutor:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Tutor assigned successfully. Notification sent to tutor.",
      assignment,
    });
  } catch (error: any) {
    console.error("POST /api/admin/assignments error:", error);
    return NextResponse.json({ success: false, error: "Failed to create assignment" }, { status: 500 });
  }
}
