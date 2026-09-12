# Alkota UK — Machine Enquiry Submission & Validation Architecture

**Phase**: 7.1 — Canonical Enquiry Submission & Validation  
**Date**: September 2026  
**Status**: Authoritative Reference  

---

## 1. Executive Summary & The Server-Authoritative Principle

Alkota UK operates an authoritative commercial enquiry infrastructure connecting customer interest across diverse entry points (machine catalog, Help Me Choose deterministic selector, Fleet Comparison matrix, and direct technical consultation) to Supabase.

### Core Principle
> **"The customer can tell us what they want. The customer can identify the machine they are interested in. The customer can provide their requirements. But the server decides what the machine actually is, whether it exists, whether it is eligible, what its authoritative data is, and what historical snapshot is stored."**

The browser is treated as completely untrusted:
1. **Client cannot claim machine identity**: Slugs, model codes, and product names are independently resolved against the authoritative 127-machine catalogue in Supabase.
2. **Client cannot bypass machine status**: Machines that are in `draft`, `archived`, or `active: false` status are rejected at the submission boundary with `MACHINE_UNAVAILABLE`.
3. **Client cannot spoof match status**: Any client-asserted `STRONG_MATCH` or selection status is ignored. The server re-runs `selectMachines()` using the canonical selection engine. Discrepancies between client claims and server reality are recorded in an immutable audit trail (`discrepancy_detected: true`).
4. **Client cannot alter historical snapshots**: Technical specifications (pressure in BAR, flow rate in L/min, electrical voltage, phase, heating fuel, power source) are snapshotted into `enquiry_machines` directly from the database record, guaranteeing historical accuracy even if catalogue specifications change later.
5. **No mass assignment**: Every column written to `enquiries` and `enquiry_machines` is explicitly enumerated and sanitised. Client payloads are never spread into database operations.

---

## 2. Submission Boundary & Request Lifecycle

```
[ Inbound HTTP POST /api/enquiries ]
               │
               ▼
   [ Rate Limiter (10 req/min) ] ─────────► [ 429 RATE_LIMITED ]
               │
               ▼
   [ Content-Length & Size Guard (32KB) ] ─► [ 400 VALIDATION_ERROR ]
               │
               ▼
   [ Structural Schema Validation ] ───────► [ 400 VALIDATION_ERROR ]
     • Customer name, email (RFC-5322)
     • Controlled EnquirySource enum
     • Max 10 machine identifiers
     • Comparison requires >= 2 machines
               │
               ▼
   [ Server Machine Resolution ] ──────────► [ 400 MACHINE_NOT_FOUND ]
     • Normalises identifiers (strips "alkota-", punctuation)
     • Resolves against 127-machine catalogue
               │
               ▼
   [ Machine Eligibility Gate ] ───────────► [ 400 MACHINE_UNAVAILABLE ]
     • Requires status === 'published' && active === true
               │
               ▼
   [ Server-Side Revalidation ] ───────────► [ 500 SELECTOR_ERROR ]
     • Re-runs selectMachines() independently
     • Compares claimedMatchStatus vs server evaluation
     • Generates site readiness checklist & unknowns
               │
               ▼
   [ Reference Generation & Data Assembly ]
     • generateReference('quote' | 'contact')
     • Server timestamp for revalidated_at
     • Server-assigned status: 'new'
     • Explicit field allowlist mapping
               │
               ▼
   [ Database Transaction (Compensating Delete) ]
     • Insert parent row in `enquiries`
     • Insert child rows in `enquiry_machines`
     • IF child insert fails:
         DELETE parent enquiry (rollback) ──► [ 500 SERVER_ERROR ]
               │
               ▼
   [ HTTP 200 Success Response ]
```

---

## 3. Structured Error Contract

Every non-200 response from `/api/enquiries` adheres strictly to this contract:

```typescript
export interface EnquiryErrorResponse {
  success: false;
  code: EnquiryErrorCode;
  message: string;
  details?: string[];
}
```

