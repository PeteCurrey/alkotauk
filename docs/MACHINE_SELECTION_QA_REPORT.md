# Alkota UK — Phase 6.1 Forensic Machine Selection Validation & Adversarial QA Report

## 1. Executive Summary

This report documents the forensic QA, adversarial validation, and boundary verification performed on the Alkota UK deterministic machine selection engine (`/machines/help-me-choose`).

The validation establishes that:
1. The selector operates strictly against verified Tier 1 & Tier 2 structured machine data.
2. Every selection rule adheres to deterministic engineering physics.
3. Category-specific logic accurately isolates parts washers, water treatment, and trailer rigs from inappropriate pressure washer thresholds.
4. The core mandate **Unknown $\neq$ Fail** is strictly preserved throughout the pipeline.
5. No unsupported text inference (from descriptions, titles, slugs, or tags) enters the decision loop.
6. All 127 canonical machines are evaluated with zero machines silently skipped.
7. Mutually exclusive or impossible requirement sets produce explicit, non-forced no-result states with actionable recommendations.

---

## 2. Catalogue Universe & Coverage Audit

The QA process loaded the complete active Alkota UK machine catalogue (`scripts/data/alkota-canonical-catalogue.json`).

```
Catalogue Universe:
Total machines loaded:    127
Active and published:     127
Silently skipped:           0
Coverage rate:           100.0%
```

### Breakdown by Canonical Category:
| Canonical Category | Count | Primary Operational Domain |
|---|---|---|
| `hot-water` | 39 | High-temp industrial degreasing & fleet wash bays |
| `cold-water` | 31 | High-volume ambient washdown & mud clearing |
| `parts-washer` | 22 | Automated aqueous turntable component wash cabinets |
| `water-heater` | 14 | Continuous inline oil/gas water heating modules |
| `steam` | 10 | High-temperature wet steam generators (140°C–165°C) |
| `trailer` | 5 | Turnkey highway-towable mobile wash platforms |
| `water-treatment` | 5 | Closed-loop wash water recycling & evaporation |
| `space-heater` | 1 | Industrial space heating equipment |
| **Total** | **127** | **Complete Alkota Industrial Fleet** |

### Authoritative Field Coverage Analysis:
| Specification Field | Stored Field | Verified Count | % Catalogue | Selection Interpretation |
|---|---|---|---|---|
| **Pressure** | `pressure_bar` / `pressure_psi` | 80 | 63.0% | Rated operating pressure (remaining 47 are non-pump categories: parts washers, heaters, trailers, recovery) |
| **Water Flow** | `flow_rate_lpm` / `flow_rate_gpm` | 80 | 63.0% | Continuous rated water throughput |
| **Power Source** | `power_source` | 127 | 100.0% | Electric motor, petrol engine, diesel engine |
| **Mobility** | `mobility` / `portable` | 127 | 100.0% | 4-wheel chassis, stationary cabinet, trailer platform |
| **Temperature** | `max_temp_c` | 49 | 38.6% | Thermal output for 39 hot water + 10 steam units (cold units operate at ambient) |
| **Voltage** | `voltage` | 127 | 100.0% | Operating voltage (115V, 230V, 400V, 460V, or 12V DC for engine skids) |
| **Phase** | `phase` | 127 | 100.0% | Single-phase (1PH) or Three-phase (3PH) |
| **Applications** | `applications[]` | 127 | 100.0% | Structured taxonomy mapping |

---

## 3. Authority Boundary & Adversarial Validation

Adversarial test fixtures were injected into the engine to confirm that text-based inference cannot breach the selection boundary:

1. **Misleading Description**:
   - A stationary cabinet machine injected with `"Ideal for highway trailer-based cleaning"`.
   - Result: `evaluateMobility(m, 'trailer')` returned **`FAIL`**.
   - Verified: The engine never searches description or tagline text for mobility.
