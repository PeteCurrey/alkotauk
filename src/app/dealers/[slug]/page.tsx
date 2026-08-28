import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getDealerBySlug, getDealers } from '@/lib/dealers';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Calendar,
  Flame,
  Droplets,
  Wind,
  Layers,
  ArrowRight,
  ExternalLink,
  Wrench,
  Sparkles,
} from 'lucide-react';

interface DealerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const dealers = await getDealers({ onlyActive: false });
  return dealers.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DealerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dealer = await getDealerBySlug(slug);
  if (!dealer) return {};

  return {
    title: `${dealer.name} | Authorised Alkota Dealer & Service Centre`,
    description: `${dealer.name} is an authorised Alkota sales, service and demonstration partner in ${dealer.town}, ${dealer.county}. Contact for machine sales, on-site demos and servicing.`,
    alternates: {
      canonical: `https://alkota.co.uk/dealers/${dealer.slug}`,
    },
  };
}

export default async function DealerProfilePage({ params }: DealerPageProps) {
  const { slug } = await params;
  const dealer = await getDealerBySlug(slug);

  if (!dealer) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: dealer.name,
    description: dealer.description || dealer.short_description,
    telephone: dealer.phone,
    email: dealer.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dealer.address_line1,
      addressLocality: dealer.town,
      addressRegion: dealer.county,
      postalCode: dealer.postcode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: dealer.latitude,
      longitude: dealer.longitude,
    },
    url: `https://alkota.co.uk/dealers/${dealer.slug}`,
  };

  return (
    <main className="min-h-screen bg-[#F8F8F7] text-alkota-black flex flex-col justify-between pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <div className="mx-auto max-w-7xl px-6 sm:px-12 w-full pb-24">
        <Breadcrumbs
          items={[
            { label: 'Dealers', href: '/dealers' },
            { label: dealer.town },
            { label: dealer.name },
          ]}
        />

        {/* Dealer Hero Header */}
        <section className="mt-8 mb-16 bg-white border border-[#D5D5D3] p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-alkota-orange bg-alkota-orange/10 px-3 py-1 border border-alkota-orange/20">
                  {dealer.tier === 'national_hub' ? 'NATIONAL TECHNICAL CENTER' : 'AUTHORISED DEALER'}
                </span>
                <span className="font-ibm-plex-mono text-[10px] text-[#777]">
                  Coverage: {dealer.county} & Regional Territory
                </span>
              </div>

              <h1 className="font-barlow-condensed text-5xl sm:text-7xl font-black uppercase italic tracking-tight text-alkota-black leading-[0.88] mb-6">
                {dealer.name}
              </h1>

              <p className="font-inter text-base sm:text-lg text-[#555] leading-relaxed mb-8 max-w-3xl">
                {dealer.description || dealer.short_description}
              </p>

              {/* Contact Pill Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-ibm-plex-mono text-xs border-t border-[#EAEAEA] pt-6 mb-8">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-alkota-orange shrink-0" />
                  <div>
                    <span className="text-[#888] block text-[9px]">DIRECT TELEPHONE</span>
                    <a
                      href={`tel:${dealer.phone.replace(/\s+/g, '')}`}
                      className="font-bold text-alkota-black hover:text-alkota-orange"
                    >
                      {dealer.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-alkota-orange shrink-0" />
                  <div>
                    <span className="text-[#888] block text-[9px]">DIRECT EMAIL</span>
                    <a
                      href={`mailto:${dealer.email}`}
                      className="font-bold text-alkota-black hover:text-alkota-orange"
                    >
                      {dealer.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-alkota-orange shrink-0" />
                  <div>
                    <span className="text-[#888] block text-[9px]">SERVICE BASE</span>
                    <span className="text-alkota-black">
                      {dealer.address_line1}, {dealer.town} {dealer.postcode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-alkota-orange shrink-0" />
                  <div>
                    <span className="text-[#888] block text-[9px]">OPERATING HOURS</span>
                    <span className="text-alkota-black">
                      {dealer.opening_hours?.mon_fri || '08:00 - 17:30'} (Mon-Fri)
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/dealers/demo-request?dealer=${dealer.slug}`}
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors no-underline"
                >
                  <span>Book On-Site Demonstration</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/contact?dealer=${dealer.slug}`}
                  className="inline-flex items-center gap-2 border border-alkota-black bg-white text-alkota-black px-6 py-4 font-ibm-plex-mono text-xs font-bold uppercase tracking-widest hover:border-alkota-orange hover:text-alkota-orange transition-colors no-underline"
                >
                  <span>Direct Technical Enquiry</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Facility & Fleet Snapshot */}
            <div className="lg:col-span-4 bg-[#F8F8F7] border border-[#D5D5D3] p-8">
              <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-[#777] block mb-4">
                // OPERATIONAL METRICS
              </span>

              <div className="space-y-4 font-ibm-plex-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <span className="text-[#666]">Mobile Service Vans</span>
                  <span className="font-bold text-alkota-black">{dealer.mobile_service_vans} Fleet Units</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <span className="text-[#666]">Demonstration Bay</span>
                  <span className="font-bold text-alkota-orange">Available On-Site</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <span className="text-[#666]">Emergency Callout</span>
                  <span className="font-bold text-alkota-black">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Stockist Rating</span>
                  <span className="font-bold text-alkota-black">{dealer.rating} / 5.00</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2-Column Section: Capabilities & Territories Covered */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Services & Product Families */}
          <div className="lg:col-span-8 space-y-8">
            {/* Services Grid */}
            <div className="bg-white border border-[#D5D5D3] p-8 sm:p-10">
              <h2 className="font-barlow-condensed text-3xl font-black uppercase italic tracking-tight text-alkota-black mb-6 border-b border-[#EAEAEA] pb-4">
                AUTHORISED CAPABILITIES
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dealer.services?.map((svc) => (
                  <div key={svc.service_key} className="flex items-start gap-3 p-3 bg-[#F8F8F7]">
                    <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0 mt-0.5" />
                    <div>
                      <p className="font-barlow-condensed text-lg font-bold uppercase text-alkota-black">
                        {svc.service_name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Specialisms */}
            <div className="bg-white border border-[#D5D5D3] p-8 sm:p-10">
              <h2 className="font-barlow-condensed text-3xl font-black uppercase italic tracking-tight text-alkota-black mb-6 border-b border-[#EAEAEA] pb-4">
                SUPPORTED EQUIPMENT FAMILIES
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-ibm-plex-mono text-xs">
                {dealer.product_categories?.map((cat) => (
                  <Link
                    key={cat}
                    href={`/machines/${cat}`}
                    className="p-4 border border-[#EAEAEA] bg-[#F8F8F7] hover:border-alkota-orange hover:bg-white transition-colors block text-center"
                  >
                    <span className="font-bold text-alkota-black uppercase block">
                      {cat.replace('-', ' ')}
                    </span>
                    <span className="text-[9px] text-[#777] uppercase mt-1 block">
                      Browse Fleet →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Territory Postcodes Covered */}
          <div className="lg:col-span-4 bg-white border border-[#D5D5D3] p-8 sm:p-10">
            <h2 className="font-barlow-condensed text-3xl font-black uppercase italic tracking-tight text-alkota-black mb-6 border-b border-[#EAEAEA] pb-4">
              POSTCODES COVERED
            </h2>

            <p className="font-inter text-xs text-[#666] leading-relaxed mb-6">
              {dealer.name} holds primary sales and field-service authorization for the following UK postcode outward areas:
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {dealer.territories?.map((t) => (
                <div
                  key={t.postcode_prefix}
                  className="bg-[#F8F8F7] border border-[#D5D5D3] px-3 py-1.5 font-ibm-plex-mono text-xs"
                >
                  <strong className="text-alkota-orange">{t.postcode_prefix}</strong>
                  <span className="text-[#888] text-[9px] block">{t.county_name || t.region_name}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-alkota-black text-white font-ibm-plex-mono text-xs">
              <p className="text-alkota-orange font-bold mb-1">// OUTSIDE THIS REGION?</p>
              <p className="text-[#aaa] text-[11px]">
                Search our full national network or contact our central support desk.
              </p>
              <Link
                href="/dealers"
                className="mt-3 inline-block text-[10px] text-white underline uppercase tracking-widest hover:text-alkota-orange"
              >
                Find Other Dealers →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
