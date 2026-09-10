import { MunicipalHeroHeader } from "@/components/hero/MunicipalHeroHeader";
import { FireResponseHero } from "@/components/hero/FireResponseHero";
import { OperationalInfoStrip } from "@/components/hero/OperationalInfoStrip";
import { CadFeaturesGrid } from "@/components/hero/CadFeaturesGrid";
import { EmergencyWorkflow } from "@/components/workflow/EmergencyWorkflow";

export default function RootPage() {
  return (
    <main className="min-h-screen bg-[#07090c] flex flex-col justify-between overflow-x-hidden select-none">
      {/* 1. Official Government Top Header */}
      <MunicipalHeroHeader />

      {/* 2. Cinematic Fire Emergency Response Scene Hero (No Card, Sits in Scene) */}
      <div className="flex-1 flex items-center justify-center">
        <FireResponseHero />
      </div>

      {/* 3. Bottom Command Center Operational Telemetry Strip */}
      <OperationalInfoStrip />

      {/* 4. Municipal Response Modules & Live Infrastructure Grid */}
      <CadFeaturesGrid />

      {/* 5. End-to-End Emergency Response Workflow Pipeline */}
      <EmergencyWorkflow />
    </main>
  );
}
