"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Flame, 
  Building, 
  FileCheck2, 
  LifeBuoy, 
  GraduationCap, 
  FileSpreadsheet, 
  ArrowRight,
  ShieldCheck,
  PhoneCall
} from "lucide-react";

const PUBLIC_SERVICES = [
  {
    icon: Flame,
    title: "Emergency Fire Suppression",
    code: "SERVICE-01",
    badge: "24x7 EMERGENCY",
    description: "Rapid turnout and fire extinguishment across residential apartments, commercial complexes, industrial units, and vehicular accidents across Mira-Bhayandar municipal limits.",
    link: "/emergency",
    actionLabel: "View Fire Response Protocol",
  },
  {
    icon: Building,
    title: "High-Rise & Aerial Rescue",
    code: "SERVICE-02",
    badge: "SPECIALIZED RESCUE",
    description: "Deployment of 55-meter hydraulic turntable ladders (TTL), compressed air breathing apparatus, and specialized rescue teams for high-rise residential towers.",
    link: "/stations",
    actionLabel: "View High-Rise Apparatus",
  },
  {
    icon: FileCheck2,
    title: "Fire Safety NOC & Compliance",
    code: "SERVICE-03",
    badge: "CITIZEN PORTAL",
    description: "Official application, on-site inspection, and renewal of Provisional and Final Fire Safety Certificates (NOC) for new constructions and existing commercial buildings.",
    link: "/reports",
    actionLabel: "Apply for Fire Safety NOC",
  },
  {
    icon: LifeBuoy,
    title: "Disaster & Monsoon Flood Relief",
    code: "SERVICE-04",
    badge: "DISASTER MITIGATION",
    description: "Inundation rescue with inflatable motorized boats, structural collapse extraction, hazardous chemical HAZMAT containment, and tree-fall clearance during monsoon storms.",
    link: "/emergency",
    actionLabel: "Disaster Response SOP",
  },
  {
    icon: GraduationCap,
    title: "Community Fire Drills & Training",
    code: "SERVICE-05",
    badge: "PUBLIC EDUCATION",
    description: "Free public fire safety training, evacuation drills, and fire extinguisher handling demonstrations for cooperative housing societies, schools, colleges, and hospitals.",
    link: "/analytics",
    actionLabel: "Request Fire Safety Drill",
  },
  {
    icon: FileSpreadsheet,
    title: "Incident Inquiries & Reports",
    code: "SERVICE-06",
    badge: "PUBLIC RECORDS",
    description: "Issuance of official fire investigation reports, cause-of-fire certificates, and insurance assessment dossiers verified by the Chief Fire Officer.",
    link: "/reports",
    actionLabel: "Search Fire Report Dossier",
  },
];

export function GovServicesSection() {
  return (
    <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded bg-blue-100/80 px-3 py-1 text-xs font-bold text-[#0a2540] uppercase">
            <ShieldCheck className="h-4 w-4 text-[#1e3a8a]" />
            <span>MUNICIPAL PUBLIC SAFETY SERVICES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2540] tracking-tight font-sans">
            Official Municipal Fire & Disaster Management Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All public fire and rescue operations are provided completely free of charge to all citizens 
            of Mira-Bhayandar under the Maharashtra Fire Prevention and Life Safety Measures Act.
          </p>
        </div>

        {/* 6 Public Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLIC_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.code}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0a2540]">
                      <Icon className="h-6 w-6 text-[#0a2540]" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0a2540] font-sans">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] hover:text-[#0a2540] hover:underline"
                  >
                    <span>{service.actionLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Urgent Helpline Box */}
        <div className="mt-10 bg-white rounded-xl border-2 border-red-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0a2540]">
                Facing an Active Fire or Life Hazard?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Do not attempt to extinguish large fires yourself. Evacuate immediately and contact the control room.
              </p>
            </div>
          </div>
          <a
            href="tel:101"
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3 rounded-md font-bold text-sm shadow transition"
          >
            <PhoneCall className="h-4 w-4" />
            <span>DIAL 101 NOW</span>
          </a>
        </div>

      </div>
    </section>
  );
}