2. **Misleading Model Name**:
   - A Honda petrol engine machine injected with `model_code: 'ELECTRIC-400'` and `name: 'Alkota All-Electric Power System'`.
   - Result: `evaluatePowerSource(m, 'electric')` returned **`FAIL`**.
   - Verified: Model name strings cannot override structured combustion drive fields.
3. **Misleading Marketing Claim**:
   - A 140 BAR machine with tagline `"Extreme 500 BAR High-Pressure Ultra Blaster"`.
   - Result: Evaluated against 200 BAR threshold returned **`FAIL`**.
   - Verified: Taglines are ignored; only structured numerical `pressure_bar` is evaluated.
4. **Missing Power Field with Electric Text**:
   - Machine with `power_source: null` and description stating `"Equipped with industrial electric motor"`.
   - Result: `evaluatePowerSource(m, 'electric')` returned **`UNKNOWN`**, never `PASS`.

---

## 4. Pressure & Flow Rate Semantic Validation

### Operating vs. Maximum Pressure:
- The engine was tested with machines possessing a maximum pressure of 210 BAR but a rated operating pressure of 180 BAR.
- When evaluated against a minimum requirement of 200 BAR, the engine correctly returned **`FAIL`**. It did not falsely claim compliance based on peak maximum pressure.
- For records where only `max_pressure_bar` is known and operating pressure is unrecorded, the engine returns **`UNKNOWN`**, alerting the customer that continuous duty rating must be verified with the workshop.

### Rated vs. Maximum Flow Rate:
- The engine was tested with machines possessing a peak flow of 25 L/min but a rated flow of 18 L/min.
- Evaluated against a 20 L/min requirement, the engine returned **`FAIL`**.
- Records with only maximum flow without rated continuous throughput evaluate to **`UNKNOWN`**.

---

## 5. Thermal & Power Source Validation

- **Hot Water vs. Cold Water**: Cold water units fail the hot water requirement with the factual explanation: *"Cold water unit without heating coil or burner assembly."*
- **Steam Cleaners**: Saturated steam generators operate up to 140°C–165°C. Hot water pressure washers (up to 95°C) fail the pure steam requirement.
- **Power Incompatibilities**: Verified electric machines fail autonomous engine requirements. Diesel engines fail petrol-only requirements.
- **Electrical Verification**:
  - A 230V 1-phase machine fails a 400V 3-phase requirement.
  - A 400V 3-phase machine satisfies a 400V 3-phase requirement.
  - Missing electrical voltage or phase on an electric unit evaluates to **`UNKNOWN`**, never silent failure.

---

## 6. Mobility & Water Tank Validation

### Discovery & Remediation (Forensic Audit Finding):
During initial validation, an unconstrained search for `'tank capacity'` matched the machine's burner *fuel* tank capacity (e.g. 4.5 gal fuel tank on 216AX4) as a water storage tank.
- **Architectural Fix**: The water tank parser was immediately hardened to strictly exclude fuel tanks (`lbl.includes('fuel') -> return false`) and verify water storage labels.
- Standard pressure washers requiring direct mains water supply now explicitly evaluate to **`FAIL`** when an onboard water tank is required: *"Requires external mains water supply (no onboard water storage tank)."*
- Turnkey trailers with verified water tanks (230 gal = 871L; 330 gal = 1249L; 460 gal = 1741L) evaluate to **`PASS`** against appropriate tank volume thresholds.

---

## 7. Category-Specific Logic & Isolation

- **Workshop Parts Washing**: Aqueous parts washing cabinets (`parts-washer`) do not use high-pressure spray lances (they utilize rotating turntables with low-pressure wash manifolds). When `WORKSHOP_PARTS_WASHING` is selected, the engine isolates parts washers and does not disqualify them for lacking high-pressure pump figures.
- **Water Treatment**: Vacuum recovery and water filtration systems (`water-treatment`) are evaluated on environmental recovery merit without applying irrelevant pressure washer flow thresholds.

---

## 8. Unknown $\neq$ Fail Exhaustive Proof

