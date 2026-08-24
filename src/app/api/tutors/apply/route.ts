import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { sendInquiryEmails } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { isValidEmail, isValidSecureUrl, validatePositiveNumber, sanitizeString } from "@/lib/validation";
import { logAuditEvent } from "@/lib/audit";

export async function POST(req: NextRequest) {
  // Rate limit
  const rateLimit = checkRateLimit(req, 10, 60000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, error: "Too many applications submitted from this IP. Please wait a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const email = sanitizeString(body.email, 255);
    const fullName = sanitizeString(body.fullName, 255);

    if (!email || !isValidEmail(email) || !fullName) {
      return NextResponse.json(
        { success: false, error: "A valid Full Name and Email are required." },
        { status: 400 }
      );
    }

    // Check secure file URLs
    if (!isValidSecureUrl(body.resumeUrl) || !isValidSecureUrl(body.idDocumentUrl) || !isValidSecureUrl(body.demoVideoUrl)) {
      return NextResponse.json(
        { success: false, error: "Provided document or video link protocol is invalid. Use valid HTTP/HTTPS URLs." },
        { status: 400 }
      );
    }

    // Check if tutor already applied
    const existing = await TutorStorage.getTutorByEmail(email);
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: "An application with this email address has already been submitted.",
          existingStatus: existing.status,
        },
        { status: 400 }
      );
    }

    const expectedRate = validatePositiveNumber(body.expectedRate, 40);

    // Create tutor application record
    const application = await TutorStorage.createTutorApplication({
      fullName,
      email,
      phone: sanitizeString(body.phone, 50),
      city: sanitizeString(body.city, 100),
      state: sanitizeString(body.state, 100),
      country: sanitizeString(body.country, 100) || "USA",
      zipCode: sanitizeString(body.zipCode, 20),
      avatarUrl: body.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      title: sanitizeString(body.title, 255) || "Academic Tutor",
      bio: sanitizeString(body.bio, 2000),
      linkedinUrl: sanitizeString(body.linkedinUrl, 500),
      totalExperienceYears: validatePositiveNumber(body.totalExperienceYears, 0),
      degree: sanitizeString(body.degree, 255),
      major: sanitizeString(body.major, 255),
      institution: sanitizeString(body.institution, 255),
      graduationYear: validatePositiveNumber(body.graduationYear, 2023),
      previousInstitutions: sanitizeString(body.previousInstitutions, 1000),
      onlineExperienceYears: validatePositiveNumber(body.onlineExperienceYears, 0),
      gradeLevels: Array.isArray(body.gradeLevels) ? body.gradeLevels : [],
      subjects: Array.isArray(body.subjects) ? body.subjects : [],
      curriculums: Array.isArray(body.curriculums) ? body.curriculums : [],
      learningModes: Array.isArray(body.learningModes) ? body.learningModes : ["Online"],
      availability: body.availability || {},
      expectedRate,
      finalRate: expectedRate,
      sellingPrice: Math.round(expectedRate * 1.75),
      margin: Math.round(expectedRate * 0.75),
      idType: sanitizeString(body.idType, 100) || "Passport",
      idDocumentUrl: body.idDocumentUrl,
      resumeUrl: body.resumeUrl,
      certificateUrls: Array.isArray(body.certificateUrls) ? body.certificateUrls : [],
      demoVideoUrl: body.demoVideoUrl,
      digitalSignature: sanitizeString(body.digitalSignature, 255),
      termsAccepted: Boolean(body.termsAccepted),
    });

    // Audit Log
    await logAuditEvent({
      userEmail: email,
      action: "SUBMIT_TUTOR_APPLICATION",
      resource: "tutors",
      resourceId: String(application.id),
      details: { email, fullName, subjects: application.subjects },
    });

    // Notify info@aceeducation.us and send client receipt confirmation
    try {
      await sendInquiryEmails({
        type: "contact",
        parentName: application.fullName,
        email: application.email,
        phone: application.phone,
        subject: `[Tutor Application] ${application.fullName} - ${application.subjects.join(", ")}`,
        notes: `Tutor recruitment application submitted.\nExperience: ${application.totalExperienceYears} yrs\nDegree: ${application.degree} in ${application.major} (${application.institution})\nExpected Rate: $${application.expectedRate}/hr`,
        source: "Tutor Application Form",
      });
    } catch (e) {
      console.error("Failed sending tutor application email notification", e);
    }

    return NextResponse.json({
      success: true,
      message: "Tutor application submitted successfully!",
      application,
    });
  } catch (error: any) {
    console.error("Error submitting tutor application:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while submitting your application." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      const tutor = await TutorStorage.getTutorByEmail(email);
      if (!tutor) {
        return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, tutor });
    }

    const all = await TutorStorage.getAllTutors();
    return NextResponse.json({ success: true, tutors: all });
  } catch (error) {
    console.error("GET /api/tutors/apply error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
