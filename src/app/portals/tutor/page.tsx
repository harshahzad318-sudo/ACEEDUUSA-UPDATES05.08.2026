"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TutorPayrollCenter } from "@/components/finance/TutorPayrollCenter";
import {
  BarChart3,
  Calendar,
  Users,
  CheckCircle2,
  FileText,
  BookOpen,
  MessageSquare,
  Clock,
  CreditCard,
  Settings,
  User,
  ShieldCheck,
  Video,
  Award,
  Bell,
  HelpCircle,
  Plus,
  Loader2,
  ExternalLink,
  Check,
  X,
  Send,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Sparkles
} from "lucide-react";

interface TutorDashboardData {
  tutor: any;
  kpis: {
    totalEarnings: number;
    totalHours: number;
    activeStudents: number;
    upcomingCount: number;
    rating: number;
  };
  assignments: any[];
  lessons: any[];
  lessonNotes: any[];
  payments: any[];
  announcements: any[];
  supportTickets: any[];
}

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "profile", label: "My Profile", icon: User },
  { id: "availability", label: "Availability", icon: Clock },
  { id: "documents", label: "Documents", icon: ShieldCheck },
  { id: "students", label: "Assigned Students", icon: Users },
  { id: "lessons", label: "Today's Lessons", icon: Calendar },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "attendance", label: "Attendance", icon: CheckCircle2 },
  { id: "notes", label: "Lesson Notes", icon: FileText },
  { id: "homework", label: "Homework", icon: BookOpen },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "performance", label: "Performance", icon: TrendingUp },
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "support", label: "Support", icon: HelpCircle },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SLOTS = ["Morning (8AM-12PM)", "Afternoon (12PM-5PM)", "Evening (5PM-9PM)"];

