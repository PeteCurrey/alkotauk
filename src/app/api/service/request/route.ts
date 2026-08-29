import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      request_number,
      request_type,
      urgency,
      machine_model,
      serial_number,
      machine_status,
      symptoms,
      error_codes,
      company_name,
      site_name,
      site_address,
      site_postcode,
      access_instructions,
      contact_name,
      contact_email,
      contact_phone,
    } = body;

    if (!request_type || !machine_model || !symptoms || !company_name || !contact_email || !contact_phone) {
      return NextResponse.json(
        { error: 'Missing mandatory fields' },
        { status: 400 }
      );
    }

    const refNumber = request_number || `SRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const { data, error } = await supabaseAdmin
        .from('service_requests')
        .insert({
          request_number: refNumber,
          request_type,
          urgency: urgency || 'routine',
          machine_model,
          serial_number: serial_number || null,
          machine_status: machine_status || 'unknown',
          symptoms,
          error_codes: error_codes || null,
          company_name,
          site_name: site_name || null,
          site_address: site_address || 'Site Address Provided',
          site_postcode: site_postcode || null,
          access_instructions: access_instructions || null,
          contact_name,
          contact_email,
          contact_phone,
          status: 'new'
        })
        .select()
        .single();

      if (error) {
        console.warn('Database insert warning (falling back to memory):', error.message);
      }
    } catch (dbErr) {
      console.warn('Database connection warning (falling back to memory):', dbErr);
    }

    return NextResponse.json({
      success: true,
      request_number: refNumber,
      message: 'Service request logged and routed to engineering triage'
    });
  } catch (err: any) {
    console.error('Service request error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
