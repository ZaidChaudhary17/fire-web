export type VehicleType =
  | "Water Tender (Heavy)"
  | "Multi-Purpose Pumper"
  | "55m Hydraulic Aerial Ladder (Bronto)"
  | "Foam Crash Tender"
  | "Quick Response Vehicle (QRV)"
  | "Hazmat / Chemical Response Unit"
  | "Emergency Rescue Van"
  | "Advanced Life Support Ambulance";

export type VehicleStatus =
  | "AVAILABLE_IN_STATION"
  | "DISPATCHED"
  | "EN_ROUTE"
  | "ON_SCENE_PUMPING"
  | "RETURNING"
  | "IN_MAINTENANCE"
  | "OUT_OF_SERVICE";

export interface VehicleTelemetry {
  speedKmh: number;
  engineRpm: number;
  waterLevelPct: number;
  waterRemainingLiters: number;
  foamLevelPct: number;
  foamRemainingLiters: number;
  fuelLevelPct: number;
  pumpPressurePsi: number;
  dischargeLpm: number;
  batteryHealthPct: number;
  engineTempC: number;
  latitude: number;
  longitude: number;
  headingDeg: number;
  lastPing: string;
}

export interface EmergencyVehicle {
  id: string; // "MBMC-FE-01"
  registrationNumber: string; // "MH-04-FE-2024"
  callSign: string; // "Tender Alpha 1"
  name: string;
  type: VehicleType;
  stationId: string;
  stationName: string;
  status: VehicleStatus;
  driverName: string;
  commanderName: string;
  crewCapacity: number;
  assignedCrewCount: number;
  assignedIncidentId?: string;
  waterCapacityLiters: number;
  foamCapacityLiters: number;
  pumpCapacityLpm: number;
  ladderReachMeters?: number;
  telemetry: VehicleTelemetry;
  serviceMileageKm: number;
  nextServiceDate: string;
  image?: string;
}
