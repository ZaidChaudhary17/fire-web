"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS } from "@/lib/navigation";
import { MBMC_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Radio, 
  PhoneCall,
  UserCheck,
  Building2
} from "lucide-react";
import { MOCK_INCIDENTS, MOCK_VEHICLES } from "@/lib/mock-data";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const activeIncidentsCount = MOCK_INCIDENTS.filter((i) => i.status !== "RESOLVED").length;
  const maintenanceCount = MOCK_VEHICLES.filter((v) => v.status === "IN_MAINTENANCE").length;

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-[#132c42] bg-[#0a2540] text-white transition-all duration-300 z-40 shrink-0 select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand & Department Logo Header */}
      <div className="flex h-16 items-center justify-between border-b border-[#1e3a8a] px-3.5 bg-[#0a1b2a]">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow-md border border-red-400">
            <Flame className="h-6 w-6 text-amber-300" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-extrabold tracking-wider text-white uppercase font-sans">
                MBMC FIRE SERVICES
              </span>
              <span className="text-[10px] text-amber-300 font-semibold truncate">
                COMMAND CENTER EOC
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 text-slate-300 hover:bg-[#1e3a8a] hover:text-white transition"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {!collapsed && (
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            OPERATIONAL MODULES
          </div>
        )}

        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          let badgeValue = 0;
          if (item.badgeKey === "activeIncidents") badgeValue = activeIncidentsCount;
          if (item.badgeKey === "maintenanceCount") badgeValue = maintenanceCount;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-semibold transition-colors",
                isActive
                  ? "bg-[#1e3a8a] text-white border-l-4 border-amber-400 font-bold shadow-sm"
                  : "text-slate-300 hover:bg-[#132d4a] hover:text-white"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  isActive ? "text-amber-400" : "text-slate-300 group-hover:text-white"
                )}
              />

              {!collapsed && (
                <div className="flex flex-1 items-center justify-between truncate">
                  <span className="truncate">{item.title}</span>

                  {badgeValue > 0 && (
                    <span
                      className={cn(
                        "ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold",
                        item.badgeKey === "activeIncidents"
                          ? "bg-red-600 text-white"
                          : "bg-amber-500 text-white"
                      )}
                    >
                      {badgeValue}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Station Readiness Quick Bar */}
      {!collapsed && (
        <div className="m-2 rounded-lg border border-[#1e3a8a] bg-[#0a1b2a] p-3 text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Building2 className="w-3.5 h-3.5 text-blue-300" />
              STATIONS STATUS
            </span>
            <span className="text-emerald-400 font-bold">5 / 5 READY</span>
          </div>

          <div className="grid grid-cols-5 gap-1 pt-1">
            {["MR-1", "BW-2", "BE-3", "KM-4", "UT-5"].map((code, idx) => (
              <div
                key={code}
                className={cn(
                  "text-center py-1 rounded text-[9px] font-bold border",
                  idx === 0 || idx === 2
                    ? "bg-red-950 border-red-600 text-red-200"
                    : "bg-emerald-950 border-emerald-600 text-emerald-200"
                )}
                title={`${code}: ${idx === 0 || idx === 2 ? "Active Incident Response" : "Standby Operational"}`}
              >
                {code}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Operator Session Footer */}
      <div className="border-t border-[#1e3a8a] p-3 bg-[#0a1b2a]">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#1e3a8a] border border-blue-400 font-bold text-xs text-white">
            CFO
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#0a1b2a]" />
          </div>

          {!collapsed && (
            <div className="flex flex-col truncate text-[11px]">
              <span className="font-bold text-white truncate">
                Dr. Arvind Shinde
              </span>
              <span className="text-slate-400 text-[10px] truncate">
                Chief Fire Officer • CAD-01
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
