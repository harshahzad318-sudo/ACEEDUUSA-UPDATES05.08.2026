import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Shield, Lock, FileText, CheckCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | ACE Education USA",
  description: "ACE Education USA Privacy Policy. Read how we collect, protect, and handle student and parent information in compliance with COPPA, FERPA, and US data protection standards.",
  alternates: {
    canonical: "https://aceeducation.us/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
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
              <Shield className="w-3.5 h-3.5 text-gold" /> Trust & Compliance
            </div>
            <h1 className="text-3xl font-extrabold text-navy">Privacy Policy</h1>
            <p className="text-xs text-gray-500 mt-2">Last Updated: January 15, 2026 • Valid for all 50 US States</p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-gray-700 leading-relaxed space-y-6">
            <p>
              ACE Education USA (&quot;ACE Education&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy and security of our students, parents, tutors, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you visit our website (https://aceeducation.us), enroll in private tutoring programs, or utilize our learning portals.
            </p>

            <h2 className="text-lg font-bold text-navy mt-6">1. Compliance with Student Privacy Laws (COPPA & FERPA)</h2>
            <p>
              We adhere strictly to the Children&apos;s Online Privacy Protection Act (COPPA) and Family Educational Rights and Privacy Act (FERPA) guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>We do not knowingly collect personal information directly from children under 13 without verifiable parental consent.</li>
              <li>Parent or legal guardian consent is required prior to initiating diagnostic assessments or 1-on-1 tutoring sessions for minors.</li>
              <li>Academic progress reports, session logs, and diagnostic evaluation scores are strictly confidential and shared exclusively with designated parents or guardians.</li>
            </ul>

            <h2 className="text-lg font-bold text-navy mt-6">2. Information We Collect</h2>
            <p>
              Depending on your interaction with our services, we may collect the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Name, parent/guardian email address, phone number, and physical mailing address (for in-home tutoring placements).</li>
              <li><strong>Academic Profile:</strong> Grade level, school name, target subjects, current GPA, SAT/ACT test scores, and learning accommodations (e.g., 504 plans or IEPs).</li>
              <li><strong>Billing & Payment Details:</strong> Payment transactions are processed through encrypted PCI-DSS compliant third-party payment gateways (such as Stripe). ACE Education does not store full credit card numbers on local servers.</li>
              <li><strong>Usage & Portal Logins:</strong> IP address, browser type, diagnostic assessment responses, and interaction timestamps within the Student and Parent Portals.</li>
            </ul>

            <h2 className="text-lg font-bold text-navy mt-6">3. How We Use Your Information</h2>
            <p>We utilize the collected information strictly for educational and administrative purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Matching students with vetted subject-matter tutors based on learning speed and personality fit.</li>
              <li>Delivering 1-on-1 online whiteboard lessons and managing schedule appointments.</li>
              <li>Generating parent progress scorecards and weekly diagnostic evaluation summaries.</li>
              <li>Communicating session reminders, invoices, and academic updates.</li>
              <li>Enhancing website security, preventing fraud, and optimizing platform performance.</li>
            </ul>

            <h2 className="text-lg font-bold text-navy mt-6">4. Data Security & Retention</h2>
            <p>
              We implement industry-standard technical, physical, and administrative safeguards to protect your personal data against unauthorized access, loss, or alteration. All web communications are encrypted via SSL/TLS (HTTPS). Access to student records is strictly restricted to authorized education directors and designated tutors.
            </p>

            <h2 className="text-lg font-bold text-navy mt-6">5. Contact Our Data Protection Officer</h2>
            <p>
              If you have questions, concerns, or requests regarding your personal information or wish to delete your account data, please contact our Compliance Office:
            </p>
            <div className="bg-bg-light p-4 rounded-2xl border border-gray-200 text-xs text-navy font-semibold">
              <p>ACE Education USA - Privacy & Compliance Office</p>
              <p>Email: privacy@aceeducation.us</p>
              <p>Phone: +1-800-555-ACE1 (Ext. 4)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
