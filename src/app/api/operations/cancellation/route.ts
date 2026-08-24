import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const cancellations = await TutorStorage.getCancellations();
    return NextResponse.json({ success: true, cancellations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lessonId, requestedByRole, requestedByEmail, reason } = body;

    if (!lessonId || !requestedByRole || !reason) {
      return NextResponse.json({ success: false, error: "Missing required cancellation parameters." }, { status: 400 });
    }

    const cancelRecord = await TutorStorage.requestCancellation({
      lessonId: Number(lessonId),
      requestedByRole,
      requestedByEmail: requestedByEmail || "marcus.h@example.com",
      reason,
    });

    return NextResponse.json({
      success: true,
      cancellation: cancelRecord,
      message: "Cancellation request submitted. Policy applied: " + cancelRecord.policyApplied,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { cancellationId } = body;

    if (!cancellationId) {
      return NextResponse.json({ success: false, error: "Missing cancellationId" }, { status: 400 });
    }

    const approved = await TutorStorage.approveCancellation(Number(cancellationId));
    return NextResponse.json({
      success: true,
      cancellation: approved,
      message: "Cancellation approved by Operations. Lesson status updated and credit restored.",
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
