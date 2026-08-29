import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronRight, CheckCircle2, Truck, Droplets, Zap, Shield, Recycle, Flame, Gauge, ArrowLeft } from 'lucide-react';
import { TRAILER_APPLICATIONS } from '@/lib/trailers/applications-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRAILER_APPLICATIONS.map(app => ({
    slug: app.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = TRAILER_APPLICATIONS.find(a => a.slug === slug);
  if (!app) return { title: 'Application Not Found | Alkota UK' };

  return {
    title: `${app.title} — Mobile Cleaning Systems | Alkota UK`,
    description: app.tagline,
    openGraph: {
      title: `${app.title} — Mobile Cleaning Systems | Alkota UK`,
      description: app.tagline,
      images: [app.heroImage]
    }
  };
}

export default async function TrailerApplicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const app = TRAILER_APPLICATIONS.find(a => a.slug === slug);

  if (!app) {
    notFound();
  }

  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* Hero (Cinematic Dark) */}
      <section className="relative min-h-[75vh] flex flex-col justify-end overflow-hidden bg-[#0A0A0A] text-white border-b border-alkota-iron pt-32 pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${app.heroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link
            href="/trailers/applications"
            className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#AAA] hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Trailer Applications
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              {app.industryCategory}
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-[0.95] tracking-tight mb-6 max-w-3xl">
            {app.heroHeadline}
          </h1>

          <p className="text-alkota-silver text-lg max-w-2xl leading-relaxed font-light mb-8">
            {app.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/trailers/configure${app.deepLinkQuery}`}
              className="inline-flex items-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build For This Application</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trailers"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              Explore All Trailers
            </Link>
          </div>
        </div>
      </section>

      {/* 01 & 02 The Operation & The Challenge (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="border border-[#E0E0DC] bg-white p-8 md:p-10 shadow-sm">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                01 // The Target Operation
              </span>
              <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-4">
                What Is Being Cleaned
              </h2>
              <p className="text-[#555] text-sm md:text-base leading-relaxed font-light">
                {app.theOperation}
              </p>
            </div>

            <div className="border border-[#E0E0DC] bg-white p-8 md:p-10 shadow-sm">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                02 // The Operational Challenge
              </span>
              <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-4">
                Site & Technical Constraints
              </h2>
              <p className="text-[#555] text-sm md:text-base leading-relaxed font-light">
                {app.theChallenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 The System Architecture (Warm Neutral) */}
      <section className="py-24 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              03 // System Engineering
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              THE RECOMMENDED TRAILER ARCHITECTURE.
            </h2>
            <p className="text-[#555] text-base leading-relaxed font-light">
              {app.theSystemArchitecture}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {app.keyEngineeringFactors.map((factor, idx) => (
              <div key={factor.title} className="border border-[#D5D5D0] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-ibm-plex-mono text-[9px] font-bold text-alkota-orange">
                    FACTOR 0{idx + 1}
                  </span>
                  <span
                    className={`font-ibm-plex-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border ${
                      factor.importance === 'critical'
                        ? 'border-red-500/40 text-red-700 bg-red-50 font-bold'
                        : 'border-yellow-600/40 text-yellow-800 bg-yellow-50 font-semibold'
                    }`}
                  >
                    {factor.importance}
                  </span>
                </div>
                <h3 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">
                  {factor.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed font-light">
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Conceptual Configuration Blueprint */}
          <div className="border-2 border-alkota-orange bg-white p-8 md:p-12 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-[#EAEAEA] pb-6">
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-1">
                  Conceptual Specification Blueprint
                </span>
                <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black">
                  {app.title} Rig Specification
                </h3>
                <p className="text-xs text-[#777] font-mono mt-1">
                  Starting configuration for our UK engineering team to customise around your depot or fleet.
                </p>
              </div>

              <Link
                href={`/trailers/configure${app.deepLinkQuery}`}
                className="bg-alkota-orange px-8 py-4 font-ibm-plex-mono text-[10px] font-black uppercase tracking-widest text-white hover:bg-alkota-orange/90 transition-all shrink-0 flex items-center justify-center gap-2"
              >
                Customise in Configurator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              <div className="border border-[#E0E0DC] p-4 bg-[#F9F9F8]">
                <span className="text-[#888] text-[9px] uppercase tracking-widest block mb-1">CHASSIS & MAM</span>
                <span className="text-alkota-black font-bold">{app.conceptualConfigSummary.format}</span>
              </div>
              <div className="border border-[#E0E0DC] p-4 bg-[#F9F9F8]">
                <span className="text-[#888] text-[9px] uppercase tracking-widest block mb-1">CLEANING MACHINE</span>
                <span className="text-alkota-orange font-bold">{app.conceptualConfigSummary.machine}</span>
              </div>
              <div className="border border-[#E0E0DC] p-4 bg-[#F9F9F8]">
                <span className="text-[#888] text-[9px] uppercase tracking-widest block mb-1">WATER STORAGE</span>
                <span className="text-alkota-black font-bold">{app.conceptualConfigSummary.water}</span>
              </div>
              <div className="border border-[#E0E0DC] p-4 bg-[#F9F9F8]">
                <span className="text-[#888] text-[9px] uppercase tracking-widest block mb-1">POWER / FUEL</span>
                <span className="text-alkota-black font-bold">{app.conceptualConfigSummary.power}</span>
              </div>
              <div className="border border-[#E0E0DC] p-4 bg-[#F9F9F8]">
                <span className="text-[#888] text-[9px] uppercase tracking-widest block mb-1">OPERATORS</span>
                <span className="text-alkota-black font-bold">{app.conceptualConfigSummary.operators}</span>
              </div>
              <div className="border border-[#E0E0DC] p-4 bg-[#F9F9F8]">
                <span className="text-[#888] text-[9px] uppercase tracking-widest block mb-1">ESTIMATED WEIGHT</span>
                <span className="text-green-700 font-bold">{app.conceptualConfigSummary.estimatedMAM}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector FAQs (Warm Stone Light) */}
      {app.faqs && app.faqs.length > 0 && (
        <section className="py-20 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase text-alkota-black">
                {app.title} Engineering FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {app.faqs.map(faq => (
                <div key={faq.q} className="border border-[#E0E0DC] bg-white p-6 shadow-sm">
                  <h4 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">{faq.q}</h4>
                  <p className="text-xs text-[#666] leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA (Cinematic Dark) */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-white leading-tight mb-4">
            SPECIFY YOUR {app.title.toUpperCase()} RIG.
          </h2>
          <p className="text-alkota-silver text-sm md:text-base leading-relaxed mb-8 font-light">
            Our automotive-grade configurator validates component compatibility, Maximum Authorised Mass, and water endurance in real time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/trailers/configure${app.deepLinkQuery}`}
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build in Configurator</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trailers/applications"
              className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              View All Applications
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
