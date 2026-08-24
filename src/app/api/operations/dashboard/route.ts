import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const data = await TutorStorage.getOperationsDashboardData();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Operations Dashboard GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch operations data" },
      { status: 500 }
    );
  }
}
