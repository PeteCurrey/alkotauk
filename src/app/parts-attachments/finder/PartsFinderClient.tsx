'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  Wrench, 
  Gauge, 
  Activity, 
  Flame, 
  RotateCcw, 
  Target, 
  Link2, 
  Zap, 
  Cpu, 
  Filter, 
  Package,
  ShieldCheck,
  Send,
  AlertCircle,
  Camera
} from 'lucide-react';
import ProductCard from '@/components/parts/ProductCard';
import { Part } from '@/lib/types/parts';

const COMPONENT_TYPES = [
  { id: 'pumps', label: 'Pumps & Pump Spares', icon: Gauge, desc: 'Complete triplex pumps, seal kits, valves & ceramic plungers' },
  { id: 'hoses', label: 'Hoses & Hose Reels', icon: Activity, desc: 'High-pressure braided hoses, swivels & retractable reels' },
  { id: 'trigger-guns', label: 'Guns, Lances & Wands', icon: Wrench, desc: 'Spray handles, insulated wands & extensions' },
  { id: 'lances-nozzles', label: 'Nozzles & Turbo Tips', icon: Target, desc: 'Flat fan jets, rotary turbo tips & jetting nozzles' },
  { id: 'surface-cleaners', label: 'Surface Cleaners', icon: RotateCcw, desc: 'Rotary flat surface cleaners & undercarriage tooling' },
  { id: 'burners', label: 'Burners, Coils & Ignition', icon: Flame, desc: 'Schedule 80 coils, electrodes, transformers & fuel pumps' },
  { id: 'valves-unloaders', label: 'Valves & Unloaders', icon: ShieldCheck, desc: 'Trapped pressure unloaders, relief valves & regulators' },
  { id: 'fittings-couplers', label: 'Fittings & Couplers', icon: Link2, desc: 'Quick release couplings, adaptors, swivels & O-rings' },
  { id: 'electrical-switches', label: 'Electrical & Switches', icon: Zap, desc: 'Thermostats, contactors, flow switches & cam switches' },
  { id: 'engines-motors', label: 'Engines & Motors', icon: Cpu, desc: 'Honda GX engines, TEFC motors, filters & spark plugs' },
  { id: 'filters', label: 'Filters & Water Treatment', icon: Filter, desc: 'Water supply strainers, scale-stop & fuel filters' },
  { id: 'consumables', label: 'Consumables & Service Kits', icon: Package, desc: 'Scheduled service kits, oils, greases & packing sets' },
];

const BRANDS = [
  { id: 'any', label: 'Any Brand / Not Sure' },
  { id: 'alkota', label: 'Alkota OEM' },
  { id: 'giant-pumps', label: 'Giant Pumps' },
  { id: 'interpump', label: 'Interpump' },
  { id: 'general-pump', label: 'General Pump' },
  { id: 'cat-pumps', label: 'CAT Pumps' },
  { id: 'pa', label: 'PA SpA' },
  { id: 'mosmatic', label: 'Mosmatic' },
  { id: 'suttner', label: 'Suttner / R+M' },
  { id: 'cox-reels', label: 'CoxREELS' },
  { id: 'steel-eagle', label: 'Steel Eagle' },
  { id: 'dual-pumps', label: 'Dual Pumps' },
];

const POPULAR_ALKOTA_MODELS = [
  '216X4 (200 Series)',
  '311X4 (200 Series)',
  '4305 (4000 Series)',
  '4405 (4000 Series)',
  '5355 (5000 Series)',
  'APW-24 Rotary Parts Washer',
  'Other / Custom Rig',
];

