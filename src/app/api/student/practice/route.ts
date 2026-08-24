import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentName = searchParams.get("studentName") || "Ethan Harrison";

    const quizzes = await TutorStorage.getStudentQuizResults(studentName);

    return NextResponse.json({
      success: true,
      quizzes,
    });
  } catch (error: any) {
    console.error("GET /api/student/practice error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch practice results" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName = "Ethan Harrison", subject, quizTitle, quizType, score, totalQuestions, percentage, timeSpentMinutes, feedback } = body;

    const result = await TutorStorage.saveQuizResult({
      studentName,
      subject: subject || "General Practice",
      quizTitle: quizTitle || "Practice Quiz",
      quizType: quizType || "MCQ",
      score: score || 0,
      totalQuestions: totalQuestions || 10,
      percentage: percentage || 100,
      timeSpentMinutes: timeSpentMinutes || 10,
      feedback: feedback || "Completed practice test.",
    });

    return NextResponse.json({
      success: true,
      result,
      message: "Quiz result recorded successfully.",
    });
  } catch (error: any) {
    console.error("POST /api/student/practice error:", error);
    return NextResponse.json({ success: false, error: "Failed to save practice result" }, { status: 500 });
  }
}
