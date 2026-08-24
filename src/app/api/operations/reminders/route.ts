import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function POST(req: NextRequest) {
  try {
    const logs = await TutorStorage.triggerAutomatedReminders();
    return NextResponse.json({
      success: true,
      automationLogs: logs,
      message: `Automated Reminders Engine executed successfully. Sent ${logs.length} reminder alerts.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
