import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Email check — configurable via Vercel env var
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@alkota.co.uk';
    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Password hash — set ADMIN_PASSWORD_HASH in Vercel to override.
    // This pre-generated hash is for: Alkota2024!!
    // To generate a new hash: bcrypt.hash('yourpassword', 12)
    const hash =
      process.env.ADMIN_PASSWORD_HASH ||
      '$2b$12$AHMmHHH6sDv1DGkVW6GOdej4F5e5DcnyTpNS0AzRrtFV2ZVjkvR0a';

    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign JWT and set httpOnly cookie
    const token = await signToken({ email, role: 'admin', iat: Date.now() });
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
