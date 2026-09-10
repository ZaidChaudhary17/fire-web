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
        "relative flex flex-col border-r border-slate-800 bg-[#0a0d12] transition-all duration-300 z-40 shrink-0 select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand & Department Logo Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-3.5 bg-[#080b0f]">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-950/80 border border-red-500/50">
            <Flame className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
                MBMC FIRE EOC
              </span>
              <span className="text-[10px] font-mono text-red-400 font-semibold truncate">
                MIRA-BHAYANDAR COMMAND
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {!collapsed && (
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
            Operational Modules
          </div>
        )}

        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          let badgeValue = 0;
          if (item.badgeKey === "activeIncidents") badgeValue = activeIncidentsCount;
          if (item.badgeKey === "maintenanceCount") badgeValue = maintenanceCount;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium font-mono transition-colors",
                isActive
                  ? "bg-red-950/60 text-white border border-red-600/70 shadow-inner"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-red-400" : "text-slate-400 group-hover:text-slate-200"
                )}
              />

              {!collapsed && (
                <div className="flex flex-1 items-center justify-between truncate">
                  <span className="truncate">{item.title}</span>

                  {badgeValue > 0 && (
                    <span
                      className={cn(
                        "ml-2 rounded px-1.5 py-0.2 text-[10px] font-bold font-mono",
                        item.badgeKey === "activeIncidents"
                          ? "bg-red-600 text-white animate-pulse"
                          : "bg-amber-600 text-white"
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
        <div className="m-2 rounded-md border border-slate-800 bg-[#0e1217] p-3 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              STATION STATUS
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
                    ? "bg-red-950/80 border-red-700 text-red-300"
                    : "bg-emerald-950/60 border-emerald-800 text-emerald-300"
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
      <div className="border-t border-slate-800 p-3 bg-[#080b0f]">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-800 border border-slate-700 font-mono font-bold text-xs text-slate-200">
            CFO
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#080b0f]" />
          </div>

          {!collapsed && (
            <div className="flex flex-col truncate font-mono text-[11px]">
              <span className="font-semibold text-slate-200 truncate">
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
