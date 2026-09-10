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
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search CAD by ID, address, building, caller..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white text-xs h-9"
              />
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold text-xs">Severity:</span>
              <Select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-36 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">Critical (T1)</option>
                <option value="HIGH">High (T2)</option>
                <option value="MEDIUM">Medium (T3)</option>
                <option value="LOW">Low (T4)</option>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold text-xs">Status:</span>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-36 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active Only</option>
                <option value="ON_SCENE">On Scene</option>
                <option value="DISPATCHED">Dispatched</option>
                <option value="EN_ROUTE">En Route</option>
                <option value="RESOLVED">Resolved</option>
              </Select>
            </div>

            {/* Ward Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-semibold text-xs">Ward:</span>
              <Select
                value={wardFilter}
                onChange={(e) => setWardFilter(e.target.value)}
                className="w-40 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Municipal Wards</option>
                <option value="Ward 1">Ward 1 (Mira E)</option>
                <option value="Ward 2">Ward 2 (Mira W)</option>
                <option value="Ward 3">Ward 3 (Bhayandar E)</option>
                <option value="Ward 4">Ward 4 (Bhayandar W)</option>
                <option value="Ward 5">Ward 5 (Kashimira)</option>
                <option value="Ward 6">Ward 6 (Uttan)</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table List */}
      <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100 mb-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600">
              <Flame className="w-4 h-4" />
            </div>
            <CardTitle className="text-sm uppercase font-bold text-[#0a2540] tracking-wide">
              Emergency Queue ({filteredIncidents.length} Records)
            </CardTitle>
          </div>

          <Button
            onClick={onOpenNewDispatch}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold gap-1.5 shadow-sm"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Transmit 101 CAD</span>
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold tracking-wider text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Incident ID & Type</th>
                  <th className="p-3.5">Location & Ward</th>
                  <th className="p-3.5">Alarm Severity</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Assigned Fleet</th>
                  <th className="p-3.5">Reported</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredIncidents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                      No matching emergency incidents found.
                    </td>
                  </tr>
                ) : (
                  filteredIncidents.map((inc) => (
                    <tr
                      key={inc.id}
                      onClick={() => onSelectIncident(inc)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                    >
                      <td className="p-3.5">
                        <div className="font-bold text-[#0a2540] group-hover:text-blue-700 transition-colors">
                          {inc.incidentNumber}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">{inc.type}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="text-slate-900 font-medium truncate max-w-[200px]">
                          {inc.location.address}
                        </div>
                        <div className="text-[11px] text-slate-500">{inc.location.ward}</div>
                      </td>

                      <td className="p-3.5">
                        <SeverityBadge severity={inc.severity} />
                      </td>

                      <td className="p-3.5">
                        <StatusBadge status={inc.status} />
                      </td>

                      <td className="p-3.5">
                        <div className="text-slate-800 font-semibold">
                          {inc.assignedUnits.length > 0 ? (
                            inc.assignedUnits.map((u) => u.callSign).join(", ")
                          ) : (
                            <span className="text-slate-400 font-normal">None Assigned</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">Lead: {inc.leadStationName.split("-")[1] || inc.leadStationName}</div>
                      </td>

                      <td className="p-3.5 text-slate-600 font-medium text-[11px]">
                        {formatTimeIST(inc.reportedAt)}
                      </td>

                      <td className="p-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-[11px] font-semibold text-blue-700 border-slate-300 hover:bg-blue-50"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Details
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
