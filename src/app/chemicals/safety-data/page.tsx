'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import {
  FileText,
  Download,
  Search,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  Filter,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { VERIFIED_CHEMICAL_PRODUCTS, CHEMICAL_CATEGORIES } from '@/lib/chemicals/seed-data';

export default function SafetyDataLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = VERIFIED_CHEMICAL_PRODUCTS.filter((product) => {
    if (!product.active) return false;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.code && product.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.tagline && product.tagline.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      <section className="relative border-b border-[#222] bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 pt-12 pb-16">
          <Breadcrumbs
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: 'Safety Data (SDS) Library' }
            ]}
          />

          <div className="mt-8 max-w-4xl">
            <span className="font-ibm-plex-mono text-[11px] font-bold uppercase tracking-[0.3em] text-alkota-orange block mb-3">
              // GB CLP & UK REACH TECHNICAL COMPLIANCE ARCHITECTURE
            </span>
            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight uppercase leading-[0.95] text-white mb-6">
              SAFETY DATA & <br />
              <span className="text-alkota-orange font-light">TECHNICAL SPECIFICATION LIBRARY.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#AAA] leading-relaxed font-normal mb-8">
              Download current Safety Data Sheets (SDS), Technical Data Sheets (TDS), and application label instructions for the Alkota UK commercial chemical range. All documents reflect current GB chemical supply obligations.
            </p>
          </div>

          {/* Legal COSHH Guidance Notice */}
          <div className="p-6 bg-[#141412] border-l-4 border-alkota-orange max-w-4xl space-y-2">
            <div className="flex items-center gap-2 text-alkota-orange">
              <ShieldCheck className="h-4 w-4" />
              <span className="font-ibm-plex-mono text-xs uppercase tracking-wider font-bold">
                COSHH Assessment Compliance Guidance
              </span>
            </div>
            <p className="text-xs text-[#CCC] leading-relaxed font-normal">
              The Safety Data Sheet (SDS) provides chemical hazard and exposure data required to support your site-specific <strong>Control of Substances Hazardous to Health (COSHH)</strong> assessment. An SDS in itself is not a substitute for a risk assessment conducted on your specific site, wash bay, or application method.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-12 bg-[#111111] border-b border-[#222]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
              <input
                type="text"
                placeholder="Search by product name, code (e.g. TR-440)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#333] text-white pl-11 pr-4 py-3 text-xs font-normal focus:outline-none focus:border-alkota-orange transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#777] uppercase font-ibm-plex-mono hidden sm:inline">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#1A1A1A] border border-[#333] text-white px-4 py-3 text-xs font-normal focus:outline-none focus:border-alkota-orange"
              >
                <option value="all">All Chemical Families</option>
                {CHEMICAL_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Document Table / Grid */}
          <div className="border border-[#222] bg-[#141414] overflow-x-auto">
            <table className="w-full text-left min-w-[760px]">
              <thead>
                <tr className="bg-[#1C1C1C] border-b border-[#222] text-[9px] font-ibm-plex-mono uppercase tracking-widest text-[#777]">
                  <th className="px-6 py-4">Product Name & Code</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">GB CLP Classification</th>
                  <th className="px-6 py-4">Signal Word</th>
                  <th className="px-6 py-4">Safety Data Sheet (SDS)</th>
                  <th className="px-6 py-4">Tech Data (TDS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-xs text-[#777] font-ibm-plex-mono uppercase">
                      No matching chemical documentation found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#181818] transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/chemicals/${prod.category}/${prod.slug}`}
                          className="font-normal text-white hover:text-alkota-orange text-sm block leading-tight no-underline"
                        >
                          {prod.name}
                        </Link>
                        <span className="font-ibm-plex-mono text-[10px] text-[#666] block mt-0.5">
                          {prod.code || 'HYDRUS'}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-[#888] font-normal uppercase">
                        {prod.category.replace(/-/g, ' ')}
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-[11px] text-[#CCC] font-normal block max-w-xs leading-snug">
                          {prod.hazard_classification || 'Non-Hazardous'}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-ibm-plex-mono text-[10px]">
                        {prod.signal_word === 'DANGER' ? (
                          <span className="text-red-400 bg-red-950/40 px-2 py-0.5 border border-red-800/50">
                            DANGER
                          </span>
                        ) : prod.signal_word === 'WARNING' ? (
                          <span className="text-amber-400 bg-amber-950/40 px-2 py-0.5 border border-amber-800/50">
                            WARNING
                          </span>
                        ) : (
                          <span className="text-[#666]">NONE</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href={prod.sds_url || '#'}
                          className="inline-flex items-center gap-2 bg-[#222] hover:bg-alkota-orange text-white px-3.5 py-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-wider transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          <span>SDS (PDF)</span>
                        </a>
                        <span className="block text-[9px] font-ibm-plex-mono text-[#666] mt-1">
                          Rev: {prod.sds_revision_date || 'Current'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href={prod.tds_url || '#'}
                          className="inline-flex items-center gap-2 border border-[#333] hover:border-white text-[#AAA] hover:text-white px-3 py-1.5 text-[10px] font-ibm-plex-mono uppercase tracking-wider transition-colors"
                        >
                          <FileText className="h-3 w-3 text-alkota-orange" />
                          <span>TDS</span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regulatory Assistance Banner */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#141412] border border-[#262626] p-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl uppercase tracking-tight text-white font-light">
              Need Historical Document Archive or Custom COSHH Support?
            </h3>
            <p className="text-xs text-[#888] leading-relaxed font-normal">
              If your safety audit requires superseded document revision logs, REACH SVHC declarations, or certificate of analysis (COA) records, our technical compliance desk can supply full documentation packs.
            </p>
          </div>
          <Link
            href="/contact?subject=COSHH%20and%20Safety%20Documentation"
            className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal shrink-0"
          >
            <span>Contact Technical Compliance</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
