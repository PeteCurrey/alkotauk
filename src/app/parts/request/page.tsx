'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Wrench,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  UploadCloud,
  Send,
  ShieldCheck,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';
import { PartsRequestProvider, usePartsRequest } from '@/components/parts/PartsRequestListContext';
import PartsRequestDrawer from '@/components/parts/PartsRequestDrawer';

export default function PartsRequestPage() {
  return (
    <PartsRequestProvider>
      <PartsRequestFormContent />
      <PartsRequestDrawer />
    </PartsRequestProvider>
  );
}

function PartsRequestFormContent() {
  const { items, removeItem, updateQuantity, clearList, totalItemsCount } = usePartsRequest();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [urgency, setUrgency] = useState<string>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `ALK-PR-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(ref);

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      clearList();
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-alkota-black selection:bg-alkota-orange selection:text-white pt-28 pb-0">
      <Navigation />

      <section className="border-b border-[#E8E8E4] bg-[#F7F7F4] py-12">
        <div className="mx-auto max-w-5xl px-6 sm:px-12 space-y-6">
          <Breadcrumbs
            items={[
              { label: 'Genuine Parts', href: '/parts' },
              { label: 'Parts Procurement Request' }
            ]}
          />

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-alkota-orange" />
              <span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.25em] text-alkota-orange font-bold">
                // B2B PROCUREMENT & AVAILABILITY ENQUIRY
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extralight tracking-tight uppercase text-alkota-black">
              Parts Request & Quotation
            </h1>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed font-normal max-w-2xl">
              Submit your required spare parts list for rapid pricing confirmation, technical fitment verification, and UK dispatch allocation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-6 sm:px-12">
          {isSubmitted ? (
            <div className="p-12 bg-[#F8F7F4] border-2 border-emerald-500 text-center space-y-6 max-w-2xl mx-auto shadow-lg">
              <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200">
                <CheckCircle2 className="h-12 w-12" />
              </div>

              <div className="space-y-2">
                <span className="font-ibm-plex-mono text-xs uppercase text-emerald-700 font-bold tracking-widest block">
                  Procurement Enquiry Registered
                </span>
                <h2 className="text-3xl uppercase font-light text-alkota-black tracking-tight">
                  Parts Request Received
                </h2>
                <div className="font-ibm-plex-mono text-lg font-bold text-alkota-orange pt-2">
                  Reference: {referenceCode}
                </div>
              </div>

              <p className="text-xs text-[#666] leading-relaxed font-normal max-w-md mx-auto">
                An Alkota UK parts specialist has received your requested component list and is verifying stock availability and serial compatibility. You will receive quotation confirmation shortly.
              </p>

              <div className="pt-4">
                <Link
                  href="/parts"
                  className="inline-flex items-center gap-2 bg-alkota-black text-white hover:bg-alkota-orange px-8 py-3.5 text-xs font-ibm-plex-mono uppercase tracking-widest transition-colors font-normal shadow-xs"
                >
                  <span>Return to Parts Hub</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Form (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={handleSubmit} className="bg-[#F8F7F4] border border-[#E0E0DC] p-8 space-y-6 shadow-xs">
                  <div className="pb-3 border-b border-[#EBEBE8]">
                    <h3 className="text-lg uppercase font-light text-alkota-black tracking-tight">
                      Customer & Site Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                        Company / Account
                      </label>
                      <input
                        type="text"
                        placeholder="Commercial Transport Ltd"
                        className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="service@company.co.uk"
                        className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                        Telephone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="07912 506738"
                        className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                        Machine Model (If known)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 430XH or APW-360"
                        className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                        Machine Serial Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 84192-A"
                        className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-2">
                      Procurement Urgency
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'emergency_breakdown', label: 'Breakdown' },
                        { id: 'urgent', label: 'Urgent' },
                        { id: 'standard', label: 'Standard' },
                        { id: 'planned_maintenance', label: 'Planned PPM' },
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id)}
                          className={`p-2 font-ibm-plex-mono text-[10px] uppercase border transition-all cursor-pointer ${
                            urgency === u.id
                              ? 'bg-alkota-orange text-white border-alkota-orange font-bold'
                              : 'bg-white text-[#666] border-[#DDD] hover:border-[#999]'
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-ibm-plex-mono uppercase text-[#555] mb-1">
                      Delivery Postcode & Site Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter delivery address, site access requirements, or additional required parts..."
                      className="w-full bg-white border border-[#DDD] p-2.5 text-xs focus:border-alkota-orange focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-alkota-orange text-white py-4 text-xs font-ibm-plex-mono uppercase tracking-widest hover:bg-alkota-black transition-colors font-normal shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Parts Quotation Request'}</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Right Column: Selected Items Summary (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#F8F7F4] border border-[#E0E0DC] p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EBEBE8]">
                    <span className="font-ibm-plex-mono text-xs uppercase font-bold text-alkota-black">
                      Requested Items Summary ({totalItemsCount})
                    </span>
                    <Link href="/parts" className="text-[10px] font-ibm-plex-mono uppercase text-alkota-orange hover:underline">
                      + Add More Parts
                    </Link>
                  </div>

                  {items.length === 0 ? (
                    <div className="py-8 text-center text-xs font-ibm-plex-mono text-[#888] uppercase">
                      No items currently selected. Browse the parts catalogue or search by model to add items.
                    </div>
                  ) : (
                    <div className="divide-y divide-[#EBEBE8] space-y-3">
                      {items.map((item) => (
                        <div key={item.part_number} className="pt-3 first:pt-0 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-ibm-plex-mono text-[10px] font-bold text-alkota-orange block">
                                PN: {item.part_number}
                              </span>
                              <h4 className="text-xs font-normal text-alkota-black">
                                {item.name}
                              </h4>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.part_number)}
                              className="text-[#888] hover:text-red-500 p-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-xs font-ibm-plex-mono pt-1">
                            <div className="flex items-center border border-[#DDD] bg-white">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.part_number, -1)}
                                className="px-2 py-0.5 text-[#666] hover:text-black cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2.5 py-0.5 text-alkota-black font-bold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.part_number, 1)}
                                className="px-2 py-0.5 text-[#666] hover:text-black cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            {item.price_each && (
                              <span className="text-alkota-black font-bold">
                                £{(item.price_each * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
