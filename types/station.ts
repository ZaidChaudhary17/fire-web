export type StationStatus = "OPERATIONAL" | "HIGH_ACTIVITY" | "MAINTENANCE" | "STANDBY";

export interface StationHydrant {
  id: string;
  location: string;
  pressureBar: number;
  flowRateLpm: number;
  status: "ACTIVE" | "LOW_PRESSURE" | "OUT_OF_SERVICE";
  distanceMeters: number;
  coordinates: { lat: number; lng: number };
}

export interface FireStation {
  id: string; // "STN-01"
  code: string; // "MR-01"
  name: string; // "Station 1 - Mira Road East"
  ward: string; // "Ward 1"
  address: string;
  officerInCharge: string;
  officerRank: string;
  phone: string;
  emergencyHotline: string;
  status: StationStatus;
  coordinates: { lat: number; lng: number };
  baysTotal: number;
  baysOccupied: number;
  waterReserveLiters: number;
  waterMaxCapacityLiters: number;
  foamReserveLiters: number;
  personnelTotal: number;
  personnelOnDuty: number;
  vehiclesAssignedIds: string[];
  activeIncidentsCount: number;
  hydrantsNearby: StationHydrant[];
  coverageRadiusKm: number;
  turnoutTimeAvgSeconds: number;
}
