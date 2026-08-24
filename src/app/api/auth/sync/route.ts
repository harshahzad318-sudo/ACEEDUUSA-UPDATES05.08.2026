import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { db } from "@/db/index";
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const { uid, email } = decodedToken;

    if (!email) {
      return NextResponse.json({ error: "Email is required from token" }, { status: 400 });
    }

    // Determine role based on email or optional body param
    let role = "student";
    if (email === "harshahzad318@gmail.com" || email.endsWith("@aceeducation.us") || email.endsWith("@aceeducation.us")) {
      role = "admin";
    }

    // Check if the request specifies a target role for testing
    try {
      const body = await req.json().catch(() => ({}));
      if (body.role && ["student", "parent", "tutor", "admin"].includes(body.role)) {
        role = body.role;
      }
    } catch (e) {
      // Ignored if no body
    }

    // Upsert the user in PostgreSQL using Drizzle
    const result = await db.insert(users)
      .values({
        uid,
        email,
        role,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          role, // Allow updating role if explicitly passed or configured
        },
      })
      .returning();

    const dbUser = result[0];

    return NextResponse.json({
      success: true,
      user: {
        id: dbUser.id,
        uid: dbUser.uid,
        email: dbUser.email,
        role: dbUser.role,
      }
    });
  } catch (error: any) {
    console.error("Error in auth sync:", error);
    return NextResponse.json({ error: error.message || "Failed to sync user" }, { status: 500 });
  }
}
