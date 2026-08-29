import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronRight, ArrowLeft, CheckCircle2, Truck, Droplets, Zap, Shield, Recycle, Flame, Gauge, Wrench } from 'lucide-react';
import { REAL_BUILDS } from '@/lib/trailers/real-builds-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REAL_BUILDS.map(build => ({
    slug: build.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const build = REAL_BUILDS.find(b => b.slug === slug);
  if (!build) return { title: 'Project Not Found | Alkota UK' };

  return {
    title: `${build.title} — Alkota UK Case Study`,
    description: build.tagline,
    openGraph: {
      title: `${build.title} — Alkota UK Case Study`,
      description: build.tagline,
      images: [build.heroImage]
    }
  };
}

export default async function RealBuildDetailPage({ params }: Props) {
  const { slug } = await params;
  const build = REAL_BUILDS.find(b => b.slug === slug);

  if (!build) {
    notFound();
  }

  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* Hero (Cinematic Dark) */}
      <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden bg-[#0A0A0A] text-white border-b border-alkota-iron pt-32 pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${build.heroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link
            href="/trailers/builds"
            className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#AAA] hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Project Case Studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-alkota-orange bg-black/80 px-3 py-1 border border-alkota-orange/40">
              {build.format === 'open-deck' ? 'OPEN DECK ARCHITECTURE' : 'ENCLOSED MOBILE PLANT ROOM'}
            </span>
            <span className="font-ibm-plex-mono text-[9px] text-[#CCC] bg-black/80 px-3 py-1 border border-[#444] uppercase">
              {build.application}
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-[0.95] tracking-tight mb-4 max-w-4xl">
            {build.title}
          </h1>

          <p className="text-xs font-mono text-[#AAA] mb-6 italic">
            Client: {build.clientDescription}
          </p>

          <p className="text-alkota-silver text-base md:text-lg max-w-3xl leading-relaxed font-light mb-8">
            {build.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/trailers/configure?preset=${build.configuratorParams.preset || 'fleet-logistics'}&format=${build.configuratorParams.format}&operators=${build.operatorCount}`}
              className="inline-flex items-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Build Something Like This</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              Consult On Custom Rig
            </Link>
          </div>
        </div>
      </section>

      {/* 01 & 02 The Brief & The Challenge (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="border border-[#E0E0DC] bg-white p-8 md:p-10 shadow-sm">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                01 // The Operational Brief
              </span>
              <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-4">
                Client Requirements
              </h2>
              <p className="text-[#555] text-sm md:text-base leading-relaxed font-light">
                {build.theBrief}
              </p>
            </div>

            <div className="border border-[#E0E0DC] bg-white p-8 md:p-10 shadow-sm">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange font-bold block mb-2">
                02 // Engineering Challenges
              </span>
              <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-4">
                Technical Constraints
              </h2>
              <p className="text-[#555] text-sm md:text-base leading-relaxed font-light">
                {build.operationalChallenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 The System & Solutions (Warm Neutral) */}
      <section className="py-24 px-6 bg-[#EFEFEA] border-b border-[#DDD]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              03 // The Engineered Solution
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight mb-6">
              SYSTEM ARCHITECTURE & INNOVATIONS.
            </h2>
            <p className="text-[#555] text-base leading-relaxed font-light">
              {build.theSystem}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {build.engineeringSolutions.map((sol, idx) => (
              <div key={idx} className="border border-[#D5D5D0] bg-white p-5 shadow-sm">
                <span className="font-ibm-plex-mono text-[9px] text-alkota-orange font-bold block mb-2">
                  SOLUTION 0{idx + 1}
                </span>
                <p className="text-xs text-[#666] leading-relaxed font-light">
                  {sol}
                </p>
              </div>
            ))}
          </div>

          {/* Subsystem Walkthrough */}
          <div className="mb-8">
            <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-6">
              Subsystem Walkthrough
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {build.annotatedWalkthrough.map(step => (
                <div key={step.title} className="border border-[#D5D5D0] bg-white p-6 shadow-sm">
                  <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange font-bold block mb-1">
                    {step.component}
                  </span>
                  <h4 className="font-barlow-condensed text-xl font-bold uppercase text-alkota-black mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#666] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 Verified Technical Specifications (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange font-bold block mb-3">
              04 // Engineering Data
            </span>
            <h2 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-alkota-black leading-tight">
              VERIFIED PROJECT SPECIFICATIONS.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 border-t border-b border-[#E0E0DC] py-8">
            {build.specs.map(spec => (
              <div key={spec.label} className="flex items-start justify-between border-b border-[#EBEBE6] pb-3 text-xs font-mono">
                <span className="text-[#777] uppercase tracking-widest">{spec.label}</span>
                <span className="text-alkota-black text-right max-w-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Support (Warm Stone Light) */}
      <section className="py-20 px-6 bg-white border-b border-[#E5E5E0]">
        <div className="max-w-4xl mx-auto text-center">
          <Wrench className="h-8 w-8 text-alkota-orange mx-auto mb-4" />
          <h3 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-3">
            Lifecycle Support & Maintenance
          </h3>
          <p className="text-[#555] text-sm leading-relaxed font-light mb-6">
            Like all Alkota UK bespoke builds, this system is supported by scheduled Planned Preventative Maintenance (PPM), annual IVA roadworthiness inspection certification, and our industry-leading 7-year hydro-insulated coil warranty.
          </p>
          <Link
            href="/service/trailers"
            className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline font-bold"
          >
            Learn About Trailer PPM & Lifecycle Care →
          </Link>
        </div>
      </section>

      {/* Final CTA (Cinematic Dark) */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-barlow-condensed text-4xl md:text-6xl font-black uppercase italic text-white leading-tight mb-4">
            ENGINEER YOUR SYSTEM.
          </h2>
          <p className="text-alkota-silver text-sm md:text-base leading-relaxed mb-8 font-light">
            Use this completed build as your starting blueprint in our interactive rig configurator. Customise water volume, machines, recovery, and chassis MAM in real time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/trailers/configure?preset=${build.configuratorParams.preset || 'fleet-logistics'}&format=${build.configuratorParams.format}&operators=${build.operatorCount}`}
              className="inline-flex items-center justify-center gap-3 bg-alkota-orange px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white hover:bg-alkota-orange/90 transition-all group"
            >
              <span>Customise In Configurator</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/trailers/builds"
              className="inline-flex items-center justify-center gap-3 border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-all"
            >
              Explore Other Builds
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
