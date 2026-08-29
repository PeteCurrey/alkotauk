'use client';

import { Wrench, ArrowRight, Calculator, CheckSquare, Layers } from 'lucide-react';
import Link from 'next/link';

const TOOLS = [
  {
    name: 'Machine Match Application Selector',
    slug: 'machine-match',
    desc: 'Answer four operational questions on power supply, water volume, and contamination severity to identify your exact machine specification.',
    href: '/tools/machine-match',
    badge: 'Interactive Selector'
  },
  {
    name: 'UK Wash Bay Environmental Compliance Tool',
    slug: 'wash-bay-compliance',
    desc: 'Determine whether your wash pad drainage requires a BS EN 858 Class 1 interceptor, trade effluent consent, or closed-loop recycling.',
    href: '/tools/wash-bay-compliance',
    badge: 'Regulatory Audit'
  },
  {
    name: 'Total Cost of Ownership (TCO) Calculator',
    slug: 'tco-calculator',
    desc: 'Model fuel consumption, maintenance intervals, and 5-year operating economics across cold water, hot water, and steam systems.',
    href: '/tools/tco-calculator',
    badge: 'Economic Model'
  },
  {
    name: 'Turnkey Trailer & Rig Configurator',
    slug: 'configurator',
    desc: 'Design highway-certified mobile cleaning trailers with custom water bowsers, dual-gun manifolds, and hose reel architectures.',
    href: '/tools/configurator',
    badge: '3D Builder'
  }
];

export default function LobbyTools() {
  return (
    <section className="py-16 sm:py-24 px-6 sm:px-12 bg-white border-b border-[#E5E5E0]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E5E0] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-light font-mono">
              Chapter 09 // Engineering Utilities
            </span>
            <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-[#1A1A18] leading-none">
              The Spec Desk & Tools.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] max-w-md font-normal">
            Online engineering calculators and compliance decision trees to support equipment specification and wash bay infrastructure design.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="bg-[#FAFAF8] border border-[#E5E5E0] p-6 flex flex-col justify-between hover:border-[#FF6900] hover:bg-white transition-all shadow-xs group no-underline"
            >
              <div>
                <span className="text-[9px] font-mono text-[#FF6900] bg-[#FF6900]/10 px-2 py-0.5 uppercase tracking-wider block w-fit mb-4 font-medium">
                  {tool.badge}
                </span>

                <h3 className="font-light text-lg text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-2 leading-snug">
                  {tool.name}
                </h3>

                <p className="text-xs text-[#666] leading-relaxed font-normal mb-6">
                  {tool.desc}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1A1A18] group-hover:text-[#FF6900] transition-colors">
                <span>Launch Utility</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
