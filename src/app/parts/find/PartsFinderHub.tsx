'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Wrench, 
  Gauge, 
  Flame, 
  Layers, 
  Activity, 
  Target, 
  RotateCcw, 
  ShieldCheck, 
  Filter, 
  Zap, 
  Cpu, 
  Package, 
  Link2, 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  UploadCloud, 
  X, 
  HelpCircle, 
  Phone, 
  Mail, 
  FileText, 
  Sparkles, 
  Check,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import ProductCard from '@/components/parts/ProductCard';
import SafeImage from '@/components/ui/SafeImage';
import { useCart } from '@/context/CartContext';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';
import { Part } from '@/lib/types/parts';

interface CategoryItem {
  slug: string;
  name: string;
  icon_name?: string;
  short_desc?: string;
}

interface MachineFamilyItem {
  id: string;
  slug: string;
  name: string;
  manufacturer?: string;
}

interface MachineModelItem {
  id: string;
  slug: string;
  model_code: string;
  name: string;
  series?: string;
  specs_summary?: string;
  family_id?: string;
  pressure_psi?: number;
  flow_lpm?: number;
}

interface PartsFinderHubProps {
  categories: CategoryItem[];
  machineFamilies: MachineFamilyItem[];
  machineModels: MachineModelItem[];
}

const CATEGORY_ICONS: Record<string, any> = {
  'pumps': Gauge,
  'burners': Flame,
  'coils': Layers,
  'hoses': Activity,
  'trigger-guns': Wrench,
  'lances-nozzles': Target,
  'surface-cleaners': RotateCcw,
  'valves-unloaders': ShieldCheck,
  'filters': Filter,
  'electrical-switches': Zap,
  'seals-o-rings': CheckCircle2,
  'service-kits': Package,
  'fittings-couplers': Link2,
  'engines-motors': Cpu,
  'attachments': Plus,
};

