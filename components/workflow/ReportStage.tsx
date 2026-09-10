"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  PhoneCall, 
  MapPin, 
  Flame, 
  Camera, 
  Clock, 
  AlertOctagon,
  CheckCircle2
} from "lucide-react";

interface ReportStageProps {
  isActive: boolean;
  onSelect: () => void;
}

export function ReportStage({ isActive, onSelect }: ReportStageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer select-none shadow-xl ${
        isActive
          ? "bg-gradient-to-b from-[#140e16] via-[#0e0a12] to-[#08060b] border-red-500/80 ring-2 ring-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.25)]"
          : "bg-gradient-to-b from-[#0c0f17] to-[#07090f] border-slate-800/80 hover:border-slate-700"
      }`}
    >
      {/* Top Stage Identification */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold ${
              isActive ? "bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)]" : "bg-slate-800 text-slate-300"
            }`}>
              01
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              CITIZEN INTAKE
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
            isActive ? "bg-red-950 text-red-300 border-red-800 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-800"
          }`}>
            {isActive ? "ACTIVE STEP" : "STEP 01"}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-white font-sans mb-2 flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-red-400" />
          <span>Report Emergency</span>
        </h3>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3.5">
          Citizen triggers 101 emergency call or mobile CAD report with GPS coordinates and scene verification photo.
        </p>

        {/* Tactical Intake Form Card Visual */}
        <div className="rounded-lg bg-[#06080e] border border-slate-800 p-2.5 space-y-2 font-mono text-[10px]">
          {/* Location with Pulsing Pin */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <span className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400 animate-bounce" style={{ animationDuration: "2s" }} />
              LOCATION:
            </span>
            <span className="text-white font-bold text-[11px]">Mira Road (E) • Sec 9</span>
          </div>

          {/* Incident Type */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
            <span className="text-slate-500 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              TYPE:
            </span>
            <span className="text-amber-300 font-bold">Residential High-Rise</span>
          </div>

          {/* Priority & Timestamp */}
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1">
              <AlertOctagon className="w-3 h-3 text-red-500" />
              PRIORITY:
            </span>
            <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-400 font-bold border border-red-800 animate-pulse text-[9px]">
              CRITICAL (L-3)
            </span>
          </div>

          {/* Scene Media Badge */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-slate-400 text-[9px]">
            <span className="flex items-center gap-1">
              <Camera className="w-3 h-3 text-cyan-400" />
              1 PHOTO ATTACHED
            </span>
            <span className="text-slate-500">14:32:08 IST</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Footer */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500 uppercase">STATUS</span>
        <span className="text-red-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          REPORT RECEIVED
        </span>
      </div>
    </motion.div>
  );
}
