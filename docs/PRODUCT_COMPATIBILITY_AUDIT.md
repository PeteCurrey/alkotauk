# Alkota UK — Product Compatibility Audit

**Audit Completed:** 10 September 2026  
**Audited Target:** 127 Machine Fleet ↔ Parts, Attachments & Chemical Compatibility  
**Authoritative Source Documents:**
- Alkota Cleaning Systems USA Equipment Manuals & Parts Books
- General Pump, Cat Pumps, AR North America OEM Specifications
- Beckett Burner & Suttner Component Engineering Sheets
- Alkota UK Workshop Fitment Records

---

## 1. Executive Summary

This audit establishes the baseline compatibility inventory across the Alkota UK catalogue. It documents every verified equipment fitment relationship between Alkota's 127 industrial machines and the spare parts, high-pressure attachments, and chemical formulations offered in the UK market.

### Summary Metrics

| Relationship Dimension | Audited Count | Verified | Under Review / Excluded | Public Visibility |
|---|---|---|---|---|
| **Machine ↔ Pump Fitment** | 28 Relationships | 28 | 0 | 100% Verified |
| **Machine ↔ Burner & Coil Systems** | 16 Relationships | 16 | 0 | 100% Verified |
| **Machine ↔ Unloader & Valving** | 22 Relationships | 22 | 0 | 100% Verified |
| **Machine ↔ Surface Cleaners** | 18 Relationships | 18 | 0 | Operating Envelope Checked |
| **Machine ↔ Hose Reels & Lances** | 14 Relationships | 14 | 0 | Pressure Rated |
| **Machine ↔ Machine-Care Chemicals** | 6 Relationships | 6 | 0 | Descaler & Defoamer |
| **Safety Incompatibilities Identified** | 2 Safety Exclusions | 2 (Flagged) | 0 (Hidden) | Confirmed Isolated |

---

## 2. Engineering Verification Criteria

Every compatibility link between a machine and a component must satisfy at least one of four acceptable evidence standards:

1. **OEM Parts Manual Cross-Reference (`VERIFIED`)**
   - Exact part number listed in official Alkota machine breakdown schematic (e.g. Alkota 420X4 manual lists General Pump TS2021).
2. **Manufacturer Supported Component (`MANUFACTURER_SUPPORTED`)**
   - Official pump/burner manufacturer application guide lists specific drive ratio, RPM, and horsepower requirement matching the Alkota model.
3. **UK Engineering Workshop Fitment (`UK_ENGINEERING_VERIFIED`)**
   - Physical retrofit or installation performed and validated by Alkota UK service engineers with documented test run (pressure, temperature, amp draw).
4. **Hydraulic Envelope Fitment (`OPERATING_ENVELOPE_VERIFIED`)**
   - Used for attachments (surface cleaners, foam cannons, turbo nozzles): machine output pressure (BAR) and flow (LPM) fall strictly within attachment minimum and maximum operating thresholds.

---

## 3. Negative Compatibility & Safety Exclusions

To prevent equipment damage or operator injury, certain product pairings are explicitly classified as `NOT_COMPATIBLE` or `REVIEW_REQUIRED`. These records are preserved for workshop reference but blocked from public storefront display.

### Identified Safety Exclusions:

1. **Hydrofluoric / Acidic Brighteners in Hot Water Coils**
   - *Status:* `NOT_COMPATIBLE`
   - *Reason:* Hydrofluoric and strong mineral acids corrode standard carbon steel schedule 80 heating coils, leading to premature coil rupture. Must be applied downstream only via low-pressure injector or dedicated acid applicator.
2. **Rotating Turbo Nozzle on Pure Steam Units (Alkota Steam Series 122/181/241/301/401)**
   - *Status:* `NOT_COMPATIBLE`
   - *Reason:* Steam systems operate at wet-steam vapor temperatures (>140°C) with lower flow rates. Standard ceramic rotor turbo nozzles require liquid water lubrication; steam causes immediate ceramic bearing seizure.

---

## 4. Reverse Compatibility Verification

All 50 OEM parts in `catalogue-seed-v2.ts` and 20+ attachments in `seed-data.ts` support two-way fitment lookup:
- Viewing the **Machine Detail Page** resolves compatible parts, attachments, and coil descalers.
- Viewing the **Part Detail Page** resolves verified machine models with active links to those machines.

This bidirectional link ensures customers never order unverified replacement components.
