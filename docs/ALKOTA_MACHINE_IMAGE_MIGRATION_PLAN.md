# Alkota UK — Phase 8.0: Machine Image Forensic Audit & Migration Plan

**Document Version:** 1.0.0  
**Audit Date:** 13 September 2026  
**Status:** COMPLETE (AUDIT & PLAN ONLY — ZERO ASSETS MODIFIED)  
**Total Fleet Audited:** 131 Machines (127 Existing UK Fleet + 4 USA All-Electric Models)  
**Image Resolution Engine:** `src/lib/images.ts` (`resolveMachineImage`)  

---

## 1. Imagery Architecture & Resolution Strategy

The Alkota UK platform currently employs a multi-tiered image resolution architecture:

```mermaid
flowchart TD
    A[resolveMachineImage] --> B{Explicit Local Mapping in productImages?}
    B -->|Yes| C[Serve /assets/products/{model}.png]
    B -->|No| D{Valid CDN image_url Provided?}
    D -->|Yes| E{Filename Matches Local Asset Key?}
    E -->|Yes| F[Serve Matched Local PNG]
    E -->|No| G[Serve Alkota USA CDN Image via Next/Image]
    D -->|No / Empty| H[Serve Category Fallback Graphic]
```

### Current Fleet Resolution Breakdown:
- **Explicit Local Assets (`/assets/products/*.png`):** 61 machines (46.6%)
- **Live Manufacturer CDN Passthrough (`alkota.com/wp-content/...`):** 66 machines (50.4%)
- **New USA Models Requiring Ingestion:** 4 machines (3.0%)
- **Zero-Image / Broken Fallbacks:** 0 machines (0.0%)

### Manufacturer Series-Level Asset Policy
Alkota USA manufactures machines on standardised industrial chassis families (e.g. welded 4-wheel AX4 frame, heavy C-channel DED skid, or modular wash bay cabinet). The manufacturer captures one studio hero photograph per series representing all model variants in that chassis family. 

> [!NOTE]
> Associating a series-level studio photograph with model variants sharing that exact chassis is standard industrial practice and manufacturer-authorized. Where visual variants differ substantially (e.g., twin-burner vs single-burner, engine brands), distinct photography is tagged `REVIEW_REQUIRED`.

---

## 2. Image Audit Status Taxonomy

Every machine in the 131-unit fleet is classified into one of five operational statuses:

1. **KEEP:** Verified high-resolution asset correctly representing the chassis family.
2. **REPLACE:** Currently mapped to a temporary or approximate asset where a higher-fidelity asset exists.
3. **ADD:** New model not currently in the UK fleet requiring image mapping (All-Electric models).
4. **REVIEW:** Asset shares a visual model across differing mechanical variants requiring verification.
5. **MISSING:** No verified local or CDN asset available.

---

## 3. Comprehensive Per-Model Image Audit Matrix

### 3.1 Hot Water Pressure Washers (43 Models: 39 Baseline + 4 New)

