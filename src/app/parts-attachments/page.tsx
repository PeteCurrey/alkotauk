import React from 'react';
import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import ContinuousToolingExperience from '@/components/parts/ContinuousToolingExperience';
import CoxReelsDarkScene from '@/components/parts/CoxReelsDarkScene';
import GeneralPumpSculpturalScene from '@/components/parts/GeneralPumpSculpturalScene';
import CinematicComponentRunway from '@/components/parts/CinematicComponentRunway';
import PartsDeskConcierge from '@/components/parts/PartsDeskConcierge';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Genuine OEM Parts, Spares & Tooling Attachments | Alkota UK',
  description: 'Genuine Alkota OEM pressure washer spares, General Pump & CAT pump seals, Mosmatic rotary surface cleaners, Cox Reels hose reels, and high-pressure accessories despatched across the UK.',
  openGraph: {
    title: 'Genuine OEM Parts & Attachments Store | Alkota UK',
    description: 'High-pressure pumps, heating coils, burner electrodes, rotary tooling, and heavy-duty hose reels.',
    url: 'https://alkota.co.uk/parts-attachments',
  },
};

export default async function PartsHomePage() {
  const { data: dbBrands } = await supabaseAdmin
    .from('brand_partners')
    .select('id,slug,name,tagline,country_of_origin,description')
    .eq('active', true)
    .order('sort_order')
    .limit(12);

  const brands = dbBrands || [];

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">
      {/* ── STAGES 01, 02, 03: ONE CONTINUOUS FLUID CAMERA COMPOSITION ── */}
      <ContinuousToolingExperience />

      {/* ── SCENE 04: DRAMATIC CONTRAST MOMENT (COX REELS 100VH DARK SPLIT) ── */}
      <CoxReelsDarkScene />

      {/* ── SCENE 05: BENCHMARK INDUSTRIAL PUMP (GENERAL PUMP TS2021) ── */}
      <GeneralPumpSculpturalScene />

      {/* ── SCENE 06: UNCONSTRAINED COMPONENT DISCOVERY RUNWAY ── */}
      <CinematicComponentRunway />

      {/* ── SCENE 07: BRAND PARTNERS & BESPOKE PARTS DESK ── */}
      <PartsDeskConcierge brands={brands} />
    </main>
  );
}
