# ALKOTA UK — PHASE 8.3 MACHINE CATALOGUE FORENSIC VISUAL, SEO, ACCESSIBILITY & PRODUCTION QA REPORT

**Auditor:** Lead Frontend QA Engineer, Technical SEO Auditor & Production Readiness Auditor  
**Date:** September 13, 2026  
**Phase Status:** BLOCKED (Pending Resolution of 4 High-Severity Pre-Production Items)  
**Catalogue Universe:** 131 verified machines · 36 manufacturer series · 8 canonical categories  

---

## 1. Executive Summary

Phase 8.3 conducted an exhaustive, forensic quality assurance audit of the Alkota UK customer-facing machine catalogue delivered in Phase 8.2.

The audit verified that the Phase 8.2 data layer, series-first discovery hierarchy, and client components are functionally complete and robust: all 633 regression tests pass without error, the Next.js production build compiles cleanly (exit code 0), and all 131 machine models across 36 series and 8 categories are rendered with accurate specifications, uncropped photography, and side-by-side comparison integration.

However, from the perspectives of **Production Engineering** and **Technical SEO Crawlability**, the audit uncovered **4 High-Severity issues** that materially impact production readiness:
1. **SSG Pre-rendering Gap:** Machine detail routes (`/machines/[category]/[slug]`) lack `generateStaticParams()`, causing all 131 machine detail pages to be rendered dynamically on demand (`ƒ`) rather than being pre-rendered (`●`) at build time.
2. **Incomplete XML Sitemap Categories:** `src/app/sitemap.ts` hardcodes only 4 categories, omitting `/machines/steam`, `/machines/trailer`, `/machines/water-heater`, and `/machines/space-heater`.
3. **Missing Series in XML Sitemap:** All 36 dedicated manufacturer series routes (`/machines/[category]/series/[series]`) are absent from `sitemap.xml`.
4. **Sitemap Build-Time Database Dependency:** `src/app/sitemap.ts` queries Supabase directly without the canonical fallback used across the rest of the application, resulting in 0 machine detail URLs during offline or sandboxed builds.

In strict accordance with Phase 8.3 rules (*"Use BLOCKED if there are High findings that should be corrected before production"*), the phase status is classified as **BLOCKED** until these 4 items are remediated.

---

## 2. Scope of Audit

The audit evaluated the entire catalogue surface across four distinct domains:
1. **Customer Experience:** Hierarchy comprehension ($\text{Category} \to \text{Series} \to \text{Model}$), search precision, deterministic filtering, sorting consistency, and enquiry handoff.
2. **Visual Quality:** Photography framing (`object-contain`), resolution of the "same image" problem, typography, tactile card proportions, and responsive viewport behavior (390px to 1920px).
3. **Technical SEO:** Canonical URL integrity, XML sitemap coverage, robots.txt directives, metadata uniqueness, and JSON-LD schema validity.
4. **Production Engineering Quality:** SSR/SSG route generation, hydration stability, bundle footprints, accessibility compliance (WCAG 2.1 AA), and zero credential leakage.

---

## 3. Route Inventory Audit

The primary discovery route tree comprises **176 distinct routes**:
- **Root Fleet Catalogue:** 1 route (`/machines`)
- **Canonical Categories:** 8 routes (`/machines/hot-water`, `/machines/cold-water`, `/machines/steam`, `/machines/parts-washers`, `/machines/water-heater`, `/machines/trailer`, `/machines/water-treatment`, `/machines/space-heater`)
- **Manufacturer Series:** 36 routes (`/machines/[category]/series/[series]`)
- **Machine Details:** 131 routes (`/machines/[category]/[slug]`)

### Pre-rendering Status in Build Output:
- Root `/machines`: Pre-rendered (`○ Static`)
- All 8 Categories: Pre-rendered (`● SSG` via `generateStaticParams`)
- All 36 Series: Pre-rendered (`● SSG` via `generateStaticParams`)
- 131 Machine Details: Rendered on-demand (`ƒ Dynamic` - see `QA-001`)

---

## 4. Catalogue Integrity

The authoritative catalogue universe was cross-referenced across the filesystem, database schema, and runtime outputs:
- **Total Published Machines:** Exactly 131 (0 draft or archived machines leak into public views).
- **Slug Uniqueness:** 131 unique machine slugs (0 collisions).
- **Model Code Uniqueness:** 131 unique model codes (0 collisions).
- **Zero Hardcoded Arrays:** All UI components consume `getProducts()` and `getAllSeries()`.

