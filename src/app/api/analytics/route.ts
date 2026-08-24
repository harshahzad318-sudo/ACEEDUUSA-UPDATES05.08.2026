import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateRange = searchParams.get("dateRange") || "30d";
    const subject = searchParams.get("subject") || undefined;
    const curriculum = searchParams.get("curriculum") || undefined;
    const grade = searchParams.get("grade") || undefined;
    const state = searchParams.get("state") || undefined;
    const tutorId = searchParams.get("tutorId") || undefined;
    const parentEmail = searchParams.get("parentEmail") || undefined;
    const studentId = searchParams.get("studentId") || undefined;
    const teachingMode = searchParams.get("teachingMode") || undefined;
    const serviceType = searchParams.get("serviceType") || undefined;

    const data = await TutorStorage.getExecutiveAnalytics({
      dateRange,
      subject,
      curriculum,
      grade,
      state,
      tutorId,
      parentEmail,
      studentId,
      teachingMode,
      serviceType,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Executive analytics GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch executive analytics" },
      { status: 500 }
    );
  }
}
