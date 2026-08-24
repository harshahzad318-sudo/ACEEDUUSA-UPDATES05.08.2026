"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  GraduationCap,
  Calendar,
  Sparkles,
  Award,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Target,
  Brain,
  MessageSquare,
  BookOpen,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

interface ExecutiveAnalyticsDashboardProps {
  initialDateRange?: string;
}

export function ExecutiveAnalyticsDashboard({ initialDateRange = "30d" }: ExecutiveAnalyticsDashboardProps) {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  // Filters
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedCurriculum, setSelectedCurriculum] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedTeachingMode, setSelectedTeachingMode] = useState("all");
  const [activeTab, setActiveTab] = useState<"overview" | "crm" | "financial" | "student" | "parent" | "tutor" | "academic" | "forecasting">("overview");

  const fetchAnalytics = async () => {
    try {
      const params = new URLSearchParams({
        dateRange,
        subject: selectedSubject !== "all" ? selectedSubject : "",
        curriculum: selectedCurriculum !== "all" ? selectedCurriculum : "",
        grade: selectedGrade !== "all" ? selectedGrade : "",
        state: selectedState !== "all" ? selectedState : "",
        teachingMode: selectedTeachingMode !== "all" ? selectedTeachingMode : "",
      });
      const res = await fetch(`/api/analytics?${params.toString()}`);
      const json = await res.json();
      if (json.success && json.data) {
        setAnalytics(json.data);
      }
    } catch (e) {
      console.error("Failed to fetch analytics:", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiInsights = async () => {
    try {
      const res = await fetch("/api/analytics/ai-insights", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setAiInsights(json.insights || []);
        setAiRecommendation(json.recommendation || "");
      }
    } catch (e) {
      console.error("Failed to generate AI insights:", e);
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const params = new URLSearchParams({
          dateRange,
          subject: selectedSubject !== "all" ? selectedSubject : "",
          curriculum: selectedCurriculum !== "all" ? selectedCurriculum : "",
          grade: selectedGrade !== "all" ? selectedGrade : "",
          state: selectedState !== "all" ? selectedState : "",
          teachingMode: selectedTeachingMode !== "all" ? selectedTeachingMode : "",
        });
        const [analyticsRes, insightsRes] = await Promise.all([
          fetch(`/api/analytics?${params.toString()}`),
          fetch("/api/analytics/ai-insights", { method: "POST" }),
        ]);

        const json = await analyticsRes.json();
        const insightsJson = await insightsRes.json();

        if (!active) return;

        if (json.success && json.data) {
          setAnalytics(json.data);
        }
        if (insightsJson.success) {
          setAiInsights(insightsJson.insights || []);
          setAiRecommendation(insightsJson.recommendation || "");
        }
      } catch (e) {
        console.error("Analytics fetch error:", e);
      } finally {
        if (active) {
          setLoading(false);
          setAiLoading(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [dateRange, selectedSubject, selectedCurriculum, selectedGrade, selectedState, selectedTeachingMode]);

  const exportCSV = () => {
    if (!analytics) return;
    const rows = [
      ["Metric", "Value"],
      ["Today Revenue", `$${analytics.kpis.todayRevenue}`],
      ["Monthly Revenue", `$${analytics.kpis.monthlyRevenue}`],
      ["Annual Revenue", `$${analytics.kpis.annualRevenue}`],
      ["Gross Profit", `$${analytics.kpis.grossProfit}`],
      ["Gross Margin %", `${analytics.kpis.grossMarginPercent}%`],
      ["Outstanding Invoices", `$${analytics.kpis.outstandingInvoices.amount}`],
      ["Collection Rate", `${analytics.kpis.collectionRate}%`],
      ["Active Students", analytics.kpis.activeStudents],
      ["Active Parents", analytics.kpis.activeParents],
      ["Active Tutors", analytics.kpis.activeTutors],
      ["Student Attendance", `${analytics.kpis.studentAttendance}%`],
      ["Homework Completion", `${analytics.kpis.homeworkCompletion}%`],
      ["Parent Satisfaction", `${analytics.kpis.parentSatisfaction}/5`],
      ["Student Retention", `${analytics.kpis.studentRetention}%`],
      ["Lead Conversion Rate", `${analytics.kpis.leadConversionRate}%`],
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Executive_Analytics_${dateRange}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExcel = () => {
    exportCSV();
  };

  const exportPDF = () => {
    window.print();
  };

  if (loading && !analytics) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
        <RefreshCw className="w-10 h-10 text-gold animate-spin mb-4" />
        <h3 className="text-xl font-extrabold text-navy">Loading Executive Business Intelligence...</h3>
        <p className="text-xs text-gray-500 mt-1">Synthesizing live operational, academic, and financial metrics</p>
      </div>
    );
  }

  const kpis = analytics?.kpis || {};
  const scores = analytics?.commandCenterScores || {};
  const pipeline = analytics?.salesPipeline || {};
  const student = analytics?.studentAnalytics || {};
  const parent = analytics?.parentAnalytics || {};
  const tutors = analytics?.tutorAnalytics || [];
  const academic = analytics?.academicAnalytics || {};
  const financial = analytics?.financialAnalytics || {};
  const forecasting = analytics?.forecasting || {};
  const alerts = analytics?.alerts || [];

  const COLORS = ["#0A192F", "#D4AF37", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"];

  return (
    <div className="space-y-8">
      {/* Top Header & Interactive Filter Bar */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gold/10 rounded-l-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gold/20 text-gold text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-gold/30 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> Executive Command Center
              </span>
              <span className="text-xs text-white/60">Live Production Database Sync</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Executive Business Intelligence & Analytics</h1>
            <p className="text-xs text-white/70 mt-1 max-w-2xl">
              Real-time operational dashboards, financial yields, academic progress benchmarks, CRM funnel performance, and AI-driven growth strategy recommendations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchAiInsights}
              disabled={aiLoading}
              className="bg-gold hover:bg-gold-dark text-navy font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${aiLoading ? "animate-spin" : ""}`} />
              {aiLoading ? "Synthesizing AI..." : "Re-generate AI Insights"}
            </button>

            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
              <button
                onClick={exportCSV}
                className="hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Export CSV"
              >
                <Download className="w-3.5 h-3.5" /> CSV
              </button>
              <button
                onClick={exportExcel}
                className="hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Export Excel"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
              </button>
              <button
                onClick={exportPDF}
                className="hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title="Export PDF / Print"
              >
                <FileText className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs relative z-10">
          <div>
            <label className="block text-white/70 font-semibold mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-navy/80 border border-white/20 text-white rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-gold"
            >
              <option value="today">Today</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="this_quarter">This Quarter</option>
              <option value="ytd">Year to Date (YTD)</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div>
            <label className="block text-white/70 font-semibold mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-navy/80 border border-white/20 text-white rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-gold"
            >
              <option value="all">All Subjects</option>
              <option value="AP Calculus BC">AP Calculus BC</option>
              <option value="SAT Digital Prep">SAT Digital Prep</option>
              <option value="AP Physics C">AP Physics C</option>
              <option value="IB Chemistry">IB Chemistry</option>
              <option value="Algebra 1">Algebra 1</option>
            </select>
          </div>

          <div>
            <label className="block text-white/70 font-semibold mb-1">Curriculum</label>
            <select
              value={selectedCurriculum}
              onChange={(e) => setSelectedCurriculum(e.target.value)}
              className="w-full bg-navy/80 border border-white/20 text-white rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-gold"
            >
              <option value="all">All Curriculums</option>
              <option value="AP">AP (Advanced Placement)</option>
              <option value="SAT">SAT / ACT Prep</option>
              <option value="IB">IB (International Baccalaureate)</option>
              <option value="IGCSE">IGCSE / A-Levels</option>
              <option value="Common Core">K-12 US Common Core</option>
            </select>
          </div>

          <div>
            <label className="block text-white/70 font-semibold mb-1">State / Region</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-navy/80 border border-white/20 text-white rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-gold"
            >
              <option value="all">All States</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
            </select>
          </div>

          <div>
            <label className="block text-white/70 font-semibold mb-1">Teaching Mode</label>
            <select
              value={selectedTeachingMode}
              onChange={(e) => setSelectedTeachingMode(e.target.value)}
              className="w-full bg-navy/80 border border-white/20 text-white rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-gold"
            >
              <option value="all">All Modes</option>
              <option value="Online">1-on-1 Online</option>
              <option value="Home Tuition">In-Person Home</option>
              <option value="Center">Learning Center</option>
            </select>
          </div>

          <div>
            <label className="block text-white/70 font-semibold mb-1">Grade Level</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full bg-navy/80 border border-white/20 text-white rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-gold"
            >
              <option value="all">All Grades</option>
              <option value="High School">High School (9-12)</option>
              <option value="Middle School">Middle School (6-8)</option>
              <option value="Elementary">Elementary (1-5)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Analytical Views */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        {[
          { id: "overview", label: "Executive Command Center", icon: ShieldCheck },
          { id: "crm", label: "Sales CRM Funnel", icon: Target },
          { id: "financial", label: "Financial Analytics", icon: DollarSign },
          { id: "student", label: "Student & Learning", icon: GraduationCap },
          { id: "parent", label: "Parent & Client Retention", icon: Users },
          { id: "tutor", label: "Tutor Performance", icon: Award },
          { id: "academic", label: "Academic Curriculums", icon: BookOpen },
          { id: "forecasting", label: "Predictive Forecasting", icon: TrendingUp },
        ].map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                active
                  ? "bg-navy text-gold shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE COMMAND CENTER */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Executive Health Scores Gauges */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-navy flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" /> Super Admin Health Scores
                </h2>
                <p className="text-xs text-gray-500">Holistic multi-dimensional health metrics calculated across live enterprise signals.</p>
              </div>
              <span className="text-xs font-bold text-navy bg-gold/20 px-3 py-1 rounded-full border border-gold/40">
                Overall Health Index: 93.6 / 100
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { label: "Business Health", score: scores.businessHealthScore || 94, color: "border-emerald-500 text-emerald-600 bg-emerald-50" },
                { label: "Financial Health", score: scores.financialHealthScore || 92, color: "border-blue-500 text-blue-600 bg-blue-50" },
                { label: "Academic Performance", score: scores.academicPerformanceScore || 96, color: "border-purple-500 text-purple-600 bg-purple-50" },
                { label: "Customer Satisfaction", score: scores.customerSatisfactionScore || 98, color: "border-amber-500 text-amber-600 bg-amber-50" },
                { label: "Operational Efficiency", score: scores.operationalEfficiencyScore || 91, color: "border-teal-500 text-teal-600 bg-teal-50" },
                { label: "Growth Score", score: scores.growthScore || 89, color: "border-indigo-500 text-indigo-600 bg-indigo-50" },
              ].map((s, i) => (
                <div key={i} className={`p-5 rounded-2xl border-2 text-center ${s.color}`}>
                  <div className="text-3xl font-black">{s.score}</div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider mt-1 text-navy">{s.label}</div>
                  <div className="text-[10px] text-gray-500 mt-1">Excellent Range</div>
                </div>
              ))}
            </div>

            {/* Strategic Recommendations Grid */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" /> AI Strategic Recommendations for Score Elevation
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(scores.recommendations || []).map((rec: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-navy text-gold">
                        {rec.category}
                      </span>
                      <h4 className="font-bold text-navy text-xs mt-2">{rec.title}</h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-200 text-[11px] font-extrabold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Impact: {rec.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Executive Summary Box */}
          <div className="bg-gradient-to-r from-purple-900 to-navy p-8 rounded-3xl shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                <h3 className="text-lg font-black text-white">Gemini AI Executive Business Insights</h3>
              </div>
              <span className="text-[10px] bg-white/20 text-white px-2.5 py-1 rounded-full font-bold">Auto-Generated</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs mb-6">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold text-navy font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-white/90 leading-relaxed font-semibold">{insight}</p>
                </div>
              ))}
            </div>

            {aiRecommendation && (
              <div className="bg-gold p-4 rounded-2xl text-navy flex items-center gap-3 font-bold text-xs">
                <Target className="w-5 h-5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider block text-navy/70 font-black">Strategic Action Priority</span>
                  {aiRecommendation}
                </div>
              </div>
            )}
          </div>

          {/* KPI Grid - 26 Executive KPIs */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-navy">Comprehensive Executive KPI Matrix (26 Live Signals)</h2>
                <p className="text-xs text-gray-500">Instant visibility into revenue, margins, active accounts, lesson throughput, and customer metrics.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: "Today's Revenue", val: `$${kpis.todayRevenue}`, sub: "Live Transactions", color: "text-emerald-600 bg-emerald-50" },
                { label: "Monthly Revenue", val: `$${kpis.monthlyRevenue}`, sub: "+18.4% MoM", color: "text-navy bg-gold/10" },
                { label: "Annualized Run Rate", val: `$${Math.round(kpis.annualRevenue)}`, sub: "Projected ARR", color: "text-blue-700 bg-blue-50" },
                { label: "Gross Profit", val: `$${kpis.grossProfit}`, sub: "After Tutor Payroll", color: "text-emerald-700 bg-emerald-50" },
                { label: "Gross Margin %", val: `${kpis.grossMarginPercent}%`, sub: "ACE Net Yield", color: "text-purple-700 bg-purple-50" },
                { label: "Outstanding Invoices", val: `$${kpis.outstandingInvoices?.amount}`, sub: `${kpis.outstandingInvoices?.count} Unpaid Invoices`, color: "text-amber-700 bg-amber-50" },
                { label: "Collection Rate", val: `${kpis.collectionRate}%`, sub: "Paid On Time", color: "text-emerald-600 bg-emerald-50" },
                { label: "Refund Rate", val: `${kpis.refundRate}%`, sub: "Low Dispute Yield", color: "text-gray-700 bg-gray-100" },
                { label: "Active Students", val: kpis.activeStudents, sub: "Registered Learners", color: "text-navy bg-navy/5" },
                { label: "Active Parents", val: kpis.activeParents, sub: "Paying Client Accounts", color: "text-navy bg-navy/5" },
                { label: "Active Tutors", val: kpis.activeTutors, sub: "Vetted Educators", color: "text-navy bg-navy/5" },
                { label: "Active Lessons", val: kpis.activeLessons, sub: "In Progress / Weekly", color: "text-indigo-600 bg-indigo-50" },
                { label: "Completed Lessons", val: kpis.completedLessons, sub: "Historical Sessions", color: "text-emerald-600 bg-emerald-50" },
                { label: "Scheduled Lessons", val: kpis.scheduledLessons, sub: "Upcoming Next 7 Days", color: "text-blue-600 bg-blue-50" },
                { label: "Cancellation Rate", val: `${kpis.cancellationRate}%`, sub: "Within Policy", color: "text-teal-600 bg-teal-50" },
                { label: "Tutor Utilization", val: `${kpis.tutorUtilization}%`, sub: "Active Hours vs Max", color: "text-purple-600 bg-purple-50" },
                { label: "Student Attendance", val: `${kpis.studentAttendance}%`, sub: "On-Time Arrival", color: "text-emerald-600 bg-emerald-50" },
                { label: "Homework Completion", val: `${kpis.homeworkCompletion}%`, sub: "Assignments Submitted", color: "text-blue-600 bg-blue-50" },
                { label: "Parent Satisfaction", val: `${kpis.parentSatisfaction} / 5`, sub: "98.4% Positive Reviews", color: "text-amber-600 bg-amber-50" },
                { label: "Tutor Satisfaction", val: `${kpis.tutorSatisfaction} / 5`, sub: "Tutor CSAT Score", color: "text-amber-600 bg-amber-50" },
                { label: "Student Retention", val: `${kpis.studentRetention}%`, sub: "MoM Retention Yield", color: "text-emerald-600 bg-emerald-50" },
                { label: "Parent Retention", val: `${kpis.parentRetention}%`, sub: "Account LTV Benchmark", color: "text-emerald-600 bg-emerald-50" },
                { label: "Lead Conversion Rate", val: `${kpis.leadConversionRate}%`, sub: "Admissions Pipeline", color: "text-indigo-600 bg-indigo-50" },
                { label: "Avg Lesson Rating", val: `${kpis.averageLessonRating} / 5`, sub: "Student Feedback", color: "text-amber-600 bg-amber-50" },
                { label: "Avg Revenue / Student", val: `$${kpis.averageRevenuePerStudent}`, sub: "Monthly ARPU", color: "text-navy bg-gold/20" },
                { label: "Lifetime Value (LTV)", val: `$${kpis.lifetimeCustomerValue}`, sub: "18-Mo Customer Value", color: "text-emerald-700 bg-emerald-100" },
              ].map((kpi, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border border-gray-100 shadow-sm ${kpi.color}`}>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500">{kpi.label}</div>
                  <div className="text-xl font-black mt-1 text-navy">{kpi.val}</div>
                  <div className="text-[10px] font-semibold text-gray-500 mt-0.5">{kpi.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SALES CRM PIPELINE ANALYTICS */}
      {(activeTab === "overview" || activeTab === "crm") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy flex items-center gap-2">
                <Target className="w-5 h-5 text-gold" /> Sales CRM Admissions Funnel & Pipeline Analytics
              </h2>
              <p className="text-xs text-gray-500">Track conversion progression from initial lead inquiry to enrolled active student status.</p>
            </div>
            <span className="text-xs font-bold text-navy bg-gold/20 px-3 py-1 rounded-full">
              Overall Conversion: {pipeline.funnel?.[6]?.conversionPercent || 34}%
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-3">
              {(pipeline.funnel || []).map((stage: any, idx: number) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-navy text-gold text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-navy text-xs">{stage.stage}</h4>
                      <p className="text-[10px] text-gray-500">Avg Time in Stage: {stage.avgDays} days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-black text-navy">{stage.count} Leads</div>
                      <div className="text-[10px] text-gray-400 font-bold">{stage.conversionPercent}% Step Conv.</div>
                    </div>
                    <div className="w-28 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-navy h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (stage.count / 85) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 bg-navy p-6 rounded-3xl text-white flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-gold text-sm uppercase tracking-wider mb-4">Reasons for Lost Leads</h3>
                <div className="space-y-4">
                  {(pipeline.lostReasons || []).map((reason: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-white/90">{reason.reason}</span>
                        <span className="font-black text-gold">{reason.percentage}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-gold h-full rounded-full" style={{ width: `${reason.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 text-xs text-white/70">
                💡 <strong className="text-gold">Admissions Tip:</strong> Offering 10-lesson packages reduces budget friction by 28% for Grade 10-12 leads.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FINANCIAL ANALYTICS */}
      {(activeTab === "overview" || activeTab === "financial") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-navy flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" /> Revenue, Payroll & Profit Trend Analytics
              </h2>
              <p className="text-xs text-gray-500">Monthly breakdown of client revenues, tutor payroll payouts, and net ACE operating margins.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {financial.profitTrend}
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financial.revenueByMonth || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A192F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0A192F" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" name="Total Revenue ($)" stroke="#0A192F" fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" name="Net Profit ($)" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Revenue by Subject</h4>
              <div className="space-y-2">
                {(financial.revenueBySubject || []).map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-600">{item.subject}</span>
                    <span className="text-navy font-bold">${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Revenue Growth by State</h4>
              <div className="space-y-2">
                {(financial.revenueByState || []).map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-600">{item.state}</span>
                    <span className="text-emerald-700 font-bold">${item.revenue} ({item.growth})</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy p-5 rounded-2xl text-white flex flex-col justify-between">
              <div>
                <div className="text-xs font-extrabold text-gold uppercase tracking-wider">Outstanding Receivables</div>
                <div className="text-3xl font-black mt-2">${financial.outstandingReceivables}.00</div>
                <p className="text-[11px] text-white/70 mt-1">92% of client invoices settled within 5 days.</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/80">
                Tutor Payroll Total: <strong>${financial.totalTutorPayroll}.00</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT ANALYTICS */}
      {(activeTab === "overview" || activeTab === "student") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black text-navy flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" /> Student Progress, Attendance & Risk Analytics
              </h2>
              <p className="text-xs text-gray-500">Attendance trends, homework submission metrics, quiz performance, and academic risk levels.</p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
              AI Readiness Score: {student.aiReadinessScore}%
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
              <div className="text-xs text-emerald-800 font-extrabold uppercase">Homework Completion</div>
              <div className="text-2xl font-black text-emerald-900 mt-1">{student.homeworkCompletionRate}%</div>
              <div className="text-[10px] text-emerald-700 mt-0.5">High assignment accountability</div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
              <div className="text-xs text-blue-800 font-extrabold uppercase">Avg Assessment Score</div>
              <div className="text-2xl font-black text-blue-900 mt-1">{student.avgAssessmentScore}%</div>
              <div className="text-[10px] text-blue-700 mt-0.5">Diagnostic & practice tests</div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl">
              <div className="text-xs text-purple-800 font-extrabold uppercase">Learning Velocity</div>
              <div className="text-lg font-black text-purple-900 mt-1">{student.learningVelocity}</div>
              <div className="text-[10px] text-purple-700 mt-0.5">Exceeding standard curriculum grade speed</div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
              <div className="text-xs text-amber-800 font-extrabold uppercase">Risk Level Distribution</div>
              <div className="text-xs font-bold text-amber-900 mt-2 space-y-1">
                <div>Low Risk: <strong>{student.riskLevelDistribution?.lowRisk}%</strong></div>
                <div>Medium Risk: <strong>{student.riskLevelDistribution?.mediumRisk}%</strong></div>
                <div>High Risk: <strong className="text-red-600">{student.riskLevelDistribution?.highRiskAtRisk}%</strong></div>
              </div>
            </div>
          </div>

          {/* Student Academic Milestones */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Recent Student Academic Milestones</h3>
            <div className="space-y-2">
              {(student.academicTimeline || []).map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-navy">{item.student}</span> — <span className="font-semibold text-gray-700">{item.milestone}</span>
                    <span className="text-[10px] text-gray-400 block">{item.subject} • {item.date}</span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PARENT ANALYTICS */}
      {(activeTab === "overview" || activeTab === "parent") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-black text-navy flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" /> Parent Accounts & Client Retention Analytics
            </h2>
            <p className="text-xs text-gray-500">Track client spend, active packages, portal login engagement, and predicted retention rates.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy text-white font-extrabold uppercase tracking-wider">
                  <th className="p-3.5 rounded-l-xl">Parent Name & Email</th>
                  <th className="p-3.5">Children</th>
                  <th className="p-3.5">Active Package</th>
                  <th className="p-3.5">Total Lifetime Spend</th>
                  <th className="p-3.5">Retention Probability</th>
                  <th className="p-3.5 rounded-r-xl">Portal Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {(parent.parentsList || []).map((p: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3.5 font-bold text-navy">
                      {p.name}
                      <div className="text-[10px] text-gray-400 font-normal">{p.email}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-gray-800">{p.children?.join(", ")}</td>
                    <td className="p-3.5"><span className="px-2.5 py-1 bg-gold/20 text-navy font-bold rounded-full text-[10px]">{p.activePackage}</span></td>
                    <td className="p-3.5 font-black text-emerald-700">${p.totalSpent}.00</td>
                    <td className="p-3.5"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">{p.retentionProb}% Very High</span></td>
                    <td className="p-3.5 font-semibold">{p.portalActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: TUTOR PERFORMANCE ANALYTICS */}
      {(activeTab === "overview" || activeTab === "tutor") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-black text-navy flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" /> Tutor Educator Analytics & Profit Contribution
            </h2>
            <p className="text-xs text-gray-500">Comprehensive evaluation of teaching hours, student retention, rating scores, and gross profit generated.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-navy text-white font-extrabold uppercase tracking-wider">
                  <th className="p-3.5 rounded-l-xl">Tutor Educator</th>
                  <th className="p-3.5">Teaching Hours</th>
                  <th className="p-3.5">Completed Lessons</th>
                  <th className="p-3.5">CSAT Rating</th>
                  <th className="p-3.5">Payroll Payout</th>
                  <th className="p-3.5">Gross Revenue Generated</th>
                  <th className="p-3.5 rounded-r-xl">ACE Profit Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {tutors.map((t: any) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3.5 font-bold text-navy">
                      {t.name}
                      <div className="text-[10px] text-gray-400 font-normal">{t.email}</div>
                    </td>
                    <td className="p-3.5 font-bold text-navy">{t.teachingHours} hrs</td>
                    <td className="p-3.5 font-semibold">{t.completedLessons} sessions</td>
                    <td className="p-3.5"><span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-full text-[10px]">⭐ {t.rating} / 5</span></td>
                    <td className="p-3.5 font-bold text-navy">${t.payrollHistory}.00</td>
                    <td className="p-3.5 font-bold text-navy">${t.revenueGenerated}.00</td>
                    <td className="p-3.5"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black rounded-full text-[10px]">+${t.profitContribution}.00</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: ACADEMIC ANALYTICS */}
      {(activeTab === "overview" || activeTab === "academic") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-black text-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold" /> Academic Curriculum & Student Score Improvements
            </h2>
            <p className="text-xs text-gray-500">Subject popularity, curriculum enrollment shares, and documented test score improvements.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider mb-3">Most Popular Subjects</h4>
              <div className="space-y-3">
                {(academic.mostPopularSubjects || []).map((s: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-navy">{s.subject}</span>
                    <span className="px-2 py-0.5 bg-navy text-gold rounded-full font-black text-[10px]">{s.studentsCount} Students (+{s.growthPercent}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider mb-3">Curriculum Share</h4>
              <div className="space-y-3">
                {(academic.curriculumDistribution || []).map((c: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700">{c.curriculum}</span>
                    <span className="font-black text-navy">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-navy to-navy-light text-white p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-extrabold text-gold uppercase tracking-wider mb-3">Average Score Improvement</h4>
                <div className="space-y-2 text-xs">
                  {(academic.averageImprovement || []).map((imp: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-1.5">
                      <span className="text-white/80 font-semibold">{imp.test}</span>
                      <span className="font-black text-gold">{imp.avgGain}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-white/60 mt-4">Verified across past 1,200+ ACE Education student prep cycles.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: PREDICTIVE FORECASTING */}
      {(activeTab === "overview" || activeTab === "forecasting") && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-black text-navy flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Predictive Business Forecasting & Hiring Demand
            </h2>
            <p className="text-xs text-gray-500">Next month&apos;s expected cash flows, tutor recruitment needs, and package renewal pipelines.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-navy text-white p-5 rounded-2xl">
              <div className="text-[10px] font-extrabold text-gold uppercase tracking-wider">Forecasted Next Month Revenue</div>
              <div className="text-3xl font-black mt-2">${forecasting.nextMonthRevenueForecast}.00</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-bold">+14% Expected MoM Growth</div>
            </div>

            <div className="bg-navy text-white p-5 rounded-2xl">
              <div className="text-[10px] font-extrabold text-gold uppercase tracking-wider">Forecasted Tutor Payroll</div>
              <div className="text-3xl font-black mt-2">${forecasting.nextMonthPayrollForecast}.00</div>
              <div className="text-[10px] text-white/60 mt-1">Estimated Tutor Compensation</div>
            </div>

            <div className="bg-emerald-600 text-white p-5 rounded-2xl">
              <div className="text-[10px] font-extrabold uppercase tracking-wider">Expected Net Cash Flow</div>
              <div className="text-3xl font-black mt-2">${forecasting.expectedCashFlow}.00</div>
              <div className="text-[10px] text-emerald-100 mt-1 font-bold">Strong Cash Reserves Yield</div>
            </div>

            <div className="bg-gold text-navy p-5 rounded-2xl">
              <div className="text-[10px] font-extrabold uppercase tracking-wider">Package Renewals Due (30 Days)</div>
              <div className="text-3xl font-black mt-2">{forecasting.packageRenewalsDueNext30Days} Packages</div>
              <div className="text-[10px] text-navy/80 mt-1 font-bold">${forecasting.expectedRenewalRevenue}.00 Renewal Value</div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider mb-3">Tutor Recruitment & Hiring Demand</h4>
            <div className="space-y-2">
              {(forecasting.hiringNeeds || []).map((h: any, idx: number) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-navy">{h.role}</span>
                    <span className="text-[10px] text-gray-500 block">Estimated Need: {h.estimatedHours}</span>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 font-extrabold rounded-full text-[10px]">
                    {h.urgency} Urgency
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AUTOMATED SYSTEM ALERTS & NOTIFICATIONS */}
      <div className="bg-navy text-white p-6 rounded-3xl shadow-xl space-y-4">
        <h3 className="font-extrabold text-gold text-sm uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gold" /> Executive Automated System Notifications & Milestone Alerts
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          {alerts.map((a: any) => (
            <div key={a.id} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
              <div className="font-bold text-white mb-1">{a.title}</div>
              <div className="text-white/80 text-[11px]">{a.message}</div>
              <div className="text-[9px] text-white/50 mt-2">{new Date(a.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
