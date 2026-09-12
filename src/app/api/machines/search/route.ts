import { NextRequest, NextResponse } from 'next/server';
import { getProducts, Product } from '@/lib/products';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').toLowerCase().trim();
    const category = searchParams.get('category') || undefined;
    const pressureMin = searchParams.get('pressure_min') ? parseInt(searchParams.get('pressure_min')!) : undefined;
    const pressureMax = searchParams.get('pressure_max') ? parseInt(searchParams.get('pressure_max')!) : undefined;
    const fuel = searchParams.get('fuel') || undefined;
    const powerSource = searchParams.get('power_source') || undefined;
    const slugsParam = searchParams.get('slugs');
    const modelsParam = searchParams.get('models');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;

    // Fetch products from database with fallback
    let products = await getProducts({ category, q });

    // Filter by explicit slugs
    if (slugsParam) {
      const slugList = slugsParam.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      if (slugList.length > 0) {
        products = products.filter(p => slugList.includes(p.slug.toLowerCase()));
      }
    }

    // Filter by explicit models
    if (modelsParam) {
      const modelList = modelsParam.split(',').map(m => m.trim().toLowerCase()).filter(Boolean);
      if (modelList.length > 0) {
        products = products.filter(p => 
          modelList.includes(p.model_code.toLowerCase()) || 
          modelList.includes(p.slug.toLowerCase()) ||
          modelList.includes(p.model_code.toLowerCase().replace(/^alkota-?/, ''))
        );
      }
    }

    // Apply granular technical filters
    if (pressureMin !== undefined) {
      products = products.filter(p => (p.pressure_bar || 0) >= pressureMin);
    }
    if (pressureMax !== undefined) {
      products = products.filter(p => (p.pressure_bar || 0) <= pressureMax);
    }
    if (fuel && fuel !== 'all') {
      const fLower = fuel.toLowerCase();
      products = products.filter(p => (p.heating_fuel || '').toLowerCase().includes(fLower));
    }
    if (powerSource && powerSource !== 'all') {
      const pLower = powerSource.toLowerCase();
      products = products.filter(p => (p.power_source || '').toLowerCase().includes(pLower));
    }

    const total = products.length;
    const results = products.slice(0, limit);

    return NextResponse.json({
      results,
      total
    });
  } catch (error: any) {
    console.error('Error in machines search API:', error);
    return NextResponse.json(
      { error: 'Failed to search machine catalogue', details: error.message },
      { status: 500 }
    );
  }
}