export default function PartsFinderClient() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('any');
  const [machineModel, setMachineModel] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  
  // Results
  const [results, setResults] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Fallback enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    customer_name: '',
    company: '',
    email: '',
    phone: '',
    postcode: '',
    serial_number: '',
    notes: '',
    urgency: 'standard',
  });
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function executeSearch() {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (selectedType) params.set('category', selectedType);
      if (selectedBrand && selectedBrand !== 'any') params.set('brand', selectedBrand);
      if (searchKeyword) params.set('q', searchKeyword);
      if (machineModel) params.set('model', machineModel);

      const res = await fetch(`/api/parts/search?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.parts || []);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Finder search error', err);
      setResults([]);
    } finally {
      setLoading(false);
      setStep(4);
    }
  }

  async function handleFallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnquiryStatus('sending');
    try {
      const res = await fetch('/api/service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'parts_finder_unmatched',
          ...enquiryForm,
          component_type: selectedType,
          brand_preference: selectedBrand,
          machine_model: machineModel || enquiryForm.notes,
          parts_text: `Parts Finder Request: Type: ${selectedType}, Brand: ${selectedBrand}, Model: ${machineModel}, Keyword: ${searchKeyword}`,
        }),
      });
      if (res.ok) {
        setEnquiryStatus('success');
      } else {
        setEnquiryStatus('error');
      }
    } catch {
      setEnquiryStatus('error');
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
      {/* ── PROGRESS BAR ── */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] mb-2">
          <span>Step {step} of 4</span>
          <span>
            {step === 1 && '1. Select Component Type'}
            {step === 2 && '2. Select Brand'}
            {step === 3 && '3. Machine & Specs'}
            {step === 4 && '4. Matching Results'}
          </span>
        </div>
        <div className="w-full bg-[#E8E8E4] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-alkota-orange h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* ── STEP 1: COMPONENT TYPE ── */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="border-b border-[#E8E8E4] pb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Step 01
            </span>
            <h1 className="text-3xl font-extralight tracking-tight text-alkota-black">
              What are you looking for?
            </h1>
            <p className="text-sm text-[#666] font-light mt-1">
              Select the primary component group or equipment category you need to service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPONENT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(type.id);
                    setStep(2);
                  }}
                  className={`p-5 text-left border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-alkota-black border-[#E8E8E4] hover:border-alkota-orange'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-alkota-orange' : 'text-[#777]'}`} />
                    <span className="text-[10px] font-ibm-plex-mono text-[#888]">→</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-normal mb-1">{type.label}</h3>
                    <p className={`text-[11px] font-light leading-relaxed ${isSelected ? 'text-[#AAA]' : 'text-[#777]'}`}>
                      {type.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 2: BRAND PREFERENCE ── */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="border-b border-[#E8E8E4] pb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Step 02
            </span>
            <h1 className="text-3xl font-extralight tracking-tight text-alkota-black">
              Which brand or manufacturer?
            </h1>
            <p className="text-sm text-[#666] font-light mt-1">
              Choose the manufacturer of the component or machine.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BRANDS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setSelectedBrand(b.id);
                  setStep(3);
                }}
                className={`p-4 text-left border text-xs font-normal transition-all ${
                  selectedBrand === b.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-alkota-black border-[#E8E8E4] hover:border-alkota-orange'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6 border-t border-[#E8E8E4]">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] hover:text-black"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: MACHINE & SPECIFICATIONS ── */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="border-b border-[#E8E8E4] pb-4">
            <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
              // Step 03
            </span>
            <h1 className="text-3xl font-extralight tracking-tight text-alkota-black">
              Machine Model or Part Number
            </h1>
            <p className="text-sm text-[#666] font-light mt-1">
              Enter any known model codes, part numbers, or specifications (pressure, thread, flow rate).
            </p>
          </div>

          <div className="bg-white border border-[#E8E8E4] p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-ibm-plex-mono uppercase tracking-widest text-[#555] mb-2">
                Quick Select Alkota Machine Model:
              </label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ALKOTA_MODELS.map((mod) => (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => setMachineModel(mod.split(' ')[0])}
                    className={`px-3 py-1.5 text-xs border font-ibm-plex-mono transition-colors ${
                      machineModel === mod.split(' ')[0]
                        ? 'bg-black text-white border-black'
                        : 'bg-[#FAF9F5] text-[#555] border-[#DDD] hover:border-black'
                    }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase tracking-widest text-[#555] mb-1.5">
                  Machine Model (or custom model):
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4305, 216X4, P400..."
                  value={machineModel}
                  onChange={(e) => setMachineModel(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#DDD] p-3 text-xs text-alkota-black focus:outline-none focus:border-alkota-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-ibm-plex-mono uppercase tracking-widest text-[#555] mb-1.5">
                  Part Number or Keyword:
                </label>
                <input
                  type="text"
                  placeholder="e.g. TS2021, Packing Kit, 250 Bar Hose..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#DDD] p-3 text-xs text-alkota-black focus:outline-none focus:border-alkota-orange"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={executeSearch}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-alkota-orange hover:bg-black text-white px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                Find Matching Parts Now
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-[#E8E8E4]">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-[#777] hover:text-black"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: RESULTS & FALLBACK ── */}
      {step === 4 && (
        <div className="space-y-10 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E8E4]">
            <div>
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-1">
                // Step 04 · Live Catalogue Match
              </span>
              <h1 className="text-3xl font-extralight tracking-tight text-alkota-black">
                {results.length > 0
                  ? `Found ${results.length} Matching Components`
                  : 'No Exact Automatic Match'}
              </h1>
            </div>
            <button
              onClick={() => {
                setStep(1);
                setSelectedType('');
                setSelectedBrand('any');
                setMachineModel('');
                setSearchKeyword('');
              }}
              className="inline-flex items-center gap-2 text-xs font-ibm-plex-mono uppercase tracking-widest text-alkota-orange hover:underline self-start sm:self-center"
            >
              Restart Finder Wizard ↺
            </button>
          </div>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((part) => (
                <ProductCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E8E8E4] p-8 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-alkota-orange mx-auto" />
              <h3 className="text-xl font-light text-alkota-black">
                We couldn't automatically match this specific combination.
              </h3>
              <p className="text-xs text-[#666] max-w-lg mx-auto leading-relaxed">
                Alkota UK stocks and sources over 10,000 industrial components. Submit your machine details and part description below — our technical parts engineers will identify the exact part and quote within 24 hours.
              </p>
            </div>
          )}

          {/* Fallback "Can't find your part?" Intake CRM Form */}
          <div className="bg-[#0A0A0A] text-white p-8 sm:p-12 border border-[#222]">
            <div className="max-w-2xl mb-8">
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange block mb-2">
                // Technical Sourcing Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extralight tracking-tight text-white mb-2">
                Can't find your part? Let our engineers source it.
              </h2>
              <p className="text-xs sm:text-sm text-[#AAA] font-light leading-relaxed">
                Provide your machine serial number, pump stamping, or upload a photo of the damaged part. We guarantee correct fitment.
              </p>
            </div>

            {enquiryStatus === 'success' ? (
              <div className="p-6 bg-[#161616] border border-green-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
                <h4 className="text-base font-normal text-white">Parts Request Logged</h4>
                <p className="text-xs text-[#AAA]">
                  Our technical parts team has received your enquiry and will respond within 24 hours with price and delivery time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFallbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.customer_name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, customer_name: e.target.value })}
                      className="w-full bg-[#161616] border border-[#333] p-3 text-xs text-white focus:outline-none focus:border-alkota-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      className="w-full bg-[#161616] border border-[#333] p-3 text-xs text-white focus:outline-none focus:border-alkota-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full bg-[#161616] border border-[#333] p-3 text-xs text-white focus:outline-none focus:border-alkota-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] mb-1">
                      Machine Serial Number (if known)
                    </label>
                    <input
                      type="text"
                      value={enquiryForm.serial_number}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, serial_number: e.target.value })}
                      className="w-full bg-[#161616] border border-[#333] p-3 text-xs text-white focus:outline-none focus:border-alkota-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-ibm-plex-mono uppercase tracking-widest text-[#888] mb-1">
                    Describe the required part or problem:
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryForm.notes}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, notes: e.target.value })}
                    placeholder="Include pump model, thread size, pressure rating, or symptoms..."
                    className="w-full bg-[#161616] border border-[#333] p-3 text-xs text-white focus:outline-none focus:border-alkota-orange"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enquiryStatus === 'sending'}
                  className="inline-flex items-center gap-2 bg-alkota-orange hover:bg-white hover:text-black text-white px-8 py-3 text-xs font-ibm-plex-mono uppercase tracking-widest transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {enquiryStatus === 'sending' ? 'Submitting...' : 'Submit Parts Sourcing Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
