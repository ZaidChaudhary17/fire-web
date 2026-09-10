import * as React from "react";
import { Flame, Truck, Clock, Building2, Radio } from "lucide-react";

export function OperationalInfoStrip() {
  return (
    <div className="w-full border-t border-slate-800/80 bg-[#07090c]/95 backdrop-blur-md px-4 sm:px-8 py-3 text-xs font-mono text-slate-300 relative z-30 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6">
        {/* Metric 1: Active Incidents */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            ACTIVE INCIDENTS:
          </span>
          <span className="font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
            07
          </span>
        </div>

        {/* Metric 2: Available Fleet */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-orange-400" />
            AVAILABLE ENGINES:
          </span>
          <span className="font-bold text-white">
            12 <span className="text-slate-500 font-normal">/ 16</span>
          </span>
        </div>

        {/* Metric 3: Avg Response */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            AVG RESPONSE:
          </span>
          <span className="font-bold text-emerald-400">
            08:42 <span className="text-[10px] text-slate-500 font-normal">MIN</span>
          </span>
        </div>

        {/* Metric 4: Stations Online */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            STATIONS ONLINE:
          </span>
          <span className="font-bold text-cyan-300">
            05 <span className="text-slate-500 font-normal">/ 05</span>
          </span>
        </div>

        {/* Metric 5: VHF Channel */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400 text-[11px]">
          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>VHF PRIMARY: <strong className="text-slate-200">156.800 MHz (CH-01)</strong></span>
        </div>
      </div>
    </div>
  );
}
