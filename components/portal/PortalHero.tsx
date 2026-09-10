"use client";

import * as React from "react";
import Image from "next/image";
import { AlertOctagon, PhoneCall, Building2, MapPin } from "lucide-react";
import { QuickDispatchModal } from "@/components/layout/QuickDispatchModal";

interface PortalHeroProps {
  language: "en" | "mr";
}

export function PortalHero({ language }: PortalHeroProps) {
  const [reportModalOpen, setReportModalOpen] = React.useState(false);

  return (
    <section className="w-full bg-[#f1f5f9] border-b border-slate-300 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Public Portal Messaging & Massive Emergency CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a2540] tracking-tight leading-[1.15] font-sans">
              {language === "en"
                ? "Mira-Bhayandar Fire & Emergency Services"
                : "मीरा-भाईंदर अग्निशामक व आणीबाणी सेवा"}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-2xl">
              {language === "en"
                ? "Dedicated to saving lives and protecting property through prompt response and public safety education."
                : "त्वरित प्रतिसाद आणि जनजागृतीद्वारे नागरिकांचे प्राण आणि मालमत्तेचे रक्षण करण्यासाठी २४ तास कटिबद्ध."}
            </p>

            {/* Primary Action: Massive Highly Visible Standard Safety Red Button */}
            <div className="pt-2">
              <button
                onClick={() => setReportModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] active:bg-[#991b1b] text-white px-8 py-5 text-lg sm:text-xl font-black tracking-wide shadow-lg hover:shadow-xl transition-all border-2 border-red-700 cursor-pointer text-center"
                aria-label="Report emergency call 101 or 112"
              >
                <PhoneCall className="h-6 w-6 shrink-0" />
                <span>
                  {language === "en"
                    ? "REPORT EMERGENCY: CALL 101 OR 112"
                    : "आणीबाणी तक्रार: १०१ किंवा ११२ वर कॉल करा"}
                </span>
              </button>
            </div>

            {/* Direct Central Control Room numbers */}
            <div className="pt-2 text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-4">
              <span className="font-bold text-[#0a2540]">
                {language === "en" ? "Control Room Landlines:" : "नियंत्रण कक्ष संपर्क:"}
              </span>
              <a href="tel:02228112988" className="font-semibold text-slate-800 hover:text-red-600 underline">
                022-2811-2988
              </a>
              <span>/</span>
              <a href="tel:02228192244" className="font-semibold text-slate-800 hover:text-red-600 underline">
                022-2819-2244
              </a>
            </div>

          </div>

          {/* Right Column: Daytime Photograph of Local Fire Station Personnel / Apparatus */}
          <div className="lg:col-span-5 space-y-2">
            <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-sm">
              <div className="relative h-56 sm:h-64 w-full bg-slate-200">
                <Image
                  src="/mbmc_fire_engine_real.jpg"
                  alt="Daytime photograph of Mira-Bhayandar Municipal Corporation Fire Station apparatus and on-duty personnel"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Photo Caption & Administrative Verification */}
              <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-[#0a2540]">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  <span>Main Central Fire Station, Bhayandar West</span>
                </div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  MBMC UNIT #01
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 text-center font-sans">
              [Official daytime operational visual — Mira-Bhayandar Municipal Corporation]
            </div>
          </div>

        </div>
      </div>

      {/* Emergency Quick Intake Modal */}
      <QuickDispatchModal
        open={reportModalOpen}
        onOpenChange={setReportModalOpen}
      />
    </section>
  );
}
