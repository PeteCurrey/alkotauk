# Alkota UK — Product Action Resolver Contract

## Status: AUTHORITATIVE & FROZEN
**Reference Code**: `src/lib/commerce/action-resolver.ts`  
**Execution Order**: Definitive 12-Stage Precedence  

---

## 1. Authoritative Resolver Function

The platform defines exactly **one** commercial decision resolver:

```ts
export function resolveProductAction(
  rawProduct: any,
  context?: ProductActionContext
): ProductActionDecision
```

### 1.1 Context Parameter Contract
The resolver context is strictly bounded to prevent arbitrary UI state leakage:
```ts
export interface ProductActionContext {
  machineModel?: string;                    // Customer's selected machine model code
  compatibilityStatus?: CompatibilityStatus;// 'CONFIRMED' | 'NOT_COMPATIBLE' | 'UNKNOWN' | 'NOT_VERIFIED'
  userRole?: string;                        // 'admin' | 'staff' | 'dealer' | 'customer'
  includeAdminOverrides?: boolean;          // True when previewing hidden products in Admin CMS
}
```

---

## 2. Resolver Output Contract

The resolver returns a single, comprehensive, deterministic decision object:

```ts
export interface ProductActionDecision {
  action: CustomerActionType;               // The single primary customer action
  label: string;                            // Canonical button / CTA text label
  enabled: boolean;                         // True if action button is interactive
  reason: string;                           // Human-readable operational explanation
  reasonCode: string;                       // Machine-readable stable reason code
  productId: string;                        // Product ID
  productType: ProductType;                 // Inferred/normalised product type
  price: number | null;                     // Effective numeric price (or null if POA)
  priceExVat: number | null;                // Authoritative ex-VAT customer price
  priceIncVat: number | null;               // Authoritative inc-VAT price (20% standard rate)
  currency: string;                         // ISO currency code (default: 'GBP')
  availability: string;                     // Normalised availability status string
  replacementProductId?: string | null;     // Replaced part ID (for VIEW_REPLACEMENT)
  replacementSlug?: string | null;          // Replaced part slug (for navigation)
  compatibilityStatus?: CompatibilityStatus | null; // Compatibility outcome
  requiresMachineContext?: boolean;         // True if machine context needed
  requiresEnquiry?: boolean;                // True if action requires quote/enquiry flow
  purchasable?: boolean;                    // Positive opt-in flag (true ONLY when PURCHASE)
  quoteOnly?: boolean;                      // True when quote enquiry path mandated
  requestAvailability?: boolean;            // True when availability enquiry path mandated
  viewOnly?: boolean;                       // True when reference only
  conflicts?: string[];                     // Data quality conflicts detected
}
```

---

## 3. Output Invariants Across All Actions

### Invariant 1: PURCHASE
```text
action === 'PURCHASE'
  ===> purchasable === true
  ===> enabled === true
  ===> requiresEnquiry === false
  ===> price !== null && price > 0 (or isFree === true)
  ===> publicationState === 'PUBLISHED'
  ===> active === true
  ===> isSuperseded === false
  ===> isDiscontinued === false
  ===> commerciallyEnabled === true
  ===> availability in ['in_stock', 'available_to_order', 'supplier_stock']
```

### Invariant 2: REQUEST_AVAILABILITY
```text
action === 'REQUEST_AVAILABILITY'
  ===> purchasable === false
  ===> requiresEnquiry === true
  ===> (availability in ['out_of_stock', 'check_availability', 'special_order'] OR price === null)
```

### Invariant 3: REQUEST_QUOTE
```text
action === 'REQUEST_QUOTE'
  ===> purchasable === false
  ===> requiresEnquiry === true
  ===> quoteOnly === true
```

### Invariant 4: VIEW_REPLACEMENT
```text
action === 'VIEW_REPLACEMENT'
  ===> purchasable === false
  ===> replacementProductId != null
  ===> isSuperseded === true OR isDiscontinued === true
```

### Invariant 5: VIEW_ONLY
```text
action === 'VIEW_ONLY'
  ===> purchasable === false
  ===> viewOnly === true (or superseded/discontinued without replacement)
```

### Invariant 6: CONTACT_FOR_IDENTIFICATION
```text
action === 'CONTACT_FOR_IDENTIFICATION'
  ===> purchasable === false
  ===> requiresEnquiry === true
  ===> (missing product identity OR verified NOT_COMPATIBLE)
```

