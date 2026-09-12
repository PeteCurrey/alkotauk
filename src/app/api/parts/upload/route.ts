import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Validate MIME type (JPG, PNG, WEBP)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload a clear JPG, PNG, or WEBP photo.' },
        { status: 400 }
      );
    }

    // 2. Validate file size (max 5MB)
    const MAX_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Photo exceeds maximum upload limit of 5MB.' },
        { status: 400 }
      );
    }

    // 3. Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Sanitize filename
    const sanitizedBase = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `part-requests/${Date.now()}-${sanitizedBase}`;

    // 5. Upload to media bucket
    const { error: uploadError } = await supabaseAdmin.storage
      .from('media')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error('Customer photo upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // 6. Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('media')
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (err: any) {
    console.error('Photo upload handler exception:', err);
    return NextResponse.json({ error: err.message || 'Internal upload error' }, { status: 500 });
  }
}
