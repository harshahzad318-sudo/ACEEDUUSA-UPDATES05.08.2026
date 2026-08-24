import Link from "next/link";
import { CheckCircle, ArrowRight, Star, Monitor, Home, Award, Sparkles, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparent Tuition Pricing | ACE Education USA",
  description: "Elite 1-on-1 tutoring rates. Online from $45/hr, in-home from $65/hr. High-saving monthly packages (10, 20, 40 hours per month) tailored for student success.",
};

export default function PricingPage() {
  const hourlyRates = [
    { grade: "Primary School", level: "Grades K-5", price: "from $45", desc: "Build academic fluency & confidence" },
    { grade: "Lower Secondary", level: "Grades 6-8", price: "from $55", desc: "Succeed in middle school core curricula" },
    { grade: "IGCSE or Equivalent", level: "High School Basics", price: "from $65", desc: "Excel in standard milestone assessments" },
    { grade: "A Level / College Level", level: "Grades 11-12 & Higher", price: "from $75", desc: "Master advanced calculus, physics & writing" },
    { grade: "SAT & Exam Prep", level: "SAT, ACT, AP, GED, TOEFL", price: "from $120", desc: "Raise scores with specialized trainers" },
    { grade: "Learning Support", level: "ADHD, Dyslexia, Orton-Gillingham", price: "from $120", desc: "Expert multisensory cognitive specialists" },
  ];

  const monthlyPackages = [
    {
      title: "Bronze Package",
      hours: "10 Hours / Month",
      frequency: "Approx. 2.5 hours/week",
      price: "from $382.50",
      desc: "Perfect for core homework help & consistent grade maintenance",
      features: [
        "10 Hours of elite 1-on-1 private lessons",
        "Save 15% vs hourly booking (Discount applied)",
        "Expert tutor matched to student profile",
        "Session records & whiteboard exports",
        "Monthly diagnostic updates & portal logs"
      ]
    },
    {
      title: "Silver Package",
      hours: "20 Hours / Month",
      frequency: "Approx. 5.0 hours/week",
      price: "from $765",
      desc: "Deep support designed to close learning gaps and accelerate grades",
      features: [
        "20 Hours of elite 1-on-1 private lessons",
        "Save 15% vs hourly booking (Discount applied)",
        "Dedicated primary tutor & backup match",
        "Interactive customized lesson mapping",
        "Weekly parent portal feedback updates",
        "Free diagnostic baseline exam"
      ],
      popular: true
    },
    {
      title: "Gold Package",
      hours: "40 Hours / Month",
      frequency: "Approx. 10.0 hours/week",
      price: "from $1,530",
      desc: "Ultimate acceleration, intensive exam prep, or daytime homeschool support",
      features: [
        "40 Hours of elite 1-on-1 private lessons",
        "Save 15% vs hourly booking (Discount applied)",
        "Full syllabus coverage & curriculum matching",
        "Priority scheduling & daytime slot locking",
        "Direct regional program coordinator support",
        "Complimentary portfolio compliance reviews"
      ]
    }
  ];

  return (
    <div className="bg-[#F8F9FC]">
      {/* Hero Header */}
      <section className="bg-[#0D2073] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,168,0,0.06),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-4">
          <span className="text-xs font-bold text-gold uppercase tracking-widest font-mono">TUITION METRICS</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Transparent, High-Value 1-on-1 Pricing
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            No registration fees, no hidden platform markups, and zero long-term lock-ins. Choose between flexible pay-as-you-go hourly sessions or highly popular monthly progress packages.
          </p>
        </div>
      </section>

      {/* Hourly Rates Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-gold uppercase tracking-widest font-mono">1-on-1 HOURLY RATES</span>
            <h2 className="text-3xl font-extrabold text-[#0D2073] mt-2">Rates Tailored to Subject & Grade Level</h2>
            <p className="text-gray-500 mt-3 text-sm">
              We structure our fees based on educational milestone complexity to ensure you match with the highest-fit subject specialist.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hourlyRates.map((r, i) => (
              <div key={i} className="bg-[#FAFBFD] rounded-3xl p-8 border border-gray-100 shadow-sm hover:border-gold/30 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-extrabold text-[#0D2073] text-lg">{r.grade}</h3>
                      <span className="text-xs font-bold text-gray-400 font-mono tracking-wider uppercase">{r.level}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-[#0D2073]">{r.price}</span>
                      <span className="text-xs text-gray-400 font-bold block">/hour</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mt-4 border-t border-gray-100 pt-4 italic">
                    &ldquo;{r.desc}&rdquo;
                  </p>
                </div>
                <div className="pt-6">
                  <Link href="/book-assessment" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-gold-dark hover:underline">
                    BOOK THIS LEVEL <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats Info */}
      <section className="py-16 bg-[#FAFBFD] border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-start gap-5">
              <div className="bg-gold/10 w-12 h-12 rounded-2xl flex items-center justify-center text-gold-dark shrink-0">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-[#0D2073] text-lg">Online Tutoring Format</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Join interactive, recorded HD video classes equipped with virtual collaborative whiteboards, digital worksheets, and real-time portal progress logging. Standard hourly rates apply.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex items-start gap-5">
              <div className="bg-gold/10 w-12 h-12 rounded-2xl flex items-center justify-center text-gold-dark shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-[#0D2073] text-lg">In-Home Tutoring Format</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Enjoy elite physical 1-on-1 lesson support in your home. Experienced local tutors handle physical study guides and material integration. Adds a standard <strong className="text-gold-dark">+$20/hour</strong> adjustment relative to online rates to cover localized travel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Packages (Detailed Hours Included!) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-gold uppercase tracking-widest font-mono">RECOMMENDED PACKAGES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2073] mt-2">Monthly Tutoring Progress Packages</h2>
            <p className="text-gray-500 mt-3 text-sm">
              Lock in premium savings and consistent hours of structured academic acceleration with our highly transparent monthly subscriptions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {monthlyPackages.map((pkg, i) => (
              <div
                key={i}
                className={`bg-white rounded-[2.5rem] p-8 md:p-10 border-2 shadow-sm relative flex flex-col justify-between ${
                  pkg.popular ? "border-gold ring-4 ring-gold/10" : "border-gray-100"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-[#0D2073] text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-[#0D2073] text-2xl">{pkg.title}</h3>
                    {pkg.popular && <Sparkles className="w-5 h-5 text-gold fill-current" />}
                  </div>
                  
                  {/* Hours badge */}
                  <div className="inline-flex items-center gap-1.5 bg-[#0D2073]/5 text-[#0D2073] font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider font-mono mb-6">
                    <Clock className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{pkg.hours}</span>
                  </div>

                  <p className="text-xs text-gray-400 font-semibold mb-6 block uppercase tracking-wider font-mono">{pkg.frequency}</p>
                  
                  <div className="mb-6 flex items-baseline border-b border-gray-100 pb-6">
                    <span className="text-4xl font-black text-[#0D2073]">{pkg.price}</span>
                    <span className="text-sm font-semibold text-gray-400 ml-1">/month</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-8 leading-relaxed italic">&ldquo;{pkg.desc}&rdquo;</p>

                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <Link
                    href="/book-assessment"
                    className={`block text-center text-xs font-black uppercase tracking-wider py-4.5 rounded-2xl transition-all ${
                      pkg.popular ? "bg-gold text-navy hover:bg-gold-dark shadow-lg shadow-gold/20" : "bg-[#0D2073] text-white hover:bg-[#1631A1]"
                    }`}
                  >
                    CHOOSE {pkg.title.toUpperCase()}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Discount Banner */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-[2.5rem] p-10 md:p-14 border border-gold/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-2xl" />
            <Star className="w-12 h-12 text-gold mx-auto mb-4" fill="#F5A800" />
            <h2 className="text-3xl font-extrabold text-[#0D2073]">Multi-Sibling Family Discount</h2>
            <p className="text-gray-600 mt-3 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Enroll 2 or more siblings simultaneously in any weekly or monthly package and receive a lifetime <span className="font-bold text-gold-dark text-xl">15% discount</span> on the entire tuition bill.
            </p>
            <div className="pt-8">
              <Link href="/book-assessment" className="inline-flex items-center gap-2 bg-[#0D2073] hover:bg-[#1631A1] text-white font-black text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md">
                BOOK FREE SIBLING ASSESSMENT <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
