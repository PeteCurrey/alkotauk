# Alkota UK — Machine Comparison & Selection Audit

**Date:** 10 September 2026  
**Phase:** Phase 5 Architecture Deliverable  
**Status:** Canonical Reference Architecture Document  

---

## 1. Executive Summary

Phase 5 introduces a database-driven **Machine Comparison & Selection** experience for the Alkota UK platform. The system empowers customers to transition seamlessly from:

**Browse → Filter → Compare → Understand → Select → Enquire**

Crucially, the architecture **does not create a duplicate product database** or hardcode technical specifications. The single authoritative source of truth remains the database-backed machine catalogue (127 verified machines in Supabase `products` table and the canonical snapshot).

---

## 2. Architecture & Data Reuse Audit

### 2.1 Existing Systems Reused

| Component / Layer | Existing Asset | Phase 5 Integration |
|---|---|---|
| **Data Layer** | `src/lib/products.ts` | Consumes `getProducts()` and `getProductBySlug()`. No duplicate specification storage. |
| **Image Resolution** | `src/lib/images.ts` | Uses `resolveMachineImage()` for all 127 canonical machine models. |
| **Compatibility Layer** | `src/lib/relationships/service.ts` | Surfaces Phase 4 verified OEM parts and attachments without polluting the comparison table with general relationships. |
| **Catalogue Cards** | `src/components/MachineCard.tsx` | Enhanced with accessible, non-intrusive comparison toggle controls. |
| **Machine Detail** | `src/components/MachineDetailPricingCta.tsx` | Enhanced with secondary `"Add to Comparison"` action. |
| **Enquiry Pipeline** | `src/app/contact/page.tsx` | Pre-fills enquiry subject and message context with selected comparison models. |
| **Canonical Routing** | `/machines/compare` | Replaces legacy Sanity-driven `/compare` route via Next.js server redirect. |

---

## 3. Comparison State Architecture

The comparison state is managed via React Context (`ComparisonProvider`) in `src/lib/comparison/context.tsx`:

- **Hard Limit**: Enforces a strict limit of **3 machines** simultaneously. This guarantees high readability on desktop without horizontal stretching and ensures clean mobile tab rendering.
- **Client Persistence**: Persisted in `localStorage` under key `alkota_comparison_slugs`.
- **URL Synchronization**: The comparison page reads and synchronizes query parameters (`?machines=alkota-420x4,alkota-216x4`), enabling instant link sharing and bookmarking.
- **Persistent Floating Dock**: When 1 to 3 machines are queued, `ComparisonDock` renders fixed at the bottom of the viewport sitewide, allowing users to browse between categories and enter comparison when ready.

---

## 4. Category-Aware Specification Groups

Different equipment categories prioritise different thermodynamic and mechanical characteristics. The comparison engine (`src/lib/comparison/engine.ts`) organises parameters into six structured groups:

1. **Performance & Thermodynamics**
   - Operating Pressure (BAR & PSI)
   - Water Flow Rate (L/min & GPM)
   - Maximum Temperature (°C & °F)
   - Burner Thermal Output (BTU/hr)
2. **Power & Propulsion**
   - Power & Drive Unit (Electric Motor / Gas Engine / Diesel Engine)
   - Electrical Supply (Voltage, Phase, Full Load Current)
   - Heating Fuel (Diesel, Kerosene, Natural Gas, LP)
   - Fuel Tank Capacity (Litres & Gallons)
3. **Mechanical & Metallurgy**
   - Pump Architecture (Triplex ceramic plungers, oil bath crankcase, RPM)
   - Heating Coil System (Schedule 80 carbon steel pipe, hydro-wrap)
   - Coil Pipe Length (Metres & Feet)
4. **Chassis & Mobility**
   - Mobility Configuration (4-Wheel pneumatic, skid, stationary cabinet, turnkey trailer)
   - Portability Classification
   - Footprint Dimensions (mm & inches)
   - Operating Dry Weight (kg & lbs)
5. **Duty Cycle & Warranty**
   - Continuous Duty Rating
   - Verified Cleaning Applications
   - Standard Equipment Warranty (Years)
   - Schedule 80 Coil Warranty (Years)
   - Official Manufacturer Certifications (ETL / UL-1776, CSA)
