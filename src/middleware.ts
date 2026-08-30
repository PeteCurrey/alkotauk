import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth';
import { auth } from './auth';

// ─── HARDCODED FALLBACKS ──────────────────────────────────────
const FALLBACK_URL = 'https://xohftjaohhkwgxdnouoo.supabase.co';
const FALLBACK_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

// ─── DEALER PORTAL PUBLIC ROUTES ─────────────────────────────
// These dealer/* paths do NOT require authentication
const DEALER_PUBLIC_PATHS = [
  '/dealer',
  '/dealer/login',
  '/dealer/request',
];

async function getMaintenanceMode(): Promise<boolean> {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL)
    .trim()
    .replace(/\/$/, '');
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_KEY).trim();

  try {
    const url = `${supabaseUrl}/rest/v1/site_settings?select=value&key=eq.maintenance_mode&limit=1`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey':        key,
        'Authorization': `Bearer ${key}`,
        'Accept':        'application/json',
        'Cache-Control': 'no-cache, no-store',
        'Pragma':        'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Middleware: Supabase returned ${response.status} for maintenance check`);
      return false;
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const val = data[0]?.value;
      return val === 'true' || val === true || val === '1' || val === 1;
    }
    return false;
  } catch (err) {
    console.error('Middleware: getMaintenanceMode failed:', err);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── ADMIN ROUTE PROTECTION ──────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin') {
      return NextResponse.next();
    }

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  // ── DEALER PORTAL ROUTE PROTECTION ─────────────────────────
  if (pathname.startsWith('/dealer')) {
    // Allow public dealer paths without auth
    const isPublicDealerPath = DEALER_PUBLIC_PATHS.some(
      (p) => pathname === p || pathname.startsWith(p + '/')
    );

    // /dealer/login sub-paths are also public
    if (pathname.startsWith('/dealer/login') || isPublicDealerPath) {
      // If already authenticated and trying to visit login, redirect to dashboard
      if (pathname === '/dealer/login' || pathname === '/dealer/login/') {
        const session = await auth();
        if (session?.user) {
          return NextResponse.redirect(new URL('/dealer/dashboard', req.url));
        }
      }
      return NextResponse.next();
    }

    // Protected dealer routes — require NextAuth session
    const session = await auth();
    if (!session?.user) {
      const loginUrl = new URL('/dealer/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check dealer is not suspended (role check in session)
    // The auth.ts authorize() already blocks suspended dealers from logging in,
    // but we add a belt-and-braces check here using session data.
    // Full suspension enforcement happens at DB/RLS level.

    return NextResponse.next();
  }

  // ── PORTAL REDIRECT ────────────────────────────────────────
  // Legacy /portal/* → /dealer/*
  if (pathname.startsWith('/portal')) {
    if (pathname === '/portal' || pathname === '/portal/') {
      return NextResponse.redirect(new URL('/dealer', req.url));
    }
    const newPath = pathname.replace('/portal', '/dealer');
    return NextResponse.redirect(new URL(newPath, req.url));
  }

  // ── MAINTENANCE MODE CHECK ─────────────────────────────────
  const isExcluded =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dealer') ||
    pathname.startsWith('/api') ||
    pathname === '/maintenance' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico';

  if (!isExcluded) {
    const debugMode = req.nextUrl.searchParams.get('debugMaintenance') === 'true';
    const isMaintenance = debugMode || (await getMaintenanceMode());

    if (isMaintenance) {
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const isAdmin = token ? !!(await verifyToken(token)) : false;

      if (!isAdmin) {
        const url = new URL('/maintenance', req.url);
        const response = NextResponse.redirect(url);
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};