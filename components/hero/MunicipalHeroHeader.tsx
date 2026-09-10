"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  Lock, 
  Menu, 
  X, 
  Home, 
  Activity, 
  Radio, 
  Building2, 
  Truck, 
  BarChart3, 
  FileText,
  PhoneCall,
  ShieldCheck
} from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Operations", href: "/dashboard", icon: Activity },
  { name: "Emergency Response", href: "/emergency", icon: Radio },
  { name: "Stations", href: "/stations", icon: Building2 },
  { name: "Fleet", href: "/vehicles", icon: Truck },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Audit Reports", href: "/reports", icon: FileText },
];

export function MunicipalHeroHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change or escape
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="w-full border-b border-slate-800/80 bg-[#07090c]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between text-xs font-mono relative z-40 select-none">
        {/* Left: Official Municipal Identification */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-red-600 text-white shadow-lg shadow-red-950/60 border border-red-500/40 group-hover:bg-red-500 transition-colors">
            <Flame className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-wider text-xs uppercase leading-tight font-sans">
              MBMC FIRE SERVICES
            </span>
            <span className="text-[10px] text-slate-400 tracking-wide font-mono uppercase truncate max-w-[200px] sm:max-w-none">
              MIRA-BHAYANDAR CAD NETWORK
            </span>
          </div>
        </Link>

        {/* Desktop Status & Links */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-5 text-xs text-slate-300">
            {NAV_LINKS.slice(1, 6).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition font-medium tracking-wide py-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 border-l border-slate-800 pl-4">
            <span className="text-slate-500">STATUS:</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 rounded border border-slate-700/90 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition font-medium tracking-wide"
          >
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>OFFICER LOGIN</span>
          </Link>
        </div>

        {/* Mobile Status & Hamburger Trigger */}
        <div className="flex lg:hidden items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 rounded bg-slate-900/90 border border-slate-800 px-2 py-1 text-[10px] text-emerald-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">ACTIVE</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded border border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 transition active:scale-95"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden fixed top-[57px] left-0 right-0 z-40 bg-[#07090c]/98 border-b border-slate-800/90 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 space-y-4 max-h-[calc(100vh-70px)] overflow-y-auto">
              <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider px-2">
                COMMAND MENU & NAVIGATION
              </div>

              <div className="grid grid-cols-1 gap-1">
                {NAV_LINKS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-mono transition ${
                        isActive
                          ? "bg-red-950/40 text-red-400 border border-red-900/60 font-bold"
                          : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-red-400" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center gap-2 rounded bg-slate-900 border border-slate-700 px-4 py-2.5 text-xs font-mono font-bold text-slate-200 hover:bg-slate-800 transition"
                >
                  <Lock className="h-4 w-4 text-slate-400" />
                  <span>OFFICER / DISPATCHER LOGIN</span>
                </Link>

                <div className="flex items-center justify-between px-2 pt-2 text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <PhoneCall className="h-3 w-3 animate-pulse" />
                    EMERGENCY: 101 / 112
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    EOC VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

