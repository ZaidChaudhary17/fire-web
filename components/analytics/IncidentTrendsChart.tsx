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
import { Flame, PieChart as PieIcon } from "lucide-react";

export function IncidentTrendsChart() {
  return (
    <Card className="border-slate-800 bg-[#0e1217] font-mono">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-400">
            <PieIcon className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm uppercase">
              30-DAY INCIDENT CLASSIFICATION BREAKDOWN
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              142 total emergency callouts categorized across Mira-Bhayandar
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
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
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#090d12" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#090d12",
                  borderColor: "#374151",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontFamily: "monospace",
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
