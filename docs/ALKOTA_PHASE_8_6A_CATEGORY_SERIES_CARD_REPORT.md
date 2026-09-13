# ALKOTA UK — PHASE 8.6A PRODUCTION REPORT
## Category Page "Browse by Series" Discovery Architecture

**Phase Status:** PASS  
**Date:** September 2026  
**Auditor:** Lead Product Designer, Frontend Engineer & Machine Catalogue Architect  
**Fleet Scope:** 131 Machines · 36 Manufacturer Series · 8 Canonical Categories  
**Automated Tests:** 870 / 870 Tests Passing (100% across 11 test suites)  

---

### 1. Executive Summary

Phase 8.6A introduces a dedicated, visually prominent **"Browse by Series"** discovery section across all 8 canonical machine category landing pages (`/machines/[category]`).

This bridges the gap between high-level equipment classifications and individual machine specifications, reinforcing the authoritative catalogue discovery hierarchy:

```
MACHINES (/machines)
   ↓
EQUIPMENT CLASSIFICATION (/machines/[category])
   ↓
BROWSE BY SERIES (Dedicated visual section)
   ↓
MACHINE RESULTS (Full filterable catalogue with existing series strip)
   ↓
INDIVIDUAL MACHINE BLUEPRINT (/machines/[category]/[slug])
```

---

### 2. Component Architecture & Design Principles

#### Component: `src/components/category/CategorySeriesShowcase.tsx`
- **Zero Hardcoding:** Dynamically powered by `getSeriesByCategory()` from `src/lib/catalogue/series.ts`. If a series is added, modified, or removed, the component updates automatically without code changes.
- **Category Isolation:** Exposes only the series containing machines that belong strictly to the current category (e.g. 12 series for Hot Water, 9 for Cold Water, 3 for Steam, 4 for Parts Washers, 3 for Water Heaters, 1 for Trailers, 3 for Water Treatment, 1 for Space Heaters).
- **Alkota Industrial Design Language:**
  - Warm neutral background (`#FAF9F5`) and subtle border (`#E5E5E0`).
  - Charcoal typography (`#1A1A18`) with restrained Alkota orange accents (`#FF6900`).
  - Subtle corner radius (`rounded-[3px]`) and soft elevation on hover (`hover:shadow-md`).
- **Card Anatomy:**
  - **Series Name:** Clean, formatting-artifact-free title.
  - **Model Count:** Dynamic count (`X Models`) derived from canonical machine records.
  - **Representative Photography:** Uses verified canonical equipment photos via `series.representativeImage`.
  - **Capability Envelopes:** Operating pressure spans, flow rates, heating fuel, and powerplant badges.
  - **View Series Lineup CTA:** Clear action linking to canonical series route `/machines/[category]/series/[series]`.
- **Coexistence with Existing Quick-Filter Strip:** The existing series filter strip inside `FullCatalogueSection` is preserved intact. The new showcase provides visual discovery of machine families, while the strip provides in-catalogue filtering.

---

### 3. Dynamic Category & Series Distribution Coverage

| Canonical Category | Route Slug | Verified Machine Count | Canonical Series Count | Sample Series Platforms |
|:---|:---|:---:|:---:|:---|
| **Hot Water** | `/machines/hot-water` | 43 | 12 | Electric Driven Oil Fired, LP/NG Gas Fired, Belt Driven AX4, All Electric, Compact Hot Water, DED Diesel Skids, Industrial Series |
| **Cold Water** | `/machines/cold-water` | 31 | 9 | Industrial Cold Water BD, Wash Bay Cabinets, Hog Barn HHS, High Volume Water Cannon, SM Gasoline, Challenger Aluminum |
| **Steam Cleaners** | `/machines/steam` | 10 | 3 | LP / NG Gas Fired Steam, Oil Fired Steam for Grease, Portable Dry Steam Generators |
| **Parts Washers** | `/machines/parts-washers` | 22 | 4 | Front Load Automatic, Industrial Aqueous, Rollout Turntables, Compact Top Load |
| **Water Heaters** | `/machines/water-heater` | 14 | 3 | Gas Fired Stationary, Oil Fired Stationary UL Certified, Horizontal Heaters |
| **Mobile Trailers** | `/machines/trailer` | 5 | 1 | Single & Tandem Axle Highway Trailers |
| **Water Treatment** | `/machines/water-treatment` | 5 | 3 | Waste Water Evaporators, Media Filtration Systems, Portable Water Reclaim |
| **Space Heaters** | `/machines/space-heater` | 1 | 1 | Diesel/Kerosene Industrial Forced Air Heaters |

---

### 4. Automated Testing & Verification Results

```
===============================================================
TEST BATTERY: 870 / 870 TESTS PASSING (11 TEST SUITES)
===============================================================
  ✓ scripts/test-alkota-catalogue-ingestion.ts       (207/207 PASS)
  ✓ scripts/test-alkota-source-reconciliation.ts      (72/72 PASS)
  ✓ scripts/test-catalogue-ux.ts                     (53/53 PASS)
  ✓ scripts/test-machine-selection.ts                (98/98 PASS)
  ✓ scripts/test-machine-comparison.ts               (17/17 PASS)
  ✓ scripts/test-enquiry-model.ts                    (77/77 PASS)
  ✓ scripts/test-enquiry-submission.ts              (129/129 PASS)
  ✓ scripts/test-enquiry-experience.ts               (52/52 PASS)
  ✓ scripts/test-machine-detail-completeness.ts      (72/72 PASS)
  ✓ scripts/test-machine-series-integrity.ts         (51/51 PASS)
  ✓ scripts/test-category-series-showcase.ts         (42/42 PASS)
===============================================================
  TOTAL TESTS: 870 | PASSED: 870 | FAILED: 0
===============================================================
```

---

### 5. Definition of Done Checklist

- [x] Dedicated "Browse by Series" section implemented on category pages
- [x] Visually obvious, premium industrial catalogue aesthetic
- [x] 100% dynamic, powered by canonical series data (`src/lib/catalogue/series.ts`)
- [x] Tested and verified across all 8 canonical categories
- [x] Accurate model counts dynamically calculated
- [x] Every card links to canonical `/machines/[category]/series/[series]` route
- [x] Zero hardcoded series arrays in component
- [x] Preserved existing in-page series quick-filter strip
- [x] Responsive on mobile, tablet, and desktop
- [x] Accessible with semantic navigation and keyboard focus states
- [x] 870 automated tests passing with 0 regressions

**PHASE 8.6A STATUS: PASS**
