/**
 * Alkota UK — Central Product Action Resolver & Commercial State Enforcement
 * 
 * Definitive implementation of the 12-stage Product Action Resolver Pseudocode Contract.
 * Evaluates products strictly in the authoritative order:
 *   Stage 1: Hard Visibility Gate
 *   Stage 2: Product Identity / Data Integrity Gate
 *   Stage 3: Supersession / Discontinuation Gate
 *   Stage 4: Explicit Commercial Mode
 *   Stage 5: Product Type Capability
 *   Stage 6: Customer Price Validation & £0 Protection
 *   Stage 7: Compatibility Requirement
 *   Stage 8: Explicit Availability Mode
 *   Stage 9: Availability Evaluation
 *   Stage 10: Commercial Enablement
 *   Stage 11: Purchase Eligibility (Positive opt-in)
 *   Stage 12: Final Safe Fallback
 */

export type ProductType = 
  | 'MACHINE' 
  | 'PART' 
  | 'ATTACHMENT' 
  | 'CHEMICAL' 
  | 'ACCESSORY' 
  | 'SERVICE_KIT' 
  | 'SUPPLIER_PRODUCT';

export type PublicationState = 
  | 'DRAFT' 
  | 'NEEDS_REVIEW' 
  | 'READY' 
  | 'PUBLISHED' 
  | 'ARCHIVED';

export type CustomerActionType = 
  | 'PURCHASE' 
  | 'REQUEST_AVAILABILITY' 
  | 'REQUEST_QUOTE' 
  | 'CONTACT_FOR_IDENTIFICATION' 
  | 'VIEW_ONLY' 
  | 'VIEW_REPLACEMENT' 
  | 'HIDDEN';

export type CompatibilityStatus = 
  | 'CONFIRMED' 
  | 'NOT_COMPATIBLE' 
  | 'UNKNOWN'
  | 'NOT_VERIFIED';

export interface ProductActionContext {
  machineModel?: string;
  compatibilityStatus?: CompatibilityStatus;
  userRole?: string; // 'admin' | 'staff' | 'dealer' | 'customer'
  includeAdminOverrides?: boolean;
}

export interface ProductActionDecision {
  action: CustomerActionType;
  label: string;
  enabled: boolean;
  reason: string;
  productId: string;
  productType: ProductType;
  price: number | null;
  priceExVat: number | null;
  priceIncVat: number | null;
  currency: string;
  availability: string;
  replacementProductId?: string | null;
  replacementSlug?: string | null;
  compatibilityStatus?: CompatibilityStatus | null;
  requiresMachineContext?: boolean;
  requiresEnquiry?: boolean;
  purchasable?: boolean;
  quoteOnly?: boolean;
  requestAvailability?: boolean;
  viewOnly?: boolean;
  conflicts?: string[];
}

/**
 * Permitted actions mapped by Product Type as per Section 23
 */
export const PERMITTED_ACTIONS_BY_TYPE: Record<ProductType, readonly CustomerActionType[]> = {
  PART: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'CONTACT_FOR_IDENTIFICATION',
    'VIEW_ONLY',
    'VIEW_REPLACEMENT',
    'HIDDEN',
  ],
  MACHINE: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'VIEW_ONLY',
    'HIDDEN',
  ],
  ATTACHMENT: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'VIEW_ONLY',
    'HIDDEN',
  ],
  CHEMICAL: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'VIEW_ONLY',
    'HIDDEN',
  ],
  ACCESSORY: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'VIEW_ONLY',
    'HIDDEN',
  ],
  SERVICE_KIT: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'VIEW_ONLY',
    'HIDDEN',
  ],
  SUPPLIER_PRODUCT: [
    'PURCHASE',
    'REQUEST_AVAILABILITY',
    'REQUEST_QUOTE',
    'VIEW_ONLY',
    'HIDDEN',
  ],
};

export function getPermittedActionsForProductType(type: ProductType): readonly CustomerActionType[] {
  return PERMITTED_ACTIONS_BY_TYPE[type] || PERMITTED_ACTIONS_BY_TYPE.PART;
}

/**
 * Standard customer CTA labels mapped strictly as per Section 29
 */
export const ACTION_CTA_LABELS: Record<CustomerActionType, string> = {
  PURCHASE: 'Add to Basket',
  REQUEST_AVAILABILITY: 'Request Availability',
  REQUEST_QUOTE: 'Request a Quote',
  CONTACT_FOR_IDENTIFICATION: 'Ask Alkota UK',
  VIEW_REPLACEMENT: 'View Replacement',
  VIEW_ONLY: 'View Product',
  HIDDEN: 'Unavailable',
};

