"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Menu, X, Lock, PhoneCall } from "lucide-react";

interface PortalMainHeaderProps {
  language: "en" | "mr";
}

export function PortalMainHeader({ language }: PortalMainHeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const NAV_LINKS = [
    { label: language === "en" ? "Home" : "मुख्यपृष्ठ", href: "/" },
    { label: language === "en" ? "About Us" : "आमच्याबद्दल", href: "/stations" },
    { label: language === "en" ? "Fire Safety Guidelines" : "अग्निसुरक्षा मार्गदर्शक तत्त्वे", href: "/emergency" },
    { label: language === "en" ? "NOC & Permissions" : "ना हरकत प्रमाणपत्र (NOC)", href: "/reports" },
    { label: language === "en" ? "Contact" : "संपर्क", href: "/vehicles" },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Official Logo / Emblem & Department Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          {/* Logo Placeholder / Emblem */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#0a2540] text-white shadow-sm border border-slate-300">
            <Flame className="h-7 w-7 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[#0a2540] tracking-tight text-sm sm:text-base uppercase leading-tight font-sans">
              {language === "en" ? "MIRA-BHAYANDAR MUNICIPAL CORPORATION" : "मीरा-भाईंदर महानगरपालिका"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">
              {language === "en" ? "Directorate of Fire & Emergency Services" : "अग्निशामक व आणीबाणी सेवा संचालनालय"}
            </span>
          </div>
        </Link>

        {/* Right: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-5 text-sm font-semibold text-slate-700">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition py-1 border-b-2 ${
                      isActive
                        ? "text-[#0a2540] border-[#0a2540] font-bold"
                        : "border-transparent text-slate-700 hover:text-[#0a2540] hover:border-slate-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Officer Command Login Link */}
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 text-xs font-bold text-[#0a2540] transition"
          >
            <Lock className="h-3.5 w-3.5 text-slate-600" />
            <span>{language === "en" ? "Officer Login" : "अधिकारी लॉगिन"}</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="tel:101"
            className="inline-flex items-center gap-1 bg-[#dc2626] text-white px-3 py-1.5 rounded text-xs font-bold"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>101</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded text-slate-700 hover:bg-slate-100 border border-slate-200"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2">
          <ul className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded text-sm font-semibold text-slate-800 hover:bg-slate-100 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-slate-200">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0a2540] py-2 rounded text-xs font-bold border border-slate-300"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Officer CAD Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
