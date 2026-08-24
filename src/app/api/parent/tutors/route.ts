import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const parentEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const assigned = await TutorStorage.getAssignedTutorsByParent(parentEmail);

    // CRITICAL SECURITY & BUSINESS RULE:
    // Strip private tutor emails, personal phone numbers, internal pay rates, and tutor rankings!
    const sanitizedTutors = assigned.map(({ tutor, assignment }) => ({
      assignmentId: assignment.id,
      studentName: assignment.studentName,
      subject: assignment.subject,
      assignedAt: assignment.assignedAt,
      tutor: {
        id: tutor.id,
        fullName: tutor.fullName,
        avatarUrl: tutor.avatarUrl,
        title: tutor.title,
        bio: tutor.bio,
        degree: tutor.degree,
        major: tutor.major,
        institution: tutor.institution,
        totalExperienceYears: tutor.totalExperienceYears,
        gradeLevels: tutor.gradeLevels,
        subjects: tutor.subjects,
        curriculums: tutor.curriculums,
        // Excluded: phone, email, internal rate, margin, rating
      },
    }));

    return NextResponse.json({ success: true, tutors: sanitizedTutors });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
