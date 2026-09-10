"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, AlertTriangle, FileText, Calendar, ChevronRight } from "lucide-react";

interface PortalNoticeBoardProps {
  language: "en" | "mr";
}

export function PortalNoticeBoard({ language }: PortalNoticeBoardProps) {
  const ANNOUNCEMENTS = [
    {
      date: "10 SEP 2026",
      title: "Recruitment Notice: Application for Post of Leading Fireman & Driver Operator (Advt. No. MBMC/FIRE/2026/04)",
      badge: "RECRUITMENT",
      href: "/reports",
    },
    {
      date: "04 SEP 2026",
      title: "E-Tender Notice: Annual Comprehensive Maintenance Contract for 55m Hydraulic Turntable Ladders (TTL-01 & TTL-02)",
      badge: "TENDER",
      href: "/reports",
    },
    {
      date: "28 AUG 2026",
      title: "Empanelment of Licensed Fire Safety Agencies for Bi-Annual Audit of High-Rise Buildings (Form 'B' Compliance)",
      badge: "COMPLIANCE",
      href: "/reports",
    },
    {
      date: "15 AUG 2026",
      title: "Revised Citizen Charter for Online Fire Safety NOC Clearances and Inspection Timelines",
      badge: "PUBLIC NOTICE",
      href: "/reports",
    },
  ];

  const SAFETY_ALERTS = [
    {
      date: "CURRENT ADVISORY",
      title: "Monsoon Season Electrical Safety: Inspection of Basement Meter Rooms and Prevention of Water Inundation",
      badge: "SEASONAL",
      desc: "Cooperative Housing Societies are directed to ensure electric meter rooms are elevated above ground flood level and tested with RCCB breakers.",
    },
    {
      date: "MANDATORY RULE",
      title: "High-Rise Building Terrace Door & Stairwell Clearance Norms",
      badge: "SAFETY NORM",
      desc: "Emergency terrace doors must remain unlocked from the inside at all times. Storage of scrap, furniture, or gas cylinders in stairwells is strictly prohibited.",
    },
    {
      date: "PUBLIC ALERT",
      title: "Commercial Kitchens & Restaurants: Mandatory Installation of Fire Suppression Hoods and Gas Leak Detectors",
      badge: "COMMERCIAL",
      desc: "All commercial food establishments across Mira Road and Bhayandar must submit their updated 6-month fire inspection certificate by 30th September.",
    },
    {
      date: "FESTIVAL ADVISORY",
      title: "Public Festival Pandal & Event Ground Electrical Clearance Guidelines",
      badge: "ADVISORY",
      desc: "Temporary pandals must maintain a minimum 3-meter clearance from overhead electrical cables and keep two 9-liter water-CO2 extinguishers at each entry.",
    },
  ];

  return (
    <section className="w-full bg-white py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] tracking-tight font-sans">
            {language === "en" ? "Public Notice Board & Safety Alerts" : "सूचना फलक आणि सुरक्षा सूचना"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {language === "en"
              ? "Official departmental circulars, procurement tenders, recruitment notices, and seasonal safety advisories."
              : "अधिकृत विभागीय परिपत्रके, निविदा, भरती सूचना आणि हंगामी अग्निसुरक्षा मार्गदर्शक सूचना."}
          </p>
        </div>

        {/* Two-Column Structured Notice Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Latest Announcements */}
          <div className="bg-[#f8fafc] rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-[#0a2540]" />
                  <h3 className="text-lg font-bold text-[#0a2540] font-sans">
                    {language === "en" ? "Latest Announcements" : "नवीनतम घोषणा व निविदा"}
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {language === "en" ? "MBMC OFFICIAL" : "अधिकृत"}
                </span>
              </div>

              {/* Simple List Items */}
              <ul className="divide-y divide-slate-200">
                {ANNOUNCEMENTS.map((item, idx) => (
                  <li key={idx} className="py-3.5 first:pt-1 last:pb-1">
                    <Link
                      href={item.href}
                      className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-left"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#0a2540] bg-blue-100/80 px-2 py-0.5 rounded uppercase">
                            {item.badge}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-[#1e3a8a] group-hover:underline transition-colors font-sans">
                          {item.title}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-[#0a2540] shrink-0 self-center hidden sm:block" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* View All Announcements Link */}
            <div className="pt-4 mt-4 border-t border-slate-200 text-right">
              <Link
                href="/reports"
                className="text-xs font-bold text-[#0a2540] hover:text-[#1e3a8a] hover:underline inline-flex items-center gap-1"
              >
                <span>{language === "en" ? "View All Announcements" : "सर्व घोषणा पहा"}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Safety Alerts & Seasonal Tips */}
          <div className="bg-[#f8fafc] rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-700" />
                  <h3 className="text-lg font-bold text-[#0a2540] font-sans">
                    {language === "en" ? "Safety Alerts & Advisories" : "सुरक्षा इशारे व मार्गदर्शक सूचना"}
                  </h3>
                </div>
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded uppercase">
                  {language === "en" ? "CITIZEN SAFETY" : "नागरिक सुरक्षा"}
                </span>
              </div>

              {/* Simple List Items with Dates */}
              <ul className="divide-y divide-slate-200">
                {SAFETY_ALERTS.map((item, idx) => (
                  <li key={idx} className="py-3.5 first:pt-1 last:pb-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                        {item.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 font-sans">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* View Full Guidelines */}
            <div className="pt-4 mt-4 border-t border-slate-200 text-right">
              <Link
                href="/emergency"
                className="text-xs font-bold text-[#0a2540] hover:text-[#1e3a8a] hover:underline inline-flex items-center gap-1"
              >
                <span>{language === "en" ? "Read Full Safety Guidelines" : "संपूर्ण सुरक्षा नियम वाचा"}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
