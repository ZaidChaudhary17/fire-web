import * as React from "react";
import { AlertTriangle, Radio, ShieldAlert } from "lucide-react";
import { Incident } from "@/types/incident";

export function BroadcastBanner({ criticalIncidents }: { criticalIncidents: Incident[] }) {
  if (!criticalIncidents || criticalIncidents.length === 0) return null;

  return (
    <div className="bg-[#b91c1c] text-white px-4 py-2 flex items-center justify-between text-xs font-sans shadow-sm border-b border-red-800 relative z-20 overflow-hidden">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 bg-white text-[#b91c1c] px-2 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider shrink-0">
          <Radio className="w-3.5 h-3.5" />
          <span>EOC FLASH ALERT</span>
        </div>

        <div className="truncate flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="font-bold text-white">
            {criticalIncidents.length} CRITICAL ACTIVE:
          </span>
          <span className="text-red-100 truncate font-medium">
            {criticalIncidents.map((inc) => `${inc.incidentNumber} [${inc.location.address}, ${inc.location.ward}]`).join(" • ")}
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px] text-red-100 font-semibold">
        <span className="flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
          VHF CMD: 156.800 MHz (CH-01)
        </span>
      </div>
    </div>
  );
}
