import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").trim().toLowerCase();

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        results: {
          students: [],
          parents: [],
          tutors: [],
          invoices: [],
          lessons: [],
          homework: [],
          messages: [],
          assessments: [],
        },
        totalCount: 0,
      });
    }

    const students = await TutorStorage.getStudents();
    const tutors = await TutorStorage.getTutors();
    const invoices = await TutorStorage.getInvoices();
    const lessons = await TutorStorage.getLessons();
    const homework = await TutorStorage.getHomeworks();
    const leads = await TutorStorage.getLeads();

    // 1. Matching Students
    const matchedStudents = students.filter(
      (s: any) =>
        s.fullName?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        s.parentEmail?.toLowerCase().includes(query) ||
        s.subjects?.some((sub: string) => sub.toLowerCase().includes(query)) ||
        s.gradeLevel?.toLowerCase().includes(query)
    ).map((s: any) => ({
      id: s.id,
      type: "Student",
      title: s.fullName,
      subtitle: `${s.gradeLevel || "Grade N/A"} • ${s.parentEmail || "No parent email"}`,
      url: `/portals/admin?studentId=${s.id}`,
    }));

    // 2. Matching Parents
    const parentMap = new Map();
    students.forEach((s: any) => {
      if (s.parentEmail && s.parentName) {
        if (!parentMap.has(s.parentEmail)) {
          parentMap.set(s.parentEmail, {
            name: s.parentName,
            email: s.parentEmail,
            children: [s.fullName],
          });
        } else {
          parentMap.get(s.parentEmail).children.push(s.fullName);
        }
      }
    });

    const matchedParents = Array.from(parentMap.values())
      .filter(
        (p: any) =>
          p.name.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query) ||
          p.children.some((c: string) => c.toLowerCase().includes(query))
      )
      .map((p: any) => ({
        id: p.email,
        type: "Parent Account",
        title: p.name,
        subtitle: `${p.email} • Children: ${p.children.join(", ")}`,
        url: `/portals/parent?email=${encodeURIComponent(p.email)}`,
      }));

    // 3. Matching Tutors
    const matchedTutors = tutors.filter(
      (t: any) =>
        t.fullName?.toLowerCase().includes(query) ||
        t.email?.toLowerCase().includes(query) ||
        t.subjects?.some((sub: string) => sub.toLowerCase().includes(query)) ||
        t.teachingMode?.toLowerCase().includes(query)
    ).map((t: any) => ({
      id: t.id,
      type: "Tutor",
      title: t.fullName,
      subtitle: `${t.subjects?.join(", ") || "General"} • ${t.email}`,
      url: `/portals/admin?tutorId=${t.id}`,
    }));

    // 4. Matching Invoices
    const matchedInvoices = invoices.filter(
      (inv: any) =>
        inv.id?.toString().includes(query) ||
        inv.invoiceNumber?.toLowerCase().includes(query) ||
        inv.parentEmail?.toLowerCase().includes(query) ||
        inv.status?.toLowerCase().includes(query)
    ).map((inv: any) => ({
      id: inv.id,
      type: "Invoice",
      title: `Invoice #${inv.invoiceNumber || inv.id}`,
      subtitle: `${inv.parentEmail} • $${inv.totalAmount} • Status: ${inv.status}`,
      url: `/portals/admin?activeTab=financials&invoiceId=${inv.id}`,
    }));

    // 5. Matching Lessons
    const matchedLessons = lessons.filter(
      (l: any) =>
        l.subject?.toLowerCase().includes(query) ||
        l.studentName?.toLowerCase().includes(query) ||
        l.tutorName?.toLowerCase().includes(query) ||
        l.status?.toLowerCase().includes(query)
    ).map((l: any) => ({
      id: l.id,
      type: "Lesson Session",
      title: `${l.subject} — ${l.studentName}`,
      subtitle: `Tutor: ${l.tutorName} • Date: ${l.date} ${l.startTime} • Status: ${l.status}`,
      url: `/portals/admin?activeTab=operations&lessonId=${l.id}`,
    }));

    // 6. Matching Homework
    const matchedHomework = homework.filter(
      (hw: any) =>
        hw.title?.toLowerCase().includes(query) ||
        hw.subject?.toLowerCase().includes(query) ||
        hw.studentName?.toLowerCase().includes(query) ||
        hw.status?.toLowerCase().includes(query)
    ).map((hw: any) => ({
      id: hw.id,
      type: "Homework Assignment",
      title: hw.title,
      subtitle: `${hw.subject} • Student: ${hw.studentName} • Status: ${hw.status}`,
      url: `/portals/student?activeTab=homework&hwId=${hw.id}`,
    }));

    // 7. Matching Assessments & Leads
    const matchedAssessments = leads.filter(
      (lead: any) =>
        lead.studentName?.toLowerCase().includes(query) ||
        lead.parentName?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.subject?.toLowerCase().includes(query)
    ).map((lead: any) => ({
      id: lead.id,
      type: "Academic Assessment / Lead",
      title: `${lead.studentName || lead.parentName} (${lead.type || "Inquiry"})`,
      subtitle: `${lead.email} • Subject: ${lead.subject || "General"}`,
      url: `/portals/admin?activeTab=recruitment&leadId=${lead.id}`,
    }));

    const totalCount =
      matchedStudents.length +
      matchedParents.length +
      matchedTutors.length +
      matchedInvoices.length +
      matchedLessons.length +
      matchedHomework.length +
      matchedAssessments.length;

    return NextResponse.json({
      success: true,
      query,
      results: {
        students: matchedStudents,
        parents: matchedParents,
        tutors: matchedTutors,
        invoices: matchedInvoices,
        lessons: matchedLessons,
        homework: matchedHomework,
        assessments: matchedAssessments,
      },
      totalCount,
    });
  } catch (error: any) {
    console.error("Enterprise Global Search API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Global search failed" },
      { status: 500 }
    );
  }
}
