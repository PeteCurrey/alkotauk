import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductUniverse from "@/components/homepage/ProductUniverse";
import IndustryGrid from "@/components/IndustryGrid";
import MessQuestFeature from "@/components/homepage/MessQuestFeature";
import EngineeringHeritage from "@/components/homepage/EngineeringHeritage";
import BespokeAndLobby from "@/components/homepage/BespokeAndLobby";
import MachineMatchAndOwnership from "@/components/homepage/MachineMatchAndOwnership";
import Footer from "@/components/Footer";

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

      {/* ── 01: FULL-SCREEN IMMERSIVE HERO ──────────────────────────── */}
      <Hero />

      {/* ── 02: THE MACHINE / PRODUCT WORLD (GALLERY REVEAL) ─────────── */}
      <ProductUniverse />

      {/* ── 03: REAL-WORLD APPLICATIONS (IMMERSIVE SECTORS) ─────────── */}
      <IndustryGrid />

      {/* ── 04: MESS QUEST (CINEMATIC DOCUMENTARY CHAPTER) ───────────── */}
      <MessQuestFeature />

      {/* ── 05: ENGINEERING + HERITAGE (UNIFIED FLOWING STORY) ──────── */}
      <EngineeringHeritage />

      {/* ── 06: BESPOKE + KNOWLEDGE (THE LOBBY EDITORIAL) ───────────── */}
      <BespokeAndLobby />

      {/* ── 07: CONFIGURATOR / SUPPORT / FINAL BRAND SIGNATURE ──────── */}
      <MachineMatchAndOwnership />

      {/* ── GLOBAL CORPORATE FOOTER ─────────────────────────────────── */}
      <Footer />
    </main>
  );
}
