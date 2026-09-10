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
    <section className="relative w-full bg-[#05070a] border-t border-slate-800/80 py-16 px-4 sm:px-8 select-none font-sans text-slate-100">
      
      {/* Background Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[350px] bg-red-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-emerald-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* 1. Header & Controller */}
        <WorkflowHeader
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={() => {
            setActiveStage(0);
            setIsPlaying(true);
          }}
          activeStage={activeStage}
        />

        {/* 2. Visual Connecting Track Line (Desktop Horizontal) */}
        <WorkflowConnector activeStage={activeStage} />

        {/* 3. 5 Asymmetrical Operational Stages (Desktop 5-Col Grid / Mobile Vertical Stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
          
          {/* Stage 01: Citizen Report */}
          <ReportStage
            isActive={activeStage === 0}
            onSelect={() => handleManualStageSelect(0)}
          />

          {/* Stage 02: Control Room Verification */}
          <VerificationStage
            isActive={activeStage === 1}
            onSelect={() => handleManualStageSelect(1)}
          />

          {/* Stage 03: Dispatch Nearest Unit */}
          <DispatchStage
            isActive={activeStage === 2}
            onSelect={() => handleManualStageSelect(2)}
          />

          {/* Stage 04: Live GPS Response */}
          <ResponseStage
            isActive={activeStage === 3}
            onSelect={() => handleManualStageSelect(3)}
          />

          {/* Stage 05: Incident Resolution */}
          <ResolutionStage
            isActive={activeStage === 4}
            onSelect={() => handleManualStageSelect(4)}
          />

        </div>

        {/* 4. Bottom Operational Timeline Milestone Strip */}
        <WorkflowMetricStrip />

      </div>
    </section>
  );
}
