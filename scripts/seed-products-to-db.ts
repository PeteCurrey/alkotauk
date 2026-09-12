#!/usr/bin/env -S node --env-file=.env.local
/**
 * seed-products-to-db.ts
 *
 * Idempotent seed and reconciliation engine that upserts canonical Alkota machines
 * into the Supabase `products` table.
 *
 * Rules:
 *  - Idempotent and safe to run multiple times
 *  - Preserves manually edited UK editorial content (uk_description, meta_title, meta_description)
 *  - Retains full source provenance (source_url, source_last_checked, upstream_data)
 *  - Flags incomplete source records with needs_review = true
 *  - Sets migration_status ('new' | 'matched' | 'updated' | 'needs_review')
 *  - Writes a comprehensive reconciliation report to scripts/data/reconciliation-report.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const CANONICAL_PATH = path.resolve(process.cwd(), 'scripts/data/alkota-canonical-catalogue.json');
const REPORT_PATH = path.resolve(process.cwd(), 'scripts/data/reconciliation-report.json');

async function main() {
  console.log('===========================================================');
  console.log('ALKOTA UK — DATABASE SEED & RECONCILIATION ENGINE');
  console.log('Target Database:', SUPABASE_URL);
  console.log('===========================================================\n');

  if (!fs.existsSync(CANONICAL_PATH)) {
    console.error(`Canonical file not found at: ${CANONICAL_PATH}`);
    process.exit(1);
  }

  const rawCanonical = JSON.parse(fs.readFileSync(CANONICAL_PATH, 'utf-8'));
  console.log(`Loaded ${rawCanonical.length} canonical machine records from snapshot.\n`);

  // Step 1: Check database connection and verify table exists
  console.log('Step 1: Checking Supabase connection and schema...');
  const { data: existingProducts, error: fetchErr } = await supabase
    .from('products')
    .select('id, slug, model_code, name, uk_description, meta_title, meta_description, migration_status, needs_review');

  if (fetchErr) {
    if (fetchErr.code === 'PGRST205' || fetchErr.message.includes('schema cache')) {
      console.error('\n[CRITICAL ERROR] The `products` table does not exist in the active Supabase project.');
      console.error('Please run the migration scripts (e.g. 000_clean_schema.sql and 025_products_migration_status.sql)');
      console.error('in your Supabase SQL Editor first.\n');
    } else {
      console.error('[DB ERROR]', fetchErr.message);
    }
    process.exit(1);
  }

  console.log(`Successfully connected! Found ${existingProducts?.length || 0} existing products in DB.\n`);

  const existingMap = new Map<string, any>();
  existingProducts?.forEach(p => existingMap.set(p.slug, p));

  const report = {
    generated_at: new Date().toISOString(),
    total_source_machines: rawCanonical.length,
    total_existing_db_machines: existingProducts?.length || 0,
    summary: {
      new_inserted: 0,
      matched_unchanged: 0,
      updated: 0,
      needs_review: 0,
      errors: 0
    },
    records: [] as Array<{
      slug: string;
      model_code: string;
      name: string;
      category: string;
      migration_status: string;
      needs_review: boolean;
      review_reasons: string[];
      has_image: boolean;
      has_pdf: boolean;
      has_pressure: boolean;
      has_flow: boolean;
      error?: string;
    }>
  };

  console.log('Step 2: Reconciling and upserting machines...');

  for (let i = 0; i < rawCanonical.length; i++) {
    const item = rawCanonical[i];
    const existing = existingMap.get(item.slug);

    const reviewReasons: string[] = [];
    if (!item.primary_image_url) reviewReasons.push('Missing primary image');
    if (!item.flow_rate_lpm && !item.flow_rate_gpm) reviewReasons.push('Missing flow rate');
    if (!item.pressure_bar && !item.pressure_psi) reviewReasons.push('Missing pressure rating');
    if (!item.pdf_spec_url && !item.pdf_brochure_url) reviewReasons.push('Missing PDF spec or brochure');

    const needsReview = reviewReasons.length > 0;
    let migrationStatus = existing ? 'matched' : 'new';
    if (needsReview) {
      migrationStatus = existing ? 'updated' : 'new';
    }

    // Preserve UK editorial customizations if already modified in DB
    const finalUkDescription = (existing?.uk_description && existing.uk_description.trim() !== '')
      ? existing.uk_description
      : item.uk_description;

    const finalMetaTitle = (existing?.meta_title && existing.meta_title.trim() !== '')
      ? existing.meta_title
      : item.meta_title;

    const finalMetaDescription = (existing?.meta_description && existing.meta_description.trim() !== '')
      ? existing.meta_description
      : item.meta_description;

    const recordToUpsert = {
      ...item,
      uk_description: finalUkDescription,
      meta_title: finalMetaTitle,
      meta_description: finalMetaDescription,
      needs_review: needsReview,
      migration_status: migrationStatus,
      source_verified_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Upsert into Supabase
    const { error: upsertErr } = await supabase
      .from('products')
      .upsert(recordToUpsert, { onConflict: 'slug' });

    if (upsertErr) {
      console.error(`  [FAIL] ${item.slug}: ${upsertErr.message}`);
      report.summary.errors++;
      report.records.push({
        slug: item.slug,
        model_code: item.model_code,
        name: item.name,
        category: item.category,
        migration_status: 'error',
        needs_review: true,
        review_reasons: reviewReasons,
        has_image: !!item.primary_image_url,
        has_pdf: !!(item.pdf_spec_url || item.pdf_brochure_url),
        has_pressure: !!(item.pressure_bar || item.pressure_psi),
        has_flow: !!(item.flow_rate_lpm || item.flow_rate_gpm),
        error: upsertErr.message
      });
    } else {
      if (!existing) {
        report.summary.new_inserted++;
      } else {
        report.summary.matched_unchanged++;
      }
      if (needsReview) {
        report.summary.needs_review++;
      }

      report.records.push({
        slug: item.slug,
        model_code: item.model_code,
        name: item.name,
        category: item.category,
        migration_status: migrationStatus,
        needs_review: needsReview,
        review_reasons: reviewReasons,
        has_image: !!item.primary_image_url,
        has_pdf: !!(item.pdf_spec_url || item.pdf_brochure_url),
        has_pressure: !!(item.pressure_bar || item.pressure_psi),
        has_flow: !!(item.flow_rate_lpm || item.flow_rate_gpm)
      });
    }
  }

  // Step 3: Write reconciliation report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log(`\nReconciliation report written to: ${REPORT_PATH}`);

  console.log('\n===========================================================');
  console.log('MIGRATION SUMMARY');
  console.log('===========================================================');
  console.log(`Total Source Machines:   ${report.total_source_machines}`);
  console.log(`Newly Inserted:          ${report.summary.new_inserted}`);
  console.log(`Matched (Existing):      ${report.summary.matched_unchanged}`);
  console.log(`Needing Review:          ${report.summary.needs_review}`);
  console.log(`Errors:                  ${report.summary.errors}`);
  console.log('===========================================================\n');
}

main().catch(err => {
  console.error('Fatal error running seed script:', err);
  process.exit(1);
});
