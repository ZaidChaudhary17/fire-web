import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmergencyVehicle } from "@/types/vehicle";
import { Truck, Droplet, Gauge, Fuel, Navigation, Zap } from "lucide-react";

interface ActiveVehiclesTrackerProps {
  vehicles: EmergencyVehicle[];
  onSelectVehicle?: (vehicle: EmergencyVehicle) => void;
}

export function ActiveVehiclesTracker({
  vehicles,
  onSelectVehicle,
}: ActiveVehiclesTrackerProps) {
  // Show active/deployed or priority vehicles first
  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (a.status.includes("ON_SCENE") || a.status === "EN_ROUTE") return -1;
    if (b.status.includes("ON_SCENE") || b.status === "EN_ROUTE") return 1;
    return 0;
  });

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-100 border border-orange-200 text-orange-700">
            <Truck className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-bold text-[#0a2540] uppercase font-sans">
            LIVE APPARATUS TELEMETRY
          </CardTitle>
        </div>
        <span className="text-xs font-bold text-slate-500">
          RTK TELEMATICS
        </span>
      </CardHeader>

      <CardContent className="space-y-2.5 p-4 max-h-[420px] overflow-y-auto">
        {sortedVehicles.map((vehicle) => {
          const isPumping = vehicle.status === "ON_SCENE_PUMPING";
          const isMoving = vehicle.status === "EN_ROUTE" || vehicle.status === "DISPATCHED";

          return (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle && onSelectVehicle(vehicle)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isPumping
                  ? "bg-amber-50/50 border-amber-300 hover:border-amber-400"
                  : isMoving
                  ? "bg-orange-50/50 border-orange-300 hover:border-orange-400"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#0a2540] text-xs">
                    {vehicle.callSign}
                  </span>
                  <span className="text-slate-500 text-xs">({vehicle.id})</span>
                </div>
                <StatusBadge status={vehicle.status} />
              </div>

              {/* Vehicle Type & Assigned Station */}
              <div className="text-xs text-slate-600 mb-2 truncate">
                {vehicle.type} • {vehicle.stationName.split("-")[1] || vehicle.stationName}
              </div>

              {/* Telemetry Gauge Grid */}
              <div className="grid grid-cols-4 gap-2 text-xs bg-white p-2 rounded-lg border border-slate-200">
                {/* Water Level */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Droplet className="w-3 h-3 text-blue-600" />
                    WATER
                  </span>
                  <span className="font-bold text-blue-700 mt-0.5">
                    {vehicle.telemetry.waterLevelPct}%
                  </span>
                </div>

                {/* Pump PSI */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Gauge className="w-3 h-3 text-amber-600" />
                    PUMP
                  </span>
                  <span className="font-bold text-amber-700 mt-0.5">
                    {vehicle.telemetry.pumpPressurePsi} PSI
                  </span>
                </div>

                {/* Fuel Level */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Fuel className="w-3 h-3 text-emerald-600" />
                    FUEL
                  </span>
                  <span className="font-bold text-emerald-700 mt-0.5">
                    {vehicle.telemetry.fuelLevelPct}%
                  </span>
                </div>

                {/* Speed */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Zap className="w-3 h-3 text-orange-600" />
                    SPEED
                  </span>
                  <span className="font-bold text-slate-800 mt-0.5">
                    {vehicle.telemetry.speedKmh} km/h
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
