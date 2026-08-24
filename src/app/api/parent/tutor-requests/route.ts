import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";
import { sanitizeString } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const parentEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const requests = await TutorStorage.getTutorRequestsByParent(parentEmail);
    return NextResponse.json({ success: true, requests });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const parentEmail = sanitizeString(body.parentEmail || auth.authContext?.email || "marcus.h@example.com", 255);
    const studentName = sanitizeString(body.studentName, 255);
    const subject = sanitizeString(body.subject, 100);

    if (!studentName || !subject) {
      return NextResponse.json({ success: false, error: "Student Name and Subject are required" }, { status: 400 });
    }

    const request = await TutorStorage.createTutorRequest({
      parentEmail,
      parentName: sanitizeString(body.parentName, 255) || "Marcus Harrison",
      studentId: body.studentId ? Number(body.studentId) : undefined,
      studentName,
      subject,
      curriculum: sanitizeString(body.curriculum, 100),
      gradeLevel: sanitizeString(body.gradeLevel, 100),
      learningMode: sanitizeString(body.learningMode, 50) || "Online",
      preferredDays: Array.isArray(body.preferredDays) ? body.preferredDays : ["Monday", "Wednesday"],
      preferredTimes: sanitizeString(body.preferredTimes, 255),
      budget: Number(body.budget) || 75,
      learningGoals: sanitizeString(body.learningGoals, 1000),
      preferredTutorGender: sanitizeString(body.preferredTutorGender, 50),
      preferredLanguage: sanitizeString(body.preferredLanguage, 100),
      additionalNotes: sanitizeString(body.additionalNotes, 1000),
    });

    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: parentEmail,
      action: "SUBMIT_TUTOR_REQUEST",
      resource: "tutor_requests",
      resourceId: String(request.id),
      details: { studentName, subject, budget: request.budget },
    });

    return NextResponse.json({ success: true, request });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const { id, status, assignedTutorId, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Request ID is required" }, { status: 400 });
    }

    const updated = await TutorStorage.updateTutorRequest(Number(id), { status, assignedTutorId, ...updates });

    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email,
      action: "UPDATE_TUTOR_REQUEST_STATUS",
      resource: "tutor_requests",
      resourceId: String(id),
      details: { status, assignedTutorId },
    });

    return NextResponse.json({ success: true, request: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
