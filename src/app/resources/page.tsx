import Link from "next/link";
import { BookOpen, FileText, Video, Download, ArrowRight, Star, GraduationCap, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Resources & Support Materials | ACE Education USA",
  description: "Explore free high-quality study guides, practice tests, 50+ study tips, 50+ parent guides, and college enrolment strategies designed by ACE Education experts.",
};

export default function ResourcesPage() {
  const resourceCards = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Core Study Guides",
      desc: "Comprehensive academic study guides spanning core math, language arts, sciences, and languages.",
      count: "50+ Guides",
      href: "/subjects",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Practice Exams",
      desc: "Full-length mock tests for SAT, ACT, GED, IELTS, TOEFL, and key AP subject preparation.",
      count: "200+ Exams",
      href: "/exam-prep",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "50 Essential Study Tips",
      desc: "Practical focus techniques, active recall schedules, exam prep models, and concentration hacks.",
      count: "50 Study Tips",
      href: "/resources/study-tips",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "50 Essential Parent Guides",
      desc: "Actionable childhood development routines, IEP accommodations, and homeschooling guidelines.",
      count: "50 Parent Guides",
      href: "/resources/parent-guides",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "College Planning & Enrolment",
      desc: "Complete admissions trackers, FAFSA templates, personal statement structures, and placement help.",
      count: "Admissions Hub",
      href: "/resources/college-planning",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Educational Blog Articles",
      desc: "Expertly written long-form SEO articles addressing modern curriculum patterns and homeschooling laws.",
      count: "50+ Long-form Articles",
      href: "/blog",
    },
  ];

  return (
    <>
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-semibold text-gold uppercase tracking-widest font-mono">ACE Knowledge Center</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-3">Free Learning Resources</h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            A comprehensive, searchable suite of study guides, practice assessments, and expert planning guides to help your family thrive.
          </p>
        </div>
      </section>

      <section className="py-20 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCards.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="bg-white rounded-3xl p-8 card-hover border border-gray-100 hover:border-gold/20 flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="text-gold mb-4 flex justify-between items-start">
                    {r.icon}
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-gold transition-colors" />
                  </div>
                  <h2 className="text-xl font-bold text-navy group-hover:text-gold-dark transition-colors">{r.title}</h2>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{r.desc}</p>
                </div>
                <div className="text-xs font-bold text-gold mt-6 border-t border-gray-50 pt-4 uppercase tracking-widest font-mono">
                  {r.count}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-block bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-3xl">
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-mono">Still Need Assistance?</span>
              <h3 className="text-2xl font-extrabold text-navy mt-1">Get a Personal Educational Diagnosis</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xl mx-auto">
                Every child has a unique learning signature. Our complimentary academic assessment locates exact knowledge gaps and details an action roadmap.
              </p>
              <div className="mt-6">
                <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-gold/15">
                  Book Free Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
