import Link from "next/link";
import { STATES } from "@/lib/data";
import { MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutoring by State",
  description: "ACE Education USA provides premium online and in-home tutoring services across all 50 US states including Washington DC.",
};

export default function StatesPage() {
  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest">Locations</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Tutoring Across America</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Premium online and in-home tutoring services available across all 50 states of USA including Washington DC.</p>
        </div>
      </section>
      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {STATES.map((s) => (
            <Link key={s.slug} href={`/states/${s.slug}`} className="bg-white rounded-2xl p-6 card-hover group border border-gray-100 hover:border-gold/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy font-extrabold text-sm group-hover:bg-gold group-hover:text-navy transition-all">
                {s.abbr}
              </div>
              <div>
                <h2 className="font-bold text-navy group-hover:text-gold-dark transition-colors">{s.name}</h2>
                <p className="text-xs text-gray-500">Online & In-Home</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
