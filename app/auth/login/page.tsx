"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Flame, 
  ShieldAlert, 
  Lock, 
  User, 
  ArrowRight, 
  Radio, 
  CheckCircle2,
  Building2,
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [employeeId, setEmployeeId] = React.useState("MBMC-CFO-001");
  const [password, setPassword] = React.useState("••••••••••••");
  const [stationKey, setStationKey] = React.useState("STN-02-BHAYANDAR");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#07090c] eoc-tactical-grid flex flex-col justify-between text-slate-100 font-mono select-none">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-[#090d12]/90 backdrop-blur-md px-6 py-3 flex items-center justify-between text-xs">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 text-white font-bold shadow-md">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-slate-100">MBMC FIRE & EMERGENCY SERVICES</span>
            <span className="text-slate-500 text-[10px] block">Central CAD Command Terminal</span>
          </div>
        </Link>

        {/* Live Emergency Status Ribbon */}
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>EOC CAD SERVER: ONLINE</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-slate-800 bg-[#0e1217] p-6 shadow-2xl relative scanline-overlay">
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-800/80">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-red-950 border border-red-800 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <ShieldAlert className="h-6 w-6 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide font-sans">
              OPERATOR CAD SIGN-IN
            </h2>
            <p className="text-xs text-slate-400">
              Authorized personnel access only • Official MBMC Emergency Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            {/* Employee ID / Badge */}
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] uppercase flex items-center justify-between">
                <span>OFFICER BADGE / EMPLOYEE ID</span>
                <span className="text-[10px] text-slate-500">e.g. MBMC-CFO-001</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="MBMC-FD-101"
                  className="pl-9 bg-slate-900 border-slate-700 text-slate-100"
                />
              </div>
            </div>

            {/* Station / Division Selection */}
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] uppercase">
                ASSIGNED STATION COMMAND POST
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <select
                  value={stationKey}
                  onChange={(e) => setStationKey(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-700 bg-slate-900 pl-9 pr-3 py-1 text-xs text-slate-100 focus:outline-none focus:border-red-500 font-mono cursor-pointer"
                >
                  <option value="HQ-EOC-MAIN">Central EOC Headquarters (Bhayandar W)</option>
                  <option value="STN-01-MIRA-E">Station 1 - Mira Road East</option>
                  <option value="STN-02-BHAYANDAR">Station 2 - Bhayandar West Central</option>
                  <option value="STN-03-MIDC">Station 3 - Bhayandar East (MIDC)</option>
                  <option value="STN-04-KASHIMIRA">Station 4 - Kashimira Junction</option>
                  <option value="STN-05-UTTAN">Station 5 - Uttan Coastal Sub-Station</option>
                </select>
              </div>
            </div>

            {/* Password / Access Key */}
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] uppercase flex items-center justify-between">
                <span>SECURITY ACCESS CODE / PIN</span>
                <span className="text-[10px] text-slate-500">256-Bit Encrypted</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9 bg-slate-900 border-slate-700 text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Terminal State */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-red-600 focus:ring-red-500 h-3.5 w-3.5"
                />
                <span className="text-[11px]">Keep console session active</span>
              </label>

              <span className="text-[10px] text-slate-500">VHF SYNC: CH-01</span>
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-10 tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-red-500/50 mt-2"
            >
              <span>{isLoading ? "AUTHENTICATING EOC OPERATOR..." : "SIGN IN TO COMMAND DASHBOARD"}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Quick Demo Access Credentials */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            <span className="text-slate-500">Demonstration Mode:</span> Click Sign In to enter with CFO privileges.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#080b0f] px-6 py-3 text-center text-xs text-slate-500">
        MBMC Fire & Emergency Services • Confidential Municipal CAD System • Thane District, Maharashtra
      </footer>
    </div>
  );
}
