#!/usr/bin/env -S node --env-file=.env.local
/**
 * ingest-catalogue.ts
 *
 * Merges and upserts all Alkota parts data into the production database:
 *   1. PARTS_CATALOGUE_V2 (existing normalized TypeScript data — primary)
 *   2. alkota-parts-extracted.json (PDF extraction — fills gaps + adds PDF-only records)
 *
 * Rules:
 *   - part_number is the authoritative merge key
 *   - seed-v2 data wins over PDF-extracted data (it has prices, descriptions, specs)
 *   - PDF-extracted records with no matching seed-v2 entry are inserted with:
 *       price = null, needs_review = true, catalogue_source = 'pdf_extract'
 *   - NEVER invents: part numbers, prices, descriptions, specs, compatibility
 *   - Incomplete records get needs_review = true with reason flags
 *
 * Run AFTER the database migration (024_parts_store_foundation.sql) has been applied.
 *
 * Usage:
 *   node --env-file=.env.local node_modules/tsx/dist/cli.mjs scripts/ingest-catalogue.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Supabase client (service role) ──────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

async function main() {
  // Dynamic import to avoid path alias issues
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // ─── Load PARTS_CATALOGUE_V2 via dynamic path ─────────────────────────────────
  console.log('Loading PARTS_CATALOGUE_V2...');
  const seedV2Module = await import('../src/lib/parts/catalogue-seed-v2');
  const SEED_V2_PARTS: any[] = seedV2Module.PARTS_CATALOGUE_V2;
  console.log(`  Loaded ${SEED_V2_PARTS.length} parts from catalogue-seed-v2.ts`);

// ─── Load PDF extraction output ───────────────────────────────────────────────
const EXTRACTED_PATH = path.resolve('/Users/petercurrey/Desktop/Alkota/scripts/data/alkota-parts-extracted.json');
let PDF_PARTS: any[] = [];
if (fs.existsSync(EXTRACTED_PATH)) {
  const raw = JSON.parse(fs.readFileSync(EXTRACTED_PATH, 'utf-8'));
  PDF_PARTS = raw.parts ?? [];
  console.log(`  Loaded ${PDF_PARTS.length} parts from alkota-parts-extracted.json`);
} else {
  console.log(`  No PDF extraction found at ${EXTRACTED_PATH} — skipping PDF data`);
}

// ─── Build merge map: part_number → merged record ────────────────────────────
// Priority: seed-v2 > pdf-extracted
const mergeMap = new Map<string, Record<string, any>>();

// 1. Ingest PDF-extracted parts as base layer (low priority)
for (const pdfPart of PDF_PARTS) {
  if (pdfPart.category === '__index__' || pdfPart.category === '__ignore__') continue;
  const pn = pdfPart.part_number;
  if (!pn) continue;

  mergeMap.set(pn, {
    part_number: pn,
    name: pdfPart.raw_description
      ? truncate(pdfPart.raw_description, 200)
      : `Alkota Part ${pn}`,
    description: pdfPart.raw_description ?? null,
    category: pdfPart.category || 'other',
    slug: slugify(pn),
    price: null,       // never invent prices
    in_stock: false,   // PDF catalogue parts have unverified live stock; require review
    availability_status: 'check_availability',
    stock_type: 'special_order',
    active: true,
    catalogue_source: 'pdf_extract',
    catalogue_page: pdfPart.catalogue_page || null,
    catalogue_section: pdfPart.catalogue_section || null,
    needs_review: true,
    review_flags: buildReviewFlags({ price: null, description: pdfPart.raw_description }),
    data_quality_score: 30,
    brand: 'alkota',
    oem_genuine: true,
    is_attachment: false,
    featured: false,
    tags: ['alkota', 'oem'],
    sort_order: 9999,
  });
}

// 2. Overlay seed-v2 parts (high priority — wins on all fields)
for (const part of SEED_V2_PARTS) {
  const pn = part.part_number;
  if (!pn) continue;

  // Calculate data quality score
  const flags = buildReviewFlags(part);
  const score = calculateQualityScore(part);
  const needsReview = flags.length > 0;

  const merged: Record<string, any> = {
    ...part,
    stock_type: (part as any).stock_type || 'direct_stock',
    catalogue_source: 'seed_v2',
    needs_review: needsReview,
    review_flags: flags,
    data_quality_score: score,
    // Ensure slug is set
    slug: part.slug || slugify(pn),
  };

  // Remove undefined values (Supabase rejects them)
  for (const key of Object.keys(merged)) {
    if (merged[key] === undefined) delete merged[key];
  }

  mergeMap.set(pn, merged);
}

console.log(`\nMerge complete: ${mergeMap.size} unique parts`);

// ─── Stats ────────────────────────────────────────────────────────────────────
const allParts = Array.from(mergeMap.values());
const fromSeedV2 = allParts.filter(p => p.catalogue_source === 'seed_v2').length;
const fromPdf = allParts.filter(p => p.catalogue_source === 'pdf_extract').length;
const needsReview = allParts.filter(p => p.needs_review).length;
const noPrice = allParts.filter(p => !p.price || p.price === null).length;
const noDesc = allParts.filter(p => !p.description).length;

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  Pre-upload Validation Report');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  Total unique parts:   ${allParts.length}`);
console.log(`  From catalogue-seed:  ${fromSeedV2}`);
console.log(`  From PDF extract:     ${fromPdf}`);
console.log(`  Flagged for review:   ${needsReview}`);
console.log(`  Missing price:        ${noPrice}`);
console.log(`  Missing description:  ${noDesc}`);

// Category breakdown
const byCat: Record<string, number> = {};
for (const p of allParts) {
  byCat[p.category] = (byCat[p.category] || 0) + 1;
}
console.log('\n  By category:');
for (const [cat, count] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${cat.padEnd(30)} ${count}`);
}
console.log('');

// ─── Check database connectivity ─────────────────────────────────────────────
console.log('Checking database connectivity...');
const { data: testData, error: testError } = await supabase
  .from('parts')
  .select('count')
  .limit(1);
  
if (testError) {
  console.error('Database connection failed:', testError.message);
  console.error('\nEnsure migration 024_parts_store_foundation.sql has been run in Supabase SQL Editor.');
  process.exit(1);
}
console.log('  ✓ Database connected\n');

// ─── Upsert in batches of 50 ──────────────────────────────────────────────────
const BATCH_SIZE = 50;
const batches: any[][] = [];
for (let i = 0; i < allParts.length; i += BATCH_SIZE) {
  batches.push(allParts.slice(i, i + BATCH_SIZE));
}

let inserted = 0;
let updated = 0;
let failed = 0;
const failedParts: string[] = [];

console.log(`Upserting ${allParts.length} parts in ${batches.length} batches of ${BATCH_SIZE}...`);

for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
  const batch = batches[batchIdx];
  process.stdout.write(`  Batch ${(batchIdx + 1).toString().padStart(3)}/${batches.length}...`);

  const { data, error } = await supabase
    .from('parts')
    .upsert(batch, { onConflict: 'part_number', ignoreDuplicates: false })
    .select('id, part_number');

  if (error) {
    process.stdout.write(` ERROR: ${error.message}\n`);
    failed += batch.length;
    failedParts.push(...batch.map(p => p.part_number));
  } else {
    process.stdout.write(` ✓ ${data?.length ?? 0} upserted\n`);
    inserted += data?.length ?? 0;
  }
}

// ─── Final Report ─────────────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('  Ingestion Complete');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`  Upserted:           ${inserted}`);
console.log(`  Failed:             ${failed}`);
console.log(`  Flagged for review: ${needsReview}`);
if (failedParts.length > 0) {
  console.log('\n  Failed part numbers:');
  for (const pn of failedParts.slice(0, 20)) {
    console.log(`    - ${pn}`);
  }
  if (failedParts.length > 20) {
    console.log(`    ... and ${failedParts.length - 20} more`);
  }
}
  console.log('\n  Next steps:');
  console.log('  1. Visit /admin/parts/quality to review flagged records');
  console.log('  2. Visit /admin/parts to browse all imported parts');
  console.log('  3. Run the PDF extractor to add catalogue-only part records');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch((err) => {
  console.error('Fatal ingestion error:', err);
  process.exit(1);
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 3) + '...';
}

function buildReviewFlags(part: any): string[] {
  const flags: string[] = [];
  if (!part.price && part.price !== 0) flags.push('missing_price');
  if (!part.description) flags.push('missing_description');
  if (!part.category || part.category === 'other') flags.push('uncategorised');
  if (!part.compatible_machines || (Array.isArray(part.compatible_machines) && part.compatible_machines.length === 0)) {
    flags.push('no_compatibility_data');
  }
  if (!part.image_url && (!part.image_gallery || part.image_gallery?.length === 0)) {
    flags.push('no_image');
  }
  return flags;
}

function calculateQualityScore(part: any): number {
  let score = 100;
  if (!part.price && part.price !== 0) score -= 25;
  if (!part.description) score -= 20;
  if (!part.image_url) score -= 15;
  if (!part.compatible_machines || part.compatible_machines?.length === 0) score -= 15;
  if (!part.technical_notes) score -= 10;
  if (!part.weight_kg) score -= 5;
  if (!part.tags || part.tags?.length === 0) score -= 5;
  if (!part.sku && !part.mpn) score -= 5;
  return Math.max(0, score);
}
