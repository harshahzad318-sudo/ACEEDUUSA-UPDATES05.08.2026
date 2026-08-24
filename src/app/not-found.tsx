import Link from "next/link";
import { ArrowLeft, BookOpen, GraduationCap, Home, Calendar } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | ACE Education USA",
  description: "The page you are looking for does not exist or has been moved. Explore our 1-on-1 tutoring, test prep, and educational resources.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-bg-light flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full text-center bg-white rounded-3xl p-10 border border-gray-100 shadow-xl">
        <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10" />
        </div>
        <span className="text-xs font-mono font-bold text-navy/40 uppercase tracking-widest">Error 404</span>
        <h1 className="text-3xl font-extrabold text-navy mt-2">Page Not Found</h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          The academic resource or page you requested could not be found. It may have been relocated or updated.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 text-left">
          <Link
            href="/"
            className="p-4 rounded-2xl bg-gray-50 hover:bg-navy/5 border border-gray-100 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 bg-navy text-gold rounded-xl shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy group-hover:text-gold transition-colors">Home</div>
              <div className="text-[10px] text-gray-500">Back to main page</div>
            </div>
          </Link>

          <Link
            href="/blog"
            className="p-4 rounded-2xl bg-gray-50 hover:bg-navy/5 border border-gray-100 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 bg-navy text-gold rounded-xl shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy group-hover:text-gold transition-colors">Blog</div>
              <div className="text-[10px] text-gray-500">Guides & resources</div>
            </div>
          </Link>

          <Link
            href="/tutors"
            className="p-4 rounded-2xl bg-gray-50 hover:bg-navy/5 border border-gray-100 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 bg-navy text-gold rounded-xl shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy group-hover:text-gold transition-colors">Find Tutors</div>
              <div className="text-[10px] text-gray-500">Expert 1-on-1 tutors</div>
            </div>
          </Link>

          <Link
            href="/book-assessment"
            className="p-4 rounded-2xl bg-gray-50 hover:bg-navy/5 border border-gray-100 transition-all flex items-center gap-3 group"
          >
            <div className="p-2 bg-navy text-gold rounded-xl shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy group-hover:text-gold transition-colors">Assessment</div>
              <div className="text-[10px] text-gray-500">Free consultation</div>
            </div>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to ACE Education USA Home
          </Link>
        </div>
      </div>
    </div>
  );
}
