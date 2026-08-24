import type { Metadata } from "next";
import { CheckCircle, Phone, Mail, Send } from "lucide-react";
import AssessmentForm from "@/components/AssessmentForm";

export const metadata: Metadata = {
  title: "Book Free Assessment",
  description: "Schedule a complimentary academic assessment for your child. No commitment required.",
};

export default function BookAssessmentPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Get Started</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Book Your Free Assessment</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Our complimentary academic assessment identifies your child&apos;s strengths, gaps, and the perfect learning path forward.</p>
        </div>
      </section>

      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <AssessmentForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-navy text-lg mb-4">What to Expect</h3>
              <ul className="space-y-3">
                {[
                  "30-minute complimentary academic evaluation",
                  "Assessment of current skill levels",
                  "Identification of learning gaps",
                  "Personalized learning plan recommendation",
                  "Tutor matching based on your needs",
                  "No obligation to enroll",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h3 className="font-bold text-lg mb-4">Need Help?</h3>
              <div className="space-y-3 text-sm">
                <a href="tel:+13322936270" className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4" /> +1 (332) 293-6270
                </a>
                <a href="mailto:info@aceeducation.us" className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors">
                  <Mail className="w-4 h-4" /> info@aceeducation.us
                </a>
                <a href="https://t.me/ACEeducationUSA" className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
