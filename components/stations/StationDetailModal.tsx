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
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-3xl bg-white text-slate-900 border-slate-200">
        <DialogHeader>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-[#0a2540]">
                    {station.code}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    {station.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-0.5">
                  {station.name}
                </h3>
              </div>
            </div>

            <div className="text-right text-xs text-slate-600 font-medium">
              <div>Turnout Avg: <strong className="text-emerald-700 font-bold">{station.turnoutTimeAvgSeconds}s</strong></div>
              <div>Coverage Radius: <strong className="text-slate-900 font-bold">{station.coverageRadiusKm} km</strong></div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 text-xs">
          {/* Station Overview Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-700">
              <div className="flex items-center gap-1.5 text-[#0a2540] font-bold text-xs">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Location & Jurisdiction</span>
              </div>
              <p><span className="font-semibold text-slate-900">Address:</span> {station.address}</p>
              <p><span className="font-semibold text-slate-900">Ward:</span> {station.ward}</p>
              <p><span className="font-semibold text-slate-900">GPS:</span> {station.coordinates.lat}°N, {station.coordinates.lng}°E</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-700">
              <div className="flex items-center gap-1.5 text-[#0a2540] font-bold text-xs">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Command & Communications</span>
              </div>
              <p><span className="font-semibold text-slate-900">Officer:</span> {station.officerInCharge} ({station.officerRank})</p>
              <p><span className="font-semibold text-slate-900">Landline:</span> {station.phone}</p>
              <p><span className="font-semibold text-slate-900">Hotline:</span> {station.emergencyHotline}</p>
            </div>
          </div>

          {/* Water Reserves & Bay Capacity */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                  <Droplet className="w-4 h-4 text-sky-600" />
                  Water Reservoir
                </span>
                <span className="font-bold text-sky-900">
                  {station.waterReserveLiters.toLocaleString()} L ({waterPct}%)
                </span>
              </div>
              <Progress value={waterPct} indicatorColor="bg-sky-600" size="md" />
              <div className="text-[11px] text-slate-500 font-medium">
                Max: {station.waterMaxCapacityLiters.toLocaleString()} Litres • RCC Tank
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-blue-800 font-bold">
                  <Truck className="w-4 h-4 text-blue-600" />
                  Apparatus Bays
                </span>
                <span className="font-bold text-blue-900">
                  {station.baysOccupied} / {station.baysTotal} Bays Occupied
                </span>
              </div>
              <Progress value={(station.baysOccupied / station.baysTotal) * 100} indicatorColor="bg-blue-600" size="md" />
              <div className="text-[11px] text-slate-500 font-medium">
                Foam Reserve: {station.foamReserveLiters.toLocaleString()} Litres
              </div>
            </div>
          </div>

          {/* Assigned Vehicles */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#0a2540] flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-700" />
              <span>Assigned Apparatus ({assignedVehicles.length})</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {assignedVehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-900">{veh.callSign}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{veh.name}</div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="text-sky-800 font-bold">{veh.waterCapacityLiters.toLocaleString()}L Water</div>
                    <div className="text-slate-500 font-medium">{veh.status.replace("_", " ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adjacent Municipal Hydrants */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#0a2540] flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-sky-700" />
              <span>Municipal Hydrant Network ({station.hydrantsNearby.length} Tested Points)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {station.hydrantsNearby.map((hyd) => (
                <div
                  key={hyd.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1"
                >
                  <div className="flex justify-between font-bold">
                    <span className="text-blue-900">{hyd.id}</span>
                    <span className="text-emerald-700">{hyd.pressureBar} BAR</span>
                  </div>
                  <div className="text-slate-600 truncate">{hyd.location}</div>
                  <div className="text-slate-500 flex justify-between text-[10px]">
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
