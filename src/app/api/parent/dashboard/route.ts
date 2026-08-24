import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const parentEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const dashboardData = await TutorStorage.getParentDashboardData(parentEmail);
    return NextResponse.json({ success: true, data: dashboardData });
  } catch (error: any) {
    console.error("Parent dashboard fetch error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch parent dashboard" }, { status: 500 });
  }
}