### Error Code Reference

| Code | HTTP Status | Description | Trigger Conditions |
| :--- | :--- | :--- | :--- |
| `VALIDATION_ERROR` | `400` | Malformed or invalid submission payload. | Missing customer name/email, invalid email syntax, unrecognised source, exceeding 10 machines, body size > 32KB. |
| `MACHINE_NOT_FOUND` | `400` | Submitted machine identifier does not exist. | Identifier does not resolve to any machine in the authoritative catalogue. |
| `MACHINE_UNAVAILABLE` | `400` | Machine resolved but is not eligible for commercial enquiry. | Machine has `status !== 'published'` or `active !== true`. |
| `INVALID_REQUIREMENTS` | `400` | Stated requirements object failed structural validation. | Unparseable requirements structure or contradictory payload values. |
| `COMPARISON_ERROR` | `400` | Comparison context rules violated. | Submission with `MACHINE_COMPARISON` source specifies fewer than 2 machines. |
| `RATE_LIMITED` | `429` | Client exceeded submission frequency. | More than 10 submissions in a 60-second window from a single IP. |
| `SELECTOR_ERROR` | `500` | Exception during server-side deterministic evaluation. | Engine crash during `selectMachines()` execution. |
| `SERVER_ERROR` | `500` | Internal database or infrastructure failure. | Supabase insert failure, database connection drop, or failed child transaction. **No raw database errors or stack traces are ever exposed to the client.** |

---

## 4. Security & Hardening Controls

### 4.1 Mass Assignment Protection
Inbound JSON objects are strictly destructure-validated. The database insertion payload maps only known columns:

```typescript
const dbPayload = {
  reference: enquiryRecord.reference,
  source: enquiryRecord.source,
  enquiry_context: enquiryRecord.enquiry_context,
  type: body.source === 'MACHINE_SELECTOR' ? 'quote' : 'contact',
  status: 'new' as const, // ALWAYS server-assigned
  name: enquiryRecord.name,
  email: enquiryRecord.email,
  phone: enquiryRecord.phone ?? null,
  company: enquiryRecord.company ?? null,
  postcode: enquiryRecord.postcode ?? null,
  preferred_contact_method: enquiryRecord.preferred_contact_method ?? 'either',
  subject: enquiryRecord.subject ?? null,
  message: enquiryRecord.message ?? null,
  site_power: enquiryRecord.site_power ?? null,
  site_water: enquiryRecord.site_water ?? null,
  timeline: enquiryRecord.timeline ?? null,
  budget_range: enquiryRecord.budget_range ?? null,
  req_application: enquiryRecord.req_application ?? null,
  req_water_type: enquiryRecord.req_water_type ?? null,
  req_min_pressure_bar: enquiryRecord.req_min_pressure_bar ?? null,
  req_min_flow_lpm: enquiryRecord.req_min_flow_lpm ?? null,
  req_power_source: enquiryRecord.req_power_source ?? null,
  req_voltage: enquiryRecord.req_voltage ?? null,
  req_phase: enquiryRecord.req_phase ?? null,
  req_mobility: enquiryRecord.req_mobility ?? null,
  requirements: enquiryRecord.requirements ?? {},
  selector_version: enquiryRecord.selector_version ?? null,
  selection_outcome: enquiryRecord.selection_outcome ?? null,
  revalidation_status: enquiryRecord.revalidation_status ?? 'VALID',
  discrepancy_detected: enquiryRecord.discrepancy_detected ?? false,
  discrepancy_details: enquiryRecord.discrepancy_details ?? [],
  requires_human_confirmation: enquiryRecord.requires_human_confirmation ?? false,
  unknown_criteria: enquiryRecord.unknown_criteria ?? [],
  confirmation_items: enquiryRecord.confirmation_items ?? [],
  revalidated_at: enquiryRecord.revalidated_at ?? null,
  dealer_id: enquiryRecord.dealer_id ?? null,
  source_page: enquiryRecord.source_page ?? null,
  utm_source: enquiryRecord.utm_source ?? null,
  utm_medium: enquiryRecord.utm_medium ?? null,
  utm_campaign: enquiryRecord.utm_campaign ?? null,
  metadata: { ... },
};
```

