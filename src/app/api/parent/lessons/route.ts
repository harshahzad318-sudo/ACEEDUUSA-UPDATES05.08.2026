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

    const lessons = await TutorStorage.getLessonsByParent(parentEmail);
    return NextResponse.json({ success: true, lessons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
