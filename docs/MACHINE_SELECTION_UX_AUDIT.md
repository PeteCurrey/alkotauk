# ALKOTA UK — MACHINE SELECTION UX AUDIT
## Phase 6.2 — Customer Journey, UX & Conversion Validation

**Audit Date:** 2026-09-11  
**Auditor:** Antigravity (deterministic audit — code review + scenario walkthrough)  
**Engine State:** Phase 6.1 — 91/91 forensic tests passing, production build exit 0  

---

## EXECUTIVE SUMMARY

The Help Me Choose engine is technically sound. The deterministic core, authority boundaries, and 3-state evaluation logic are correct and battle-tested. The UI is functional. However, the customer experience currently presents as an **internal engineering tool** rather than a premium Alkota consultation.

Key issues:

1. **Step titles use engineering terminology** — "Thermal Medium", "Operating Pressure", "Water Volume & Throughput", "Chassis & Mobility" — a fleet operator does not think in those terms.
2. **No dynamic branching** — Parts washer and steam customers are still asked about pressure/flow/mobility even though these parameters don't apply or are already constrained by their application selection.
3. **Electric power sub-questions are absent** — If a customer picks electric, they should be asked about voltage (110V / 230V / 400V) and phase (single / three). Currently no UI exists for these fields.
4. **Result card reasons expose internal identifiers** — Reason strings contain enum IDs and empty arrays.
5. **"Not Sure" is available but not foregrounded** — The skip option is styled identically to real options with no visual cue that it is the safe default.
6. **No analytics events** — No tracking on step completion, result view, compare, or enquiry clicks.
7. **Mobile stepper nav is broken** — grid-cols-7 at mobile viewport renders step labels unreadable.

---

## CUSTOMER JOURNEY AUDIT — 7 SCENARIOS

### Scenario 1: Fleet Operator (Electric wash bay)
- Step 2 title "Thermal Medium" is jargon. Should be "Hot, cold, or steam?"
- Selecting "Electric" on step 5 should reveal voltage/phase sub-questions. Currently they never appear, always evaluating as UNKNOWN.

### Scenario 2: Agricultural (Diesel, portable)
- Application pre-sets waterType=hot and suggestedMinBar=140 correctly, but customer still sees step 2 with no visible confirmation their selection was pre-filled.
- Result card reasons expose internal strings: "Application: AGRICULTURAL_CLEANING — matches machine's industries []"

### Scenario 3: Construction / Heavy Plant
- Flow step (step 4) is unnecessary for most construction profiles. A prominent "Skip this step" affordance is needed.

### Scenario 4 & 5: Workshop Parts Washing / Steam (CRITICAL)
- After selecting Workshop Parts Washing or Steam, customers are still taken through pressure and flow steps — even though the engine correctly bypasses these checks for those applications.
- This is the highest-priority UX issue. Dynamic branching must suppress irrelevant steps.

### Scenario 6: Mobile Trailer
- After selecting "Turnkey Mobile Trailer", step 6 (Mobility) still shows all options with nothing pre-selected. Mobility should auto-set to 'trailer' for this application.

### Scenario 7: Not Sure
- With all defaults, 127 machines qualify. Result banner says "Showing top 3 matches engineered for your stated parameters" — with no parameters set, this is inaccurate.
- No guidance suggesting the customer narrow their search.

---

## STEP-BY-STEP ISSUES

### Step Titles — Required Renames
| Step | Current | Recommended |
|------|---------|-------------|
| 1 | Primary Application | What do you need to clean? |
| 2 | Thermal Medium | Hot, cold, or steam? |
| 3 | Operating Pressure | How tough is the job? |
| 4 | Water Volume & Throughput | How fast does it need to work? |
| 5 | Power & Fuel Environment | Electric bay or off-grid? |
| 6 | Chassis & Mobility | How does the machine move? |
| 7 | Operational Priorities | Any priorities to rank first? |

### Step 3 & 4 — "Not Sure" affordance
- "No Minimum / Not Sure" is styled identically to real options. Add italics, muted styling, or a sub-note: "Most customers skip this — the engine will show the full range."

### Step 5 — Electric sub-questions missing
- When powerSource === 'electric', reveal inline voltage (110V / 230V / 400V) and phase (1PH / 3PH) selectors.
- These fields exist in SelectionRequirements and are evaluated by evaluateElectrical() but the UI never populates them.

### Step 6 — Skid Mount option
- "Forkliftable Skid Mount" appears but NO machine in the 127-machine catalogue has mobility 'skid'.
- Must be removed or relabelled "Custom / Enquiry Only".

