import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sendInquiryEmails } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { isValidEmail, sanitizeString } from "@/lib/validation";
import { logAuditEvent } from "@/lib/audit";

export async function POST(request: NextRequest) {
  // Rate limiting guard
  const rateLimit = checkRateLimit(request, 15, 60000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let isJson = false;
  let body: Record<string, any> = {};

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      isJson = true;
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    }

    const email = body.email ? String(body.email).trim() : "";
    if (!email || !isValidEmail(email)) {
      if (isJson) {
        return NextResponse.json({ success: false, error: "A valid email address is required" }, { status: 400 });
      }
      return NextResponse.redirect(new URL("/book-assessment?error=invalid_email", request.url), 303);
    }

    const parentName = sanitizeString(body.parentName, 255) || null;
    const studentName = sanitizeString(body.studentName, 255) || null;
    const phone = sanitizeString(body.phone, 50) || null;
    const gradeLevel = sanitizeString(body.gradeLevel, 100) || null;
    const curriculum = sanitizeString(body.curriculum, 100) || null;
    const subject = sanitizeString(body.subject, 100) || null;
    const learningMode = sanitizeString(body.learningMode, 50) || null;
    const schedule = sanitizeString(body.schedule, 255) || null;
    const state = sanitizeString(body.state, 100) || null;
    const city = sanitizeString(body.city, 100) || null;
    const zipCode = sanitizeString(body.zipCode, 20) || null;
    const source = sanitizeString(body.source, 100) || "website_lead";
    const notes = sanitizeString(body.notes, 2000) || null;

    let newLeadId: number | null = null;

    try {
      const result = await db.insert(leads).values({
        parentName,
        studentName,
        email,
        phone,
        gradeLevel,
        curriculum,
        subject,
        learningMode,
        schedule,
        state,
        city,
        zipCode,
        source,
        notes,
      }).returning();
      if (result && result.length > 0) {
        newLeadId = result[0].id;
      }
    } catch (dbErr) {
      console.error("Database insert lead error:", dbErr);
    }

    // Log audit event
    await logAuditEvent({
      userEmail: email,
      action: "SUBMIT_ASSESSMENT_LEAD",
      resource: "leads",
      resourceId: newLeadId ? String(newLeadId) : undefined,
      details: { email, studentName, subject, gradeLevel, source },
    });

    // Send emails to info@aceeducation.us and confirmation to client
    await sendInquiryEmails({
      type: source === "assessment_form" ? "assessment" : "lead",
      parentName,
      studentName,
      email,
      phone,
      gradeLevel,
      curriculum,
      subject,
      learningMode,
      schedule,
      state,
      city,
      zipCode,
      source,
      notes,
    });

    if (isJson) {
      return NextResponse.json({
        success: true,
        id: newLeadId,
        message: "Your inquiry has been submitted successfully!",
      });
    }

    const redirectPath = request.nextUrl.pathname.includes("contact")
      ? "/contact?submitted=true"
      : "/book-assessment?submitted=true";

    return NextResponse.redirect(new URL(redirectPath, request.url), 303);
  } catch (error) {
    console.error("Error in /api/leads:", error);
    if (isJson) {
      return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/book-assessment?error=true", request.url), 303);
  }
}
