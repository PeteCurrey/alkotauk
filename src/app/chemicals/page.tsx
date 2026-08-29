'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Droplets,
  Building2,
  Tractor,
  Layers,
  ChevronRight,
  FileText,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Filter,
  Truck,
  Factory,
  Sparkles,
  Sliders
} from 'lucide-react';
import {
  CHEMICAL_CATEGORIES,
  VERIFIED_CHEMICAL_PRODUCTS,
} from '@/lib/chemicals/seed-data';
import ChemicalMediaAsset from '@/components/chemicals/ChemicalMediaAsset';

const SYSTEM_PILLARS = [
  {
    id: 'pressure',
    title: 'PRESSURE',
    subtitle: 'Kinetic Impact',
    physics: '100 – 350 BAR Mechanical Force',
    desc: 'Kinetic impact shatters compacted surface crusts and drives active chemistry into microscopic surface porosity.',
    mediaCaption: 'Mechanical High-Pressure Surface Displacement'
  },
  {
    id: 'flow',
    title: 'FLOW',
    subtitle: 'Mass Transport',
    physics: '15 – 30 L/MIN Volume Flushing',
    desc: 'Volume carries dislodged dirt away, maintaining laminar rinse velocity to prevent soil re-adhesion on clean metal.',
    mediaCaption: 'High-Volume Laminar Soil Evacuation'
  },
  {
    id: 'heat',
    title: 'HEAT',
    subtitle: 'Thermal Liquefaction',
    physics: '60°C – 120°C Thermal Energy',
    desc: 'Thermodynamics liquefy heavy hydrocarbon waxes, reducing grease viscosity by up to 90% for rapid surfactant penetration.',
    mediaCaption: 'Schedule 80 Coil Thermal Activation'
  },
  {
    id: 'chemistry',
    title: 'CHEMISTRY',
    subtitle: 'Molecular Breakdown',
    physics: 'Active Surfactant & Emulsification',
    desc: 'Chemistry lowers surface tension, saponifies oils, chelates water hardness minerals, and suspends soils in stable emulsion.',
    mediaCaption: 'Alkota Surfactant Molecular Emulsification'
  }
];

const CONTAMINATION_FOCUS = [
  {
    id: 'traffic_film',
    title: 'Road Traffic Film & Salt',
    category: 'Commercial Fleet & Haulage',
    surfaces: 'Painted aluminium, GRP curtain-siders, glass, chrome',
    solution: 'Fleet Kleen TR-120 / Super Kleen TR-110',
    slug: 'transport',
    desc: 'Electrostatic bonding of diesel exhaust particulates, road salt, rubber dust, and bitumen aerosols.',
    subject: 'Commercial haulage truck with heavy road traffic film build-up'
  },
  {
    id: 'heavy_grease',
    title: 'Heavy Hydrocarbon Grease',
    category: 'Plant & Heavy Industrial',
    surfaces: 'Cast iron blocks, fifth-wheel plates, crane masts',
    solution: 'Grease Cutter DE-703 / Citrus Blast DE-721',
    slug: 'degreasers',
    desc: 'Polymerised lithium greases, open-gear lubricants, and raw crude residue resistant to cold-water mechanical washing.',
    subject: 'Heavy hydrocarbon fifth-wheel grease and crude oil buildup on industrial steel'
  },
  {
    id: 'baked_carbon',
    title: 'Baked Carbon & Slag',
    category: 'Process & Manufacturing',
    surfaces: 'Stainless steel, heavy mild steel frames, kiln racks',
    solution: 'Power Blast 3 SD-926 (Subject to UK Review)',
    slug: 'degreasers',
    desc: 'High-temperature carbonised organic crusts formed in combustion chambers, heat exchangers, and thermal drying systems.',
    subject: 'Carbonised organic residue on industrial heat exchanger components'
  },
  {
    id: 'caked_mud',
    title: 'Agricultural Clay & Slurry',
    category: 'Farming & Civil Earthmoving',
    surfaces: 'Tractor chassis, combine headers, excavator booms',
    solution: 'Farm Soap TR-440',
    slug: 'industrial',
    desc: 'Deep abrasive clays, biological manure acids, and UV-weathered paint oxidation on heavy agricultural machinery.',
    subject: 'Severe caked clay and slurry encrustation on agricultural tractor panels'
  },
  {
    id: 'parts_sludge',
    title: 'Machining Coolant & Metal Swarf',
    category: 'Rotary Parts Washers',
    surfaces: 'Cast iron engine blocks, alloy cylinder heads, tool steel',
    solution: 'APW Pro Clean',
    slug: 'parts-washers',
    desc: 'Synthetic cutting fluids, metal fines, and gummy gear oils inside enclosed automatic aqueous wash cabinets.',
    subject: 'Greasy automotive cylinder head inside an automatic rotary parts washer'
  }
];

