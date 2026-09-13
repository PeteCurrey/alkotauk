# Alkota UK — Customer Enquiry Experience Architecture

**Phase**: 7.2 — Customer-Facing Commercial Enquiry Experience  
**Date**: September 2026  
**Status**: Production Specification  

---

## 1. Executive Summary & Core UX Principle

The customer-facing commercial enquiry experience unites all inbound equipment evaluation journeys:

```
MACHINE DETAIL PAGE
         │
HELP ME CHOOSE SELECTOR
         │
FLEET COMPARISON MATRIX
         │
         ▼
/enquire (Canonical Enquiry Interface)
         │
         ▼
POST /api/enquiries (Authoritative Boundary)
         │
         ▼
Supabase `enquiries` + `enquiry_machines`
```

### Core UX Principle
> **"Alkota already understands what I am looking for."**  
> The customer must never feel like they are filling out a generic, disconnected contact form. Stated operational requirements, shortlisted machinery, and comparison selections are automatically recognised and visually presented. The customer provides the missing contact details and site readiness parameters without having to manually retype machine names or engineering requirements.

---

## 2. Inbound Context Handoff & Routing

All commercial machine entry points now route to the canonical `/enquire` interface using a standardised query string schema:

| Journey Source | Originating Route | Query Parameters | Resolved Source Enum |
| :--- | :--- | :--- | :--- |
| **Machine Detail** | `/machines/[category]/[slug]` | `?source=MACHINE_DETAIL&machines=[slug]&model=[model_code]` | `MACHINE_DETAIL` |
| **Help Me Choose** | `/machines/help-me-choose` | `?source=MACHINE_SELECTOR&machines=[slugs]&models=[models]&app=[app]&water=[type]&press=[bar]&flow=[lpm]&power=[src]&volt=[v]&phase=[ph]&mob=[mob]&prefs=[list]` | `MACHINE_SELECTOR` |
| **Comparison** | `/machines/compare` | `?source=MACHINE_COMPARISON&machines=[slugs]&models=[models]` | `MACHINE_COMPARISON` |
| **Consumables** | `/chemicals`, `/parts` | `?source=CHEMICALS` or `?source=PARTS` | `CHEMICALS` / `PARTS` |
| **General** | Header / Footer | Direct navigation (`/enquire`) | `GENERAL` |

### Authoritative Hydration (Server-Safe)
The browser reads machine slugs from the URL and calls `/api/machines/search?slugs=...` to display high-fidelity equipment preview cards. However, **client-supplied machine names, specs, or match statuses are never trusted by the backend**. The client submits only identifiers; `POST /api/enquiries` re-resolves and validates the authoritative record server-side.

---

## 3. Form Architecture & Progressive Structure

The enquiry interface is built as a single-page progressive structure divided into clear sections:

### Top Context Banner (`ContextBanner.tsx`)
Displays an immediate visual acknowledgement of where the customer arrived from:
- **Detail**: "Authoritative Equipment Specification Request — Alkota [Model]"
- **Selector**: "Deterministic Selector Consultation — Based on your operational requirements..."
- **Comparison**: "Fleet Comparison Matrix Consultation — Comparing [N] models..."
- Includes a controlled return link (e.g. "Adjust requirements", "Edit comparison queue").

### Section 1 — Stated Operational Requirements (`RequirementsSummary.tsx`)
When arriving from Help Me Choose, displays a clean, read-only summary of the customer's stated requirements:
- Application duty (e.g. "Fleet & Commercial Vehicle Cleaning")
- Thermal duty ("Hot Water & High Temperature")
- Pressure & flow thresholds ("140 BAR Continuous", "15 L/min Continuous")
- Electrical supply ("400V Three-Phase Industrial")
- Mobility ("4-Wheel Portable Frame")
- Any active engineering preferences (e.g. "Prioritise Higher Flow Rate")
- **Worth Confirming items**: Highlights any site readiness items flagged by the deterministic engine.

