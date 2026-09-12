# Alkota UK — Commercial Action Callers & Single Resolver Proof (Deliverable D02)

## Status: COMPLETE
**Audit Date**: 2026-09-12  
**Requirement**: Exactly 1 Authoritative Commercial Resolver across the platform.  

---

## 1. Proof of Single Resolver Engine

A repository-wide AST and regex scan was performed across `src/` for any competing commercial decision functions:

```bash
# Audited function names:
resolvePurchaseEligibility
canPurchase
isPurchasable
getProductCTA
resolveCTA
determineAction
```

**Result**: **0 competing engines found**.  
Every customer action determination in the codebase converges on:
```ts
resolveProductAction() // src/lib/commerce/action-resolver.ts
```

---

## 2. Complete Inventory of `resolveProductAction` Callers

| Caller Component / Function | Route / Server Action | Product Type Handled | Purpose | Uses Central Resolver | Server Enforced | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `ProductCard` | `/parts-attachments/*` | PART, ATTACHMENT, ACCESSORY | Evaluates card CTA, price display, visibility gating | YES | Server rendered / Static | **VERIFIED** |
| `ProductDetailPage` | `/parts-attachments/product/[slug]` | PART, ATTACHMENT | 404 gating for HIDDEN, schema.org offer generation | YES | Server rendered | **VERIFIED** |
| `ProductDetailActions` | `/parts-attachments/product/[slug]` | PART, ATTACHMENT | Primary PDP button, mobile sticky bar, enquiry modal | YES | Client component | **VERIFIED** |
| `FilterablePartsCatalogue` | `/parts-attachments` | PART, ATTACHMENT | Client-side faceted browse grid card CTA | YES | Client component | **VERIFIED** |
| `PartCard` | `/shop` | PART | Shop catalog card action and price display | YES | Server rendered | **VERIFIED** |
| `PartDetailPage` | `/shop/[slug]` | PART | Sanity shop PDP action, price, Schema.org availability | YES | Server rendered | **VERIFIED** |
| `ProductActionCTA` | Shared Commerce Adapter | ALL PRODUCT TYPES | Central multi-variant button adapter for all 7 actions | YES | Shared component | **VERIFIED** |
| `createCartCheckoutSession` | `src/app/actions/stripe.ts` | PART, ATTACHMENT, CHEMICAL | Re-fetches fresh DB records, re-resolves action, enforces DB price | YES | **YES (Server Gate)** | **VERIFIED** |
| `FacetedChemicalDirectory` | `/chemicals` | CHEMICAL | Formulations grid card action and price | YES | Client component | **VERIFIED** |
| `ProductLaunchHero` | `/chemicals/product/[slug]` | CHEMICAL | Chemical launch hero pack selector & order button | YES | Client component | **VERIFIED** |
| `ProductCinematicHero` | `/chemicals/product/[slug]` | CHEMICAL | Chemical cinematic hero pack selector & order button | YES | Client component | **VERIFIED** |
| `ProductPackSelector` | `/chemicals/product/[slug]` | CHEMICAL | Detailed chemical pack volume matrix & order CTA | YES | Client component | **VERIFIED** |
| `ChemicalProductInteractive`| `/chemicals/product/[slug]` | CHEMICAL | Chemical pack selector & add to basket CTA | YES | Client component | **VERIFIED** |
| `PartEditor` | `/admin/parts/[id]` | ALL PRODUCT TYPES | Live preview of resolved action, conflicts, diagnostics | YES | Admin preview | **VERIFIED** |
| `test-action-resolver.ts` | Test Suite | ALL PRODUCT TYPES | 31-test precedence contract verification | YES | Test verification | **VERIFIED** |
| `forensic-commercial-audit.ts` | Audit Suite | ALL PRODUCT TYPES | Full catalogue evaluation & 10 critical invariant tests | YES | Test verification | **VERIFIED** |

---

## 3. Acceptance Criteria & Stop Condition Verification

- **Authoritative Resolvers**: **1** (`src/lib/commerce/action-resolver.ts`)
- **Competing Resolvers**: **0**
- **Server Enforcement**: All Stripe checkout creations unconditionally re-resolve against database records.
- **Stop Condition Check**: **PASSED**. No second commercial decision engine exists.
