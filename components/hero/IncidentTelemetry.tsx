"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Truck, AlertOctagon, Wifi, Activity } from "lucide-react";

interface IncidentTelemetryProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function IncidentTelemetry({
  parallaxX = 0,
  parallaxY = 0,
}: IncidentTelemetryProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* 1. Engine Telemetry Card (Top Left of Vehicle) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 1.3,
          y: shouldReduceMotion ? 0 : parallaxY * 1.3,
        }}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute -top-3 left-2 sm:left-4 z-20 bg-[#090d14]/95 backdrop-blur-md rounded border border-slate-700/90 p-2.5 font-mono text-xs shadow-2xl text-slate-200 select-none max-w-[210px]"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1 text-[10px]">
          <span className="text-slate-400 uppercase font-bold flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-orange-400" />
            ENGINE UNIT
          </span>
          <span className="text-orange-400 font-bold">MBMC-FE-04</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-slate-500 block text-[9px]">STATUS</span>
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              EN ROUTE
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[9px]">SPEED / CAN</span>
            <span className="text-white font-bold">54 KM/H</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Active 101 CAD Incident Card (Top Right of Vehicle) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : -parallaxX * 1.1,
          y: shouldReduceMotion ? 0 : parallaxY * 1.1,
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -top-2 right-2 sm:right-4 z-20 bg-red-950/95 backdrop-blur-md rounded border border-red-600/80 p-2.5 font-mono text-xs shadow-[0_0_20px_rgba(239,68,68,0.25)] text-red-200 select-none max-w-[230px]"
      >
        <div className="flex items-center justify-between border-b border-red-900/80 pb-1 mb-1 text-[10px]">
          <span className="font-bold text-red-300 flex items-center gap-1">
            <AlertOctagon className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            ACTIVE 101 CAD
          </span>
          <span className="bg-red-600 text-white px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider animate-pulse">
            CRITICAL
          </span>
        </div>
        <div className="text-[11px] font-bold text-white leading-tight truncate">
          INC-2026-00421
        </div>
        <div className="text-[10px] text-red-300/90 truncate mt-0.5">
          Residential Fire • Sector 9 (E)
        </div>
      </motion.div>

      {/* 3. GPS RTK & Crew Telemetry Card (Bottom Right of Vehicle) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.9,
          y: shouldReduceMotion ? 0 : -parallaxY * 0.9,
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute -bottom-2 right-2 sm:right-6 z-20 bg-[#090d14]/95 backdrop-blur-md rounded border border-slate-700/90 p-2 font-mono text-xs shadow-2xl text-slate-200 select-none hidden sm:block max-w-[200px]"
      >
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 mb-1">
          <span className="flex items-center gap-1 text-slate-300 font-bold">
            {/* Animated GPS Signal Waves */}
            <div className="flex items-center gap-0.5 mr-1">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                className="h-1.5 w-0.5 rounded-full bg-emerald-400"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="h-2.5 w-0.5 rounded-full bg-emerald-400"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                className="h-3.5 w-0.5 rounded-full bg-emerald-400"
              />
            </div>
            GPS RTK
          </span>
          <span className="text-emerald-400 font-semibold">LINKED</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span>STN 02 (Bhayandar)</span>
          <span className="text-slate-400">CREW ALPHA-04</span>
        </div>
      </motion.div>
    </>
  );
}
