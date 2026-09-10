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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between text-slate-900 select-none">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-3.5 flex items-center justify-between text-xs shadow-sm">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white font-bold shadow-sm">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-[#0a2540] text-sm tracking-wide">MIRA-BHAYANDAR MUNICIPAL CORPORATION</span>
            <span className="text-slate-500 text-[11px] block font-medium">Directorate of Fire & Emergency Services • Official Portal</span>
          </div>
        </Link>

        {/* Live Emergency Status Ribbon */}
        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>EOC Server: Online & Active</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl relative">
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-100">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-[#0a2540] shadow-sm">
              <Building2 className="h-7 w-7" />
            </div>
            <h2 className="text-xl font-bold text-[#0a2540] tracking-tight">
              Officer & CAD Sign-In
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Authorized municipal personnel access only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            {/* Employee ID / Badge */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold text-xs flex items-center justify-between">
                <span>Officer Badge / Employee ID</span>
                <span className="text-[11px] text-slate-400 font-normal">e.g. MBMC-CFO-001</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  required
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="MBMC-FD-101"
                  className="pl-9 bg-slate-50 border-slate-300 text-slate-900 h-10 focus:bg-white"
                />
              </div>
            </div>

            {/* Station / Division Selection */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold text-xs">
                Assigned Station Command Post
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <select
                  value={stationKey}
                  onChange={(e) => setStationKey(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-slate-50 pl-9 pr-3 py-1 text-xs text-slate-900 focus:outline-none focus:border-[#0a2540] focus:bg-white font-medium cursor-pointer"
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
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold text-xs flex items-center justify-between">
                <span>Security Access Code / PIN</span>
                <span className="text-[11px] text-slate-400 font-normal">256-Bit Encrypted</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9 bg-slate-50 border-slate-300 text-slate-900 h-10 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Terminal State */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#0a2540] focus:ring-[#0a2540] h-4 w-4"
                />
                <span className="text-xs font-medium">Keep console session active</span>
              </label>

              <span className="text-[11px] text-slate-500 font-semibold">VHF: CH-01</span>
            </div>

            {/* Submit CTA */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0a2540] hover:bg-slate-800 text-white font-bold h-11 tracking-wide shadow-md mt-3 rounded-lg"
            >
              <span>{isLoading ? "Authenticating Official..." : "Sign In to Command Portal"}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {/* Quick Demo Access Credentials */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 text-center font-medium">
            <span className="font-semibold text-slate-700">Official Access:</span> Click Sign In to enter with active officer session.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-600">
        © 2026 Mira-Bhayandar Municipal Corporation • Fire & Emergency Services • Government of Maharashtra
      </footer>
    </div>
  );
}