---

## 5. Category Page Forensics (All 8 Categories)

All 8 category routes were inspected:

| Category Route | Status | Verified Machines | Series Count | Representative Image | Filter Toolbar |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/machines/hot-water` | 200 OK | 43 | 12 | `/assets/hot-water-gauge-hero.jpg` | Verified |
| `/machines/cold-water` | 200 OK | 31 | 9 | `/assets/cold-water-control-hero.jpg` | Verified |
| `/machines/steam` | 200 OK | 10 | 3 | High-Temp Steam Hero | Verified |
| `/machines/parts-washers` | 200 OK | 22 | 4 | Aqueous Turntable Hero | Verified |
| `/machines/water-heater` | 200 OK | 14 | 3 | Schedule 80 Coil Hero | Verified |
| `/machines/trailer` | 200 OK | 5 | 1 | Highway Trailer Hero | Verified |
| `/machines/water-treatment`* | 308/200 | 5 | 3 | Closed-Loop Treatment Hero | Verified |
| `/machines/space-heater` | 200 OK | 1 | 1 | Industrial Combustion Hero | Verified |

*\*Note: `/machines/water-treatment` issues a 308 permanent redirect to the dedicated `/water-treatment` marketing hub per legacy routing in `next.config.ts` (see Section 24).*

---

## 6. Series Page Forensics (All 36 Series)

All 36 series pages (`/machines/[category]/series/[series]`) were audited:
- Every series displays only its constituent models (0 cross-series model leakage).
- Every series displays correct aggregate pressure (BAR/PSI) and flow (L/min/GPM) envelopes.
- Verified official documentation links appear where manufacturer PDFs exist (e.g. All-Electric Spec Sheet PDF).
- Breadcrumbs render cleanly: `Home` $\to$ `Machines` $\to$ `[Category]` $\to$ `[Series Name]`.
- Canonical URLs match the exact route path.

---

## 7. Machine Detail Forensics (Representative Sample)

A sample of 24 machines across all categories was audited:
- **Hot Water (5):** `420X4`, `216AX4`, `4405XD4`, `4301`, `5357C` — Correct Schedule 80 coil details, oil/gas burners, and 7-year coil warranty badges.
- **Cold Water (4):** `216BD`, `420S`, `HHS440`, `219CSE` — Ceramic plunger pumps, belt vs direct drive distinctions verified.
- **Steam (2):** `126`, `246EN` — Low-flow (2.5–4.5 L/m) and high-temperature (up to 165°C) specs verified.
- **Parts Washers (2):** `AL3040`, `AL2424` — Rotary turntable diameters and load capacities correctly displayed without false pressure metrics.
- **Water Heaters (2):** `210WH`, `511` — Inline thermal ratings and fuel configurations verified.
- **Trailers (2):** `20151`, `20152` — Single vs tandem axle highway chassis verified.
- **Water Treatment (2):** `15/20-LP`, `CSF-5` — Vacuum reclaim and media filtration specifications verified.
- **Space Heaters (1):** `INDUSTRIAL-HEATERS` — Water pressure and flow cleanly suppressed (null); combustion output verified.
- **All-Electric (4):** `108`, `4208`, `4308`, `5308` — 460V 3-phase electric immersion ratings verified.

---

## 8. All Electric Series Deep Audit

The four All-Electric models were traced from catalogue root to detail blueprint:
- **Roster:** `108` (28 BAR / 6.4 L/m), `4208` (138 BAR / 13.2 L/m), `4308` (207 BAR / 13.2 L/m), `5308` (207 BAR / 18.2 L/m).
- **Chassis Presentation:** Uses official manufacturer CDN asset `All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png`.
- **Visual Differentiation:** While the physical enclosed cabinet is shared across the series, each card explicitly surfaces distinct power ratings (14 kW, 32 kW, 48 kW, 60 kW), pressure ratings (28 to 207 BAR), and motor sizes (2.0 to 10.0 HP), making the performance tier immediately apparent.
- **Official Documentation:** Verified manufacturer spec sheet linked: `all-electric-spec-sheet.pdf`.

---

## 9. Image Forensics & "Same Image" User Problem Evaluation

### The User Problem:
Historically, users perceived that *"the website has the same image for all machines."*

### Audit Findings:
1. **Manufacturer Reality:** Alkota USA legitimately uses shared chassis photography for model variations that share identical outer enclosures (e.g. `216X4`, `320X4`, `420X4` share the portable oil-fired chassis).
2. **Frontend Differentiation in Phase 8.2:**
   - **Padding & Containment:** Switching from cropped `object-cover` to `object-contain` inside a `#FAF9F5` canvas reveals the distinct silhouette of each machine type (e.g. 4-wheel portable vs stationary skid vs enclosed cabinet).
   - **Natural Livery:** Removing `grayscale-[0.8]` restored true factory powder-coat colours.
   - **Prominent Model Code:** Monospace watermark badges (e.g. `420X4`) immediately clarify model identity.
   - **Factual Spec Differentiation:** Card specification cells display exact pressure, flow, drive HP, and fuel type.
