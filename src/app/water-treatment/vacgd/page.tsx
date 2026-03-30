import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Droplets, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alkota VACGD | Vacuum Recovery System | Alkota UK',
  description: 'The Alkota VACGD is a self-contained vacuum recovery system for mobile wash water capture. Vanguard powered, Sutorbilt blower, designed for surface cleaner integration and EA-compliant closed-loop washing.',
};

export default function VacgdPage() {
  return (
    <main className="min-h-screen bg-alkota-bg overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-40 px-6 border-b border-alkota-iron overflow-hidden bg-alkota-black">
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025]">
          <span className="absolute top-0 right-0 font-barlow-condensed text-[40vw] font-black uppercase italic leading-none text-white whitespace-nowrap">
            VACGD
          </span>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { label: 'Water Treatment', href: '/water-treatment' },
              { label: 'VACGD Vacuum Recovery' },
            ]}
          />
          <div className="mt-8 mb-8 flex items-center gap-4">
            <div className="h-[2px] w-12 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // VACUUM RECOVERY SYSTEM
            </span>
          </div>
          <h1 className="font-barlow-condensed text-7xl font-black uppercase italic leading-[0.82] tracking-tighter text-white md:text-[9rem] mb-12 max-w-5xl">
            ALKOTA<br />
            <span className="text-alkota-orange">VACGD.</span>
          </h1>
          <p className="font-inter text-xl text-alkota-silver uppercase tracking-wider leading-relaxed max-w-2xl">
            Self-contained vacuum recovery for mobile and on-site wash water capture. Vanguard powered. Sutorbilt blower. Designed for surface cleaner integration.
          </p>
        </div>
      </section>

      {/* ── DESCRIPTION ──────────────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-inter text-lg text-alkota-black leading-relaxed font-semibold">
              The Alkota VACGD is a self-contained vacuum recovery system for mobile and on-site wash water capture.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              Powered by an electric start Vanguard engine with a Sutorbilt vacuum blower, the VACGD is designed to link directly with surface cleaners — recovering wash water in real time as the surface is cleaned.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              For contract cleaning operations working on hard surfaces — car parks, loading bays, industrial yards, petrol station forecourts — the VACGD provides the capture side of a compliant closed-loop system. Link it with the Alkota VFS vacuum filtration unit to filter the recovered water for discharge or reuse.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-px bg-alkota-iron border border-alkota-iron">
              {[
                { label: 'Engine', value: 'Vanguard (Electric Start)' },
                { label: 'Blower', value: 'Sutorbilt Vacuum Blower' },
                { label: 'Application', value: 'Surface Cleaner Integration' },
                { label: 'Configuration', value: 'Standalone / Van / Trailer' },
                { label: 'Pairs With', value: 'Alkota VFS Filtration' },
                { label: 'Compliance', value: 'EA PPG2 Capable' },
              ].map((row) => (
                <div key={row.label} className="bg-white flex">
                  <div className="w-1/2 border-r border-alkota-iron p-4 bg-alkota-bg">
                    <span className="font-ibm-plex-mono text-[8px] font-black uppercase tracking-wider text-alkota-silver">{row.label}</span>
                  </div>
                  <div className="w-1/2 p-4">
                    <span className="font-barlow-condensed text-base font-black italic text-alkota-black uppercase">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ─────────────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // KEY FEATURES
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              {
                icon: Wind,
                title: 'Vanguard Electric Start',
                desc: 'Reliable, commercial-grade Vanguard engine. Electric start for rapid deployment on mobile operations.',
              },
              {
                icon: Droplets,
                title: 'Sutorbilt Vacuum Blower',
                desc: 'Industrial-specification positive displacement blower for high-volume vacuum recovery capacity.',
              },
              {
                icon: CheckCircle2,
                title: 'Surface Cleaner Integration',
                desc: 'Designed to link directly with rotary surface cleaners, recovering wash water in real time during cleaning.',
              },
              {
                icon: ShieldCheck,
                title: 'Modular Configuration',
                desc: 'Available as a standalone wheel-kit unit, integrated into a van-build system, or mounted in a trailer.',
              },
              {
                icon: CheckCircle2,
                title: 'VFS Compatible',
                desc: 'Pairs with the Alkota VFS vacuum filtration system to filter recovered water for discharge or full reuse.',
              },
              {
                icon: ShieldCheck,
                title: 'EA Compliance Ready',
                desc: 'Enables closed-loop operation on surfaces where discharge to drain is not permitted under Environment Agency guidelines.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white p-10 flex flex-col">
                  <Icon className="h-8 w-8 text-alkota-orange mb-8" />
                  <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-4">{item.title}</h3>
                  <p className="font-inter text-sm text-alkota-silver leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY ─────────────────────────────────────────── */}
      <section className="py-40 px-6 border-b border-alkota-iron bg-alkota-bg">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.4em] text-alkota-orange">
              // AVAILABLE AS
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-alkota-iron border border-alkota-iron">
            {[
              { label: 'Standalone Unit', desc: 'Wheel kit available. Rapid deployment and relocation between sites.' },
              { label: 'Van-Build Integration', desc: 'Integrated into a complete van-mounted mobile cleaning system.' },
              { label: 'Trailer Integration', desc: 'Mounted alongside pressure washer and surface cleaner on a purpose-built Alkota trailer.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-10">
                <p className="font-barlow-condensed text-5xl font-black italic text-alkota-orange leading-none mb-2">0{i + 1}</p>
                <h3 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black mb-4">{item.label}</h3>
                <p className="font-inter text-sm text-alkota-silver leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGULATORY NOTE ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-alkota-iron bg-alkota-black">
        <div className="mx-auto max-w-7xl">
          <div className="border-l-8 border-alkota-orange pl-12 max-w-4xl">
            <p className="font-ibm-plex-mono text-[9px] font-black uppercase tracking-[0.3em] text-alkota-orange mb-6">
              // REGULATORY NOTE
            </p>
            <p className="font-inter text-lg text-white leading-relaxed mb-4">
              The VACGD enables operations on surfaces where discharge to drain is not permitted — car parks draining to surface water, sites near watercourses, forecourts with sensitive drainage.
            </p>
            <p className="font-inter text-lg text-alkota-silver leading-relaxed">
              By capturing the wash water at source, the VACGD removes the discharge obligation entirely.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-alkota-orange relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.04] skew-x-12 translate-x-1/2" />
        <div className="relative z-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-barlow-condensed text-5xl font-black uppercase italic tracking-tighter text-white leading-[0.85] md:text-6xl mb-3">
              SPECIFY A WATER<br />RECOVERY SYSTEM.
            </h2>
            <p className="font-inter text-white/80 uppercase tracking-wider text-sm">
              VACGD, VFS filtration, and full closed-loop system packages.
            </p>
          </div>
          <Link
            href="/contact?enquiry=water-recovery"
            className="inline-flex items-center gap-3 bg-white text-alkota-black px-10 py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-alkota-black hover:text-white transition-all shrink-0"
          >
            Specify a Water Recovery System <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
