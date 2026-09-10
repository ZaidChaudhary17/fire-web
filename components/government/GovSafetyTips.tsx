"use client";

import * as React from "react";
import { 
  AlertTriangle, 
  Flame, 
  Building2, 
  Zap, 
  HelpCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";

export function GovSafetyTips() {
  return (
    <section className="bg-white py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-900 uppercase">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>PUBLIC SAFETY ADVISORIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2540] tracking-tight font-sans">
            Citizen Fire Safety & Emergency Protocols
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Essential fire safety guidelines for residents, commercial establishments, and high-rise housing societies.
          </p>
        </div>

        {/* 3 Safety Category Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: High-Rise Buildings */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#0a2540]">
                <Building2 className="h-5 w-5 text-[#0a2540]" />
              </div>
              <h3 className="font-bold text-[#0a2540] text-base">
                High-Rise Apartment Safety
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Always use designated fire escape staircases; never use elevators during an alarm.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Keep building driveways clear of parked vehicles to allow 55m ladder access.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <span>Never lock emergency terrace exit doors or store combustible items in stairwells.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Domestic LPG & Kitchen Safety */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700">
                <Flame className="h-5 w-5 text-orange-700" />
              </div>
              <h3 className="font-bold text-[#0a2540] text-base">
                LPG & Kitchen Fire Safety
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>If you smell gas, open all windows immediately and turn off the cylinder valve.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <span>Do not operate electrical switches, lighters, or cell phones near a gas leak.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>For cooking oil pan fires, slide a metal lid over the pan; never pour water.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Electrical Safety & Monsoon */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Zap className="h-5 w-5 text-amber-800" />
              </div>
              <h3 className="font-bold text-[#0a2540] text-base">
                Electrical & Monsoon Hazards
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Ensure RCCB / ELCB circuit breakers are tested monthly in meter rooms.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                <span>Never touch submerged electrical poles or loose overhead wires in waterlogging.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Report sparking transformers directly to MBMC Disaster Control at 022-2819-2244.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
