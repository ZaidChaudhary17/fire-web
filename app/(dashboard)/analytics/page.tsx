"use client";

import * as React from "react";
import { ResponseTimeChart } from "@/components/analytics/ResponseTimeChart";
import { IncidentTrendsChart } from "@/components/analytics/IncidentTrendsChart";
import { WardPerformanceTable } from "@/components/analytics/WardPerformanceTable";
import { Clock, Flame, ShieldAlert, Award } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      {/* Top Headline Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Average Response Time</span>
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            5.8 Minutes
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">1.2m below 7-min ceiling</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-red-600" />
            <span>30-Day Callouts</span>
          </div>
          <div className="text-2xl font-bold text-[#0a2540] mt-1">
            142 Incidents
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Across 6 Municipal Wards</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Highest Risk Zone</span>
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1">
            Ward 3 (MIDC)
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Hazard score 89/100</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Award className="w-4 h-4 text-blue-700" />
            <span>Compliance Rating</span>
          </div>
          <div className="text-2xl font-bold text-blue-900 mt-1">
            97.4%
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">SOP & NFPA 1710 verified</p>
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