To verify that unrecorded data never causes silent disqualification:
1. A machine with missing pressure and verified flow/power was tested against a 180 BAR requirement.
   - Status: **`POSSIBLE_MATCH`** (placed in "Worth Confirming" section).
   - Unmet list: **0 machines**.
   - Primary shortlist: **0 machines** (not falsely claimed as strong match).
2. A machine with *all* technical specifications null was evaluated.
   - Status: **`POSSIBLE_MATCH`**.
   - Surfaced with explicit bullet points listing every unverified parameter to confirm.
3. The distinction between `DOES_NOT_MEET` and `POSSIBLE_MATCH` is preserved across field evaluation, machine scoring, shortlist assembly, and UI rendering.

---

## 9. Mathematical Determinism & 7 Invariants

The engine was evaluated across 7 formal mathematical invariants:

| Invariant | Description | Verification Result |
|---|---|---|
| **Invariant 1** | A verified specification below threshold can never produce `STRONG_MATCH`. | **VERIFIED** — Zero violations across all 127 machines. |
| **Invariant 2** | An unknown specification alone can never produce `DOES_NOT_MEET`. | **VERIFIED** — Produces `POSSIBLE_MATCH` ("Worth Confirming"). |
| **Invariant 3** | An additive preference can never exclude an otherwise eligible machine. | **VERIFIED** — Total qualified count identical with and without preferences. |
| **Invariant 4** | Mutating prose descriptions or marketing copy has zero effect on score or eligibility. | **VERIFIED** — Exactly identical score and status. |
| **Invariant 5** | Mutating unrelated specifications (warranty, sort order) does not alter eligibility. | **VERIFIED** — No side-effects on physics evaluation. |
| **Invariant 6** | Pure mathematical determinism: $f(P, R) \equiv f(P, R)$ across repeated runs. | **VERIFIED** — Byte-identical results across independent runs with secondary model code tie-breaking. |
| **Invariant 7** | External compatibility relationships cannot invent or alter machine shortlists. | **VERIFIED** — Machine selection strictly consumes machine catalogue data. |

---

## 10. Conflicting Requirements & No-Result Experience

When impossible combinations are submitted (e.g. Hot Water + Mains Electric + Turnkey Trailer + Min 300 BAR + Min 50 L/min):
- The engine does not force a recommendation.
- It does not quietly relax thresholds.
- It flags `isConflicted = true`.
- It displays a dedicated UI panel: *"We couldn't identify a machine that clearly meets all of your stated requirements."*
- It provides structured engineering guidance explaining why the combination is restricted and recommends viable alternatives (e.g. adopting 3-phase 400V power or an autonomous combustion engine drive).

---

## 11. Test Results Summary

```
===============================================================
 ALKOTA UK — FORENSIC MACHINE SELECTION VALIDATION SUITE (QA)
===============================================================
Total Forensic Tests: 98
Passed:               98
Failed:                0
Warnings:              0

Phase 5 Comparison Suite:  17 / 17 Passed
Phase 4 Ecosystem Suite:   17 / 17 Passed
Total Automated Tests:    132 / 132 Passed
===============================================================
```

---

## 12. Known Limitations & Architectural Remediation

1. **Operating vs. Peak Specifications in Upstream Data**:
   - For 80 high-pressure machines, the upstream manufacturer sheets specify single pressure and flow figures which represent continuous operating duty.
   - For future data imports, the database schema supports explicit `operating_pressure_bar` vs `max_pressure_bar` columns; the engine handles both correctly.
2. **Trailer Tank Capacity Units**:
   - Upstream trailer specs record water tank capacity in US gallons (`"230 gal"`, `"330 gal"`, `"460 gal"`). The engine automatically normalizes these into metric litres ($1\text{ gal} \approx 3.785\text{ L}$) for universal evaluation.
3. **UK Mains Electrical Availability**:
   - High-output hot water machines (>150 BAR with >15 L/min) driven by electric motors require 400V 3-phase or 32A supplies. The questionnaire and conflict handler clearly communicate this electrical constraint to prospective buyers.
