import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * DEPRECATED — This route previously seeded the old database from the
 * hard-coded machines.ts file. Phase 02 replaced that with:
 *
 *   scripts/import-alkota-products.ts
 *
 * which crawls the Alkota USA product catalogue, normalises specs to
 * British units and upserts 127 products directly to Supabase.
 *
 * Run the importer with:
 *   npx tsx --env-file=.env.local scripts/import-alkota-products.ts
 */
export async function GET() {
  return NextResponse.json(
    {
      deprecated: true,
      message:
        'This migration route is deprecated. Use the canonical importer script: npx tsx --env-file=.env.local scripts/import-alkota-products.ts',
    },
    { status: 410 },
  );
}
