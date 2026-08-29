'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Package,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Send,
  Wrench,
  Search
} from 'lucide-react';
import { SAMPLE_DELIVERED_ASSET } from '@/lib/trailers/build-project-data';

export default function RequestPartsPage({
  params,
}: {
  params: Promise<{ 'build-code': string }>;
}) {
  const resolvedParams = use(params);
  const buildCode = resolvedParams['build-code'];
  const asset = SAMPLE_DELIVERED_ASSET;

  const [submitted, setSubmitted] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(
    asset.component_serials[0]?.description || 'General System Component'
  );
  const [partDescription, setPartDescription] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F5] text-alkota-black min-h-screen">
      <Navigation />

      {/* ── HEADER ── */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 border-b border-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] mb-3">
            <Link href={`/my-alkota/builds/${buildCode}`} className="hover:text-alkota-orange flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to System Record
            </Link>
            <span>/</span>
            <span className="text-white">Request Parts</span>
          </div>

          <h1 className="font-extralight text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-2">
            Matched Genuine Parts
          </h1>
          <p className="text-xs sm:text-sm text-[#AAA]">
            Direct spare parts ordering for build <span className="font-ibm-plex-mono text-white">{asset.build_reference}</span>. Zero guesswork on compatibility.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-24 py-12 space-y-8">
        {/* Component Serial Reference Box */}
        <div className="bg-[#141414] text-white border border-[#262626] p-6 space-y-4">
          <h3 className="font-ibm-plex-mono text-xs uppercase tracking-wider text-alkota-orange font-bold">
            Installed Serviceable Components on this Rig
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {asset.component_serials.map(cs => (
              <div key={cs.id} className="p-3 bg-[#1B1B1B] border border-[#2A2A2A]">
                <span className="font-ibm-plex-mono text-[9px] uppercase text-[#777] block">{cs.category}</span>
                <span className="font-medium text-white block">{cs.description}</span>
                <span className="font-ibm-plex-mono text-[10px] text-emerald-400">
                  {cs.serial_number || cs.vin}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission State */}
        {submitted ? (
          <div className="bg-white border border-emerald-300 p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-2xl text-alkota-black">Parts Enquiry Received</h3>
            <p className="text-xs sm:text-sm text-[#666] max-w-md mx-auto leading-relaxed">
              Our parts desk has matched your enquiry against build <strong>{asset.build_reference}</strong>. A quote with confirmed stock availability will be returned shortly.
            </p>
            <div className="pt-4">
              <Link
                href={`/my-alkota/builds/${buildCode}`}
                className="inline-flex items-center gap-2 bg-alkota-orange text-white px-5 py-2.5 font-ibm-plex-mono text-xs uppercase tracking-wider font-bold"
              >
                Return to Build Record
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E4] p-8 space-y-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                  Target Component / Assembly *
                </label>
                <select
                  value={selectedComponent}
                  onChange={e => setSelectedComponent(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-alkota-black text-xs font-medium focus:border-alkota-orange outline-none"
                >
                  {asset.component_serials.map(cs => (
                    <option key={cs.id} value={cs.description}>
                      {cs.description} ({cs.make} {cs.model})
                    </option>
                  ))}
                  <option value="General Consumables">General Consumables (O-Rings, Oil, Filters)</option>
                  <option value="Hose & Lance Accessories">Hose, Lance &amp; Nozzle Attachments</option>
                </select>
              </div>

              <div>
                <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                  Quantity Required
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#DDD] px-3 py-2 text-alkota-black text-xs font-medium focus:border-alkota-orange outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-2 font-bold">
                Part Description or Specific Requirement *
              </label>
              <textarea
                required
                rows={4}
                value={partDescription}
                onChange={e => setPartDescription(e.target.value)}
                placeholder="e.g. Replacement high-pressure trigger gun, 500-hour service kit (oil + filters), or replacement ceramic plunger kit..."
                className="w-full bg-[#FAF9F5] border border-[#DDD] p-3 text-alkota-black text-xs leading-relaxed focus:border-alkota-orange outline-none"
              />
            </div>

            <div className="pt-4 border-t border-[#E8E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-[11px] text-[#888]">
                This is a structured enquiry. Genuine Alkota parts will be verified by engineer before shipping.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white px-6 py-3 font-ibm-plex-mono text-xs uppercase tracking-widest font-bold transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Submit Parts Enquiry
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
