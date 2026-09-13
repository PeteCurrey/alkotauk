import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ComparisonDock from '@/components/comparison/ComparisonDock';
import { getProducts } from '@/lib/products';
import { getAllSeries, getCategoriesWithDetails } from '@/lib/catalogue/series';
import CategoryShowcaseGrid from '@/components/catalogue/CategoryShowcaseGrid';
import CatalogueFleetExplorer from '@/components/catalogue/CatalogueFleetExplorer';
import { Sliders, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industrial Pressure Washers & Cleaning Equipment Fleet | Alkota UK',
  description: 'Explore the authoritative Alkota UK machine catalogue. 131 heavy-duty industrial configurations across 36 manufacturer series and 8 categories. Engineered in South Dakota for continuous industrial duty.',
  alternates: {
    canonical: 'https://alkota.co.uk/machines',
  },
  openGraph: {
    title: 'Alkota Industrial Cleaning Machinery & Fleet Catalogue',
    description: 'Hot water pressure washers, cold wash units, industrial steam generators, mobile trailer rigs, and aqueous parts washers.',
    url: 'https://alkota.co.uk/machines',
    type: 'website',
  },
};

export default async function MachinesPage() {
  // Fetch authoritative data from single source of truth
  const [machines, allSeries, categories] = await Promise.all([
    getProducts(),
    getAllSeries(),
    getCategoriesWithDetails(),
  ]);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#1A1A18] font-normal pb-0">
      <Navigation />

      {/* ── 01. INTRODUCTORY DISCOVERY HEADER ─────────────────────────────── */}
      <header className="bg-white border-b border-[#E5E5E0] pt-28 pb-14 px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: 'Equipment Catalogue' }]} />

          <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-0.5 w-6 bg-[#FF6900]" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#FF6900]">
                  Alkota Industrial Range
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-light text-[#1A1A18] tracking-tight leading-none mb-4">
                The Heavy Industrial Fleet
              </h1>

              <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-2xl font-normal">
                Direct UK access to Alkota’s complete range: <strong>{machines.length} verified machines</strong> across <strong>{allSeries.length} manufacturer series</strong> and <strong>8 canonical categories</strong>. Engineered with ASTM A53 Schedule 80 cold-rolled coils, triplex ceramic plunger pumps, and continuous-duty electric, diesel, and gas powerplants.
              </p>
            </div>

            {/* Help Me Choose Pathway Card */}
            <aside className="bg-[#FAF9F5] border border-[#E0E0DC] p-5 rounded-[4px] lg:max-w-sm shrink-0">
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs font-semibold text-[#1A1A18] uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-[#FF6900]" />
                <span>Not Sure What You Need?</span>
              </div>
              <p className="text-xs text-[#666] leading-relaxed mb-3">
                Answer 4 operational questions to instantly identify the optimal water temperature, drive configuration, and pressure rating for your site.
              </p>
              <Link
                href="/machines/help-me-choose"
                className="inline-flex items-center gap-2 bg-[#1A1A18] hover:bg-[#FF6900] text-white px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-[3px] transition-colors no-underline"
              >
                <span>Launch Machine Selector</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </aside>
          </div>
        </div>
      </header>

      {/* ── 02. MAIN CATALOGUE CONTENT BODY ───────────────────────────────── */}
      <div className="py-16 px-6 sm:px-12 mx-auto max-w-7xl">
        {/* Category Showcase (8 Canonical Categories) */}
        <CategoryShowcaseGrid categories={categories} />

        {/* Full Interactive Fleet Explorer (Category tabs, series navigation, filters, grid) */}
        <section id="fleet-explorer" className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5E5E0] gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] block mb-1 font-semibold">
                02 // INTERACTIVE FLEET DISCOVERY
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#1A1A18] tracking-tight">
                Filter & Compare Models
              </h2>
            </div>
            <p className="font-mono text-xs text-[#888] uppercase tracking-wider">
              Real-time specification filters & side-by-side comparison
            </p>
          </div>

          <Suspense fallback={
            <div className="py-16 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#FF6900] border-t-transparent mb-3" />
              <p className="font-mono text-xs text-[#888] uppercase tracking-wider">
                Loading fleet explorer...
              </p>
            </div>
          }>
            <CatalogueFleetExplorer
              initialMachines={machines}
              allSeries={allSeries}
              categories={categories}
            />
          </Suspense>
        </section>
      </div>

      <ComparisonDock />
      <Footer />
    </main>
  );
}
