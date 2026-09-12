import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customer_name,
      company,
      email,
      phone,
      postcode,
      machine_model,
      serial_number,
      urgency = 'standard',
      notes,
      requested_parts = [],
      photo_urls = [],
    } = body;

    if (!customer_name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required to submit an identification request.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('part_requests')
      .insert({
        customer_name: customer_name.trim(),
        company: company ? company.trim() : null,
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        postcode: postcode ? postcode.trim().toUpperCase() : null,
        machine_model: machine_model ? machine_model.trim() : null,
        serial_number: serial_number ? serial_number.trim() : null,
        urgency,
        notes: notes ? notes.trim() : null,
        requested_parts: Array.isArray(requested_parts) ? requested_parts : [],
        photo_urls: Array.isArray(photo_urls) ? photo_urls : [],
        status: 'new',
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Failed to create part request in database:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      reference_id: data.id,
      formatted_ref: `PR-${data.id.slice(0, 8).toUpperCase()}`,
      message: 'Part identification request successfully logged. Our workshop team will review your request within 24 hours.',
    });
  } catch (err: any) {
    console.error('Part requests endpoint error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
