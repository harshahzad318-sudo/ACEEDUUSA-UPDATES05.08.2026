import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";
import { sanitizeString } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const messages = await TutorStorage.getMessagesForUser(userEmail);
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const senderEmail = sanitizeString(body.senderEmail || auth.authContext?.email || "marcus.h@example.com", 255);
    const content = sanitizeString(body.content, 2000);

    if (!content) {
      return NextResponse.json({ success: false, error: "Message content is required" }, { status: 400 });
    }

    const message = await TutorStorage.sendMessage({
      senderEmail,
      senderName: sanitizeString(body.senderName, 255) || "Marcus Harrison",
      senderRole: body.senderRole || "parent",
      receiverEmail: sanitizeString(body.receiverEmail, 255) || "info@aceeducation.us",
      receiverName: sanitizeString(body.receiverName, 255) || "ACE Academic Support",
      receiverRole: body.receiverRole || "admin",
      subject: sanitizeString(body.subject, 255) || "General Query",
      content,
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
