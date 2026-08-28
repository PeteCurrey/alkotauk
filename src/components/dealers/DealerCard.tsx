'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Truck, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { Dealer } from '@/lib/dealers';
import { formatDistanceMiles } from '@/lib/dealers/geo';

interface DealerCardProps {
  dealer: Dealer;
  onSelect?: (dealer: Dealer) => void;
  isSelected?: boolean;
}

export default function DealerCard({ dealer, onSelect, isSelected }: DealerCardProps) {
  const isHQ = dealer.tier === 'national_hub';

  return (
    <div
      onClick={() => onSelect && onSelect(dealer)}
      className={`border transition-all p-6 sm:p-8 flex flex-col justify-between cursor-pointer ${
        isSelected
          ? 'border-alkota-orange bg-white shadow-xl ring-2 ring-alkota-orange/20'
          : 'border-[#D5D5D3] bg-white hover:border-alkota-black hover:shadow-md'
      }`}
    >
      <div>
        {/* Tier Badge & Distance */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 ${
              isHQ
                ? 'bg-alkota-black text-white'
                : 'bg-alkota-orange/10 text-alkota-orange border border-alkota-orange/20'
            }`}
          >
            {isHQ ? 'NATIONAL HUB' : 'AUTHORISED DEALER'}
          </span>

          {dealer.distance_miles !== undefined && (
            <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-orange bg-alkota-orange/5 px-2 py-0.5 border border-alkota-orange/20">
              {formatDistanceMiles(dealer.distance_miles)}
            </span>
          )}
        </div>

        {/* Dealer Name & Address */}
        <h3 className="font-barlow-condensed text-2xl sm:text-3xl font-black uppercase italic tracking-tight text-alkota-black leading-tight mb-2">
          {dealer.name}
        </h3>

        <div className="flex items-start gap-2 font-inter text-xs text-[#666] mb-4">
          <MapPin className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
          <span>
            {dealer.address_line1}, {dealer.town}, {dealer.county} {dealer.postcode}
          </span>
        </div>

        <p className="font-inter text-xs text-[#555] leading-relaxed mb-6 line-clamp-2">
          {dealer.short_description || dealer.description}
        </p>

        {/* Service Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {dealer.services?.slice(0, 4).map((s) => (
            <span
              key={s.service_key}
              className="font-ibm-plex-mono text-[8px] uppercase tracking-wider text-[#666] bg-[#F0F0EE] px-2 py-0.5"
            >
              {s.service_name}
            </span>
          ))}
          {(dealer.services?.length || 0) > 4 && (
            <span className="font-ibm-plex-mono text-[8px] uppercase tracking-wider text-[#999] px-1 py-0.5">
              +{(dealer.services?.length || 0) - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-[#EAEAEA] pt-4 flex items-center justify-between gap-4 font-ibm-plex-mono text-xs">
        <a
          href={`tel:${dealer.phone.replace(/\s+/g, '')}`}
          className="flex items-center gap-1.5 font-bold text-alkota-black hover:text-alkota-orange transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Phone className="h-3.5 w-3.5 text-alkota-orange" />
          <span>{dealer.phone}</span>
        </a>

        <Link
          href={`/dealers/${dealer.slug}`}
          className="flex items-center gap-1 font-bold text-alkota-orange hover:text-alkota-black transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <span>View Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
