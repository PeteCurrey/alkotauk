# Alkota UK — Forensic Enquiry Architecture Audit

**Phase**: 7.0A — Forensic Enquiry Architecture Audit  
**Classification**: Audit Only (No Implementation / No Production Code Modifications)  
**Date**: September 2026  
**Auditor**: Advanced Agentic Coding Assistant (Antigravity)  

---

## 1. Executive Summary

This forensic audit evaluates the complete enquiry, contact, product, machine, selector, comparison, admin, notification, analytics, and security architecture of Alkota UK.

The primary finding is that Alkota UK has a well-structured, centralized foundation centred around the canonical `enquiries` table, but previously suffered from three architectural limitations:
1. **Unstructured Machine Payloads**: Machine context from multi-machine touchpoints (Help Me Choose selector shortlists and Fleet Comparison trays) was historically stored in an untyped `metadata jsonb` blob rather than a normalized relationship.
2. **Untyped Requirements**: Stated customer operational parameters (pressure, flow, power, voltage, phase, mobility) were passed via loose query strings and stored in unstructured text notes, making structured SQL filtering and analytics difficult.
3. **Fragmented Peripheral Inbound Channels**: While core machine and general enquiries route through `enquiries`, peripheral modules created separate tables (`dealer_leads`, `part_requests`, `parts_enquiries`, and a mock `/api/industrial-enquiry`).

With the introduction of the minimal canonical enquiry model (`028_canonical_enquiry_model.sql`), `enquiries` serves as the single canonical commercial record, supported by `enquiry_machines` as an immutable snapshot join table.

---

## 2. Existing Architecture Inventory

### 2.1 Database Tables & Migrations
| Table Name | Primary Migration | Primary Key | Foreign Keys | Status & Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `enquiries` | `000_clean_schema.sql`, `028_canonical_enquiry_model.sql` | `id (uuid)` | `dealer_id -> dealers(id)` | **Active Canonical Entity**. Stores all general contact, machine quotes, selector submissions, comparison handoffs, trailer builds, and wash plant briefs. |
| `enquiry_machines` | `028_canonical_enquiry_model.sql` | `id (uuid)` | `enquiry_id -> enquiries(id)`, `product_id -> products(id)` | **Active Relationship Entity**. Normalized child records for machines attached to an enquiry, storing historical snapshots and match reasons. |
| `products` | `000_clean_schema.sql`, `007_create_products_table.sql` | `id (uuid)` | None | **Active Machine Catalogue**. Authoritative database of 127 Alkota industrial machines. |
| `dealers` | `012_dealers_and_lead_routing_schema.sql` | `id (uuid)` | None | **Active Dealer Directory**. Authorised UK dealers and regional hubs. |
| `dealer_leads` | `012_dealers_and_lead_routing_schema.sql` | `id (uuid)` | `dealer_id -> dealers(id)` | **Fragmented Channel**. Dedicated table for dealer network territorial lead distribution. |
| `part_requests` | `024_parts_store_foundation.sql` | `id (uuid)` | None | **Fragmented Channel**. Dedicated table for workshop part identification and photo submissions. |
| `parts_enquiries` | `018_parts_commerce_platform.sql` | `id (uuid)` | None | **Legacy/Overlapping**. Earlier parts enquiry schema superseded by `part_requests`. |
| `product_relationships` | `027_product_relationships.sql` | `id (uuid)` | Polymorphic (`source_id`, `target_id`) | **Active Relationship Ecosystem**. Segregates engineering `COMPATIBILITY` from `GENERAL` merchandising. |

### 2.2 API Routes
| Endpoint | Method | Auth Required | Purpose | Database Writes |
| :--- | :--- | :--- | :--- | :--- |
| `/api/contact` | `POST` | Public | Primary website contact & machine enquiry endpoint. | `enquiries`, `enquiry_machines` |
| `/api/enquiries` | `POST` | Public | Canonical structured enquiry API contract. | `enquiries`, `enquiry_machines` |
| `/api/admin/enquiries` | `GET`, `POST` | Admin Session (GET) / Public (POST) | Admin enquiry list & fallback submission. | `enquiries` |
| `/api/admin/enquiries/[id]` | `GET`, `PATCH` | Admin Session | Admin view & lifecycle updates (status, notes). | `enquiries` |
| `/api/dealers/enquiry` | `POST` | Public | Dealer lead routing endpoint. | `dealer_leads` |
| `/api/parts/enquiry` | `POST` | Public | Workshop parts identification inquiry. | `part_requests` |
| `/api/industrial-enquiry` | `POST` | Public | Legacy stub endpoint (console log only). | **None** |
| `/api/wash-plant/submit-brief`| `POST` | Public | Architectural wash plant design brief. | `wash_plant_projects`, `enquiries` |
| `/api/trailers/build` | `POST`, `GET` | Public | Bespoke trailer configuration saver/retriever. | `enquiries` |

