"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { MBMC_CONFIG } from "@/lib/constants";
import { MOCK_STATIONS, MOCK_VEHICLES } from "@/lib/mock-data";
import { Flame, Radio, Send, AlertTriangle, ShieldCheck, MapPin } from "lucide-react";
import { Incident, IncidentSeverity, IncidentType } from "@/types/incident";

interface QuickDispatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDispatchCreated?: (incident: Incident) => void;
}

export function QuickDispatchModal({
  open,
  onOpenChange,
  onDispatchCreated,
}: QuickDispatchModalProps) {
  const [callerName, setCallerName] = React.useState("");
  const [callerPhone, setCallerPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [ward, setWard] = React.useState(MBMC_CONFIG.wards[0].name);
  const [incidentType, setIncidentType] = React.useState<IncidentType>("Residential Fire");
  const [severity, setSeverity] = React.useState<IncidentSeverity>("CRITICAL");
  const [leadStationId, setLeadStationId] = React.useState(MOCK_STATIONS[0].id);
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const station = MOCK_STATIONS.find((s) => s.id === leadStationId) || MOCK_STATIONS[0];
    const newIncNumber = `INC-2026-00${Math.floor(422 + Math.random() * 50)}`;

    const newIncident: Incident = {
      id: newIncNumber,
      incidentNumber: newIncNumber,
      title: `${incidentType} - ${address || "Mira-Bhayandar Sector"}`,
      type: incidentType,
      severity: severity,
      status: "DISPATCHED",
      reportedAt: new Date().toISOString(),
      callerName: callerName || "Citizen 101 Caller",
      callerPhone: callerPhone || "+91 98200 00000",
      location: {
        address: address || "Main Link Road, Mira Road (E)",
        landmark: landmark || "Near Ward Naka",
        ward: ward,
        zone: "Municipal Zone A",
        lat: station.coordinates.lat + 0.002,
        lng: station.coordinates.lng + 0.002,
        gridRef: "MB-CAD-GEN",
      },
      leadStationId: station.id,
      leadStationName: station.name,
      assignedUnits: [
        {
          unitId: station.vehiclesAssignedIds[0] || "MBMC-FE-01",
          callSign: "Primary First-Due Pumper",
          type: "Multi-Purpose Pumper",
          stationName: station.name,
          dispatchedAt: new Date().toLocaleTimeString("en-IN", { hour12: false }),
          etaMinutes: 4,
          status: "DISPATCHED",
          crewCount: 6,
          commander: station.officerInCharge,
        },
      ],
      casualtiesReported: 0,
      peopleEvacuated: 0,
      structuresAtRisk: 1,
      waterSupplyStatus: "HYDRANT_CONNECTED",
      hazmatPresent: incidentType.includes("Chemical") || incidentType.includes("Industrial"),
      windSpeedKmh: 14.8,
      windDirection: "WSW (245°)",
      radioChannel: "CH-01 (156.800 MHz)",
      cadNotes: notes || "Emergency 101 call intake verified. Station tones transmitted.",
      timeline: [
        {
          id: `TL-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString("en-IN", { hour12: false }),
          title: "CAD Turnout Order Broadcast",
          description: `Dispatched ${station.name} with alarm level ${severity}.`,
          author: "CFO Dr. Arvind Shinde",
          type: "DISPATCH",
        },
      ],
      sopChecklist: [
        { id: "SOP-1", task: "Acknowledge Station Turnout Tone", completed: true, completedAt: "Just now", completedBy: "CAD Automator", requiredForSeverity: ["CRITICAL", "HIGH"] },
        { id: "SOP-2", task: "Confirm Road Route Clearance with Mira-Bhayandar Traffic Police", completed: false, requiredForSeverity: ["CRITICAL", "HIGH"] },
      ],
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      if (onDispatchCreated) onDispatchCreated(newIncident);
      setTimeout(() => {
        setSuccessMessage(false);
        onOpenChange(false);
      }, 1200);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-red-500 font-mono">
            <Flame className="w-5 h-5 animate-pulse" />
            <span>EMERGENCY 101 CAD DISPATCH TRANSMITTER</span>
          </DialogTitle>
          <DialogDescription>
            Instant Computer-Aided Dispatch (CAD) to all 5 MBMC Fire Station Alert Bays & Radio Channels.
          </DialogDescription>
        </DialogHeader>

        {successMessage ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
            <div className="p-3 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 animate-pulse">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">
              TURNOUT ORDER BROADCAST TO STATION BAYS
            </h3>
            <p className="text-xs text-slate-400">
              Station sirens activated • VHF Frequency locked to CH-01
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[11px]">INCIDENT TYPE</label>
                <Select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value as IncidentType)}
                  className="mt-1"
                >
                  <option value="Residential Fire">Residential High-Rise Fire</option>
                  <option value="Commercial Complex Fire">Commercial Complex Fire</option>
                  <option value="Industrial / Chemical Hazmat">Industrial Chemical Hazmat</option>
                  <option value="High-Rise Building Rescue">High-Rise Rescue</option>
                  <option value="Vehicular Accident / Fuel Spill">Vehicular Crash / Fuel Spill</option>
                  <option value="Electrical Substation Fire">Electrical Substation Fire</option>
                  <option value="Coastal / Creek Rescue">Coastal / Creek Rescue</option>
                </Select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px]">ALARM SEVERITY</label>
                <Select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
                  className="mt-1 text-red-400 font-bold"
                >
                  <option value="CRITICAL">1ST ALARM - CRITICAL (T1)</option>
                  <option value="HIGH">2ND ALARM - HIGH (T2)</option>
                  <option value="MEDIUM">3RD ALARM - MEDIUM (T3)</option>
                  <option value="LOW">MINOR - LOW (T4)</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[11px]">LOCATION / BUILDING / SECTOR</label>
                <Input
                  required
                  placeholder="e.g. Shanti Nagar, Sector 4, Mira Rd"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[11px]">LANDMARK</label>
                <Input
                  placeholder="e.g. Near GCC Club or Station Flyover"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[11px]">MUNICIPAL WARD</label>
                <Select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="mt-1"
                >
                  {MBMC_CONFIG.wards.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px]">PRIMARY LEAD STATION</label>
                <Select
                  value={leadStationId}
                  onChange={(e) => setLeadStationId(e.target.value)}
                  className="mt-1"
                >
                  {MOCK_STATIONS.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.baysOccupied} in bay)
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[11px]">CALLER NAME</label>
                <Input
                  placeholder="Citizen Name / Security Desk"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[11px]">CALLER PHONE</label>
                <Input
                  placeholder="+91 98..."
                  value={callerPhone}
                  onChange={(e) => setCallerPhone(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-[11px]">OPERATOR CAD NOTES</label>
              <Input
                placeholder="Initial size-up details, trapped occupants, chemical smoke, power isolation status"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Transmits immediately to active station klaxons</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 bg-red-600 hover:bg-red-700 font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "BROADCAST TURNOUT"}</span>
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
