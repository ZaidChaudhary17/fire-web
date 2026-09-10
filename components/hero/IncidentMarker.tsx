"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, MapPin } from "lucide-react";

export function IncidentMarker() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex items-center gap-2 select-none font-mono">
      
      {/* Pulse Radar Rings */}
      <div className="relative flex items-center justify-center w-8 h-8">
        {!shouldReduceMotion && (
          <>
            <motion.span
              animate={{
                scale: [1, 2.2],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inline-flex h-full w-full rounded-full bg-red-500"
            />
            <motion.span
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 0.5,
                ease: "easeOut",
              }}
              className="absolute inline-flex h-full w-full rounded-full bg-red-400"
            />
          </>
        )}

        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.8)] border border-red-300">
          <Flame className="h-3.5 w-3.5 animate-pulse" />
        </div>
      </div>

      {/* Destination Label */}
      <div className="flex flex-col text-left">
        <span className="text-[11px] font-bold text-white leading-tight">
          MIRA ROAD (E)
        </span>
        <span className="text-[9px] text-slate-400">
          Sector 9 Complex
        </span>
      </div>

    </div>
  );
}
