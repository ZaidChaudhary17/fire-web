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
    <Card className="flex flex-col h-full border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-100 border border-red-200 text-red-600">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-[#0a2540] uppercase font-sans">
              LIVE CAD INCIDENT FEED
            </CardTitle>
            <p className="text-xs text-slate-500">
              Active turnouts & prioritized triage calls
            </p>
          </div>
        </div>

        {/* Severity Filter pills */}
        <div className="flex items-center gap-1 text-xs">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterSeverity(lvl)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                filterSeverity === lvl
                  ? "bg-[#0a2540] text-white"
                  : "text-slate-600 hover:text-slate-900 bg-slate-100"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-2.5 p-4 max-h-[480px]">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-500 font-medium">
            NO INCIDENTS MATCHING SEVERITY FILTER
          </div>
        ) : (
          filtered.map((inc) => (
            <div
              key={inc.id}
              onClick={() => onSelectIncident(inc)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                inc.severity === "CRITICAL"
                  ? "bg-red-50/50 border-red-200 hover:border-red-400 shadow-sm"
                  : inc.severity === "HIGH"
                  ? "bg-amber-50/50 border-amber-200 hover:border-amber-400 shadow-sm"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              {/* Header: Incident number, Severity & Status */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0a2540] group-hover:text-red-600 transition-colors">
                    {inc.incidentNumber}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-600">{inc.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={inc.severity} />
                  <StatusBadge status={inc.status} />
                </div>
              </div>

              {/* Title & Description */}
              <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mb-1 font-sans">
                {inc.title}
              </h4>

              {/* Location & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600 mb-2">
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span className="truncate">{inc.location.address}, {inc.location.ward}</span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Reported: {formatTimeIST(inc.reportedAt)}</span>
                </div>
              </div>

              {/* Assigned Apparatus Units & Lead Station */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
                <div className="flex items-center gap-1 text-slate-600">
                  <Truck className="w-3.5 h-3.5 text-[#0a2540]" />
                  <span>
                    Units Assigned ({inc.assignedUnits.length}):{" "}
                    <span className="text-[#0a2540] font-bold">
                      {inc.assignedUnits.map((u) => u.callSign).join(", ") || "Awaiting Dispatch"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-red-600 font-bold group-hover:underline">
                  <span>VIEW CAD DOSSIER</span>
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
