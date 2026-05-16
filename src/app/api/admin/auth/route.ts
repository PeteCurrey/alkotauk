import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Email check — configurable via env var
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@alkota.co.uk';
    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    let valid = false;

    // Path 1: plaintext env var (easy override without pre-hashing)
    const adminPasswordPlain = process.env.ADMIN_PASSWORD;
    if (adminPasswordPlain) {
      valid = password === adminPasswordPlain;
    } else {
      // Path 2: bcrypt hash comparison
      // Default hash is for: Alkota1964!! (via override or updated hash)
      // Override via ADMIN_PASSWORD_HASH env var, or set ADMIN_PASSWORD as plaintext.
      // Generate a new hash: await bcrypt.hash('yourpassword', 12)
      const hash =
        process.env.ADMIN_PASSWORD_HASH ||
        '$2b$12$xQkJ3vVz7nHQdGkPwR6uFOp5YRHE8IbHx9HkEMmPJXLBzNwW0YKOi';
      valid = await bcrypt.compare(password, hash);
    }

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