export default function TutorPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState<TutorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Note Submission State
  const [noteForm, setNoteForm] = useState({
    lessonId: 0,
    studentName: "",
    subject: "",
    summary: "",
    homeworkAssigned: "",
    studentProgress: "Exceeding Expectations",
  });
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);

  // Message State
  const [messages, setMessages] = useState([
    { id: 1, sender: "Marcus Harrison (Parent)", text: "Hi Dr. Wright, Ethan is looking forward to today's calculus session!", time: "10:15 AM", isTutor: false },
    { id: 2, sender: "Dr. Alexander Wright (You)", text: "Hello Marcus! We will be focusing on Taylor Series convergence today.", time: "10:20 AM", isTutor: true },
  ]);
  const [msgInput, setMsgInput] = useState("");

  // Support Ticket State
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/tutors/dashboard");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (e) {
      console.error("Dashboard fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch("/api/tutors/dashboard")
      .then((res) => res.json())
      .then((json) => {
        if (isMounted && json.success) {
          setData(json);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAssignmentAction = async (assignmentId: number, action: "accepted" | "declined") => {
    try {
      const res = await fetch("/api/tutors/assignment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, action }),
      });
      const json = await res.json();
      if (json.success) {
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogAttendance = async (lessonId: number, status: "completed" | "no_show" | "cancelled") => {
    try {
      const res = await fetch("/api/tutors/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "log_attendance", lessonId, status }),
      });
      const json = await res.json();
      if (json.success) {
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoteLoading(true);
    setNoteSuccess(false);
    try {
      const res = await fetch("/api/operations/complete-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: noteForm.lessonId || 1,
          tutorId: data?.tutor?.id || 101,
          tutorName: data?.tutor?.fullName || "Dr. Alexander Wright",
          studentName: noteForm.studentName || "Ethan Harrison",
          parentEmail: "marcus.h@example.com",
          subject: noteForm.subject || "AP Calculus BC",
          lessonSummary: noteForm.summary,
          topicsCovered: [noteForm.subject || "AP Calculus BC", "Problem Solving"],
          keyConceptsLearned: ["Core Principles", "Derivations & Practice"],
          homeworkAssigned: noteForm.homeworkAssigned,
          homeworkDueDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
          tutorFeedback: noteForm.studentProgress,
          studentParticipation: "Active & Engaged (5/5 Stars)",
          attendance: "Present",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNoteSuccess(true);
        setNoteForm({ lessonId: 0, studentName: "", subject: "", summary: "", homeworkAssigned: "", studentProgress: "Exceeding Expectations" });
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNoteLoading(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "Dr. Alexander Wright (You)",
        text: msgInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isTutor: true,
      },
    ]);
    setMsgInput("");
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setTicketLoading(true);
    try {
      const res = await fetch("/api/tutors/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "support_ticket",
          userEmail: data?.tutor?.email || "tutor@aceeducation.us",
          subject: ticketSubject,
          message: ticketMessage,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setTicketSuccess(true);
        setTicketSubject("");
        setTicketMessage("");
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTicketLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-bg-light min-h-screen py-20 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-navy mx-auto mb-3" />
        <p className="text-gray-500 font-bold text-sm">Loading Tutor Dashboard...</p>
      </div>
    );
  }

  const tutor = data?.tutor;
  const kpis = data?.kpis || { totalEarnings: 0, totalHours: 0, activeStudents: 0, upcomingCount: 0, rating: 5.0 };

  return (
    <>
      {/* Tutor Profile Header */}
      <section className="bg-navy py-12 text-white border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={tutor?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt={tutor?.fullName}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-gold shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold">{tutor?.fullName}</h1>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {tutor?.status === "approved" ? "Approved Tutor (Active)" : tutor?.status?.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/70 text-xs md:text-sm mt-1">{tutor?.title || "Academic Specialist"}</p>
                <div className="flex items-center gap-4 text-xs text-gold mt-2 font-medium">
                  <span>★ {kpis.rating} Tutor Rating</span>
                  <span>• Rate: ${tutor?.finalRate || 45}/hr</span>
                  <span>• {tutor?.email}</span>
                </div>
              </div>
            </div>

            <Link href="/tutors/apply" className="bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all">
              <Plus className="w-4 h-4" /> New Application
            </Link>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <section className="py-10 bg-bg-light min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-4 border border-gray-100 sticky top-24">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-3 block mb-2 font-mono">TUTOR NAVIGATION</span>
              <nav className="space-y-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        active ? "bg-navy text-gold shadow-md" : "text-gray-600 hover:bg-navy/5 hover:text-navy"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: DASHBOARD */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                {/* KPI Overview Cards */}
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 font-bold">Total Earnings</div>
                    <div className="text-2xl font-black text-navy mt-1">${kpis.totalEarnings.toFixed(2)}</div>
                    <div className="text-[11px] text-emerald-600 mt-1 font-semibold">100% Paid on time</div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 font-bold">Hours Completed</div>
                    <div className="text-2xl font-black text-navy mt-1">{kpis.totalHours} hrs</div>
                    <div className="text-[11px] text-gray-400 mt-1">Verified lesson logs</div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 font-bold">Active Students</div>
                    <div className="text-2xl font-black text-navy mt-1">{kpis.activeStudents}</div>
                    <div className="text-[11px] text-navy font-semibold mt-1">Matched by ACE</div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="text-xs text-gray-500 font-bold">Rating</div>
                    <div className="text-2xl font-black text-gold mt-1">★ {kpis.rating}</div>
                    <div className="text-[11px] text-gray-400 mt-1">Parent feedback score</div>
                  </div>
                </div>

                {/* Pending Assignment Requests */}
                {data?.assignments && data.assignments.filter((a) => a.status === "pending").length > 0 && (
                  <div className="bg-gold/15 rounded-3xl p-6 border-2 border-gold shadow-md">
                    <h3 className="font-extrabold text-navy text-base mb-1 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold" /> Pending Student Assignment Request
                    </h3>
                    <p className="text-xs text-gray-700 mb-4">ACE Admissions has matched you with a new student. Please review and respond below:</p>

                    <div className="space-y-3">
                      {data.assignments
                        .filter((a) => a.status === "pending")
                        .map((assign) => (
                          <div key={assign.id} className="bg-white p-4 rounded-2xl border border-gold/40 sm:flex sm:items-center sm:justify-between gap-4">
                            <div>
                              <h4 className="font-bold text-navy text-sm">{assign.studentName} ({assign.subject})</h4>
                              <p className="text-xs text-gray-500">Parent: {assign.parentName} ({assign.parentEmail}) • Mode: {assign.learningMode}</p>
                              <p className="text-xs text-navy font-semibold mt-1">Rate: ${assign.tutorRate}/hr • Notes: {assign.notes}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-3 sm:mt-0">
                              <button
                                onClick={() => handleAssignmentAction(assign.id, "accepted")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <Check className="w-4 h-4" /> Accept Student
                              </button>
                              <button
                                onClick={() => handleAssignmentAction(assign.id, "declined")}
                                className="bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <X className="w-4 h-4" /> Decline
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Classes */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold" /> Today&apos;s & Upcoming Sessions
                  </h3>

                  {data?.lessons && data.lessons.length > 0 ? (
                    <div className="space-y-4">
                      {data.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50 sm:flex sm:items-center sm:justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-bold text-gold bg-navy px-2.5 py-0.5 rounded-full uppercase tracking-wider">{lesson.subject}</span>
                            <h4 className="font-bold text-navy text-sm mt-1">{lesson.studentName}</h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {new Date(lesson.startTime).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                            {lesson.meetingUrl && (
                              <a
                                href={lesson.meetingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-navy text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 hover:bg-navy-light"
                              >
                                <Video className="w-3.5 h-3.5 text-gold" /> Launch Classroom
                              </a>
                            )}
                            <button
                              onClick={() => handleLogAttendance(lesson.id, "completed")}
                              className="bg-green-100 text-green-800 font-bold px-3 py-2 rounded-xl text-xs hover:bg-green-200"
                            >
                              Log Completed
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No sessions scheduled for today.</p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: MY PROFILE */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-navy border-b pb-4">Tutor Profile & Recruitment Information</h2>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div><strong>Full Name:</strong> {tutor?.fullName}</div>
                  <div><strong>Email:</strong> {tutor?.email}</div>
                  <div><strong>Phone:</strong> {tutor?.phone}</div>
                  <div><strong>Location:</strong> {tutor?.city}, {tutor?.state}, {tutor?.country}</div>
                  <div><strong>Title:</strong> {tutor?.title}</div>
                  <div><strong>Degree:</strong> {tutor?.degree} in {tutor?.major} ({tutor?.institution})</div>
                  <div><strong>Expected Compensation:</strong> ${tutor?.expectedRate}/hr</div>
                  <div><strong>Confirmed ACE Pay Rate:</strong> ${tutor?.finalRate}/hr</div>
                </div>

                <div>
                  <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-1">Professional Bio</h4>
                  <p className="text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-200 leading-relaxed">{tutor?.bio}</p>
                </div>

                <div>
                  <h4 className="font-bold text-navy text-xs uppercase tracking-wider mb-2">Teaching Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {(tutor?.subjects || []).map((s: string) => (
                      <span key={s} className="bg-gold/20 text-navy font-bold text-xs px-3 py-1 rounded-xl border border-gold/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AVAILABILITY */}
            {activeTab === "availability" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-navy mb-2">Weekly Availability Schedule</h2>
                <p className="text-xs text-gray-500 mb-6">Manage the hours you are open for student sessions.</p>

                <div className="space-y-3">
                  {DAYS.map((day) => (
                    <div key={day} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 sm:flex sm:items-center sm:justify-between gap-4">
                      <span className="font-bold text-navy text-xs min-w-[100px]">{day}</span>
                      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                        {SLOTS.map((slot) => {
                          const daySlots = (tutor?.availability?.[day] || []) as string[];
                          const active = daySlots.includes(slot);
                          return (
                            <span
                              key={slot}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                                active ? "bg-navy text-gold border-navy" : "bg-white text-gray-400 border-gray-200"
                              }`}
                            >
                              {active ? "✓ " : "• "} {slot}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: DOCUMENTS */}
            {activeTab === "documents" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-navy border-b pb-4">Verification & Teaching Documents</h2>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-gray-50 rounded-2xl border flex justify-between items-center">
                    <div>
                      <strong className="text-navy">Identity Verification ({tutor?.idType || "Passport"})</strong>
                      <p className="text-gray-500 mt-0.5">Verified by ACE Admissions Team</p>
                    </div>
                    {tutor?.idDocumentUrl && (
                      <a href={tutor.idDocumentUrl} target="_blank" rel="noopener noreferrer" className="bg-navy text-white px-3 py-1.5 rounded-xl font-bold">
                        View ID
                      </a>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border flex justify-between items-center">
                    <div>
                      <strong className="text-navy">Resume / Curriculum Vitae</strong>
                      <p className="text-gray-500 mt-0.5">Uploaded on file</p>
                    </div>
                    {tutor?.resumeUrl && (
                      <a href={tutor.resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-navy text-white px-3 py-1.5 rounded-xl font-bold">
                        View Resume
                      </a>
                    )}
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border flex justify-between items-center">
                    <div>
                      <strong className="text-navy">Teaching Demo Video</strong>
                      <p className="text-gray-500 mt-0.5">Approved Sample Demo</p>
                    </div>
                    {tutor?.demoVideoUrl && (
                      <a href={tutor.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="bg-purple-800 text-white px-3 py-1.5 rounded-xl font-bold">
                        Watch Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: ASSIGNED STUDENTS */}
            {activeTab === "students" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-navy mb-4">Assigned Students</h2>

                <div className="space-y-4">
                  {(data?.assignments || []).map((assign) => (
                    <div key={assign.id} className="p-5 rounded-2xl border border-gray-100 bg-gray-50 sm:flex sm:items-center sm:justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-gold bg-navy px-2.5 py-0.5 rounded-full uppercase tracking-wider">{assign.subject}</span>
                        <h3 className="font-extrabold text-navy text-base mt-1">{assign.studentName}</h3>
                        <p className="text-xs text-gray-500">Parent: {assign.parentName} ({assign.parentEmail})</p>
                        <p className="text-xs text-navy font-semibold mt-1">Status: <span className="text-emerald-700 font-bold uppercase">{assign.status}</span></p>
                      </div>

                      <button
                        onClick={() => {
                          setNoteForm((prev) => ({ ...prev, studentName: assign.studentName, subject: assign.subject }));
                          setActiveTab("notes");
                        }}
                        className="bg-navy text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-navy-light cursor-pointer"
                      >
                        Submit Lesson Note
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: LESSON NOTES */}
            {activeTab === "notes" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-navy">Submit Student Lesson Notes</h2>

                {noteSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold">
                    Lesson note successfully logged and routed to student parents!
                  </div>
                )}

                <form onSubmit={handleNoteSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Student Name</label>
                      <input
                        type="text"
                        value={noteForm.studentName}
                        onChange={(e) => setNoteForm((prev) => ({ ...prev, studentName: e.target.value }))}
                        placeholder="Ethan Harrison"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1 uppercase">Subject</label>
                      <input
                        type="text"
                        value={noteForm.subject}
                        onChange={(e) => setNoteForm((prev) => ({ ...prev, subject: e.target.value }))}
                        placeholder="AP Calculus BC"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1 uppercase">Lesson Summary & Progress *</label>
                    <textarea
                      rows={4}
                      value={noteForm.summary}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, summary: e.target.value }))}
                      placeholder="Topics covered, student mastery, areas for improvement..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1 uppercase">Assigned Homework</label>
                    <input
                      type="text"
                      value={noteForm.homeworkAssigned}
                      onChange={(e) => setNoteForm((prev) => ({ ...prev, homeworkAssigned: e.target.value }))}
                      placeholder="Complete Problem Set 4.2..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={noteLoading}
                    className="bg-gold hover:bg-gold-dark text-navy font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {noteLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Lesson Note"}
                  </button>
                </form>

                {/* Submitted Notes History */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-navy text-sm mb-3">Previous Lesson Notes</h3>
                  <div className="space-y-3">
                    {(data?.lessonNotes || []).map((n) => (
                      <div key={n.id} className="bg-gray-50 p-4 rounded-2xl border text-xs">
                        <div className="font-bold text-navy">{n.studentName} - {n.subject}</div>
                        <p className="text-gray-600 mt-1">{n.summary}</p>
                        {n.homeworkAssigned && <div className="mt-2 text-gold font-bold">Homework: {n.homeworkAssigned}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 12: PAYMENTS */}
            {activeTab === "payments" && <TutorPayrollCenter tutorId={data?.tutor?.id || 101} />}

            {/* TAB 11: MESSAGES */}
            {activeTab === "messages" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-4">
                <h2 className="text-xl font-bold text-navy border-b pb-4">Parent & ACE Admin Messaging</h2>

                <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  {messages.map((m) => (
                    <div key={m.id} className={`flex flex-col ${m.isTutor ? "items-end" : "items-start"}`}>
                      <span className="text-[10px] font-bold text-gray-400">{m.sender} • {m.time}</span>
                      <div className={`p-3 rounded-2xl text-xs max-w-md mt-0.5 ${m.isTutor ? "bg-navy text-white" : "bg-white text-navy border border-gray-200"}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={msgInput}
                    onChange={(e) => setMsgInput(e.target.value)}
                    placeholder="Type a message to parents or admin..."
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                  />
                  <button type="submit" className="bg-gold text-navy font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 hover:bg-gold-dark cursor-pointer">
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>
              </div>
            )}

            {/* TAB 14: ANNOUNCEMENTS */}
            {activeTab === "announcements" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-4">
                <h2 className="text-xl font-bold text-navy border-b pb-4">ACE Platform Announcements</h2>

                <div className="space-y-4">
                  {(data?.announcements || []).map((ann) => (
                    <div key={ann.id} className="p-5 bg-navy/5 rounded-2xl border border-navy/10 space-y-1">
                      <span className="text-[10px] font-bold text-gold bg-navy px-2 py-0.5 rounded-full">{ann.author}</span>
                      <h3 className="font-extrabold text-navy text-sm mt-1">{ann.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 15: SUPPORT */}
            {activeTab === "support" && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 space-y-6">
                <h2 className="text-xl font-bold text-navy">Tutor Support Desk</h2>

                {ticketSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-xs font-bold">
                    Support ticket submitted to ACE Academic Operations. We will respond within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1 uppercase">Subject *</label>
                    <input
                      type="text"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="e.g. Schedule Change Request / Payment Inquiry"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1 uppercase">Message Details *</label>
                    <textarea
                      rows={4}
                      value={ticketMessage}
                      onChange={(e) => setTicketMessage(e.target.value)}
                      placeholder="Describe your issue or question..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={ticketLoading}
                    className="bg-navy text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer hover:bg-navy-light disabled:opacity-50"
                  >
                    {ticketLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Support Ticket"}
                  </button>
                </form>
              </div>
            )}

            {/* Fallback for other tabs */}
            {!["dashboard", "profile", "availability", "documents", "students", "notes", "payments", "messages", "announcements", "support"].includes(activeTab) && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center py-16">
                <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-3" />
                <h2 className="text-xl font-bold text-navy capitalize">{activeTab} Module Active</h2>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2">
                  All tutor metrics and live data for this module are active and connected to your account.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
