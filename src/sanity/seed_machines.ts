import { createClient } from '@sanity/client';
import { MACHINES } from '../lib/machines';
const client = createClient({
  projectId: 'pa54q49w',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-29',
  token: 'skUjyZjJZLGk56DJGWDeqGMiprwJJK2N9DaCmzNQa5i9QxuwswgS9uXiSQrTpV06E9XqH4NUZysRK1LCSHCtj1vSQYc58U87Bc4juqsT2uWJIMlo7pQk1o59C3d3J37eqZtMOMFT66IOM3bpRbTQOr6jWHf5QS357W3RHWDpEqiPCvyW6pbR',
});

async function seed() {
  console.log('--- STARTING ALKOTA MACHINE MIGRATION ---');
  
  // 1. Collect unique Series
  const uniqueSeriesNames = Array.from(new Set(MACHINES.map(m => m.series)));
  const seriesMap: Record<string, string> = {};

  console.log(`Phase 1: Syncing ${uniqueSeriesNames.length} Machine Series...`);
  
  for (const seriesName of uniqueSeriesNames) {
    const isElite = seriesName.toLowerCase().includes('elite');
    const slug = seriesName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const doc = {
      _type: 'machineSeries',
      _id: `series-${slug}`,
      name: seriesName,
      slug: { _type: 'slug', current: slug },
      isEliteSeries: isElite,
    };

    const result = await client.createOrReplace(doc);
    seriesMap[seriesName] = result._id;
    console.log(`  [OK] Series: ${seriesName}`);
  }

  console.log(`Phase 2: Syncing ${MACHINES.length} Machine Models...`);

  for (const m of MACHINES) {
    const slugCurrent = m.slug.split('/').pop() || m.id;
    
    const doc = {
      _type: 'machine',
      _id: `machine-${m.id}`,
      name: m.name,
      modelCode: m.id.toUpperCase(),
      slug: { _type: 'slug', current: slugCurrent },
      tagline: m.description,
      category: m.type,
      isEliteSeries: m.series.toLowerCase().includes('elite'),
      series: {
        _type: 'reference',
        _ref: seriesMap[m.series],
      },
      specs: {
        flowRateLPM: parseFloat(m.specs.flowLPM) || 0,
        flowRateGPM: (parseFloat(m.specs.flowLPM) / 3.785) || 0,
        pressureBar: parseFloat(m.specs.pressureBar) || 0,
        pressurePSI: (parseFloat(m.specs.pressureBar) * 14.5038) || 0,
        powerSource: m.specs.powerSource,
        engineType: m.specs.engine,
        motorVoltage: m.specs.voltageOptions,
        coilWarrantyYears: parseInt(m.specs.coilWarranty) || 7,
      },
      eliteFeatures: m.highlights,
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  [OK] Machine: ${m.name} (${m.id})`);
    } catch (err) {
      console.error(`  [ERR] Failed to sync ${m.name}:`, (err as Error).message);
    }
  }

  console.log('--- MIGRATION COMPLETE ---');
}

seed().catch(err => {
  console.error('Fatal Migration Error:', err);
  process.exit(1);
});
