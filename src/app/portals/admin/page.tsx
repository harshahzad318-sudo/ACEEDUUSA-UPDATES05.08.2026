"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Video,
  ShieldAlert,
  Brain,
  Search,
  Filter,
  Plus,
  Loader2,
  AlertCircle,
  ExternalLink,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  ChevronDown
} from "lucide-react";

import { OperationsEngineTab } from "@/components/admin/OperationsEngineTab";
import { FinanceEngineAdmin } from "@/components/finance/FinanceEngineAdmin";
import { ExecutiveAnalyticsDashboard } from "@/components/analytics/ExecutiveAnalyticsDashboard";

interface TutorApplication {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  avatarUrl?: string;
  title?: string;
  bio?: string;
  linkedinUrl?: string;
  totalExperienceYears: number;
  degree?: string;
  major?: string;
  institution?: string;
  graduationYear?: number;
  previousInstitutions?: string;
  onlineExperienceYears: number;
  gradeLevels: string[];
  subjects: string[];
  curriculums: string[];
  learningModes: string[];
  availability: Record<string, string[]>;
  expectedRate: number;
  finalRate: number;
  sellingPrice: number;
  margin: number;
  idType?: string;
  idDocumentUrl?: string;
  identityVerified: boolean;
  resumeUrl?: string;
  certificateUrls: string[];
  demoVideoUrl?: string;
  digitalSignature?: string;
  termsAccepted: boolean;
  status: "draft" | "submitted" | "under_review" | "interview_scheduled" | "interview_completed" | "verification_pending" | "approved" | "rejected" | "suspended" | "inactive";
  interviewScheduledAt?: string;
  interviewNotes?: string;
  internalRemarks?: string;
  verificationChecklist: {
    idVerified: boolean;
    bgCheckPassed: boolean;
    educationVerified: boolean;
    demoVideoApproved: boolean;
  };
  aiSummary?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800 border-blue-200" },
  under_review: { label: "Under Review", color: "bg-purple-100 text-purple-800 border-purple-200" },
  interview_scheduled: { label: "Interview Scheduled", color: "bg-amber-100 text-amber-800 border-amber-200" },
  interview_completed: { label: "Interview Completed", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  verification_pending: { label: "Verification Pending", color: "bg-orange-100 text-orange-800 border-orange-200" },
  approved: { label: "Approved (Active)", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
  suspended: { label: "Suspended", color: "bg-gray-100 text-gray-800 border-gray-200" },
  inactive: { label: "Inactive / Archived", color: "bg-gray-100 text-gray-600 border-gray-200" },
};

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<"analytics" | "recruitment" | "assignments" | "financials" | "operations">("analytics");
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<TutorApplication | null>(null);

  // Edit / Form states for selected application
  const [aiLoading, setAiLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [internalRemarks, setInternalRemarks] = useState("");
  const [finalRate, setFinalRate] = useState<number>(45);
  const [sellingPrice, setSellingPrice] = useState<number>(85);
  const [checklist, setChecklist] = useState({
    idVerified: false,
    bgCheckPassed: false,
    educationVerified: false,
    demoVideoApproved: false,
  });

  // Assignment Modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({
    tutorId: 0,
    studentName: "",
    parentName: "",
    parentEmail: "",
    subject: "",
    gradeLevel: "High School (11th Grade)",
    learningMode: "Online",
    tutorRate: 45,
    parentPrice: 85,
    notes: "",
  });
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`/api/admin/recruitment?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.tutors || []);
      }
    } catch (e) {
      console.error("Failed fetching applications", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/admin/recruitment?status=${statusFilter}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setApplications(data.tutors || []);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [statusFilter]);

  const selectTutorDetails = (tutor: TutorApplication) => {
    setSelectedTutor(tutor);
    setInterviewDate(tutor.interviewScheduledAt ? tutor.interviewScheduledAt.slice(0, 16) : "");
    setInterviewNotes(tutor.interviewNotes || "");
    setInternalRemarks(tutor.internalRemarks || "");
    setFinalRate(tutor.finalRate || tutor.expectedRate || 45);
    setSellingPrice(tutor.sellingPrice || Math.round((tutor.finalRate || 45) * 1.85));
    setChecklist(tutor.verificationChecklist || {
      idVerified: false,
      bgCheckPassed: false,
      educationVerified: false,
      demoVideoApproved: false,
    });
  };

  const generateAiSummary = async () => {
    if (!selectedTutor) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/admin/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutor: selectedTutor }),
      });
      const data = await res.json();
      if (data.success && data.aiSummary) {
        setSelectedTutor((prev) => (prev ? { ...prev, aiSummary: data.aiSummary } : null));
      }
    } catch (e) {
      console.error("AI summary error", e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: TutorApplication["status"]) => {
    if (!selectedTutor) return;
    setSaveLoading(true);
    try {
      const res = await fetch("/api/admin/recruitment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutorId: selectedTutor.id,
          status: newStatus,
          interviewScheduledAt: interviewDate || undefined,
          interviewNotes,
          internalRemarks,
          verificationChecklist: checklist,
          finalRate,
          sellingPrice,
          aiSummary: selectedTutor.aiSummary,
        }),
      });
      const data = await res.json();
      if (data.success && data.tutor) {
        setSelectedTutor(data.tutor);
        fetchApplications();
      }
    } catch (e) {
      console.error("Update status error", e);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSaveDetails = async () => {
    if (!selectedTutor) return;
    await handleUpdateStatus(selectedTutor.status);
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssignLoading(true);
    setAssignSuccess(null);
    try {
      const res = await fetch("/api/admin/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignForm),
      });
      const data = await res.json();
      if (data.success) {
        setAssignSuccess(`Tutor assigned successfully! Notification sent to ${assignForm.parentEmail}.`);
        setTimeout(() => {
          setShowAssignModal(false);
          setAssignSuccess(null);
        }, 2000);
      }
    } catch (e) {
      console.error("Assignment error", e);
    } finally {
      setAssignLoading(false);
    }
  };

  const filteredTutors = applications.filter((t) => {
    const matchesSearch =
      t.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.subjects || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <>
      <section className="bg-navy py-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest">Admin Administration</span>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Tutor Recruitment & Operations</h1>
              <p className="text-white/60 text-sm mt-1">
                Manage tutor applications, document verification, interview workflows, rates, and margin tracking.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/tutors/apply" target="_blank" className="bg-gold text-navy font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-gold-dark transition-all">
                <Plus className="w-4 h-4" /> Application Form
              </Link>
            </div>
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex gap-2 mt-8 border-b border-white/10 pb-1">
            {[
              { id: "analytics", label: "Executive Analytics & BI", icon: TrendingUp },
              { id: "operations", label: "Scheduling & Operations Engine", icon: Calendar },
              { id: "recruitment", label: "Tutor Applications & Recruitment", icon: Users },
              { id: "assignments", label: "Student Assignments", icon: UserPlus },
              { id: "financials", label: "Rates & ACE Margins", icon: DollarSign },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold transition-all cursor-pointer ${
                    active ? "bg-white text-navy shadow-lg" : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 bg-bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === "recruitment" && (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column: Applications Table / List */}
              <div className={`${selectedTutor ? "lg:col-span-5" : "lg:col-span-12"} space-y-6 transition-all`}>
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="Search candidates or subjects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-xs focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none text-gray-700"
                      >
                        <option value="all">All Statuses</option>
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="interview_scheduled">Interview Scheduled</option>
                        <option value="interview_completed">Interview Completed</option>
                        <option value="verification_pending">Verification Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div className="py-12 text-center text-gray-400">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-navy" /> Loading applications...
                    </div>
                  ) : filteredTutors.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 text-sm">No tutor applications match your criteria.</div>
                  ) : (
                    <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
                      {filteredTutors.map((tutor) => {
                        const isSelected = selectedTutor?.id === tutor.id;
                        const badge = STATUS_BADGES[tutor.status] || { label: tutor.status, color: "bg-gray-100 text-gray-700" };
                        return (
                          <div
                            key={tutor.id}
                            onClick={() => selectTutorDetails(tutor)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                              isSelected ? "bg-navy/5 border-gold shadow-md" : "bg-white border-gray-100 hover:border-gold/30 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <img
                                  src={tutor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                                  alt={tutor.fullName}
                                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                  <h3 className="font-bold text-navy text-sm">{tutor.fullName}</h3>
                                  <p className="text-[11px] text-gray-500">{tutor.title || `${tutor.degree} in ${tutor.major}`}</p>
                                </div>
                              </div>
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-gray-600 border-t border-gray-100 pt-2">
                              <div><strong>Exp:</strong> {tutor.totalExperienceYears} yrs ({tutor.onlineExperienceYears} yrs online)</div>
                              <div><strong>Expected Rate:</strong> ${tutor.expectedRate}/hr</div>
                              <div className="col-span-2 truncate"><strong>Subjects:</strong> {(tutor.subjects || []).join(", ")}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Selected Application Inspection & Recruitment Suite */}
              {selectedTutor && (
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedTutor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                          alt={selectedTutor.fullName}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-gold shadow-sm"
                        />
                        <div>
                          <h2 className="text-2xl font-extrabold text-navy">{selectedTutor.fullName}</h2>
                          <p className="text-xs text-gray-500">{selectedTutor.email} • {selectedTutor.phone}</p>
                          <p className="text-xs font-semibold text-navy mt-0.5">{selectedTutor.city}, {selectedTutor.state}, {selectedTutor.country}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-right">
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Application Status</label>
                          <select
                            value={selectedTutor.status}
                            onChange={(e) => handleUpdateStatus(e.target.value as any)}
                            className="border-2 border-gold rounded-xl px-3 py-1.5 text-xs font-bold text-navy bg-gold/10 focus:outline-none cursor-pointer"
                          >
                            <option value="submitted">Submitted</option>
                            <option value="under_review">Under Review</option>
                            <option value="interview_scheduled">Interview Scheduled</option>
                            <option value="interview_completed">Interview Completed</option>
                            <option value="verification_pending">Verification Pending</option>
                            <option value="approved">Approved (Active)</option>
                            <option value="rejected">Rejected</option>
                            <option value="suspended">Suspended</option>
                            <option value="inactive">Inactive / Archived</option>
                          </select>
                        </div>

                        <button
                          onClick={() => {
                            setAssignForm((prev) => ({
                              ...prev,
                              tutorId: selectedTutor.id,
                              tutorRate: selectedTutor.finalRate || 45,
                              parentPrice: selectedTutor.sellingPrice || 85,
                              subject: selectedTutor.subjects[0] || "Math",
                            }));
                            setShowAssignModal(true);
                          }}
                          className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 ml-auto transition-all"
                        >
                          <UserPlus className="w-3.5 h-3.5" /> Assign to Student
                        </button>
                      </div>
                    </div>

                    {/* AI Candidate Summary Section */}
                    <div className="my-6 p-5 bg-navy/5 rounded-2xl border border-navy/10 relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-navy flex items-center gap-1.5 uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-gold" /> AI Executive Candidate Evaluation
                        </span>
                        <button
                          onClick={generateAiSummary}
                          disabled={aiLoading}
                          className="text-[11px] font-bold text-navy hover:text-gold bg-white px-3 py-1 rounded-lg border border-navy/20 shadow-sm flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Re-generate AI Summary"}
                        </button>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed italic">
                        {selectedTutor.aiSummary || "Click 'Re-generate AI Summary' to run Gemini candidate evaluation on resume, experience, and academic fit."}
                      </p>
                    </div>

                    {/* Tabbed Info View */}
                    <div className="grid sm:grid-cols-2 gap-6 text-xs text-gray-700 my-6 border-b border-gray-100 pb-6">
                      <div className="space-y-2">
                        <h4 className="font-bold text-navy text-xs uppercase tracking-wider border-b pb-1">Education & Credentials</h4>
                        <div><strong>Degree:</strong> {selectedTutor.degree} in {selectedTutor.major}</div>
                        <div><strong>University:</strong> {selectedTutor.institution} ({selectedTutor.graduationYear})</div>
                        <div><strong>Experience:</strong> {selectedTutor.totalExperienceYears} yrs ({selectedTutor.onlineExperienceYears} yrs online)</div>
                        <div><strong>Previous Schools:</strong> {selectedTutor.previousInstitutions || "N/A"}</div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-navy text-xs uppercase tracking-wider border-b pb-1">Subjects & Preferences</h4>
                        <div><strong>Subjects:</strong> {(selectedTutor.subjects || []).join(", ")}</div>
                        <div><strong>Curriculums:</strong> {(selectedTutor.curriculums || []).join(", ")}</div>
                        <div><strong>Modes:</strong> {(selectedTutor.learningModes || []).join(", ")}</div>
                        <div><strong>Grade Levels:</strong> {(selectedTutor.gradeLevels || []).join(", ")}</div>
                      </div>
                    </div>

                    {/* Document Review Links */}
                    <div className="mb-6 space-y-2">
                      <h4 className="font-bold text-navy text-xs uppercase tracking-wider">Uploaded Documents & Verification</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTutor.idDocumentUrl && (
                          <a href={selectedTutor.idDocumentUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gold hover:text-navy text-gray-800 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" /> ID ({selectedTutor.idType}) <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {selectedTutor.resumeUrl && (
                          <a href={selectedTutor.resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gold hover:text-navy text-gray-800 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" /> Resume / CV <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {(selectedTutor.certificateUrls || []).map((cert, idx) => (
                          <a key={idx} href={cert} target="_blank" rel="noopener noreferrer" className="bg-gray-100 hover:bg-gold hover:text-navy text-gray-800 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" /> Certificate #{idx + 1} <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                        {selectedTutor.demoVideoUrl && (
                          <a href={selectedTutor.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" /> Teaching Demo Video <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Verification Checklist */}
                    <div className="my-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-3">Verification Checklist</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {[
                          { key: "idVerified", label: "Identity Verified" },
                          { key: "bgCheckPassed", label: "Background Check Passed" },
                          { key: "educationVerified", label: "Degree & Education Verified" },
                          { key: "demoVideoApproved", label: "Teaching Demo Video Approved" },
                        ].map((chk) => (
                          <label key={chk.key} className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700">
                            <input
                              type="checkbox"
                              checked={(checklist as any)[chk.key]}
                              onChange={(e) => setChecklist((prev) => ({ ...prev, [chk.key]: e.target.checked }))}
                              className="rounded text-navy focus:ring-gold"
                            />
                            {chk.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Interview Scheduling & Notes */}
                    <div className="my-6 grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-navy uppercase mb-1">Schedule Interview Date/Time</label>
                        <input
                          type="datetime-local"
                          value={interviewDate}
                          onChange={(e) => setInterviewDate(e.target.value)}
                          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-navy uppercase mb-1">Interview Notes</label>
                        <textarea
                          rows={2}
                          value={interviewNotes}
                          onChange={(e) => setInterviewNotes(e.target.value)}
                          placeholder="Candidate subject knowledge, communication style..."
                          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Financial Rates & Margin Tracking */}
                    <div className="my-6 p-5 bg-gold/10 rounded-2xl border border-gold/30">
                      <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-navy" /> Financial Rates & ACE Profit Margin
                      </h4>

                      <div className="grid sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <label className="block text-gray-600 font-semibold mb-1">Candidate Expected Rate</label>
                          <div className="text-base font-extrabold text-navy">${selectedTutor.expectedRate}/hr</div>
                        </div>

                        <div>
                          <label className="block text-gray-600 font-semibold mb-1">Final Tutor Compensation Rate ($/hr)</label>
                          <input
                            type="number"
                            value={finalRate}
                            onChange={(e) => setFinalRate(Number(e.target.value))}
                            className="w-full border-2 border-gold rounded-xl px-3 py-1.5 text-sm font-bold text-navy bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 font-semibold mb-1">Parent Selling Price ($/hr)</label>
                          <input
                            type="number"
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(Number(e.target.value))}
                            className="w-full border-2 border-gold rounded-xl px-3 py-1.5 text-sm font-bold text-navy bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gold/30 flex items-center justify-between text-xs">
                        <span className="font-bold text-navy">Calculated ACE Margin:</span>
                        <span className="text-base font-black text-navy">
                          ${sellingPrice - finalRate}/hr ({sellingPrice > 0 ? Math.round(((sellingPrice - finalRate) / sellingPrice) * 100) : 0}% margin)
                        </span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        onClick={handleSaveDetails}
                        disabled={saveLoading}
                        className="bg-navy hover:bg-navy-light text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-gold" />}
                        Save Recruitment Record
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-navy">Active Tutor Assignments</h2>
                  <p className="text-xs text-gray-500">Matches between approved tutors and registered students.</p>
                </div>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="bg-navy hover:bg-navy-light text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Create New Assignment
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-navy/5 text-navy font-bold uppercase tracking-wider border-b border-navy/10">
                      <th className="p-3.5">Student & Parent</th>
                      <th className="p-3.5">Subject</th>
                      <th className="p-3.5">Tutor</th>
                      <th className="p-3.5">Tutor Rate</th>
                      <th className="p-3.5">Parent Price</th>
                      <th className="p-3.5">ACE Margin</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {applications.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="p-3.5 font-bold text-navy">Ethan Harrison<div className="text-[10px] text-gray-400 font-normal">Marcus Harrison (marcus.h@example.com)</div></td>
                        <td className="p-3.5">AP Calculus BC</td>
                        <td className="p-3.5 font-semibold">{t.fullName}</td>
                        <td className="p-3.5">${t.finalRate || 45}/hr</td>
                        <td className="p-3.5">${t.sellingPrice || 85}/hr</td>
                        <td className="p-3.5 font-bold text-green-700">${(t.sellingPrice || 85) - (t.finalRate || 45)}/hr</td>
                        <td className="p-3.5"><span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">Active / Accepted</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "analytics" && <ExecutiveAnalyticsDashboard />}

          {activeTab === "financials" && <FinanceEngineAdmin />}

          {activeTab === "operations" && <OperationsEngineTab />}
        </div>
      </section>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-navy mb-4">Assign Tutor to Student</h3>

            {assignSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold">
                {assignSuccess}
              </div>
            )}

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Select Approved Tutor</label>
                <select
                  value={assignForm.tutorId}
                  onChange={(e) => setAssignForm((prev) => ({ ...prev, tutorId: Number(e.target.value) }))}
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:border-gold focus:outline-none"
                  required
                >
                  <option value={0}>Select a Tutor</option>
                  {applications.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.fullName} (${t.finalRate || 45}/hr) - {t.subjects.slice(0, 2).join(", ")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Student Name</label>
                  <input
                    type="text"
                    value={assignForm.studentName}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, studentName: e.target.value }))}
                    placeholder="Ethan Harrison"
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={assignForm.parentName}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, parentName: e.target.value }))}
                    placeholder="Marcus Harrison"
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Parent Email</label>
                <input
                  type="email"
                  value={assignForm.parentEmail}
                  onChange={(e) => setAssignForm((prev) => ({ ...prev, parentEmail: e.target.value }))}
                  placeholder="marcus.h@example.com"
                  className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Subject</label>
                  <input
                    type="text"
                    value={assignForm.subject}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="AP Calculus BC"
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Parent Price ($/hr)</label>
                  <input
                    type="number"
                    value={assignForm.parentPrice}
                    onChange={(e) => setAssignForm((prev) => ({ ...prev, parentPrice: Number(e.target.value) }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assignLoading}
                  className="bg-gold text-navy font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-gold-dark flex items-center gap-2"
                >
                  {assignLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Assign & Notify Tutor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
