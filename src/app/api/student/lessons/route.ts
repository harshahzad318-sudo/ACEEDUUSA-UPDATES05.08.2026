import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentName = searchParams.get("studentName") || "Ethan Harrison";
    const parentEmail = searchParams.get("parentEmail");

    let records = [];
    if (parentEmail) {
      records = await TutorStorage.getStructuredLessonRecordsByParent(parentEmail);
    } else {
      records = await TutorStorage.getStructuredLessonRecordsByStudent(studentName);
    }

    if (!records || records.length === 0) {
      records = await TutorStorage.getAllStructuredLessonRecords();
    }

    return NextResponse.json({
      success: true,
      records,
      count: records.length,
      videoPolicyInfo: {
        recordingEnabledByDefault: false,
        notice: "Per ACE Academic Privacy Standards, video recordings are NOT stored on ACE servers. External video recording vault storage is optional and disabled by default.",
      },
    });
  } catch (error: any) {
    console.error("GET /api/student/lessons error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch student lesson records" }, { status: 500 });
  }
}
