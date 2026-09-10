import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_WARD_METRICS } from "@/lib/mock-data";
import { MapPin, ShieldAlert, Droplet, Clock } from "lucide-react";

export function WardPerformanceTable() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              Municipal Ward Risk Index & Hydrant Density
            </CardTitle>
            <p className="text-[11px] text-slate-500 font-medium">
              Comparative 30-day response analysis by administrative ward
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold tracking-wider text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3.5">Ward Jurisdiction</th>
                <th className="p-3.5">Primary Station</th>
                <th className="p-3.5">30D Calls</th>
                <th className="p-3.5">Avg Response</th>
                <th className="p-3.5">Hydrants</th>
                <th className="p-3.5 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_WARD_METRICS.map((ward) => {
                const isHighRisk = ward.riskScore >= 75;
                const isMedRisk = ward.riskScore >= 50 && ward.riskScore < 75;

                return (
                  <tr key={ward.wardId} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3.5 font-bold text-[#0a2540]">
                      {ward.wardName}
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">
                      {ward.primaryStation.replace("Station ", "Stn ")}
                    </td>
                    <td className="p-3.5 text-slate-900 font-bold">
                      {ward.totalIncidents30d} Calls
                    </td>
                    <td className="p-3.5 text-emerald-800 font-bold">
                      {ward.avgResponseMinutes} min
                    </td>
                    <td className="p-3.5 text-sky-900 font-semibold">
                      {ward.activeHydrants} Active
                    </td>
                    <td className="p-3.5 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isHighRisk
                            ? "bg-red-50 text-red-700 border-red-200"
                            : isMedRisk
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {ward.riskScore}/100 {isHighRisk ? "High Risk" : isMedRisk ? "Moderate" : "Low"}
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
