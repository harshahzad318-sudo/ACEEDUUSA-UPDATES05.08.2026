import Link from "next/link";
import { EXAMS } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Preparation",
  description: "Expert test prep for SAT, ACT, GED, AP, IELTS, and TOEFL with proven score improvement strategies.",
};

export default function ExamPrepPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Exam Preparation</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Ace Every Exam with Confidence</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Proven test prep strategies, expert tutors, and personalized study plans for every major standardized test.</p>
        </div>
      </section>
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMS.map((e) => (
            <Link key={e.slug} href={`/exam-prep/${e.slug}`} className="bg-white rounded-2xl p-8 card-hover group border border-gray-100 hover:border-gold/20">
              <div className="text-4xl mb-4">{e.icon}</div>
              <h2 className="text-xl font-bold text-navy group-hover:text-gold-dark transition-colors">{e.name} Preparation</h2>
              <p className="text-xs text-gray-400 font-medium mt-1">{e.fullName}</p>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{e.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold mt-4">Learn more <ArrowRight className="w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
