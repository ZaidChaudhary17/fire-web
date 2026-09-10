import {
  LayoutDashboard,
  Flame,
  Building2,
  Truck,
  Users,
  BarChart3,
  FileText,
  Settings,
  Radio,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
  badgeKey?: "activeIncidents" | "maintenanceCount";
  description: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Command Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Real-time municipal tactical overview & telemetry",
  },
  {
    title: "Emergency CAD",
    href: "/emergency",
    icon: Flame,
    badgeKey: "activeIncidents",
    description: "Active fire calls, CAD dispatch & triage queue",
  },
  {
    title: "Fire Stations",
    href: "/stations",
    icon: Building2,
    description: "5 MBMC fire stations, bay readiness & reserves",
  },
  {
    title: "Apparatus Fleet",
    href: "/vehicles",
    icon: Truck,
    badgeKey: "maintenanceCount",
    description: "14 emergency engines, telemetry & pump status",
  },
  {
    title: "Personnel Roster",
    href: "/personnel",
    icon: Users,
    description: "Active crew, shift schedules & ICS specialists",
  },
  {
    title: "EOC Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Response time benchmarks & ward risk models",
  },
  {
    title: "Incident Dossiers",
    href: "/reports",
    icon: FileText,
    description: "Compliance audits, logs & official exports",
  },
  {
    title: "System Config",
    href: "/settings",
    icon: Settings,
    description: "EOC parameters, sirens, wards & audio tones",
  },
];
