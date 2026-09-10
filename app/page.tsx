"use client";

import * as React from "react";
import { PortalTopUtilityBar } from "@/components/portal/PortalTopUtilityBar";
import { PortalMainHeader } from "@/components/portal/PortalMainHeader";
import { PortalHero } from "@/components/portal/PortalHero";
import { PortalQuickServicesGrid } from "@/components/portal/PortalQuickServicesGrid";
import { PortalNoticeBoard } from "@/components/portal/PortalNoticeBoard";
import { PortalOfficialFooter } from "@/components/portal/PortalOfficialFooter";

export default function RootPage() {
  const [fontSize, setFontSize] = React.useState<"sm" | "md" | "lg">("md");
  const [language, setLanguage] = React.useState<"en" | "mr">("en");

  // Dynamic root scaling class based on accessible text size selection
  const fontClass = 
    fontSize === "sm" 
      ? "text-[14px]" 
      : fontSize === "lg" 
      ? "text-[18px]" 
      : "text-[16px]";

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between ${fontClass}`}>
      
      {/* 1. Top Header & Navigation Bar */}
      <div>
        {/* Top Utility Bar: Skip link, Text Size (A-, A, A+), Language toggle (English / Marathi) */}
        <PortalTopUtilityBar 
          fontSize={fontSize} 
          setFontSize={setFontSize} 
          language={language} 
          setLanguage={setLanguage} 
        />

        {/* Main Header: Clean white section with MBMC logo and standard navigation */}
        <PortalMainHeader language={language} />
      </div>

      {/* Main Content Area (For skip to content anchor) */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 2. Hero Section: Headline, Subheadline, Daytime Photograph, Massive Red Emergency Button */}
        <PortalHero language={language} />

        {/* 3. Quick Citizen Services Grid: 4 White Cards with Flat-Vector Icons */}
        <PortalQuickServicesGrid language={language} />

        {/* 4. Notice Board / Public Updates: Latest Announcements & Safety Alerts */}
        <PortalNoticeBoard language={language} />
      </main>

      {/* 5. Official Dark Navy Blue Footer */}
      <PortalOfficialFooter language={language} />

    </div>
  );
}
