import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import AboutTestimonials from "@/components/AboutTestimonials";
import { Star, Award, TrendingUp, CheckCircle, GraduationCap, ArrowRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Student Success Stories & Testimonials | ACE Education USA",
  description: "Read real 1-on-1 tutoring success stories, SAT/ACT score improvements, and college acceptances from families across all 50 US states.",
  alternates: {
    canonical: "https://aceeducation.us/success-stories",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdReviews = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ACE Education USA",
  "url": "https://aceeducation.us",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1280",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marcus Vance" },
      "datePublished": "2025-11-10",
      "reviewBody": "My son raised his Digital SAT score from 1240 to 1480 in just 8 weeks of private 1-on-1 prep with ACE Education. The Desmos calculator strategies were game changers!",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Elena Rostova" },
      "datePublished": "2025-12-04",
      "reviewBody": "The AP Physics 1 private tutor was outstanding. My daughter went from struggling with C grades to scoring a 5 on her May exam. Highly recommend ACE Education!",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ]
};

export default function SuccessStoriesPage() {
  const highlights = [
    { metric: "+210 PTS", label: "Average SAT Score Increase", detail: "Across 450+ SAT prep students in 2025" },
    { metric: "98.4%", label: "Grade Improvement Rate", detail: "Students improving at least 1 letter grade within 60 days" },
    { metric: "100%", label: "Tutor Match Satisfaction", detail: "Backed by our zero-risk tutor re-assignment guarantee" },
  ];

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdReviews) }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="bg-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full mb-3">
              <Award className="w-3.5 h-3.5 text-gold" /> Proven Student Outcomes
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Real Results from <span className="text-gradient">Real Families</span>
            </h1>
            <p className="text-white/80 mt-4 text-sm md:text-base leading-relaxed">
              Explore how our 1-on-1 private tutors empower students across the United States to master difficult concepts, ace standardized tests, and gain admission to top-choice universities.
            </p>
          </div>
        </div>

        {/* Impact Metric Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {highlights.map((h, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-3xl font-black text-navy">{h.metric}</div>
              <div className="text-xs font-bold text-gold uppercase tracking-wider mt-1">{h.label}</div>
              <p className="text-[11px] text-gray-500 mt-2">{h.detail}</p>
            </div>
          ))}
        </div>

        {/* Interactive Testimonial Carousel */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-12">
          <AboutTestimonials />
        </div>

        {/* CTA */}
        <div className="bg-navy rounded-3xl p-8 text-center text-white space-y-4">
          <h2 className="text-2xl font-extrabold">Write Your Student&apos;s Success Story</h2>
          <p className="text-xs text-white/80 max-w-lg mx-auto">
            Get started with a free diagnostic assessment and meet your dedicated 1-on-1 academic tutor today.
          </p>
          <div className="pt-2">
            <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-3.5 rounded-xl transition-all shadow-md text-sm">
              Schedule Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
