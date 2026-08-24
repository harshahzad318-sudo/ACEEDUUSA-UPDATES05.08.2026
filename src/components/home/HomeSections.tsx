/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle, BookOpen, Monitor, Users, Award, Clock, Shield, Zap, BarChart3, Calendar, MessageSquare, FileText, TrendingUp, GraduationCap, ChevronDown, Calculator, Beaker, Book, PenTool, Clipboard, Brain, CheckSquare } from "lucide-react";
import { SUBJECTS, CURRICULA, TUTORS, TESTIMONIALS, FAQ, BLOG_POSTS, PRICING } from "@/lib/data";
import { useState } from "react";

/* ─── Trusted By ─── */
export function TrustedBy() {
  return (
    <section className="py-16 bg-white border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">Trusted by families across America</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
          {["Common Core Aligned", "College Board Partner", "IB World", "Cambridge Certified", "ACT Authorized"].map(t => (
            <span key={t} className="text-lg font-bold text-navy tracking-tight">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bento Dashboard Section (Combined Subjects, Curricula, Learning Support) ─── */
export function SubjectsSection() {
  const popularSubjects = [
    { name: "Math", icon: <Calculator className="w-5 h-5 text-blue-600" />, desc: "Algebra, calculus & geom.", href: "/subjects/math" },
    { name: "English", icon: <Book className="w-5 h-5 text-purple-600" />, desc: "Grammar, literature & comp.", href: "/subjects/english" },
    { name: "Science", icon: <Beaker className="w-5 h-5 text-emerald-600" />, desc: "Physics, chemistry & biology", href: "/subjects/science" },
    { name: "Reading", icon: <BookOpen className="w-5 h-5 text-pink-600" />, desc: "Phonics & comprehension", href: "/subjects/reading" },
    { name: "Writing", icon: <PenTool className="w-5 h-5 text-amber-600" />, desc: "Essays & creative writing", href: "/subjects/writing" },
    { name: "Homework Help", icon: <Clipboard className="w-5 h-5 text-orange-600" />, desc: "Daily assignment support", href: "/subjects/homework-help" }
  ];

  const topCurricula = [
    { name: "Common Core", icon: "🏫" },
    { name: "AP Prep", icon: "🏆" },
    { name: "IB Programme", icon: "🌐" },
    { name: "IGCSE", icon: "🎓" },
    { name: "SAT Prep", icon: "📊" },
    { name: "ACT Prep", icon: "📈" },
    { name: "A Levels", icon: "🇬🇧" }
  ];

  const learningSupport = [
    { name: "ADHD Support", icon: <Brain className="w-5 h-5 text-indigo-600" />, desc: "Focus, organization & executive function support", href: "/learning-support/adhd" },
    { name: "Dyslexia Support", icon: <BookOpen className="w-5 h-5 text-rose-600" />, desc: "Multisensory reading & spelling techniques", href: "/learning-support/dyslexia" },
    { name: "Study Skills", icon: <Calendar className="w-5 h-5 text-teal-600" />, desc: "Time management, note taking & study strategies", href: "/learning-support/study-skills" },
    { name: "Homework Help", icon: <CheckSquare className="w-5 h-5 text-green-600" />, desc: "Daily homework planning & academic coaching", href: "/learning-support/homework" }
  ];

  return (
    <section className="py-16 bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Popular Subjects Column */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">Popular Subjects</h3>
                <Link href="/subjects" className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors">
                  View All Subjects &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {popularSubjects.map((s, idx) => (
                  <Link key={idx} href={s.href} className="flex flex-col p-4 rounded-2xl bg-bg-light hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3">
                      {s.icon}
                    </div>
                    <span className="font-bold text-navy text-sm group-hover:text-gold-dark transition-colors">{s.name}</span>
                    <span className="text-[10px] text-gray-400 mt-1 leading-tight">{s.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Top Curricula Column */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">Top Curricula</h3>
                <Link href="/curriculum" className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors">
                  View All Curricula &rarr;
                </Link>
              </div>
              <div className="space-y-3">
                {topCurricula.map((c, idx) => (
                  <Link key={idx} href={`/curriculum/${c.name.toLowerCase().replace(/ /g, "-")}`} className="flex items-center justify-between p-4 rounded-2xl bg-bg-light hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-lg">
                        {c.icon}
                      </div>
                      <span className="font-bold text-navy text-sm group-hover:text-gold-dark transition-colors">{c.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Support Column */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">Learning Support</h3>
                <Link href="/learning-support" className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors">
                  View All Support &rarr;
                </Link>
              </div>
              <div className="space-y-3">
                {learningSupport.map((l, idx) => (
                  <Link key={idx} href={l.href} className="flex gap-4 p-4 rounded-2xl bg-bg-light hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all group text-left">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                      {l.icon}
                    </div>
                    <div>
                      <span className="block font-bold text-navy text-sm group-hover:text-gold-dark transition-colors">{l.name}</span>
                      <span className="block text-xs text-gray-500 mt-1 leading-relaxed">{l.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Curriculum Explorer ─── */
export function CurriculumSection() {
  return null;
}

/* ─── Why Choose ACE (Integrated Three-Column Grid) ─── */
export function WhyChoose() {
  const [tutorIndex, setTutorIndex] = useState(0);
  const activeTutor = TUTORS[tutorIndex % TUTORS.length];

  const handlePrevTutor = () => {
    setTutorIndex(prev => (prev === 0 ? TUTORS.length - 1 : prev - 1));
  };
  const handleNextTutor = () => {
    setTutorIndex(prev => (prev + 1) % TUTORS.length);
  };

  const whyChooseBullets = [
    "Highly qualified & verified tutors",
    "Personalized learning plans",
    "Flexible scheduling",
    "Online & In-home tutoring",
    "Progress tracking & regular reports",
    "Trusted by parents nationwide"
  ];

  const howItWorksSteps = [
    { step: "1", title: "Book Free Assessment", desc: "Identify your child's exact needs" },
    { step: "2", title: "Get Matched with Tutor", desc: "Algorithm matches style & goals" },
    { step: "3", title: "Start Learning & Grow", desc: "In-home or online interactive sessions" },
    { step: "4", title: "Track Progress & Improve", desc: "Detailed reports after every single lesson" },
    { step: "5", title: "Achieve Goals & Succeed", desc: "Watch grades & academic confidence soar" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Why Choose Column */}
          <div className="bg-[#091854] rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between border-2 border-gold/20 shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
            <div>
              <h3 className="text-xs font-bold text-gold uppercase tracking-wider font-mono mb-4">Why Choose Us</h3>
              <h2 className="text-2xl font-extrabold text-white leading-snug">WHY CHOOSE ACE EDUCATION USA?</h2>
              
              <ul className="mt-8 space-y-4">
                {whyChooseBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="#F5A800" stroke="#091854" />
                    <span className="text-sm text-white/90 font-medium leading-tight">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ACE Education Logo Badge with Gold Ring Border */}
            <div className="mt-10 flex items-center justify-center">
              <div className="relative p-1.5 rounded-[22px] border-2 border-amber-400/90 bg-amber-400/10 shadow-lg shadow-amber-400/20 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-2xl p-3 shadow-md flex items-center justify-center">
                  <img
                    src="https://drive.google.com/thumbnail?id=1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g&sz=w1000"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('drive.google.com')) {
                        target.src = 'https://lh3.googleusercontent.com/d/1V_yl0l4lk5DlYsjb3jksFSq745E3LO-g';
                      } else if (target.src.includes('googleusercontent.com')) {
                        target.src = '/logo.png';
                      }
                    }}
                    alt="ACE Education Official Crest Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Column */}
          <div className="bg-[#F8F9FC] rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">How It Works</h3>
                <Link href="/book-assessment" className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors">
                  View Process &rarr;
                </Link>
              </div>
              
              <div className="space-y-6">
                {howItWorksSteps.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-navy">{s.step}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy leading-none">{s.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meet Our Tutors Column */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase font-mono">Meet Our Tutors</h3>
                <div className="flex gap-2">
                  <button onClick={handlePrevTutor} className="w-8 h-8 rounded-full border border-gray-200 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-gray-600">
                    &larr;
                  </button>
                  <button onClick={handleNextTutor} className="w-8 h-8 rounded-full border border-gray-200 hover:border-gold hover:text-gold flex items-center justify-center transition-colors text-gray-600">
                    &rarr;
                  </button>
                </div>
              </div>

              {/* Active Tutor Card */}
              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/20 shadow-md">
                  <img src={activeTutor.image} alt={activeTutor.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-navy mt-4">{activeTutor.name}</h4>
                <div className="flex items-center gap-1 mt-1 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-gold" fill="#F5A800" stroke="none" />
                  ))}
                  <span className="text-xs font-semibold text-gray-500 ml-1">({activeTutor.rating})</span>
                </div>
                
                <p className="text-xs text-gold-dark font-bold uppercase tracking-wider mt-2 font-mono">{activeTutor.subject}</p>
                
                <div className="mt-4 space-y-1 bg-bg-light rounded-xl p-3 w-full text-left text-xs text-gray-600">
                  <div><strong>Education:</strong> {activeTutor.education}</div>
                  <div><strong>Experience:</strong> {activeTutor.experience}+ Years</div>
                  <div><strong>Students:</strong> {activeTutor.students}+ Tutored</div>
                </div>

                <p className="text-xs text-gray-500 mt-4 leading-relaxed italic">
                  &ldquo;{activeTutor.bio}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href="/book-assessment" className="block text-center bg-navy hover:bg-navy-light text-white text-xs font-bold py-3 rounded-xl transition-all">
                VIEW PROFILE &amp; BOOK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
export function HowItWorks() {
  return null;
}

/* ─── Meet Our Tutors ─── */
export function TutorsSection() {
  return null;
}

/* ─── Testimonials (Student Success banner & Reviews) ─── */
export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  // Map reviews from the global TESTIMONIALS list
  const mappedTestimonials = TESTIMONIALS.map(t => ({
    name: t.name,
    role: t.role,
    text: t.content,
    initial: t.name ? t.name.charAt(0) : "A"
  }));

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % mappedTestimonials.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + mappedTestimonials.length) % mappedTestimonials.length);
  };

  // Select 3 items sequentially with wrap-around
  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = (startIndex + i) % mappedTestimonials.length;
    visibleTestimonials.push(mappedTestimonials[index]);
  }

  const pricingTiers = [
    { title: "Primary School", price: "$45", desc: "Grades K-5", details: "Online from $45/hour, in-home from $65/hour." },
    { title: "Lower Secondary", price: "$55", desc: "Grades 6-8", details: "Online from $55/hour, in-home from $75/hour." },
    { title: "IGCSE or Equivalent", price: "$65", desc: "Grades 9-10", details: "Online from $65/hour, in-home from $85/hour." },
    { title: "A Level & College", price: "$75", desc: "Grades 11-12+", details: "Online from $75/hour, in-home from $95/hour." },
    { title: "SAT & Exam Prep", price: "$120", desc: "Specialist Prep", details: "Standard milestone prep sessions from $120/hour." },
    { title: "Learning Support", price: "$120", desc: "ADHD / Dyslexia Specialist", details: "Cognitive support sessions from $120/hour." },
    { title: "Monthly Progress", price: "$382.50", desc: "10 Hours / Month Included", details: "Consistent weekly review (Bronze tier). Save 15% (15% package discount applied).", isMonthly: true }
  ];

  return (
    <section className="py-16 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Nav Arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Student & Parent Feedback</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-navy mt-1">Real Success Stories</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev} 
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-gold hover:text-gold flex items-center justify-center transition-all shadow-sm text-navy hover:shadow-md cursor-pointer font-bold"
              aria-label="Previous Testimonials"
            >
              &larr;
            </button>
            <button 
              onClick={handleNext} 
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-gold hover:text-gold flex items-center justify-center transition-all shadow-sm text-navy hover:shadow-md cursor-pointer font-bold"
              aria-label="Next Testimonials"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Student Success Row */}
        <div className="grid lg:grid-cols-4 gap-6 items-stretch mb-16">
          {/* Left yellow card */}
          <div className="bg-[#FAB22E] rounded-3xl p-8 flex flex-col justify-between text-navy border-2 border-gold/15 shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-navy/60 font-mono">Our Pride</span>
              <h4 className="text-2xl font-extrabold text-navy mt-2 leading-tight">STUDENT SUCCESS IS OUR PRIDE</h4>
            </div>
            <Link href="/about" className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-navy mt-10 hover:opacity-85 group">
              VIEW ALL STORIES <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          {/* 3 columns of student quotes */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-[#0D2073]/5 flex items-center justify-center font-bold text-navy text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-navy text-sm truncate">{t.name}</h5>
                    <p className="text-xs text-gray-400 truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Pricing Plans</span>
          <h2 className="text-3xl font-extrabold text-navy mt-2">Transparent Tuition Rates</h2>
        </div>

        {/* Pricing Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pricingTiers.map((p, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-lg transition-all text-center flex flex-col justify-between relative group">
              <div>
                <h4 className="font-bold text-navy text-lg group-hover:text-gold transition-colors">{p.title}</h4>
                <div className="mt-4 mb-3">
                  <span className="text-xs text-gray-400">From</span>
                  <div className="text-4xl font-extrabold text-navy mt-1">
                    {p.price}<span className="text-sm font-semibold text-gray-400">{p.isMonthly ? "/month" : "/hour"}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-gold-dark">{p.desc}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{p.details}</p>
              </div>

              <div className="mt-8">
                <Link href="/book-assessment" className="block text-center bg-navy hover:bg-navy-light text-white text-xs font-bold py-3 rounded-xl transition-all">
                  GET STARTED
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">Custom packages (10, 20, 40 hours/month) available. Contact us for more details.</p>
      </div>
    </section>
  );
}

/* ─── Dashboard Previews ─── */
export function DashboardPreview() {
  const tabs = [
    { label: "Student Dashboard", icon: <GraduationCap className="w-4 h-4" />, items: ["Today's Lesson", "Homework", "Practice Tests", "Progress Charts", "Achievements", "AI Assistant"] },
    { label: "Parent Dashboard", icon: <Users className="w-4 h-4" />, items: ["Upcoming Lessons", "Attendance", "Progress Reports", "Invoices", "Messages", "Calendar"] },
    { label: "Tutor Dashboard", icon: <BookOpen className="w-4 h-4" />, items: ["Today's Classes", "Students", "Lesson Notes", "Resources", "Schedule", "Reports"] },
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Technology</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3">Powerful Learning Platform</h2>
          <p className="text-gray-500 mt-3">Dedicated dashboards for students, parents, and tutors.</p>
        </div>
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActive(i)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${active === i ? "bg-navy text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tabs[active].items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-bg-light rounded-xl p-4 hover:bg-gold/5 transition-colors">
                <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm font-medium text-navy">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-br from-navy/5 to-gold/5 rounded-2xl p-8 text-center">
            <p className="text-sm text-gray-500">Interactive dashboard preview</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-extrabold text-navy">12</div>
                <div className="text-xs text-gray-500">Sessions This Month</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-extrabold text-green-600">A+</div>
                <div className="text-xs text-gray-500">Current Grade</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl font-extrabold text-gold">96%</div>
                <div className="text-xs text-gray-500">Attendance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Preview ─── */
export function PricingPreview() {
  return null;
}

/* ─── Blog Preview ─── */
export function BlogPreview() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">Blog</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3">Latest Articles & Resources</h2>
          </div>
          <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} className="bg-white rounded-2xl overflow-hidden card-hover group">
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#0D2073]/10 to-gold/10">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-navy/20" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
                <h3 className="font-bold text-navy mt-2 group-hover:text-gold-dark transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
                <div className="text-xs text-gray-400 mt-4">{post.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="font-semibold text-navy text-sm pr-4">{item.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
export function CTASection() {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Ready to Transform Your Child&apos;s <span className="text-gradient">Academic Journey</span>?
        </h2>
        <p className="text-white/70 mt-6 text-lg max-w-2xl mx-auto">
          Book a complimentary academic assessment today and discover how ACE Education can help your child achieve excellence.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-gold/25">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur border border-white/20 transition-all">
            Contact Us
          </Link>
        </div>
        <p className="text-white/40 text-sm mt-6">No commitment required • Free consultation • Results guaranteed</p>
      </div>
    </section>
  );
}
