import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import ChemicalCard from '@/components/chemicals/ChemicalCard';
import { 
  getRetailProducts, 
} from '@/lib/chemicals/service';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Professional Cleaning Chemistry | Alkota UK',
  description: 'Commercial vehicle traffic film removers (RoadForce), heavy plant degreasers (GreaseCut), aluminium brighteners (AlumaRestore), and coil descalers in 5L, 20L, 200L drums and 1000L IBCs.',
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

      {/* 01: HERO — FULL-BLEED CAMPAIGN */}
      <section 
        className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden"
        aria-label="Alkota UK Professional Cleaning Chemistry"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/industries/fleet.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 pb-20 pt-40">
          <div className="max-w-2xl space-y-8">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium block">
              Professional Cleaning Chemistry
            </span>
            <h1 
              className="font-extralight text-white tracking-tight uppercase leading-[0.88] select-none"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Made for<br />
              serious<br />
              <span className="text-white/50 font-light">cleaning.</span>
            </h1>
            <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-sm">
              Formulated to work faster with hot water pressure washing. Not domestic. Not diluted. Not generic.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <a
                href="#roadforce"
                className="inline-flex items-center gap-3 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
              >
                <span>See the Chemistry</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/chemicals/finder"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-ibm-plex-mono text-xs uppercase tracking-wider transition-colors py-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-alkota-orange" />
                <span>Match Tool</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 px-6 sm:px-12 lg:px-24 py-4 flex flex-wrap items-center gap-6 text-[10px] font-ibm-plex-mono text-white/40 uppercase tracking-wider">
          <span>GB-CLP Compliant</span>
          <span className="text-white/20">·</span>
          <span>Works at 50°C–90°C</span>
          <span className="text-white/20">·</span>
          <span>{allProducts.length} Formulations In Stock</span>
          <a href="#catalogue" className="text-white/40 hover:text-white transition-colors ml-auto">
            Full Catalogue ↓
          </a>
        </div>
      </section>

      {/* 02: ROADFORCE — FULL-WIDTH SPLIT, IMAGE LEFT */}
      <section id="roadforce" className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden order-2 lg:order-1">
          <img
            src="/assets/industries/fleet.png"
            alt="Commercial fleet vehicle being washed"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />
          <span className="absolute bottom-4 left-4 font-ibm-plex-mono text-[9px] uppercase tracking-widest text-white/40">TR-407</span>
        </div>
        <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-20 bg-[#F5F4EF] space-y-8 order-1 lg:order-2">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
              Traffic Film Remover
            </span>
            <h2 
              className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
            >
              RoadForce<br /><span className="text-[#666] font-light">Fleet TFR</span>
            </h2>
          </div>
          <p className="text-base text-[#1A1A1A] font-light leading-snug max-w-sm">
            Cuts through road film and diesel grime. One touchless pass — no etching on livery or polished aluminium.
          </p>
          <p className="text-sm text-[#666] font-normal leading-relaxed max-w-sm">
            Static road film, winter salt, and diesel soot release on contact. Works cold; accelerates at temperature. The standard for commercial fleet washdowns.
          </p>
          <div className="space-y-1">
            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#999] tracking-widest block">Available in</span>
            <div className="flex flex-wrap gap-2">
              {['5 L', '20 L', '200 L', '1000 L'].map(s => (
                <span key={s} className="font-ibm-plex-mono text-[10px] text-[#444] px-2.5 py-1 border border-[#DCDAD4]">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-[#E0DED8]">
            <div>
              <span className="font-ibm-plex-mono text-[9px] uppercase text-[#999] block">From</span>
              <span className="font-ibm-plex-mono text-3xl text-alkota-black font-light">£38.50 <span className="text-[10px] text-[#777]">ex VAT</span></span>
            </div>
            <Link
              href="/chemicals/product/roadforce-fleet-heavy-tfr"
              className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 03: GREASECUT — DARK CANVAS LEFT, PHOTOGRAPH RIGHT */}
      <section className="w-full flex flex-col lg:flex-row min-h-[70vh] overflow-hidden">
        <div className="flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-24 bg-[#111110] text-white lg:w-1/2 space-y-8">
          <div className="space-y-3">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium block">
              Plant Degreaser · DE-703
            </span>
            <h2 
              className="font-extralight text-white tracking-tight uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
            >
              GreaseCut<br /><span className="text-white/40 font-light">Workshop</span>
            </h2>
          </div>
          <p className="text-base text-white/80 font-light leading-snug max-w-sm">
            Dissolves baked oil and chassis grease on contact.
          </p>
          <p className="text-sm text-white/50 font-normal leading-relaxed max-w-sm">
            Accelerates under 50°C–90°C hot water washing to saponify heavy petroleum oils and hydraulic grease into clean rinse water.
          </p>
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <span className="font-ibm-plex-mono text-2xl text-white font-light">
              From £42.00 <span className="text-[10px] text-white/40">ex VAT</span>
            </span>
            <Link
              href="/chemicals/product/greasecut-workshop-degreaser"
              className="inline-flex items-center gap-2 bg-white hover:bg-alkota-orange text-alkota-black hover:text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="relative lg:w-1/2 min-h-[50vh] lg:min-h-0 overflow-hidden">
          <img
            src="/assets/parts/parts-hero-workshop.jpg"
            alt="Workshop degreasing heavy plant machinery"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </section>

      {/* 04: ALUMARESTORE — OFF-WHITE, EDITORIAL LAYOUT WITH INLINE IMAGE */}
      <section className="w-full py-28 px-6 sm:px-12 lg:px-24 bg-white border-y border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-1 hidden lg:block">
              <span 
                className="font-ibm-plex-mono font-light text-[#EBEBEB] select-none leading-none"
                style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
              >03</span>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
                  Aluminium Brightener · TS-602
                </span>
                <h2 
                  className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
                >
                  AlumaRestore<br /><span className="text-[#999] font-light">Acid Brightener</span>
                </h2>
              </div>
              <p className="text-base text-[#1A1A1A] font-light leading-snug max-w-lg">
                Restores weathered aluminium to satin brilliance.
              </p>
              <p className="text-sm text-[#666] leading-relaxed max-w-lg">
                Phosphoric and organic acid deoxidiser that strips grey chalking and heavy oxidation from fuel tanks, wheels, and tipper bodies in under two minutes. Safe on painted surfaces. Rinses clean.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['5 L', '20 L', '200 L', '1000 L'].map(s => (
                  <span key={s} className="font-ibm-plex-mono text-[10px] text-[#444] px-2.5 py-1 border border-[#DCDAD4]">{s}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/hot-water-gauge-hero.jpg"
                  alt="Hot water pressure washer gauge detail"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-ibm-plex-mono text-2xl text-alkota-black font-light">
                  From £46.00 <span className="text-[10px] text-[#777]">ex VAT</span>
                </span>
                <Link
                  href="/chemicals/product/alumarestore-aluminium-acid-brightener"
                  className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-black hover:text-alkota-orange transition-colors font-medium"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5 text-alkota-orange" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05: SCALEGUARD — WARM STONE */}
      <section className="w-full py-28 px-6 sm:px-12 lg:px-24 bg-[#F2F0E8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-[#888] font-medium block">
                Coil Protector · SD-927
              </span>
              <h2 
                className="font-extralight text-[#0A0A0A] tracking-tight uppercase leading-[0.92]"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
              >
                ScaleGuard<br /><span className="text-[#999] font-light">Coil Protector</span>
              </h2>
              <p className="text-base text-[#1A1A1A] font-light leading-snug max-w-sm">
                Binds hard water minerals before they block your coil.
              </p>
              <p className="text-sm text-[#666] leading-relaxed max-w-sm">
                Essential preventative for hot water pressure washers. Prevents scale choke points and keeps your 7-year boiler warranty intact. Available in 5L through to 200L drum.
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-[#DCDAD4]">
                <span className="font-ibm-plex-mono text-2xl text-alkota-black font-light">
                  From £34.00 <span className="text-[10px] text-[#777]">ex VAT</span>
                </span>
                <Link
                  href="/chemicals/product/scaleguard-coil-protector"
                  className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/assets/engineered-continuous-duty.jpg"
                alt="Alkota pressure washer heating coil"
                className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 06: COMPLETE PRODUCT DIRECTORY */}
      <section id="catalogue" className="py-24 px-6 sm:px-12 lg:px-24 bg-white border-t border-[#E8E8E4]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E8E8E4]">
            <div className="space-y-1">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-[#888] font-medium block">
                Complete Range
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight text-[#0A0A0A] tracking-tight uppercase">
                All Formulations.
              </h2>
            </div>
            <span className="text-xs font-ibm-plex-mono text-[#999]">
              {filteredProducts.length} commercial chemical formulations
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
