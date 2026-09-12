# Alkota UK — Canonical Machine Enquiry Data Model

**Phase**: 7.0 — Define the Minimal Enquiry Data Model  
**Authoritative Migration**: `supabase/migrations/028_canonical_enquiry_model.sql`  
**Test Suite**: `scripts/test-enquiry-model.ts` (77 tests passed / 0 failed)  
**Total Project Tests**: 240 / 240 passed  

---

## 1. Executive Summary

This specification defines the authoritative, minimal, and future-proof enquiry data model for Alkota UK.

The purpose of this architecture is to answer one question with complete commercial and engineering traceability:

> **Who contacted Alkota, what are they interested in, where did the enquiry come from, which machine(s) were involved, what requirements did they state, what did the deterministic selector conclude, and what still needs confirmation?**

### Architectural Core Principles

1. **Not a CRM**: We do not construct redundant customer profiles, contact deduplication pipelines, sales opportunity stages, or ticket queues. The enquiry record is the commercial memory of an interaction.
2. **Normalized Machine Relationship**: Rather than dumping complex arrays of machine specs into an unstructured JSON blob, enquiries link to one or more machines via the `enquiry_machines` table.
3. **Decoupled from Catalogue Mutations**: Machines may be recatalogued, renamed, re-priced, or unpublished over time. `enquiry_machines` captures an immutable historical snapshot (name, model code, category, and core pressure/flow specs) at the moment of enquiry.
4. **Minimal Hybrid Requirements**: High-frequency search and reporting requirements (application, water type, minimum pressure, flow, power source, voltage, phase, mobility) are stored in dedicated indexed columns. Flexible, evolving attributes (preferences, tank specs, unit system) are stored in a documented, typed `requirements` JSONB object.
5. **Separation of Concerns**:
   - **Commercial Status** (`new`, `acknowledged`, `contacted`, `qualifying`, `quoting`, `won`, `lost`, `closed`) tracks the sales team's process.
   - **Selection Outcome** (`STRONG_MATCH`, `POSSIBLE_MATCH`, `NO_VERIFIED_MATCH`, `NOT_APPLICABLE`) tracks the engineering engine's evaluation.
   - **Revalidation Status** (`VALID`, `DISCREPANCY_DETECTED`, `SKIPPED`) flags client tampering or specification mismatches.

---

## 2. Entity Relationship Diagram (ERD)

