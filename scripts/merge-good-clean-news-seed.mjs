import fs from 'fs';
import path from 'path';

const seedPath = path.join(process.cwd(), 'scripts/data/lobby-canonical-seed.json');
const importPath = path.join(process.cwd(), 'scripts/data/good-clean-news-import.json');

const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
const imported = JSON.parse(fs.readFileSync(importPath, 'utf8'));

const existingSlugs = new Set(seed.articles.map(a => a.slug));
let addedCount = 0;

for (const art of imported) {
  if (!existingSlugs.has(art.slug)) {
    // Generate content markdown with proper heading sections and UK review notice
    const contentMarkdown = `## Overview

${art.excerpt}

## Technical Assessment

When deploying industrial pressure cleaning equipment for this application, operational considerations must account for thermal efficiency, mechanical impact, and environmental compliance under UK operating conditions.

### Key Considerations

- **Pressure and Flow Rates:** Optimum balance of hydraulic force and water volume for targeted soil removal.
- **Thermal Energy:** Heat accelerates chemical kinetic reaction rates, significantly reducing chemical dosage and dwell time.
- **Preventative Protocol:** Routine inspection of pump seals, high-pressure hose assemblies, and burner combustion parameters preserves machine longevity and operational safety.

## Operational Takeaways

1. Consult machine manuals for exact pressure, flow, and electrical supply specifications.
2. Ensure wash bay drainage conforms to local water authority and environmental discharge consents.
3. For site-specific technical advice, contact the Alkota UK engineering applications desk.

---
*Adapted for UK industrial operating environments by Alkota UK.*`;

    seed.articles.push({
      ...art,
      author_slug: 'david-evans',
      content_markdown: contentMarkdown,
    });
    existingSlugs.add(art.slug);
    addedCount++;
  }
}

console.log(`Merged ${addedCount} imported articles into canonical seed.`);
console.log(`Total articles in seed: ${seed.articles.length}`);

fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2));
console.log(`Updated ${seedPath}`);
