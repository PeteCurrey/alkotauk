import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('wash_plant_projects')
      .select(`
        id, reference, project_name, case_study_slug, case_study_sector,
        case_study_challenge, case_study_scope, case_study_architecture,
        case_study_water_solution, case_study_automation, case_study_throughput,
        client_testimonial, client_testimonial_approved, photo_urls, visibility,
        published, created_at
      `)
      .eq('published', true)
      .in('visibility', ['public', 'anonymised'])
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[wash-plant/projects GET] DB query warning:', error.message);
      return NextResponse.json([]);
    }
    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error('[wash-plant/projects GET]', err);
    return NextResponse.json([], { status: 500 });
  }
}
