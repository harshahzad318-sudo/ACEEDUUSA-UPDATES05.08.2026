import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tutorIdParam = searchParams.get("tutorId");
    const emailParam = searchParams.get("email");

    let tutor = null;
    if (tutorIdParam) {
      tutor = await TutorStorage.getTutorById(parseInt(tutorIdParam, 10));
    } else if (emailParam) {
      tutor = await TutorStorage.getTutorByEmail(emailParam);
    } else {
      // Default to Dr. Alexander Wright (id: 101) for live preview demo
      tutor = await TutorStorage.getTutorById(101);
    }

    if (!tutor) {
      return NextResponse.json({ success: false, error: "Tutor not found" }, { status: 404 });
    }

    const assignments = await TutorStorage.getAssignmentsByTutor(tutor.id);
    const lessons = await TutorStorage.getLessonsByTutor(tutor.id);
    const lessonNotes = await TutorStorage.getLessonNotesByTutor(tutor.id);
    const payments = await TutorStorage.getPaymentsByTutor(tutor.id);
    const announcements = await TutorStorage.getAnnouncements();
    const supportTickets = await TutorStorage.getSupportTicketsByUser(tutor.email);

    // Calculate Dashboard KPIs
    const totalEarnings = payments.reduce((acc, p) => acc + (p.status === "approved" || p.status === "paid" ? p.grossPayout : 0), 0);
    const totalHours = payments.reduce((acc, p) => acc + p.hours, 0);
    const activeStudents = new Set(assignments.filter(a => a.status === "accepted").map(a => a.studentName)).size;
    const upcomingLessons = lessons.filter(l => l.status === "scheduled");

    return NextResponse.json({
      success: true,
      tutor,
      kpis: {
        totalEarnings,
        totalHours,
        activeStudents,
        upcomingCount: upcomingLessons.length,
        rating: tutor.rating,
      },
      assignments,
      lessons,
      lessonNotes,
      payments,
      announcements,
      supportTickets,
    });
  } catch (error: any) {
    console.error("GET /api/tutors/dashboard error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
