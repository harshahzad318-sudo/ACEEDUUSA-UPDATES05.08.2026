import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET(req: NextRequest) {
  try {
    const parentEmail = req.nextUrl.searchParams.get("parentEmail");
    if (parentEmail) {
      const pkgs = await TutorStorage.getPackagesByParent(parentEmail);
      return NextResponse.json({ success: true, packages: pkgs });
    }
    const allPkgs = await TutorStorage.getAllPackages();
    return NextResponse.json({ success: true, packages: allPkgs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { parentEmail, parentName, studentName, subject, packageType, totalLessons, price, startDate, expiryDate } = body;

    if (!parentEmail || !studentName || !subject || !packageType || !totalLessons) {
      return NextResponse.json({ success: false, error: "Missing required package parameters." }, { status: 400 });
    }

    const pkg = await TutorStorage.createPackageSubscription({
      parentEmail,
      parentName: parentName || "Parent",
      studentName,
      subject,
      packageType,
      totalLessons: Number(totalLessons),
      price: Number(price || 850),
      startDate: startDate || new Date().toISOString(),
      expiryDate: expiryDate || new Date(Date.now() + 60 * 86400000).toISOString(),
    });

    return NextResponse.json({
      success: true,
      package: pkg,
      message: `Package ${packageType} (${totalLessons} Lessons) subscribed successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
