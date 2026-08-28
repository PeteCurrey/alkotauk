import { NextRequest, NextResponse } from 'next/server';
import { findDealersByLocation, getDealers } from '@/lib/dealers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postcode = searchParams.get('postcode') || undefined;
    const service = searchParams.get('service') || undefined;
    const category = searchParams.get('category') || undefined;

    if (postcode || service || category) {
      const result = await findDealersByLocation({
        postcode,
        serviceFilter: service,
        categoryFilter: category,
      });
      return NextResponse.json({
        dealers: result.dealers,
        searchLocation: result.searchLocation,
      });
    }

    const dealers = await getDealers({ onlyActive: true });
    return NextResponse.json({ dealers });
  } catch (err: any) {
    console.error('API /api/dealers error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
