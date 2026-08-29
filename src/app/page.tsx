import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/homepage/BrandStatement";
import HeroMachineReveal from "@/components/homepage/HeroMachineReveal";
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
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#F8F7F4] text-alkota-black font-normal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* ── 01: FULL-SCREEN CINEMATIC HERO ──────────────────────────── */}
      <Hero />

      {/* ── 02: QUIET BRAND STATEMENT ────────────────────────────────── */}
      <BrandStatement />

      {/* ── 03: ONE HERO MACHINE (GALLERY REVEAL) ────────────────────── */}
      <HeroMachineReveal />

      {/* ── 04: PRODUCT UNIVERSE (INTERACTIVE PANORAMIC SELECTOR) ────── */}
      <ProductUniverse />

      {/* ── 05: REAL WORLD (IMMERSIVE INDUSTRY APPLICATIONS) ─────────── */}
      <IndustryGrid />

      {/* ── 06: MESS QUEST (DOCUMENTARY FILM CHAPTER) ────────────────── */}
      <MessQuestFeature />

      {/* ── 07: ENGINEERING DETAIL (MACRO ASYMMETRIC STORYTELLING) ───── */}
      <EngineeringTeardown />

      {/* ── 08: HERITAGE & ANTARCTIC EXPLORATION ─────────────────────── */}
      <AntarcticStory />

      {/* ── 09: BESPOKE MOBILE PLANTS & WATER TREATMENT ──────────────── */}
      <BespokeAndWaterSection />

      {/* ── 10: THE LOBBY (EMBEDDED JOURNAL) ─────────────────────────── */}
      <LobbyIntroduction />

      {/* ── 11: MACHINE MATCH UTILITY ────────────────────────────────── */}
      <MachineMatchBanner />

      {/* ── 12: OWNERSHIP & UK LIFECYCLE ─────────────────────────────── */}
      <OwnershipSection />

      {/* ── 13: FINAL BRAND SIGNATURE ────────────────────────────────── */}
      <section className="relative bg-[#0C0C0A] overflow-hidden py-24 sm:py-32 px-6 sm:px-12 text-white font-normal">
        {/* Subtle background wordmark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-extralight uppercase text-white/[0.02] whitespace-nowrap"
            style={{ fontSize: 'clamp(8rem, 22vw, 20rem)' }}
          >
            ALKOTA
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center font-normal">
          <span className="text-[11px] uppercase tracking-[0.3em] text-alkota-orange block mb-6 font-light">
            Est. 1964 · Alcester, South Dakota · UK Direct
          </span>
          <h2
            className="font-extralight uppercase tracking-tight text-white leading-none mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Engineered for Continuous Duty.<br />
            <span className="text-alkota-orange">Backed by 60 Years of Build.</span>
          </h2>
          <p className="text-[#aaa] leading-relaxed mb-12 font-normal text-base sm:text-lg max-w-xl mx-auto">
            Specify your industrial cleaning setup with confidence. Connect directly with Alkota technical specialists for advice, on-site demonstrations, or custom rig design.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-normal">
            <Link
              href="/machines"
              className="inline-flex items-center gap-3 bg-alkota-orange text-white px-9 py-4 text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all no-underline group shadow-xl font-normal"
            >
              <span>Explore Machine Fleet</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/30 bg-black/40 text-white px-8 py-4 text-xs uppercase tracking-[0.2em] hover:border-white hover:bg-white hover:text-black transition-colors no-underline font-normal"
            >
              <span>Contact Alkota UK</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GLOBAL CORPORATE FOOTER ──────────────────────────────────── */}
      <Footer />
    </main>
  );
}
