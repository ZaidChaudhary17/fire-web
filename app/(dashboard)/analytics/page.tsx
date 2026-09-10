"use client";

import * as React from "react";
import { ResponseTimeChart } from "@/components/analytics/ResponseTimeChart";
import { IncidentTrendsChart } from "@/components/analytics/IncidentTrendsChart";
import { WardPerformanceTable } from "@/components/analytics/WardPerformanceTable";
import { BarChart3, Clock, Flame, ShieldAlert, Award } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-4 font-mono">
      {/* Top Headline Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>AVERAGE RESPONSE TIME</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            5.8 Minutes
          </div>
          <p className="text-[10px] text-slate-500">1.2m below 7-min ceiling</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>30-DAY CALLOUTS</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">
            142 Incidents
          </div>
          <p className="text-[10px] text-slate-500">Across 6 Municipal Wards</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>HIGHEST RISK ZONE</span>
          </div>
          <div className="text-xl font-bold text-amber-400 mt-1">
            Ward 3 (MIDC)
          </div>
          <p className="text-[10px] text-slate-500">Hazard score 89/100</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMPLIANCE RATING</span>
          </div>
          <div className="text-xl font-bold text-cyan-400 mt-1">
            97.4%
          </div>
          <p className="text-[10px] text-slate-500">SOP & NFPA 1710 verified</p>
        </div>
      </div>

      {/* 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ResponseTimeChart />
        <IncidentTrendsChart />
      </div>

      {/* Ward Performance Table */}
      <WardPerformanceTable />
    </div>
  );
}
