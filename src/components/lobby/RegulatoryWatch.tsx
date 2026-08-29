'use client';

import { ShieldCheck, ExternalLink, ArrowRight, FileCheck } from 'lucide-react';
import Link from 'next/link';

interface RegulationItem {
  code: string;
  authority: string;
  title: string;
  status: 'IN FORCE' | 'UPDATED' | 'UPCOMING';
  effectiveDate: string;
  impactSummary: string;
  sourceUrl: string;
  relatedGuideUrl: string;
}

const REGULATORY_UPDATES: RegulationItem[] = [
  {
    code: 'PPG3 / GPP 13',
    authority: 'Environment Agency / SEPA / NIEA',
    title: 'Trade Effluent Classification & Surface Water Discharge Prohibition',
    status: 'IN FORCE',
    effectiveDate: 'Enforced',
    impactSummary: 'Vehicle and plant wash water contains hydrocarbons and detergents. Discharging into clean surface water drains, soakaways, or watercourses is a criminal offence. All sites must connect to foul sewer with consent or operate a closed-loop recycling unit.',
    sourceUrl: 'https://www.gov.uk/guidance/pollution-prevention-for-businesses',
    relatedGuideUrl: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators'
  },
  {
    code: 'BS EN 858-1:2002',
    authority: 'British Standards Institution (BSI)',
    title: 'Separator Systems for Light Liquids: Class 1 Hydrocarbon Discharge Thresholds',
    status: 'IN FORCE',
    effectiveDate: 'Standardized',
    impactSummary: 'Requires coalescing plate separators capable of treating discharges to <= 5 mg/L oil concentration. Must feature automatic closure devices (ACDs) and visual/acoustic optical oil alarm monitoring.',
    sourceUrl: 'https://knowledge.bsigroup.com',
    relatedGuideUrl: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators'
  },
  {
    code: 'Water Industry Act s.118',
    authority: 'UK Regional Sewerage Undertakers (Water UK)',
    title: 'Mandatory Written Trade Effluent Consent for Foul Sewer Connections',
    status: 'IN FORCE',
    effectiveDate: 'Statutory Obligation',
    impactSummary: 'Commercial wash bays discharging to public sewers require written consent specifying limits on Chemical Oxygen Demand (COD), suspended solids, pH (6-10), and maximum discharge volume per day.',
    sourceUrl: 'https://www.water.org.uk',
    relatedGuideUrl: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators'
  },
  {
    code: 'DSEAR & COSHH 2002',
    authority: 'Health and Safety Executive (HSE)',
    title: 'Workplace VOC Exposure & Solvent Wash Bath Replacement Guidance',
    status: 'UPDATED',
    effectiveDate: 'Ongoing Audit Review',
    impactSummary: 'Strict VOC containment rules on mineral solvent degreasing sinks. Strong HSE recommendation for closed cabinet aqueous heated turntable parts degreasers to eliminate flammable hydrocarbon vapors.',
    sourceUrl: 'https://www.hse.gov.uk',
    relatedGuideUrl: '/lobby/economics-tco/aqueous-vs-solvent-parts-washing-voc-compliance-costs'
  }
];

export default function RegulatoryWatch() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-white border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 02 // Compliance Register
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Regulatory Watch.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Verified statutory standards, Environment Agency permits, and British Standards governing commercial wash bays and industrial cleaning operations.
          </p>
        </div>

        {/* Regulatory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REGULATORY_UPDATES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAF8] border border-[#E5E5E0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF6900]/40 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1A1A18] text-white text-[11px] font-mono px-2.5 py-1 tracking-wider uppercase">
                      {item.code}
                    </span>
                    <span className="text-xs text-[#777] font-mono">
                      {item.authority}
                    </span>
                  </div>

                  <span className={'text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider font-medium ' + (
                    item.status === 'IN FORCE'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  )}>
                    {item.status}
                  </span>
                </div>

                <h3 className="font-light text-xl sm:text-2xl text-[#1A1A18] mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-6 font-normal">
                  {item.impactSummary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E0] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <Link
                  href={item.relatedGuideUrl}
                  className="inline-flex items-center gap-1.5 text-[#1A1A18] hover:text-[#FF6900] transition-colors font-normal no-underline"
                >
                  <FileCheck className="h-3.5 w-3.5 text-[#FF6900]" />
                  <span>Compliance Breakdown</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>

                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#777] hover:text-[#1A1A18] transition-colors no-underline"
                >
                  <span>Official Source</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
