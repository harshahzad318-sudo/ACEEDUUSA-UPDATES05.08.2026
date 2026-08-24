"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, Star, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BADGES = ["Common Core", "AP", "SAT", "ACT", "GED", "IB", "IGCSE", "IELTS", "TOEFL"];

function AnimatedCounter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-extrabold text-gold">{count.toLocaleString()}{suffix}</div>
      <div className="text-sm text-white/70 mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* USA map simplified outline */}
          <path d="M100,300 Q200,250 300,280 Q400,200 500,250 Q600,180 700,220 Q800,160 900,200 Q1000,170 1100,250 L1100,400 Q1000,380 900,420 Q800,440 700,400 Q600,430 500,390 Q400,420 300,380 Q200,400 100,370 Z" fill="currentColor" className="text-gold animate-pulse" style={{animationDuration:"8s"}} />
          {Array.from({ length: 30 }).map((_, i) => (
            <circle key={i} cx={100 + (i % 10) * 110} cy={200 + Math.sin(i) * 100} r="3" fill="currentColor" className="text-gold/50" />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
              <Star className="w-4 h-4 text-gold" fill="#F5A800" />
              <span>{t("hero.rated")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              {t("hero.headline")}{" "}
              <span className="text-gradient">{t("hero.headline_highlight")}</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl">
              {t("hero.subheadline")}
            </p>

            {/* Curriculum badges */}
            <div className="flex flex-wrap gap-2 mt-8">
              {BADGES.map((b) => (
                <span key={b} className="bg-white/10 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                  {b}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5">
                {t("header.book_free")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#wizard" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-sm backdrop-blur border border-white/20 transition-all">
                {t("hero.find_tutor")}
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="/usa_students_hero.jpg"
                alt="Students studying together at ACE Education"
                width={600}
                height={420}
                className="w-full h-[420px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "0s" }}>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-navy">{t("hero.score_improved")}</div>
                <div className="text-xs text-gray-500">{t("hero.sat_points")}</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float" style={{ animationDelay: "2s" }}>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-gold" fill="#F5A800" />
              </div>
              <div>
                <div className="text-sm font-bold text-navy">4.9 Rating</div>
                <div className="text-xs text-gray-500">2,000+ Reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-5 gap-8 pt-10 border-t border-white/10">
          <AnimatedCounter end={6000} suffix="+" label={t("hero.students_tutored")} />
          <AnimatedCounter end={450} suffix="+" label={t("hero.expert_tutors")} />
          <AnimatedCounter end={50} suffix="" label={t("hero.states_covered")} />
          <AnimatedCounter end={98} suffix="%" label={t("hero.parent_satisfaction")} />
          <AnimatedCounter end={7} suffix="+" label={t("hero.years_excellence")} />
        </div>
      </div>
    </section>
  );
}
