'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  Copy, 
  CheckCheck, 
  HelpCircle,
  X,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePartsRequest } from './PartsRequestListContext';
import { resolveProductAction } from '@/lib/commerce/action-resolver';
import ProductActionCTA from '@/components/commerce/ProductActionCTA';

interface ProductDetailActionsProps {
  part: {
    id: string;
    part_number: string;
    sku?: string | null;
    mpn?: string | null;
    name: string;
    slug?: string;
    price?: number | null;
    brand?: string | null;
    manufacturer?: string | null;
    image_url?: string | null;
    in_stock: boolean;
    availability_status?: string;
    superseded_by?: string | null;
    active?: boolean;
    needs_review?: boolean;
    view_only?: boolean;
    quote_only?: boolean;
    replacement_slug?: string | null;
  };
  supersededPartSlug?: string | null;
}

export default function ProductDetailActions({ 
  part,
  supersededPartSlug
}: ProductDetailActionsProps) {
  // Authoritative action decision evaluated via Central Product Action Resolver
  const decision = resolveProductAction({
    ...part,
    replacement_slug: supersededPartSlug || part.replacement_slug,
  });

  const [quantity, setQuantity] = useState(1);
  const [copiedPn, setCopiedPn] = useState(false);
  const [copiedMpn, setCopiedMpn] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Contextual modal state for instant Quote / Availability request
  const [modalOpen, setModalOpen] = useState(false);
  const [enqName, setEnqName] = useState('');
  const [enqEmail, setEnqEmail] = useState('');
  const [enqPhone, setEnqPhone] = useState('');
  const [enqCompany, setEnqCompany] = useState('');
  const [enqNotes, setEnqNotes] = useState('');
  const [submittingEnq, setSubmittingEnq] = useState(false);
  const [enqSuccess, setEnqSuccess] = useState<string | null>(null);

  const isPurchasable = decision.action === 'PURCHASE';
  const isSuperseded = decision.action === 'VIEW_REPLACEMENT';
  const brandName = (part.brand || part.manufacturer || 'Alkota OEM').replace(/-/g, ' ');

  // Detect scroll for mobile sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPn = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(part.part_number);
      setCopiedPn(true);
      setTimeout(() => setCopiedPn(false), 2000);
    }
  };

  const handleCopyMpn = () => {
    if (navigator.clipboard && part.mpn) {
      navigator.clipboard.writeText(part.mpn);
      setCopiedMpn(true);
      setTimeout(() => setCopiedMpn(false), 2000);
    }
  };

  async function handleSubmitEnquiry(e: React.FormEvent) {
    e.preventDefault();
    setSubmittingEnq(true);
    try {
      const res = await fetch('/api/parts/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: enqName,
          email: enqEmail,
          phone: enqPhone,
          company: enqCompany,
          requested_parts: [{
            part_id: part.id,
            part_number: part.part_number,
            name: part.name,
            quantity,
          }],
          notes: `Action: ${decision.action} (${decision.label})\nProduct: ${part.part_number} (${part.name})\nReason: ${decision.reason}\n\n${enqNotes}`,
          urgency: 'standard',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEnqSuccess(data.formatted_ref || data.reference_id);
      } else {
        alert(data.error || 'Failed to submit request');
      }
    } catch {
      alert('Error submitting enquiry. Please call our workshop desk directly.');
    } finally {
      setSubmittingEnq(false);
    }
  }

  // If HIDDEN, render an administrative restriction note
  if (decision.action === 'HIDDEN') {
    return (
      <div className="p-4 bg-red-950/20 border border-red-800/40 rounded-[4px] text-xs text-red-300 font-ibm-plex-mono">
        <div className="font-bold flex items-center gap-1.5 mb-1">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          PRODUCT PUBLICATION RESTRICTED
        </div>
        <p className="text-[#AAA] font-sans text-xs">{decision.reason}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 pt-5 border-t border-[#E8E6DF]">
        {/* ── PART NUMBER & MPN QUICK COPY ROW ── */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#FAF9F5] border border-[#EDECEA] rounded-[4px]">
          <div className="flex items-center gap-2">
            <span className="font-ibm-plex-mono text-[10px] uppercase text-[#777]">Part Number:</span>
            <span className="font-ibm-plex-mono text-xs font-bold text-[#0F172A]">{part.part_number}</span>
            <button
              type="button"
              onClick={handleCopyPn}
              className="p-1 text-[#888] hover:text-[#0F172A] transition-colors"
              title="Copy Part Number"
            >
              {copiedPn ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {part.mpn && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-ibm-plex-mono text-[10px] uppercase text-[#777]">MPN:</span>
              <span className="font-ibm-plex-mono text-xs text-[#475569]">{part.mpn}</span>
              <button
                type="button"
                onClick={handleCopyMpn}
                className="p-1 text-[#888] hover:text-[#0F172A] transition-colors"
                title="Copy MPN"
              >
                {copiedMpn ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* ── SUPERSEDED ACTION (IF APPLICABLE) ── */}
        {isSuperseded ? (
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-[4px] text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Part Superseded by Manufacturer</span>
                <span>Original part is discontinued. Please order the verified replacement part #{decision.replacementProductId}.</span>
              </div>
            </div>

            <ProductActionCTA 
              product={part} 
              decision={decision} 
              size="lg" 
              className="w-full"
            />
          </div>
        ) : (
          /* ── QUANTITY SELECTOR + PRIMARY ACTION ── */
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Quantity Stepper (1 to 99) */}
            {isPurchasable && (
              <div className="flex items-center border border-[#CBD5E1] rounded-[4px] bg-white self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-sm hover:bg-[#F1F5F9] transition-colors text-[#64748B] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 font-ibm-plex-mono text-xs text-center min-w-10 font-bold text-[#0F172A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="px-3.5 py-3 text-sm hover:bg-[#F1F5F9] transition-colors text-[#64748B] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}

            {/* Authoritative Action Component */}
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <ProductActionCTA 
                product={part}
                decision={decision}
                quantity={quantity}
                size="lg"
                className="flex-1 w-full"
                onRequestEnquiryModal={() => setModalOpen(true)}
              />

              {!isPurchasable && (
                <Link
                  href={`/parts/find?tab=part_number`}
                  className="flex items-center justify-center px-4 py-3.5 bg-[#FAF9F5] border border-[#CBD5E1] text-[#334155] hover:border-[#0F172A] font-ibm-plex-mono text-xs uppercase tracking-wider rounded-[4px] transition-colors"
                >
                  Check Alternatives
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Reassurance Notice */}
        <div className="pt-2 text-[11px] text-[#64748B] flex items-center gap-2 font-light">
          <HelpCircle className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
          <span>
            {isPurchasable
              ? 'Prices exclude VAT. 20% VAT added at checkout. Verified VAT invoice issued upon despatch.'
              : decision.reason}
          </span>
        </div>
      </div>

      {/* ── MOBILE STICKY PURCHASE BAR ── */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#CBD5E1] p-3 shadow-lg flex items-center justify-between gap-4 md:hidden">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[#0F172A] truncate">{part.name}</div>
            <div className="font-ibm-plex-mono text-[11px] text-[#64748B]">
              {decision.priceExVat !== null ? `£${(decision.priceExVat * quantity).toFixed(2)} Ex. VAT` : 'Price on Application'}
            </div>
          </div>

          <div className="shrink-0">
            <ProductActionCTA 
              product={part}
              decision={decision}
              quantity={quantity}
              size="sm"
              onRequestEnquiryModal={() => setModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* ── CONTEXTUAL AVAILABILITY & QUOTE REQUEST MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#DDD] max-w-md w-full rounded-[6px] shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#888] hover:text-black p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {enqSuccess ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold text-[#0F172A]">Enquiry Received</h3>
                <div className="p-2.5 bg-[#FAF9F5] border border-[#DDD] rounded font-ibm-plex-mono text-xs">
                  Reference: <strong className="text-[#FF6900]">{enqSuccess}</strong>
                </div>
                <p className="text-xs text-[#64748B]">
                  Our parts desk will verify availability and quote lead time within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEnqSuccess(null);
                  }}
                  className="px-5 py-2 bg-black text-white text-xs font-ibm-plex-mono uppercase rounded mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <span className="font-ibm-plex-mono text-[10px] uppercase text-[#FF6900] font-bold block mb-1">
                  // {decision.label}
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">
                  {part.name}
                </h3>
                <div className="text-xs font-mono text-[#64748B] mb-4">
                  Part #{part.part_number} · {brandName}
                </div>

                <form onSubmit={handleSubmitEnquiry} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={enqName}
                      onChange={(e) => setEnqName(e.target.value)}
                      className="w-full p-2 bg-[#FAF9F5] border border-[#CBD5E1] rounded text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={enqEmail}
                        onChange={(e) => setEnqEmail(e.target.value)}
                        className="w-full p-2 bg-[#FAF9F5] border border-[#CBD5E1] rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Phone</label>
                      <input
                        type="tel"
                        value={enqPhone}
                        onChange={(e) => setEnqPhone(e.target.value)}
                        className="w-full p-2 bg-[#FAF9F5] border border-[#CBD5E1] rounded text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Company / Depot</label>
                    <input
                      type="text"
                      value={enqCompany}
                      onChange={(e) => setEnqCompany(e.target.value)}
                      className="w-full p-2 bg-[#FAF9F5] border border-[#CBD5E1] rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0F172A] mb-1">Additional Notes</label>
                    <textarea
                      rows={2}
                      value={enqNotes}
                      onChange={(e) => setEnqNotes(e.target.value)}
                      placeholder="Specify your machine model or urgency..."
                      className="w-full p-2 bg-[#FAF9F5] border border-[#CBD5E1] rounded text-xs"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-3 py-1.5 text-xs text-[#64748B]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingEnq}
                      className="px-5 py-2 bg-[#FF6900] hover:bg-black text-white text-xs font-ibm-plex-mono uppercase font-bold rounded disabled:opacity-50"
                    >
                      {submittingEnq ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
