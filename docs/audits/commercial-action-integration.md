# Alkota UK — Commercial Action Integration Inventory (Deliverable D01)

## Status: COMPLETE
**Audit Date**: 2026-09-12  
**Governing Standard**: One Resolver. One Commercial Truth. No Bypasses.  

---

## 1. Forensic Codebase Search & Findings

The codebase was forensically audited for commercial decision logic, add-to-cart operations, stock checks, pricing gates, and Stripe integrations. Every identified occurrence is inventoried and classified below.

### Classification Key:
- **A — Resolver Driven**: Consumes `resolveProductAction()` directly. Authoritative.
- **B — Presentation Only**: Formatting/display only (currency symbol, stock badge color) without deciding customer action.
- **C — Defensive Validation**: Server-side or client safety guards preventing corrupt or £0 items from transacting.
- **D — Legitimate Contextual Logic**: Context parameters passed to the resolver (e.g. machine model code).
- **E — Duplicate Commercial Logic**: Local calculation of purchasability or availability (RESOLVED).
- **F — Potential Bypass**: Path that could allow purchase without resolver check (RESOLVED).
- **G — Data Quality Logic**: Diagnostics detecting contradictory database fields (conflict detector).

---

## 2. Comprehensive Inventory Table

| Route | Component | File | Commercial Logic Found | Resolver Used | Classification | Risk | Action Required | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/parts-attachments` | `ProductCard` | `src/components/parts/ProductCard.tsx` | Resolves action, price ex/inc VAT, hides draft/archived | YES | **A** | None | Maintain central resolver call | **PASSED** |
| `/parts-attachments/product/[slug]` | `ProductDetailPage` | `src/app/parts-attachments/product/[slug]/page.tsx` | Evaluates action, 404s if hidden, aligns Schema JSON-LD | YES | **A** | None | Uses `resolveProductAction` on server | **PASSED** |
| `/parts-attachments/product/[slug]` | `ProductDetailActions` | `src/components/parts/ProductDetailActions.tsx` | Renders CTA, handles cart/enquiry drawer, sticky bar | YES | **A** | None | Integrates with `resolveProductAction` | **PASSED** |
| `/parts-attachments/[category]` | `CategoryBrowsePage` | `src/app/parts-attachments/[category]/page.tsx` | Passes filtered parts to `ProductCard` | YES | **A** | None | All cards use resolver | **PASSED** |
| `/parts-attachments/brands/[brand]` | `BrandPartnerPage` | `src/app/parts-attachments/brands/[brand]/page.tsx` | Passes brand parts to `ProductCard` | YES | **A** | None | All cards use resolver | **PASSED** |
| `/parts-attachments/search` | `SearchResultsPage` | `src/app/parts-attachments/search/page.tsx` | Passes search results to `ProductCard` | YES | **A** | None | All cards use resolver | **PASSED** |
| `/parts-attachments` | `FilterablePartsCatalogue` | `src/components/parts/FilterablePartsCatalogue.tsx` | Stock badge, price ex-VAT, `<ProductActionCTA>` | YES | **A** | None | Refactored from direct `addItem` to resolver | **PASSED** |
| `/shop` | `PartCard` | `src/components/PartCard.tsx` | Evaluates action, gates `AddToCartButton` behind `PURCHASE` | YES | **A** | None | Resolves via `resolveProductAction` | **PASSED** |
| `/shop/[slug]` | `PartDetailPage` | `src/app/shop/[slug]/page.tsx` | Evaluates action, gates `AddToCartButton`, aligns JSON-LD | YES | **A** | None | Resolves via `resolveProductAction` | **PASSED** |
| Component | `ProductActionCTA` | `src/components/commerce/ProductActionCTA.tsx` | Authoritative multi-variant CTA for all 7 actions | YES | **A** | None | Core presentation adapter | **PASSED** |
| Component | `AddToCartButton` | `src/components/AddToCartButton.tsx` | Defensive positive-price guard before cart dispatch | NO | **C** | None | Added price > 0 guard | **PASSED** |
| Context | `CartContext` | `src/context/CartContext.tsx` | Defensive validation rejecting items <= £0 or NaN | NO | **C** | None | Added safety check in `addItem` | **PASSED** |
| Server Action | `createCartCheckoutSession` | `src/app/actions/stripe.ts` | Server-authoritative DB fetch, action re-resolution, DB price | YES | **A / C** | None | Mandatory server transaction gate | **PASSED** |
| Server Action | `submitEnquiry` | `src/app/actions/enquiry.ts` | Server validation for parts requests & quote inquiries | NO | **C** | None | Server validation of enquiry payload | **PASSED** |
| `/chemicals` | `FacetedChemicalDirectory` | `src/components/chemicals/FacetedChemicalDirectory.tsx` | Evaluates chemical action, gates purchase behind resolver | YES | **A** | None | Refactored to `resolveProductAction` | **PASSED** |
| `/chemicals/product/[slug]` | `ProductLaunchHero` | `src/components/chemicals/ProductLaunchHero.tsx` | Evaluates chemical SKU action, gates Add to Order | YES | **A** | None | Refactored to `resolveProductAction` | **PASSED** |
| `/chemicals/product/[slug]` | `ProductCinematicHero` | `src/components/chemicals/ProductCinematicHero.tsx` | Evaluates chemical SKU action, gates Add to Order | YES | **A** | None | Refactored to `resolveProductAction` | **PASSED** |
| `/chemicals/product/[slug]` | `ProductPackSelector` | `src/components/chemicals/ProductPackSelector.tsx` | Evaluates pack action, gates Add to Order | YES | **A** | None | Refactored to `resolveProductAction` | **PASSED** |
| `/chemicals/product/[slug]` | `ChemicalProductInteractive` | `src/components/chemicals/ChemicalProductInteractive.tsx` | Evaluates SKU action, gates Add to Basket | YES | **A** | None | Refactored to `resolveProductAction` | **PASSED** |
| `/admin/parts/[id]` | `PartEditor` | `src/app/admin/parts/PartEditor.tsx` | Live diagnostics, resolved action preview, conflict audit | YES | **A / G** | None | Displays resolver decision & conflicts | **PASSED** |
| `/parts/find` | `PartsFinder` | `src/app/parts/find/page.tsx` | Machine model filtering & identification routing | NO | **D** | None | Supplies context; products resolved via Card | **PASSED** |
| Schema.org | SEO JSON-LD | `src/app/parts-attachments/product/[slug]/page.tsx` | Sets InStock ONLY when action === PURCHASE | YES | **A / B** | None | Aligned with resolver | **PASSED** |
| Schema.org | SEO JSON-LD | `src/app/shop/[slug]/page.tsx` | Sets InStock ONLY when action === PURCHASE | YES | **A / B** | None | Aligned with resolver | **PASSED** |

---

## 3. Audit Outcome

- **Total Commercial Decisions Inventoried**: 23
- **Unclassified Decisions Remaining**: 0
- **Unresolved Duplicate Paths (E)**: 0 (all refactored to consume resolver)
- **Unresolved Bypasses (F)**: 0 (all transactional endpoints server-enforced)
- **Status**: **PASS (STOP Condition Cleared)**
