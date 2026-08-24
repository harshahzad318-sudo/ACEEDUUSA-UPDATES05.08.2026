import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";
import { sanitizeString } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const { action, lessonId, tutorId, status, studentName, subject, summary, homeworkAssigned, studentProgress } = body;

    if (action === "log_attendance") {
      if (!lessonId || !status) {
        return NextResponse.json({ success: false, error: "lessonId and status are required" }, { status: 400 });
      }
      const updated = await TutorStorage.logAttendance(Number(lessonId), status);

      await logAuditEvent({
        userId: auth.authContext?.uid,
        userEmail: auth.authContext?.email,
        action: "LOG_LESSON_ATTENDANCE",
        resource: "lessons",
        resourceId: String(lessonId),
        details: { lessonId, status },
      });

      return NextResponse.json({ success: true, lesson: updated });
    }

    if (action === "add_note" || action === "create_structured_record") {
      if (!lessonId || !tutorId || !summary) {
        return NextResponse.json({ success: false, error: "lessonId, tutorId, and summary are required" }, { status: 400 });
      }

      const cleanSummary = sanitizeString(summary, 2000);
      const cleanHomework = sanitizeString(homeworkAssigned, 1000);

      // Save legacy note
      const note = await TutorStorage.addLessonNote({
        lessonId: Number(lessonId),
        tutorId: Number(tutorId),
        studentName: sanitizeString(studentName, 255) || "Student",
        subject: sanitizeString(subject, 100) || "Tutoring",
        summary: cleanSummary,
        homeworkAssigned: cleanHomework,
        studentProgress: sanitizeString(studentProgress, 50) || "On Track",
      });

      // Parse arrays/strings for structured fields
      const objectives = Array.isArray(body.lessonObjectives) ? body.lessonObjectives : (body.lessonObjectives ? String(body.lessonObjectives).split("\n").filter(Boolean) : ["Master core lesson concepts"]);
      const topics = Array.isArray(body.topicsCovered) ? body.topicsCovered : (body.topicsCovered ? String(body.topicsCovered).split("\n").filter(Boolean) : ["Core Curriculum Topics"]);
      const concepts = Array.isArray(body.keyConceptsLearned) ? body.keyConceptsLearned : (body.keyConceptsLearned ? String(body.keyConceptsLearned).split("\n").filter(Boolean) : ["Key Formulas & Problem Solving"]);
      const resources = Array.isArray(body.resourcesShared) ? body.resourcesShared : (body.resourceTitle ? [{ title: body.resourceTitle, url: body.resourceUrl || "#", description: "Lesson Resource" }] : []);

      // Create permanent structured lesson record
      const record = await TutorStorage.saveStructuredLessonRecord({
        lessonId: Number(lessonId),
        tutorId: Number(tutorId),
        tutorName: sanitizeString(body.tutorName, 255) || "Dr. Alexander Wright",
        studentName: sanitizeString(studentName, 255) || "Ethan Harrison",
        parentEmail: sanitizeString(body.parentEmail, 255) || "marcus.h@example.com",
        subject: sanitizeString(subject, 100) || "Tutoring",
        attendance: body.attendance || "Present",
        lessonObjectives: objectives,
        topicsCovered: topics,
        lessonSummary: cleanSummary,
        keyConceptsLearned: concepts,
        resourcesShared: resources,
        homeworkAssigned: cleanHomework,
        tutorFeedback: sanitizeString(body.tutorFeedback, 1000) || "Great enthusiasm and active problem solving throughout the session.",
        studentParticipation: sanitizeString(body.studentParticipation, 100) || "Active & Engaged (5/5 Stars)",
        aiGeneratedRevisionSummary: body.aiGeneratedRevisionSummary || "",
        videoPolicy: body.videoPolicy || {
          recordingEnabled: false,
          storageLocation: "Disabled by default per ACE Privacy Policy",
          autoExpiryDays: 30,
        },
      });

      // Mark attendance as completed
      await TutorStorage.logAttendance(Number(lessonId), "completed");

      await logAuditEvent({
        userId: auth.authContext?.uid,
        userEmail: auth.authContext?.email,
        action: "CREATE_STRUCTURED_LESSON_RECORD",
        resource: "lesson_records",
        resourceId: String(record.id),
        details: { lessonId, tutorId, studentName, subject },
      });

      return NextResponse.json({ success: true, note, record });
    }

    if (action === "support_ticket") {
      const { userEmail, subject: ticketSubject, message } = body;
      if (!userEmail || !ticketSubject || !message) {
        return NextResponse.json({ success: false, error: "userEmail, subject and message are required" }, { status: 400 });
      }
      const ticket = await TutorStorage.createSupportTicket(
        sanitizeString(userEmail, 255),
        sanitizeString(ticketSubject, 255),
        sanitizeString(message, 2000)
      );

      await logAuditEvent({
        userId: auth.authContext?.uid,
        userEmail: auth.authContext?.email || userEmail,
        action: "CREATE_SUPPORT_TICKET",
        resource: "support_tickets",
        resourceId: String(ticket.id),
        details: { userEmail, ticketSubject },
      });

      return NextResponse.json({ success: true, ticket });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("POST /api/tutors/lessons error:", error);
    return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
  }
}
