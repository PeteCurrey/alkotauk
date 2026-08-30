'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, Search, SlidersHorizontal, Settings, 
  ExternalLink, Eye, ArrowRight, Package, FileText, Phone, Mail,
  CheckCircle2, Sparkles, Filter, Grid, ZoomIn, ZoomOut, Maximize2
} from 'lucide-react';
import type { Product } from '@/lib/admin/types';

interface StudioProps {
  initialProducts: Product[];
  recentEnquiries: any[];
  stats: {
    totalProducts: number;
    activeProducts: number;
    totalQuotes: number;
    newQuotes: number;
    totalLeads: number;
    newLeads: number;
  };
}

export default function StudioDashboardClient({ initialProducts, recentEnquiries, stats }: StudioProps) {
  const products = initialProducts.length > 0 ? initialProducts : [
    {
      id: 'default-1',
      name: 'Alkota 4355',
      slug: 'alkota-4355',
      category: 'hot-water',
      series: '4-Series Oil Fired',
      pressure_bar: 207,
      pressure_psi: 3000,
      flow_rate_lpm: 15.1,
      flow_rate_gpm: 4.0,
      weight_kg: 240,
      power_source: 'Electric 400V 3-Phase',
      heating_fuel: 'Diesel / Kerosene',
      primary_image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
      active: true,
    } as Product
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const currentProduct = products[selectedIndex] || products[0];

  const nextMachine = () => {
    setSelectedIndex((prev) => (prev + 1) % products.length);
  };

  const prevMachine = () => {
    setSelectedIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="space-y-5">
      {/* ── TOP 3-PANEL COMMAND DECK ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ── LEFT PANEL: Machine Telemetry & Specs (3 cols) ── */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-[#64748B] mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Machine Details</span>
              <Link href={`/admin/products/${currentProduct.id}`} className="hover:text-[#0F172A] transition-colors">
                <Settings className="h-4 w-4 text-[#94A3B8]" />
              </Link>
            </div>

            <p className="text-[11px] text-[#94A3B8] font-medium">Model ID</p>
            <h2 className="text-xl font-black text-[#0F172A] tracking-tight truncate">
              {currentProduct.name}
            </h2>
            <p className="text-xs text-[#FF6900] font-bold uppercase tracking-wide mt-0.5">
              {currentProduct.series || currentProduct.category?.replace('-', ' ') || 'Industrial Series'}
            </p>

            {/* Spec breakdown */}
            <div className="grid grid-cols-2 gap-3.5 mt-5 pt-4 border-t border-[#F0F2F5] text-xs">
              <div>
                <p className="text-[#94A3B8] text-[10px] uppercase font-bold">Operating Pressure</p>
                <p className="font-extrabold text-[#0F172A] mt-0.5">
                  {currentProduct.pressure_bar ? `${currentProduct.pressure_bar} BAR` : '207 BAR'}
                  <span className="text-[#94A3B8] font-normal text-[11px]"> / {currentProduct.pressure_psi || 3000} PSI</span>
                </p>
              </div>
              <div>
                <p className="text-[#94A3B8] text-[10px] uppercase font-bold">Water Flow</p>
                <p className="font-extrabold text-[#0F172A] mt-0.5">
                  {currentProduct.flow_rate_lpm ? `${currentProduct.flow_rate_lpm} LPM` : '15.1 LPM'}
                  <span className="text-[#94A3B8] font-normal text-[11px]"> / {currentProduct.flow_rate_gpm || 4.0} GPM</span>
                </p>
              </div>
              <div>
                <p className="text-[#94A3B8] text-[10px] uppercase font-bold">Power Supply</p>
                <p className="font-bold text-[#0F172A] mt-0.5 truncate">
                  {currentProduct.power_source || '400V 3-Phase'}
                </p>
              </div>
              <div>
                <p className="text-[#94A3B8] text-[10px] uppercase font-bold">Tare Weight</p>
                <p className="font-bold text-[#0F172A] mt-0.5">
                  {currentProduct.weight_kg ? `${currentProduct.weight_kg} kg` : '240 kg'}
                </p>
              </div>
            </div>
          </div>

          {/* Performance Radar Simulation */}
          <div className="pt-4 border-t border-[#F0F2F5]">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#475569] mb-2.5">
              <span>Performance Radar</span>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                • 100% Stable Output
              </span>
            </div>

            {/* Radar Grid Canvas */}
            <div className="relative h-24 w-full bg-[#F6F7F9] rounded-xl border border-[#E2E4E8] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 divide-x divide-y divide-[#E2E4E8]/60 opacity-70" />
              <div className="absolute h-14 w-14 bg-[#FF6900]/15 border border-[#FF6900] rounded-full animate-pulse" />
              <div className="absolute h-2 w-2 rounded-full bg-[#FF6900] shadow-[0_0_8px_#FF6900]" />
              <span className="absolute bottom-1.5 left-2 text-[9px] font-mono text-[#94A3B8]">Pressure</span>
              <span className="absolute top-1.5 right-2 text-[9px] font-mono text-[#94A3B8]">Thermal BTU</span>
            </div>
          </div>
        </div>

        {/* ── CENTER PANEL: Interactive Visual Stage (6 cols) ── */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between relative min-h-[440px]">
          {/* Top Stage Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-[#0F172A]">Equipment Visualizer</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F6F7F9] text-[10px] font-mono text-[#64748B]">
                {selectedIndex + 1} of {products.length} models
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6900]/10 text-[#FF6900] text-xs font-bold">
                • Request Pricing (Active)
              </span>
            </div>
          </div>

          {/* Machine Showcase Stage */}
          <div className="relative flex-1 flex items-center justify-center p-6 my-2 overflow-hidden">
            <div className="absolute w-4/5 h-12 bg-[#F1F3F7] rounded-full blur-xl opacity-80 -bottom-2" />

            {/* Left Nav Button */}
            <button
              type="button"
              onClick={prevMachine}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E2E4E8] flex items-center justify-center text-[#0F172A] hover:bg-[#111] hover:text-white shadow-md transition-all z-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Machine Cutout Render */}
            <div 
              className="relative max-h-64 w-full flex items-center justify-center transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {currentProduct.primary_image_url ? (
                <img
                  src={currentProduct.primary_image_url}
                  alt={currentProduct.name}
                  className="max-h-60 max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                />
              ) : (
                <div className="h-40 w-40 rounded-2xl bg-[#F6F7F9] border border-[#E2E4E8] flex items-center justify-center text-[#94A3B8]">
                  <Package className="h-14 w-14" />
                </div>
              )}
            </div>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={nextMachine}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm border border-[#E2E4E8] flex items-center justify-center text-[#0F172A] hover:bg-[#111] hover:text-white shadow-md transition-all z-10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom Stage Controls */}
          <div className="flex items-center justify-between pt-3.5 border-t border-[#F0F2F5]">
            {/* Zoom Slider Pill */}
            <div className="flex items-center gap-2 bg-[#F6F7F9] px-3 py-1.5 rounded-full border border-[#E2E4E8]">
              <button 
                type="button" 
                onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))} 
                className="text-[#64748B] hover:text-[#0F172A] font-bold text-xs"
              >
                –
              </button>
              <div className="h-1.5 w-10 bg-[#CBD5E1] rounded-full relative">
                <div className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-[#FF6900] rounded-full left-1/2 -translate-x-1/2 shadow-sm" />
              </div>
              <button 
                type="button" 
                onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))} 
                className="text-[#64748B] hover:text-[#0F172A] font-bold text-xs"
              >
                +
              </button>
            </div>

            {/* Tool actions */}
            <div className="flex items-center gap-2">
              <Link
                href={`/machines/${currentProduct.category || 'hot-water'}/${currentProduct.slug}`}
                target="_blank"
                className="px-3.5 py-1.5 rounded-full bg-[#F6F7F9] hover:bg-[#EBECEF] text-xs font-bold text-[#334155] transition-colors flex items-center gap-1.5 border border-[#E2E4E8]"
              >
                <Eye className="h-3.5 w-3.5 text-[#FF6900]" />
                <span>Storefront View</span>
              </Link>
              <Link
                href={`/admin/products/${currentProduct.id}`}
                className="px-4 py-1.5 rounded-full bg-[#111111] text-white text-xs font-bold hover:bg-[#333] transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Edit Specs</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Commercial Fleet & Live Quote Stream (3 cols) ── */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-[#64748B] mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider">Quote Stream</span>
              <Link href="/admin/quotes" className="text-xs font-bold text-[#FF6900] hover:underline">
                View All ({stats.totalQuotes})
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              <div className="p-3 rounded-xl bg-[#F6F7F9] border border-[#E2E4E8]">
                <p className="text-[10px] font-bold uppercase text-[#94A3B8]">Pending Quotes</p>
                <p className="text-xl font-black text-[#FF6900] mt-0.5">{stats.newQuotes}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#F6F7F9] border border-[#E2E4E8]">
                <p className="text-[10px] font-bold uppercase text-[#94A3B8]">Live Catalogue</p>
                <p className="text-xl font-black text-[#0F172A] mt-0.5">{stats.activeProducts}</p>
              </div>
            </div>

            {/* Live inquiries stream */}
            <div className="space-y-2">
              {recentEnquiries.slice(0, 3).map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-[#F8F9FB] border border-[#F0F2F5] hover:border-[#E2E4E8] transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#FF6900]/10 text-[#FF6900]">
                      • {item.status?.toUpperCase() || 'NEW'}
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      {new Date(item.created_at).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#0F172A] truncate">
                    {item.name} {item.company ? `(${item.company})` : ''}
                  </p>
                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                    {item.metadata?.product_name || item.subject || 'Alkota Machine Quote'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Departure Route Capsule Tags */}
          <div className="pt-3.5 border-t border-[#F0F2F5] space-y-1.5">
            <span className="text-[10px] font-bold uppercase text-[#94A3B8] block">Commercial Dispatch Channels</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-[#F6F7F9] border border-[#E2E4E8] text-[11px] font-bold text-[#475569] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6900]" /> UK South Hub
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#F6F7F9] border border-[#E2E4E8] text-[11px] font-bold text-[#475569] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Northern Depot
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#F6F7F9] border border-[#E2E4E8] text-[11px] font-bold text-[#475569] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Scotland Direct
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM HORIZONTAL CAROUSEL TRAY ───────────────────────────────── */}
      <div className="w-full bg-white rounded-2xl p-5 border border-[#E2E4E8] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3.5">
        {/* Tray Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Machine Inventory Fleet
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F1F3F7] text-[11px] font-bold text-[#64748B]">
              {products.length} registered models
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/products"
              className="px-3.5 py-1 rounded-full bg-[#F6F7F9] hover:bg-[#EBECEF] text-xs font-bold text-[#334155] transition-colors border border-[#E2E4E8]"
            >
              Manage Full Catalogue →
            </Link>
          </div>
        </div>

        {/* Horizontal Scrolling Card Reel */}
        <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-thin">
          {products.map((p, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`flex-shrink-0 w-48 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-md shadow-black/10'
                    : 'bg-[#F6F7F9] text-[#0F172A] border-[#E2E4E8] hover:border-[#CBD5E1] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-bold uppercase ${
                    isSelected ? 'text-[#FF6900]' : 'text-[#64748B]'
                  }`}>
                    S6{idx + 10}
                  </span>
                  <span className={`text-[10px] font-mono ${
                    isSelected ? 'text-white/60' : 'text-[#94A3B8]'
                  }`}>
                    {p.category?.slice(0, 3).toUpperCase() || 'MOD'}
                  </span>
                </div>

                {/* Thumbnail Stage */}
                <div className={`h-20 w-full rounded-lg flex items-center justify-center p-2 mb-2.5 ${
                  isSelected ? 'bg-white/10' : 'bg-white border border-[#E2E4E8]'
                }`}>
                  {p.primary_image_url ? (
                    <img src={p.primary_image_url} alt={p.name} className="h-full w-full object-contain" />
                  ) : (
                    <Package className={`h-7 w-7 ${isSelected ? 'text-white/40' : 'text-[#CBD5E1]'}`} />
                  )}
                </div>

                <p className="font-extrabold text-xs truncate leading-tight">{p.name}</p>
                <p className={`text-[10px] truncate mt-0.5 ${
                  isSelected ? 'text-white/70' : 'text-[#64748B]'
                }`}>
                  {p.pressure_bar ? `${p.pressure_bar} BAR` : '207 BAR'} · {p.flow_rate_lpm ? `${p.flow_rate_lpm} LPM` : '15 LPM'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
