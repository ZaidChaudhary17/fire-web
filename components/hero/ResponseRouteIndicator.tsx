"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Flame, Navigation } from "lucide-react";

export function ResponseRouteIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#0b0e14]/90 backdrop-blur-md rounded-md border border-slate-800/90 p-2.5 font-mono text-xs shadow-lg text-slate-300">
      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5 uppercase tracking-wider">
        <span className="flex items-center gap-1.5 font-bold text-slate-200">
          <Navigation className="w-3 h-3 text-red-500" />
          ACTIVE DISPATCH VECTOR
        </span>
        <span className="text-emerald-400 font-semibold">ETA: 04 MIN 32 SEC</span>
      </div>

      {/* Progress Track Line */}
      <div className="relative flex items-center justify-between py-1">
        {/* Origin Node */}
        <div className="flex items-center gap-1.5 z-10">
          <div className="h-5 w-5 rounded bg-blue-950 border border-blue-600 flex items-center justify-center text-blue-400">
            <Building2 className="w-3 h-3" />
          </div>
          <span className="text-[10px] text-slate-300 font-semibold hidden sm:inline">
            STN 02 (BHAYANDAR W)
          </span>
        </div>

        {/* Connecting Animated Vector Line */}
        <div className="flex-1 mx-3 relative h-[2px] bg-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-red-500 to-red-500/40 opacity-70" />
          
          {/* Moving vehicle beacon along route */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-red-500 border border-white shadow-[0_0_8px_rgba(239,68,68,1)] flex items-center justify-center"
              initial={{ left: "15%" }}
              animate={{ left: ["15%", "75%", "15%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </motion.div>
          )}
        </div>

        {/* Destination Node */}
        <div className="flex items-center gap-1.5 z-10">
          <span className="text-[10px] text-red-300 font-semibold hidden sm:inline">
            MIRA ROAD (E) - SECTOR 9
          </span>
          <div className="h-5 w-5 rounded bg-red-950 border border-red-600 flex items-center justify-center text-red-400 animate-pulse">
            <Flame className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
