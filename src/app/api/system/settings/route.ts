import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";

export async function GET() {
  try {
    const settings = await TutorStorage.getFinanceSettings();
    return NextResponse.json({
      success: true,
      settings: {
        platformName: "ACE Education USA",
        supportEmail: process.env.ADMIN_EMAIL || "info@aceeducation.us",
        supportPhone: "+1 (332) 293-6270",
        currency: "USD",
        currencySymbol: "$",
        defaultTaxRate: settings.taxRatePercentage || 0,
        lateFeePercent: settings.lateFeePercentage || 5,
        cancellationBufferHours: 24,
        maxStudentsPerClass: 1,
        systemVersion: "2.5.0-production",
        paymentGateways: {
          stripe: !!process.env.STRIPE_SECRET_KEY,
          paypal: true,
          square: true,
        },
        integrations: {
          twilioSms: !!process.env.TWILIO_ACCOUNT_SID,
          googleMaps: !!process.env.GOOGLE_MAPS_API_KEY,
          googleCloudStorage: !!process.env.GCS_BUCKET_NAME,
          geminiAi: !!process.env.GEMINI_API_KEY,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await TutorStorage.updateFinanceSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
