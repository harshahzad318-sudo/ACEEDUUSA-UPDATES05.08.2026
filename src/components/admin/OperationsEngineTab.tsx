"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Video,
  UserCheck,
  Send,
  Plus,
  Filter,
  Search,
  Bell,
  Shield,
  Layers,
  Sparkles,
  Users,
  Check,
  X,
  FileText,
  DollarSign,
  Briefcase
} from "lucide-react";

export function OperationsEngineTab() {
  const [loading, setLoading] = useState(true);
  const [opsData, setOpsData] = useState<any>(null);
  const [opsSubTab, setOpsSubTab] = useState<"today" | "calendar" | "reschedules" | "cancellations" | "packages" | "waitlist" | "blackout" | "reminders">("today");

  // Form states
  const [triggeringReminders, setTriggeringReminders] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<string | null>(null);

  // New Schedule Modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [schedForm, setSchedForm] = useState(() => ({
    tutorId: 101,
    studentName: "Ethan Harrison",
    parentEmail: "marcus.h@example.com",
    studentEmail: "ethan.h@example.com",
    subject: "AP Calculus BC",
    scheduleType: "Weekly",
    learningMode: "Online",
    startTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 86400000 + 5400000).toISOString().slice(0, 16),
    timezone: "EST / Eastern Time",
  }));
  const [schedLoading, setSchedLoading] = useState(false);
  const [schedResult, setSchedResult] = useState<any>(null);

  // Complete Lesson Modal
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completeLesson, setCompleteLesson] = useState<any>(null);
  const [completeForm, setCompleteForm] = useState({
    lessonSummary: "",
    topicsCovered: "",
    keyConceptsLearned: "",
    homeworkAssigned: "",
    homeworkDueDate: "",
    tutorFeedback: "",
    studentParticipation: "Active & Engaged (5/5 Stars)",
    attendance: "Present",
  });
  const [completeLoading, setCompleteLoading] = useState(false);

  // Blackout Date Form
  const [showBlackoutModal, setShowBlackoutModal] = useState(false);
  const [blackoutForm, setBlackoutForm] = useState({
    entityType: "global_holiday",
    title: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchOperationsData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/operations/dashboard");
      const json = await res.json();
      if (json.success) {
        setOpsData(json.data);
      }
    } catch (e) {
      console.error("Failed to load operations dashboard", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/operations/dashboard");
        const json = await res.json();
        if (active && json.success) {
          setOpsData(json.data);
        }
      } catch (e) {
        console.error("Failed to load operations dashboard", e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleTriggerReminders = async () => {
    setTriggeringReminders(true);
    setReminderMessage(null);
    try {
      const res = await fetch("/api/operations/reminders", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setReminderMessage(json.message);
        fetchOperationsData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTriggeringReminders(false);
    }
  };

  const handleApproveReschedule = async (requestId: number) => {
    try {
      const res = await fetch("/api/operations/reschedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, adminNotes: "Approved by Academic Operations Team" }),
      });
      const json = await res.json();
      if (json.success) {
        fetchOperationsData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveCancellation = async (cancellationId: number) => {
    try {
      const res = await fetch("/api/operations/cancellation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cancellationId }),
      });
      const json = await res.json();
      if (json.success) {
        fetchOperationsData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchedLoading(true);
    setSchedResult(null);
    try {
      const res = await fetch("/api/operations/scheduling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...schedForm,
          startTime: new Date(schedForm.startTime).toISOString(),
          endTime: new Date(schedForm.endTime).toISOString(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSchedResult({ success: true, message: json.message, lesson: json.lesson });
        fetchOperationsData();
        setTimeout(() => setShowScheduleModal(false), 2000);
      } else {
        setSchedResult({ success: false, error: json.message || json.error, conflicts: json.conflicts });
      }
    } catch (err: any) {
      setSchedResult({ success: false, error: err.message });
    } finally {
      setSchedLoading(false);
    }
  };

  const handleCompleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!completeLesson) return;
    setCompleteLoading(true);
    try {
      const res = await fetch("/api/operations/complete-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: completeLesson.id,
          tutorId: completeLesson.tutorId,
          tutorName: "Dr. Alexander Wright",
          studentName: completeLesson.studentName,
          parentEmail: completeLesson.parentEmail || "marcus.h@example.com",
          subject: completeLesson.subject,
          lessonSummary: completeForm.lessonSummary,
          topicsCovered: completeForm.topicsCovered.split(",").map(s => s.trim()),
          keyConceptsLearned: completeForm.keyConceptsLearned.split(",").map(s => s.trim()),
          homeworkAssigned: completeForm.homeworkAssigned,
          homeworkDueDate: completeForm.homeworkDueDate ? new Date(completeForm.homeworkDueDate).toISOString() : undefined,
          tutorFeedback: completeForm.tutorFeedback,
          studentParticipation: completeForm.studentParticipation,
          attendance: completeForm.attendance,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setShowCompleteModal(false);
        fetchOperationsData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-navy font-bold flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-gold" />
        <p className="text-sm">Initializing Scheduling & Operations Engine...</p>
      </div>
    );
  }

  const metrics = opsData?.metrics || {};

  return (
    <div className="space-y-8">
      {/* Operations Engine Header KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-xs font-bold mb-1">
            <Calendar className="w-4 h-4 text-gold" /> Today&apos;s Lessons
          </div>
          <div className="text-2xl font-black text-navy">{metrics.totalLessonsToday || 3}</div>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">{metrics.completedToday || 1} Completed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-xs font-bold mb-1">
            <RefreshCw className="w-4 h-4 text-blue-600" /> Pending Reschedules
          </div>
          <div className="text-2xl font-black text-navy">{metrics.pendingReschedulesCount || 0}</div>
          <p className="text-[10px] text-amber-600 font-bold mt-1">Requires Approval</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-xs font-bold mb-1">
            <Users className="w-4 h-4 text-purple-600" /> Waitlist Queue
          </div>
          <div className="text-2xl font-black text-navy">{metrics.waitlistCount || 0}</div>
          <p className="text-[10px] text-purple-600 font-bold mt-1">Auto-Matching Tutors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-xs font-bold mb-1">
            <Briefcase className="w-4 h-4 text-emerald-600" /> Active Packages
          </div>
          <div className="text-2xl font-black text-navy">{metrics.activePackagesCount || 0}</div>
          <p className="text-[10px] text-red-600 font-bold mt-1">{metrics.lowBalancePackagesCount || 0} Low Balance Alerts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-xs font-bold mb-1">
            <Shield className="w-4 h-4 text-amber-600" /> Blackout / Vacations
          </div>
          <div className="text-2xl font-black text-navy">{opsData?.blackoutDates?.length || 0}</div>
          <p className="text-[10px] text-navy/60 font-bold mt-1">Conflict Checking Active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-navy/60 text-xs font-bold mb-1">
            <Bell className="w-4 h-4 text-gold" /> Auto Reminders
          </div>
          <button
            onClick={handleTriggerReminders}
            disabled={triggeringReminders}
            className="w-full bg-navy text-gold text-[11px] font-extrabold py-2 px-3 rounded-xl hover:bg-navy-light transition-all cursor-pointer flex items-center justify-center gap-1 mt-1"
          >
            {triggeringReminders ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            Trigger Reminders
          </button>
        </div>
      </div>

      {reminderMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {reminderMessage}
        </div>
      )}

      {/* Control Bar & Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "today", label: "Today & Tomorrow Lessons", icon: Calendar },
            { id: "calendar", label: "Master Calendar", icon: Calendar },
            { id: "reschedules", label: "Reschedule Approvals", icon: RefreshCw },
            { id: "cancellations", label: "Cancellation Requests", icon: XCircle },
            { id: "packages", label: "Packages & Usage", icon: Briefcase },
            { id: "waitlist", label: "Waitlist Queue", icon: Users },
            { id: "blackout", label: "Blackouts & Vacations", icon: Shield },
            { id: "reminders", label: "Automation Log", icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = opsSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setOpsSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active ? "bg-navy text-white shadow-md" : "bg-white text-navy/70 hover:text-navy border border-gray-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-gold" /> {tab.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="bg-gold text-navy font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 hover:bg-gold-dark transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" /> Schedule New Lesson
        </button>
      </div>

      {/* SUB-TAB 1: TODAY & TOMORROW LESSONS */}
      {opsSubTab === "today" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
            <h3 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" /> Scheduled Today
            </h3>

            {(!opsData?.todayLessons || opsData.todayLessons.length === 0) ? (
              <p className="text-gray-400 text-xs italic py-6 text-center">No lessons scheduled for today.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {opsData.todayLessons.map((l: any) => (
                  <div key={l.id} className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-white transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-gold bg-navy px-3 py-1 rounded-lg">
                        {l.subject}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        l.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {l.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-navy text-sm">{l.studentName}</h4>
                      <p className="text-xs text-gray-500 font-semibold mt-0.5">
                        {new Date(l.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(l.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({l.timezone || 'EST'})
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Mode: {l.learningMode || "Online"} | Type: {l.scheduleType || "Weekly"}</p>
                    </div>

                    {l.meetingUrl && (
                      <div className="p-3 bg-navy/5 rounded-xl text-xs space-y-1 border border-navy/10">
                        <div className="flex items-center justify-between text-navy font-bold">
                          <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-gold" /> Online Room</span>
                          <a href={l.meetingUrl} target="_blank" rel="noreferrer" className="text-gold font-extrabold underline text-[11px]">Join Session</a>
                        </div>
                        <p className="text-[10px] text-gray-500">ID: {l.meetingInfo?.meetingId || 'ACE-MEET-882103'} | Pass: {l.meetingInfo?.password || 'ACE-PASS-2026'}</p>
                        <p className="text-[10px] text-gray-400 italic">Recording Policy: Disabled by default</p>
                      </div>
                    )}

                    {l.status !== "completed" && (
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            setCompleteLesson(l);
                            setCompleteForm({
                              lessonSummary: `In-depth session covering ${l.subject} core principles and problem solving.`,
                              topicsCovered: `${l.subject} Core Topics, Problem Solving`,
                              keyConceptsLearned: "Formula derivations, Application strategies",
                              homeworkAssigned: `Complete Problem Set for ${l.subject}`,
                              homeworkDueDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
                              tutorFeedback: "Great focus and analytical retention during the lesson.",
                              studentParticipation: "Active & Engaged (5/5 Stars)",
                              attendance: "Present",
                            });
                            setShowCompleteModal(true);
                          }}
                          className="flex-1 bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs hover:bg-emerald-700 transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Log Attendance & Complete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
            <h3 className="text-base font-extrabold text-navy mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Scheduled Tomorrow
            </h3>
            {(!opsData?.tomorrowLessons || opsData.tomorrowLessons.length === 0) ? (
              <p className="text-gray-400 text-xs italic py-6 text-center">No lessons scheduled for tomorrow.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {opsData.tomorrowLessons.map((l: any) => (
                  <div key={l.id} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy">{l.subject} - {l.studentName}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">{l.scheduleType || 'Weekly'}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                      {new Date(l.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({l.learningMode})
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MASTER CALENDAR */}
      {opsSubTab === "calendar" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold" /> Master Unified Calendar
              </h3>
              <p className="text-xs text-gray-500 mt-1">Real-time synchronized schedule across Admin, Tutor, Parent & Student Portals.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              ● Live Sync Active
            </span>
          </div>

          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {(opsData?.allLessons || []).map((ev: any) => (
              <div key={ev.id} className="p-4 hover:bg-gray-50 flex flex-wrap items-center justify-between gap-4 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy font-black flex items-center justify-center text-xs">
                    {new Date(ev.startTime).getDate()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-navy text-sm">{ev.subject} — {ev.studentName}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(ev.startTime).toLocaleDateString()} at {new Date(ev.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                    {ev.learningMode || 'Online'}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-xl uppercase ${
                    ev.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    ev.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ev.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: RESCHEDULE APPROVALS */}
      {opsSubTab === "reschedules" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-blue-600" /> Pending Reschedule Requests
          </h3>

          {(!opsData?.pendingReschedules || opsData.pendingReschedules.length === 0) ? (
            <p className="text-gray-400 text-xs italic py-8 text-center">No pending reschedule requests.</p>
          ) : (
            <div className="space-y-4">
              {opsData.pendingReschedules.map((r: any) => (
                <div key={r.id} className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Lesson #{r.lessonId} — Requested by {r.requestedByRole.toUpperCase()} ({r.requestedByEmail})</span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-extrabold px-2.5 py-1 rounded-full uppercase">Pending Admin Approval</span>
                  </div>

                  <p className="text-xs text-gray-700 italic bg-white p-3 rounded-xl border border-gray-200">&quot;{r.reason}&quot;</p>

                  <div className="grid md:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 font-bold block">Original Time:</span>
                      <span className="font-extrabold text-navy">{new Date(r.originalStartTime).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-emerald-600 font-bold block">Proposed New Time:</span>
                      <span className="font-extrabold text-emerald-800">{new Date(r.proposedStartTime).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApproveReschedule(r.id)}
                    className="bg-navy text-gold font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-navy-light transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Auto-Update Calendars
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: CANCELLATIONS */}
      {opsSubTab === "cancellations" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" /> Pending Cancellation Requests & Refund Rules
          </h3>

          {(!opsData?.pendingCancellations || opsData.pendingCancellations.length === 0) ? (
            <p className="text-gray-400 text-xs italic py-8 text-center">No pending cancellation requests.</p>
          ) : (
            <div className="space-y-4">
              {opsData.pendingCancellations.map((c: any) => (
                <div key={c.id} className="p-5 rounded-2xl border border-red-200 bg-red-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">Lesson #{c.lessonId} — Requested by {c.requestedByRole.toUpperCase()}</span>
                    <span className="text-[10px] bg-red-200 text-red-900 font-extrabold px-2.5 py-1 rounded-full uppercase">Policy Calculated</span>
                  </div>

                  <p className="text-xs text-gray-700 italic bg-white p-3 rounded-xl border border-gray-200">&quot;{c.reason}&quot;</p>

                  <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs space-y-1">
                    <p className="font-bold text-navy">Applied Policy Rule:</p>
                    <p className="text-gray-600 font-medium">{c.policyApplied}</p>
                    <p className="text-emerald-700 font-bold mt-1">Parent Credit Refund: ${c.parentRefundAmount} | Tutor Fee: ${c.tutorCompensationAmount}</p>
                  </div>

                  <button
                    onClick={() => handleApproveCancellation(c.id)}
                    className="bg-red-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-red-800 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Cancellation & Refund Credit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: PACKAGES & USAGE */}
      {opsSubTab === "packages" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" /> Active Lesson Packages & Credits
            </h3>
            <span className="text-xs font-bold text-gray-500">Auto Deducted on Lesson Completion</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {(opsData?.activePackages || []).map((pkg: any) => (
              <div key={pkg.id} className="p-5 rounded-2xl border border-gray-200 bg-white space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-navy">{pkg.studentName} — {pkg.subject}</span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                    pkg.remainingLessons <= 1 ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {pkg.remainingLessons <= 1 ? '⚠️ Low Credit' : pkg.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <p><span className="font-bold text-navy">Package Type:</span> {pkg.packageType}</p>
                  <p><span className="font-bold text-navy">Total Lessons:</span> {pkg.totalLessons}</p>
                  <p><span className="font-bold text-navy">Completed:</span> {pkg.completedLessons}</p>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
                  <div
                    className={`h-full transition-all ${
                      pkg.remainingLessons <= 1 ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.round((pkg.completedLessons / pkg.totalLessons) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-bold pt-1">
                  <span className="text-gray-500">{pkg.remainingLessons} Lessons Remaining</span>
                  <span className="text-navy">${pkg.price} Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: WAITLIST QUEUE */}
      {opsSubTab === "waitlist" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" /> Tutor Match Waitlist Queue
          </h3>

          {(!opsData?.waitlistItems || opsData.waitlistItems.length === 0) ? (
            <p className="text-gray-400 text-xs italic py-8 text-center">No tutoring requests on waitlist.</p>
          ) : (
            <div className="space-y-4">
              {opsData.waitlistItems.map((w: any) => (
                <div key={w.id} className="p-5 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-navy">{w.studentName} ({w.gradeLevel}) — {w.subject}</span>
                    <span className="text-[10px] bg-purple-200 text-purple-900 font-extrabold px-2.5 py-1 rounded-full uppercase">Waiting Tutor Opening</span>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p><span className="font-bold text-navy">Parent:</span> {w.parentName} ({w.parentEmail})</p>
                    <p><span className="font-bold text-navy">Preferred Schedule:</span> {w.preferredDays.join(", ")} | {w.preferredTimes}</p>
                    <p><span className="font-bold text-navy">Mode:</span> {w.learningMode}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-purple-100 text-xs space-y-2">
                    <span className="font-bold text-navy block flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-gold" /> AI Recommended Tutor Matches:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-navy text-gold text-[11px] font-bold px-3 py-1 rounded-lg">Dr. Alexander Wright (5.0★)</span>
                      <span className="bg-navy text-gold text-[11px] font-bold px-3 py-1 rounded-lg">Prof. Sarah Jenkins (4.95★)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 7: BLACKOUT DATES & VACATIONS */}
      {opsSubTab === "blackout" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" /> Blackout Dates, Tutor Vacations & Holidays
            </h3>
          </div>

          <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
            {(opsData?.blackoutDates || []).map((b: any) => (
              <div key={b.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-navy text-sm">{b.title}</h4>
                  <p className="text-xs text-gray-500">{new Date(b.startDate).toLocaleDateString()} to {new Date(b.endDate).toLocaleDateString()} — {b.reason}</p>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-3 py-1 rounded-full uppercase">
                  {b.entityType}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 8: AUTOMATION LOG */}
      {opsSubTab === "reminders" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6">
          <h3 className="text-base font-extrabold text-navy flex items-center gap-2">
            <Bell className="w-5 h-5 text-gold" /> Automated Operations & Reminders Execution Log
          </h3>

          <div className="space-y-3">
            {(opsData?.automationLogs || []).map((log: any) => (
              <div key={log.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-navy">
                  <span>{log.eventType}</span>
                  <span className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-gray-600">{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: SCHEDULE NEW LESSON */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-gold/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-black text-navy flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold" /> Schedule New Lesson
              </h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-navy cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-navy block mb-1">Select Tutor</label>
                <select
                  value={schedForm.tutorId}
                  onChange={(e) => setSchedForm({ ...schedForm, tutorId: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                >
                  <option value={101}>Dr. Alexander Wright (AP Calculus BC & Physics C)</option>
                  <option value={102}>Prof. Sarah Jenkins (AP Chemistry & AP Bio)</option>
                  <option value={103}>Dr. Michael Chen (Digital SAT & ACT Prep)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Student Name</label>
                  <input
                    type="text"
                    value={schedForm.studentName}
                    onChange={(e) => setSchedForm({ ...schedForm, studentName: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Subject</label>
                  <input
                    type="text"
                    value={schedForm.subject}
                    onChange={(e) => setSchedForm({ ...schedForm, subject: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Schedule Type</label>
                  <select
                    value={schedForm.scheduleType}
                    onChange={(e) => setSchedForm({ ...schedForm, scheduleType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  >
                    <option value="One-time">One-time Lesson</option>
                    <option value="Weekly">Weekly Recurring</option>
                    <option value="Package">Package Lesson</option>
                    <option value="Trial">Trial Lesson</option>
                    <option value="Assessment">Assessment Session</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Learning Mode</label>
                  <select
                    value={schedForm.learningMode}
                    onChange={(e) => setSchedForm({ ...schedForm, learningMode: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  >
                    <option value="Online">Online Interactive</option>
                    <option value="Home Tuition">Home Tuition (In-Person)</option>
                    <option value="Center">ACE Learning Center</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    value={schedForm.startTime}
                    onChange={(e) => setSchedForm({ ...schedForm, startTime: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    value={schedForm.endTime}
                    onChange={(e) => setSchedForm({ ...schedForm, endTime: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                    required
                  />
                </div>
              </div>

              {schedResult && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  schedResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {schedResult.success ? (
                    <div>✓ {schedResult.message}</div>
                  ) : (
                    <div>
                      <p className="font-extrabold text-red-900 mb-1">⚠️ Conflict Detected:</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                        {(schedResult.conflicts || [schedResult.error]).map((c: string, idx: number) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 border border-gray-200 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={schedLoading}
                  className="flex-1 bg-navy text-gold py-2.5 rounded-xl text-xs font-extrabold hover:bg-navy-light flex items-center justify-center gap-1 cursor-pointer"
                >
                  {schedLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: COMPLETE LESSON & GENERATE AI REVISION SUMMARY */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl border border-gold/20 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-lg font-black text-navy flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Complete Lesson & Auto-Generate AI Brief
              </h3>
              <button onClick={() => setShowCompleteModal(false)} className="text-gray-400 hover:text-navy cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompleteSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-navy block mb-1">Attendance Status</label>
                <select
                  value={completeForm.attendance}
                  onChange={(e) => setCompleteForm({ ...completeForm, attendance: e.target.value as any })}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                >
                  <option value="Present">Present (On-Time)</option>
                  <option value="Late">Late (Arrived &gt; 10m late)</option>
                  <option value="Absent">Absent (No-Show)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-navy block mb-1">Lesson Executive Summary</label>
                <textarea
                  rows={3}
                  value={completeForm.lessonSummary}
                  onChange={(e) => setCompleteForm({ ...completeForm, lessonSummary: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  placeholder="Summary of topics covered, student comprehension, and key exercises solved..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Topics Covered (comma separated)</label>
                  <input
                    type="text"
                    value={completeForm.topicsCovered}
                    onChange={(e) => setCompleteForm({ ...completeForm, topicsCovered: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Key Concepts Learned</label>
                  <input
                    type="text"
                    value={completeForm.keyConceptsLearned}
                    onChange={(e) => setCompleteForm({ ...completeForm, keyConceptsLearned: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-navy block mb-1">Homework Assigned</label>
                <input
                  type="text"
                  value={completeForm.homeworkAssigned}
                  onChange={(e) => setCompleteForm({ ...completeForm, homeworkAssigned: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  placeholder="e.g. Complete Problem Set 4.2 (Questions 1-12)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Homework Due Date</label>
                  <input
                    type="date"
                    value={completeForm.homeworkDueDate}
                    onChange={(e) => setCompleteForm({ ...completeForm, homeworkDueDate: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy block mb-1">Student Engagement</label>
                  <select
                    value={completeForm.studentParticipation}
                    onChange={(e) => setCompleteForm({ ...completeForm, studentParticipation: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs focus:border-gold focus:outline-none"
                  >
                    <option value="Active & Engaged (5/5 Stars)">Active & Engaged (5/5 Stars)</option>
                    <option value="Good Participation (4/5 Stars)">Good Participation (4/5 Stars)</option>
                    <option value="Needs Focus (3/5 Stars)">Needs Focus (3/5 Stars)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-navy/5 rounded-xl border border-navy/10 text-xs text-navy space-y-1">
                <span className="font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" /> AI Engine Automated Triggers:
                </span>
                <p className="text-[11px] text-gray-600">
                  Submitting will automatically: (1) Generate Gemini 3.5 Flash AI Revision Brief, (2) Create LMS Homework Assignment, (3) Deduct package credit, (4) Calculate Tutor Payroll payout, (5) Notify Parent & Student.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCompleteModal(false)}
                  className="flex-1 border border-gray-200 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={completeLoading}
                  className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-extrabold hover:bg-emerald-700 flex items-center justify-center gap-1 cursor-pointer"
                >
                  {completeLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                  Execute Complete Lifecycle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
