# Alkota UK — Site-Wide Design Direction & Design System

## 1. Visual Philosophy: The Cinematic Industrial Aesthetic

Alkota UK sits at the intersection of **heavy American mechanical engineering** and **refined British industrial authority**. The design language is built on high visual contrast, technical density, and disciplined restraint.

> *"A premium industrial experience knows when not to move."*

---

## 2. Typography Hierarchy

The typography system uses three distinct, purpose-driven typefaces:

| Role | Font Family | Example Usage |
| :--- | :--- | :--- |
| **Display & Headings** | `Barlow Condensed` (Black / 900 italic) | Hero titles, machine names, section mastheads, uppercase impact metrics |
| **Body & Prose** | `Inter` (Regular / Medium / Bold) | Editorial reading, descriptions, feature narratives, technical explanations |
| **Technical Labels & Data** | `IBM Plex Mono` (Medium / Bold) | Specifications, pressure/flow units, status chips, dates, citations |

---

## 3. Color Tokens & Materials

* **Carbon & Pure Black (`#000000`, `#0A0A0A`, `#0D0D0D`)**: Deep, low-reflectance structural backdrops that ground the heavy industrial subject matter.
* **Alkota Signature Orange (`#FF6900`)**: Used exclusively for high-priority interactive cues, primary metric highlights, and active states.
* **Steel & Iron Borders (`#1F1F1F`, `#262626`, `#333333`)**: Crisp 1px geometric grid divisions reminiscent of precision CNC milled frames.
* **Muted Technical Silver (`#777777`, `#AAAAAA`)**: High-readability secondary copy that maintains editorial sophistication.

---

## 4. UI Patterns & Grid Rules

1. **Glanceable Metric Pillars**: Every machine and technical paper presents key physical units immediately in an asymmetric grid:
   - Operating Pressure (Bar primary, PSI secondary)
   - Water Volume (L/min primary, GPM secondary)
   - Drive & Heating Metallurgy
2. **7 + 5 Asymmetric Layouts**: Hero sections pair an editorial title/story column (7 cols) with a dense technical spec table or high-contrast image plate (5 cols).
3. **Restrained Micro-Interactions**: Hover states utilize crisp border shifts, 1.05x subtle image scaling, and subtle orange translate arrows rather than jarring parallax or excessive motion.
4. **Authoritative Breadcrumbs & Monospace Meta**: All sub-pages anchor their location with clean monospace hierarchy labels (e.g., `// ALKOTA UK // BUILD SPECIFICATION`).
