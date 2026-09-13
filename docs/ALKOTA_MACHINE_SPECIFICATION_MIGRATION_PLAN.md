# Alkota UK — Phase 8.0: Machine Specification Forensic Audit & Metric Harmonisation Plan

**Document Version:** 1.0.0  
**Audit Date:** 13 September 2026  
**Status:** COMPLETE (AUDIT ONLY — ZERO PRODUCTION DATA MODIFIED)  
**Total Fleet Audited:** 131 Models (127 Current UK Baseline + 4 USA All-Electric Models)  
**Engineering Authority:** Alkota Cleaning Systems Inc. Master Technical Data  

---

## 1. Engineering Measurement Standards & Conversion Principles

Alkota equipment manufactured in South Dakota is engineered and specified using US Customary Units. The Alkota UK platform normalises all technical ratings into standard British and European metric units while preserving raw source values in `upstream_data`.

### Exact Conversion Constants

```text
┌────────────────────┬────────────────────────────┬─────────────────────────────┐
│ Dimension          │ Conversion Formula         │ UK Display Precision        │
├────────────────────┼────────────────────────────┼─────────────────────────────┤
│ Pressure           │ 1 PSI = 0.0689476 bar      │ Integer (e.g. 207 bar)      │
│ Water Flow         │ 1 GPM = 3.78541 L/min      │ 1 Decimal (e.g. 15.1 L/min) │
│ Mass / Weight      │ 1 lb = 0.453592 kg         │ Integer (e.g. 240 kg)       │
│ Dimensions         │ 1 inch = 25.4 mm           │ Integer mm (L × W × H)      │
│ Temperature        │ °C = (°F - 32) × 5 / 9     │ Integer °C (e.g. 98°C)      │
│ Heat Output        │ 1 BTU/hr = 0.293071 kW     │ Integer kW / kBTU           │
└────────────────────┴────────────────────────────┴─────────────────────────────┘
```

> [!IMPORTANT]
> ### The Non-Fabrication Directive
> Where an equipment category does not incorporate a high-pressure pump (e.g. parts washing cabinets, water heaters, mobile trailers, wastewater evaporators), `pressure_bar` and `flow_rate_lpm` are set to `null`. Under no circumstances should surrogate or estimated pressures be injected.

---

## 2. UK Market Technical Adaptation Framework

Importing American industrial equipment into the British and European markets involves critical engineering differences in power supply, electrical safety, and heating fuels:

### 2.1 Electrical Grid Harmonisation (60 Hz vs 50 Hz)

```text
┌─────────────────────┬──────────────────────┬────────────────────────┬────────────────────────────────┐
│ USA Rating (60 Hz)  │ UK Target (50 Hz)    │ Connection Type        │ Engineering Note               │
├─────────────────────┼──────────────────────┼────────────────────────┼────────────────────────────────┤
│ 115V / 1PH / 20A    │ 110V / 1PH (CTE)     │ Yellow BS 4343 Commando│ Site transformer required      │
│ 230V / 1PH / 20-30A │ 230V / 1PH / 50Hz    │ Blue BS 4343 (16A/32A) │ Exceeds domestic 13A plug      │
│ 230V / 3PH          │ 400V / 3PH / 50Hz    │ Red BS 4343 (16A/32A)  │ Dual-wound motor or star delta │
│ 460V / 3PH          │ 400V / 3PH / 50Hz    │ Red BS 4343 (32A/63A)  │ Industrial isolator required   │
└─────────────────────┴──────────────────────┴────────────────────────┴────────────────────────────────┘
```
- **Pump Displacement Derating:** Electric induction motors run ~17% slower on 50 Hz grid supplies (1450 RPM vs 1750 RPM). Unless pulleys are adjusted, flow rates derate by ~17%. Alkota UK models must indicate both nominal 60 Hz factory ratings and UK 50 Hz calibrated performance.

### 2.2 Heating Fuel & Burner Architecture

