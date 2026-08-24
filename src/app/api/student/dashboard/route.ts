import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentName = searchParams.get("studentName") || "Ethan Harrison";

    const data = await TutorStorage.getStudentDashboardData(studentName);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("GET /api/student/dashboard error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch student dashboard data" }, { status: 500 });
  }
}
