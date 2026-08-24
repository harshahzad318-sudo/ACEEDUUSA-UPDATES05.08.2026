import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Award, CheckCircle, ShieldCheck, UserCheck, BookOpen, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy & Tutor Vetting Standards | ACE Education USA",
  description: "Learn about ACE Education USA's rigorous 4-stage tutor vetting process, academic review panel, and content accuracy standards. Setting the gold standard for EEAT in US K-12 education.",
  alternates: {
    canonical: "https://aceeducation.us/editorial-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full mb-3">
              <Award className="w-3.5 h-3.5 text-gold" /> EEAT & Quality Assurance
            </div>
            <h1 className="text-3xl font-extrabold text-navy">Editorial Policy & Tutor Vetting Standards</h1>
            <p className="text-xs text-gray-500 mt-2">Published: January 2026 • Verified by ACE Education Academic Review Panel</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-gray-700 leading-relaxed space-y-6">
            <p>
              At ACE Education USA, we understand that educational success relies on accurate guidance, pedagogical rigor, and trusted subject matter experts. This document outlines our editorial policy, fact-checking workflows, and our industry-leading 4-stage tutor recruitment vetting protocol.
            </p>

            <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mt-8">
              <UserCheck className="w-5 h-5 text-gold" /> 1. The Top 2% Tutor Vetting Protocol
            </h2>
            <p>
              Fewer than 2 out of every 100 tutor applicants pass our screening process. Every instructor representing ACE Education USA undergoes four rigorous vetting stages:
            </p>

            <div className="grid gap-4 mt-4">
              <div className="p-4 bg-bg-light rounded-2xl border border-gray-200">
                <div className="font-bold text-navy text-sm">Stage 1: Verified Degree Credentials & Subject Competency</div>
                <p className="text-xs text-gray-600 mt-1">Verification of bachelor&apos;s, master&apos;s, or doctorate degrees from accredited universities, plus 99th percentile official test scores for SAT, ACT, AP, or GRE instructors.</p>
              </div>

              <div className="p-4 bg-bg-light rounded-2xl border border-gray-200">
                <div className="font-bold text-navy text-sm">Stage 2: Live Mock Teaching & Pedagogical Evaluation</div>
                <p className="text-xs text-gray-600 mt-1">Candidates conduct a live, interactive 45-minute lesson before our Education Directors. They are assessed on clarity, patience, adaptability, and active student engagement techniques.</p>
              </div>

              <div className="p-4 bg-bg-light rounded-2xl border border-gray-200">
                <div className="font-bold text-navy text-sm">Stage 3: Comprehensive Background Checks & Safety Audit</div>
                <p className="text-xs text-gray-600 mt-1">Multi-state criminal background checks, identity verification, and professional reference reviews to ensure complete student safety for online and in-home environments.</p>
              </div>

              <div className="p-4 bg-bg-light rounded-2xl border border-gray-200">
                <div className="font-bold text-navy text-sm">Stage 4: Continuous Quality Monitoring & Parent Reviews</div>
                <p className="text-xs text-gray-600 mt-1">Every session is accompanied by tutor progress logs. Tutors must maintain a minimum 4.8/5.0 family satisfaction rating to remain active on our roster.</p>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mt-8">
              <BookOpen className="w-5 h-5 text-gold" /> 2. Content Accuracy & Curriculum Alignment
            </h2>
            <p>
              All blog articles, study guides, exam breakdown tools, and diagnostic practice materials published on aceeducation.us are authored or thoroughly reviewed by certified educators.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Official Standard Alignment:</strong> Test prep materials adhere strictly to current College Board (Digital SAT, AP), ACT Inc., IB Organization, and state K-12 education guidelines.</li>
              <li><strong>Continuous Review:</strong> When test formats or scoring algorithms change (such as the Digital SAT transition), our academic panel updates all related guides within 14 days.</li>
              <li><strong>No Unverified AI Hallucinations:</strong> While technology aids our operations, all educational content and diagnostic questions are written and fact-checked by human subject matter specialists.</li>
            </ul>

            <h2 className="text-xl font-extrabold text-navy flex items-center gap-2 mt-8">
              <ShieldCheck className="w-5 h-5 text-gold" /> 3. Independence & Transparency
            </h2>
            <p>
              ACE Education USA does not accept paid sponsorships, undisclosed product placements, or affiliate compensation for reviewing textbooks, software, or test prep materials. Our reviews and recommendations are 100% independent and designed to serve the best interest of students and parents.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">ACE Education USA Academic Review Committee</span>
              <Link href="/about" className="text-xs font-bold text-navy hover:text-gold transition-colors">
                Meet Our Leadership &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
