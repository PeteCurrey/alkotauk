'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Camera,
  ExternalLink,
  Filter,
  Eye,
  Layers,
  Sparkles
} from 'lucide-react';

interface MediaTrackItem {
  id: string;
  page: string;
  section: string;
  name: string;
  code?: string;
  role: 'CATEGORY HERO' | 'APPLICATION' | 'PRODUCT CONTAINER' | 'CONTAMINATION MACRO' | 'PROCESS' | 'SURFACE DETAIL' | 'WATER / RECOVERY';
  priority: 'P0' | 'P1' | 'P2';
  currentAsset: string | null;
  status: 'LIVE' | 'PLACEHOLDER' | 'READY FOR GENERATION' | 'GENERATED - REVIEW' | 'MISSING';
  aspectRatio: string;
  altText: string;
  brief: string;
}

const MASTER_MEDIA_LIST: MediaTrackItem[] = [
  {
    id: 'chem-hero-01',
    page: '/chemicals',
    section: 'Hero Masthead',
    name: 'Industrial Chemistry Pre-Treatment in Wash Bay',
    role: 'CATEGORY HERO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '4:3 (Desktop) / 4:5 (Mobile)',
    altText: 'Heavy commercial vehicle undergoing controlled chemical pre-treatment in an industrial wash bay',
    brief: 'Commercial articulated HGV in fleet wash bay receiving dense, controlled chemical pre-treatment via downstream hot water injection.'
  },
  {
    id: 'chem-pillars-02',
    page: '/chemicals',
    section: 'Four-Pillar Equation',
    name: 'Four-Pillar Physics Process Interaction',
    role: 'PROCESS',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:9 (Desktop) / 1:1 (Mobile)',
    altText: 'Hot high-pressure chemical spray striking oily machine block at 80°C',
    brief: 'Extreme macro of hot high-pressure water with active surfactant striking an oily cast-iron component block.'
  },
  {
    id: 'chem-contam-rf',
    page: '/chemicals',
    section: 'Contamination Selector',
    name: 'Electrostatic Road Film Macro',
    role: 'CONTAMINATION MACRO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '4:3 (Desktop) / 1:1 (Mobile)',
    altText: 'Dirty commercial HGV cab side panel coated in winter road film',
    brief: 'Macro detail of a commercial HGV cab panel coated in dry, electrostatic road film and diesel soot with sharp clean rinse demarcation.'
  },
  {
    id: 'chem-contam-gr',
    page: '/chemicals',
    section: 'Contamination Selector',
    name: 'Heavy Fifth-Wheel Grease Macro',
    role: 'CONTAMINATION MACRO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '4:3 (Desktop) / 1:1 (Mobile)',
    altText: 'Thick black polymerised lithium grease on steel plate',
    brief: 'Thick, black polymerised fifth-wheel lithium grease and hydraulic fluid accumulated on heavy machinery steel plate.'
  },
  {
    id: 'chem-contam-ag',
    page: '/chemicals',
    section: 'Contamination Selector',
    name: 'Agricultural Mud & Slurry Encrustation',
    role: 'CONTAMINATION MACRO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '4:3 (Desktop) / 1:1 (Mobile)',
    altText: 'Dense caked field clay and manure on tractor axle',
    brief: 'Dense caked field clay and manure encrustation on painted steel chassis of large agricultural tractor.'
  },
  {
    id: 'fleet-hero-01',
    page: '/chemicals/fleet-vehicle',
    section: 'Discipline Hero',
    name: 'Commercial Transport Depot Fleet Wash',
    role: 'CATEGORY HERO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:9 (Desktop) / 4:5 (Mobile)',
    altText: 'Commercial logistics tractor-trailers in modern UK depot wash bay',
    brief: 'Multiple commercial logistics tractor-trailers lined up in modern UK transport depot wash gantry with active foam application.'
  },
  {
    id: 'fleet-alloy-02',
    page: '/chemicals/fleet-vehicle',
    section: 'Metallurgy Chapter',
    name: 'Mirror Polished Forged Alloy Wheel Preservation',
    role: 'SURFACE DETAIL',
    priority: 'P1',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:9 (Desktop) / 1:1 (Mobile)',
    altText: 'Mirror polished commercial aluminium wheel dripping clean rinse water',
    brief: 'Close-up of mirror-polished forged commercial aluminium wheel rim showing zero chemical clouding or etching.'
  },
  {
    id: 'degreaser-hero-01',
    page: '/chemicals/degreasers',
    section: 'Discipline Hero',
    name: 'Heavy Diesel Engine Block Degreasing',
    role: 'CATEGORY HERO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:9 (Desktop) / 4:5 (Mobile)',
    altText: 'Heavy diesel engine block undergoing hot degreaser pre-spray washdown',
    brief: 'Large dismounted diesel engine block undergoing hot degreaser pre-spray washdown in workshop service pit.'
  },
  {
    id: 'ag-hero-01',
    page: '/chemicals/industrial',
    section: 'Hero & Farm Soap Story',
    name: 'Combine Harvester Farm Soap Washdown',
    role: 'CATEGORY HERO',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:9 (Desktop) / 4:5 (Mobile)',
    altText: 'Combine harvester receiving Farm Soap TR-440 foam washdown on farm apron',
    brief: 'High-power combine harvester receiving Farm Soap TR-440 foam washdown showing color renewal on faded panels.'
  },
  {
    id: 'pw-hero-01',
    page: '/chemicals/parts-washers',
    section: 'Discipline Hero',
    name: 'APW Stainless Rotary Parts Washer Chamber',
    role: 'PROCESS',
    priority: 'P0',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:9 (Desktop) / 4:5 (Mobile)',
    altText: 'Stainless interior of Alkota APW automatic rotary parts washer with steaming parts',
    brief: 'Stainless steel interior of Alkota APW automatic rotary turntable parts washer cabinet with steaming degreased components.'
  },
  {
    id: 'water-rec-01',
    page: '/chemicals',
    section: 'Water Treatment Chapter',
    name: 'Quick-Break Wash Bay Settlement & Interceptor',
    role: 'WATER / RECOVERY',
    priority: 'P1',
    currentAsset: null,
    status: 'PLACEHOLDER',
    aspectRatio: '16:10 (Desktop) / 1:1 (Mobile)',
    altText: 'Wash bay drainage trench and coalescing oil-water separator tank',
    brief: 'Industrial wash bay settlement trench and coalescing oil-water separator tank showing distinct quick-break oil phase separation.'
  },
  {
    id: 'prod-tr440',
    page: '/chemicals/industrial/farm-soap-tr440',
    section: 'Product Specification',
    name: 'Farm Soap TR-440 Packshot',
    code: 'TR-440',
    role: 'PRODUCT CONTAINER',
    priority: 'P1',
    currentAsset: '/assets/products/tr440-farm-soap.png',
    status: 'LIVE',
    aspectRatio: '16:10',
    altText: 'Farm Soap TR-440 25L Container',
    brief: 'Studio packshot of TR-440 container against #141414 dark backdrop.'
  },
  {
    id: 'prod-de703',
    page: '/chemicals/degreasers/grease-cutter-de703',
    section: 'Product Specification',
    name: 'Grease Cutter DE-703 Packshot',
    code: 'DE-703',
    role: 'PRODUCT CONTAINER',
    priority: 'P1',
    currentAsset: '/assets/products/de703-grease-cutter.png',
    status: 'LIVE',
    aspectRatio: '16:10',
    altText: 'Grease Cutter DE-703 25L Container',
    brief: 'Studio packshot of DE-703 container against #141414 dark backdrop.'
  },
  {
    id: 'prod-tr407',
    page: '/chemicals/fleet-vehicle/power-blast-tr407',
    section: 'Product Specification',
    name: 'Power Blast TR-407 Packshot',
    code: 'TR-407',
    role: 'PRODUCT CONTAINER',
    priority: 'P1',
    currentAsset: '/assets/products/truck-plant-wash.png',
    status: 'LIVE',
    aspectRatio: '16:10',
    altText: 'Power Blast TR-407 25L Container',
    brief: 'Studio packshot of TR-407 container against #141414 dark backdrop.'
  },
  {
    id: 'prod-apw',
    page: '/chemicals/parts-washers/apw-pro-clean',
    section: 'Product Specification',
    name: 'APW Pro Clean Packshot',
    code: 'APW-PC',
    role: 'PRODUCT CONTAINER',
    priority: 'P1',
    currentAsset: '/assets/products/food-safe-cleaner.png',
    status: 'LIVE',
    aspectRatio: '16:10',
    altText: 'APW Pro Clean 25L Container',
    brief: 'Studio packshot of APW Pro Clean container against #141414 dark backdrop.'
  },
  {
    id: 'prod-scale-stop',
    page: '/chemicals/specialty/scale-stop-coil-protector',
    section: 'Product Specification',
    name: 'Scale Stop Coil Protector Packshot',
    code: 'Scale Stop',
    role: 'PRODUCT CONTAINER',
    priority: 'P1',
    currentAsset: '/assets/products/scale-stop.png',
    status: 'LIVE',
    aspectRatio: '16:10',
    altText: 'Scale Stop 5L Dosing Bottle',
    brief: 'Studio packshot of Scale Stop dosing container.'
  },
  {
    id: 'prod-crete',
    page: '/chemicals/masonry/crete-clean',
    section: 'Product Specification',
    name: 'Crete Clean Restorer Packshot',
    code: 'Crete Clean',
    role: 'PRODUCT CONTAINER',
    priority: 'P1',
    currentAsset: '/assets/products/masonry-cleaner.png',
    status: 'LIVE',
    aspectRatio: '16:10',
    altText: 'Crete Clean Masonry Restorer 25L Container',
    brief: 'Studio packshot of Crete Clean acid container.'
  }
];

