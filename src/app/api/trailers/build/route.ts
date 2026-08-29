import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateBuildCode, CONFIGURATOR_SCHEMA_VERSION } from '@/lib/trailers/configurator-data';

// ─── POST /api/trailers/build — Save / Submit a trailer configuration ─────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanCode = body.build_code ? body.build_code.trim().toUpperCase() : generateBuildCode();

    const isEnquirySubmission = Boolean(body.contact && body.contact.email && body.contact.name);

    // Check if an existing record with this reference exists
    const { data: existing } = await supabaseAdmin
      .from('enquiries')
      .select('id, reference')
      .eq('reference', cleanCode)
      .eq('type', 'trailer-build')
      .maybeSingle();

    const metadataPayload = {
      schema_version: CONFIGURATOR_SCHEMA_VERSION,
      build_code: cleanCode,
      format: body.format || 'open-deck',
      chassis_id: body.chassis_id,
      machine_id: body.machine_id,
      operator_count: body.operator_count || 1,
      water_storage_id: body.water_storage_id,
      power_options: body.power_options || [],
      recovery_option_id: body.recovery_option_id || 'recovery-none',
      hose_storage_options: body.hose_storage_options || [],
      site_options: body.site_options || [],
      finish_livery_id: body.finish_livery_id,
      custom_body_color: body.custom_body_color,
      operational_context: body.operational_context,
      weights: body.weights,
      endurance: body.endurance,
      is_enquiry_submitted: isEnquirySubmission,
      last_updated: new Date().toISOString()
    };

    let resultId: string;

    if (existing) {
      // Update existing build record
      const updateData: Record<string, any> = {
        metadata: metadataPayload,
        updated_at: new Date().toISOString()
      };

      if (isEnquirySubmission) {
        updateData.name = body.contact.name.trim();
        updateData.email = body.contact.email.trim();
        updateData.company = body.contact.company?.trim() || null;
        updateData.phone = body.contact.phone?.trim() || null;
        updateData.postcode = body.contact.postcode?.trim() || null;
        updateData.message = body.contact.notes?.trim() || null;
        updateData.status = 'new';
        updateData.subject = `Alkota Trailer Enquiry — ${cleanCode}`;
      }

      const { data: updated, error: updateError } = await supabaseAdmin
        .from('enquiries')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating trailer build:', updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
      resultId = updated.id;
    } else {
      // Insert new build record
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from('enquiries')
        .insert({
          type: 'trailer-build',
          status: 'new',
          reference: cleanCode,
          name: isEnquirySubmission ? body.contact.name.trim() : 'Anonymous Saved Build',
          email: isEnquirySubmission ? body.contact.email.trim() : null,
          company: isEnquirySubmission ? body.contact.company?.trim() || null : null,
          phone: isEnquirySubmission ? body.contact.phone?.trim() || null : null,
          postcode: isEnquirySubmission ? body.contact.postcode?.trim() || null : null,
          subject: `Alkota Trailer Build — ${cleanCode}`,
          message: isEnquirySubmission ? body.contact.notes?.trim() || null : null,
          metadata: metadataPayload
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating trailer build:', insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
      resultId = inserted.id;
    }

    return NextResponse.json({
      success: true,
      build_code: cleanCode,
      id: resultId
    });
  } catch (err) {
    console.error('Trailer build API error:', err);
    return NextResponse.json({ error: 'Server error saving trailer configuration' }, { status: 500 });
  }
}

// ─── GET /api/trailers/build?code=AKT-XXXXXX-UK — Public configuration fetch ──
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Build code required' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .select('reference, created_at, updated_at, metadata')
      .eq('reference', cleanCode)
      .eq('type', 'trailer-build')
      .maybeSingle();

    if (error || !data) {
      return NextResponse.json({ error: 'Build code not found. Please verify the code or start a new configuration.' }, { status: 404 });
    }

    const meta = data.metadata || {};

    // SECURITY: NEVER return private contact data (name, email, phone, notes) to unauthenticated public GET requests!
    return NextResponse.json({
      build_code: data.reference,
      schema_version: meta.schema_version || '1.0.0',
      created_at: data.created_at,
      updated_at: data.updated_at,
      format: meta.format || 'open-deck',
      chassis_id: meta.chassis_id,
      machine_id: meta.machine_id,
      operator_count: meta.operator_count || 1,
      water_storage_id: meta.water_storage_id,
      power_options: meta.power_options || [],
      recovery_option_id: meta.recovery_option_id || 'recovery-none',
      hose_storage_options: meta.hose_storage_options || [],
      site_options: meta.site_options || [],
      finish_livery_id: meta.finish_livery_id,
      custom_body_color: meta.custom_body_color,
      operational_context: meta.operational_context || {},
      weights: meta.weights,
      endurance: meta.endurance
    });
  } catch (err) {
    console.error('Trailer build retrieval error:', err);
    return NextResponse.json({ error: 'Server error retrieving trailer configuration' }, { status: 500 });
  }
}