### 2.3 Frontend Components & Pages
- `/contact` (`src/app/contact/page.tsx`): Main client enquiry form. Features `MachineEnquiryContextCard` to preview selected equipment, stated requirements, and site readiness fields.
- `/machines/help-me-choose` (`src/app/machines/help-me-choose/HelpMeChooseClient.tsx`): 7-step deterministic selector. Encodes shortlisted models and requirements into `/contact` URL parameters.
- `/machines/compare` (`src/app/machines/compare/ComparisonClient.tsx`): 3-machine comparison matrix. Encodes compared machine slugs into `/contact` URL parameters.
- `/machines/[category]/[slug]` (`src/app/machines/[category]/[slug]/page.tsx`): Detail page linking to `/contact?enquiry=quote&product=${slug}`.
- `/admin/enquiries` (`src/app/admin/enquiries/page.tsx`): Admin list view with status filter, type filter, search, and colour-coded source badges.
- `/admin/enquiries/[id]` (`src/app/admin/enquiries/[id]/page.tsx`): Admin detail view with Customer Card, Machine Consultation Dossier, Server Revalidation badge, and Sales Engineer Checklist.

---

## 3. Existing Database Schema Forensic Detail

### 3.1 `enquiries` Table Schema
```sql
CREATE TABLE enquiries (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference                   text UNIQUE,
  type                        text NOT NULL DEFAULT 'quote',
  status                      text NOT NULL DEFAULT 'new',
  
  -- Customer & Contact Details
  first_name                  text,
  last_name                   text,
  name                        text NOT NULL,
  email                       text NOT NULL,
  phone                       text,
  company                     text,
  job_title                   text,
  postcode                    text,
  preferred_contact_method    text DEFAULT 'either',
  
  -- Product Single-Context (Legacy)
  product_id                  text,
  product_name                text,
  chemical_id                 text,
  bespoke_build_id            text,
  
  -- Payload & Site Readiness
  subject                     text,
  message                     text,
  industry                    text,
  quantity                    integer,
  budget_range                text,
  timeline                    text,
  site_power                  text,
  site_water                  text,
  
  -- Structured Requirements (Hybrid Model)
  req_application             text,
  req_water_type              text,
  req_min_pressure_bar        integer,
  req_min_flow_lpm            numeric,
  req_power_source            text,
  req_voltage                 text,
  req_phase                   text,
  req_mobility                text,
  requirements                jsonb DEFAULT '{}'::jsonb,
  
  -- Selection Outcome & Anti-Spoofing Audit
  selector_version            text,
  selection_outcome           text,
  revalidation_status         text DEFAULT 'VALID',
  discrepancy_detected        boolean DEFAULT false,
  discrepancy_details         text[] DEFAULT '{}',
  requires_human_confirmation boolean DEFAULT false,
  unknown_criteria            text[] DEFAULT '{}',
  confirmation_items          text[] DEFAULT '{}',
  revalidated_at              timestamptz,
  
  -- Attribution & Admin Controls
  source                      text DEFAULT 'GENERAL',
  enquiry_context             text DEFAULT 'GENERAL_ENQUIRY',
  source_page                 text,
  utm_source                  text,
  utm_medium                  text,
  utm_campaign                text,
  dealer_id                   uuid REFERENCES dealers(id) ON DELETE SET NULL,
  metadata                    jsonb DEFAULT '{}'::jsonb,
  admin_notes                 text,
  notes                       text,
  assigned_to                 text,
  follow_up_date              timestamptz,
  
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);
```