/**
 * Normalised Product Commercial State
 */
export interface NormalisedCommercialState {
  productId: string;
  partNumber: string;
  name: string;
  slug: string;
  productType: ProductType;
  publicationState: PublicationState;
  active: boolean;
  needsReview: boolean;
  publicationBlocked: boolean;
  isViewOnly: boolean;
  isQuoteOnly: boolean;
  isRequestAvailability: boolean;
  isFree: boolean;
  commerciallyEnabled: boolean;
  price: number | null;
  vatRate: number;
  currency: string;
  inStock: boolean;
  stockQuantity: number;
  availabilityStatus: string;
  stockType: string;
  directEcommerceAllowed: boolean;
  purchasableSpecialOrder: boolean;
  isSuperseded: boolean;
  supersededBy: string | null;
  replacementSlug: string | null;
  isDiscontinued: boolean;
  requiresCompatibilityConfirmation: boolean;
}

/**
 * Normalise raw input into a typed commercial state
 */
export function normaliseProductCommercialState(
  product: any,
  explicitType?: ProductType
): NormalisedCommercialState {
  if (!product) {
    return {
      productId: '',
      partNumber: '',
      name: '',
      slug: '',
      productType: explicitType || 'PART',
      publicationState: 'DRAFT',
      active: false,
      needsReview: true,
      publicationBlocked: true,
      isViewOnly: false,
      isQuoteOnly: false,
      isRequestAvailability: false,
      isFree: false,
      commerciallyEnabled: false,
      price: null,
      vatRate: 0.20,
      currency: 'GBP',
      inStock: false,
      stockQuantity: 0,
      availabilityStatus: 'out_of_stock',
      stockType: 'direct_stock',
      directEcommerceAllowed: false,
      purchasableSpecialOrder: false,
      isSuperseded: false,
      supersededBy: null,
      replacementSlug: null,
      isDiscontinued: false,
      requiresCompatibilityConfirmation: false,
    };
  }

  // Deduce Product Type
  let pType: ProductType = explicitType || 'PART';
  if (!explicitType) {
    if (product.product_type || product.productType) {
      const pt = String(product.product_type || product.productType).toUpperCase();
      if (pt === 'MACHINE') pType = 'MACHINE';
      else if (pt === 'ATTACHMENT') pType = 'ATTACHMENT';
      else if (pt === 'CHEMICAL') pType = 'CHEMICAL';
      else if (pt === 'ACCESSORY') pType = 'ACCESSORY';
      else if (pt === 'SERVICE_KIT') pType = 'SERVICE_KIT';
      else if (pt === 'SUPPLIER_PRODUCT') pType = 'SUPPLIER_PRODUCT';
      else pType = 'PART';
    } else if (product.is_attachment || product.category === 'attachments' || product.category === 'surface-cleaners') {
      pType = 'ATTACHMENT';
    } else if (product.category === 'chemicals') {
      pType = 'CHEMICAL';
    } else if (product.category === 'service-kits' || product.kit_number) {
      pType = 'SERVICE_KIT';
    } else if (product.series || product.drive_type || product.fuel_type) {
      pType = 'MACHINE';
    }
  }

  // Publication State
  let pubState: PublicationState = 'PUBLISHED';
  const rawStatus = String(product.status || '').toUpperCase();
  const rawPub = String(product.publication_state || product.publicationState || '').toUpperCase();

  if (product.active === false || rawPub === 'ARCHIVED' || rawStatus === 'ARCHIVED') {
    pubState = 'ARCHIVED';
  } else if (product.needs_review === true || product.needsReview === true || rawPub === 'NEEDS_REVIEW' || rawStatus === 'NEEDS_REVIEW') {
    pubState = 'NEEDS_REVIEW';
  } else if (rawPub === 'DRAFT' || rawStatus === 'DRAFT') {
    pubState = 'DRAFT';
  } else if (rawPub === 'READY' || rawStatus === 'READY') {
    pubState = 'READY';
  } else if (rawPub === 'UNPUBLISHED' || rawPub === 'PUBLICATION_BLOCKED') {
    pubState = 'DRAFT';
  } else {
    pubState = 'PUBLISHED';
  }

  // Explicit free product
  const isFree = Boolean(product.is_free || product.isFree || product.commercialMode === 'FREE_OF_CHARGE');

  // Customer Price Parsing
  let parsedPrice: number | null = null;
  const rawPrice = product.customerPrice !== undefined ? product.customerPrice : product.price;
  if (rawPrice !== null && rawPrice !== undefined && rawPrice !== '') {
    const num = Number(rawPrice);
    if (!isNaN(num)) {
      if (num > 0 || (num === 0 && isFree)) {
        parsedPrice = num;
      }
    }
  }

  // Supersession
  const supersededByVal = product.confirmedReplacementProductId || product.superseded_by || product.supersededBy || 
    (Array.isArray(product.replacement_part_ids) && product.replacement_part_ids.length > 0 ? product.replacement_part_ids[0] : null);
  const isSup = Boolean(product.status === 'SUPERSEDED' || rawStatus === 'SUPERSEDED' || product.superseded || supersededByVal);

  // Discontinued
  const isDisc = Boolean(product.status === 'DISCONTINUED' || rawStatus === 'DISCONTINUED' || product.discontinued);

  // Availability status
  const availStatus = String(product.availability || product.availability_status || (product.in_stock ? 'in_stock' : 'out_of_stock')).toLowerCase();

  return {
    productId: String(product.id || product._id || product.part_number || product.partNumber || ''),
    partNumber: String(product.part_number || product.partNumber || product.sku || product.mpn || ''),
    name: String(product.name || product.title || ''),
    slug: String(product.slug?.current || product.slug || ''),
    productType: pType,
    publicationState: pubState,
    active: product.active !== false,
    needsReview: Boolean(product.needs_review || product.needsReview),
    publicationBlocked: Boolean(product.publication_blocked || product.publicationBlocked || rawPub === 'PUBLICATION_BLOCKED'),
    isViewOnly: Boolean(product.view_only || product.viewOnly),
    isQuoteOnly: Boolean(product.quote_only || product.quoteOnly || (pType === 'MACHINE' && !product.online_purchasable)),
    isRequestAvailability: Boolean(product.request_availability || product.requestAvailability),
    isFree,
    commerciallyEnabled: product.commercially_enabled !== false && product.commerciallyEnabled !== false,
    price: parsedPrice,
    vatRate: Number(product.vat_rate || product.vatRate) || 0.20,
    currency: product.currency || 'GBP',
    inStock: Boolean(product.in_stock ?? product.inStock),
    stockQuantity: typeof product.stock_quantity === 'number' ? product.stock_quantity : (typeof product.stockQuantity === 'number' ? product.stockQuantity : (product.in_stock ? 10 : 0)),
    availabilityStatus: availStatus,
    stockType: product.stock_type || product.stockType || 'direct_stock',
    directEcommerceAllowed: Boolean(product.direct_ecommerce_allowed || product.purchasableFromSupplierStock || product.stock_type === 'direct_stock'),
    purchasableSpecialOrder: Boolean(product.purchasable_special_order || product.purchasableSpecialOrder),
    isSuperseded: isSup,
    supersededBy: supersededByVal,
    replacementSlug: product.replacement_slug || product.replacementSlug || null,
    isDiscontinued: isDisc,
    requiresCompatibilityConfirmation: Boolean(product.requires_compatibility_confirmation || product.requiresCompatibilityConfirmation),
  };
}

