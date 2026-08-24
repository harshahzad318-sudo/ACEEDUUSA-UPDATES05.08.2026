"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, Users, BookOpen, ShieldCheck, Download } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Student", href: "/portals/student", icon: GraduationCap },
    { label: "Parent", href: "/portals/parent", icon: Users },
    { label: "Tutor", href: "/portals/tutor", icon: BookOpen },
    { label: "Admin", href: "/portals/admin", icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F]/95 backdrop-blur-md border-t border-gold/30 md:hidden pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full py-1 text-[11px] font-semibold transition-colors ${
                isActive
                  ? "text-gold"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? "bg-gold/15 text-gold" : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