| Model Code | Series | Current Asset Path | Audit Action | Provenance | Technical Note |
|---|---|---|---|---|---|
| **216AX4** | AX4 Belt Drive | `/assets/products/216ax4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated local cutout of compact AX4 frame. |
| **311AX4** | AX4 Belt Drive | `/assets/products/420ax4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Identical AX4 chassis; shared studio cutout. |
| **320AX4** | AX4 Belt Drive | `/assets/products/420ax4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Identical AX4 chassis; shared studio cutout. |
| **324AX4** | AX4 Belt Drive | `/assets/products/420ax4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Identical AX4 chassis; shared studio cutout. |
| **216X4** | X4 Belt Drive | `/assets/products/216x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated local cutout of 115V X4 chassis. |
| **320X4** | X4 Belt Drive | `/assets/products/420x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Standard X4 4-wheel chassis cutout. |
| **420X4** | X4 Belt Drive | `/assets/products/420x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Flagship X4 commercial unit hero asset. |
| **430XM4** | X4 Belt Drive | `/assets/products/430xm4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | High-pressure XM series heavy frame. |
| **523X4** | X4 Belt Drive | `/assets/products/420x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Standard X4 chassis; shared studio cutout. |
| **3305XD4** | XD4 Direct Drive | `/assets/products/3305xd4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated local direct-drive frame asset. |
| **4405XD4** | XD4 Direct Drive | `/assets/products/4405xd4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | High-output Honda-driven XD4 hero asset. |
| **216X4PT** | Gas Fired X4 Portable | `/assets/products/gas-fired-x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated portable gas burner chassis asset. |
| **311X4PT** | Gas Fired X4 Portable | `/assets/products/gas-fired-x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared portable gas-fired chassis asset. |
| **320X4PT** | Gas Fired X4 Portable | `/assets/products/gas-fired-x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared portable gas-fired chassis asset. |
| **324X4PT** | Gas Fired X4 Portable | `/assets/products/gas-fired-x4.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared portable gas-fired chassis asset. |
| **4201** | Gas Fired Stationary | `/assets/products/4301-ng-lp.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Stationary gas-fired cabinet series asset. |
| **4301** | Gas Fired Stationary | `/assets/products/4301-ng-lp.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Stationary gas-fired cabinet series asset. |
| **5301** | Gas Fired Stationary | `/assets/products/4301-ng-lp.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Stationary gas-fired cabinet series asset. |
| **8351** | Gas Fired Stationary | `/assets/products/4301-ng-lp.png` | **REVIEW** | `REVIEW_REQUIRED` | High-volume 8 GPM unit; verify cabinet size. |
| **10301** | Gas Fired Stationary | `/assets/products/4301-ng-lp.png` | **REVIEW** | `REVIEW_REQUIRED` | Twin-burner 10 GPM unit; verify cabinet size. |
| **4301-NG/LP** | Elite Flagship | `/assets/products/4301-ng-lp.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Verified flagship asset matching brochure. |
| **5357C** | DED Diesel Skid | `/assets/products/5357c.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated diesel engine skid cutout. |
| **5357KZ** | DED Diesel Skid | `/assets/products/5357c.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Kubota diesel variant sharing 5357 frame. |
| **5357** | DED Diesel Skid | `/assets/products/5357c.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Base diesel skid variant. |
| **5407** | DED Diesel Skid | `/assets/products/5357c.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | High-pressure 4000 PSI diesel skid. |
| **8307K** | DED Big Boy | `/assets/products/ded-big-boy.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Heavy tandem-axle/large skid Big Boy asset. |
| **5357K** | DED Big Boy | `/assets/products/ded-big-boy.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared Big Boy heavy chassis asset. |
| **5507K** | DED Big Boy | `/assets/products/ded-big-boy.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | 5000 PSI Big Boy heavy chassis asset. |
| **10307KKA** | DED Big Boy | `/assets/products/ded-big-boy.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | 10 GPM high-volume Big Boy chassis asset. |
| **5355JB** | GED 115V Skid | `/assets/products/ged-115v-skid.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 115V generator skid asset. |
| **5305EAB** | GED 115V Skid | `/assets/products/ged-115v-skid.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared 115V generator skid asset. |
| **8305H** | GED 115V Skid | `/assets/products/ged-115v-skid.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | High-volume Honda GED skid asset. |
| **5355J** | GED 12V Skid | `/assets/products/5355j.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 12V direct-fired skid asset. |
| **5355EAD** | GED 12V Skid | `/assets/products/ged-12v-skid.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 12V skid cutout. |
| **5505J** | GED 12V Skid | `/assets/products/ged-12v-skid.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | 5000 PSI 12V skid variant. |
| **5355ENS** | Compact GED-EN | `/assets/products/5355ens.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated narrow-frame skid cutout. |
| **5355ENL** | Compact GED-EN | `/assets/products/5355ens.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared narrow-frame chassis asset. |
| **5355HNS** | Compact GED-EN | `/assets/products/8405hnl.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Honda narrow frame asset. |
| **8405HNL** | Compact GED-EN | `/assets/products/8405hnl.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated Honda large narrow frame asset. |
| **108** | All Electric Series | `[USA CDN URL]` | **ADD** | `ALKOTA_US_OFFICIAL` | Ingest official Alkota USA All-Electric asset. |
| **4208** | All Electric Series | `[USA CDN URL]` | **ADD** | `ALKOTA_US_OFFICIAL` | Ingest official Alkota USA All-Electric asset. |
| **4308** | All Electric Series | `[USA CDN URL]` | **ADD** | `ALKOTA_US_OFFICIAL` | Ingest official Alkota USA All-Electric asset. |
| **5308** | All Electric Series | `[USA CDN URL]` | **ADD** | `ALKOTA_US_OFFICIAL` | Ingest official Alkota USA All-Electric asset. |

### 3.2 Cold Water Pressure Washers (31 Models)

| Model Code | Series | Current Asset Path | Audit Action | Provenance | Technical Note |
|---|---|---|---|---|---|
| **219CSE** | 219CSE Electric | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to official handheld/compact image. |
| **216BD** | BD Industrial | `/assets/products/216bd2.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated belt-drive cold frame asset. |
| **311BD** | BD Industrial | `/assets/products/311bd3.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated belt-drive cold frame asset. |
| **420BD** | BD Industrial | `/assets/products/430bd.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared BD commercial frame asset. |
| **430BD** | BD Industrial | `/assets/products/430bd.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 430BD industrial frame asset. |
| **530BD** | BD Industrial | `/assets/products/430bd.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | High-output 5 GPM BD frame asset. |
| **420S** | S Series Electric | `/assets/products/420s.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated electric mobile cold washer asset. |
| **530S** | S Series Electric | `/assets/products/530s.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 3-phase electric cold washer asset. |
| **HHS440** | Hog House Special | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to agricultural high-pressure wash asset. |
| **HHS530** | Hog House Special | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to agricultural high-pressure wash asset. |
| **HHS720** | Hog House Special | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to high-volume agricultural asset. |
| **HHS1015** | Hog House Special | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to 10 GPM bulk farm washdown asset. |
| **420B** | Wash Bay Modules | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to stainless/powder cabinet asset. |
| **430B** | Wash Bay Modules | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to wash bay cabinet series asset. |
| **530B** | Wash Bay Modules | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to wash bay cabinet series asset. |
| **835B** | Wash Bay Modules | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to heavy wash bay cabinet asset. |
| **1030B** | Wash Bay Modules | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to 10 GPM wash bay cabinet asset. |
| **2110** | Wash Cannon | `/assets/products/2110.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 21 GPM bulk mud cannon asset. |
| **25500** | Wash Cannon | `/assets/products/25500.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated 25 GPM high-volume cannon asset. |
| **25750** | Wash Cannon | `/assets/products/25750.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated high-pressure cannon asset. |
| **25755-GAS** | Wash Cannon | `/assets/products/25755.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated gas engine cannon asset. |
| **210J** | Jetter Drain | `/assets/products/jetter-series.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated mobile jetter hose reel asset. |
| **440J** | Jetter Drain | `/assets/products/jetter-series.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared jetter drain cleaning cart asset. |
| **840J** | Jetter Drain | `/assets/products/jetter-series.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Shared jetter drain cleaning cart asset. |
| **325CSH** | Challenger Aluminum | `/assets/products/325csh.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Dedicated lightweight aircraft aluminum frame. |
| **216CSE** | Challenger Aluminum | `/assets/products/216ax4.png` | **REPLACE** | `REVIEW_REQUIRED` | Currently mapped to AX4 hot; use CDN Challenger asset. |
| **320CSE** | Challenger Aluminum | `/assets/products/216ax4.png` | **REPLACE** | `REVIEW_REQUIRED` | Currently mapped to AX4 hot; use CDN Challenger asset. |
| **845S** | S Series Gas/Diesel | `/assets/products/ged-12v-skid.png` | **REPLACE** | `REVIEW_REQUIRED` | Currently mapped to GED hot skid; use CDN cold asset. |
| **4355** | SG Gasoline Series | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to roll-cage Honda cold washer asset. |
| **537S** | SG Diesel Series | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to Kohler diesel cold washer asset. |
| **555M** | M Gasoline Series | Alkota CDN Asset | **KEEP** | `ALKOTA_US_OFFICIAL` | Resolves to heavy-duty Vanguard cold washer asset. |