/**
 * Detect commercial data quality conflicts for Admin Diagnostics (Section 35)
 */
export function detectCommercialConflicts(product: any): string[] {
  const norm = normaliseProductCommercialState(product);
  const conflicts: string[] = [];

  // 1. PURCHASABLE = true + customer_price = null
  if (norm.commerciallyEnabled && norm.price === null && !norm.isQuoteOnly && !norm.isViewOnly) {
    conflicts.push('Commercially enabled for purchase but customer price is missing (POA).');
  }

  // 2. PURCHASABLE = true + DISCONTINUED
  if (norm.isDiscontinued && norm.price !== null) {
    conflicts.push('Product is discontinued but retains an active purchase price.');
  }

  // 3. QUOTE_ONLY = true + VIEW_ONLY = true
  if (norm.isQuoteOnly && norm.isViewOnly) {
    conflicts.push('Contradictory commercial mode: Both QUOTE_ONLY and VIEW_ONLY are set to true.');
  }

  // 4. SUPERSEDED + price > 0 / in_stock
  if (norm.isSuperseded && (norm.price !== null || norm.inStock)) {
    conflicts.push('Product is marked superseded but retains an active price or in-stock status.');
  }

  // 5. ARCHIVED + active / published
  if (norm.publicationState === 'ARCHIVED' && norm.active) {
    conflicts.push('Product is archived but marked active: true in publication state.');
  }

  // 6. NEEDS_REVIEW + price > 0
  if (norm.needsReview && norm.price !== null) {
    conflicts.push('Product requires data quality review but has an active commercial price.');
  }

  // 7. IN_STOCK + stockQuantity === 0
  if (norm.inStock && norm.stockQuantity === 0) {
    conflicts.push('Marked IN_STOCK but recorded stock quantity is 0.');
  }

  // 8. OUT_OF_STOCK + stockQuantity > 0
  if (!norm.inStock && norm.stockQuantity > 0) {
    conflicts.push('Marked OUT_OF_STOCK but recorded stock quantity is positive.');
  }

  return conflicts;
}

