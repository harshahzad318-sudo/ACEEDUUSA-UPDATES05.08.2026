import type { Metadata } from "next";
import Link from "next/link";
import { Star, ShieldCheck, Award, GraduationCap, CheckCircle, Search, Filter, BookOpen, Users, Phone, ArrowRight } from "lucide-react";
import { TUTORS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meet Our Elite Tutors | Top 2% Educators in USA",
  description: "Browse certified tutors, PhD educators, and Ivy League graduates specializing in Math, Science, English, SAT/ACT, and Special Learning Needs.",
};

const TUTOR_SPECIALTIES = [
  "All Subjects",
  "Mathematics",
  "English & Writing",
  "Science & Physics",
  "Biology & Chemistry",
  "SAT & ACT Prep",
  "Learning Support",
];

export default function TutorsPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="bg-navy py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,168,0,0.12),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-xs text-gold font-mono font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 text-gold" /> Handpicked Top 2% Tutors
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Meet Our <span className="text-gold">World-Class Educators</span>
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Every ACE tutor is rigorously background-checked, certified, and matched exclusively by our Academic Advisors to align with your child&apos;s learning style.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/80 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" /> Background-Checked</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" /> Ivy League &amp; PhD Faculty</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" /> Guaranteed Match</span>
          </div>
        </div>
      </section>

      {/* Main Tutors Directory */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Quality Banner */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-gold-dark" />
              </div>
              <div>
                <h3 className="font-bold text-navy text-lg">Matched Exclusively by ACE Academic Advisors</h3>
                <p className="text-sm text-gray-500 mt-1">We don&apos;t leave your child&apos;s education to random search. Our regional directors personally match tutors to student goals.</p>
              </div>
            </div>
            <Link
              href="/book-assessment"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0"
            >
              Get Personalized Match <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Tutors */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TUTORS.map((tutor, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Badge & Image */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-gold/20 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow" title="Background Checked">
                        <CheckCircle className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="bg-navy/5 text-navy text-xs font-bold font-mono px-3 py-1.5 rounded-full border border-navy/10">
                      Verified Educator
                    </span>
                  </div>

                  <h3 className="font-extrabold text-navy text-xl group-hover:text-gold-dark transition-colors">{tutor.name}</h3>
                  <div className="text-xs text-gold-dark font-mono font-bold uppercase tracking-wider mt-1">{tutor.subject} Specialist</div>

                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-gold" fill="#F5A800" stroke="none" />
                    <span className="font-bold text-navy">{tutor.rating}</span>
                    <span className="text-gray-400">({tutor.students}+ Students)</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-semibold text-gray-500">{tutor.experience} Exp.</span>
                  </div>

                  <div className="mt-4 p-3.5 rounded-2xl bg-bg-light border border-gray-100 text-xs text-navy space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-gold shrink-0" /> {tutor.education}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-4 leading-relaxed italic">
                    &ldquo;{tutor.bio}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-gray-400 font-medium">1-on-1 Online or In-Home</span>
                  <Link
                    href={`/book-assessment?tutor=${encodeURIComponent(tutor.name)}`}
                    className="inline-flex items-center gap-1 bg-navy hover:bg-navy-light text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                  >
                    Request Tutor &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Section */}
          <div className="mt-20 bg-navy text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">100% Satisfaction Guarantee</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">Not Completely Satisfied with Your First Session?</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                We offer a zero-risk guarantee. If you or your child do not feel an instant spark and confidence boost after your first session, we will switch your tutor immediately and credit your first session hour.
              </p>
              <div className="pt-4">
                <Link
                  href="/book-assessment"
                  className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-gold/25"
                >
                  Book Your Complimentary Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
