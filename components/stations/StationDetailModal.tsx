"use client";

import * as React from "react";
import { FireStation } from "@/types/station";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Truck, 
  Users, 
  Droplet, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Gauge, 
  Radio,
  Flame
} from "lucide-react";
import { MOCK_VEHICLES, MOCK_PERSONNEL } from "@/lib/mock-data";

interface StationDetailModalProps {
  station: FireStation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StationDetailModal({
  station,
  open,
  onOpenChange,
}: StationDetailModalProps) {
  if (!station) return null;

  const assignedVehicles = MOCK_VEHICLES.filter((v) =>
    station.vehiclesAssignedIds.includes(v.id)
  );

  const assignedPersonnel = MOCK_PERSONNEL.filter(
    (p) => p.stationId === station.id
  );

  const waterPct = Math.round((station.waterReserveLiters / station.waterMaxCapacityLiters) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-blue-950 border border-blue-800 text-blue-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg font-mono text-white">
                    {station.code}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    {station.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-200 mt-0.5">
                  {station.name}
                </h3>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-slate-400">
              <div>Turnout Avg: <strong className="text-emerald-400">{station.turnoutTimeAvgSeconds}s</strong></div>
              <div>Coverage Radius: <strong className="text-white">{station.coverageRadiusKm} km</strong></div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 font-mono text-xs">
          {/* Station Overview Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5 text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>LOCATION & JURISDICTION</span>
              </div>
              <p><span className="text-slate-500">Address:</span> {station.address}</p>
              <p><span className="text-slate-500">Ward:</span> {station.ward}</p>
              <p><span className="text-slate-500">GPS Coordinates:</span> {station.coordinates.lat}°N, {station.coordinates.lng}°E</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5 text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>COMMAND & COMMUNICATIONS</span>
              </div>
              <p><span className="text-slate-500">Officer In Charge:</span> {station.officerInCharge} ({station.officerRank})</p>
              <p><span className="text-slate-500">Direct Landline:</span> {station.phone}</p>
              <p><span className="text-slate-500">Hotline:</span> {station.emergencyHotline}</p>
            </div>
          </div>

          {/* Water Reserves & Bay Capacity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Droplet className="w-3.5 h-3.5" />
                  WATER STORAGE RESERVOIR
                </span>
                <span className="font-bold text-white">
                  {station.waterReserveLiters.toLocaleString()} L ({waterPct}%)
                </span>
              </div>
              <Progress value={waterPct} indicatorColor="bg-cyan-500" size="md" />
              <div className="text-[10px] text-slate-500">
                Max Capacity: {station.waterMaxCapacityLiters.toLocaleString()} Litres • Underground RCC Tank
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                  <Truck className="w-3.5 h-3.5" />
                  APPARATUS BAYS
                </span>
                <span className="font-bold text-white">
                  {station.baysOccupied} / {station.baysTotal} Bays Occupied
                </span>
              </div>
              <Progress value={(station.baysOccupied / station.baysTotal) * 100} indicatorColor="bg-orange-500" size="md" />
              <div className="text-[10px] text-slate-500">
                Aqueous Foam Reserve: {station.foamReserveLiters.toLocaleString()} Litres
              </div>
            </div>
          </div>

          {/* Assigned Vehicles */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              <span>ASSIGNED APPARATUS IN STATION ({assignedVehicles.length})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {assignedVehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="p-2.5 rounded bg-slate-900/60 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-white">{veh.callSign}</div>
                    <div className="text-[10px] text-slate-400">{veh.name}</div>
                  </div>
                  <div className="text-right text-[10px]">
                    <div className="text-cyan-400 font-bold">{veh.waterCapacityLiters.toLocaleString()}L Water</div>
                    <div className="text-slate-500">{veh.status.replace("_", " ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adjacent Municipal Hydrants */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>MUNICIPAL HYDRANT NETWORK GRID ({station.hydrantsNearby.length} TESTED POINTS)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {station.hydrantsNearby.map((hyd) => (
                <div
                  key={hyd.id}
                  className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[10px] space-y-1"
                >
                  <div className="flex justify-between font-bold">
                    <span className="text-cyan-300">{hyd.id}</span>
                    <span className="text-emerald-400">{hyd.pressureBar} BAR</span>
                  </div>
                  <div className="text-slate-400 truncate">{hyd.location}</div>
                  <div className="text-slate-500 flex justify-between">
                    <span>Flow: {hyd.flowRateLpm} LPM</span>
                    <span>{hyd.distanceMeters}m away</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
