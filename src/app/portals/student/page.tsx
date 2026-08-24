"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  Brain,
  Download,
  ExternalLink,
  Search,
  Filter,
  User,
  X,
  Award,
  VideoOff,
  ShieldCheck,
  Star,
  Zap,
  ArrowRight,
  Plus,
  Send,
  MessageSquare,
  Bell,
  Check,
  Upload,
  BarChart2,
  TrendingUp,
  Target,
  Flame,
  Paperclip,
  RotateCcw,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Folder,
  Layers,
  CalendarDays,
  Bot
} from "lucide-react";

export interface StructuredLessonRecord {
  id: number;
  lessonId: number;
  tutorId: number;
  tutorName: string;
  studentName: string;
  studentId?: number;
  parentEmail?: string;
  subject: string;
  startTime: string;
  endTime: string;
  attendance: "Present" | "Late" | "Absent" | "Excused";
  lessonObjectives: string[];
  topicsCovered: string[];
  lessonSummary: string;
  keyConceptsLearned: string[];
  resourcesShared: Array<{ title: string; url: string; description?: string }>;
  homeworkAssigned: string;
  tutorFeedback: string;
  studentParticipation: string;
  aiGeneratedRevisionSummary: string;
  videoPolicy: {
    recordingEnabled: boolean;
    storageLocation: string;
    autoExpiryDays: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function StudentPortal() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "subjects" | "lessons" | "homework" | "resources" | "practice" | "journey" | "calendar" | "messages" | "notifications" | "ai-tutor" | "achievements"
  >("dashboard");

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  // Modals & Active selections
  const [selectedRecord, setSelectedRecord] = useState<StructuredLessonRecord | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [selectedHomeworkToSubmit, setSelectedHomeworkToSubmit] = useState<any>(null);

  // Homework submission form
  const [hwSubmissionText, setHwSubmissionText] = useState("");
  const [hwFiles, setHwFiles] = useState<Array<{ name: string; url: string; size: string; type: string }>>([]);
  const [submittingHw, setSubmittingHw] = useState(false);

  // Practice Quiz State
  const [activeQuizMode, setActiveQuizMode] = useState<"mcq" | "flashcards" | "vocab" | "ai">("mcq");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // AI Study Assistant state
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string; time: string }>>([
    {
      sender: "ai",
      text: "Hello Ethan! I am your ACE Socratic Study Assistant. Ask me to explain a concept step-by-step, generate AP/SAT practice questions, or guide you through a tough topic!",
      time: "Just now",
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Messaging state
  const [selectedMessageTutor, setSelectedMessageTutor] = useState<any>(null);
  const [messageContent, setMessageContent] = useState("");
  const [messagesList, setMessagesList] = useState<any[]>([]);

  const studentName = "Ethan Harrison";

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/student/dashboard?studentName=${encodeURIComponent(studentName)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setDashboardData(json.data);
        if (json.data.messages) setMessagesList(json.data.messages);
      }
    } catch (err) {
      console.error("Failed to fetch student dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/student/dashboard?studentName=${encodeURIComponent(studentName)}`);
        const json = await res.json();
        if (active && json.success && json.data) {
          setDashboardData(json.data);
          if (json.data.messages) setMessagesList(json.data.messages);
        }
      } catch (err) {
        console.error("Failed to fetch student dashboard data:", err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Sample Practice Questions for Practice Center
  const mcqQuestions = [
    {
      question: "Which of the following test criteria guarantees absolute convergence for the series Σ ((-1)^n * n) / (n^3 + 1)?",
      options: [
        "Direct Comparison Test with 1/n^2",
        "Limit Comparison Test with 1/n",
        "Ratio Test yielding L = 1",
        "Integral Test yielding infinity"
      ],
      correct: 0,
      explanation: "By comparing |((-1)^n * n)/(n^3 + 1)| <= n/n^3 = 1/n^2, and since Σ 1/n^2 converges by p-series (p=2 > 1), the original series converges absolutely."
    },
    {
      question: "In AP Physics C Mechanics, what is the moment of inertia of a thin uniform cylindrical shell of mass M and radius R about its central longitudinal axis?",
      options: ["1/2 M R^2", "M R^2", "2/5 M R^2", "1/12 M R^2"],
      correct: 1,
      explanation: "For a thin cylindrical shell, all mass elements are situated at an equal radial distance R from the central axis, yielding I = ∫ r^2 dm = R^2 ∫ dm = M R^2."
    },
    {
      question: "For a function f(x) with Taylor series centered at x = 2, what represents the 3rd degree Taylor polynomial T3(x)?",
      options: [
        "f(2) + f'(2)(x-2) + f''(2)(x-2)^2 + f'''(2)(x-2)^3",
        "f(2) + f'(2)(x-2) + (f''(2)/2!)(x-2)^2 + (f'''(2)/3!)(x-2)^3",
        "f(0) + f'(0)x + f''(0)x^2/2 + f'''(0)x^3/6",
        "f'(2)(x-2) + f''(2)(x-2)^2/2"
      ],
      correct: 1,
      explanation: "The Taylor polynomial formula is Tk(x) = Σ (f^(n)(a)/n!) * (x-a)^n. For a=2, terms up to n=3 divide by 0!, 1!, 2!, 3! respectively."
    }
  ];

  const flashcardsData = [
    {
      term: "Maclaurin Series",
      definition: "A Taylor series expansion of a function about 0: f(x) = Σ [f^(n)(0) / n!] * x^n.",
      subject: "AP Calculus BC"
    },
    {
      term: "Lagrange Error Bound",
      definition: "|R_n(x)| <= [M / (n+1)!] * |x - a|^(n+1), where M is the maximum value of |f^(n+1)(c)| on the interval between a and x.",
      subject: "AP Calculus BC"
    },
    {
      term: "Rotational Inertia (Moment of Inertia)",
      definition: "A scalar measure of an object's resistance to rotational acceleration about a given axis: I = Σ m_i * r_i^2.",
      subject: "AP Physics C"
    },
    {
      term: "Conservation of Angular Momentum",
      definition: "If external net torque is zero (Σ τ_ext = 0), total angular momentum remains constant: L_initial = L_final = I * ω.",
      subject: "AP Physics C"
    },
  ];

  const vocabData = [
    { word: "Convergence", POS: "noun", def: "The state of approaching a definite finite limit as terms tend to infinity." },
    { word: "Asymptotic", POS: "adjective", def: "Approaching a value or curve arbitrarily closely without intersecting." },
    { word: "Orthogonal", POS: "adjective", def: "Intersecting or lying at right angles (90 degrees); statistically independent." },
    { word: "Torque", POS: "noun", def: "The rotational equivalent of linear force; moment of force = r x F." },
  ];

  // Submit Homework Handler
  const handleHomeworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHomeworkToSubmit) return;
    try {
      setSubmittingHw(true);
      const res = await fetch("/api/student/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeworkId: selectedHomeworkToSubmit.id,
          studentName,
          subject: selectedHomeworkToSubmit.subject,
          title: selectedHomeworkToSubmit.title,
          description: selectedHomeworkToSubmit.description,
          submissionText: hwSubmissionText,
          files: hwFiles,
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowHomeworkModal(false);
        setHwSubmissionText("");
        setHwFiles([]);
        fetchStudentData();
      }
    } catch (err) {
      console.error("Homework submit error:", err);
    } finally {
      setSubmittingHw(false);
    }
  };

  // Mock file attachment
  const handleAddFileAttachment = () => {
    const fileName = `Ethan_HW_Attachment_${Date.now().toString().slice(-4)}.pdf`;
    setHwFiles([...hwFiles, { name: fileName, url: "https://example.com/files/uploaded-doc.pdf", size: "1.5 MB", type: "pdf" }]);
  };

  // AI Assistant Submission
  const handleSendAiPrompt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userText = aiPrompt;
    setAiPrompt("");
    const newChat = [...aiChatHistory, { sender: "user" as const, text: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
    setAiChatHistory(newChat);
    setAiLoading(true);

    try {
      const res = await fetch("/api/student/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          subject: selectedSubject?.name || "AP Calculus BC & Physics C",
          mode: "socratic_tutor",
        })
      });
      const data = await res.json();
      setAiChatHistory([
        ...newChat,
        {
          sender: "ai",
          text: data.response || "Let us analyze this problem step-by-step together!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } catch (err) {
      console.error("AI Assistant error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  // Quiz Option Click
  const handleSelectQuizOption = (optIdx: number) => {
    if (quizSelectedOption !== null) return;
    setQuizSelectedOption(optIdx);
    if (optIdx === mcqQuestions[quizQuestionIndex].correct) {
      setQuizScore(quizScore + 1);
    }
  };

  // Quiz Next
  const handleNextQuizQuestion = () => {
    if (quizQuestionIndex + 1 < mcqQuestions.length) {
      setQuizQuestionIndex(quizQuestionIndex + 1);
      setQuizSelectedOption(null);
    } else {
      setQuizCompleted(true);
      // Record quiz result
      saveQuizScoreToBackend();
    }
  };

  const saveQuizScoreToBackend = async () => {
    try {
      const pct = Math.round(((quizScore + (quizSelectedOption === mcqQuestions[quizQuestionIndex]?.correct ? 1 : 0)) / mcqQuestions.length) * 100);
      await fetch("/api/student/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          subject: "AP Calculus BC & Physics C",
          quizTitle: "Self-Study Practice Assessment",
          quizType: "MCQ",
          score: quizScore,
          totalQuestions: mcqQuestions.length,
          percentage: pct,
          timeSpentMinutes: 5,
          feedback: pct >= 80 ? "Excellence demonstrated on AP Concept Review!" : "Solid practice! Review step-by-step solutions.",
        })
      });
      fetchStudentData();
    } catch (err) {
      console.error("Save quiz error:", err);
    }
  };

  // Send message handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.trim()) return;
    const targetEmail = selectedMessageTutor ? selectedMessageTutor.email : "tutor.wright@aceeducation.us";
    const targetName = selectedMessageTutor ? selectedMessageTutor.name : "Dr. Alexander Wright";

    try {
      const res = await fetch("/api/student/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverEmail: targetEmail,
          receiverName: targetName,
          receiverRole: "tutor",
          subject: "Academic Question",
          content: messageContent,
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessageContent("");
        const fetchRes = await fetch(`/api/student/messages`);
        const fetchJson = await fetchRes.json();
        if (fetchJson.messages) setMessagesList(fetchJson.messages);
      }
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-navy border-t-gold rounded-full animate-spin"></div>
        <p className="text-xs font-bold text-navy uppercase tracking-widest">Synchronizing ACE Student LMS Engine...</p>
      </div>
    );
  }

  const recordsList: StructuredLessonRecord[] = dashboardData?.records || [];
  const homeworkList = dashboardData?.homework || [];
  const subjectsList = dashboardData?.assignedSubjects || [];
  const upcomingLessons = dashboardData?.upcomingLessons || [];
  const resourcesList = dashboardData?.resources || [];
  const milestonesList = dashboardData?.milestones || [];
  const achievementsList = dashboardData?.achievements || [];
  const notificationsList = dashboardData?.notifications || [];
  const announcementsList = dashboardData?.announcements || [];

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Top Banner Header */}
      <section className="bg-navy py-10 border-b border-gold/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-navy bg-gold px-3 py-1 rounded-full uppercase tracking-widest">
                Student Learning Management System
              </span>
              <span className="text-xs text-white/60 font-semibold">ID: {dashboardData?.profile?.id || "STU-2026-084"}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mt-2">
              Welcome back, <span className="text-gold">{studentName}</span>
            </h1>
            <p className="text-white/70 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
              {dashboardData?.profile?.school} • {dashboardData?.profile?.grade} • {dashboardData?.profile?.academicStatus}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">AP & SAT Scholar</div>
                <div className="text-[11px] text-gold font-bold">100% Attendance Rate</div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("ai-tutor")}
              className="bg-gold hover:bg-gold/90 text-navy font-black px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-navy" /> Ask AI Study Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Metric Quick Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Attendance Rate</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">{dashboardData?.attendanceStats?.attendanceRate || "100%"}</div>
            <div className="text-[11px] text-gray-500 font-medium">Synced with Parent Portal</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Subjects</span>
              <BookOpen className="w-4 h-4 text-navy" />
            </div>
            <div className="text-2xl font-black text-navy">{subjectsList.length}</div>
            <div className="text-[11px] text-gray-500 font-medium">AP Calc, AP Physics, SAT</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Homework Due</span>
              <FileText className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-black text-orange-600">
              {homeworkList.filter((h: any) => h.status === "Pending").length}
            </div>
            <div className="text-[11px] text-gray-500 font-medium">Active Assignments</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Quiz Avg Score</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-purple-600">{dashboardData?.academicProgress?.quizAverage || "96.5%"}</div>
            <div className="text-[11px] text-gray-500 font-medium">Top Percentile</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Badges Unlocked</span>
              <Zap className="w-4 h-4 text-gold" />
            </div>
            <div className="text-2xl font-black text-navy">
              {achievementsList.filter((a: any) => a.unlocked).length} / {achievementsList.length}
            </div>
            <div className="text-[11px] text-navy/70 font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" /> 7-Day Streak
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-md overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "subjects", label: "My Subjects", icon: BookOpen },
            { id: "lessons", label: "Lesson Center", icon: Layers },
            { id: "homework", label: "Homework", icon: FileText },
            { id: "resources", label: "Resources", icon: Download },
            { id: "practice", label: "Practice Center", icon: Brain },
            { id: "journey", label: "Academic Journey", icon: TrendingUp },
            { id: "calendar", label: "Calendar", icon: CalendarDays },
            { id: "messages", label: "Messaging", icon: MessageSquare },
            { id: "ai-tutor", label: "AI Study Assistant", icon: Sparkles },
            { id: "achievements", label: "Achievements", icon: Award },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive ? "bg-navy text-gold shadow-md" : "text-gray-600 hover:text-navy hover:bg-bg-light"
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-gray-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left 2 Cols: Lessons Today & Upcoming */}
              <div className="md:col-span-2 space-y-6">
                {/* Upcoming Live Sessions */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-navy flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gold" /> Scheduled Upcoming Lessons
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">Live video room links & tutor session details</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                      ACE Live Synchronized
                    </span>
                  </div>

                  <div className="space-y-3">
                    {upcomingLessons.length > 0 ? (
                      upcomingLessons.map((less: any) => (
                        <div
                          key={less.id}
                          className="p-5 rounded-2xl border border-gray-100 bg-bg-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold/30 transition-all"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">
                                {less.subject}
                              </span>
                              <span className="text-xs font-bold text-gray-500">
                                {new Date(less.startTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <h3 className="font-extrabold text-navy text-sm">{less.topic}</h3>
                            <p className="text-xs text-gray-600">Assigned Tutor: <strong className="text-navy">{less.tutorName}</strong></p>
                          </div>

                          <a
                            href={less.meetingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-navy hover:bg-navy-light text-gold font-extrabold px-5 py-2.5 rounded-xl text-xs shrink-0 flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                          >
                            <VideoOff className="w-3.5 h-3.5" /> Join Live Virtual Classroom
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 text-center py-6">No upcoming lessons scheduled.</p>
                    )}
                  </div>
                </div>

                {/* Assigned Tutors Panel */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-4">
                  <h2 className="text-lg font-black text-navy flex items-center gap-2 border-b border-gray-100 pb-4">
                    <User className="w-5 h-5 text-gold" /> Assigned ACE Expert Tutors
                  </h2>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {dashboardData?.tutors?.map((tut: any) => (
                      <div key={tut.id} className="p-4 rounded-2xl border border-gray-100 bg-bg-light space-y-3 flex flex-col justify-between">
                        <div className="flex items-center gap-3">
                          <img src={tut.avatar} alt={tut.name} className="w-10 h-10 rounded-full object-cover border-2 border-gold" />
                          <div>
                            <h4 className="font-extrabold text-navy text-xs">{tut.name}</h4>
                            <span className="text-[10px] text-gray-500 font-bold block">{tut.subject}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-200/60">
                          <span className="font-extrabold text-navy flex items-center gap-1">
                            <Star className="w-3 h-3 text-gold fill-gold" /> {tut.rating}
                          </span>

                          <button
                            onClick={() => {
                              setSelectedMessageTutor(tut);
                              setActiveTab("messages");
                            }}
                            className="text-navy font-extrabold hover:text-gold flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" /> Message
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Lesson Records */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-black text-navy flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gold" /> Permanent Lesson Records & AI Briefs
                    </h2>
                    <button
                      onClick={() => setActiveTab("lessons")}
                      className="text-xs font-bold text-navy hover:text-gold flex items-center gap-1"
                    >
                      View All Archive <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {recordsList.slice(0, 2).map((rec) => (
                      <div key={rec.id} className="p-4 rounded-2xl border border-gray-100 bg-bg-light space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-navy bg-gold px-2 py-0.5 rounded-full uppercase">
                            {rec.subject} • {rec.tutorName}
                          </span>
                          <span className="text-xs text-gray-400 font-semibold">{new Date(rec.startTime).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-extrabold text-navy text-xs">{rec.lessonSummary}</h4>
                        {rec.aiGeneratedRevisionSummary && (
                          <p className="text-[11px] text-navy/80 italic bg-white p-3 rounded-xl border border-gray-200 line-clamp-2">
                            &ldquo;{rec.aiGeneratedRevisionSummary}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Announcements & Quick Homework */}
              <div className="space-y-6">
                {/* Announcements */}
                <div className="bg-navy text-white rounded-3xl p-6 border border-gold/30 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-black text-sm uppercase tracking-wider text-gold flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gold" /> Announcements
                    </h3>
                    <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full font-bold">Live Broadcast</span>
                  </div>

                  <div className="space-y-3">
                    {announcementsList.map((ann: any) => (
                      <div key={ann.id} className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-[10px] text-gold font-extrabold uppercase">{ann.author} • {ann.date}</span>
                        <h4 className="font-extrabold text-white text-xs">{ann.title}</h4>
                        <p className="text-[11px] text-white/80 leading-relaxed">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Homework Quick Action */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="font-black text-sm uppercase tracking-wider text-navy flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-600" /> Pending Homework
                    </h3>
                    <button
                      onClick={() => setActiveTab("homework")}
                      className="text-xs text-navy font-bold hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {homeworkList.filter((h: any) => h.status === "Pending").map((hw: any) => (
                      <div key={hw.id} className="p-4 rounded-2xl border-2 border-orange-200 bg-orange-50/50 space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold bg-navy text-gold px-2 py-0.5 rounded-full uppercase">{hw.subject}</span>
                          <span className="font-extrabold text-orange-700">Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-extrabold text-navy text-xs">{hw.title}</h4>
                        <button
                          onClick={() => {
                            setSelectedHomeworkToSubmit(hw);
                            setShowHomeworkModal(true);
                          }}
                          className="w-full bg-navy hover:bg-navy-light text-white font-extrabold py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5 text-gold" /> Upload & Submit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Study Assistant Quick Banner */}
                <div className="bg-gradient-to-br from-navy via-navy to-navy-light text-white p-6 rounded-3xl border-2 border-gold/40 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-gold animate-pulse" /> Socratic AI Tutor
                    </span>
                    <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-md font-bold">Gemini 2.5</span>
                  </div>
                  <h3 className="font-black text-sm text-white">Stuck on a Calculus or Physics Problem?</h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Ask the ACE AI Tutor for step-by-step guidance, formula derivations, or practice problem hints!
                  </p>
                  <button
                    onClick={() => setActiveTab("ai-tutor")}
                    className="w-full bg-gold hover:bg-gold/90 text-navy font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    Launch Interactive AI Tutor <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY SUBJECTS */}
        {activeTab === "subjects" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-navy">My Enrolled Subjects</h2>
              <p className="text-xs text-gray-500 mt-1">Dedicated curriculum guides, assigned tutors, topic roadmaps, and resources.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {subjectsList.map((sub: any, i: number) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl border border-gray-200 bg-bg-light space-y-4 hover:border-gold hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-navy bg-gold px-3 py-1 rounded-full uppercase tracking-wider">
                        {sub.curriculum}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {sub.learningProgress}% Progress
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-navy">{sub.name}</h3>
                    <p className="text-xs text-gray-600">Assigned Tutor: <strong className="text-navy">{sub.tutor}</strong></p>

                    <div className="bg-white p-3 rounded-2xl border border-gray-200 space-y-1.5 text-xs">
                      <div className="flex justify-between text-gray-500 font-semibold">
                        <span>Current Topic:</span>
                        <span className="text-navy font-bold truncate max-w-[150px]">{sub.currentTopic}</span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-semibold">
                        <span>Next Lesson:</span>
                        <span className="text-navy font-bold">{sub.nextLesson}</span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-semibold">
                        <span>Resources:</span>
                        <span className="text-navy font-bold">{sub.resourcesCount} Shared Assets</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSubject(sub)}
                    className="w-full bg-navy hover:bg-navy-light text-gold font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    Open Subject Syllabus & Center <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LESSON CENTER */}
        {activeTab === "lessons" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-2xl font-black text-navy">Lesson Center & Archive</h2>
                <p className="text-xs text-gray-500 mt-1">Permanent structured lesson records, tutor summaries, objectives, and AI briefs.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search topic or tutor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs focus:border-gold focus:outline-none bg-bg-light"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {recordsList.map((rec) => (
                <div
                  key={rec.id}
                  className="p-6 rounded-2xl border border-gray-100 bg-bg-light hover:border-gold/30 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-navy bg-gold px-3 py-1 rounded-full uppercase tracking-wider">
                        {rec.subject}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">
                        {new Date(rec.startTime).toLocaleDateString(undefined, {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        Attendance: {rec.attendance}
                      </span>
                      <span className="text-[11px] font-bold text-navy bg-white border border-gray-200 px-2.5 py-0.5 rounded-full">
                        {rec.studentParticipation}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <div className="text-xs text-gray-500 font-bold">
                        Tutor: <span className="text-navy">{rec.tutorName}</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-navy">{rec.lessonSummary}</h3>

                      {rec.topicsCovered && rec.topicsCovered.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {rec.topicsCovered.map((topic, i) => (
                            <span key={i} className="text-[10px] font-bold bg-white text-navy px-2 py-0.5 rounded-md border border-gray-200">
                              #{topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {rec.aiGeneratedRevisionSummary && (
                      <div className="bg-navy text-white p-4 rounded-xl space-y-1.5 border border-gold/30 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-gold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-gold" /> AI Revision Brief
                          </div>
                          <p className="text-[11px] text-white/90 italic leading-relaxed mt-1 line-clamp-3">
                            {rec.aiGeneratedRevisionSummary}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedRecord(rec)}
                          className="text-[10px] font-extrabold text-gold hover:underline flex items-center gap-1 self-start mt-2"
                        >
                          Read Full Revision Brief <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between">
                    <div className="text-[11px] text-gray-500 font-medium">
                      Homework: <span className="font-bold text-navy">{rec.homeworkAssigned || "None"}</span>
                    </div>

                    <button
                      onClick={() => setSelectedRecord(rec)}
                      className="bg-navy hover:bg-navy-light text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-gold" /> Review Full Lesson Record
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HOMEWORK MANAGEMENT */}
        {activeTab === "homework" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-2xl font-black text-navy">Homework & Assignment Management</h2>
                <p className="text-xs text-gray-500 mt-1">Upload files (PDF, DOCX, Images), submit solutions, track submission deadlines and tutor grades.</p>
              </div>

              <button
                onClick={() => {
                  setSelectedHomeworkToSubmit({ title: "Custom Homework Submission", subject: "AP Calculus BC" });
                  setShowHomeworkModal(true);
                }}
                className="bg-navy hover:bg-navy-light text-gold font-extrabold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" /> Upload Custom File / Assignment
              </button>
            </div>

            <div className="space-y-4">
              {homeworkList.map((hw: any) => (
                <div
                  key={hw.id}
                  className={`p-6 rounded-3xl border-2 space-y-4 ${
                    hw.status === "Graded"
                      ? "border-emerald-200 bg-emerald-50/40"
                      : hw.status === "Submitted"
                      ? "border-blue-200 bg-blue-50/40"
                      : "border-orange-200 bg-orange-50/40"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-navy bg-gold px-3 py-1 rounded-full uppercase">
                        {hw.subject}
                      </span>
                      <span className="text-xs font-bold text-gray-600">Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
                    </div>

                    <span
                      className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                        hw.status === "Graded"
                          ? "bg-emerald-200 text-emerald-900"
                          : hw.status === "Submitted"
                          ? "bg-blue-200 text-blue-900"
                          : "bg-orange-200 text-orange-900"
                      }`}
                    >
                      Status: {hw.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-extrabold text-navy text-base">{hw.title}</h3>
                    <p className="text-xs text-gray-700">{hw.description}</p>
                  </div>

                  {hw.status === "Graded" && (
                    <div className="bg-white p-4 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-emerald-800 uppercase tracking-wider text-[11px]">
                          Tutor Grade: {hw.grade}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">Graded by Dr. Wright</span>
                      </div>
                      <p className="text-gray-700 italic">&ldquo;{hw.tutorFeedback}&rdquo;</p>
                    </div>
                  )}

                  {hw.fileUrls && hw.fileUrls.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Submitted Files:</span>
                      <div className="flex flex-wrap gap-2">
                        {hw.fileUrls.map((f: any, idx: number) => (
                          <div key={idx} className="bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-navy font-bold flex items-center gap-2">
                            <Paperclip className="w-3.5 h-3.5 text-gold" /> {f.name} ({f.size})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hw.status === "Pending" && (
                    <div className="pt-2 border-t border-orange-200 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedHomeworkToSubmit(hw);
                          setShowHomeworkModal(true);
                        }}
                        className="bg-navy hover:bg-navy-light text-gold font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload File & Submit Solution
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LEARNING RESOURCES */}
        {activeTab === "resources" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-2xl font-black text-navy">Learning Resources & Asset Library</h2>
                <p className="text-xs text-gray-500 mt-1">Download PDF notes, worksheets, slide decks, and official College Board practice papers shared by tutors.</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-navy bg-bg-light"
                >
                  <option value="all">All Subjects</option>
                  <option value="AP Calculus BC">AP Calculus BC</option>
                  <option value="AP Physics C">AP Physics C</option>
                  <option value="SAT Prep">SAT Prep</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {resourcesList
                .filter((r: any) => subjectFilter === "all" || r.subject === subjectFilter)
                .map((res: any) => (
                  <div key={res.id} className="p-6 rounded-3xl border border-gray-200 bg-bg-light space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">
                          {res.subject} • {res.type}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">{res.fileSize}</span>
                      </div>
                      <h3 className="font-extrabold text-navy text-sm">{res.title}</h3>
                      <p className="text-xs text-gray-600">{res.description}</p>
                      <div className="text-[11px] text-gray-400 font-bold">Uploaded by: {res.tutorName}</div>
                    </div>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-navy hover:bg-navy-light text-gold font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-3"
                    >
                      <Download className="w-4 h-4" /> Download & View Learning Asset
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 6: PRACTICE CENTER */}
        {activeTab === "practice" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-2xl font-black text-navy">Self-Study Practice Center</h2>
                <p className="text-xs text-gray-500 mt-1">Interactive quizzes, timed AP/SAT practice, digital flashcards, and vocabulary builder.</p>
              </div>

              <div className="flex items-center gap-2 bg-bg-light p-1 rounded-2xl border border-gray-200">
                {[
                  { id: "mcq", label: "MCQ Quizzes" },
                  { id: "flashcards", label: "Flashcard Deck" },
                  { id: "vocab", label: "Vocab Builder" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setActiveQuizMode(mode.id as any);
                      setQuizStarted(false);
                      setQuizCompleted(false);
                      setQuizQuestionIndex(0);
                      setQuizSelectedOption(null);
                      setQuizScore(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeQuizMode === mode.id ? "bg-navy text-gold shadow-sm" : "text-gray-600 hover:text-navy"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MCQ Quiz Submodule */}
            {activeQuizMode === "mcq" && (
              <div className="space-y-6">
                {!quizStarted && !quizCompleted && (
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-navy to-navy-light text-white space-y-4 border border-gold/30">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-navy bg-gold px-3 py-1 rounded-full uppercase">
                        AP Calculus & Physics Diagnostic
                      </span>
                      <span className="text-xs text-gold font-bold">3 Questions • Timed Diagnostic</span>
                    </div>
                    <h3 className="text-2xl font-black text-white">AP Calculus BC & Physics C Interactive Concept Check</h3>
                    <p className="text-xs text-white/80 leading-relaxed max-w-xl">
                      Test your understanding on Taylor Series expansions, convergence tests, and rotational dynamics moments of inertia.
                    </p>
                    <button
                      onClick={() => setQuizStarted(true)}
                      className="bg-gold hover:bg-gold/90 text-navy font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      Start Interactive Practice Quiz <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {quizStarted && !quizCompleted && (
                  <div className="p-6 rounded-3xl border-2 border-navy/10 bg-bg-light space-y-6">
                    <div className="flex items-center justify-between text-xs font-extrabold text-navy border-b border-gray-200 pb-3">
                      <span>Question {quizQuestionIndex + 1} of {mcqQuestions.length}</span>
                      <span className="text-gold bg-navy px-3 py-1 rounded-full">Score: {quizScore}</span>
                    </div>

                    <h3 className="text-base font-black text-navy">{mcqQuestions[quizQuestionIndex].question}</h3>

                    <div className="space-y-3">
                      {mcqQuestions[quizQuestionIndex].options.map((opt, optIdx) => {
                        const isSelected = quizSelectedOption === optIdx;
                        const isCorrect = optIdx === mcqQuestions[quizQuestionIndex].correct;
                        let optionStyle = "border-gray-200 bg-white hover:border-gold";

                        if (quizSelectedOption !== null) {
                          if (isCorrect) optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-extrabold";
                          else if (isSelected) optionStyle = "border-red-500 bg-red-50 text-red-900";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(optIdx)}
                            className={`w-full p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer ${optionStyle}`}
                          >
                            <span className="font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                          </button>
                        );
                      })}
                    </div>

                    {quizSelectedOption !== null && (
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2 text-xs">
                        <strong className="text-navy uppercase text-[10px] tracking-wider block">Solution Explanation:</strong>
                        <p className="text-gray-700 leading-relaxed">{mcqQuestions[quizQuestionIndex].explanation}</p>
                        <button
                          onClick={handleNextQuizQuestion}
                          className="mt-2 bg-navy text-gold font-black px-5 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                        >
                          Next Question <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {quizCompleted && (
                  <div className="p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4">
                    <Award className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-2xl font-black text-navy">Practice Assessment Completed!</h3>
                    <p className="text-sm font-bold text-emerald-800">
                      Your Final Score: {quizScore} / {mcqQuestions.length} ({Math.round((quizScore / mcqQuestions.length) * 100)}%)
                    </p>
                    <p className="text-xs text-gray-600">Your score has been saved to your permanent Academic Progress dashboard.</p>
                    <button
                      onClick={() => {
                        setQuizStarted(false);
                        setQuizCompleted(false);
                        setQuizQuestionIndex(0);
                        setQuizSelectedOption(null);
                        setQuizScore(0);
                      }}
                      className="bg-navy text-gold font-black px-6 py-2.5 rounded-2xl text-xs cursor-pointer inline-flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Retake Practice Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Flashcards Submodule */}
            {activeQuizMode === "flashcards" && (
              <div className="space-y-6 text-center max-w-xl mx-auto">
                <div className="text-xs font-bold text-gray-400">Card {flashcardIndex + 1} of {flashcardsData.length}</div>
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="p-10 rounded-3xl bg-navy text-white border-2 border-gold/40 shadow-2xl cursor-pointer min-h-[220px] flex flex-col items-center justify-center space-y-3 transition-all hover:scale-[1.01]"
                >
                  <span className="text-[10px] font-black text-gold bg-white/10 px-3 py-1 rounded-full uppercase">
                    {flashcardsData[flashcardIndex].subject} • Click to Flip
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {flashcardFlipped ? flashcardsData[flashcardIndex].definition : flashcardsData[flashcardIndex].term}
                  </h3>
                  <span className="text-[10px] text-gold font-bold">
                    {flashcardFlipped ? "Definition" : "Term"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFlashcardFlipped(false);
                      setFlashcardIndex((flashcardIndex - 1 + flashcardsData.length) % flashcardsData.length);
                    }}
                    className="bg-bg-light border border-gray-200 text-navy font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      setFlashcardFlipped(false);
                      setFlashcardIndex((flashcardIndex + 1) % flashcardsData.length);
                    }}
                    className="bg-navy text-gold font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                  >
                    Next Card
                  </button>
                </div>
              </div>
            )}

            {/* Vocab Builder Submodule */}
            {activeQuizMode === "vocab" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {vocabData.map((v, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-gray-200 bg-bg-light space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-navy text-sm">{v.word}</h4>
                      <span className="text-[10px] font-bold text-gold bg-navy px-2 py-0.5 rounded-md uppercase">{v.POS}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed mt-1">{v.def}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: ACADEMIC PROGRESS & SUCCESS JOURNEY */}
        {activeTab === "journey" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-navy">Student Success Journey & Progress Dashboard</h2>
              <p className="text-xs text-gray-500 mt-1">Long-term academic milestone tracking, initial diagnostic baseline, skills mastered, and AP exam readiness.</p>
            </div>

            {/* Visual Skill Progress Bars */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl border border-gray-200 bg-bg-light space-y-4">
                <h3 className="font-black text-navy text-sm uppercase tracking-wider flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-gold" /> Core Subject Mastery Trends
                </h3>

                {subjectsList.map((sub: any, i: number) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-navy">
                      <span>{sub.name}</span>
                      <span className="text-emerald-700">{sub.learningProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-navy rounded-full transition-all duration-500" style={{ width: `${sub.learningProgress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths & Exam Readiness */}
              <div className="p-6 rounded-3xl bg-navy text-white space-y-4 border border-gold/30">
                <h3 className="font-black text-gold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4 text-gold" /> AP Exam Readiness & Strengths
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <span>AP Calculus BC Estimated Score</span>
                    <strong className="text-gold font-black text-sm">5 (Exceeding)</strong>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <span>AP Physics C Mechanics Readiness</span>
                    <strong className="text-emerald-400 font-black text-sm">92% High</strong>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                    <span>SAT Math Digital Percentile</span>
                    <strong className="text-purple-300 font-black text-sm">Top 1% (780+)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Milestones History Timeline */}
            <div className="space-y-4">
              <h3 className="font-black text-navy text-base">Long-Term Academic Milestones</h3>
              <div className="space-y-3">
                {milestonesList.map((mile: any) => (
                  <div key={mile.id} className="p-5 rounded-2xl border border-gray-200 bg-bg-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">
                          {mile.category}
                        </span>
                        <span className="text-xs text-gray-400 font-bold">{new Date(mile.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="font-extrabold text-navy text-sm">{mile.title}</h4>
                      <p className="text-xs text-gray-600">{mile.description}</p>
                    </div>

                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                      {mile.scoreOrProgress}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: CALENDAR */}
        {activeTab === "calendar" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-navy">Academic Calendar & Schedule</h2>
                <p className="text-xs text-gray-500 mt-1">Synchronized schedule of upcoming lessons, homework deadlines, diagnostic exams, and holidays.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {upcomingLessons.map((less: any) => (
                <div key={less.id} className="p-5 rounded-2xl border border-gray-200 bg-bg-light space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-navy bg-gold px-2.5 py-0.5 rounded-full uppercase">{less.subject}</span>
                    <span className="font-bold text-gray-500">{new Date(less.startTime).toLocaleString()}</span>
                  </div>
                  <h4 className="font-extrabold text-navy text-sm">{less.topic}</h4>
                  <p className="text-xs text-gray-600">Assigned Tutor: {less.tutorName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: MESSAGING */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-navy">Internal In-App Student Messaging</h2>
              <p className="text-xs text-gray-500 mt-1">Communicate directly with assigned tutors and ACE Support safely inside the platform.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Col: Contact Select */}
              <div className="space-y-3">
                <span className="text-xs font-black text-navy uppercase tracking-wider block">Assigned Tutors & Support</span>
                {dashboardData?.tutors?.map((tut: any) => (
                  <button
                    key={tut.id}
                    onClick={() => setSelectedMessageTutor(tut)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                      selectedMessageTutor?.id === tut.id ? "border-gold bg-navy text-white" : "border-gray-200 bg-bg-light text-navy"
                    }`}
                  >
                    <img src={tut.avatar} alt={tut.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold">{tut.name}</h4>
                      <span className="text-[10px] opacity-70 block">{tut.subject}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right 2 Cols: Message History & Input */}
              <div className="md:col-span-2 border border-gray-200 rounded-3xl p-6 bg-bg-light space-y-4 flex flex-col justify-between min-h-[350px]">
                <div className="space-y-3 overflow-y-auto max-h-[300px]">
                  {messagesList.length > 0 ? (
                    messagesList.map((m: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl text-xs max-w-[80%] space-y-1 ${
                          m.senderRole === "student"
                            ? "bg-navy text-white ml-auto border border-gold/30"
                            : "bg-white text-navy border border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between gap-2 text-[10px] opacity-70 font-bold">
                          <span>{m.senderName}</span>
                          <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="leading-relaxed">{m.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-12">No messages exchanged yet. Send a message to Dr. Wright!</p>
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-gray-200">
                  <input
                    type="text"
                    placeholder={`Message ${selectedMessageTutor?.name || "Dr. Alexander Wright"}...`}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:border-gold focus:outline-none bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-navy hover:bg-navy-light text-gold font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: AI STUDY ASSISTANT */}
        {activeTab === "ai-tutor" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-navy flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-gold" /> AI Socratic Educational Assistant
                </h2>
                <p className="text-xs text-gray-500 mt-1">Guided learning, step-by-step problem hints, formula derivations, and concept explanations powered by Gemini.</p>
              </div>
              <span className="text-xs font-black text-navy bg-gold px-3 py-1 rounded-full uppercase">
                Socratic Tutor Mode Active
              </span>
            </div>

            <div className="border border-gray-200 rounded-3xl p-6 bg-bg-light space-y-4 min-h-[400px] flex flex-col justify-between">
              <div className="space-y-3 overflow-y-auto max-h-[350px]">
                {aiChatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                      msg.sender === "user"
                        ? "bg-navy text-white ml-auto max-w-[80%] border border-gold/30"
                        : "bg-white text-navy border border-gold/30 shadow-sm max-w-[90%]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className={msg.sender === "ai" ? "text-gold uppercase tracking-wider flex items-center gap-1" : "text-white/70"}>
                        {msg.sender === "ai" ? <><Sparkles className="w-3 h-3 text-gold" /> ACE Socratic AI Tutor</> : "Ethan Harrison"}
                      </span>
                      <span className="opacity-60">{msg.time}</span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                ))}

                {aiLoading && (
                  <div className="p-4 bg-white rounded-2xl border border-gold/30 text-xs font-bold text-navy flex items-center gap-2 max-w-[50%]">
                    <Sparkles className="w-4 h-4 text-gold animate-spin" /> Generating step-by-step Socratic guidance...
                  </div>
                )}
              </div>

              <form onSubmit={handleSendAiPrompt} className="flex gap-2 pt-3 border-t border-gray-200">
                <input
                  type="text"
                  placeholder="Ask for a step-by-step hint, formula explanation, or practice problem..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-xs focus:border-gold focus:outline-none bg-white font-medium"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="bg-navy hover:bg-navy-light text-gold font-black px-6 py-3 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Ask AI
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 11: ACHIEVEMENTS & BADGES */}
        {activeTab === "achievements" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-2xl font-black text-navy">Motivational Academic Badges</h2>
              <p className="text-xs text-gray-500 mt-1">Badges unlock automatically upon completing lessons, homework, and practice quizzes.</p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {achievementsList.map((badge: any) => (
                <div
                  key={badge.id}
                  className={`p-6 rounded-3xl border-2 space-y-3 flex flex-col justify-between ${
                    badge.unlocked
                      ? "border-gold/50 bg-gradient-to-br from-gold/10 via-white to-white shadow-md"
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-navy text-gold rounded-2xl shadow-sm">
                        <Award className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                          badge.unlocked ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {badge.unlocked ? "Unlocked" : "Locked"}
                      </span>
                    </div>

                    <h3 className="font-black text-navy text-base">{badge.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{badge.description}</p>
                  </div>

                  {badge.unlockedAt && (
                    <span className="text-[10px] font-bold text-gold text-navy/70 pt-2 border-t border-gray-200">
                      Unlocked on {new Date(badge.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 12: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black text-navy">Live Notifications & Platform Alerts</h2>
            <div className="space-y-3">
              {notificationsList.map((n: any) => (
                <div key={n.id} className="p-4 rounded-2xl border border-gray-100 bg-bg-light flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-navy bg-gold px-2 py-0.5 rounded-full uppercase">{n.type}</span>
                    <h4 className="font-extrabold text-navy text-xs">{n.title}</h4>
                    <p className="text-xs text-gray-600">{n.message}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold shrink-0">{new Date(n.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULL STRUCTURED LESSON RECORD MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gold/20 w-full max-w-3xl my-8 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-navy p-6 text-white flex items-center justify-between border-b border-gold/20">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-navy bg-gold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedRecord.subject}
                  </span>
                  <span className="text-xs text-emerald-400 font-extrabold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attendance: {selectedRecord.attendance}
                  </span>
                </div>
                <h2 className="text-xl font-black text-white mt-1">Structured Lesson Record</h2>
                <p className="text-xs text-white/70">
                  Lesson ID: #{selectedRecord.lessonId} • {new Date(selectedRecord.startTime).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-bg-light border border-gray-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Student</span>
                  <strong className="text-navy text-sm font-black">{selectedRecord.studentName}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Assigned Tutor</span>
                  <strong className="text-navy text-sm font-bold">{selectedRecord.tutorName}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Date & Time</span>
                  <strong className="text-navy text-xs font-bold">
                    {new Date(selectedRecord.startTime).toLocaleDateString()} (1.5 hrs)
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Participation</span>
                  <strong className="text-emerald-700 text-xs font-bold">{selectedRecord.studentParticipation}</strong>
                </div>
              </div>

              {selectedRecord.aiGeneratedRevisionSummary && (
                <div className="p-5 bg-gradient-to-br from-navy via-navy to-navy-light text-white rounded-2xl border-2 border-gold/40 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-gold animate-pulse" /> AI Generated Revision Summary
                    </span>
                    <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-md font-bold">
                      Powered by Gemini
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/90 italic">
                    {selectedRecord.aiGeneratedRevisionSummary}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-black text-navy uppercase tracking-wider">Lesson Summary</h4>
                <p className="text-xs text-gray-700 bg-bg-light p-4 rounded-2xl border border-gray-200 leading-relaxed font-medium">
                  {selectedRecord.lessonSummary}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-orange-600 uppercase tracking-wider">Homework Assigned</h4>
                <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl text-xs font-bold text-navy">
                  {selectedRecord.homeworkAssigned || "No homework assigned for this session."}
                </div>
              </div>
            </div>

            <div className="bg-bg-light p-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-medium">
                Record Permanently Archived & Synchronized across Portals
              </span>
              <button
                onClick={() => setSelectedRecord(null)}
                className="bg-navy hover:bg-navy-light text-white font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD HOMEWORK MODAL */}
      {showHomeworkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gold/20 w-full max-w-xl p-6 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-black text-navy text-lg">Submit Homework Solution</h3>
                <p className="text-xs text-gray-500">{selectedHomeworkToSubmit?.title}</p>
              </div>
              <button onClick={() => setShowHomeworkModal(false)} className="text-gray-400 hover:text-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleHomeworkSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy block">Submission Notes / Written Solution</label>
                <textarea
                  rows={4}
                  placeholder="Type your written answer or notes for Dr. Wright..."
                  value={hwSubmissionText}
                  onChange={(e) => setHwSubmissionText(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:border-gold focus:outline-none bg-bg-light"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-navy block">Attach Documents / Images / PDF</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 text-center space-y-2 bg-bg-light">
                  <Upload className="w-8 h-8 text-gold mx-auto" />
                  <p className="text-xs text-gray-600 font-medium">Upload PDF, Word document, or image calculation photos</p>
                  <button
                    type="button"
                    onClick={handleAddFileAttachment}
                    className="bg-navy text-gold font-bold px-4 py-2 rounded-xl text-xs cursor-pointer inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Attach Document
                  </button>
                </div>

                {hwFiles.length > 0 && (
                  <div className="space-y-1">
                    {hwFiles.map((f, i) => (
                      <div key={i} className="text-xs text-navy font-bold p-2 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Paperclip className="w-3.5 h-3.5 text-gold" /> {f.name}</span>
                        <span className="text-gray-400 text-[10px]">{f.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowHomeworkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingHw}
                  className="bg-navy hover:bg-navy-light text-gold font-black px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-md"
                >
                  {submittingHw ? "Submitting..." : "Confirm & Submit Homework"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBJECT DETAIL DRAWER MODAL */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gold/20 w-full max-w-2xl p-6 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-black bg-gold text-navy px-3 py-0.5 rounded-full uppercase">{selectedSubject.curriculum}</span>
                <h3 className="font-black text-navy text-xl mt-1">{selectedSubject.name}</h3>
                <p className="text-xs text-gray-500">Assigned Tutor: {selectedSubject.tutor}</p>
              </div>
              <button onClick={() => setSelectedSubject(null)} className="text-gray-400 hover:text-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 bg-bg-light rounded-2xl border border-gray-100">
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase block">Learning Progress</span>
                  <strong className="text-emerald-700 text-sm font-black">{selectedSubject.learningProgress}% Mastered</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] font-bold uppercase block">Attendance Rate</span>
                  <strong className="text-navy text-sm font-black">{selectedSubject.attendance}%</strong>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-navy uppercase text-xs">Current Syllabus Focus</h4>
                <p className="p-3 bg-bg-light rounded-xl border border-gray-200 text-navy font-semibold">{selectedSubject.currentTopic}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-navy uppercase text-xs">Assigned Homework Status</h4>
                <p className="p-3 bg-orange-50 border border-orange-200 text-navy font-bold rounded-xl">{selectedSubject.homeworkStatus}</p>
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-gray-100">
              <button
                onClick={() => setSelectedSubject(null)}
                className="bg-navy text-gold font-black px-6 py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Close Subject View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
