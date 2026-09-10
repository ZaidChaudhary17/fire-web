import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldAlert, AlertOctagon, Flame, AlertTriangle, Info } from "lucide-react";

export function TriageMatrix() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm text-xs">
      <CardHeader className="pb-3 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
            Municipal CAD Emergency Triage Protocol (MBMC-ICS-STD)
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tier 1 */}
          <div className="bg-red-50/60 border border-red-200 p-3.5 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-red-700 font-bold text-xs">
              <AlertOctagon className="w-4 h-4" />
              <span>Tier 1 • Critical (1st Alarm)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              High-Rise (Above 7th floor), Chemical Hazmat, Confined Space Trapping, Hospital/School structure.
            </p>
            <div className="text-[11px] text-red-900 font-semibold pt-2 border-t border-red-200">
              Dispatch: 1 Heavy Pumper + 1 Bronto 55m Ladder + 1 ALS Medic (Turnout &lt; 60s)
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs">
              <Flame className="w-4 h-4" />
              <span>Tier 2 • High (2nd Alarm)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Commercial Plaza, Industrial Warehouse, Large Fuel Spill on Highway, Multiple Structures.
            </p>
            <div className="text-[11px] text-amber-900 font-semibold pt-2 border-t border-amber-200">
              Dispatch: 1 Multi-Purpose Pumper + 1 QRV (Turnout &lt; 90s)
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-blue-50/60 border border-blue-200 p-3.5 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Tier 3 • Medium (3rd Alarm)</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Residential Ground Floor, Electrical Transformer Box, Solitary Vehicle Fire.
            </p>
            <div className="text-[11px] text-blue-900 font-semibold pt-2 border-t border-blue-200">
              Dispatch: 1 Quick Response Vehicle (Turnout &lt; 120s)
            </div>
          </div>

          {/* Tier 4 */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs">
              <Info className="w-4 h-4" />
              <span>Tier 4 • Low / Advisory</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Open Plot Bush Fire, Lift Malfunction without Smoke, Tree Fall Obstruction, Water Salvage.
            </p>
            <div className="text-[11px] text-slate-900 font-semibold pt-2 border-t border-slate-200">
              Dispatch: 1 Rescue Tender / Utility Crew (Turnout &lt; 180s)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
