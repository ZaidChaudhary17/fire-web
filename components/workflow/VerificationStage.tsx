"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  ShieldCheck, 
  CheckCircle2, 
  UserCheck, 
  Radio, 
  Clock,
  Layers
} from "lucide-react";

interface VerificationStageProps {
  isActive: boolean;
  onSelect: () => void;
}

export function VerificationStage({ isActive, onSelect }: VerificationStageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`group relative rounded-xl border p-4 sm:p-5 flex flex-col justify-between transition-all cursor-pointer select-none shadow-xl ${
        isActive
          ? "bg-gradient-to-b from-[#111420] via-[#0c0f1a] to-[#070912] border-blue-500/80 ring-2 ring-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.25)]"
          : "bg-gradient-to-b from-[#0c0f17] to-[#07090f] border-slate-800/80 hover:border-slate-700"
      }`}
    >
      {/* Top Stage Identification */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded text-xs font-mono font-bold ${
              isActive ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "bg-slate-800 text-slate-300"
            }`}>
              02
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              CONTROL ROOM EOC
            </span>
          </div>

          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${
            isActive ? "bg-blue-950 text-blue-300 border-blue-800 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-800"
          }`}>
            {isActive ? "ACTIVE STEP" : "STEP 02"}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-white font-sans mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Verify Incident</span>
        </h3>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed mb-3.5">
          CAD dispatch officer validates caller authenticity, classifies triage severity, and verifies geo-boundaries.
        </p>

        {/* Control Room Checklist Interface */}
        <div className="rounded-lg bg-[#06080e] border border-slate-800 p-2.5 space-y-2 font-mono text-[10px]">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 text-[11px]">
            <span className="text-slate-500 font-bold">CAD ID:</span>
            <span className="text-cyan-300 font-bold">INC-2026-00421</span>
          </div>

          {/* Sequential Operator Verification Checks */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                CALLER VERIFIED
              </span>
              <span className="text-emerald-400 font-bold">✓ PASS</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                LOCATION CONFIRMED
              </span>
              <span className="text-emerald-400 font-bold">✓ WARD 3</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                INCIDENT PRIORITIZED
              </span>
              <span className="text-red-400 font-bold">✓ 101 CAD</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[9px] text-slate-400">
            <span>OFFICER ID: MBMC-OP-12</span>
            <span className="text-slate-500">14:32:45 IST</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Footer */}
      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
        <span className="text-slate-500 uppercase">STATUS</span>
        <span className="text-blue-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          VERIFIED & APPROVED
        </span>
      </div>
    </motion.div>
  );
}
