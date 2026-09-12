import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getProducts } from '@/lib/products';
import { generateReference } from '@/lib/auth';
import { SubmitEnquiryPayload } from '@/lib/enquiries/schema';
import { revalidateMachineEnquiry, buildCanonicalEnquiryData } from '@/lib/machine-enquiries/service';

export async function POST(req: NextRequest) {
  try {
    const body: SubmitEnquiryPayload = await req.json();

    if (!body.customer?.name || !body.customer?.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // 1. Fetch products catalogue
    const allProducts = await getProducts();

    // 2. Extract machine identifiers
    const machineIdentifiers = (body.machines || []).map(m => m.identifier);

    // 3. Re-run authoritative server revalidation
    const revalidation = revalidateMachineEnquiry(
      {
        source: body.source === 'MACHINE_SELECTOR' ? 'machine_selector' :
                body.source === 'MACHINE_COMPARISON' ? 'machine_comparison' :
                body.source === 'MACHINE_DETAIL' ? 'direct_machine' : 'general',
        machineIdentifiers,
        rawRequirements: body.requirements,
      },
      allProducts
    );

    // 4. Generate reference
    const reference = generateReference(body.source === 'MACHINE_SELECTOR' ? 'quote' : 'contact');

    // 5. Build canonical data models
    const { enquiryRecord, machineRecords } = buildCanonicalEnquiryData({
      reference,
      source: body.source,
      context: body.context,
      customer: body.customer,
      subject: body.subject,
      message: body.message,
      siteReadiness: body.siteReadiness,
      rawRequirements: body.requirements,
      revalidation,
      attribution: body.attribution ? {
        source_page: body.attribution.sourcePage,
        utm_source: body.attribution.utmSource,
        utm_medium: body.attribution.utmMedium,
        utm_campaign: body.attribution.utmCampaign,
        dealer_id: body.attribution.dealerId,
      } : undefined,
    });

    // Also populate legacy type for backwards compatibility with older admin filters
    const dbPayload = {
      ...enquiryRecord,
      type: body.source === 'MACHINE_SELECTOR' ? 'quote' : 'contact',
      metadata: {
        canonical_source: body.source,
        enquiry_context: enquiryRecord.enquiry_context,
        machines: revalidation.enquiryMachines,
        revalidation_result: revalidation.revalidationResult,
        site_readiness: body.siteReadiness,
      },
    };

    // 6. Insert parent enquiry record
    const { data: savedEnquiry, error: dbError } = await supabaseAdmin
      .from('enquiries')
      .insert(dbPayload)
      .select()
      .single();

    if (dbError) {
      console.error('[API/Enquiries] Failed to save enquiry to Supabase:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const enquiryId = savedEnquiry?.id;

    // 7. Insert normalised enquiry_machines records if machines are present
    if (enquiryId && machineRecords.length > 0) {
      const machineRows = machineRecords.map(m => ({
        ...m,
        enquiry_id: enquiryId,
      }));

      const { error: machinesError } = await supabaseAdmin
        .from('enquiry_machines')
        .insert(machineRows);

      if (machinesError) {
        console.warn('[API/Enquiries] Could not insert enquiry_machines (schema may need migration):', machinesError.message);
      }
    }

    return NextResponse.json({
      success: true,
      reference,
      enquiry_id: enquiryId,
      message: 'Enquiry received and verified by Alkota UK engineering.',
    });
  } catch (err: any) {
    console.error('[API/Enquiries] Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
