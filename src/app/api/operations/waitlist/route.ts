import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const list = await TutorStorage.getWaitlist();
    return NextResponse.json({ success: true, waitlist: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentName, parentEmail, studentName, subject, gradeLevel, preferredDays, preferredTimes, learningMode } = body;

    if (!parentEmail || !studentName || !subject) {
      return NextResponse.json({ success: false, error: "Missing required waitlist parameters." }, { status: 400 });
    }

    const item = await TutorStorage.addToWaitlist({
      parentName: parentName || "Parent",
      parentEmail,
      studentName,
      subject,
      gradeLevel: gradeLevel || "High School",
      preferredDays: preferredDays || ["Monday", "Wednesday"],
      preferredTimes: preferredTimes || "Evening (5PM-8PM)",
      learningMode: learningMode || "Online",
    });

    return NextResponse.json({
      success: true,
      waitlist: item,
      message: "Request added to priority waitlist. Tutor matches auto-suggested.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
