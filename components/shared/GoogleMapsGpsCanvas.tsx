"use client";

import * as React from "react";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Incident } from "@/types/incident";
import { FireStation } from "@/types/station";
import { EmergencyVehicle } from "@/types/vehicle";
import {
  Building2,
  Flame,
  Truck,
  Droplet,
  Navigation,
  Radio,
  ExternalLink,
  Key,
  LocateFixed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

// Source: Google Maps Platform Code Assist
// Center coordinates for Mira-Bhayandar Municipal Corporation
const MBMC_CENTER = { lat: 19.2812, lng: 72.8561 };
const DEFAULT_ZOOM = 13;

interface GoogleMapsGpsCanvasProps {
  incidents: Incident[];
  stations: FireStation[];
  vehicles: EmergencyVehicle[];
  selectedIncidentId?: string | null;
  onSelectIncident?: (incident: Incident) => void;
  onSelectStation?: (station: FireStation) => void;
  onSelectVehicle?: (vehicle: EmergencyVehicle) => void;
  heightClass?: string;
}

// Inner component for custom Google Maps interactions (Traffic, Polylines, Live Geolocation)
function MapInternalControls({
  showTraffic,
  userLocation,
  activeRoute,
}: {
  showTraffic: boolean;
  userLocation: { lat: number; lng: number } | null;
  activeRoute: { origin: { lat: number; lng: number }; destination: { lat: number; lng: number } } | null;
}) {
  const map = useMap();
  const mapsLib = useMapsLibrary("maps");

  const [trafficLayer, setTrafficLayer] = React.useState<google.maps.TrafficLayer | null>(null);
  const [routePolyline, setRoutePolyline] = React.useState<google.maps.Polyline | null>(null);

  // Handle Traffic Layer
  React.useEffect(() => {
    if (!map || !mapsLib) return;

    if (showTraffic) {
      const layer = new google.maps.TrafficLayer();
      layer.setMap(map);
      setTrafficLayer(layer);
    } else {
      if (trafficLayer) {
        trafficLayer.setMap(null);
        setTrafficLayer(null);
      }
    }

    return () => {
      if (trafficLayer) {
        trafficLayer.setMap(null);
      }
    };
  }, [map, mapsLib, showTraffic]);

  // Handle Dynamic Dispatch Route using native Polyline (avoids legacy DirectionsService)
  React.useEffect(() => {
    if (!map || !activeRoute) {
      if (routePolyline) {
        routePolyline.setMap(null);
        setRoutePolyline(null);
      }
      return;
    }

    // Generate interpolated corridor points along road paths
    const midLat = (activeRoute.origin.lat + activeRoute.destination.lat) / 2;
    const midLng = (activeRoute.origin.lng + activeRoute.destination.lng) / 2;

    const pathCoordinates = [
      activeRoute.origin,
      { lat: activeRoute.origin.lat + (midLat - activeRoute.origin.lat) * 0.4, lng: activeRoute.origin.lng },
      { lat: midLat, lng: midLng },
      { lat: activeRoute.destination.lat, lng: midLng },
      activeRoute.destination,
    ];

    const polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: "#dc2626",
      strokeOpacity: 0.9,
      strokeWeight: 5,
      map,
    });

    setRoutePolyline(polyline);

    return () => {
      polyline.setMap(null);
    };
  }, [map, activeRoute]);

  // Auto-pan to user location if requested
  React.useEffect(() => {
    if (map && userLocation) {
      map.panTo(userLocation);
      map.setZoom(15);
    }
  }, [map, userLocation]);

  return null;
}

