import React from 'react';
import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import CinematicExhibitHero, { ExhibitItem } from '@/components/parts/CinematicExhibitHero';
import ShopByDoors from '@/components/parts/ShopByDoors';
import FilterablePartsCatalogue from '@/components/parts/FilterablePartsCatalogue';
import PartsDeskConcierge from '@/components/parts/PartsDeskConcierge';
import { PARTS_CATALOGUE_V2 } from '@/lib/parts/catalogue-seed-v2';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alkota UK Parts & Attachments Store | OEM Spares & Tooling',
  description: 'Precision industrial pressure washer attachments, Swiss rotary surface cleaners, Cox Reels, General Pump triplex spares, and genuine Alkota OEM components.',
  openGraph: {
    title: 'Alkota UK Parts & Attachments Store',
    description: 'Next-day UK mainland despatch on genuine pumps, coils, hoses, and Swiss rotary tooling.',
    url: 'https://alkota.co.uk/parts-attachments',
  },
};

const TOOLING_EXHIBITS: ExhibitItem[] = [
  {
    id: 'exhibit-mosmatic-43',
    partNumber: 'MOS-DL-UHD-43',
    brand: 'MOSMATIC SWITZERLAND',
    name: 'DL-UHD 43 Flat Surface Cleaner (18")',
    tagline: 'SWISS ROTARY PRECISION',
    promise: 'Blasts concrete yards, forecourts, and workshop bays streak-free at 2,000 RPM with zero overspray.',
    specs: [
      { label: 'DIAMETER', value: '430mm (18 Inch)' },
      { label: 'PRESSURE RATING', value: '275 Bar (4,000 PSI)' },
      { label: 'TEMPERATURE', value: '120°C Hot Water' },
      { label: 'ROTARY SPEED', value: '2,000 RPM Dual-Jet' },
    ],
    price: 445.00,
    image: '/assets/products/whirl-away-surface-cleaner.png',
    bgWatermark: 'MOSMATIC',
    category: 'surface-cleaners',
    inStock: true,
    material: '304 Welded Stainless Steel',
    origin: 'Necker, Switzerland',
  },
  {
    id: 'exhibit-coxreels-1125',
    partNumber: 'COX-1125-3-100',
    brand: 'COXREELS USA',
    name: '1125 Series All-Steel High-Pressure Reel',
    tagline: 'ALL-STEEL FLUID MANAGEMENT',
    promise: 'Keeps 30 metres of high-pressure wire-braided hose protected, tangle-free, and deployable in seconds.',
    specs: [
      { label: 'CAPACITY', value: '30m (100ft) 3/8" Hose' },
      { label: 'PRESSURE RATING', value: '300 Bar (4,350 PSI)' },
      { label: 'SWIVEL FITTING', value: 'CPC Brass Live Swivel' },
      { label: 'MOUNTING', value: 'Floor, Wall & Skid' },
    ],
    price: 285.00,
    image: '/assets/products/high-pressure-hose.png',
    bgWatermark: 'COXREELS',
    category: 'hoses',
    inStock: true,
    material: 'Heavy-Gauge CNC Steel A-Frame',
    origin: 'Tempe, Arizona, USA',
  },
  {
    id: 'exhibit-generalpump-ts2021',
    partNumber: 'ALK-PMP-001',
    brand: 'GENERAL PUMP / INTERPUMP',
    name: 'TS2021 Industrial Triplex Plunger Pump',
    tagline: 'THE BENCHMARK INDUSTRIAL PUMP',
    promise: 'Solid 99.8% alumina ceramic plungers and forged brass manifold engineered for continuous 24/7 duty.',
    specs: [
      { label: 'WATER FLOW', value: '15.0 L/min' },
      { label: 'PRESSURE RATING', value: '200 Bar (2,900 PSI)' },
      { label: 'PLUNGER CORE', value: 'Solid Ceramic Alumina' },
      { label: 'MANIFOLD', value: 'Forged High-Density Brass' },
    ],
    price: 645.00,
    image: '/assets/products/industrial-pump.png',
    bgWatermark: 'TRIPLEX',
    category: 'pumps',
    inStock: true,
    material: 'Forged Brass & Ceramic',
    origin: 'Reggio Emilia, Italy',
  },
  {
    id: 'exhibit-schedule80-coil',
    partNumber: 'ALK-COIL-4000',
    brand: 'ALKOTA OEM GENUINE',
    name: 'Schedule 80 Hydro-Insulated Heating Coil',
    tagline: 'CONTINUOUS THERMAL EFFICIENCY',
    promise: 'Cold-rolled Schedule 80 seamless steel pipe engineered to deliver instantaneous 140°C saturated steam.',
    specs: [
      { label: 'PIPE SCHEDULE', value: 'Schedule 80 Seamless' },
      { label: 'BURST RATING', value: 'Over 1,000 Bar Proof' },
      { label: 'INSULATION', value: 'Hydro-Insulated Ceramic' },
      { label: 'WARRANTY', value: '7-Year Boiler Coil Guarantee' },
    ],
    price: 890.00,
    image: '/assets/engineered-continuous-duty.jpg',
    bgWatermark: 'ALKOTA',
    category: 'coils',
    inStock: true,
    material: 'ASTM A53 Carbon Steel',
    origin: 'Alcester, South Dakota, USA',
  },
];

export default async function PartsHomePage() {
  // Fetch real parts from Supabase with fallback to catalogue seed
  let partsData = [];
  try {
    const { data } = await supabaseAdmin
      .from('parts')
      .select('*')
      .eq('active', true)
      .order('sort_order');
    if (data && data.length > 0) {
      partsData = data;
    }
  } catch {}

  if (partsData.length === 0) {
    partsData = PARTS_CATALOGUE_V2.map((p, idx) => ({ ...p, id: `seed-${idx}` }));
  }

  // Fetch brands for concierge
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('id,slug,name,tagline,country_of_origin,description')
    .eq('active', true)
    .order('sort_order')
    .limit(12);

  const brands = dbBrands || [];

  return (
    <main className="min-h-screen bg-[#EBEAE5] text-[#111110] font-sans selection:bg-[#FF6900] selection:text-white">
      {/* ── 01: FULL-BLEED CINEMATIC EXHIBIT HERO ── */}
      <CinematicExhibitHero exhibits={TOOLING_EXHIBITS} mode="parts" />

      {/* ── 02: CURATED EDITORIAL "SHOP BY" DOORS ── */}
      <ShopByDoors />

      {/* ── 03: FUNCTIONING FILTERABLE 500+ PARTS CATALOGUE ── */}
      <FilterablePartsCatalogue initialParts={partsData} />

      {/* ── 04: BRAND PARTNERS & BESPOKE PARTS DESK ── */}
      <PartsDeskConcierge brands={brands} />
    </main>
  );
}
