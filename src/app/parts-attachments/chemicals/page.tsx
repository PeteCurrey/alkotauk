import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import CinematicExhibitHero, { ExhibitItem } from '@/components/parts/CinematicExhibitHero';
import FacetedChemicalDirectory from '@/components/chemicals/FacetedChemicalDirectory';
import { getRetailProducts } from '@/lib/chemicals/service';
import { Building2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alkota UK Cleaning Chemistry Store | Professional TFR & Degreasers',
  description: 'Hot water accelerated commercial vehicle traffic film removers (RoadForce), heavy plant degreasers (GreaseCut), aluminium brighteners (AlumaRestore), and coil descalers.',
  openGraph: {
    title: 'Alkota UK Cleaning Chemistry Store',
    description: '100% GB-CLP compliant pressure washing detergents in 5L, 20L, 200L drums and 1000L IBCs.',
    url: 'https://alkota.co.uk/parts-attachments/chemicals',
  },
};

const FEATURED_CHEMICAL_EXHIBITS: ExhibitItem[] = [
  {
    id: 'exhibit-roadforce',
    partNumber: 'ALK-CHM-TR407-20L',
    brand: 'ROADFORCE FLEET',
    name: 'RoadForce Fleet Heavy TFR',
    tagline: 'TOUCHLESS TRAFFIC FILM REMOVAL',
    promise: 'Cuts through road film and diesel grime in one touchless pass without etching vehicle livery or polished aluminium.',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota TR-407 Master' },
      { label: 'DILUTION RATIO', value: '1:50 to 1:100' },
      { label: 'HEATED REACTION', value: 'Accelerates at 50°C–90°C' },
      { label: 'SUBSTRATE SAFETY', value: 'Paint, Livery & Alloy Safe' },
    ],
    packSizes: ['5L Canister', '20L Drum', '200L Barrel', '1000L IBC'],
    price: 38.50,
    image: '/assets/industries/fleet.png',
    bgWatermark: 'ROADFORCE',
    category: 'chemical',
    inStock: true,
    slug: 'roadforce-fleet-heavy-tfr',
    origin: 'GB-CLP Certified Formulation',
  },
  {
    id: 'exhibit-greasecut',
    partNumber: 'ALK-CHM-DE703-20L',
    brand: 'GREASECUT INDUSTRIAL',
    name: 'GreaseCut Multi-Surface Workshop Degreaser',
    tagline: 'HIGH-POTENCY HYDROCARBON CRACKING',
    promise: 'Dissolves baked engine oil and chassis grease on contact, turning heavy sludge into a free-rinsing emulsion.',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota DE-703 Master' },
      { label: 'DILUTION RATIO', value: '1:10 Heavy / 1:30 General' },
      { label: 'ALKALINITY', value: 'Non-Caustic Hydrocarbon Cracker' },
      { label: 'SURFACE COMPATIBILITY', value: 'Gearboxes, Excavators, Concrete' },
    ],
    packSizes: ['5L Canister', '20L Drum', '200L Barrel', '1000L IBC'],
    price: 29.50,
    image: '/assets/parts/parts-hero-workshop.jpg',
    bgWatermark: 'GREASECUT',
    category: 'chemical',
    inStock: true,
    slug: 'greasecut-multi-surface-workshop-degreaser',
    origin: 'GB-CLP Certified Formulation',
  },
  {
    id: 'exhibit-alumarestore',
    partNumber: 'ALK-CHM-TS602-20L',
    brand: 'ALUMARESTORE',
    name: 'AlumaRestore Aluminium Acid Brightener',
    tagline: 'DEOXIDATION & SURFACE RESTORATION',
    promise: 'Restores weathered aluminium fuel tanks, side guards, and tipper bodies to satin brilliance in under two minutes.',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota TS-602 Master' },
      { label: 'ACTIVE ACIDS', value: 'Phosphoric & Organic Blend' },
      { label: 'ACTION TIME', value: '1 to 2 Minutes Dwell' },
      { label: 'TARGET SUBSTRATES', value: 'Raw / Mill-Finish Aluminium' },
    ],
    packSizes: ['5L Canister', '20L Drum', '200L Barrel'],
    price: 46.00,
    image: '/assets/hot-water-gauge-hero.jpg',
    bgWatermark: 'ALUMARESTORE',
    category: 'chemical',
    inStock: true,
    slug: 'alumarestore-aluminium-acid-brightener',
    origin: 'GB-CLP Certified Formulation',
  },
  {
    id: 'exhibit-scaleguard',
    partNumber: 'ALK-CHM-SD927-20L',
    brand: 'SCALEGUARD COIL CARE',
    name: 'ScaleGuard Water Softener & Coil Protector',
    tagline: 'PREVENTATIVE HEATING COIL CHELATION',
    promise: 'Binds hard water minerals before they precipitate into scale choke points, protecting your 7-year boiler warranty.',
    specs: [
      { label: 'FORMULATION CODE', value: 'Alkota SD-927 Master' },
      { label: 'DOSING RATE', value: '1:1000 Continuous Metering' },
      { label: 'HEAT TOLERANCE', value: 'Effective up to 150°C Steam' },
      { label: 'WARRANTY COMPLIANCE', value: 'Official Alkota Factory Care' },
    ],
    packSizes: ['5L Canister', '20L Drum'],
    price: 34.00,
    image: '/assets/engineered-continuous-duty.jpg',
    bgWatermark: 'SCALEGUARD',
    category: 'chemical',
    inStock: true,
    slug: 'scaleguard-water-softener-coil-protector',
    origin: 'GB-CLP Certified Formulation',
  },
];

export default async function ChemicalsStorefrontPage() {
  const allProducts = await getRetailProducts();

  return (
    <main className="min-h-screen bg-[#EBEAE5] text-[#111110] font-sans selection:bg-[#FF6900] selection:text-white">
      {/* ── 01: FULL-BLEED CINEMATIC EXHIBIT HERO (CHEMICAL MODE) ── */}
      <CinematicExhibitHero exhibits={FEATURED_CHEMICAL_EXHIBITS} mode="chemicals" />

      {/* ── 02: COMMERCIAL BULK & DEALER SUPPLY PATH ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-16 bg-[#111110] text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#FF6900] font-semibold block">
              // COMMERCIAL FLEET &amp; DEALER SUPPLY
            </span>
            <h3 className="text-xl sm:text-2xl font-light tracking-tight">
              Buying for Haulage Fleets, Quarries or Plant Hire Turnarounds?
            </h3>
            <p className="text-xs text-[#AAA] font-normal leading-relaxed">
              We supply 1,000L IBCs, full pallet drop-shipments (32 × 20L), and custom automated chemical dosing systems with trade commercial invoicing.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3.5 bg-[#FF6900] hover:bg-white hover:text-black font-ibm-plex-mono text-xs uppercase tracking-widest text-white transition-colors font-medium whitespace-nowrap"
          >
            Request Commercial IBC Rates →
          </Link>
        </div>
      </section>

      {/* ── 03: 8-SECTOR FACETED FORMULATION DIRECTORY ── */}
      <FacetedChemicalDirectory products={allProducts} />
    </main>
  );
}
