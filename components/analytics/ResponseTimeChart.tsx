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
    <Card className="border-slate-800 bg-[#0e1217] font-mono">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-blue-950/80 border border-blue-800 text-blue-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm uppercase">
              CAD RESPONSE TIME BENCHMARK (TURNOUT + TRAVEL)
            </CardTitle>
            <p className="text-[11px] text-slate-400">
              Target Standard: Under 7.0 minutes (NFPA 1710 / MBMC Guideline)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
            AVG: 5.8 MIN (COMPLIANT)
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="timeSlot" stroke="#9ca3af" fontSize={11} />
              <YAxis
                stroke="#9ca3af"
                fontSize={11}
                unit="m"
                domain={[0, 9]}
              />
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
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              />
              <ReferenceLine
                y={7.0}
                label={{ value: "7.0m Mandate", fill: "#ef4444", fontSize: 10, position: "top" }}
                stroke="#ef4444"
                strokeDasharray="4 4"
              />
              <Bar
                dataKey="totalMinutes"
                name="Total Response Time (min)"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="benchmarkGoalMinutes"
                name="Benchmark Ceiling (7.0m)"
                stroke="#ef4444"
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
