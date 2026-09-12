# Machine Enquiry Architecture — Alkota UK

**Version**: Phase 7 Complete  
**Tests**: 163/163 passing (98 Selection + 17 Comparison + 17 Ecosystem + 31 Enquiry)

---

## Purpose

Phase 7 adds the commercial and sales-handoff layer that converts the Phase 6 deterministic selection and comparison engines into a complete enquiry-to-quotation pipeline.

The architecture's core principle:

> The customer never re-enters information the website already knows. The sales engineering team receives a complete, server-verified consultation dossier — including machine specifications, match status, and a pre-quotation checklist.

---

## Architecture Overview

```
Customer Journey
════════════════
Browse Machines → Help Me Choose → Comparison Matrix → Machine Detail
        ↓                ↓                  ↓                 ↓
     /machines   /machines/help-me-choose  /machines/compare  /machines/[category]/[slug]
        │                │                  │                 │
        └────────────────┴──────────────────┴─────────────────┘
                                   │
                         Enquiry URLs with full context
                         (machines, models, reqs, app, water,
                          press, flow, power, volt, phase, mob)
                                   │
                              /contact
                          MachineEnquiryContextCard
                          Site readiness fields
                          Customer form (name, company, email, phone)
                                   │
                              POST /api/contact
                         Server-Side Revalidation Service
                                   │
                    ┌──────────────┴─────────────────┐
                    │                                 │
              Supabase DB                     Resend Email API
              enquiries table                 ├── Internal alert
              metadata (JSONB)                │    (machines, specs, checklist)
              ├── machine_source              └── Customer acknowledgement
              ├── machines[]                       (reference number, timeline)
              ├── revalidation_result
              ├── structured_requirements
              ├── confirmation_items
              └── site_power / postcode
                    │
              /admin/enquiries
              Machine Consultation Dossier
              ├── Source badge
              ├── Server verification status
              ├── Machine spec cards
              ├── Customer requirements
              ├── Site readiness fields
              └── Sales Engineer Checklist
```

---

## New Files

### `src/lib/machine-enquiries/types.ts`
Defines TypeScript interfaces:
- `MachineEnquirySource`: Source of the enquiry (`machine_selector`, `machine_comparison`, `direct_machine`, `request_pricing`, `service`, `general`)
- `EnquiryMachineItem`: Normalised machine data stored in the enquiry record
- `EvaluatedMachineResult`: Per-machine server revalidation outcome
- `ServerRevalidationResult`: Full revalidation record with audit trail
- `MachineEnquiryMetadata`: Complete JSONB metadata payload for the `enquiries` table

### `src/lib/machine-enquiries/service.ts`
Core server-side service functions:
- `normaliseIdentifier(id)` — Strips `alkota-` prefix and normalises for resilient matching
- `resolveMachines(identifiers, allMachines)` — Matches slugs and model codes against canonical catalogue
- `normaliseRequirements(raw)` — Parses raw URL params into typed `SelectionRequirements`
- `generateConfirmationChecklist(machines, unknowns)` — Produces actionable verification items for the sales team
- `revalidateMachineEnquiry(options, allMachines)` — **Anti-spoofing core**: runs deterministic selection per-machine, compares server result against client claims, returns discrepancies and confirmation items

### `src/lib/analytics.ts`
Client-side analytics helpers:
- `trackMachineEnquiryStarted(data)` — Dispatches `machine_enquiry_started` to `window.dataLayer`
- `trackMachineEnquirySubmitted(data)` — Dispatches `machine_enquiry_submitted`
- All events are fail-safe (never throw or break the customer journey)

### `src/components/enquiry/MachineEnquiryContextCard.tsx`
Customer-facing context preview block shown at the top of `/contact` when arriving via:
- **Selector**: Shows machine cards (image, model, pressure, flow, power, fuel) + requirements chips + "Adjust Criteria" link back to selector
- **Comparison**: Shows compared machine cards + "Edit Comparison" link
- **Direct Spec Request**: Shows single machine card with key specifications
- Includes an SLA assurance note

---

## Modified Files

### `src/app/api/contact/route.ts`
- Detects machine enquiry source from inbound body
- Resolves machine identifiers via `resolveMachines()`
- Runs `revalidateMachineEnquiry()` for all enquiries with machine context
- Writes structured `metadata` (JSONB) to the `enquiries` table
- Sends two transactional emails via Resend:
  1. **Internal alert**: Machine specs table, requirements list, discrepancy warnings, confirmation checklist
  2. **Customer acknowledgement**: Reference number, selected equipment, expected response SLA

