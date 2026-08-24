import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const studentEmail = "ethan.h@example.com";
    const messages = await TutorStorage.getMessagesForUser(studentEmail);

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error: any) {
    console.error("GET /api/student/messages error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { receiverEmail, receiverName, receiverRole, subject, content } = body;

    if (!receiverEmail || !content) {
      return NextResponse.json({ success: false, error: "Receiver email and content are required." }, { status: 400 });
    }

    const msg = await TutorStorage.sendMessage({
      senderEmail: "ethan.h@example.com",
      senderName: "Ethan Harrison",
      senderRole: "student",
      receiverEmail,
      receiverName: receiverName || "Tutor / Support",
      receiverRole: receiverRole || "tutor",
      subject: subject || "Academic Question",
      content,
    });

    return NextResponse.json({
      success: true,
      messageRecord: msg,
    });
  } catch (error: any) {
    console.error("POST /api/student/messages error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
