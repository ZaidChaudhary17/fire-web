"use client";

import * as React from "react";
import { Incident, IncidentSOPItem } from "@/types/incident";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SeverityBadge } from "@/components/shared/SeverityBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  MapPin, 
  Clock, 
  Phone, 
  Users, 
  Truck, 
  Wind, 
  Radio, 
  ShieldAlert, 
  Droplet, 
  CheckSquare, 
  Square,
  FileText,
  AlertOctagon,
  Plus
} from "lucide-react";
import { formatTimeIST } from "@/lib/utils";

interface IncidentDetailModalProps {
  incident: Incident | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateIncident?: (updated: Incident) => void;
}

export function IncidentDetailModal({
  incident,
  open,
  onOpenChange,
  onUpdateIncident,
}: IncidentDetailModalProps) {
  const [activeTab, setActiveTab] = React.useState<"cad" | "units" | "sop" | "timeline">("cad");
  const [newLogNote, setNewLogNote] = React.useState("");

  if (!incident) return null;

  const toggleSOP = (sopId: string) => {
    const updatedChecklist = incident.sopChecklist.map((item) => {
      if (item.id === sopId) {
        return {
          ...item,
          completed: !item.completed,
          completedAt: !item.completed ? new Date().toLocaleTimeString("en-IN", { hour12: false }) : undefined,
          completedBy: !item.completed ? "IC On-Scene" : undefined,
        };
      }
      return item;
    });

    const updatedIncident: Incident = {
      ...incident,
      sopChecklist: updatedChecklist,
    };

    if (onUpdateIncident) onUpdateIncident(updatedIncident);
  };

  const addTimelineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogNote.trim()) return;

    const newEvent = {
      id: `TL-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
      title: "Radio Comm / Tactical Entry",
      description: newLogNote,
      author: "EOC Operator (Dr. Arvind Shinde)",
      type: "RADIO_COMMS" as const,
    };

    const updatedIncident: Incident = {
      ...incident,
      timeline: [newEvent, ...incident.timeline],
    };

    setNewLogNote("");
    if (onUpdateIncident) onUpdateIncident(updatedIncident);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-4xl bg-white text-slate-900 border-slate-200">
        {/* Header */}
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#0a2540]">
                    {incident.incidentNumber}
                  </span>
                  <SeverityBadge severity={incident.severity} />
                  <StatusBadge status={incident.status} />
                </div>
                <h3 className="text-xs font-semibold text-slate-600 mt-0.5">
                  {incident.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <Radio className="w-3.5 h-3.5 text-blue-700" />
                <span>VHF: {incident.radioChannel}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("cad")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "cad"
                ? "bg-[#0a2540] text-white font-bold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            CAD Overview & Tactical
          </button>
          <button
            onClick={() => setActiveTab("units")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "units"
                ? "bg-[#0a2540] text-white font-bold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Assigned Apparatus ({incident.assignedUnits.length})
          </button>
          <button
            onClick={() => setActiveTab("sop")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "sop"
                ? "bg-[#0a2540] text-white font-bold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Incident SOP ({incident.sopChecklist.filter((s) => s.completed).length}/{incident.sopChecklist.length})
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === "timeline"
                ? "bg-[#0a2540] text-white font-bold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Radio Log ({incident.timeline.length})
          </button>
        </div>

        {/* TAB 1: CAD Overview */}
        {activeTab === "cad" && (
          <div className="space-y-4 text-xs">
            {/* 4-stat quick telemetry */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">People Evacuated</span>
                <div className="text-xl font-bold text-emerald-700 mt-1">
                  {incident.peopleEvacuated} <span className="text-xs text-slate-500 font-normal">Civilians</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Structures at Risk</span>
                <div className="text-xl font-bold text-amber-700 mt-1">
                  {incident.structuresAtRisk} <span className="text-xs text-slate-500 font-normal">Adjacent</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Water Supply Status</span>
                <div className="text-xs font-bold text-sky-800 mt-1 flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  {incident.waterSupplyStatus.replace("_", " ")}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Weather / Wind</span>
                <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-blue-600" />
                  {incident.windSpeedKmh} km/h • {incident.windDirection}
                </div>
              </div>
            </div>

            {/* Location & Caller details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="text-[#0a2540] font-bold flex items-center gap-1.5 text-xs">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Geographic Location</span>
                </div>
                <div className="space-y-1 text-slate-700">
                  <p><span className="font-semibold text-slate-900">Address:</span> {incident.location.address}</p>
                  <p><span className="font-semibold text-slate-900">Landmark:</span> {incident.location.landmark}</p>
                  <p><span className="font-semibold text-slate-900">Ward:</span> {incident.location.ward}</p>
                  <p><span className="font-semibold text-slate-900">GPS:</span> {incident.location.lat.toFixed(4)}°N, {incident.location.lng.toFixed(4)}°E ({incident.location.gridRef})</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                <div className="text-[#0a2540] font-bold flex items-center gap-1.5 text-xs">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Emergency 101 Caller Log</span>
                </div>
                <div className="space-y-1 text-slate-700">
                  <p><span className="font-semibold text-slate-900">Caller:</span> {incident.callerName}</p>
                  <p><span className="font-semibold text-slate-900">Contact:</span> {incident.callerPhone}</p>
                  <p><span className="font-semibold text-slate-900">Reported:</span> {formatTimeIST(incident.reportedAt)}</p>
                  <p><span className="font-semibold text-slate-900">Lead Station:</span> {incident.leadStationName}</p>
                </div>
              </div>
            </div>

            {/* Hazmat / Chemical Warning */}
            {incident.hazmatPresent && (
              <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-xl text-purple-950 space-y-1">
                <div className="flex items-center gap-2 font-bold text-purple-900 text-xs">
                  <AlertOctagon className="w-4 h-4 text-purple-600 animate-pulse" />
                  <span>Hazmat Level 3: {incident.hazmatDetails}</span>
                </div>
                <p className="text-[11px] text-purple-800 leading-relaxed">
                  Emergency Action: Enforce 200m Hot Zone, deploy alcohol-resistant foam, avoid standard water spray on bulk solvent drums.
                </p>
              </div>
            )}

            {/* CAD Operator Notes */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">CAD Operational Narrative</span>
              <p className="text-slate-800 mt-1 leading-relaxed">{incident.cadNotes}</p>
            </div>
          </div>
        )}

        {/* TAB 2: Assigned Apparatus */}
        {activeTab === "units" && (
          <div className="space-y-3 text-xs">
            {incident.assignedUnits.length === 0 ? (
              <div className="text-center py-8 text-slate-500 font-medium">
                No apparatus units currently assigned.
              </div>
            ) : (
              incident.assignedUnits.map((unit) => (
                <div
                  key={unit.unitId}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0a2540] text-sm">
                          {unit.callSign}
                        </span>
                        <span className="text-slate-500 font-medium">({unit.unitId})</span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        {unit.type} • {unit.stationName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px]">
                    <div>
                      <span className="text-slate-500 font-medium">Commander:</span>
                      <div className="font-semibold text-slate-900">{unit.commander}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Crew:</span>
                      <div className="font-bold text-emerald-700">{unit.crewCount} Firefighters</div>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Dispatched:</span>
                      <div className="font-semibold text-slate-900">{unit.dispatchedAt}</div>
                    </div>
                    <StatusBadge status={unit.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SOP Checklist */}
        {activeTab === "sop" && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium border-b border-slate-100 pb-2">
              <span>Standard Operating Procedure (SOP) Protocol: ICS-MBMC-2026</span>
              <span className="text-red-700 font-bold">Mandatory Verification</span>
            </div>

            <div className="space-y-2">
              {incident.sopChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSOP(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    item.completed
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                      : "bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className={item.completed ? "line-through text-slate-500 font-medium" : "font-semibold text-slate-900"}>
                      {item.task}
                    </span>
                  </div>

                  {item.completed && item.completedAt && (
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      Completed at {item.completedAt} by {item.completedBy}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Timeline & Radio Log */}
        {activeTab === "timeline" && (
          <div className="space-y-4 text-xs">
            {/* Add Log Form */}
            <form onSubmit={addTimelineEvent} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter tactical VHF radio note or size-up update..."
                value={newLogNote}
                onChange={(e) => setNewLogNote(e.target.value)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a2540]"
              />
              <Button type="submit" size="sm" className="bg-[#0a2540] hover:bg-slate-800 text-white font-bold gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>Transmit Log</span>
              </Button>
            </form>

            {/* Log Stream */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {incident.timeline.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-bold text-red-600">{event.timestamp}</span>
                    <span className="text-slate-500 font-medium">{event.author}</span>
                  </div>
                  <div className="font-bold text-slate-900">{event.title}</div>
                  <div className="text-slate-600">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