export default function ChemicalsMainLandingPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeContam, setActiveContam] = useState(0);

  const selectedPillar = SYSTEM_PILLARS[activePillar];
  const selectedContam = CONTAMINATION_FOCUS[activeContam];

  return (
    <main className="min-h-screen bg-white text-[#1A1A18] font-normal pb-0">
      <Navigation />

      {/* ─── 01: FULL-VIEWPORT HERO MASTHEAD (LIGHT-FIRST) ─────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col justify-between bg-[#0A0A0A] text-white border-b border-[#222] px-6 sm:px-12 pt-28 sm:pt-32 pb-16 overflow-hidden">
        {/* Background Image with Controlled Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent z-10" />
          <div 
            className="w-full h-full bg-cover bg-center opacity-40"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80)' }}
          />
        </div>

        {/* Top Breadcrumb */}
        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[{ label: 'Chemicals & Detergents' }]} />
        </div>

        {/* Centre Content */}
        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#FF6900]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#FF6900] font-medium">
                ALKOTA INDUSTRIAL CHEMISTRY · GB CLP CERTIFIED
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight uppercase leading-[1.0] text-white mb-6">
              ENGINEERED <br />
              <span className="text-[#FF6900] font-light">CLEANING CHEMISTRY.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#CCC] leading-relaxed font-light max-w-2xl mb-8">
              The chemical range is not an accessory—it is an engineered component of the complete Alkota cleaning system. Pressure, flow, and heat require targeted molecular chemistry to dissolve heavy soils without degrading substrate metallurgy.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/chemicals/match"
                className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-8 py-4 text-xs uppercase tracking-widest transition-all font-medium no-underline shadow-lg"
              >
                <span>Launch Chemical Match Engine</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/chemicals/safety-data"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white px-6 py-4 text-xs uppercase tracking-widest transition-all font-medium no-underline backdrop-blur-sm"
              >
                <FileText className="h-4 w-4 text-[#FF6900]" />
                <span>Safety Data (SDS) Library</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Strip */}
        <div className="relative z-10 mx-auto max-w-7xl w-full pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
            <div className="border-l border-white/20 pl-4">
              <span className="text-[10px] text-[#888] uppercase block">Formulation</span>
              <span className="text-xl font-light text-white">Ultra Concentrated</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-[10px] text-[#888] uppercase block">Dilution Ratios</span>
              <span className="text-xl font-light text-white">Up to 100:1</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-[10px] text-[#888] uppercase block">Regulatory Standard</span>
              <span className="text-xl font-light text-white">GB CLP / REACH</span>
            </div>
            <div className="border-l border-white/20 pl-4">
              <span className="text-[10px] text-[#888] uppercase block">Coil Protection</span>
              <span className="text-xl font-light text-white">Anti-Scale Injected</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02: PRESSURE + FLOW + HEAT + CHEMISTRY (LIGHT EDITORIAL) ─────── */}
      <section className="py-24 bg-white border-b border-[#E5E5E0] px-6 sm:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
              THE FOUR-PILLAR CLEANING EQUATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-[#1A1A18] leading-tight">
              Pressure + Flow + Heat + <span className="text-[#FF6900] font-light">Chemistry.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#666] leading-relaxed font-normal mt-3">
              Cleaning is a thermodynamic and molecular reaction. When matched precisely to mechanical pressure and flow, chemistry reduces wash cycle duration by up to 65% while protecting capital equipment.
            </p>
          </div>

          {/* Unified Interactive Process Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Pillar Navigators */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {SYSTEM_PILLARS.map((pillar, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(idx)}
                    className={`p-5 cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-[#1A1A18] text-white border-[#1A1A18] shadow-md'
                        : 'bg-[#FAFAF8] text-[#555] border-[#E5E5E0] hover:border-[#CCC] hover:text-[#1A1A18]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase text-[#888]">
                        0{idx + 1} // {pillar.subtitle}
                      </span>
                      <span className={`font-mono text-xs ${isSelected ? 'text-[#FF6900] font-medium' : 'text-[#777]'}`}>
                        {pillar.physics}
                      </span>
                    </div>
                    <h3 className={`text-xl uppercase tracking-tight ${isSelected ? 'text-white font-light' : 'text-[#333] font-light'}`}>
                      {pillar.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Visual & Explanation */}
            <div className="lg:col-span-7 bg-[#FAFAF8] border border-[#E5E5E0] p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0] mb-4">
                  <span className="font-mono text-[10px] uppercase text-[#FF6900] font-medium">
                    Pillar Analysis // {selectedPillar.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#888] uppercase">
                    {selectedPillar.physics}
                  </span>
                </div>
                <h4 className="text-2xl uppercase tracking-tight text-[#1A1A18] font-light mb-3">
                  {selectedPillar.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed font-normal">
                  {selectedPillar.desc}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#E5E5E0] text-xs font-mono text-[#666]">
                <strong className="text-[#1A1A18] block mb-1">Physical Delivery Mechanism:</strong>
                {selectedPillar.mediaCaption}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03: START WITH THE PROBLEM (DARK MOMENT FOR CONTAMINATION) ─────── */}
      <section className="py-24 bg-[#0F0F0E] text-white border-b border-[#222] px-6 sm:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
              PROBLEM-FIRST SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-white">
              Start With <span className="text-[#FF6900] font-light">The Dirt.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal mt-3">
              Do not start with product bottles. Identify the specific contaminant you are trying to remove and its substrate metallurgy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Selector List */}
            <div className="lg:col-span-6 space-y-2.5">
              {CONTAMINATION_FOCUS.map((c, idx) => {
                const isSelected = activeContam === idx;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveContam(idx)}
                    className={`p-5 cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-[#1C1C1A] border-[#FF6900] shadow-lg'
                        : 'bg-[#141414] border-[#262626] hover:border-[#444]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase text-[#777]">
                        {c.category}
                      </span>
                      <span className="font-mono text-[10px] text-[#FF6900]">
                        Formulation Match
                      </span>
                    </div>
                    <h4 className={`text-lg uppercase tracking-tight ${isSelected ? 'text-white font-normal' : 'text-[#AAA] font-light'}`}>
                      {c.title}
                    </h4>
                  </div>
                );
              })}
            </div>

            {/* Right Contamination Breakdown Card */}
            <div className="lg:col-span-6 bg-[#141414] border border-[#262626] p-8 space-y-6">
              <div className="border-b border-[#222] pb-4">
                <span className="font-mono text-[10px] uppercase text-[#FF6900] block mb-1">
                  Selected Contaminant Profile
                </span>
                <h3 className="text-2xl uppercase tracking-tight text-white font-light">
                  {selectedContam.title}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <strong className="font-mono text-[10px] uppercase text-[#888] block mb-1">Surface Substrate:</strong>
                  <p className="text-[#CCC] font-normal">{selectedContam.surfaces}</p>
                </div>

                <div>
                  <strong className="font-mono text-[10px] uppercase text-[#888] block mb-1">Soil Physics & Bonding:</strong>
                  <p className="text-[#CCC] font-normal">{selectedContam.desc}</p>
                </div>

                <div className="p-4 bg-[#1A1A18] border border-[#333]">
                  <strong className="font-mono text-[10px] uppercase text-[#FF6900] block mb-1">Alkota Formulation Solution:</strong>
                  <p className="text-white font-medium">{selectedContam.solution}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#222]">
                <Link
                  href={`/chemicals/${selectedContam.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF6900] hover:text-white no-underline"
                >
                  <span>Explore Matching Chemical Range</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04: CHEMICAL CATEGORIES GRID (LIGHT) ─────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E5E5E0] px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
              VERIFIED CHEMICAL CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-[#1A1A18] leading-tight">
              Industrial Chemical Ranges
            </h2>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mt-3">
              Explore our laboratory-tested industrial formulations categorized by chemical action and application environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHEMICAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/chemicals/${cat.slug}`}
                className="group flex flex-col justify-between bg-[#FAFAF8] border border-[#E5E5E0] hover:border-[#FF6900] transition-colors p-8 no-underline shadow-xs"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6900] block mb-3 font-medium">
                    {cat.name}
                  </span>
                  <h3 className="text-2xl font-light uppercase tracking-tight text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-3">
                    {cat.tagline}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666] font-normal leading-relaxed line-clamp-3 mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAEAE5] flex items-center justify-between font-mono text-xs text-[#FF6900]">
                  <span>View Range</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05: ON-SITE CHEMICAL TRIAL & SPECIFICATION (FINAL CONVERSION) ── */}
      <section className="bg-[#0A0A0A] text-white py-20 px-6 sm:px-12 border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
                SITE CHEMICAL AUDIT & DILUTION TESTING
              </span>
              <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
                Test Alkota Chemistry on Your Dirt
              </h2>
              <p className="font-light text-base sm:text-lg text-[#AAA] leading-relaxed max-w-2xl">
                We perform on-site titration and soil compatibility trials across the UK to calculate exact cost-per-wash metrics for your fleet or production facility.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/contact?enquiry=chemical-trial"
                className="inline-flex items-center justify-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-6 py-4 text-xs font-medium uppercase tracking-widest transition-all no-underline shadow-lg"
              >
                <span>Book Chemical Trial</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/chemicals/match"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 text-xs font-medium uppercase tracking-widest transition-all no-underline"
              >
                <Sliders className="h-4 w-4 text-[#FF6900]" />
                <span>Launch Chemical Matcher</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
