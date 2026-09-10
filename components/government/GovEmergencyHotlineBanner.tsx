"use client";

import * as React from "react";
import { PhoneCall, AlertCircle, ShieldAlert, HeartPulse, Radio } from "lucide-react";

export function GovEmergencyHotlineBanner() {
  return (
    <section className="bg-[#0a2540] text-white py-4 px-4 sm:px-6 lg:px-8 shadow-inner border-y border-[#1e3a8a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* 1. Fire Emergency (101) */}
          <div className="flex items-center gap-3 bg-[#b91c1c] p-3 rounded-lg border border-red-500 shadow-sm">
            <div className="h-10 w-10 shrink-0 bg-white rounded-md flex items-center justify-center text-[#b91c1c]">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-100 uppercase tracking-wider block">
                FIRE & RESCUE EMERGENCY
              </span>
              <a href="tel:101" className="text-xl font-black text-white hover:underline">
                DIAL 101
              </a>
            </div>
          </div>

          {/* 2. National Emergency (112) */}
          <div className="flex items-center gap-3 bg-[#0e3a63] p-3 rounded-lg border border-[#1e4e79] shadow-sm">
            <div className="h-10 w-10 shrink-0 bg-white rounded-md flex items-center justify-center text-[#0a2540]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                ALL EMERGENCY SERVICES
              </span>
              <a href="tel:112" className="text-xl font-black text-white hover:underline">
                DIAL 112
              </a>
            </div>
          </div>

          {/* 3. MBMC Control Room Direct */}
          <div className="flex items-center gap-3 bg-[#0e3a63] p-3 rounded-lg border border-[#1e4e79] shadow-sm">
            <div className="h-10 w-10 shrink-0 bg-white rounded-md flex items-center justify-center text-[#0a2540]">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                MBMC CONTROL ROOM
              </span>
              <a href="tel:02228112988" className="text-base sm:text-lg font-bold text-white hover:underline">
                022-2811-2988
              </a>
            </div>
          </div>

          {/* 4. Disaster Cell Direct */}
          <div className="flex items-center gap-3 bg-[#0e3a63] p-3 rounded-lg border border-[#1e4e79] shadow-sm">
            <div className="h-10 w-10 shrink-0 bg-white rounded-md flex items-center justify-center text-[#0a2540]">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
                DISASTER MGMT CELL
              </span>
              <a href="tel:02228192244" className="text-base sm:text-lg font-bold text-white hover:underline">
                022-2819-2244
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
