"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, Search, GraduationCap, Download, ArrowRight } from "lucide-react";

interface PortalQuickServicesGridProps {
  language: "en" | "mr";
}

export function PortalQuickServicesGrid({ language }: PortalQuickServicesGridProps) {
  const SERVICES = [
    {
      title: language === "en" ? "Apply for Fire NOC" : "अग्निसुरक्षा NOC अर्ज करा",
      description: language === "en" 
        ? "Submit new applications for Provisional or Final Fire Safety Certificates for residential, commercial, or industrial buildings."
        : "रहिवासी, व्यावसायिक किंवा औद्योगिक इमारतींसाठी नवीन तात्पुरत्या किंवा अंतिम अग्निसुरक्षा प्रमाणपत्रासाठी अर्ज करा.",
      icon: FileText,
      href: "/reports",
      buttonText: language === "en" ? "Start Application" : "अर्ज सुरू करा",
    },
    {
      title: language === "en" ? "Track NOC Status" : "NOC अर्जाची स्थिती तपासा",
      description: language === "en"
        ? "Check the real-time application processing stage, pending site inspection dates, or download issued Fire Safety NOCs."
        : "तुमच्या अर्जाची सद्यस्थिती, प्रत्यक्ष पाहणीची तारीख तपासा किंवा जारी केलेले प्रमाणपत्र डाउनलोड करा.",
      icon: Search,
      href: "/reports",
      buttonText: language === "en" ? "Track Status" : "स्थिती तपासा",
    },
    {
      title: language === "en" ? "Fire Safety Training" : "अग्निसुरक्षा प्रशिक्षण",
      description: language === "en"
        ? "Schedule free fire safety awareness sessions, evacuation drills, and extinguisher training for schools, housing societies, and offices."
        : "शाळा, गृहनिर्माण संस्था आणि कार्यालयांसाठी मोफत अग्निसुरक्षा प्रशिक्षण आणि प्रात्यक्षिकांचे आयोजन करा.",
      icon: GraduationCap,
      href: "/analytics",
      buttonText: language === "en" ? "Request Training" : "प्रशिक्षण विनंती",
    },
    {
      title: language === "en" ? "Download Forms" : "अर्ज व नमुने डाउनलोड",
      description: language === "en"
        ? "Access standardized application templates, Fire Act self-declaration checklists, compliance formats, and citizen guidelines."
        : "प्रमाणित अर्ज नमुने, अग्निसुरक्षा स्वयंचलित घोषणापत्रे आणि अधिकृत नागरिक मार्गदर्शक तत्त्वे डाउनलोड करा.",
      icon: Download,
      href: "/reports",
      buttonText: language === "en" ? "View Downloads" : "डाउनलोड पहा",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-12 lg:py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540] tracking-tight font-sans">
            {language === "en" ? "Citizen Quick Services" : "नागरिकांसाठी जलद सेवा"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            {language === "en" 
              ? "Access common public services, applications, and fire compliance resources." 
              : "सामान्य नागरी सेवा, अर्ज आणि अग्निसुरक्षा अनुपालन सुविधा मिळवा."}
          </p>
        </div>

        {/* 4 Clickable White Cards Grid with Subtle Drop Shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all text-left"
              >
                <div className="space-y-4">
                  {/* Basic Flat-Vector Icon */}
                  <div className="h-12 w-12 rounded-lg bg-[#f1f5f9] border border-slate-200 flex items-center justify-center text-[#0a2540] group-hover:bg-[#0a2540] group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-[#0a2540] group-hover:text-[#1e3a8a] transition-colors font-sans">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Indicator */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0a2540] group-hover:text-[#1e3a8a]">
                  <span>{service.buttonText}</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
