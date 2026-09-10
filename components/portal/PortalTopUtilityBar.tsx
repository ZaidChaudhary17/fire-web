"use client";

import * as React from "react";

interface PortalTopUtilityBarProps {
  fontSize: "sm" | "md" | "lg";
  setFontSize: (size: "sm" | "md" | "lg") => void;
  language: "en" | "mr";
  setLanguage: (lang: "en" | "mr") => void;
}

export function PortalTopUtilityBar({
  fontSize,
  setFontSize,
  language,
  setLanguage,
}: PortalTopUtilityBarProps) {
  return (
    <div className="w-full bg-[#0a2540] text-white border-b border-[#1e3a8a] text-xs font-sans">
      {/* Top National / State Tricolor Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#ff9933] via-[#ffffff] to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Skip to Main Content Link (Accessible tab index) */}
        <div className="flex items-center gap-3">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:bg-white focus:text-[#0a2540] focus:px-3 focus:py-1 focus:rounded font-bold text-xs"
          >
            Skip to Main Content
          </a>
          <div className="flex items-center gap-2 text-slate-200 text-xs font-medium">
            <span className="font-bold text-white">GOVERNMENT OF MAHARASHTRA</span>
            <span className="text-slate-400">•</span>
            <span>MIRA-BHAYANDAR MUNICIPAL CORPORATION</span>
          </div>
        </div>

        {/* Accessibility Controls: Font Size (A-, A, A+) & Language Toggle */}
        <div className="flex items-center gap-4 text-xs">
          {/* Text Size Controls */}
          <div className="flex items-center gap-1 bg-[#132d4a] px-2 py-0.5 rounded border border-slate-700" aria-label="Text Size Controls">
            <span className="text-slate-300 text-[11px] mr-1 hidden sm:inline">Text Size:</span>
            <button
              onClick={() => setFontSize("sm")}
              className={`px-1.5 py-0.5 rounded font-bold transition ${
                fontSize === "sm" ? "bg-white text-[#0a2540]" : "text-slate-200 hover:text-white"
              }`}
              title="Small Text Size"
              aria-label="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("md")}
              className={`px-1.5 py-0.5 rounded font-bold transition ${
                fontSize === "md" ? "bg-white text-[#0a2540]" : "text-slate-200 hover:text-white"
              }`}
              title="Standard Text Size"
              aria-label="Default text size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              className={`px-1.5 py-0.5 rounded font-bold transition ${
                fontSize === "lg" ? "bg-white text-[#0a2540]" : "text-slate-200 hover:text-white"
              }`}
              title="Large Text Size"
              aria-label="Increase text size"
            >
              A+
            </button>
          </div>

          {/* Language Toggle (English / Marathi) */}
          <div className="flex items-center gap-1.5 border-l border-slate-700 pl-3">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded font-semibold transition ${
                language === "en" ? "bg-white text-[#0a2540]" : "text-slate-300 hover:text-white"
              }`}
              aria-label="Switch language to English"
            >
              English
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-2 py-0.5 rounded font-semibold transition font-serif ${
                language === "mr" ? "bg-white text-[#0a2540]" : "text-slate-300 hover:text-white"
              }`}
              aria-label="Switch language to Marathi"
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
