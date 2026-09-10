"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Radio, Truck, CheckCircle2, ChevronRight } from "lucide-react";

export function CadFlow() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-2 rounded-md bg-[#090d14]/90 border border-slate-800/90 px-3 py-2 text-xs font-mono select-none w-fit shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px] tracking-wider pr-2 border-r border-slate-800">
        <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
        <span>CAD STAGE:</span>
      </div>

      <div className="flex items-center gap-2 text-[11px]">
        {/* DISPATCH (Completed) */}
        <span className="text-slate-500 flex items-center gap-1 font-medium">
          <CheckCircle2 className="w-3 h-3 text-emerald-500/80" />
          DISPATCH
        </span>

        <ChevronRight className="w-3 h-3 text-slate-700" />

        {/* EN ROUTE (Active Highlight) */}
        <div className="relative flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          <span className="relative flex h-2 w-2">
            {!shouldReduceMotion && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <Truck className="w-3.5 h-3.5 text-amber-400" />
          <span>EN ROUTE</span>
        </div>

        <ChevronRight className="w-3 h-3 text-slate-700" />

        {/* ARRIVING (Pending) */}
        <span className="text-slate-600 font-medium">
          ARRIVING
        </span>
      </div>
    </div>
  );
}
