import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
  ArrowRight,
  ExternalLink,
  Wrench,
  Sparkles,
  Layers,
  Building2,
  FileText
} from 'lucide-react';
import canonicalDealers from '../../../../scripts/data/dealers-canonical-seed.json';

interface DealerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return canonicalDealers.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DealerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dealer = canonicalDealers.find((d) => d.slug === slug);
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
  const dealer = canonicalDealers.find((d) => d.slug === slug);

  if (!dealer) {
    notFound();
  }

  return (
    <main className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      {/* ── HERO ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/dealers" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Dealer Network
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <Link href="/dealers/find" className="text-xs font-ibm-plex-mono text-[#888] hover:text-alkota-orange">
              Find
            </Link>
            <span className="text-xs text-[#555]">/</span>
            <span className="text-xs font-ibm-plex-mono text-alkota-orange">{dealer.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange bg-[#1A1A1A] px-3 py-1 border border-[#333]">
              {dealer.tier.replace('_', ' ')}
            </span>
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 border border-emerald-800">
              ★ {dealer.rating} Customer Rating
            </span>
          </div>

          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight max-w-4xl mb-4">
            {dealer.name}
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-3xl mb-8">
            {dealer.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/dealers/demo-request?dealer=${dealer.slug}`}
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors shadow-sm font-medium"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Demonstration at this Hub
            </Link>

            <a
              href={`tel:${dealer.phone}`}
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors bg-[#141414]"
            >
              <Phone className="w-3.5 h-3.5 text-alkota-orange" />
              Call {dealer.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── PROFILE BODY ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details & Capabilities */}
          <div className="lg:col-span-8 space-y-12">
            {/* Approved Capabilities Grid */}
            <div className="bg-white border border-[#E8E8E4] p-8">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // Factory Accreditation
              </span>
              <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight mb-6">
                Approved Engineering Capabilities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dealer.services.map((s) => (
                  <div key={s.service_key} className="p-4 bg-[#FAF9F5] border border-[#E8E8E4] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-xs text-alkota-black mb-0.5">{s.service_name}</h4>
                      <p className="text-[11px] text-[#777]">Certified Alkota standard</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Territory Coverage */}
            <div className="bg-white border border-[#E8E8E4] p-8">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // Regional Responsibility
              </span>
              <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight mb-4">
                Territory Coverage &amp; Outcodes
              </h2>
              <p className="text-xs text-[#666] leading-relaxed mb-6">
                {dealer.name} operates primary commercial sales and service responsibility across the following regional postcode areas:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {dealer.territories.map((t) => (
                  <div key={t.postcode_prefix} className="p-3 bg-[#FAF9F5] border border-[#E8E8E4]">
                    <span className="font-mono text-sm font-bold text-alkota-orange block">
                      {t.postcode_prefix} Area
                    </span>
                    <span className="text-xs text-alkota-black font-medium block">
                      {t.county_name || t.region_name}
                    </span>
                    <span className="text-[10px] text-[#888] font-ibm-plex-mono">
                      {t.region_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Demonstration Fleet */}
            <div className="bg-white border border-[#E8E8E4] p-8">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // On-Site Test Capability
              </span>
              <h2 className="font-extralight text-2xl sm:text-3xl text-alkota-black tracking-tight mb-4">
                Featured Demonstration Systems
              </h2>
              <p className="text-xs text-[#666] leading-relaxed mb-6">
                This hub maintains dedicated demonstration models available for on-site trial at your facility:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4]">
                  <h4 className="font-medium text-sm text-alkota-black mb-1">
                    Alkota 430XH Hot Water Washer
                  </h4>
                  <p className="text-[#666] mb-3">
                    210 BAR @ 15 L/min with Schedule 80 ASTM A53 heating coil. Perfect for heavy plant degreasing.
                  </p>
                  <Link
                    href={`/dealers/demo-request?dealer=${dealer.slug}&model=430XH`}
                    className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange hover:underline"
                  >
                    Request Demo for 430XH →
                  </Link>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E8E8E4]">
                  <h4 className="font-medium text-sm text-alkota-black mb-1">
                    Alkota 5305A Cold Water Stationary
                  </h4>
                  <p className="text-[#666] mb-3">
                    High-volume 20 L/min wash bay unit with low-speed industrial triplex plunger pump.
                  </p>
                  <Link
                    href={`/dealers/demo-request?dealer=${dealer.slug}&model=5305A`}
                    className="font-ibm-plex-mono text-[10px] uppercase tracking-wider text-alkota-orange hover:underline"
                  >
                    Request Demo for 5305A →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact, Hours & Fast Enquiry Box */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="bg-white border border-[#E8E8E4] p-6 shadow-sm">
              <h3 className="font-medium text-base text-alkota-black mb-4">
                Hub Contact &amp; Operating Hours
              </h3>

              <div className="space-y-3 text-xs text-[#555] mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-alkota-orange shrink-0 mt-0.5" />
                  <span>
                    {dealer.address_line1}
                    {dealer.address_line2 ? `, ${dealer.address_line2}` : ''}
                    <br />
                    {dealer.town}, {dealer.county} {dealer.postcode}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-alkota-orange shrink-0" />
                  <a href={`tel:${dealer.phone}`} className="text-alkota-black font-medium hover:text-alkota-orange">
                    {dealer.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-alkota-orange shrink-0" />
                  <a href={`mailto:${dealer.email}`} className="text-alkota-black hover:text-alkota-orange truncate">
                    {dealer.email}
                  </a>
                </div>

                {dealer.website && (
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-alkota-orange shrink-0" />
                    <a href={dealer.website} target="_blank" rel="noopener noreferrer" className="text-alkota-black hover:underline truncate">
                      Visit Hub Website
                    </a>
                  </div>
                )}
              </div>

              <div className="border-t border-[#F0EFEB] pt-4 mb-6">
                <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#999] block mb-2">
                  Standard Opening Hours:
                </span>
                <div className="text-xs text-[#666] space-y-1">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="font-medium text-alkota-black">{dealer.opening_hours.mon_fri}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium text-alkota-black">{dealer.opening_hours.sat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium text-alkota-black">{dealer.opening_hours.sun}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href={`/dealers/demo-request?dealer=${dealer.slug}`}
                  className="w-full text-center block bg-alkota-orange hover:bg-black text-white py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors font-medium"
                >
                  Book On-Site Demo
                </Link>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${dealer.name}, ${dealer.postcode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block border border-[#DDD] hover:border-black text-alkota-black py-2.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Alkota Support Guarantee */}
            <div className="bg-[#FAF9F5] border border-[#E8E8E4] p-5 text-xs text-[#666]">
              <div className="flex items-center gap-2 mb-2 text-alkota-black font-medium">
                <ShieldCheck className="w-4 h-4 text-alkota-orange" />
                <span>Alkota National Guarantee</span>
              </div>
              <p className="leading-relaxed">
                All equipment purchased through {dealer.name} carries the official Alkota 7-Year Heating Coil Warranty and direct access to genuine South Dakota parts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
