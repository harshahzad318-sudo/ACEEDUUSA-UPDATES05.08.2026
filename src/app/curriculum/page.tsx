import Link from "next/link";
import { CURRICULA } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "We cover Common Core, AP, IB, IGCSE, A Levels, SAT, ACT, GED, IELTS, and TOEFL curricula.",
};

const DESCS: Record<string, string> = {
  "common-core": "Aligned with US national standards used in most American schools for Math and English Language Arts.",
  "ap": "Advanced Placement courses offering college-level academics and exam preparation for college credit.",
  "ib": "International Baccalaureate programme providing a rigorous, internationally recognized education framework.",
  "igcse": "Cambridge International curriculum for students aged 14-16, widely recognized worldwide.",
  "a-levels": "British curriculum advanced qualifications, excellent preparation for university admissions.",
  "sat": "Scholastic Assessment Test preparation for college admissions in the United States.",
  "act": "American College Testing preparation covering English, Math, Reading, and Science.",
  "ged": "General Educational Development test preparation for high school equivalency diploma.",
  "ielts": "International English Language Testing System for academic and immigration purposes.",
  "toefl": "Test of English as a Foreign Language for university admissions and academic purposes.",
};

export default function CurriculumPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Curriculum</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Every Major Curriculum Covered</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Expert tutoring aligned with the curriculum your child follows.</p>
        </div>
      </section>
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRICULA.map((c) => (
            <div key={c.slug} className="bg-white rounded-2xl p-8 card-hover border border-gray-100 hover:border-gold/20">
              <h2 className="text-xl font-bold text-navy">{c.name}</h2>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{DESCS[c.slug] || "Comprehensive tutoring aligned with this curriculum."}</p>
              <Link href="/book-assessment" className="inline-flex items-center gap-1 text-sm font-semibold text-gold mt-4">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
