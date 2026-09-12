# Alkota UK — Machine Selection & "Help Me Choose" Engine

## Release Notes: Phase 6.0 – 6.3 Production Release

**Release Date:** September 2026  
**Route:** `/machines/help-me-choose`  
**Architecture:** Deterministic Industrial Selection Engine (No AI / No LLM in Decision Loop)  
**Catalogue Coverage:** 100% of 127 Active & Published Canonical Machines  
**Automated Tests:** 98 Forensic Selection Tests + 34 Project Integration Tests = 132 Total Tests (0 Failures)  
**Production Build:** Clean Next.js 15 App Router SSG/SSR Build (Exit Code 0, 400+ Pages)

---

## Executive Summary

Phase 6 delivers a customer-facing machine selection experience for Alkota UK. It transitions the customer journey from unstructured exploration to deterministic engineering alignment:

$$\text{Define Operational Task} \longrightarrow \text{Filter Viable Machinery} \longrightarrow \text{Understand Factual Match} \longrightarrow \text{Compare} \longrightarrow \text{Enquire}$$

The engine operates strictly against verified Tier 1 & Tier 2 technical data. It does not allow artificial intelligence or language models to hallucinate engineering specifications. Unknown specifications are never silently treated as failures (**Unknown $\neq$ Fail**), and customer preferences adjust ranking without excluding viable machines.

---

## Phase Breakdown & Milestone History

### Phase 6.0: Architecture & Engine Construction
- **Authoritative Data Mapping:** Established 5-tier data hierarchy (`docs/MACHINE_DATA_AUTHORITY_MAP.md`). Forbidden from parsing raw marketing prose or description text to infer physical attributes.
- **Selection Engine:** Pure deterministic mathematical function `selectMachines(allMachines, requirements)` calculating composite scores and 3-tier status partitions (`STRONG_MATCH`, `POSSIBLE_MATCH`, `DOES_NOT_MEET`).
- **Progressive Questionnaire:** 7-step questionnaire covering application taxonomy, thermal medium, pressure, flow rate, drive power, mobility chassis, and operational priorities.
- **Interactive UI:** Client component featuring live match counter, interactive filters, unit switcher (Metric $\leftrightarrow$ Imperial), and collapsible exclusion inspector.

### Phase 6.1: Forensic Validation & Adversarial QA
- **127-Machine Universe Coverage:** Verified all 127 canonical machines are evaluated with zero silently skipped.
- **Adversarial Tampering Tests:** Injected misleading text in descriptions, titles, and model codes; verified zero influence on machine selection.
- **Continuous vs Peak Ratings:** Validated that machines with only peak ratings evaluate to `UNKNOWN` continuous operating values.
- **Unknown $\neq$ Fail Audit:** Proved that machines with unrecorded fields are surfaced in "Worth Confirming" rather than eliminated.
- **Initial Test Suite:** 91 automated forensic tests passed with 0 failures (`docs/MACHINE_SELECTION_QA_REPORT.md`).

### Phase 6.2: Customer Journey & Conversion Audit
- **Comprehensive Walkthrough:** Audited 7 real-world customer personas (Fleet Haulage, Agricultural, Construction Heavy Plant, Workshop Parts Washing, High-Temp Steam, Mobile Trailer Rig, Undecided / Broad Fleet).
- **Audit Deliverable:** Produced `docs/MACHINE_SELECTION_UX_AUDIT.md`, identifying 18 prioritized refinements across dynamic branching, electrical configuration, mobile navigation, copy clarity, and analytics.

