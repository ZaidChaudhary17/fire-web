"use client";

import * as React from "react";
import { Incident } from "@/types/incident";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Truck, 
  ExternalLink,
  ShieldAlert,
  AlertOctagon
} from "lucide-react";
import { formatTimeIST } from "@/lib/utils";

interface EmergencyQueueProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
  onOpenNewDispatch: () => void;
}

export function EmergencyQueue({
  incidents,
  onSelectIncident,
  onOpenNewDispatch,
}: EmergencyQueueProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState("ALL");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [wardFilter, setWardFilter] = React.useState("ALL");

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch =
      inc.incidentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.callerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === "ALL" || inc.severity === severityFilter;
    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? inc.status !== "RESOLVED" && inc.status !== "CLOSED"
        : inc.status === statusFilter;
    const matchesWard = wardFilter === "ALL" || inc.location.ward.includes(wardFilter);

    return matchesSearch && matchesSeverity && matchesStatus && matchesWard;
  });

  return (
    <div className="space-y-4 font-mono">
      {/* Top Filter Bar */}
      <Card className="border-slate-800 bg-[#0e1217]">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search CAD by ID, address, building, caller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-900/90 border-slate-700 text-xs"
              />
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">SEVERITY:</span>
              <Select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-32 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL SEVERITIES</option>
                <option value="CRITICAL">CRITICAL (T1)</option>
                <option value="HIGH">HIGH (T2)</option>
                <option value="MEDIUM">MEDIUM (T3)</option>
                <option value="LOW">LOW (T4)</option>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">STATUS:</span>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-32 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="ACTIVE">ACTIVE ONLY</option>
                <option value="ON_SCENE">ON SCENE</option>
                <option value="DISPATCHED">DISPATCHED</option>
                <option value="EN_ROUTE">EN ROUTE</option>
                <option value="RESOLVED">RESOLVED</option>
              </Select>
            </div>

            {/* Ward Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 text-[11px]">WARD:</span>
              <Select
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                className="w-32 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL WARDS</option>
                <option value="Ward 1">WARD 1 (Mira E)</option>
                <option value="Ward 2">WARD 2 (Mira W)</option>
                <option value="Ward 3">WARD 3 (Bhayandar E)</option>
                <option value="Ward 4">WARD 4 (Bhayandar W)</option>
                <option value="Ward 5">WARD 5 (Kashimira)</option>
                <option value="Ward 6">WARD 6 (Uttan)</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table List */}
      <Card className="border-slate-800 bg-[#0e1217]">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-red-950/80 border border-red-800 text-red-400">
              <Flame className="w-4 h-4" />
            </div>
            <CardTitle className="text-sm uppercase font-mono">
              EMERGENCY QUEUE ({filteredIncidents.length} RECORDS)
            </CardTitle>
          </div>

          <Button
            onClick={onOpenNewDispatch}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-xs font-bold gap-1.5"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>TRANSMIT 101 CAD</span>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">INCIDENT ID & TYPE</th>
                  <th className="p-3">LOCATION & WARD</th>
                  <th className="p-3">ALARM SEVERITY</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">ASSIGNED FLEET</th>
                  <th className="p-3">REPORTED</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      NO MATCHING INCIDENTS FOUND
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((inc) => (
                    <tr
                      key={inc.id}
                      onClick={() => onSelectIncident(inc)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                    >
                      <td className="p-3">
                        <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                          {inc.incidentNumber}
                        </div>
                        <div className="text-[11px] text-slate-400">{inc.type}</div>
                      </td>

                      <td className="p-3">
                        <div className="text-slate-200 truncate max-w-[200px]">
                          {inc.location.address}
                        </div>
                        <div className="text-[10px] text-slate-500">{inc.location.ward}</div>
                      </td>

                      <td className="p-3">
                        <SeverityBadge severity={inc.severity} />
                      </td>

                      <td className="p-3">
                        <StatusBadge status={inc.status} />
                      </td>

                      <td className="p-3">
                        <div className="text-slate-300">
                          {inc.assignedUnits.length > 0 ? (
                            inc.assignedUnits.map((u) => u.callSign).join(", ")
                          ) : (
                            <span className="text-slate-500">None Assigned</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">Lead: {inc.leadStationName.split("-")[1] || inc.leadStationName}</div>
                      </td>

                      <td className="p-3 text-slate-400 text-[11px]">
                        {formatTimeIST(inc.reportedAt)}
                      </td>

                      <td className="p-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-[10px] text-red-400 border-slate-700 hover:bg-slate-800"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          DOSSIER
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
