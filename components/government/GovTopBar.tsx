"use client";

import * as React from "react";
import Link from "next/link";
import { PhoneCall, Eye, Volume2, ShieldCheck } from "lucide-react";

export function GovTopBar() {
  return (
    <div className="w-full bg-[#0a1b2a] text-slate-100 border-b border-[#132c42] text-xs font-sans select-none">
      {/* Top Tricolor Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ff9933] via-[#ffffff] to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Official Government Identification */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 font-medium">
          <span className="font-semibold text-white">GOVERNMENT OF MAHARASHTRA</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-slate-300">
            MIRA-BHAYANDAR MUNICIPAL CORPORATION (MBMC)
          </span>
        </div>

        {/* Right: Accessibility Controls & Urgent Emergency Call */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          {/* Accessibility & Language options */}
          <div className="hidden md:flex items-center gap-3 text-slate-300 border-r border-slate-700 pr-4">
            <span className="font-medium text-slate-400">LANGUAGE:</span>
            <span className="font-bold text-white cursor-pointer hover:underline">English</span>
            <span className="text-slate-500">|</span>
            <span className="font-medium text-slate-300 cursor-pointer hover:underline font-serif">मराठी</span>
          </div>

          {/* Direct 24/7 Emergency Line */}
          <div className="flex items-center gap-1.5 font-bold text-red-400">
            <PhoneCall className="w-3.5 h-3.5 animate-pulse text-red-400" />
            <span>24/7 EMERGENCY:</span>
            <a 
              href="tel:101" 
              className="bg-red-600 text-white px-2 py-0.5 rounded text-[11px] hover:bg-red-700 transition"
              aria-label="Call 101 for Fire Emergency"
            >
              DIAL 101 / 112
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