### 3.2 `enquiry_machines` Table Schema
```sql
CREATE TABLE enquiry_machines (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id                  uuid NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  machine_id                  text NOT NULL,
  product_id                  uuid REFERENCES products(id) ON DELETE SET NULL,
  
  -- Historical Snapshot (Immutable)
  model_code_snapshot         text NOT NULL,
  machine_name_snapshot       text NOT NULL,
  slug_snapshot               text NOT NULL,
  category_snapshot           text NOT NULL,
  
  -- Role & Ordering
  role                        text NOT NULL DEFAULT 'PRIMARY',
  display_order               integer NOT NULL DEFAULT 0,
  
  -- Selection Evaluation
  selection_status            text,
  match_reasons               text[] DEFAULT '{}',
  unknown_criteria            text[] DEFAULT '{}',
  failure_reasons             text[] DEFAULT '{}',
  specs_snapshot              jsonb DEFAULT '{}'::jsonb,
  
  created_at                  timestamptz NOT NULL DEFAULT now()
);
```

---

## 4. Existing Enquiry Lifecycle Flow

```text
[CUSTOMER TOUCHPOINT]
   ├── Machine Detail Page (/machines/[cat]/[slug]) ──> Click "Request Pricing" / "Technical Consultation"
   ├── Help Me Choose Selector (/machines/help-me-choose) ──> Finish 7-step wizard ──> Click "Request Consultation"
   ├── Comparison Matrix (/machines/compare) ──> Select up to 3 machines ──> Click "Request Fleet Consultation"
   └── General Site Navigation ──> Click "Contact" in header/footer
             │
             ▼
[URL PARAMETER SERIALIZATION]
   URL: /contact?enquiry=selector&models=420X4,216X4&machines=alkota-420x4,alkota-216x4&app=FLEET...&press=140...
             │
             ▼
[CONTACT PAGE CLIENT RECOGNITION]
   • Parses URL search parameters.
   • Detects normalized source: 'selector' | 'compare' | 'quote' | 'service' | 'general'.
   • Asynchronously loads machine preview cards from /api/machines/search?slugs=...
   • Renders MachineEnquiryContextCard with active criteria chips and back-link.
   • Collects customer details (name, email, phone, company, postcode).
   • Collects site readiness details (available site power, water connection, timeline).
             │
             ▼
[HTTP POST SUBMISSION]
   Client dispatches JSON payload to POST /api/contact or POST /api/enquiries.
             │
             ▼
[SERVER VALIDATION & ANTI-SPOOFING]
   • Validates mandatory customer fields (name, corporate email).
   • Resolves submitted machine slugs / model codes against authoritative 127-machine catalogue.
   • Re-runs deterministic selection engine selectMachines() on the server.
   • Compares server-determined match status against any client-claimed status.
   • Flags discrepancy_detected = true if client attempted to manipulate match status.
   • Generates Sales Engineer confirmation checklist (3-phase, 110V continuous, burner flue, high flow).
             │
             ▼
[DATABASE ATOMIC INSERTION]
   • Generates human-readable reference number (e.g. ENQ-2026-A1B2C3).
   • Inserts parent record into enquiries table.
   • Inserts child records into enquiry_machines table (with immutable specs and reason snapshots).
             │
             ▼
[TRANSACTIONAL NOTIFICATIONS (RESEND API)]
   • Dispatches Internal Engineering Alert Email (detailed machine table, requirements, site checklist).
   • Dispatches Customer Auto-Acknowledgement Email (reference number, 1-business-day response SLA).
             │
             ▼
[ADMINISTRATIVE DOSSIER & SALES HANDOFF]
   • Sales engineers view submission at /admin/enquiries/[id].
   • Shows color-coded source badge and green/red server revalidation badge.
   • Displays machine engineering cards, customer criteria chips, and amber pre-quote checklist.
   • Updates commercial status (new -> qualifying -> quoting -> won/lost).
```

---

## 5. Existing Machine Identification & Data Relationships

### 5.1 Machine Identifiers
The system uses three primary machine identifiers:
1. **`products.id` (UUID)**: Database primary key generated by Supabase. Internal database reference only.
2. **`products.slug` (Text)**: Authoritative public identifier (e.g. `alkota-420x4`). Used in all public URLs (`/machines/hot-water/alkota-420x4`).
3. **`products.model_code` (Text)**: Factory engineering model code (e.g. `420X4`). Authoritative for engineering specifications and factory lookup.

