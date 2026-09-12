# Alkota UK — Machine Selection & "Help Me Choose" Engine

## Phase 6 Architecture & Operational Specification

---

## 1. Executive Summary & Objective

The **Alkota UK Machine Selection Engine** (`/machines/help-me-choose`) turns the verified 127-machine industrial catalogue into a structured, customer-facing selection tool. It transitions the customer journey from unguided exploration to deterministic engineering alignment:

$$\text{Define Application Requirements} \longrightarrow \text{Filter Viable Machinery} \longrightarrow \text{Understand Factual Match} \longrightarrow \text{Compare} \longrightarrow \text{Enquire}$$

### Fundamental Mandates
1. **Deterministic Selection Over AI Guesswork**: All evaluations are computed strictly against the verified machine catalogue (`products` table / canonical JSON) and structured technical data. No AI language models are permitted in the runtime decision loop to invent or guess specifications.
2. **Hard Requirements vs. Preferences**:
   - *Hard Requirements* (e.g. Hot Water Mandatory, Min 180 BAR, Mains Electric Drive, Turnkey Road Trailer) represent immutable operational constraints. Any machine whose verified specification contradicts a hard requirement is excluded from the primary shortlist.
   - *Preferences* (e.g. Higher Water Volume, Higher Operating Pressure, Compact Footprint) act as additive ranking weights, adjusting score and order without eliminating viable alternatives.
3. **The "Unknown $\neq$ Fail" Architecture**: If a machine record does not contain data for an evaluated field (e.g. unrecorded pressure or flow in upstream factory sheets), the machine is marked as `UNKNOWN`, not `FAIL`. It is presented in a dedicated **"Worth Confirming"** section rather than being silently eliminated.
4. **No Arbitrary Match Percentages**: Machines are grouped into transparent, qualitative engineering tiers (**Strong Match**, **Possible Match**, **Excluded**), supported by explicit, data-driven bullet points explaining the factual basis of the match.

---

## 2. Authoritative Data Hierarchy

The selection engine adheres strictly to the 5-Tier Data Hierarchy defined in `docs/MACHINE_DATA_AUTHORITY_MAP.md`:

```
┌─────────────────────────────────────────────────────────────┐
│ Tier 1: Structured Numerical Technical Data (Highest)       │
│ pressure_bar, flow_rate_lpm, max_temp_c, power_source, ... │
├─────────────────────────────────────────────────────────────┤
│ Tier 2: Mathematically Calculated Equivalents               │
│ BAR = PSI / 14.5038, L/min = GPM * 3.78541                 │
├─────────────────────────────────────────────────────────────┤
│ Tier 3: Controlled Classification Arrays                    │
│ applications[], industries[], category                      │
├─────────────────────────────────────────────────────────────┤
│ Tier 4: Explicit Factory Annotations                        │
│ extra_specs[], features[]                                   │
├─────────────────────────────────────────────────────────────┤
│ Tier 5: Editorial Prose & Marketing Text (Lowest)           │
│ description, uk_description (FORBIDDEN for engine logic)    │
└─────────────────────────────────────────────────────────────┘
```

The engine is programmatically barred from searching raw prose fields (`description`, `uk_description`, `engineering_story`) to infer engineering properties.

---

## 3. Progressive Questionnaire Architecture

Located in `src/lib/machine-selection/questions.ts`, the questionnaire guides customers through 7 progressive steps:

| Step | Focus Area | Stated Question | Key Technical Enums / Values |
|---|---|---|---|
| **1** | Cleaning Task | What do you need to clean or operate? | `ApplicationId` (`FLEET_VEHICLE_CLEANING`, `AGRICULTURAL_CLEANING`, `CONSTRUCTION_HEAVY_PLANT`, `INDUSTRIAL_DEGREASING`, `HIGH_TEMP_SANITISATION`, `WORKSHOP_PARTS_WASHING`, `MOBILE_TRAILER_CLEANING`, `WATER_TREATMENT_RECYCLING`, `NOT_SURE`) |
| **2** | Water Temp | Hot water, cold water, or pure steam? | `WaterTypeRequirement` (`hot`, `cold`, `steam`, `aqueous_parts`, `not_sure`) |
| **3** | Pressure | How tough is the dirt or surface? *(Bypassed dynamically for specialized non-washer applications)* | Min BAR: `null` (Safe Default / Any), `100` (Light), `140` (Commercial), `180` (Heavy), `240` (Extreme) |
| **4** | Water Volume | How quickly do you need to rinse and flush? *(Bypassed dynamically for specialized non-washer applications)* | Min L/min: `null` (Safe Default / Any), `8` (Compact), `12` (Standard), `15` (Flushing), `19+` (High Throughput) |
| **5** | Power & Supply | Where will the machine be powered? | `PowerPreference` (`electric`, `petrol`, `diesel`, `engine`, `any`), plus optional inline `VoltagePreference` (`110v`, `230v`, `400v`, `any`) & `PhasePreference` (`1ph`, `3ph`, `any`) |
| **6** | Mobility & Mounting | How does the machine need to move or mount? | `MobilityPreference` (`portable`, `stationary`, `trailer`, `skid`, `any`) |
| **7** | Priorities | Any specific engineering priorities? | `prefer_higher_flow`, `prefer_higher_pressure`, `prefer_compact` |

