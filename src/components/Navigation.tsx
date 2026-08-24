"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import Logo from "./Logo";
import { NAV_ITEMS } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const { user, dbUser, logout } = useAuth();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getNavKey = (label: string) => {
    switch (label.toLowerCase()) {
      case "academic tutoring": return "nav.academic_tutoring";
      case "test prep": return "nav.test_prep";
      case "learning support": return "nav.learning_support";
      case "resources": return "nav.resources";
      case "about": return "nav.about";
      case "contact": return "nav.contact";
      case "homeschool": return "nav.homeschool";
      case "blog": return "nav.blog";
      case "curriculum": return "nav.curriculum";
      case "home": return "nav.home";
      case "pricing": return "nav.pricing";
      default: return "";
    }
  };

  const getChildKey = (label: string) => {
    switch (label.toLowerCase()) {
      case "math": return "nav.math";
      case "english": return "nav.english";
      case "reading": return "nav.reading";
      case "writing": return "nav.writing";
      case "science": return "nav.science";
      case "french": return "nav.french";
      case "spanish": return "nav.spanish";
      case "chinese": return "nav.chinese";
      case "business": return "nav.business";
      case "accounting": return "nav.accounting";
      case "economics": return "nav.economics";
      case "sociology": return "nav.sociology";
      case "history": return "nav.history";
      case "geography": return "nav.geography";
      case "psychology": return "nav.psychology";
      case "law": return "nav.law";
      case "ict": return "nav.ict";
      case "computer science": return "nav.computer_science";
      case "sat prep": return "nav.sat_prep";
      case "act prep": return "nav.act_prep";
      case "ged prep": return "nav.ged_prep";
      case "ap prep": return "nav.ap_prep";
      case "ielts prep": return "nav.ielts_prep";
      case "toefl prep": return "nav.toefl_prep";
      case "adhd support": return "nav.adhd_support";
      case "dyslexia support": return "nav.dyslexia_support";
      case "study skills": return "nav.study_skills";
      case "homework help": return "nav.homework_help";
      case "parent guides": return "nav.parent_guides";
      case "study tips": return "nav.study_tips";
      case "college planning": return "nav.college_planning";
      case "blog": return "nav.blog";
      default: return "";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveMenu(null);
      setActiveMobileSubmenu(null);
      setMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-navy/5" : "bg-white shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="shrink-0">
            <Logo size="default" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.children ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                      setActiveMenu(activeMenu === item.label ? null : item.label);
                    }
                  }}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeMenu === item.label ? "text-navy bg-navy/5" : "text-gray-700 hover:text-navy hover:bg-navy/5"
                  }`}
                >
                  {getNavKey(item.label) ? t(getNavKey(item.label)) : item.label}
                  {item.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />}
                </Link>
                {item.children && activeMenu === item.label && item.label === "Academic Tutoring" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[840px]" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                    <div className="bg-white rounded-2xl shadow-2xl shadow-navy/10 border border-gray-100 p-8 grid grid-cols-4 gap-8">
                      {/* Column 1 & 2: Subjects Grid */}
                      <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                          <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3 font-mono">{t("nav.core_subjects")}</h4>
                          <div className="space-y-2">
                            {[
                              { label: "Math", href: "/subjects/math" },
                              { label: "English", href: "/subjects/english" },
                              { label: "Reading", href: "/subjects/reading" },
                              { label: "Writing", href: "/subjects/writing" },
                              { label: "Science", href: "/subjects/science" }
                            ].map((sub) => (
                              <Link key={sub.href} href={sub.href} className="block text-sm font-semibold text-navy hover:text-gold transition-colors">
                                {getChildKey(sub.label) ? t(getChildKey(sub.label)) : sub.label}
                              </Link>
                            ))}
                          </div>
                          
                          <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mt-5 mb-3 font-mono">{t("nav.languages")}</h4>
                          <div className="space-y-2">
                            {[
                              { label: "French", href: "/subjects/french" },
                              { label: "Spanish", href: "/subjects/spanish" },
                              { label: "Chinese", href: "/subjects/chinese" }
                            ].map((sub) => (
                              <Link key={sub.href} href={sub.href} className="block text-sm font-semibold text-navy hover:text-gold transition-colors">
                                {getChildKey(sub.label) ? t(getChildKey(sub.label)) : sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3 font-mono font-medium">{t("nav.social_tech")}</h4>
                          <div className="space-y-2">
                            {[
                              { label: "Business", href: "/subjects/business" },
                              { label: "Accounting", href: "/subjects/accounting" },
                              { label: "Economics", href: "/subjects/economics" },
                              { label: "Sociology", href: "/subjects/sociology" },
                              { label: "History", href: "/subjects/history" },
                              { label: "Geography", href: "/subjects/geography" },
                              { label: "Psychology", href: "/subjects/psychology" },
                              { label: "Law", href: "/subjects/law" },
                              { label: "ICT", href: "/subjects/ict" },
                              { label: "Computer Science", href: "/subjects/computer-science" }
                            ].map((sub) => (
                              <Link key={sub.href} href={sub.href} className="block text-sm font-semibold text-navy hover:text-gold transition-colors">
                                {getChildKey(sub.label) ? t(getChildKey(sub.label)) : sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Delivery */}
                      <div className="border-l border-gray-100 pl-8">
                        <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4 font-mono">{t("nav.delivery")}</h4>
                        <div className="space-y-4">
                          <Link href="/online-tutoring" className="group block">
                            <div className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{t("nav.online_sessions")}</div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t("nav.online_sessions_desc")}</p>
                          </Link>
                          <Link href="/home-tutoring" className="group block">
                            <div className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{t("nav.athome_sessions")}</div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t("nav.athome_sessions_desc")}</p>
                          </Link>
                        </div>
                      </div>

                      {/* Column 4: Call-To-Action card */}
                      <div className="bg-[#FAB22E] rounded-2xl p-6 flex flex-col justify-between text-navy">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-navy/60 font-mono">{t("nav.not_sure")}</span>
                          <h4 className="text-base font-extrabold text-navy mt-1.5 leading-snug">{t("nav.find_programme")}</h4>
                        </div>
                        <Link href="/book-assessment" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-navy mt-8 hover:opacity-85 group">
                          {t("nav.find_programme_btn")} <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {item.children && activeMenu === item.label && item.label === "Test Prep" && (
                  <div className="absolute top-full left-1/2 -translate-x-[60%] pt-2 z-50 w-[680px]" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                    <div className="bg-white rounded-2xl shadow-2xl shadow-navy/10 border border-gray-100 p-8 grid grid-cols-3 gap-8">
                      {/* Column 1: Test List */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3 font-mono">{t("nav.test_prep_heading")}</h4>
                        <div className="space-y-2">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} className="block text-sm font-semibold text-navy hover:text-gold transition-colors">
                              {getChildKey(child.label) ? t(getChildKey(child.label)) : child.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Delivery */}
                      <div className="border-l border-gray-100 pl-8">
                        <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4 font-mono">{t("nav.delivery")}</h4>
                        <div className="space-y-4">
                          <Link href="/online-tutoring" className="group block">
                            <div className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{t("nav.online_sessions")}</div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t("nav.online_sessions_desc")}</p>
                          </Link>
                          <Link href="/home-tutoring" className="group block">
                            <div className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{t("nav.athome_sessions")}</div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t("nav.athome_sessions_desc")}</p>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Call-To-Action card */}
                      <div className="bg-[#FAB22E] rounded-2xl p-6 flex flex-col justify-between text-navy">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-navy/60 font-mono">{t("nav.not_sure")}</span>
                          <h4 className="text-base font-extrabold text-navy mt-1.5 leading-snug">{t("nav.find_right_test")}</h4>
                        </div>
                        <Link href="/book-assessment" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-navy mt-8 hover:opacity-85 group">
                          {t("nav.find_programme_btn")} <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {item.children && activeMenu === item.label && item.label === "Learning Support" && (
                  <div className="absolute top-full left-1/2 -translate-x-[60%] pt-2 z-50 w-[680px]" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                    <div className="bg-white rounded-2xl shadow-2xl shadow-navy/10 border border-gray-100 p-8 grid grid-cols-3 gap-8">
                      {/* Column 1: Areas List */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3 font-mono">{t("nav.support_areas")}</h4>
                        <div className="space-y-2">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} className="block text-sm font-semibold text-navy hover:text-gold transition-colors">
                              {getChildKey(child.label) ? t(getChildKey(child.label)) : child.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Column 2: Delivery */}
                      <div className="border-l border-gray-100 pl-8">
                        <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4 font-mono">{t("nav.delivery")}</h4>
                        <div className="space-y-4">
                          <Link href="/online-tutoring" className="group block">
                            <div className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{t("nav.online_sessions")}</div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t("nav.online_sessions_desc")}</p>
                          </Link>
                          <Link href="/home-tutoring" className="group block">
                            <div className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{t("nav.athome_sessions")}</div>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{t("nav.athome_sessions_desc")}</p>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Call-To-Action card */}
                      <div className="bg-[#FAB22E] rounded-2xl p-6 flex flex-col justify-between text-navy">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-navy/60 font-mono">{t("nav.not_sure")}</span>
                          <h4 className="text-base font-extrabold text-navy mt-1.5 leading-snug">{t("nav.find_right_specialist")}</h4>
                        </div>
                        <Link href="/book-assessment" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-navy mt-8 hover:opacity-85 group">
                          {t("nav.find_programme_btn")} <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {item.children && activeMenu === item.label && item.label !== "Academic Tutoring" && item.label !== "Test Prep" && item.label !== "Learning Support" && (
                  <div className="absolute top-full left-0 pt-2 z-50" onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                    <div className="bg-white rounded-2xl shadow-2xl shadow-navy/10 border border-gray-100 p-4 min-w-[280px] grid gap-1">
                      {item.children.map((child) => {
                        const childKey = getChildKey(child.label);
                        return (
                          <Link key={child.href} href={child.href} className="flex flex-col px-4 py-3 rounded-xl hover:bg-bg-light transition-colors group">
                            <span className="text-sm font-semibold text-navy group-hover:text-gold-dark transition-colors">
                              {childKey ? t(childKey) : child.label}
                            </span>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {childKey ? t(childKey + "_desc") : child.desc}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/book-assessment" className="bg-gold hover:bg-gold-dark text-navy font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-gold/25">
              {t("header.book")}
            </Link>
            {user && (
              <button 
                onClick={() => logout()} 
                className="flex items-center gap-1.5 border border-gray-200 hover:border-red-200 hover:text-red-600 text-gray-600 font-medium px-4 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
                title={t("header.signout")}
              >
                <LogOut className="w-4 h-4" />
                {t("header.signout")}
              </button>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-navy" aria-label="Toggle menu" type="button">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-b border-gray-100 overflow-y-auto max-h-[85vh]">
          <div className="px-4 py-4 space-y-1">
            {/* Added Mobile Language Selector at the top of menu for premium UX */}
            <div className="px-4 pb-4 mb-2 border-b border-gray-100">
              <LanguageSwitcher variant="mobile" />
            </div>

            {NAV_ITEMS.map((item) => {
              const hasChildren = !!item.children;
              const isSubmenuOpen = activeMobileSubmenu === item.label;
              const itemKey = getNavKey(item.label);
              return (
                <div key={item.label} className="border-b border-gray-50 pb-1">
                  <div className="flex items-center justify-between">
                    <Link 
                      href={hasChildren ? "#" : item.href} 
                      onClick={(e) => {
                        if (hasChildren) {
                          e.preventDefault();
                          setActiveMobileSubmenu(isSubmenuOpen ? null : item.label);
                        } else {
                          setMobileOpen(false);
                        }
                      }} 
                      className="flex-grow px-4 py-3 text-sm font-semibold text-gray-700 hover:text-navy hover:bg-bg-light rounded-xl transition-all"
                    >
                      {itemKey ? t(itemKey) : item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveMobileSubmenu(isSubmenuOpen ? null : item.label);
                        }}
                        className="p-3 text-gray-400 hover:text-navy cursor-pointer"
                        aria-label="Toggle submenu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubmenuOpen ? "rotate-180 text-gold" : ""}`} />
                      </button>
                    )}
                  </div>
                  {hasChildren && isSubmenuOpen && (
                    <div className={`pl-4 pr-3 pb-2 bg-bg-light/40 rounded-xl mt-1 py-2 ${item.label === "Academic Tutoring" ? "grid grid-cols-2 gap-1.5" : "space-y-0.5"}`}>
                      {item.children.map((child) => {
                        const childKey = getChildKey(child.label);
                        return (
                          <Link 
                            key={child.href} 
                            href={child.href} 
                            onClick={() => {
                              setMobileOpen(false);
                              setActiveMobileSubmenu(null);
                            }} 
                            className="block px-3 py-2 text-xs text-gray-600 hover:text-navy hover:bg-bg-light rounded-lg font-medium transition-colors"
                          >
                            {childKey ? t(childKey) : child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              {user ? (
                <div className="px-4 py-3 bg-bg-light rounded-xl border border-gray-100 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <UserIcon className="w-4 h-4 text-navy" />
                    <span className="text-xs font-bold text-navy truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Link 
                      href={dbUser?.role ? `/portals/${dbUser.role}` : "/portals/student"} 
                      onClick={() => setMobileOpen(false)}
                      className="text-xs text-gold hover:underline font-bold capitalize"
                    >
                      {dbUser?.role ? t("header.portal") : "Student"} Portal &rarr;
                    </Link>
                    <button 
                      type="button"
                      onClick={() => { logout(); setMobileOpen(false); }} 
                      className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> {t("header.signout")}
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center border-2 border-navy text-navy font-semibold px-5 py-3 rounded-xl hover:bg-navy/5 mb-2 text-xs"
                >
                  {t("header.signin_portal")}
                </Link>
              )}
              <Link href="/book-assessment" onClick={() => setMobileOpen(false)} className="block w-full text-center bg-gold text-navy font-semibold px-5 py-3 rounded-xl text-xs">
                {t("header.book_free")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