### 5.2 Resolution Logic
The revalidation engine (`src/lib/machine-enquiries/service.ts`) uses `normaliseIdentifier()` to strip `alkota-` prefixes, trim whitespace, and lowercase strings. It matches against both `slug` and `model_code` to ensure that whether the browser submits a slug (`alkota-420x4`) or a factory model code (`420X4`), it maps to the exact canonical machine.

### 5.3 Multi-Machine Capabilities
- Single Machine Enquiry: 1 machine with `role = 'PRIMARY'`.
- Selector Enquiry: 1 to 3 shortlisted machines with `role = 'SHORTLIST'`.
- Comparison Enquiry: 1 to 3 compared machines with `role = 'COMPARISON'`.
- General Contact Enquiry: 0 machines (`enquiry_machines` has 0 rows).

---

## 6. Help Me Choose Selector Data Model Audit

The selector architecture (`src/lib/machine-selection/types.ts`) uses a deterministic hard-filtering and preference-ranking model:

### 6.1 Requirements Model (`SelectionRequirements`)
- `application` (`ApplicationId`): 9 industrial categories (`FLEET_VEHICLE_CLEANING`, `AGRICULTURAL_CLEANING`, `CONSTRUCTION_HEAVY_PLANT`, `INDUSTRIAL_DEGREASING`, `HIGH_TEMP_SANITISATION`, `WORKSHOP_PARTS_WASHING`, `MOBILE_TRAILER_CLEANING`, `WATER_TREATMENT_RECYCLING`, `NOT_SURE`).
- `waterType` (`WaterTypeRequirement`): `'cold' | 'hot' | 'steam' | 'aqueous_parts' | 'not_sure'`.
- `minPressureBar` (`number | null`): Category-aware. Null for aqueous parts washing and water treatment.
- `minFlowLpm` (`number | null`): Category-aware. Null for aqueous parts washing and water treatment.
- `powerSource` (`PowerPreference`): `'electric' | 'petrol' | 'diesel' | 'engine' | 'any'`.
- `voltage` (`VoltagePreference`): `'110v' | '230v' | '400v' | 'any'`.
- `phase` (`PhasePreference`): `1 | 3 | 'any'`.
- `mobility` (`MobilityPreference`): `'portable' | 'stationary' | 'trailer' | 'skid' | 'any'`.
- `tankRequired` (`boolean | undefined`): Whether onboard water tank buffer is mandatory.
- `minTankCapacityL` (`number | null`): Minimum tank volume in litres.
- `preferences` (`string[]`): Additive preference ranking (`prefer_higher_flow`, `prefer_higher_pressure`, `prefer_compact`). **Never filters out viable machines**.
- `unitSystem` (`UnitSystem`): `'metric' | 'imperial'`.

### 6.2 Selection Match Statuses
- `STRONG_MATCH`: Machine satisfies all hard requirements with verified engineering data.
- `POSSIBLE_MATCH`: Machine satisfies known hard requirements, but has unverified criteria (**Unknown ≠ Fail**).
- `DOES_NOT_MEET`: Machine fails one or more hard requirements (e.g. pressure below threshold).

---

## 7. Comparison Architecture Audit

- **State Persistence**: Primary state lives in React context `MachineComparisonContext` and synchronizes with URL query parameters (`/machines/compare?machines=slug1,slug2,slug3`). A `localStorage` cache acts as a secondary buffer.
- **Capacity**: Strict ceiling of **3 machines**.
- **Enquiry Handoff**: Passes `enquiry=compare`, `machines=slug1,slug2,slug3`, and `models=Model1,Model2,Model3` to `/contact`.
- **Machine Selection within Comparison**: The matrix allows individual model enquiry via contextual links or fleet enquiry via the summary card.

---

## 8. URL Parameter Inventory

| Parameter | Source Touchpoints | Destination | Description |
| :--- | :--- | :--- | :--- |
| `enquiry` | Machine Detail, Selector, Compare | `/contact` | Context discriminator (`quote`, `selector`, `compare`, `service`, `consultation`). |
| `machines` | Machine Detail, Selector, Compare | `/contact` | Comma-separated list of machine canonical slugs. |
| `models` / `model` | Machine Detail, Selector, Compare | `/contact` | Comma-separated list of factory model codes. |
| `product` / `machine` | Machine Detail | `/contact` | Legacy single-machine slug reference. |
| `reqs` | Selector | `/contact` | Pipe-delimited human-readable requirements summary. |
| `app` | Selector | `/contact` | Stated `ApplicationId`. |
| `water` | Selector | `/contact` | Stated `WaterTypeRequirement`. |
| `press` | Selector | `/contact` | Stated minimum pressure in BAR. |
| `flow` | Selector | `/contact` | Stated minimum flow in L/min. |
| `power` | Selector | `/contact` | Stated power source preference. |
| `volt` | Selector | `/contact` | Stated voltage preference (`110v`, `230v`, `400v`). |
| `phase` | Selector | `/contact` | Stated electrical phase (`1`, `3`). |
| `mob` | Selector | `/contact` | Stated mobility preference. |
| `prefs` | Selector | `/contact` | Comma-separated additive preferences. |

