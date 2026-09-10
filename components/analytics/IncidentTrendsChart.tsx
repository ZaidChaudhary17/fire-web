"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { MOCK_INCIDENT_TYPE_DISTRIBUTION } from "@/lib/mock-data";
import { PieChart as PieIcon } from "lucide-react";

export function IncidentTrendsChart() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <PieIcon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              30-Day Incident Classification Breakdown
            </CardTitle>
            <p className="text-[11px] text-slate-500 font-medium">
              142 total emergency callouts categorized across Mira-Bhayandar
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_INCIDENT_TYPE_DISTRIBUTION}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="count"
                nameKey="type"
              >
                {MOCK_INCIDENT_TYPE_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#cbd5e1",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
