import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const requests = await TutorStorage.getRescheduleRequests();
    return NextResponse.json({ success: true, requests });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lessonId, requestedByRole, requestedByEmail, reason, originalStartTime, originalEndTime, proposedStartTime, proposedEndTime } = body;

    if (!lessonId || !requestedByRole || !reason || !proposedStartTime) {
      return NextResponse.json({ success: false, error: "Missing required fields for reschedule request." }, { status: 400 });
    }

    const res = await TutorStorage.requestReschedule({
      lessonId: Number(lessonId),
      requestedByRole,
      requestedByEmail: requestedByEmail || "marcus.h@example.com",
      reason,
      originalStartTime: originalStartTime || new Date().toISOString(),
      originalEndTime: originalEndTime || new Date(Date.now() + 5400000).toISOString(),
      proposedStartTime,
      proposedEndTime: proposedEndTime || new Date(new Date(proposedStartTime).getTime() + 5400000).toISOString(),
    });

    return NextResponse.json({ success: true, request: res, message: "Reschedule request submitted to Admin Operations." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { requestId, adminNotes } = body;

    if (!requestId) {
      return NextResponse.json({ success: false, error: "Missing requestId" }, { status: 400 });
    }

    const approved = await TutorStorage.approveReschedule(Number(requestId), adminNotes);
    return NextResponse.json({ success: true, request: approved, message: "Reschedule approved and calendar updated." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
