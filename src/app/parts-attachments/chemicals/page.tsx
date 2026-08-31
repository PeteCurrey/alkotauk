import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ChemicalStorefrontHero from '@/components/chemicals/ChemicalStorefrontHero';
import ChemicalApplicationDoors from '@/components/chemicals/ChemicalApplicationDoors';
import FeaturedChemicalsShowcase from '@/components/chemicals/FeaturedChemicalsShowcase';
import FacetedChemicalDirectory from '@/components/chemicals/FacetedChemicalDirectory';
import { getRetailProducts } from '@/lib/chemicals/service';
import { ArrowRight, Truck, ShieldCheck, FileText, Phone } from 'lucide-react';

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

export default async function ChemicalsStorefrontPage() {
  const allProducts = await getRetailProducts();

  return (
    <main className="min-h-screen bg-[#F4F1EA] text-[#1A1917] font-sans selection:bg-[#FF6900] selection:text-white">
      {/* ── 01: FULL-BLEED CHEMICAL OPENING HERO ── */}
      <ChemicalStorefrontHero />

      {/* ── 02: SHOP BY APPLICATION SECTOR (6 DOORS) ── */}
      <ChemicalApplicationDoors />

      {/* ── 03: FEATURED MASTER FORMULATIONS WITH PACK SELECTOR ── */}
      <FeaturedChemicalsShowcase />

      {/* ── 04: COMMERCIAL BULK & DEALER SUPPLY PATH ── */}
      <section id="commercial-bulk" className="py-16 px-6 sm:px-10 lg:px-16 bg-[#1A1917] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-ibm-plex-mono text-[11px] uppercase tracking-[0.25em] text-[#FF6900] font-semibold block">
              // Commercial Bulk &amp; Fleet Accounts
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Buying in volume for haulage depots or plant hire?
            </h3>
            <p className="text-sm text-[#AAA] font-normal leading-relaxed">
              We supply 1,000L IBCs, full pallet drop-shipments (32 × 20L drums), and custom automated chemical dosing systems with trade credit terms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-4 bg-[#FF6900] hover:bg-white hover:text-black font-ibm-plex-mono text-xs uppercase tracking-widest text-white transition-colors font-semibold whitespace-nowrap text-center shadow-lg shadow-[#FF6900]/20"
            >
              Request IBC Pricing →
            </Link>
            <a
              href="tel:01234567890"
              className="px-6 py-4 border border-white/20 hover:border-white text-white font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium whitespace-nowrap text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6900]" />
              <span>Chemical Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 05: 8-SECTOR FACETED FORMULATION DIRECTORY ── */}
      <FacetedChemicalDirectory products={allProducts} />
    </main>
  );
}
