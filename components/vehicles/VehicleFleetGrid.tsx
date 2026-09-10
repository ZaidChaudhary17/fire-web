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
    <div className="space-y-4 font-mono text-xs">
      {/* Top Filter Bar */}
      <Card className="border-slate-800 bg-[#0e1217]">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search apparatus fleet by CallSign, ID, Type, Commander..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-slate-900 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">STATUS:</span>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-36 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="AVAILABLE_IN_STATION">AVAILABLE (READY)</option>
                <option value="ON_SCENE_PUMPING">ON SCENE PUMPING</option>
                <option value="EN_ROUTE">EN ROUTE</option>
                <option value="IN_MAINTENANCE">IN WORKSHOP</option>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">STATION:</span>
              <Select
                value={stationFilter}
                onChange={(e) => setStationFilter(e.target.value)}
                className="w-36 h-8 text-xs bg-slate-900"
              >
                <option value="ALL">ALL STATIONS</option>
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
              className={`border transition-all cursor-pointer group hover:scale-[1.01] ${
                isPumping
                  ? "bg-amber-950/15 border-amber-800/80 hover:border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : isMoving
                  ? "bg-orange-950/15 border-orange-800/80 hover:border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                  : "bg-[#0e1217] border-slate-800 hover:border-slate-700"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {vehicle.callSign}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ({vehicle.id})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {vehicle.type}
                  </div>
                </div>

                <StatusBadge status={vehicle.status} />
              </CardHeader>

              <CardContent className="space-y-3 p-4 pt-0">
                {/* Image & Quick Info */}
                <div className="relative h-28 w-full rounded-md overflow-hidden bg-slate-900 border border-slate-800">
                  {vehicle.image ? (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-600">
                      <Truck className="h-10 w-10" />
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-200 border border-slate-700">
                    {vehicle.stationName.split("-")[1] || vehicle.stationName}
                  </div>

                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-orange-300 border border-orange-800">
                    {vehicle.registrationNumber}
                  </div>
                </div>

                {/* Telemetry quick bar */}
                <div className="grid grid-cols-3 gap-2 bg-[#090d12] p-2 rounded border border-slate-800 text-[10px]">
                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Droplet className="w-3 h-3 text-cyan-400" />
                      WATER
                    </span>
                    <span className="font-bold text-cyan-300">
                      {vehicle.telemetry.waterLevelPct}% ({Math.round(vehicle.telemetry.waterRemainingLiters / 1000)}k L)
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-amber-400" />
                      PUMP PSI
                    </span>
                    <span className="font-bold text-amber-300">
                      {vehicle.telemetry.pumpPressurePsi} PSI
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-emerald-400" />
                      FUEL
                    </span>
                    <span className="font-bold text-emerald-300">
                      {vehicle.telemetry.fuelLevelPct}%
                    </span>
                  </div>
                </div>

                {/* Commander & Crew */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="truncate">Cmd: <strong className="text-slate-200">{vehicle.commanderName.split(" ")[0]}</strong></span>
                  <span className="text-emerald-400 font-semibold">{vehicle.assignedCrewCount} Crew on board</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
