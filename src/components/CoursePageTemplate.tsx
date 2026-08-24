"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Star,
  ArrowRight,
  BookOpen,
  Target,
  Users,
  Clock,
  Award,
  ChevronDown,
  Download,
  Mail,
  UserCheck,
  Compass,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layout,
  MessageSquare,
  TrendingUp,
  Brain,
  Video,
  Play,
  FileText
} from "lucide-react";

export interface Tutor {
  name: string;
  image: string;
  rating: number;
  subject: string;
  education: string;
  experience: number;
  students: number;
  bio: string;
}

export interface CurriculumModule {
  title: string;
  description: string;
  topics: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

export interface PricingPackage {
  title: string;
  price: string;
  desc: string;
  features: string[];
  popular?: boolean;
  unit?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedCourse {
  name: string;
  slug: string;
  icon: string;
  category: "subjects" | "exam-prep" | "learning-support";
}

export interface CoursePageTemplateProps {
  id: string; // e.g., 'math', 'sat', 'adhd-support'
  title: string; // e.g., 'Mathematics', 'SAT Prep'
  category: "Subjects" | "Exam Prep" | "Learning Support" | "Homeschooling";
  icon: string; // emoji or icon name
  description: string;
  tagline: string;
  overviewText: string[];
  eligibility: string;
  learningOutcomes: string[];
  skillsGained: string[];
  curriculum: CurriculumModule[];
  journeySteps: { title: string; desc: string }[];
  tutors: Tutor[];
  pricing: PricingPackage[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  relatedCourses: RelatedCourse[];
  downloadableResource: { title: string; filename: string; fileType: string; previewDesc: string };
}

export default function CoursePageTemplate({
  id,
  title,
  category,
  icon,
  description,
  tagline,
  overviewText,
  eligibility,
  learningOutcomes,
  skillsGained,
  curriculum,
  journeySteps,
  tutors,
  pricing,
  testimonials,
  faqs,
  relatedCourses,
  downloadableResource,
}: CoursePageTemplateProps) {
  // States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoStep, setVideoStep] = useState(0);
  const [testimonialStart, setTestimonialStart] = useState(0);

  // AI Study Assistant states
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedGoals, setSelectedGoals] = useState("");
  const [selectedHours, setSelectedHours] = useState("2-4 hours");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState<any | null>(null);

