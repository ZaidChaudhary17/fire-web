"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Flame, 
  Menu, 
  X, 
  Lock, 
  ShieldCheck, 
  Building2, 
  Truck, 
  FileText, 
  AlertTriangle,
  PhoneCall,
  Home,
  CheckSquare
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Emergency Services", href: "/emergency" },
  { label: "Fire Stations", href: "/stations" },
  { label: "Fleet & Apparatus", href: "/vehicles" },
  { label: "Fire Safety & NOC", href: "/reports" },
  { label: "Public Analytics", href: "/analytics" },
];

export function GovHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      {/* Brand & Crest Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Official Government Crest & Department Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#0a2540] text-white shadow-md border-2 border-[#1e3a8a]">
            <Flame className="h-7 w-7 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[#0a2540] tracking-tight text-sm sm:text-base uppercase leading-tight font-sans">
              MIRA-BHAYANDAR MUNICIPAL CORPORATION
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">
              Directorate of Fire & Emergency Services
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:block">
              Headquarters: Chhatrapati Shivaji Maharaj Marg, Bhayandar (W)
            </span>
          </div>
        </Link>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Officer CAD Portal Login */}
          <Link
            href="/auth/login"
            className="hidden sm:inline-flex items-center gap-1.5 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3.5 py-2 text-xs font-semibold text-[#0a2540] transition"
          >
            <Lock className="h-3.5 w-3.5 text-slate-600" />
            <span>OFFICER LOGIN</span>
          </Link>

          {/* Report Emergency Button (Safety Red exclusively) */}
          <a
            href="tel:101"
            className="inline-flex items-center gap-2 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 text-xs sm:text-sm font-bold shadow-md transition"
          >
            <PhoneCall className="h-4 w-4" />
            <span>DIAL 101</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Main Deep Navy Navigation Bar */}
      <nav className="hidden lg:block bg-[#0a2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <ul className="flex items-center space-x-1 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 transition font-semibold ${
                      isActive
                        ? "bg-[#1e3a8a] text-white border-b-2 border-amber-400"
                        : "text-slate-200 hover:bg-[#132d4a] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 EOC ACTIVE</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a2540] text-white border-t border-slate-700 px-4 py-4 space-y-3">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider px-2">
            MUNICIPAL NAVIGATION
          </div>
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded text-sm font-medium text-slate-100 hover:bg-[#1e3a8a] transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-700 space-y-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-2.5 rounded text-sm font-semibold border border-slate-600"
            >
              <Lock className="h-4 w-4" />
              <span>OFFICER CAD LOGIN</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
