import Link from "next/link";
import { ArrowRight, Home, CheckCircle, MapPin, Users, Clock, Shield } from "lucide-react";
import { STATES } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In-Home Tutoring",
  description: "Premium in-home tutoring across 18 states. Expert tutors come to your home for personalized face-to-face instruction.",
};

export default function HomeTutoringPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">In-Home Tutoring</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Expert Tutors at Your Doorstep</h1>
              <p className="text-white/60 mt-4 text-lg">Personalized, face-to-face tutoring in the comfort of your home. Available in major metropolitan areas across 18 states.</p>
              <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-7 py-3.5 rounded-xl text-sm mt-8 transition-all">
                Find a Home Tutor <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.pexels.com/photos/5303660/pexels-photo-5303660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700" alt="In-home tutoring" className="rounded-3xl shadow-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy text-center mb-12">Benefits of In-Home Tutoring</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Home className="w-6 h-6" />, title: "Familiar Environment", desc: "Students learn best in comfortable, familiar surroundings." },
              { icon: <Users className="w-6 h-6" />, title: "Personal Connection", desc: "Build stronger relationships with face-to-face interaction." },
              { icon: <Shield className="w-6 h-6" />, title: "Background Checked", desc: "All tutors undergo rigorous background screening." },
              { icon: <Clock className="w-6 h-6" />, title: "Flexible Hours", desc: "Schedule sessions that fit your family's routine." },
              { icon: <MapPin className="w-6 h-6" />, title: "18 States", desc: "Available in major metro areas across America." },
              { icon: <CheckCircle className="w-6 h-6" />, title: "All Materials", desc: "Tutors bring all necessary learning materials." },
            ].map((f, i) => (
              <div key={i} className="bg-bg-light rounded-2xl p-8 card-hover">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4">{f.icon}</div>
                <h3 className="font-bold text-navy">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-navy text-center mb-12">Available In These States</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {STATES.map(s => (
              <Link key={s.slug} href={`/states/${s.slug}`} className="bg-white rounded-xl p-4 text-center card-hover hover:border-gold/20 border border-gray-100 group">
                <div className="font-extrabold text-navy text-lg group-hover:text-gold transition-colors">{s.abbr}</div>
                <div className="text-xs text-gray-500 mt-1">{s.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Book an In-Home Tutor Today</h2>
          <p className="text-white/60 mt-4">Starting at $65/hour for primary levels. Monthly 10-Hour Packages start at $552.50/month (saves 15% with package discount applied).</p>
          <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl mt-8 transition-all">
            Book Free Assessment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
