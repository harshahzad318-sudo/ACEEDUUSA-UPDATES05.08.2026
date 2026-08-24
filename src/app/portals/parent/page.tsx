"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ParentBillingCenter } from "@/components/finance/ParentBillingCenter";
import {
  BarChart3,
  Users,
  UserPlus,
  Calendar,
  BookOpen,
  MessageSquare,
  CreditCard,
  Bell,
  Clock,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Video,
  Send,
  Loader2,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  Heart,
  PhoneCall,
  X
} from "lucide-react";

interface ParentDashboardData {
  parentEmail: string;
  children: any[];
  tutorRequests: any[];
  activeTutorsCount: number;
  assignedTutors: any[];
  upcomingLessons: any[];
  recentSummaries: any[];
  structuredLessonRecords?: any[];
  homeworkDue: any[];
  notifications: any[];
  unreadNotificationsCount: number;
  pendingInvoices: any[];
  totalOutstanding: number;
}

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "students", label: "Children & Students", icon: Users },
  { id: "request-tutor", label: "Request a Tutor", icon: UserPlus },
  { id: "my-tutors", label: "My Active Tutors", icon: GraduationCap },
  { id: "lessons", label: "Lesson History & Summaries", icon: Calendar },
  { id: "billing", label: "Invoices & Payments", icon: CreditCard },
  { id: "messages", label: "Internal Messages", icon: MessageSquare },
  { id: "notifications", label: "Notification Center", icon: Bell },
];

