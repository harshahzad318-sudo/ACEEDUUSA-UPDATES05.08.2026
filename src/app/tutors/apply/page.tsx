"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  ShieldCheck,
  FileText,
  Video,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Clock,
  Award,
  UploadCloud,
  Check
} from "lucide-react";
import { SUBJECTS, EXAMS, STATES } from "@/lib/data";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Professional", icon: Briefcase },
  { id: 3, title: "Education & Exp", icon: GraduationCap },
  { id: 4, title: "Subjects & Curricula", icon: BookOpen },
  { id: 5, title: "Availability & Rates", icon: DollarSign },
  { id: 6, title: "Verification & Docs", icon: ShieldCheck },
  { id: 7, title: "Demo & Signature", icon: FileText },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = ["Morning (8AM-12PM)", "Afternoon (12PM-5PM)", "Evening (5PM-9PM)"];

export default function TutorApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "USA",
    zipCode: "",
    avatarUrl: "",

    // Professional
    title: "",
    bio: "",
    linkedinUrl: "",

    // Education
    degree: "",
    major: "",
    institution: "",
    graduationYear: 2022,

    // Experience
    totalExperienceYears: 3,
    onlineExperienceYears: 2,
    previousInstitutions: "",
    gradeLevels: [] as string[],

    // Subjects & Curriculums
    subjects: [] as string[],
    curriculums: [] as string[],
    learningModes: ["Online"] as string[],

    // Availability & Compensation
    availability: {
      Monday: ["Afternoon (12PM-5PM)", "Evening (5PM-9PM)"],
      Wednesday: ["Afternoon (12PM-5PM)", "Evening (5PM-9PM)"],
      Friday: ["Evening (5PM-9PM)"],
    } as Record<string, string[]>,
    expectedRate: 45,

    // Docs & Verification
    idType: "Driver's License",
    idDocumentUrl: "",
    resumeUrl: "",
    certificateUrls: [] as string[],
    certInput: "",

    // Demo & Signature
    demoVideoUrl: "",
    digitalSignature: "",
    termsAccepted: false,
    backgroundCheckAccepted: false,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (key: "gradeLevels" | "subjects" | "curriculums" | "learningModes", item: string) => {
    setFormData((prev) => {
      const arr = prev[key];
      const exists = arr.includes(item);
      return {
        ...prev,
        [key]: exists ? arr.filter((i) => i !== item) : [...arr, item],
      };
    });
  };

  const toggleSlot = (day: string, slot: string) => {
    setFormData((prev) => {
      const daySlots = prev.availability[day] || [];
      const exists = daySlots.includes(slot);
      const newDaySlots = exists ? daySlots.filter((s) => s !== slot) : [...daySlots, slot];
      return {
        ...prev,
        availability: {
          ...prev.availability,
          [day]: newDaySlots,
        },
      };
    });
  };

  const addCertificate = () => {
    if (formData.certInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        certificateUrls: [...prev.certificateUrls, prev.certInput.trim()],
        certInput: "",
      }));
    }
  };

  const validateStep = (step: number) => {
    setErrorMsg(null);
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        setErrorMsg("Please fill in your Full Name, Email, and Phone Number.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.title || !formData.bio) {
        setErrorMsg("Please provide your Professional Title and a brief Bio.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.degree || !formData.institution) {
        setErrorMsg("Please specify your Highest Degree and University/Institution.");
        return false;
      }
    }
    if (step === 4) {
      if (formData.subjects.length === 0) {
        setErrorMsg("Please select at least one Subject you are qualified to teach.");
        return false;
      }
    }
    if (step === 5) {
      if (!formData.expectedRate || formData.expectedRate < 15) {
        setErrorMsg("Please enter a valid Expected Compensation ($/hr).");
        return false;
      }
    }
    if (step === 6) {
      if (!formData.idDocumentUrl || !formData.resumeUrl) {
        setErrorMsg("Please provide links or uploads for your ID Document and Resume.");
        return false;
      }
    }
    if (step === 7) {
      if (!formData.digitalSignature || !formData.termsAccepted || !formData.backgroundCheckAccepted) {
        setErrorMsg("Please complete your Digital Signature and accept all terms & background check consent.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 7) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 150, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(7)) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/tutors/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected error occurred. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-bg-light min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 border border-green-100 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest">Application Submitted</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy mt-2 mb-4">Welcome to ACE Education!</h1>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Thank you for applying to join our prestigious tutor network. Your recruitment application (Status: <strong className="text-navy font-bold">Submitted</strong>) has been received and routed to our Academic Admissions Board.
            </p>

            <div className="bg-navy/5 rounded-2xl p-6 text-left mb-8 border border-navy/10 space-y-3">
              <h3 className="font-bold text-navy text-sm uppercase tracking-wider">Next Recruitment Steps:</h3>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span><strong>1. Document Review & ID Verification:</strong> Our recruitment team verifies your degrees, resume, and credentials.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span><strong>2. Academic Demo Interview:</strong> You will receive an email invitation to schedule a live 20-minute teaching demo with a Subject Lead.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span><strong>3. Profile Activation & Student Matching:</strong> Once approved, your Tutor Dashboard activates immediately for student assignment.</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/portals/tutor" className="bg-navy hover:bg-navy-light text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-navy/20">
                Access Tutor Portal
              </Link>
              <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl text-sm transition-all">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy py-16 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">Join Our Faculty</span>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-2">Tutor Application & Recruitment</h1>
          <p className="text-white/70 mt-3 max-w-2xl mx-auto text-sm md:text-base">
            Apply to tutor elite K-12 and college students across North America. Complete our multi-step recruitment application below.
          </p>
        </div>
      </section>

      <section className="py-12 bg-bg-light min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          {/* Progress Steps Header */}
          <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8 border border-gray-100">
            <div className="hidden md:grid grid-cols-7 gap-2">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isActive = step.id === currentStep;
                const isDone = step.id < currentStep;
                return (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isActive
                          ? "bg-gold text-navy ring-4 ring-gold/20 scale-105"
                          : isDone
                          ? "bg-navy text-gold"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className={`text-[11px] font-semibold mt-2 line-clamp-1 ${isActive ? "text-navy font-bold" : "text-gray-500"}`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="md:hidden flex items-center justify-between">
              <span className="text-xs font-bold text-navy uppercase tracking-wider">
                Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
              </span>
              <span className="text-xs text-gold font-bold">{Math.round((currentStep / STEPS.length) * 100)}% Completed</span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <User className="w-5 h-5 text-gold" /> Step 1: Personal Information
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Please provide your primary contact and location details.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleTextChange}
                        placeholder="Dr. Jane Smith"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleTextChange}
                        placeholder="jane.smith@example.com"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleTextChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Profile Photo URL</label>
                      <input
                        type="url"
                        name="avatarUrl"
                        value={formData.avatarUrl}
                        onChange={handleTextChange}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleTextChange}
                        placeholder="Boston"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleTextChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      >
                        <option value="">Select State</option>
                        {STATES.map((s) => (
                          <option key={s.slug} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleTextChange}
                        placeholder="02108"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Professional Info */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gold" /> Step 2: Professional Profile
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Introduce your teaching expertise and professional credentials.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Professional Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleTextChange}
                      placeholder="e.g. Senior AP Calculus & SAT Math Specialist"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Professional Bio *</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleTextChange}
                      rows={4}
                      placeholder="Describe your teaching methodology, achievements, and academic background..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleTextChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Education & Experience */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-gold" /> Step 3: Education & Teaching Experience
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Provide university qualifications and tutoring history.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Highest Degree *</label>
                      <select
                        name="degree"
                        value={formData.degree}
                        onChange={handleTextChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                        required
                      >
                        <option value="">Select Degree</option>
                        <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                        <option value="Master's Degree">Master&apos;s Degree</option>
                        <option value="Ph.D. / Doctorate">Ph.D. / Doctorate</option>
                        <option value="Medical Degree (M.D.)">Medical Degree (M.D.)</option>
                        <option value="Law Degree (J.D.)">Law Degree (J.D.)</option>
                        <option value="Undergraduate Student">Undergraduate Student</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Major / Field of Study</label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleTextChange}
                        placeholder="Applied Mathematics / Computer Science"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">University / Institution *</label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleTextChange}
                        placeholder="MIT / Harvard University"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Graduation Year</label>
                      <input
                        type="number"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleTextChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Total Teaching Experience (Years)</label>
                      <input
                        type="number"
                        name="totalExperienceYears"
                        value={formData.totalExperienceYears}
                        onChange={handleTextChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Online Teaching Experience (Years)</label>
                      <input
                        type="number"
                        name="onlineExperienceYears"
                        value={formData.onlineExperienceYears}
                        onChange={handleTextChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Previous Schools or Companies</label>
                    <input
                      type="text"
                      name="previousInstitutions"
                      value={formData.previousInstitutions}
                      onChange={handleTextChange}
                      placeholder="e.g. Andover Academy, Princeton Review, Varsity Tutors"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">Grade Levels You Prefer to Teach</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Elementary (K-5)", "Middle School (6-8)", "High School (9-12)", "College", "Adult Learners"].map((g) => {
                        const sel = formData.gradeLevels.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() => toggleArrayItem("gradeLevels", g)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                              sel ? "bg-navy text-gold border-navy" : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gold"
                            }`}
                          >
                            {sel ? "✓ " : "+ "} {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Subjects & Curriculums */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gold" /> Step 4: Subjects & Curriculums
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Select all subjects and academic frameworks you master.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wider">Academic Subjects *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border-2 border-gray-100 rounded-2xl bg-gray-50">
                      {[
                        "Math (K-8)",
                        "Algebra I & II",
                        "Geometry",
                        "Pre-Calculus",
                        "AP Calculus AB / BC",
                        "Statistics & AP Stats",
                        "Physics & AP Physics",
                        "Chemistry & AP Chem",
                        "Biology & AP Biology",
                        "SAT Math Prep",
                        "SAT Reading & Writing",
                        "ACT Prep",
                        "English Literature",
                        "Creative & Essay Writing",
                        "Computer Science & Python",
                        "Spanish",
                        "French",
                        "Chinese",
                        "History & AP US History",
                        "Economics",
                      ].map((s) => {
                        const sel = formData.subjects.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleArrayItem("subjects", s)}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                              sel ? "bg-gold text-navy font-bold border-gold shadow-sm" : "bg-white text-gray-700 border-gray-200 hover:border-gold"
                            }`}
                          >
                            {sel ? "✓ " : "+ "} {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wider">Curriculums</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["US Common Core", "AP (Advanced Placement)", "IB Diploma Program", "IGCSE / A-Levels", "Canadian Standard", "State Exam Boards"].map((c) => {
                        const sel = formData.curriculums.includes(c);
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => toggleArrayItem("curriculums", c)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                              sel ? "bg-navy text-gold border-navy" : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gold"
                            }`}
                          >
                            {sel ? "✓ " : "+ "} {c}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wider">Teaching Modes</label>
                    <div className="flex gap-4">
                      {["Online", "In-Home"].map((m) => {
                        const sel = formData.learningModes.includes(m);
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => toggleArrayItem("learningModes", m)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              sel ? "bg-navy text-gold border-navy" : "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            {sel ? "✓ " : "+ "} {m} Tutoring
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Availability & Rates */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-gold" /> Step 5: Availability Calendar & Rate
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Set your weekly teaching availability and desired compensation.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-2 uppercase tracking-wider">Weekly Availability Grid</label>
                    <div className="space-y-3">
                      {DAYS.map((day) => (
                        <div key={day} className="p-3 bg-gray-50 rounded-2xl border border-gray-200 sm:flex sm:items-center sm:justify-between gap-4">
                          <span className="font-bold text-navy text-xs min-w-[100px]">{day}</span>
                          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                            {TIME_SLOTS.map((slot) => {
                              const active = (formData.availability[day] || []).includes(slot);
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => toggleSlot(day, slot)}
                                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                                    active ? "bg-gold text-navy border-gold" : "bg-white text-gray-600 border-gray-200 hover:border-gold"
                                  }`}
                                >
                                  {active ? "✓ " : "+ "} {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gold/10 p-6 rounded-2xl border border-gold/30">
                    <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">Expected Hourly Compensation ($ USD / hour) *</label>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-navy">$</span>
                      <input
                        type="number"
                        name="expectedRate"
                        value={formData.expectedRate}
                        onChange={handleTextChange}
                        min={20}
                        max={150}
                        className="w-32 text-xl font-extrabold text-navy border-2 border-gold rounded-xl px-4 py-2 bg-white focus:outline-none"
                        required
                      />
                      <span className="text-xs text-gray-600">/ hour USD</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: Your final compensation rate will be confirmed upon successful interview and admin onboarding review.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 6: Verification & Docs */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-gold" /> Step 6: Identity & Document Verification
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload or link your government ID, resume, and degree certificates.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Government ID Type *</label>
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleTextChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      >
                        <option value="Driver's License">Driver&apos;s License</option>
                        <option value="Passport">Passport</option>
                        <option value="National ID Card">National ID Card</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">ID Document Link / File URL *</label>
                      <input
                        type="url"
                        name="idDocumentUrl"
                        value={formData.idDocumentUrl}
                        onChange={handleTextChange}
                        placeholder="https://drive.google.com/... or https://example.com/id.pdf"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Resume / CV Document URL *</label>
                    <input
                      type="url"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleTextChange}
                      placeholder="https://example.com/my_resume.pdf"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Certificates & Degree URLs</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={formData.certInput}
                        onChange={(e) => setFormData((prev) => ({ ...prev, certInput: e.target.value }))}
                        placeholder="https://example.com/mit_degree.pdf"
                        className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-gold focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addCertificate}
                        className="bg-navy text-white font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-navy-light"
                      >
                        Add
                      </button>
                    </div>
                    {formData.certificateUrls.length > 0 && (
                      <div className="space-y-1">
                        {formData.certificateUrls.map((cert, idx) => (
                          <div key={idx} className="text-xs text-navy font-mono bg-gray-50 p-2 rounded-lg flex justify-between items-center">
                            <span className="truncate max-w-md">{cert}</span>
                            <button
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, certificateUrls: prev.certificateUrls.filter((_, i) => i !== idx) }))}
                              className="text-red-500 font-bold ml-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 7: Demo & Signature */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gold" /> Step 7: Teaching Demo & Digital Signature
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Provide a teaching video demo and sign the formal recruitment declaration.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Teaching Demo Video URL (Loom, YouTube, Vimeo, Drive)</label>
                    <input
                      type="url"
                      name="demoVideoUrl"
                      value={formData.demoVideoUrl}
                      onChange={handleTextChange}
                      placeholder="https://loom.com/share/... or https://youtube.com/watch?v=..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">A 2-3 minute video introducing yourself and explaining a sample concept.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Digital Signature (Type Full Legal Name) *</label>
                    <input
                      type="text"
                      name="digitalSignature"
                      value={formData.digitalSignature}
                      onChange={handleTextChange}
                      placeholder="e.g. Dr. Jane Marie Smith"
                      className="w-full border-2 border-gold/50 rounded-xl px-4 py-3 text-base font-serif italic text-navy bg-gold/5 focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-gray-700">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => setFormData((prev) => ({ ...prev, termsAccepted: e.target.checked }))}
                        className="mt-0.5 rounded text-navy focus:ring-gold"
                        required
                      />
                      <span>
                        I certify that all information provided in this application is accurate and truthful. I agree to the <strong>ACE Education Tutor Terms & Conditions</strong>.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.backgroundCheckAccepted}
                        onChange={(e) => setFormData((prev) => ({ ...prev, backgroundCheckAccepted: e.target.checked }))}
                        className="mt-0.5 rounded text-navy focus:ring-gold"
                        required
                      />
                      <span>
                        I consent to a standard electronic identity and background verification check as part of the recruitment onboarding process.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <div />}

                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-navy/20 cursor-pointer"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-10 py-4 rounded-xl text-sm transition-all shadow-lg hover:shadow-gold/30 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting Application...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Submit Tutor Application
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
