import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tutorId, studentName, startTime, endTime, learningMode } = body;

    if (!tutorId || !startTime || !endTime) {
      return NextResponse.json({ success: false, error: "Missing tutorId, startTime, or endTime" }, { status: 400 });
    }

    const check = await TutorStorage.checkAvailabilityAndConflicts({
      tutorId: Number(tutorId),
      studentName: studentName || "Student",
      startTime,
      endTime,
      learningMode: learningMode || "Online",
    });

    return NextResponse.json({
      success: true,
      availability: check,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
