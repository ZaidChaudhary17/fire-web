"use client";

import * as React from "react";
import { EmergencyVehicle } from "@/types/vehicle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Truck, 
  Droplet, 
  Gauge, 
  Fuel, 
  Search, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import Image from "next/image";

interface VehicleFleetGridProps {
  vehicles: EmergencyVehicle[];
  onSelectVehicle: (vehicle: EmergencyVehicle) => void;
}

export function VehicleFleetGrid({
  vehicles,
  onSelectVehicle,
}: VehicleFleetGridProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [stationFilter, setStationFilter] = React.useState("ALL");

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.callSign.toLowerCase().includes(search.toLowerCase()) ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase()) ||
      v.commanderName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    const matchesStation = stationFilter === "ALL" || v.stationId === stationFilter;

    return matchesSearch && matchesStatus && matchesStation;
  });

  return (
    <div className="space-y-4 text-xs">
      {/* Top Filter Bar */}
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search apparatus fleet by CallSign, ID, Type, Commander..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:bg-white text-xs h-9"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold text-xs">Status:</span>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-40 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="AVAILABLE_IN_STATION">Available (Ready)</option>
                <option value="ON_SCENE_PUMPING">On Scene Pumping</option>
                <option value="EN_ROUTE">En Route</option>
                <option value="IN_MAINTENANCE">In Workshop</option>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold text-xs">Station:</span>
              <Select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className="w-44 h-9 text-xs bg-slate-50 border-slate-300 text-slate-800"
              >
                <option value="ALL">All Stations</option>
                <option value="STN-01">STN-01 Mira Rd (E)</option>
                <option value="STN-02">STN-02 Bhayandar (W)</option>
                <option value="STN-03">STN-03 Bhayandar (E)</option>
                <option value="STN-04">STN-04 Kashimira</option>
                <option value="STN-05">STN-05 Uttan Coastal</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid of Vehicles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVehicles.map((vehicle) => {
          const isPumping = vehicle.status === "ON_SCENE_PUMPING";
          const isMoving = vehicle.status === "EN_ROUTE";

          return (
            <Card
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle)}
              className={`border transition-all cursor-pointer group hover:shadow-md bg-white ${
                isPumping
                  ? "border-amber-300 ring-1 ring-amber-200"
                  : isMoving
                  ? "border-orange-300 ring-1 ring-orange-200"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0a2540] text-sm">
                      {vehicle.callSign}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ({vehicle.id})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium truncate">
                    {vehicle.type}
                  </div>
                </div>

                <StatusBadge status={vehicle.status} />
              </CardHeader>

              <CardContent className="space-y-3 p-4 pt-3">
                {/* Image & Quick Info */}
                <div className="relative h-28 w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  {vehicle.image ? (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <Truck className="h-10 w-10" />
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 bg-[#0a2540]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-medium">
                    {vehicle.stationName.split("-")[1] || vehicle.stationName}
                  </div>

                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-900 font-bold border border-slate-300">
                    {vehicle.registrationNumber}
                  </div>
                </div>

                {/* Telemetry quick bar */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-sky-600" />
                      Water
                    </span>
                    <span className="font-bold text-sky-900">
                      {vehicle.telemetry.waterLevelPct}% ({Math.round(vehicle.telemetry.waterRemainingLiters / 1000)}k L)
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-amber-600" />
                      Pump PSI
                    </span>
                    <span className="font-bold text-amber-900">
                      {vehicle.telemetry.pumpPressurePsi} PSI
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-emerald-600" />
                      Fuel
                    </span>
                    <span className="font-bold text-emerald-900">
                      {vehicle.telemetry.fuelLevelPct}%
                    </span>
                  </div>
                </div>

                {/* Commander & Crew */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <span className="truncate">Cmd: <strong className="text-slate-900">{vehicle.commanderName.split(" ")[0]}</strong></span>
                  <span className="text-emerald-700 font-semibold">{vehicle.assignedCrewCount} Crew on board</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
