import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import {
  BookOpen,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Calendar,
  Compass,
  FileSpreadsheet,
  Award,
  Users,
  CheckCircle,
  BookmarkCheck,
  ChevronRight,
  HelpCircle,
  FileText
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Planning & University Enrolment | ACE Education USA",
  description: "Navigate US university admissions and enrolment with expert guidance on personal statements, AP courses, FAFSA, and strategic college application planning.",
};

export default function CollegePlanningPage() {
  // Get all college planning articles
  const collegeBlogPosts = BLOG_POSTS.filter(
    (post) => post.category === "College Planning"
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4">
            <Link href="/resources" className="text-xs text-gold hover:underline flex items-center gap-1.5 uppercase tracking-widest font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
            </Link>
          </div>
          <span className="text-xs font-semibold text-gold uppercase tracking-widest font-mono">Admissions &amp; Placement</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight max-w-3xl">
            College Planning &amp; University Enrolment
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl text-base md:text-lg">
            Guiding high schoolers through every milestone of US college admissions. From curriculum tracking to personal statements and enrolment finalization, our consultants ensure success.
          </p>
        </div>
      </section>

      {/* University Enrolment & Planning Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">Strategic Guidance</span>
              <h2 className="text-3xl font-extrabold text-navy mt-2 leading-tight">
                How We Help Students Secure University Enrolment
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Applying to selective American colleges requires more than high GPA scores. Modern admissions committees evaluate candidates holistically, looking for passion spikes, strong character references, and intellectual vitality.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                ACE Education provides end-to-end consulting that transforms stressful application seasons into a structured, predictable journey. We work 1-on-1 with high schoolers starting as early as 9th grade to cultivate competitive profiles.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    title: "University & College Selection",
                    desc: "Creating a balanced, customized college list (Reach, Match, Safety) aligned with academic interests and financial budgets."
                  },
                  {
                    title: "Personal Statement & Essays",
                    desc: "Brainstorming authentic, high-impact personal stories and polishing supplementary essays to stand out to admissions boards."
                  },
                  {
                    title: "Extracurricular 'Spike' Strategy",
                    desc: "Moving away from generic club lists to establish singular, deep passion projects and community impact portfolios."
                  },
                  {
                    title: "Financial Aid & FAFSA Guide",
                    desc: "Walking families through the FAFSA process, scholarship filings, and critical evaluation of university award offers."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="bg-gold/10 p-2 rounded-lg text-gold shrink-0 h-fit mt-1">
                      <BookmarkCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8F9FC] p-8 rounded-3xl border border-gray-100/80">
              <h3 className="font-extrabold text-navy text-xl mb-4">Complete Admissions Checklist</h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Follow this proven timeline to keep your admissions process completely stress-free and aligned with top deadlines.
              </p>
              <div className="space-y-4">
                {[
                  { year: "9th-10th Grade", task: "Plan rigorous AP/Honors course schedules and select core extracurricular interests." },
                  { year: "11th Grade (Fall)", task: "Prepare for and schedule the Digital SAT/ACT exams." },
                  { year: "11th Grade (Spring)", task: "Conduct initial campus tours and ask favorite teachers for recommendation letters." },
                  { year: "12th Grade (Summer)", task: "Draft the Common Application Personal Statement and finalize the college list." },
                  { year: "12th Grade (Fall)", task: "Submit Early Action / Early Decision applications and complete FAFSA forms." },
                  { year: "12th Grade (Spring)", task: "Evaluate acceptance offers, compare aid letters, and submit the enrolment deposit." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <span className="text-[10px] font-mono font-bold bg-navy text-white px-2 py-0.5 rounded shrink-0">{step.year}</span>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{step.task}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Resources Row */}
      <section className="py-16 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Articles List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-extrabold text-navy text-xl mb-6 flex items-center gap-2 border-b border-gray-50 pb-4">
                  <FileText className="text-gold w-5 h-5" />
                  College Admissions Knowledge Base
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {collegeBlogPosts.map((post, idx) => (
                    <Link
                      key={idx}
                      href={`/blog/${post.slug}`}
                      className="group bg-[#F8F9FC] p-5 rounded-2xl border border-gray-100/40 hover:border-gold/20 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-mono">{post.category}</span>
                        <h4 className="font-bold text-navy mt-1.5 leading-snug group-hover:text-gold-dark transition-colors text-sm">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <span className="text-xs text-navy/40 mt-4 block border-t border-gray-100/60 pt-3">{post.date}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Consultation Contact Banner */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-navy text-lg mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
                  <GraduationCap className="text-gold w-5 h-5" />
                  Free Placement Advisory
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Our certified admissions coaches have successfully helped students get accepted to Ivy Leagues, top-tier state flagships, and competitive liberal arts colleges across the country.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Common App & UC application help",
                    "Supplemental essay drafting",
                    "Course sequence (AP/IB) optimization",
                    "Admissions interview drills"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex gap-2 items-center text-xs text-gray-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book-assessment"
                  className="block w-full text-center bg-gold hover:bg-gold-dark text-navy font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Schedule Free Assessment
                </Link>
              </div>

              {/* Informational Card */}
              <div className="bg-navy p-6 rounded-2xl text-white">
                <h4 className="font-bold text-sm uppercase text-gold tracking-wider">The Demonstrated Interest Trap</h4>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  Many colleges secretly track how often students open emails, attend webinars, or connect with admissions reps. We teach students how to build structural demonstrated interest profiles that significantly raise acceptance rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
