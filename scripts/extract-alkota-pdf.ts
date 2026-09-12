#!/usr/bin/env -S node --env-file=.env.local
/**
 * extract-alkota-pdf.ts
 *
 * Fast, deterministic extractor for Literature/Alkota Parts.pdf.
 * Uses cached all_pages_dump.json (from JXA Quartz) or executes JXA pass.
 *
 * Extracts 2,500+ authentic Alkota part numbers from the Alphanumeric Index (p.127-136),
 * cross-references against content pages (p.4-124), extracts sections, headings,
 * descriptions, and specifications, and produces:
 *   scripts/data/alkota-parts-extracted.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const PDF_PATH = '/Users/petercurrey/Desktop/Alkota/Literature/Alkota Parts.pdf';
const DUMP_PATH = '/Users/petercurrey/.gemini/antigravity/brain/5fc5c58c-357c-4562-90b3-40bfb6961c79/scratch/all_pages_dump.json';
const OUTPUT_PATH = '/Users/petercurrey/Desktop/Alkota/scripts/data/alkota-parts-extracted.json';

interface PageDump {
  page: number;
  text: string;
}

// ─── 1. Load or Generate Dump ────────────────────────────────────────────────
let pages: PageDump[] = [];
if (fs.existsSync(DUMP_PATH)) {
  console.log(`Loading cached page dump from ${DUMP_PATH}...`);
  pages = JSON.parse(fs.readFileSync(DUMP_PATH, 'utf-8'));
} else {
  console.log(`Generating full 140-page PDF dump via Quartz JXA...`);
  const script = `
    ObjC.import("PDFKit");
    ObjC.import("Foundation");
    var url = $.NSURL.fileURLWithPath("${PDF_PATH}");
    var doc = $.PDFDocument.alloc.initWithURL(url);
    var pgs = [];
    for (var i = 0; i < doc.pageCount; i++) {
      var p = doc.pageAtIndex(i);
      pgs.push({ page: i + 1, text: p.string ? p.string.js : "" });
    }
    JSON.stringify(pgs);
  `;
  const res = execSync(`osascript -l JavaScript -e "${script.replace(/"/g, "\\\"")}"`, {
    maxBuffer: 30 * 1024 * 1024,
  }).toString();
  pages = JSON.parse(res.substring(res.indexOf('[')));
  fs.writeFileSync(DUMP_PATH, JSON.stringify(pages));
}

console.log(`Loaded ${pages.length} pages.`);

// ─── 2. Section Map from TOC ──────────────────────────────────────────────────
interface SectionDef {
  section: number;
  title: string;
  category: string;
  startPage: number;
  endPage: number;
}

const SECTIONS: SectionDef[] = [
  { section: 1,  title: 'Hoses, Reels, Guns & Lances', category: 'hoses',              startPage: 4,   endPage: 18  },
  { section: 2,  title: 'Pressure Washer Accessories', category: 'attachments',        startPage: 19,  endPage: 27  },
  { section: 3,  title: 'Spray & Rotating Nozzles',    category: 'lances-nozzles',     startPage: 28,  endPage: 36  },
  { section: 4,  title: 'Quick Disconnects',           category: 'fittings-couplers',  startPage: 37,  endPage: 40  },
  { section: 5,  title: 'Fittings & Swivels',          category: 'fittings-couplers',  startPage: 41,  endPage: 46  },
  { section: 6,  title: 'Filters & Strainers',         category: 'filters',            startPage: 47,  endPage: 48  },
  { section: 7,  title: 'Gauges',                      category: 'electrical-switches',startPage: 49,  endPage: 49  },
  { section: 8,  title: 'Valves & Unloaders',          category: 'valves-unloaders',   startPage: 50,  endPage: 61  },
  { section: 9,  title: 'Chemical Injection Systems',  category: 'attachments',        startPage: 62,  endPage: 63  },
  { section: 10, title: 'Pumps & Pump Parts',          category: 'pumps',              startPage: 64,  endPage: 92  },
  { section: 11, title: 'Belts, Engines & Motors',     category: 'engines-motors',     startPage: 93,  endPage: 104 },
  { section: 12, title: 'Burners & Combustion',        category: 'burners',            startPage: 105, endPage: 112 },
  { section: 13, title: 'Electrical Components',       category: 'electrical-switches',startPage: 113, endPage: 121 },
  { section: 14, title: 'European Parts & Accessories',category: 'pumps',              startPage: 122, endPage: 122 },
];

function getSectionForPage(page: number): SectionDef {
  for (const s of SECTIONS) {
    if (page >= s.startPage && page <= s.endPage) return s;
  }
  return { section: 0, title: 'General Spares', category: 'other', startPage: 0, endPage: 140 };
}

// ─── 3. Page Header Cache ─────────────────────────────────────────────────────
const pageHeaders = new Map<number, { title: string; subtitle: string }>();
for (const p of pages) {
  if (p.page < 4 || p.page > 122) continue;
  const lines = p.text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && !/^\d+$/.test(l) && !/^section\s+\d+/i.test(l));
  
  const title = lines[0] || '';
  const subtitle = lines[1] && !lines[1].startsWith('PART #') ? lines[1] : '';
  pageHeaders.set(p.page, { title, subtitle });
}

// ─── 4. Extract Canonical Index Part Numbers (Pages 127-136) ──────────────────
console.log('Extracting part numbers from Alphanumeric Index (pages 127-136)...');
const indexParts = new Set<string>();

for (let p = 127; p <= 136; p++) {
  const pageObj = pages.find(item => item.page === p);
  if (!pageObj) continue;
  // Match part numbers: letters, digits, dashes, min length 5
  const matches = pageObj.text.match(/\b([A-Z0-9]{2,14}-[A-Z0-9]+(?:-[A-Z0-9]+)*)\b/g) || [];
  for (const m of matches) {
    // Ignore false matches like page ranges "48-49"
    if (/^\d{1,3}-\d{1,3}$/.test(m)) continue;
    indexParts.add(m);
  }
}
console.log(`Extracted ${indexParts.size} unique part numbers from index.\n`);

// ─── 5. Cross-Reference Against Content Pages ──────────────────────────────────
console.log('Cross-referencing part numbers against content pages (4-122)...');

interface ExtractedPartRecord {
  part_number: string;
  name: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  brand: string;
  manufacturer: string;
  price: number | null;
  in_stock: boolean;
  active: boolean;
  oem_genuine: boolean;
  catalogue_page: number;
  catalogue_section: string;
  catalogue_source: string;
  needs_review: boolean;
  review_flags: string[];
  data_quality_score: number;
  tags: string[];
  slug: string;
}

const extractedRecords: ExtractedPartRecord[] = [];
let matchedInContent = 0;
let unmatchedInContent = 0;

for (const pn of indexParts) {
  let matchedPage = 0;
  let contextSnippet = '';
  let lineText = '';

  // 1. Scan content pages for exact match
  for (let p = 4; p <= 122; p++) {
    const pageObj = pages.find(item => item.page === p);
    if (!pageObj) continue;
    const idx = pageObj.text.indexOf(pn);
    if (idx !== -1) {
      matchedPage = p;
      // Get context around the part number
      const start = Math.max(0, idx - 40);
      const end = Math.min(pageObj.text.length, idx + pn.length + 140);
      contextSnippet = pageObj.text.substring(start, end).replace(/\n+/g, ' ').trim();
      
      // Extract the line containing the part number
      const allLines = pageObj.text.split('\n');
      const line = allLines.find(l => l.includes(pn)) || '';
      lineText = line.replace(pn, '').trim();
      break;
    }
  }

  // 2. Fallback: Loose regex match for PDF text extraction spacing artifacts (e.g. "E08-00006- 58*")
  if (!matchedPage) {
    const looseRegex = new RegExp(pn.replace(/[-]/g, '[-\\s]+'));
    for (let p = 4; p <= 122; p++) {
      const pageObj = pages.find(item => item.page === p);
      if (!pageObj) continue;
      const m = pageObj.text.match(looseRegex);
      if (m && m.index !== undefined) {
        matchedPage = p;
        const start = Math.max(0, m.index - 40);
        const end = Math.min(pageObj.text.length, m.index + m[0].length + 140);
        contextSnippet = pageObj.text.substring(start, end).replace(/\n+/g, ' ').trim();

        const allLines = pageObj.text.split('\n');
        const line = allLines.find(l => looseRegex.test(l)) || '';
        lineText = line.replace(looseRegex, '').trim();
        break;
      }
    }
  }

  const sec = getSectionForPage(matchedPage);
  const header = pageHeaders.get(matchedPage);

  // Derive fine-grained subcategory & category
  let category = sec.category;
  let subcategory: string | null = null;
  
  // Specific override: All REEL- parts belong in hoses/hose-reels regardless of page
  if (pn.startsWith('REEL-')) {
    category = 'hoses';
    subcategory = 'hose-reels';
  } else if (sec.section === 1) {
    if (/reel/i.test(header?.title || '') || /reel/i.test(lineText)) {
      category = 'hoses';
      subcategory = 'hose-reels';
    } else if (/gun/i.test(header?.title || '') || /gun/i.test(lineText)) {
      category = 'trigger-guns';
      subcategory = 'trigger-guns';
    } else if (/lance|wand/i.test(header?.title || '') || /lance/i.test(lineText)) {
      category = 'lances-nozzles';
      subcategory = 'lances';
    } else {
      category = 'hoses';
      subcategory = 'high-pressure-hoses';
    }
  } else if (sec.section === 10) {
    if (/kit|seal|packing/i.test(header?.title || '') || /kit/i.test(lineText)) {
      category = 'seals-o-rings';
      subcategory = 'pump-repair-kits';
    } else {
      category = 'pumps';
      subcategory = 'complete-pumps';
    }
  }

  // Derive human-readable product name
  let productName = '';
  if (lineText && lineText.length > 3 && !/^[A-Z0-9-]+$/.test(lineText)) {
    // Clean up line text
    const cleanDesc = lineText
      .replace(/^[-\s,#:]+/, '')
      .replace(/[-\s,#:]+$/, '')
      .replace(/\s+/g, ' ');
    productName = cleanDesc.length > 5 ? cleanDesc : `${header?.subtitle || header?.title || sec.title} (${pn})`;
  } else if (header?.subtitle) {
    productName = `${header.subtitle} (${pn})`;
  } else if (header?.title) {
    productName = `${header.title} (${pn})`;
  } else {
    productName = `Alkota OEM Part ${pn}`;
  }

  // Deduplicate/clean product name
  productName = productName
    .replace(/^#\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (productName.length > 90) {
    productName = productName.substring(0, 87) + '...';
  }

  // Build description
  let description: string | null = null;
  if (contextSnippet) {
    description = `Alkota OEM Part #${pn}. Section: ${sec.title}. Page ${matchedPage}. Specifications / details: ${contextSnippet}`;
  }

  // Review flags & data quality score
  const reviewFlags: string[] = ['missing_price', 'catalogue_extract'];
  if (!matchedPage) {
    reviewFlags.push('index_only_no_page_match');
  }
  if (!description) {
    reviewFlags.push('missing_description');
  }

  let qualityScore = 50;
  if (matchedPage > 0) qualityScore += 20;
  if (description) qualityScore += 15;
  if (subcategory) qualityScore += 10;

  // Slug
  const slug = `alkota-${pn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  if (matchedPage > 0) {
    matchedInContent++;
  } else {
    unmatchedInContent++;
  }

  extractedRecords.push({
    part_number: pn,
    name: productName,
    description,
    category,
    subcategory,
    brand: 'alkota',
    manufacturer: 'Alkota / OEM Approved',
    price: null, // NEVER invent prices — flagged for review
    in_stock: true,
    active: true,
    oem_genuine: true,
    catalogue_page: matchedPage,
    catalogue_section: sec.title,
    catalogue_source: 'pdf_extract',
    needs_review: true,
    review_flags: reviewFlags,
    data_quality_score: qualityScore,
    tags: ['alkota', 'oem', sec.category, pn],
    slug,
  });
}

console.log(`Cross-referencing results:`);
console.log(`  Matched in content pages:   ${matchedInContent} (${((matchedInContent / indexParts.size) * 100).toFixed(1)}%)`);
console.log(`  Index-only (unmatched):     ${unmatchedInContent}`);

// Write output
const output = {
  extracted_at: new Date().toISOString(),
  source_pdf: 'Literature/Alkota Parts.pdf',
  total_parts: extractedRecords.length,
  matched_in_content: matchedInContent,
  index_only: unmatchedInContent,
  parts: extractedRecords,
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\n✓ Written ${extractedRecords.length} records to ${OUTPUT_PATH}`);

// Category breakdown
const catCounts: Record<string, number> = {};
for (const r of extractedRecords) {
  catCounts[r.category] = (catCounts[r.category] || 0) + 1;
}
console.log('\nCategory breakdown:');
for (const [cat, cnt] of Object.entries(catCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat.padEnd(25)} : ${cnt}`);
}
