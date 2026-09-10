"use client";

import * as React from "react";
import { Incident } from "@/types/incident";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  MapPin, 
  Clock, 
  Truck, 
  ExternalLink, 
  ShieldAlert,
  Radio,
  Filter
} from "lucide-react";
import { formatTimeIST } from "@/lib/utils";

interface LiveIncidentFeedProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}

export function LiveIncidentFeed({
  incidents,
  onSelectIncident,
}: LiveIncidentFeedProps) {
  const [filterSeverity, setFilterSeverity] = React.useState<string>("ALL");

  const filtered = incidents.filter((inc) => {
    if (filterSeverity === "ALL") return true;
    return inc.severity === filterSeverity;
  });

  return (
    <Card className="flex flex-col h-full border-slate-800 bg-[#0e1217]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-400">
            <Flame className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <CardTitle className="text-sm font-mono uppercase">
              LIVE CAD INCIDENT FEED
            </CardTitle>
            <p className="text-[11px] font-mono text-slate-400">
              Active turnouts & prioritized triage calls
            </p>
          </div>
        </div>

        {/* Severity Filter pills */}
        <div className="flex items-center gap-1 font-mono text-[10px]">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterSeverity(lvl)}
              className={`px-2 py-0.5 rounded transition ${
                filterSeverity === lvl
                  ? "bg-slate-700 text-white font-bold"
                  : "text-slate-500 hover:text-slate-300 bg-slate-900/80"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-2.5 p-4 pt-0 max-h-[480px]">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-xs font-mono text-slate-500">
            NO INCIDENTS MATCHING SEVERITY FILTER
          </div>
        ) : (
          filtered.map((inc) => (
            <div
              key={inc.id}
              onClick={() => onSelectIncident(inc)}
              className={`p-3 rounded-lg border transition-all cursor-pointer group hover:scale-[1.01] ${
                inc.severity === "CRITICAL"
                  ? "bg-red-950/20 border-red-900/60 hover:border-red-500/80"
                  : inc.severity === "HIGH"
                  ? "bg-orange-950/20 border-orange-900/60 hover:border-orange-500/80"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Header: Incident number, Severity & Status */}
              <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white group-hover:text-red-400 transition-colors">
                    {inc.incidentNumber}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[11px] text-slate-400">{inc.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={inc.severity} />
                  <StatusBadge status={inc.status} />
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="text-xs font-semibold text-slate-100 line-clamp-1 mb-1 font-mono">
                {inc.title}
              </h4>

              {/* Location & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono text-slate-400 mb-2">
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                  <span className="truncate">{inc.location.address}, {inc.location.ward}</span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>Reported: {formatTimeIST(inc.reportedAt)}</span>
                </div>
              </div>

              {/* Assigned Apparatus Units & Lead Station */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                <div className="flex items-center gap-1 text-slate-400">
                  <Truck className="w-3 h-3 text-orange-400" />
                  <span>
                    Units Assigned ({inc.assignedUnits.length}):{" "}
                    <span className="text-slate-200 font-medium">
                      {inc.assignedUnits.map((u) => u.callSign).join(", ") || "Awaiting Dispatch"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-red-400 font-semibold group-hover:underline">
                  <span>OPEN CAD</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
