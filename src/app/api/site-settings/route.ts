import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// Cache for 30 seconds
export const revalidate = 30;

export async function GET() {
  try {
    const { data: settings } = await supabaseAdmin
      .from('site_settings')
      .select('key, value')
      .in('key', ['maintenance_mode', 'maintenance_message', 'maintenance_phone', 'maintenance_lead_capture', 'maintenance_lead_heading']);

    const { data: banners } = await supabaseAdmin
      .from('banners')
      .select('*')
      .eq('active', true);

    const settingsMap: Record<string, string> = {};
    for (const row of settings ?? []) {
      settingsMap[row.key] = row.value;
    }

    return NextResponse.json(
      { ...settingsMap, banners: banners ?? [] },
      {
        headers: {
          'Cache-Control': 's-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch {
    // Return safe defaults if DB is unavailable
    return NextResponse.json({ maintenance_mode: 'false', banners: [] });
  }
}
