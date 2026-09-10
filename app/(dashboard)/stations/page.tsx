"use client";

import * as React from "react";
import { MOCK_STATIONS, MOCK_INCIDENTS, MOCK_VEHICLES } from "@/lib/mock-data";
import { FireStation } from "@/types/station";
import { StationCard } from "@/components/stations/StationCard";
import { StationDetailModal } from "@/components/stations/StationDetailModal";
import { MapMockCanvas } from "@/components/shared/MapMockCanvas";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Droplet, Users, Truck, Gauge } from "lucide-react";

export default function StationsPage() {
  const [stations] = React.useState<FireStation[]>(MOCK_STATIONS);
  const [selectedStation, setSelectedStation] = React.useState<FireStation | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleSelectStation = (stn: FireStation) => {
    setSelectedStation(stn);
    setModalOpen(true);
  };

  const totalWater = stations.reduce((acc, s) => acc + s.waterReserveLiters, 0);
  const totalBaysOccupied = stations.reduce((acc, s) => acc + s.baysOccupied, 0);
  const totalBays = stations.reduce((acc, s) => acc + s.baysTotal, 0);
  const totalCrew = stations.reduce((acc, s) => acc + s.personnelOnDuty, 0);

  return (
    <div className="space-y-4 font-mono">
      {/* Top Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>MUNICIPAL STATIONS</span>
          </div>
          <div className="text-xl font-bold text-white mt-1">5 Operational Bays</div>
          <p className="text-[10px] text-slate-500">100% Geographic Coverage</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-cyan-400" />
            <span>TOTAL WATER STORAGE</span>
          </div>
          <div className="text-xl font-bold text-cyan-400 mt-1">
            {totalWater.toLocaleString()} Litres
          </div>
          <p className="text-[10px] text-slate-500">Underground RCC Reservoirs</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-orange-400" />
            <span>APPARATUS BAY LOAD</span>
          </div>
          <div className="text-xl font-bold text-orange-400 mt-1">
            {totalBaysOccupied} / {totalBays} Bays Occupied
          </div>
          <p className="text-[10px] text-slate-500">14 Active Vehicles</p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0e1217] border border-slate-800">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>CREW ON ACTIVE DUTY</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {totalCrew} Firefighters
          </div>
          <p className="text-[10px] text-slate-500">Shift Alpha Current</p>
        </div>
      </div>

      {/* Tactical Station Map */}
      <MapMockCanvas
        incidents={MOCK_INCIDENTS}
        stations={stations}
        vehicles={MOCK_VEHICLES}
        onSelectStation={handleSelectStation}
        heightClass="h-[300px]"
      />

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((stn) => (
          <StationCard
            key={stn.id}
            station={stn}
            onSelect={handleSelectStation}
          />
        ))}
      </div>

      {/* Modal */}
      <StationDetailModal
        station={selectedStation}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
