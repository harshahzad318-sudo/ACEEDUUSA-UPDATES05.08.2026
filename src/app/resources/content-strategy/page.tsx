import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { CONTENT_STRATEGY_CLUSTERS, getFlattenedTopicsList } from "@/data/contentStrategyClusters";
import { BookOpen, Layers, Search, Sparkles, TrendingUp, CheckCircle, ArrowRight, ShieldCheck, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "ACE Education USA Content Authority & SEO Strategy | 150 High-Value Clusters",
  description: "Explore ACE Education USA's comprehensive 150-topic SEO content roadmap. Topical clusters covering Digital SAT/ACT, AP/IB, K-12 STEM, Homeschooling, and College Admissions.",
  alternates: {
    canonical: "https://aceeducation.us/resources/content-strategy",
  },
  openGraph: {
    title: "ACE Education USA Content Authority Roadmap",
    description: "150 High-Value SEO Article Topics grouped into topical clusters for academic excellence.",
    url: "https://aceeducation.us/resources/content-strategy",
    images: ["/api/og?title=Content+Authority+%26+SEO+Strategy&category=150+Topic+Clusters"],
  },
};

export default function ContentStrategyPage() {
  const allTopics = getFlattenedTopicsList();
  const totalClusters = CONTENT_STRATEGY_CLUSTERS.length;
  const totalTopics = allTopics.length;

  return (
    <div className="bg-bg-light min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-navy transition-colors">Resources</Link>
          <span>/</span>
          <span className="text-navy font-bold">Content Authority Strategy</span>
        </div>

        {/* Hero Header */}
        <div className="bg-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Phase 13 Content Authority Strategy
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Topical Authority Roadmap: <span className="text-gradient">150 High-Value SEO Clusters</span>
            </h1>
            <p className="text-white/80 mt-4 text-base md:text-lg leading-relaxed">
              ACE Education USA maintains topical domain authority by deploying rigorous, search-intent driven content clusters across test prep, high school STEM, K-8 literacy, homeschooling, and selective college admissions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-black text-gold">{totalTopics}+</div>
                <div className="text-xs text-white/70">Strategic SEO Topics</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gold">{totalClusters}</div>
                <div className="text-xs text-white/70">Topical Clusters</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gold">100%</div>
                <div className="text-xs text-white/70">E-E-A-T Verified</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gold">50 States</div>
                <div className="text-xs text-white/70">US Academic Standards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cluster Tabs Overview */}
        <div className="space-y-12">
          {CONTENT_STRATEGY_CLUSTERS.map((cluster, cIdx) => (
            <div key={cluster.id} id={cluster.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-gold/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider mb-1">
                    <Layers className="w-4 h-4 text-gold" /> Cluster #{cIdx + 1}: {cluster.category}
                  </div>
                  <h2 className="text-2xl font-black text-navy">{cluster.clusterName}</h2>
                  <p className="text-xs text-gray-500 mt-1 max-w-3xl">{cluster.description}</p>
                </div>

                <div className="shrink-0 bg-navy/5 p-4 rounded-2xl border border-navy/10 text-right">
                  <div className="text-xs text-gray-500">Pillar Article Strategy:</div>
                  <div className="text-xs font-bold text-navy mt-0.5 line-clamp-1">{cluster.pillarArticleTitle}</div>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {cluster.topics.map((topic) => (
                  <div key={topic.id} className="p-5 bg-bg-light rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-gold/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-navy text-gold">
                          {topic.searchIntent}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                          <TrendingUp className="w-3 h-3 text-emerald-600" /> {topic.estimatedVolume}
                          <span className="text-gray-300">|</span>
                          <span className="font-semibold text-navy">Diff: {topic.difficulty}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-navy leading-snug">{topic.title}</h3>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{topic.summary}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500 font-mono">KW: &quot;{topic.targetKeyword}&quot;</span>
                      <span className="text-navy font-bold">{topic.targetAudience}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Content Authority CTA */}
        <div className="mt-16 bg-navy text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <ShieldCheck className="w-12 h-12 text-gold mx-auto" />
            <h2 className="text-2xl md:text-3xl font-extrabold">Need Custom Educational Content or Private Tutoring?</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Our academic directors write, review, and continuously update curriculum resources to ensure 100% alignment with current College Board, ACT, and US state educational guidelines.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link href="/book-assessment" className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm flex items-center gap-2">
                Schedule Diagnostic Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blog" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all text-sm">
                Browse Live Academic Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