/**
 * Authoritative Central Product Action Resolver
 * 
 * Implements the explicit 12-stage pseudocode contract:
 * Stage 1: Hard Visibility Gate
 * Stage 2: Product Identity / Data Integrity Gate
 * Stage 3: Supersession / Discontinuation Gate
 * Stage 4: Explicit Commercial Mode
 * Stage 5: Product Type Capability
 * Stage 6: Customer Price Validation & £0 Protection
 * Stage 7: Compatibility Requirement
 * Stage 8: Explicit Availability Mode
 * Stage 9: Availability Evaluation
 * Stage 10: Commercial Enablement
 * Stage 11: Purchase Eligibility (Positive opt-in)
 * Stage 12: Final Safe Fallback
 */
export function resolveProductAction(
  product: any,
  context?: ProductActionContext
): ProductActionDecision {
  const norm = normaliseProductCommercialState(product);
  const conflicts = detectCommercialConflicts(product);

  const priceExVat = norm.price;
  const priceIncVat = norm.price ? Math.round(norm.price * (1 + norm.vatRate) * 100) / 100 : null;

  const makeResult = (
    action: CustomerActionType, 
    reason: string, 
    extra?: Partial<ProductActionDecision>
  ): ProductActionDecision => ({
    action,
    label: ACTION_CTA_LABELS[action],
    enabled: action === 'PURCHASE' || action === 'VIEW_REPLACEMENT',
    reason,
    productId: norm.productId,
    productType: norm.productType,
    price: norm.price,
    priceExVat,
    priceIncVat,
    currency: norm.currency,
    availability: norm.availabilityStatus,
    replacementProductId: norm.supersededBy,
    replacementSlug: norm.replacementSlug,
    compatibilityStatus: context?.compatibilityStatus || null,
    requiresMachineContext: norm.requiresCompatibilityConfirmation,
    requiresEnquiry: action === 'REQUEST_AVAILABILITY' || action === 'REQUEST_QUOTE' || action === 'CONTACT_FOR_IDENTIFICATION',
    purchasable: action === 'PURCHASE',
    quoteOnly: norm.isQuoteOnly,
    requestAvailability: norm.isRequestAvailability,
    viewOnly: norm.isViewOnly,
    conflicts,
    ...extra,
  });

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 1 — HARD VISIBILITY GATE
  // ══════════════════════════════════════════════════════════════════════
  if (
    !norm.active ||
    norm.publicationBlocked ||
    norm.publicationState === 'DRAFT' ||
    norm.publicationState === 'NEEDS_REVIEW' ||
    norm.publicationState === 'ARCHIVED' ||
    norm.needsReview
  ) {
    if (!context?.includeAdminOverrides) {
      return makeResult(
        'HIDDEN',
        'Product is not approved for public display.',
        { enabled: false }
      );
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 2 — PRODUCT IDENTITY / DATA INTEGRITY
  // ══════════════════════════════════════════════════════════════════════
  if (!norm.productId && !norm.partNumber) {
    return makeResult(
      'HIDDEN',
      'Product has no valid identity.',
      { enabled: false }
    );
  }

  if (!norm.productType) {
    return makeResult(
      'CONTACT_FOR_IDENTIFICATION',
      'Product type has not been established.'
    );
  }

  if (!norm.name || !norm.name.trim()) {
    return makeResult(
      'CONTACT_FOR_IDENTIFICATION',
      'Product has insufficient identifying information.'
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 3 — SUPERSESSION / DISCONTINUATION
  // ══════════════════════════════════════════════════════════════════════
  if (norm.isSuperseded) {
    if (norm.supersededBy) {
      return makeResult(
        'VIEW_REPLACEMENT',
        'Product has been superseded by a confirmed replacement.',
        {
          label: `View Replacement (${norm.supersededBy})`,
          enabled: true,
          replacementProductId: norm.supersededBy,
        }
      );
    }
    return makeResult(
      'VIEW_ONLY',
      'Product has been superseded and has no confirmed replacement.',
      { enabled: false }
    );
  }

  if (norm.isDiscontinued) {
    if (norm.supersededBy) {
      return makeResult(
        'VIEW_REPLACEMENT',
        'Product has been discontinued and has a confirmed replacement.',
        {
          label: `View Replacement (${norm.supersededBy})`,
          enabled: true,
          replacementProductId: norm.supersededBy,
        }
      );
    }
    return makeResult(
      'VIEW_ONLY',
      'Product has been discontinued and has no confirmed replacement.',
      { enabled: false }
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 4 — EXPLICIT COMMERCIAL MODE
  // ══════════════════════════════════════════════════════════════════════
  if (norm.isViewOnly) {
    return makeResult(
      'VIEW_ONLY',
      'Product is explicitly configured as view only.',
      { enabled: false }
    );
  }

  if (norm.isQuoteOnly) {
    return makeResult(
      'REQUEST_QUOTE',
      'Product is explicitly configured as quote only.'
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 5 — PRODUCT TYPE CAPABILITY
  // ══════════════════════════════════════════════════════════════════════
  const permittedActions = getPermittedActionsForProductType(norm.productType);

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 6 — CUSTOMER PRICE VALIDATION
  // ══════════════════════════════════════════════════════════════════════
  const priceIsValid = norm.price !== null && norm.price > 0 && Boolean(norm.currency);
  const explicitFreeProduct = norm.isFree;

  // Zero Price Rule (£0 Protection)
  if (norm.price === 0 && !explicitFreeProduct) {
    if (permittedActions.includes('REQUEST_AVAILABILITY')) {
      return makeResult(
        'REQUEST_AVAILABILITY',
        'Product has a zero customer price without explicit free-of-charge configuration.'
      );
    }
    if (permittedActions.includes('REQUEST_QUOTE')) {
      return makeResult(
        'REQUEST_QUOTE',
        'Product has an invalid zero customer price.'
      );
    }
  }

  // Missing or Invalid Price
  if (!priceIsValid && !explicitFreeProduct) {
    if (permittedActions.includes('REQUEST_AVAILABILITY')) {
      return makeResult(
        'REQUEST_AVAILABILITY',
        'No valid approved customer price is available.'
      );
    }
    if (permittedActions.includes('REQUEST_QUOTE')) {
      return makeResult(
        'REQUEST_QUOTE',
        'No valid customer price is available and the product requires quotation.'
      );
    }
    return makeResult(
      'VIEW_ONLY',
      'Product has no valid customer price and no permitted commercial enquiry action.',
      { enabled: false }
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 7 — COMPATIBILITY REQUIREMENT
  // ══════════════════════════════════════════════════════════════════════
  const compatibilityStatus = context?.compatibilityStatus || (context?.machineModel ? 'UNKNOWN' : null);

  if (norm.requiresCompatibilityConfirmation) {
    if (compatibilityStatus === 'NOT_COMPATIBLE') {
      return makeResult(
        'CONTACT_FOR_IDENTIFICATION',
        'Product is not compatible with the selected machine.'
      );
    }

    if (compatibilityStatus === 'UNKNOWN' || compatibilityStatus === 'NOT_VERIFIED') {
      return makeResult(
        'CONTACT_FOR_IDENTIFICATION',
        'Compatibility must be confirmed before purchase.'
      );
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 8 — EXPLICIT AVAILABILITY MODE
  // ══════════════════════════════════════════════════════════════════════
  if (norm.isRequestAvailability) {
    return makeResult(
      'REQUEST_AVAILABILITY',
      'Product is explicitly configured to require availability confirmation.'
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 9 — AVAILABILITY
  // ══════════════════════════════════════════════════════════════════════
  const avail = norm.availabilityStatus;

  switch (avail) {
    case 'out_of_stock':
      if (permittedActions.includes('REQUEST_AVAILABILITY')) {
        return makeResult(
          'REQUEST_AVAILABILITY',
          'Product is currently out of stock.'
        );
      }
      if (permittedActions.includes('REQUEST_QUOTE')) {
        return makeResult(
          'REQUEST_QUOTE',
          'Product is unavailable and requires quotation.'
        );
      }
      return makeResult(
        'VIEW_ONLY',
        'Product is unavailable.',
        { enabled: false }
      );

    case 'check_availability':
      if (permittedActions.includes('REQUEST_AVAILABILITY')) {
        return makeResult(
          'REQUEST_AVAILABILITY',
          'Current availability requires confirmation.'
        );
      }
      if (permittedActions.includes('REQUEST_QUOTE')) {
        return makeResult(
          'REQUEST_QUOTE',
          'Current availability requires quotation.'
        );
      }
      return makeResult(
        'VIEW_ONLY',
        'Current availability cannot be confirmed.',
        { enabled: false }
      );

    case 'supplier_stock':
      if (!norm.directEcommerceAllowed) {
        return makeResult(
          'REQUEST_AVAILABILITY',
          'Product is available from supplier stock but requires confirmation before customer purchase.'
        );
      }
      // Continue to purchase validation
      break;

    case 'special_order':
      if (!norm.purchasableSpecialOrder) {
        return makeResult(
          'REQUEST_AVAILABILITY',
          'Product is a special-order item and requires confirmation.'
        );
      }
      // Continue to purchase validation
      break;

    case 'in_stock':
    case 'available':
      // Continue to purchase validation
      break;

    default:
      if (!norm.inStock && norm.stockQuantity <= 0) {
        return makeResult(
          'REQUEST_AVAILABILITY',
          'Product is currently out of stock.'
        );
      }
      return makeResult(
        'REQUEST_AVAILABILITY',
        'Product availability has not been sufficiently established.'
      );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 10 — COMMERCIAL ENABLEMENT
  // ══════════════════════════════════════════════════════════════════════
  if (!norm.commerciallyEnabled) {
    if (permittedActions.includes('REQUEST_AVAILABILITY')) {
      return makeResult(
        'REQUEST_AVAILABILITY',
        'Product is not currently commercially enabled for direct purchase.'
      );
    }
    if (permittedActions.includes('REQUEST_QUOTE')) {
      return makeResult(
        'REQUEST_QUOTE',
        'Product is not enabled for direct ecommerce purchase.'
      );
    }
    return makeResult(
      'VIEW_ONLY',
      'Product is not commercially enabled.',
      { enabled: false }
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 11 — PURCHASE ELIGIBILITY (Positive Opt-In)
  // ══════════════════════════════════════════════════════════════════════
  const availabilityAllowsPurchase = ['in_stock', 'available', 'supplier_stock', 'special_order'].includes(avail) || norm.inStock;
  const purchaseEligible =
    (priceIsValid || explicitFreeProduct) &&
    norm.commerciallyEnabled &&
    availabilityAllowsPurchase &&
    permittedActions.includes('PURCHASE');

  if (purchaseEligible) {
    return makeResult(
      'PURCHASE',
      'Published, valid identity, commercially enabled, valid customer price and purchasable availability.',
      {
        enabled: true,
        price: norm.price,
        currency: norm.currency,
        availability: norm.availabilityStatus,
        compatibilityStatus,
      }
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // STAGE 12 — FINAL SAFE FALLBACK
  // ══════════════════════════════════════════════════════════════════════
  if (permittedActions.includes('REQUEST_AVAILABILITY')) {
    return makeResult(
      'REQUEST_AVAILABILITY',
      'Product cannot currently be purchased directly but availability can be requested.'
    );
  }

  if (permittedActions.includes('REQUEST_QUOTE')) {
    return makeResult(
      'REQUEST_QUOTE',
      'Product cannot currently be purchased directly and requires quotation.'
    );
  }

  return makeResult(
    'VIEW_ONLY',
    'Product is visible but is not currently available for direct transaction.',
    { enabled: false }
  );
}

/**
 * Batch resolve actions for multiple products (e.g. category browse or search)
 */
export function resolveProductActionsBatch(
  products: any[],
  context?: ProductActionContext
): Map<string, ProductActionDecision> {
  const map = new Map<string, ProductActionDecision>();
  for (const p of products) {
    if (!p) continue;
    const decision = resolveProductAction(p, context);
    const key = String(p.id || p.part_number || p.slug || '');
    if (key) map.set(key, decision);
  }
  return map;
}
