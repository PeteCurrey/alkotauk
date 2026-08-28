# Alkota UK — Project Roadmap

## Current Architecture (Phase 01 Baseline — August 2026)

### Framework
- **Next.js 15** (App Router) with React 19
- **TypeScript** with build-error suppression currently enabled in `next.config.ts`
- **Tailwind CSS v4** with custom `@theme` design tokens in `globals.css`
- **Vercel** for hosting and deployment

### Data Layer
- **Supabase** (PostgreSQL) is the canonical content backend
- Products in `products` table, routing by slug
- Site settings in `site_settings` (maintenance mode, HubSpot IDs)
- Enquiries in `enquiries` table
- **Sanity CMS removed** — stub client in `src/sanity/client.ts` to prevent import errors

### Authentication
- **Admin**: JWT cookie (`alkota-admin-token`) signed with `JWT_SECRET`, checked in Edge middleware
- **Portal/Dealer**: `next-auth` (v5 beta) with Supabase session

### Styling System
- Tailwind v4, tokens in `globals.css`
- Colours: `--color-alkota-orange: #FF6900`, `--color-alkota-black: #121212`, `--color-alkota-bg: #EBEBEB`
- Fonts: Inter (body), Barlow Condensed (display), IBM Plex Mono (technical labels)
- Animations: GSAP (homepage scroll), Framer Motion (UI micro-interactions)

---

## Roadmap Overview

* [x] **Phase 01**: Technical Foundation, SEO Architecture & UK Localisation (Completed & Pushed)
* [x] **Phase 02**: Product Platform, Clean Database, Ingestion Engine & 7+5 Machine Detail Layout (Completed & Pushed)
* [x] **Phase 03**: The Lobby, Editorial CMS, Whitepaper Publishing & Dynamic Sitemap (Completed & Pushed)
* [x] **Phase 03.5**: Digital Flagship — Homepage Transformation, Brand Storytelling, Mess Quest & Site-Wide Visual Polish (Completed & Pushed)
* [x] **Phase 04**: Dealer Network, Ownership Experience, Lead Routing Engine & Dealer Portal (Completed)
* [ ] **Phase 05**: The Configurator & Application Matching Engines

---

## Issues Discovered in Phase 01 Audit

### Critical (Fixed in Phase 01)
1. **Sitemap broken** — `sitemap.ts` imported from removed Sanity client → empty XML sitemap. Fixed.
2. **Missing metadata on category pages** — All category pages inherited the global title. Fixed.
3. **US EPA compliance claim** — "EPA Regulatory Compliance Verified" on water treatment section. Fixed.
4. **US ETL/UL-1776 certification** — Referenced on cold water category page. Removed.

### High Priority — Phase 02
5. **Homepage is `'use client'`** — Prevents server-rendering; crawlers cannot see product content.
6. **`MachineCatalogue` fetches client-side** — Products on homepage shown only after JS executes ("Synchronizing Fleet Data..."). Must become a Server Component.
7. **`lang="en"` not `lang="en-GB"`** — Root HTML element should specify British English.
8. **No canonical URLs** — No `<link rel="canonical">` on any pages.
9. **No Open Graph images** — No `og:image` set globally or per-page.
10. **TypeScript/ESLint errors suppressed** — `ignoreBuildErrors: true` in `next.config.ts` hides real errors.
11. **`parts-washers` page is `'use client'`** — Static content; doesn't need client rendering.
12. **115V shown in Wash Bay table** — US voltage. UK mains is 230V/50Hz. Needs verification.
13. **No `generateStaticParams`** — Machine pages are SSR on every request; should be SSG.

### Medium Priority — Phase 02
14. **No BreadcrumbList JSON-LD** — Visual breadcrumbs exist but no structured data.
15. **`<img>` not `next/image`** — `MachineCard.tsx` bypasses Next.js image optimisation.
16. **No `prefers-reduced-motion`** — GSAP animations don't respect reduced-motion preference.
17. **Dead `page.tsx.bak`** — Backup file committed at `src/app/page.tsx.bak`.
18. **Large PNGs in repo root** — 3× ~1MB image files committed to root, not `public/`.

### Low Priority — Phase 02/03
19. **`stripe` dependency** — Installed but not in active use. Remove if not needed.
20. **`/cart`, `/checkout`, `/shop` skeleton routes** — Not in sitemap or robots disallow. Review.
21. **`next-auth` v5 beta** — Beta dependency. Review for stability.

---

## Changes Completed in Phase 01

| Item | File | Status |
|---|---|---|
| Fix sitemap.ts to use Supabase | `src/app/sitemap.ts` | ✅ |
| Add generateMetadata to category pages | `src/app/machines/[category]/page.tsx` | ✅ |
| Add Product JSON-LD to machine detail pages | `src/app/machines/[category]/[slug]/page.tsx` | ✅ |
| Add Organization + WebSite JSON-LD to homepage | `src/app/page.tsx` | ✅ |
| Fix EPA/Environmental Agency localisation | `src/components/WaterTreatmentSection.tsx` | ✅ |
| Remove ETL/UL-1776 US compliance reference | `src/app/machines/[category]/page.tsx` | ✅ |
| Update Hero pressure stat to BAR primary | `src/components/Hero.tsx` | ✅ |
| Update parts washer specs to metric-first | `src/app/parts-washers/page.tsx` | ✅ |
| Fix "Labor" → "Labour" | `src/app/parts-washers/page.tsx` | ✅ |
| Extend products schema for future expansion | `supabase/migrations/008_extend_products_schema.sql` | ✅ |
| Create roadmap & SEO baseline docs | `docs/` | ✅ |

---

## Recommendations for Phase 02

### SEO Critical
- Server-render homepage and `MachineCatalogue`
- Set `lang="en-GB"` on root layout
- Add canonical URLs via `generateMetadata`
- Add Open Graph images (homepage, categories, machine pages)
- Add BreadcrumbList JSON-LD
- Migrate `MachineCard` to `next/image`
- Add `generateStaticParams` for machine routes
- Remove TypeScript/ESLint suppression and fix underlying errors

### Content & Data
- Populate extended product schema fields (pump, burner, motor, applications, features)
- Add full meta descriptions to all products in Supabase
- Verify and correct Wash Bay voltage specs for UK market (230V/50Hz)

### Architecture Clean-up
- Remove `page.tsx.bak`, `check_db.js`, `verify.js`, root PNG files
- Move images to `public/images/`
- Remove `stripe` if not in use
- Review `/cart`, `/checkout`, `/shop` routes

### Future Features
- **The Lobby** — Professional resource centre: articles, guides, calculators, downloads
- **Dealers** — Geospatial dealer search, profiles, lead routing, portal
- **AI Recommendation** — Product schema now structured to support this
- **Configurator** — Extend beyond basic Machine Match

---

## Outstanding Questions Requiring Human Input

1. **UK voltage specs** — What UK voltage options are available for the Wash Bay Cabinet series? Are single and three-phase 230V variants stocked?
2. **UKCA/CE marking** — Are any Alkota machines UKCA or CE marked? Critical for accurate product pages.
3. **Trade effluent claim** — Can we confirm Alkota water treatment systems support compliance with UK Environment Agency trade effluent consent? This claim is now live.
4. **Open Graph images** — Hero photography or machine imagery at minimum 1200×630px for OG images?
5. **UK phone number** — Should a UK phone number appear in footer, header, and Organisation JSON-LD?
6. **Analytics** — No analytics scripts found. What platform is in use, or shall we implement one?
