export type IncidentSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "ADVISORY";

export type IncidentStatus =
  | "DISPATCHED"
  | "EN_ROUTE"
  | "ON_SCENE"
  | "CONTAINED"
  | "UNDER_CONTROL"
  | "RESOLVED"
  | "CLOSED";

export type IncidentType =
  | "Residential Fire"
  | "Commercial Complex Fire"
  | "Industrial / Chemical Hazmat"
  | "High-Rise Building Rescue"
  | "Vehicular Accident / Fuel Spill"
  | "Electrical Substation Fire"
  | "Coastal / Creek Rescue"
  | "Structural Collapse";

export interface IncidentLocation {
  address: string;
  landmark: string;
  ward: string; // e.g., "Ward 1 - Mira Road East"
  zone: string;
  lat: number;
  lng: number;
  gridRef: string;
}

export interface UnitAssignment {
  unitId: string;
  callSign: string;
  type: string;
  stationName: string;
  dispatchedAt: string;
  etaMinutes: number;
  status: "DISPATCHED" | "EN_ROUTE" | "ON_SCENE" | "RETURNING";
  crewCount: number;
  commander: string;
}

export interface IncidentTimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  author: string;
  type: "DISPATCH" | "STATUS_CHANGE" | "RADIO_COMMS" | "HAZMAT_ALERT" | "RESOLUTION";
}

export interface IncidentSOPItem {
  id: string;
  task: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
  requiredForSeverity: IncidentSeverity[];
}

export interface Incident {
  id: string; // e.g. "INC-2026-00421"
  incidentNumber: string;
  title: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  reportedAt: string;
  callerName: string;
  callerPhone: string;
  location: IncidentLocation;
  leadStationId: string;
  leadStationName: string;
  assignedUnits: UnitAssignment[];
  casualtiesReported: number;
  peopleEvacuated: number;
  structuresAtRisk: number;
  waterSupplyStatus: "HYDRANT_CONNECTED" | "TANKER_FEED" | "CREEK_DRAFTING" | "CRITICAL_LOW";
  hazmatPresent: boolean;
  hazmatDetails?: string;
  windSpeedKmh: number;
  windDirection: string;
  timeline: IncidentTimelineEvent[];
  sopChecklist: IncidentSOPItem[];
  radioChannel: string;
  cadNotes: string;
}
