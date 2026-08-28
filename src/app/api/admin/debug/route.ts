import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  let payload = null;
  let error = null;
  if (token) {
    try {
      payload = await verifyToken(token);
    } catch (e: any) {
      error = e.message;
    }
  }

  return NextResponse.json({
    hasToken: !!token,
    payload,
    error,
    cookieName: COOKIE_NAME,
    edgeJwtSecret: process.env.JWT_SECRET ? 'defined' : 'undefined',
  });
}