---

## RESULT CARD ISSUES

### Reason Strings
- Expose internal enum identifiers: "Application: AGRICULTURAL_CLEANING — matches machine's industries []"
- Must be sanitised or the engine must produce human-readable strings.

### Parts Washer / Steam Cards
- Spec grid shows "Not specified" × 2 for pressure and flow. Should show relevant specs for those categories (heating capacity, tank capacity, cycle info).

### Copy
- "Active Filter:" → "Your Requirements:"
- "Worth Confirming" → "Technical Parameters to Verify:" → "Alkota engineers can confirm these specs:"
- "Specs" button → "Full Spec Sheet"
- No-result copy → "No exact match — Alkota can build a bespoke solution for your requirements."

---

## MOBILE UX ISSUES (CRITICAL)

1. **Stepper nav `grid-cols-7`** — At 375px, 7 columns renders each at ~46px. Step titles truncate to 2-3 characters and become unreadable. Fix: show numbered dot indicators on mobile only, hide text labels. Use `hidden sm:inline`.
2. **Unit switcher labels** — "Metric (BAR / L/min)" is too long on mobile. Shorten to "Metric" / "Imperial".

---

## ACCESSIBILITY

| Check | Status |
|-------|--------|
| `<button type="button">` for all options | ✅ |
| Keyboard navigation | ✅ |
| Progress bar ARIA attributes | ⚠️ Missing role="progressbar", aria-valuenow, aria-valuemax |
| Focus rings | ⚠️ Relies on browser default — add explicit focus-visible styles |
| Image alt text | ✅ |

---

## ANALYTICS GAPS

Events to add (dataLayer.push or equivalent):
- `selector_step_complete` — step ID + value selected
- `selector_results_view` — shortlist count + application + waterType
- `selector_compare_add` — machine slug
- `selector_enquiry_click` — model code + source (card / banner)
- `selector_no_result` — active requirements summary
- `selector_reset` — fired on reset

---

## PHASE 6.3 IMPLEMENTATION REQUIREMENTS

### Priority 1 — Critical
1. Dynamic category branching — suppress steps 3+4 for WORKSHOP_PARTS_WASHING and HIGH_TEMP_SANITISATION
2. Electric sub-questions — voltage and phase inline reveal on step 5
3. Mobile stepper nav — dot indicators on mobile, hide text labels
4. Result reason string sanitisation — remove enum IDs and [] artefacts

### Priority 2 — High Value
5. Step titles rename (all 7)
6. "Not Sure" visual affordance on pressure/flow steps
7. Application pre-fill confirmation banner on step 2
8. MOBILE_TRAILER_CLEANING auto-sets mobility = 'trailer'
9. Remove or relabel skid mount option
10. "Worth Confirming" language cleanup
11. Analytics events (all 6)

### Priority 3 — Polish
12. Progress bar ARIA attributes
13. Broad results guidance (no constraints state)
14. Unit switcher label shortening
15. "Active Filter:" → "Your Requirements:"
16. Parts washer/steam result card specs
17. Button labels cleanup
18. No-result copy update

---

## UX VERDICT & RESOLUTION (PHASE 6.3 COMPLETE)

**PRODUCTION READY — All 18 Priority 1, 2, and 3 UX refinements implemented and verified.**

All identified audit gaps have been resolved:
- ✅ Dynamic category branching implemented: Specialized non-washer applications bypass pressure & flow steps.
- ✅ Electric power sub-questions implemented: Inline voltage (110V/230V/400V) and phase (1PH/3PH) selectors active.
- ✅ Mobile stepper navigation fixed: Numbered dots on mobile viewports, responsive step labels on desktop.
- ✅ Match reasons sanitized: Enum identifiers and brackets removed in favor of clean prose.
- ✅ Plain-English step titles and subtitles established across all 7 steps.
- ✅ Safe default visual affordance added to null pressure & flow options.
- ✅ Application pre-fill notifications added for water temperature and trailer mobility.
- ✅ Skid option relabelled to 'Custom Skid Mount (Bespoke / Enquiry)'.
- ✅ Full 6-event Google Tag Manager / dataLayer analytics instrumentation added.
- ✅ ARIA accessibility attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemax`, `aria-label`) added.
- ✅ Result cards equipped with specialized spec grids for parts washers, steam units, and heaters.
- ✅ Clean production build verified (Exit 0, 400+ static and dynamic routes compiled).
- ✅ 98/98 forensic selection tests pass with 0 errors.
