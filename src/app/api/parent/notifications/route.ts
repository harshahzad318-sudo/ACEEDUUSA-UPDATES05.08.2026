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
    const userEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const notifications = await TutorStorage.getNotificationsForUser(userEmail);
    return NextResponse.json({ success: true, notifications });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Notification ID required" }, { status: 400 });
    }

    const success = await TutorStorage.markNotificationRead(Number(id));
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
