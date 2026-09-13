# Alkota UK — Admin Commercial Sales Handoff & Notification Architecture

**Phase**: 7.3 — Admin Operations, Sales Handoff & Internal Notifications  
**Date**: September 2026  
**Status**: Production Specification  

---

## 1. Executive Summary & Operational Boundary

Phase 7.3 bridges customer enquiry creation with internal commercial operations:

```
CUSTOMER SUBMITS ENQUIRY
         │
         ▼
POST /api/enquiries (Authoritative Validation)
         │
         ├───► Database Transaction (enquiries + enquiry_machines)
         │
         ├───► Non-Blocking Notification (Resend Email to Commercial Desk)
         │
         ▼
ADMIN VISIBILITY (/admin/enquiries)
         │
         ▼
ENQUIRY REVIEW & QUALIFICATION (/admin/enquiries/[id])
         │
         ▼
OPERATIONAL CONTACT / PROPOSAL ISSUANCE (Status Workflow)
```

### Core Principle
> **This is an operational commercial workflow, NOT a CRM.**  
> It intentionally avoids lead scoring, automated round-robin distribution, AI SDR bots, opportunity pipelines, or complex customer account hierarchies. The purpose is simple: when an enquiry arrives, the Alkota UK sales engineering team immediately sees **who the customer is, what machines they are considering, what the deterministic engine found, what remains to be confirmed on site, and what needs to happen next.**

---

## 2. Admin Security, Authentication & Permissions

### 2.1 Role Boundaries
| Actor | Creation | Viewing | Modification | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Public / Anonymous** | ✅ Allowed (`INSERT`) | ❌ Denied (`SELECT`) | ❌ Denied (`UPDATE`/`DELETE`) | Can only submit via `POST /api/enquiries`. Cannot query other enquiries. |
| **Authenticated Admin** | ✅ Allowed | ✅ Allowed (`GET`) | ✅ Permitted actions (`PATCH`) | Protected by HTTP-only JWT session cookie (`verifyToken()`). |
| **Service Role** | ✅ Full Access | ✅ Full Access | ✅ Full Access | Server-side API route execution context only. Never leaked to browser. |

### 2.2 Row Level Security (RLS) Policies
Defined in migration `028_canonical_enquiry_model.sql`:
```sql
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_machines ENABLE ROW LEVEL SECURITY;

-- Anonymous public submission
CREATE POLICY "Public can create enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create enquiry_machines" ON enquiry_machines FOR INSERT WITH CHECK (true);

-- Service role administrative execution
CREATE POLICY "Service role can modify enquiries" ON enquiries FOR ALL USING (true);
CREATE POLICY "Service role can modify enquiry_machines" ON enquiry_machines FOR ALL USING (true);
```

---

## 3. Commercial Status Lifecycle

Enquiry status represents **operational progress** (what is happening with the customer relationship), NOT technical suitability:

```
[ NEW ]
   │
   ▼
[ ACKNOWLEDGED ] ────► Customer enquiry received; initial review underway
   │
   ▼
[ CONTACTED ] ───────► Application engineer has spoken with / emailed customer
   │
   ▼
[ QUALIFYING ] ──────► Electrical supply, water inflow, and site duty being verified
   │
   ▼
[ QUOTING ] ─────────► Formal commercial proposal / quotation issued
   │
   ├────────────────────────┐
   ▼                        ▼
[ WON ]                  [ LOST ]
(Order placed)           (Declined / competitor / project postponed)
   │
   ▼
[ CLOSED ]
(Archived operational record)
```

### 3.1 Strict Enum Enforcement
Arbitrary status strings are rejected at the API boundary (`PATCH /api/admin/enquiries/[id]`). Only canonical statuses (and legacy values for historical compatibility) are accepted:
```typescript
const VALID_STATUSES = new Set([
  'new', 'acknowledged', 'contacted', 'qualifying', 'quoting', 'won', 'lost', 'closed',
  'read', 'responded', 'in-progress', 'archived'
]);
```
Every status update sets `updated_at = new Date().toISOString()`.

---

## 4. Internal Email Notifications

