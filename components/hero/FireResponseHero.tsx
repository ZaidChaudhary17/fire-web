"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroText } from "./HeroText";
import { FireEngineScene } from "./FireEngineScene";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";

export function FireResponseHero() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  // Scroll parallax
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.8]);
  const heroY = useTransform(scrollY, [0, 500], [0, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 35; // ~8px max
    const y = (clientY - top - height / 2) / 35;
    setMousePos({ x, y });
  };

  return (
    <motion.section
      style={{ 
        opacity: shouldReduceMotion ? 1 : heroOpacity, 
        y: shouldReduceMotion ? 0 : heroY 
      }}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[calc(100vh-112px)] flex items-center justify-center overflow-hidden bg-[#07090c] text-slate-100 py-8 lg:py-12 px-4 sm:px-8 select-none"
    >
      {/* 1. Main 2-Column Responsive Municipal Command Grid */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Municipal Authority & Headline (Cols 1-5 / 42–45%) */}
        <div className="lg:col-span-5 flex flex-col justify-center relative z-20">
          <HeroText onOpenReportModal={() => setReportModalOpen(true)} />
        </div>

        {/* RIGHT COLUMN: Full Cinematic Fire Engine Scene (Cols 6-12 / 55–58%) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative z-10 lg:-ml-6">
          <FireEngineScene 
            parallaxX={mousePos.x} 
            parallaxY={mousePos.y} 
          />
        </div>

      </div>

      {/* Emergency CAD Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </motion.section>
  );
}
