"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertOctagon, Flame } from "lucide-react";

interface IncidentOverlayProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function IncidentOverlay({ parallaxX = 0, parallaxY = 0 }: IncidentOverlayProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      style={{
        x: shouldReduceMotion ? 0 : parallaxX * 0.75,
        y: shouldReduceMotion ? 0 : parallaxY * 0.75,
      }}
      className="absolute bottom-20 right-4 sm:right-10 z-30 flex flex-col gap-1 rounded-md bg-red-950/90 border border-red-600/70 p-2.5 text-xs font-mono shadow-2xl backdrop-blur-md max-w-[270px] select-none text-red-200"
    >
      {/* Incident Header */}
      <div className="flex items-center justify-between border-b border-red-900/80 pb-1 text-[10px]">
        <span className="font-bold text-red-300 flex items-center gap-1">
          <AlertOctagon className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          ACTIVE 101 CAD ALARM
        </span>
        <span className="bg-red-600 text-white px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider animate-pulse">
          CRITICAL
        </span>
      </div>

      {/* Incident Details */}
      <div className="text-xs font-bold text-white pt-0.5 leading-tight">
        INC-2026-00421
      </div>

      <div className="text-[11px] text-red-200/90 flex items-center gap-1 font-sans">
        <Flame className="w-3 h-3 text-amber-400 shrink-0" />
        <span>Residential Fire • Sector 9 (E)</span>
      </div>
    </motion.div>
  );
}
