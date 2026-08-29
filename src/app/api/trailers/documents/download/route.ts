import { NextRequest, NextResponse } from 'next/server';
import { generateSignedDocumentUrl, StorageVisibility } from '@/lib/trailers/storage';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storagePath, visibility, buildOrgId, buildCode } = body;

    if (!storagePath || !visibility) {
      return NextResponse.json(
        { error: 'Missing required storage parameters (storagePath, visibility).' },
        { status: 400 }
      );
    }

    // Check auth cookie if present
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const authSession = token ? await verifyToken(token) : null;
    const requestingOrgId = authSession ? (authSession as any).orgId || 'admin-root' : undefined;

    const result = await generateSignedDocumentUrl({
      storagePath,
      visibility: visibility as StorageVisibility,
      requestingOrgId,
      buildOrgId,
      expiresInSeconds: 3600, // 1 hour expiration
    });

    if (!result.authorized) {
      return NextResponse.json({ error: result.error || 'Access denied.' }, { status: 403 });
    }

    if (!result.signedUrl) {
      return NextResponse.json(
        { error: result.error || 'Document binary temporarily unavailable.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      signedUrl: result.signedUrl,
      expiresIn: 3600,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal document retrieval error.' },
      { status: 500 }
    );
  }
}
