import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ArchitecturalChemicalGallery from '@/components/chemicals/ArchitecturalChemicalGallery';
import { getRetailProducts } from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Cleaning Chemistry Showroom | Alkota UK',
  description: 'Commercial vehicle traffic film removers (RoadForce), heavy plant degreasers (GreaseCut), aluminium brighteners (AlumaRestore), and coil descalers in 5L, 20L, 200L drums and 1000L IBCs.',
  openGraph: {
    title: 'Cleaning Chemistry Showroom | Alkota UK',
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
    <main className="min-h-screen bg-[#EBEAE5] text-[#111110] font-sans selection:bg-[#FF6900] selection:text-white">
      {/* ── THE LUXURY CHEMICAL CAMPAIGN EXHIBIT ── */}
      <ArchitecturalChemicalGallery />

      {/* ── QUIET COMPLETE CATALOGUE DIRECTORY ── */}
      <section id="catalogue" className="py-24 px-6 sm:px-12 lg:px-24 bg-[#E2E0D8] border-t border-[#D0CEC5]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C8C6BD]">
            <div className="space-y-1">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#777] font-semibold block">
                FORMULATION DIRECTORY
              </span>
              <h2 className="text-3xl font-extralight text-[#111110] tracking-tight uppercase">
                All Formulations ({filteredProducts.length})
              </h2>
            </div>
            <p className="text-xs font-ibm-plex-mono text-[#666] max-w-sm">
              100% GB-CLP verified master chemical formulations engineered for high-pressure hot water delivery.
            </p>
          </div>

          {/* Unboxed Minimal List Directory */}
          <div className="divide-y divide-[#D0CEC5] border-y border-[#D0CEC5]">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/chemicals/product/${product.slug}`}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#DCDAD2] px-4 transition-colors group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-ibm-plex-mono text-xs font-bold text-[#FF6900]">
                      {product.originating_master_code}
                    </span>
                    <h3 className="font-light text-base text-[#111110] group-hover:text-black">
                      {product.retail_name}
                    </h3>
                  </div>
                  <p className="text-xs text-[#666] max-w-xl font-normal">
                    {product.short_description}
                  </p>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center">
                  <div className="text-right">
                    <span className="font-ibm-plex-mono text-[9px] text-[#888] uppercase block">From</span>
                    <span className="font-ibm-plex-mono text-sm text-[#111110] font-semibold">
                      £{(product.skus && product.skus[0]?.price) ? product.skus[0].price.toFixed(2) : '35.00'}
                    </span>
                  </div>
                  <span className="font-ibm-plex-mono text-xs text-[#111110] group-hover:text-[#FF6900] transition-colors">
                    View Dossier →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