*Specialized applications (Aqueous Parts Washers, Pure Steam Generators, and Water Recycling Systems) automatically bypass pressure and flow rate questions through dynamic questionnaire branching.*

*Every question unconditionally provides an "I'm Not Sure" or "Any" option to prevent user dead-ends.*

---

## 4. Evaluation Engine Mechanics

Implemented in `src/lib/machine-selection/engine.ts`:

### Evaluation Flow per Machine:
```
Machine Record (Products Table)
   │
   ├── 1. Water Type Evaluation ───────► PASS / FAIL / UNKNOWN
   ├── 2. Pressure Evaluation ─────────► PASS / FAIL / UNKNOWN
   ├── 3. Flow Rate Evaluation ────────► PASS / FAIL / UNKNOWN
   ├── 4. Power Source Evaluation ─────► PASS / FAIL / UNKNOWN
   ├── 5. Mobility Evaluation ─────────► PASS / FAIL / UNKNOWN
   ├── 6. Application Alignment ───────► Matched tags (+35 / +20 pts)
   │
   ▼
Status Partitioning:
   ├─ If ANY hard requirement == FAIL ───────► DOES_NOT_MEET (Excluded)
   ├─ Else if ANY requirement == UNKNOWN ────► POSSIBLE_MATCH ("Worth Confirming")
   └─ Else (ALL evaluated == PASS) ──────────► STRONG_MATCH (Primary Candidate)
```

### Preference & Provenance Scoring:
- Base Score: `50`
- Verified Application Match: `+35` (Applications array) or `+20` (Industries array)
- Provenance Verified (OEM source checked, no review flag): `+10`
- `prefer_higher_flow`: Adds up to `+20` points proportional to $L/\min$ throughput
- `prefer_higher_pressure`: Adds up to `+20` points proportional to BAR pressure
- `prefer_compact`: Adds `+10` points for compact chassis footprints

### Shortlist Composition:
- Top **3 Primary Matches** sorted by composite score (`shortlist`).
- Top **1–2 Possible Matches** sorted by score (`possibleMatches`) surfaced in the "Worth Confirming" section.
- Remaining excluded machines accessible via the collapsible "Why Other Machines Did Not Qualify" inspector.

---

## 5. Ecosystem & Sitewide Integration

### Comparison Integration (Phase 5)
Every shortlisted card and possible match features an active **Compare** toggle. Toggling seamlessly synchronises with the sitewide `ComparisonProvider` (`useMachineComparison()`), automatically updating the persistent `ComparisonDock` and opening `/machines/compare`.

### Enquiry Pipeline Integration
The "Enquire on Shortlist" and "Enquire on This Model" CTAs generate deep links to `/contact` with serialized query parameters:
```
/contact?enquiry=selector&models=420X4, 5355J&reqs=Fleet+Cleaning | Hot+Water | Min+140+BAR
```
Upon landing, `/contact` automatically decodes these parameters and pre-populates the consultation subject and engineering requirements message.

### Legacy Route Redirection
The previous mock tool route `/tools/machine-match` cleanly redirects via Next.js server redirection (`redirect('/machines/help-me-choose')`) to preserve incoming links and bookmark stability without maintaining conflicting tools.

---

## 6. Future AI Conversational Layer Architecture

The deterministic engine is decoupled from the user interface via typed parameters:
```typescript
selectMachines(allMachines: Product[], requirements: SelectionRequirements): SelectionResult
```

When an AI conversational assistant (e.g. Gemini / AGY Agent) is introduced in future phases:
1. The conversational agent handles user dialogue and natural language extraction.
2. The agent outputs a structured `SelectionRequirements` JSON payload.
3. The agent calls `selectMachines()` as a deterministic tool.
4. The agent returns the factual `SelectionResult` shortlist and explanations to the customer without hallucinating technical specifications.

---

## 7. Verification & Test Suite

The engine is validated by an exhaustive 98-test forensic suite in `scripts/test-machine-selection.ts` across 22 test groups:
- 127-machine universe full-fleet verification (100% active and published evaluated)
- Authoritative unit conversions (BAR $\leftrightarrow$ PSI, L/min $\leftrightarrow$ GPM)
- Hard requirement exclusion verification (hot vs cold, pressure thresholds, electric vs engine, trailers)
- Electrical hard evaluation (voltage: 110V/230V/400V, phase: 1PH/3PH)
- Unknown $\neq$ Fail verification with synthetic missing-data models
- Application taxonomy alignment
- Shortlist sizing bounds (3 primary, $\le 2$ possible matches)
- Preference score monotonicity & non-exclusion
- Mathematical determinism & tie-breaking reproducibility
- Group 22 Phase 6.3 UX Refinements & Dynamic Questionnaire integration tests
