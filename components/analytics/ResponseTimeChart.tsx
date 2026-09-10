"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine, 
  Line, 
  ComposedChart 
} from "recharts";
import { MOCK_RESPONSE_METRICS } from "@/lib/mock-data";
import { Clock, ShieldCheck, Zap } from "lucide-react";

export function ResponseTimeChart() {
  const data = MOCK_RESPONSE_METRICS.map((d) => ({
    timeSlot: d.timeSlot,
    turnoutSeconds: d.turnoutSeconds,
    travelSeconds: d.travelSeconds,
    totalMinutes: parseFloat((d.totalSeconds / 60).toFixed(1)),
    benchmarkGoalMinutes: 7.0,
  }));

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
              CAD Response Time Benchmark (Turnout + Travel)
            </CardTitle>
            <p className="text-[11px] text-slate-500 font-medium">
              Target Standard: Under 7.0 minutes (NFPA 1710 / MBMC Guideline)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            Avg: 5.8 Min (Compliant)
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="timeSlot" stroke="#64748b" fontSize={11} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                unit="m"
                domain={[0, 9]}
              />
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
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              />
              <ReferenceLine
                y={7.0}
                label={{ value: "7.0m Mandate", fill: "#dc2626", fontSize: 11, position: "top" }}
                stroke="#dc2626"
                strokeDasharray="4 4"
              />
              <Bar
                dataKey="totalMinutes"
                name="Total Response Time (min)"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="benchmarkGoalMinutes"
                name="Benchmark Ceiling (7.0m)"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
