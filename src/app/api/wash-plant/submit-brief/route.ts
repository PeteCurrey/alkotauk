import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Generate human-readable project reference
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const reference = `WP-${year}-${random}`;
    
    const step1 = body.architect_data?.step1 || {};
    const step4 = body.architect_data?.step4 || {};
    const step5 = body.architect_data?.step5 || {};
    const step6 = body.architect_data?.step6 || {};
    const step7 = body.architect_data?.step7 || {};
    const step8 = body.architect_data?.step8 || {};
    const step9 = body.architect_data?.step9 || {};

    let estimatedGbp: number | null = null;
    if (step8.budget_band === '< £100k') estimatedGbp = 75000;
    else if (step8.budget_band === '£100k–£250k') estimatedGbp = 175000;
    else if (step8.budget_band === '£250k–£500k') estimatedGbp = 375000;
    else if (step8.budget_band === '£500k–£1m') estimatedGbp = 750000;
    else if (step8.budget_band === '£1m+') estimatedGbp = 1250000;

    const { data, error } = await supabaseAdmin
      .from('wash_plant_projects')
      .insert({
        reference,
        status: 'new_enquiry',
        client_name: body.name || 'Commercial Client',
        client_company: body.company || 'Enterprise Specifier',
        client_email: body.email,
        client_phone: body.phone,
        site_location: body.site_location || step7.site_location || '',
        project_name: body.project_name || `${body.company || 'Industrial'} Wash Plant Project`,
        estimated_value_gbp: estimatedGbp,
        probability_pct: 50,
        architect_data: body.architect_data || {},
        application: step1.asset_types || [],
        asset_types: step1.asset_types || [],
        throughput_description: body.architect_data?.step3 ? `${body.architect_data.step3.assets_per_hour || 'N/A'} assets/hr, ${body.architect_data.step3.operating_hours_per_day || 'N/A'} hrs/day` : '',
        contamination_profile: step4.contamination || [],
        automation_level: step5.preference || 'advise_me',
        water_strategy: typeof step6 === 'object' ? JSON.stringify(step6) : String(step6),
        site_type: step7.site_type || 'existing_facility',
        budget_band: step8.budget_band || 'Not yet established',
        target_date: step8.target_date || 'Flexible',
        procurement_route: step8.procurement_route || 'Direct Award',
        service_requirements: step9.requirements || [],
        service_opportunity: true,
      })
      .select('id, reference')
      .single();

    if (error) {
      console.error('[wash-plant/submit-brief] DB error:', error);
      // Fallback: don't hard-crash if table migration hasn't run yet in Supabase
    }

    // Always create enquiry in canonical enquiries table
    try {
      await supabaseAdmin.from('enquiries').insert({
        type: 'wash-plant-project',
        status: 'new',
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        subject: `Wash Plant Project Brief — ${body.project_name || reference}`,
        message: `Budget: ${step8.budget_band || 'Not specified'}. Application: ${(step1.asset_types || []).join(', ')}. Site: ${body.site_location || 'UK'}.`,
        metadata: {
          wash_plant_project_id: data?.id || null,
          reference: data?.reference || reference,
          architect_data: body.architect_data
        },
        source_page: '/wash-plant/architect',
      });
    } catch (enqErr) {
      console.error('[wash-plant/submit-brief] Canonical enquiry error:', enqErr);
    }

    return NextResponse.json({
      success: true,
      reference: data?.reference || reference,
      id: data?.id || null
    });
  } catch (err: any) {
    console.error('[wash-plant/submit-brief]', err);
    return NextResponse.json({ error: 'Failed to submit brief', details: err?.message }, { status: 500 });
  }
}