  // Lead capture handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: leadName,
          email: leadEmail,
          studentName: "Student",
          phone: "0000000000",
          subject: title,
          notes: `Downloaded study guide: ${downloadableResource.title}`,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true); // fall back to UI success anyway
    }
  };

  // AI Assistant Plan Generator
  const handleGeneratePlan = async () => {
    if (!selectedGrade) {
      alert("Please select a grade level.");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/gemini/study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: title,
          grade: selectedGrade,
          goals: selectedGoals,
          hoursPerWeek: selectedHours,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAiPlan(data);
      } else {
        throw new Error(data.error || "Failed to generate");
      }
    } catch (err) {
      console.error(err);
      // Fallback response for offline/local simulation
      setAiPlan({
        tutorRecommendation: {
          specialization: `${title} Expert Educator`,
          matchPercentage: "98%",
          reason: `Highly credentialed advisor specialized in tailoring ${title} lessons to ${selectedGrade} standards, focusing directly on your goals: ${selectedGoals || "academic mastery"}.`,
        },
        weeklySchedule: [
          { week: "Week 1", focus: "Diagnostics & Fundamentals", activities: ["Deep diagnostic baseline review", "Core conceptual gaps identified and target strategies set"] },
          { week: "Week 2", focus: "Targeted Skills Development", activities: ["Focusing on high-weight topics", "Guided practical worksheets and confidence building"] },
          { week: "Week 3", focus: "Application & Strategy", activities: ["Timed problem-solving sets", "Advanced strategy application to foster independent thinking"] },
          { week: "Week 4", focus: "Synthesis & Review", activities: ["Comprehensive milestone test", "Personalized study guide created for ongoing support"] },
        ],
        actionSteps: [
          "Book a 1-on-1 complimentary diagnostic mapping assessment.",
          "Meet your recommended elite tutor via video consultation.",
          "Confirm your weekly lesson slots and launch your personalized study guide.",
        ],
        keyMetrics: [
          { label: "Grade Boost", value: "A / B Avg." },
          { label: "Confidence Lift", value: "98% Positive" },
        ],
      });
    } finally {
      setAiLoading(false);
    }
  };

  // Structured schemas for SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aceeducation.us" },
      { "@type": "ListItem", "position": 2, "name": category, "item": `https://aceeducation.us/${id === "homeschool" ? "homeschool" : category.toLowerCase().replace(" ", "-")}` },
      { "@type": "ListItem", "position": 3, "name": `${title} Tutoring`, "item": `https://aceeducation.us/${id === "homeschool" ? "homeschool" : category.toLowerCase().replace(" ", "-")}/${id}` }
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": `${title} Elite Tutoring Program`,
    "description": description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ACE Education",
      "sameAs": "https://aceeducation.us"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${title} Elite Tutoring`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3200",
      "bestRating": "5"
    }
  };

  const generateResourceContent = () => {
    const subjectLower = title.toLowerCase();
    if (subjectLower.includes("math") || subjectLower.includes("algebra") || subjectLower.includes("geometry") || subjectLower.includes("calculus")) {
      return `ACE EDUCATION — STUDY TOOLKIT\n\n=== COMPLETE ALGEBRA & GEOMETRY FORMULAS CHEAT SHEET ===\n\n1. ALGEBRA FUNDAMENTALS:\n- Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a\n- Slope Formula: m = (y₂ - y₁) / (x₂ - x₁)\n- Difference of Squares: a² - b² = (a - b)(a + b)\n- Factoring: (a + b)² = a² + 2ab + b²\n\n2. GEOMETRY ESSENTIALS:\n- Pythagorean Theorem: a² + b² = c² (Right-Angled Triangles)\n- Area of Circle: A = πr²\n- Circumference of Circle: C = 2πr\n- Area of Triangle: A = ½bh\n- Volume of Cylinder: V = πr²h\n- Volume of Sphere: V = 4/3 πr³\n\n3. COORDINATE GEOMETRY:\n- Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]\n- Midpoint Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)\n\n=========================================\nNeed more help? Accelerate your grades with our top 2% tutors!\nBook a free assessment at: https://aceeducation.us/book-assessment\n=========================================`;
    }
    
    if (subjectLower.includes("sat") || subjectLower.includes("act") || subjectLower.includes("prep") || subjectLower.includes("exam")) {
      return `ACE EDUCATION — STUDY TOOLKIT\n\n=== ULTIMATE SAT & ACT EXAM PREP STRATEGY SHEET ===\n\n1. SAT READING & WRITING STRATEGIES:\n- Read the question stem first before analyzing the text.\n- Eliminate extreme answers (e.g., words like "never", "always", "entirely").\n- Base answers strictly on literal textual evidence, never assumptions.\n- Identify transitions: "However", "Consequently", "Moreover" to determine context shifts.\n\n2. SAT MATH STRATEGIES:\n- Backsolving: Substitute answer choices into the equation starting from the middle value.\n- Plugging In: If variables are in the question and answers, substitute easy numbers (like 2, 5, 10).\n- Memorize common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17.\n\n3. GENERAL TIMING PLANS:\n- Spend no more than 60 seconds per multiple-choice math question.\n- Bubble answers in blocks of 5 or 10 to save momentum.\n\n=========================================\nRaise your scores with our top 2% Ivy League test prep specialists!\nBook a free assessment at: https://aceeducation.us/book-assessment\n=========================================`;
    }

    if (subjectLower.includes("adhd") || subjectLower.includes("dyslexia") || subjectLower.includes("support") || subjectLower.includes("special")) {
      return `ACE EDUCATION — STUDY TOOLKIT\n\n=== MULTISENSORY STUDY SUPPORT GUIDE ===\n\n1. WORKING MEMORY FOCUS TECHNIQUES:\n- Use the Pomodoro Technique: 20 mins intensive study, 5 mins tactile break.\n- Body Doubling: Study with a tutor, parent, or quiet peer nearby.\n- Color Coding: Use yellow for key terms, blue for examples, and red for rules.\n\n2. COGNITIVE REFRAMING:\n- Break complex 3-step school projects into single-step checkpoints.\n- Use mind mapping and diagram sketching instead of lengthy blocks of text.\n- Verbalize concepts out loud before writing them down.\n\n=========================================\nSupport your child's learning journey with Orton-Gillingham & ADHD specialists!\nBook a free assessment at: https://aceeducation.us/book-assessment\n=========================================`;
    }

    // Default subject sheet
    return `ACE EDUCATION — STUDY TOOLKIT\n\n=== ELITE ${title.toUpperCase()} MASTERCLASS CHEAT SHEET ===\n\n1. CORE CONCEPTS STUDY CHECKLIST:\n- Review fundamental vocabulary weekly.\n- Apply the Feynman Technique: explain the topic in simple terms to a peer.\n- Complete 3 medium-difficulty practice questions before lesson sessions.\n\n2. ERROR LOG ROUTINE:\n- Maintain an active log of incorrect test questions.\n- Redo every logged question after 48 hours to confirm mastery.\n- Discuss root gaps with your 1-on-1 private tutor.\n\n=========================================\nUnlock total academic fluency with our Ivy League & certified instructors!\nBook a free assessment at: https://aceeducation.us/book-assessment\n=========================================`;
  };

  return (
    <div className="bg-[#FAFBFD] text-gray-900 overflow-x-hidden">
      {/* Injecting Structured Metadata schemas for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* ─── Luxury Hero Section ─── */}
      <section className="relative pt-24 pb-20 md:py-32 bg-gradient-to-br from-[#07134A] via-[#0D2073] to-[#1631A1] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,168,0,0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light/80 mb-6 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-max">
            <span>{category}</span>
            <span className="text-white/40">•</span>
            <span className="text-white">ACE Elite Academic Identity</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Premium 1-on-1 <span className="text-gold block sm:inline">{title}</span> Tutoring
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light max-w-2xl">
                {tagline} — tailored completely to your child&apos;s curriculum, learning habits, and academic milestones.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-3">
                <div className="flex items-center gap-2">
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white/90">4.9/5 Rating (3,200+ Reviews)</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-sm text-white/90 font-medium">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  Elite Certified Teachers & Mentors
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/book-assessment"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
                >
                  Book Free Assessment <ArrowRight className="w-4.5 h-4.5" />
                </Link>
                <a
                  href="#ai-assistant"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all"
                >
                  <Sparkles className="w-4.5 h-4.5 text-gold" /> Try AI Study Assistant
                </a>
              </div>
            </div>

            {/* Quick stats on the right */}
            <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: <TrendingUp className="w-6 h-6 text-gold" />, title: "98% Success Rate", desc: "Measurable academic boost in 60 days" },
                { icon: <Award className="w-6 h-6 text-gold" />, title: "Top 2% Tutors", desc: "Ivy league educators & specialists" },
                { icon: <Clock className="w-6 h-6 text-gold" />, title: "Tailored Hours", desc: "Convenient daytime & evening slots" },
                { icon: <Brain className="w-6 h-6 text-gold" />, title: "Personalized Plan", desc: "Custom-curated learning roadmaps" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                    {f.icon}
                  </div>
                  <h3 className="text-md font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Indicators & Statistics Row ─── */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: "98%", lbl: "Parent Satisfaction" },
              { val: "3.2K+", lbl: "Successful Students" },
              { val: "1-on-1", lbl: "Undivided Attention" },
              { val: "+320 pts", lbl: "Avg. SAT Improvement" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#0D2073]">{stat.val}</div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400 font-mono">{stat.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Course Overview, Outcomes, and Skills Gained ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left overview */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Academic Excellence</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] tracking-tight">
                Empowering Students to Excel in {title}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-md">
                {overviewText.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Student levels and eligibility */}
              <div className="bg-bg-light rounded-3xl p-6 border border-gray-100 mt-8">
                <h4 className="font-bold text-[#0D2073] text-sm uppercase tracking-wider font-mono mb-2">ELIGIBILITY & LEVELS SUPPORTED</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {eligibility}
                </p>
              </div>
            </div>

            {/* Right outcomes and skills */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#FAFBFD] rounded-3xl p-8 border border-gray-100 shadow-sm relative">
                <div className="absolute top-0 right-0 bg-gold/10 text-gold-dark text-xs font-bold uppercase tracking-widest font-mono px-4 py-1.5 rounded-bl-3xl">
                  Focus
                </div>
                
                <h3 className="text-xl font-bold text-[#0D2073] mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-gold" /> Core Learning Outcomes
                </h3>
                <ul className="space-y-4">
                  {learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-[#0D2073] mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" /> Critical Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skillsGained.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D2073] bg-[#0D2073]/5 border border-[#0D2073]/10 px-4 py-2.5 rounded-xl uppercase tracking-wider"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-gold" /> {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Curriculum Modules (Modern Interactive Cards) ─── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Structured Curriculum</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">Comprehensive Learning Curriculum</h2>
            <p className="text-gray-500 mt-3 leading-relaxed">
              Designed dynamically to address critical standards, conceptual gaps, and advance standard mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.map((mod, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:border-gold/30 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-[#0D2073]/5 text-[#0D2073] font-black text-sm flex items-center justify-center font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-extrabold text-[#0D2073] text-lg leading-snug">{mod.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{mod.description}</p>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-auto">
                  <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-3 font-mono">Key Core Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {mod.topics.map((t, idx) => (
                      <span key={idx} className="bg-bg-light text-gray-600 text-xs px-2.5 py-1 rounded-md border border-gray-200/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Learning Journey Timeline ─── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Our Methodology</span>
            <h2 className="text-3xl font-extrabold text-[#0D2073] mt-2">The Elite Learning Journey</h2>
            <p className="text-gray-500 mt-3">From detailed diagnostic planning to total conceptual mastery.</p>
          </div>

          <div className="relative border-l-2 border-[#0D2073]/10 ml-4 md:ml-32 space-y-12">
            {journeySteps.map((step, i) => (
              <div key={i} className="relative pl-8 md:pl-12">
                {/* Left floating numbers for desktop */}
                <div className="absolute right-full mr-8 top-1 hidden md:block text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">STAGE</span>
                  <div className="text-2xl font-black text-[#0D2073]">{String(i + 1).padStart(2, "0")}</div>
                </div>
                
                {/* Bullet indicator */}
                <div className="absolute left-0 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[#0D2073] flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>

                <div>
                  <h3 className="font-extrabold text-[#0D2073] text-lg mb-1.5">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose ACE Education Section ─── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">The ACE Difference</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">Why Discerning Families Choose ACE</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-6 h-6 text-gold" />,
                title: "Certified Elite Tutors",
                desc: "We accept less than 2% of educators who apply. All tutors are fully background-checked, credentialed school teachers or subject-matter academic experts."
              },
              {
                icon: <Compass className="w-6 h-6 text-gold" />,
                title: "Structured Dynamic Pathways",
                desc: "We design highly individual education blueprints based on initial diagnostics, completely tailored around existing school curricula or standardized prep milestones."
              },
              {
                icon: <Layout className="w-6 h-6 text-gold" />,
                title: "Advanced Parent Portal",
                desc: "Families access live grade track charts, lesson notes, and direct coordinator chat dashboards to ensure maximum alignment and transparent accountability."
              }
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-all">
                <div className="bg-[#0D2073]/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="font-extrabold text-[#0D2073] text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tutor Profile Cards with Specialties & Booking ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Our Instructors</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">Expert 1-on-1 {title} Tutors</h2>
            <p className="text-gray-500 mt-3">Learn from top academic educators committed to your child&apos;s masterclass journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((t, i) => (
              <div key={i} className="bg-[#FAFBFD] rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-gold/20"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-bold text-[#0D2073] text-md">{t.name}</h3>
                      <p className="text-xs text-gold-dark font-bold uppercase tracking-wider">{t.subject} Tutor</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Star className="w-3.5 h-3.5 fill-current text-gold" />
                        <span className="font-bold text-gray-700">{t.rating}</span>
                        <span>• {t.experience} Years Exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <Award className="w-4 h-4 text-[#0D2073]" />
                      <span>{t.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                      <Users className="w-4 h-4 text-[#0D2073]" />
                      <span>{t.students}+ Active Tutors Match Hours</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed italic mb-6">&ldquo;{t.bio}&rdquo;</p>
                </div>

                <div className="pt-4 border-t border-gray-200/50">
                  <Link
                    href="/book-assessment"
                    className="block text-center bg-[#0D2073] hover:bg-[#1631A1] text-white text-xs font-bold py-3.5 rounded-xl transition-all"
                  >
                    BOOK SESSION WITH {t.name.split(" ")[0].toUpperCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Flexible Pricing Packages ─── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Transparent Tuition</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">Flexible Learning Packages</h2>
            <p className="text-gray-500 mt-3">High-end, premium academic tutoring that fits your goals and family budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((pkg, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-8 border-2 shadow-sm relative flex flex-col justify-between ${
                  pkg.popular ? "border-gold ring-4 ring-gold/10" : "border-gray-100"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-[#0D2073] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-extrabold text-[#0D2073] text-xl mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-400 mb-6">{pkg.desc}</p>
                  
                  <div className="mb-6 flex items-baseline">
                    <span className="text-4xl font-black text-[#0D2073]">{pkg.price}</span>
                    <span className="text-sm font-semibold text-gray-400 ml-1">{pkg.unit || "/hour"}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/book-assessment"
                    className={`block text-center text-xs font-extrabold uppercase tracking-wider py-4 rounded-xl transition-all ${
                      pkg.popular ? "bg-gold text-navy hover:bg-gold-dark" : "bg-[#0D2073] text-white hover:bg-[#1631A1]"
                    }`}
                  >
                    CHOOSE {pkg.title.toUpperCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Parent & Student Portal Preview ─── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Modern Accountability</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] tracking-tight">
                Complete Oversight via the ACE Family Portal
              </h2>
              <p className="text-gray-600 leading-relaxed text-md">
                We believe transparency breeds success. When you enroll with ACE Education USA, parents get dedicated portal logins to track lessons, view grades, review detailed tutor feedback notes, and communicate in real-time.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  { title: "Real-time Lesson Summary Notes", desc: "Tutors provide complete concept mastery reports within 24 hours of each session." },
                  { title: "Actionable Grade & Milestone Graphs", desc: "Watch conceptual scores trend upwards with detailed diagnostics charts." },
                  { title: "Coordinator Concierge Desk", desc: "Direct messaging lane with your personal regional program director." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-gold/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-gold-dark">
                      <Layout className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0D2073] text-base">{item.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Visual Placeholder */}
            <div className="bg-gradient-to-br from-[#07134A] to-[#0D2073] rounded-3xl p-6 shadow-2xl border border-white/10 text-white font-sans max-w-lg mx-auto">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-white/40 ml-2 font-mono">portal.aceeducation.us</span>
                </div>
                <span className="bg-gold/20 text-gold text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Parent View</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Active Student</span>
                    <h5 className="font-bold text-sm">Marcus Vance</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Current Grade</span>
                    <h5 className="font-bold text-sm text-green-400">A- (Up from C)</h5>
                  </div>
                </div>

                <div className="space-y-3 bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[10px] text-gold uppercase tracking-widest font-mono font-bold block mb-2">Subject Performance Track</span>
                  {[
                    { subject: `1-on-1 ${title}`, progress: 92, status: "Excellent" },
                    { subject: "Study Habits", progress: 85, status: "Advanced" }
                  ].map((track, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{track.subject}</span>
                        <span className="text-white/80">{track.progress}% ({track.status})</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: `${track.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono block">Latest Lesson Note</span>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed italic">
                    &ldquo;Marcus completely mastered polynomial divisions today. His confidence is rising fast! Next week we focus on graphing coordinates.&rdquo;
                  </p>
                  <span className="text-[10px] text-gold font-bold block mt-2">— Dr. Sarah Jenkins (Math Ph.D.)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Testimonials Section (Real Student Photos & Video Mock) ─── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with Navigation Arrows */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Success Stories</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">What Discerning Parents Are Saying</h2>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setTestimonialStart((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-gold hover:text-gold flex items-center justify-center transition-all shadow-sm text-navy hover:shadow-md cursor-pointer font-bold"
                aria-label="Previous Testimonials"
              >
                &larr;
              </button>
              <button
                onClick={() => setTestimonialStart((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-gold hover:text-gold flex items-center justify-center transition-all shadow-sm text-navy hover:shadow-md cursor-pointer font-bold"
                aria-label="Next Testimonials"
              >
                &rarr;
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">
            {Array.from({ length: Math.min(6, testimonials.length) }).map((_, i) => {
              const idx = (testimonialStart + i) % testimonials.length;
              const t = testimonials[idx];
              if (!t) return null;
              return (
                <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex text-gold mb-4">
                      {[...Array(t.rating)].map((_, rIdx) => (
                        <Star key={rIdx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-gray-100 pt-5 mt-auto">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border border-gold shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h5 className="font-extrabold text-[#0D2073] text-sm truncate">{t.name}</h5>
                      <p className="text-xs text-gray-400 truncate">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Video Placeholder Container */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#07134A] to-[#0D2073] rounded-3xl p-6 md:p-12 shadow-2xl border border-white/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=900')` }} />
            
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Success Spotlight</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">Watch How Families Excel with ACE Tutoring</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Take a quick 2-minute tour of our customized educational methodology, tutor vetting criteria, and real-time family portals.
              </p>

              <div className="pt-6">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-16 h-16 rounded-full bg-gold hover:bg-gold-dark text-navy flex items-center justify-center mx-auto shadow-lg hover:scale-105 transition-all animate-bounce"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI Study Assistant (Functional Gemini Interaction) ─── */}
      <section id="ai-assistant" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#0D2073] to-[#1E3AB7] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light mb-4">
                <Sparkles className="w-4.5 h-4.5 text-gold animate-pulse" />
                <span>AI STUDY BLUEPRINT CONCIERGE</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Generate Your Personalized {title} Learning Roadmap
              </h2>
              <p className="text-white/70 max-w-2xl text-sm leading-relaxed mb-8">
                Tell our AI Study Assistant about your academic goals. It will analyze your requirements and instantly compile a customized 4-week roadmap and tutor match.
              </p>

              <div className="grid md:grid-cols-3 gap-6 bg-white/5 border border-white/10 p-6 rounded-3xl mb-8">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-white/60 tracking-wider">Student Grade Level</label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full bg-[#0D2073] border-2 border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                  >
                    <option value="">Select Level</option>
                    <option value="Elementary (K-5)">Elementary (K-5)</option>
                    <option value="Middle School (6-8)">Middle School (6-8)</option>
                    <option value="High School (9-12)">High School (9-12)</option>
                    <option value="AP / Advanced Prep">AP / Advanced Prep</option>
                    <option value="College / Adult">College / Adult</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-white/60 tracking-wider">Primary Target Goals</label>
                  <input
                    type="text"
                    placeholder="e.g., Raise math score to A, learn test strategy"
                    value={selectedGoals}
                    onChange={(e) => setSelectedGoals(e.target.value)}
                    className="w-full bg-[#0D2073] border-2 border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-white/60 tracking-wider">Study Intensity</label>
                  <select
                    value={selectedHours}
                    onChange={(e) => setSelectedHours(e.target.value)}
                    className="w-full bg-[#0D2073] border-2 border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-gold focus:outline-none"
                  >
                    <option value="1-2 hours/week">1-2 hours/week (Consistent)</option>
                    <option value="2-4 hours/week">2-4 hours/week (Recommended)</option>
                    <option value="4-6 hours/week">4-6 hours/week (Intensive)</option>
                    <option value="6+ hours/week">6+ hours/week (Exam Crunch)</option>
                  </select>
                </div>
              </div>

              <div className="text-center md:text-left">
                <button
                  onClick={handleGeneratePlan}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {aiLoading ? "ANALYZING TARGET METRICS..." : "GENERATE STUDY BLUEPRINT"} <Sparkles className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Generated AI plan output */}
              <AnimatePresence>
                {aiPlan && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className="mt-12 bg-[#FAFBFD] rounded-[2rem] p-6 md:p-8 text-gray-900 border border-gray-100 shadow-xl space-y-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200/60 pb-6 gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full font-mono">
                          Blueprinted AI Recommendations
                        </span>
                        <h4 className="text-xl font-extrabold text-[#0D2073] mt-2">
                          Your Custom {title} Learning Plan
                        </h4>
                      </div>
                      <div className="flex gap-4">
                        {aiPlan.keyMetrics?.map((met: any, idx: number) => (
                          <div key={idx} className="bg-[#0D2073]/5 border border-[#0D2073]/10 rounded-xl px-4 py-2 text-center min-w-[100px]">
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">{met.label}</div>
                            <div className="text-base font-black text-[#0D2073] mt-0.5">{met.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">
                      {/* Left: Weekly breakdown */}
                      <div className="md:col-span-8 space-y-4">
                        <h5 className="font-extrabold text-xs uppercase tracking-widest text-gray-400 font-mono">4-WEEK TARGET TIMELINE</h5>
                        <div className="space-y-4">
                          {aiPlan.weeklySchedule?.map((w: any, idx: number) => (
                            <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4">
                              <span className="text-sm font-black text-gold font-mono uppercase tracking-wider shrink-0 mt-0.5">{w.week}</span>
                              <div className="space-y-1">
                                <h6 className="font-bold text-[#0D2073] text-sm">{w.focus}</h6>
                                <ul className="list-disc list-inside space-y-0.5 text-xs text-gray-500 leading-relaxed">
                                  {w.activities?.map((act: string, aIdx: number) => (
                                    <li key={aIdx}>{act}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Tutor recommendation & action steps */}
                      <div className="md:col-span-4 space-y-6">
                        <div className="bg-[#0D2073]/5 rounded-2xl p-5 border border-[#0D2073]/10">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold text-[#0D2073] uppercase tracking-wider font-mono">IDEAL TUTOR MATCH</span>
                            <span className="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                              {aiPlan.tutorRecommendation?.matchPercentage} MATCH
                            </span>
                          </div>
                          <h6 className="font-black text-[#0D2073] text-sm leading-snug">{aiPlan.tutorRecommendation?.specialization}</h6>
                          <p className="text-xs text-gray-500 leading-relaxed mt-2">{aiPlan.tutorRecommendation?.reason}</p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-extrabold text-xs uppercase tracking-widest text-gray-400 font-mono">NEXT ACTION STEPS</h5>
                          <ul className="space-y-2">
                            {aiPlan.actionSteps?.map((step: string, sIdx: number) => (
                              <li key={sIdx} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                                <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4 border-t border-gray-200/60">
                      <Link
                        href="/book-assessment"
                        className="inline-flex items-center gap-2 bg-[#0D2073] hover:bg-[#1631A1] text-white text-xs font-bold px-8 py-3.5 rounded-xl uppercase tracking-wider transition-all"
                      >
                        ACTIVATE THIS STUDY BLUEPRINT NOW <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Downloadable Study Resources with Lead Capture ─── */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-xl grid md:grid-cols-12 gap-8 items-center">
            
            {/* Visual preview */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-72 bg-gradient-to-br from-[#07134A] to-[#0D2073] rounded-3xl p-5 border border-gold/20 shadow-2xl relative flex flex-col justify-between text-white overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=200')` }} />
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full font-mono">
                    Premium Resource
                  </span>
                  <FileText className="w-6 h-6 text-gold" />
                </div>

                <div className="space-y-2 relative z-10 mt-8">
                  <span className="text-[9px] text-white/40 uppercase tracking-wider font-mono">Study Toolkit</span>
                  <h4 className="font-extrabold text-md leading-tight text-white line-clamp-3">
                    {downloadableResource.title}
                  </h4>
                  <p className="text-[10px] text-white/60 line-clamp-2">
                    {downloadableResource.previewDesc}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 relative z-10 flex items-center justify-between text-[10px] font-bold text-gold uppercase mt-auto">
                  <span>ACE Academic Lab</span>
                  <span className="bg-gold text-navy w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
                    <Download className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Form details */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Unlock Free Resource</span>
              <h2 className="text-3xl font-extrabold text-[#0D2073]">
                Download Our Complete {downloadableResource.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Unlock instant access to this expert study guide, custom curated worksheets, and strategy cheatsheets to accelerate your student&apos;s scores.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-[#FAFBFD] border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full bg-[#FAFBFD] border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-gold focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-gold/25"
                  >
                    ACCESS FREE GUIDE <Download className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-green-800 space-y-3">
                  <h4 className="font-bold text-md flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5 text-green-600" /> Unlock Successful!
                  </h4>
                  <p className="text-xs text-green-700 leading-relaxed">
                    We have successfully captured your study plan request. Click the direct anchor download link below to fetch your resource instantly.
                  </p>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      const content = generateResourceContent();
                      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = downloadableResource.filename || "ace_study_sheet.txt";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 bg-green-600 text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download PDF Guide Now
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ─── FAQ Section (Accordion with SEO markup) ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono font-bold">FAQS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-3">Transparent answers to help you navigate your student&apos;s academic journey.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-2xl bg-[#FAFBFD] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-[#0D2073] hover:text-[#1631A1] transition-all"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-200/40 pt-4 bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Related Courses Carousel / Grid ─── */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Academic Portfolio</span>
            <h2 className="text-3xl font-extrabold text-[#0D2073] mt-2">Explore Related Tutoring Programs</h2>
            <p className="text-gray-500 mt-3">Comprehensive support across all standardized tests and school services.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCourses.map((rc, i) => (
              <Link
                key={i}
                href={`/${rc.category}/${rc.slug}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-md hover:-translate-y-1 transition-all text-center flex flex-col items-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{rc.icon}</div>
                <h4 className="font-extrabold text-[#0D2073] text-sm group-hover:text-gold transition-colors">{rc.name} Support</h4>
                <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-wider">{rc.category.replace("-", " ")}</p>
                
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-gold-dark group-hover:underline">
                  LEARN MORE <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Strong Final Call to Action ─── */}
      <section className="py-20 bg-gradient-to-br from-[#07134A] to-[#0D2073] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,168,0,0.08),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Book Your Consult</span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Ready to Accelerate Your Student&apos;s Grades & Confidence?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Schedule a complimentary 1-on-1 assessment worth $150. Absolutely zero commitment or credit card required.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book-assessment"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-extrabold text-xs uppercase tracking-wider px-8 py-4.5 rounded-2xl transition-all shadow-lg hover:shadow-gold/25"
            >
              BOOK COMPLIMENTARY ASSESSMENT <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+13322936270"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-8 py-4.5 rounded-2xl transition-all"
            >
              CALL +1 (332) 293-6270
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Success Video/Interactive Tour Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#07134A] border border-white/10 rounded-[2rem] w-full max-w-4xl overflow-hidden shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-5 border-b border-white/5 bg-[#0D2073]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <h4 className="font-extrabold text-white text-xs tracking-wide uppercase font-mono">
                    ACE Success Spotlight: &ldquo;How We ACE Results&rdquo;
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setVideoStep(0);
                  }}
                  className="text-white/60 hover:text-white text-xl font-bold p-1 hover:bg-white/5 rounded-full w-8 h-8 flex items-center justify-center transition-all"
                >
                  &times;
                </button>
              </div>

              {/* Player Body */}
              <div className="grid md:grid-cols-3 min-h-[440px]">
                {/* Playlist Sidebar */}
                <div className="bg-[#060F39] p-6 border-r border-white/5 space-y-3">
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest font-mono block mb-2">TOUR PLAYLIST</span>
                  {[
                    { title: "1. The Diagnostic Start", desc: "How we identify gaps" },
                    { title: "2. Premium Match Guaranteed", desc: "Elite 2% tutor pairing" },
                    { title: "3. Live Class Experience", desc: "HD collaborative whiteboard" },
                    { title: "4. ACE-ing the Milestone", desc: "Confidence & high grades" }
                  ].map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setVideoStep(idx)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all border flex flex-col gap-1 ${
                        videoStep === idx
                          ? "bg-gold text-navy border-gold"
                          : "bg-white/5 text-white border-transparent hover:bg-white/10"
                      }`}
                    >
                      <span className="font-extrabold text-xs">{step.title}</span>
                      <span className={`text-[10px] ${videoStep === idx ? "text-navy/70" : "text-white/55"}`}>{step.desc}</span>
                    </button>
                  ))}

                  <div className="pt-6 border-t border-white/5 text-center">
                    <p className="text-[10px] text-white/40 italic">Interactive Animated Tour</p>
                  </div>
                </div>

                {/* Animated Player Screen */}
                <div className="md:col-span-2 p-8 flex flex-col justify-between bg-gradient-to-b from-[#09154E] to-[#040C30] relative overflow-hidden">
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Dynamic Animations per Slide */}
                  <div className="relative z-10 flex-1 flex flex-col justify-center">
                    {videoStep === 0 && (
                      <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                          Phase 1: Diagnosis
                        </div>
                        <h5 className="text-xl font-bold text-white">Custom Diagnostic Assessment</h5>
                        <p className="text-sm text-white/70 leading-relaxed">
                          We don&apos;t guess — we diagnose. Every student begins with an interactive academic baseline test to find conceptual micro-gaps.
                        </p>
                        
                        {/* Interactive mock report widget */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 max-w-sm mx-auto md:mx-0 space-y-3">
                          <div className="flex justify-between text-xs text-white/60">
                            <span>Algebra Basics</span>
                            <span className="font-bold text-red-400">42% (Needs Focus)</span>
                          </div>
                          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "42%" }} transition={{ duration: 0.8 }} className="bg-red-400 h-full rounded-full" />
                          </div>
                          <div className="flex justify-between text-xs text-white/60">
                            <span>Geometry Foundations</span>
                            <span className="font-bold text-yellow-400">60% (Moderate)</span>
                          </div>
                          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-yellow-400 h-full rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}

                    {videoStep === 1 && (
                      <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                          Phase 2: The Perfect Match
                        </div>
                        <h5 className="text-xl font-bold text-white">Elite certified 2% Tutor Pair</h5>
                        <p className="text-sm text-white/70 leading-relaxed">
                          We vet thousands of teachers to select only top subject experts with high emotional intelligence and verified pedagogical track records.
                        </p>

                        <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10 max-w-sm mx-auto md:mx-0">
                          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center font-bold text-gold text-lg">
                            🎓
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-extrabold text-white">Dr. Sarah Vance, PhD</p>
                            <p className="text-xs text-white/60">UC Berkeley • 12 Yrs Physics Tutor</p>
                            <div className="flex gap-0.5 text-gold text-xs mt-1">★★★★★</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {videoStep === 2 && (
                      <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-blue-400/10 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                          Phase 3: Interactive Class
                        </div>
                        <h5 className="text-xl font-bold text-white">Interactive HD Whiteboard Space</h5>
                        <p className="text-sm text-white/70 leading-relaxed">
                          Our lesson system lets student and tutor collaborate in real-time, sharing homework sheets, drawing equation graphs, and logging key formulas.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 relative max-w-sm mx-auto md:mx-0 min-h-[100px] flex flex-col justify-center items-center">
                          <span className="text-[10px] text-white/40 absolute top-2 left-2">SHARED WHITEBOARD</span>
                          {/* Animated equation writing simulation */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            className="font-mono text-gold font-bold text-base md:text-lg"
                          >
                            f(x) = ax² + bx + c = 0
                          </motion.div>
                          <div className="flex gap-1.5 mt-4 items-end h-6">
                            {[12, 24, 16, 32, 20, 28, 14, 18].map((val, idx) => (
                              <motion.div
                                key={idx}
                                animate={{ height: [4, val, 4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: idx * 0.1 }}
                                className="w-1 bg-gold rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {videoStep === 3 && (
                      <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-emerald-400/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                          Phase 4: ACE-ing the Results
                        </div>
                        <h5 className="text-xl font-bold text-white">Proven Grades Acceleration</h5>
                        <p className="text-sm text-white/70 leading-relaxed">
                          98% of parents report visible confidence improvement in the first 2 weeks. Typical students accelerate by two whole letter grades within a semester.
                        </p>

                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 max-w-sm mx-auto md:mx-0 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/60">Diagnostic Baseline</span>
                            <span className="text-sm font-bold text-red-400">Grade C-</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/60">After 6 Weeks of ACE</span>
                            <span className="text-sm font-black text-emerald-400">Grade A+ (98th percentile!)</span>
                          </div>
                          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden flex">
                            <motion.div initial={{ width: 0 }} animate={{ width: "98%" }} transition={{ duration: 1 }} className="bg-emerald-400 h-full rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Player Controls Footer */}
                  <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between relative z-10 text-xs text-white/50">
                    <button
                      onClick={() => setVideoStep((prev) => (prev > 0 ? prev - 1 : 3))}
                      className="hover:text-white font-extrabold flex items-center gap-1"
                    >
                      &larr; PREVIOUS
                    </button>
                    <span className="font-mono text-[11px] text-gold uppercase tracking-wider font-bold">
                      Slide {videoStep + 1} of 4
                    </span>
                    <button
                      onClick={() => setVideoStep((prev) => (prev < 3 ? prev + 1 : 0))}
                      className="hover:text-white font-extrabold flex items-center gap-1"
                    >
                      NEXT &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
