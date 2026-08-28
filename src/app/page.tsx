import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductUniverse from "@/components/homepage/ProductUniverse";
import IndustryGrid from "@/components/IndustryGrid";
import MessQuestFeature from "@/components/homepage/MessQuestFeature";
import EngineeringTeardown from "@/components/homepage/EngineeringTeardown";
import AntarcticStory from "@/components/homepage/AntarcticStory";
import BespokeAndWaterSection from "@/components/homepage/BespokeAndWaterSection";
import LobbyIntroduction from "@/components/homepage/LobbyIntroduction";
import MachineMatchBanner from "@/components/homepage/MachineMatchBanner";
import OwnershipSection from "@/components/homepage/OwnershipSection";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Alkota UK — Industrial Pressure Washers, Steam Cleaners & Bespoke Wash Plants',
  description: 'American-engineered industrial cleaning equipment for UK industry. Hot water pressure washers with Schedule 80 coils and 7-year warranty. Bespoke wash plants, water recovery systems, and mobile rigs.',
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://alkota.co.uk/#organization',
        name: 'Alkota UK',
        url: 'https://alkota.co.uk',
        logo: 'https://alkota.co.uk/logo.png',
        description: 'Premium American-built industrial pressure washers, steam cleaners, aqueous parts washers, and bespoke wash plant systems in the UK.',
        telephone: '+44-7912-506738',
        email: 'sales@alkota.co.uk',
        address: { '@type': 'PostalAddress', addressCountry: 'GB' },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://alkota.co.uk/#website',
        url: 'https://alkota.co.uk',
        name: 'Alkota UK',
        publisher: { '@id': 'https://alkota.co.uk/#organization' },
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white text-alkota-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* ── 01: HERO ─────────────────────────────────────────────────── */}
      <Hero />

      {/* ── 02: BRAND INTRODUCTION ──────────────────────────────────── */}
      <section className="bg-white border-b border-[#E0E0DE]">
        <div className="flex flex-col lg:flex-row">
          {/* Left — quiet credentials */}
          <div className="w-full lg:w-[30%] bg-[#F5F4F0] px-8 sm:px-12 lg:px-14 py-14 flex flex-col justify-center border-r border-[#E0E0DE]">
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#999] block mb-6">
              Est. 1964
            </span>
            <div className="space-y-4 font-ibm-plex-mono text-xs text-alkota-black">
              <div className="border-b border-[#E0E0DE] pb-4">
                <span className="text-[#888] block text-[9px] uppercase mb-1">Origin</span>
                <span className="font-bold">Alcester, South Dakota, USA</span>
              </div>
              <div className="border-b border-[#E0E0DE] pb-4">
                <span className="text-[#888] block text-[9px] uppercase mb-1">UK Representation</span>
                <span className="font-bold">Alkota UK · Est. 2020</span>
              </div>
              <div className="border-b border-[#E0E0DE] pb-4">
                <span className="text-[#888] block text-[9px] uppercase mb-1">Machine Range</span>
                <span className="font-bold">Hot Water · Cold Water · Steam · Parts Washers · Trailers</span>
              </div>
              <div>
                <span className="text-[#888] block text-[9px] uppercase mb-1">Primary Protection</span>
                <span className="font-bold text-alkota-orange">7-Year Heating Coil Warranty</span>
              </div>
            </div>
          </div>

          {/* Right — editorial statement */}
          <div className="w-full lg:w-[70%] px-8 sm:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
            <p className="font-barlow-condensed font-black uppercase italic tracking-tight text-alkota-black leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
            >
              ALKOTA DOES NOT MANUFACTURE LIGHT CONSUMER PRESSURE WASHERS.
            </p>
            <p className="font-inter text-[#444] leading-relaxed mb-6 font-normal"
              style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', maxWidth: '60ch' }}
            >
              For over 60 years, every machine has been handcrafted in Alcester, South Dakota — from heavy cold-rolled steel, industrial ceramic triplex pumps, and Schedule 80 seamless heating coils. These machines are engineered for organisations where cleaning failure halts production.
            </p>
            <p className="font-inter text-[#666] leading-relaxed text-sm"
              style={{ maxWidth: '56ch' }}
            >
              When a brewery production line, a fleet transport depot, an offshore platform, or an abattoir needs to be cleaned completely and reliably — this is the equipment they specify.
            </p>
          </div>
        </div>
      </section>

      {/* ── 03: PRODUCT UNIVERSE ─────────────────────────────────────── */}
      <ProductUniverse />

      {/* ── 04: INDUSTRIES ───────────────────────────────────────────── */}
      <IndustryGrid />

      {/* ── 05: MESS QUEST ───────────────────────────────────────────── */}
      <MessQuestFeature />

      {/* ── 06: ENGINEERING ──────────────────────────────────────────── */}
      <EngineeringTeardown />

      {/* ── 07: HERITAGE / ANTARCTIC ─────────────────────────────────── */}
      <AntarcticStory />

      {/* ── 08: BESPOKE & WATER RECOVERY ─────────────────────────────── */}
      <BespokeAndWaterSection />

      {/* ── 09: THE LOBBY ────────────────────────────────────────────── */}
      <LobbyIntroduction />

      {/* ── 10: MACHINE MATCH ────────────────────────────────────────── */}
      <MachineMatchBanner />

      {/* ── 11: OWNERSHIP & UK SUPPORT ───────────────────────────────── */}
      <OwnershipSection />

      {/* ── 12: FINAL BRAND MOMENT ───────────────────────────────────── */}
      <section className="relative bg-[#0C0C0A] overflow-hidden py-24 sm:py-32 px-8 sm:px-12 lg:px-16">
        {/* Giant background wordmark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-barlow-condensed font-black uppercase italic text-white/[0.025] whitespace-nowrap"
            style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
          >
            ALKOTA
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-[0.4em] text-alkota-orange block mb-8">
            Since 1964 · Handcrafted in South Dakota
          </span>
          <h2 className="font-barlow-condensed font-black uppercase italic tracking-tight text-white leading-[0.88] mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            SERIOUS EQUIPMENT.<br />
            <span className="text-alkota-orange">SERIOUS WARRANTY.</span><br />
            SERIOUS SUPPORT.
          </h2>
          <p className="font-inter text-[#888] leading-relaxed mb-12 font-normal text-lg mx-auto"
            style={{ maxWidth: '48ch' }}
          >
            If you are specifying industrial cleaning equipment for a UK operation — you have found the right company.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/machines"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-10 py-5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group"
            >
              <span>Explore the Full Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[#444] text-white px-10 py-5 font-ibm-plex-mono text-xs font-bold uppercase tracking-[0.2em] hover:border-white transition-colors no-underline"
            >
              Contact Alkota UK
            </Link>
          </div>
        </div>
      </section>

      {/* ── 13: FOOTER ───────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
