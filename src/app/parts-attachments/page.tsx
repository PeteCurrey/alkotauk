import React from 'react';
import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import ArchitecturalShowroomGallery from '@/components/parts/ArchitecturalShowroomGallery';
import Link from 'next/link';
import { ArrowRight, Wrench, Search, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Equipment & Tooling Showroom | Alkota UK',
  description: 'Precision industrial pressure washer attachments, Swiss rotary surface cleaners, Cox Reels, and genuine OEM spares.',
  openGraph: {
    title: 'Equipment & Tooling Showroom | Alkota UK',
    description: 'High-pressure pumps, heating coils, burner electrodes, rotary tooling, and heavy-duty hose reels.',
    url: 'https://alkota.co.uk/parts-attachments',
  },
};

export default async function PartsHomePage() {
  const { data: categories } = await supabaseAdmin
    .from('part_categories')
    .select('id,slug,name,short_desc')
    .eq('active', true)
    .order('sort_order');

  const { data: featuredParts } = await supabaseAdmin
    .from('parts')
    .select('id,part_number,name,slug,category,brand,price,in_stock')
    .eq('active', true)
    .limit(24);

  return (
    <main className="min-h-screen bg-[#EBEAE5] text-[#111110] font-sans selection:bg-[#FF6900] selection:text-white">
      {/* ── THE LUXURY DIGITAL PRODUCT SHOWROOM EXHIBIT ── */}
      <ArchitecturalShowroomGallery />

      {/* ── QUIET ENGINEERING CATALOGUE DIRECTORY ── */}
      <section id="catalogue" className="py-24 px-6 sm:px-12 lg:px-24 bg-[#E2E0D8] border-t border-[#D0CEC5]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C8C6BD]">
            <div className="space-y-1">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#777] font-semibold block">
                TECHNICAL DIRECTORY
              </span>
              <h2 className="text-3xl font-extralight text-[#111110] tracking-tight uppercase">
                Browse Full Catalogue
              </h2>
            </div>
            <p className="text-xs font-ibm-plex-mono text-[#666] max-w-sm">
              Search OEM-genuine pump components, Swiss rotary tooling, Cox Reels, and high-pressure accessories.
            </p>
          </div>

          {/* Category Directory Runway (Unboxed) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {(categories || []).map((cat) => (
              <Link
                key={cat.slug}
                href={`/parts-attachments/${cat.slug}`}
                className="p-5 bg-[#ECEAE3] hover:bg-[#111110] hover:text-white transition-all group border border-[#D5D3CA]"
              >
                <span className="font-ibm-plex-mono text-[10px] uppercase text-[#FF6900] block mb-2">
                  // {cat.slug.toUpperCase()}
                </span>
                <h3 className="font-light text-base text-[#111110] group-hover:text-white transition-colors">
                  {cat.name}
                </h3>
                <span className="font-ibm-plex-mono text-[10px] text-[#777] group-hover:text-white/60 block mt-2">
                  View Parts →
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