### `src/app/contact/page.tsx`
- `MachineEnquiryContextCard` preview block (loads machine cards from `/api/machines/search`)
- Site readiness fields: Available Site Power (dropdown), Site Postcode, Required Timeline
- Passes all structured context in the POST payload: `machines`, `models`, `reqs`, `requirements`, `requirements_summary`
- Confirmation screen displays reference number and clear next-steps
- Fires `trackMachineEnquiryStarted` / `trackMachineEnquirySubmitted` analytics events

### `src/app/admin/enquiries/[id]/page.tsx`
- **Machine Engineering Consultation Dossier** block shown when `enquiry.metadata.machines` exists:
  - Source badge (`HELP ME CHOOSE SHORTLIST`, `FLEET COMPARISON MATRIX`, `MACHINE QUOTATION`)
  - Server revalidation status badge (`✓ SERVER REVALIDATED` / `● CLIENT DISCREPANCY DETECTED`)
  - Machine spec cards with: model code, name, category, pressure, flow, power, heating, electrical, server match status, verified reasons
  - Customer stated requirements chips
  - Site readiness panel (power, water, postcode)
  - Sales Engineer Pre-Quotation Checklist (amber warning block)

### `src/app/admin/enquiries/page.tsx`
- Reference column now shows model codes from machine enquiries below the reference number
- Type column shows colour-coded source badges: `SELECTOR` (orange), `COMPARE` (blue), `MACHINE` (green)

### `src/app/machines/help-me-choose/HelpMeChooseClient.tsx`
- `enquiryUrl` now serialises full structured requirements (`app`, `water`, `press`, `flow`, `power`, `volt`, `phase`, `mob`, `prefs`) plus machine slugs
- Card-level enquiry links include `machines=` (slug) and full `reqs=` context

### `src/app/machines/compare/ComparisonClient.tsx`
- No functional change needed — already passes `machines=` and `models=` correctly

### `src/app/machines/[category]/[slug]/page.tsx`
- "Request Factory Quote" and "Book Engineering Review" CTAs now include `machines=${machine.slug}` parameter

### `src/components/MachineDetailPricingCta.tsx`
- Technical Consultation link includes `machines=${machine.slug}` parameter

### `src/app/api/machines/search/route.ts`
- Added `slugs=` and `models=` filter parameters for the `/contact` page machine preview loader

---

## Anti-Spoofing Guarantee

```
Client submits enquiry claiming:
  models: "alkota-216x4"
  claimedMatchStatus: { "alkota-216x4": "STRONG_MATCH" }
  requirements: { minPressureBar: 250, minFlowLpm: 20 }

Server runs selectMachines([216X4], requirements):
  → 216X4 delivers 110 BAR / 11 LPM
  → DOES_NOT_MEET (hard fails on pressure and flow)

Server result in metadata:
  discrepancy_detected: true
  discrepancy_details: ["Client claimed 'STRONG_MATCH' for 216X4, but server determined 'DOES_NOT_MEET'"]
  evaluated_machines[0].server_match_status: "DOES_NOT_MEET"
  evaluated_machines[0].failure_reasons: [...]

Admin enquiry dashboard shows:
  ● CLIENT DISCREPANCY DETECTED  (red badge)
  server_match_status: DOES_NOT_MEET (red)
```

---

## Unknown ≠ Fail Preservation

The Phase 6 invariant is preserved in Phase 7:

| Scenario | Engine Result | Enquiry Outcome |
|----------|--------------|-----------------|
| All specs verified, requirements met | `STRONG_MATCH` | Confirmed in admin, no checklist items |
| Electrical supply unknown on machine | `POSSIBLE_MATCH` | `confirmation_items` includes site power check |
| Pressure below threshold | `DOES_NOT_MEET` | Discrepancy if client claims STRONG_MATCH |

---

## Test Script

```bash
# Phase 7 only
npx tsx scripts/test-machine-enquiry.ts

# Full suite (163 tests)
npx tsx scripts/test-machine-selection.ts   # 98 tests
npx tsx scripts/test-machine-comparison.ts  # 17 tests
npx tsx scripts/test-relationship-ecosystem.ts  # 17 tests
npx tsx scripts/test-machine-enquiry.ts     # 31 tests
```
