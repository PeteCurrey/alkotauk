# Alkota UK — Canonical Product Action State Contract

## Status: AUTHORITATIVE & FROZEN
**Reference Code**: `src/lib/commerce/action-resolver.ts`  
**Governing Engine**: Central Product Action Resolver  

---

## 1. Architectural Model & Scope

The Alkota UK commerce architecture mandates a strict separation between raw data sources and commercial decision logic:

```text
RAW DATABASE DATA (Supabase / Sanity / Supplier Ingestion)
       │
       ▼
NORMALISATION LAYER (normalizeProductCommercialState)
       │
       ▼
NormalisedProductState (Canonical Domain State)
       │
       ▼
resolveProductAction(product, context)
       │
       ▼
ProductActionResult (Authoritative Commercial Truth)
       │
       ├─────────────────────────────────┐
       ▼                                 ▼
STOREFRONT / UI SURFACES         SERVER TRANSACTION GATES
(ProductActionCTA / ProductCard)  (Cart, Enquiry, Stripe Checkout)
```

**Core Invariant**: Raw database fields are **data**. Only `NormalisedProductState` is **domain state**. The resolver converts domain state into **one commercial action**. Downstream systems never reinterpret raw fields.

---

## 2. Canonical Type Definitions

### 2.1 Customer Action Type (The 7 Canonical Actions)
```ts
export type CustomerActionType = 
  | 'PURCHASE'                      // Direct eCommerce add-to-basket & instant checkout
  | 'REQUEST_AVAILABILITY'          // Enquiry required to confirm depot lead time or sourcing
  | 'REQUEST_QUOTE'                 // Formal quotation enquiry required (bespoke/large machine)
  | 'CONTACT_FOR_IDENTIFICATION'    // Serial plate / engineering photo required to prevent mismatch
  | 'VIEW_ONLY'                     // Informational reference only; no purchasing or quoting
  | 'VIEW_REPLACEMENT'              // Superseded component; customer routed to replacement SKU
  | 'HIDDEN';                       // Blocked by hard visibility / safety gates; invisible
```

### 2.2 Product Type Enum
```ts
export type ProductType = 
  | 'MACHINE'           // Industrial pressure washers (hot, cold, steam, skid, trailer)
  | 'PART'              // OEM spare components (pumps, seals, valves, coils, burners)
  | 'ATTACHMENT'        // High-pressure attachments (surface cleaners, lances, hose reels)
  | 'CHEMICAL'          // Formulations & industrial detergents (packs, drums, IBCs)
  | 'ACCESSORY'         // Ancillary items (nozzles, couplers, quick-connects)
  | 'SERVICE_KIT'       // Scheduled service maintenance kits (500h/annual)
  | 'SUPPLIER_PRODUCT'; // Staged or imported supplier inventory
```

### 2.3 Publication State Enum
```ts
export type PublicationState = 
  | 'PUBLISHED'             // Fully approved and public
  | 'READY'                 // Ready for publishing review
  | 'DRAFT'                 // Work in progress; not visible to public
  | 'NEEDS_REVIEW'          // Quality flag set; blocked from customer purchase
  | 'UNPUBLISHED'           // Explicitly unpublished
  | 'PUBLICATION_BLOCKED'   // Blocked by compliance/data policy
  | 'ARCHIVED';             // Deprecated and removed from active index
```

### 2.4 Lifecycle State Enum
```ts
export type ProductLifecycleStatus = 
  | 'ACTIVE'                // Standard production and stocked line
  | 'SUPERSEDED'            // Replaced by upgraded or successor part number
  | 'DISCONTINUED'          // Obsolete; no longer manufactured
  | 'ARCHIVED';             // Historical record only
```

### 2.5 Price State Enum
```ts
export type PriceState = 
  | 'VALID'                 // Valid numeric customer price > £0.00 (or £0 if explicitly is_free)
  | 'MISSING'               // Null, undefined, or empty (POA)
  | 'ZERO'                  // Exactly £0.00 without explicit free-of-charge exemption (BLOCKED)
  | 'INVALID';              // Negative value, NaN, or corrupted format
```

### 2.6 Availability State Enum
```ts
export type AvailabilityState = 
  // Purchasable Class:
  | 'IN_STOCK'                          // UK warehouse physical stock verified
  | 'AVAILABLE_TO_ORDER'                // Active catalogue line with verified lead time
  | 'SUPPLIER_STOCK'                    // Direct supplier stock available for immediate drop-ship
  | 'SPECIAL_ORDER_PURCHASABLE'         // Custom configuration with pre-authorised purchase

  // Enquiry Class:
  | 'CHECK_AVAILABILITY'                // Stock unconfirmed; depot check required
  | 'OUT_OF_STOCK'                      // Physical stock exhausted; backlog check required
  | 'SUPPLIER_CONFIRMATION_REQUIRED'    // Supplier stock not real-time; inquiry mandatory
  | 'SPECIAL_ORDER_REQUIRES_CONFIRMATION'// Bespoke manufacture requiring technical review

  // Non-Purchasable Class:
  | 'SUPERSEDED'                        // Superseded component
  | 'DISCONTINUED'                      // Factory line ceased
  | 'ARCHIVED'                          // Archived record
  | 'UNAVAILABLE';                      // Indefinitely unavailable
```

### 2.7 Commercial Mode Enum
```ts
export type CommercialMode = 
  | 'DIRECT_PURCHASE'       // Standard ecommerce transaction allowed
  | 'CONFIRM_FIRST'         // Must check availability prior to order commitment
  | 'QUOTE_ONLY'            // High-value machine or contract pricing; formal quote desk only
  | 'REQUEST_AVAILABILITY'  // Explicit inquiry-driven availability
  | 'VIEW_ONLY'             // Reference catalogue only
  | 'FREE_OF_CHARGE';       // Promotional or warranty component (£0 valid)
```

### 2.8 Compatibility State Enum
```ts
export type CompatibilityState = 
  | 'NOT_REQUIRED'          // Universal component or attachment (fits any machine)
  | 'CONFIRMED'             // Machine context verified and matches part compatibility table
  | 'NOT_COMPATIBLE'        // Verified incompatible with customer's selected machine
  | 'UNKNOWN'               // Machine selected but relationship unverified
  | 'NOT_VERIFIED';         // No machine context provided for a part requiring verification
```

---

## 3. Canonical Domain Representation

The normalised intermediate state consumed by `resolveProductAction`:

```ts
export interface NormalisedProductState {
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
  supersededBy?: string | null;
  replacementSlug?: string | null;
  isDiscontinued: boolean;
  requiresCompatibilityConfirmation: boolean;
}
```

---

## 4. Normalisation Invariants

1. **Price Normalisation**: Raw prices are strictly validated. If `price === null`, `price = null`. If `price <= 0` and `isFree !== true`, `price = null` (treated as POA). Negative prices are rejected.
2. **Availability Independence**: Stock quantity and availability status do not determine price. A product can be `IN_STOCK` with `price = null` (resolves to `REQUEST_AVAILABILITY`).
3. **Publication Gating**: If `active === false` or `publicationState === 'ARCHIVED'` or `publicationState === 'DRAFT'`, the normalized publication state forces `HIDDEN` action regardless of pricing or stock.
4. **Data Conflict Isolation**: Inconsistencies (such as `inStock: true` but `stockQuantity: 0`, or `commerciallyEnabled: true` but `price: null`) generate diagnostic conflict codes without causing unsafe purchases.
