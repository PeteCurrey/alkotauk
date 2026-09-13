import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { EnquirySource } from '@/lib/enquiries/schema';

export interface ResolvedMachineContext {
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
  selection_status?: 'STRONG_MATCH' | 'POSSIBLE_MATCH' | 'DOES_NOT_MEET' | 'NOT_APPLICABLE' | null;
  role?: 'PRIMARY' | 'SHORTLIST' | 'COMPARISON' | 'SELECTED';
  is_selected_focus?: boolean;
}

interface MachineContextSectionProps {
  source: EnquirySource;
  machines: ResolvedMachineContext[];
  isLoading?: boolean;
}

export default function MachineContextSection({
  source,
  machines,
  isLoading = false,
}: MachineContextSectionProps) {
  if (isLoading) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-[2px] text-center">
        <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
          Resolving authoritative equipment specification...
        </p>
      </div>
    );
  }

  if (machines.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold">
          {source === 'MACHINE_DETAIL'
            ? 'Selected Machine Specification'
            : source === 'MACHINE_COMPARISON'
            ? `Machines Under Comparison (${machines.length})`
            : `Shortlisted Fleet Machinery (${machines.length})`}
        </h3>

        <Link
          href="/machines"
          className="text-xs font-mono text-neutral-500 hover:text-alkota-orange transition-colors"
        >
          View full fleet →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {machines.map((m, index) => {
          const isPrimary = m.is_selected_focus || m.role === 'SELECTED' || index === 0;

          return (
            <div
              key={m.slug || index}
              className={`bg-white border rounded-[2px] p-4 flex flex-col justify-between transition-all ${
                isPrimary && source === 'MACHINE_COMPARISON'
                  ? 'border-alkota-orange/60 ring-1 ring-alkota-orange/20 shadow-sm'
                  : 'border-neutral-200'
              }`}
            >
              <div>
                {/* Header row: Model code + Status/Role */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-neutral-900">
                        {m.model_code}
                      </span>
                      {source === 'MACHINE_COMPARISON' && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded-[2px] uppercase">
                          Option {index + 1}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 font-medium line-clamp-1">{m.name}</p>
                    <span className="text-[10px] font-mono uppercase text-neutral-400">
                      {m.category?.replace(/-/g, ' ')}
                    </span>
                  </div>

                  {/* Match status badge for selector */}
                  {source === 'MACHINE_SELECTOR' && m.selection_status && (
                    <div>
                      {m.selection_status === 'STRONG_MATCH' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-[2px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Strong Match</span>
                        </span>
                      )}
                      {m.selection_status === 'POSSIBLE_MATCH' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-[2px]">
                          <HelpCircle className="w-3 h-3" />
                          <span>Worth Confirming</span>
                        </span>
                      )}
                      {m.selection_status === 'DOES_NOT_MEET' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-300 rounded-[2px]">
                          <AlertCircle className="w-3 h-3" />
                          <span>Engineering Review</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2.5 border-t border-b border-neutral-100 font-mono my-2">
                  <div>
                    <span className="text-neutral-400 text-[10px] block uppercase">Pressure</span>
                    <span className="text-neutral-900 font-bold">
                      {m.pressure_bar ? `${m.pressure_bar} BAR` : 'To verify'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block uppercase">Flow Rate</span>
                    <span className="text-neutral-900 font-bold">
                      {m.flow_rate_lpm ? `${m.flow_rate_lpm} L/min` : 'To verify'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block uppercase">Power / Drive</span>
                    <span className="text-neutral-700">{m.power_source || '—'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-[10px] block uppercase">Heating Fuel</span>
                    <span className="text-neutral-700">{m.heating_fuel || 'Cold / Ambient'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom detail sheet link */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400">Authoritative Snapshot</span>
                <Link
                  href={`/machines/${m.category || 'all'}/${m.slug}`}
                  target="_blank"
                  className="text-xs font-mono text-neutral-600 hover:text-alkota-orange flex items-center gap-1 transition-colors"
                >
                  <span>Data Sheet</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
