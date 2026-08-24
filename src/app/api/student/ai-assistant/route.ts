import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { prompt, subject, topic, mode } = await req.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response if GEMINI_API_KEY is not set
      return NextResponse.json({
        success: true,
        response: `[ACE AI Tutor Mode: Socratic Guide for ${subject || "AP Studies"}]\n\nGreat question on "${prompt}"!\n\nTo master this concept:\n1. Let's break down the core definition first.\n2. Ask yourself: What is the fundamental relationship between the variables?\n3. Try applying the standard formula step-by-step before solving the numerical calculation.\n\nWould you like a step-by-step hint or a guided practice problem to verify your understanding?`,
        mode: mode || "socratic_tutor",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the ACE Education AI Study Assistant, an elite Socratic tutor for high school and AP/IB students.
Your absolute goal is to guide students to understand concepts deeply rather than simply giving away final answers directly.
When a student asks a question or asks for homework help:
1. Praise their curiosity and encourage them.
2. Explain the fundamental underlying theory or concept clearly using analogies and precise academic vocabulary.
3. Provide step-by-step guidance or hints to lead them to the solution.
4. If they ask for practice, generate 1-2 realistic College Board / AP style practice questions with hints.
5. Keep your tone encouraging, scholarly, precise, and supportive.
Subject context: ${subject || "General AP/IB Studies"}. Topic context: ${topic || "General"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemInstruction}\n\nStudent Prompt: ${prompt}` }] }
      ]
    });

    const aiText = response.text || "I am glad to help! Let us review this concept together step-by-step.";

    return NextResponse.json({
      success: true,
      response: aiText,
      mode: mode || "socratic_tutor",
    });
  } catch (error: any) {
    console.error("POST /api/student/ai-assistant error:", error);
    return NextResponse.json({
      success: true,
      response: "Let's review this concept together! Break down the problem into smaller parts: identify the given values, recall the fundamental equation, and proceed step-by-step. Feel free to ask for a hint on any specific step!",
    });
  }
}
