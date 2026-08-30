import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Layers, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase/server';
import { COMPREHENSIVE_APPLICATIONS } from '@/lib/parts/seed-comprehensive';
import ProductCard from '@/components/parts/ProductCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ application: string }>;
}): Promise<Metadata> {
  const { application } = await params;
  const match = COMPREHENSIVE_APPLICATIONS.find((a) => a.slug === application);
  return {
    title: match ? `${match.name} Pressure Washing Equipment & Attachments | Alkota UK` : 'Industry Application | Alkota UK',
    description: match?.editorial_intro || 'Specialist pressure washing tools, surface cleaners, foam systems, and high-pressure hoses for this application.',
  };
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ application: string }>;
}) {
  const { application } = await params;

  // Fetch application details from DB or fallback
  const { data: dbApp } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('slug', application)
    .single();

  const app = dbApp || COMPREHENSIVE_APPLICATIONS.find((a) => a.slug === application);

  if (!app) {
    notFound();
  }

  // Fetch related parts from DB
  const { data: allParts } = await supabaseAdmin
    .from('parts')
    .select('*')
    .eq('active', true)
    .limit(30);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-24 font-sans">
      {/* ── HEADER HERO ── */}
      <section className="bg-[#0A0A0A] text-white py-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-4">
            <Link href="/parts-attachments" className="hover:text-alkota-orange transition-colors">
              Parts Hub
            </Link>
            <span>/</span>
            <Link href="/parts-attachments/applications" className="hover:text-alkota-orange transition-colors">
              Applications
            </Link>
            <span>/</span>
            <span className="text-alkota-orange">{app.name}</span>
          </div>

          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
            // Industry Application Overview
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-4">
            {app.name}
          </h1>
          <p className="text-alkota-orange text-base sm:text-lg font-light mb-4">
            {app.tagline}
          </p>
          <p className="text-[#AAA] text-sm sm:text-base max-w-3xl font-light leading-relaxed mb-8">
            {app.editorial_intro}
          </p>

          <div className="bg-[#141414] border border-[#282828] p-6 max-w-2xl font-ibm-plex-mono text-xs text-[#CCC] space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-alkota-orange block">
              Recommended Technical Configuration:
            </span>
            <p className="text-white font-normal leading-relaxed">
              {app.recommended_specs}
            </p>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BUYING GUIDANCE ── */}
      {app.buying_guidance && (
        <section className="py-12 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E8E8E4]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-[#FAF9F5] border-l-2 border-alkota-orange">
              <div className="space-y-1">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block">
                  Engineering & Equipment Guidance
                </span>
                <p className="text-sm font-light text-[#333] leading-relaxed">
                  {app.buying_guidance}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── RECOMMENDED ATTACHMENTS & PARTS ── */}
      <section className="py-16 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E8E4]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // Recommended Attachments & Tooling
              </span>
              <h2 className="text-2xl font-light text-alkota-black tracking-tight">
                Curated Components for {app.name}
              </h2>
            </div>

            <Link
              href={`/parts-attachments/enquiry?notes=${encodeURIComponent(`Enquiry regarding application: ${app.name}`)}`}
              className="hidden sm:inline-flex items-center gap-2 bg-alkota-orange text-white px-4 py-2.5 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-black transition-colors"
            >
              <span>Application Quote</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(allParts || []).slice(0, 12).map((part: any) => (
              <ProductCard key={part.id} part={part} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
