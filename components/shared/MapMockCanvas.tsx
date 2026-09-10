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
    <div className={`relative w-full ${heightClass} bg-slate-100 rounded-xl border border-slate-300 overflow-hidden select-none flex flex-col shadow-sm`}>
      {/* Tactical Header Overlay */}
      <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-sans text-slate-700 shadow-md">
        <div className="flex items-center gap-1.5 text-[#0a2540] font-bold border-r border-slate-300 pr-2">
          <Crosshair className="w-3.5 h-3.5 text-[#1e3a8a]" />
          <span>MUNICIPAL GIS MAP</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showIncidents ? "bg-red-100 text-red-700 border border-red-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>INCIDENTS ({incidents.filter((i) => i.status !== "RESOLVED").length})</span>
          </button>

          <button
            onClick={() => setShowStations(!showStations)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showStations ? "bg-blue-100 text-blue-700 border border-blue-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>STATIONS ({stations.length})</span>
          </button>

          <button
            onClick={() => setShowVehicles(!showVehicles)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showVehicles ? "bg-amber-100 text-amber-800 border border-amber-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Truck className="w-3 h-3" />
            <span>FLEET ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setShowHydrants(!showHydrants)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showHydrants ? "bg-cyan-100 text-cyan-800 border border-cyan-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Droplet className="w-3 h-3" />
            <span>HYDRANTS</span>
          </button>
        </div>
      </div>

      {/* Compass & Quick Info */}
      <div className="absolute top-3 right-3 z-30 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-sans text-slate-700 shadow-md">
        <Compass className="w-3.5 h-3.5 text-[#1e3a8a]" />
        <span className="font-bold">MIRA-BHAYANDAR WARD GRID</span>
      </div>

      {/* Map Vector Graphic (SVG) in Light GIS Styling */}
      <div className="relative w-full h-full flex-1 overflow-hidden bg-[#eaf2f8]">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {/* Water body / Vasai Creek & Arabian Sea */}
          <path
            d="M 0,0 L 450,0 Q 550,150 480,260 T 320,380 Q 200,460 0,550 Z"
            fill="#bfdbfe"
            opacity="0.9"
          />
          <path
            d="M 450,0 Q 550,150 480,260 T 320,380 Q 200,460 0,550"
            stroke="#93c5fd"
            strokeWidth="2"
            fill="none"
          />
          <text x="60" y="280" fill="#1e40af" fontSize="13" fontFamily="sans-serif" fontWeight="bold" transform="rotate(-30 60,280)">
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
          <text x="635" y="420" fill="#334155" fontSize="10" fontFamily="sans-serif" fontWeight="bold" transform="rotate(-78 635,420)">
            WR RAILWAY CORRIDOR
          </text>

          {/* Western Express Highway (WEH - NH 48) */}
          <path
            d="M 880,600 L 840,420 Q 820,300 850,150 L 890,0"
            stroke="#d97706"
            strokeWidth="4"
            opacity="0.9"
            fill="none"
          />
          <text x="850" y="320" fill="#b45309" fontSize="10" fontFamily="sans-serif" fontWeight="bold" transform="rotate(-82 850,320)">
            WESTERN EXPRESS HWY (NH-48)
          </text>

          {/* Mira-Bhayandar Main Arterial Road */}
          <path
            d="M 840,420 Q 720,360 620,350 T 400,280 L 220,320"
            stroke="#64748b"
            strokeWidth="3"
            fill="none"
          />
          <text x="500" y="340" fill="#334155" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            MIRA-BHAYANDAR MAIN LINK RD
          </text>

          {/* Ward Boundaries & Labels */}
          <circle cx="760" cy="380" r="90" fill="#ef4444" fillOpacity="0.06" stroke="#f87171" strokeWidth="1" strokeDasharray="3,3" />
          <text x="730" y="360" fill="#7f1d1d" fontSize="11" fontFamily="sans-serif" fontWeight="bold">WARD 1: MIRA RD (E)</text>

          <circle cx="700" cy="220" r="75" fill="#f97316" fillOpacity="0.06" stroke="#fb923c" strokeWidth="1" strokeDasharray="3,3" />
          <text x="650" y="210" fill="#7c2d12" fontSize="11" fontFamily="sans-serif" fontWeight="bold">WARD 3: MIDC IND.</text>

          <circle cx="520" cy="180" r="80" fill="#3b82f6" fillOpacity="0.06" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,3" />
          <text x="470" y="170" fill="#1e3a8a" fontSize="11" fontFamily="sans-serif" fontWeight="bold">WARD 4: BHAYANDAR (W)</text>

          <circle cx="240" cy="360" r="90" fill="#10b981" fillOpacity="0.06" stroke="#34d399" strokeWidth="1" strokeDasharray="3,3" />
          <text x="180" y="350" fill="#065f46" fontSize="11" fontFamily="sans-serif" fontWeight="bold">WARD 6: UTTAN COAST</text>
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
                  <div className="w-3 h-3 rounded-full bg-cyan-600 border-2 border-white shadow-sm" />
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
                <div className="relative flex items-center justify-center p-2 rounded-lg bg-[#0a2540] border border-blue-400 shadow-md text-white hover:scale-110 transition-transform">
                  <Building2 className="w-4 h-4 text-amber-300" />
                  <span className="absolute -bottom-4 whitespace-nowrap text-[10px] font-bold bg-white px-1.5 py-0.2 rounded border border-slate-300 text-[#0a2540] shadow-sm">
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
                  className={`p-1.5 rounded-full border-2 border-white text-white shadow-md transition-all ${
                    isOnScene
                      ? "bg-amber-600 animate-pulse"
                      : isMoving
                      ? "bg-orange-600"
                      : "bg-emerald-600"
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold bg-white px-1 rounded text-[#0a2540] border border-slate-300 shadow-sm">
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
                  {/* Pin core */}
                  <div
                    className={`relative p-2 rounded-full border-2 border-white text-white shadow-lg transition-transform ${
                      isSelected ? "scale-125 ring-2 ring-red-500" : "hover:scale-110"
                    } ${
                      inc.severity === "CRITICAL"
                        ? "bg-[#dc2626]"
                        : "bg-amber-600"
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                  </div>

                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-red-300 text-red-700 shadow-md">
                    {inc.incidentNumber}
                  </div>
                </div>
              );
            })}

        {/* Active Hover Tooltip in Clean Light Theme */}
        {activeTooltip && (
          <div
            style={{
              left: `${Math.min(75, Math.max(25, activeTooltip.x))}%`,
              top: `${Math.min(70, Math.max(20, activeTooltip.y - 12))}%`,
            }}
            className="absolute z-50 -translate-x-1/2 -translate-y-full w-64 p-3.5 rounded-xl bg-white border border-slate-300 shadow-xl pointer-events-none text-xs text-slate-800"
          >
            {activeTooltip.type === "incident" && (
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1.5">
                  <span className="font-bold text-red-700">
                    {(activeTooltip.data as Incident).incidentNumber}
                  </span>
                  <SeverityBadge severity={(activeTooltip.data as Incident).severity} />
                </div>
                <p className="font-bold text-[#0a2540]">{(activeTooltip.data as Incident).title}</p>
                <p className="text-slate-600 text-[11px] mt-1">
                  {(activeTooltip.data as Incident).location.address}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Units: {(activeTooltip.data as Incident).assignedUnits.length}</span>
                  <StatusBadge status={(activeTooltip.data as Incident).status} />
                </div>
              </div>
            )}

            {activeTooltip.type === "station" && (
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1.5">
                  <span className="font-bold text-[#0a2540]">
                    {(activeTooltip.data as FireStation).code}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    {(activeTooltip.data as FireStation).status}
                  </span>
                </div>
                <p className="font-bold text-[#0a2540]">{(activeTooltip.data as FireStation).name}</p>
                <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Crew on Duty:</span>
                    <span className="text-[#0a2540] font-bold">
                      {(activeTooltip.data as FireStation).personnelOnDuty} / {(activeTooltip.data as FireStation).personnelTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Water Reserve:</span>
                    <span className="text-blue-700 font-bold">
                      {(activeTooltip.data as FireStation).waterReserveLiters.toLocaleString()} L
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTooltip.type === "vehicle" && (
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1.5">
                  <span className="font-bold text-orange-700">
                    {(activeTooltip.data as EmergencyVehicle).id}
                  </span>
                  <StatusBadge status={(activeTooltip.data as EmergencyVehicle).status} />
                </div>
                <p className="font-bold text-[#0a2540]">{(activeTooltip.data as EmergencyVehicle).name}</p>
                <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Water Tank:</span>
                    <span className="text-blue-700 font-bold">
                      {(activeTooltip.data as EmergencyVehicle).telemetry.waterLevelPct}% (
                      {(activeTooltip.data as EmergencyVehicle).telemetry.waterRemainingLiters}L)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pump Pressure:</span>
                    <span className="text-amber-700 font-bold">
                      {(activeTooltip.data as EmergencyVehicle).telemetry.pumpPressurePsi} PSI
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="text-slate-800 font-bold">
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
      <div className="bg-white px-3.5 py-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>GPS LIVE MAPPING: ACTIVE</span>
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-500">MUNICIPAL SURVEY: MIRA-BHAYANDAR WARD MAP</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-red-700 font-bold">2 ACTIVE DISPATCHES</span>
        </div>
      </div>
    </div>
  );
}