- **Oil Burners (Diesel / Kerosene):** Alkota USA specifies `#1 or #2 Fuel Oil / Diesel / Kerosene`. In the UK, this corresponds to **BS 2869 Class A2 Gas Oil (Red Diesel / Derv)** or **Class C2 Kerosene**. Alkota's Beckett and Wayne burners operate reliably on standard UK commercial diesel without nozzle modifications.
- **Gas Burners (Natural Gas / LPG):** USA gas valves are calibrated for 7" to 14" W.C. inlet pressures. In the UK, gas installations must comply with Gas Safety (Installation and Use) Regulations and require Gas Safe commercial commissioning.

---

## 3. Critical Specification Data Anomalies & Mitigation

| Model Code | Field | Current Corrupted Value | True Authoritative Value | Remediation Action |
|---|---|---|---|---|
| **530B** | `phase` | `13` (Integer) | `3` (with 1/3 dual in extra_specs) | Correct integer parsing in Phase 8.1. |
| **216AX4** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **311AX4** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **216X4PT** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **311X4PT** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **246EN** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **126** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **110** | `voltage` | `"230\u00a0v"` | `"230 v"` | Strip non-breaking spaces. |
| **AL2424** | `voltage` | `"230\u00a0v"` | `"230 v"` | Strip non-breaking spaces. |
| **8-VFS-1** | `voltage` | `"120\u00a0v"` | `"120 v"` | Strip non-breaking spaces. |
| **CSF-5** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |
| **CSF-10** | `voltage` | `"115\u00a0v"` | `"115 v"` | Strip non-breaking spaces. |

---

## 4. Comprehensive Fleet Specification Comparison Matrix

### 4.1 Hot Water Pressure Washers (43 Models)

