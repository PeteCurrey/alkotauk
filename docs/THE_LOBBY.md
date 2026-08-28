# Alkota UK — The Lobby Architecture & Editorial Charter

## 1. Overview & Purpose
**The Lobby** (`/lobby`) is Alkota UK’s industry authority platform and technical knowledge repository.

While the commercial catalogue (`/machines`, `/industrial`, `/chemicals`) serves equipment procurement, The Lobby serves:
* **Plant & Facilities Managers**: Seeking UK compliance clarity (Environment Agency PPG3, BS EN 858, Water UK trade effluent consents).
* **Process & Mechanical Engineers**: Seeking thermodynamic formulas, coil metallurgy standards (ASTM A53 Schedule 80), and hydraulic flow dynamics.
* **Fleet & Transport Operations Directors**: Evaluating Total Cost of Ownership (TCO), aqueous degreasing cycle throughput, and wash bay design.

---

## 2. Content Architecture

### Core Disciplines
1. **Engineering & Metallurgy (`engineering-design`)**:
   - Heating coil wall thickness and hoop stress (Schedule 80 vs 40).
   - Cold-wound continuous mandrel bending vs sectional welded construction.
   - Ceramic plunger triplex pumps, unloader valves, and thermal relief circuits.
2. **Regulatory & Environmental Compliance (`regulatory-compliance`)**:
   - Environmental Permitting Regulations 2016.
   - Class 1 vs Class 2 oil interceptor sizing and coalesce plate technology.
   - Foul water sewer discharge vs prohibited surface water discharge.
3. **Application Science (`application-science`)**:
   - Dry vapour steam ($140^\circ\text{C}-165^\circ\text{C}$, low moisture) vs high-pressure hot water ($80^\circ\text{C}-95^\circ\text{C}$, 200+ bar).
   - Quick-break surfactant chemistry and hydrocarbon separation kinetics.
   - HACCP sanitisation and food contact surface degreasing.
4. **Economics & Operations (`economics-tco`)**:
   - Automated aqueous rotary parts washers vs solvent sink recurring disposal fees.
   - Diesel burner fuel consumption vs electric immersion heating lifecycle costs.

---

## 3. Database Schema

The platform is powered by four relational tables in Supabase:
* `lobby_categories`: Slugs, accent colors, icons, badge labels.
* `lobby_authors`: Professional credentials, bios, avatars, and social links.
* `lobby_articles`: Markdown content, SEO metadata, reading times, tags, and cross-discipline links to `products`.
* `lobby_resources`: Downloadable engineering CAD files, whitepapers, and compliance manuals.

### Fallback Snapshot Strategy
Like the product catalogue, The Lobby implements a static snapshot (`scripts/data/lobby-canonical-seed.json`) in `src/lib/lobby.ts` to ensure **100% build reliability and instant static site generation** even during database cold starts or maintenance windows.

---

## 4. Editorial Integrity & Style Guide
1. **Zero Fluff / Zero Marketing Hyperbole**: State exact pressures, flow rates, steel grades, and legal regulations.
2. **Metric-First UK Standards**: Bar, Litres per minute (L/min), mm, kg, ${}^\circ\text{C}$.
3. **Verified Citations**: All environmental and regulatory references must cite actual UK laws (e.g. BS EN 858, PPG3, Environmental Permitting Regulations 2016).
4. **Actionable Technical Crossover**: Every technical paper links to the specific North Dakota-built machinery models engineered to meet that standard.
