import Link from "next/link";
import { SUBJECTS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects",
  description: "Expert tutoring in Math, English, Reading, Writing, Science, Biology, Chemistry, Physics, and more.",
};

export default function SubjectsPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Our Subjects</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Expert Tutoring in Every Subject</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">From foundational skills to advanced coursework, our certified tutors deliver personalized instruction that drives results.</p>
        </div>
      </section>
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((s) => (
            <Link key={s.slug} href={`/subjects/${s.slug}`} className="bg-white rounded-2xl p-8 card-hover group border border-gray-100 hover:border-gold/20">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h2 className="text-xl font-bold text-navy group-hover:text-gold-dark transition-colors">{s.name}</h2>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{s.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold mt-4">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
