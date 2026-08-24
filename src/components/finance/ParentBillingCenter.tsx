"use client";

import React, { useState, useEffect } from "react";
import {
  CreditCard,
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Printer,
  ShieldCheck,
  Percent,
  Layers,
  ArrowRight,
  Loader2,
  X,
  Check,
  Receipt
} from "lucide-react";

export function ParentBillingCenter({ parentEmail }: { parentEmail?: string }) {
  const email = parentEmail || "marcus.h@example.com";

  const [invoices, setInvoices] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pay Modal
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"Stripe" | "PayPal" | "Bank Transfer">("Stripe");
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paying, setPaying] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState("");

  const fetchParentBillingData = async () => {
    setLoading(true);
    try {
      const [invRes, txRes, opsRes, refRes] = await Promise.all([
        fetch(`/api/finance/invoices?parentEmail=${encodeURIComponent(email)}`),
        fetch(`/api/finance/payments?parentEmail=${encodeURIComponent(email)}`),
        fetch("/api/operations/dashboard"),
        fetch("/api/finance/refunds"),
      ]);

      const invJson = await invRes.json();
      const txJson = await txRes.json();
      const opsJson = await opsRes.json();
      const refJson = await refRes.json();

      if (invJson.success) setInvoices(invJson.invoices || []);
      if (txJson.success) setTransactions(txJson.transactions || []);
      if (opsJson.success) {
        const myPkgs = (opsJson.data.activePackages || []).filter(
          (p: any) => p.parentEmail?.toLowerCase() === email.toLowerCase()
        );
        setPackages(myPkgs);
      }
      if (refJson.success) {
        const myRefs = (refJson.refunds || []).filter(
          (r: any) => r.parentEmail?.toLowerCase() === email.toLowerCase()
        );
        setRefunds(myRefs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [invRes, payRes, refRes] = await Promise.all([
          fetch("/api/finance/invoices"),
          fetch("/api/finance/payments"),
          fetch("/api/finance/refunds"),
        ]);
        const invJson = await invRes.json();
        const payJson = await payRes.json();
        const refJson = await refRes.json();

        if (!active) return;

        if (invJson.success) {
          const myInvoices = (invJson.invoices || []).filter(
            (inv: any) => inv.parentEmail?.toLowerCase() === email.toLowerCase()
          );
          setInvoices(myInvoices);
          if (myInvoices.length > 0) {
            setSelectedInvoice(myInvoices[0]);
          }
        }
        if (payJson.success) {
          const myPayments = (payJson.payments || []).filter(
            (p: any) => p.parentEmail?.toLowerCase() === email.toLowerCase()
          );
          setTransactions(myPayments);
        }
        if (refJson.success) {
          const myRefs = (refJson.refunds || []).filter(
            (r: any) => r.parentEmail?.toLowerCase() === email.toLowerCase()
          );
          setRefunds(myRefs);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [email]);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const res = await fetch("/api/finance/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "apply",
          code: couponCode,
          subtotal: selectedInvoice.subtotal,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setDiscountAmount(json.discountAmount);
        setCouponMsg(`✅ ${json.message}`);
      } else {
        setDiscountAmount(0);
        setCouponMsg(`❌ ${json.message}`);
      }
    } catch (e) {
      setCouponMsg("❌ Error validating coupon code.");
    }
  };

  const handleProcessPayment = async () => {
    if (!selectedInvoice) return;
    setPaying(true);
    try {
      const res = await fetch("/api/finance/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: selectedInvoice.id,
          amount: Math.max(0, selectedInvoice.totalAmount - discountAmount),
          paymentMethod,
          parentEmail: email,
          couponCode: couponCode || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setPaymentSuccessMsg("🎉 Payment processed successfully! Official receipt generated.");
        setTimeout(() => {
          setSelectedInvoice(null);
          setPaymentSuccessMsg("");
          setCouponCode("");
          setDiscountAmount(0);
          fetchParentBillingData();
        }, 1800);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPaying(false);
    }
  };

  const totalOutstanding = invoices
    .filter((i) => i.status === "unpaid" || i.status === "overdue")
    .reduce((acc, i) => acc + i.balanceDue, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto mb-2" />
        <p className="text-gray-500 font-bold text-xs">Loading Parent Billing Center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-navy rounded-3xl p-6 text-white shadow-xl border border-gold/20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">
              PARENT BILLING & PAYMENTS
            </span>
            <span className="text-xs text-white/70">Encrypted Stripe Gateway</span>
          </div>
          <h2 className="text-2xl font-black mt-1">Tuition, Invoices & Receipt Records</h2>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-gray-300">Current Balance Due</div>
          <div className="text-3xl font-black text-gold">${totalOutstanding.toFixed(2)}</div>
        </div>
      </div>

      {/* Package Subscriptions Status */}
      <div className="grid md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold text-navy bg-gold/20 border border-gold/40 px-3 py-1 rounded-full uppercase">
                {pkg.packageType}
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                {pkg.status}
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-navy text-lg">{pkg.studentName} — {pkg.subject}</h3>
              <p className="text-xs text-gray-500 mt-0.5">Package Price: ${pkg.price}</p>
            </div>
            <div className="space-y-1.5 bg-bg-light p-3.5 rounded-2xl border border-gray-200 text-xs">
              <div className="flex justify-between font-bold text-navy">
                <span>Remaining Lessons:</span>
                <span className={pkg.remainingLessons <= 1 ? "text-red-600" : "text-navy"}>
                  {pkg.remainingLessons} / {pkg.totalLessons}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-navy h-2 rounded-full"
                  style={{ width: `${(pkg.remainingLessons / pkg.totalLessons) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invoices Master Section */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4">
        <h3 className="text-lg font-extrabold text-navy flex items-center gap-2">
          <FileText className="w-5 h-5 text-gold" /> My Invoices & Statements
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-navy/5 text-navy font-bold uppercase border-b border-navy/10">
                <th className="p-3">Invoice #</th>
                <th className="p-3">Service & Subject</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-navy">{inv.invoiceNumber}</td>
                  <td className="p-3">
                    <span className="font-bold text-navy">{inv.serviceType}</span>
                    <div className="text-[10px] text-gray-400">{inv.subject}</div>
                  </td>
                  <td className="p-3 font-extrabold text-navy">${inv.totalAmount.toFixed(2)}</td>
                  <td className="p-3">{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        inv.status === "paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : inv.status === "unpaid"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {inv.status !== "paid" ? (
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="bg-gold hover:bg-gold-dark text-navy font-extrabold px-3 py-1.5 rounded-lg text-xs cursor-pointer flex items-center gap-1"
                      >
                        <CreditCard className="w-3.5 h-3.5" /> Pay Now
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Paid in Full
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment History & Receipts */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4">
        <h3 className="text-lg font-extrabold text-navy flex items-center gap-2">
          <Receipt className="w-5 h-5 text-gold" /> Completed Receipts & Payment History
        </h3>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 rounded-2xl border border-gray-200 bg-bg-light flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-navy">{tx.transactionId}</span>
                <span className="text-gray-400 text-[11px] ml-2">Invoice: {tx.invoiceNumber}</span>
                <p className="text-gray-500 mt-0.5">{new Date(tx.paymentDate).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <div className="font-black text-navy text-sm">${tx.amount.toFixed(2)}</div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  {tx.paymentMethod}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pay Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gold/30 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-navy">Checkout & Pay Invoice</h3>
                <p className="text-gray-400">{selectedInvoice.invoiceNumber}</p>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-gray-400 hover:text-navy cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccessMsg ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 p-6 rounded-2xl text-center font-bold text-sm">
                {paymentSuccessMsg}
              </div>
            ) : (
              <>
                <div className="bg-bg-light p-4 rounded-2xl border border-gray-200 space-y-1">
                  <div className="flex justify-between font-bold text-navy">
                    <span>{selectedInvoice.serviceType} ({selectedInvoice.subject})</span>
                    <span>${selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount Code Applied</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-navy text-base pt-2 border-t mt-2">
                    <span>Total Due:</span>
                    <span className="text-emerald-700">
                      ${Math.max(0, selectedInvoice.totalAmount - discountAmount).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon Input */}
                <div className="space-y-1">
                  <label className="font-bold text-navy block">Have a Coupon Code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. ACEFALL2026"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 font-mono uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-navy text-gold font-bold px-3 py-2 rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && <p className="text-[11px] font-bold mt-1">{couponMsg}</p>}
                </div>

                {/* Gateway Selection */}
                <div className="space-y-2">
                  <label className="font-bold text-navy block">Select Payment Gateway</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Stripe", name: "Stripe Card" },
                      { id: "PayPal", name: "PayPal" },
                      { id: "Bank Transfer", name: "Bank Transfer" },
                    ].map((gw) => (
                      <button
                        key={gw.id}
                        type="button"
                        onClick={() => setPaymentMethod(gw.id as any)}
                        className={`p-2.5 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                          paymentMethod === gw.id
                            ? "bg-navy text-gold border-gold"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {gw.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="px-4 py-2 font-bold text-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    disabled={paying}
                    className="bg-gold hover:bg-gold-dark text-navy font-extrabold px-6 py-2.5 rounded-xl cursor-pointer flex items-center gap-2"
                  >
                    {paying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                    Confirm Pay $
                    {Math.max(0, selectedInvoice.totalAmount - discountAmount).toFixed(2)}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
