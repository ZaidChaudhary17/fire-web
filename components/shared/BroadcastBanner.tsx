import * as React from "react";
import { AlertTriangle, Radio, ShieldAlert } from "lucide-react";
import { Incident } from "@/types/incident";

export function BroadcastBanner({ criticalIncidents }: { criticalIncidents: Incident[] }) {
  if (!criticalIncidents || criticalIncidents.length === 0) return null;

  return (
    <div className="bg-red-950/90 border-y border-red-600/70 text-red-200 px-4 py-2 flex items-center justify-between text-xs font-mono shadow-[0_0_15px_rgba(239,68,68,0.25)] relative z-20 overflow-hidden">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider shrink-0 animate-pulse">
          <Radio className="w-3 h-3" />
          <span>EOC FLASH ALERT</span>
        </div>

        <div className="truncate flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span className="font-semibold text-white">
            {criticalIncidents.length} CRITICAL ACTIVE:
          </span>
          <span className="text-red-300 truncate">
            {criticalIncidents.map((inc) => `${inc.incidentNumber} [${inc.location.address}, ${inc.location.ward}]`).join(" • ")}
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px] text-red-300">
        <span className="flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          VHF CMD: 156.800 MHz (CH-01)
        </span>
      </div>
    </div>
  );
}
