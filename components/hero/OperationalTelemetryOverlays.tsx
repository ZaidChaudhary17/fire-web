"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Truck, ShieldAlert, Radio, AlertOctagon, Flame, Wifi, Activity } from "lucide-react";

export function OperationalTelemetryOverlays({
  parallaxX = 0,
  parallaxY = 0,
}: {
  parallaxX?: number;
  parallaxY?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Overlay 1: Engine Telemetry (Top Left / Above Cab) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 1.4,
          y: shouldReduceMotion ? 0 : parallaxY * 1.4,
        }}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute -top-3 left-2 sm:left-4 z-20 bg-[#090d14]/95 backdrop-blur-md rounded border border-slate-700/80 p-2.5 font-mono text-xs shadow-2xl text-slate-200 select-none max-w-[210px]"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1 text-[10px]">
          <span className="text-slate-400 uppercase font-bold flex items-center gap-1">
            <Truck className="w-3 h-3 text-orange-400" />
            ENGINE UNIT
          </span>
          <span className="text-orange-400 font-bold">MBMC-FE-04</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          <div>
            <span className="text-slate-500 block text-[9px]">STATUS</span>
            <span className="text-amber-300 font-bold animate-pulse">EN ROUTE</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[9px]">EST. ARRIVAL</span>
            <span className="text-white font-bold">04:32 MIN</span>
          </div>
        </div>
      </motion.div>

      {/* Overlay 2: Active Emergency Incident Card (Top Right) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : -parallaxX * 1.2,
          y: shouldReduceMotion ? 0 : parallaxY * 1.2,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute -top-2 right-2 sm:right-4 z-20 bg-red-950/90 backdrop-blur-md rounded border border-red-600/70 p-2.5 font-mono text-xs shadow-2xl text-red-200 select-none max-w-[230px]"
      >
        <div className="flex items-center justify-between border-b border-red-900/80 pb-1 mb-1 text-[10px]">
          <span className="font-bold text-red-300 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3 text-red-400 animate-pulse" />
            ACTIVE 101 CAD
          </span>
          <span className="bg-red-600 text-white px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider">
            CRITICAL
          </span>
        </div>
        <div className="text-[11px] font-bold text-white leading-tight truncate">
          INC-2026-00421
        </div>
        <div className="text-[10px] text-red-300/90 truncate mt-0.5">
          Residential Fire • Mira Road (E)
        </div>
      </motion.div>

      {/* Overlay 3: Station & Comms Telemetry (Bottom Right / Near Rear) */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : parallaxX * 0.9,
          y: shouldReduceMotion ? 0 : -parallaxY * 0.9,
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute -bottom-2 right-2 sm:right-6 z-20 bg-[#090d14]/95 backdrop-blur-md rounded border border-slate-700/80 p-2 font-mono text-xs shadow-2xl text-slate-200 select-none hidden sm:block max-w-[200px]"
      >
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1 mb-1">
          <span className="flex items-center gap-1 text-slate-300 font-bold">
            <Wifi className="w-3 h-3 text-emerald-400" />
            GPS RTK
          </span>
          <span className="text-emerald-400 font-semibold">CONNECTED</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span>STN 02 (Bhayandar)</span>
          <span className="text-slate-400">CREW ALPHA-04</span>
        </div>
      </motion.div>
    </>
  );
}
