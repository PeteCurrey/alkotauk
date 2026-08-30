import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  FlaskConical, 
  FileText, 
  Truck, 
  Building2, 
  ArrowUpRight, 
  CheckCircle2,
  Layers,
  Gauge
} from 'lucide-react';
import { 
  getChemicalApplications, 
  getMasterFormulations 
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Alkota Professional Cleaning Chemistry | Master Formulations & Technical Data',
  description: 'Alkota UK professional industrial chemistry. Master formulations including TR-407, TR-404, TS-602, and SD-927 engineered for hot water pressure washers, Schedule 80 coils, and commercial bulk supply.',
};

export default async function ProfessionalChemicalsHubPage() {
  const applications = await getChemicalApplications();
  const formulations = await getMasterFormulations();

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black font-sans selection:bg-alkota-orange selection:text-white">

      {/* ── 01: HERO (Professional / B2B Technical Hub) ────────────────────────── */}
      <section
        className="relative min-h-[85vh] w-full flex flex-col justify-center overflow-hidden bg-[#0F0F0D] text-white px-6 sm:px-12 font-normal"
        aria-label="Alkota UK Professional Chemistry Hub"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Alkota industrial chemical engineering"
            className="h-full w-full object-cover object-center scale-105"
            style={{ filter: 'brightness(0.60) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0D] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-20">
          <div className="max-w-2xl">
            {/* Provenance */}
            <div className="mb-5 inline-flex items-center gap-3 font-normal">
              <span className="h-[1.5px] w-5 bg-alkota-orange shrink-0" />
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-light">
                Alkota UK · Professional Chemical Engineering
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-extralight uppercase tracking-tight text-white leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.2rem)' }}
            >
              Professional Chemistry.<br />
              <span className="text-alkota-orange">Engineered to clean.</span>
            </h1>

            {/* Supporting technical copy */}
            <p className="text-[#E0E0DC] text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
              Six decades of American industrial formulation heritage. High-potency traffic film removers, aluminium acid brighteners, agricultural degreasers, and Schedule 80 coil protection chemistry.
            </p>

            {/* ── HIGH-IMPACT BRIDGE TO RETAIL STORE ── */}
            <div className="p-4 bg-[#181816]/90 border border-alkota-orange/40 mb-8 max-w-xl shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-alkota-orange animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold">
                      Direct Purchase Store
                    </span>
                  </div>
                  <p className="text-xs text-white/90 font-normal">
                    Looking to purchase 5L, 20L, 200L drums or 1000L IBCs online?
                  </p>
                </div>
                <Link
                  href="/parts-attachments/chemicals"
                  className="inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors shrink-0 shadow-lg font-medium"
                >
                  <span>Shop Chemicals Online</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-normal">
              <Link
                href="/chemicals/safety-data"
                className="inline-flex items-center justify-center gap-3 border border-white/40 bg-black/40 backdrop-blur-sm text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-alkota-orange" />
                <span>SDS &amp; Technical Portal</span>
              </Link>
              <Link
                href="/contact?type=chemical-bulk"
                className="inline-flex items-center justify-center gap-3 border border-white/20 bg-white/5 text-white/90 px-6 py-3 text-xs uppercase tracking-[0.2em] hover:border-white hover:text-white transition-all"
              >
                <span>Dealer &amp; Bulk Purchasing</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: MASTER FORMULATION INTEGRITY & TRACEABILITY ───────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#0A0A0A] text-white border-b border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // Master Chemical Ledger
              </span>
              <h2 className="font-extralight text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Authoritative Master Formulations.
              </h2>
            </div>
            <Link
              href="/chemicals/finder"
              className="font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
              <span>Chemical Match Tool</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formulations.map((f) => (
              <div 
                key={f.id}
                className="bg-[#141412] border border-[#262624] hover:border-alkota-orange/60 p-6 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono font-bold text-base text-alkota-orange tracking-wide">
                      {f.master_code}
                    </span>
                    <span className="text-[10px] font-mono text-[#888] uppercase tracking-widest bg-white/5 px-2 py-0.5 border border-white/10">
                      pH {f.ph_level?.split(' ')[0] || '12.5'}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-white mb-2">
                    {f.original_name}
                  </h3>

                  <p className="text-xs text-[#AAA] font-normal leading-relaxed mb-4">
                    {f.technical_description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#222] font-mono text-[11px] text-[#777]">
                    <div className="flex justify-between">
                      <span>Dilution:</span>
                      <span className="text-[#CCC]">{f.dilution_standard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hot Water Synergy:</span>
                      <span className="text-emerald-400">Up to 95°C Stable</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#222] flex items-center justify-between">
                  <Link
                    href={`/chemicals/applications/${f.primary_industry_slug || 'trucks-hgv'}`}
                    className="text-xs font-mono uppercase tracking-wider text-[#999] hover:text-white transition-colors"
                  >
                    Technical Specs →
                  </Link>
                  <Link
                    href="/parts-attachments/chemicals"
                    className="text-xs font-mono uppercase tracking-wider text-alkota-orange hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Shop Retail Pack</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03: INDUSTRIAL APPLICATIONS & SECTOR INTEGRATION ─────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block mb-3">
                // Industry Chemistry Integration
              </span>
              <h2 className="font-extralight text-alkota-black tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
                Engineered for Every Commercial Sector.
              </h2>
            </div>
            <Link
              href="/chemicals/applications"
              className="font-ibm-plex-mono text-[11px] uppercase tracking-widest text-[#888] hover:text-alkota-orange transition-colors flex items-center gap-1.5"
            >
              <span>Explore All {applications.length} Sectors</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#E0DEDC]">
            {applications.map((app, idx) => (
              <div
                key={app.slug}
                className="group py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:pl-2 transition-all"
              >
                <div className="flex items-baseline gap-6 lg:w-5/12 min-w-0">
                  <span className="font-ibm-plex-mono text-[10px] text-[#BBB] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-2xl font-light text-alkota-black group-hover:text-alkota-orange transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666] font-normal mt-1 leading-relaxed">
                      {app.tagline}
                    </p>
                  </div>
                </div>

                <div className="lg:w-6/12 flex items-center justify-between gap-4 lg:pl-8">
                  <p className="hidden sm:block text-xs font-light text-[#888] line-clamp-1 max-w-md">
                    {app.description}
                  </p>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/chemicals/applications/${app.slug}`}
                      className="font-ibm-plex-mono text-xs uppercase tracking-widest text-[#666] hover:text-alkota-orange transition-colors"
                    >
                      Technical Overview
                    </Link>
                    <Link
                      href={`/parts-attachments/chemicals?app=${app.slug}`}
                      className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-black flex items-center gap-1 font-medium"
                    >
                      <span>Shop Range</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04: ENGINEERING VALUE: THERMAL SAPONIFICATION & COIL CARE ────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#F2EFEB] border-b border-[#E0DEDC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-[#E0DEDC] space-y-4">
              <div className="h-10 w-10 bg-alkota-orange/10 flex items-center justify-center text-alkota-orange">
                <FlaskConical className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-normal text-alkota-black">
                Hot Water Saponification
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
                Alkota chemistry contains surfactant packages formulated to accelerate chemical reaction rates as temperature climbs to 95°C, turning bonded grease into soluble emulsion.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E0DEDC] space-y-4">
              <div className="h-10 w-10 bg-alkota-orange/10 flex items-center justify-center text-alkota-orange">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-normal text-alkota-black">
                Schedule 80 Coil Protection
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
                Built-in water softening sequestrants bind free calcium and magnesium ions before water enters the heating coil, preventing hard water scale build-up.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#E0DEDC] space-y-4">
              <div className="h-10 w-10 bg-alkota-orange/10 flex items-center justify-center text-alkota-orange">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-normal text-alkota-black">
                Wash Bay &amp; Interceptor Safe
              </h3>
              <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal">
                Quick-breaking surfactant formulations allow oil-water interceptors to quickly split emulsified hydrocarbon fractions for clean environmental discharge compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05: DEALER / BULK COMMERCIAL PURCHASING ──────────────────────────── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 bg-[#141412] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="font-ibm-plex-mono text-[9px] uppercase tracking-[0.2em] text-alkota-orange block">
                // Commercial &amp; Dealer Accounts
              </span>
              <h2 className="font-extralight text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Commercial Bulk &amp; Dealer Supply.
              </h2>
              <p className="text-[#AAA] text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                Operating high-throughput haulage wash bays, plant hire depots, or agricultural dealerships? Alkota UK provides full commercial accounts for regular 200L drum deliveries, palletised 1000L IBC tanks, bespoke automated dosing manifolds, and dealer wholesale terms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="font-mono text-alkota-orange text-xs block mb-1">01 / Volume Pricing</span>
                  <span className="text-xs text-[#CCC]">Palletised IBC &amp; multi-drum scheduled delivery.</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="font-mono text-alkota-orange text-xs block mb-1">02 / Technical Sosing</span>
                  <span className="text-xs text-[#CCC]">Venturi &amp; peristaltic wash-plant integration.</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="font-mono text-alkota-orange text-xs block mb-1">03 / Dealer Supply</span>
                  <span className="text-xs text-[#CCC]">Authorised regional stockist distribution terms.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white text-alkota-black p-8 border border-[#E0DEDC] space-y-6">
              <h3 className="text-xl font-normal">
                Talk to Chemical Engineering
              </h3>
              <p className="text-xs text-[#666] leading-relaxed font-normal">
                Contact our chemical technical desk directly for commercial pricing, COSHH safety documentation, or bulk supply agreements.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact?type=chemical-bulk"
                  className="flex items-center justify-center gap-2 w-full bg-alkota-orange text-white py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-black transition-colors"
                >
                  <span>Request Bulk Commercial Quote</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/dealers/apply"
                  className="flex items-center justify-center gap-2 w-full border border-[#CCC] text-alkota-black py-3.5 font-mono text-xs uppercase tracking-widest hover:border-black transition-colors"
                >
                  <span>Apply for Dealer Account</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