export default function AdminChemicalMediaManager() {
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'P0' | 'P1' | 'P2'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredItems = MASTER_MEDIA_LIST.filter((item) => {
    const matchesPriority = priorityFilter === 'ALL' || item.priority === priorityFilter;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesPriority && matchesStatus;
  });

  const p0Count = MASTER_MEDIA_LIST.filter((i) => i.priority === 'P0').length;
  const liveCount = MASTER_MEDIA_LIST.filter((i) => i.status === 'LIVE').length;
  const placeholderCount = MASTER_MEDIA_LIST.filter((i) => i.status === 'PLACEHOLDER').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/chemicals" className="text-[#666] hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-barlow-condensed text-4xl font-black uppercase italic text-white">
              Chemical Media Requirements & Workflow
            </h1>
            <p className="font-ibm-plex-mono text-[10px] text-[#666] uppercase tracking-widest mt-1">
              // Creative briefs, asset roles & generation schedule ({MASTER_MEDIA_LIST.length} registered assets)
            </p>
          </div>
        </div>

        <Link
          href="/chemicals"
          target="_blank"
          className="flex items-center gap-2 border border-[#333] bg-[#141414] px-4 py-2.5 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-[#CCC] hover:text-white"
        >
          <span>View Public Platform</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-px bg-[#222] border border-[#222]">
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Total Inventory
          </span>
          <span className="font-ibm-plex-mono text-2xl text-white font-bold">
            {MASTER_MEDIA_LIST.length} Briefs
          </span>
        </div>
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            P0 Critical Launch Assets
          </span>
          <span className="font-ibm-plex-mono text-2xl text-alkota-orange font-bold">
            {p0Count} Assets
          </span>
        </div>
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Verified Live Assets
          </span>
          <span className="font-ibm-plex-mono text-2xl text-emerald-400 font-bold">
            {liveCount} Live
          </span>
        </div>
        <div className="bg-[#111] p-4">
          <span className="block font-ibm-plex-mono text-[9px] uppercase text-[#666] mb-1">
            Placeholders Active
          </span>
          <span className="font-ibm-plex-mono text-2xl text-cyan-400 font-bold">
            {placeholderCount} Scheduled
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] mr-2">Priority:</span>
          {(['ALL', 'P0', 'P1', 'P2'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest border transition-all ${
                priorityFilter === p
                  ? 'bg-alkota-orange text-white border-alkota-orange'
                  : 'bg-[#141414] text-[#777] border-[#262626] hover:border-[#444]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-ibm-plex-mono text-[9px] uppercase text-[#666] mr-2">Status:</span>
          {['ALL', 'LIVE', 'PLACEHOLDER', 'READY FOR GENERATION', 'GENERATED - REVIEW'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 font-ibm-plex-mono text-[9px] uppercase tracking-widest border transition-all ${
                statusFilter === st
                  ? 'bg-[#2A2A2A] text-white border-[#444]'
                  : 'bg-[#141414] text-[#666] border-[#262626] hover:border-[#444]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-[#222] overflow-x-auto bg-[#0E0E0E]">
        <table className="w-full text-left text-sm min-w-[900px]">
          <thead>
            <tr className="bg-[#141414] border-b border-[#222] font-ibm-plex-mono text-[9px] uppercase tracking-widest text-[#666]">
              <th className="px-6 py-4">Page / Placement</th>
              <th className="px-6 py-4">Media Role</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Aspect Ratio</th>
              <th className="px-6 py-4">Workflow Status</th>
              <th className="px-6 py-4">Creative Brief & Subject</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1C]">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#141414] transition-colors">
                <td className="px-6 py-4">
                  <span className="text-white font-medium text-sm block">{item.name}</span>
                  <span className="font-ibm-plex-mono text-[10px] text-[#666]">
                    {item.page} · {item.section}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-ibm-plex-mono text-[9px] uppercase text-alkota-orange px-2 py-0.5 border border-alkota-orange/30 bg-alkota-orange/10">
                    {item.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`font-ibm-plex-mono text-[10px] font-bold ${
                      item.priority === 'P0' ? 'text-alkota-orange' : 'text-[#888]'
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td className="px-6 py-4 font-ibm-plex-mono text-[10px] text-[#777]">
                  {item.aspectRatio}
                </td>
                <td className="px-6 py-4">
                  {item.status === 'LIVE' ? (
                    <span className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-[9px] uppercase text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> LIVE ASSET
                    </span>
                  ) : item.status === 'PLACEHOLDER' ? (
                    <span className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-[9px] uppercase text-cyan-400">
                      <Camera className="h-3 w-3" /> PLACEHOLDER
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-ibm-plex-mono text-[9px] uppercase text-amber-400">
                      <AlertTriangle className="h-3 w-3" /> {item.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-[#AAA] font-normal leading-relaxed max-w-md">
                    {item.brief}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
