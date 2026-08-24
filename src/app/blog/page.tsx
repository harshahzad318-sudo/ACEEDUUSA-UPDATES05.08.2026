import { BLOG_POSTS } from "@/lib/data";
import BlogList from "@/components/blog/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Educational Resources | ACE Education USA",
  description: "Explore 50+ SEO articles, parent guides, Digital SAT prep tips, ADHD executive functioning strategies, and US homeschooling insights from experts.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-navy py-20 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest font-mono">Knowledge Center</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Articles & Resources</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">Expert insights, study tips, and comprehensive support strategies for American families.</p>
        </div>
      </section>
      <section className="py-6 bg-bg-light pb-24">
        <BlogList posts={BLOG_POSTS} />
      </section>
    </>
  );
}