3. **Specific Model Assets Audited:**
   - `216CSE` & `320CSE`: Resolves to official Challenger series asset.
   - `845S`: Resolves to official SM Gasoline cold water skid asset.
   - All 58 local assets verified present on disk (0 missing local files).
   - All 73 CDN assets verified active and allowed by `next.config.ts`.

---

## 10. Search & Filter Boundary Forensics

### Search Testing:
- Exact model codes (`420X4`, `4308`): 100% precision.
- Partial numbers (`420`): Correctly returns all 6 relevant models (`420S`, `420BD`, `420X4`, `420AX4`, `4201`, `4208`).
- Category & series keywords (`All Electric`, `Cold Water`, `X4`): Returns exact corresponding sets.
- Whitespace and casing (`  420X4  `, `420x4`): Trims and normalises cleanly.
- Unknown query (`xyz-unknown-999`): Gracefully displays empty state with reset filter and Help Me Choose buttons.

### Filter Testing:
- Pressure brackets (`<150 BAR`, `150-250 BAR`, `250+ BAR`): Deterministic numerical bounds.
- Drive units (`Electric`, `Diesel`, `Gasoline`): Correct string matching on `power_source`.
- Multi-filter combinations: Seamless intersection without page reloads.

---

## 11. URL State & Browser History Forensics

- **State Serialization:** Parameter updates (`?category=...&series=...&q=...&sort=...`) use `window.history.replaceState` inside a `useTransition` boundary, preventing jarring page refreshes.
- **Browser Back/Forward:** Navigating backwards correctly restores previous filter states.
- **Direct Linking:** Loading `/machines?category=hot-water&series=all-electric-series` directly initializes the active category and series tab.
- **Next.js 15 Suspense:** Client components reading search params are wrapped in `<Suspense>`, eliminating CSR bailout errors during static generation.

---

## 12. SEO & Metadata Forensics

- **Titles & Descriptions:** Every category and series route generates a distinct, non-duplicated title and description formatted to industrial engineering standards.
- **Canonical URLs:** All canonical tags resolve to absolute `https://alkota.co.uk/machines/...` URLs matching canonical routing.
- **Robots Directives:** `/machines` and all sub-routes are fully indexable (`robots: { index: true, follow: true }`).

---

## 13. Sitemap Forensics

`src/app/sitemap.ts` generates 307 entries, but audit revealed three significant omissions:
- **`QA-002` (HIGH):** Hardcoded category list omits `steam`, `trailer`, `water-heater`, and `space-heater`.
- **`QA-003` (HIGH):** All 36 series landing pages are missing from `sitemap.xml`.
- **`QA-004` (HIGH):** Direct `supabaseAdmin` call in sitemap lacks fallback to `getProducts()`, omitting machines in offline builds.

---

## 14. Robots.txt Forensics

`src/app/robots.ts` was audited:
- Allows public crawling on `/` with explicit disallows on admin, portal, checkout, and API routes.
- References canonical sitemap: `https://alkota.co.uk/sitemap.xml`.
- Zero accidental blocks on `/machines`.

---

## 15. Structured Data (JSON-LD) Forensics

- **Valid JSON:** All rendered JSON-LD blocks parse validly without syntax errors.
- **`QA-005` (MEDIUM):** Duplicate `BreadcrumbList` blocks detected on `/machines` and series pages because both `Breadcrumbs.tsx` and the page templates output JSON-LD. Should be deduplicated into `Breadcrumbs.tsx`.

---

## 16. Accessibility Forensics (WCAG 2.1 AA)

