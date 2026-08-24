import { notFound } from "next/navigation";
import Link from "next/link";
import { STATES, SUBJECTS, EXAMS } from "@/lib/data";
import { CheckCircle, ArrowRight, MapPin, Star } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return STATES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const state = STATES.find((s) => s.slug === slug);
  if (!state) return {};
  return {
    title: `Tutoring in ${state.name}`,
    description: `Premium online and in-home tutoring services in ${state.name}. Expert tutors for Math, English, Science, SAT, ACT and more.`,
  };
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = STATES.find((s) => s.slug === slug);
  if (!state) notFound();

  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/states" className="hover:text-white">States</Link> / <span className="text-gold">{state.name}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-gold" />
            <span className="bg-gold/20 text-gold text-sm font-bold px-3 py-1 rounded-full">{state.abbr}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Tutoring in {state.name}</h1>
          <p className="text-white/60 mt-4 text-lg max-w-3xl">
            Premium personalized online and in-home tutoring services for students across {state.name}. Expert tutors covering all subjects, curricula, and exam preparation.
          </p>
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-7 py-3.5 rounded-xl text-sm mt-8 transition-all">
            Find a Tutor in {state.name} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Subjects in State */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy mb-8">Subjects Available in {state.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SUBJECTS.map((s) => (
              <Link key={s.slug} href={`/subjects/${s.slug}`} className="bg-bg-light hover:bg-gold/5 rounded-2xl p-5 card-hover group flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-semibold text-navy text-sm group-hover:text-gold-dark transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Prep */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy mb-8">Exam Preparation in {state.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAMS.map((e) => (
              <Link key={e.slug} href={`/exam-prep/${e.slug}`} className="bg-white rounded-2xl p-6 card-hover group border border-gray-100 hover:border-gold/20">
                <span className="text-3xl">{e.icon}</span>
                <h3 className="font-bold text-navy mt-3 group-hover:text-gold-dark transition-colors">{e.name} Prep in {state.name}</h3>
                <p className="text-xs text-gray-500 mt-2">{e.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why ACE in State */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy mb-8">Why Choose ACE Education in {state.name}</h2>
          <div className="space-y-4">
            {[
              `Local tutors who understand ${state.name}'s educational standards and requirements`,
              "Flexible online sessions available to all families statewide",
              `In-home tutoring in major ${state.name} metropolitan areas`,
              "Common Core alignment with state-specific curriculum standards",
              "Certified tutors with background checks and verified credentials",
              "Free academic assessment to determine your child's needs",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Start Tutoring in {state.name} Today</h2>
          <p className="text-white/60 mt-4">Book your free assessment and get matched with the perfect tutor.</p>
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl mt-8 transition-all">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
