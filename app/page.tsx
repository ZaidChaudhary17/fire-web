"use client";

import * as React from "react";
import { GovTopBar } from "@/components/government/GovTopBar";
import { GovHeader } from "@/components/government/GovHeader";
import { GovEmergencyHotlineBanner } from "@/components/government/GovEmergencyHotlineBanner";
import { GovHero } from "@/components/government/GovHero";
import { GovServicesSection } from "@/components/government/GovServicesSection";
import { GovWorkflowGuide } from "@/components/government/GovWorkflowGuide";
import { GovStationsDirectory } from "@/components/government/GovStationsDirectory";
import { GovSafetyTips } from "@/components/government/GovSafetyTips";
import { GovFooter } from "@/components/government/GovFooter";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-blue-900 selection:text-white">
      {/* 1. Official State & Municipal Identification Bar */}
      <GovTopBar />

      {/* 2. Official Municipal Department Header & Navigation */}
      <GovHeader />

      {/* 3. High-Contrast Emergency Telephone Hotlines Banner */}
      <GovEmergencyHotlineBanner />

      {/* 4. Public Service Portal Hero Section (Clean Light Theme) */}
      <GovHero />

      {/* 5. Citizen Public Services & Municipal Capabilities */}
      <GovServicesSection />

      {/* 6. Step-by-Step Citizen Emergency Response Workflow */}
      <GovWorkflowGuide />

      {/* 7. Fire Stations & Coverage Network Directory */}
      <GovStationsDirectory />

      {/* 8. Citizen Fire Safety & Emergency Protocols */}
      <GovSafetyTips />

      {/* 9. Official Municipal Government Footer */}
      <GovFooter />
    </div>
  );
}