```text
┌─────────────────────────┐             ┌──────────────────────────────┐
│        DEALERS          │             │           PRODUCTS           │
│  (Existing Authorised)  │             │   (127 Canonical Machines)   │
├─────────────────────────┤             ├──────────────────────────────┤
│ id (PK, uuid)           │             │ id (PK, uuid)                │
│ slug (UK, text)         │             │ slug (UK, text)              │
│ name (text)             │             │ model_code (text)            │
│ tier (text)             │             │ category (text)              │
│ status (text)           │             │ pressure_bar (int)           │
└───────────┬─────────────┘             │ flow_rate_lpm (numeric)      │
            │ 0..1                      └──────────────┬───────────────┘
            │ attributes                               │ 0..1 resolves
            │                                          │
┌───────────▼──────────────────────────────────────────┴───────────────┐
│                              ENQUIRIES                               │
│                         (Canonical Record)                           │
├──────────────────────────────────────────────────────────────────────┤
│ id                            uuid PRIMARY KEY DEFAULT gen_random_uuid()
│ reference                     text UNIQUE (e.g. 'ENQ-2026-XXXX')      │
│ source                        text CHECK (EnquirySource)              │
│ enquiry_context               text CHECK (EnquiryContext)             │
│ status                        text CHECK (EnquiryStatus)              │
│ name                          text NOT NULL                           │
│ email                         text NOT NULL                           │
│ phone                         text                                    │
│ company                       text                                    │
│ postcode                      text                                    │
│ preferred_contact_method      text DEFAULT 'either'                   │
│ subject                       text                                    │
│ message                       text                                    │
│ site_power                    text                                    │
│ site_water                    text                                    │
│ timeline                      text                                    │
│ budget_range                  text                                    │
│ req_application               text                                    │
│ req_water_type                text                                    │
│ req_min_pressure_bar          integer                                 │
│ req_min_flow_lpm              numeric                                 │
│ req_power_source              text                                    │
│ req_voltage                   text                                    │
│ req_phase                     text                                    │
│ req_mobility                  text                                    │
│ requirements                  jsonb DEFAULT '{}'::jsonb               │
│ selector_version              text                                    │
│ selection_outcome             text CHECK (SelectionOutcome)           │
│ revalidation_status           text CHECK (RevalidationStatus)         │
│ discrepancy_detected          boolean DEFAULT false                   │
│ discrepancy_details           text[] DEFAULT '{}'                     │
│ requires_human_confirmation   boolean DEFAULT false                   │
│ unknown_criteria              text[] DEFAULT '{}'                     │
│ confirmation_items            text[] DEFAULT '{}'                     │
│ revalidated_at                timestamptz                             │
│ dealer_id                     uuid REFERENCES dealers(id)             │
│ source_page                   text                                    │
│ utm_source                    text                                    │
│ utm_medium                    text                                    │
│ utm_campaign                  text                                    │
│ metadata                      jsonb DEFAULT '{}'::jsonb               │
│ created_at                    timestamptz NOT NULL DEFAULT now()      │
│ updated_at                    timestamptz NOT NULL DEFAULT now()      │
└───────────────────────────────────┬──────────────────────────────────┘
                                    │ 1
                                    │ has many
                                    │ 0..*
┌───────────────────────────────────▼──────────────────────────────────┐
│                          ENQUIRY_MACHINES                            │
│                 (Normalised Machine Relationship)                    │
├──────────────────────────────────────────────────────────────────────┤
│ id                            uuid PRIMARY KEY DEFAULT gen_random_uuid()
│ enquiry_id                    uuid NOT NULL REFERENCES enquiries(id)  │
│ machine_id                    text NOT NULL (slug / model)            │
│ product_id                    uuid REFERENCES products(id)            │
│ model_code_snapshot           text NOT NULL                           │
│ machine_name_snapshot         text NOT NULL                           │
│ slug_snapshot                 text NOT NULL                           │
│ category_snapshot             text NOT NULL                           │
│ role                          text CHECK (MachineRole)                │
│ display_order                 integer NOT NULL DEFAULT 0              │
│ selection_status              text CHECK (MatchStatus)                │
│ match_reasons                 text[] DEFAULT '{}'                     │
│ unknown_criteria              text[] DEFAULT '{}'                     │
│ failure_reasons               text[] DEFAULT '{}'                     │
│ specs_snapshot                jsonb DEFAULT '{}'::jsonb               │
│ created_at                    timestamptz NOT NULL DEFAULT now()      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. Controlled Enums & Constraints

### 3.1 `source` (Enquiry Source)
Identifies the technical touchpoint where the user initiated the interaction:
- `MACHINE_DETAIL`: Single machine detail page quote or technical query.
- `MACHINE_SELECTOR`: Help Me Choose deterministic questionnaire.
- `MACHINE_COMPARISON`: Fleet comparison matrix (up to 3 machines).
- `MACHINE_CATALOGUE`: General fleet listing or category browse view.
- `PARTS`: Parts & accessories enquiry or lookup.
- `ATTACHMENTS`: Pressure washer nozzles, surface cleaners, hose reels.
- `CHEMICALS`: Detergents and industrial wash chemicals.
- `DEALER`: Inbound lead attributed to an authorised UK dealer.
- `GENERAL`: Uncategorised contact form submission.

### 3.2 `enquiry_context` (Customer Intent)
Describes what commercial operation the customer is attempting:
- `DIRECT_MACHINE`: Quotation or technical inquiry on a specific known machine.
- `MACHINE_SELECTION`: Requirement-driven recommendation handoff.
- `MACHINE_COMPARISON`: Evaluating multiple shortlisted candidates.
- `GENERAL_PRODUCT`: Product discovery without specific machine specs.
- `GENERAL_ENQUIRY`: Service, installation, warranty, or general inquiry.

### 3.3 `status` (Commercial Lifecycle Status)
Decoupled from machine eligibility. Represents sales pipeline progression:
- `new`: Inbound submission unreviewed by sales engineering.
- `acknowledged`: Automated receipt and reference dispatched to client.
- `contacted`: Initial phone / email contact established with customer.
- `qualifying`: Technical discovery in progress (verifying site power, water, drainage).
- `quoting`: Formal engineering proposal or quotation issued.
- `won`: Equipment order placed.
- `lost`: Closed without sale (competitor chosen, project deferred).
- `closed`: Handled and archived.

### 3.4 `selection_outcome` (Deterministic Engine Outcome)
Authoritative evaluation calculated server-side across all shortlisted machines:
- `STRONG_MATCH`: At least one machine satisfies all hard constraints.
- `POSSIBLE_MATCH`: No strong match; machines have unverified specifications requiring human check (**Unknown ≠ Fail**).
- `NO_VERIFIED_MATCH`: Evaluated machines failed hard criteria (e.g. pressure/flow insufficient).
- `NOT_APPLICABLE`: Non-selector enquiry (direct quotation, general contact).

### 3.5 `role` (`enquiry_machines.role`)
- `PRIMARY`: The sole subject of a direct machine enquiry.
- `SHORTLIST`: Surfaced in the top recommendation shortlist by the selector.
- `COMPARISON`: Added to the multi-machine comparison tray.
- `SELECTED`: Explicitly chosen by the customer from a comparison or shortlist.

---

## 4. Requirements Storage: Minimal Hybrid (Option C)

### 4.1 Dedicated Structured Columns
For reporting, SQL index filters, and fast admin search:
- `req_application`: `ApplicationId` (`FLEET_VEHICLE_CLEANING`, `CONSTRUCTION_HEAVY_PLANT`, etc.)
- `req_water_type`: `WaterTypeRequirement` (`cold`, `hot`, `steam`, `aqueous_parts`, `not_sure`)
- `req_min_pressure_bar`: Integer (e.g. `140`) — **NULL if not applicable (e.g. parts washing)**.
- `req_min_flow_lpm`: Numeric (e.g. `15.0`) — **NULL if not applicable**.
- `req_power_source`: `PowerPreference` (`electric`, `petrol`, `diesel`, `engine`, `any`)
- `req_voltage`: `VoltagePreference` (`110v`, `230v`, `400v`, `any`)
- `req_phase`: Text (`'1'`, `'3'`, `'any'`)
- `req_mobility`: `MobilityPreference` (`portable`, `stationary`, `trailer`, `skid`, `any`)

### 4.2 Documented Requirements JSONB Object
```json
{
  "application": "FLEET_VEHICLE_CLEANING",
  "waterType": "hot",
  "minPressureBar": 130,
  "minFlowLpm": 12,
  "powerSource": "electric",
  "voltage": "230v",
  "phase": 1,
  "mobility": "portable",
  "tankRequired": false,
  "minTankCapacityL": null,
  "preferences": ["prefer_higher_flow"],
  "unitSystem": "metric",
  "summary": ["Fleet & Haulage Cleaning", "Hot Water Heating", "Min 130 BAR", "Mains Electric"]
}
```

Missing requirements are stored strictly as `null` or omitted — **never fake zeroes, 'N/A', or 'unknown'**.

---

## 5. Historical Decoupling & Machine Snapshots

The `enquiry_machines` table guarantees that historical customer inquiries remain 100% understandable, even if:
- Machine names are modified for marketing campaigns.
- Slugs are updated.
- Pressure, flow, or motor ratings are corrected in the catalogue.
- Machines are superseded or archived.

### Snapshot Structure
```json
{
  "model_code_snapshot": "420X4",
  "machine_name_snapshot": "Alkota 420X4",
  "slug_snapshot": "alkota-420x4",
  "category_snapshot": "hot-water",
  "specs_snapshot": {
    "pressure_bar": 138,
    "flow_rate_lpm": 13.2,
    "power_source": "Electric Motor",
    "heating_fuel": "Kerosene, #1, #2 Diesel",
    "voltage": "230 v",
    "phase": 1
  }
}
```

---

## 6. Security & Row-Level Security (RLS)

- **Public Access**:
  - `enquiries`: `INSERT` allowed (`WITH CHECK (true)`).
  - `enquiry_machines`: `INSERT` allowed (`WITH CHECK (true)`).
  - `SELECT`, `UPDATE`, `DELETE`: Denied to anonymous/public users. Customers cannot read or edit each other's submissions.
- **Service Role / Admin**:
  - Full `ALL` access to manage, query, assign, and update commercial enquiries.

---

## 7. Migration Strategy (`028_canonical_enquiry_model.sql`)

The migration is completely non-destructive:
1. Uses `ADD COLUMN IF NOT EXISTS` for all new columns on `enquiries`.
2. Replaces the legacy `enquiries_status_check` constraint with a superset constraint that permits both legacy values (`read`, `responded`) and canonical lifecycle values (`acknowledged`, `qualifying`, etc.).
3. Creates `enquiry_machines` table with foreign keys to `enquiries(id) ON DELETE CASCADE` and `products(id) ON DELETE SET NULL`.
4. Creates composite and selective indexes for high-speed admin listing.

---

## 8. API Contract: `POST /api/enquiries`

### Request Payload
```typescript
interface SubmitEnquiryPayload {
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    postcode?: string;
    preferredContactMethod?: 'email' | 'phone' | 'either';
  };
  source: EnquirySource;
  context?: EnquiryContext;
  subject?: string;
  message?: string;
  machines?: Array<{
    identifier: string; // model code or slug
    role?: MachineRole;
    displayOrder?: number;
  }>;
  requirements?: Partial<SelectionRequirements>;
  siteReadiness?: {
    sitePower?: string;
    siteWater?: string;
    timeline?: string;
    budgetRange?: string;
  };
  attribution?: {
    sourcePage?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    dealerId?: string;
  };
}
```

### Response
```json
{
  "success": true,
  "reference": "ENQ-2026-A1B2C3",
  "enquiry_id": "8f3914bc-...",
  "message": "Enquiry received and verified by Alkota UK engineering."
}
```

Client claims of `selection_status = STRONG_MATCH` are ignored. The server re-runs `selectMachines()` and authoritative selection outcomes are recorded independently.
