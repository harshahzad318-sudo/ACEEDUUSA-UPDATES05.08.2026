import Link from "next/link";
import { ArrowRight, Award, Users, Globe, Heart, Shield, BookOpen, Sparkles, Clock, CheckCircle, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import AboutTestimonials from "@/components/AboutTestimonials";

export const metadata: Metadata = {
  title: "About ACE Education USA",
  description: "Learn about our mission, elite 1-on-1 methodologies, and how we empower students to achieve academic excellence.",
};

export default function AboutPage() {
  const coreValues = [
    { icon: <Award className="w-6 h-6" />, label: "Academic Excellence", desc: "Setting the highest tutoring standards with subject specialists." },
    { icon: <Heart className="w-6 h-6" />, label: "Compassionate Focus", desc: "Student-centered care designed around unique cognitive profiles." },
    { icon: <Shield className="w-6 h-6" />, label: "Absolute Integrity", desc: "Transparent progress reports, fair pricing, and clear diagnostics." },
    { icon: <Globe className="w-6 h-6" />, label: "Global Quality", desc: "Leveraging international pedagogy frameworks for American success." },
  ];

  const methodologySteps = [
    {
      title: "1. Advanced Diagnostics",
      desc: "We analyze reading speed, algebraic gaps, and learning behaviors to build a personalized diagnostic map.",
    },
    {
      title: "2. Strategic Tutor Match",
      desc: "Our matches go beyond subjects. We pair students with mentors who match their learning speed and personality.",
    },
    {
      title: "3. Customized Curriculum",
      desc: "We curate custom assignments, visual whiteboards, and lesson plans aligned to state milestones and school standards.",
    },
    {
      title: "4. Parent Audits & Logs",
      desc: "Receive weekly detailed reports and scorecards, ensuring complete parent alignment and real-time grade tracking.",
    }
  ];

  const programs = [
    { title: "Academic Tutoring (K-12)", desc: "1-on-1 private instruction in Mathematics, Sciences, English, and Humanities. Aligned with standard and honors curricula.", path: "/online-tutoring" },
    { title: "Standardized Exam Prep", desc: "Elite Digital SAT, ACT, AP, and GED prep. Intensive mock exams and pacing strategies proven to raise scores.", path: "/exam-prep/sat" },
    { title: "Specialized Learning Support", desc: "Evidence-based ADHD executive functioning, Dyslexia, and special education coaching led by certified teachers.", path: "/learning-support/adhd" },
    { title: "Homeschooling Daytime Plans", desc: "Complete daytime programs with curriculum alignment, British Council exam registrations, and flexible blocks.", path: "/homeschool" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Section */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Our Mission & Purpose</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 leading-tight">
                Empowering Students to Reach Their Full <span className="text-gradient">Academic Potential</span>
              </h1>
              <p className="text-white/70 mt-6 text-lg leading-relaxed">
                ACE Education USA is a premium 1-on-1 tutoring provider. We combine elite subject-matter experts with structured diagnostic tracking to turn academic challenges into lifelong confidence and top-tier school success.
              </p>
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-gold/25">
                  Book Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur border border-white/10 transition-all">
                  Contact Our Advisors
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-full max-w-md bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                <h3 className="font-extrabold text-white text-xl mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" /> Why Families Choose ACE
                </h3>
                <ul className="space-y-4">
                  {[
                    "Top 2% Vetted Subject Instructors",
                    "Fully Tailored 1-on-1 Lesson Speed",
                    "Custom Parent Progress Portals",
                    "Flexible Online & In-Home Schedules"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-sm text-white/85">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Impact Stats Block */}
      <section className="py-16 bg-bg-light border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6,000+", label: "Students Empowered" },
              { value: "450+", label: "Elite Vetted Tutors" },
              { value: "50", label: "States Supported" },
              { value: "7+", label: "Years of Excellence" },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-4xl font-extrabold text-navy">{s.value}</div>
                <div className="text-xs text-gold-dark font-bold uppercase tracking-widest mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informative Mission & Core Methodology */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Behind the Quality</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-2">Our Proven 1-on-1 Methodology</h2>
            <p className="text-gray-600 mt-6 leading-relaxed">
              We believe classroom instruction has systemic limits. In a traditional setting, a single teacher must balance 25+ students, making personalized pacing impossible. ACE Education solves this by providing a highly customized, dedicated learning environment.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Our structured process ensures that we identify core diagnostic gaps immediately, select the perfect pedagogical specialist, and align lessons with school tests and graduation goals.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {coreValues.map((v, i) => (
                <div key={i} className="bg-bg-light rounded-2xl p-5 border border-gray-100/50 hover:border-gold/20 transition-all">
                  <div className="text-gold mb-3">{v.icon}</div>
                  <div className="font-bold text-navy text-sm">{v.label}</div>
                  <div className="text-xs text-gray-500 mt-1 leading-relaxed">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-navy mb-4">Step-by-Step Student Journey</h3>
            <div className="space-y-4">
              {methodologySteps.map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-navy text-base">{s.title}</h4>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Deep Dive & Call to Actions */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Our Programs</span>
            <h2 className="text-3xl font-extrabold text-navy mt-2">Designed for Every Grade & Milestone</h2>
            <p className="text-gray-500 mt-3">From foundational elementary reading to college entrance exam specifications.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((p, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:border-gold/30 hover:shadow-lg transition-all">
                <div>
                  <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-gold" /> {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <Link href={p.path} className="text-xs font-bold text-gold hover:text-gold-dark flex items-center gap-1 uppercase tracking-wider">
                    Learn Program Details &rarr;
                  </Link>
                  <Link href="/book-assessment" className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-5 py-3 rounded-xl transition-all">
                    BOOK TUITION
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slideable Testimonials Section */}
      <AboutTestimonials />

      {/* Global Network Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-[#0D2073]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-navy" />
          </div>
          <h2 className="text-3xl font-extrabold text-navy">Part of an International Education Network</h2>
          <p className="text-gray-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            ACE Education USA is proud to be part of the global academic family, including <strong>ACE Web Services W.L.L. (Kingdom of Bahrain)</strong> and <strong>ACE Education Malaysia</strong>. This global reach brings world-class educational structures, Cambridge and Oxford syllabus competencies, and highly qualified curriculum developers directly to American households.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-bold px-6 py-3.5 rounded-xl transition-all text-sm">
              Contact Global Office
            </Link>
          </div>
        </div>
      </section>

      {/* Highly Compelling Call To Action Banner */}
      <section className="py-24 bg-navy relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Begin Your Student&apos;s <span className="text-gradient">Academic Journey</span> Today
          </h2>
          <p className="text-white/70 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            Take the first step towards academic confidence. Schedule your custom 1-on-1 onboarding assessment and construct a tailored study blueprint with our education directors.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-gold/25 text-base">
              Book Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/online-tutoring" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur border border-white/20 transition-all text-base">
              Explore Pricing Plans
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-6">Zero commitment required • Includes full diagnostic report • 100% Tutor Match Guarantee</p>
        </div>
      </section>
    </div>
  );
}
