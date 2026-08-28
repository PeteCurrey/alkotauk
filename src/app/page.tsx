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
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://alkota.co.uk/#website',
        url: 'https://alkota.co.uk',
        name: 'Alkota UK',
        publisher: {
          '@id': 'https://alkota.co.uk/#organization',
        },
      },
    ],
  };

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#FFFFFF] text-alkota-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      {/* CHAPTER 01 — HERO */}
      <Hero />

      {/* CHAPTER 02 — BRAND & ENGINEERING STATEMENT */}
      <section className="py-20 sm:py-24 px-6 sm:px-12 bg-[#FFFFFF] border-b border-[#D8D8D6]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 border-l-4 border-alkota-orange pl-6">
              <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.3em] text-alkota-orange block mb-2">
                // ESTABLISHED 1964
              </span>
              <p className="font-barlow-condensed text-4xl sm:text-5xl font-black uppercase italic tracking-tight text-alkota-black leading-none">
                BUILT IN SOUTH DAKOTA.
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="font-inter text-base sm:text-xl text-[#444] leading-relaxed font-normal">
                Alkota does not manufacture light consumer pressure washers. For over 60 years, every machine has been handcrafted in Alcester, South Dakota, using heavy cold-rolled steel, industrial ceramic triplex pumps, and schedule 80 seamless heating coils. Engineered for organizations where cleaning failure halts production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — PRODUCT UNIVERSE (CURATION OVER INVENTORY) */}
      <ProductUniverse />

      {/* CHAPTER 04 — BUILT FOR YOUR WORLD (INDUSTRIES) */}
      <IndustryGrid />

      {/* CHAPTER 05 — MESS QUEST (THE ORIGINAL SERIES) */}
      <MessQuestFeature />

      {/* CHAPTER 06 — ENGINEERING CLOSE-UP & 7-YEAR WARRANTY */}
      <EngineeringTeardown />

      {/* CHAPTER 07 — HERITAGE & ANTARCTIC SCIENTIFIC DRILL */}
      <AntarcticStory />

      {/* CHAPTER 08 — BESPOKE BUILDS & CLOSED-LOOP WATER RECOVERY */}
      <BespokeAndWaterSection />

      {/* CHAPTER 09 — THE LOBBY KNOWLEDGE PLATFORM */}
      <LobbyIntroduction />

      {/* CHAPTER 10 — MACHINE MATCH (APPLICATION SELECTOR) */}
      <MachineMatchBanner />

      {/* CHAPTER 11 — OWNERSHIP & UK LIFECYCLE SUPPORT */}
      <OwnershipSection />

      {/* CHAPTER 12 — GLOBAL SITE FOOTER */}
      <Footer />
    </main>
  );
}
