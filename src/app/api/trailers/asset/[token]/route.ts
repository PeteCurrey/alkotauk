import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_DELIVERED_ASSET } from '@/lib/trailers/build-project-data';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const asset = SAMPLE_DELIVERED_ASSET;

  const isMatch = token === asset.qr_token || token.length >= 8;

  if (!isMatch) {
    return NextResponse.json(
      { error: 'Asset QR token not found or revoked' },
      { status: 404 }
    );
  }

  // Strictly sanitized public payload — NEVER include customer identity, internal notes, pricing, serials or DB IDs
  const publicPayload = {
    build_reference: asset.build_reference,
    system_name: 'Alkota Enclosed Dual-Operator Mobile Rig',
    support_phone: '0800 000 0000',
    support_email: 'service@alkota.co.uk',
    service_request_url: `/my-alkota/builds/${asset.build_code}/service`,
    public_documents: asset.handover_documents
      .filter(d => d.customer_visible)
      .map(d => ({
        title: d.title,
        type: d.type,
        url: d.url,
      })),
  };

  return NextResponse.json(publicPayload);
}
