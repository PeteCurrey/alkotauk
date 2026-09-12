'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  FileQuestion, 
  HelpCircle, 
  AlertTriangle,
  ExternalLink,
  Ban
} from 'lucide-react';
import { 
  CustomerActionType, 
  ProductActionDecision, 
  ProductActionContext,
  resolveProductAction 
} from '@/lib/commerce/action-resolver';
import { useCart } from '@/context/CartContext';
import { usePartsRequest } from '@/components/parts/PartsRequestListContext';

export interface ProductActionCTAProps {
  product: any;
  decision?: ProductActionDecision;
  context?: ProductActionContext;
  variant?: 'primary' | 'secondary' | 'card' | 'sticky' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  quantity?: number;
  showPrice?: boolean;
  className?: string;
  onActionTriggered?: (action: CustomerActionType) => void;
  onRequestEnquiryModal?: () => void;
}

export default function ProductActionCTA({
  product,
  decision: providedDecision,
  context,
  variant = 'primary',
  size = 'md',
  quantity = 1,
  showPrice = false,
  className = '',
  onActionTriggered,
  onRequestEnquiryModal,
}: ProductActionCTAProps) {
  const { addItem: addToCart } = useCart();
  const { addItem: addToEnquiry, setIsDrawerOpen: openEnquiryDrawer } = usePartsRequest();

  const [cartSuccess, setCartSuccess] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Authoritative action decision (resolve if not provided)
  const decision: ProductActionDecision = providedDecision || resolveProductAction(product, context);

  // If HIDDEN and not in admin override mode, do not render customer CTA
  if (decision.action === 'HIDDEN') {
    if (context?.includeAdminOverrides) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-red-950/40 text-red-400 border border-red-800/50 font-ibm-plex-mono text-[10px] uppercase tracking-wider">
          <Ban className="w-3 h-3" /> Unpublished / Hidden
        </span>
      );
    }
    return null;
  }

  // Handle PURCHASE click
  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!decision.enabled || decision.price === null || decision.price <= 0) return;

    addToCart(
      {
        id: decision.productId || product.id,
        name: product.name || 'Component',
        price: decision.price,
        image: product.image_url || product.image || undefined,
        sku: product.part_number || product.sku || undefined,
      },
      quantity
    );

    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2200);
    onActionTriggered?.('PURCHASE');
  };

  // Handle Enquiry / Availability / Quote / ID click
  const handleEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onRequestEnquiryModal) {
      onRequestEnquiryModal();
      onActionTriggered?.(decision.action);
      return;
    }

    addToEnquiry({
      id: decision.productId || product.id,
      part_number: product.part_number || product.sku || 'N/A',
      name: product.name || 'Component',
      price_each: decision.price,
      machine_context: context?.machineModel || product.brand || undefined,
      image: product.image_url || product.image || undefined,
      sku: product.sku || product.part_number,
      quantity,
    });

    setEnquirySuccess(true);
    openEnquiryDrawer(true);
    setTimeout(() => setEnquirySuccess(false), 2200);
    onActionTriggered?.(decision.action);
  };

  // ─── STYLING CALCULATIONS ──────────────────────────────────────────
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-5 py-3 text-xs',
    lg: 'px-8 py-4 text-sm font-medium',
  }[size];

  // ─── 1. VIEW_REPLACEMENT (Navigation Link) ──────────────────────────
  if (decision.action === 'VIEW_REPLACEMENT') {
    const replacementTarget = decision.replacementSlug 
      ? `/parts-attachments/product/${decision.replacementSlug}`
      : `/parts-attachments/product/${decision.replacementProductId}`;

    if (variant === 'card') {
      return (
        <Link
          href={replacementTarget}
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-300/80 rounded-[4px] font-ibm-plex-mono text-[10px] uppercase tracking-wider transition-all no-underline ${className}`}
        >
          <span>{decision.label}</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      );
    }

    return (
      <Link
        href={replacementTarget}
        className={`inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white rounded-[4px] font-ibm-plex-mono text-xs uppercase tracking-widest transition-all shadow-sm ${sizeClasses} ${className}`}
      >
        <span>{decision.label}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }

  // ─── 2. VIEW_ONLY (Non-transactional / Informational) ───────────────
  if (decision.action === 'VIEW_ONLY') {
    const detailUrl = product.slug ? `/parts-attachments/product/${product.slug}` : '#';
    return (
      <Link
        href={detailUrl}
        className={`inline-flex items-center justify-center gap-2 border border-[#D5D3CC] bg-[#F5F4F0] text-[#737067] hover:border-[#9E9B94] hover:text-[#1A1A18] rounded-[4px] font-ibm-plex-mono text-[10px] uppercase tracking-widest transition-all ${sizeClasses} ${className}`}
      >
        <span>{decision.label}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    );
  }

  // ─── 3. CARD COMPACT ICON / CIRCLE BUTTON ───────────────────────────
  if (variant === 'icon') {
    if (decision.action === 'PURCHASE') {
      return (
        <button
          type="button"
          onClick={handlePurchase}
          disabled={cartSuccess}
          title="Add to Basket"
          aria-label="Add to Basket"
          className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
            cartSuccess
              ? 'bg-emerald-600 text-white'
              : 'border border-[#E0DED7] bg-white text-[#1A1A18] hover:bg-[#FF6900] hover:border-[#FF6900] hover:text-white shadow-xs'
          } ${className}`}
        >
          {cartSuccess ? <Check className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleEnquiry}
        title={decision.label}
        aria-label={decision.label}
        className={`h-8 w-8 rounded-full flex items-center justify-center border border-[#E0DED7] bg-[#FAF9F5] text-[#737067] hover:border-[#FF6900] hover:text-[#FF6900] transition-all shadow-xs ${className}`}
      >
        {enquirySuccess ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <FileQuestion className="h-3.5 w-3.5" />}
      </button>
    );
  }

  // ─── 4. CARD GRID VARIANT ──────────────────────────────────────────
  if (variant === 'card') {
    if (decision.action === 'PURCHASE') {
      return (
        <button
          type="button"
          onClick={handlePurchase}
          disabled={cartSuccess}
          className={`w-full inline-flex items-center justify-center gap-2 bg-[#FF6900] hover:bg-[#e05d00] text-white rounded-[4px] font-ibm-plex-mono text-[11px] uppercase tracking-wider py-2.5 px-3 transition-all shadow-xs btn-tactile ${className}`}
        >
          {cartSuccess ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{decision.label}</span>
              {showPrice && decision.price && <span>· £{decision.price.toFixed(2)}</span>}
            </>
          )}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={handleEnquiry}
        className={`w-full inline-flex items-center justify-center gap-1.5 border border-[#D5D3CC] hover:border-[#FF6900] bg-white hover:bg-[#FAF9F5] text-[#2C2B28] hover:text-[#FF6900] rounded-[4px] font-ibm-plex-mono text-[10px] uppercase tracking-wider py-2 px-2.5 transition-all ${className}`}
      >
        {enquirySuccess ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700">Enquiry Added</span>
          </>
        ) : (
          <>
            <FileQuestion className="h-3.5 w-3.5 text-[#9E9B94]" />
            <span>{decision.label}</span>
          </>
        )}
      </button>
    );
  }

  // ─── 5. FULL DETAIL PAGE & STICKY BAR VARIANTS ──────────────────────
  if (decision.action === 'PURCHASE') {
    return (
      <button
        type="button"
        onClick={handlePurchase}
        disabled={cartSuccess}
        className={`inline-flex items-center justify-center gap-2.5 bg-[#FF6900] hover:bg-[#e05d00] text-white rounded-[4px] font-ibm-plex-mono uppercase tracking-widest transition-all shadow-sm hover:shadow-md cursor-pointer btn-tactile ${sizeClasses} ${className}`}
      >
        {cartSuccess ? (
          <>
            <Check className="h-4 w-4 stroke-[2.5]" />
            <span>Added to Basket</span>
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            <span>{decision.label}</span>
            {showPrice && decision.price && (
              <span className="opacity-90 font-mono font-normal">
                · £{(decision.price * quantity).toFixed(2)} Ex VAT
              </span>
            )}
          </>
        )}
      </button>
    );
  }

  // Enquiry states: REQUEST_AVAILABILITY, REQUEST_QUOTE, CONTACT_FOR_IDENTIFICATION
  const isQuote = decision.action === 'REQUEST_QUOTE';
  const isIdent = decision.action === 'CONTACT_FOR_IDENTIFICATION';

  return (
    <button
      type="button"
      onClick={handleEnquiry}
      className={`inline-flex items-center justify-center gap-2.5 border border-[#C4C0B6] hover:border-[#FF6900] bg-white hover:bg-[#FAF9F5] text-[#1A1A18] hover:text-[#FF6900] rounded-[4px] font-ibm-plex-mono uppercase tracking-widest transition-all cursor-pointer shadow-xs ${sizeClasses} ${className}`}
    >
      {enquirySuccess ? (
        <>
          <Check className="h-4 w-4 text-emerald-600 stroke-[2.5]" />
          <span className="text-emerald-700">Request Added</span>
        </>
      ) : (
        <>
          {isIdent ? (
            <HelpCircle className="h-4 w-4 text-[#FF6900]" />
          ) : isQuote ? (
            <FileQuestion className="h-4 w-4 text-[#FF6900]" />
          ) : (
            <FileQuestion className="h-4 w-4 text-[#737067]" />
          )}
          <span>{decision.label}</span>
        </>
      )}
    </button>
  );
}
