'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Scale, X, Plus, Share2, Check, ArrowRight, Gauge, Zap, Flame,
  ShieldCheck, Wrench, ChevronRight, Layers, SlidersHorizontal,
  Info, ExternalLink, HelpCircle
} from 'lucide-react';
import { Product } from '@/lib/products';
import { UnitSystem } from '@/lib/comparison/types';
import { buildComparisonGroups, computeHighlights } from '@/lib/comparison/engine';
import { useMachineComparison } from '@/lib/comparison/context';
import { resolveMachineImage } from '@/lib/images';

interface ComparisonClientProps {
  allMachines: Product[];
  initialSlugs?: string[];
}

export default function ComparisonClient({ allMachines, initialSlugs = [] }: ComparisonClientProps) {
  const router = useRouter();
  const { selectedSlugs, addMachine, removeMachine, clearComparison, maxLimit } = useMachineComparison();

  // Synchronise context with URL initial slugs on mount if context is empty
  useEffect(() => {
    if (initialSlugs.length > 0 && selectedSlugs.length === 0) {
      initialSlugs.forEach(slug => addMachine(slug));
    }
  }, [initialSlugs, selectedSlugs.length, addMachine]);

  // Current active slugs: take from context, or fallback to initialSlugs
  const activeSlugs = useMemo(() => {
    if (selectedSlugs.length > 0) return selectedSlugs;
    return initialSlugs;
  }, [selectedSlugs, initialSlugs]);

  // Resolve compared Product objects
  const comparedMachines = useMemo(() => {
    return activeSlugs
      .map(slug => allMachines.find(m => m.slug === slug || m.model_code?.toLowerCase() === slug.toLowerCase().replace(/^alkota-/, '')))
      .filter((m): m is Product => !!m);
  }, [activeSlugs, allMachines]);

  // View settings
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [showDiffOnly, setShowDiffOnly] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectorSearch, setSelectorSearch] = useState('');
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Update URL whenever active slugs change
  useEffect(() => {
    if (activeSlugs.length > 0) {
      const url = `/machines/compare?machines=${activeSlugs.join(',')}`;
      window.history.replaceState({ path: url }, '', url);
    }
  }, [activeSlugs]);

  // Build spec groups and highlights
  const groups = useMemo(() => {
    return buildComparisonGroups(comparedMachines, unit);
  }, [comparedMachines, unit]);

  const highlights = useMemo(() => {
    return computeHighlights(comparedMachines);
  }, [comparedMachines]);

  // Share URL handler
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Filter available machines for the picker modal
  const availableToAdd = useMemo(() => {
    const term = selectorSearch.toLowerCase().trim();
    return allMachines.filter(m => {
      if (activeSlugs.includes(m.slug)) return false;
      if (!term) return true;
      return (
        m.name.toLowerCase().includes(term) ||
        m.model_code?.toLowerCase().includes(term) ||
        m.series?.toLowerCase().includes(term) ||
        m.category.toLowerCase().includes(term)
      );
    });
  }, [allMachines, activeSlugs, selectorSearch]);

  const enquiryMachinesParam = comparedMachines.map(m => m.slug).join(',');
  const enquiryModelsParam = comparedMachines.map(m => m.model_code || m.name).join(', ');

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-alkota-black pb-32">
      {/* ── 01. BREADCRUMBS & TOP BAR ── */}
      <div className="border-b border-[#E2E4E8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-[#64748B]">
            <Link href="/machines" className="hover:text-[#FF6900] transition-colors">
              Fleet Catalogue
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F172A] font-semibold">Machine Comparison</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#64748B] hover:text-[#0F172A] bg-[#F1F3F5] hover:bg-[#E5E7EB] px-3 py-1.5 rounded transition-colors"
              title="Copy comparison link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            {comparedMachines.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] hover:text-red-600 transition-colors px-2 py-1"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 02. HERO HEADER ── */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] font-bold">
              <Scale className="w-4 h-4" />
              <span>// ENGINEERING SPECIFICATION COMPARISON</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-[#0F172A] uppercase">
              COMPARE <span className="font-normal italic text-[#FF6900]">ALKOTA MACHINES.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl font-normal leading-relaxed">
              Side-by-side engineering evaluation across thermal output, hydraulic flow, drive metallurgy, and chassis dimensions. All specifications drawn directly from official manufacturer workshop data.
            </p>
          </div>

          {/* Controls Bar: Unit Switch & Differences Toggle */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Metric / Imperial Switch */}
            <div className="inline-flex items-center bg-[#ECEEEF] p-1 rounded-[4px] border border-[#D5D7DA]">
              <button
                onClick={() => setUnit('metric')}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                  unit === 'metric' ? 'bg-white text-[#0F172A] font-bold shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Metric (BAR / LPM)
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                  unit === 'imperial' ? 'bg-white text-[#0F172A] font-bold shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Imperial (PSI / GPM)
              </button>
            </div>

            {/* Differences Only Toggle */}
            <button
              onClick={() => setShowDiffOnly(v => !v)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[4px] border text-xs font-mono uppercase tracking-wider transition-all ${
                showDiffOnly
                  ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold'
                  : 'bg-white text-[#475569] border-[#D5D7DA] hover:border-[#0F172A]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Differences Only</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── 03. EMPTY STATE OR SELECTION STRIP ── */}
      {comparedMachines.length === 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 my-12">
          <div className="bg-white border border-[#E2E4E8] rounded-xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF9F5] border border-[#E2E4E8] flex items-center justify-center mx-auto mb-5 text-[#FF6900]">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] tracking-tight mb-2">
              No Machines Selected for Comparison
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed mb-6">
              Browse the 127-machine industrial fleet and click <strong>&quot;Compare&quot;</strong> on up to 3 machines to evaluate them side-by-side.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/machines"
                className="w-full sm:w-auto px-6 py-3 bg-[#FF6900] hover:bg-orange-600 text-white font-mono text-xs uppercase tracking-widest font-bold rounded transition-colors shadow-sm"
              >
                Browse Fleet Catalogue →
              </Link>
              <button
                onClick={() => setIsSelectorOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-[#CBD5E1] hover:border-[#0F172A] text-[#0F172A] font-mono text-xs uppercase tracking-widest font-semibold rounded transition-colors"
              >
                Select From List
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          {/* ── 04. FACTUAL AT-A-GLANCE HIGHLIGHTS ── */}
          {highlights.length > 0 && (
            <section aria-labelledby="highlights-title" className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6900]">
                  // FACTUAL HIGHLIGHTS
                </span>
                <span className="text-[#94A3B8] text-xs font-mono">· Automated Engineering Evaluation</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highlights.map((h, i) => (
                  <div key={i} className="p-4 bg-[#FAF9F5] border border-[#E8E6DF] rounded-lg">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#FF6900]">
                        {h.machineModel}
                      </span>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#475569]">
                        {h.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {h.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── 05. DESKTOP STICKY MACHINE HEADERS & TABLE ── */}
          <div className="hidden lg:block bg-white border border-[#E2E4E8] rounded-xl overflow-hidden shadow-sm">
            {/* Sticky Header Row */}
            <div className="sticky top-0 z-30 bg-white border-b border-[#E2E4E8] shadow-sm">
              <div className="grid grid-cols-12 divide-x divide-[#E2E4E8]">
                {/* Column 0: Label / Legend */}
                <div className="col-span-3 p-6 flex flex-col justify-between bg-[#FAFAFA]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold block mb-1">
                      Comparing {comparedMachines.length} of {maxLimit} Max
                    </span>
                    <h3 className="font-bold text-sm text-[#0F172A]">
                      Equipment Specifications
                    </h3>
                  </div>
                  {comparedMachines.length < maxLimit && (
                    <button
                      onClick={() => setIsSelectorOpen(true)}
                      className="mt-4 flex items-center justify-center gap-2 p-3 bg-white border border-dashed border-[#CBD5E1] hover:border-[#FF6900] text-xs font-mono uppercase tracking-wider text-[#475569] hover:text-[#FF6900] rounded transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Machine ({maxLimit - comparedMachines.length} slot left)</span>
                    </button>
                  )}
                </div>

                {/* Machine Columns */}
                {comparedMachines.map((m) => {
                  const modelCode = m.model_code || m.slug.replace(/^alkota-/, '').toUpperCase();
                  const imgUrl = resolveMachineImage(m.primary_image_url || m.cutout_image_url, modelCode, m.category);

                  return (
                    <div
                      key={m.slug}
                      className={`${
                        comparedMachines.length === 1
                          ? 'col-span-9'
                          : comparedMachines.length === 2
                          ? 'col-span-4'
                          : 'col-span-3'
                      } p-6 flex flex-col justify-between relative group`}
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeMachine(m.slug)}
                        className="absolute top-4 right-4 text-[#94A3B8] hover:text-red-600 p-1 rounded hover:bg-[#F1F3F5] transition-colors"
                        aria-label={`Remove ${modelCode} from comparison`}
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full mb-4 bg-[#FAF9F5] rounded border border-[#F1F3F5] overflow-hidden flex items-center justify-center">
                        <img
                          src={imgUrl}
                          alt={m.name}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      {/* Title & Positioning */}
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6900] font-bold">
                          {modelCode}
                        </span>
                        <h4 className="font-bold text-sm text-[#0F172A] line-clamp-1">
                          <Link href={`/machines/${m.category}/${m.slug}`} className="hover:text-[#FF6900] transition-colors">
                            {m.name}
                          </Link>
                        </h4>
                        <p className="text-[11px] text-[#64748B] line-clamp-2 mt-1 font-light">
                          {m.tagline || m.short_description || 'Industrial continuous-duty cleaning system.'}
                        </p>
                      </div>

                      {/* Detail CTA Link */}
                      <div className="mt-4 pt-4 border-t border-[#F1F3F5] flex items-center justify-between">
                        <Link
                          href={`/machines/${m.category}/${m.slug}`}
                          className="font-mono text-[10px] uppercase tracking-wider text-[#0F172A] hover:text-[#FF6900] font-semibold flex items-center gap-1"
                        >
                          <span>Full Specs</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                          Verified OEM
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Empty Slot Placeholder (if only 1 or 2 selected) */}
                {Array.from({ length: 3 - comparedMachines.length }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className={`${
                      comparedMachines.length === 1 ? 'hidden' : 'col-span-3'
                    } p-6 flex flex-col items-center justify-center text-center bg-[#FAFAFA]/50 border-dashed border-l border-[#E2E4E8]`}
                  >
                    <div className="w-12 h-12 rounded-full bg-white border border-[#CBD5E1] flex items-center justify-center text-[#94A3B8] mb-3">
                      <Plus className="w-5 h-5" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#64748B] font-bold mb-1">
                      Empty Slot
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mb-4">
                      Add another model to compare specifications
                    </p>
                    <button
                      onClick={() => setIsSelectorOpen(true)}
                      className="px-4 py-2 bg-white border border-[#CBD5E1] hover:border-[#FF6900] text-[#0F172A] hover:text-[#FF6900] text-xs font-mono uppercase tracking-wider rounded transition-colors"
                    >
                      Choose Machine
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specification Groups */}
            <div className="divide-y divide-[#E2E4E8]">
              {groups.map((group) => {
                const visibleRows = showDiffOnly ? group.rows.filter(r => r.isDifferent) : group.rows;
                if (visibleRows.length === 0) return null;

                return (
                  <div key={group.id} className="divide-y divide-[#F1F3F5]">
                    {/* Group Header */}
                    <div className="bg-[#FAF9F5] px-6 py-3 border-t border-b border-[#E2E4E8] flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#0F172A]">
                        // {group.title}
                      </span>
                      {group.description && (
                        <span className="text-xs text-[#64748B] font-light">
                          {group.description}
                        </span>
                      )}
                    </div>

                    {/* Group Rows */}
                    {visibleRows.map((row) => (
                      <div
                        key={row.key}
                        className={`grid grid-cols-12 divide-x divide-[#E2E4E8] transition-colors ${
                          row.isDifferent ? 'bg-[#FFFDFB] hover:bg-[#FFF8F0]' : 'hover:bg-[#FAF9F5]'
                        }`}
                      >
                        {/* Row Label */}
                        <div className="col-span-3 px-6 py-4 flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-[#475569]">
                            {row.label}
                          </span>
                          {row.isDifferent && (
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200" title="Values differ across compared machines">
                              Diff
                            </span>
                          )}
                        </div>

                        {/* Machine Values */}
                        {comparedMachines.map((m) => {
                          const val = row.values[m.slug];
                          return (
                            <div
                              key={m.slug}
                              className={`${
                                comparedMachines.length === 1
                                  ? 'col-span-9'
                                  : comparedMachines.length === 2
                                  ? 'col-span-4'
                                  : 'col-span-3'
                              } px-6 py-4 flex items-center text-xs ${
                                val?.isSpecified ? 'text-[#0F172A] font-medium' : 'text-[#94A3B8] italic'
                              }`}
                            >
                              <span>{val?.display || 'Not specified'}</span>
                            </div>
                          );
                        })}

                        {/* Empty column fillers */}
                        {Array.from({ length: 3 - comparedMachines.length }).map((_, idx) => (
                          <div
                            key={`empty-cell-${idx}`}
                            className={`${comparedMachines.length === 1 ? 'hidden' : 'col-span-3'} px-6 py-4 bg-[#FAFAFA]/30`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 06. MOBILE / TABLET EXPERIENCE ── */}
          <div className="block lg:hidden space-y-6">
            {/* Machine Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2E4E8]">
              {comparedMachines.map((m, idx) => {
                const modelCode = m.model_code || m.slug.replace(/^alkota-/, '').toUpperCase();
                const isActive = activeMobileIndex === idx;
                return (
                  <button
                    key={m.slug}
                    onClick={() => setActiveMobileIndex(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#FF6900] text-white font-bold shadow-sm'
                        : 'bg-white text-[#475569] border border-[#CBD5E1]'
                    }`}
                  >
                    <span>{modelCode}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeMachine(m.slug);
                        if (activeMobileIndex >= comparedMachines.length - 1) {
                          setActiveMobileIndex(Math.max(0, activeMobileIndex - 1));
                        }
                      }}
                      className="hover:opacity-75 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </span>
                  </button>
                );
              })}
              {comparedMachines.length < maxLimit && (
                <button
                  onClick={() => setIsSelectorOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-[#CBD5E1] text-[#64748B] text-xs font-mono uppercase tracking-wider rounded whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              )}
            </div>

            {/* Active Mobile Machine Card */}
            {comparedMachines[activeMobileIndex] && (
              <div className="bg-white border border-[#E2E4E8] rounded-xl p-6 shadow-sm">
                {(() => {
                  const m = comparedMachines[activeMobileIndex];
                  const modelCode = m.model_code || m.slug.replace(/^alkota-/, '').toUpperCase();
                  const imgUrl = resolveMachineImage(m.primary_image_url || m.cutout_image_url, modelCode, m.category);

                  return (
                    <div>
                      <div className="aspect-[16/10] w-full bg-[#FAF9F5] rounded border border-[#F1F3F5] mb-4 flex items-center justify-center overflow-hidden">
                        <img src={imgUrl} alt={m.name} className="h-full w-full object-contain p-2" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF6900]">
                        {modelCode}
                      </span>
                      <h3 className="text-xl font-bold text-[#0F172A]">
                        {m.name}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1">
                        {m.tagline || m.short_description}
                      </p>

                      <div className="mt-6 divide-y divide-[#E2E4E8]">
                        {groups.map((g) => {
                          const rows = showDiffOnly ? g.rows.filter(r => r.isDifferent) : g.rows;
                          if (rows.length === 0) return null;

                          return (
                            <div key={g.id} className="py-4">
                              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#0F172A] mb-3">
                                // {g.title}
                              </h4>
                              <dl className="space-y-2.5">
                                {rows.map((r) => {
                                  const val = r.values[m.slug];
                                  return (
                                    <div key={r.key} className="flex items-start justify-between gap-4 text-xs">
                                      <dt className="text-[#64748B]">{r.label}</dt>
                                      <dd className={`text-right font-medium ${val?.isSpecified ? 'text-[#0F172A]' : 'text-[#94A3B8] italic'}`}>
                                        {val?.display || 'Not specified'}
                                      </dd>
                                    </div>
                                  );
                                })}
                              </dl>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* ── 07. ACTION BANNER & ENQUIRY ── */}
          <section className="bg-[#1A1A18] text-white rounded-xl p-8 sm:p-12 border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF6900] font-bold block">
                  // FACTORY CONSULTATION & PROCUREMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Need an engineering recommendation between these models?
                </h3>
                <p className="text-xs sm:text-sm text-[#AAA] font-normal leading-relaxed">
                  Our application engineers will assess your electrical supply, water throughput, detergent chemistry, and duty cycle to verify exact fitment before you purchase.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                <Link
                  href={`/enquire?source=MACHINE_COMPARISON&machines=${encodeURIComponent(enquiryMachinesParam)}&models=${encodeURIComponent(enquiryModelsParam)}`}
                  className="px-6 py-4 bg-[#FF6900] hover:bg-orange-600 font-mono text-xs uppercase tracking-widest text-white transition-colors font-bold rounded text-center shadow-lg shadow-orange-600/20"
                >
                  Enquire About These {comparedMachines.length} Models →
                </Link>
                <Link
                  href="/machines"
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-widest rounded transition-colors text-center"
                >
                  Back To Fleet
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── 08. MACHINE SELECTOR MODAL ── */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#CBD5E1] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E2E4E8] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">
                  Add Machine to Comparison
                </h3>
                <p className="text-xs text-[#64748B]">
                  Select from {allMachines.length} verified Alkota industrial machines
                </p>
              </div>
              <button
                onClick={() => setIsSelectorOpen(false)}
                className="text-[#64748B] hover:text-[#0F172A] p-1.5 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-[#E2E4E8] bg-[#FAF9F5]">
              <input
                type="text"
                value={selectorSearch}
                onChange={e => setSelectorSearch(e.target.value)}
                placeholder="Search by model code, series, or category…"
                className="w-full bg-white border border-[#CBD5E1] rounded-lg px-3.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6900]"
                autoFocus
              />
            </div>

            {/* Machine List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#F1F3F5]">
              {availableToAdd.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#94A3B8] font-mono">
                  No matching machines available to add.
                </div>
              ) : (
                availableToAdd.map(m => {
                  const modelCode = m.model_code || m.slug.replace(/^alkota-/, '').toUpperCase();
                  const imgUrl = resolveMachineImage(m.primary_image_url || m.cutout_image_url, modelCode, m.category);

                  return (
                    <div
                      key={m.slug}
                      className="py-3 flex items-center justify-between gap-4 hover:bg-[#FAF9F5] px-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded border border-[#E2E4E8] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                          <img src={imgUrl} alt={m.name} className="h-full w-full object-contain" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-[#FF6900] uppercase">
                            {modelCode}
                          </span>
                          <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">
                            {m.name}
                          </h4>
                          <span className="text-[10px] text-[#64748B]">
                            {m.pressure_bar ? `${m.pressure_bar} BAR` : ''}
                            {m.pressure_bar && m.flow_rate_lpm ? ' · ' : ''}
                            {m.flow_rate_lpm ? `${m.flow_rate_lpm} L/min` : ''}
                            {m.heating_fuel ? ` · ${m.heating_fuel}` : ''}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addMachine(m.slug);
                          setIsSelectorOpen(false);
                        }}
                        className="px-3 py-1.5 bg-[#0F172A] hover:bg-[#FF6900] text-white text-xs font-mono uppercase tracking-wider rounded transition-colors shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
