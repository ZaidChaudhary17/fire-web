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
    <Card className="border-slate-800 bg-[#0e1217]">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-orange-950/80 border border-orange-800 text-orange-400">
            <Truck className="w-4 h-4" />
          </div>
          <CardTitle className="text-sm font-mono uppercase">
            LIVE APPARATUS TELEMETRY FEED
          </CardTitle>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          RTK TELEMATICS LIVE
        </span>
      </CardHeader>

      <CardContent className="space-y-2.5 p-4 pt-0 max-h-[420px] overflow-y-auto">
        {sortedVehicles.map((vehicle) => {
          const isPumping = vehicle.status === "ON_SCENE_PUMPING";
          const isMoving = vehicle.status === "EN_ROUTE" || vehicle.status === "DISPATCHED";

          return (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle && onSelectVehicle(vehicle)}
              className={`p-3 rounded-lg border transition-all cursor-pointer font-mono ${
                isPumping
                  ? "bg-amber-950/20 border-amber-900/80 hover:border-amber-500"
                  : isMoving
                  ? "bg-orange-950/20 border-orange-900/80 hover:border-orange-500"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">
                    {vehicle.callSign}
                  </span>
                  <span className="text-slate-500 text-[10px]">({vehicle.id})</span>
                </div>
                <StatusBadge status={vehicle.status} />
              </div>

              {/* Vehicle Type & Assigned Station */}
              <div className="text-[11px] text-slate-400 mb-2 truncate">
                {vehicle.type} • {vehicle.stationName.split("-")[1] || vehicle.stationName}
              </div>

              {/* Telemetry Gauge Grid */}
              <div className="grid grid-cols-4 gap-2 text-[10px] bg-[#090d12] p-2 rounded border border-slate-800/80">
                {/* Water Level */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-cyan-400" />
                    WATER
                  </span>
                  <span className="font-bold text-cyan-300 mt-0.5">
                    {vehicle.telemetry.waterLevelPct}%
                  </span>
                </div>

                {/* Pump PSI */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-amber-400" />
                    PUMP
                  </span>
                  <span className="font-bold text-amber-300 mt-0.5">
                    {vehicle.telemetry.pumpPressurePsi} PSI
                  </span>
                </div>

                {/* Fuel Level */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Fuel className="w-3 h-3 text-emerald-400" />
                    FUEL
                  </span>
                  <span className="font-bold text-emerald-300 mt-0.5">
                    {vehicle.telemetry.fuelLevelPct}%
                  </span>
                </div>

                {/* Speed */}
                <div className="flex flex-col">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-orange-400" />
                    SPEED
                  </span>
                  <span className="font-bold text-slate-200 mt-0.5">
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