### Phase 6.3: Refinements & Production Hardening
- **Dynamic Category Branching:** Bypassed irrelevant pressure and water volume questions for specialized non-washer machinery (Aqueous Parts Washers, Pure Steam Generators, and Water Recycling Systems), reducing total questionnaire steps from 7 to 5 dynamically.
- **Electrical Power Sub-Questions:** Added inline progressive disclosure for Mains Electric drive on Step 5, enabling specification of site voltage (`110V`, `230V`, `400V`) and phase (`1-Phase`, `3-Phase`).
- **Mobile-First Responsive Stepper:** Replaced rigid 7-column desktop stepper with numbered dot indicators on mobile viewports (<640px) to prevent label clipping and layout breakage.
- **Match Reason Sanitisation:** Stripped enum identifiers (`[A-Z_]+`) and empty brackets from match explanation strings in favor of clear, natural language (`"Factory verified for Fleet Haulage."`).
- **Plain-Language Step Titles:** Renamed all 7 steps to clear, customer-friendly questions (e.g. "What do you need to clean?", "Hot water, cold water, or pure steam?").
- **Safe Defaults & Visual Affordances:** Added clear visual highlighting and "Safe Default / Any" badges on null pressure and flow options to eliminate user dead-ends.
- **Application Defaults & Pre-Fill Notifications:** Automatic pre-selection of thermal medium and trailer chassis when relevant applications are selected, accompanied by non-intrusive explanatory notification chips.
- **Specialized Machine Result Grids:** Adapted result card specification tables to display Equipment Type, Thermal/Medium, Power, and Chassis for parts washers and steam generators instead of misleading "Not specified" pressure/flow values.
- **Sitewide Comparison & Enquiry Integration:** Full two-way synchronization with the Phase 5 Comparison Tray (`useMachineComparison()`) and pre-filled enquiry URL generator for `/contact`.
- **Google Tag Manager / Analytics Events:** Implemented 6 structured events pushed to `window.dataLayer`:
  - `selector_step_complete`
  - `selector_results_view`
  - `selector_compare_add`
  - `selector_enquiry_click`
  - `selector_no_result`
  - `selector_reset`
- **Accessibility & ARIA:** Added explicit progressbar semantics (`role="progressbar"`, `aria-valuenow`, `aria-valuemax`, `aria-label`) and verified full keyboard navigation.
- **Expanded Test Suite:** Expanded test suite to 98 forensic selection tests (Group 22 added) and 132 total project tests.
- **Clean Production Build:** Verified clean Next.js 15 production build exiting with code 0 across 400+ routes.

---

## Key Files & Implementation Architecture

| File Path | Purpose |
|---|---|
| `src/lib/machine-selection/types.ts` | TypeScript domain interfaces for requirements, taxonomy, evaluations, and shortlists |
| `src/lib/machine-selection/authority-map.ts` | 5-tier authoritative data extraction, unit conversions, and evaluation rules |
| `src/lib/machine-selection/engine.ts` | Deterministic machine selection, scoring algorithms, and tier partitioning |
| `src/lib/machine-selection/questions.ts` | Step definitions, options, defaults, and plain-language titles |
| `src/app/machines/help-me-choose/page.tsx` | Server component page parsing URL query parameters into initial requirements |
| `src/app/machines/help-me-choose/HelpMeChooseClient.tsx` | Interactive client UI component with dynamic branching, stepper, and result views |
| `scripts/test-machine-selection.ts` | 98-test forensic QA suite executing all 22 test groups |
| `docs/MACHINE_DATA_AUTHORITY_MAP.md` | Formal authority boundaries and field hierarchy documentation |
| `docs/MACHINE_SELECTION_ENGINE.md` | Complete architectural specification of the selection engine |
| `docs/MACHINE_SELECTION_QA_REPORT.md` | Forensic validation and adversarial QA test report |
| `docs/MACHINE_SELECTION_UX_AUDIT.md` | Complete UX audit and resolution verification |

---

## Verification & Quality Assurance Summary

```
===============================================================
 ALKOTA UK — AUTOMATED VERIFICATION SUITE RESULTS
===============================================================
Forensic Machine Selection QA:      98 / 98 Passed (0 Failures)
Machine Comparison Test Suite:      17 / 17 Passed (0 Failures)
Product Ecosystem & Relationships:  17 / 17 Passed (0 Failures)
Total Project Test Suite:          132 / 132 Passed (0 Failures)
TypeScript Static Analysis:         Clean (0 Errors)
Next.js Production Build:           Exit Code 0 (400+ Pages)
===============================================================
```

---

## Production Deployment Readiness

The Alkota UK Machine Selection & "Help Me Choose" experience is **fully validated and production-ready**. It preserves the technical integrity of the 127-machine industrial fleet while delivering an intuitive, consultation-grade customer journey.
