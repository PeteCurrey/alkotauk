# ALKOTA UK — PHASE 8.1 IMPORT & CATALOGUE RECONCILIATION REPORT

**Author:** Lead Systems Architect & Data Engineer  
**Status:** COMPLETE  
**Date:** September 13, 2026  
**Downstream Recommendation:** READY FOR PHASE 8.2  

---

## 1. Executive Summary

Phase 8.1 delivers the authoritative catalogue ingestion, specification correction, and asset resolution recommended by the forensic audit in Phase 8.0. 

The Alkota UK machine catalogue has successfully expanded from **127 verified baseline machines** to **131 verified machines** by ingesting the four missing Alkota USA All-Electric industrial pressure washers (`108`, `4208`, `4308`, and `5308`). 

All existing 127 machine records, primary IDs, canonical slugs, and localized UK editorial copy (`uk_description`, `meta_title`, `meta_description`) were strictly preserved. Critical specification anomalies identified during Phase 8.0—including the erroneous single/dual-phase integer representation on model `530B`, non-breaking space characters (`\u00a0`) across 11 voltage strings, and unescaped HTML entities (`&amp;`) across 12 records—have been definitively resolved.

Image resolution has been verified across 100% of the catalogue (131/131), with cold-water models `216CSE`, `320CSE`, and `845S` decoupled from inappropriate hot-water visual overrides and restored to authentic manufacturer assets.

All automated verification test suites (totaling over 480 test assertions across catalogue ingestion, selection, comparison, and enquiry architecture) and the Next.js production build pass with zero errors.

---

## 2. Catalogue Reconciliation Matrix (127 → 131)

| Metric | Phase 8.0 Baseline | Phase 8.1 Ingestion | Delta | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Total Machines** | 127 | 131 | +4 | Reconciled |
| **Hot Water Machines** | 39 | 43 | +4 | Complete |
| **Cold Water Machines** | 31 | 31 | 0 | Unchanged |
| **Steam Cleaners** | 10 | 10 | 0 | Unchanged |
| **Space Heaters** | 1 | 1 | 0 | Unchanged |
| **Mobile Water Heaters** | 14 | 14 | 0 | Unchanged |
| **Parts Washers** | 22 | 22 | 0 | Unchanged |
| **Pressure Washer Trailers**| 5 | 5 | 0 | Unchanged |
| **Water Treatment Systems** | 5 | 5 | 0 | Unchanged |
| **Unique Series** | 24 | 25 | +1 | All Electric Series added |
| **Primary Image Resolution**| 127 (100%) | 131 (100%) | +4 | 0 Missing / 0 Broken |
| **Active Technical PDFs** | 121 (95.3%) | 125 (95.4%) | +4 | 100% verified URLs |
| **Honest Unlinked PDFs** | 6 (4.7%) | 6 (4.6%) | 0 | Preserved without fabrication |

---

## 3. Category & Series Taxonomy Changes

A new dedicated series, **All Electric Series**, was created under category `hot-water`:

* **Category Slug:** `hot-water`
* **Series Name:** `All Electric Series`
* **Target Operating Environment:** Enclosed industrial plants, food processing facilities, pharmaceutical manufacturing, mining shafts, and zero-emission indoor environments requiring hot-water cleaning without exhaust fumes, open flames, or combustible fuels.
* **Engineering Topology:** Industrial high-pressure triplex plunger pump driven by high-efficiency electric motor, paired with an electric immersion heating chamber utilizing incoloy or stainless elements.

---

## 4. Ingested Models Detailed Specification Dossier

The four ingested All-Electric models provide comprehensive zero-emission hot water performance:

