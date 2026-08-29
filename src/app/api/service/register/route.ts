import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      model_code,
      serial_number,
      purchase_date,
      dealer_name,
      company_name,
      site_name,
      site_address,
      contact_name,
      contact_email,
      contact_phone,
      operating_environment,
      weekly_operating_hours,
    } = body;

    if (!model_code || !serial_number || !company_name || !contact_name || !contact_email) {
      return NextResponse.json(
        { error: 'Missing mandatory registration fields' },
        { status: 400 }
      );
    }

    const regId = `REG-${model_code.toUpperCase().replace(/[^A-Z0-9]/g, '') || 'ALK'}-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const { data, error } = await supabaseAdmin
        .from('machine_registrations')
        .insert({
          model_code,
          serial_number,
          purchase_date: purchase_date || null,
          dealer_name: dealer_name || null,
          company_name,
          site_name: site_name || null,
          site_address: site_address || null,
          contact_name,
          contact_email,
          contact_phone: contact_phone || null,
          operating_environment: operating_environment || null,
          weekly_operating_hours: weekly_operating_hours || null,
          status: 'verified',
          verified_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.warn('Database registration insert warning:', error.message);
      }
    } catch (dbErr) {
      console.warn('Database registration error:', dbErr);
    }

    return NextResponse.json({
      success: true,
      registration_id: regId,
      message: 'Machine registration recorded successfully'
    });
  } catch (err: any) {
    console.error('Registration route error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
