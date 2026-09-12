# Alkota UK — Commercial Action Dependencies & Execution Order

## Status: VERIFIED & ENFORCED

---

## 1. Upstream-to-Downstream Dependency Graph

```text
1. DATABASE / SOURCE CATALOGUE (Supabase / Sanity)
                 │
                 ▼
2. NORMALISATION CONTRACT (`NormalisedProductState`)
                 │
                 ▼
3. CENTRAL ACTION RESOLVER (`resolveProductAction()`)
                 │
                 ▼
4. PRESENTATION & ACTION ADAPTERS (`ProductActionCTA`)
                 │
                 ▼
5. TRANSACTION BOUNDARIES (`CartContext`, Enquiry Drawer)
                 │
                 ▼
6. SERVER ACTION VALIDATION (`stripe.ts`, `enquiry.ts`)
                 │
                 ▼
7. PAYMENT GATEWAY ENFORCEMENT (Stripe Checkout API)
```

---

## 2. Dependency Order & Verification Gates

| Stage | Component | Direct Dependency | Required Contract | Verification Method | Gate Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | **State Model Contract** | Database Schema | Strongly-typed normalized state (`NormalisedProductState`) | TypeScript compilation | **PASSED** |
| **B** | **Normalisation Layer** | Raw Records | Safe sanitisation of £0, negative, null, drafts, stock | `scripts/test-action-resolver.ts` | **PASSED** |
| **C** | **Action Resolver** | Normalised State | 12-stage precedence contract; £0 protection; 7 actions | 31/31 Resolver Precedence Tests | **PASSED** |
| **D** | **Action CTA Adapters** | Resolver Decision | `ProductActionCTA` consumes `ProductActionDecision` | UI components rendering | **PASSED** |
| **E** | **Cart Security** | Storefront | Client cart rejects unpriced/£0 items | `CartContext.tsx` price invariant | **PASSED** |
| **F** | **Checkout Server Action** | Database + Resolver | Server fetches fresh record, re-resolves action, checks price | `src/app/actions/stripe.ts` | **PASSED** |
| **G** | **Stripe Gateway** | Server Action | Only server-resolved items with DB price sent to Stripe | Live checkout test verification | **PASSED** |
| **H** | **Surface Consistency** | Action Resolver | Same action on Product Detail, Card, Search, Finder | Automated integration test | **PASSED** |
| **I** | **Catalogue Audit** | Supabase Parts DB | Complete catalogue evaluation (2,562+ parts) | Live catalogue resolution script | **PASSED** |
| **J** | **Production Build** | Entire Repository | Zero TypeScript errors, zero hydration errors | `npm run build` exit code 0 | **PASSED** |

---

## 3. Strict Dependency Rules

1. **No Downstream Workarounds**: Downstream UI components must never patch or reinterpret commercial eligibility. All logic must reside exclusively in `resolveProductAction()`.
2. **Server Authority**: The browser client is never trusted for price, availability, or eligibility. The server action re-queries the database and executes `resolveProductAction(dbProduct)`.
3. **Stripe Isolation**: Client cart items are purely identifiers and quantities. Stripe line items are built exclusively from server database prices.
