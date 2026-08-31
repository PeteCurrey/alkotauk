'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Tractor, Construction, Sparkles, Car, Shield, Building } from 'lucide-react';

const APPLICATION_SECTORS = [
  {
    slug: 'trucks-hgv',
    name: 'Commercial Fleet & Haulage',
    descriptor: 'Touchless traffic film removers, chassis degreasers & curtain wall washes.',
    image: '/assets/industries/fleet.png',
    badge: 'High Dilution',
  },
  {
    slug: 'agriculture',
    name: 'Agricultural & Livestock',
    descriptor: 'Heavy muck loosening, tractor washdown & biosecure sanitising chemistry.',
    image: '/assets/industries/agriculture.png',
    badge: 'Heavy Soil',
  },
  {
    slug: 'plant-machinery',
    name: 'Plant & Heavy Machinery',
    descriptor: 'Excavator degreasing, hydraulic oil removal & quarry equipment cleanup.',
    image: '/assets/industries/mining.png',
    badge: 'Hydrocarbon Cracker',
  },
  {
    slug: 'aluminium-metal',
    name: 'Aluminium & Metal Restoration',
    descriptor: 'Acid brighteners, deoxidising agents & mill-finish restoration blends.',
    image: '/assets/hot-water-gauge-hero.jpg',
    badge: 'Acid Brightener',
  },
  {
    slug: 'workshops-floors',
    name: 'Workshops & Hard Surfaces',
    descriptor: 'Bay floor degreasers, concrete cleaners & low-foam scrubber chemistry.',
    image: '/assets/parts/parts-hero-workshop.jpg',
    badge: 'Non-Caustic',
  },
  {
    slug: 'machine-care',
    name: 'Boiler Coil & System Care',
    descriptor: 'ScaleGuard descaling inhibitors & pump winterising solutions.',
    image: '/assets/engineered-continuous-duty.jpg',
    badge: 'Warranty Protector',
  },
];

export default function ChemicalApplicationDoors() {
  return (
    <section className="py-20 lg:py-28 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA] text-[#1A1917] border-b border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
              // Shop By Application Sector
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1A1917]">
              Formulated for specific industrial substrates.
            </h2>
            <p className="text-sm sm:text-base text-[#555] font-normal leading-relaxed">
              Match the exact chemical formulation to your fleet type, soil profile, and substrate safety requirements.
            </p>
          </div>

          <a
            href="#directory"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-[#1A1917] hover:text-[#FF6900] transition-colors font-medium self-start md:self-auto"
          >
            <span>View All 20 Formulations</span>
            <ArrowRight className="w-4 h-4 text-[#FF6900]" />
          </a>
        </div>

        {/* ── 6-SECTOR APPLICATION TILES (GRID WITH PHOTOGRAPHY) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {APPLICATION_SECTORS.map((sector) => (
            <a
              key={sector.slug}
              href={`#sector-${sector.slug}`}
              className="group relative min-h-[300px] bg-[#1A1917] border border-[#E2DDD3] hover:border-[#FF6900] transition-all duration-300 flex flex-col justify-between p-7 overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Background Image & Scrim */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={sector.image}
                  alt={sector.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center brightness-[0.35] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917] via-[#1A1917]/70 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#FF6900] bg-black/60 px-2.5 py-1 border border-white/10">
                  {sector.badge}
                </span>
                <ArrowRight className="w-4 h-4 text-white group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all" />
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  {sector.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#CCC] font-normal leading-relaxed">
                  {sector.descriptor}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
