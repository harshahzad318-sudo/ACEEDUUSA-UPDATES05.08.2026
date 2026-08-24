"use client";
import { Phone, Mail, Send, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopHeader() {
  const { user, dbUser } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="relative z-[60] bg-navy text-white text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between py-2 md:py-0 md:h-10 gap-2 md:gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="tel:+13322936270" className="flex items-center gap-1 hover:text-gold transition-colors">
            <Phone className="w-3 h-3 text-gold" /> <span className="hidden sm:inline">+1 (332) 293-6270</span><span className="sm:hidden">{t("header.call")}</span>
          </a>
          <a href="https://t.me/ACEeducationUSA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gold transition-colors">
            <Send className="w-3 h-3 text-gold" /> {t("header.telegram")}
          </a>
          <a href="mailto:info@aceeducation.us" className="hidden sm:flex items-center gap-1 hover:text-gold transition-colors">
            <Mail className="w-3 h-3 text-gold" /> info@aceeducation.us
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="/portals/student" className="flex items-center gap-1 hover:text-gold transition-colors font-medium">
            <ExternalLink className="w-2.5 h-2.5" /> {t("header.student")}
          </a>
          <a href="/portals/parent" className="flex items-center gap-1 hover:text-gold transition-colors font-medium">
            <ExternalLink className="w-2.5 h-2.5" /> {t("header.parent")}
          </a>
          <a href="/portals/tutor" className="flex items-center gap-1 hover:text-gold transition-colors font-medium">
            <ExternalLink className="w-2.5 h-2.5" /> {t("header.tutor")}
          </a>
          
          {user ? (
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-2">
              <span className="text-[10px] text-gray-300 font-medium hidden sm:inline">{t("header.hello")} <span className="text-gold font-bold uppercase">{dbUser?.role || "User"}</span></span>
              <a href={dbUser?.role ? `/portals/${dbUser.role}` : "/portals/student"} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-1.5 py-0.5 rounded transition-all text-[9px] sm:text-[10px]">
                {t("header.portal")}
              </a>
            </div>
          ) : (
            <a href="/login" className="bg-gold text-navy font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded hover:bg-gold-light transition-colors text-[10px] sm:text-xs">
              {t("header.login")}
            </a>
          )}

          <div className="flex items-center gap-2 ml-2 border-l border-white/20 pl-3">
            <LanguageSwitcher variant="minimal" />
            <div className="h-4 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>
            <a href="https://www.facebook.com/ACEeducationkl/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Facebook">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/ace.educationkl/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="Instagram">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://my.linkedin.com/company/ace-education-malaysia" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" aria-label="LinkedIn">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
