import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText, Shield, CheckCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | ACE Education USA",
  description: "Terms of Service and Tutoring Service Agreement for ACE Education USA. Outlining session policies, tutor matching guarantees, cancellations, and billing terms.",
  alternates: {
    canonical: "https://aceeducation.us/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
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
              <FileText className="w-3.5 h-3.5 text-gold" /> Service Agreement
            </div>
            <h1 className="text-3xl font-extrabold text-navy">Terms of Service</h1>
            <p className="text-xs text-gray-500 mt-2">Effective Date: January 1, 2026 • Governed under US Educational Standards</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-gray-700 leading-relaxed space-y-6">
            <p>
              Welcome to ACE Education USA. By accessing our platform, enrolling in 1-on-1 tutoring sessions, or purchasing custom educational assessment packages, you agree to comply with and be bound by the following Terms of Service (&quot;Terms&quot;).
            </p>

            <h2 className="text-lg font-bold text-navy mt-6">1. Tutoring Services & Session Punctuality</h2>
            <p>
              ACE Education USA provides private 1-on-1 online and in-home academic instruction, test preparation (SAT/ACT/AP/IB), and specialized learning support.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Session Duration:</strong> Sessions are scheduled in 60-minute, 90-minute, or 120-minute blocks. Tutors and students are expected to join the virtual whiteboard or arrive at the designated in-home location on time.</li>
              <li><strong>Cancellation & Rescheduling Policy:</strong> Session cancellations or rescheduling requests must be submitted at least 24 hours prior to the scheduled start time via the Parent or Student Portal. Cancellations under 24 hours may be subject to a late fee or deduction of session credits in accordance with our operations policy.</li>
            </ul>

            <h2 className="text-lg font-bold text-navy mt-6">2. 100% Tutor Match Guarantee</h2>
            <p>
              We are committed to delivering exceptional pedagogical chemistry between student and tutor. If after the first session you feel the assigned tutor is not a perfect fit for your student&apos;s learning speed or personality, ACE Education will re-assign a new tutor at no additional charge and credit the initial session hour back to your account.
            </p>

            <h2 className="text-lg font-bold text-navy mt-6">3. Billing, Packages & Refund Policy</h2>
            <p>
              Tuition packages are billed securely in advance. Monthly billing cycles or prepaid hourly packages are available depending on your selected tier.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Unused hourly package credits remain valid for up to 12 months from purchase.</li>
              <li>Refund requests for unused session hours submitted within 30 days of purchase are processed in full, minus consumed diagnostic evaluation fees.</li>
            </ul>

            <h2 className="text-lg font-bold text-navy mt-6">4. Code of Conduct & Academic Integrity</h2>
            <p>
              ACE Education tutors provide guidance, explanation, homework coaching, and test preparation. Tutors do NOT complete graded school assignments, write essays on behalf of students, or engage in academic dishonesty. We empower independent student mastery.
            </p>

            <h2 className="text-lg font-bold text-navy mt-6">5. Contact Information</h2>
            <p>For questions regarding these Terms or account inquiries:</p>
            <div className="bg-bg-light p-4 rounded-2xl border border-gray-200 text-xs text-navy font-semibold">
              <p>ACE Education USA - Client Success Advisory</p>
              <p>Email: legal@aceeducation.us</p>
              <p>Direct Toll-Free: +1-800-555-ACE1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
