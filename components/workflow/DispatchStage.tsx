"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Radio, 
  Building2, 
  Truck, 
  Flame, 
  Clock, 
  Users,
  Navigation
} from "lucide-react";

interface DispatchStageProps {
  isActive: boolean;
  onSelect: () => void;
}

export function DispatchStage({ isActive, onSelect }: DispatchStageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer select-none shadow-xl ${
        isActive
          ? "bg-gradient-to-b from-[#14120e] via-[#0f0e0a] to-[#090806] border-amber-500/80 ring-2 ring-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
          : "bg-gradient-to-b from-[#0c0f17] to-[#07090f] border-slate-800/80 hover:border-slate-700"
      }`}
    >
      {/* Top Stage Identification */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold ${
              isActive ? "bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.6)]" : "bg-slate-800 text-slate-300"
            }`}>
              03
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              AUTO-CAD ALARM
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
            isActive ? "bg-amber-950 text-amber-300 border-amber-800 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-800"
          }`}>
            {isActive ? "ACTIVE STEP" : "STEP 03"}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-white font-sans mb-2 flex items-center gap-1.5">
          <Radio className="w-4 h-4 text-amber-400" />
          <span>Dispatch Nearest Unit</span>
        </h3>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3.5">
          CAD algorithm calculates fastest turnout route, sounding station klaxons and alerting crew pagers.
        </p>

        {/* Tactical SVG Mini Map & Route Vector */}
        <div className="rounded-lg bg-[#06080e] border border-slate-800 p-2.5 space-y-2 font-mono text-[10px]">
          {/* Station to Incident Visual Route */}
          <div className="relative flex items-center justify-between px-1 py-1.5 bg-slate-950/60 rounded border border-slate-900">
            {/* Origin Station 02 */}
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Building2 className="h-3 w-3" />
              </div>
              <span className="font-bold text-white text-[10px]">STN 02 (W)</span>
            </div>

            {/* Glowing Route Vector Track */}
            <div className="relative flex-1 mx-2 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-amber-500 opacity-70" />
              {!shouldReduceMotion && (
                <motion.div
                  animate={{ x: ["-20%", "100%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] border border-amber-400"
                />
              )}
            </div>

            {/* Destination Incident Pin */}
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-white border border-red-300 shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                <Flame className="h-2.5 w-2.5 animate-pulse" />
              </div>
              <span className="font-bold text-red-400 text-[10px]">SECTOR 9</span>
            </div>
          </div>

          {/* Unit & ETA Specs */}
          <div className="grid grid-cols-3 gap-1.5 text-[9px] pt-1">
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">UNIT</span>
              <span className="text-white font-bold">MBMC-FE-04</span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">CREW</span>
              <span className="text-amber-300 font-bold">ALPHA-04</span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">EST. ETA</span>
              <span className="text-emerald-400 font-bold">04:32 MIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Footer */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500 uppercase">STATUS</span>
        <span className="text-amber-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          KLAXON FIRED • BAY EXIT
        </span>
      </div>
    </motion.div>
  );
}
