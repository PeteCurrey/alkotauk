# Alkota UK — SEO Baseline (Phase 01)

Recorded: August 2026. Use this document to measure SEO progress against Phase 01 changes.

---

## Pre-Phase 01 State

### Metadata Coverage
| Page | Title | Description | OG Title | OG Image | Canonical |
|---|---|---|---|---|---|
| Homepage `/` | ✅ Global fallback | ✅ Global fallback | ❌ None | ❌ None | ❌ None |
| `/machines` | ✅ Global fallback | ✅ Global fallback | ❌ None | ❌ None | ❌ None |
| `/machines/hot-water` | ❌ Inherits global | ❌ Inherits global | ❌ None | ❌ None | ❌ None |
| `/machines/cold-water` | ❌ Inherits global | ❌ Inherits global | ❌ None | ❌ None | ❌ None |
| `/machines/parts-washers` | ❌ Inherits global | ❌ Inherits global | ❌ None | ❌ None | ❌ None |
| `/machines/[category]/[slug]` | ✅ generateMetadata | ✅ generateMetadata | ❌ None | ❌ None | ❌ None |
| `/industries/[slug]` | Unknown | Unknown | ❌ None | ❌ None | ❌ None |

Global fallback title: `"Alkota UK | The Platinum Standard in Industrial Cleaning"`

### Structured Data (JSON-LD) Coverage — Pre-Phase 01
| Page | Organization | WebSite | Product | BreadcrumbList | FAQPage |
|---|---|---|---|---|---|
| Homepage | ❌ | ❌ | N/A | ❌ | ❌ |
| Machine category | ❌ | ❌ | ❌ | ❌ | ❌ |
| Machine detail | ❌ | ❌ | ❌ | ❌ | ❌ |
| Blog article | ❌ | ❌ | N/A | ❌ | ❌ |
| FAQ | ❌ | ❌ | N/A | ❌ | ✅ |
| Industry page | ❌ | ❌ | N/A | ❌ | ❌ |

### Sitemap — Pre-Phase 01
- **Status:** Broken. `sitemap.ts` imported from removed Sanity client.
- Machine and industry URLs generated from `[]` (empty arrays).
- Only static URLs were correct (homepage, /machines, /about, /technology, etc.)

### Robots.txt — Pre-Phase 01
- **Status:** Working. Disallows `/portal/`, `/api/`, `/checkout/`.
- Allows all crawlers including `GPTBot` (AI crawlers).
- Points to correct sitemap URL.

### UK Localisation Issues — Pre-Phase 01
- "EPA Regulatory Compliance Verified" — US regulatory body
- "Environmental Agency" — incorrect (UK body is "Environment Agency")
- "ETL certified to UL-1776" — US certification standard
- PSI presented as primary pressure unit (UK industry uses bar)
- "Labor" instead of "Labour"
- 115V electrical specs (US standard; UK is 230V)

---

## Post-Phase 01 State

### Metadata Coverage
| Page | Title | Description | OG Title | OG Image | Canonical |
|---|---|---|---|---|---|
| Homepage `/` | ✅ Global fallback | ✅ Global fallback | ❌ None | ❌ None | ❌ None |
| `/machines/[category]` | ✅ **generateMetadata added** | ✅ **generateMetadata added** | ❌ None | ❌ None | ❌ None |
| `/machines/[category]/[slug]` | ✅ generateMetadata | ✅ generateMetadata | ❌ None | ❌ None | ❌ None |

### Structured Data — Post-Phase 01
| Page | Organization | WebSite | Product | BreadcrumbList | FAQPage |
|---|---|---|---|---|---|
| Homepage | ✅ **Added** | ✅ **Added** | N/A | ❌ | ❌ |
| Machine detail | ❌ | ❌ | ✅ **Added** | ❌ | ❌ |

### Sitemap — Post-Phase 01
- **Status:** Fixed. Now queries Supabase `products` and `industries` tables.
- Machine URLs: `/machines/{category}/{slug}` — dynamic from database
- Category URLs: `/machines/hot-water`, `/cold-water`, `/parts-washers`, `/water-treatment`
- Industry URLs: `/industries/{slug}` — dynamic from database

---

## Phase 02 SEO Targets

| Item | Target |
|---|---|
| Homepage server-rendered | Product content in HTML, no JS required for crawlers |
| `lang="en-GB"` | Set on root `<html>` element |
| Canonical URLs | Every indexable page has `<link rel="canonical">` |
| Open Graph images | Homepage, all category pages, all machine pages |
| BreadcrumbList JSON-LD | All category and product pages |
| `next/image` migration | `MachineCard`, `Hero`, all page images |
| `generateStaticParams` | Machine category and detail pages pre-built at deploy time |
| Core Web Vitals | LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile |
