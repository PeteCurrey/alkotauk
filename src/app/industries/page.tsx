'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getMockIndustries } from '@/sanity/client';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { ArrowRight, Sliders, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<any[]>([]);

  useEffect(() => {
    getMockIndustries().then(setIndustries);
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#1A1A18] font-normal pb-0">
      <Navigation />

      {/* ─── 01. FULL-VIEWPORT HERO ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between bg-[#0A0A0A] text-white border-b border-[#222] px-6 sm:px-12 pt-28 sm:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent z-10" />
          <div 
            className="w-full h-full bg-cover bg-center opacity-35"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80)' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <Breadcrumbs items={[{ label: 'Industries & Sectors' }]} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#FF6900] mb-4 font-medium">
              Sectors & Application Engineering
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight uppercase tracking-tight text-white leading-[1.0] mb-6">
              BUILT FOR <br />
              <span className="text-[#FF6900] font-light">YOUR INDUSTRY.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#CCC] leading-relaxed font-light max-w-2xl mb-8">
              From heavy plant haulage and agricultural biosecurity to food manufacturing hygiene and marine operations, Alkota equipment is engineered around the specific operational challenges of your sector.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#sectors"
                className="inline-flex items-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-8 py-4 text-xs uppercase tracking-widest transition-all font-medium no-underline shadow-lg"
              >
                <span>Explore Sectors Below</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/tools/machine-match"
                className="inline-flex items-center gap-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white px-6 py-4 text-xs uppercase tracking-widest transition-all font-medium no-underline backdrop-blur-sm"
              >
                <Sliders className="h-4 w-4 text-[#FF6900]" />
                <span>Launch Sector Matcher</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 02. SECTORS GRID (LIGHT) ──────────────────────────────────────── */}
      <section id="sectors" className="py-24 bg-[#FAFAF8] border-b border-[#E5E5E0] px-6 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
              OPERATIONAL SECTORS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-tight text-[#1A1A18] leading-tight">
              Select Your Sector
            </h2>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal mt-3">
              Discover verified equipment configurations, contamination solutions, and case studies for your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const IconComponent = (LucideIcons as any)[industry.icon] || LucideIcons.Globe;
              return (
                <Link
                  key={industry.slug?.current || industry.id}
                  href={`/industries/${industry.slug?.current || industry.slug}`}
                  className="group flex flex-col justify-between bg-white border border-[#E5E5E0] hover:border-[#FF6900] transition-colors p-8 no-underline shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-[#FAFAF8] border border-[#E5E5E0] text-[#FF6900] group-hover:bg-[#FF6900] group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] text-[#888] uppercase">
                        Industrial Spec
                      </span>
                    </div>

                    <h3 className="text-2xl font-light uppercase tracking-tight text-[#1A1A18] group-hover:text-[#FF6900] transition-colors mb-3">
                      {industry.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666] font-normal leading-relaxed line-clamp-3 mb-6">
                      {industry.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F0F0EE] flex items-center justify-between font-mono text-xs text-[#FF6900]">
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 03. ON-SITE CONSULTATION CTA (DARK MOMENT) ────────────────────── */}
      <section className="bg-[#0A0A0A] text-white py-20 px-6 sm:px-12 border-b border-[#222]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] block mb-2 font-medium">
                SITE-SPECIFIC ENGINEERING
              </span>
              <h2 className="font-extralight text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
                Consult an Alkota Applications Engineer
              </h2>
              <p className="font-light text-base sm:text-lg text-[#AAA] leading-relaxed max-w-2xl">
                We engineer complete bespoke wash systems, trailers, and wash bay installations tailored to your site throughput and regulatory requirements.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/contact?enquiry=industry-consultation"
                className="inline-flex items-center justify-center gap-2 bg-[#FF6900] hover:bg-[#E05800] text-white px-6 py-4 text-xs font-medium uppercase tracking-widest transition-all no-underline shadow-lg"
              >
                <span>Book Site Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
