import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { BookOpen, Search, Sparkles, ShieldCheck, Heart, Milestone, Users, BookMarked, ArrowLeft } from "lucide-react";
import StudyTipsClient from "./StudyTipsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Tips & Academic Excellence Guides | ACE Education USA",
  description: "Explore 50+ research-backed study tips, executive functioning hacks, and concentration strategies designed to boost grades.",
};

export default function StudyTipsPage() {
  // Get all study tips and exam prep articles
  const studyBlogPosts = BLOG_POSTS.filter(
    (post) =>
      post.category === "Study Tips" ||
      post.category === "Exam Prep" ||
      post.category === "Math Tutoring" ||
      post.category === "English & Writing"
  );

  return (
    <>
      <section className="bg-navy py-16 md:py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-4">
            <Link href="/resources" className="text-xs text-gold hover:underline flex items-center gap-1.5 uppercase tracking-widest font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
            </Link>
          </div>
          <span className="text-xs font-semibold text-gold uppercase tracking-widest font-mono">Student Excellence Center</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight max-w-3xl">
            Study Tips &amp; Learning Strategies
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl text-base md:text-lg">
            Evidence-based focus methods, exam-taking drills, and memory recall hacks designed by top tutors to help students achieve straight A&apos;s.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: The 50 Interactive Guides database */}
            <div className="lg:col-span-2">
              <StudyTipsClient />
            </div>

            {/* Right Col: Parent blog posts and articles */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-navy text-lg mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
                  <BookMarked className="text-gold w-5 h-5" />
                  Expert Articles for Students
                </h3>
                <div className="space-y-4">
                  {studyBlogPosts.slice(0, 10).map((post, index) => (
                    <Link
                      key={index}
                      href={`/blog/${post.slug}`}
                      className="group block p-3 rounded-xl hover:bg-bg-light transition-all border border-transparent hover:border-gold/10"
                    >
                      <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{post.category}</span>
                      <h4 className="font-semibold text-sm text-navy mt-1 group-hover:text-gold-dark transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                  <Link href="/blog" className="text-xs font-bold text-navy hover:text-gold uppercase tracking-wider">
                    View All 50+ Articles &rarr;
                  </Link>
                </div>
              </div>

              {/* Mentorship CTA banner */}
              <div className="bg-gradient-to-br from-[#0D2073] to-[#1A3BB0] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <Sparkles className="w-48 h-48" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold font-mono">Personal Mentorship</span>
                <h4 className="text-xl font-extrabold mt-2 leading-snug">Unlock your highest academic potential</h4>
                <p className="text-xs text-white/75 mt-2 leading-relaxed">
                  Our customized 1-on-1 tutoring sessions target exactly where you struggle, filling foundational gaps and building executive study habits.
                </p>
                <div className="mt-6">
                  <Link
                    href="/book-assessment"
                    className="inline-block w-full text-center bg-gold hover:bg-gold-dark text-navy font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-gold/15"
                  >
                    Get 1-on-1 Tutoring Help
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
