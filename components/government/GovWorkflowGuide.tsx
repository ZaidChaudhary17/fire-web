"use client";

import * as React from "react";
import { 
  PhoneCall, 
  MapPin, 
  Radio, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from "lucide-react";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Citizen Dials 101 / 112",
    timeframe: "00 to 15 SECONDS",
    icon: PhoneCall,
    description: "Your emergency call connects directly to the MBMC Central Fire Control Room. The operator logs your location, landmark, and the nature of the fire or rescue emergency.",
  },
  {
    step: "02",
    title: "Incident Verification & CAD Triage",
    timeframe: "15 to 30 SECONDS",
    icon: MapPin,
    description: "The computer-aided dispatch system automatically pinpoints the exact municipal ward and selects the closest fire station with optimal road clearance.",
  },
  {
    step: "03",
    title: "Station Alarm & Immediate Turnout",
    timeframe: "30 to 60 SECONDS",
    icon: Radio,
    description: "The station klaxon sounds instantly. Dedicated fire crew, heavy water tender, and breathing apparatus units roll out of the bay under priority siren.",
  },
  {
    step: "04",
    title: "On-Scene Suppression & Rescue",
    timeframe: "SUB-7 MINUTE ARRIVAL",
    icon: Truck,
    description: "Firefighters commence search and rescue, structural containment, and hose line suppression while coordinating with local police and medical teams.",
  },
  {
    step: "05",
    title: "Incident Secured & Official Audit",
    timeframe: "FINAL RESOLUTION",
    icon: CheckCircle2,
    description: "The fire is fully doused, area cooled, and salvage completed. An official incident report is recorded in the municipal archives for public safety records.",
  },
];

export function GovWorkflowGuide() {
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-[#0a2540] uppercase">
            <Clock className="h-4 w-4 text-[#1e3a8a]" />
            <span>CITIZEN RESPONSE GUIDE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2540] tracking-tight font-sans">
            How the Municipal Emergency Response Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From the moment you report a fire to the final on-scene resolution, every second is 
            coordinated across our centralized emergency network.
          </p>
        </div>

        {/* 5 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between relative shadow-sm hover:border-slate-300 transition"
              >
                <div>
                  {/* Step Number & Time */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                    <span className="text-xl font-black text-[#0a2540]">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 uppercase">
                      {step.timeframe}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2.5">
                    <div className="h-10 w-10 rounded-lg bg-blue-100/80 flex items-center justify-center text-[#0a2540]">
                      <Icon className="h-5 w-5 text-[#0a2540]" />
                    </div>
                    <h3 className="text-base font-bold text-[#0a2540] font-sans">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="pt-4 mt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>SOP VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
