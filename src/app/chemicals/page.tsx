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
  Factory
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
    subtitle: 'Molecular Cleavage',
    physics: 'pH 1.5 – 13.5 Active Surfactants',
    desc: 'Engineered surfactants cleave electrostatic traffic film bonds, saponify greases, and chemically suspend contaminants.',
    mediaCaption: 'Alkota Hydrus Surfactant Cleavage'
  },
];

const CONTAMINATION_FOCUS = [
  {
    id: 'road_film',
    title: 'Electrostatic Road Film',
    category: 'Commercial Transport & Fleet',
    surfaces: 'Automotive paint, commercial wraps, glass, cab trims',
    solution: 'Power Blast TR-407 / Touchless TR-470',
    slug: 'fleet-vehicle',
    desc: 'Microscopic diesel exhaust particles, tire rubber, and asphalt oil electrostatically bonded to vehicle clear coats.',
    subject: 'Dirty commercial HGV cab side panel coated in winter road film and diesel soot'
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
    <main className="min-h-screen bg-[#0D0D0D] text-white selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      {/* ─── 01: HERO MASTHEAD ─────────────────────────────────────────────── */}
      <section className="relative border-b border-[#222] bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 pt-12 pb-20">
          <Breadcrumbs items={[{ label: 'Chemicals & Detergents' }]} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-alkota-orange" />
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.35em] text-alkota-orange font-bold">
                  // ALKOTA INDUSTRIAL CHEMISTRY // GB CLP CERTIFIED
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight uppercase leading-[0.92] text-white">
                ENGINEERED <br />
                <span className="text-alkota-orange font-light">CLEANING CHEMISTRY.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#AAA] leading-relaxed font-normal max-w-2xl">
                The chemical range is not an accessory—it is an engineered component of the complete Alkota cleaning system. Pressure, flow, and heat require targeted molecular chemistry to dissolve heavy soils without degrading substrate metallurgy.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/chemicals/match"
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal shadow-lg shadow-alkota-orange/20"
                >
                  <span>Launch Chemical Match Engine</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/chemicals/safety-data"
                  className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] text-[#CCC] hover:text-white px-6 py-4 text-xs uppercase tracking-widest transition-colors font-normal"
                >
                  <FileText className="h-4 w-4 text-alkota-orange" />
                  <span>Safety Data (SDS) Library</span>
                </Link>
              </div>
            </div>

            {/* Master Hero Visual Slot */}
            <div className="lg:col-span-5">
              <ChemicalMediaAsset
                role="CATEGORY HERO"
                priority="P0"
                aspectRatio="4/3"
                altText="Heavy commercial vehicle undergoing controlled chemical pre-treatment in an industrial wash bay"
                fallbackSubject="Industrial Chemistry In Action"
                technicalCaption="Thermal Surfactant Pre-Treatment // 80°C Flow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02: PRESSURE + FLOW + HEAT + CHEMISTRY ───────────────────────── */}
      <section className="py-20 bg-[#111111] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2">
              // THE FOUR-PILLAR CLEANING EQUATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-white">
              Pressure + Flow + Heat + <span className="text-alkota-orange font-light">Chemistry.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal mt-3">
              Cleaning is a thermodynamic and molecular reaction. When matched precisely to mechanical pressure and flow, chemistry reduces wash cycle duration by up to 65% while protecting capital equipment.
            </p>
          </div>

          {/* Unified Interactive Process Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Pillar Navigators */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
              {SYSTEM_PILLARS.map((pillar, idx) => {
                const isSelected = activePillar === idx;
                return (
                  <div
                    key={pillar.id}
                    onClick={() => setActivePillar(idx)}
                    className={`p-5 cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-[#1C1C1A] border-alkota-orange shadow-lg'
                        : 'bg-[#141414] border-[#262626] hover:border-[#444]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-ibm-plex-mono text-[10px] uppercase text-[#666]">
                        0{idx + 1} // {pillar.subtitle}
                      </span>
                      <span className={`font-ibm-plex-mono text-xs ${isSelected ? 'text-alkota-orange font-bold' : 'text-[#777]'}`}>
                        {pillar.physics}
                      </span>
                    </div>
                    <h3 className={`text-xl uppercase tracking-tight ${isSelected ? 'text-white font-normal' : 'text-[#888] font-light'}`}>
                      {pillar.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Visual & Explanation */}
            <div className="lg:col-span-7 bg-[#141414] border border-[#262626] p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#222] mb-4">
                  <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange font-bold">
                    Pillar Analysis // {selectedPillar.title}
                  </span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#777] uppercase">
                    {selectedPillar.physics}
                  </span>
                </div>
                <h4 className="text-2xl uppercase tracking-tight text-white font-light mb-3">
                  {selectedPillar.subtitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#CCC] leading-relaxed font-normal">
                  {selectedPillar.desc}
                </p>
              </div>

              <ChemicalMediaAsset
                role="PROCESS"
                priority="P0"
                aspectRatio="16/9"
                altText={`Alkota industrial cleaning process demonstrating ${selectedPillar.title.toLowerCase()}`}
                fallbackSubject={selectedPillar.mediaCaption}
                technicalCaption={`Physical Action: ${selectedPillar.physics}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 03: START WITH THE PROBLEM (CONTAMINATION SELECTOR) ──────────── */}
      <section className="py-20 bg-[#0A0A0A] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-12">
          <div className="max-w-3xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2">
              // PROBLEM-FIRST SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-white">
              Start With <span className="text-alkota-orange font-light">The Dirt.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal mt-3">
              Do not start with product bottles. Identify the specific contaminant you are trying to remove and its substrate metallurgy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Media Display */}
            <div className="lg:col-span-6 space-y-4">
              <ChemicalMediaAsset
                role="CONTAMINATION MACRO"
                priority="P0"
                aspectRatio="4/3"
                altText={selectedContam.title}
                fallbackSubject={selectedContam.subject}
                technicalCaption={`Contamination: ${selectedContam.title.toUpperCase()}`}
              />

              <div className="p-5 bg-[#141414] border border-[#262626] space-y-2">
                <span className="font-ibm-plex-mono text-[9px] uppercase text-alkota-orange block font-bold">
                  // Chemical Formulation Solution
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base text-white font-normal">{selectedContam.solution}</span>
                  <Link
                    href={`/chemicals/${selectedContam.slug}`}
                    className="inline-flex items-center gap-1 font-ibm-plex-mono text-[10px] text-alkota-orange hover:text-white uppercase tracking-wider transition-colors"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Contamination Selector List */}
            <div className="lg:col-span-6 space-y-2.5">
              {CONTAMINATION_FOCUS.map((item, idx) => {
                const isSelected = activeContam === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveContam(idx)}
                    className={`p-4 cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-[#1C1C1A] border-alkota-orange shadow-lg'
                        : 'bg-[#141414] border-[#262626] hover:border-[#444]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666]">
                        {item.category}
                      </span>
                      {isSelected && (
                        <span className="font-ibm-plex-mono text-[9px] text-alkota-orange uppercase">
                          Active Selection
                        </span>
                      )}
                    </div>
                    <h3 className={`text-lg uppercase tracking-tight ${isSelected ? 'text-white font-normal' : 'text-[#999] font-light'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#777] font-normal leading-relaxed mt-1">
                      {item.desc}
                    </p>
                    <div className="mt-2 text-[10px] font-ibm-plex-mono text-[#555]">
                      Surfaces: {item.surfaces}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 04: CHEMICAL DISCIPLINES / APPLICATION WORLDS ────────────────── */}
      <section className="py-20 bg-[#111111] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#222]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-2">
                // COMMERCIAL DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-white">
                Application <span className="text-alkota-orange font-light">Hubs.</span>
              </h2>
            </div>
            <Link
              href="/chemicals/match"
              className="text-xs uppercase font-ibm-plex-mono tracking-widest text-alkota-orange hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <span>Match Your Application</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHEMICAL_CATEGORIES.slice(0, 4).map((cat) => (
              <div
                key={cat.slug}
                className="bg-[#141414] border border-[#262626] hover:border-alkota-orange p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] font-ibm-plex-mono text-[#666] mb-4">
                    <span className="text-alkota-orange font-bold uppercase">{cat.badge}</span>
                    <span>GB CLP</span>
                  </div>

                  <h3 className="text-2xl uppercase tracking-tight text-white font-normal group-hover:text-alkota-orange transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-[#888] leading-relaxed font-normal mb-6">
                    {cat.description}
                  </p>

                  <div className="p-3 bg-black/40 border border-[#222] text-[10px] font-ibm-plex-mono space-y-1 mb-6">
                    <span className="block text-[#555] uppercase text-[8px]">Key Synergy:</span>
                    <span className="text-[#CCC] block">{cat.equipmentSynergy}</span>
                  </div>
                </div>

                <Link
                  href={`/chemicals/${cat.slug}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#1C1C1C] hover:bg-alkota-orange hover:text-black text-white py-3 text-xs uppercase tracking-wider font-ibm-plex-mono transition-colors border border-[#333]"
                >
                  <span>Explore Discipline</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05: RECOVERY & EFFLUENT INTEGRATION ──────────────────────────── */}
      <section className="py-20 bg-[#0A0A0A] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block">
              // EFFLUENT & WATER TREATMENT SYNERGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-white leading-tight">
              Chemistry & Water <br />
              <span className="text-alkota-orange font-light">Recovery Alignment.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#AAA] leading-relaxed font-normal">
              Commercial wash bay compliance requires strict harmony between cleaning chemistry and oil-water interceptors. Alkota formulations use quick-break surfactant structures that release encapsulated hydrocarbons in settlement chambers, preventing persistent chemical emulsions from contaminating effluent discharge.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#141414] border border-[#262626]">
                <span className="block font-ibm-plex-mono text-[9px] uppercase text-alkota-orange mb-1">
                  Quick-Break Emulsions
                </span>
                <span className="text-xs text-[#CCC] font-normal leading-tight block">
                  Separator releases oil droplets within minutes.
                </span>
              </div>
              <div className="p-4 bg-[#141414] border border-[#262626]">
                <span className="block font-ibm-plex-mono text-[9px] uppercase text-alkota-orange mb-1">
                  Coil Protection Built-in
                </span>
                <span className="text-xs text-[#CCC] font-normal leading-tight block">
                  Scale Stop chelates minerals inside Schedule 80 burners.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/water-treatment"
                className="inline-flex items-center gap-2 border border-[#444] text-[#CCC] hover:text-white px-6 py-3 text-xs uppercase tracking-widest transition-colors font-normal"
              >
                <span>Explore Alkota Water Treatment Systems</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ChemicalMediaAsset
              role="WATER / RECOVERY"
              priority="P1"
              aspectRatio="16/10"
              altText="Industrial wash water recovery and filtration interceptor system"
              fallbackSubject="Effluent & Interceptor Chemistry Synergy"
              technicalCaption="Wash Bay Water Treatment // Quick-Break Separation"
            />
          </div>
        </div>
      </section>

      {/* ─── 06: TECHNICAL DATA & COSHH REPOSITORY BANNER ─────────────────── */}
      <section className="py-16 bg-[#111111] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#141412] border border-[#262626] p-8 sm:p-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-alkota-orange">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest font-bold">
                GB CLP & UK REACH Compliant Data
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl uppercase tracking-tight text-white font-light">
              Safety Data Sheets & Technical Specifications
            </h3>
            <p className="text-xs text-[#AAA] leading-relaxed font-normal">
              Download statutory SDS, TDS, and application instructions with active revision tracking. The Safety Data Sheet provides information required to support your site-specific COSHH assessment.
            </p>
          </div>
          <Link
            href="/chemicals/safety-data"
            className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal shrink-0"
          >
            <span>Open Technical Library</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