---

## 9. Security & Access Control Audit

### 9.1 Row Level Security (RLS)
- `enquiries`: RLS is **ENABLED**. Public `INSERT` is permitted (`WITH CHECK (true)`). Public `SELECT`, `UPDATE`, and `DELETE` are strictly denied. Service-role has full access (`FOR ALL USING (true)`).
- `enquiry_machines`: RLS is **ENABLED**. Public `INSERT` is permitted (`WITH CHECK (true)`). Public `SELECT`, `UPDATE`, and `DELETE` are denied. Service-role has full access.

### 9.2 Security Vulnerability Findings

#### MEDIUM: Missing Rate Limiting on Public Submission Endpoints
- **Finding**: Both `POST /api/contact` and `POST /api/enquiries` are publicly accessible without IP-based rate limiting or CAPTCHA verification.
- **Impact**: Potential exposure to automated form spamming or denial-of-service abuse.
- **Recommendation**: Integrate an edge rate limiter (e.g. Upstash Redis rate limiter or Cloudflare Turnstile) in a subsequent security hardening phase.

#### MEDIUM: Resend API Key Dependency for Telemetry/Errors
- **Finding**: If `RESEND_API_KEY` is not present, email dispatch is silently skipped. While database persistence succeeds, sales engineering receives no instant alert unless actively viewing the admin dashboard.
- **Impact**: Operational delay in responding to customer inquiries if email credentials lapse.
- **Recommendation**: Add a status health check in `/admin/settings` to alert administrators if email credentials are missing or failing.

#### LOW: Free-Text Subject Field
- **Finding**: Inbound `subject` strings are accepted from the client. While React and modern email clients escape HTML automatically, strict character validation should be enforced to prevent email header manipulation.

---

## 10. Existing Administrative Console Audit

- **List Route**: `/admin/enquiries` (`src/app/admin/enquiries/page.tsx`).
- **Detail Route**: `/admin/enquiries/[id]` (`src/app/admin/enquiries/[id]/page.tsx`).
- **Authentication**: Verified server-side using `verifyToken(token)` against `COOKIE_NAME` cookie. Unauthorized requests return 401.
- **Features Available**:
  - Full-text search over customer name, email, company, and reference number.
  - Commercial status filter (`new`, `read`, `responded`, `closed`).
  - Source badges (`SELECTOR`, `COMPARE`, `MACHINE`).
  - Engineering consultation dossier showing machine technical specifications, match status, and active requirements.
  - Interactive Sales Engineer Pre-Quotation Checklist (warning items for 3-phase power, 110V continuous rating, indoor burner flue extraction, and high water mains flow).
  - Admin internal notes updating via `PATCH /api/admin/enquiries/[id]`.

---

## 11. Transactional Notifications Audit

- **Provider**: Resend API (`resend` SDK).
- **Triggers**: Executed on successful database insertion in `/api/contact` and `/api/enquiries`.
- **Emails Generated**:
  1. **Internal Sales Engineering Alert**: Sent to `orders@alkota.co.uk` / `sales@alkota.co.uk`. Includes full customer contact block, site readiness grid, formatted equipment specifications table, requirements summary, and pre-quote verification items.
  2. **Customer Auto-Acknowledgement**: Sent to customer's submitted email address. Includes unique reference number, confirmed equipment list, and 1-business-day response guarantee.
- **Resilience**: Wrapped in `try/catch` blocks. An email transmission failure does not abort the database transaction.

---

## 12. Telemetry & Analytics Audit

All telemetry is client-side, fail-safe, and pushes to `window.dataLayer` without capturing Personally Identifiable Information (PII):

