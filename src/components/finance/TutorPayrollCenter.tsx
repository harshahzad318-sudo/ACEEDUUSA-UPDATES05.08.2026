"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Clock,
  CheckCircle2,
  FileText,
  Download,
  Printer,
  Calendar,
  Loader2,
  TrendingUp,
  Award
} from "lucide-react";

export function TutorPayrollCenter({ tutorId }: { tutorId?: number }) {
  const tId = tutorId || 101;

  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTutorPayrollData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/finance/payroll?tutorId=${tId}`);
      const json = await res.json();
      if (json.success) setPayrolls(json.payrolls || []);
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
        const res = await fetch(`/api/finance/payroll?tutorId=${tId}`);
        const json = await res.json();
        if (active && json.success) setPayrolls(json.payrolls || []);
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
  }, [tId]);

  const totalEarnings = payrolls.reduce((acc, p) => acc + p.grossPayout, 0);
  const totalHours = payrolls.reduce((acc, p) => acc + p.totalHoursTaught, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-xl">
        <Loader2 className="w-8 h-8 animate-spin text-navy mx-auto mb-2" />
        <p className="text-gray-500 font-bold text-xs">Loading Tutor Payroll Center...</p>
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
              TUTOR PAYROLL & EARNINGS
            </span>
            <span className="text-xs text-white/70">Direct Deposit & Monthly Statements</span>
          </div>
          <h2 className="text-2xl font-black mt-1">Teaching Earnings & Payout Statements</h2>
        </div>

        <div className="flex gap-6 text-right">
          <div>
            <div className="text-xs text-gray-300 font-bold">Total Hours Taught</div>
            <div className="text-2xl font-black text-white">{totalHours.toFixed(1)} hrs</div>
          </div>
          <div>
            <div className="text-xs text-gray-300 font-bold">Total Earnings</div>
            <div className="text-2xl font-black text-gold">${totalEarnings.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Payroll Master Directory */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 space-y-4">
        <h3 className="text-lg font-extrabold text-navy flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gold" /> Monthly Payroll Statements
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-navy/5 text-navy font-bold uppercase border-b border-navy/10">
                <th className="p-3">Statement Ref</th>
                <th className="p-3">Billing Period</th>
                <th className="p-3">Lessons Taught</th>
                <th className="p-3">Hours Taught</th>
                <th className="p-3">Rate / Hour</th>
                <th className="p-3">Gross Payout</th>
                <th className="p-3">Status</th>
                <th className="p-3">Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {payrolls.map((pr) => (
                <tr key={pr.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-navy">{pr.payrollNumber}</td>
                  <td className="p-3 font-bold text-navy">{pr.billingPeriod}</td>
                  <td className="p-3">{pr.completedLessonsCount} lessons</td>
                  <td className="p-3 font-bold">{pr.totalHoursTaught} hrs</td>
                  <td className="p-3">${pr.hourlyRate.toFixed(2)}/hr</td>
                  <td className="p-3 font-black text-navy text-sm">${pr.grossPayout.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
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
                  <td className="p-3">
                    <button
                      onClick={() => window.print()}
                      className="bg-navy hover:bg-navy-light text-white font-bold px-3 py-1 rounded-lg text-[11px] cursor-pointer flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 text-gold" /> Paystub PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
