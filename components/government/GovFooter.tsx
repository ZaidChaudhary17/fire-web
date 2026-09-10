"use client";

import * as React from "react";
import Link from "next/link";
import { Flame, PhoneCall, ShieldCheck, MapPin, Mail, ExternalLink, Globe } from "lucide-react";

export function GovFooter() {
  return (
    <footer className="bg-[#0a1b2a] text-slate-300 border-t border-[#132c42] font-sans">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Official Crest & Directorate Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#1e3a8a] text-white border border-blue-400">
                <Flame className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-white text-sm uppercase block tracking-wider font-sans">
                  MBMC FIRE SERVICES
                </span>
                <span className="text-[11px] text-slate-400 block font-medium">
                  Directorate of Fire & Emergency Services
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official public emergency portal of Mira-Bhayandar Municipal Corporation. 
              Dedicated to saving lives and safeguarding municipal infrastructure 24/7/365.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Headquarters: Chhatrapati Shivaji Maharaj Marg, Bhayandar (W), Dist. Thane 401101</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span>fire@mbmc.gov.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Citizen Emergency Helplines */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Emergency Hotlines
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between items-center bg-[#07131e] p-2 rounded border border-slate-800">
                <span className="font-semibold text-red-400">Fire & Rescue Control:</span>
                <a href="tel:101" className="font-bold text-white hover:underline">101 / 022-2811-2988</a>
              </li>
              <li className="flex justify-between items-center bg-[#07131e] p-2 rounded border border-slate-800">
                <span className="font-semibold text-slate-300">National Emergency:</span>
                <a href="tel:112" className="font-bold text-white hover:underline">112</a>
              </li>
              <li className="flex justify-between items-center bg-[#07131e] p-2 rounded border border-slate-800">
                <span className="font-semibold text-slate-300">Disaster Management:</span>
                <a href="tel:02228192244" className="font-bold text-white hover:underline">022-2819-2244</a>
              </li>
              <li className="flex justify-between items-center bg-[#07131e] p-2 rounded border border-slate-800">
                <span className="font-semibold text-slate-300">Ambulance Services:</span>
                <a href="tel:108" className="font-bold text-white hover:underline">108</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Services & Citizen Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/reports" className="hover:text-white transition">
                  Apply for Fire Safety Certificate (NOC)
                </Link>
              </li>
              <li>
                <Link href="/stations" className="hover:text-white transition">
                  Locate Nearest Municipal Fire Station
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-white transition">
                  Municipal Fire Fleet & Apparatus
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-white transition">
                  Fire Incident Investigation Reports
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition">
                  Public Emergency Response Statistics
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-amber-400 font-semibold hover:underline">
                  Officer / Dispatcher Command Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Governance & Compliance */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-2">
              Governance & Policies
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white cursor-pointer">Right to Information (RTI) Act</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Citizen Charter & Service Level Agreements</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Maharashtra Fire Safety Act 2006</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Public Privacy & Data Security Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Website Accessibility Statement (WCAG 2.1 AA)</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 rounded bg-[#07131e] px-2.5 py-1 text-[11px] text-emerald-400 border border-slate-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>OFFICIAL MBMC GOV PORTAL</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="bg-[#050e17] border-t border-[#132c42] py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Mira-Bhayandar Municipal Corporation (MBMC). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Designed for Public Accessibility</span>
            <span>•</span>
            <span>Government of Maharashtra</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
