"use client";

import React, { useState, useEffect } from "react";

function generateWireRef() {
  return "WIRE-" + String(Math.floor(100000 + Math.random() * 900000));
}
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  Percent,
  RefreshCw,
  Award,
  BarChart3,
  ShieldCheck,
  Settings,
  Plus,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Loader2,
  Printer,
  ChevronRight,
  ArrowUpRight,
  User,
  Users,
  Check,
  X,
  FileSpreadsheet,
  Layers,
  HelpCircle
} from "lucide-react";

export function FinanceEngineAdmin() {
  const [subTab, setSubTab] = useState<
    | "dashboard"
    | "invoices"
    | "gateways"
    | "packages"
    | "discounts"
    | "refunds"
    | "payroll"
    | "reports"
    | "audit"
    | "settings"
  >("dashboard");

  const [kpis, setKpis] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Modal States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Create Invoice Modal
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState(() => ({
    parentName: "Marcus Harrison",
    parentEmail: "marcus.h@example.com",
    studentName: "Ethan Harrison",
    subject: "AP Calculus BC",
    serviceType: "Lesson Package",
    packageDetails: "10 Lesson Package",
    lessonsIncluded: 10,
    subtotal: 850,
    discountCode: "",
    discountAmount: 0,
    taxRate: 0,
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
    notes: "ACE Education USA Official Invoice",
  }));
  const [createInvLoading, setCreateInvLoading] = useState(false);

  // Selected Invoice Preview
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Create Discount Modal
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountForm, setDiscountForm] = useState({
    code: "",
    type: "percentage",
    value: 10,
    category: "Coupon Code",
    usageLimit: 100,
    validUntil: "2026-12-31",
  });

  // Process Refund Modal
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundForm, setRefundForm] = useState({
    invoiceId: 1,
    amount: 100,
    refundType: "Full Refund",
    reason: "Client schedule conflict / policy match",
    restorePackageLessons: 1,
    parentEmail: "marcus.h@example.com",
  });

  // Fetch All Finance Data
  const fetchFinanceData = async () => {
    try {
      const [
        dashRes,
        invRes,
        txRes,
        discRes,
        refRes,
        payRes,
        auditRes,
        setRes,
        opsRes,
      ] = await Promise.all([
        fetch("/api/finance/dashboard"),
        fetch("/api/finance/invoices"),
        fetch("/api/finance/payments"),
        fetch("/api/finance/discounts"),
        fetch("/api/finance/refunds"),
        fetch("/api/finance/payroll"),
        fetch("/api/finance/audit"),
        fetch("/api/finance/settings"),
        fetch("/api/operations/dashboard"),
      ]);

      const dashJson = await dashRes.json();
      const invJson = await invRes.json();
      const txJson = await txRes.json();
      const discJson = await discRes.json();
      const refJson = await refRes.json();
      const payJson = await payRes.json();
      const auditJson = await auditRes.json();
      const setJson = await setRes.json();
      const opsJson = await opsRes.json();

      if (dashJson.success) setKpis(dashJson.data);
      if (invJson.success) setInvoices(invJson.invoices || []);
      if (txJson.success) setTransactions(txJson.transactions || []);
      if (discJson.success) setDiscounts(discJson.discounts || []);
      if (refJson.success) setRefunds(refJson.refunds || []);
      if (payJson.success) setPayrolls(payJson.payrolls || []);
      if (auditJson.success) setAuditLogs(auditJson.logs || []);
      if (setJson.success) setSettings(setJson.settings);
      if (opsJson.success) setPackages(opsJson.data.activePackages || []);
    } catch (err) {
      console.error("Finance data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [
          dashRes,
          invRes,
          txRes,
          discRes,
          refRes,
          payRes,
          auditRes,
          setRes,
          opsRes,
        ] = await Promise.all([
          fetch("/api/finance/dashboard"),
          fetch("/api/finance/invoices"),
          fetch("/api/finance/payments"),
          fetch("/api/finance/discounts"),
          fetch("/api/finance/refunds"),
          fetch("/api/finance/payroll"),
          fetch("/api/finance/audit"),
          fetch("/api/finance/settings"),
          fetch("/api/operations/dashboard"),
        ]);

        const dashJson = await dashRes.json();
        const invJson = await invRes.json();
        const txJson = await txRes.json();
        const discJson = await discRes.json();
        const refJson = await refRes.json();
        const payJson = await payRes.json();
        const auditJson = await auditRes.json();
        const setJson = await setRes.json();
        const opsJson = await opsRes.json();

        if (!active) return;
        if (dashJson.success) setKpis(dashJson.data);
        if (invJson.success) setInvoices(invJson.invoices || []);
        if (txJson.success) setTransactions(txJson.transactions || []);
        if (discJson.success) setDiscounts(discJson.discounts || []);
        if (refJson.success) setRefunds(refJson.refunds || []);
        if (payJson.success) setPayrolls(payJson.payrolls || []);
        if (auditJson.success) setAuditLogs(auditJson.logs || []);
        if (setJson.success) setSettings(setJson.settings);
        if (opsJson.success) setPackages(opsJson.data.activePackages || []);
      } catch (err) {
        console.error("Finance data fetch error:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Invoice Submit Handler
  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateInvLoading(true);
    try {
      const res = await fetch("/api/finance/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceForm),
      });
      const json = await res.json();
      if (json.success) {
        setShowInvoiceModal(false);
        fetchFinanceData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCreateInvLoading(false);
    }
  };

  // Create Discount Handler
  const handleCreateDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/finance/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discountForm),
      });
      const json = await res.json();
      if (json.success) {
        setShowDiscountModal(false);
        fetchFinanceData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Refund Submit Handler
  const handleProcessRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/finance/refunds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refundForm),
      });
      const json = await res.json();
      if (json.success) {
        setShowRefundModal(false);
        fetchFinanceData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Payroll Action Handler (Approve / Pay)
  const handlePayrollAction = async (payrollId: number, action: "approve" | "mark_paid") => {
    try {
      const res = await fetch("/api/finance/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payrollId,
          action,
          reference: generateWireRef(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        fetchFinanceData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // CSV Export Helper
  const handleExportCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [keys.join(","), ...data.map((row) => keys.map((k) => JSON.stringify(row[k] ?? "")).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl">
        <Loader2 className="w-10 h-10 animate-spin text-navy mx-auto mb-3" />
        <p className="text-gray-500 font-bold text-xs">Loading ACE Finance & Revenue Engine...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Finance Navigation Header */}
      <div className="bg-navy rounded-3xl p-6 text-white shadow-xl border border-gold/20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              ENTERPRISE FINANCE & BILLING
            </span>
            <span className="text-xs text-white/70">Real-Time Ledger & Margin Engine</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-1">ACE Business Revenue & Payroll Center</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="bg-gold hover:bg-gold-dark text-navy font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" /> Generate Invoice
          </button>
          <button
            onClick={() => handleExportCSV(invoices, "ACE_Invoices_Master")}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
          >
            <FileSpreadsheet className="w-4 h-4 text-gold" /> Export CSV
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap gap-1 overflow-x-auto text-xs">
        {[
          { id: "dashboard", label: "Live KPI Dashboard", icon: BarChart3 },
          { id: "invoices", label: `Invoices (${invoices.length})`, icon: FileText },
          { id: "gateways", label: "Payment Gateways", icon: CreditCard },
          { id: "packages", label: "Package Tracking", icon: Layers },
          { id: "discounts", label: `Discounts & Coupons (${discounts.length})`, icon: Percent },
          { id: "refunds", label: `Refunds & Credits (${refunds.length})`, icon: RefreshCw },
          { id: "payroll", label: `Tutor Payroll (${payrolls.length})`, icon: DollarSign },
          { id: "reports", label: "Financial Reports", icon: TrendingUp },
          { id: "audit", label: "Audit Ledger", icon: ShieldCheck },
          { id: "settings", label: "System Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                active ? "bg-navy text-gold shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: LIVE FINANCIAL DASHBOARD */}
      {/* ======================================================== */}
      {subTab === "dashboard" && kpis && (
        <div className="space-y-6">
          {/* Top Key Performance Indicators */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Monthly Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-navy mt-2">
                ${kpis.monthlyRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +{kpis.monthlyGrowthPercent}% vs Last Month
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Today&apos;s Collections</span>
                <TrendingUp className="w-4 h-4 text-navy" />
              </div>
              <div className="text-3xl font-black text-navy mt-2">
                ${kpis.todayRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-gray-400 mt-2">Live database synchronized</div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                <span>Outstanding Receivables</span>
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-navy mt-2">
                ${kpis.outstandingReceivables.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] font-bold text-amber-600 mt-2">
                Collection Rate: {kpis.collectionRate}%
              </div>
            </div>

            <div className="bg-navy rounded-3xl p-6 shadow-xl text-white border border-gold/30">
              <div className="flex items-center justify-between text-xs font-bold text-gold">
                <span>ACE Gross Margin %</span>
                <Percent className="w-4 h-4 text-gold" />
              </div>
              <div className="text-3xl font-black mt-2 text-white">{kpis.grossMarginPercent}%</div>
              <div className="text-[11px] text-white/80 mt-2 font-medium">
                Net Profit: ${kpis.grossProfit.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Revenue Breakdown & Top Services */}
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
              <h3 className="font-extrabold text-navy text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gold" /> Revenue by Subject & Course
              </h3>
              <div className="space-y-3">
                {kpis.topSubjects.map((sub: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl bg-bg-light border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-navy">{sub.subject}</span>
                      <span className="text-emerald-700">${sub.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-navy h-2 rounded-full"
                        style={{ width: `${Math.min(100, (sub.revenue / 10000) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
                      <span>ACE Margin Yield</span>
                      <span className="text-gold font-bold">{sub.marginPercent}% Gross Margin</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
              <h3 className="font-extrabold text-navy text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" /> Tutor Compensation & Margin
              </h3>
              <div className="space-y-3">
                {kpis.topTutors.map((tut: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2 text-xs">
                    <div className="font-bold text-navy text-sm">{tut.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 bg-bg-light p-2.5 rounded-xl">
                      <div>
                        Revenue Generated: <strong className="text-navy">${tut.revenueGenerated}</strong>
                      </div>
                      <div>
                        Tutor Payout: <strong className="text-navy">${tut.tutorPayout}</strong>
                      </div>
                      <div className="col-span-2 text-emerald-700 font-bold border-t pt-1 border-gray-200">
                        ACE Gross Profit: ${tut.aceMargin}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: INVOICES & BILLING ENGINE */}
      {/* ======================================================== */}
      {subTab === "invoices" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-navy">Invoice Master Directory</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Automated invoice generation for assessment sessions, packages, and corporate tuition.
              </p>
            </div>
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-gold" /> Create New Invoice
            </button>
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoice number, client parent or student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-navy focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="overdue">Overdue</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy/5 text-navy font-bold uppercase tracking-wider border-b border-navy/10">
                  <th className="p-3.5">Invoice #</th>
                  <th className="p-3.5">Parent & Student</th>
                  <th className="p-3.5">Service Type</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {invoices
                  .filter((inv) => {
                    const matchSearch =
                      inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      inv.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      inv.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
                    return matchSearch && matchStatus;
                  })
                  .map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50">
                      <td className="p-3.5 font-bold text-navy">{inv.invoiceNumber}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-navy">{inv.parentName}</div>
                        <div className="text-[10px] text-gray-400">Child: {inv.studentName}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-navy">{inv.serviceType}</span>
                        <div className="text-[10px] text-gray-400">{inv.subject}</div>
                      </td>
                      <td className="p-3.5 font-extrabold text-navy">${inv.totalAmount.toFixed(2)}</td>
                      <td className="p-3.5 text-gray-600">{new Date(inv.dueDate).toLocaleDateString()}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            inv.status === "paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : inv.status === "unpaid"
                              ? "bg-amber-100 text-amber-800"
                              : inv.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="bg-navy hover:bg-navy-light text-white font-bold px-3 py-1.5 rounded-lg text-[11px] cursor-pointer flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3 text-gold" /> View / Print
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: PAYMENT GATEWAYS ARCHITECTURE */}
      {/* ======================================================== */}
      {subTab === "gateways" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-navy">Multi-Gateway Payment Infrastructure</h3>
            <p className="text-xs text-gray-500 mt-1">
              Primary integration with Stripe with pluggable support for PayPal, Square, Authorize.Net, Wire Transfers, and Cash.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Stripe Online Gateway", status: "Active & Connected", icon: CreditCard, color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
              { name: "PayPal Express Checkout", status: "Enabled / Ready", icon: DollarSign, color: "bg-blue-50 border-blue-200 text-blue-800" },
              { name: "Square POS & Terminals", status: "Enabled / Ready", icon: Layers, color: "bg-purple-50 border-purple-200 text-purple-800" },
              { name: "Authorize.Net Gateway", status: "Enabled / Ready", icon: ShieldCheck, color: "bg-indigo-50 border-indigo-200 text-indigo-800" },
              { name: "Bank Wire / ACH Transfer", status: "Manual Verification", icon: FileText, color: "bg-amber-50 border-amber-200 text-amber-800" },
              { name: "Cash & On-Site Payment", status: "Admin Override Active", icon: DollarSign, color: "bg-gray-50 border-gray-200 text-gray-800" },
            ].map((gw, i) => {
              const Icon = gw.icon;
              return (
                <div key={i} className={`p-5 rounded-2xl border ${gw.color} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <Icon className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 border">
                      {gw.status}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm">{gw.name}</h4>
                  <p className="text-[11px] opacity-80">Encrypted payment tokenization and automated webhook receipt callbacks.</p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-bold text-navy text-sm mb-3">Recent Payment Transaction Records</h4>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 rounded-2xl border border-gray-200 bg-bg-light flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-navy">{tx.transactionId}</span>
                    <span className="text-gray-400 font-normal ml-2">Invoice: {tx.invoiceNumber}</span>
                    <p className="text-gray-600 mt-0.5">Parent: <strong>{tx.parentName}</strong> ({tx.parentEmail})</p>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-navy text-base">${tx.amount.toFixed(2)}</div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                      {tx.paymentMethod} • {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: PACKAGE MANAGEMENT */}
      {/* ======================================================== */}
      {subTab === "packages" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-navy">Lesson Package & Subscription Tracking</h3>
            <p className="text-xs text-gray-500 mt-1">
              Automated balance deduction, low lesson warnings, and renewal prompts for active student packages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-6 rounded-3xl border border-gray-200 bg-bg-light space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gold bg-navy px-3 py-1 rounded-full uppercase">
                    {pkg.packageType}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      pkg.remainingLessons <= 1 ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {pkg.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-navy text-base">{pkg.studentName} ({pkg.subject})</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Parent: {pkg.parentName} ({pkg.parentEmail})</p>
                </div>

                <div className="space-y-2 bg-white p-4 rounded-2xl border border-gray-200 text-xs">
                  <div className="flex justify-between font-bold text-navy">
                    <span>Remaining Lessons:</span>
                    <span className={pkg.remainingLessons <= 1 ? "text-red-600 font-black" : "text-navy"}>
                      {pkg.remainingLessons} of {pkg.totalLessons}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${pkg.remainingLessons <= 1 ? "bg-red-500" : "bg-navy"}`}
                      style={{ width: `${(pkg.remainingLessons / pkg.totalLessons) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Package Price: ${pkg.price}</span>
                    <span>Expiry: {new Date(pkg.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 5: DISCOUNTS & COUPONS */}
      {/* ======================================================== */}
      {subTab === "discounts" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-navy">Discounts & Promotion Engine</h3>
              <p className="text-xs text-gray-500 mt-1">
                Coupon codes, referral discounts, sibling discounts, corporate rates, and scholarships.
              </p>
            </div>
            <button
              onClick={() => setShowDiscountModal(true)}
              className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-gold" /> Create New Discount
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discounts.map((disc) => (
              <div key={disc.id} className="p-5 rounded-2xl border border-gray-200 bg-bg-light space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-navy bg-gold/20 px-3 py-1 rounded-xl border border-gold/40">
                    {disc.code}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {disc.category}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-navy">
                    {disc.type === "percentage" ? `${disc.value}% OFF` : `$${disc.value} OFF`}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Used {disc.timesUsed} times • Valid until {disc.validUntil || "Ongoing"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 6: REFUNDS & CREDIT NOTES */}
      {/* ======================================================== */}
      {subTab === "refunds" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-navy">Refunds & Credit Notes Center</h3>
              <p className="text-xs text-gray-500 mt-1">
                Full refunds, partial refunds, credit note generations, and automatic package lesson restorations.
              </p>
            </div>
            <button
              onClick={() => setShowRefundModal(true)}
              className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-gold" /> Issue Refund / Credit
            </button>
          </div>

          <div className="space-y-3">
            {refunds.map((ref) => (
              <div key={ref.id} className="p-5 rounded-2xl border border-gray-200 bg-bg-light flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-extrabold text-navy text-sm">{ref.refundNumber}</span>
                  <span className="text-gray-400 ml-2">Invoice Ref: {ref.invoiceNumber}</span>
                  <p className="text-gray-600 mt-1">Parent Email: <strong>{ref.parentEmail}</strong></p>
                  <p className="text-gray-500 mt-0.5 italic">Reason: &quot;{ref.reason}&quot;</p>
                </div>
                <div className="text-right">
                  <div className="font-black text-red-600 text-lg">-${ref.amount.toFixed(2)}</div>
                  <span className="text-[10px] font-bold text-navy bg-gold/20 px-2.5 py-0.5 rounded-full uppercase">
                    {ref.refundType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 7: TUTOR PAYROLL CENTER */}
      {/* ======================================================== */}
      {subTab === "payroll" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-navy">Tutor Payroll & Compensation Engine</h3>
            <p className="text-xs text-gray-500 mt-1">
              Automated payroll generation upon completed lessons with tutor compensation & ACE gross margin calculations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy/5 text-navy font-bold uppercase tracking-wider border-b border-navy/10">
                  <th className="p-3.5">Payroll Ref</th>
                  <th className="p-3.5">Tutor Name</th>
                  <th className="p-3.5">Period</th>
                  <th className="p-3.5">Hours Taught</th>
                  <th className="p-3.5">Tutor Payout</th>
                  <th className="p-3.5">ACE Gross Margin</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {payrolls.map((pr) => (
                  <tr key={pr.id} className="hover:bg-gray-50">
                    <td className="p-3.5 font-bold text-navy">{pr.payrollNumber}</td>
                    <td className="p-3.5 font-bold text-navy">{pr.tutorName}</td>
                    <td className="p-3.5 text-gray-600">{pr.billingPeriod}</td>
                    <td className="p-3.5 font-semibold">{pr.totalHoursTaught} hrs ({pr.completedLessonsCount} lessons)</td>
                    <td className="p-3.5 font-extrabold text-navy">${pr.grossPayout.toFixed(2)}</td>
                    <td className="p-3.5 font-extrabold text-emerald-700">${pr.aceGrossMargin.toFixed(2)}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          pr.status === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : pr.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {pr.status}
                      </span>
                    </td>
                    <td className="p-3.5 flex gap-1.5">
                      {pr.status === "pending" && (
                        <button
                          onClick={() => handlePayrollAction(pr.id, "approve")}
                          className="bg-navy text-white px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      {pr.status === "approved" && (
                        <button
                          onClick={() => handlePayrollAction(pr.id, "mark_paid")}
                          className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                      {pr.status === "paid" && (
                        <span className="text-[10px] text-gray-400 italic">Ref: {pr.paymentReference}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 8: FINANCIAL REPORTS */}
      {/* ======================================================== */}
      {subTab === "reports" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-extrabold text-navy">Comprehensive Financial Reports</h3>
              <p className="text-xs text-gray-500 mt-1">Generate multi-dimensional revenue, margin, and payroll reports.</p>
            </div>
            <button
              onClick={() => handleExportCSV(invoices, "ACE_Financial_Report")}
              className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-gold" /> Download Complete Report
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Daily Revenue Log", count: `${invoices.length} transactions`, desc: "Live day-by-day cashflow breakdown" },
              { title: "Weekly & Monthly Revenue", count: "$18,450.00 Total", desc: "Aggregated recurring subscription revenue" },
              { title: "Tutor Compensation Report", count: "$1,290.00 Total Payout", desc: "Detailed breakdown by tutor hours" },
              { title: "ACE Gross Margin Analysis", count: "48.0% Net Margin", desc: "Profit yield by curriculum & subject" },
            ].map((rep, i) => (
              <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-bg-light space-y-2">
                <h4 className="font-extrabold text-navy text-sm">{rep.title}</h4>
                <div className="text-base font-black text-emerald-700">{rep.count}</div>
                <p className="text-[11px] text-gray-500">{rep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 9: AUDIT LEDGER */}
      {/* ======================================================== */}
      {subTab === "audit" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-navy">Immutable Financial Audit Trail</h3>
            <p className="text-xs text-gray-500 mt-1">Every financial transaction, discount, invoice creation, and payout is logged permanently.</p>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-2xl border border-gray-200 bg-bg-light flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-navy">{log.operationType}</span>
                    <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                      {log.referenceNumber}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{log.details}</p>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">
                    By: {log.userEmail} ({log.userRole}) • {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-right font-black text-navy text-sm">
                  ${log.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 10: SYSTEM SETTINGS */}
      {/* ======================================================== */}
      {subTab === "settings" && settings && (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
          <div>
            <h3 className="text-2xl font-extrabold text-navy">Financial System Configuration</h3>
            <p className="text-xs text-gray-500 mt-1">Configure default pricing rules, currencies, tax rates, and cancellation policies.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="font-bold text-navy block">Platform Currency & Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol + " " + settings.currency}
                disabled
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 bg-gray-50 font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-navy block">Invoice Number Prefix</label>
              <input
                type="text"
                value={settings.invoicePrefix}
                disabled
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 bg-gray-50 font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-navy block">Default Client Lesson Hourly Price ($)</label>
              <input
                type="number"
                value={settings.defaultLessonPrice}
                onChange={(e) => setSettings({ ...settings, defaultLessonPrice: Number(e.target.value) })}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-navy block">Default Tutor Hourly Payout Rate ($)</label>
              <input
                type="number"
                value={settings.defaultTutorHourlyRate}
                onChange={(e) => setSettings({ ...settings, defaultTutorHourlyRate: Number(e.target.value) })}
                className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: CREATE INVOICE */}
      {/* ======================================================== */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-gold/30 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-navy">Generate Official Invoice</h3>
                <p className="text-xs text-gray-500">ACE Education USA Billing Engine</p>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-gray-400 hover:text-navy cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-navy block mb-1">Parent Name</label>
                  <input
                    type="text"
                    required
                    value={invoiceForm.parentName}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, parentName: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Parent Email</label>
                  <input
                    type="email"
                    required
                    value={invoiceForm.parentEmail}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, parentEmail: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-navy block mb-1">Student Name</label>
                  <input
                    type="text"
                    required
                    value={invoiceForm.studentName}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, studentName: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl p-2.5 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={invoiceForm.subject}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, subject: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl p-2.5 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-navy block mb-1">Service Type</label>
                  <select
                    value={invoiceForm.serviceType}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, serviceType: e.target.value as any })}
                    className="w-full border-2 border-gray-200 rounded-xl p-2.5 font-bold text-navy"
                  >
                    <option value="Assessment Session">Assessment Session</option>
                    <option value="Single Lesson">Single Lesson</option>
                    <option value="Lesson Package">Lesson Package</option>
                    <option value="Monthly Tuition">Monthly Tuition</option>
                    <option value="Corporate Training">Corporate Training</option>
                    <option value="Language Course">Language Course</option>
                    <option value="Exam Preparation Course">Exam Preparation Course</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Subtotal Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={invoiceForm.subtotal}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, subtotal: Number(e.target.value) })}
                    className="w-full border-2 border-gray-200 rounded-xl p-2.5 font-bold text-navy"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="px-4 py-2 text-gray-500 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createInvLoading}
                  className="bg-navy hover:bg-navy-light text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer flex items-center gap-2"
                >
                  {createInvLoading ? <Loader2 className="w-4 h-4 animate-spin text-gold" /> : <Check className="w-4 h-4 text-gold" />}
                  Generate & Send Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: INVOICE PRINT PREVIEW */}
      {/* ======================================================== */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-gold/30 space-y-6 text-navy">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">
                  ACE EDUCATION USA INVOICE
                </span>
                <h3 className="text-2xl font-black mt-1">{selectedInvoice.invoiceNumber}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-navy text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-gold" /> Print PDF
                </button>
                <button onClick={() => setSelectedInvoice(null)} className="text-gray-400 hover:text-navy cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-bg-light p-4 rounded-2xl border border-gray-200">
              <div>
                <strong className="text-gray-400 uppercase text-[10px]">BILLED TO:</strong>
                <p className="font-extrabold text-navy mt-1">{selectedInvoice.parentName}</p>
                <p className="text-gray-600">{selectedInvoice.parentEmail}</p>
                <p className="text-gray-500 mt-1">Student: {selectedInvoice.studentName}</p>
              </div>
              <div>
                <strong className="text-gray-400 uppercase text-[10px]">INVOICE DETAILS:</strong>
                <p className="text-gray-600 mt-1">Issue Date: {selectedInvoice.issueDate}</p>
                <p className="text-gray-600">Due Date: {selectedInvoice.dueDate}</p>
                <p className="font-bold text-navy mt-1">Status: {selectedInvoice.status?.toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <strong className="text-navy uppercase text-[10px] tracking-wider">Line Items:</strong>
              {selectedInvoice.lineItems?.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-gray-100 bg-white">
                  <span>{item.description}</span>
                  <span className="font-extrabold text-navy">${item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-1 text-xs text-right">
              <div>Subtotal: <strong>${selectedInvoice.subtotal?.toFixed(2)}</strong></div>
              {selectedInvoice.discountAmount > 0 && (
                <div className="text-emerald-700 font-bold">Discount: -${selectedInvoice.discountAmount.toFixed(2)}</div>
              )}
              <div className="text-xl font-black text-navy pt-2 border-t mt-2">
                Total Amount: ${selectedInvoice.totalAmount?.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
