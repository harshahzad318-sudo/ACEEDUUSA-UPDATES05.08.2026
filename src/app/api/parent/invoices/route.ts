import { NextRequest, NextResponse } from "next/server";
import { TutorStorage } from "@/lib/tutorStorage";
import { authenticateRequest } from "@/lib/auth-guard";
import { logAuditEvent } from "@/lib/audit";

export async function GET(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const parentEmail = searchParams.get("email") || auth.authContext?.email || "marcus.h@example.com";

    const invoices = await TutorStorage.getInvoicesByParent(parentEmail);
    return NextResponse.json({ success: true, invoices });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await authenticateRequest(req);
  if (!auth.authorized) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const { invoiceId } = body;

    if (!invoiceId) {
      return NextResponse.json({ success: false, error: "Invoice ID is required" }, { status: 400 });
    }

    const invoice = await TutorStorage.payInvoice(Number(invoiceId));
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    await logAuditEvent({
      userId: auth.authContext?.uid,
      userEmail: auth.authContext?.email,
      action: "PAY_INVOICE",
      resource: "invoices",
      resourceId: String(invoiceId),
      details: { amount: invoice.amount, invoiceNumber: invoice.invoiceNumber },
    });

    return NextResponse.json({ success: true, invoice });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
