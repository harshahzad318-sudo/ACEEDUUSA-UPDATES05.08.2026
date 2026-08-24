import { Phone, Mail, Send, Clock } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ACE Education. Call, email info@aceeducation.us, or message us on Telegram.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Contact Us</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">We&apos;d Love to Hear From You</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Have questions? Our team is here to help you find the perfect tutoring solution.</p>
        </div>
      </section>

      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-navy mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+1 (332) 293-6270", href: "tel:+13322936270" },
                { icon: <Mail className="w-5 h-5" />, label: "Email", value: "info@aceeducation.us", href: "mailto:info@aceeducation.us" },
                { icon: <Send className="w-5 h-5" />, label: "Telegram", value: "@ACEeducationUSA", href: "https://t.me/ACEeducationUSA?text=Hi%20ACE%20Education!%20I%27d%20like%20to%20find%20out%20more%20about%20your%20tutoring%20programmes." },
                { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Mon–Sat: 8AM–8PM EST", href: undefined },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shrink-0">{c.icon}</div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-navy hover:text-gold transition-colors" target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}>{c.value}</a>
                    ) : (
                      <span className="font-semibold text-navy">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-bold text-navy mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { href: "https://www.facebook.com/ACEeducationkl/", label: "Facebook" },
                  { href: "https://www.instagram.com/ace.educationkl/", label: "Instagram" },
                  { href: "https://my.linkedin.com/company/ace-education-malaysia", label: "LinkedIn" },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="bg-navy/5 hover:bg-gold hover:text-navy text-navy px-4 py-2 rounded-xl text-sm font-medium transition-all">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
