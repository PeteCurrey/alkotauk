'use client';

import { Dealer } from '@/lib/dealers';
import { MapPin, Navigation as NavIcon, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface DealerInteractiveMapProps {
  dealers: Dealer[];
  selectedDealer: Dealer | null;
  onSelectDealer: (dealer: Dealer) => void;
}

export default function DealerInteractiveMap({
  dealers,
  selectedDealer,
  onSelectDealer,
}: DealerInteractiveMapProps) {
  // Convert UK latitude / longitude (Approx bounds: Lat 50.0 to 59.0, Lng -6.0 to 2.0) to SVG coordinate percentages
  const minLat = 50.0;
  const maxLat = 58.5;
  const minLng = -6.5;
  const maxLng = 2.0;

  const projectToMap = (lat: number, lng: number) => {
    // Invert Y because SVG coordinates go top-to-bottom
    const yPercent = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const xPercent = ((lng - minLng) / (maxLng - minLng)) * 100;
    return {
      top: `${Math.min(Math.max(yPercent, 5), 95)}%`,
      left: `${Math.min(Math.max(xPercent, 5), 95)}%`,
    };
  };

  return (
    <div className="relative w-full h-[550px] lg:h-[700px] bg-[#111111] border border-[#2B2B2B] overflow-hidden flex flex-col justify-between p-6">
      {/* Abstract Map Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 pointer-events-none" />

      {/* Map Header Overlay */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div className="bg-black/80 px-3 py-1.5 border border-[#333]">
          <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-orange uppercase tracking-widest">
            UK AUTHORISED NETWORK MAP // {dealers.length} HUBS ACTIVE
          </span>
        </div>
        <span className="font-ibm-plex-mono text-[9px] text-[#666] uppercase">
          CLICK PIN TO INSPECT
        </span>
      </div>

      {/* Pins Layer */}
      <div className="relative z-10 flex-1 w-full h-full my-4">
        {dealers.map((dealer) => {
          const pos = projectToMap(dealer.latitude, dealer.longitude);
          const isSelected = selectedDealer?.id === dealer.id;
          const isHQ = dealer.tier === 'national_hub';

          return (
            <div
              key={dealer.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              <button
                onClick={() => onSelectDealer(dealer)}
                className={`relative flex items-center justify-center transition-transform cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
                aria-label={`Select ${dealer.name}`}
              >
                {/* Pulse ring on active */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-alkota-orange/30 animate-ping pointer-events-none" />
                )}

                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center shadow-lg border ${
                    isSelected
                      ? 'bg-alkota-orange border-white text-white'
                      : isHQ
                      ? 'bg-white border-alkota-black text-alkota-black'
                      : 'bg-[#1E1E1E] border-[#444] text-[#ccc] hover:border-alkota-orange hover:text-white'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                </div>
              </button>

              {/* Pin tooltip label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap bg-black/90 border px-2.5 py-1 text-[9px] font-ibm-plex-mono uppercase tracking-wider text-white shadow-xl pointer-events-none transition-opacity ${
                  isSelected ? 'border-alkota-orange opacity-100' : 'border-[#333] opacity-0 group-hover:opacity-100'
                }`}
              >
                <p className="font-bold">{dealer.town}</p>
                <p className="text-[8px] text-[#888]">{dealer.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Dealer Bottom Card */}
      {selectedDealer ? (
        <div className="relative z-20 bg-black/90 border border-alkota-orange p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-ibm-plex-mono text-[8px] font-bold text-alkota-orange uppercase bg-alkota-orange/10 px-2 py-0.5">
                {selectedDealer.town.toUpperCase()}
              </span>
              <span className="font-ibm-plex-mono text-[9px] text-[#888]">
                {selectedDealer.county} ({selectedDealer.postcode})
              </span>
            </div>
            <h4 className="font-barlow-condensed text-xl font-bold uppercase text-white">
              {selectedDealer.name}
            </h4>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${selectedDealer.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 border border-[#333] bg-[#1E1E1E] text-white px-3.5 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold hover:border-alkota-orange transition-colors"
            >
              <Phone className="h-3 w-3 text-alkota-orange" />
              <span>{selectedDealer.phone}</span>
            </a>
            <Link
              href={`/dealers/${selectedDealer.slug}`}
              className="flex items-center gap-1.5 bg-alkota-orange text-white px-4 py-2 font-ibm-plex-mono text-[10px] uppercase font-bold hover:bg-white hover:text-black transition-colors"
            >
              <span>Full Details</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative z-20 bg-black/60 border border-[#222] p-3 text-center font-ibm-plex-mono text-[10px] text-[#888]">
          Select any dealer pin to view local coverage, phone number, and service capabilities.
        </div>
      )}
    </div>
  );
}
