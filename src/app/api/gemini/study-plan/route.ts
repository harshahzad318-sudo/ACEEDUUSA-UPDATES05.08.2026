import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { subject, grade, goals, hoursPerWeek } = await req.json();

    const prompt = `
      You are an expert academic advisor at ACE Education USA.
      Create a highly personalized, premium academic study plan and tutor recommendation based on the following:
      - Subject/Service: ${subject}
      - Student Grade Level: ${grade}
      - Student Goals: ${goals || "Build fundamental understanding and excel in academic outcomes"}
      - Target Commitment: ${hoursPerWeek || "2-4"} hours per week

      Format the response exactly as a JSON object matching the requested schema. Make it inspiring, structured, professional, and aligned with our premium tutor network.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional educational consultant for ACE Education USA. You write encouraging, structured, highly professional study plans and match students with the ideal tutor persona.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tutorRecommendation: {
              type: Type.OBJECT,
              properties: {
                specialization: { type: Type.STRING, description: "Tutor specialty matching this student" },
                matchPercentage: { type: Type.STRING, description: "e.g., 98%" },
                reason: { type: Type.STRING, description: "Detailed explanation of why this tutor profile matches the student's needs" }
              },
              required: ["specialization", "matchPercentage", "reason"]
            },
            weeklySchedule: {
              type: Type.ARRAY,
              description: "A 4-week step-by-step roadmap",
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.STRING, description: "e.g., Week 1" },
                  focus: { type: Type.STRING, description: "The core focus of this week" },
                  activities: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Specific milestones and topics to cover"
                  }
                },
                required: ["week", "focus", "activities"]
              }
            },
            actionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Clear actionable next steps for the parent/student to get started"
            },
            keyMetrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING, description: "e.g., Average Score Boost" },
                  value: { type: Type.STRING, description: "e.g., +150 points or Grade A" }
                },
                required: ["label", "value"]
              }
            }
          },
          required: ["tutorRecommendation", "weeklySchedule", "actionSteps", "keyMetrics"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response received from Gemini");
    }

    const data = JSON.parse(text.trim());
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating study plan:", error);
    return NextResponse.json(
      { error: "Failed to generate study plan. Please try again." },
      { status: 500 }
    );
  }
}
