import Link from "next/link";
import { LEARNING_SUPPORT } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Support",
  description: "Specialized tutoring for ADHD, Dyslexia, Study Skills, and Homework Help with evidence-based approaches.",
};

export default function LearningSupportPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Learning Support</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Specialized Learning Support</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Evidence-based approaches for students who learn differently. Every child deserves personalized support.</p>
        </div>
      </section>
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 gap-8">
          {LEARNING_SUPPORT.map((l) => (
            <Link key={l.slug} href={`/learning-support/${l.slug}`} className="bg-white rounded-2xl p-10 card-hover group border border-gray-100 hover:border-gold/20">
              <div className="text-5xl mb-4">{l.icon}</div>
              <h2 className="text-2xl font-bold text-navy group-hover:text-gold-dark transition-colors">{l.name}</h2>
              <p className="text-gray-500 mt-3 leading-relaxed">{l.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold mt-6">Learn more <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
