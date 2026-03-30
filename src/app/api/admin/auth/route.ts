import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@alkota.co.uk';
    if (email !== adminEmail) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Fetch password hash from Supabase admin_config
    const { data, error } = await supabaseAdmin
      .from('admin_config')
      .select('value')
      .eq('key', 'password_hash')
      .single();

    if (error || !data?.value) {
      console.error('Failed to fetch password hash:', error);
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const hash = data.value;

    // Verify password
    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign JWT
    const token = await signToken({ email, role: 'admin', iat: Date.now() });

    // Set httpOnly cookie
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
