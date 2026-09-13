import fs from 'fs';
import path from 'path';

const cataloguePath = path.join(process.cwd(), 'scripts/data/alkota-canonical-catalogue.json');
const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf-8'));

function cleanString(str: any): any {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8242;/g, "'")
    .replace(/&#8243;/g, '"')
    .replace(/[\t\r]+/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .trim();
}

function cleanDeep(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return cleanString(obj);
  if (Array.isArray(obj)) return obj.map(cleanDeep);
  if (typeof obj === 'object') {
    const res: any = {};
    for (const [k, v] of Object.entries(obj)) {
      const cleanKey = cleanString(k);
      res[cleanKey] = cleanDeep(v);
    }
    return res;
  }
  return obj;
}

const cleanedCatalogue = catalogue.map((m: any) => {
  const item = cleanDeep(m);

  // Clean description noise if any
  if (item.short_description && item.short_description.includes('View Brochure')) {
    item.short_description = 'Industrial heavy-duty aqueous parts cleaning system engineered by Alkota for continuous component degreasing and washdown.';
  }
  if (item.description && item.description.includes('View Brochure')) {
    item.description = 'An industrial parts washer is a heated tank system that cleans grease, metal chips, oil, and machining residue off manufactured or refurbished parts. Most modern systems use aqueous (water-based) detergent rather than solvent, which eliminates flammable storage and HAZMAT handling requirements.';
  }

  // Populate motor_hp and motor_kw if missing but present in extra_specs
  if (item.motor_hp === null && item.extra_specs) {
    const hpSpec = item.extra_specs.find((s: any) => /horse|hp/i.test(s.label));
    if (hpSpec && typeof hpSpec.value === 'string') {
      let hpVal: number | null = null;
      if (hpSpec.value.includes('3/4')) {
        hpVal = 0.75;
      } else {
        const match = hpSpec.value.match(/([\d.]+)\s*hp/i);
        if (match) hpVal = parseFloat(match[1]);
      }
      if (hpVal !== null) {
        item.motor_hp = hpVal;
        item.motor_kw = Math.round(hpVal * 0.7457 * 10) / 10;
      }
    }
  }

  // Correct 3-phase assignment for 230/3 parts washers
  if (item.voltage === '230/3 v' || item.voltage === '230/3') {
    item.phase = 3;
  }

  // 530B phase verification
  if (item.model_code === '530B') {
    item.phase = 3;
    item.voltage = '230 v';
    // Ensure extra_specs accurately notes 1/3 dual phase
    const pSpec = item.extra_specs?.find((s: any) => s.label === 'Phase');
    if (pSpec) {
      pSpec.value = '1/3 Dual Phase Available';
    }
  }

  return item;
});

fs.writeFileSync(cataloguePath, JSON.stringify(cleanedCatalogue, null, 2) + '\n');
console.log(`Successfully cleaned and reconciled all ${cleanedCatalogue.length} machines in ${cataloguePath}`);
