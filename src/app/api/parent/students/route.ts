import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";
import { sanitizeString, isValidEmail } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const parentEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const students = await TutorStorage.getStudentsByParent(parentEmail);
    return NextResponse.json({ success: true, students });
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
    const fullName = sanitizeString(body.fullName, 255);

    if (!fullName) {
      return NextResponse.json({ success: false, error: "Student full name is required" }, { status: 400 });
    }

    const student = await TutorStorage.createStudent({
      parentEmail,
      fullName,
      email: sanitizeString(body.email, 255),
      photoUrl: body.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
      dateOfBirth: sanitizeString(body.dateOfBirth, 50),
      gender: sanitizeString(body.gender, 50),
      schoolName: sanitizeString(body.schoolName, 255),
      gradeLevel: sanitizeString(body.gradeLevel, 100),
      curriculum: sanitizeString(body.curriculum, 100),
      subjects: Array.isArray(body.subjects) ? body.subjects : [],
      learningGoals: sanitizeString(body.learningGoals, 1000),
      medicalNotes: sanitizeString(body.medicalNotes, 1000),
      learningDifficulties: sanitizeString(body.learningDifficulties, 1000),
      preferredTutorGender: sanitizeString(body.preferredTutorGender, 50),
      preferredTeachingMode: sanitizeString(body.preferredTeachingMode, 50),
      preferredLanguage: sanitizeString(body.preferredLanguage, 100),
      emergencyContact: sanitizeString(body.emergencyContact, 255),
      parentNotes: sanitizeString(body.parentNotes, 1000),
    });

    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: parentEmail,
      action: "CREATE_STUDENT_PROFILE",
      resource: "students",
      resourceId: String(student.id),
      details: { fullName, parentEmail },
    });

    return NextResponse.json({ success: true, student });
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Student ID is required for update" }, { status: 400 });
    }

    const updated = await TutorStorage.updateStudent(Number(id), updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Student profile not found" }, { status: 404 });
    }

    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email,
      action: "UPDATE_STUDENT_PROFILE",
      resource: "students",
      resourceId: String(id),
      details: { id, updates },
    });

    return NextResponse.json({ success: true, student: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Student ID is required" }, { status: 400 });
    }

    const success = await TutorStorage.deleteStudent(Number(id));

    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email,
      action: "ARCHIVE_STUDENT_PROFILE",
      resource: "students",
      resourceId: String(id),
    });

    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
