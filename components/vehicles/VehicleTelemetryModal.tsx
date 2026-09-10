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
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-3xl bg-white text-slate-900 border-slate-200">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0a2540]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-[#0a2540]">
                    {vehicle.callSign}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    ({vehicle.id} • {vehicle.registrationNumber})
                  </span>
                  <StatusBadge status={vehicle.status} />
                </div>
                <h3 className="text-xs font-semibold text-slate-600 mt-0.5">
                  {vehicle.name} • {vehicle.stationName}
                </h3>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 text-xs">
          {/* Main Telemetry Stats Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Water Tank */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-sky-600" />
                  Water Tank
                </span>
                <span className="text-sky-800 font-bold">
                  {vehicle.telemetry.waterLevelPct}%
                </span>
              </div>
              <Progress value={vehicle.telemetry.waterLevelPct} indicatorColor="bg-sky-600" size="sm" />
              <div className="text-[11px] text-sky-900 font-bold">
                {vehicle.telemetry.waterRemainingLiters.toLocaleString()} L / {vehicle.waterCapacityLiters.toLocaleString()} L
              </div>
            </div>

            {/* Foam Tank */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex justify-between items-center text-[11px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-purple-600" />
                  Foam Tank
                </span>
                <span className="text-purple-800 font-bold">
                  {vehicle.telemetry.foamLevelPct}%
                </span>
              </div>
              <Progress value={vehicle.telemetry.foamLevelPct} indicatorColor="bg-purple-600" size="sm" />
              <div className="text-[11px] text-purple-900 font-bold">
                {vehicle.telemetry.foamRemainingLiters} L / {vehicle.foamCapacityLiters} L
              </div>
            </div>

            {/* Pump Pressure */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-amber-600" />
                <span>Pump Pressure</span>
              </div>
              <div className="text-xl font-bold text-amber-900">
                {vehicle.telemetry.pumpPressurePsi} <span className="text-xs text-slate-500 font-normal">PSI</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Discharge: {vehicle.telemetry.dischargeLpm} LPM
              </div>
            </div>

            {/* Fuel & Battery */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fuel / Battery</span>
              </div>
              <div className="text-xl font-bold text-emerald-800">
                {vehicle.telemetry.fuelLevelPct}% <span className="text-xs text-slate-500 font-normal">Fuel</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold">
                Battery: {vehicle.telemetry.batteryHealthPct}% (24V System)
              </div>
            </div>
          </div>

          {/* Real-time Diagnostics Grid */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-[#0a2540] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-700" />
              <span>Live CAN-BUS On-Board Diagnostics</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Engine Speed:</span>
                <div className="font-bold text-slate-900">{vehicle.telemetry.engineRpm} RPM</div>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Coolant Temp:</span>
                <div className="font-bold text-slate-900">{vehicle.telemetry.engineTempC}°C (Normal)</div>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Current Speed:</span>
                <div className="font-bold text-slate-900">{vehicle.telemetry.speedKmh} km/h</div>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Odometer:</span>
                <div className="font-bold text-slate-900">{vehicle.serviceMileageKm.toLocaleString()} KM</div>
              </div>
            </div>
          </div>

          {/* Assigned Crew & Commander */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-700">
              <div className="text-[#0a2540] font-bold flex items-center gap-1.5 text-xs">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Assigned Crew & Apparatus Command</span>
              </div>
              <p><span className="font-semibold text-slate-900">Commander:</span> {vehicle.commanderName}</p>
              <p><span className="font-semibold text-slate-900">Driver:</span> {vehicle.driverName}</p>
              <p><span className="font-semibold text-slate-900">Crew On-Board:</span> <strong className="text-emerald-700 font-bold">{vehicle.assignedCrewCount} / {vehicle.crewCapacity} Firefighters</strong></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-700">
              <div className="text-[#0a2540] font-bold flex items-center gap-1.5 text-xs">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Maintenance & Specs</span>
              </div>
              <p><span className="font-semibold text-slate-900">Pump Capacity:</span> {vehicle.pumpCapacityLpm.toLocaleString()} LPM @ 10 Bar</p>
              {vehicle.ladderReachMeters && (
                <p><span className="font-semibold text-slate-900">Aerial Ladder:</span> <strong className="text-amber-800 font-bold">{vehicle.ladderReachMeters}m (Bronto Skylift)</strong></p>
              )}
              <p><span className="font-semibold text-slate-900">Next Service:</span> {vehicle.nextServiceDate}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
