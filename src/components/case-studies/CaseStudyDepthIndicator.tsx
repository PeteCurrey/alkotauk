'use client';

import { useState, useEffect, useRef } from 'react';
import { Layers, ArrowDown, ShieldCheck, Thermometer } from 'lucide-react';

export default function CaseStudyDepthIndicator() {
  const [activeDepth, setActiveDepth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from 0% to 100% through the container
      const totalDist = rect.height;
      const currentPos = windowHeight * 0.5 - rect.top;
      const progress = Math.min(Math.max(currentPos / totalDist, 0), 1);
      
      setActiveDepth(Math.round(progress * 800));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const depthMarkers = [
    { depth: 0, label: 'SURFACE CAMP / FIRN LAYER', desc: 'Sastrugi surface, ambient -25°C to -35°C polar desert' },
    { depth: 200, label: 'COMPACTED GLACIAL ICE', desc: 'Firn-to-ice transition zone, porous crystal structures' },
    { depth: 500, label: 'HIGH-PRESSURE DEEP ICE SHEET', desc: 'Solid monolithic ice under immense overburden pressure' },
    { depth: 750, label: 'BASAL ICE INTERFACE', desc: 'Thermal boundary zone, basal melting and shear friction' },
    { depth: 800, label: 'SUBGLACIAL LAKE WHILLANS', desc: 'First clean human access — pristine subglacial aquatic environment' },
  ];

  return (
    <div ref={containerRef} className="bg-[#0A0E17] text-white p-8 sm:p-14 border border-[#1E2A3A] my-16 font-normal overflow-hidden">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#1E2A3A] mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#38BDF8] mb-2 font-mono">
            <Layers className="h-4 w-4" />
            <span>Telemetry Scale // Subglacial Depth Profile</span>
          </div>
          <h3 className="font-extralight text-3xl sm:text-4xl uppercase tracking-tight text-white">
            800 Metres Through Glacial Ice
          </h3>
        </div>
        <div className="flex items-center gap-4 bg-[#0F172A] px-6 py-3 border border-[#1E293B]">
          <span className="text-xs uppercase tracking-wider text-[#94A3B8]">Live Depth:</span>
          <span className="font-mono text-2xl text-[#38BDF8] font-bold">-{activeDepth} M</span>
        </div>
      </div>

      {/* Main Depth Column Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Vertical Depth Axis */}
        <div className="lg:col-span-4 relative pl-6 border-l-2 border-[#1E293B] space-y-12">
          {/* Moving Depth Probe */}
          <div
            className="absolute -left-[9px] w-4 h-4 rounded-full bg-[#38BDF8] border-2 border-[#0A0E17] transition-all duration-300 shadow-[0_0_15px_#38bdf8]"
            style={{
              top: `${Math.min(Math.max((activeDepth / 800) * 100, 0), 98)}%`,
            }}
          />

          {depthMarkers.map((marker) => (
            <div
              key={marker.depth}
              onClick={() => setActiveDepth(marker.depth)}
              className={`cursor-pointer transition-all ${
                activeDepth >= marker.depth ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[#38BDF8] mb-1">
                <span>{marker.depth === 0 ? '0 M' : `-${marker.depth} M`}</span>
                <span className="text-[#64748B]">──</span>
              </div>
              <h4 className="text-sm font-light uppercase tracking-wider text-white">
                {marker.label}
              </h4>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                {marker.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Thermal Drilling Telemetry Data */}
        <div className="lg:col-span-8 bg-[#0F172A] p-8 sm:p-10 border border-[#1E293B] space-y-8">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-mono">
              Drill Physics & Environmental Parameters
            </span>
            <span className="text-xs uppercase px-2.5 py-0.5 bg-[#0369A1] text-white">
              WISSARD Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-[#0A0E17] border border-[#1E293B]">
              <span className="text-[11px] text-[#64748B] uppercase tracking-wider block mb-1">Borehole Diameter</span>
              <span className="font-mono text-xl text-white block">~30 cm</span>
              <span className="text-[10px] text-[#94A3B8] mt-1 block">Calibrated for instrument sonde</span>
            </div>
            <div className="p-4 bg-[#0A0E17] border border-[#1E293B]">
              <span className="text-[11px] text-[#64748B] uppercase tracking-wider block mb-1">Drill Water Temp</span>
              <span className="font-mono text-xl text-[#38BDF8] block">Up to 90°C</span>
              <span className="text-[10px] text-[#94A3B8] mt-1 block">Alkota heating array</span>
            </div>
            <div className="p-4 bg-[#0A0E17] border border-[#1E293B]">
              <span className="text-[11px] text-[#64748B] uppercase tracking-wider block mb-1">Filtration Level</span>
              <span className="font-mono text-xl text-[#10B981] block">0.2 μm + UV</span>
              <span className="text-[10px] text-[#94A3B8] mt-1 block">Clean-access protocol</span>
            </div>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            As the drill head melts down through the 800-metre ice column, warm water must constantly circulate back up the borehole to prevent the sub-zero ice walls from instantly re-freezing and seizing the drill string. Six Alkota pressure-washer units provided the reliable continuous heat required to keep the borehole clear until penetration was achieved.
          </p>
        </div>
      </div>
    </div>
  );
}
