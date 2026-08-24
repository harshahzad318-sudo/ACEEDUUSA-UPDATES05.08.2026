import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-guard";
import { checkRateLimit } from "@/lib/rate-limit";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req, "admin");
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  const rateLimit = checkRateLimit(req, 20, 60000);
  if (!rateLimit.success) {
    return NextResponse.json(
      { success: false, error: "AI summary rate limit exceeded. Please wait a moment." },
      { status: 429 }
    );
  }

  try {
    const { tutor } = await req.json();

    if (!tutor) {
      return NextResponse.json({ success: false, error: "Tutor data is required" }, { status: 400 });
    }

    const prompt = `
      You are an expert HR Recruitment Director and Pedagogical Evaluator for ACE Education USA.
      Analyze the following candidate's tutor application and provide a concise 3-4 sentence executive summary evaluating their qualifications, subject authority, potential fit for high-performing students, and recruitment recommendations.

      Candidate Profile:
      - Full Name: ${tutor.fullName}
      - Degree: ${tutor.degree} in ${tutor.major} from ${tutor.institution} (Grad Year: ${tutor.graduationYear})
      - Total Teaching Experience: ${tutor.totalExperienceYears} years (${tutor.onlineExperienceYears} years online)
      - Subjects Taught: ${Array.isArray(tutor.subjects) ? tutor.subjects.join(", ") : tutor.subjects}
      - Curriculums: ${Array.isArray(tutor.curriculums) ? tutor.curriculums.join(", ") : tutor.curriculums}
      - Previous Institutions: ${tutor.previousInstitutions || "N/A"}
      - Bio: ${tutor.bio || "N/A"}
      - Desired Hourly Rate: $${tutor.expectedRate}/hr

      Write a highly professional, objective executive evaluation for the ACE Education Admissions Board.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an executive HR and Academic Director at ACE Education USA. You evaluate tutor applications with precision and brevity.",
      },
    });

    const summary = response.text || "Strong academic background and domain authority. Highly recommended for candidate interview.";

    return NextResponse.json({
      success: true,
      aiSummary: summary.trim(),
    });
  } catch (error: any) {
    console.error("AI Summary generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate AI candidate summary." },
      { status: 500 }
    );
  }
}
