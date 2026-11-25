'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ExternalLink, ArrowRight, FileText, Wrench } from 'lucide-react';

const MANUAL_SERIES = [
  {
    series: 'X4 Belt Drive Series',
    models: '216X4, 320X4, 420X4, 430X4, 530X4',
    category: 'Hot Water Electric',
    notes: 'Operating instructions, down-draft burner wiring schematic, triplex pump exploded parts diagram.',
  },
  {
    series: 'Gas-Fired Stationary Series',
    models: '4301, 5301, 8301, 10301 (NG / LP)',
    category: 'Stationary Plant',
    notes: 'Natural gas & LPG burner setup, flue installation clearances, remote station wiring.',
  },
  {
    series: 'Mobile Diesel & Petrol Skid Series',
    models: '4305, 5305, 5355, 6355 (Vanguard / Kubota)',
    category: 'Mobile & Trailer Skids',
    notes: 'Engine & burner maintenance intervals, 12V DC charging circuit, fuel system priming.',
  },
  {
    series: 'All-Electric & Steam Series',
    models: '4302E, 4303E, Steam-Combos',
    category: 'Zero-Emission / Steam',
    notes: '3-phase immersion heater bank schematics, wet steam valve calibration, thermal cut-out reset.',
  },
  {
    series: 'VACGD Water Recovery & VFS Filtration',
    models: 'VACGD, 8-VFS-1, Closed-Loop Wash Bays',
    category: 'Water Treatment',
    notes: 'Blower maintenance, 5-stage negative-void filter media changeout, hydrocarbon discharge limits.',
  },
];

export default function ManualsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MANUAL_SERIES;
    return MANUAL_SERIES.filter(
      (item) =>
        item.series.toLowerCase().includes(q) ||
        item.models.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-alkota-black">
      <Navigation />

      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-5xl mx-auto">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.3em] text-alkota-orange block mb-4">
            // Technical Documentation &amp; Schematics
          </span>
          <h1 className="font-extralight text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-6">
            Operating Manuals &amp;{' '}
            <span className="text-alkota-orange font-normal italic">Parts Diagrams.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#AAA] font-normal leading-relaxed max-w-2xl mb-8">
            Look up factory user manuals, electrical wiring diagrams, and exploded parts breakdowns by serial number via the official Alkota Manuals archive (2012 onwards), or request legacy build sheets from our UK engineering desk.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://alkotamanuals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Serial Number Lookup (AlkotaManuals.com)
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/contact?topic=manual-request"
              className="inline-flex items-center gap-2 border border-[#444] hover:border-white text-white px-7 py-3.5 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
            >
              Request Pre-2012 Legacy Manual
            </Link>
          </div>
        </div>
      </section>

      {/* Search & Series Directory */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
        <div className="mb-10 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by model number or series (e.g., 430X4, 5301, VACGD)..."
            className="w-full bg-white border border-[#D5D5D0] p-5 pl-14 text-base text-alkota-black focus:border-alkota-orange focus:outline-none"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#888] h-5 w-5" />
        </div>

        <div className="space-y-4 mb-16">
          {filtered.map((item) => (
            <div
              key={item.series}
              className="bg-white border border-[#E8E8E4] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-alkota-orange transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-4 h-4 text-alkota-orange" />
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                    {item.category}
                  </span>
                </div>
                <h2 className="font-medium text-xl text-alkota-black mb-1">{item.series}</h2>
                <p className="font-ibm-plex-mono text-xs text-[#666] mb-2">Models: {item.models}</p>
                <p className="text-xs text-[#666] leading-relaxed">{item.notes}</p>
              </div>
              <Link
                href={`/contact?topic=manual-request&series=${encodeURIComponent(item.series)}`}
                className="shrink-0 inline-flex items-center gap-2 bg-alkota-black hover:bg-alkota-orange text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
              >
                Request UK Pack
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white border border-[#E8E8E4] p-8 text-center">
              <p className="text-sm text-[#555] mb-4">
                No standard series matched &ldquo;{query}&rdquo;. Enter your machine serial plate number directly on AlkotaManuals.com or contact our engineering desk.
              </p>
              <Link
                href="/contact?topic=manual-request"
                className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline"
              >
                Ask UK Engineering Desk <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Serial Plate Help */}
        <div className="bg-white border border-[#E8E8E4] p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Wrench className="w-6 h-6 text-alkota-orange shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-base text-alkota-black mb-1">
                Need genuine spares for a legacy Alkota machine?
              </h3>
              <p className="text-xs text-[#666] leading-relaxed max-w-xl">
                We maintain historic build records and parts supersession data for 10–20+ year old Alkota units. Send us a photo of your serial plate and our parts desk will identify the exact seal kit, coil, or burner assembly.
              </p>
            </div>
          </div>
          <Link
            href="/service/machine-registration"
            className="shrink-0 inline-flex items-center gap-2 border border-alkota-black hover:bg-alkota-black hover:text-white px-5 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest transition-colors"
          >
            Register Machine
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
