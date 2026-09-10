import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_WARD_METRICS } from "@/lib/mock-data";
import { MapPin, ShieldAlert, Droplet, Clock } from "lucide-react";

export function WardPerformanceTable() {
  return (
    <Card className="border-slate-800 bg-[#0e1217] font-mono">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-amber-950/80 border border-amber-800 text-amber-400">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm uppercase">
              MUNICIPAL WARD RISK INDEX & HYDRANT DENSITY
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Comparative 30-day response analysis by administrative ward
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">WARD JURISDICTION</th>
                <th className="p-3">PRIMARY STATION</th>
                <th className="p-3">30D CALLS</th>
                <th className="p-3">AVG RESPONSE</th>
                <th className="p-3">HYDRANTS</th>
                <th className="p-3 text-right">RISK SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_WARD_METRICS.map((ward) => {
                const isHighRisk = ward.riskScore >= 75;
                const isMedRisk = ward.riskScore >= 50 && ward.riskScore < 75;

                return (
                  <tr key={ward.wardId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white">
                      {ward.wardName}
                    </td>
                    <td className="p-3 text-slate-400">
                      {ward.primaryStation.replace("Station ", "Stn ")}
                    </td>
                    <td className="p-3 text-slate-200 font-bold">
                      {ward.totalIncidents30d} Calls
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">
                      {ward.avgResponseMinutes} min
                    </td>
                    <td className="p-3 text-cyan-400">
                      {ward.activeHydrants} Active
                    </td>
                    <td className="p-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          isHighRisk
                            ? "bg-red-950 text-red-300 border-red-800"
                            : isMedRisk
                            ? "bg-amber-950 text-amber-300 border-amber-800"
                            : "bg-emerald-950 text-emerald-300 border-emerald-800"
                        }`}
                      >
                        {ward.riskScore}/100 {isHighRisk ? "HIGH RISK" : isMedRisk ? "MODERATE" : "LOW"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