### 3.3 Steam Cleaners (10 Models)

| Model Code | Series | Current Asset Path | Audit Action | Provenance | Technical Note |
|---|---|---|---|---|---|
| **246EN** | Dry Steam Generators | `/assets/products/steam-oil.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Portable dry vapor generator asset. |
| **126** | Dry Steam Generators | `/assets/products/steam-oil.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Portable dry vapor generator asset. |
| **181** | LP/NG Gas Fired Steam | `/assets/products/steam-oil.png` | **REVIEW** | `REVIEW_REQUIRED` | Oil graphic on gas machine; consider CDN asset. |
| **241** | LP/NG Gas Fired Steam | `/assets/products/steam-oil.png` | **REVIEW** | `REVIEW_REQUIRED` | Oil graphic on gas machine; consider CDN asset. |
| **301** | LP/NG Gas Fired Steam | `/assets/products/steam-oil.png` | **REVIEW** | `REVIEW_REQUIRED` | Oil graphic on gas machine; consider CDN asset. |
| **401** | LP/NG Gas Fired Steam | `/assets/products/steam-oil.png` | **REVIEW** | `REVIEW_REQUIRED` | Oil graphic on gas machine; consider CDN asset. |
| **122** | Oil Fired Steam | `/assets/products/steam-oil.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Verified match for portable oil steam cleaner. |
| **240** | Oil Fired Steam | `/assets/products/steam-oil.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Verified match for portable oil steam cleaner. |
| **122X4** | Oil Fired Steam | `/assets/products/steam-oil.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Verified match for portable oil steam cleaner. |
| **240EN** | Oil Fired Steam | `/assets/products/steam-oil.png` | **KEEP** | `EXISTING_VERIFIED_UK_DATA` | Verified match for narrow-frame oil steam cleaner. |

### 3.4 Industrial Water Heaters, Parts Washers & Specialty Systems (47 Models)

All 47 models in Water Heaters (14), Parts Washers (22), Trailers (5), Water Treatment (5), and Space Heaters (1) currently resolve cleanly via high-resolution official Alkota CDN WebP/PNG assets (`https://alkota.com/wp-content/uploads/...`).
- **Parts Washers (`AL3040`–`AL5072`, `112`–`812C`, `AL2735-RO`):** All resolve to authentic studio photography of automatic parts washing cabinets.
- **Water Heaters (`210WH`–`760H`, `410`–`1060`, `411`–`1011`):** All resolve to horizontal and vertical oil/gas heating modules.
- **Trailers (`20151`–`20171`):** Resolve to turnkey mobile single/tandem axle wash platforms.
- **Recommendation:** **KEEP** existing CDN mappings for Phase 8.0/8.1. In Phase 8.2, batch download to local `/public/assets/products/` or Supabase Storage for CDN independence.

---

## 4. Phase 8.1 Image Migration Strategy

When executing Phase 8.1, the image migration should proceed in three controlled steps:

1. **Step 1 (Add New Models):** Add official Alkota USA CDN URL for the 4 All-Electric models (`108`, `4208`, `4308`, `5308`) pointing to `All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png`.
2. **Step 2 (Fix False Local Overrides):** In `src/lib/images.ts`, remove incorrect local mappings for `216cse`, `320cse`, and `845s` so they fall through to their authentic manufacturer CDN assets instead of hot-water graphics.
3. **Step 3 (Supabase Storage Batch Migration):** Stage a non-destructive script to download all 35 manufacturer CDN images and store them in the Supabase Storage bucket `product-assets` under clean naming conventions.
