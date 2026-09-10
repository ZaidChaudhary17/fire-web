"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, MapPin, Phone, Mail, ShieldCheck, Lock } from "lucide-react";

interface PortalOfficialFooterProps {
  language: "en" | "mr";
}

export function PortalOfficialFooter({ language }: PortalOfficialFooterProps) {
  return (
    <footer className="w-full bg-[#0a1b2a] text-slate-300 border-t-2 border-[#132c42] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          
          {/* Col 1: Official Directorate Identification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#1e3a8a] text-white border border-blue-400">
                <Flame className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm uppercase block tracking-wider font-sans">
                  {language === "en" ? "MBMC FIRE SERVICES" : "मीरा-भाईंदर अग्निशामक सेवा"}
                </span>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {language === "en"
                    ? "Directorate of Fire & Emergency Services"
                    : "अग्निशामक व आणीबाणी सेवा संचालनालय"}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {language === "en"
                ? "Official municipal fire prevention, emergency rescue, and disaster mitigation authority of Mira-Bhayandar Municipal Corporation."
                : "मीरा-भाईंदर महानगरपालिकेचे अधिकृत अग्निसुरक्षा, आणीबाणी बचाव आणि आपत्ती व्यवस्थापन प्राधिकरण."}
            </p>

            <div className="inline-flex items-center gap-1.5 rounded bg-[#07131e] px-2.5 py-1 text-[11px] text-emerald-400 border border-slate-800">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{language === "en" ? "Official Public Portal" : "अधिकृत शासकीय पोर्टल"}</span>
            </div>
          </div>

          {/* Col 2: Physical Address & Control Room */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2 font-sans">
              {language === "en" ? "Physical Address" : "कार्यालयीन पत्ता"}
            </h4>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                <span>
                  <strong>MBMC Central Fire Control Room</strong><br />
                  Opposite Municipal Head Office,<br />
                  Chhatrapati Shivaji Maharaj Marg,<br />
                  Bhayandar (West), Dist. Thane, Maharashtra – 401101
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Administrative Contacts (Distinct from Emergency Hotlines) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2 font-sans">
              {language === "en" ? "Administrative Contacts" : "प्रशासकीय संपर्क"}
            </h4>
            <div className="text-xs text-slate-300 space-y-2.5">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-400 block text-[11px]">General Inquiries / Office:</strong>
                  <a href="tel:02228192828" className="text-white hover:underline font-bold">022-2819-2828</a> / <a href="tel:02228193838" className="text-white hover:underline font-bold">022-2819-3838</a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-400 block text-[11px]">Official Email:</strong>
                  <a href="mailto:fire@mbmc.gov.in" className="text-white hover:underline">fire@mbmc.gov.in</a>
                </span>
              </div>

              <div className="p-2 bg-[#07131e] rounded border border-slate-800 text-[11px]">
                <span className="text-red-400 font-bold block">For Active Emergencies:</span>
                <span className="text-white font-extrabold">Dial 101 or 112 (Toll-Free 24x7)</span>
              </div>
            </div>
          </div>

          {/* Col 4: Public Links & Portal Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2 font-sans">
              {language === "en" ? "Useful Links & Governance" : "महत्त्वाच्या लिंक्स"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/reports" className="hover:text-white transition">
                  {language === "en" ? "Citizen Charter & NOC Rules" : "नागरिक सनद व NOC नियम"}
                </Link>
              </li>
              <li>
                <Link href="/stations" className="hover:text-white transition">
                  {language === "en" ? "Fire Stations Directory" : "अग्निशमन केंद्र निर्देशिका"}
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-white transition">
                  {language === "en" ? "Apparatus & Equipment" : "वाहने व उपकरणे"}
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  {language === "en" ? "Right to Information (RTI)" : "माहितीचा अधिकार (RTI)"}
                </span>
              </li>
              <li>
                <Link href="/auth/login" className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>{language === "en" ? "Officer Portal Login" : "अधिकारी पोर्टल लॉगिन"}</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="bg-[#050e17] border-t border-[#132c42] py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Mira-Bhayandar Municipal Corporation (MBMC). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Use</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Accessibility Statement (WCAG 2.1 AA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
