"use client";

import * as React from "react";
import { EmergencyVehicle } from "@/types/vehicle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Droplet, 
  Gauge, 
  Fuel, 
  BatteryCharging, 
  Thermometer, 
  Navigation, 
  Wrench, 
  UserCheck, 
  Activity,
  Zap,
  Radio
} from "lucide-react";
import Image from "next/image";

interface VehicleTelemetryModalProps {
  vehicle: EmergencyVehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehicleTelemetryModal({
  vehicle,
  open,
  onOpenChange,
}: VehicleTelemetryModalProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-orange-950 border border-orange-800 text-orange-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg font-mono text-white">
                    {vehicle.callSign}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ({vehicle.id} • {vehicle.registrationNumber})
                  </span>
                  <StatusBadge status={vehicle.status} />
                </div>
                <h3 className="text-xs font-semibold text-slate-300 font-mono mt-0.5">
                  {vehicle.name} • {vehicle.stationName}
                </h3>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 font-mono text-xs">
          {/* Main Telemetry Stats Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Water Tank */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                  WATER TANK
                </span>
                <span className="text-cyan-400 font-bold">
                  {vehicle.telemetry.waterLevelPct}%
                </span>
              </div>
              <Progress value={vehicle.telemetry.waterLevelPct} indicatorColor="bg-cyan-500" size="sm" />
              <div className="text-[10px] text-cyan-300 font-bold">
                {vehicle.telemetry.waterRemainingLiters.toLocaleString()} L / {vehicle.waterCapacityLiters.toLocaleString()} L
              </div>
            </div>

            {/* Foam Tank */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  FOAM TANK
                </span>
                <span className="text-purple-400 font-bold">
                  {vehicle.telemetry.foamLevelPct}%
                </span>
              </div>
              <Progress value={vehicle.telemetry.foamLevelPct} indicatorColor="bg-purple-500" size="sm" />
              <div className="text-[10px] text-purple-300 font-bold">
                {vehicle.telemetry.foamRemainingLiters} L / {vehicle.foamCapacityLiters} L
              </div>
            </div>

            {/* Pump Pressure */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>PUMP PRESSURE</span>
              </div>
              <div className="text-xl font-bold text-amber-300">
                {vehicle.telemetry.pumpPressurePsi} <span className="text-xs text-slate-400 font-normal">PSI</span>
              </div>
              <div className="text-[10px] text-slate-500">
                Discharge: {vehicle.telemetry.dischargeLpm} LPM
              </div>
            </div>

            {/* Fuel & Battery */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-emerald-400" />
                <span>FUEL / BATTERY</span>
              </div>
              <div className="text-xl font-bold text-emerald-300">
                {vehicle.telemetry.fuelLevelPct}% <span className="text-xs text-slate-400 font-normal">Fuel</span>
              </div>
              <div className="text-[10px] text-emerald-400">
                Battery: {vehicle.telemetry.batteryHealthPct}% (24V System)
              </div>
            </div>
          </div>

          {/* Real-time Diagnostics Grid */}
          <div className="p-3 rounded-lg bg-[#090d12] border border-slate-800/80">
            <h4 className="text-[11px] font-bold text-slate-300 uppercase mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>LIVE CAN-BUS ON-BOARD DIAGNOSTICS</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span className="text-slate-500">ENGINE SPEED:</span>
                <div className="font-bold text-slate-200">{vehicle.telemetry.engineRpm} RPM</div>
              </div>
              <div>
                <span className="text-slate-500">COOLANT TEMP:</span>
                <div className="font-bold text-slate-200">{vehicle.telemetry.engineTempC}°C (Normal)</div>
              </div>
              <div>
                <span className="text-slate-500">CURRENT SPEED:</span>
                <div className="font-bold text-slate-200">{vehicle.telemetry.speedKmh} km/h</div>
              </div>
              <div>
                <span className="text-slate-500">ODOMETER:</span>
                <div className="font-bold text-slate-200">{vehicle.serviceMileageKm.toLocaleString()} KM</div>
              </div>
            </div>
          </div>

          {/* Assigned Crew & Commander */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1 text-slate-300">
              <div className="text-slate-400 font-bold flex items-center gap-1.5 text-[11px]">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ASSIGNED CREW & APPARATUS COMMAND</span>
              </div>
              <p><span className="text-slate-500">Apparatus Commander:</span> <strong className="text-white">{vehicle.commanderName}</strong></p>
              <p><span className="text-slate-500">Assigned Driver:</span> <strong className="text-white">{vehicle.driverName}</strong></p>
              <p><span className="text-slate-500">Crew On-Board:</span> <strong className="text-emerald-400">{vehicle.assignedCrewCount} / {vehicle.crewCapacity} Firefighters</strong></p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1 text-slate-300">
              <div className="text-slate-400 font-bold flex items-center gap-1.5 text-[11px]">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>MAINTENANCE & SPECIFICATIONS</span>
              </div>
              <p><span className="text-slate-500">Pump Capacity:</span> {vehicle.pumpCapacityLpm.toLocaleString()} LPM @ 10 Bar</p>
              {vehicle.ladderReachMeters && (
                <p><span className="text-slate-500">Aerial Ladder Reach:</span> <strong className="text-amber-300">{vehicle.ladderReachMeters} Meters (Bronto Skylift)</strong></p>
              )}
              <p><span className="text-slate-500">Next Scheduled Service:</span> {vehicle.nextServiceDate}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