### Selector Events:
- `selector_step_complete`: `{ step_index, step_id, value }`
- `selector_results_view`: `{ qualified_count, shortlist_models, possible_models }`
- `selector_no_result`: `{ requirements }`
- `selector_reset`: `{}`
- `selector_enquiry_click`: `{ source: 'summary_banner' | 'card' | 'bottom_banner', models }`
- `selector_compare_add`: `{ slug, model_code }`

### Enquiry Commercial Events:
- `machine_enquiry_started`: `{ source, machine_count, models, has_requirements }`
- `machine_enquiry_submitted`: `{ reference, source, machine_count, models, company_provided: boolean, phone_provided: boolean }`

---

## 13. Architectural Duplication & Fragmentation

The audit identifies three peripheral enquiry systems operating alongside the canonical `enquiries` table:
1. **Dealer Leads (`dealer_leads`)**: Handled via `/api/dealers/enquiry`. Routes leads to territorial dealers.
2. **Part Requests (`part_requests`)**: Handled via `/api/parts/enquiry`. Dedicated to spare parts, component diagrams, and serial number lookups.
3. **Industrial Enquiry (`/api/industrial-enquiry`)**: A mock stub that logs to console.

### Audit Recommendation
Do not consolidate or delete these systems during Phase 7.0A. The canonical machine commercialisation workflow should remain focused strictly on industrial machinery (`enquiries` + `enquiry_machines`), while leaving dealer and part workflows untouched.

---

## 14. Current Architectural Gaps

1. **Absence of Rate Limiting**: No IP-based rate limiting on public form submissions.
2. **No Realtime Admin Push**: Admin dashboard relies on polling/refreshes rather than Supabase Realtime subscriptions.
3. **No CRM Export Webhook**: No automated webhook (e.g. Zapier, Make, HubSpot) to export verified dossiers to an external CRM.

---

## 15. Risk Assessment

| Risk Category | Severity | Description | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Tampering** | Medium | Client attempts to claim `STRONG_MATCH` for incompatible machine. | Mitigated: Server re-runs `selectMachines()` and flags `discrepancy_detected`. |
| **Catalogue Drift** | Low | Machine renamed or unpublished after enquiry. | Mitigated: `enquiry_machines` stores immutable historical snapshots. |
| **Spam / Abuse** | Medium | Automated script submits hundreds of fake inquiries. | Add rate limiting and Turnstile captcha in Phase 7.2. |
| **Data Loss** | Low | Email fails to deliver. | Mitigated: All records persist in Supabase before email dispatch. |

---

## 16. Minimal Data Model — Audit Conclusion

Based strictly on the evidence in the codebase, the optimal architecture for Alkota UK is:
1. **Canonical Enquiry Entity**: The existing `enquiries` table, extended with normalized requirement columns and revalidation audit fields.
2. **Machine Relationship Entity**: The `enquiry_machines` table, linking each enquiry to 0 or more machines with immutable historical snapshots (`model_code`, `name`, `slug`, `category`, `specs`).
3. **Requirements Model**: Option C Minimal Hybrid:
   - Dedicated indexed columns for high-frequency filtering (`req_application`, `req_water_type`, `req_min_pressure_bar`, `req_min_flow_lpm`, `req_power_source`, `req_voltage`, `req_phase`, `req_mobility`).
   - Documented JSONB `requirements` object for flexible attributes (`preferences`, `tankRequired`, `unitSystem`).
4. **Scope Exclusions**: Do NOT build a customer CRM, sales pipeline forecasting, invoice generation, or lead bidding system.

---

## 17. Recommended Implementation Sequence for Remaining Phase 7 Work

```text
Phase 7.0 (Completed)  ──> Canonical Data Model & SQL Migration (028)
Phase 7.0A (Completed) ──> Forensic Architecture Audit & Invariant Documentation
Phase 7.1 (Next)       ──> Front-End Journey Refinement & Conversion UX Verification
Phase 7.2 (Future)     ──> Rate Limiting, Spam Shield & Webhook Integrations
Phase 7.3 (Future)     ──> Dealer Lead Routing Integration into Canonical Model
```

---

## 18. Explicitly Excluded Scope

- No customer table or CRM abstraction.
- No automated sales lead scoring or pipeline forecasting.
- No invoice or quotation generation engine.
- No modification of the deterministic selection engine rules.
- No consolidation of parts or dealer lead databases in this phase.
