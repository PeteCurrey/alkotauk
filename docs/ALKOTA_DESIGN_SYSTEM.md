# Alkota UK — Master Design System & Art Direction Standard

## 1. Brand Essence & Visual Philosophy

Alkota UK sits at the intersection of:
- **Premium Global Manufacturer** (Quiet authority, zero cheap gimmicks).
- **Apple-Like Restraint** (Generous whitespace, large crisp typography, intentional asymmetry).
- **High-End Automotive Product Experience** (Immersive hero photography, physical precision).
- **American Industrial Heritage** (South Dakota craftsmanship, Schedule 80 carbon steel metallurgy).
- **Modern British Corporate Engineering** (Clear terminology, regulatory rigor, trade effluent compliance).

---

## 2. Light / Dark Balance Governance

- **Inner Pages Rule**: **70%–85% Light Theme** on warm white (`#FAF9F5` / `#FFFFFF`).
- **Dark Chapters**: Reserved for 1–2 high-impact cinematic chapters per page (15%–30%) — typically representing combustion thermodynamics, heavy mud displacement, or late-night fleet wash bay operations.
- **Banned**: 100% black inner pages (with the exception of specialized technical interactive full-screen tools if approved).

---

## 3. Typography Hierarchy

| Element | Font / Treatment | Tracking | Usage |
| :--- | :--- | :--- | :--- |
| **Eyebrow / Badge** | Monospace uppercase (`font-mono` / `IBM Plex Mono`) | `tracking-[0.25em]` | Technical classifications, standards, sub-chapters (`// ASTM A53`). |
| **Display Title** | Extra-light sans uppercase (`font-extralight uppercase`) | `tracking-tight` | Flagship headings, hero statements, category titles. |
| **Headline Accent** | Italic normal sans (`font-normal italic text-alkota-orange`) | `tracking-tight` | Single emphasized sentence clause within a display title. |
| **Body / Narrative** | Sentence-case regular sans (`font-normal leading-relaxed`) | Normal | Editorial storytelling, physics explanation, specifications. |
| **Technical Label** | Monospace muted uppercase (`text-xs font-mono text-[#888]`) | `tracking-wider` | Specification keys, dilution parameters, pressure ratings. |

---

## 4. Color Palette & Orange Discipline

- **Alkota Orange (`#FF6900`)**: Reserved strictly for:
  - Primary call-to-action buttons.
  - Active navigation indicators.
  - Technical engineering callouts and metric highlights.
  - *Never* turn entire paragraphs or wide headings orange.
- **Alkota Black (`#1A1A18` / `#0A0A0A`)**: High-contrast, warm dark tone for text and high-impact chapters.
- **Warm White (`#FAF9F5`)**: The core background surface for all inner pages.
- **Dividers & Rules (`#E8E7E0` / `#E0DFD8`)**: Subtle architectural rules replacing heavy box borders.

---

## 5. Zero "WordPress Cards" Principle

- **Rule**: A card or container should *only* exist when the user is picking 1 selectable item among several (e.g. machine model selector, chemical formulation card).
- **Alternative**: For grouped information, use:
  - Asymmetric 7/5 editorial column layouts.
  - Rule-separated technical indices (`divide-y divide-[#EAE9E2]`).
  - Numbered editorial proof points (`01`, `02`, `03`).
  - Macro component photography with caption badges.

---

## 6. Button Hierarchy

1. **Primary Action**: Solid Alkota orange fill (`bg-[#FF6900] text-white hover:bg-black font-mono text-xs uppercase tracking-widest font-medium`).
2. **Secondary Action**: Dark outline / neutral surface (`border border-[#D5D5D0] bg-white text-[#1A1A18] hover:border-black font-mono text-xs uppercase tracking-widest`).
3. **Tertiary / Text Link**: Unboxed text with directional arrow (`font-mono text-xs uppercase tracking-wider text-[#1A1A18] hover:text-[#FF6900]`).

---

## 7. Form System Standards

- **Input Height**: 48px–56px for comfortable click/tap accuracy.
- **Surface**: White background (`bg-white`) with subtle neutral border (`border-[#D5D5D0] focus:border-[#FF6900] focus:outline-none`).
- **Grouping**: Always group long forms into numbered logical phases:
  - `01 // CONTACT IDENTITY`
  - `02 // SITE LOCATION`
  - `03 // APPLICATION SCOPE`
- **Context**: Every form must state clear dispatch protocols (e.g. *"Zero spam. Details used solely for demonstration van arrival"*).

---

## 8. Mega Menu Architecture

- **Desktop**: 3-Zone Light Editorial Layout spanning the container width.
  - *Zone 1 (Col 4–5)*: Unboxed taxonomy list with clean hover states.
  - *Zone 2 (Col 4–5)*: Large visual story with high-resolution image, model badge, and primary link.
  - *Zone 3 (Col 3–4)*: Dedicated high-intent action / diagnostic block.
- **Interaction**: Intent-based timeout (`180ms`) preventing accidental dismissal.
- **Mobile**: Full-screen slide-down drawer with large touch targets and expandable accordion submenus.
