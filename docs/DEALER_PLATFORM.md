# ALKOTA UK — DEALER PLATFORM & LEAD ROUTING ENGINE

## Overview
Phase 04 established the nationwide **Authorised Dealer Network**, **Universal Lead Routing Engine**, and **Ownership Experience** on Alkota.co.uk. This connects prospective machine buyers and fleet operators directly with factory-trained local sales and service partners.

---

## 1. Relational Database Schema (`supabase/migrations/012_dealers_and_lead_routing_schema.sql`)

### Tables
1. **`dealers`**: Regional Authorised Dealerships & Technical Centers with coordinates (`latitude`, `longitude`), contact information, operating hours, mobile van count, and rating.
2. **`dealer_services`**: Granular service capabilities (`machine-sales`, `on-site-demo`, `service-maintenance`, `emergency-breakdown`, `parts-accessories`, `trailer-systems`, `water-recovery`, `chemicals`).
3. **`dealer_territories`**: Postcode outward prefixes mapped to dealers (`S`, `DE`, `NG`, `M`, `WA`, `LS`, `G`, `EH`, `CF`, `BS`, `NR`, `ME`, `TN`, etc.) with county and region metadata.
4. **`dealer_product_categories`**: Supported product categories per dealer.
5. **`dealer_leads`**: Commercial lead entries with routing audit logs (`routed_via`: `territory_match`, `proximity_match`, `direct_dealer`, `fallback_hq`), customer contact info, equipment requirements, and CRM status.
6. **`dealer_applications`**: Inbound distributor and engineering partner applications.
7. **`dealer_users`**: Dealer portal credentials and roles.

---

## 2. Geocoding & Distance Engine (`src/lib/dealers/geo.ts`)
- Contains centroid coordinate mappings for all ~124 UK Postcode Areas (from `AB` to `ZE`).
- Calculates Great-Circle distance via Haversine formula with zero runtime external API latency or rate limits.
- Supports automatic territory extraction via `extractPostcodeArea()`.

---

## 3. Lead Routing Logic (`src/lib/dealers/routing.ts`)
When a customer submits a quote, on-site demo, or service inquiry:
1. **Direct Choice**: If customer browsed a specific dealer profile, routes directly to that dealer.
2. **Territory Matching**: Matches customer postcode prefix against `dealer_territories`.
3. **Proximity Fallback**: Finds closest active dealer within 150 miles using Haversine calculation.
4. **HQ Fallback**: Directs to Alkota UK National Technical Hub if outside regional boundaries or bespoke/specialist.
5. **Persistence & Notification**: Logs lead into `dealer_leads` and triggers email alert via Resend API.

---

## 4. Public Endpoints
- **`/dealers`**: Find a Dealer Hub with postcode search, service filters, interactive card list, and dark industrial interactive SVG map.
- **`/dealers/[slug]`**: Authorised Dealer Profile with `LocalBusiness` JSON-LD schema, territory outcodes, service tags, and demo booking.
- **`/dealers/demo-request`**: Dedicated On-Site Demonstration Booking Engine.
- **`/dealers/become-a-dealer`**: Commercial partnership proposition and qualification application form.
- **`/support/service`**: Upgraded nationwide service & emergency breakdown desk.
- **`/support/warranty`**: 7-Year Coil Warranty registration and policy hub.

---

## 5. Admin Management
- **`/admin/dealers`**: Dealer Network overview & fleet van tracking.
- **`/admin/dealers/applications`**: Dealer Partnership Applications review.
- **`/admin/leads`**: Commercial Enquiries & Lead Pipeline CRM.
