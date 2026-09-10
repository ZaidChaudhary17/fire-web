import * as React from "react";
import Link from "next/link";
import { Flame, ShieldCheck, Lock } from "lucide-react";

export function MunicipalHeroHeader() {
  return (
    <header className="w-full border-b border-slate-800/80 bg-[#07090c]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs font-mono relative z-30 select-none">
      {/* Left: Official Municipal Identification */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-red-600 text-white shadow-lg shadow-red-950/60 border border-red-500/40">
          <Flame className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-100 tracking-wider text-xs uppercase leading-tight font-sans">
            MIRA-BHAYANDAR MUNICIPAL CORPORATION
          </span>
          <span className="text-[10px] text-slate-400 tracking-wide font-mono uppercase">
            DIRECTORATE OF FIRE & EMERGENCY SERVICES
          </span>
        </div>
      </div>

      {/* Right: Restrained Government Status & Operator Login */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300">
          <span className="text-slate-500">SYSTEM STATUS:</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            OPERATIONS ONLINE
          </span>
        </div>

        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 rounded border border-slate-700/90 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition font-medium tracking-wide"
        >
          <Lock className="h-3.5 w-3.5 text-slate-400" />
          <span>OFFICER LOGIN</span>
        </Link>
      </div>
    </header>
  );
}
