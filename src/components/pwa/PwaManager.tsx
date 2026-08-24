"use client";

import { useEffect, useState } from "react";
import { WifiOff, Download, CheckCircle2, Bell, ShieldCheck, X } from "lucide-react";

export interface PwaInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    deferredPwaPrompt?: PwaInstallPromptEvent | null;
  }
}

export default function PwaManager() {
  const [isOffline, setIsOffline] = useState(() => {
    if (typeof window === "undefined") return false;
    return !navigator.onLine;
  });
  const [deferredPrompt, setDeferredPrompt] = useState<PwaInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!(window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone);
  });
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return "default";
    return Notification.permission;
  });

  useEffect(() => {
    // 1. Service Worker Registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[PWA] Service Worker registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    }

    // 2. Offline / Online Event Listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== "undefined") {
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    // 3. Before Install Prompt Intercept
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const pwaEvent = e as PwaInstallPromptEvent;
      window.deferredPwaPrompt = pwaEvent;
      setDeferredPrompt(pwaEvent);

      // Check if user has already dismissed or installed
      const dismissed = localStorage.getItem("ace_pwa_banner_dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 4. App Installed Listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      window.deferredPwaPrompt = null;
      console.log("[PWA] ACE Education App successfully installed!");
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      window.deferredPwaPrompt = null;
      setShowInstallBanner(false);
    }
  };

  const requestNotifications = async () => {
    if ("Notification" in window) {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === "granted" && "serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification("ACE Education USA", {
          body: "Push Notifications activated! You will receive lesson reminders & updates.",
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-72x72.png",
        });
      }
    }
  };

  return (
    <>
      {/* Offline Toast Alert */}
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white px-4 py-2 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg animate-pulse">
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Offline Mode Active — You are viewing cached ACE Education data. Changes will sync when online.</span>
        </div>
      )}

      {/* Floating One-Click PWA Install Toast Banner (if prompt available) */}
      {showInstallBanner && !isInstalled && deferredPrompt && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-[#0A192F] text-white p-4 rounded-xl shadow-2xl border border-amber-400/40 backdrop-blur-md">
          <div className="flex items-start justify-between gap-3">
            <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400 shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                Install ACE Education App
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                Install on your device for instant offline access, lesson alerts, and biometric login.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={triggerInstall}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-lg transition-colors shadow"
                >
                  Install Now
                </button>
                <button
                  onClick={() => {
                    setShowInstallBanner(false);
                    localStorage.setItem("ace_pwa_banner_dismissed", "true");
                  }}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs rounded-lg transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
