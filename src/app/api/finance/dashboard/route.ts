import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET() {
  try {
    const kpis = await TutorStorage.getFinanceDashboardKPIs();
    return NextResponse.json({ success: true, data: kpis });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
