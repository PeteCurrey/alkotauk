import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, ShieldCheck } from 'lucide-react';
import ChemicalFinderClient from '@/components/chemicals/ChemicalFinderClient';
import { 
  getChemicalApplications, 
  getRetailProducts 
} from '@/lib/chemicals/service';
import { 
  CHEMICAL_CLEANING_PROBLEMS, 
  CHEMICAL_SURFACES 
} from '@/lib/chemicals/seed-data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Chemical Match & Finder Wizard | Alkota UK',
  description: 'Interactive chemical matching tool for commercial fleets, agriculture, industrial degreasing, and aluminium acid restoration.',
};

export default async function ChemicalFinderPage() {
  const applications = await getChemicalApplications();
  const products = await getRetailProducts();

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans pb-28">
      {/* ── HEADER HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-14 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/chemicals" className="hover:text-alkota-orange transition-colors">
              Chemicals
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">Chemical Finder Wizard</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-white mb-3">
            Find the Right <span className="text-alkota-orange italic font-light">Chemistry.</span>
          </h1>
          <p className="text-[#AAA] text-sm sm:text-base max-w-2xl font-light leading-relaxed mb-6">
            Identify the optimal Alkota master formulation for your machinery, substrate, and soil contamination in three guided steps.
          </p>

          <div className="flex items-center gap-2 text-xs font-ibm-plex-mono text-[#888]">
            <ShieldCheck className="w-4 h-4 text-alkota-orange" />
            <span>Alkota Formulation Engine · 100% Traceable Chemistry</span>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FINDER ── */}
      <section className="py-12 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <ChemicalFinderClient
            applications={applications}
            problems={CHEMICAL_CLEANING_PROBLEMS}
            surfaces={CHEMICAL_SURFACES}
            products={products}
          />
        </div>
      </section>
    </main>
  );
}
