import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tutorIdStr = searchParams.get("tutorId");
    const tutorId = tutorIdStr ? parseInt(tutorIdStr, 10) : undefined;
    const payrolls = await TutorStorage.getTutorPayrolls(tutorId);
    return NextResponse.json({ success: true, payrolls });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === "approve") {
      const payroll = await TutorStorage.approvePayroll(body.payrollId);
      return NextResponse.json({ success: true, payroll });
    }
    if (body.action === "mark_paid") {
      const payroll = await TutorStorage.markPayrollPaid(body.payrollId, body.reference);
      return NextResponse.json({ success: true, payroll });
    }
    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
