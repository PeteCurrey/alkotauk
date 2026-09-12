'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  Layers, 
  Droplets, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Info,
  Sliders,
  Sparkles
} from 'lucide-react';
import { MachineEcosystem, ResolvedRelationship } from '@/lib/relationships/types';

interface MachineEcosystemSectionProps {
  machine: {
    id?: string;
    slug: string;
    model_code: string;
    name: string;
    category: string;
  };
  ecosystem: MachineEcosystem;
}

export default function MachineEcosystemSection({
  machine,
  ecosystem
}: MachineEcosystemSectionProps) {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'parts' | 'attachments' | 'chemicals' | 'alternatives'>('parts');

  const {
    compatibleParts,
    compatibleAttachments,
    verifiedMachineCareChemicals,
    applicationChemicals,
    seriesMachines,
    alternativeMachines
  } = ecosystem;

  const totalParts = compatibleParts.length;
  const totalAttachments = compatibleAttachments.length;
  const totalChems = verifiedMachineCareChemicals.length + applicationChemicals.length;
  const totalAlternatives = seriesMachines.length + alternativeMachines.length;

  const hasAnyRelationships = totalParts > 0 || totalAttachments > 0 || totalChems > 0 || totalAlternatives > 0;

  if (!hasAnyRelationships) {
    return null;
  }

  return (
    <section id="ecosystem" className="mt-40 border-t border-alkota-iron pt-24">
      {/* ── SECTION HEADER ── */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-alkota-orange uppercase tracking-[0.3em] mb-2">
            <span>// PRODUCT ECOSYSTEM</span>
            <span>·</span>
            <span>VERIFIED COMPATIBILITY</span>
          </div>
          <h2 className="font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic text-alkota-black tracking-tight leading-none">
            SUPPORTING EQUIPMENT &amp; ACCESSORIES
          </h2>
          <p className="font-inter text-xs text-alkota-silver max-w-2xl mt-3 leading-relaxed">
            Every component below is verified against factory schematics, hydraulic output curves, or application guidelines for the Alkota <strong className="text-alkota-black">{machine.model_code}</strong>.
          </p>
        </div>

        {/* Technical Guidance Badge */}
        <div className="flex items-center gap-2 bg-white border border-alkota-iron px-4 py-2.5 rounded-[4px] shadow-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-alkota-black font-semibold">
            Evidence-Based Fitment Standard
          </span>
        </div>
      </div>

      {/* ── DOMAIN-AWARE TABS BAR ── */}
      <div className="flex border-b border-alkota-iron overflow-x-auto no-scrollbar mb-10 gap-2">
        {totalParts > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('parts')}
            className={`flex items-center gap-2.5 px-6 py-4 font-mono text-xs uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
              activeTab === 'parts'
                ? 'border-alkota-orange text-alkota-black font-bold bg-white'
                : 'border-transparent text-alkota-silver hover:text-alkota-black hover:bg-white/50'
            }`}
          >
            <Wrench className="h-3.5 w-3.5 text-alkota-orange" />
            <span>Compatible Parts ({totalParts})</span>
          </button>
        )}

        {totalAttachments > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('attachments')}
            className={`flex items-center gap-2.5 px-6 py-4 font-mono text-xs uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
              activeTab === 'attachments'
                ? 'border-alkota-orange text-alkota-black font-bold bg-white'
                : 'border-transparent text-alkota-silver hover:text-alkota-black hover:bg-white/50'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-alkota-orange" />
            <span>Attachments ({totalAttachments})</span>
          </button>
        )}

        {totalChems > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('chemicals')}
            className={`flex items-center gap-2.5 px-6 py-4 font-mono text-xs uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
              activeTab === 'chemicals'
                ? 'border-alkota-orange text-alkota-black font-bold bg-white'
                : 'border-transparent text-alkota-silver hover:text-alkota-black hover:bg-white/50'
            }`}
          >
            <Droplets className="h-3.5 w-3.5 text-alkota-orange" />
            <span>Chemicals ({totalChems})</span>
          </button>
        )}

        {totalAlternatives > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('alternatives')}
            className={`flex items-center gap-2.5 px-6 py-4 font-mono text-xs uppercase tracking-widest transition-all border-b-2 cursor-pointer ${
              activeTab === 'alternatives'
                ? 'border-alkota-orange text-alkota-black font-bold bg-white'
                : 'border-transparent text-alkota-silver hover:text-alkota-black hover:bg-white/50'
            }`}
          >
            <Sliders className="h-3.5 w-3.5 text-alkota-orange" />
            <span>Fleet Alternatives ({totalAlternatives})</span>
          </button>
        )}
      </div>

      {/* ── TAB CONTENT 1: COMPATIBLE PARTS ── */}
      {activeTab === 'parts' && totalParts > 0 && (
        <div className="space-y-6">
          <div className="bg-white border-l-4 border-l-emerald-600 border border-alkota-iron p-4 px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-alkota-black block">
                  OEM Factory Verified Compatibility
                </span>
                <span className="font-inter text-[11px] text-alkota-silver">
                  Direct fitment verified against Alkota South Dakota assembly schematics. No adapter plates required.
                </span>
              </div>
            </div>
            <Link 
              href="/parts-attachments" 
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-alkota-orange uppercase tracking-widest hover:underline"
            >
              <span>Full Parts Desk</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibleParts.map((item) => (
              <div 
                key={item.target.slug}
                className="bg-white border border-alkota-iron p-6 flex flex-col justify-between hover:border-alkota-orange/60 transition-all rounded-[4px] shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-alkota-orange uppercase tracking-widest">
                      {item.target.code_or_number || 'OEM PART'}
                    </span>
                    {item.target.badge && (
                      <span className="font-mono text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 uppercase tracking-wider rounded-[2px]">
                        {item.target.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {item.target.title}
                  </h4>

                  <p className="font-inter text-xs text-alkota-silver line-clamp-2 mt-2 leading-relaxed">
                    {item.target.tagline_or_desc}
                  </p>

                  {/* Evidence Citation */}
                  {item.relationship.evidence && (
                    <div className="mt-4 p-3 bg-alkota-bg border border-alkota-iron/60 rounded-[2px]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-smoke block mb-0.5">
                        Fitment Evidence:
                      </span>
                      <p className="font-inter text-[11px] text-alkota-black line-clamp-2">
                        {item.relationship.evidence}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-alkota-iron/40 flex items-center justify-between">
                  {item.target.price ? (
                    <div>
                      <span className="font-mono text-base font-bold text-alkota-black">
                        £{Number(item.target.price).toFixed(2)}
                      </span>
                      <span className="font-mono text-[9px] text-alkota-silver ml-1 uppercase">Ex. VAT</span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-alkota-silver uppercase">Enquire for price</span>
                  )}

                  <Link
                    href={item.target.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors"
                  >
                    <span>View Part</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB CONTENT 2: ATTACHMENTS ── */}
      {activeTab === 'attachments' && totalAttachments > 0 && (
        <div className="space-y-6">
          <div className="bg-white border-l-4 border-l-alkota-orange border border-alkota-iron p-4 px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-alkota-orange shrink-0" />
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-alkota-black block">
                  Calibrated Operating Range Fitment
                </span>
                <span className="font-inter text-[11px] text-alkota-silver">
                  These attachments operate within the hydrostatic pressure and water flow output envelope of this machine.
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibleAttachments.map((item) => (
              <div 
                key={item.target.slug}
                className="bg-white border border-alkota-iron p-6 flex flex-col justify-between hover:border-alkota-orange/60 transition-all rounded-[4px] shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-alkota-orange uppercase tracking-widest">
                      {item.target.code_or_number || 'ATTACHMENT'}
                    </span>
                    <span className="font-mono text-[9px] bg-orange-50 text-alkota-orange border border-orange-200 px-2 py-0.5 uppercase tracking-wider rounded-[2px]">
                      Verified Range
                    </span>
                  </div>

                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {item.target.title}
                  </h4>

                  <p className="font-inter text-xs text-alkota-silver line-clamp-2 mt-2 leading-relaxed">
                    {item.target.tagline_or_desc}
                  </p>

                  {item.target.spec_summary && (
                    <div className="mt-3 font-mono text-[10px] text-alkota-black font-semibold">
                      Envelope: {item.target.spec_summary}
                    </div>
                  )}

                  {/* Evidence Citation */}
                  {item.relationship.evidence && (
                    <div className="mt-4 p-3 bg-alkota-bg border border-alkota-iron/60 rounded-[2px]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-smoke block mb-0.5">
                        Fitment Verification:
                      </span>
                      <p className="font-inter text-[11px] text-alkota-black line-clamp-2">
                        {item.relationship.evidence}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-alkota-iron/40 flex items-center justify-between">
                  {item.target.price ? (
                    <div>
                      <span className="font-mono text-base font-bold text-alkota-black">
                        £{Number(item.target.price).toFixed(2)}
                      </span>
                      <span className="font-mono text-[9px] text-alkota-silver ml-1 uppercase">Ex. VAT</span>
                    </div>
                  ) : (
                    <span className="font-mono text-xs text-alkota-silver uppercase">Trade Spec</span>
                  )}

                  <Link
                    href={item.target.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors"
                  >
                    <span>View Attachment</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB CONTENT 3: CHEMICALS ── */}
      {activeTab === 'chemicals' && totalChems > 0 && (
        <div className="space-y-8">
          {/* Sub-section 3A: Machine Care (Engineering Compatibility) */}
          {verifiedMachineCareChemicals.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black">
                  Machine Care &amp; Coil Protection (Direct Machine Compatibility)
                </h3>
              </div>
              <p className="font-inter text-xs text-alkota-silver">
                Specialist formulations engineered by Alkota/Hydrus to maintain internal heating coils, pump seals, and wash cabinets safely.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {verifiedMachineCareChemicals.map((item) => (
                  <div key={item.target.slug} className="bg-white border border-alkota-iron p-6 rounded-[4px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-alkota-orange uppercase tracking-widest">
                        {item.target.title}
                      </span>
                      <span className="font-mono text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 uppercase tracking-wider rounded-[2px]">
                        Factory Approved Chemical
                      </span>
                    </div>
                    <p className="font-inter text-xs text-alkota-silver mt-2 leading-relaxed">
                      {item.target.tagline_or_desc}
                    </p>
                    {item.relationship.evidence && (
                      <div className="mt-3 p-3 bg-alkota-bg border border-alkota-iron/60 rounded-[2px]">
                        <span className="font-mono text-[9px] text-alkota-smoke block mb-0.5">Verification Note:</span>
                        <p className="font-inter text-[11px] text-alkota-black">{item.relationship.evidence}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-section 3B: Application Chemistry (Commercial / Discovery) */}
          {applicationChemicals.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-alkota-iron">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-alkota-orange" />
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black">
                  Recommended Application Detergents (Non-Mechanical Relationship)
                </h3>
              </div>
              <div className="bg-amber-50/60 border border-amber-200 p-3 px-4 rounded-[3px] text-[11px] text-amber-900 font-inter">
                <strong>Important Distinction:</strong> These detergents are application-recommended for industrial tasks typically performed with this machine (applied via downstream injector or pre-spray). They represent an application suitability recommendation, not a mechanical machine fitment claim.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applicationChemicals.map((item) => (
                  <div key={item.target.slug} className="bg-white border border-alkota-iron p-6 rounded-[4px]">
                    <span className="font-mono text-[10px] font-bold text-alkota-black uppercase tracking-widest block mb-1">
                      {item.target.title}
                    </span>
                    <p className="font-inter text-xs text-alkota-silver leading-relaxed">
                      {item.target.tagline_or_desc}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-alkota-iron/40">
                      <span className="font-mono text-[9px] text-alkota-smoke uppercase">
                        Application: Commercial Degreasing
                      </span>
                      <Link href={item.target.href} className="font-mono text-[10px] font-bold text-alkota-orange uppercase hover:underline">
                        Explore Chemistry →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB CONTENT 4: FLEET ALTERNATIVES ── */}
      {activeTab === 'alternatives' && totalAlternatives > 0 && (
        <div className="space-y-6">
          <p className="font-inter text-xs text-alkota-silver">
            Alternative equipment within the same engineering series, pressure class, or operational family.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...seriesMachines, ...alternativeMachines].map((item) => (
              <div 
                key={item.target.slug}
                className="bg-white border border-alkota-iron p-6 flex flex-col justify-between hover:border-alkota-orange/60 transition-all rounded-[4px] shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] font-bold text-alkota-orange uppercase tracking-widest">
                      {item.target.code_or_number}
                    </span>
                    <span className="font-mono text-[9px] bg-alkota-bg text-alkota-black border border-alkota-iron px-2 py-0.5 uppercase tracking-wider rounded-[2px]">
                      {item.relationship.relationship_type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {item.target.image_url && (
                    <div className="aspect-[16/10] bg-alkota-bg border border-alkota-iron/50 mb-4 p-4 flex items-center justify-center overflow-hidden">
                      <img 
                        src={item.target.image_url} 
                        alt={item.target.title} 
                        className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  )}

                  <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black group-hover:text-alkota-orange transition-colors">
                    {item.target.title}
                  </h4>

                  {item.target.spec_summary && (
                    <div className="font-mono text-xs text-alkota-black font-semibold mt-1">
                      {item.target.spec_summary}
                    </div>
                  )}

                  <p className="font-inter text-xs text-alkota-silver mt-2 leading-relaxed">
                    {item.target.tagline_or_desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-alkota-iron/40 flex items-center justify-end">
                  <Link
                    href={item.target.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-alkota-black group-hover:text-alkota-orange transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TECHNICAL ASSISTANCE CTA BANNER ── */}
      <div className="mt-12 bg-white border border-alkota-iron p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[4px] shadow-sm">
        <div className="space-y-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-alkota-orange block">
            // FITMENT VERIFICATION DESK
          </span>
          <h4 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black">
            Need assistance selecting parts or accessories for model {machine.model_code}?
          </h4>
          <p className="font-inter text-xs text-alkota-silver max-w-xl">
            Our UK engineering team verifies nozzle orifices, unloader ratings, and chemical injection ratios before dispatch to ensure 100% operational compatibility.
          </p>
        </div>

        <Link
          href={`/contact?enquiry=parts&product=${machine.slug}&model=${machine.model_code}`}
          className="shrink-0 flex items-center gap-3 px-6 py-4 bg-alkota-black text-white hover:bg-alkota-orange transition-colors font-mono text-xs uppercase tracking-widest font-bold rounded-[3px]"
        >
          <span>Ask An Engineer</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
