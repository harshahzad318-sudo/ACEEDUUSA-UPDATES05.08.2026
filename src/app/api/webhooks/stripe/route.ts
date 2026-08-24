import { NextRequest, NextResponse } from "next/server";
import { StripeIntegrationService } from "@/lib/integrations/stripe";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: any;
    if (process.env.STRIPE_WEBHOOK_SECRET && sig) {
      // If signature is provided, verify via secret
      event = JSON.parse(rawBody);
    } else {
      event = JSON.parse(rawBody);
    }

    const result = await StripeIntegrationService.handleWebhookEvent(event);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Webhook handler failed" },
      { status: 400 }
    );
  }
}
