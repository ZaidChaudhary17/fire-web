import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldAlert, AlertOctagon, Flame, AlertTriangle, Info } from "lucide-react";

export function TriageMatrix() {
  return (
    <Card className="border-slate-800 bg-[#0e1217] font-mono text-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm uppercase">
            MUNICIPAL CAD EMERGENCY TRIAGE PROTOCOL (MBMC-ICS-STD)
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tier 1 */}
          <div className="bg-red-950/20 border border-red-900/60 p-3 rounded-lg space-y-1.5">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px]">
              <AlertOctagon className="w-4 h-4" />
              <span>TIER 1 • CRITICAL (1ST ALARM)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              High-Rise (Above 7th floor), Chemical Hazmat, Confined Space Trapping, Hospital/School structure.
            </p>
            <div className="text-[10px] text-red-300 font-semibold pt-1 border-t border-red-900/40">
              Dispatch: 1 Heavy Pumper + 1 Bronto 55m Ladder + 1 ALS Medic (Turnout &lt; 60s)
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-orange-950/20 border border-orange-900/60 p-3 rounded-lg space-y-1.5">
            <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[11px]">
              <Flame className="w-4 h-4" />
              <span>TIER 2 • HIGH (2ND ALARM)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Commercial Plaza, Industrial Warehouse, Large Fuel Spill on Highway, Multiple Structures.
            </p>
            <div className="text-[10px] text-orange-300 font-semibold pt-1 border-t border-orange-900/40">
              Dispatch: 1 Multi-Purpose Pumper + 1 QRV (Turnout &lt; 90s)
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-amber-950/20 border border-amber-900/60 p-3 rounded-lg space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
              <AlertTriangle className="w-4 h-4" />
              <span>TIER 3 • MEDIUM (3RD ALARM)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Residential Ground Floor, Electrical Transformer Box, Solitary Vehicle Fire.
            </p>
            <div className="text-[10px] text-amber-300 font-semibold pt-1 border-t border-amber-900/40">
              Dispatch: 1 Quick Response Vehicle (Turnout &lt; 120s)
            </div>
          </div>

          {/* Tier 4 */}
          <div className="bg-blue-950/20 border border-blue-900/60 p-3 rounded-lg space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-400 font-bold text-[11px]">
              <Info className="w-4 h-4" />
              <span>TIER 4 • LOW / ADVISORY</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Open Plot Bush Fire, Lift Malfunction without Smoke, Tree Fall Obstruction, Water Salvage.
            </p>
            <div className="text-[10px] text-blue-300 font-semibold pt-1 border-t border-blue-900/40">
              Dispatch: 1 Rescue Tender / Utility Crew (Turnout &lt; 180s)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