export default function PartsFinderHub({
  categories,
  machineFamilies,
  machineModels,
}: PartsFinderHubProps) {
  const [activeTab, setActiveTab] = useState<'part_number' | 'machine' | 'identify'>('part_number');

  // ─────────────────────────────────────────────────────────────
  // ROUTE 1: PART NUMBER STATE
  // ─────────────────────────────────────────────────────────────
  const [pnQuery, setPnQuery] = useState('');
  const [pnLoading, setPnLoading] = useState(false);
  const [pnResult, setPnResult] = useState<any | null>(null);
  const [pnSearched, setPnSearched] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // ROUTE 2: MACHINE LOOKUP STATE
  // ─────────────────────────────────────────────────────────────
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [machineSearchText, setMachineSearchText] = useState('');
  const [machineCategoryFilter, setMachineCategoryFilter] = useState('all');
  const [machineLoading, setMachineLoading] = useState(false);
  const [machineResult, setMachineResult] = useState<any | null>(null);
  const [showPlateGuide, setShowPlateGuide] = useState(false);

  // ─────────────────────────────────────────────────────────────
  // ROUTE 3: ATTRIBUTE DISCOVERY STATE
  // ─────────────────────────────────────────────────────────────
  const [identStep, setIdentStep] = useState<1 | 2 | 3>(1);
  const [identCategory, setIdentCategory] = useState<string>('');
  const [identAttributes, setIdentAttributes] = useState<Record<string, string>>({});
  const [identMachine, setIdentMachine] = useState<string>('');
  const [identDescription, setIdentDescription] = useState<string>('');
  const [identPhotos, setIdentPhotos] = useState<string[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [identLoading, setIdentLoading] = useState(false);
  const [identResult, setIdentResult] = useState<any | null>(null);

  // ─────────────────────────────────────────────────────────────
  // REQUEST ASSISTANCE MODAL STATE
  // ─────────────────────────────────────────────────────────────
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    customer_name: '',
    company: '',
    email: '',
    phone: '',
    postcode: '',
    machine_model: '',
    serial_number: '',
    notes: '',
    urgency: 'standard',
  });
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Route 1 Handler ──
  async function handlePartNumberSearch(queryToSearch?: string) {
    const q = queryToSearch !== undefined ? queryToSearch : pnQuery;
    if (!q.trim()) return;

    setPnLoading(true);
    setPnSearched(true);
    try {
      const res = await fetch(`/api/parts/finder/search?mode=part_number&q=${encodeURIComponent(q.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setPnResult(data);
      } else {
        setPnResult(null);
      }
    } catch {
      setPnResult(null);
    } finally {
      setPnLoading(false);
    }
  }

  // ── Route 2 Handler ──
  async function handleMachineLookup(modelCode: string) {
    if (!modelCode) return;
    setSelectedModel(modelCode);
    setMachineLoading(true);
    try {
      const catParam = machineCategoryFilter !== 'all' ? `&category=${machineCategoryFilter}` : '';
      const res = await fetch(`/api/parts/finder/search?mode=machine&machine=${encodeURIComponent(modelCode)}${catParam}`);
      if (res.ok) {
        const data = await res.json();
        setMachineResult(data);
      } else {
        setMachineResult(null);
      }
    } catch {
      setMachineResult(null);
    } finally {
      setMachineLoading(false);
    }
  }

  // Re-fetch when category filter changes on selected machine
  useEffect(() => {
    if (selectedModel) {
      handleMachineLookup(selectedModel);
    }
  }, [machineCategoryFilter]);

  // ── Route 3 Handler: Attribute Discovery ──
  async function handleAttributeDiscovery() {
    setIdentLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('mode', 'attributes');
      params.set('category', identCategory);
      if (identMachine) params.set('machineModel', identMachine);
      if (identDescription) params.set('description', identDescription);

      Object.entries(identAttributes).forEach(([k, v]) => {
        if (v) params.set(`attr_${k}`, v);
      });

      const res = await fetch(`/api/parts/finder/search?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setIdentResult(data);
        setIdentStep(3);
      } else {
        setIdentResult(null);
      }
    } catch {
      setIdentResult(null);
    } finally {
      setIdentLoading(false);
    }
  }

  // ── Photo Upload Handler ──
  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/parts/upload', {
        method: 'POST',
        body: fd,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setIdentPhotos(prev => [...prev, data.url]);
        }
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to upload photograph');
      }
    } catch {
      alert('Photo upload failed. Please check network connection.');
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  // ── Part Request Submission ──
  async function handlePartRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRequestSubmitting(true);
    setRequestError(null);
    try {
      const res = await fetch('/api/parts/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...requestForm,
          photo_urls: identPhotos,
          notes: `${requestForm.notes ? requestForm.notes + '\n\n' : ''}Category: ${identCategory || 'Unspecified'}, Attributes: ${JSON.stringify(identAttributes)}, Description: ${identDescription || 'N/A'}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRequestSuccess(data.formatted_ref || data.reference_id);
      } else {
        setRequestError(data.error || 'Failed to submit request');
      }
    } catch {
      setRequestError('Server error while submitting enquiry. Please call our workshop desk directly.');
    } finally {
      setRequestSubmitting(false);
    }
  }

  function openHelpWithContext(context?: { machine?: string; partNumber?: string; notes?: string }) {
    setRequestForm(prev => ({
      ...prev,
      machine_model: context?.machine || selectedModel || identMachine || prev.machine_model,
      notes: context?.notes || (context?.partNumber ? `Part requested: ${context.partNumber}` : prev.notes),
    }));
    setRequestSuccess(null);
    setRequestError(null);
    setRequestModalOpen(true);
  }

  const filteredModels = machineModels.filter(m => {
    if (selectedFamily !== 'all') {
      const family = machineFamilies.find(f => f.slug === selectedFamily);
      if (family && m.family_id && m.family_id !== family.id) return false;
    }
    if (machineSearchText) {
      const st = machineSearchText.toLowerCase();
      return (
        m.model_code.toLowerCase().includes(st) ||
        m.name.toLowerCase().includes(st) ||
        (m.series && m.series.toLowerCase().includes(st))
      );
    }
    return true;
  });

  return (
    <div className="w-full">
      {/* ── HERO SECTION (Dark Editorial) ── */}
      <section className="bg-[#0A0A0A] text-white pt-28 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#222]">
        <div className="max-w-6xl mx-auto text-center sm:text-left">
          <div className="inline-flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange mb-3">
            <span className="w-2 h-2 rounded-full bg-alkota-orange animate-pulse" />
            // Alkota UK Technical Parts Finder
          </div>
          <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white mb-3">
            Find the <span className="text-alkota-orange font-light italic">Right Part.</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-[#AAA] max-w-2xl leading-relaxed mb-8">
            Identify exact OEM replacement components, high-pressure pumps, burners, heating coils, and attachments for your machine — even without a part number.
          </p>

          {/* ── 3 CLEAR ROUTE SELECTOR TABS ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
            <button
              type="button"
              onClick={() => setActiveTab('part_number')}
              className={`p-4 text-left border transition-all rounded-[4px] flex flex-col justify-between ${
                activeTab === 'part_number'
                  ? 'bg-white text-alkota-black border-white shadow-lg'
                  : 'bg-[#141414] text-[#CCC] border-[#2A2A2A] hover:border-alkota-orange hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                  Route 01
                </span>
                <Search className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-medium text-sm">I Know the Part Number</span>
                <span className="block text-xs text-[#888] font-light mt-0.5">
                  Instant lookup for MPN, SKU, or stamped casting
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('machine')}
              className={`p-4 text-left border transition-all rounded-[4px] flex flex-col justify-between ${
                activeTab === 'machine'
                  ? 'bg-white text-alkota-black border-white shadow-lg'
                  : 'bg-[#141414] text-[#CCC] border-[#2A2A2A] hover:border-alkota-orange hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                  Route 02
                </span>
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-medium text-sm">I Know My Machine</span>
                <span className="block text-xs text-[#888] font-light mt-0.5">
                  Select your Alkota model for verified fitments
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('identify')}
              className={`p-4 text-left border transition-all rounded-[4px] flex flex-col justify-between ${
                activeTab === 'identify'
                  ? 'bg-white text-alkota-black border-white shadow-lg'
                  : 'bg-[#141414] text-[#CCC] border-[#2A2A2A] hover:border-alkota-orange hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">
                  Route 03
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-medium text-sm">Help Me Identify It</span>
                <span className="block text-xs text-[#888] font-light mt-0.5">
                  Diagnostic attribute wizard & photo matching
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ROUTE 1: PART NUMBER SEARCH                                 */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'part_number' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white border border-[#E8E6DF] p-6 sm:p-8 rounded-[6px] shadow-sm">
              <div className="max-w-2xl">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                  // Fast Identifier Matcher
                </span>
                <h2 className="text-2xl font-light text-alkota-black tracking-tight mb-2">
                  Enter Your Part Number or Stamped Reference
                </h2>
                <p className="text-xs text-[#666] font-light leading-relaxed mb-6">
                  Enter an OEM part number, supplier reference (Dual Pumps, Mosmatic, Beckett, General Pump), or stamped casting code. Our engine automatically normalises spacing, hyphens, and case differences.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePartNumberSearch();
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                    <input
                      type="text"
                      value={pnQuery}
                      onChange={(e) => setPnQuery(e.target.value)}
                      placeholder="e.g. 20-001, N07-00006, REEL-GAS0291, 30-101..."
                      className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#DDD9D0] text-sm text-alkota-black rounded-[4px] focus:outline-none focus:border-alkota-orange focus:bg-white font-ibm-plex-mono transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={pnLoading || !pnQuery.trim()}
                    className="px-6 py-3 bg-alkota-orange hover:bg-black text-white text-xs font-ibm-plex-mono uppercase tracking-widest rounded-[4px] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
                  >
                    {pnLoading ? 'Searching...' : 'Find Part'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Helpful Examples */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#888]">
                  <span>Try examples:</span>
                  {['20-001', '20-001-LEGACY', '30-101', 'DP-BM25-STD', 'C03-00561'].map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => {
                        setPnQuery(ex);
                        handlePartNumberSearch(ex);
                      }}
                      className="font-ibm-plex-mono text-alkota-black hover:text-alkota-orange underline underline-offset-2"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS VIEW */}
            {pnSearched && (
              <div className="space-y-6">
                {/* ── SUPERSESSION ALERT BANNER ── */}
                {pnResult?.is_superseded && (
                  <div className="bg-[#FFF8F0] border-2 border-alkota-orange p-6 rounded-[6px] shadow-sm">
                    <div className="flex items-start gap-3.5">
                      <AlertTriangle className="w-6 h-6 text-alkota-orange shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest bg-alkota-orange text-white px-2 py-0.5 rounded-sm">
                            Superseded Part Notice
                          </span>
                          <span className="text-xs font-ibm-plex-mono text-[#666]">
                            Original Part #{pnResult.part?.part_number}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-alkota-black mt-2 mb-1">
                          This part number has been superseded by the manufacturer.
                        </h3>
                        <p className="text-xs text-[#555] leading-relaxed mb-4">
                          {pnResult.supersession_notice || 'The original component is discontinued. Alkota engineering has confirmed a direct verified replacement.'}
                        </p>

                        {/* REPLACEMENT CARD */}
                        {pnResult.superseded_by_part && (
                          <div className="bg-white border border-[#E8E6DF] p-4 rounded-[6px] max-w-lg flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 bg-[#FAF9F5] border border-[#EEE] rounded p-1 relative shrink-0">
                                {pnResult.superseded_by_part.image_url ? (
                                  <SafeImage
                                    src={pnResult.superseded_by_part.image_url}
                                    alt={pnResult.superseded_by_part.name}
                                    fill
                                    className="object-contain"
                                  />
                                ) : (
                                  <Wrench className="w-6 h-6 text-[#BBB] m-auto mt-3" />
                                )}
                              </div>
                              <div>
                                <span className="font-ibm-plex-mono text-[10px] text-green-700 font-bold uppercase block">
                                  ✓ Direct Replacement Part
                                </span>
                                <span className="font-ibm-plex-mono text-xs text-alkota-orange block">
                                  {pnResult.superseded_by_part.part_number}
                                </span>
                                <span className="text-xs font-medium text-alkota-black line-clamp-1">
                                  {pnResult.superseded_by_part.name}
                                </span>
                              </div>
                            </div>
                            <Link
                              href={`/parts-attachments/product/${pnResult.superseded_by_part.slug}`}
                              className="px-4 py-2 bg-alkota-orange text-white text-xs font-ibm-plex-mono uppercase tracking-wider rounded hover:bg-black transition-colors shrink-0"
                            >
                              View Replacement →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── EXACT MATCH CARD ── */}
                {pnResult?.part && !pnResult.is_superseded && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="font-ibm-plex-mono text-xs uppercase tracking-widest text-green-700 font-bold">
                          {pnResult.matchType === 'exact_mpn' && 'Exact MPN Match'}
                          {pnResult.matchType === 'exact_sku' && 'Exact SKU Match'}
                          {pnResult.matchType === 'exact_part_number' && 'Exact Part Number Match'}
                          {pnResult.matchType === 'normalised_match' && 'Normalised Part Match'}
                          {pnResult.matchType === 'close_match' && 'Close Catalogue Match'}
                        </span>
                      </div>
                      <span className="text-xs text-[#888] font-ibm-plex-mono">
                        Catalogue Ref: {pnResult.part.part_number}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <ProductCard part={pnResult.part} />
                      </div>
                      <div className="md:col-span-2 bg-white border border-[#E8E6DF] p-6 rounded-[6px] flex flex-col justify-between">
                        <div>
                          <span className="font-ibm-plex-mono text-[10px] uppercase text-alkota-orange tracking-widest block mb-1">
                            // Stamped Verification
                          </span>
                          <h3 className="text-xl font-light text-alkota-black mb-2">
                            {pnResult.part.name}
                          </h3>
                          <p className="text-xs text-[#666] leading-relaxed mb-4">
                            {pnResult.part.description || 'Genuine factory component sourced and certified for Alkota high-pressure systems.'}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
                            <div className="p-2.5 bg-[#FAF9F5] border border-[#EEE] rounded">
                              <span className="block text-[10px] text-[#888] uppercase font-ibm-plex-mono">Manufacturer</span>
                              <span className="font-medium text-alkota-black">{pnResult.part.manufacturer || 'Alkota OEM'}</span>
                            </div>
                            <div className="p-2.5 bg-[#FAF9F5] border border-[#EEE] rounded">
                              <span className="block text-[10px] text-[#888] uppercase font-ibm-plex-mono">Category</span>
                              <span className="font-medium text-alkota-black">{pnResult.part.category}</span>
                            </div>
                            <div className="p-2.5 bg-[#FAF9F5] border border-[#EEE] rounded">
                              <span className="block text-[10px] text-[#888] uppercase font-ibm-plex-mono">Availability</span>
                              <span className="font-medium text-green-700">
                                {pnResult.part.in_stock ? 'In Stock (UK Despatch)' : 'Special Order'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#EEE] flex items-center justify-between">
                          <Link
                            href={`/parts-attachments/product/${pnResult.part.slug}`}
                            className="text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:text-black flex items-center gap-1.5"
                          >
                            View Technical Specifications & Manuals
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ALTERNATIVES / SIMILAR CANDIDATES ── */}
                {pnResult?.alternatives && pnResult.alternatives.length > 0 && (
                  <div className="pt-6 border-t border-[#E8E6DF]">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block mb-3">
                      // Close Catalogue Matches & Associated Parts ({pnResult.alternatives.length})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {pnResult.alternatives.map((alt: Part) => (
                        <ProductCard key={alt.id} part={alt} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── NO RESULTS / FALLBACK ASSISTANCE ── */}
                {pnResult?.confidence === 'NO_MATCH' && (
                  <div className="bg-white border border-[#E8E6DF] p-8 rounded-[6px] text-center max-w-xl mx-auto">
                    <div className="w-12 h-12 rounded-full bg-[#FAF9F5] border border-[#DDD] flex items-center justify-center mx-auto mb-3">
                      <HelpCircle className="w-6 h-6 text-[#888]" />
                    </div>
                    <h3 className="text-xl font-light text-alkota-black mb-2">
                      We couldn't find a verified match for "{pnQuery}"
                    </h3>
                    <p className="text-xs text-[#666] leading-relaxed mb-6">
                      Our live database contains 2,560+ parts, but older stamped numbers or supplier references may require factory cross-referencing. Our UK workshop team will identify it for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        type="button"
                        onClick={() => openHelpWithContext({ partNumber: pnQuery })}
                        className="px-6 py-3 bg-alkota-orange hover:bg-black text-white text-xs font-ibm-plex-mono uppercase tracking-widest rounded transition-all"
                      >
                        Request Identification Assistance
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPnQuery('');
                          setPnResult(null);
                          setPnSearched(false);
                        }}
                        className="px-6 py-3 bg-[#FAF9F5] hover:bg-[#E8E6DF] text-alkota-black text-xs font-ibm-plex-mono uppercase tracking-widest rounded transition-all"
                      >
                        Search Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ROUTE 2: MACHINE LOOKUP                                     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'machine' && (
          <div className="space-y-8 animate-fadeIn">
            {/* STEP-BY-STEP MACHINE SELECTOR */}
            <div className="bg-white border border-[#E8E6DF] p-6 sm:p-8 rounded-[6px] shadow-sm">
              <div className="max-w-3xl">
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                  // Route 02: Model-Verified Fitment
                </span>
                <h2 className="text-2xl font-light text-alkota-black tracking-tight mb-2">
                  Select Your Alkota Machine
                </h2>
                <p className="text-xs text-[#666] font-light leading-relaxed mb-6">
                  Only parts with a confirmed, engineering-verified relationship will be returned. General accessories are clearly distinguished from factory fitments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Family Filter */}
                  <div>
                    <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-1.5">
                      1. Machine Family
                    </label>
                    <select
                      value={selectedFamily}
                      onChange={(e) => {
                        setSelectedFamily(e.target.value);
                        setSelectedModel('');
                        setMachineResult(null);
                      }}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-[#DDD9D0] text-xs text-alkota-black rounded font-sans focus:outline-none focus:border-alkota-orange"
                    >
                      <option value="all">All Series (13 Families)</option>
                      {machineFamilies.map((f) => (
                        <option key={f.id} value={f.slug}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model Selector */}
                  <div className="sm:col-span-2">
                    <label className="block font-ibm-plex-mono text-[10px] uppercase tracking-wider text-[#666] mb-1.5">
                      2. Exact Model ({filteredModels.length} Available)
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => {
                        if (e.target.value) {
                          handleMachineLookup(e.target.value);
                        }
                      }}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-[#DDD9D0] text-xs text-alkota-black rounded font-sans focus:outline-none focus:border-alkota-orange font-medium"
                    >
                      <option value="">Select your model...</option>
                      {filteredModels.map((m) => (
                        <option key={m.id} value={m.model_code}>
                          {m.name} ({m.model_code}) — {m.specs_summary || m.series}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Quick Model Text Search / Help */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EEE]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#888]">Or type model code:</span>
                    <input
                      type="text"
                      value={machineSearchText}
                      onChange={(e) => setMachineSearchText(e.target.value)}
                      placeholder="e.g. 420AX4, 4305..."
                      className="px-3 py-1.5 bg-[#FAF9F5] border border-[#DDD9D0] text-xs rounded font-ibm-plex-mono w-40 focus:outline-none focus:border-alkota-orange"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPlateGuide(!showPlateGuide)}
                    className="text-xs font-ibm-plex-mono text-alkota-orange hover:text-black flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Where to find your machine plate & model number?
                  </button>
                </div>

                {/* Machine Identification Plate Guidance */}
                {showPlateGuide && (
                  <div className="mt-4 p-4 bg-[#F5F4F0] border border-[#E0DED7] rounded-[4px] text-xs text-[#555] space-y-2 animate-fadeIn">
                    <span className="font-bold text-alkota-black block">
                      Locating your Alkota Machine Data Plate:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                      <li>
                        <strong>Electric Washers (AX4 / 200 / 300 / 4000 Series):</strong> Riveted aluminum plate on the side of the main electrical box, or stamped on the chassis frame near the burner base.
                      </li>
                      <li>
                        <strong>Engine-Driven Mobile Units:</strong> Identification tag stamped into the steel crossmember directly below the front bumper or hose rack.
                      </li>
                      <li>
                        <strong>Parts Washers:</strong> Riveted data plate located on the right exterior wall beside the main heating dial.
                      </li>
                    </ul>
                    <span className="text-[10px] text-[#777] italic block pt-1">
                      Note: The serial number is not mandatory for general parts discovery, but guarantees 100% precision for manufacturing production splits.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* MACHINE FITMENT RESULTS */}
            {machineLoading && (
              <div className="py-12 text-center font-ibm-plex-mono text-xs text-[#888]">
                Loading verified machine components & compatibility relationships...
              </div>
            )}

            {!machineLoading && machineResult?.machine && (
              <div className="space-y-8 animate-fadeIn">
                {/* ── MACHINE HERO CARD ── */}
                <div className="bg-[#111] text-white p-6 sm:p-8 rounded-[6px] border border-[#333] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      // Verified Machine Context
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white mb-2">
                      {machineResult.machine.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#AAA] font-mono">
                      <span>Model Code: <strong className="text-white">{machineResult.machine.model_code}</strong></span>
                      <span>·</span>
                      <span>Series: <strong className="text-white">{machineResult.machine.series || 'Alkota Heavy Duty'}</strong></span>
                      {machineResult.machine.specs_summary && (
                        <>
                          <span>·</span>
                          <span className="text-alkota-orange">{machineResult.machine.specs_summary}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-ibm-plex-mono text-xs text-green-400 bg-green-950/60 border border-green-800/60 px-3 py-1.5 rounded flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {machineResult.totalCompatibleCount} Verified Spares
                    </span>
                    <button
                      type="button"
                      onClick={() => openHelpWithContext({ machine: machineResult.machine.model_code })}
                      className="px-4 py-1.5 bg-[#222] hover:bg-alkota-orange text-white text-xs font-ibm-plex-mono uppercase tracking-wider rounded border border-[#444] transition-colors"
                    >
                      Request Workshop Sourcing
                    </button>
                  </div>
                </div>

                {/* ── CATEGORY FILTER STRIP ── */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E8E6DF]">
                  <span className="text-xs font-ibm-plex-mono text-[#888] shrink-0 uppercase tracking-wider">
                    Filter by:
                  </span>
                  {[
                    { slug: 'all', label: 'All Compatible' },
                    { slug: 'pumps', label: 'Pumps & Wet Ends' },
                    { slug: 'burners', label: 'Burners & Ignition' },
                    { slug: 'coils', label: 'Heating Coils' },
                    { slug: 'hoses', label: 'Hoses & Reels' },
                    { slug: 'trigger-guns', label: 'Guns & Wands' },
                    { slug: 'valves-unloaders', label: 'Valves & Unloaders' },
                    { slug: 'service-kits', label: 'Service Kits' },
                  ].map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setMachineCategoryFilter(cat.slug)}
                      className={`px-3 py-1 text-xs font-ibm-plex-mono uppercase tracking-wider rounded-full transition-all shrink-0 ${
                        machineCategoryFilter === cat.slug
                          ? 'bg-alkota-black text-white'
                          : 'bg-[#FAF9F5] border border-[#DDD] text-[#666] hover:text-black'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* ── SECTION 1: CONFIRMED COMPATIBLE PARTS (Domain: COMPATIBILITY) ── */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-green-700 font-bold block">
                        // Domain: Physical Engineering Compatibility
                      </span>
                      <h4 className="text-lg font-light text-alkota-black">
                        OEM Compatible Replacement Parts ({machineResult.compatibleParts.length})
                      </h4>
                    </div>
                  </div>

                  {machineResult.compatibleParts.length === 0 ? (
                    <div className="bg-white border border-[#E8E6DF] p-8 rounded text-center text-xs text-[#777]">
                      No parts in this category are currently indexed for model {machineResult.machine.model_code}.
                      <br />
                      <button
                        type="button"
                        onClick={() => openHelpWithContext({ machine: machineResult.machine.model_code })}
                        className="mt-3 text-alkota-orange underline font-ibm-plex-mono"
                      >
                        Ask Workshop Support to quote parts for this model →
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {machineResult.compatibleParts.map((part: any) => (
                        <div key={part.id} className="relative flex flex-col">
                          <ProductCard part={part} />
                          {/* Verifiable Evidence Citation Badge */}
                          <div className="mt-1.5 px-2 py-1 bg-[#F0F7F0] border border-[#D4EAD4] rounded text-[10px] text-green-900 font-ibm-plex-mono leading-tight">
                            <span className="font-bold block">✓ Verified Fitment</span>
                            <span className="text-[9px] text-[#4A724A] line-clamp-1">
                              {part.compatibility_evidence || `Fitment verified for ${machineResult.machine.model_code}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── SECTION 2: SERVICE KITS ── */}
                {machineResult.serviceKits && machineResult.serviceKits.length > 0 && (
                  <div className="pt-6 border-t border-[#E8E6DF]">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      // Routine Maintenance
                    </span>
                    <h4 className="text-lg font-light text-alkota-black mb-4">
                      Factory Scheduled Service Kits for {machineResult.machine.model_code}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {machineResult.serviceKits.map((kit: any) => (
                        <div key={kit.id} className="bg-white border border-[#E8E6DF] p-4 rounded-[6px] flex flex-col justify-between">
                          <div>
                            <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase">
                              Kit #{kit.kit_number}
                            </span>
                            <h5 className="font-medium text-sm text-alkota-black mt-1 mb-1">{kit.name}</h5>
                            <p className="text-xs text-[#666] leading-relaxed mb-3">
                              {kit.service_purpose || 'Comprehensive rebuild kit containing all consumables and high-wear components.'}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-[#EEE] flex items-center justify-between">
                            <span className="font-ibm-plex-mono text-sm font-semibold text-alkota-black">
                              {kit.price ? `£${Number(kit.price).toFixed(2)}` : 'POA'}
                            </span>
                            <Link
                              href={`/parts-attachments/product/${kit.slug}`}
                              className="text-xs font-ibm-plex-mono text-alkota-orange hover:text-black uppercase"
                            >
                              View Kit →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── SECTION 3: RECOMMENDED ACCESSORIES (Domain: GENERAL) ── */}
                {machineResult.accessories && machineResult.accessories.length > 0 && (
                  <div className="pt-6 border-t border-[#E8E6DF]">
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#777] block mb-1">
                      // Merchandising & Attachments (Domain: General Discovery)
                    </span>
                    <h4 className="text-lg font-light text-alkota-black mb-1">
                      Recommended Tooling & Accessories
                    </h4>
                    <p className="text-xs text-[#777] mb-4">
                      Commercial recommendations designed to complement your washing setup. (Check operating envelope before purchasing).
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {machineResult.accessories.map((acc: any) => (
                        <div key={acc.id} className="bg-[#FAF9F5] border border-[#E8E6DF] p-4 rounded-[4px] flex flex-col justify-between">
                          <div>
                            <span className="font-ibm-plex-mono text-[9px] uppercase text-[#888] block mb-1">
                              Recommended Attachment
                            </span>
                            <h6 className="text-xs font-medium text-alkota-black mb-1">{acc.title}</h6>
                            <p className="text-[11px] text-[#666] leading-relaxed mb-3 line-clamp-2">
                              {acc.notes}
                            </p>
                          </div>
                          <Link
                            href={acc.href}
                            className="text-xs font-ibm-plex-mono text-alkota-orange hover:text-black uppercase flex items-center gap-1"
                          >
                            Explore Accessory <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* ROUTE 3: STEP-BY-STEP IDENTIFIER & PHOTO ASSISTANT         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeTab === 'identify' && (
          <div className="space-y-8 animate-fadeIn">
            {/* STEP PROGRESS BAR */}
            <div className="flex items-center justify-between text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] mb-2">
              <span>Diagnostic Step {identStep} of 3</span>
              <span>
                {identStep === 1 && '1. Choose Component Group'}
                {identStep === 2 && '2. Specify Characteristics'}
                {identStep === 3 && '3. Candidate Matches'}
              </span>
            </div>
            <div className="w-full bg-[#E8E8E4] h-1.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-alkota-orange h-full transition-all duration-300"
                style={{ width: `${(identStep / 3) * 100}%` }}
              />
            </div>

            {/* STEP 1: CATEGORY SELECTION */}
            {identStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-[#E8E8E4] pb-4">
                  <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                    // Step 01
                  </span>
                  <h2 className="text-2xl font-light tracking-tight text-alkota-black">
                    What type of part or component are you looking for?
                  </h2>
                  <p className="text-xs text-[#666] font-light mt-1">
                    Select the primary equipment category you are repairing or maintaining.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map((cat) => {
                    const Icon = CATEGORY_ICONS[cat.slug] || Wrench;
                    const isSelected = identCategory === cat.slug;

                    return (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => {
                          setIdentCategory(cat.slug);
                          setIdentStep(2);
                        }}
                        className={`p-4 text-left border rounded-[4px] transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-alkota-black border-[#E8E6DF] hover:border-alkota-orange hover:shadow-sm'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-3 ${isSelected ? 'text-alkota-orange' : 'text-[#777]'}`} />
                        <div>
                          <span className="block font-medium text-xs sm:text-sm">{cat.name}</span>
                          {cat.short_desc && (
                            <span className={`block text-[11px] font-light mt-0.5 line-clamp-2 ${isSelected ? 'text-[#AAA]' : 'text-[#777]'}`}>
                              {cat.short_desc}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: DYNAMIC ATTRIBUTES & PHOTO ASSISTANT */}
            {identStep === 2 && (
              <div className="bg-white border border-[#E8E6DF] p-6 sm:p-8 rounded-[6px] shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#EEE] pb-4">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      // Step 02: Progressive Questions
                    </span>
                    <h3 className="text-xl font-light text-alkota-black">
                      Specify details for {categories.find(c => c.slug === identCategory)?.name || identCategory}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIdentStep(1)}
                    className="text-xs font-ibm-plex-mono text-[#777] hover:text-black flex items-center gap-1"
                  >
                    ← Change Category
                  </button>
                </div>

                {/* TAILORED QUESTIONS BY CATEGORY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hoses */}
                  {identCategory === 'hoses' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-alkota-black mb-1">Hose Internal Diameter</label>
                        <select
                          value={identAttributes.hose_size || ''}
                          onChange={(e) => setIdentAttributes(prev => ({ ...prev, hose_size: e.target.value }))}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                        >
                          <option value="">Any / Not Sure</option>
                          <option value="1/4">1/4" (Compact / Light Duty)</option>
                          <option value="3/8">3/8" (Standard Commercial — Most Common)</option>
                          <option value="1/2">1/2" (High Volume Industrial)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-alkota-black mb-1">Hose Length</label>
                        <select
                          value={identAttributes.hose_length || ''}
                          onChange={(e) => setIdentAttributes(prev => ({ ...prev, hose_length: e.target.value }))}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                        >
                          <option value="">Any Length</option>
                          <option value="10m">10 Metres</option>
                          <option value="15m">15 Metres (Standard)</option>
                          <option value="20m">20 Metres</option>
                          <option value="30m">30 Metres</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Pumps */}
                  {identCategory === 'pumps' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-alkota-black mb-1">Pump Brand (if known)</label>
                        <select
                          value={identAttributes.pump_brand || ''}
                          onChange={(e) => setIdentAttributes(prev => ({ ...prev, pump_brand: e.target.value }))}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                        >
                          <option value="">Any / Not Sure</option>
                          <option value="General Pump">General Pump (Interpump Group)</option>
                          <option value="Cat Pumps">CAT Pumps</option>
                          <option value="AR">AR (Annovi Reverberi)</option>
                          <option value="Giant">Giant Pumps</option>
                          <option value="Alkota OEM">Alkota Genuine Triplex</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-alkota-black mb-1">Drive Configuration</label>
                        <select
                          value={identAttributes.drive_type || ''}
                          onChange={(e) => setIdentAttributes(prev => ({ ...prev, drive_type: e.target.value }))}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                        >
                          <option value="">Any Configuration</option>
                          <option value="Belt Drive">Belt Drive (Pulley on shaft)</option>
                          <option value="Direct Drive">Direct Drive (Gearbox or flange)</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Nozzles */}
                  {identCategory === 'lances-nozzles' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-alkota-black mb-1">Nozzle Pattern / Tip Style</label>
                        <select
                          value={identAttributes.nozzle_type || ''}
                          onChange={(e) => setIdentAttributes(prev => ({ ...prev, nozzle_type: e.target.value }))}
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                        >
                          <option value="">Any Type</option>
                          <option value="15deg">15° Yellow (Chisel / Stripping)</option>
                          <option value="25deg">25° Green (General High-Pressure Wash)</option>
                          <option value="40deg">40° White (Wide Sweep / Vehicle Rinse)</option>
                          <option value="Turbo">Rotating Turbo / Blaster Nozzle</option>
                          <option value="Steam">Steam Blasting Jet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-alkota-black mb-1">Orifice Size (e.g. 04, 045, 05)</label>
                        <input
                          type="text"
                          value={identAttributes.orifice || ''}
                          onChange={(e) => setIdentAttributes(prev => ({ ...prev, orifice: e.target.value }))}
                          placeholder="e.g. 04 or 045"
                          className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded font-ibm-plex-mono"
                        />
                      </div>
                    </>
                  )}

                  {/* Machine Model Context */}
                  <div>
                    <label className="block text-xs font-medium text-alkota-black mb-1">
                      Machine Model (Optional, recommended)
                    </label>
                    <input
                      type="text"
                      value={identMachine}
                      onChange={(e) => setIdentMachine(e.target.value)}
                      placeholder="e.g. 420AX4, 4305, 216X4..."
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded font-ibm-plex-mono"
                    />
                  </div>

                  {/* Free Text Description (Search Aid) */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-alkota-black mb-1">
                      Describe the Part in Your Own Words
                    </label>
                    <textarea
                      rows={2}
                      value={identDescription}
                      onChange={(e) => setIdentDescription(e.target.value)}
                      placeholder='e.g. "Black high pressure bypass unloader valve mounted directly onto the cylinder head" or "black 15m hose split at the gun swivel"'
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded font-sans leading-relaxed"
                    />
                    <span className="text-[10px] text-[#777] block mt-1">
                      Note: Your description serves as an algorithmic search aid across known parts and manual schematics.
                    </span>
                  </div>
                </div>

                {/* PHOTO UPLOAD ASSISTANT */}
                <div className="pt-4 border-t border-[#EEE]">
                  <span className="block text-xs font-medium text-alkota-black mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-alkota-orange" />
                    Attach Photograph of Machine Plate or Old Part (Optional)
                  </span>
                  <p className="text-[11px] text-[#666] leading-relaxed mb-3">
                    A photo helps our workshop engineers visually confirm dimensions, thread pitch, and serial numbers. (JPG, PNG, WEBP up to 5MB).
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingPhoto}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-[#FAF9F5] border border-[#DDD] hover:border-alkota-orange text-xs text-alkota-black font-ibm-plex-mono uppercase tracking-wider rounded flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      {uploadingPhoto ? 'Uploading...' : 'Choose / Snap Photo'}
                    </button>

                    {identPhotos.map((url, idx) => (
                      <div key={idx} className="relative w-12 h-12 border border-[#DDD] rounded overflow-hidden">
                        <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setIdentPhotos(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0 right-0 bg-black/70 text-white p-0.5 rounded-bl"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-[#EEE] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIdentStep(1)}
                    className="text-xs font-ibm-plex-mono text-[#777] hover:text-black"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={identLoading}
                    onClick={handleAttributeDiscovery}
                    className="px-6 py-3 bg-alkota-orange hover:bg-black text-white text-xs font-ibm-plex-mono uppercase tracking-widest rounded transition-all flex items-center gap-2"
                  >
                    {identLoading ? 'Searching Catalogue...' : 'Scan Verified Matches'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CANDIDATE RESULTS & VERIFICATION CALLOUT */}
            {identStep === 3 && identResult && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E6DF] pb-4">
                  <div>
                    <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                      // Step 03: Ranked Candidate Products
                    </span>
                    <h3 className="text-xl font-light text-alkota-black">
                      We Found {identResult.totalMatches} Potential Match{identResult.totalMatches === 1 ? '' : 'es'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIdentStep(2)}
                      className="px-3 py-1.5 border border-[#DDD] bg-white text-xs font-ibm-plex-mono uppercase tracking-wider rounded text-[#666] hover:text-black"
                    >
                      Adjust Specs
                    </button>
                    <button
                      type="button"
                      onClick={() => openHelpWithContext({ notes: `Uncertain about matches for category: ${identCategory}` })}
                      className="px-4 py-1.5 bg-black hover:bg-alkota-orange text-white text-xs font-ibm-plex-mono uppercase tracking-wider rounded transition-colors"
                    >
                      Verify with Engineer
                    </button>
                  </div>
                </div>

                {/* Results Grid with Confidence Badges */}
                {identResult.candidates.length === 0 ? (
                  <div className="bg-white border border-[#E8E6DF] p-8 rounded text-center max-w-lg mx-auto">
                    <h4 className="text-lg font-light text-alkota-black mb-2">
                      No Verified Matches for Your Specified Criteria
                    </h4>
                    <p className="text-xs text-[#666] mb-6">
                      Our catalogue didn't find an exact attribute combination. Rather than guessing, our UK workshop desk will check the factory build sheet.
                    </p>
                    <button
                      type="button"
                      onClick={() => openHelpWithContext({ notes: `No match in ${identCategory} with specs: ${JSON.stringify(identAttributes)}` })}
                      className="px-6 py-3 bg-alkota-orange text-white text-xs font-ibm-plex-mono uppercase tracking-widest rounded"
                    >
                      Submit Part Identification Request
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {identResult.candidates.map((cand: any) => (
                      <div key={cand.part.id} className="relative flex flex-col">
                        <ProductCard part={cand.part} />

                        {/* Match Confidence & Verification Pill */}
                        <div className={`mt-2 p-2.5 rounded border text-xs ${
                          cand.confidence === 'EXACT_MATCH'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : cand.confidence === 'STRONG_MATCH'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}>
                          <div className="flex items-center justify-between font-ibm-plex-mono text-[10px] uppercase font-bold mb-1">
                            <span>
                              {cand.confidence === 'EXACT_MATCH' && '✓ Exact Match'}
                              {cand.confidence === 'STRONG_MATCH' && '● Strong Match'}
                              {cand.confidence === 'POSSIBLE_MATCH' && '⚠ Possible Match'}
                            </span>
                            <span>Score: {cand.score}</span>
                          </div>

                          {cand.verification_warning ? (
                            <p className="text-[11px] leading-snug text-amber-800 font-medium">
                              {cand.verification_warning}
                            </p>
                          ) : (
                            <ul className="text-[10px] space-y-0.5 text-[#555]">
                              {cand.match_reasons.slice(0, 2).map((r: string, idx: number) => (
                                <li key={idx}>• {r}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* PART IDENTIFICATION REQUEST MODAL (Sourcing Desk CRM)       */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#DDD] max-w-lg w-full rounded-[6px] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setRequestModalOpen(false)}
              className="absolute top-4 right-4 text-[#888] hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {requestSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto text-green-700">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-alkota-black">
                  Request Logged Successfully
                </h3>
                <div className="p-3 bg-[#FAF9F5] border border-[#DDD] rounded font-ibm-plex-mono text-xs text-[#555]">
                  Reference ID: <strong className="text-alkota-orange text-sm">{requestSuccess}</strong>
                </div>
                <p className="text-xs text-[#666] leading-relaxed">
                  Our UK workshop parts desk will cross-reference your machine model, photos, and requirements against factory schematics. We will respond with pricing and availability within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="px-6 py-2.5 bg-black text-white text-xs font-ibm-plex-mono uppercase tracking-widest rounded hover:bg-alkota-orange transition-colors"
                >
                  Return to Catalogue
                </button>
              </div>
            ) : (
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                  // Workshop Sourcing Desk
                </span>
                <h3 className="text-xl font-light text-alkota-black mb-1">
                  Part Identification Request
                </h3>
                <p className="text-xs text-[#666] leading-relaxed mb-6">
                  Can't confirm the exact part? Send your machine details and photos. Our technicians will inspect the factory manuals and quote the correct component.
                </p>

                {requestError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                    {requestError}
                  </div>
                )}

                <form onSubmit={handlePartRequestSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-alkota-black mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={requestForm.customer_name}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, customer_name: e.target.value }))}
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-alkota-black mb-1">Company (optional)</label>
                      <input
                        type="text"
                        value={requestForm.company}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-alkota-black mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={requestForm.email}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-alkota-black mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={requestForm.phone}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-alkota-black mb-1">Machine Model Code</label>
                      <input
                        type="text"
                        value={requestForm.machine_model}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, machine_model: e.target.value }))}
                        placeholder="e.g. 420AX4 or unknown"
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded font-ibm-plex-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-alkota-black mb-1">Serial Number (from plate)</label>
                      <input
                        type="text"
                        value={requestForm.serial_number}
                        onChange={(e) => setRequestForm(prev => ({ ...prev, serial_number: e.target.value }))}
                        placeholder="e.g. 89402"
                        className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded font-ibm-plex-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-alkota-black mb-1">Notes / Description of Problem</label>
                    <textarea
                      rows={3}
                      value={requestForm.notes}
                      onChange={(e) => setRequestForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Describe which part has failed or what symptoms you are observing..."
                      className="w-full p-2.5 bg-[#FAF9F5] border border-[#DDD] text-xs rounded"
                    />
                  </div>

                  {identPhotos.length > 0 && (
                    <div className="p-3 bg-[#FAF9F5] border border-[#DDD] rounded text-xs">
                      <span className="font-bold text-alkota-black block mb-1">
                        Attached Photos ({identPhotos.length}):
                      </span>
                      <div className="flex gap-2">
                        {identPhotos.map((url, i) => (
                          <div key={i} className="w-10 h-10 border rounded overflow-hidden">
                            <img src={url} alt="Attached" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#EEE] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setRequestModalOpen(false)}
                      className="px-4 py-2 text-xs font-ibm-plex-mono uppercase text-[#777] hover:text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={requestSubmitting}
                      className="px-6 py-2.5 bg-alkota-orange hover:bg-black text-white text-xs font-ibm-plex-mono uppercase tracking-widest rounded transition-all disabled:opacity-50"
                    >
                      {requestSubmitting ? 'Logging Request...' : 'Submit to Workshop Desk'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