### 4.1 Dispatch Architecture
- **Trigger**: Called automatically upon successful insertion of `enquiries` and `enquiry_machines` child rows in `POST /api/enquiries`.
- **Non-Blocking Resilience**: Notification dispatch is decoupled from the customer's HTTP response. If the email provider fails, the enquiry database record remains authoritative. The customer always receives their reference number.
- **Provider**: Resend API via `https://api.resend.com/emails`.
- **Recipient**: Configurable via `ADMIN_NOTIFICATION_EMAIL` (defaults to `sales@alkota.co.uk`).
- **Sender**: `Alkota Commercial Desk <enquiries@alkota.co.uk>`.
- **Reply-To**: Set directly to the customer's email address (`enquiry.email`) for single-click reply from any email client.

### 4.2 Content Structure
Emails are structured in a clean, industrial typographic format:
1. **Header**: Reference code, source tag (e.g. `MACHINE_SELECTOR`, `MACHINE_COMPARISON`, `MACHINE_DETAIL`).
2. **Customer Dossier**: Name, company, email, phone, site postcode, site power, timeline.
3. **Equipment Breakdown Table**: Model code, category, verified pressure, rated flow, server match status.
4. **Stated Operational Requirements**: Stated application, thermal duty, minimum pressure, minimum flow, power drive, voltage/phase.
5. **Sales Engineer Checklist**: "Worth Confirming" items flagged by the deterministic engine.
6. **Customer Application Notes**: The customer's message rendered safely.
7. **Direct Admin Link**: One-click action button opening `/admin/enquiries/[id]`.

---

## 5. Admin Interface Enhancements

### 5.1 Navigation Integration
Added to the primary sidebar in `src/app/admin/layout.tsx` under **"Orders & Commerce"**:
- **Commercial Enquiries** (`/admin/enquiries`) with direct access to inbound submissions.

### 5.2 Admin List View (`/admin/enquiries`)
- **Normalized Fleet Context**: Displays machine models joined directly from the `enquiry_machines` table (with fallback to legacy metadata).
- **Source & Outcome Column**: Colour-coded badges for `SELECTOR`, `COMPARE`, `MACHINE`, plus deterministic outcome labels (`STRONG MATCH`, `POSSIBLE MATCH`).
- **Lifecycle Filters**: One-click filtering across canonical statuses (`new`, `acknowledged`, `contacted`, `qualifying`, `quoting`, `won`, `lost`, `closed`).
- **Source Filter**: Filter by `MACHINE_DETAIL`, `MACHINE_SELECTOR`, `MACHINE_COMPARISON`, `GENERAL`, `PARTS`, `CHEMICALS`.
- **Triage Search**: Rapid real-time search matching customer name, company, email, or reference code.

### 5.3 Admin Detail View (`/admin/enquiries/[id]`)
- **Authoritative Equipment Snapshot**: Renders machines from `enquiry_machines`, showing model code, role, server match status, verified capabilities, and deep link to the public specification sheet.
- **Revalidation & Anti-Spoofing Audit**: Displays server revalidation status. If a client attempted to spoof a match or alter requirements, a red alert displays the exact discrepancies detected.
- **Stated Requirements Matrix**: Read-only breakdown of the customer's operational parameters (application, temperature, pressure, flow, voltage, phase).
- **Pre-Quotation Checklist**: Highlights specific site readiness factors (e.g. electrical supply capacity, water break tank necessity) requiring engineer signoff before quotation.
- **Operational Controls**: Single-click status update, assigned staff member, follow-up date picker, and internal admin notes.

---

## 6. Customer Data Protection & Commercial Privacy

1. **No PII in Telemetry**: Analytics events track only anonymised metadata (`source`, `machine_count`, `has_requirements`, `reference`). Zero customer names, emails, phones, or postcodes are passed to Google Analytics / GTM.
2. **No Public Inspection**: Enquiries cannot be enumerated or retrieved by anonymous users. All access requires an active admin session.
3. **No URL Parameter Leakage**: Customer information is never passed through query strings.
4. **Input Sanitisation**: Customer message strings are sanitised to prevent script injection and cross-site scripting (XSS).
