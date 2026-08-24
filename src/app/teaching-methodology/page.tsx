import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Brain, GraduationCap, CheckCircle, Target, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Teaching Methodology & Pedagogical Framework | ACE Education USA",
  description: "Discover the ACE 4-Pillar Pedagogical Framework. Combining diagnostic skill mapping, active recall, tailored pacing, and diagnostic logs for K-12 and test prep success.",
  alternates: {
    canonical: "https://aceeducation.us/teaching-methodology",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TeachingMethodologyPage() {
  const pillars = [
    {
      num: "01",
      title: "Diagnostic Root-Cause Analysis",
      desc: "Before lessons begin, we conduct diagnostic evaluations to isolate exact concept gaps (e.g. factoring quadratic equations or inferring passage tone) rather than re-teaching material the student already knows.",
    },
    {
      num: "02",
      title: "Active Recall & Spaced Repetition",
      desc: "Instead of passive listening, students actively solve problems on digital whiteboards. Tutors utilize spaced repetition techniques to lock formulas and vocabulary into long-term memory.",
    },
    {
      num: "03",
      title: "Adaptive Pacing & Personality Matching",
      desc: "Every student processes information differently. We match students with tutors who adapt their teaching style, tone, and visual aids to match the student's unique cognitive profile.",
    },
    {
      num: "04",
      title: "Parent Transparency & Accountability",
      desc: "Parents receive detailed lesson logs after every single session. Our directors review score improvements weekly to adjust learning goals and ensure measurable ROI.",
    },
  ];

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="bg-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full mb-3">
              <Brain className="w-3.5 h-3.5 text-gold" /> Evidence-Based Learning
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              The ACE 4-Pillar <span className="text-gradient">Pedagogical Framework</span>
            </h1>
            <p className="text-white/80 mt-4 text-sm md:text-base leading-relaxed">
              Why traditional classrooms fail struggling students and how 1-on-1 personalized instruction unlocks rapid score acceleration and lasting confidence.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pillars.map((p) => (
            <div key={p.num} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-3 hover:border-gold/30 transition-all">
              <span className="text-2xl font-black text-gold font-mono">{p.num}</span>
              <h2 className="text-xl font-bold text-navy">{p.title}</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-navy">Ready to Experience the Difference?</h2>
          <p className="text-xs text-gray-600 max-w-xl mx-auto">
            Book a complimentary 1-on-1 diagnostic assessment today and receive a personalized learning plan tailored to your student&apos;s goals.
          </p>
          <div>
            <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-3.5 rounded-xl transition-all shadow-md text-sm">
              Schedule Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
