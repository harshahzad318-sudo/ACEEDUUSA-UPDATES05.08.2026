import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sendInquiryEmails } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { isValidEmail, sanitizeString } from "@/lib/validation";
import { logAuditEvent } from "@/lib/audit";

export async function POST(request: NextRequest) {
  // Rate limiting guard
  const rateLimit = checkRateLimit(request, 15, 60000); // max 15 requests per minute
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
      return NextResponse.redirect(new URL("/contact?error=invalid_email", request.url), 303);
    }

    const parentName = sanitizeString(body.name, 255) || null;
    const phone = sanitizeString(body.phone, 50) || null;
    const subject = sanitizeString(body.subject, 255) || null;
    const notes = sanitizeString(body.message || body.notes, 2000) || null;

    // Save lead to Database
    try {
      await db.insert(leads).values({
        parentName,
        email,
        phone,
        subject,
        notes,
        source: "contact_form",
      });
    } catch (dbErr) {
      console.error("Database lead insert error:", dbErr);
    }

    // Log audit event
    await logAuditEvent({
      userEmail: email,
      action: "SUBMIT_CONTACT_INQUIRY",
      resource: "leads",
      details: { email, parentName, subject },
    });

    // Send notification to info@aceeducation.us and confirmation to client
    await sendInquiryEmails({
      type: "contact",
      parentName,
      email,
      phone,
      subject,
      notes,
      source: "Contact Page Form",
    });

    if (isJson) {
      return NextResponse.json({ success: true, message: "Thank you! Your message has been sent." });
    }

    return NextResponse.redirect(new URL("/contact?submitted=true", request.url), 303);
  } catch (error) {
    console.error("Error in /api/contact:", error);
    if (isJson) {
      return NextResponse.json({ success: false, error: "Failed to submit message." }, { status: 500 });
    }
    return NextResponse.redirect(new URL("/contact?error=true", request.url), 303);
  }
}
