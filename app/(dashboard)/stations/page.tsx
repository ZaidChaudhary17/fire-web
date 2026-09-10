"use client";

import * as React from "react";
import { MOCK_STATIONS, MOCK_INCIDENTS, MOCK_VEHICLES } from "@/lib/mock-data";
import { FireStation } from "@/types/station";
import { StationCard } from "@/components/stations/StationCard";
import { StationDetailModal } from "@/components/stations/StationDetailModal";
import { MapMockCanvas } from "@/components/shared/MapMockCanvas";
import { Building2, Droplet, Users, Truck } from "lucide-react";

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
    <div className="space-y-4">
      {/* Top Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span>Municipal Stations</span>
          </div>
          <div className="text-2xl font-bold text-[#0a2540] mt-1">5 Operational Bays</div>
          <p className="text-[11px] text-slate-500 mt-0.5">100% Geographic Coverage</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Droplet className="w-4 h-4 text-sky-600" />
            <span>Total Water Storage</span>
          </div>
          <div className="text-2xl font-bold text-sky-900 mt-1">
            {totalWater.toLocaleString()} Litres
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Underground RCC Reservoirs</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Truck className="w-4 h-4 text-blue-700" />
            <span>Apparatus Bay Load</span>
          </div>
          <div className="text-2xl font-bold text-[#0a2540] mt-1">
            {totalBaysOccupied} / {totalBays} Bays
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">14 Active Vehicles Assigned</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Crew On Active Duty</span>
          </div>
          <div className="text-2xl font-bold text-emerald-800 mt-1">
            {totalCrew} Firefighters
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Shift Alpha Active</p>
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
