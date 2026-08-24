import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const role = req.nextUrl.searchParams.get("role");
    const email = req.nextUrl.searchParams.get("email");
    const tutorId = req.nextUrl.searchParams.get("tutorId");
    const studentName = req.nextUrl.searchParams.get("studentName");

    const events = await TutorStorage.getUnifiedMasterCalendar({
      role: role || undefined,
      email: email || undefined,
      tutorId: tutorId ? Number(tutorId) : undefined,
      studentName: studentName || undefined,
    });

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
