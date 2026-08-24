import { NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET() {
  try {
    const logs = await TutorStorage.getFinancialAuditLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
