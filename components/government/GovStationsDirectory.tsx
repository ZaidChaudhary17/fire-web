"use client";

import * as React from "react";
import Link from "next/link";
import { Building2, PhoneCall, MapPin, Truck, Users, Shield } from "lucide-react";

const STATIONS = [
  {
    name: "Main Central Fire Station (Station 01)",
    zone: "Bhayandar (West) Sector",
    address: "Opposite Municipal Head Office, Chhatrapati Shivaji Maharaj Marg, Bhayandar West, 401101",
    phone: "022-2811-2988",
    officer: "Station Officer R. K. Patil",
    apparatus: "04 Units (2 Water Tenders, 1 Foam Tender, 1 Rescue Van)",
    badge: "CENTRAL HQ",
  },
  {
    name: "Mira Road Fire Station (Station 02)",
    zone: "Mira Road (East) Sector",
    address: "Sector 9, Near Shanti Nagar High School, Mira Road East, 401107",
    phone: "022-2812-4011",
    officer: "Station Officer V. M. Shinde",
    apparatus: "03 Units (1 Hydraulic TTL 55m, 2 Water Tenders)",
    badge: "HIGH-RISE DIVISION",
  },
  {
    name: "Bhayandar East Fire Station (Station 03)",
    zone: "Bhayandar (East) Industrial Sector",
    address: "Navghar Road, Near Flyover Bridge, Bhayandar East, 401105",
    phone: "022-2818-3322",
    officer: "Station Officer S. B. More",
    apparatus: "03 Units (2 Water Tenders, 1 Chemical HAZMAT Unit)",
    badge: "INDUSTRIAL HAZMAT",
  },
  {
    name: "Uttan Coastal Fire Station (Station 04)",
    zone: "Uttan, Gorai & Coastal Belt",
    address: "Uttan Pali Road, Near Velankanni Church, Uttan, 401106",
    phone: "022-2845-1200",
    officer: "Station Officer A. D. Jadhav",
    apparatus: "02 Units (1 All-Terrain Water Tender, 2 Inflatable Boats)",
    badge: "COASTAL RESCUE",
  },
  {
    name: "Kanakia Fire Sub-Station (Station 05)",
    zone: "Kanakia & Beverly Park Sector",
    address: "Near Kanakia Police Ground, Mira Road East, 401107",
    phone: "022-2810-7788",
    officer: "Station Officer N. P. Deshmukh",
    apparatus: "02 Units (1 Fast Response Water Mist, 1 Water Tender)",
    badge: "RAPID FIRST-RESPONSE",
  },
  {
    name: "Golden Nest Fire Station (Station 06)",
    zone: "Golden Nest & Kashimira Sector",
    address: "Golden Nest Circle, Mira-Bhayandar Road, 401104",
    phone: "022-2813-5566",
    officer: "Station Officer K. L. Gawande",
    apparatus: "02 Units (2 Heavy Multi-Purpose Water Tenders)",
    badge: "HIGHWAY CORRIDOR",
  },
];

export function GovStationsDirectory() {
  return (
    <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded bg-blue-100/80 px-3 py-1 text-xs font-bold text-[#0a2540] uppercase">
              <Building2 className="h-4 w-4 text-[#1e3a8a]" />
              <span>MUNICIPAL INFRASTRUCTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2540] tracking-tight font-sans">
              Fire Stations & Operational Network
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              6 strategically located municipal fire stations provide 24/7 blanket coverage across all 
              residential, commercial, and industrial zones of Mira-Bhayandar.
            </p>
          </div>

          <Link
            href="/stations"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0a2540] border border-slate-300 font-bold px-4 py-2.5 rounded text-xs sm:text-sm shadow-sm transition"
          >
            <Shield className="h-4 w-4 text-[#1e3a8a]" />
            <span>Interactive Station Map</span>
          </Link>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATIONS.map((stn) => (
            <div
              key={stn.name}
              className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:border-slate-300 transition"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">
                      {stn.zone}
                    </span>
                    <h3 className="text-base font-bold text-[#0a2540] font-sans">
                      {stn.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#1e3a8a] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                    {stn.badge}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{stn.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Users className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="font-semibold">{stn.officer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Truck className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{stn.apparatus}</span>
                  </div>
                </div>
              </div>

              {/* Direct Telephone Button */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">STATION CONTROL:</span>
                <a
                  href={`tel:${stn.phone.replace(/-/g, "")}`}
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0a2540] hover:text-red-600 transition"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-red-600" />
                  <span>{stn.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
