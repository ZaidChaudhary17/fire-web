export type EocDefconLevel = "CONDITION_GREEN" | "CONDITION_AMBER" | "CONDITION_RED" | "CONDITION_CRITICAL";

export interface EocSystemStatus {
  defconLevel: EocDefconLevel;
  activeIncidentsCount: number;
  availableVehiclesCount: number;
  totalVehiclesCount: number;
  personnelOnDutyCount: number;
  totalPersonnelCount: number;
  avgResponseTimeMin: number;
  hydrantNetworkHealthPct: number;
  weatherTempC: number;
  weatherHumidityPct: number;
  weatherWindKmh: number;
  weatherWindDir: string;
  radioFrequencyMhz: number;
  telemetryLinkStatus: "ONLINE" | "DEGRADED" | "OFFLINE";
  lastSyncTimestamp: string;
}

export interface WardMetric {
  wardId: string;
  wardName: string;
  totalIncidents30d: number;
  avgResponseMinutes: number;
  activeHydrants: number;
  riskScore: number; // 0 - 100
  primaryStation: string;
}

export interface ResponseTimeMetric {
  timeSlot: string; // e.g., "00:00 - 04:00"
  turnoutSeconds: number;
  travelSeconds: number;
  totalSeconds: number;
  benchmarkGoalSeconds: number;
}

export interface IncidentTypeDistribution {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ComplianceReport {
  id: string;
  reportNumber: string;
  title: string;
  date: string;
  ward: string;
  station: string;
  author: string;
  status: "AUDITED" | "PENDING_REVIEW" | "APPROVED";
  incidentsCovered: number;
  summary: string;
  responseCompliancePct: number;
}
