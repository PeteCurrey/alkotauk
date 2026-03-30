import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, message, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const { supabaseAdmin } = await import('@/lib/supabase/server');

    const { data: enquiry, error: supabaseError } = await supabaseAdmin
      .from('enquiries')
      .insert({
        type: source || 'contact',
        name,
        email,
        company: company || '',
        phone: phone || '',
        message: message || '',
        status: 'new',
        metadata: { source: source || 'unknown' }
      })
      .select()
      .single();

    if (supabaseError) {
      console.error('Supabase enquiry creation failed:', supabaseError);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Enquiry captured', id: enquiry.id }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
