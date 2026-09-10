"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Truck, Wifi, Gauge } from "lucide-react";

interface VehicleTelemetryProps {
  parallaxX?: number;
  parallaxY?: number;
}

export function VehicleTelemetry({ parallaxX = 0, parallaxY = 0 }: VehicleTelemetryProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: -15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      style={{
        x: shouldReduceMotion ? 0 : parallaxX * 0.8,
        y: shouldReduceMotion ? 0 : parallaxY * 0.8,
      }}
      className="absolute top-0 right-4 sm:right-12 z-30 flex flex-col gap-1.5 rounded-md bg-[#090d14]/90 border border-slate-700/80 px-3 py-2 text-xs font-mono shadow-2xl backdrop-blur-md max-w-[260px] select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-1 text-[10px]">
        <div className="flex items-center gap-1.5 font-bold text-white">
          <Truck className="w-3.5 h-3.5 text-orange-400" />
          <span>UNIT MBMC-FE-04</span>
        </div>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <Wifi className="w-3 h-3" />
          RTK LINKED
        </span>
      </div>

      {/* Metric Readouts */}
      <div className="grid grid-cols-2 gap-2 text-[10px] pt-0.5">
        <div>
          <span className="text-slate-500 block text-[9px] uppercase">STATUS</span>
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            EN ROUTE
          </span>
        </div>

        <div>
          <span className="text-slate-500 block text-[9px] uppercase">CAN-BUS SPEED</span>
          <span className="text-white font-bold">56 KM/H</span>
        </div>

        <div>
          <span className="text-slate-500 block text-[9px] uppercase">BASE STATION</span>
          <span className="text-slate-300 font-medium">STN 02 (Bhayandar)</span>
        </div>

        <div>
          <span className="text-slate-500 block text-[9px] uppercase">CREW ROSTER</span>
          <span className="text-slate-300 font-medium">ALPHA-04 (1+5)</span>
        </div>
      </div>
    </motion.div>
  );
}
