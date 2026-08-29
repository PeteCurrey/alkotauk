'use client';

import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  headline: string;
  source: string;
  date: string;
  summary: string;
  sector: string;
  relatedSlug?: string;
}

const INDUSTRY_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    headline: 'UK Water Utilities Increase Trade Effluent Spot Audits on Logistics & Fleet Depots',
    source: 'Water Industry Intelligence UK',
    date: '12 May 2026',
    summary: 'Regional water authorities are issuing compliance notices to uncontained wash pads operating without certified oil interceptors or active discharge trade effluent consents.',
    sector: 'Transport & Fleet',
    relatedSlug: '/lobby/regulatory-compliance/uk-wash-bay-environmental-compliance-drainage-oil-separators'
  },
  {
    id: 'news-2',
    headline: 'Food Processing Sector Expands 140°C Saturated Steam Adoption to Eliminate Listeria Biofilms',
    source: 'Industrial Hygiene Journal',
    date: '28 April 2026',
    summary: 'Thermal destruction of food-contact bacteria using low-moisture dry steam vapour is replacing high-volume chemical washdowns across poultry and ready-meal conveyor lines.',
    sector: 'Food & Beverage',
    relatedSlug: '/lobby/application-science/vapour-steam-vs-high-pressure-hot-water-thermal-breakdown'
  },
  {
    id: 'news-3',
    headline: 'Agricultural Machinery Biosecurity: High-Temperature Washdown Protocols Updated',
    source: 'Farm & Plant Engineering',
    date: '19 April 2026',
    summary: 'Guidance issued for contractors cleaning combines, slurry tankers, and livestock transport between holdings to halt pathogen transmission using continuous 90°C thermal water.',
    sector: 'Agriculture',
    relatedSlug: '/lobby/engineering-design/metallurgy-of-heavy-heating-coils-schedule-80'
  },
  {
    id: 'news-4',
    headline: 'Engineering Workshops Accelerate Transition from Solvent Degreasing to Rotary Aqueous Washers',
    source: 'Manufacturing UK Dispatch',
    date: '05 April 2026',
    summary: 'Rising hazardous waste uplift charges and insurance premiums are driving rapid adoption of closed-loop heated turntable aqueous parts degreasers with automatic oil skimming.',
    sector: 'Manufacturing',
    relatedSlug: '/lobby/economics-tco/aqueous-vs-solvent-parts-washing-voc-compliance-costs'
  }
];

export default function IndustryNews() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-[#FAFAF8] border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 03 // Market Intelligence
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Industry News.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Operational reports, sector policy shifts, and engineering updates from across heavy manufacturing, fleet logistics, agriculture, and water management.
          </p>
        </div>

        {/* News Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_NEWS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E5E0] p-6 flex flex-col justify-between hover:border-[#FF6900]/50 transition-all shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#888] mb-3">
                  <span className="text-[#FF6900] uppercase font-medium">
                    {item.sector}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h3 className="font-light text-base sm:text-lg text-[#1A1A18] group-hover:text-[#FF6900] transition-colors leading-snug mb-3">
                  {item.headline}
                </h3>

                <p className="text-xs text-[#666] leading-relaxed font-normal mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0F0EE] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#999] truncate max-w-[140px]">{item.source}</span>
                {item.relatedSlug && (
                  <Link
                    href={item.relatedSlug}
                    className="inline-flex items-center gap-1 text-[#1A1A18] hover:text-[#FF6900] transition-colors no-underline"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
