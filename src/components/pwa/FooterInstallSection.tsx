"use client";

import { useEffect, useState } from "react";
import { Download, Smartphone, Monitor, Apple, CheckCircle2, Info, ChevronRight, Share, PlusSquare, Sparkles } from "lucide-react";

export default function FooterInstallSection() {
  const [detectedOS, setDetectedOS] = useState<"ios" | "android" | "windows" | "mac" | "chromeos" | "other">(() => {
    if (typeof window === "undefined") return "other";
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    if (/Win/i.test(ua)) return "windows";
    if (/Mac/i.test(ua)) return "mac";
    if (/CrOS/i.test(ua)) return "chromeos";
    return "other";
  });
  const [canInstall, setCanInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!(window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone);
  });
  const [installSuccess, setInstallSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"detect" | "ios" | "android" | "desktop">(() => {
    if (typeof window === "undefined") return "detect";
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    if (/Win|Mac|CrOS/i.test(ua)) return "desktop";
    return "detect";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check window.deferredPwaPrompt periodically
      const checkPrompt = () => {
        if (window.deferredPwaPrompt) {
          setCanInstall(true);
        }
      };
      checkPrompt();
      const interval = setInterval(checkPrompt, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleInstallClick = async () => {
    if (window.deferredPwaPrompt) {
      await window.deferredPwaPrompt.prompt();
      const choice = await window.deferredPwaPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstallSuccess(true);
        setIsStandalone(true);
      }
      window.deferredPwaPrompt = null;
      setCanInstall(false);
    }
  };

  return (
    <div className="bg-[#0E2342] border-t border-b border-gold/20 py-10 px-6 my-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Headline & Branding */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unified Cross-Platform App</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Install <span className="text-gold">ACE Education USA</span> App
            </h3>
            <p className="text-gray-300 text-sm mt-2 leading-relaxed">
              Install ACE Education directly onto your iPhone, iPad, Android, Mac, or Windows PC. Enjoy instant portal access, offline schedules, biometric security, and push notifications.
            </p>

            {/* Device Support Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mt-5 text-xs font-medium">
              <span className="text-gold font-bold uppercase tracking-wider text-xs mr-1 flex items-center gap-1">
                Available for:
              </span>
              <span className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-gold/40 text-white rounded-lg flex items-center gap-1.5 font-semibold transition-colors shadow-sm">
                <Apple className="w-4 h-4 text-gold" /> <span className="text-white">iPhone &amp; iPad</span>
              </span>
              <span className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-gold/40 text-white rounded-lg flex items-center gap-1.5 font-semibold transition-colors shadow-sm">
                <Smartphone className="w-4 h-4 text-emerald-400" /> <span className="text-white">Android</span>
              </span>
              <span className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-gold/40 text-white rounded-lg flex items-center gap-1.5 font-semibold transition-colors shadow-sm">
                <Monitor className="w-4 h-4 text-sky-400" /> <span className="text-white">Windows &amp; Mac</span>
              </span>
              <span className="px-3 py-1.5 bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold rounded-lg flex items-center gap-1.5 font-bold transition-colors shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold" /> <span>Web PWA</span>
              </span>
            </div>
          </div>

          {/* Dynamic OS Action Box */}
          <div className="w-full lg:w-auto bg-[#0A192F] p-6 rounded-2xl border border-gold/30 shadow-xl min-w-[320px]">
            {isStandalone || installSuccess ? (
              <div className="text-center py-2 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">App Installed & Ready!</h4>
                <p className="text-xs text-gray-300">
                  ACE Education USA is running in standalone native mode on your device.
                </p>
              </div>
            ) : canInstall ? (
              <div className="space-y-4 text-center">
                <div className="inline-block p-3 rounded-full bg-gold/10 text-gold mb-1">
                  <Download className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">
                    One-Click Install Ready ({detectedOS.toUpperCase()})
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Click below to install ACE Education directly onto your device home screen.
                  </p>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 px-6 bg-gold hover:bg-gold-dark text-slate-900 font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Install ACE Education App Now
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider">
                    Installation Guide
                  </span>
                  <span className="text-xs text-gray-400 capitalize">Device: {detectedOS}</span>
                </div>

                {/* Tabs */}
                <div className="flex bg-white/5 p-1 rounded-lg gap-1">
                  <button
                    onClick={() => setActiveTab("ios")}
                    className={`flex-1 text-xs py-1.5 rounded-md font-semibold transition-colors ${
                      activeTab === "ios" ? "bg-gold text-slate-900" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    iPhone / iPad
                  </button>
                  <button
                    onClick={() => setActiveTab("android")}
                    className={`flex-1 text-xs py-1.5 rounded-md font-semibold transition-colors ${
                      activeTab === "android" ? "bg-gold text-slate-900" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Android
                  </button>
                  <button
                    onClick={() => setActiveTab("desktop")}
                    className={`flex-1 text-xs py-1.5 rounded-md font-semibold transition-colors ${
                      activeTab === "desktop" ? "bg-gold text-slate-900" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Desktop
                  </button>
                </div>

                {/* Tab Instructions */}
                {activeTab === "ios" && (
                  <div className="space-y-2 text-xs text-gray-200 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <p>Open this page in <strong className="text-white">Safari</strong> on your iPhone or iPad.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <p className="flex items-center gap-1">Tap the <Share className="w-3.5 h-3.5 text-blue-400 inline" /> <strong>Share</strong> icon in the bottom menu bar.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                      <p className="flex items-center gap-1">Scroll down and tap <PlusSquare className="w-3.5 h-3.5 text-gold inline" /> <strong>Add to Home Screen</strong>.</p>
                    </div>
                  </div>
                )}

                {activeTab === "android" && (
                  <div className="space-y-2 text-xs text-gray-200 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <p>Open this page in <strong className="text-white">Chrome</strong> on your Android phone.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <p>Tap the <strong>⋮ Menu</strong> icon in the top right corner.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                      <p>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</p>
                    </div>
                  </div>
                )}

                {activeTab === "desktop" && (
                  <div className="space-y-2 text-xs text-gray-200 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                      <p>Use Google Chrome or Microsoft Edge on Windows, Mac, or Chromebook.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                      <p>Click the <Download className="w-3.5 h-3.5 text-amber-400 inline" /> <strong>Install</strong> icon in the URL bar address box.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
