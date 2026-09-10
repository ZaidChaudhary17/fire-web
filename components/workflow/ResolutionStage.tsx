"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  CheckCircle2, 
  Droplet, 
  Clock, 
  Users, 
  FileText,
  ShieldCheck
} from "lucide-react";

interface ResolutionStageProps {
  isActive: boolean;
  onSelect: () => void;
}

export function ResolutionStage({ isActive, onSelect }: ResolutionStageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer select-none shadow-xl ${
        isActive
          ? "bg-gradient-to-b from-[#0e1612] via-[#09120d] to-[#060b08] border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          : "bg-gradient-to-b from-[#0c0f17] to-[#07090f] border-slate-800/80 hover:border-slate-700"
      }`}
    >
      {/* Top Stage Identification */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold ${
              isActive ? "bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.6)]" : "bg-slate-800 text-slate-300"
            }`}>
              05
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              AFTER-ACTION AUDIT
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
            isActive ? "bg-emerald-950 text-emerald-300 border-emerald-800 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-800"
          }`}>
            {isActive ? "ACTIVE STEP" : "STEP 05"}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-white font-sans mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Incident Resolved</span>
        </h3>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3.5">
          Fire suppressed, 46 occupants evacuated safely, and digital incident dossier generated for municipal audit.
        </p>

        {/* Resolution Checklist & Dossier Metrics */}
        <div className="rounded-lg bg-[#06080e] border border-slate-800 p-2.5 space-y-2 font-mono text-[10px]">
          {/* Operations Milestones Completed */}
          <div className="space-y-1 pb-1.5 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ARRIVED & SUPPRESSED
              </span>
              <span className="text-emerald-400 font-bold">✓ DONE</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                46 RESCUES COMPLETED
              </span>
              <span className="text-emerald-400 font-bold">✓ 100%</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                INCIDENT CLOSED
              </span>
              <span className="text-emerald-400 font-bold">✓ 15:18:00</span>
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="grid grid-cols-3 gap-1.5 text-[9px] pt-0.5">
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">RESP. TIME</span>
              <span className="text-emerald-400 font-bold text-[10px]">05:58 MIN</span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">WATER USED</span>
              <span className="text-cyan-300 font-bold text-[10px]">3,800 L</span>
            </div>
            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800">
              <span className="text-slate-500 block">NFPA AUDIT</span>
              <span className="text-purple-300 font-bold text-[10px]">PASSED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Footer */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500 uppercase">STATUS</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          CASE CLOSED & ARCHIVED
        </span>
      </div>
    </motion.div>
  );
}
