import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { generateApplicationReference } from '@/lib/dealer-portal';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ['company_name', 'contact_name', 'email', 'phone', 'address_line1', 'town', 'postcode'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const reference = generateApplicationReference();

    // Check for duplicate application from same email
    const { data: existing } = await db
      .from('dealer_applications')
      .select('id, status')
      .eq('email', body.email.toLowerCase())
      .in('status', ['pending', 'under_review', 'more_info_required'])
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'An application from this email address is already under review. Please contact dealer@alkota.co.uk if you have a query.' },
        { status: 409 }
      );
    }

    // Insert application
    const { data: application, error } = await db
      .from('dealer_applications')
      .insert({
        // Company
        company_name:             body.company_name,
        trading_name:             body.trading_name || null,
        company_reg:              body.company_reg || null,
        vat_number:               body.vat_number || null,
        website:                  body.website || null,
        address_line1:            body.address_line1,
        address_line2:            body.address_line2 || null,
        town:                     body.town,
        county:                   body.county || null,
        postcode:                 body.postcode,
        country:                  body.country || 'United Kingdom',
        // Contact
        contact_name:             body.contact_name,
        job_title:                body.job_title || null,
        email:                    body.email.toLowerCase(),
        phone:                    body.phone,
        mobile:                   body.mobile || null,
        // Business
        years_in_business:        body.years_in_business ? parseInt(body.years_in_business) : null,
        num_employees:            body.num_employees ? parseInt(body.num_employees) : null,
        estimated_annual_sales:   body.estimated_annual_sales || null,
        current_brands_represented: body.current_brands_represented || null,
        current_pw_brands:        body.current_pw_brands || null,
        annual_pressure_washer_units: body.annual_pressure_washer_units ? parseInt(body.annual_pressure_washer_units) : null,
        industries_served:        body.industries_served || [],
        // Capabilities
        workshop_facilities:      !!body.workshop_facilities,
        mobile_service_capability: !!body.mobile_service_capability,
        service_van_count:        body.service_van_count ? parseInt(body.service_van_count) : 0,
        parts_service_capability: !!body.parts_service_capability,
        geographic_territory:     body.geographic_territory || null,
        territory_interest:       body.geographic_territory || '',
        // Interests
        dealer_interests:         body.dealer_interests || [],
        additional_notes:         body.additional_notes || null,
        // Status
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Application insert error:', error);
      return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
    }

    // TODO: Send confirmation email to applicant (email provider pending)
    // TODO: Send notification to Alkota admin team

    return NextResponse.json({ success: true, reference, applicationId: application.id }, { status: 201 });

  } catch (err: any) {
    console.error('POST /api/dealer/applications:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin-only: list all applications
  // TODO: Add admin JWT verification here when wiring up admin UI
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const limit  = parseInt(searchParams.get('limit') || '50');

  const db = getSupabaseAdmin();

  let query = db
    .from('dealer_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (status) query = query.eq('status', status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applications: data });
}
