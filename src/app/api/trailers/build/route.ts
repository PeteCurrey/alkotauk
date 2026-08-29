import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateBuildCode } from '@/lib/trailers/configurator-data';
import { generateReference } from '@/lib/auth';

// ─── POST /api/trailers/build — Save a new configuration ─────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buildCode = body.build_code || generateBuildCode();

    // Upsert: if build_code already exists, update it
    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .insert({
        type: 'trailer-build',
        status: 'new',
        reference: buildCode,
        name: body.contact?.name || 'Anonymous Build',
        email: body.contact?.email || null,
        company: body.contact?.company || null,
        phone: body.contact?.phone || null,
        subject: `Alkota Trailer Build — ${buildCode}`,
        message: body.contact?.notes || null,
        metadata: {
          build_code: buildCode,
          format: body.format,
          chassis_id: body.chassis_id,
          machine_id: body.machine_id,
          operator_count: body.operator_count,
          water_storage_id: body.water_storage_id,
          power_options: body.power_options,
          recovery_option_id: body.recovery_option_id,
          hose_storage_options: body.hose_storage_options,
          site_options: body.site_options,
          finish_livery_id: body.finish_livery_id,
          custom_body_color: body.custom_body_color,
          operational_context: body.operational_context,
          weights: body.weights,
          endurance: body.endurance,
        },
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving trailer build:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      build_code: buildCode,
      id: data.id,
    });
  } catch (err) {
    console.error('Trailer build API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ─── GET /api/trailers/build?code=AKT-XXXXXX-UK — Retrieve a build ──────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Build code required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .select('*')
      .eq('reference', code)
      .eq('type', 'trailer-build')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Build not found' }, { status: 404 });
    }

    return NextResponse.json({
      build_code: data.reference,
      created_at: data.created_at,
      contact: {
        name: data.name,
        company: data.company,
        email: data.email,
      },
      ...(data.metadata || {}),
    });
  } catch (err) {
    console.error('Trailer build retrieval error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
