import Link from "next/link";
import { ArrowRight, Monitor, CheckCircle, Globe, Clock, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Tutoring",
  description: "Premium online tutoring with interactive whiteboard, video conferencing, and real-time collaboration. Available nationwide.",
};

export default function OnlineTutoringPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">Online Tutoring</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Premium Online Tutoring from Anywhere</h1>
              <p className="text-white/60 mt-4 text-lg">Access world-class tutors from the comfort of your home. Our interactive platform makes learning engaging, effective, and convenient.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-7 py-3.5 rounded-xl text-sm transition-all">
                  Start Online Tutoring <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.pexels.com/photos/7776430/pexels-photo-7776430.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700" alt="Online tutoring session" className="rounded-3xl shadow-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy text-center mb-12">Why Online Tutoring Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Monitor className="w-6 h-6" />, title: "Interactive Platform", desc: "HD video, shared whiteboard, screen sharing, and real-time document collaboration." },
              { icon: <Globe className="w-6 h-6" />, title: "Available Nationwide", desc: "Connect with the best tutors regardless of your location in the United States." },
              { icon: <Clock className="w-6 h-6" />, title: "Flexible Scheduling", desc: "Morning, afternoon, and evening sessions. Weekdays and weekends available." },
              { icon: <Shield className="w-6 h-6" />, title: "Safe & Secure", desc: "Encrypted video sessions with monitored learning environments." },
              { icon: <Zap className="w-6 h-6" />, title: "Session Recordings", desc: "Review any lesson anytime. Every session is recorded for future reference." },
              { icon: <CheckCircle className="w-6 h-6" />, title: "No Commute", desc: "Save time and energy. Learning happens right at your desk." },
            ].map((f, i) => (
              <div key={i} className="bg-bg-light rounded-2xl p-8 card-hover">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4">{f.icon}</div>
                <h3 className="font-bold text-navy">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-navy">Online Tutoring Pricing</h2>
          <p className="text-gray-500 mt-3">Starting from just $45/hour for elite 1-on-1 sessions.</p>
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-2xl p-8 card-hover">
              <h3 className="font-bold text-navy text-lg">Private Session</h3>
              <div className="mt-4"><span className="text-4xl font-extrabold text-navy">$45</span><span className="text-gray-400">/hour</span></div>
              <p className="text-xs text-gray-400 mt-2">Starts from $45/hr for primary level grades</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-600 text-left">
                {["1-on-1 personalized instruction", "Interactive whiteboard", "Session recording", "Progress reports", "Grades 6-8: $55/hr • High School: $65/hr • AP/College: $75/hr"].map((f,i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" /><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <div className="bg-navy rounded-2xl p-8 text-white card-hover ring-2 ring-gold">
              <h3 className="font-bold text-lg">Bronze Monthly Package</h3>
              <div className="mt-4"><span className="text-4xl font-extrabold text-gold">from $382.50</span><span className="text-white/60">/month</span></div>
              <p className="text-xs text-white/50 mt-2">Includes 10 complete hours of tutoring</p>
              <ul className="mt-6 space-y-2 text-sm text-white/80 text-left">
                {["Includes 10 hours of 1-on-1 tutoring per month", "Equivalent to 2.5 hours of focus per week", "Save 15% compared to hourly booking (15% package discount applied)", "Priority schedule & free assessment"].map((f,i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" /><span>{f}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-gold mt-8 hover:underline">
            View all pricing options <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Start Learning Online Today</h2>
          <p className="text-white/60 mt-4">Book your free assessment and experience our interactive platform.</p>
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl mt-8 transition-all">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