6. **Category-Specific Engineering (`extra_specs`)**
   - Automatically extracts specialised parameters (e.g. Parts washer turntable diameter and working height, Trailer water tank capacity, Water treatment filtration rating).

---

## 5. Mathematical Unit Conversions & Missing Data Handling

### 5.1 Unit Conversions
The engine provides an instantaneous toggle between **Metric** and **Imperial** units:
- **Pressure**: $1\text{ BAR} = 14.5038\text{ PSI}$ (rounded to sensible integer engineering values).
- **Flow Rate**: $1\text{ GPM} = 3.78541\text{ L/min}$ (preserved to 1 decimal place).
- **Temperature**: $T_F = (T_C \times \frac{9}{5}) + 32$ (rounded to nearest integer).
- **Weight**: $1\text{ kg} = 2.20462\text{ lbs}$ / $1\text{ lb} = 0.453592\text{ kg}$.

### 5.2 Missing Data Principle
If a specification is unrecorded in the database:
- It is rendered strictly as `"Not specified"`.
- It is **never** presented as `0`, `No`, or a negative attribute.
- Missing values do not penalise or rank the machine in factual highlights.

---

## 6. Difference Highlighting & Factual Highlights

- **Differences Only Mode**: The `"Differences Only"` toggle filters each specification group to only show rows where values genuinely differ across machines. Numbers and strings are normalised (trimming whitespace and standardising case) to avoid false positives.
- **Factual Highlights**: The engine calculates objective observations:
  - *Highest Operating Pressure* (factual BAR difference).
  - *Highest Water Flow Rate* (factual L/min difference).
  - *Thermal Degreasing Capability* (hot water/steam vs ambient cold wash).
  - *Autonomous Site Mobility* (combustion engine vs electric).
  - **No subjective superlatives** (e.g. "Best machine", "Top choice") are ever introduced.

---

## 7. Customer Enquiry Handoff

The comparison page culminates in a direct procurement consultation:
- **Action**: `"Enquire About These {N} Models →"`
- **URL Handoff**: Routes to `/contact?enquiry=compare&machines=...&models=...`.
- **Pre-Population**: In `src/app/contact/page.tsx`, the form automatically pre-fills the subject with the compared models and sets a helpful opening message context. The customer is never forced to re-enter model codes.

---

## 8. SEO, Performance & Accessibility

- **Canonical URL**: Enforced at `https://alkota.co.uk/machines/compare`.
- **Duplicate Protection**: Set to `robots: { index: false, follow: true }` to prevent search index bloat from millions of parameter combinations.
- **Performance**: Loads only the selected 1–3 machines and their images. Zero full-catalogue client-side serialization.
- **Accessibility**: Semantic `<header>`, `<main>`, `<section>`, and `<dl>` tags; visible focus rings; keyboard-navigable buttons; screen-reader accessible `aria-pressed` states.

---

## 9. Verification & Automated Test Suite

A 17-test automated verification suite (`scripts/test-machine-comparison.ts`) validates:
1. Pressure conversion accuracy between BAR and PSI.
2. Flow rate conversion accuracy between L/min and GPM.
3. Temperature conversion accuracy between Celsius and Fahrenheit.
4. Weight conversion accuracy between kg and lbs.
5. Missing pressure rendered as `"Not specified"` (never 0).
6. Missing flow rate rendered as `"Not specified"` (never 0).
7. Ambient temperature handling for cold water washers.
8. Difference detection between different machine ratings.
9. Identical value detection (no false difference flag).
10. Case/whitespace normalisation.
11. Standard specification grouping for hot water units.
12. Steam thermal output surfacing.
13. Parts washer extra spec extraction.
14. Factual highlights without subjective claims.
15. Hot vs cold thermal degreasing highlight.
16. 3-machine limit enforcement.
17. Comparison URL and enquiry pre-fill generation.

**Test Run Result:**
```
RESULTS: 17 PASSED, 0 FAILED (TOTAL: 17 TESTS)
```
