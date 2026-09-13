# ALKOTA UK — PHASE 8.2 CATALOGUE UX, SERIES NAVIGATION & DISCOVERY REPORT

**Author:** Lead Product Designer, Frontend Engineer & UX Architect  
**Status:** COMPLETE  
**Date:** September 13, 2026  
**Downstream Recommendation:** READY FOR PHASE 8.3  

---

## 1. Executive Summary

Phase 8.2 transforms the Alkota UK customer-facing machine catalogue into a premium, engineering-led industrial discovery experience. Operating on top of the reconciled 131-machine database delivered in Phase 8.1, the new interface establishes a clear, intuitive discovery hierarchy:

$$\text{MACHINES} \longrightarrow \text{CATEGORY} \longrightarrow \text{SERIES} \longrightarrow \text{MODEL} \longrightarrow \text{MACHINE DETAIL}$$

By elevating **Manufacturer Series** into a first-class navigation and discovery concept, customers can immediately explore the 36 distinct equipment families, understand technical envelopes (pressure, flow rate, drive units, heating methods), compare machines side-by-side without leaving their browsing flow, and transition cleanly into the machine detail and enquiry journeys.

All product data, series relationships, and category counts are derived dynamically from the authoritative data layer—zero hardcoded catalogue arrays exist in UI components. The tactile industrial design language respects the Alkota UK aesthetic: warm neutral backgrounds, charcoal typography, restrained Alkota orange accents, minimal corner radii (`rounded-[4px]`), and uncropped equipment photography.

---

## 2. Information Architecture & Hierarchy

The catalogue architecture exposes three distinct, complementary discovery tiers:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. MAIN FLEET CATALOGUE (/machines)                         │
│    - Intro & Help Me Choose Banner                          │
│    - 01 // 8 Canonical Category Showcase                    │
│    - 02 // Interactive Fleet Explorer                       │
│           • Category Switcher Tabs                          │
│           • Dynamic Series Navigation Strip                 │
│           • Deterministic Filters (Search, Pressure, Drive) │
│           • Deterministic Sorting (Order, Bar, LPM, Model)  │
│           • 131 Model Cards with Live Compare               │
└──────────────────────────────┬──────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│ 2. CATEGORY HUBS            │ │ 3. SERIES LANDING DOSSIERS  │
│    (/machines/[category])   │ │    (/machines/[cat]/series/ │
│    - Category Engineering   │ │     [series])               │
│    - Series Navigation Strip│ │    - Series Specification   │
│    - Filterable Category    │ │      Envelope (Bar, LPM)    │
│      Catalogue              │ │    - Official Spec Sheet PDF│
│    - Real-World Case Links  │ │    - Models in the Series   │
│    - Sector Applications    │ │    - Factory Quote CTA      │
└──────────────┬──────────────┘ └──────────────┬──────────────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. MACHINE DETAIL & BLUEPRINT (/machines/[category]/[slug]) │
│    - Full Technical Blueprint & Verified Specifications     │
│    - Schedule 80 Coil & Triplex Pump Metallurgy             │
│    - Downloads Strip (PDF Spec Sheet, Brochure, Manual)     │
│    - Canonical Enquiry Handoff & Pricing Calculator         │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Category Navigation (8 Canonical Categories)

All 8 canonical categories are dynamically represented with live model counts and series counts:

| # | Category | Route Slug | Verified Models | Manufacturer Series | Pressure Range |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Hot Water Pressure Washers** | `hot-water` | 43 | 12 | 69 – 350 BAR |
| 2 | **Cold Water Pressure Washers** | `cold-water` | 31 | 9 | 103 – 345 BAR |
| 3 | **Industrial Steam Cleaners** | `steam` | 10 | 3 | 17 – 34 BAR |
| 4 | **Aqueous Parts Washers** | `parts-washers` | 22 | 4 | N/A (Aqueous Rotary) |
| 5 | **Continuous Industrial Water Heaters** | `water-heater` | 14 | 3 | 172 – 345 BAR |
| 6 | **Mobile Wash Trailers & Custom Rigs** | `trailer` | 5 | 1 | Custom Engine Skids |
| 7 | **Water Recovery & Treatment Systems**| `water-treatment` | 5 | 3 | Vacuum Filtration |
| 8 | **Industrial Space Heaters** | `space-heater` | 1 | 1 | Forced Air Combustion |
| **Total** | | | **131** | **36** | |

