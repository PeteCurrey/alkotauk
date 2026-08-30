import { NextRequest, NextResponse } from 'next/server';
import { searchParts } from '@/lib/parts/search-engine';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const subcategory = searchParams.get('subcategory') || undefined;
    const brand = searchParams.get('brand') || undefined;
    const machineModel = searchParams.get('model') || undefined;
    const inStockOnly = searchParams.get('available') === 'yes';
    const sortBy = (searchParams.get('sort') as any) || 'relevance';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '24', 10);

    const result = await searchParts({
      query,
      category,
      subcategory,
      brand,
      machineModel,
      inStockOnly,
      sortBy,
      page,
      limit,
      logAnalytics: true,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Parts search API error:', err);
    return NextResponse.json({ error: err.message || 'Search failed' }, { status: 500 });
  }
}