- **Semantic HTML:** Correct usage of `<header>`, `<main>`, `<article>`, and `<h3>`.
- **ARIA Roles:** `SeriesNavigationStrip` implements `role="tablist"` with `aria-selected` and visible focus outlines.
- **Color Contrast:** Charcoal typography (`#1A1A18`) on warm white (`#FAF9F5` / `#FFFFFF`) yields a contrast ratio exceeding $10:1$ (exceeding WCAG AAA).
- **Comparison Toggles:** Feature explicit `aria-pressed` and dynamic `aria-label` describing the specific model being toggled.

---

## 17. Performance & Core Web Vitals Forensics

- **Initial Load:** Server-rendered shell with minimal client component footprint.
- **Images:** Lazy loading on below-the-fold cards; explicit `width` and `height` preventing Cumulative Layout Shift (CLS).
- **Payload:** Machine data passed from server components as serialized JSON props.

---

## 18. Hydration & Runtime Forensics

- **Console Output:** Zero hydration mismatches, zero React warnings, zero unhandled promise rejections.
- **Client Transitions:** Filter state transitions wrapped in `useTransition`, preserving smooth 60fps scrolling during search input.

---

## 19. Production Build & Static Generation

`npm run build` executed with **exit code 0**:
- 447+ pages compiled successfully.
- Zero TypeScript compiler errors.
- Zero ESLint blocking errors.

---

## 20. Regression Suite Results

| Test Suite | File | Tests Run | Pass | Fail | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Phase 8.2 Catalogue UX** | `scripts/test-catalogue-ux.ts` | 53 | 53 | 0 | Acceptance Criteria A–T |
| **Machine Selection QA** | `scripts/test-machine-selection.ts` | 98 | 98 | 0 | 131 universe evaluated |
| **Machine Comparison QA** | `scripts/test-machine-comparison.ts` | 17 | 17 | 0 | Spec groups & highlights |
| **Canonical Enquiry Model** | `scripts/test-enquiry-model.ts` | 77 | 77 | 0 | 9 context groups |
| **Enquiry Submission Pipeline**| `scripts/test-enquiry-submission.ts` | 129 | 129 | 0 | Error contracts & anti-spoof |
| **Enquiry Experience QA** | `scripts/test-enquiry-experience.ts` | 52 | 52 | 0 | Multi-machine payloads |
| **Catalogue Ingestion QA** | `scripts/test-alkota-catalogue-ingestion.ts` | 207 | 207 | 0 | Ingestion reconciliation |
| **Total Automated Tests** | | **633** | **633** | **0** | **100% Passing** |

---

## 21. Visual Design Audit

| Evaluation Dimension | Rating | Forensic Observations |
| :--- | :--- | :--- |
| **1. Premium industrial feel** | PASS | Feels like a serious manufacturing tool, not an eCommerce cart. |
| **2. Light / warm UI** | PASS | `#FAF9F5` and `#FFFFFF` backgrounds establish clean readability. |
| **3. Typography** | PASS | Work Sans typography paired with monospace technical metrics. |
| **4. Machine photography** | PASS | `object-contain` framing preserves uncropped chassis silhouettes. |
| **5. Visual hierarchy** | PASS | $\text{Category} \to \text{Series} \to \text{Model}$ is visually transparent. |
| **6. Depth & shadows** | PASS | Soft `shadow-xs` hovering to `shadow-md`; zero exaggerated glows. |
| **7. Corner radii** | PASS | Restrained `rounded-[4px]`; no excessive pill shapes. |
| **8. Orange restraint** | PASS | `#FF6900` reserved for active tabs, badges, and primary links. |
| **9. Absence of SaaS styling** | PASS | Zero Web3 border beams, dark mode cards, or floating bubbles. |
| **10. Mobile quality** | PASS | Smooth horizontal series scrolling; zero horizontal viewport spill. |

---

## 22. Specification Presentation Audit

- Non-applicable fields cleanly suppressed: Space heaters, parts washers, and evaporators suppress water pressure and flow cells rather than rendering `0` or `N/A`.
- Units formatted with consistency: `BAR` and `PSI`, `L/M` and `GPM`.

---

## 23. Cross-Category Consistency

The visual language, card proportions, filter toolbar, and series navigation strip maintain identical rhythm across all 8 categories while adapting specification cells to the equipment type.

---

## 24. Legacy Route & Redirect Safety

