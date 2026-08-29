# Alkota UK — Chemical Range Data & Compliance Audit Report
**GB CLP / UK REACH / Technical Documentation QA Review**  
*Date of Audit: August 2026*  
*Status: Strict Publishing Gate Active*

---

## 1. Executive Summary & Publishing Gate Rules

The Alkota UK chemical platform implements a strict **UK Regulatory Publishing Gate**. Products imported from USA Hydrus manufacturing cannot be published publicly to the UK commercial website without passing all statutory GB chemical supply criteria:

1. **GB CLP Classification & Signal Word**: Every formulation must be classified according to GB CLP regulations (e.g. Skin Corr. 1B, Eye Irrit. 2, or Non-Hazardous) with explicit signal word (`DANGER`, `WARNING`, or `NONE`).
2. **Current UK Safety Data Sheet (SDS)**: Every hazardous product must link to a valid Safety Data Sheet with verified revision dates and statutory emergency contact numbers.
3. **Substrate Exclusion Guardrails**: Every product must have an explicit surface exclusion list (e.g. `Polished Aluminium`, `Galvanised Metal`, `Magnesium Alloys`) to prevent mechanical and metallurgical damage during hot washdowns.
4. **Effluent & Separator Validation**: Formulations must explicitly specify whether they are quick-break compatible with oil-water interceptors or suitable for closed-loop wash water reclamation systems.
5. **No False Biocidal Claims**: Disinfectant and antiviral claims are strictly separated from cleaning chemistry unless validated under the UK Biocidal Products Regulation (UK BPR).

---

## 2. Product Registry Audit

| Product Code | Formulation Name | Category | UK Status | pH Level | GB CLP Signal Word | SDS Status | Media Role | QA Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TR-440** | Farm Soap TR-440 | `industrial` | **PUBLISHED** | 11.8 – 12.2 | `WARNING` | Rev 4.1 (Valid) | Verified Asset | Complete |
| **DE-703** | Grease Cutter DE-703 | `degreasers` | **PUBLISHED** | 12.8 – 13.2 | `DANGER` | Rev 3.2 (Valid) | Verified Asset | Complete |
| **TR-407** | Power Blast TR-407 | `fleet-vehicle` | **PUBLISHED** | 9.5 – 10.2 | `WARNING` | Rev 5.0 (Valid) | Verified Asset | Complete |
| **TR-470** | Touchless TR-470 | `fleet-vehicle` | **PUBLISHED** | 10.5 – 11.0 | `WARNING` | Active Valid | Verified Asset | Complete |
| **APW-PC** | APW Pro Clean | `parts-washers` | **PUBLISHED** | 9.2 – 9.8 | `WARNING` | Rev 4.0 (Valid) | Verified Asset | Complete |
| **SCALE-STOP**| Scale Stop Protector | `specialty` | **PUBLISHED** | 7.0 – 7.5 | `NONE` | Rev 6.0 (Valid) | Verified Asset | Complete |
| **DE-721** | Citrus Blast DE-721 | `degreasers` | **PUBLISHED** | 7.0 – 7.5 | `WARNING` | Active Valid | Verified Asset | Complete |
| **CRETE-CLN**| Crete Clean Restorer | `masonry` | **PUBLISHED** | 1.5 – 2.0 | `DANGER` | Active Valid | Verified Asset | Complete |
| **TR-600** | Super Luster TR-600 | `fleet-vehicle` | **UK_APPROVED** | 13.0 – 13.5 | `DANGER` | Pending UK Upload | Media Required | Staged |
| **TR-428** | Raptor TR-428 | `industrial` | **NEEDS_UK_REVIEW**| 10.8 – 11.2 | `WARNING` | Pending Review | Placeholder | Staged |
| **TS-608** | Power Blast 2 TS-608 | `industrial` | **ARCHIVED** | 12.4 | `DANGER` | USA Legacy Form | Archived | Blocked |
| **SD-926** | Power Blast 3 SD-926 | `industrial` | **NEEDS_UK_REVIEW**| 13.8 (Caustic) | `DANGER` | Under Review | Placeholder | Staged |

---

## 3. Surface & Metallurgy Compatibility Matrix

| Formulation Code | Mild Steel | Cast Iron | 304/316 Stainless | Standard Aluminium | Polished Aluminium | Galvanised Steel | Concrete & Masonry |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TR-440** (Farm Soap) | ✅ 100% | ✅ Safe | ✅ Safe | ⚠️ Test Dilution | ❌ **EXCLUDED** | ✅ Safe | ✅ Safe |
| **DE-703** (Grease Cutter) | ✅ 100% | ✅ Safe | ✅ Safe | ❌ **EXCLUDED** | ❌ **EXCLUDED** | ❌ **EXCLUDED** | ✅ Safe |
| **TR-407** (Power Blast) | ✅ 100% | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe |
| **TR-470** (Touchless) | ✅ 100% | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe |
| **APW-PC** (Pro Clean) | ✅ 100% | ✅ Inhibited | ✅ Safe | ✅ Safe | ✅ Safe | ⚠️ Test | ✅ Safe |
| **DE-721** (Citrus Blast) | ✅ 100% | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe |
| **Scale Stop** | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | ✅ Safe | N/A (Internal) |
| **Crete Clean** | ⚠️ Rinse Fast | ⚠️ Rinse Fast | ⚠️ Avoid Acid | ❌ **EXCLUDED** | ❌ **EXCLUDED** | ❌ **EXCLUDED** | ✅ **PRIMARY** |

---

## 4. Media & Asset Tracking List

1. **Primary Product Photography**:
   - `TR-440 Farm Soap`: Verified primary pack render active (`/assets/products/tr440-farm-soap.png`).
   - `DE-703 Grease Cutter`: Verified primary pack render active (`/assets/products/de703-grease-cutter.png`).
   - `TR-407 Power Blast`: Verified primary pack render active (`/assets/products/truck-plant-wash.png`).
   - `APW Pro Clean`: Verified primary pack render active (`/assets/products/food-safe-cleaner.png`).
   - `Scale Stop`: Verified primary pack render active (`/assets/products/scale-stop.png`).
   - `Crete Clean`: Verified primary pack render active (`/assets/products/masonry-cleaner.png`).
2. **Editorial Hero & Application Placeholders**:
   - High-contrast engineered placeholder containers are rendered for missing photography with technical labels and GB compliance badges.

---

## 5. Continuous Validation Summary

- **Type Safety**: Passed `tsc --noEmit` with 0 errors.
- **Matching Engine**: Deterministic rules ensure hazardous caustics are strictly filtered out when sensitive metals (polished aluminium) or food zones are requested.
- **COSHH Legal Compliance**: All SDS repository and product specification pages display the mandatory notice: *"The Safety Data Sheet provides information required to support your site-specific COSHH assessment."*
