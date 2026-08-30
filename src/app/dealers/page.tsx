import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  ShieldCheck,
  Wrench,
  Flame,
  Droplets,
  Truck,
  ArrowRight,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Search,
  Building2,
  Users,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import canonicalDealers from '../../../scripts/data/dealers-canonical-seed.json';

export const metadata = {
  title: 'UK Authorised Dealer & Service Network | Alkota UK',
  description:
    'Local expertise backed by six decades of industrial pressure washing engineering. Locate your regional Alkota sales, on-site demonstration, service, parts, and chemical specialist.',
};

export default function DealersLandingPage() {
  const featuredDealers = canonicalDealers.slice(0, 4);

  return (
    <main className="bg-[#FAF9F5] text-alkota-black">

      {/* ── CHAPTER 01: FULL-SCREEN HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-between bg-[#0A0A0A] text-white px-6 sm:px-12 lg:px-24 pt-32 pb-16 overflow-hidden border-b border-[#222]">
        {/* Background Image / Texture */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="/assets/hot-water-gauge-hero.jpg"
            alt="Alkota Authorised UK Dealer Network"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60" />
        </div>

        {/* Hero Top Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 bg-alkota-orange rounded-full animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#AAA]">
              Authorised Regional Distribution &amp; Mobile Engineering
            </span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.02] max-w-5xl mb-8">
            Local expertise.{' '}
            <span className="text-alkota-orange font-normal italic">
              Backed by Alkota.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#BBB] font-light leading-relaxed max-w-3xl mb-12">
            Every Alkota machine in the United Kingdom is supported by accredited regional partners — factory-trained engineers, dedicated on-site demonstration vans, genuine OEM spares inventory, and verified local chemical supply.
          </p>

          {/* Dominant Primary Action + Secondary Text Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
            <Link
              href="/dealers/find"
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-4 font-mono text-xs uppercase tracking-widest transition-all shadow-xl font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Find Your Regional Dealer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-6 text-xs font-mono tracking-wider">
              <Link
                href="/dealers/demo-request"
                className="text-white hover:text-alkota-orange transition-colors uppercase underline underline-offset-4 decoration-alkota-orange/40 font-normal"
              >
                Book On-Site Demo →
              </Link>
              <span className="text-white/30">|</span>
              <Link
                href="/dealers/apply"
                className="text-[#AAA] hover:text-white transition-colors uppercase font-normal"
              >
                Become an Approved Dealer →
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Metric Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              National Reach
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              Full UK Territory
            </span>
          </div>

          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Mobile Service
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              18+ Fleet Vans
            </span>
          </div>

          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Live Demonstrations
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              On-Site &amp; Test Bay
            </span>
          </div>

          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#777] block mb-1">
              Parts &amp; Chemistry
            </span>
            <span className="text-xl sm:text-2xl font-extralight text-white">
              100% Genuine OEM
            </span>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02: CAPABILITY PHILOSOPHY (EDITORIAL COLUMNS) ── */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto bg-[#FAF9F5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-3 font-medium">
              Technical Verification Standard
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight leading-tight">
              Finding the right expert, not just the nearest pin.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-base text-[#555] font-normal leading-relaxed mb-6">
              When specifying high-pressure cleaning infrastructure, your requirement may demand a mobile hot-water demonstration, a specialist pump rebuild workshop, custom trailer integration, or closed-loop wash bay compliance.
            </p>
            <p className="text-sm text-[#777] font-normal leading-relaxed">
              We structure the Alkota Dealer Network around <strong>verified technical capabilities</strong>. Our routing engine matches your exact application, machinery choice, and postcode to the approved partner with the right tooling and accreditation.
            </p>
          </div>
        </div>

        {/* Unboxed Editorial Capability Index */}
        <div className="border-t border-[#1A1A18] divide-y divide-[#EAE9E2]">
          {[
            { num: '01', title: 'MACHINE SALES & SPECIFICATION', desc: 'Hot Water, Cold Water & Steam selection guided by factory-trained application engineers.' },
            { num: '02', title: 'LIVE ON-SITE DEMONSTRATIONS', desc: 'Mobile demonstration vans bringing machines to your yard, testing against your real contamination.' },
            { num: '03', title: 'PPM & EMERGENCY BREAKDOWN REPAIRS', desc: 'Scheduled maintenance, pressure relief testing, burner flue gas analysis, and mobile rapid response.' },
            { num: '04', title: 'PUMP OVERHAUL & BENCH REBUILD', desc: 'Complete workshop overhaul for General Pump, CAT, and Comet triplex ceramic plunger units.' },
            { num: '05', title: 'BESPOKE TRAILERS & WASHDOWN RIGS', desc: 'Engineering road-towable mobile cleaning trailers with integrated water tanks and power generation.' },
            { num: '06', title: 'WATER TREATMENT & EA EFFLUENT COMPLIANCE', desc: 'Closed-loop water recycling, oil interceptors, and Environment Agency trade effluent guidance.' },
          ].map((item) => (
            <div key={item.num} className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-8 group">
              <div className="flex items-baseline gap-4 sm:w-1/3">
                <span className="font-mono text-xs text-alkota-orange font-medium">
                  {item.num}
                </span>
                <h3 className="font-medium text-xs sm:text-sm uppercase tracking-wider text-alkota-black">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#666] font-normal sm:w-2/3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHAPTER 03: FAST DEALER FINDER SEARCH EXPERIENCE ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 bg-white border-y border-[#E8E7E0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <span className="font-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2 font-medium">
              Direct Postcode Lookup
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight mb-4">
              Find Your Regional Alkota Specialist
            </h2>
            <p className="text-base text-[#666] leading-relaxed font-normal">
              Enter your postcode or town to locate approved dealers, check mobile service van coverage, and view on-site demonstration facilities.
            </p>
          </div>

          <form
            action="/dealers/find"
            method="GET"
            className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
          >
            <div className="sm:col-span-6 relative">
              <input
                type="text"
                name="postcode"
                placeholder="Enter Postcode (e.g. S42, M17, B1, EH1) or Town..."
                className="w-full border border-[#DDD] pl-11 pr-4 py-4 text-sm text-alkota-black focus:border-alkota-orange focus:outline-none uppercase bg-[#FAF9F5]"
              />
              <MapPin className="w-5 h-5 text-alkota-orange absolute left-3.5 top-4" />
            </div>

            <div className="sm:col-span-3">
              <select
                name="capability"
                className="w-full border border-[#DDD] px-4 py-4 text-xs text-alkota-black focus:border-alkota-orange focus:outline-none bg-[#FAF9F5]"
              >
                <option value="all">All Capabilities</option>
                <option value="machine-sales">Machine Sales &amp; Advice</option>
                <option value="on-site-demo">On-Site Demonstration</option>
                <option value="service-maintenance">Service &amp; Breakdown Repair</option>
                <option value="parts-accessories">Genuine Parts Stockist</option>
                <option value="chemicals">Hydrus Chemical Supply</option>
                <option value="trailer-systems">Bespoke Trailer Systems</option>
                <option value="water-recovery">Water Treatment &amp; Recovery</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white px-6 py-4 font-mono text-xs uppercase tracking-widest transition-colors shadow-sm font-medium"
              >
                <span>Search Network</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>


      {/* ── CHAPTER 04: NETWORK SHOWCASE — FEATURED REGIONAL HUBS ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
              // Accredited Network
            </span>
            <h2 className="font-extralight text-3xl sm:text-4xl lg:text-5xl text-alkota-black tracking-tight">
              Featured Regional Hubs
            </h2>
          </div>
          <Link
            href="/dealers/find"
            className="inline-flex items-center gap-2 font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange hover:text-black transition-colors"
          >
            View All Regional Centres ({canonicalDealers.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white border border-[#E8E8E4] p-8 flex flex-col justify-between hover:border-alkota-orange hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange bg-orange-50 px-2.5 py-1 border border-orange-200 inline-block mb-2">
                      {dealer.tier.replace('_', ' ')}
                    </span>
                    <h3 className="font-medium text-xl text-alkota-black tracking-tight">
                      {dealer.name}
                    </h3>
                    <p className="text-xs text-[#777] mt-0.5">
                      {dealer.town}, {dealer.county} ({dealer.postcode})
                    </p>
                  </div>

                  <span className="font-ibm-plex-mono text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200 shrink-0">
                    ★ {dealer.rating}
                  </span>
                </div>

                <p className="text-xs text-[#555] leading-relaxed mb-6">
                  {dealer.short_description}
                </p>

                {/* Territories covered */}
                <div className="mb-6">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#888] block mb-2">
                    Primary Territory Outcodes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dealer.territories.slice(0, 5).map((t) => (
                      <span
                        key={t.postcode_prefix}
                        className="font-ibm-plex-mono text-[10px] bg-[#FAF9F5] border border-[#DDD] px-2 py-0.5 text-[#555]"
                      >
                        {t.postcode_prefix} ({t.county_name?.split('/')[0].trim()})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Capabilities */}
                <div className="border-t border-[#F0EFEB] pt-4 mb-6">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-black block mb-2.5">
                    Approved Capabilities:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#555]">
                    {dealer.services.slice(0, 4).map((s) => (
                      <div key={s.service_key} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-alkota-orange shrink-0" />
                        <span className="truncate">{s.service_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E8E8E4] pt-4 flex items-center justify-between gap-4">
                <Link
                  href={`/dealers/${dealer.slug}`}
                  className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-black hover:text-alkota-orange transition-colors font-medium"
                >
                  View Full Hub Profile →
                </Link>

                <Link
                  href={`/dealers/demo-request?dealer=${dealer.slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#FAF9F5] hover:bg-alkota-black hover:text-white text-alkota-black border border-[#DDD] px-4 py-2 font-ibm-plex-mono text-[11px] uppercase tracking-wider transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-alkota-orange" />
                  Book Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── CHAPTER 05: DARK SECTION — MAJOR PROJECT & BESPOKE ROUTING ── */}
      <section className="bg-[#0A0A0A] text-white py-24 px-6 sm:px-12 lg:px-24 border-y border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333] inline-block mb-4">
                Major Projects &amp; National Fleets
              </span>

              <h2 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
                Specialist engineering routed with precision.
              </h2>

              <p className="text-base text-[#AAA] font-normal leading-relaxed mb-6">
                A £150k custom road-tow trailer system, an automated railway wash plant, or a multi-site contract across 25 logistics depots requires national project engineering — not just local van dispatch.
              </p>
              <p className="text-sm text-[#777] font-normal leading-relaxed mb-8">
                Our dual-tier routing automatically partners your local Alkota dealer with our central UK engineering team to deliver full turnkey design, utilities scoping, commissioning, and SLA management.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/bespoke"
                  className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all"
                >
                  Explore Bespoke Engineering
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/wash-plant"
                  className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-all"
                >
                  Wash Plant Infrastructure
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#141414] border border-[#222] p-8 space-y-4">
              <h3 className="font-ibm-plex-mono text-xs uppercase tracking-widest text-alkota-orange mb-4">
                Project Routing Triggers:
              </h3>
              {[
                { title: 'Turnkey Wash Bay Build', desc: 'Civil works, drainage interceptors, and fixed gantries' },
                { title: 'Custom Trailer Skids', desc: 'Engineered twin-operator hot water mobile rigs' },
                { title: 'Water Recycling Plant', desc: 'Hydrocarbon separation & closed-loop filtration' },
                { title: 'Multi-Site National Accounts', desc: 'Consolidated SLA & centralised fleet ledger' },
              ].map((proj, idx) => (
                <div key={idx} className="border-b border-[#222] pb-3 last:border-b-0">
                  <h4 className="text-xs font-medium text-white mb-0.5">{proj.title}</h4>
                  <p className="text-[11px] text-[#777] leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── CHAPTER 06: BECOME AN ALKOTA DEALER CALLOUT ── */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="bg-white border border-[#E8E8E4] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // Territory Expansion
              </span>
              <h2 className="font-extralight text-3xl sm:text-4xl text-alkota-black tracking-tight leading-tight mb-4">
                Join the Alkota UK Authorised Network
              </h2>
              <p className="text-sm text-[#555] leading-relaxed mb-4">
                Are you an established industrial cleaning equipment distributor or regional service engineering centre? We are actively expanding accredited territories across England, Scotland, and Wales.
              </p>
              <ul className="text-xs text-[#555] space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Exclusive regional territory protection and direct factory leads.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Comprehensive technical training, wiring diagrams, and parts discounts.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Demonstration machine floorplans and marketing collateral support.</span>
                </li>
              </ul>

              <Link
                href="/dealers/apply"
                className="inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm font-medium"
              >
                Apply for Dealership Accreditation
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F5] border border-[#E8E8E4] p-6 text-center">
              <Building2 className="w-10 h-10 text-alkota-orange mx-auto mb-3" />
              <h4 className="font-medium text-sm text-alkota-black mb-1">
                Existing Dealer Portal Login
              </h4>
              <p className="text-xs text-[#666] mb-6">
                Access your dealer dashboard, pricing sheets, technical bulletins, and assigned customer leads.
              </p>
              <Link
                href="/dealer"
                className="inline-flex items-center gap-2 border border-[#CCC] hover:border-black text-alkota-black px-6 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Access Dealer Portal →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
