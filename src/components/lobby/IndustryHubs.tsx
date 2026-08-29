'use client';

import { ArrowRight, Tractor, Truck, UtensilsCrossed, Factory, HardHat, Recycle } from 'lucide-react';
import Link from 'next/link';

const HUBS = [
  {
    name: 'Agriculture & Estates',
    slug: 'agriculture',
    icon: Tractor,
    desc: 'Biosecurity sanitisation, combine harvester mud extraction, and continuous-duty livestock building washdown.',
    href: '/industries/agriculture'
  },
  {
    name: 'Transport & Fleet Haulage',
    slug: 'transport-fleet',
    icon: Truck,
    desc: 'Commercial wash bay compliance, chassis degreasing, and fast vehicle turnaround systems.',
    href: '/industries/transport-fleet'
  },
  {
    name: 'Food & Beverage Processing',
    slug: 'food-beverage',
    icon: UtensilsCrossed,
    desc: '140°C dry vapour steam for Listeria eradication, stainless steel wash plants, and HACCP compliance.',
    href: '/industries/food-beverage'
  },
  {
    name: 'Manufacturing & Machining',
    slug: 'manufacturing',
    icon: Factory,
    desc: 'Automated aqueous parts washers, coolant washdown, and CNC tooling degreasing.',
    href: '/industries/manufacturing'
  },
  {
    name: 'Construction & Plant Hire',
    slug: 'construction',
    icon: HardHat,
    desc: 'High-volume water blasters for tracked excavators, concrete slurry breakdown, and site wash pads.',
    href: '/industries/construction'
  },
  {
    name: 'Waste & Resource Recovery',
    slug: 'waste-recycling',
    icon: Recycle,
    desc: 'Closed-loop water recycling, odour sanitisation, and heavy compactor vehicle cleaning.',
    href: '/industries/waste-recycling'
  }
];

export default function IndustryHubs() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-white border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 06 // Sector Portals
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              Application Hubs.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Enter The Lobby by industry sector to explore specialized regulations, engineering papers, case studies, and machine specifications.
          </p>
        </div>

        {/* Hubs 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <Link
                key={hub.slug}
                href={hub.href}
                className="bg-[#FAFAF8] border border-[#E5E5E0] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF6900] hover:bg-white transition-all shadow-xs group no-underline"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center bg-[#1A1A18] group-hover:bg-[#FF6900] text-white transition-colors mb-6">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-light text-xl text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-2 leading-snug">
                    {hub.name}
                  </h3>

                  <p className="text-xs text-[#666] leading-relaxed font-normal mb-6">
                    {hub.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1A1A18] group-hover:text-[#FF6900] transition-colors">
                  <span>Enter Sector Hub</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
