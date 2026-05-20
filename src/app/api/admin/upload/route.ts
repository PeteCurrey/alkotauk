import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function POST(req: NextRequest) {
  // 1. Authenticate Admin
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2. Validate file type & size (10MB limit)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed.' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds the 10MB limit.' }, { status: 400 });
    }

    // 3. Ensure "media" bucket exists
    try {
      await supabaseAdmin.storage.createBucket('media', { public: true });
    } catch (e) {
      // Bucket already exists, ignore
    }

    // 4. Convert file to buffer and upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Sanitize filename to avoid weird character issues
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const folder = file.type.startsWith('image/') ? 'images' : 'documents';
    const filePath = `${folder}/${Date.now()}-${sanitizedName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from('media')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadError) {
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
    }

    // 5. Build public URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xohftjaohhkwgxdnouoo.supabase.co';
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/media/${filePath}`;

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'An error occurred during upload' }, { status: 500 });
  }
}
