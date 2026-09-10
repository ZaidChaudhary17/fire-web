"use client";

import * as React from "react";
import { Clock, CheckCircle2, Flame, Truck, ShieldCheck, Siren } from "lucide-react";

export function WorkflowMetricStrip() {
  return (
    <div className="w-full rounded-xl border border-slate-800/80 bg-[#070a0f] p-4 font-mono text-xs text-slate-300 shadow-xl select-none">
      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2.5 flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="flex items-center gap-1.5 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          INC-2026-00421 END-TO-END TIMELINE LOG
        </span>
        <span className="text-emerald-400 font-bold">TOTAL DURATION: 45m 52s</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-[11px]">
        {/* Milestone 1 */}
        <div className="bg-[#05070c] p-2 rounded border border-slate-800/80">
          <div className="text-[9px] text-slate-500 flex items-center gap-1">
            <Siren className="w-2.5 h-2.5 text-red-400" />
            01 • RECEIVED
          </div>
          <div className="text-white font-bold text-xs mt-0.5">14:32:08 IST</div>
          <div className="text-[9px] text-slate-400">Citizen 101 Call</div>
        </div>

        {/* Milestone 2 */}
        <div className="bg-[#05070c] p-2 rounded border border-slate-800/80">
          <div className="text-[9px] text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-blue-400" />
            02 • VERIFIED
          </div>
          <div className="text-white font-bold text-xs mt-0.5">14:32:45 IST</div>
          <div className="text-[9px] text-slate-400">Triage: Critical L-3</div>
        </div>

        {/* Milestone 3 */}
        <div className="bg-[#05070c] p-2 rounded border border-slate-800/80">
          <div className="text-[9px] text-slate-500 flex items-center gap-1">
            <Truck className="w-2.5 h-2.5 text-amber-400" />
            03 • DISPATCHED
          </div>
          <div className="text-white font-bold text-xs mt-0.5">14:33:10 IST</div>
          <div className="text-[9px] text-slate-400">Station 02 Klaxon</div>
        </div>

        {/* Milestone 4 */}
        <div className="bg-[#05070c] p-2 rounded border border-slate-800/80">
          <div className="text-[9px] text-slate-500 flex items-center gap-1">
            <Flame className="w-2.5 h-2.5 text-orange-400" />
            04 • ON-SCENE
          </div>
          <div className="text-white font-bold text-xs mt-0.5">14:37:22 IST</div>
          <div className="text-[9px] text-emerald-400">04:12m Turnout Time</div>
        </div>

        {/* Milestone 5 */}
        <div className="bg-[#05070c] p-2 rounded border border-slate-800/80 col-span-2 sm:col-span-1">
          <div className="text-[9px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            05 • CLOSED
          </div>
          <div className="text-white font-bold text-xs mt-0.5">15:18:00 IST</div>
          <div className="text-[9px] text-emerald-400">Audit Dossier Sealed</div>
        </div>
      </div>
    </div>
  );
}
