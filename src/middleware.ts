import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// Edge-compatible Supabase client for middleware
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail-safe initialization for middleware
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Maintenance mode cache
let maintenanceModeCache: { value: boolean; expiresAt: number } | null = null;

// Maintenance mode check is currently disabled for emergency stabilization
async function getMaintenanceMode(): Promise<boolean> {
  return false;
}

export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── ADMIN ROUTE PROTECTION ───────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin') {
      return NextResponse.next();
    }
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin', req.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  // Allow all /api/admin/* and /api/site-settings through
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/site-settings')) {
    return NextResponse.next();
  }

  // Always allow the maintenance page itself
  if (pathname === '/maintenance') {
    return NextResponse.next();
  }

  // Set header to access URL in layouts
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};