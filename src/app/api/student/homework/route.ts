import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentName = searchParams.get("studentName") || "Ethan Harrison";

    const submissions = await TutorStorage.getStudentHomeworkSubmissions(studentName);

    return NextResponse.json({
      success: true,
      submissions,
    });
  } catch (error: any) {
    console.error("GET /api/student/homework error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch homework" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { homeworkId, studentName = "Ethan Harrison", subject, title, description, submissionText, files } = body;

    if (!title || !subject) {
      return NextResponse.json({ success: false, error: "Title and Subject are required." }, { status: 400 });
    }

    const result = await TutorStorage.submitHomework({
      homeworkId,
      studentName,
      subject,
      title,
      description,
      submissionText,
      files,
    });

    return NextResponse.json({
      success: true,
      submission: result,
      message: "Homework assignment submitted successfully and notified tutor.",
    });
  } catch (error: any) {
    console.error("POST /api/student/homework error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit homework" }, { status: 500 });
  }
}
