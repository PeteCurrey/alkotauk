import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import ChemicalCampaignHero from '@/components/chemicals/ChemicalCampaignHero';
import ChemicalTransformationScene from '@/components/chemicals/ChemicalTransformationScene';
import { getRetailProducts } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Professional Cleaning Chemistry | Alkota UK',
  description: 'Commercial vehicle traffic film removers (RoadForce), heavy plant degreasers (GreaseCut), aluminium brighteners (AlumaRestore), and coil descalers in 5L, 20L, 200L drums and 1000L IBCs.',
  openGraph: {
    title: 'Professional Cleaning Chemistry Campaign | Alkota UK',
    description: 'Hot water accelerated traffic film removers, degreasers, and acid brighteners.',
    url: 'https://alkota.co.uk/parts-attachments/chemicals',
  },
};

interface ChemicalsStorePageProps {
  searchParams: Promise<{
    app?: string;
    family?: string;
    q?: string;
  }>;
}

export default async function ChemicalsStorefrontPage({ searchParams }: ChemicalsStorePageProps) {
  const { app, family, q } = await searchParams;
  
  const allProducts = await getRetailProducts({
    applicationSlug: app,
    family: family,
  });

  let filteredProducts = allProducts;
  if (q && q.trim()) {
    const term = q.trim().toLowerCase();
    filteredProducts = allProducts.filter(p => 
      p.retail_name.toLowerCase().includes(term) ||
      p.originating_master_code.toLowerCase().includes(term) ||
      p.originating_master_name.toLowerCase().includes(term) ||
      p.short_description.toLowerCase().includes(term) ||
      p.retail_family.toLowerCase().includes(term)
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">
      {/* ── SCENE 01: THE LAUNCH STAGE (100VH VIEWPORT) ── */}
      <ChemicalCampaignHero productCount={allProducts.length} />

      {/* ── SCENES 02–05: FORMULATION TRANSFORMATION SCENES ── */}
      <ChemicalTransformationScene />

      {/* ── SCENE 06: COMPLETE CATALOGUE DIRECTORY ── */}
      <section id="catalogue" className="py-28 px-6 sm:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8E8E4]">
            <div className="space-y-1">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#888] font-medium block">
                Complete Catalogue
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
                All Formulations.
              </h2>
            </div>
            <span className="text-xs font-ibm-plex-mono text-[#888]">
              {filteredProducts.length} commercial chemical formulations in stock
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((prod) => (
              <ChemicalCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
