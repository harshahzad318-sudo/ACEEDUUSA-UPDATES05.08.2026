import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function PUT(req: NextRequest) {
  try {
    const { tutorId, availability } = await req.json();

    if (!tutorId || !availability) {
      return NextResponse.json({ success: false, error: "tutorId and availability are required" }, { status: 400 });
    }

    const updated = await TutorStorage.updateTutor(Number(tutorId), { availability });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Tutor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, availability: updated.availability });
  } catch (error: any) {
    console.error("PUT /api/tutors/availability error:", error);
    return NextResponse.json({ success: false, error: "Failed to update availability" }, { status: 500 });
  }
}
