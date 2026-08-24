"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "minimal" | "mobile";
}

export default function LanguageSwitcher({ variant = "minimal" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "ar", label: "العربية", flag: "🇧🇭" },
    { code: "ms", label: "Melayu", flag: "🇲🇾" },
  ] as const;

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "mobile") {
    return (
      <div className="w-full bg-bg-light rounded-xl p-3 border border-gray-100">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-navy/60 font-mono mb-2 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-navy" /> Manually Select Language
        </label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg border transition-all text-xs font-semibold ${
                language === lang.code
                  ? "bg-gold border-gold text-navy shadow-sm"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-lg mb-0.5" role="img" aria-label={lang.label}>
                {lang.flag}
              </span>
              <span className="text-[10px] uppercase">{lang.code}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-2 py-1 rounded transition-all text-[11px] sm:text-xs cursor-pointer focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
        id="language-switcher-btn"
      >
        <Globe className="w-3.5 h-3.5 text-gold" />
        <span className="uppercase text-[10px] sm:text-[11px] font-mono tracking-wider">
          {currentLangObj.flag} {currentLangObj.code}
        </span>
        <ChevronDown className="w-3 h-3 text-white/60" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-36 rounded-xl bg-white text-navy shadow-xl ring-1 ring-black/5 divide-y divide-gray-100 overflow-hidden transform origin-top-right transition-all duration-200 z-50"
          id="language-switcher-menu"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2 text-xs font-medium transition-colors hover:bg-bg-light ${
                  language === lang.code ? "text-gold-dark bg-bg-light/60 font-bold" : "text-gray-700"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm" role="img" aria-label={lang.label}>
                    {lang.flag}
                  </span>
                  <span>{lang.label}</span>
                </span>
                {language === lang.code && <Check className="w-3.5 h-3.5 text-gold-dark" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
