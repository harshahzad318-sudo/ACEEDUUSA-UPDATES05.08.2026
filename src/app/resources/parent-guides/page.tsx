import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { BookOpen, Search, Sparkles, ShieldCheck, Heart, Milestone, Users, BookMarked, ArrowLeft } from "lucide-react";
import ParentGuidesClient from "./ParentGuidesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Guides & Educational Support | ACE Education USA",
  description: "Access 50+ expert-written parent guides, childhood development milestones, and academic support strategies for American families.",
};

export default function ParentGuidesPage() {
  // Get all blog posts categorized as "Parent Guide" or "Dyslexia Support" / "ADHD Support" / "Homeschooling" which are highly parent-relevant
  const parentBlogPosts = BLOG_POSTS.filter(
    (post) =>
      post.category === "Parent Guide" ||
      post.category === "Dyslexia Support" ||
      post.category === "ADHD Support" ||
      post.category === "Homeschooling"
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
          <span className="text-xs font-semibold text-gold uppercase tracking-widest font-mono">Parent Resource Hub</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3 leading-tight max-w-3xl">
            Parent Guides &amp; Family Support
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl text-base md:text-lg">
            Empowering parents with research-backed tactics, developmental milestones, and clear academic advice to guide your child&apos;s learning journey.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col: The 50 Interactive Guides database */}
            <div className="lg:col-span-2">
              <ParentGuidesClient />
            </div>

            {/* Right Col: Parent blog posts and articles */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-navy text-lg mb-4 flex items-center gap-2 border-b border-gray-50 pb-3">
                  <BookMarked className="text-gold w-5 h-5" />
                  Detailed Articles for Parents
                </h3>
                <div className="space-y-4">
                  {parentBlogPosts.slice(0, 10).map((post, index) => (
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

              {/* Consultation CTA banner */}
              <div className="bg-gradient-to-br from-[#0D2073] to-[#1A3BB0] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <Users className="w-48 h-48" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold font-mono">Expert Consultation</span>
                <h4 className="text-xl font-extrabold mt-2 leading-snug">Need tailored support for your family?</h4>
                <p className="text-xs text-white/75 mt-2 leading-relaxed">
                  Our professional educational consultants are available to analyze your child&apos;s learning profile and recommend ideal custom curriculum fits.
                </p>
                <div className="mt-6">
                  <Link
                    href="/book-assessment"
                    className="inline-block w-full text-center bg-gold hover:bg-gold-dark text-navy font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-gold/15"
                  >
                    Schedule Assessment
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