### Section 2 — Authoritative Equipment Dossier (`MachineContextSection.tsx`)
Displays the machine(s) in question with:
- Authoritative model code and full name
- Key verified specifications (operating pressure, rated flow rate, power source, heating fuel)
- Customer-friendly match status badges (`Strong Match`, `Worth Confirming`, `Engineering Review`)
- Direct link to the public technical data sheet

### Section 3 — Customer Contact Information
Collects essential, validated contact details:
- **Full Name** (Required, sanitised)
- **Corporate Email** (Required, RFC-5322 syntax validated)
- **Company / Organisation** (Optional)
- **Telephone Number** (Optional)
- **Site Postcode** (Promoted to top-level database column for distributor territory routing)
- **Preferred Contact Method** (`email` | `phone` | `either`)

### Section 4 — Site Readiness & Timeline
Collects operational readiness factors to allow application engineers to qualify electrical and water infrastructure:
- **Available Site Power** (`230V Single Phase`, `400V Three Phase`, `110V Site Safe`, `Engine Standalone`, `Not Sure / Needs Survey`)
- **Water Inflow Available** (`Mains Water Supply`, `Header Tank`, `Mobile Bowser`, `Borehole / Well`)
- **Procurement Timeline** (`Immediate 1–2 Weeks`, `Within 1 Month`, `1 to 3 Months`, `Budgetary`)

### Section 5 — Contextual Application Notes
A free-text notes field with intelligent placeholders:
- **Selector**: Prompts for site power availability and water inflow throughput.
- **Comparison**: Prompts for which features or pump components require comparative advice.
- **Direct**: Prompts for daily operating hours and delivery location.

### Section 6 — Review & Double-Click Guard
- Displays a concise summary of the contact and equipment scope.
- Submit button displays an interactive loading spinner and disables immediately upon click to prevent duplicate submissions.

---

## 4. State Management & Lifecycle

```
[ IDLE FORM ]
      │
  Customer inputs details & clicks "Submit Enquiry"
      │
[ SUBMITTING ]
  • Button disabled (anti-duplicate guard)
  • Loading spinner rendered
  • Telemetry event: `enquiry_submit`
  • Payload dispatched to POST /api/enquiries
      ├───► [ SUCCESS ]
      │       • Renders reference number (e.g. AK-982341)
      │       • Explains next steps (Application Engineer review)
      │       • Telemetry event: `enquiry_success`
      │
      └───► [ ERROR ]
              • Preserves all entered customer data
              • Displays human-readable UK English error banner
              • Submit button re-enabled for instant retry
              • Telemetry event: `enquiry_failure`
```

---

## 5. Accessibility (a11y) Standards

1. **Semantic HTML**: Standard `<form>`, `<input>`, `<label>`, and `<button>` elements throughout.
2. **Accessible Labels**: Every input possesses an explicit `htmlFor` matching its `id`.
3. **Touch Targets**: Minimum 44×44px hit targets for all interactive buttons and select menus.
4. **Contrast & Colors**: Complies with WCAG 2.1 AA standards; critical status indicators do not rely on color alone (icons + text labels provided).
5. **Keyboard Operability**: Full logical tab order through contact fields, site readiness options, and submit controls.

---

## 6. SEO & Indexing Directives

Commercial enquiry URLs typically contain volatile query strings (machine IDs, requirements, filters). To prevent search engine duplicate content penalties:
- `/enquire/layout.tsx` applies `<meta name="robots" content="noindex, nofollow" />`.
- Canonical tag points strictly to `https://alkota.co.uk/enquire`.

---

## 7. Analytics & Telemetry

Integrates with the central analytics layer (`src/lib/analytics.ts`) using privacy-compliant events (zero customer PII sent to analytics):

```typescript
trackEnquiryView({ source, machine_count, models });
trackEnquiryStepComplete({ step, source });
trackEnquiryValidationError({ field, source, message });
trackEnquirySubmit({ source, machine_count, has_requirements });
trackEnquirySuccess({ reference, source, machine_count, models });
trackEnquiryFailure({ source, code });
```
