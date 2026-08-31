import React from 'react';
import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import StorefrontHero from '@/components/parts/StorefrontHero';
import FeaturedToolingRunway from '@/components/parts/FeaturedToolingRunway';
import CuratedCategoryDoors from '@/components/parts/CuratedCategoryDoors';
import FilterablePartsCatalogue from '@/components/parts/FilterablePartsCatalogue';
import PartsDeskConcierge from '@/components/parts/PartsDeskConcierge';

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

export default async function PartsHomePage() {
  // Fetch real live parts strictly from Supabase database
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
  } catch (err) {
    console.error('Error fetching parts from database:', err);
  }

  // Fetch verified brands for concierge
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('id,slug,name,tagline,country_of_origin,description')
    .eq('active', true)
    .order('sort_order')
    .limit(6);

  const brands = dbBrands || [];

  return (
    <main className="min-h-screen bg-[#F4F1EA] text-[#1A1917] font-sans selection:bg-[#FF6900] selection:text-white">
      {/* ── 01: FULL-BLEED OPENING HERO (MAKE YOUR ALKOTA DO MORE) ── */}
      <StorefrontHero />

      {/* ── 02: FEATURED ATTACHMENTS & HARDWARE RUNWAY ── */}
      <FeaturedToolingRunway />

      {/* ── 03: ASYMMETRIC PHOTOGRAPHIC CATEGORY DOORS ── */}
      <CuratedCategoryDoors />

      {/* ── 04: FUNCTIONING FILTERABLE 500+ PARTS CATALOGUE ── */}
      <FilterablePartsCatalogue initialParts={partsData} />

      {/* ── 05: BRAND PARTNERS & BESPOKE PARTS DESK ── */}
      <PartsDeskConcierge brands={brands} />
    </main>
  );
}