| Model Code | Series | Flow (L/min) | Press (Bar) | Power Source | Voltage / Phase | Heating Fuel | Heat Output | Mass (kg) |
|---|---|---|---|---|---|---|---|---|
| **216AX4** | AX4 Belt Drive | 7.6 | 110 | Electric Motor | 115V / 1PH | Oil (Diesel/Kero) | 175 kBTU | 191 |
| **311AX4** | AX4 Belt Drive | 11.4 | 76 | Electric Motor | 115V / 1PH | Oil (Diesel/Kero) | 275 kBTU | 191 |
| **320AX4** | AX4 Belt Drive | 11.4 | 138 | Electric Motor | 230V / 1PH | Oil (Diesel/Kero) | 275 kBTU | 191 |
| **324AX4** | AX4 Belt Drive | 11.4 | 165 | Electric Motor | 230V / 1PH | Oil (Diesel/Kero) | 275 kBTU | 191 |
| **216X4** | X4 Belt Drive | 7.6 | 110 | Electric Motor | 115V / 1PH | Oil (Diesel/Kero) | 175 kBTU | 243 |
| **320X4** | X4 Belt Drive | 11.4 | 138 | Electric Motor | 230V / 1PH | Oil (Diesel/Kero) | 275 kBTU | 243 |
| **420X4** | X4 Belt Drive | 13.2 | 138 | Electric Motor | 230V / 1PH | Oil (Diesel/Kero) | 320 kBTU | 247 |
| **430XM4** | X4 Belt Drive | 13.6 | 207 | Electric Motor | 230V / 1PH | Oil (Diesel/Kero) | 350 kBTU | 283 |
| **523X4** | X4 Belt Drive | 18.2 | 159 | Electric Motor | 230V / 1PH | Oil (Diesel/Kero) | 385 kBTU | 243 |
| **3305XD4** | XD4 Direct Drive | 11.4 | 207 | Petrol Engine | Honda GX270 | Oil (Diesel/Kero) | 275 kBTU | 191 |
| **4405XD4** | XD4 Direct Drive | 15.1 | 276 | Petrol Engine | Honda GX390 | Oil (Diesel/Kero) | 350 kBTU | 191 |
| **216X4PT** | Gas Fired X4 | 7.6 | 110 | Electric Motor | 115V / 1PH | Gas (LP/NG) | 175 kBTU | 215 |
| **311X4PT** | Gas Fired X4 | 11.4 | 76 | Electric Motor | 115V / 1PH | Gas (LP/NG) | 275 kBTU | 215 |
| **320X4PT** | Gas Fired X4 | 11.4 | 138 | Electric Motor | 230V / 1PH | Gas (LP/NG) | 275 kBTU | 215 |
| **324X4PT** | Gas Fired X4 | 11.4 | 165 | Electric Motor | 230V / 1PH | Gas (LP/NG) | 275 kBTU | 215 |
| **4201** | Gas Fired Stationary | 13.6 | 138 | Electric Motor | 230V / 1PH | Gas (LP/NG) | 350 kBTU | 279 |
| **4301** | Gas Fired Stationary | 15.1 | 207 | Electric Motor | 230V / 1PH | Gas (LP/NG) | 420 kBTU | 367 |
| **5301** | Gas Fired Stationary | 18.9 | 207 | Electric Motor | 230V / 1PH | Gas (LP/NG) | 500 kBTU | 399 |
| **8351** | Gas Fired Stationary | 30.3 | 241 | Electric Motor | 230V / 3PH | Gas (LP/NG) | 840 kBTU | 640 |
| **10301** | Gas Fired Stationary | 37.9 | 207 | Electric Motor | 230V / 3PH | Gas (LP/NG) | 1,000 kBTU | 680 |
| **4301-NG/LP** | Elite Flagship | 15.1 | 207 | Electric Motor | 230V / 1PH | Gas (LP/NG) | 420 kBTU | 367 |
| **5357C** | DED Diesel Skid | 18.9 | 241 | Diesel Engine | Kubota Diesel | Diesel Oil | 450 kBTU | 431 |
| **5357KZ** | DED Diesel Skid | 18.9 | 241 | Diesel Engine | Kubota Diesel | Diesel Oil | 450 kBTU | 431 |
| **5357** | DED Diesel Skid | 18.9 | 241 | Diesel Engine | Kohler Diesel | Diesel Oil | 450 kBTU | 431 |
| **5407** | DED Diesel Skid | 18.9 | 276 | Diesel Engine | Kohler Diesel | Diesel Oil | 500 kBTU | 454 |
| **8307K** | DED Big Boy | 30.3 | 207 | Diesel Engine | Kubota / Kohler | Diesel Oil | 840 kBTU | 658 |
| **5357K** | DED Big Boy | 18.9 | 241 | Diesel Engine | Kubota / Kohler | Diesel Oil | 500 kBTU | 612 |
| **5507K** | DED Big Boy | 18.9 | 345 | Diesel Engine | Kubota / Kohler | Diesel Oil | 550 kBTU | 680 |
| **10307KKA** | DED Big Boy | 37.9 | 207 | Diesel Engine | Kubota / Kohler | Diesel Oil | 1,000 kBTU | 748 |
| **5355JB** | GED 115V Skid | 18.9 | 241 | Petrol Engine | Honda GX630 | Oil (Diesel/Kero) | 450 kBTU | 386 |
| **5305EAB** | GED 115V Skid | 18.9 | 207 | Petrol Engine | Briggs Vanguard | Oil (Diesel/Kero) | 450 kBTU | 386 |
| **8305H** | GED 115V Skid | 30.3 | 207 | Petrol Engine | Honda GX690 | Oil (Diesel/Kero) | 840 kBTU | 454 |
| **5355J** | GED 12V Skid | 18.9 | 241 | Petrol Engine | Honda GX630 | Oil (Diesel/Kero) | 450 kBTU | 363 |
| **5355EAD** | GED 12V Skid | 18.9 | 241 | Petrol Engine | Briggs Vanguard | Oil (Diesel/Kero) | 450 kBTU | 363 |
| **5505J** | GED 12V Skid | 17.0 | 345 | Petrol Engine | Honda GX690 | Oil (Diesel/Kero) | 500 kBTU | 408 |
| **5355ENS** | Compact GED-EN | 18.9 | 241 | Petrol Engine | Narrow Frame | Oil (Diesel/Kero) | 450 kBTU | 340 |
| **5355ENL** | Compact GED-EN | 18.9 | 241 | Petrol Engine | Narrow Frame | Oil (Diesel/Kero) | 450 kBTU | 340 |
| **5355HNS** | Compact GED-EN | 18.9 | 241 | Petrol Engine | Honda GX630 | Oil (Diesel/Kero) | 450 kBTU | 363 |
| **8405HNL** | Compact GED-EN | 30.3 | 276 | Petrol Engine | Honda GX690 | Oil (Diesel/Kero) | 840 kBTU | 431 |
| **108** | All Electric | 6.4 | 28 | Electric Motor | 240/460V 3PH | 60 kW Immersion | Electric | 159 |
| **4208** | All Electric | 13.2 | 138 | Electric Motor | 240/460V 3PH | 60 kW Immersion | Electric | 220 |
| **4308** | All Electric | 13.2 | 207 | Electric Motor | 240/460V 3PH | 60 kW Immersion | Electric | 240 |
| **5308** | All Electric | 18.2 | 207 | Electric Motor | 460V 3PH | 90 kW Immersion | Electric | 240 |

