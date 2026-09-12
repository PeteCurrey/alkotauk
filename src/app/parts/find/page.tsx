import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import PartsFinderHub from './PartsFinderHub';
import { COMPREHENSIVE_MACHINE_FAMILIES, COMPREHENSIVE_MACHINE_MODELS } from '@/lib/parts/seed-comprehensive';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Find the Right Part | Alkota UK Intelligent Parts Finder',
  description: 'Identify exact OEM spare parts, pumps, coils, burners, and accessories for your pressure washer — by part number, machine model, or diagnostic search.',
  alternates: {
    canonical: 'https://alkota.co.uk/parts/find',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PartsFindPage() {
  // 1. Fetch categories
  const { data: dbCategories } = await supabaseAdmin
    .from('part_categories')
    .select('slug, name, icon_name, short_desc, sort_order')
    .eq('active', true)
    .order('sort_order');

  // 2. Fetch machine families
  const { data: dbFamilies } = await supabaseAdmin
    .from('machine_families')
    .select('id, slug, name, manufacturer')
    .eq('active', true)
    .order('sort_order');

  // 3. Fetch machine models
  const { data: dbModels } = await supabaseAdmin
    .from('machine_models')
    .select('id, slug, model_code, name, series, specs_summary, family_id, pressure_psi, flow_lpm')
    .eq('active', true)
    .order('sort_order');

  const categories = (dbCategories && dbCategories.length > 0) ? dbCategories : [
    { slug: 'pumps', name: 'Pumps & Pump Parts', icon_name: 'Gauge' },
    { slug: 'burners', name: 'Burners & Ignition', icon_name: 'Flame' },
    { slug: 'coils', name: 'Heating Coils', icon_name: 'Layers' },
    { slug: 'hoses', name: 'Hoses & Reels', icon_name: 'Activity' },
    { slug: 'trigger-guns', name: 'Trigger Guns', icon_name: 'Wrench' },
    { slug: 'lances-nozzles', name: 'Lances & Nozzles', icon_name: 'Target' },
    { slug: 'surface-cleaners', name: 'Surface Cleaners', icon_name: 'RotateCcw' },
    { slug: 'valves-unloaders', name: 'Valves & Unloaders', icon_name: 'ShieldCheck' },
    { slug: 'filters', name: 'Filters & Strainers', icon_name: 'Filter' },
    { slug: 'electrical-switches', name: 'Electrical & Controls', icon_name: 'Zap' },
    { slug: 'service-kits', name: 'Service & Maintenance Kits', icon_name: 'Package' },
    { slug: 'attachments', name: 'Attachments & Accessories', icon_name: 'Plus' },
  ];

  const families = (dbFamilies && dbFamilies.length > 0) ? dbFamilies : COMPREHENSIVE_MACHINE_FAMILIES;
  const models = (dbModels && dbModels.length > 0) ? dbModels : COMPREHENSIVE_MACHINE_MODELS;

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center font-ibm-plex-mono text-xs text-[#888]">Initialising Intelligent Parts Finder...</div>}>
        <PartsFinderHub
          categories={categories as any}
          machineFamilies={families as any}
          machineModels={models as any}
        />
      </Suspense>
    </main>
  );
}
