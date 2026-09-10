export type RankLevel =
  | "Chief Fire Officer (CFO)"
  | "Deputy Chief Fire Officer (DCFO)"
  | "Divisional Fire Officer (DFO)"
  | "Station Officer (SO)"
  | "Sub-Officer (Sub-O)"
  | "Leading Fireman (LFM)"
  | "Fireman / Rescuer"
  | "Driver-Cum-Pump-Operator (DCPO)";

export type DutyStatus = "ON_DUTY_AVAILABLE" | "DEPLOYED_ACTIVE" | "ON_STANDBY" | "OFF_DUTY" | "MEDICAL_LEAVE";

export type Specialization =
  | "Hazmat Specialist"
  | "High-Angle Rope Rescue"
  | "Breathing Apparatus (BA) Expert"
  | "Hydraulic Extrication"
  | "Underwater / Coastal Diver"
  | "Incident Command System (ICS)"
  | "Thermal Imaging Recon"
  | "Emergency Medical Technician (EMT)";

export interface Personnel {
  id: string; // "MBMC-FD-101"
  badgeNumber: string;
  name: string;
  rank: RankLevel;
  stationId: string;
  stationName: string;
  shift: "SHIFT_ALPHA (08:00 - 16:00)" | "SHIFT_BRAVO (16:00 - 00:00)" | "SHIFT_CHARLIE (00:00 - 08:00)";
  dutyStatus: DutyStatus;
  specializations: Specialization[];
  phone: string;
  bloodGroup: string;
  emergencyContact: string;
  yearsOfService: number;
  assignedVehicleId?: string;
  assignedIncidentId?: string;
  heartRateBpm?: number;
  oxygenLevelPct?: number;
  lastMedicalCheck: string;
}
