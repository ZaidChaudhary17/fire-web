import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Incident } from "@/types/incident";
import { Flame, ShieldAlert, AlertTriangle, AlertOctagon, CheckCircle2 } from "lucide-react";

export function IncidentSeverityGauge({ incidents }: { incidents: Incident[] }) {
  const activeIncidents = incidents.filter((i) => i.status !== "RESOLVED");

  const criticalCount = activeIncidents.filter((i) => i.severity === "CRITICAL").length;
  const highCount = activeIncidents.filter((i) => i.severity === "HIGH").length;
  const mediumCount = activeIncidents.filter((i) => i.severity === "MEDIUM").length;
  const lowCount = activeIncidents.filter((i) => i.severity === "LOW" || i.severity === "ADVISORY").length;
  const resolvedCount = incidents.filter((i) => i.status === "RESOLVED").length;

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-bold text-[#0a2540] uppercase tracking-wide">
            Active Triage Severity Distribution
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-xs">
        {/* Tier 1 Critical */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-bold text-red-950">Tier 1 • Critical (1st Alarm)</div>
              <div className="text-[11px] text-red-700">Immediate Life Safety & High-Rise Multi-Apparatus</div>
            </div>
          </div>
          <div className="text-xl font-bold text-red-700">{criticalCount}</div>
        </div>

        {/* Tier 2 High */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-amber-600" />
            <div>
              <div className="font-bold text-amber-950">Tier 2 • High (2nd Alarm)</div>
              <div className="text-[11px] text-amber-700">Commercial / Structural Escalation</div>
            </div>
          </div>
          <div className="text-xl font-bold text-amber-700">{highCount}</div>
        </div>

        {/* Tier 3 Medium */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-bold text-blue-950">Tier 3 • Medium (3rd Alarm)</div>
              <div className="text-[11px] text-blue-700">Electrical / Controlled Fireground</div>
            </div>
          </div>
          <div className="text-xl font-bold text-blue-700">{mediumCount}</div>
        </div>

        {/* 24h Resolved */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="font-bold text-emerald-950">Resolved in Past 24 Hours</div>
              <div className="text-[11px] text-emerald-700">All personnel & units demobilized</div>
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-700">{resolvedCount}</div>
        </div>
      </CardContent>
    </Card>
  );
}