### 4.2 Cold Water Pressure Washers (31 Models)

| Model Code | Series | Flow (L/min) | Press (Bar) | Power Source | Voltage / Phase / Engine | Mass (kg) |
|---|---|---|---|---|---|---|
| **219CSE** | 219CSE Electric | 6.4 | 100 | Electric Motor | 120V / 1PH / 15A | 15 |
| **216BD** | BD Industrial | 7.6 | 110 | Electric Motor | 115V / 1PH / 20A | 86 |
| **311BD** | BD Industrial | 11.4 | 76 | Electric Motor | 115V / 1PH / 20A | 86 |
| **420BD** | BD Industrial | 15.1 | 138 | Electric Motor | 230V / 1PH / 22A | 95 |
| **430BD** | BD Industrial | 15.1 | 207 | Electric Motor | 230V / 1PH / 24A | 118 |
| **530BD** | BD Industrial | 18.9 | 207 | Electric Motor | 230V / 3PH / 25A | 127 |
| **420S** | S Series Electric | 14.0 | 138 | Electric Motor | 230V / 1PH | 109 |
| **530S** | S Series Electric | 18.9 | 207 | Electric Motor | 230V / 3PH | 122 |
| **HHS440** | Hog House Special | 15.1 | 276 | Electric Motor | 230V / 1PH | 136 |
| **HHS530** | Hog House Special | 18.9 | 207 | Electric Motor | 230V / 3PH | 136 |
| **HHS720** | Hog House Special | 26.5 | 138 | Electric Motor | 230V / 3PH | 145 |
| **HHS1015** | Hog House Special | 37.9 | 103 | Electric Motor | 230V / 3PH | 159 |
| **420B** | Wash Bay Modules | 13.6 | 138 | Electric Motor | 230V / 1PH | 127 |
| **430B** | Wash Bay Modules | 14.4 | 207 | Electric Motor | 230V / 1PH | 145 |
| **530B** | Wash Bay Modules | 18.9 | 207 | Electric Motor | 230V / 3PH (Dual 1/3) | 159 |
| **835B** | Wash Bay Modules | 30.3 | 241 | Electric Motor | 230/460V 3PH | 204 |
| **1030B** | Wash Bay Modules | 37.9 | 207 | Electric Motor | 230/460V 3PH | 227 |
| **2110** | Wash Cannon | 79.5 | 69 | Electric Motor | 230V / 3PH | 250 |
| **25500** | Wash Cannon | 94.6 | 34 | Electric Motor | 230V / 3PH | 260 |
| **25750** | Wash Cannon | 94.6 | 48 | Electric Motor | 230V / 3PH | 275 |
| **25755-GAS** | Wash Cannon | 94.6 | 48 | Petrol Engine | Honda GX690 | 280 |
| **210J** | Jetter Drain | 7.6 | 103 | Electric Motor | 230V / 1PH | 77 |
| **440J** | Jetter Drain | 15.1 | 276 | Petrol Engine | Honda GX390 | 95 |
| **840J** | Jetter Drain | 30.3 | 276 | Petrol Engine | Honda GX690 | 136 |
| **325CSH** | Challenger Aluminum | 11.4 | 172 | Petrol Engine | Honda GX200 | 45 |
| **216CSE** | Challenger Aluminum | 7.6 | 110 | Electric Motor | 115V / 1PH | 48 |
| **320CSE** | Challenger Aluminum | 11.4 | 138 | Electric Motor | 230V / 1PH | 52 |
| **845S** | S Series Gas/Diesel | 30.3 | 276 | Petrol Engine | Honda GX690 | 118 |
| **4355** | SG Gasoline Series | 15.1 | 21 | Petrol Engine | Honda GX160 | 48 |
| **537S** | SG Diesel Series | 18.9 | 241 | Diesel Engine | Kohler Diesel | 95 |
| **555M** | M Gasoline Series | 18.9 | 345 | Petrol Engine | Vanguard 23 HP | 127 |

