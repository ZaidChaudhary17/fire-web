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
    <Card className="border-slate-800 bg-[#0e1217]">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-mono uppercase">
            ACTIVE TRIAGE SEVERITY DISTRIBUTION
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 font-mono text-xs">
        {/* Tier 1 Critical */}
        <div className="flex items-center justify-between p-2.5 rounded bg-red-950/30 border border-red-900/60">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />
            <div>
              <div className="font-bold text-red-300">TIER 1 • CRITICAL (1ST ALARM)</div>
              <div className="text-[10px] text-red-400/80">Immediate Life Safety & High-Rise Multi-Apparatus</div>
            </div>
          </div>
          <div className="text-xl font-bold text-red-400">{criticalCount}</div>
        </div>

        {/* Tier 2 High */}
        <div className="flex items-center justify-between p-2.5 rounded bg-orange-950/30 border border-orange-900/60">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <div>
              <div className="font-bold text-orange-300">TIER 2 • HIGH (2ND ALARM)</div>
              <div className="text-[10px] text-orange-400/80">Commercial / Structural Escalation</div>
            </div>
          </div>
          <div className="text-xl font-bold text-orange-400">{highCount}</div>
        </div>

        {/* Tier 3 Medium */}
        <div className="flex items-center justify-between p-2.5 rounded bg-amber-950/30 border border-amber-900/60">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <div>
              <div className="font-bold text-amber-300">TIER 3 • MEDIUM (3RD ALARM)</div>
              <div className="text-[10px] text-amber-400/80">Electrical / Controlled Fireground</div>
            </div>
          </div>
          <div className="text-xl font-bold text-amber-400">{mediumCount}</div>
        </div>

        {/* 24h Resolved */}
        <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="font-bold text-emerald-300">RESOLVED IN PAST 24 HOURS</div>
              <div className="text-[10px] text-emerald-400/80">All personnel & units demobilized</div>
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-400">{resolvedCount}</div>
        </div>
      </CardContent>
    </Card>
  );
}