---

## 4. Series-First Navigation UX

The 36 manufacturer series are extracted dynamically by `src/lib/catalogue/series.ts` (`getAllSeries()` and `getSeriesByCategory()`). 

### Key Capabilities:
- **`SeriesNavigationStrip` Component:**
  * Renders an interactive tablist of series chips with live model counts: e.g. `[ All Series (43) ]`, `[ All Electric (4) ]`, `[ X4 Series (5) ]`, `[ AX4 Series (4) ]`.
  * Keyboard accessible (`role="tablist"`, `aria-selected`, visible focus ring).
  * Mobile-responsive with horizontal scrolling (`overflow-x-auto`) and smooth touch drag.
  * When a series is active, displays an inline callout with model count and a direct deep-link: *"Explore Dedicated Series Dossier →"*.
- **Category Synchronization:**
  * Selecting a category tab instantly filters the series strip to show only the series belonging to that category.
  * Selecting a series filters the machine grid instantaneously and syncs with URL query state (`?category=...&series=...`).

---

## 5. Model Discovery & Revamped Machine Cards

### Solved Visual Problem:
Prior builds suffered from an issue where machines visually appeared identical due to:
1. `grayscale-[0.8]` image filtering that desaturated real equipment colours.
2. `aspect-[16/10]` with `object-cover` that cropped off nozzles, burner exhausts, wheel kits, and chassis frames.
3. Lack of visible series badges and indistinct model titles.
4. "0" and "N/A" clutter in specification cells for non-standard equipment (e.g. 0 GPM on space heaters).

### Implemented Solutions in `MachineCard.tsx`:
- **Padded Canvas Framing:** Uses `aspect-[4/3]` within a warm neutral canvas (`#FAF9F5`) and `object-contain`, ensuring 100% of the industrial chassis (wheels, burner stack, frame, pump head) is fully visible.
- **Natural Livery:** Removed all grayscale filters; authentic factory powder-coat colours (Alkota red/black/stainless) render true to life.
- **Prominent Model Code:** Bold monospace badge (e.g. `420X4`, `4308`, `530B`) positioned on the card, giving each model unmistakable identity.
- **Series Identity Badge:** Clean uppercase badge (e.g. `ALL ELECTRIC SERIES`, `X4 SERIES`) anchoring the machine in its manufacturer family.
- **Noise-Free Technical Cells:** Only valid, positive specifications are rendered. Space heaters, parts washers, and evaporators suppress water pressure/flow noise cleanly.
- **Integrated Compare Action:** Prominent toggle button connected to `useMachineComparison`, allowing customers to build a 3-machine comparison set directly from the card.
- **Tactile Corner Radii:** Minimal `rounded-[4px]` with subtle border `#E5E5E0` hovering to `#FF6900` and soft shadow (`shadow-xs` to `shadow-md`).

---

## 6. Fast Search, Filtering & Deterministic Sorting

The client discovery engine (`CatalogueFleetExplorer.tsx`) delivers instant, deterministic filtering:

- **Search:** Instant query evaluation across model code, machine name, series, tagline, and engineering description. A search for `"420"` immediately surfaces models `420S`, `420BD`, `420X4`, `420AX4`, `4201`, `4208`.
- **Pressure Range Envelopes:**
  * `< 150 BAR` (Light / Compact Workshop)
  * `150 – 250 BAR` (Standard Heavy Industrial)
  * `250+ BAR` (Extreme Hydrostatic Impingement)
- **Drive / Power Sources:** Electric Motor (Single & 3-Phase), Diesel Engine, Petrol Engine.
- **Heating Fuels:** Electric Immersion, Diesel / Kerosene, Natural Gas, LPG.
- **Deterministic Sorting:**
  * *Default:* Official Manufacturer Sort Order (`sort_order ASC`)
  * *Pressure:* Highest Continuous Bar First
  * *Flow Rate:* Highest Water Volume (LPM) First
  * *Model Code:* Alphabetical (`A → Z`)
- **URL State Persistence:** Search query, category, series, and sort parameters serialize seamlessly into browser history (`?category=hot-water&series=all-electric-series&sort=pressure-desc`), enabling back/forward navigation and shareable links.

---

## 7. Dedicated Series Landing Routes (`/machines/[category]/series/[series]`)