export default function ParentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState<ParentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStructuredRecord, setSelectedStructuredRecord] = useState<any>(null);

  // Student CRUD state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [studentForm, setStudentForm] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "Male",
    schoolName: "",
    gradeLevel: "9th Grade",
    curriculum: "AP",
    subjects: ["AP Calculus BC"],
    learningGoals: "",
    medicalNotes: "",
    learningDifficulties: "",
    preferredTutorGender: "No Preference",
    preferredTeachingMode: "Online",
    preferredLanguage: "English",
    emergencyContact: "",
    parentNotes: "",
  });
  const [studentSubmitting, setStudentSubmitting] = useState(false);

  // Tutor Request State
  const [requestForm, setRequestForm] = useState({
    studentId: "",
    studentName: "",
    subject: "AP Calculus BC",
    curriculum: "AP",
    gradeLevel: "11th Grade",
    learningMode: "Online",
    preferredDays: ["Monday", "Wednesday"],
    preferredTimes: "16:00 - 18:00 EST",
    budget: 85,
    learningGoals: "",
    preferredTutorGender: "No Preference",
    preferredLanguage: "English",
    additionalNotes: "",
  });
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<any>(null);

  // Messaging State
  const [messages, setMessages] = useState<any[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [messagingReceiver, setMessagingReceiver] = useState({
    email: "info@aceeducation.us",
    name: "ACE Academic Advisory",
    role: "admin",
  });

  // Fetch Parent Data
  const fetchParentData = async () => {
    try {
      const [dashRes, msgRes] = await Promise.all([
        fetch("/api/parent/dashboard"),
        fetch("/api/parent/messages"),
      ]);
      const dashJson = await dashRes.json();
      const msgJson = await msgRes.json();

      if (dashJson.success) {
        setData(dashJson.data);
      }
      if (msgJson.success) {
        setMessages(msgJson.messages || []);
      }
    } catch (e) {
      console.error("Parent Portal data error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [dashRes, msgRes] = await Promise.all([
          fetch("/api/parent/dashboard"),
          fetch("/api/parent/messages"),
        ]);
        const dashJson = await dashRes.json();
        const msgJson = await msgRes.json();

        if (!active) return;

        if (dashJson.success) {
          setData(dashJson.data);
        }
        if (msgJson.success) {
          setMessages(msgJson.messages || []);
        }
      } catch (e) {
        console.error("Parent Portal data error:", e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Handle Student Submit (Create/Update)
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStudentSubmitting(true);
    try {
      const method = editingStudentId ? "PUT" : "POST";
      const payload = editingStudentId
        ? { id: editingStudentId, ...studentForm }
        : studentForm;

      const res = await fetch("/api/parent/students", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setShowStudentModal(false);
        setEditingStudentId(null);
        resetStudentForm();
        fetchParentData();
      }
    } catch (e) {
      console.error("Student save error:", e);
    } finally {
      setStudentSubmitting(false);
    }
  };

  // Archive / Soft Delete Student
  const handleArchiveStudent = async (studentId: number, name: string) => {
    if (!confirm(`Are you sure you want to archive ${name}'s profile?`)) return;
    try {
      const res = await fetch(`/api/parent/students?id=${studentId}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchParentData();
      }
    } catch (e) {
      console.error("Archive error:", e);
    }
  };

  const editStudent = (student: any) => {
    setEditingStudentId(student.id);
    setStudentForm({
      fullName: student.fullName || "",
      email: student.email || "",
      dateOfBirth: student.dateOfBirth || "",
      gender: student.gender || "Male",
      schoolName: student.schoolName || "",
      gradeLevel: student.gradeLevel || "9th Grade",
      curriculum: student.curriculum || "AP",
      subjects: student.subjects || [],
      learningGoals: student.learningGoals || "",
      medicalNotes: student.medicalNotes || "",
      learningDifficulties: student.learningDifficulties || "",
      preferredTutorGender: student.preferredTutorGender || "No Preference",
      preferredTeachingMode: student.preferredTeachingMode || "Online",
      preferredLanguage: student.preferredLanguage || "English",
      emergencyContact: student.emergencyContact || "",
      parentNotes: student.parentNotes || "",
    });
    setShowStudentModal(true);
  };

  const resetStudentForm = () => {
    setStudentForm({
      fullName: "",
      email: "",
      dateOfBirth: "",
      gender: "Male",
      schoolName: "",
      gradeLevel: "9th Grade",
      curriculum: "AP",
      subjects: ["AP Calculus BC"],
      learningGoals: "",
      medicalNotes: "",
      learningDifficulties: "",
      preferredTutorGender: "No Preference",
      preferredTeachingMode: "Online",
      preferredLanguage: "English",
      emergencyContact: "",
      parentNotes: "",
    });
  };

  // Handle Tutor Request Submit
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitting(true);
    setRequestSuccess(null);
    try {
      const selectedStudent = data?.children.find((c) => String(c.id) === requestForm.studentId);
      const studentName = selectedStudent ? selectedStudent.fullName : requestForm.studentName || "Student";

      const res = await fetch("/api/parent/tutor-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...requestForm,
          studentName,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRequestSuccess(json.request);
        fetchParentData();
      }
    } catch (e) {
      console.error("Tutor request error:", e);
    } finally {
      setRequestSubmitting(false);
    }
  };

  // Handle Pay Invoice
  const handlePayInvoice = async (invoiceId: number) => {
    try {
      const res = await fetch("/api/parent/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });
      const json = await res.json();
      if (json.success) {
        fetchParentData();
      }
    } catch (e) {
      console.error("Invoice payment error:", e);
    }
  };

  // Send Internal Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.trim()) return;
    try {
      const res = await fetch("/api/parent/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverEmail: messagingReceiver.email,
          receiverName: messagingReceiver.name,
          receiverRole: messagingReceiver.role,
          subject: "Parent Inquiry",
          content: messageContent,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setMessageContent("");
        fetchParentData();
      }
    } catch (e) {
      console.error("Message send error:", e);
    }
  };

  // Mark Notification Read
  const handleMarkNotificationRead = async (notifId: number) => {
    try {
      await fetch("/api/parent/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: notifId }),
      });
      fetchParentData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="bg-bg-light min-h-screen py-20 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-navy mx-auto mb-3" />
        <p className="text-gray-500 font-bold text-sm">Loading Parent & Family Management System...</p>
      </div>
    );
  }

  return (
    <>
      {/* Parent Portal Banner Header */}
      <section className="bg-navy py-12 text-white border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest">PARENT & FAMILY PORTAL</span>
              <h1 className="text-2xl md:text-4xl font-extrabold mt-1">Welcome, Marcus Harrison</h1>
              <p className="text-white/70 text-xs md:text-sm mt-1">
                ACE Family ID: <span className="font-mono text-gold font-bold">FAM-82019</span> • Managing {data?.children.length || 0} Enrolled Children
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditingStudentId(null);
                  resetStudentForm();
                  setShowStudentModal(true);
                }}
                className="bg-gold hover:bg-gold-dark text-navy font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Child Profile
              </button>
              <button
                onClick={() => setActiveTab("request-tutor")}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
              >
                <UserPlus className="w-4 h-4 text-gold" /> Request a Tutor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-10 bg-bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-4 border border-gray-100 sticky top-24">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-3 block mb-2 font-mono">
                PARENT NAVIGATION
              </span>
              <nav className="space-y-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        active ? "bg-navy text-gold shadow-md" : "text-gray-600 hover:bg-navy/5 hover:text-navy"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.id === "notifications" && (data?.unreadNotificationsCount || 0) > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          {data?.unreadNotificationsCount}
                        </span>
                      )}
                      {tab.id === "billing" && (data?.pendingInvoices.length || 0) > 0 && (
                        <span className="bg-gold text-navy text-[10px] font-black px-2 py-0.5 rounded-full">
                          ${data?.totalOutstanding}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Main Content Panel */}
          <div className="lg:col-span-9 space-y-6">
            {/* ======================================================== */}
            {/* TAB 1: DASHBOARD */}
            {/* ======================================================== */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* Welcome & Overview Widget */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-navy">Family Progress Summary</h2>
                      <p className="text-xs text-gray-500 mt-1">Live database synchronization across tutors, lessons, and requests.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> All Services Active
                      </span>
                    </div>
                  </div>

                  {/* Top KPI Metrics Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-bg-light rounded-2xl p-4 border border-gray-100">
                      <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Children Enrolled</div>
                      <div className="text-2xl font-black text-navy mt-1">{data?.children.length || 0}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">Active profiles</div>
                    </div>
                    <div className="bg-bg-light rounded-2xl p-4 border border-gray-100">
                      <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Active Tutors</div>
                      <div className="text-2xl font-black text-navy mt-1">{data?.activeTutorsCount || 0}</div>
                      <div className="text-[10px] text-emerald-600 mt-0.5 font-bold">Matched by ACE</div>
                    </div>
                    <div className="bg-bg-light rounded-2xl p-4 border border-gray-100">
                      <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Pending Requests</div>
                      <div className="text-2xl font-black text-gold mt-1">{data?.tutorRequests.filter(r => r.status !== "Completed").length || 0}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">In AI Matching / Review</div>
                    </div>
                    <div className="bg-bg-light rounded-2xl p-4 border border-gray-100">
                      <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Outstanding Invoice</div>
                      <div className="text-2xl font-black text-navy mt-1">${data?.totalOutstanding.toFixed(2)}</div>
                      <div className="text-[10px] text-gold font-bold mt-0.5">
                        {data?.pendingInvoices.length ? `${data.pendingInvoices.length} Pending Invoice` : "All paid"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="bg-navy rounded-3xl p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-extrabold text-base flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold" /> Quick Actions
                    </h3>
                    <p className="text-xs text-white/70 mt-0.5">Need a specialized subject tutor or profile edit?</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setActiveTab("request-tutor")}
                      className="bg-gold hover:bg-gold-dark text-navy font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Request New Tutor
                    </button>
                    <button
                      onClick={() => {
                        setEditingStudentId(null);
                        resetStudentForm();
                        setShowStudentModal(true);
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Student
                    </button>
                    <button
                      onClick={() => setActiveTab("messages")}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Message Support
                    </button>
                  </div>
                </div>

                {/* Grid: Children Profiles & Upcoming Lessons */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Children Enrolled List */}
                  <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-navy text-base flex items-center gap-2">
                        <Users className="w-4 h-4 text-gold" /> Enrolled Children
                      </h3>
                      <button
                        onClick={() => setActiveTab("students")}
                        className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 cursor-pointer"
                      >
                        Manage All <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {data?.children.map((child) => (
                        <div key={child.id} className="p-4 rounded-2xl border border-gray-100 bg-bg-light flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={child.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"}
                              alt={child.fullName}
                              className="w-12 h-12 rounded-2xl object-cover border border-gold/30"
                            />
                            <div>
                              <h4 className="font-extrabold text-navy text-sm">{child.fullName}</h4>
                              <p className="text-xs text-gray-500">{child.gradeLevel} • {child.schoolName}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {(child.subjects || []).map((s: string) => (
                                  <span key={s} className="bg-navy/10 text-navy font-bold text-[10px] px-2 py-0.5 rounded-md">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => editStudent(child)}
                            className="p-2 rounded-xl text-gray-400 hover:text-navy hover:bg-white transition-all cursor-pointer"
                            title="Edit Profile"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Lessons */}
                  <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-navy text-base flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" /> Upcoming Lessons
                      </h3>
                      <button
                        onClick={() => setActiveTab("lessons")}
                        className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 cursor-pointer"
                      >
                        Full Schedule <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {data?.upcomingLessons && data.upcomingLessons.length > 0 ? (
                      <div className="space-y-3">
                        {data.upcomingLessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 rounded-2xl border border-gray-100 bg-bg-light space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-gold bg-navy px-2.5 py-0.5 rounded-full uppercase">
                                {lesson.subject}
                              </span>
                              <span className="text-xs font-semibold text-gray-500">
                                {new Date(lesson.startTime).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                              </span>
                            </div>
                            <h4 className="font-extrabold text-navy text-sm">Student: {lesson.studentName}</h4>
                            {lesson.meetingUrl && (
                              <a
                                href={lesson.meetingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-navy text-white font-bold px-3 py-1.5 rounded-xl text-xs hover:bg-navy-light transition-all"
                              >
                                <Video className="w-3.5 h-3.5 text-gold" /> Launch Classroom
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400 text-xs bg-bg-light rounded-2xl">
                        No upcoming sessions scheduled right now.
                      </div>
                    )}
                  </div>
                </div>

                {/* Grid: Pending Tutor Requests & Homework Due */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pending Requests & AI Lifecycle Status */}
                  <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-extrabold text-navy text-base flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold" /> Tutoring Request Lifecycles
                      </h3>
                      <button
                        onClick={() => setActiveTab("request-tutor")}
                        className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1 cursor-pointer"
                      >
                        New Request <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {data?.tutorRequests.map((req) => (
                        <div key={req.id} className="p-4 rounded-2xl border border-gold/20 bg-gold/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-navy text-sm">{req.studentName} - {req.subject}</span>
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-navy text-gold">
                              {req.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">Budget: ${req.budget}/hr • Mode: {req.learningMode}</p>
                          
                          {req.aiRecommendations && req.aiRecommendations.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gold/20">
                              <span className="text-[10px] font-bold text-navy uppercase tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-gold" /> AI Match Recommendation:
                              </span>
                              <p className="text-xs text-navy font-semibold mt-0.5">
                                {req.aiRecommendations[0].fullName} ({req.aiRecommendations[0].matchScore}% Match Score)
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Homework Due & Lesson Summaries */}
                  <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                    <h3 className="font-extrabold text-navy text-base mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gold" /> Assigned Homework & Progress
                    </h3>

                    {data?.homeworkDue && data.homeworkDue.length > 0 ? (
                      <div className="space-y-3">
                        {data.homeworkDue.map((hw) => (
                          <div key={hw.id} className="p-4 rounded-2xl border border-gray-100 bg-bg-light space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-navy text-xs">{hw.studentName} ({hw.subject})</span>
                              <span className="text-[10px] text-gray-400 font-bold">{new Date(hw.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-200 mt-1">
                              {hw.homework}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-8 bg-bg-light rounded-2xl">
                        No pending homework assigned.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: STUDENT MANAGEMENT */}
            {/* ======================================================== */}
            {activeTab === "students" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-navy">Student & Children Management</h2>
                    <p className="text-xs text-gray-500 mt-1">Create, view, edit, and manage educational profiles for your children.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingStudentId(null);
                      resetStudentForm();
                      setShowStudentModal(true);
                    }}
                    className="bg-navy hover:bg-navy-light text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-gold" /> Add New Student Profile
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {data?.children.map((child) => (
                    <div key={child.id} className="p-6 rounded-3xl border border-gray-100 bg-bg-light space-y-4 hover:border-gold/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={child.photoUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"}
                            alt={child.fullName}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-gold/40 shadow-sm"
                          />
                          <div>
                            <h3 className="font-extrabold text-navy text-base">{child.fullName}</h3>
                            <p className="text-xs text-gray-500">{child.gradeLevel} • {child.curriculum}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{child.schoolName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => editStudent(child)}
                            className="p-2 text-navy hover:bg-white rounded-xl transition-all cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleArchiveStudent(child.id, child.fullName)}
                            className="p-2 text-red-500 hover:bg-white rounded-xl transition-all cursor-pointer"
                            title="Archive Profile"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-bold text-navy uppercase text-[10px] tracking-wider">Subjects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(child.subjects || []).map((s: string) => (
                              <span key={s} className="bg-white text-navy font-bold px-2.5 py-1 rounded-lg border border-gray-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {child.learningGoals && (
                          <div>
                            <span className="font-bold text-navy uppercase text-[10px] tracking-wider">Learning Goals:</span>
                            <p className="text-gray-600 bg-white p-3 rounded-xl border border-gray-200 mt-0.5">{child.learningGoals}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-[11px] text-gray-500">
                          <div><strong>Preferred Mode:</strong> {child.preferredTeachingMode || "Online"}</div>
                          <div><strong>Tutor Gender:</strong> {child.preferredTutorGender || "No Preference"}</div>
                          <div><strong>Medical Notes:</strong> {child.medicalNotes || "None"}</div>
                          <div><strong>Emergency:</strong> {child.emergencyContact || "On File"}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: REQUEST A TUTOR */}
            {/* ======================================================== */}
            {activeTab === "request-tutor" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-navy">Request a Specialized Tutor</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Submit tutoring criteria to trigger instant AI tutor matching and connect with ACE Academic Admissions.
                  </p>
                </div>

                {requestSuccess && (
                  <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-3xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Tutoring Request Submitted Successfully!
                    </div>
                    <p className="text-xs text-emerald-700">
                      Request ID: <span className="font-mono font-bold">REQ-{requestSuccess.id}</span> • Status: <span className="font-bold uppercase">{requestSuccess.status}</span>
                    </p>

                    {requestSuccess.aiRecommendations && requestSuccess.aiRecommendations.length > 0 && (
                      <div className="bg-white p-4 rounded-2xl border border-emerald-200 mt-3 space-y-2">
                        <span className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-gold" /> AI Recommended Tutor Matches:
                        </span>
                        {requestSuccess.aiRecommendations.map((rec: any, idx: number) => (
                          <div key={idx} className="text-xs border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                            <span className="font-bold text-navy">{rec.fullName}</span> ({rec.matchScore}% Match Score)
                            <p className="text-[11px] text-gray-500">{rec.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Select Enrolled Student *</label>
                      <select
                        value={requestForm.studentId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const sel = data?.children.find((c) => String(c.id) === val);
                          setRequestForm((prev) => ({
                            ...prev,
                            studentId: val,
                            studentName: sel ? sel.fullName : prev.studentName,
                            gradeLevel: sel ? sel.gradeLevel : prev.gradeLevel,
                            curriculum: sel ? sel.curriculum : prev.curriculum,
                          }));
                        }}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                        required
                      >
                        <option value="">-- Choose Child --</option>
                        {data?.children.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.fullName} ({c.gradeLevel} - {c.schoolName})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Subject Needed *</label>
                      <input
                        type="text"
                        value={requestForm.subject}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, subject: e.target.value }))}
                        placeholder="e.g. AP Physics C, SAT Reading, IB Chemistry"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Curriculum</label>
                      <select
                        value={requestForm.curriculum}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, curriculum: e.target.value }))}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                      >
                        <option value="AP">AP (Advanced Placement)</option>
                        <option value="IB Diploma">IB Diploma</option>
                        <option value="US Common Core">US Common Core</option>
                        <option value="IGCSE / A-Level">IGCSE / A-Level</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Learning Mode</label>
                      <select
                        value={requestForm.learningMode}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, learningMode: e.target.value }))}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                      >
                        <option value="Online">Online 1-on-1</option>
                        <option value="In-Home">In-Home Tutoring</option>
                        <option value="Learning Center">ACE Learning Center</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Hourly Budget ($/hr)</label>
                      <input
                        type="number"
                        value={requestForm.budget}
                        onChange={(e) => setRequestForm((prev) => ({ ...prev, budget: Number(e.target.value) }))}
                        placeholder="75"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1 uppercase">Preferred Days & Time Slots</label>
                    <input
                      type="text"
                      value={requestForm.preferredTimes}
                      onChange={(e) => setRequestForm((prev) => ({ ...prev, preferredTimes: e.target.value }))}
                      placeholder="e.g. Mondays & Wednesdays 4:00 PM - 6:00 PM EST"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1 uppercase">Special Requirements / Goals</label>
                    <textarea
                      rows={3}
                      value={requestForm.additionalNotes}
                      onChange={(e) => setRequestForm((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder="Targeting score of 5 on May AP test, requires patient tutor with STEM degree..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={requestSubmitting}
                    className="bg-gold hover:bg-gold-dark text-navy font-extrabold px-8 py-3.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {requestSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Submit Request & Match Tutor
                  </button>
                </form>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: MY ASSIGNED TUTORS */}
            {/* ======================================================== */}
            {activeTab === "my-tutors" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-navy">Assigned Academic Tutors</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    ACE vetted and verified tutors assigned to your children. Contact info is sanitized for platform compliance.
                  </p>
                </div>

                {data?.assignedTutors && data.assignedTutors.length > 0 ? (
                  <div className="space-y-6">
                    {data.assignedTutors.map(({ tutor, assignment }) => (
                      <div key={tutor.id} className="p-6 rounded-3xl border border-gray-100 bg-bg-light space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={tutor.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                              alt={tutor.fullName}
                              className="w-16 h-16 rounded-2xl object-cover border-2 border-gold shadow-md"
                            />
                            <div>
                              <span className="text-[10px] font-bold text-gold bg-navy px-2.5 py-0.5 rounded-full uppercase">
                                Assigned for {assignment.studentName}
                              </span>
                              <h3 className="font-extrabold text-navy text-lg mt-1">{tutor.fullName}</h3>
                              <p className="text-xs text-gray-500">{tutor.title}</p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{tutor.degree} ({tutor.institution})</p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setMessagingReceiver({
                                email: "a.wright@aceeducation.us",
                                name: tutor.fullName,
                                role: "tutor",
                              });
                              setActiveTab("messages");
                            }}
                            className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-gold" /> Message Tutor
                          </button>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
                          <div>
                            <strong className="text-navy uppercase text-[10px] tracking-wider">Qualifications & Bio:</strong>
                            <p className="text-gray-600 mt-1 leading-relaxed">{tutor.bio}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                            <span className="text-gray-500 font-bold">Assigned Subject:</span>
                            <span className="font-bold text-navy">{assignment.subject}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400 text-xs bg-bg-light rounded-2xl">
                    No active tutors assigned yet. Submit a tutoring request to get matched!
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: LESSON HISTORY & SUMMARIES */}
            {/* ======================================================== */}
            {activeTab === "lessons" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-navy">Lesson History & Structured Records</h2>
                    <p className="text-xs text-gray-500 mt-1">Permanently archived lesson records with AI Revision Summaries, homework, and resources.</p>
                  </div>
                  <div className="text-xs text-navy font-bold bg-gold/10 px-3 py-1.5 rounded-xl border border-gold/30 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-gold" /> Video Recordings Disabled by Default
                  </div>
                </div>

                {data?.structuredLessonRecords && data.structuredLessonRecords.length > 0 ? (
                  <div className="space-y-4">
                    {data.structuredLessonRecords.map((rec: any) => (
                      <div key={rec.id} className="p-6 rounded-3xl border border-gray-100 bg-bg-light space-y-4 hover:border-gold/30 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">
                              {rec.subject}
                            </span>
                            <span className="text-xs text-gray-500 font-semibold">
                              {new Date(rec.startTime).toLocaleDateString()}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                            Attendance: {rec.attendance || "Present"}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="font-extrabold text-navy text-base">Child: {rec.studentName}</h3>
                            <p className="text-xs text-gray-500">Tutor: <strong className="text-navy">{rec.tutorName}</strong></p>
                            <p className="text-xs text-gray-700 leading-relaxed font-medium bg-white p-3 rounded-2xl border border-gray-200">{rec.lessonSummary}</p>
                          </div>

                          {rec.aiGeneratedRevisionSummary && (
                            <div className="bg-navy text-white p-4 rounded-2xl space-y-1.5 border border-gold/30 md:w-80 shrink-0">
                              <div className="text-[10px] font-extrabold text-gold uppercase tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-gold" /> AI Revision Summary
                              </div>
                              <p className="text-[11px] text-white/90 italic leading-relaxed line-clamp-3">
                                {rec.aiGeneratedRevisionSummary}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs text-gray-600">
                            <strong>Homework:</strong> <span className="text-navy font-semibold">{rec.homeworkAssigned || "None"}</span>
                          </div>

                          <button
                            onClick={() => setSelectedStructuredRecord(rec)}
                            className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-gold" /> Review Structured Lesson Record
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 text-center py-12 bg-bg-light rounded-2xl">
                    No completed lesson records archived yet.
                  </p>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 6: INVOICES & BILLING */}
            {/* ======================================================== */}
            {activeTab === "billing" && <ParentBillingCenter parentEmail={data?.parentEmail} />}

            {/* ======================================================== */}
            {/* TAB 7: INTERNAL MESSAGES */}
            {/* ======================================================== */}
            {activeTab === "messages" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-navy">Internal Messaging Center</h2>
                    <p className="text-xs text-gray-500">Secure communication with assigned tutors and ACE Support.</p>
                  </div>
                  <span className="text-xs font-bold text-gold bg-navy px-3 py-1 rounded-full">
                    To: {messagingReceiver.name}
                  </span>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-bg-light rounded-2xl border border-gray-200">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex flex-col ${m.senderRole === "parent" ? "items-end" : "items-start"}`}>
                      <span className="text-[10px] font-bold text-gray-400">{m.senderName} • {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      <div className={`p-3.5 rounded-2xl text-xs max-w-md mt-0.5 ${m.senderRole === "parent" ? "bg-navy text-white" : "bg-white text-navy border border-gray-200"}`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder={`Type message to ${messagingReceiver.name}...`}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                  />
                  <button type="submit" className="bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer">
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 8: NOTIFICATIONS */}
            {/* ======================================================== */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-4">
                <h2 className="text-xl font-extrabold text-navy border-b pb-4">Notification Center</h2>

                <div className="space-y-3">
                  {data?.notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                        notif.read ? "bg-bg-light border-gray-200" : "bg-gold/10 border-gold/40 font-bold"
                      }`}
                    >
                      <div>
                        <h4 className="text-xs font-bold text-navy">{notif.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">{new Date(notif.createdAt).toLocaleString()}</span>
                      </div>

                      {!notif.read && (
                        <button
                          onClick={() => handleMarkNotificationRead(notif.id)}
                          className="text-xs text-navy font-bold hover:text-gold cursor-pointer"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* STUDENT CREATE / EDIT MODAL */}
      {/* ======================================================== */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl my-8 relative">
            <button
              onClick={() => setShowStudentModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-navy hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-navy mb-1">
              {editingStudentId ? "Edit Student Profile" : "Add Child / Student Profile"}
            </h2>
            <p className="text-xs text-gray-500 mb-6">Enter details for educational matching and progress tracking.</p>

            <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">Full Name *</label>
                  <input
                    type="text"
                    value={studentForm.fullName}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Lily Harrison"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">Date of Birth</label>
                  <input
                    type="date"
                    value={studentForm.dateOfBirth}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">Grade Level</label>
                  <input
                    type="text"
                    value={studentForm.gradeLevel}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, gradeLevel: e.target.value }))}
                    placeholder="8th Grade"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">Curriculum</label>
                  <input
                    type="text"
                    value={studentForm.curriculum}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, curriculum: e.target.value }))}
                    placeholder="US Common Core / AP"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">School Name</label>
                  <input
                    type="text"
                    value={studentForm.schoolName}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, schoolName: e.target.value }))}
                    placeholder="Winsor School"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy mb-1 uppercase">Learning Goals & Focus Areas</label>
                <textarea
                  rows={2}
                  value={studentForm.learningGoals}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, learningGoals: e.target.value }))}
                  placeholder="Master algebra word problems and build STEM confidence..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">Medical Notes or Allergies</label>
                  <input
                    type="text"
                    value={studentForm.medicalNotes}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, medicalNotes: e.target.value }))}
                    placeholder="Mild asthma / none"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy mb-1 uppercase">Emergency Contact</label>
                  <input
                    type="text"
                    value={studentForm.emergencyContact}
                    onChange={(e) => setStudentForm((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Marcus Harrison (+1 555-019-2831)"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={studentSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-navy font-extrabold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {studentSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Student Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PARENT VIEW STRUCTURED LESSON RECORD MODAL */}
      {selectedStructuredRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gold/20 w-full max-w-3xl my-8 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-navy p-6 text-white flex items-center justify-between border-b border-gold/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-navy bg-gold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedStructuredRecord.subject}
                  </span>
                  <span className="text-xs text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attendance: {selectedStructuredRecord.attendance || "Present"}
                  </span>
                </div>
                <h2 className="text-xl font-black text-white mt-1">Permanent Structured Lesson Record</h2>
                <p className="text-xs text-white/70">
                  Student: {selectedStructuredRecord.studentName} • Tutor: {selectedStructuredRecord.tutorName}
                </p>
              </div>

              <button
                onClick={() => setSelectedStructuredRecord(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              {/* Date & Meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-bg-light border border-gray-100">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Student</span>
                  <strong className="text-navy text-sm font-black">{selectedStructuredRecord.studentName}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tutor</span>
                  <strong className="text-navy text-sm font-bold">{selectedStructuredRecord.tutorName}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date & Duration</span>
                  <strong className="text-navy font-bold">
                    {new Date(selectedStructuredRecord.startTime).toLocaleDateString()} (1.5 hrs)
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Participation</span>
                  <strong className="text-emerald-700 font-bold">{selectedStructuredRecord.studentParticipation}</strong>
                </div>
              </div>

              {/* AI Generated Revision Summary */}
              {selectedStructuredRecord.aiGeneratedRevisionSummary && (
                <div className="p-5 bg-gradient-to-br from-navy via-navy to-navy-light text-white rounded-2xl border-2 border-gold/40 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-gold" /> AI Generated Revision Summary
                    </span>
                    <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-md font-bold">
                      Gemini Synced
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/90 italic">
                    {selectedStructuredRecord.aiGeneratedRevisionSummary}
                  </p>
                </div>
              )}

              {/* Lesson Objectives */}
              {selectedStructuredRecord.lessonObjectives && selectedStructuredRecord.lessonObjectives.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-black text-navy uppercase tracking-wider">Lesson Objectives</h4>
                  <ul className="space-y-1.5 text-gray-700">
                    {selectedStructuredRecord.lessonObjectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 bg-bg-light p-2.5 rounded-xl border border-gray-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Topics Covered */}
              {selectedStructuredRecord.topicsCovered && selectedStructuredRecord.topicsCovered.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-black text-navy uppercase tracking-wider">Topics Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStructuredRecord.topicsCovered.map((topic: string, i: number) => (
                      <span key={i} className="font-bold bg-navy text-gold px-3 py-1 rounded-xl shadow-sm">
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="font-black text-navy uppercase tracking-wider">Lesson Summary</h4>
                <p className="text-gray-700 bg-bg-light p-4 rounded-2xl border border-gray-200 leading-relaxed font-medium">
                  {selectedStructuredRecord.lessonSummary}
                </p>
              </div>

              {/* Key Concepts */}
              {selectedStructuredRecord.keyConceptsLearned && selectedStructuredRecord.keyConceptsLearned.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-black text-navy uppercase tracking-wider">Key Concepts Learned</h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedStructuredRecord.keyConceptsLearned.map((concept: string, i: number) => (
                      <div key={i} className="p-3 bg-gold/10 border border-gold/30 rounded-xl font-bold text-navy">
                        • {concept}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Homework & Tutor Feedback */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-black text-orange-600 uppercase tracking-wider">Homework Assigned</h4>
                  <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl font-bold text-navy">
                    {selectedStructuredRecord.homeworkAssigned || "None"}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-black text-navy uppercase tracking-wider">Tutor Feedback</h4>
                  <p className="p-4 bg-bg-light rounded-2xl border border-gray-200 text-gray-700 italic">
                    {selectedStructuredRecord.tutorFeedback}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-bg-light p-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-medium">
                Synchronized Across Parent, Student, Tutor & Admin Portals
              </span>
              <button
                onClick={() => setSelectedStructuredRecord(null)}
                className="bg-navy hover:bg-navy-light text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