### Invariant 7: HIDDEN
```text
action === 'HIDDEN'
  ===> purchasable === false
  ===> enabled === false
  ===> (active === false OR publicationState in ['DRAFT', 'NEEDS_REVIEW', 'ARCHIVED', 'PUBLICATION_BLOCKED'])
```

---

## 4. Stable Reason Codes

Programmatic consumers evaluate `reasonCode`, not human-readable text:

| Reason Code | Applied In Stage | Description |
| :--- | :--- | :--- |
| `HIDDEN_INACTIVE` | Stage 1 | Active flag is false (`active: false`) |
| `HIDDEN_DRAFT` | Stage 1 | Draft publication state |
| `HIDDEN_NEEDS_REVIEW` | Stage 1 | Needs review flag set; blocked |
| `HIDDEN_ARCHIVED` | Stage 1 | Product archived |
| `HIDDEN_PUBLICATION_BLOCKED` | Stage 1 | Publication blocked by policy |
| `INVALID_PRODUCT_IDENTITY` | Stage 2 | Missing required ID or SKU |
| `SUPERSEDED_WITH_REPLACEMENT`| Stage 3 | Superseded with verified replacement SKU |
| `SUPERSEDED_NO_REPLACEMENT`  | Stage 3 | Superseded without replacement (view only) |
| `DISCONTINUED_WITH_REPLACEMENT`| Stage 3 | Discontinued with replacement SKU |
| `DISCONTINUED_NO_REPLACEMENT`| Stage 3 | Discontinued without replacement |
| `EXPLICIT_VIEW_ONLY` | Stage 4 | Commercial mode set to VIEW_ONLY |
| `EXPLICIT_QUOTE_ONLY` | Stage 4 | Commercial mode set to QUOTE_ONLY |
| `EXPLICIT_REQUEST_AVAILABILITY` | Stage 4 | Commercial mode set to REQUEST_AVAILABILITY |
| `PRODUCT_TYPE_UNSUPPORTED` | Stage 5 | Product type does not permit customer action |
| `CUSTOMER_PRICE_MISSING` | Stage 6 | Price on Application (POA) |
| `CUSTOMER_PRICE_ZERO` | Stage 6 | Zero-price protection triggered (£0.00 not free) |
| `CUSTOMER_PRICE_INVALID` | Stage 6 | Negative or non-numeric price |
| `COMPATIBILITY_UNVERIFIED` | Stage 7 | Compatibility confirmation required |
| `COMPATIBILITY_NOT_COMPATIBLE`| Stage 7 | Verified incompatible with selected machine |
| `AVAILABILITY_OUT_OF_STOCK` | Stage 8/9 | Physical stock depleted |
| `AVAILABILITY_CHECK_REQUIRED` | Stage 8/9 | Depot stock confirmation required |
| `AVAILABILITY_SPECIAL_ORDER` | Stage 8/9 | Special order with lead time confirmation |
| `COMMERCIAL_PURCHASE_DISABLED`| Stage 10 | Commercially disabled |
| `PURCHASE_ELIGIBLE` | Stage 11 | Direct ecommerce purchase authorized |
| `SAFE_FALLBACK` | Stage 12 | Default enquiry fallback |

---

## 5. Action to Endpoint Mapping Contract

| Customer Action | Primary Storefront Adapter | Primary Server / Navigation Endpoint |
| :--- | :--- | :--- |
| `PURCHASE` | `<ProductActionCTA variant="primary" />` | Client Cart -> `src/app/actions/stripe.ts` (`createCartCheckoutSession`) |
| `REQUEST_AVAILABILITY` | `<ProductActionCTA variant="secondary" />` | Parts Request Drawer -> `src/app/actions/enquiry.ts` (`submitEnquiry`) |
| `REQUEST_QUOTE` | `<ProductActionCTA variant="secondary" />` | Quote Modal / `/contact?subject=Quote...` |
| `VIEW_REPLACEMENT` | `<ProductActionCTA variant="card" />` | Navigation to `/parts-attachments/product/${replacementSlug}` |
| `VIEW_ONLY` | `<ProductActionCTA variant="ghost" />` | Navigation to product specification view |
| `CONTACT_FOR_IDENTIFICATION` | `<ProductActionCTA variant="secondary" />` | `/parts/find?tab=identify` |
| `HIDDEN` | Suppressed (null) | Returns 404 `notFound()` on public routes |
