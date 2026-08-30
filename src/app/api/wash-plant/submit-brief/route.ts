import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Generate human-readable project reference
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const reference = body.architect_data?.reference || `WP-${year}-${random}`;
    
    const ad = body.architect_data || {};
    const step1 = ad.step1 || {};
    const step2 = ad.step2 || {};
    const step3 = ad.step3 || {};
    const step4 = ad.step4 || {};
    const step5 = ad.step5 || {};
    const step6 = ad.step6 || {};
    const step7 = ad.step7 || {};
    const step8 = ad.step8 || {};
    const step9 = ad.step9 || {};

    const applicationList: string[] = step1.applications || step1.asset_types || [];
    const contaminationList: string[] = step3.contamination_types || step4.contamination || [];
    const automationLevel: string = step5.automation || step5.preference || 'advise_me';
    const budgetBand: string = step9.budget_band || step8.budget_band || 'Not yet established';
    const targetDate: string = step8.target_timing || step8.target_date || 'Flexible';
    const procurementRoute: string = step8.procurement_route || 'Not established';
    const serviceReqs: string[] = step9.lifecycle || step9.requirements || [];

    let estimatedGbp: number | null = null;
    if (budgetBand === '< £100k' || budgetBand === 'Below £100k') estimatedGbp = 75000;
    else if (budgetBand === '£100k–£250k' || budgetBand === '£100k – £250k') estimatedGbp = 175000;
    else if (budgetBand === '£250k–£500k' || budgetBand === '£250k – £500k') estimatedGbp = 375000;
    else if (budgetBand === '£500k–£1m' || budgetBand === '£500k – £1m') estimatedGbp = 750000;
    else if (budgetBand === '£1m+') estimatedGbp = 1250000;

    const throughputDesc = step4.assets_per_day
      ? `${step4.assets_per_day} assets/day, ${step4.operating_hours || 'N/A'} duty`
      : step3.assets_per_hour
      ? `${step3.assets_per_hour} assets/hr`
      : '';

    // Insert project record with strict private visibility
    const { data, error } = await supabaseAdmin
      .from('wash_plant_projects')
      .insert({
        reference,
        status: 'new_enquiry',
        client_name: body.name || 'Commercial Client',
        client_company: body.company || 'Enterprise Specifier',
        client_email: body.email,
        client_phone: body.phone,
        site_location: body.site_location || step7.postcode || step7.site_location || '',
        project_name: body.project_name || `${body.company || 'Industrial'} Wash Plant Project`,
        estimated_value_gbp: estimatedGbp,
        probability_pct: 50,
        architect_data: ad,
        application: applicationList,
        asset_types: applicationList,
        throughput_description: throughputDesc,
        contamination_profile: contaminationList,
        automation_level: automationLevel,
        water_strategy: typeof step6 === 'object' ? JSON.stringify(step6) : String(step6),
        site_type: step7.site_type || step7.indoor_outdoor || 'existing_facility',
        budget_band: budgetBand,
        target_date: targetDate,
        procurement_route: procurementRoute,
        service_requirements: serviceReqs,
        service_opportunity: true,
        visibility: 'private',
        published: false,
      })
      .select('id, reference')
      .single();

    if (error) {
      console.error('[wash-plant/submit-brief] DB error:', error);
      // Fallback: table might be syncing, don't hard crash the client
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
        message: `Budget: ${budgetBand}. Application: ${applicationList.join(', ') || 'Not specified'}. Site: ${body.site_location || step7.postcode || 'UK'}. Open questions: ${(ad.open_questions || []).length}`,
        metadata: {
          wash_plant_project_id: data?.id || null,
          reference: data?.reference || reference,
          architect_data: ad
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
