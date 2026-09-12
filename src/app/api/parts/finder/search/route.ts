import { NextRequest, NextResponse } from 'next/server';
import { 
  lookupPartNumber, 
  lookupMachine, 
  attributeDiscovery 
} from '@/lib/parts/finder-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode') || 'part_number';

    if (mode === 'part_number') {
      const q = searchParams.get('q') || '';
      const result = await lookupPartNumber(q);
      return NextResponse.json(result);
    }

    if (mode === 'machine') {
      const machine = searchParams.get('machine') || searchParams.get('model') || '';
      const category = searchParams.get('category') || undefined;
      const result = await lookupMachine(machine, category);
      return NextResponse.json(result);
    }

    if (mode === 'attributes') {
      const category = searchParams.get('category') || 'all';
      const machineModel = searchParams.get('machineModel') || undefined;
      const description = searchParams.get('description') || undefined;

      // Extract dynamic attribute filters (keys starting with attr_)
      const attributes: Record<string, string> = {};
      searchParams.forEach((val, key) => {
        if (key.startsWith('attr_')) {
          attributes[key.replace('attr_', '')] = val;
        }
      });

      const result = await attributeDiscovery({
        category,
        attributes,
        machineModel,
        description,
      });

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: `Unsupported finder mode: ${mode}` }, { status: 400 });
  } catch (err: any) {
    console.error('Parts finder search API error:', err);
    return NextResponse.json({ error: err.message || 'Finder search failed' }, { status: 500 });
  }
}
