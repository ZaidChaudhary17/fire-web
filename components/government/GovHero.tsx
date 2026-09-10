"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  AlertOctagon, 
  PhoneCall, 
  ShieldCheck, 
  Building2, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  FileCheck,
  MapPin
} from "lucide-react";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";

export function GovHero() {
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  return (
    <section className="relative bg-white text-slate-900 border-b border-slate-200 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Civic Messaging & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Official Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-3.5 py-1 text-xs font-bold text-[#0a2540]">
              <ShieldCheck className="h-4 w-4 text-[#1e3a8a]" />
              <span>OFFICIAL 24/7 MUNICIPAL EMERGENCY PORTAL</span>
            </div>

            {/* High-Impact Accessible Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-[1.15] font-sans">
              Protecting Lives, Property & the Environment Across Mira-Bhayandar
            </h1>

            {/* Trustworthy Citizen Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-2xl">
              The Directorate of Fire & Emergency Services safeguards 1.2+ million citizens across 
              Mira Road, Bhayandar, and coastal sectors with 24/7 rapid fire suppression, high-rise rescue, 
              monsoon flood relief, and building safety certifications.
            </p>

            {/* Action Buttons: Standard Safety Red for Emergency Report */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary Safety Red Button */}
              <button
                onClick={() => setReportModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-md bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3.5 text-base font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                aria-label="Report Fire Emergency online or call 101"
              >
                <AlertOctagon className="h-5 w-5" />
                <span>REPORT FIRE EMERGENCY</span>
              </button>

              {/* Secondary Institutional Button */}
              <Link
                href="/reports"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white hover:bg-slate-50 text-[#0a2540] border-2 border-[#0a2540] px-5 py-3 text-sm sm:text-base font-bold shadow-sm transition"
              >
                <FileCheck className="h-4 w-4 text-[#0a2540]" />
                <span>FIRE SAFETY & NOC PORTAL</span>
              </Link>

              {/* Secondary Officer Link */}
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0a2540] transition py-2"
              >
                <span>Command Center</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Public Service Standards Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero Citizen Charge</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Sub-7 Min Response</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>

          </div>

          {/* Right Column: Institutional Civic Card & Operational Facts */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Civic Visual Display Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-[#0a2540] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-400" />
                  <span className="font-bold text-xs uppercase tracking-wide">
                    MBMC CENTRAL FIRE BRIGADE HQ
                  </span>
                </div>
                <span className="text-[11px] bg-emerald-700 text-white px-2 py-0.5 rounded font-bold">
                  24x7 READY
                </span>
              </div>

              {/* Clean Image / Civic Presentation */}
              <div className="relative h-48 sm:h-56 w-full bg-slate-200">
                <Image
                  src="/fire_engine_hero_clean.jpg"
                  alt="MBMC Fire Brigade Heavy Water Tender Emergency Response Unit"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Civic Quick Statistics Grid */}
              <div className="p-4 grid grid-cols-2 gap-3 bg-white">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    COVERAGE STATIONS
                  </span>
                  <span className="text-xl font-extrabold text-[#0a2540]">
                    06 STATIONS
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Mira Rd & Bhayandar
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    FLEET APPARATUS
                  </span>
                  <span className="text-xl font-extrabold text-[#0a2540]">
                    16 VEHICLES
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Water, Foam & 55m TTL
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    AVG TURNOUT TIME
                  </span>
                  <span className="text-xl font-extrabold text-emerald-700">
                    58 SECONDS
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    From Alarm Trigger
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">
                    EMERGENCY CALLS
                  </span>
                  <span className="text-xl font-extrabold text-[#0a2540]">
                    100% AUDITED
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    CAD Logged & GPS Tracked
                  </span>
                </div>
              </div>
            </div>

            {/* Urgent Notice Strip */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-xs text-amber-900 flex items-start gap-2">
              <MapPin className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Citizen Safety Advisory:</span> In case of electrical or high-rise fire, never use elevators. Always use designated fire escape staircases and dial 101 immediately.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Emergency CAD Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </section>
  );
}
