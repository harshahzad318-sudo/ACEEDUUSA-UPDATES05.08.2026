import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";
import { validatePositiveNumber } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req, "admin");
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let all = await TutorStorage.getAllTutors();
    if (status && status !== "all") {
      all = all.filter(t => t.status === status);
    }

    return NextResponse.json({ success: true, tutors: all });
  } catch (error: any) {
    console.error("GET /api/admin/recruitment error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch recruitment applications" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRequest(req, "admin");
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const { tutorId, status, interviewScheduledAt, interviewNotes, internalRemarks, verificationChecklist, finalRate, sellingPrice, aiSummary } = body;

    if (!tutorId) {
      return NextResponse.json({ success: false, error: "tutorId is required" }, { status: 400 });
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (interviewScheduledAt !== undefined) updates.interviewScheduledAt = interviewScheduledAt;
    if (interviewNotes !== undefined) updates.interviewNotes = interviewNotes;
    if (internalRemarks !== undefined) updates.internalRemarks = internalRemarks;
    if (verificationChecklist !== undefined) updates.verificationChecklist = verificationChecklist;
    if (aiSummary !== undefined) updates.aiSummary = aiSummary;

    if (finalRate !== undefined || sellingPrice !== undefined) {
      if (finalRate !== undefined) updates.finalRate = validatePositiveNumber(finalRate, 40);
      if (sellingPrice !== undefined) updates.sellingPrice = validatePositiveNumber(sellingPrice, 70);
    }

    const updated = await TutorStorage.updateTutor(Number(tutorId), updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Tutor application not found" }, { status: 404 });
    }

    // Audit logging
    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email,
      action: "UPDATE_TUTOR_APPLICATION",
      resource: "tutors",
      resourceId: String(tutorId),
      details: { updates },
    });

    return NextResponse.json({
      success: true,
      message: "Tutor application updated successfully",
      tutor: updated,
    });
  } catch (error: any) {
    console.error("PUT /api/admin/recruitment error:", error);
    return NextResponse.json({ success: false, error: "Failed to update tutor application" }, { status: 500 });
  }
}
