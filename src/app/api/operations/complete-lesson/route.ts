import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lessonId,
      tutorId,
      tutorName,
      studentName,
      studentId,
      parentEmail,
      subject,
      lessonSummary,
      topicsCovered,
      keyConceptsLearned,
      homeworkAssigned,
      homeworkDueDate,
      tutorFeedback,
      studentParticipation,
      attendance
    } = body;

    if (!lessonId || !tutorId || !studentName || !subject || !lessonSummary) {
      return NextResponse.json(
        { success: false, error: "Missing required lesson completion fields." },
        { status: 400 }
      );
    }

    const result = await TutorStorage.completeLessonLifecycle({
      lessonId: Number(lessonId),
      tutorId: Number(tutorId),
      tutorName: tutorName || "Assigned Tutor",
      studentName,
      studentId: studentId ? Number(studentId) : 1,
      parentEmail: parentEmail || "marcus.h@example.com",
      subject,
      lessonSummary,
      topicsCovered: Array.isArray(topicsCovered) ? topicsCovered : [topicsCovered].filter(Boolean),
      keyConceptsLearned: Array.isArray(keyConceptsLearned) ? keyConceptsLearned : [keyConceptsLearned].filter(Boolean),
      homeworkAssigned: homeworkAssigned || "No homework assigned.",
      homeworkDueDate,
      tutorFeedback: tutorFeedback || "Great participation throughout the lesson.",
      studentParticipation: studentParticipation || "Active & Engaged (5/5 Stars)",
      attendance: attendance || "Present",
    });

    return NextResponse.json({
      success: true,
      result,
      message: "Lesson lifecycle completed successfully. Record generated, AI summary created, package credit updated, and notifications sent.",
    });
  } catch (error: any) {
    console.error("Complete Lesson Lifecycle POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to complete lesson lifecycle" },
      { status: 500 }
    );
  }
}
