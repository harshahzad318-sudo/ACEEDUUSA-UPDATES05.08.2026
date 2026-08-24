import { notFound } from "next/navigation";
import Link from "next/link";
import { SEO_BLOG_POSTS, getBlogPostBySlug } from "@/data/blogPostsCMS";
import { BLOG_POSTS } from "@/lib/data";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, HelpCircle, CheckCircle, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  const cmsSlugs = SEO_BLOG_POSTS.map((p) => ({ slug: p.slug }));
  const legacySlugs = BLOG_POSTS.map((p) => ({ slug: p.slug }));
  const allSlugs = [...cmsSlugs, ...legacySlugs];
  // Deduplicate slugs
  const uniqueSlugs = Array.from(new Set(allSlugs.map((item) => item.slug))).map((s) => ({ slug: s }));
  return uniqueSlugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsPost = getBlogPostBySlug(slug);
  if (cmsPost) {
    return {
      title: cmsPost.seoTitle,
      description: cmsPost.metaDescription,
      openGraph: {
        title: cmsPost.seoTitle,
        description: cmsPost.metaDescription,
        type: "article",
        images: [{ url: cmsPost.heroImage.url, alt: cmsPost.heroImage.alt }],
      },
    };
  }

  const legacyPost = BLOG_POSTS.find((p) => p.slug === slug);
  if (legacyPost) {
    return {
      title: legacyPost.title,
      description: legacyPost.excerpt,
    };
  }

  return {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cmsPost = getBlogPostBySlug(slug);

  if (cmsPost) {
    // Construct Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": cmsPost.h1,
      "description": cmsPost.metaDescription,
      "datePublished": cmsPost.publishedDate,
      "author": {
        "@type": "Organization",
        "name": cmsPost.author,
      },
      "publisher": {
        "@type": "Organization",
        "name": "ACE Education USA",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aceeducationusa.com/logo.png",
        },
      },
      "image": cmsPost.heroImage.url,
    };

    // Construct FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": cmsPost.faq.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      })),
    };

    return (
      <>
        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Hero Section */}
        <section className="bg-navy py-16 md:py-20 text-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-sm text-white/60 mb-6 flex items-center gap-2 flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gold font-medium">{cmsPost.category}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-white/70 mb-4">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-gold font-semibold">
                <Tag className="w-3.5 h-3.5" /> {cmsPost.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" /> {cmsPost.publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gold" /> {cmsPost.author}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mt-2">
              {cmsPost.h1}
            </h1>
          </div>
        </section>

        {/* Hero Image */}
        <section className="bg-bg-light pt-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img
                src={cmsPost.heroImage.url}
                alt={cmsPost.heroImage.alt}
                className="w-full h-[320px] sm:h-[420px] object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Main Article Content */}
        <article className="py-16 bg-white text-gray-800">
          <div className="max-w-4xl mx-auto px-6 space-y-10">
            {/* Introduction */}
            <div className="bg-amber-50/50 border-l-4 border-gold p-6 rounded-r-xl">
              <p className="text-lg sm:text-xl text-gray-800 font-medium leading-relaxed">
                {cmsPost.introduction}
              </p>
            </div>

            {/* Body Sections */}
            {cmsPost.sections.map((section, idx) => (
              <div key={idx} className="space-y-6 pt-4 border-t border-gray-100 first:border-none first:pt-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight">
                  {section.h2}
                </h2>

                {section.paragraphs.map((pText, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed text-base sm:text-lg">
                    {pText}
                  </p>
                ))}

                {/* Comparison Table if present */}
                {section.table && (
                  <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left border-collapse text-sm sm:text-base">
                      <thead>
                        <tr className="bg-navy text-white">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-4 font-semibold border-b border-navy-light">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-4 text-gray-700 font-normal leading-normal">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sub-sections (H3) if present */}
                {section.h3s && section.h3s.map((h3Item, h3Idx) => (
                  <div key={h3Idx} className="ml-0 sm:ml-4 pl-4 border-l-2 border-navy/20 space-y-2 mt-4">
                    <h3 className="text-xl font-semibold text-navy">
                      {h3Item.h3}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {h3Item.text}
                    </p>
                  </div>
                ))}

                {/* Step-by-Step list if present */}
                {section.steps && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-6">
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-gold" /> Step-by-Step Guide:
                    </h4>
                    <ol className="space-y-3">
                      {section.steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-3 text-gray-700 leading-relaxed text-base">
                          <span className="flex-shrink-0 bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Bullet list if present */}
                {section.bullets && (
                  <ul className="space-y-2.5 my-4">
                    {section.bullets.map((bItem, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-gray-700 text-base">
                        <span className="text-gold font-bold text-lg">•</span>
                        <span>{bItem}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Internal Links Box */}
            <div className="bg-navy/5 border border-navy/15 rounded-2xl p-6 sm:p-8 mt-12">
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-gold" /> Recommended Next Steps & Related Resources:
              </h3>
              <ul className="space-y-3">
                {cmsPost.internalLinks.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-navy hover:text-gold font-semibold text-base transition-colors underline underline-offset-4"
                    >
                      <span>{link.text}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="pt-10 border-t border-gray-200 space-y-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-7 h-7 text-gold" />
                <h2 className="text-2xl sm:text-3xl font-bold text-navy">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {cmsPost.faq.map((fItem, fIdx) => (
                  <div key={fIdx} className="bg-slate-50 p-6 rounded-xl border border-slate-200/80">
                    <h3 className="font-bold text-navy text-lg mb-2">
                      {fItem.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {fItem.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tailored CTA Section */}
            <div className="bg-gradient-to-br from-navy to-navy-dark text-white p-8 sm:p-10 rounded-3xl shadow-xl mt-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {cmsPost.cta.headline}
                </h3>
                <p className="text-white/80 text-base leading-relaxed">
                  {cmsPost.cta.text}
                </p>
              </div>
              <Link
                href={cmsPost.cta.buttonUrl}
                className="bg-gold hover:bg-gold-dark text-navy font-extrabold px-8 py-4 rounded-xl text-base shadow-lg transition-all flex-shrink-0 flex items-center gap-2"
              >
                <span>{cmsPost.cta.buttonText}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Bottom Back / Nav */}
          <div className="max-w-4xl mx-auto px-6 mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>
            <Link
              href="/book-assessment"
              className="flex items-center gap-2 bg-navy text-white hover:bg-gold hover:text-navy font-bold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Book Free Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </>
    );
  }

  // Fallback for legacy blog posts
  const legacyPost = BLOG_POSTS.find((p) => p.slug === slug);
  if (!legacyPost) notFound();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-sm text-white/50 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/blog" className="hover:text-white">Blog</Link> / <span className="text-gold">{legacyPost.category}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/50 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {legacyPost.date}</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {legacyPost.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{legacyPost.title}</h1>
        </div>
      </section>

      {legacyPost.image && (
        <section className="bg-[#F8F9FC] pt-12">
          <div className="max-w-4xl mx-auto px-6">
            <img
              src={legacyPost.image}
              alt={legacyPost.title}
              className="w-full h-[400px] object-cover rounded-3xl shadow-lg border border-gray-100"
              loading="eager"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      )}

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 prose prose-lg prose-gray">
          <p className="text-xl text-gray-600 leading-relaxed font-medium">{legacyPost.excerpt}</p>
          <h2 className="text-2xl font-bold text-navy mt-8">Overview & Strategy</h2>
          <p className="text-gray-600 leading-relaxed mt-4">
            At ACE Education, we deliver tailored academic tutoring, test preparation, and homeschool support across all 50 states. Our personalized approach ensures that every student builds long-term confidence and academic mastery.
          </p>
          <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-bold text-navy text-lg">Ready to transform your child&apos;s academic journey?</h3>
            <p className="text-gray-600 mt-2">Book a free academic diagnostic assessment with our team today.</p>
            <div className="mt-4">
              <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-5 py-2.5 rounded-lg text-sm">
                Book Free Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
        </div>
      </section>
    </>
  );
}