A dedicated route structure was created at `src/app/machines/[category]/series/[series]/page.tsx`:

- **Static Generation:** All 36 series pre-rendered via `generateStaticParams()`.
- **Series Dossier Hero:** Displays series display name, parent category link, verified manufacturer description, and aggregate engineering envelopes (min/max pressure, flow volume, drive unit).
- **Official Documentation Action:** If models in the series share a technical document (such as the All-Electric Spec Sheet PDF), an explicit download button is surfaced.
- **Constituent Models Roster:** Full grid of all models in the series rendered with interactive `MachineCard` components.
- **Factory Quote Channel:** Direct quotation and callback request CTAs with series context automatically prefilled.
- **Sibling Series Discovery:** Quick links to explore other series within the same category.
- **Structured Data:** Full JSON-LD `BreadcrumbList` schema ensuring search engine crawlability.

---

## 8. All-Electric Series Integration

The four All-Electric models ingested in Phase 8.1 are seamlessly integrated:
- **Category:** `hot-water`
- **Series Name:** `All Electric Series`
- **Dedicated Route:** `/machines/hot-water/series/all-electric-series`
- **Models:**
  * `108`: 2.2 GPM (8.3 L/M) @ 1,000 PSI (69 BAR) · 14 kW Heating · 460V 3PH
  * `4208`: 3.5 GPM (13.2 L/M) @ 2,000 PSI (138 BAR) · 32 kW Heating · 460V 3PH
  * `4308`: 4.0 GPM (15.1 L/M) @ 3,000 PSI (207 BAR) · 48 kW Heating · 460V 3PH
  * `5308`: 5.0 GPM (18.9 L/M) @ 3,000 PSI (207 BAR) · 60 kW Heating · 460V 3PH
- **Assets:** Official Alkota USA All-Electric CDN photography and verified manufacturer Spec Sheet PDF.

---

## 9. Subsystem Integrations

- **Machine Comparison:** Integrated across all cards via `useMachineComparison()`. The persistent `<ComparisonDock />` renders at the viewport bottom when machines are selected, providing quick access to `/machines/compare?machines=...`.
- **Help Me Choose:** Restrained banner in the catalogue header and recovery action on empty filter states directing customers to `/machines/help-me-choose`.
- **Canonical Enquiry Journey:** Direct links from cards, series dossiers, and machine detail pages pass canonical model and series parameters to `/contact`.

---

## 10. Verification Suite Results

| Test Suite | File | Tests Run | Result | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 8.2 Catalogue UX** | `scripts/test-catalogue-ux.ts` | 53 | **53/53 PASS** | Criteria A through T verified |
| **Machine Selection QA** | `scripts/test-machine-selection.ts` | 98 | **98/98 PASS** | 131 universe evaluated |
| **Machine Comparison QA** | `scripts/test-machine-comparison.ts` | 17 | **17/17 PASS** | Factual highlights & units |
| **Enquiry Experience QA** | `scripts/test-enquiry-experience.ts` | 52 | **52/52 PASS** | Canonical handoff verified |
| **Phase 8.1 Ingestion QA** | `scripts/test-alkota-catalogue-ingestion.ts` | 207 | **207/207 PASS** | Zero regressions |
| **Production Build** | `npm run build` | Next.js 15.5.15 | **EXIT 0** | All routes compiled |

---

## 11. Known Limitations & Non-Goals (Preserved for Phase 8.3)

1. **Category Architectural Walkthroughs:** `ArchitectureNavigator` continues to use existing curated architectures for Hot Water, Cold Water, and Steam. Future phases may expand architectural walkthroughs for aqueous parts washers and water treatment.
2. **Dealer Net Pricing:** Dealer pricing display remains guarded behind authenticated dealer sessions; public customers see "Request Quote" or "View Machine".
3. **No eCommerce Cart:** Direct machine purchasing remains an inquiry/quotation model as required for bespoke heavy plant equipment.

---

## 12. Sign-off & Readiness

* All 131 machines discoverable: **Yes**
* All 36 series dynamically exposed: **Yes**
* All 8 categories accessible: **Yes**
* No hardcoded catalogue arrays: **Yes**
* Zero TypeScript or build errors: **Yes**

**PHASE 8.2 RECOMMENDATION: READY FOR PHASE 8.3**
