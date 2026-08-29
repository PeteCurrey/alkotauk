'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  Droplets,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Download,
  Info,
  HelpCircle,
  Clock,
  Zap,
  Building2,
  RefreshCw,
  Award
} from 'lucide-react';
import Link from 'next/link';
import {
  CONTAMINATION_OPTIONS,
  SURFACE_OPTIONS,
  EQUIPMENT_OPTIONS,
  runChemicalMatch,
} from '@/lib/chemicals/matching-engine';
import { VERIFIED_CHEMICAL_PRODUCTS } from '@/lib/chemicals/seed-data';

export default function ChemicalMatchDedicatedPage() {
  const [step, setStep] = useState<number>(1);
  const [selectedContam, setSelectedContam] = useState<string>('road_film');
  const [selectedSurface, setSelectedSurface] = useState<string>('painted_vehicle');
  const [selectedEquip, setSelectedEquip] = useState<string>('hot_water');
  const [hasWaterRecovery, setHasWaterRecovery] = useState<boolean>(false);
  const [isFoodArea, setIsFoodArea] = useState<boolean>(false);
  const [selectedFinish, setSelectedFinish] = useState<string>('high_gloss');

  const matches = runChemicalMatch({
    contamination: selectedContam,
    surface: selectedSurface,
    equipmentType: selectedEquip,
    waterRecoverySystem: hasWaterRecovery,
    foodProcessArea: isFoodArea,
  });

  const resetMatcher = () => {
    setStep(1);
    setSelectedContam('road_film');
    setSelectedSurface('painted_vehicle');
    setSelectedEquip('hot_water');
    setHasWaterRecovery(false);
    setIsFoodArea(false);
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      <section className="relative border-b border-[#222] bg-[#0A0A0A]">
        <div className="mx-auto max-w-5xl px-6 sm:px-12 pt-12 pb-16">
          <Breadcrumbs
            items={[
              { label: 'Chemicals', href: '/chemicals' },
              { label: 'Chemical Match Engine' }
            ]}
          />

          <div className="mt-8 text-center max-w-3xl mx-auto">
            <span className="font-ibm-plex-mono text-[11px] font-bold uppercase tracking-[0.3em] text-alkota-orange block mb-3">
              // STRUCTURED DIAGNOSTIC ENGINE // GB CHEMICAL COMPLIANCE
            </span>
            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight uppercase leading-[0.95] text-white mb-4">
              CHEMICAL <span className="text-alkota-orange font-light">MATCH.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#AAA] leading-relaxed font-normal">
              Specify your contamination challenge and substrate metallurgy. Recommendations are calculated strictly from verified manufacturer compatibility rules and UK safety certifications.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 flex items-center justify-center gap-2 max-w-md mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 transition-all ${
                  step >= s ? 'bg-alkota-orange' : 'bg-[#262626]'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-[10px] font-ibm-plex-mono uppercase text-[#777]">
            <span className={step >= 1 ? 'text-alkota-orange' : ''}>01 Soil</span>
            <span className={step >= 2 ? 'text-alkota-orange' : ''}>02 Surface</span>
            <span className={step >= 3 ? 'text-alkota-orange' : ''}>03 Equipment</span>
            <span className={step >= 4 ? 'text-alkota-orange' : ''}>04 Results</span>
          </div>
        </div>
      </section>

      {/* Main Multi-Step Container */}
      <section className="py-16 bg-[#111111] min-h-[500px]">
        <div className="mx-auto max-w-4xl px-6 sm:px-12">
          {/* ─── STEP 01: CONTAMINATION ────────────────────────────────────── */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-[#222] pb-4">
                <span className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange block mb-1">
                  Step 01 of 03
                </span>
                <h2 className="text-2xl uppercase tracking-tight text-white font-light">
                  What are you trying to remove?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONTAMINATION_OPTIONS.map((opt) => {
                  const isSelected = selectedContam === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedContam(opt.id)}
                      className={`p-4 cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#1C1C1A] border-alkota-orange shadow-lg'
                          : 'bg-[#141414] border-[#262626] hover:border-[#444]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className={`text-sm uppercase tracking-wider ${isSelected ? 'text-alkota-orange font-normal' : 'text-white font-normal'}`}>
                          {opt.label}
                        </h3>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />}
                      </div>
                      <p className="text-[11px] text-[#777] leading-relaxed font-normal">
                        {opt.sublabel}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal cursor-pointer"
                >
                  <span>Next: Select Surface</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 02: SURFACE / SUBSTRATE METALLURGY ───────────────────── */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-[#222] pb-4">
                <span className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange block mb-1">
                  Step 02 of 03
                </span>
                <h2 className="text-2xl uppercase tracking-tight text-white font-light">
                  What surface are you cleaning?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SURFACE_OPTIONS.map((opt) => {
                  const isSelected = selectedSurface === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedSurface(opt.id)}
                      className={`p-4 cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#1C1C1A] border-alkota-orange shadow-lg'
                          : 'bg-[#141414] border-[#262626] hover:border-[#444]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className={`text-sm uppercase tracking-wider ${isSelected ? 'text-alkota-orange font-normal' : 'text-white font-normal'}`}>
                          {opt.label}
                        </h3>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-alkota-orange shrink-0" />}
                      </div>
                      <p className="text-[11px] text-[#777] leading-relaxed font-normal">
                        {opt.sublabel}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] text-[#888] hover:text-white px-6 py-3 text-xs uppercase tracking-widest transition-colors font-normal cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal cursor-pointer"
                >
                  <span>Next: Equipment & Constraints</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 03: EQUIPMENT & PROCESS CONSTRAINTS ──────────────────── */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="border-b border-[#222] pb-4">
                <span className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange block mb-1">
                  Step 03 of 03
                </span>
                <h2 className="text-2xl uppercase tracking-tight text-white font-light">
                  Equipment Mode & Site Constraints
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#AAA] mb-2 font-normal">
                    Cleaning Equipment Type:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EQUIPMENT_OPTIONS.map((opt) => {
                      const isSelected = selectedEquip === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelectedEquip(opt.id)}
                          className={`p-3 cursor-pointer transition-all border ${
                            isSelected
                              ? 'bg-[#1C1C1A] border-alkota-orange'
                              : 'bg-[#141414] border-[#262626] hover:border-[#444]'
                          }`}
                        >
                          <span className={`text-xs uppercase block ${isSelected ? 'text-alkota-orange font-normal' : 'text-white font-normal'}`}>
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-[#777] font-normal leading-tight mt-0.5 block">
                            {opt.sublabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#222] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-start gap-3 p-3 bg-[#141414] border border-[#262626] cursor-pointer hover:border-[#444]">
                    <input
                      type="checkbox"
                      checked={hasWaterRecovery}
                      onChange={(e) => setHasWaterRecovery(e.target.checked)}
                      className="mt-1 accent-alkota-orange"
                    />
                    <div>
                      <span className="text-xs uppercase text-white font-normal block">
                        Water Recovery / Interceptor Present
                      </span>
                      <span className="text-[10px] text-[#777] font-normal block">
                        Requires quick-release chemical compatibility with oil-water separators.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-[#141414] border border-[#262626] cursor-pointer hover:border-[#444]">
                    <input
                      type="checkbox"
                      checked={isFoodArea}
                      onChange={(e) => setIsFoodArea(e.target.checked)}
                      className="mt-1 accent-alkota-orange"
                    />
                    <div>
                      <span className="text-xs uppercase text-white font-normal block">
                        Food / Processing Environment
                      </span>
                      <span className="text-[10px] text-[#777] font-normal block">
                        Requires verified non-contaminating chemistry and potable rinse instructions.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] text-[#888] hover:text-white px-6 py-3 text-xs uppercase tracking-widest transition-colors font-normal cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 bg-alkota-orange text-white px-8 py-3.5 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal cursor-pointer shadow-lg"
                >
                  <span>Generate Matches</span>
                  <Beaker className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── STEP 04: RESULTS ──────────────────────────────────────────── */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222] pb-6">
                <div>
                  <span className="text-[10px] font-ibm-plex-mono uppercase tracking-widest text-alkota-orange block mb-1">
                    Diagnostic Outcome
                  </span>
                  <h2 className="text-2xl sm:text-3xl uppercase tracking-tight text-white font-light">
                    Recommended Formulations ({matches.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={resetMatcher}
                  className="inline-flex items-center gap-2 border border-[#333] bg-[#141414] text-[#888] hover:text-white px-4 py-2 text-xs uppercase tracking-widest transition-colors font-normal self-start sm:self-auto"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Restart Matcher</span>
                </button>
              </div>

              {matches.length === 0 ? (
                <div className="p-12 text-center bg-[#141414] border border-[#262626] space-y-4">
                  <AlertTriangle className="h-10 w-10 text-amber-400 mx-auto" />
                  <h3 className="text-xl uppercase text-white font-light">
                    No Direct Automated Recommendation Found
                  </h3>
                  <p className="text-xs text-[#AAA] max-w-lg mx-auto leading-relaxed font-normal">
                    This specific substrate and contamination matrix requires specialist formulation dilution or site testing to prevent metallurgical damage.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contact?subject=Custom%20Chemical%20Advice"
                      className="inline-flex items-center gap-2 bg-alkota-orange text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-normal"
                    >
                      <span>Talk to Alkota Chemical Support</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {matches.map((match, idx) => (
                    <div
                      key={match.product.id}
                      className="bg-[#141414] border border-[#262626] hover:border-alkota-orange p-6 sm:p-8 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#222]">
                        <div className="flex items-center gap-3">
                          <span className="font-ibm-plex-mono text-[10px] uppercase bg-alkota-orange/10 text-alkota-orange px-2.5 py-1 border border-alkota-orange/30">
                            {idx === 0 ? '★ Primary Recommendation' : 'Alternative Formulation'}
                          </span>
                          <span className="font-ibm-plex-mono text-[10px] text-[#777]">
                            Code: {match.product.code}
                          </span>
                        </div>
                        <span className="font-ibm-plex-mono text-xs text-[#888]">
                          pH {match.product.ph_level?.split(' ')[0] || '--'} · {match.product.form}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-8 space-y-4">
                          <h3 className="text-2xl uppercase tracking-tight text-white font-normal">
                            {match.product.name}
                          </h3>
                          <p className="text-xs text-[#AAA] leading-relaxed font-normal">
                            {match.product.description}
                          </p>

                          <div className="p-3.5 bg-black/40 border border-[#222] space-y-2">
                            <span className="block text-[9px] font-ibm-plex-mono uppercase text-alkota-orange">
                              // Engineering Compatibility Rationale
                            </span>
                            <p className="text-xs text-[#CCC] leading-relaxed font-normal">
                              {match.fitReason}
                            </p>
                            {match.surfaceWarning && (
                              <p className="text-xs text-amber-400 font-normal pt-1">
                                {match.surfaceWarning}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-ibm-plex-mono text-[#888] pt-2">
                            <div>
                              <span className="block text-[#555] text-[9px] uppercase">Recommended Dilution</span>
                              <span className="text-white">{match.recommendedDilution}</span>
                            </div>
                            <div>
                              <span className="block text-[#555] text-[9px] uppercase">Biodegradability</span>
                              <span className="text-emerald-400">
                                {match.product.biodegradable ? 'OECD Compliant' : 'Non-Biological'}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[#555] text-[9px] uppercase">UK Compliance</span>
                              <span className="text-white">GB CLP Verified</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Action Column */}
                        <div className="lg:col-span-4 bg-black/60 border border-[#222] p-5 space-y-3 flex flex-col justify-between">
                          <div className="space-y-2">
                            <span className="text-[9px] font-ibm-plex-mono uppercase text-[#666] block">
                              Documentation & Order
                            </span>
                            <a
                              href={match.product.sds_url || '#'}
                              className="w-full flex items-center justify-between p-2 bg-[#1A1A1A] hover:bg-[#222] text-[#CCC] hover:text-white border border-[#333] text-[11px] uppercase transition-colors"
                            >
                              <span>Download SDS</span>
                              <Download className="h-3 w-3 text-alkota-orange" />
                            </a>
                            <a
                              href={match.product.tds_url || '#'}
                              className="w-full flex items-center justify-between p-2 bg-[#1A1A1A] hover:bg-[#222] text-[#CCC] hover:text-white border border-[#333] text-[11px] uppercase transition-colors"
                            >
                              <span>Technical Data</span>
                              <FileText className="h-3 w-3 text-alkota-orange" />
                            </a>
                          </div>

                          <div className="pt-3 border-t border-[#222] space-y-2">
                            <Link
                              href={`/chemicals/${match.product.category}/${match.product.slug}`}
                              className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-2.5 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors font-normal"
                            >
                              <span>Full Product Spec</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                            <Link
                              href={`/contact?subject=Quote%20Request%20for%20${encodeURIComponent(match.product.name)}`}
                              className="w-full flex items-center justify-center gap-2 border border-[#444] text-[#AAA] hover:text-white py-2 text-[10px] uppercase tracking-wider transition-colors font-normal"
                            >
                              <span>Request Bulk Quote</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