- `/machines/water-treatment` permanently redirects (308) to `/water-treatment`.
- `/machines/trailers` permanently redirects (308) to `/trailers`.
- Both redirects point to richer dedicated application hubs without dead ends.

---

## 25. Data / UI Consistency Check

A random audit of 20 machines verified 100% fidelity between canonical JSON values and frontend rendered cards:
- Model code, series name, category, pressure BAR, flow LPM, and drive type matched without distortion.

---

## 26. Admin to Public Data Flow

- The frontend data layer (`src/lib/products.ts`) reads from Supabase `products` table in production, falling back to `scripts/data/alkota-canonical-catalogue.json` when offline.
- Caching follows Next.js App Router default revalidation standards.

---

## 27. Security & Public Data Exposure

- Source code scan of client components verified zero references to `SUPABASE_SERVICE_ROLE_KEY`.
- No unpublished or draft records exposed in search results.

---

## 28. Findings Register

| ID | Severity | Area | Page / Route | Problem | Evidence | Impact | Recommended Fix | Blocking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **QA-001** | **HIGH** | Performance / Build | `/machines/[category]/[slug]` | Missing `generateStaticParams()` on machine detail page | `src/app/machines/[category]/[slug]/page.tsx` lacks export | Pages render on-demand (SSR) rather than being pre-rendered (SSG) at build time | Add `generateStaticParams()` mapping all 131 products | **YES** |
| **QA-002** | **HIGH** | Technical SEO | `/sitemap.xml` | Incomplete category URLs in sitemap | `sitemap.ts` lines 142-147 only lists 4 categories | Crawlers miss `steam`, `trailer`, `water-heater`, `space-heater` | Iterate over `CANONICAL_CATEGORIES` | **YES** |
| **QA-003** | **HIGH** | Technical SEO | `/sitemap.xml` | Series routes omitted from sitemap | `sitemap.ts` lacks series mapping | 36 dedicated series dossiers missing from XML sitemap | Map `getAllSeries()` into `sitemap.ts` | **YES** |
| **QA-004** | **HIGH** | Technical SEO | `/sitemap.xml` | Database fallback missing in sitemap | `sitemap.ts` queries raw Supabase without fallback | Sitemaps generated in offline build omit all machines | Use `getProducts()` helper in `sitemap.ts` | **YES** |
| **QA-005** | **MEDIUM** | Structured Data | `/machines`, `/series/[series]` | Duplicate `BreadcrumbList` JSON-LD schema | Both page and `Breadcrumbs.tsx` output script tag | Redundant schema signals in HTML | Deduplicate into `Breadcrumbs.tsx` | **NO** |
| **QA-006** | **LOW** | Routing | `/machines/water-treatment` | 308 redirect to `/water-treatment` | `next.config.ts` line 70 | Redirects category path to bespoke marketing hub | Retain intentional redirect or document | **NO** |

---

## 29. Remediation Priority

### A. BLOCKING BEFORE PRODUCTION (Target for Phase 8.4)
1. **`QA-001`**: Export `generateStaticParams()` in `src/app/machines/[category]/[slug]/page.tsx` so all 131 machine detail pages are pre-rendered statically (`● SSG`).
2. **`QA-002`**: Update `src/app/sitemap.ts` to dynamically include all 8 canonical categories via `CANONICAL_CATEGORIES`.
3. **`QA-003`**: Update `src/app/sitemap.ts` to map all 36 manufacturer series routes via `getAllSeries()`.
4. **`QA-004`**: Replace direct `supabaseAdmin` call in `src/app/sitemap.ts` with `getProducts()`.

### B. SHOULD FIX BEFORE POLISH
1. **`QA-005`**: Deduplicate `BreadcrumbList` JSON-LD schema by removing redundant `<script>` tags from `machines/page.tsx` and `series/[series]/page.tsx` (allowing `Breadcrumbs.tsx` to serve as single source).

### C. POST-LAUNCH IMPROVEMENTS
1. **`QA-006`**: Review architectural alignment between `/machines/water-treatment` category route and the `/water-treatment` custom marketing hub.

---

## 30. Production Readiness Decision

While customer experience and functional tests are 100% green, the sitemap omission of 36 series and 4 categories, coupled with dynamic-only rendering on machine detail pages, represents a significant technical SEO and performance deficit for an authoritative manufacturer catalogue.

**PHASE 8.3 STATUS: BLOCKED**
