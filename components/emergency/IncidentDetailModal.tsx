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
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-4xl">
        {/* Header */}
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-red-950 border border-red-800 text-red-400">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-mono text-white">
                    {incident.incidentNumber}
                  </span>
                  <SeverityBadge severity={incident.severity} />
                  <StatusBadge status={incident.status} />
                </div>
                <h3 className="text-xs font-semibold text-slate-300 font-mono mt-0.5">
                  {incident.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                <Radio className="w-3.5 h-3.5 text-red-400" />
                <span>{incident.radioChannel}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab("cad")}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === "cad"
                ? "bg-slate-800 text-white font-bold border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            CAD OVERVIEW & TACTICAL
          </button>
          <button
            onClick={() => setActiveTab("units")}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === "units"
                ? "bg-slate-800 text-white font-bold border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ASSIGNED APPARATUS ({incident.assignedUnits.length})
          </button>
          <button
            onClick={() => setActiveTab("sop")}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === "sop"
                ? "bg-slate-800 text-white font-bold border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            INCIDENT SOP CHECKLIST ({incident.sopChecklist.filter((s) => s.completed).length}/{incident.sopChecklist.length})
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 rounded transition ${
              activeTab === "timeline"
                ? "bg-slate-800 text-white font-bold border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            RADIO LOG & TIMELINE ({incident.timeline.length})
          </button>
        </div>

        {/* TAB 1: CAD Overview */}
        {activeTab === "cad" && (
          <div className="space-y-4 font-mono text-xs">
            {/* 4-stat quick telemetry */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">PEOPLE EVACUATED</span>
                <div className="text-xl font-bold text-emerald-400 mt-1">
                  {incident.peopleEvacuated} <span className="text-xs text-slate-400 font-normal">Civilians</span>
                </div>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">STRUCTURES AT RISK</span>
                <div className="text-xl font-bold text-amber-400 mt-1">
                  {incident.structuresAtRisk} <span className="text-xs text-slate-400 font-normal">Adjacent</span>
                </div>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">WATER SUPPLY STATUS</span>
                <div className="text-xs font-bold text-cyan-400 mt-1 flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5" />
                  {incident.waterSupplyStatus.replace("_", " ")}
                </div>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase">WEATHER / WIND</span>
                <div className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-blue-400" />
                  {incident.windSpeedKmh} km/h • {incident.windDirection}
                </div>
              </div>
            </div>

            {/* Location & Caller details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>INCIDENT GEOGRAPHIC LOCATION</span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p><span className="text-slate-500">Address:</span> {incident.location.address}</p>
                  <p><span className="text-slate-500">Landmark:</span> {incident.location.landmark}</p>
                  <p><span className="text-slate-500">Ward:</span> {incident.location.ward}</p>
                  <p><span className="text-slate-500">GPS Coordinates:</span> {incident.location.lat.toFixed(4)}°N, {incident.location.lng.toFixed(4)}°E ({incident.location.gridRef})</p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold flex items-center gap-1.5 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>EMERGENCY 101 CALLER LOG</span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <p><span className="text-slate-500">Caller:</span> {incident.callerName}</p>
                  <p><span className="text-slate-500">Contact:</span> {incident.callerPhone}</p>
                  <p><span className="text-slate-500">Reported Time:</span> {formatTimeIST(incident.reportedAt)}</p>
                  <p><span className="text-slate-500">Lead Station:</span> {incident.leadStationName}</p>
                </div>
              </div>
            </div>

            {/* Hazmat / Chemical Warning */}
            {incident.hazmatPresent && (
              <div className="bg-purple-950/40 border border-purple-800/80 p-3 rounded-lg text-purple-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-purple-300 text-[11px]">
                  <AlertOctagon className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>HAZMAT LEVEL 3 DETECTED: {incident.hazmatDetails}</span>
                </div>
                <p className="text-[11px] text-purple-300/80">
                  Emergency Action: Enforce 200m Hot Zone, deploy alcohol-resistant foam, avoid standard water spray on bulk solvent drums.
                </p>
              </div>
            )}

            {/* CAD Operator Notes */}
            <div className="bg-[#0b0e14] p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold">CAD OPERATIONAL NARRATIVE</span>
              <p className="text-slate-300 mt-1 leading-relaxed">{incident.cadNotes}</p>
            </div>
          </div>
        )}

        {/* TAB 2: Assigned Apparatus */}
        {activeTab === "units" && (
          <div className="space-y-3 font-mono text-xs">
            {incident.assignedUnits.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                NO APPARATUS UNITS CURRENTLY ASSIGNED
              </div>
            ) : (
              incident.assignedUnits.map((unit) => (
                <div
                  key={unit.unitId}
                  className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-orange-950 border border-orange-800 text-orange-400">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">
                          {unit.callSign}
                        </span>
                        <span className="text-slate-500">({unit.unitId})</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {unit.type} • {unit.stationName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px]">
                    <div>
                      <span className="text-slate-500">Commander:</span>
                      <div className="font-semibold text-slate-200">{unit.commander}</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Crew:</span>
                      <div className="font-semibold text-emerald-400">{unit.crewCount} Firefighters</div>
                    </div>
                    <div>
                      <span className="text-slate-500">Dispatched:</span>
                      <div className="font-semibold text-slate-200">{unit.dispatchedAt}</div>
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
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span>Standard Operating Procedure (SOP) Protocol: ICS-MBMC-2026</span>
              <span className="text-red-400 font-bold">MANDATORY VERIFICATION</span>
            </div>

            <div className="space-y-2">
              {incident.sopChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSOP(item.id)}
                  className={`p-2.5 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    item.completed
                      ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-200"
                      : "bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className={item.completed ? "line-through opacity-80" : "font-semibold"}>
                      {item.task}
                    </span>
                  </div>

                  {item.completed && item.completedAt && (
                    <span className="text-[10px] text-emerald-400 font-mono">
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
          <div className="space-y-4 font-mono text-xs">
            {/* Add Log Form */}
            <form onSubmit={addTimelineEvent} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter tactical VHF radio note or size-up update..."
                value={newLogNote}
                onChange={(e) => setNewLogNote(e.target.value)}
                className="flex-1 rounded border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
              <Button type="submit" size="sm" className="bg-red-600 hover:bg-red-700 gap-1">
                <Plus className="w-3.5 h-3.5" />
                <span>TRANSMIT LOG</span>
              </Button>
            </form>

            {/* Log Stream */}
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {incident.timeline.map((event) => (
                <div
                  key={event.id}
                  className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-[11px] space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-bold text-red-400">{event.timestamp}</span>
                    <span className="text-slate-500">{event.author}</span>
                  </div>
                  <div className="font-semibold text-slate-200">{event.title}</div>
                  <div className="text-slate-400">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