### 4.1 Alkota 108
* **Slug:** `alkota-108`
* **Model Code:** `108`
* **Category:** `hot-water` | **Series:** `All Electric Series`
* **Performance:** 2.2 GPM (8.3 L/min) @ 1,000 PSI (69 BAR)
* **Thermal:** 14 kW electric heating element | 88°C max operating temp
* **Electrical:** 460V / 3-Phase / 20A
* **Drive & Motor:** 1.5 HP (1.1 kW) electric motor, belt-drive industrial triplex pump
* **Physical:** 1143 x 762 x 1067 mm (45" x 30" x 42"), 204 kg (450 lbs), stationary chassis
* **Documentation:** `https://alkota.com/wp-content/uploads/2021/04/All-Electric-Spec-Sheet.pdf`
* **Image:** Authentic manufacturer CDN asset (`alkota-all-electric-pressure-washer.png`)

### 4.2 Alkota 4208
* **Slug:** `alkota-4208`
* **Model Code:** `4208`
* **Category:** `hot-water` | **Series:** `All Electric Series`
* **Performance:** 3.5 GPM (13.2 L/min) @ 2,000 PSI (138 BAR)
* **Thermal:** 32 kW electric heating element | 88°C max operating temp
* **Electrical:** 460V / 3-Phase / 46A
* **Drive & Motor:** 5.0 HP (3.7 kW) electric motor, belt-drive industrial triplex pump
* **Physical:** 1372 x 813 x 1219 mm (54" x 32" x 48"), 295 kg (650 lbs), stationary chassis
* **Documentation:** `https://alkota.com/wp-content/uploads/2021/04/All-Electric-Spec-Sheet.pdf`
* **Image:** Authentic manufacturer CDN asset (`alkota-all-electric-pressure-washer.png`)

### 4.3 Alkota 4308
* **Slug:** `alkota-4308`
* **Model Code:** `4308`
* **Category:** `hot-water` | **Series:** `All Electric Series`
* **Performance:** 4.0 GPM (15.1 L/min) @ 3,000 PSI (207 BAR)
* **Thermal:** 48 kW electric heating element | 88°C max operating temp
* **Electrical:** 460V / 3-Phase / 68A
* **Drive & Motor:** 8.0 HP (6.0 kW) electric motor, belt-drive industrial triplex pump
* **Physical:** 1473 x 864 x 1270 mm (58" x 34" x 50"), 363 kg (800 lbs), stationary chassis
* **Documentation:** `https://alkota.com/wp-content/uploads/2021/04/All-Electric-Spec-Sheet.pdf`
* **Image:** Authentic manufacturer CDN asset (`alkota-all-electric-pressure-washer.png`)

### 4.4 Alkota 5308
* **Slug:** `alkota-5308`
* **Model Code:** `5308`
* **Category:** `hot-water` | **Series:** `All Electric Series`
* **Performance:** 5.0 GPM (18.9 L/min) @ 3,000 PSI (207 BAR)
* **Thermal:** 60 kW electric heating element | 88°C max operating temp
* **Electrical:** 460V / 3-Phase / 84A
* **Drive & Motor:** 10.0 HP (7.5 kW) electric motor, belt-drive industrial triplex pump
* **Physical:** 1524 x 889 x 1321 mm (60" x 35" x 52"), 408 kg (900 lbs), stationary chassis
* **Documentation:** `https://alkota.com/wp-content/uploads/2021/04/All-Electric-Spec-Sheet.pdf`
* **Image:** Authentic manufacturer CDN asset (`alkota-all-electric-pressure-washer.png`)

---

## 5. Specification Corrections Applied

### 5.1 Model 530B Phase Normalisation
* **Identified Defect:** `phase` column was populated as `13` due to upstream parsing of "1 or 3 phase". This caused schema validation warnings and corrupted electric load filters.
* **Correction Applied:** `phase` corrected to integer `3` (representing primary 3-phase industrial standard wiring). An explicit note (`"1/3 Dual Phase Available"`) was added to `extra_specs` and `features` preserving the field configurability.

### 5.2 Voltage String Unicode Normalisation
* **Identified Defect:** 11 machine records contained non-breaking space characters (`\u00a0`) inside the `voltage` string (e.g. `230\u00a0/\u00a0460V`), causing string comparison failures and messy UI rendering.
* **Correction Applied:** All non-breaking spaces replaced with standard ASCII spaces (` `).

### 5.3 HTML Entity Normalisation
* **Identified Defect:** 12 machine records contained unescaped HTML entities (`&amp;`) in `tagline` and `series` fields (e.g. `Oil &amp; Gas Heavy Industrial`).
* **Correction Applied:** All `&amp;` instances decoded to clean ampersands (`&`).

---

## 6. Image Resolution & CDN Asset Linkage

### 6.1 Cold-Water Model Override Rectification
In prior builds, three cold-water pressure washers were mapped to local hot-water burner assets:
* `216CSE` (Cold electric) → previously mapped to `216ax4.png` (Hot water kerosene burner)
* `320CSE` (Cold electric) → previously mapped to `216ax4.png` (Hot water kerosene burner)
* `845S` (Cold skid) → previously mapped to `ged-12v-skid.png` (Hot water diesel burner)

These erroneous mappings were removed in `src/lib/images.ts`. The resolver now cleanly resolves these units to their authentic Alkota USA manufacturer cold-water CDN images.

### 6.2 All-Electric Series Asset Mapping
The four All-Electric models (`108`, `4208`, `4308`, `5308`) have been linked to the official high-resolution Alkota All-Electric CDN photography:
`https://alkota.com/wp-content/uploads/2021/04/alkota-all-electric-pressure-washer.png`

### 6.3 Catalogue Image State
* **Local High-Resolution PNGs:** 58 models
* **Manufacturer CDN Photography:** 73 models
* **Fallback Placeholders:** 0 models
* **Overall Resolution Rate:** 131/131 (100.0%)

---

## 7. Documentation Integrity

* **Models with Active Technical PDFs:** 125 (95.4%)
* **Models without Active Manufacturer PDFs:** Exactly 6 models:
  * Trailer models `20151`, `20152`, `20152C`, `20152K`, `20171` (custom engineered trailer packages)
  * Water Treatment system `8-VFS-1` (specialized modular filtration system)
* **Integrity Guarantee:** In accordance with Phase 8.0/8.1 directives, these 6 records are honestly maintained with `pdf_spec_url: null` rather than linking fabricated, mismatched, or broken brochures.

---

## 8. Downstream Subsystems Impact & Compatibility

### 8.1 Machine Selection Engine (`src/lib/selection/`)
* Total evaluated universe: 131 machines.
* All-Electric models correctly participate in scoring algorithms. When evaluating a requirement for 3-phase electric hot-water with zero indoor emissions, the All-Electric models score in the top tier and appear in recommendations.
* 98/98 unit tests pass (`scripts/test-machine-selection.ts`).

### 8.2 Machine Comparison Engine (`src/lib/comparison/`)
* Evaluates all 131 machines across standard metric/imperial units.
* Generates accurate side-by-side technical dossiers comparing combustion vs zero-emission electric heating topologies.
* 17/17 comparison tests pass (`scripts/test-machine-comparison.ts`).

### 8.3 Canonical Enquiry Experience (`src/lib/enquiries/` & Phase 7.0–7.3 Architecture)
* All 131 machines generate valid canonical machine snapshots for enquiry submissions.
* Verified compatibility with `/contact?machine=alkota-4308` deep linking.
* 258/258 canonical enquiry tests pass across schema, submission, and customer experience.

### 8.4 Static Routes & Dynamic App Router Pages
* Dynamic routes `/machines/hot-water/alkota-[108|4208|4308|5308]` generate clean metadata, OpenGraph cards, JSON-LD schema, and download strips.

---

## 9. Database Migration Strategy (`029_alkota_catalogue_ingestion.sql`)

A zero-downtime, idempotent migration script was authored at `supabase/migrations/029_alkota_catalogue_ingestion.sql`.

### Key Safeguards:
1. **Targeted Insertion:** Inserts the 4 new All-Electric models with `migration_status = 'new'`, `source_verified_at = now()`.
2. **UK Editorial Protection:** The `ON CONFLICT (slug) DO UPDATE` clause explicitly preserves existing `uk_description`, `meta_title`, and `meta_description` in the database.
3. **Targeted Spec Corrections:**
   * Updates model `530B` setting `phase = 3` and updating `extra_specs`.
   * Replaces `\u00a0` with ` ` across `voltage` for all matching records.
   * Decodes `&amp;` to `&` across `tagline` and `series`.
4. **Audit Logging:** Inserts audit execution record into `import_logs` logging 4 insertions and 127 verified baseline records.

---

## 10. Automated Verification Results

| Suite | File | Tests | Result |
| :--- | :--- | :--- | :--- |
| **Phase 8.1 Ingestion QA** | `scripts/test-alkota-catalogue-ingestion.ts` | 207 | **207/207 PASS (100%)** |
| **Catalogue Validation** | `scripts/validate-catalogue.ts` | 131 records | **131/131 PASS (Score: 97.4/100)** |
| **Machine Selection Engine** | `scripts/test-machine-selection.ts` | 98 | **98/98 PASS (100%)** |
| **Machine Comparison Engine**| `scripts/test-machine-comparison.ts` | 17 | **17/17 PASS (100%)** |
| **Customer Enquiry Flow** | `scripts/test-enquiry-experience.ts` | 52 | **52/52 PASS (100%)** |
| **Enquiry Submission** | `scripts/test-enquiry-submission.ts` | 129 | **129/129 PASS (100%)** |
| **Canonical Data Model** | `scripts/test-enquiry-model.ts` | 77 | **77/77 PASS (100%)** |
| **Production Build** | `npm run build` | Next.js 15.5.15 | **EXIT 0 (All routes compiled)** |

---

## 11. Rollback Procedure

If a rollback of the Phase 8.1 catalogue ingestion is required:

### Database Rollback:
Execute the following SQL script:
```sql
BEGIN;
-- Remove ingested All-Electric models
DELETE FROM products WHERE slug IN ('alkota-108', 'alkota-4208', 'alkota-4308', 'alkota-5308');

-- Restore 530B phase to 13 (if legacy parity required)
UPDATE products 
SET phase = 13,
    extra_specs = '[{"label": "Phase Options", "value": "1 or 3 Phase Available"}]'::jsonb
WHERE slug = 'alkota-530b';

-- Log rollback event
INSERT INTO import_logs (total_discovered, total_imported, total_updated, total_errors, log_details)
VALUES (131, 0, 1, 0, '{"action": "rollback_phase_8_1", "reason": "operator_request"}'::jsonb);

COMMIT;
```

### Filesystem Rollback:
```bash
git checkout HEAD~1 -- scripts/data/alkota-canonical-catalogue.json scripts/data/machine-verification-matrix.json src/lib/images.ts
```

---

## 12. Sign-off & Readiness

* **All Deliverables Completed:** Yes
* **Database Migration Authored:** Yes (`029_alkota_catalogue_ingestion.sql`)
* **Canonical Snapshot Updated:** Yes (`scripts/data/alkota-canonical-catalogue.json` — 131 models)
* **Image Resolution Verified:** Yes (131/131)
* **Test Suites Passing:** Yes (207/207 Phase 8.1 QA tests pass)
* **Build Passing:** Yes (`npm run build` exit code 0)

**PHASE 8.1 RECOMMENDATION: READY FOR PHASE 8.2**
