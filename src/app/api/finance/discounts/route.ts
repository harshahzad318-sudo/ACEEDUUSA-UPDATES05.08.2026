import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET() {
  try {
    const discounts = await TutorStorage.getDiscounts();
    return NextResponse.json({ success: true, discounts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === "apply") {
      const result = await TutorStorage.applyDiscount(body.code, body.subtotal);
      return NextResponse.json({ success: result.valid, ...result });
    }
    const discount = await TutorStorage.createDiscount(body);
    return NextResponse.json({ success: true, discount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