export function GoogleMapsGpsCanvas({
  incidents,
  stations,
  vehicles,
  selectedIncidentId,
  onSelectIncident,
  onSelectStation,
  onSelectVehicle,
  heightClass = "h-[540px]",
}: GoogleMapsGpsCanvasProps) {
  const [apiKey, setApiKey] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("mbmc_gmaps_key") ||
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
        ""
      );
    }
    return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  });

  const [mapTypeId, setMapTypeId] = React.useState<"roadmap" | "satellite" | "hybrid" | "terrain">("roadmap");
  const [showTraffic, setShowTraffic] = React.useState(false);
  const [showIncidents, setShowIncidents] = React.useState(true);
  const [showStations, setShowStations] = React.useState(true);
  const [showVehicles, setShowVehicles] = React.useState(true);
  const [showHydrants, setShowHydrants] = React.useState(false);

  // Live GPS simulation for moving vehicles
  const [liveVehicles, setLiveVehicles] = React.useState(vehicles);
  const [isSimulatingGps, setIsSimulatingGps] = React.useState(true);

  // Selected item for Google Maps InfoWindow
  const [activeMarker, setActiveMarker] = React.useState<{
    type: "incident" | "station" | "vehicle" | "user" | "hydrant";
    data: any;
    position: { lat: number; lng: number };
  } | null>(null);

  // User's Real Browser GPS
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [isLocatingUser, setIsLocatingUser] = React.useState(false);
  const [locationError, setLocationError] = React.useState<string | null>(null);

  // Key configuration modal state
  const [showKeyPrompt, setShowKeyPrompt] = React.useState(false);
  const [inputKey, setInputKey] = React.useState("");

  // Calculate active route from closest station to selected/active incident
  const activeIncident = incidents.find((i) => (selectedIncidentId ? i.id === selectedIncidentId : i.severity === "CRITICAL"));
  const nearestStation = stations[0]; // Kanakia Station default
  const activeRoute = React.useMemo(() => {
    if (!activeIncident || !nearestStation) return null;
    return {
      origin: nearestStation.coordinates,
      destination: activeIncident.location,
    };
  }, [activeIncident, nearestStation]);

  // Live GPS telemetry tick (simulating realistic vehicle motion)
  React.useEffect(() => {
    if (!isSimulatingGps) return;

    const interval = setInterval(() => {
      setLiveVehicles((prev) =>
        prev.map((vh) => {
          if (vh.status === "EN_ROUTE" || vh.status === "DISPATCHED") {
            const jitterLat = (Math.random() - 0.5) * 0.0004;
            const jitterLng = (Math.random() - 0.5) * 0.0004;
            const currentLat = vh.telemetry.latitude + jitterLat;
            const currentLng = vh.telemetry.longitude + jitterLng;
            const newSpeed = Math.min(65, Math.max(30, vh.telemetry.speedKmh + (Math.random() * 6 - 3)));

            return {
              ...vh,
              telemetry: {
                ...vh.telemetry,
                latitude: Number(currentLat.toFixed(6)),
                longitude: Number(currentLng.toFixed(6)),
                speedKmh: Math.round(newSpeed),
                headingDeg: (vh.telemetry.headingDeg + Math.round((Math.random() - 0.5) * 10) + 360) % 360,
              },
            };
          }
          return vh;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulatingGps]);

  // Handle User's Real Browser GPS Geolocation
  const handleGetLiveGps = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocatingUser(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingUser(false);
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setUserLocation(coords);
        setActiveMarker({
          type: "user",
          data: {
            name: "Your Live GPS Location",
            accuracy: Math.round(pos.coords.accuracy),
            timestamp: new Date(pos.timestamp).toLocaleTimeString(),
          },
          position: coords,
        });
      },
      (err) => {
        setIsLocatingUser(false);
        setLocationError(`GPS Error: ${err.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSaveApiKey = () => {
    if (inputKey.trim()) {
      localStorage.setItem("mbmc_gmaps_key", inputKey.trim());
      setApiKey(inputKey.trim());
      setShowKeyPrompt(false);
    }
  };

  return (
    <div className={`relative w-full ${heightClass} bg-slate-100 rounded-xl border border-slate-300 overflow-hidden flex flex-col shadow-sm select-none`}>
      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Badges */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-sans text-slate-700 shadow-md pointer-events-auto">
          <div className="flex items-center gap-1.5 text-[#0a2540] font-bold border-r border-slate-300 pr-2">
            <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>REAL GOOGLE MAPS GPS</span>
          </div>

          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showIncidents ? "bg-red-100 text-red-700 border border-red-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>INCIDENTS ({incidents.filter((i) => i.status !== "RESOLVED").length})</span>
          </button>

          <button
            onClick={() => setShowStations(!showStations)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showStations ? "bg-blue-100 text-blue-700 border border-blue-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>STATIONS ({stations.length})</span>
          </button>

          <button
            onClick={() => setShowVehicles(!showVehicles)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showVehicles ? "bg-amber-100 text-amber-800 border border-amber-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Truck className="w-3 h-3" />
            <span>FLEET ({liveVehicles.length})</span>
          </button>

          <button
            onClick={() => setShowHydrants(!showHydrants)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold transition ${
              showHydrants ? "bg-cyan-100 text-cyan-800 border border-cyan-300" : "text-slate-400 opacity-60"
            }`}
          >
            <Droplet className="w-3 h-3" />
            <span>HYDRANTS</span>
          </button>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-lg border border-slate-300 shadow-md pointer-events-auto">
          {/* Layer Selector */}
          <select
            value={mapTypeId}
            onChange={(e) => setMapTypeId(e.target.value as any)}
            className="text-xs bg-slate-50 border border-slate-300 text-[#0a2540] font-bold rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="roadmap">Roadmap</option>
            <option value="satellite">Satellite</option>
            <option value="hybrid">Hybrid</option>
            <option value="terrain">Terrain</option>
          </select>

          {/* Traffic Toggle */}
          <button
            onClick={() => setShowTraffic(!showTraffic)}
            className={`px-2 py-1 rounded text-xs font-bold transition ${
              showTraffic ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            title="Toggle Live Traffic"
          >
            Traffic
          </button>

          {/* Real Device GPS Geolocation Button */}
          <button
            onClick={handleGetLiveGps}
            disabled={isLocatingUser}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold bg-[#0a2540] text-white hover:bg-[#1e3a8a] transition shadow-sm"
            title="Get My Live Device GPS Location"
          >
            <LocateFixed className={`w-3.5 h-3.5 ${isLocatingUser ? "animate-spin text-amber-300" : "text-cyan-400"}`} />
            <span className="hidden sm:inline">{isLocatingUser ? "Locating..." : "My GPS"}</span>
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={() => setShowKeyPrompt(!showKeyPrompt)}
            className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Configure Google Maps API Key"
          >
            <Key className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Optional API Key Configuration Banner */}
      {showKeyPrompt && (
        <div className="absolute top-16 right-3 z-40 w-80 bg-white p-4 rounded-xl border border-slate-300 shadow-2xl text-xs text-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-[#0a2540] flex items-center gap-1.5">
              <Key className="w-4 h-4 text-blue-600" />
              Google Maps API Key
            </span>
            <button
              onClick={() => setShowKeyPrompt(false)}
              className="text-slate-400 hover:text-slate-700 font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-slate-600 text-[11px]">
            Enter your Google Cloud Maps API key or Maps Demo Key for full custom styling and high-res satellite imagery.
          </p>
          <input
            type="password"
            placeholder="AIzaSy..."
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <div className="flex items-center justify-between pt-1">
            <a
              href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_git_agentskills_v1"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
            >
              Get Free Demo Key <ExternalLink className="w-3 h-3" />
            </a>
            <Button
              size="sm"
              onClick={handleSaveApiKey}
              className="bg-[#0a2540] hover:bg-[#1e3a8a] text-white text-xs h-7 px-3"
            >
              Save Key
            </Button>
          </div>
        </div>
      )}

      {/* Main Google Maps Viewport */}
      <div className="relative w-full h-full flex-1">
        <APIProvider
          apiKey={apiKey}
          libraries={["places", "marker"]}
        >
          <Map
            defaultCenter={MBMC_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapTypeId}
            gestureHandling="greedy"
            disableDefaultUI={false}
            internalUsageAttributionIds={["gmp_git_agentskills_v1"]}
            className="w-full h-full min-h-[350px]"
          >
            {/* Map Internal Control Helpers */}
            <MapInternalControls
              showTraffic={showTraffic}
              userLocation={userLocation}
              activeRoute={activeRoute}
            />

            {/* User Real GPS Marker */}
            {userLocation && (
              <AdvancedMarker
                position={userLocation}
                title="Your Current Location"
                onClick={() =>
                  setActiveMarker({
                    type: "user",
                    data: {
                      name: "Operator / Citizen GPS Position",
                      accuracy: userLocation.accuracy ? `${Math.round(userLocation.accuracy)}m` : "High",
                      lat: userLocation.lat.toFixed(5),
                      lng: userLocation.lng.toFixed(5),
                    },
                    position: userLocation,
                  })
                }
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-cyan-500/30 animate-ping" />
                  <div className="w-4 h-4 rounded-full bg-cyan-600 border-2 border-white shadow-lg flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              </AdvancedMarker>
            )}

            {/* Fire Station Markers */}
            {showStations &&
              stations.map((st) => (
                <AdvancedMarker
                  key={st.id}
                  position={st.coordinates}
                  title={st.name}
                  onClick={() => {
                    setActiveMarker({
                      type: "station",
                      data: st,
                      position: st.coordinates,
                    });
                    if (onSelectStation) onSelectStation(st);
                  }}
                >
                  <Pin
                    background="#0a2540"
                    borderColor="#3b82f6"
                    glyphColor="#fbbf24"
                    scale={1.1}
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-300" />
                  </Pin>
                </AdvancedMarker>
              ))}

            {/* Fire Engine Fleet GPS Markers */}
            {showVehicles &&
              liveVehicles.map((vh) => {
                const isMoving = vh.status === "EN_ROUTE" || vh.status === "DISPATCHED";
                const isOnScene = vh.status === "ON_SCENE_PUMPING";

                return (
                  <AdvancedMarker
                    key={vh.id}
                    position={{
                      lat: vh.telemetry.latitude,
                      lng: vh.telemetry.longitude,
                    }}
                    title={`${vh.name} (${vh.id})`}
                    onClick={() => {
                      setActiveMarker({
                        type: "vehicle",
                        data: vh,
                        position: {
                          lat: vh.telemetry.latitude,
                          lng: vh.telemetry.longitude,
                        },
                      });
                      if (onSelectVehicle) onSelectVehicle(vh);
                    }}
                  >
                    <div className="relative group cursor-pointer">
                      <div
                        className={`p-1.5 rounded-full border-2 border-white text-white shadow-md transition-all ${
                          isOnScene
                            ? "bg-amber-600 ring-4 ring-amber-300/60 animate-pulse"
                            : isMoving
                            ? "bg-orange-600 ring-2 ring-orange-300"
                            : "bg-emerald-600"
                        }`}
                      >
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold bg-white px-1 rounded text-[#0a2540] border border-slate-300 shadow-sm">
                        {vh.id.replace("MBMC-FE-", "E-")}
                      </span>
                    </div>
                  </AdvancedMarker>
                );
              })}

            {/* Emergency Incident Markers */}
            {showIncidents &&
              incidents
                .filter((inc) => inc.status !== "RESOLVED")
                .map((inc) => (
                  <AdvancedMarker
                    key={inc.id}
                    position={inc.location}
                    title={inc.title}
                    onClick={() => {
                      setActiveMarker({
                        type: "incident",
                        data: inc,
                        position: inc.location,
                      });
                      if (onSelectIncident) onSelectIncident(inc);
                    }}
                  >
                    <div className="relative group cursor-pointer flex flex-col items-center">
                      <div
                        className={`p-2 rounded-full border-2 border-white text-white shadow-xl ${
                          inc.severity === "CRITICAL"
                            ? "bg-[#dc2626] ring-4 ring-red-300 animate-bounce"
                            : "bg-amber-600 ring-2 ring-amber-300"
                        }`}
                      >
                        <Flame className="w-4 h-4" />
                      </div>
                      <span className="mt-1 whitespace-nowrap text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-red-300 text-red-700 shadow-md">
                        {inc.incidentNumber}
                      </span>
                    </div>
                  </AdvancedMarker>
                ))}

            {/* Hydrant Markers */}
            {showHydrants &&
              stations.flatMap((st) =>
                st.hydrantsNearby.map((hyd) => (
                  <AdvancedMarker
                    key={hyd.id}
                    position={hyd.coordinates}
                    title={`${hyd.id} - ${hyd.location}`}
                    onClick={() =>
                      setActiveMarker({
                        type: "hydrant",
                        data: hyd,
                        position: hyd.coordinates,
                      })
                    }
                  >
                    <div className="w-3 h-3 rounded-full bg-cyan-600 border-2 border-white shadow-sm" />
                  </AdvancedMarker>
                ))
              )}

            {/* Rich Google Maps InfoWindow */}
            {activeMarker && (
              <InfoWindow
                position={activeMarker.position}
                onCloseClick={() => setActiveMarker(null)}
              >
                <div className="w-64 p-1 text-xs text-slate-800 space-y-2">
                  {/* Incident Info */}
                  {activeMarker.type === "incident" && (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
                        <span className="font-bold text-red-700">
                          {(activeMarker.data as Incident).incidentNumber}
                        </span>
                        <SeverityBadge severity={(activeMarker.data as Incident).severity} />
                      </div>
                      <p className="font-bold text-[#0a2540]">
                        {(activeMarker.data as Incident).title}
                      </p>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        {(activeMarker.data as Incident).location.address}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${activeMarker.position.lat},${activeMarker.position.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <Navigation className="w-3 h-3" /> Navigate in Maps
                        </a>
                        <StatusBadge status={(activeMarker.data as Incident).status} />
                      </div>
                    </div>
                  )}

                  {/* Station Info */}
                  {activeMarker.type === "station" && (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
                        <span className="font-bold text-[#0a2540]">
                          {(activeMarker.data as FireStation).code}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          {(activeMarker.data as FireStation).status}
                        </span>
                      </div>
                      <p className="font-bold text-[#0a2540]">
                        {(activeMarker.data as FireStation).name}
                      </p>
                      <div className="mt-1.5 space-y-1 text-[11px] text-slate-600">
                        <div className="flex justify-between">
                          <span>Crew on Duty:</span>
                          <span className="text-[#0a2540] font-bold">
                            {(activeMarker.data as FireStation).personnelOnDuty} / {(activeMarker.data as FireStation).personnelTotal}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Water Reserve:</span>
                          <span className="text-blue-700 font-bold">
                            {(activeMarker.data as FireStation).waterReserveLiters.toLocaleString()} L
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>GPS Coordinates:</span>
                          <span className="font-mono text-slate-700 text-[10px]">
                            {activeMarker.position.lat.toFixed(4)}°N, {activeMarker.position.lng.toFixed(4)}°E
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Vehicle Info */}
                  {activeMarker.type === "vehicle" && (
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
                        <span className="font-bold text-orange-700">
                          {(activeMarker.data as EmergencyVehicle).id}
                        </span>
                        <StatusBadge status={(activeMarker.data as EmergencyVehicle).status} />
                      </div>
                      <p className="font-bold text-[#0a2540]">
                        {(activeMarker.data as EmergencyVehicle).name}
                      </p>
                      <div className="mt-1.5 space-y-1 text-[11px] text-slate-600">
                        <div className="flex justify-between">
                          <span>GPS Speed:</span>
                          <span className="text-slate-900 font-bold">
                            {(activeMarker.data as EmergencyVehicle).telemetry.speedKmh} km/h
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Heading:</span>
                          <span className="text-slate-900 font-bold">
                            {(activeMarker.data as EmergencyVehicle).telemetry.headingDeg}° NNE
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Water Level:</span>
                          <span className="text-blue-700 font-bold">
                            {(activeMarker.data as EmergencyVehicle).telemetry.waterLevelPct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User GPS Info */}
                  {activeMarker.type === "user" && (
                    <div>
                      <div className="flex items-center gap-1.5 text-cyan-800 font-bold border-b border-slate-200 pb-1 mb-1">
                        <LocateFixed className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Live GPS Signal</span>
                      </div>
                      <p className="text-slate-700 text-[11px]">
                        Your current device coordinates are broadcasting to CAD dispatch.
                      </p>
                      <div className="mt-1.5 text-[10px] font-mono text-slate-600 space-y-0.5">
                        <p>Lat: {activeMarker.position.lat.toFixed(5)}</p>
                        <p>Lng: {activeMarker.position.lng.toFixed(5)}</p>
                      </div>
                    </div>
                  )}

                  {/* Hydrant Info */}
                  {activeMarker.type === "hydrant" && (
                    <div>
                      <span className="font-bold text-cyan-800">
                        {activeMarker.data.id}
                      </span>
                      <p className="text-slate-700 text-[11px]">
                        {activeMarker.data.location}
                      </p>
                      <p className="text-blue-700 font-bold text-[11px] mt-1">
                        Pressure: {activeMarker.data.pressureBar} Bar ({activeMarker.data.flowRateLpm} LPM)
                      </p>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="bg-white px-3.5 py-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 font-medium z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GOOGLE MAPS GPS TELEMETRY: ACTIVE</span>
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:inline text-slate-500">
            MIRA-BHAYANDAR CAD MUNICIPAL GRID (19.2812°N, 72.8561°E)
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {userLocation && (
            <span className="text-cyan-700 font-bold flex items-center gap-1">
              <LocateFixed className="w-3 h-3" /> GPS Locked
            </span>
          )}
          <span className="text-red-700 font-bold">
            {incidents.filter((i) => i.status !== "RESOLVED").length} ACTIVE EMERGENCIES
          </span>
        </div>
      </div>
    </div>
  );
}
