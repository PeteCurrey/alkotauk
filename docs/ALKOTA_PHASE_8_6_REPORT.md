# ALKOTA UK — PHASE 8.6 PRODUCTION REPORT
## Series-First Discovery Architecture & Forensic Machine Image Verification

**Phase Status:** PASS  
**Date:** September 2026  
**Auditor:** Lead Product Designer, Frontend Engineer & Machine Catalogue Architect  
**Fleet Scope:** 131 Machines · 36 Manufacturer Series · 8 Canonical Categories  
**Production Build:** EXIT 0  
**Test Suite:** 828 / 828 Tests Passing (100%)  

---

### 1. Executive Overview

Phase 8.6 establishes **Machine Series** as a first-class customer browsing method alongside equipment categories. Customers can now discover machines through two equally prominent, fully crawlable discovery pathways on `/machines`:

- **Discovery Pathway A: Browse by Equipment Type** (8 canonical industrial categories)
- **Discovery Pathway B: Browse by Machine Series** (36 heavy-duty manufacturer series)

Simultaneously, a forensic audit of all 131 machine image assignments was conducted, establishing an explicit **Image Provenance & Verification Data Model** and remediating cross-fuel / cross-series substitutions.

---

### 2. Series-First Discovery Architecture

1. **Series Showcase Grid (`src/components/catalogue/SeriesShowcaseGrid.tsx`)**
   - High-performance, client-side discovery grid displaying all 36 canonical manufacturer series.
   - Interactive category filter pills allow rapid filtering across equipment families.
   - Each series card displays:
     - Series display name (cleaned of formatting artifacts)
     - Number of verified model configurations
     - Equipment category classification
     - Representative equipment photography
     - Technical capability envelopes (operating pressure span, flow rate, heating fuel, power source)
     - Direct "View Series" action linking to `/machines/[category]/series/[series]`.

2. **Dual-Pathway Machines Index (`src/app/machines/page.tsx`)**
   - Restructured into three logical discovery tiers:
     - `01 // DISCOVERY PATHWAY A: EQUIPMENT CLASSIFICATIONS`
     - `02 // DISCOVERY PATHWAY B: BROWSE BY MACHINE SERIES`
     - `03 // INTERACTIVE FLEET DISCOVERY: FILTER & COMPARE MODELS`
   - Zero duplication of underlying product records; both pathways feed into the single authoritative catalogue.

3. **Series Landing Page Enhancements (`src/app/machines/[category]/series/[series]/page.tsx`)**
   - Statically generated routes for all 36 series.
   - Technical dossiers including aggregate pressure/flow envelopes, drive unit summaries, constituent model cards, direct factory quote CTAs, and sibling series recommendations.

---

### 3. Forensic Image Verification & Defect Remediation

1. **Inaccurate Image Substitution Remediation**
   - **LP / NG Gas-Fired Steam Cleaners (181, 241, 301, 401):** Removed inaccurate local mapping to `steam-oil.png` (oil-fired). Now resolves to official gas-fired manufacturer CDN asset: `Steam_Cleaners_Gas_Fired_Steam_Cleaner_301_Alkota-1024x1024.png`.
   - **Dry Steam Generators (246EN, 126):** Removed inaccurate local mapping to `steam-oil.png`. Now resolves to official dry steam manufacturer CDN asset: `246EN_Dry_Steam_Web.webp`.
   - **Industrial Series (5355EAD, 5505J):** Removed inaccurate local mapping to `ged-12v-skid.png` (GED series). Now resolves to authentic Industrial Series chassis asset `/assets/products/5355j.png`.

2. **Image Provenance & Verification Data Model (`src/lib/images.ts`)**
   - Implemented `getMachineImageDetails()` returning:
     - `verificationStatus`: `VERIFIED_EXACT_MODEL`, `VERIFIED_SHARED_MANUFACTURER`, `VERIFIED_SERIES`, `REQUIRES_REVIEW`, `NOT_AVAILABLE`
     - `source`: `LOCAL_VERIFIED_ASSET`, `OFFICIAL_MANUFACTURER_CDN`, `CATEGORY_FALLBACK`
     - `role`: `PRIMARY`, `GALLERY`, `DETAIL`, `OPTION`, `TECHNICAL`
     - `isExactModel`: Strict boolean flag (27 exact models, 104 shared manufacturer assets)
     - `caption`: Honest customer-facing label ("Exact Model Specification" vs "Official Manufacturer Equipment Photography").

3. **Honest Machine Detail Captions (`src/app/machines/[category]/[slug]/page.tsx`)**
   - Hero photography renders honest captioning based on `imageDetails.caption`. The system never claims a shared series photo is an exact model photo.

4. **Admin Image Provenance Visibility (`src/app/admin/products/ProductForm.tsx`)**
   - Image preview displays verification badge, source type, and caption to administrators.

---

### 4. Automated Testing & Verification Results

```
===============================================================
PHASE 8.6 TEST BATTERY (10 TEST SUITES)
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
===============================================================
  TOTAL TESTS PASSED: 828 / 828 (100%)
  TOTAL TESTS FAILED: 0
===============================================================
```

---

### 5. Production Build Verification

- **Command:** `npm run build`
- **Result:** **EXIT 0**
- **Static Routes Compiled:**
  - 131/131 Machine detail routes compiled as `● (SSG)`
  - 36/36 Series landing routes compiled as `● (SSG)`
  - 8/8 Category routes compiled as `● (SSG)`
  - Canonical Sitemap verified with 477 deduplicated URLs.

---

### 6. Phase 8.6 Sign-Off

- [x] All 36 series discoverable through dedicated visual showcase on `/machines`
- [x] Dual discovery pathways (Equipment Type & Machine Series) operational
- [x] 131/131 Machines assigned to verified canonical series (0 orphans)
- [x] 36/36 Series landing routes tested and statically generated
- [x] Inaccurate image substitutions resolved
- [x] Image provenance and verification status model implemented
- [x] Admin image verification visibility added
- [x] 828 automated tests passing (0 failures, 0 regressions)
- [x] Production build EXIT 0

**PHASE 8.6 STATUS: PASS**