Any extraneous fields provided in the HTTP request body (such as `admin_notes`, `assigned_to`, `is_elite_series`, `lead_score`, or raw IDs) are disregarded and never touch the persistence layer.

### 4.2 Free-Text Sanitisation
- **Subject**: Stripped of ASCII control characters (`[\x00-\x1F\x7F]`), trimmed, and capped at 200 characters.
- **Message**: Null bytes removed, trimmed, capped at 5,000 characters.
- **Customer Name**: Control characters stripped, trimmed, capped at 120 characters.
- **Customer Email**: Normalised to lowercase, trimmed, validated against format constraints, capped at 254 characters (RFC 5321).

### 4.3 Anti-Spoofing & Revalidation Audit
When a customer completes the Help Me Choose questionnaire and submits:
1. `claimedMatchStatus` is optionally received from the client for audit purposes only.
2. The server independently runs `revalidateMachineEnquiry()`, evaluating each machine against the canonical rules.
3. If the server evaluates a machine as `DOES_NOT_MEET` while the client claimed `STRONG_MATCH`, the server:
   - Sets `discrepancy_detected: true`.
   - Records the exact audit note in `discrepancy_details[]`.
   - Sets `revalidation_status: 'DISCREPANCY_DETECTED'`.
   - Flags `requires_human_confirmation: true`.
   - Sets `enquiry_machines.selection_status = 'DOES_NOT_MEET'`.

The client's claim has zero effect on the actual status recorded in the database.

---

## 5. Transactional Integrity

Commercial enquiries involve writing both the parent `enquiries` record and 0 to 10 child `enquiry_machines` records.

### Compensating-Delete Strategy
To guarantee no orphaned parent enquiry exists without its corresponding machine snapshots:
1. The parent `enquiries` record is inserted with `status: 'new'`.
2. If machine records exist, they are inserted into `enquiry_machines`.
3. If the child insert fails:
   - A compensating `DELETE FROM enquiries WHERE id = enquiryId` is executed immediately.
   - A structured `SERVER_ERROR` is returned to the client.
   - If the compensating delete fails, a `CRITICAL` error is logged to operational telemetry for manual intervention.

---

## 6. Verification & Test Suite

The test suite in `scripts/test-enquiry-submission.ts` validates 129 assertions covering 13 distinct security and functional groups:

1. **Payload Validation**: Missing required fields, invalid types, array bounds, comparison bounds.
2. **Email Validation**: Structural syntax, length bounds, control character rejections.
3. **Subject & Message Sanitisation**: Control characters, length truncation, null byte rejection.
4. **Machine Eligibility Gate**: `draft`, `archived`, and inactive rejections; published acceptance.
5. **Rate Limiter**: Windowing, request caps, IP partition isolation.
6. **Field Allowlist**: Extra parameters ignored, server-derived fields cannot be spoofed.
7. **Machine Resolution Security**: Slug matching, model code matching, deduplication, SQL injection / XSS payload neutralisation.
8. **Selector Anti-Spoofing**: Independent evaluation, discrepancy detection, server timestamps, Unknown ≠ Fail invariant.
9. **Comparison Context**: Cardinality validation, role assignment (`COMPARISON`), display order indexing.
10. **Canonical Data Construction**: Authoritative snapshot decoupling, UUID verification, email lowercasing.
11. **Transactional Integrity Simulation**: Self-contained schemas, allowable column enumeration.
12. **Error Contract Shape**: Response schema compliance, sensitive information redacting.
13. **Structured Requirements**: Hybrid column normalisation, default handling.
