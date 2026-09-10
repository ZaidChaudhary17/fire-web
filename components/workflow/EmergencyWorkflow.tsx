"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WorkflowHeader } from "./WorkflowHeader";
import { WorkflowConnector } from "./WorkflowConnector";
import { ReportStage } from "./ReportStage";
import { VerificationStage } from "./VerificationStage";
import { DispatchStage } from "./DispatchStage";
import { ResponseStage } from "./ResponseStage";
import { ResolutionStage } from "./ResolutionStage";
import { WorkflowMetricStrip } from "./WorkflowMetricStrip";
import { MobileWorkflowTimeline } from "./MobileWorkflowTimeline";

export function EmergencyWorkflow() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);

  // Auto-cycle through the 5 stages every 3.2 seconds
  React.useEffect(() => {
    if (!isPlaying || shouldReduceMotion) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 5);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion]);

  const handleManualStageSelect = (stageIdx: number) => {
    setActiveStage(stageIdx);
    setIsPlaying(false);
  };

  return (
    <section className="relative w-full bg-[#05070a] border-t border-slate-800/80 py-12 sm:py-16 px-4 sm:px-8 select-none font-sans text-slate-100 overflow-hidden">
      
      {/* Background Ambient Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[350px] bg-red-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-emerald-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 relative z-10">
        
        {/* 1. Header & Simulation Controller */}
        <WorkflowHeader
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={() => {
            setActiveStage(0);
            setIsPlaying(true);
          }}
          activeStage={activeStage}
        />

        {/* 2. Desktop Horizontal Connecting Vector Line (lg+) */}
        <div className="hidden lg:block">
          <WorkflowConnector activeStage={activeStage} />
        </div>

        {/* 3. Desktop 5-Column Operational Stages Grid (lg+) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 items-stretch">
          <ReportStage
            isActive={activeStage === 0}
            onSelect={() => handleManualStageSelect(0)}
          />

          <VerificationStage
            isActive={activeStage === 1}
            onSelect={() => handleManualStageSelect(1)}
          />

          <DispatchStage
            isActive={activeStage === 2}
            onSelect={() => handleManualStageSelect(2)}
          />

          <ResponseStage
            isActive={activeStage === 3}
            onSelect={() => handleManualStageSelect(3)}
          />

          <ResolutionStage
            isActive={activeStage === 4}
            onSelect={() => handleManualStageSelect(4)}
          />
        </div>

        {/* 4. Mobile / Tablet Dedicated Dynamic Vertical Timeline (<lg) */}
        <MobileWorkflowTimeline
          activeStage={activeStage}
          onSelectStage={handleManualStageSelect}
        />

        {/* 5. Bottom Operational Timeline Milestone Strip */}
        <WorkflowMetricStrip />

      </div>
    </section>
  );
}
