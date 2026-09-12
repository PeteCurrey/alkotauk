'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Settings, SlidersHorizontal, ExternalLink, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { resolveMachineImage } from '@/lib/images';

export interface ContextCardMachine {
  slug: string;
  model_code: string;
  name: string;
  category: string;
  pressure_bar?: number | null;
  flow_rate_lpm?: number | null;
  power_source?: string | null;
  heating_fuel?: string | null;
  voltage?: string | null;
  primary_image_url?: string | null;
}

interface MachineEnquiryContextCardProps {
  source: 'selector' | 'compare' | 'quote' | 'service' | 'general';
  machines: ContextCardMachine[];
  requirementsSummary?: string[];
  selectorParams?: string;
  comparisonParams?: string;
}

export default function MachineEnquiryContextCard({
  source,
  machines,
  requirementsSummary = [],
  selectorParams,
  comparisonParams,
}: MachineEnquiryContextCardProps) {
  if (machines.length === 0 && requirementsSummary.length === 0) {
    return null;
  }

  const isSelector = source === 'selector';
  const isCompare = source === 'compare';
  const isDirect = source === 'quote' || source === 'service' || (!isSelector && !isCompare);

  const badgeText = isSelector
    ? 'DETERMINISTIC SELECTION SHORTLIST'
    : isCompare
      ? 'MULTI-MODEL COMPARISON MATRIX'
      : 'FACTORY SPECIFICATION REQUEST';

  const badgeColor = isSelector
    ? 'text-alkota-orange border-alkota-orange/40 bg-alkota-orange/10'
    : isCompare
      ? 'text-blue-400 border-blue-500/40 bg-blue-500/10'
      : 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';

  return (
    <div className="mb-10 bg-alkota-steel/40 border border-alkota-iron p-6 md:p-8 relative">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-alkota-iron/60">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
          <span className={`font-ibm-plex-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border ${badgeColor}`}>
            {badgeText}
          </span>
        </div>

        {/* Action Link to Adjust */}
        {isSelector && (
          <Link
            href={`/machines/help-me-choose${selectorParams ? `?${selectorParams}` : ''}`}
            className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs font-bold text-alkota-orange hover:text-orange-400 transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Adjust Selection Criteria →</span>
          </Link>
        )}

        {isCompare && (
          <Link
            href={`/machines/compare${comparisonParams ? `?${comparisonParams}` : ''}`}
            className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Edit Comparison Fleet →</span>
          </Link>
        )}
      </div>

      {/* Shortlisted / Compared Machines */}
      {machines.length > 0 && (
        <div className="mb-6">
          <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-silver mb-3">
            Selected Machinery ({machines.length} Model{machines.length > 1 ? 's' : ''}):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {machines.map((m) => {
              const imageSrc = resolveMachineImage(m.primary_image_url || null, m.model_code, m.category);
              return (
                <div
                  key={m.slug || m.model_code}
                  className="bg-alkota-black border border-alkota-iron p-4 flex flex-col justify-between hover:border-alkota-orange/50 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="font-ibm-plex-mono text-xs font-bold text-alkota-orange">
                          {m.model_code}
                        </span>
                        <h4 className="text-white text-sm font-bold line-clamp-1">
                          {m.name}
                        </h4>
                      </div>
                      {m.slug && (
                        <Link
                          href={`/machines/${m.category}/${m.slug}`}
                          target="_blank"
                          title="Open specification sheet in new tab"
                          className="text-alkota-grey hover:text-white transition-colors p-1"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>

                    <div className="relative h-28 w-full bg-alkota-steel/20 mb-3 flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  <div className="border-t border-alkota-iron/50 pt-2.5 flex flex-wrap gap-1.5 text-[10px] font-ibm-plex-mono">
                    {m.pressure_bar ? (
                      <span className="bg-alkota-iron/40 text-white px-2 py-0.5">
                        {m.pressure_bar} BAR
                      </span>
                    ) : null}
                    {m.flow_rate_lpm ? (
                      <span className="bg-alkota-iron/40 text-white px-2 py-0.5">
                        {m.flow_rate_lpm} L/min
                      </span>
                    ) : null}
                    {m.power_source ? (
                      <span className="bg-alkota-iron/40 text-alkota-silver px-2 py-0.5">
                        {m.power_source}
                      </span>
                    ) : null}
                    {m.heating_fuel ? (
                      <span className="bg-alkota-orange/10 text-alkota-orange px-2 py-0.5">
                        {m.heating_fuel}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Requirements Chips */}
      {requirementsSummary.length > 0 && (
        <div className="mb-6 pt-4 border-t border-alkota-iron/60">
          <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-silver mb-2.5">
            Verified Operational Requirements:
          </p>
          <div className="flex flex-wrap gap-2">
            {requirementsSummary.map((req, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 bg-alkota-black border border-alkota-iron text-alkota-smoke text-xs px-3 py-1.5 font-ibm-plex-mono"
              >
                <CheckCircle2 className="h-3 w-3 text-alkota-orange shrink-0" />
                <span>{req}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Assurance Notice */}
      <div className="flex items-center gap-3 bg-alkota-black/60 border border-alkota-iron/40 p-3 text-xs text-alkota-grey font-ibm-plex-mono">
        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
        <span>
          UK Application Engineering SLA: Full technical suitability check, electrical supply review, and formal quotation dispatched within 2 business hours.
        </span>
      </div>
    </div>
  );
}
