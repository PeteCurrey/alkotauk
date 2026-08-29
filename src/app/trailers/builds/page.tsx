'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronRight, Eye, Truck, Droplets, Zap, Shield, Recycle, Flame, Users, Filter } from 'lucide-react';
import { REAL_BUILDS, RealBuild } from '@/lib/trailers/real-builds-data';

export default function RealBuildsArchivePage() {
  const [filter, setFilter] = useState<'all' | 'open-deck' | 'enclosed' | 'recovery' | 'multi-operator'>('all');

  const filteredBuilds = REAL_BUILDS.filter(b => {
    if (filter === 'open-deck') return b.format === 'open-deck';
    if (filter === 'enclosed') return b.format === 'enclosed';
    if (filter === 'recovery') return b.recoveryType !== 'none';
    if (filter === 'multi-operator') return b.operatorCount === 2;
    return true;
  });

  return (
    <main className="bg-white text-alkota-black min-h-screen">
      <Navigation />

      {/* Hero (Cinematic Dark) */}
      <section className="pt-36 pb-20 px-6 border-b border-alkota-iron bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-alkota-orange" />
            <span className="font-ibm-plex-mono text-[10px] font-bold uppercase tracking-[0.4em] text-alkota-orange">
              Verified Project Archive
            </span>
          </div>

          <h1 className="font-barlow-condensed text-5xl md:text-7xl font-black uppercase italic text-white leading-tight mb-6">
            REAL RIGS.<br />
            <span className="text-alkota-orange">BESPOKE UK ENGINEERING.</span>
          </h1>

          <p className="text-alkota-silver text-lg max-w-3xl leading-relaxed font-light mb-10">
            Every Alkota trailer in this archive was engineered and built in the United Kingdom around a real client’s commercial brief. Explore our completed open deck rigs, enclosed mobile plant rooms, multi-operator platforms, and closed-loop environmental recovery systems.
          </p>

          {/* Restrained Filters */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'open-deck', label: 'Open Deck Systems' },
              { id: 'enclosed', label: 'Enclosed Plant Rooms' },
              { id: 'recovery', label: 'Water Recovery' },
              { id: 'multi-operator', label: 'Multi-Operator' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-5 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-all ${
                  filter === tab.id
                    ? 'bg-alkota-orange text-white font-bold'
                    : 'bg-[#141414] border border-[#262626] text-[#AAA] hover:text-white hover:border-[#444]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Builds Grid (Warm Stone Light) */}
      <section className="py-24 px-6 bg-[#F7F7F5] border-b border-[#E5E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {filteredBuilds.map(build => (
              <div
                key={build.slug}
                className="border border-[#E0E0DC] bg-white hover:border-alkota-orange transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-[#090909] overflow-hidden flex items-center justify-center">
                  <img
                    src={build.heroImage}
                    alt={build.title}
                    className="max-h-full max-w-full object-contain p-6 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-alkota-orange bg-black/85 px-3 py-1 border border-alkota-orange/40">
                      {build.format === 'open-deck' ? 'OPEN DECK' : 'ENCLOSED PLANT ROOM'}
                    </span>
                    {build.operatorCount === 2 && (
                      <span className="font-ibm-plex-mono text-[9px] font-bold uppercase tracking-widest text-white bg-black/85 px-2.5 py-1 border border-[#333]">
                        2 OPERATORS
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="font-ibm-plex-mono text-[9px] text-[#DDD] uppercase tracking-widest">
                      {build.application}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-barlow-condensed text-3xl font-black uppercase italic text-alkota-black mb-2 group-hover:text-alkota-orange transition-colors">
                      {build.title}
                    </h2>
                    <p className="text-xs text-[#777] font-mono mb-4 italic">
                      Client: {build.clientDescription}
                    </p>
                    <p className="text-xs text-[#555] leading-relaxed font-light mb-6">
                      {build.tagline}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3 font-mono text-[10px] bg-[#F9F9F8] border border-[#EBEBE6] p-3 mb-6">
                      <div>
                        <span className="text-[#777] block uppercase">MACHINE</span>
                        <span className="text-alkota-orange font-bold">{build.machineCode}</span>
                      </div>
                      <div>
                        <span className="text-[#777] block uppercase">WATER</span>
                        <span className="text-alkota-black font-bold">{build.waterCapacityLitres} Litres</span>
                      </div>
                      <div>
                        <span className="text-[#777] block uppercase">MAM WEIGHT</span>
                        <span className="text-alkota-black font-bold">{build.mamKg} kg</span>
                      </div>
                      <div>
                        <span className="text-[#777] block uppercase">OPERATORS</span>
                        <span className="text-alkota-black font-bold">{build.operatorCount} Simultaneous</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F0F0EC] flex items-center justify-between">
                    <Link
                      href={`/trailers/builds/${build.slug}`}
                      className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-black hover:text-alkota-orange flex items-center gap-1 font-bold"
                    >
                      <Eye className="h-3.5 w-3.5" /> Full Project Teardown
                    </Link>
                    <Link
                      href={`/trailers/configure?preset=${build.configuratorParams.preset || 'fleet-logistics'}&format=${build.configuratorParams.format}&operators=${build.operatorCount}`}
                      className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline font-bold"
                    >
                      Build Similar Rig →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA (Cinematic Dark) */}
      <section className="py-24 px-6 bg-[#0A0A0A] text-white border-t border-alkota-iron text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-barlow-condensed text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
            START YOUR CUSTOM TRAILER BUILD.
          </h3>
          <p className="text-alkota-silver text-sm leading-relaxed mb-8 font-light">
            Every build begins with understanding your operational demands. Configure your rig online or discuss bespoke engineering with our team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/trailers/configure"
              className="inline-flex items-center justify-center gap-2 bg-alkota-orange px-8 py-4 font-ibm-plex-mono text-xs font-black uppercase tracking-widest text-white hover:bg-alkota-orange/90 transition-all"
            >
              Launch Configurator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 font-ibm-plex-mono text-xs uppercase tracking-widest text-white/80 hover:text-white transition-all"
            >
              Speak with an Engineer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
