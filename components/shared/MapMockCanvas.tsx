"use client";

import * as React from "react";
import { Incident } from "@/types/incident";
import { FireStation } from "@/types/station";
import { EmergencyVehicle } from "@/types/vehicle";
import { 
  Building2, 
  Flame, 
  Truck, 
  Layers, 
  Crosshair, 
  Maximize2, 
  Compass,
  Droplet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

interface MapMockCanvasProps {
  incidents: Incident[];
  stations: FireStation[];
  vehicles: EmergencyVehicle[];
  selectedIncidentId?: string | null;
  onSelectIncident?: (incident: Incident) => void;
  onSelectStation?: (station: FireStation) => void;
  onSelectVehicle?: (vehicle: EmergencyVehicle) => void;
  heightClass?: string;
}

export function MapMockCanvas({
  incidents,
  stations,
  vehicles,
  selectedIncidentId,
  onSelectIncident,
  onSelectStation,
  onSelectVehicle,
  heightClass = "h-[480px]",
}: MapMockCanvasProps) {
  const [showIncidents, setShowIncidents] = React.useState(true);
  const [showStations, setShowStations] = React.useState(true);
  const [showVehicles, setShowVehicles] = React.useState(true);
  const [showHydrants, setShowHydrants] = React.useState(true);
  const [activeTooltip, setActiveTooltip] = React.useState<{
    type: "incident" | "station" | "vehicle";
    data: Incident | FireStation | EmergencyVehicle;
    x: number;
    y: number;
  } | null>(null);

  // Map geographic bounding box for Mira-Bhayandar
  // Lat: 19.255 to 19.320, Lng: 72.775 to 72.895
  const minLat = 19.255;
  const maxLat = 19.320;
  const minLng = 72.775;
  const maxLng = 72.895;

  const projectToCoords = (lat: number, lng: number) => {
    const xPct = ((lng - minLng) / (maxLng - minLng)) * 100;
    const yPct = ((maxLat - lat) / (maxLat - minLat)) * 100;
    return {
      x: Math.max(5, Math.min(95, xPct)),
      y: Math.max(8, Math.min(92, yPct)),
    };
  };

  return (
    <div className={`relative w-full ${heightClass} bg-[#080b0f] rounded-lg border border-slate-800 overflow-hidden select-none flex flex-col`}>
      {/* Tactical Header Overlay */}
      <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/80 text-[11px] font-mono text-slate-300 shadow-xl">
        <div className="flex items-center gap-1.5 text-red-400 font-bold border-r border-slate-700 pr-2">
          <Crosshair className="w-3.5 h-3.5 animate-spin" />
          <span>TACTICAL CAD MAP</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
              showIncidents ? "bg-red-950 text-red-300 border border-red-800/80" : "text-slate-500 opacity-60"
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>INCIDENTS ({incidents.filter((i) => i.status !== "RESOLVED").length})</span>
          </button>

          <button
            onClick={() => setShowStations(!showStations)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
              showStations ? "bg-blue-950 text-blue-300 border border-blue-800/80" : "text-slate-500 opacity-60"
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>STATIONS ({stations.length})</span>
          </button>

          <button
            onClick={() => setShowVehicles(!showVehicles)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
              showVehicles ? "bg-orange-950 text-orange-300 border border-orange-800/80" : "text-slate-500 opacity-60"
            }`}
          >
            <Truck className="w-3 h-3" />
            <span>FLEET ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setShowHydrants(!showHydrants)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
              showHydrants ? "bg-cyan-950 text-cyan-300 border border-cyan-800/80" : "text-slate-500 opacity-60"
            }`}
          >
            <Droplet className="w-3 h-3" />
            <span>HYDRANTS</span>
          </button>
        </div>
      </div>

      {/* Compass & Quick Info */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-slate-700/80 text-[11px] font-mono text-slate-300 shadow-xl">
        <Compass className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline">MIRA-BHAYANDAR SECTOR GRID</span>
        <span className="text-slate-500">19°17'N 72°51'E</span>
      </div>

      {/* Map Vector Graphic (SVG) */}
      <div className="relative w-full h-full flex-1 overflow-hidden eoc-tactical-grid">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Subtle water body / Vasai Creek & Arabian Sea */}
          <path
            d="M 0,0 L 450,0 Q 550,150 480,260 T 320,380 Q 200,460 0,550 Z"
            fill="#06121e"
            opacity="0.75"
          />
          <path
            d="M 450,0 Q 550,150 480,260 T 320,380 Q 200,460 0,550"
            stroke="#163854"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4,4"
          />
          <text x="60" y="280" fill="#1b4d75" fontSize="13" fontFamily="monospace" fontWeight="bold" transform="rotate(-30 60,280)">
            VASAI CREEK / ARABIAN SEA
          </text>

          {/* Western Railway Line */}
          <path
            d="M 580,600 L 620,350 L 650,180 L 680,0"
            stroke="#475569"
            strokeWidth="3"
            strokeDasharray="6,4"
            fill="none"
          />
          <text x="635" y="420" fill="#64748b" fontSize="10" fontFamily="monospace" transform="rotate(-78 635,420)">
            WR RAILWAY CORRIDOR
          </text>

          {/* Western Express Highway (WEH - NH 48) */}
          <path
            d="M 880,600 L 840,420 Q 820,300 850,150 L 890,0"
            stroke="#b45309"
            strokeWidth="3.5"
            opacity="0.8"
            fill="none"
          />
          <text x="850" y="320" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold" transform="rotate(-82 850,320)">
            WESTERN EXPRESS HWY (NH-48)
          </text>

          {/* Mira-Bhayandar Main Arterial Road */}
          <path
            d="M 840,420 Q 720,360 620,350 T 400,280 L 220,320"
            stroke="#334155"
            strokeWidth="2.5"
            fill="none"
          />
          <text x="500" y="340" fill="#475569" fontSize="10" fontFamily="monospace">
            MIRA-BHAYANDAR MAIN LINK RD
          </text>

          {/* Ward Boundaries & Labels */}
          {/* Ward 1: Mira Road East */}
          <circle cx="760" cy="380" r="90" fill="#ef4444" fillOpacity="0.04" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" />
          <text x="730" y="360" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">WARD 1: MIRA RD (E)</text>

          {/* Ward 3: MIDC Bhayandar East */}
          <circle cx="700" cy="220" r="75" fill="#f97316" fillOpacity="0.04" stroke="#f97316" strokeWidth="1" strokeDasharray="3,3" />
          <text x="650" y="210" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">WARD 3: MIDC IND.</text>

          {/* Ward 4: Bhayandar West */}
          <circle cx="520" cy="180" r="80" fill="#3b82f6" fillOpacity="0.04" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" />
          <text x="470" y="170" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">WARD 4: BHAYANDAR (W)</text>

          {/* Ward 6: Uttan Coastal */}
          <circle cx="240" cy="360" r="90" fill="#10b981" fillOpacity="0.04" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
          <text x="180" y="350" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">WARD 6: UTTAN COAST</text>
        </svg>

        {/* Hydrant Pins */}
        {showHydrants &&
          stations.flatMap((st) =>
            st.hydrantsNearby.map((hyd) => {
              const pos = projectToCoords(hyd.coordinates.lat, hyd.coordinates.lng);
              return (
                <div
                  key={hyd.id}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
                  title={`${hyd.id} - ${hyd.location} (${hyd.pressureBar} bar)`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 border border-cyan-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                </div>
              );
            })
          )}

        {/* Station Pins */}
        {showStations &&
          stations.map((st) => {
            const pos = projectToCoords(st.coordinates.lat, st.coordinates.lng);
            return (
              <div
                key={st.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                onClick={() => onSelectStation && onSelectStation(st)}
                onMouseEnter={() =>
                  setActiveTooltip({
                    type: "station",
                    data: st,
                    x: pos.x,
                    y: pos.y,
                  })
                }
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div className="relative flex items-center justify-center p-2 rounded-md bg-blue-950/90 border border-blue-500 shadow-lg text-blue-300 hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4" />
                  <span className="absolute -bottom-4 whitespace-nowrap text-[10px] font-mono font-bold bg-slate-950/90 px-1 py-0.2 rounded border border-slate-700 text-blue-200">
                    {st.code}
                  </span>
                </div>
              </div>
            );
          })}

        {/* Vehicle Fleet Pins */}
        {showVehicles &&
          vehicles.map((vh) => {
            const pos = projectToCoords(vh.telemetry.latitude, vh.telemetry.longitude);
            const isMoving = vh.status === "EN_ROUTE" || vh.status === "DISPATCHED";
            const isOnScene = vh.status === "ON_SCENE_PUMPING";

            return (
              <div
                key={vh.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-25 cursor-pointer group"
                onClick={() => onSelectVehicle && onSelectVehicle(vh)}
                onMouseEnter={() =>
                  setActiveTooltip({
                    type: "vehicle",
                    data: vh,
                    x: pos.x,
                    y: pos.y,
                  })
                }
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <div
                  className={`p-1.5 rounded-full border text-white transition-all ${
                    isOnScene
                      ? "bg-amber-600 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-pulse"
                      : isMoving
                      ? "bg-orange-600 border-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                      : "bg-emerald-700 border-emerald-500"
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono bg-black/90 px-1 rounded text-orange-200 border border-orange-500/50">
                  {vh.id.replace("MBMC-FE-", "E-")}
                </span>
              </div>
            );
          })}

        {/* Incident Radar Beacons */}
        {showIncidents &&
          incidents
            .filter((inc) => inc.status !== "RESOLVED")
            .map((inc) => {
              const pos = projectToCoords(inc.location.lat, inc.location.lng);
              const isSelected = selectedIncidentId === inc.id;

              return (
                <div
                  key={inc.id}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
                  onClick={() => onSelectIncident && onSelectIncident(inc)}
                  onMouseEnter={() =>
                    setActiveTooltip({
                      type: "incident",
                      data: inc,
                      x: pos.x,
                      y: pos.y,
                    })
                  }
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  {/* Radar Wave Pulse */}
                  <div
                    className={`absolute inset-0 -m-3 rounded-full ${
                      inc.severity === "CRITICAL"
                        ? "pulse-radar-red"
                        : "pulse-amber"
                    }`}
                  />

                  {/* Pin core */}
                  <div
                    className={`relative p-2 rounded-full border text-white shadow-2xl transition-transform ${
                      isSelected ? "scale-125 ring-2 ring-white" : "hover:scale-110"
                    } ${
                      inc.severity === "CRITICAL"
                        ? "bg-red-600 border-red-300"
                        : "bg-amber-600 border-amber-300"
                    }`}
                  >
                    <Flame className="w-4 h-4 animate-bounce" />
                  </div>

                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold bg-black/95 px-2 py-0.5 rounded border border-red-500/80 text-red-200 shadow-2xl">
                    {inc.incidentNumber}
                  </div>
                </div>
              );
            })}

        {/* Active Hover Tooltip */}
        {activeTooltip && (
          <div
            style={{
              left: `${Math.min(75, Math.max(25, activeTooltip.x))}%`,
              top: `${Math.min(70, Math.max(20, activeTooltip.y - 12))}%`,
            }}
            className="absolute z-50 -translate-x-1/2 -translate-y-full w-64 p-3 rounded-md bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md pointer-events-none font-mono text-xs text-slate-200"
          >
            {activeTooltip.type === "incident" && (
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="font-bold text-red-400">
                    {(activeTooltip.data as Incident).incidentNumber}
                  </span>
                  <SeverityBadge severity={(activeTooltip.data as Incident).severity} />
                </div>
                <p className="font-semibold text-white">{(activeTooltip.data as Incident).title}</p>
                <p className="text-slate-400 text-[11px] mt-1">
                  {(activeTooltip.data as Incident).location.address}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Assigned: {(activeTooltip.data as Incident).assignedUnits.length} Units</span>
                  <StatusBadge status={(activeTooltip.data as Incident).status} />
                </div>
              </div>
            )}

            {activeTooltip.type === "station" && (
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="font-bold text-blue-400">
                    {(activeTooltip.data as FireStation).code}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {(activeTooltip.data as FireStation).status}
                  </span>
                </div>
                <p className="font-semibold text-white">{(activeTooltip.data as FireStation).name}</p>
                <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Crew on Duty:</span>
                    <span className="text-slate-200 font-bold">
                      {(activeTooltip.data as FireStation).personnelOnDuty} / {(activeTooltip.data as FireStation).personnelTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Water Reserve:</span>
                    <span className="text-cyan-400 font-bold">
                      {(activeTooltip.data as FireStation).waterReserveLiters.toLocaleString()} L
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTooltip.type === "vehicle" && (
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="font-bold text-orange-400">
                    {(activeTooltip.data as EmergencyVehicle).id}
                  </span>
                  <StatusBadge status={(activeTooltip.data as EmergencyVehicle).status} />
                </div>
                <p className="font-semibold text-white">{(activeTooltip.data as EmergencyVehicle).name}</p>
                <div className="mt-2 space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Water Tank:</span>
                    <span className="text-cyan-400 font-bold">
                      {(activeTooltip.data as EmergencyVehicle).telemetry.waterLevelPct}% (
                      {(activeTooltip.data as EmergencyVehicle).telemetry.waterRemainingLiters}L)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pump Pressure:</span>
                    <span className="text-amber-400 font-bold">
                      {(activeTooltip.data as EmergencyVehicle).telemetry.pumpPressurePsi} PSI
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="text-slate-200 font-bold">
                      {(activeTooltip.data as EmergencyVehicle).telemetry.speedKmh} km/h
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Bottom Telemetry Bar */}
      <div className="bg-[#0b0e14] px-3 py-1.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>GPS RTK TELEMETRY: ACCURATE TO 0.4M</span>
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">DATUM: WGS-84 / UTM ZONE 43N</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-red-400">HOTSPOTS: 2 HIGH-PRIORITY</span>
        </div>
      </div>
    </div>
  );
}
