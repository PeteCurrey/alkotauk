import * as fs from 'fs';
import * as path from 'path';
import { ingestSupplierCatalogue, RawSupplierItem } from '../src/lib/parts/supplier-ingestion';

async function run() {
  const args = process.argv.slice(2);
  const supplierSlug = args[0] || 'dual-pumps-uk';
  const dataFile = args[1] || (
    supplierSlug === 'steel-eagle-direct' 
      ? 'scripts/data/steel-eagle-authoritative.json'
      : 'scripts/data/dual-pumps-authoritative.json'
  );

  console.log(`\n======================================================`);
  console.log(`  ALKOTA UK — SUPPLIER CATALOGUE INGESTION PIPELINE  `);
  console.log(`======================================================`);
  console.log(`Supplier Slug:   ${supplierSlug}`);
  console.log(`Catalogue File:  ${dataFile}`);

  const filePath = path.resolve(process.cwd(), dataFile);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }

  const rawData: RawSupplierItem[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Loaded ${rawData.length} raw supplier records.`);
  console.log(`Executing staged pipeline (normalisation -> validation -> duplicate check -> category mapping -> scoring -> staging)...`);

  try {
    const result = await ingestSupplierCatalogue(rawData, {
      supplierSlug,
      triggerMethod: 'file_upload',
      sourceVersion: '2026.1',
      sourceDocument: path.basename(dataFile),
      defaultMarginPct: supplierSlug === 'steel-eagle-direct' ? 40.0 : 35.0,
    });

    console.log(`\n------------------------------------------------------`);
    console.log(`  INGESTION SUMMARY — BATCH ID: ${result.batchId}  `);
    console.log(`------------------------------------------------------`);
    console.log(`Supplier:              ${result.supplierName} (${result.supplierId})`);
    console.log(`Records Received:      ${result.recordsReceived}`);
    console.log(`Records Valid:         ${result.recordsValid}`);
    console.log(`Records Invalid:       ${result.recordsInvalid}`);
    console.log(`New Products:          ${result.recordsNew}`);
    console.log(`Potential Duplicates:  ${result.recordsDuplicates}`);
    console.log(`Needs Review:          ${result.recordsReview}`);
    console.log(`Approved:              ${result.recordsApproved}`);
    console.log(`Published:             ${result.recordsPublished}`);
    if (result.unmappedCategories.length > 0) {
      console.log(`Unmapped Categories:   ${result.unmappedCategories.join(', ')}`);
    } else {
      console.log(`Category Mapping:      100% Mapped to Alkota Taxonomy`);
    }
    console.log(`------------------------------------------------------\n`);
    console.log(`✅ Staging successful! Records are quarantined in staged_supplier_products.`);
    console.log(`   Review and approve via Admin Studio at /admin/parts/imports or /admin/parts/staging.`);
  } catch (err: any) {
    console.error(`\n❌ Ingestion Failed:`, err.message);
    process.exit(1);
  }
}

run();
