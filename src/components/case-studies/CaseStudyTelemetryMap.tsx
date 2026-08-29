import { Compass, Navigation, Truck, MapPin, Radio, Shield } from 'lucide-react';

export default function CaseStudyTelemetryMap() {
  return (
    <div className="bg-[#0B0F14] text-white p-8 sm:p-14 border border-[#1E293B] my-16 font-normal overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#1E293B] mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#38BDF8] mb-2 font-mono">
            <Radio className="h-4 w-4 animate-pulse" />
            <span>Expedition Telemetry // Overland Traverse</span>
          </div>
          <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white">
            625-Mile Ross Ice Shelf Traverse
          </h3>
        </div>
        <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-mono">
          Route: McMurdo Station → Subglacial Lake Whillans
        </div>
      </div>

      {/* Telemetry Route Vector Representation */}
      <div className="relative bg-[#070A0E] border border-[#1E293B] p-6 sm:p-10 mb-8 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Waypoints sequence */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-[#38BDF8] font-mono text-xs border border-[#38BDF8]">
                01
              </div>
              <div className="flex-1 border-b border-[#1E293B] pb-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#38BDF8]">
                  <span>MCMURDO LOGISTICS BASE</span>
                  <span>77.85°S, 166.67°E</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Assembly of 13 Caterpillar tracked tractors & 26 ski modules
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pl-4">
              <div className="h-10 border-l border-dashed border-[#38BDF8]/40" />
              <span className="text-[11px] font-mono text-[#64748B]">
                Traversing 1,000 km across Ross Ice Shelf sastrugi
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-[#F59E0B] font-mono text-xs border border-[#F59E0B]">
                02
              </div>
              <div className="flex-1 border-b border-[#1E293B] pb-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#F59E0B]">
                  <span>SHEAR ZONE & MID-POINT WAYPOINT</span>
                  <span>80.50°S, 175.00°W</span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Crevasse radar navigation and fuel cache verification
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pl-4">
              <div className="h-10 border-l border-dashed border-[#F59E0B]/40" />
              <span className="text-[11px] font-mono text-[#64748B]">
                Approaching Whillans Ice Stream grounding zone
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#0284C7] flex items-center justify-center text-white font-mono text-xs border border-white shadow-[0_0_12px_#38bdf8]">
                03
              </div>
              <div className="flex-1 border-b border-[#0284C7] pb-2">
                <div className="flex items-center justify-between text-xs font-mono text-white">
                  <span>SUBGLACIAL LAKE WHILLANS DRILL SITE</span>
                  <span>84.24°S, 153.64°W</span>
                </div>
                <p className="text-xs text-[#38BDF8] mt-0.5 font-medium">
                  Camp established — Alkota heating skids deployed for borehole melt
                </p>
              </div>
            </div>
          </div>

          {/* Logistics Payload Metrics */}
          <div className="lg:col-span-4 bg-[#0F172A] p-6 border border-[#1E293B] space-y-4 text-xs font-normal">
            <div className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-mono border-b border-[#1E293B] pb-2">
              Traverse Payload Breakdown
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Total Equipment Weight:</span>
              <span className="font-mono text-white font-bold">500,000+ lbs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Tracked Prime Movers:</span>
              <span className="font-mono text-white font-bold">13 Tractors</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Ski-Mounted Containers:</span>
              <span className="font-mono text-white font-bold">26 Modules</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Traverse Duration:</span>
              <span className="font-mono text-white font-bold">~14 Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94A3B8]">Total Mission Distance:</span>
              <span className="font-mono text-[#38BDF8] font-bold">625 Miles</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#94A3B8] leading-relaxed italic">
        Data verified against published University of Nebraska–Lincoln Science Management Office expedition traverse reports and WISSARD logistics publications.
      </p>
    </div>
  );
}
