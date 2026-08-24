import { notFound } from "next/navigation";
import Link from "next/link";
import { CURRICULA } from "@/lib/data";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return CURRICULA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const curr = CURRICULA.find((c) => c.slug === slug);
  if (!curr) return {};
  return { title: `${curr.name} Tutoring`, description: `Expert tutoring aligned with the ${curr.name} curriculum.` };
}

export default async function CurriculumDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const curr = CURRICULA.find((c) => c.slug === slug);
  if (!curr) notFound();

  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/curriculum" className="hover:text-white">Curriculum</Link> / <span className="text-gold">{curr.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">{curr.name} Tutoring</h1>
          <p className="text-white/60 mt-4 text-lg max-w-3xl">Expert tutoring perfectly aligned with the {curr.name} curriculum and standards.</p>
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-7 py-3.5 rounded-xl text-sm mt-8 transition-all">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy mb-6">About {curr.name}</h2>
          <p className="text-gray-600 leading-relaxed">Our {curr.name} tutoring program is designed by educators who deeply understand the curriculum&apos;s requirements, assessment criteria, and learning objectives. Every lesson is aligned with official standards to ensure your child is fully prepared for exams and assessments.</p>
          <h3 className="text-xl font-bold text-navy mt-8 mb-4">What We Offer</h3>
          <ul className="space-y-3">
            {[
              `Curriculum-aligned lesson plans for ${curr.name}`,
              "Subject-specific expert tutors",
              "Practice exams and past papers",
              "Personalized study schedules",
              "Progress tracking and reporting",
              "Exam preparation and revision strategies",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Start {curr.name} Tutoring Today</h2>
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl mt-8 transition-all">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