### 4.3 Steam Cleaners (10 Models)

| Model Code | Series | Steam Output (L/min) | Operating Press (Bar) | Heating Fuel | Burner Output (BTU) | Mass (kg) |
|---|---|---|---|---|---|---|
| **246EN** | Dry Steam | 3.8 | 7 | Electric / Oil | 150 kBTU | 120 |
| **126** | Dry Steam | 3.8 | 7 | Electric / Oil | 150 kBTU | 120 |
| **181** | Gas Fired Steam | 11.4 (180 GPH) | 17 (250 PSI) | LP or NG | 490 kBTU | 260 |
| **241** | Gas Fired Steam | 15.1 (240 GPH) | 17 (250 PSI) | LP or NG | 650 kBTU | 285 |
| **301** | Gas Fired Steam | 18.9 (300 GPH) | 28 (400 PSI) | LP or NG | 880 kBTU | 340 |
| **401** | Gas Fired Steam | 25.2 (400 GPH) | 28 (400 PSI) | LP or NG | 1,200 kBTU | 395 |
| **122** | Oil Fired Steam | 7.6 (120 GPH) | 28 (400 PSI) | Oil (Diesel/Kero) | 392 kBTU | 210 |
| **240** | Oil Fired Steam | 15.1 (240 GPH) | 24 (350 PSI) | Oil (Diesel/Kero) | 630 kBTU | 275 |
| **122X4** | Oil Fired Steam | 7.6 (120 GPH) | 28 (400 PSI) | Oil (Diesel/Kero) | 392 kBTU | 215 |
| **240EN** | Oil Fired Steam | 15.1 (240 GPH) | 24 (350 PSI) | Oil (Diesel/Kero) | 630 kBTU | 270 |

---

## 5. Specification Harmonisation Roadmap for Phase 8.1

1. **Correct Model `530B` Phase integer to `3`:** Add `{ "label": "Phase Option", "value": "1/3 Dual Phase Available" }` to `extra_specs`.
2. **Batch-sanitize all electrical strings:** Strip all Unicode `\u00a0` non-breaking spaces.
3. **Stage All-Electric Series models:** Ingest official factory specifications for models `108`, `4208`, `4308`, and `5308`.
4. **Preserve physical nulls:** Maintain `pressure_bar = null` and `flow_rate_lpm = null` for all unpressurized lines (parts washers, evaporators, trailers, space heaters).
