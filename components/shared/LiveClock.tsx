"use client";

import * as React from "react";
import { Clock, Shield } from "lucide-react";

export function LiveClock() {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return (
      <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
        <Clock className="w-3.5 h-3.5 text-red-500 animate-spin" />
        <span>SYNCING EOC TIME...</span>
      </div>
    );
  }

  const istTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const istDate = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const utcZulu = now.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Calculate current shift
  const currentHour = now.getHours();
  let currentShift = "SHIFT ALPHA";
  if (currentHour >= 16 || currentHour < 0) {
    currentShift = "SHIFT BRAVO";
  } else if (currentHour >= 0 && currentHour < 8) {
    currentShift = "SHIFT CHARLIE";
  }

  return (
    <div className="flex items-center gap-3 bg-[#0a0d12] px-3 py-1.5 rounded-md border border-slate-800 text-xs font-mono shadow-inner">
      <div className="flex items-center gap-1.5 text-red-400 font-bold tracking-wider">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-slate-100 text-sm">{istTime}</span>
        <span className="text-[10px] text-red-400 font-normal">IST</span>
      </div>

      <div className="hidden xl:flex items-center gap-2 text-slate-500 border-l border-slate-800 pl-3">
        <span>{istDate}</span>
        <span>•</span>
        <span>{utcZulu} ZULU</span>
      </div>

      <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
        <Shield className="w-3 h-3 text-emerald-400" />
        <span>{currentShift}</span>
      </div>
    </div>
  );
}
