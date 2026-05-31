import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// HARDCODED FALLBACKS
const FALLBACK_URL = 'https://xohftjaohhkwgxdnouoo.supabase.co';
const FALLBACK_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

async function getMaintenanceMode(): Promise<boolean> {
  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
  )
    .trim()
    .replace(/\/$/, '');

  // Prefer service role key (bypasses RLS), fall back to anon
  const key = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    FALLBACK_KEY
  ).trim();

  try {
    // Filter directly to maintenance_mode row — faster + safer
    const url = `${supabaseUrl}/rest/v1/site_settings?select=value&key=eq.maintenance_mode&limit=1`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        // Supabase REST API requires lowercase 'apikey'
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        `Middleware: Supabase returned ${response.status} for maintenance check`
      );
      return false;
    }

    const data = await response.json();

    // data is an array of matching rows, e.g. [{ value: 'true' }]
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

  // ── EXCLUSIONS ─────────────────────────────────────────────────────────────
  // Never run maintenance check on admin, API, the maintenance page itself,
  // Next.js internals, or static assets.
  const isExcluded =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname === '/maintenance' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico';

  // ── ADMIN ROUTE PROTECTION ─────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next();
    if (pathname === '/admin') return NextResponse.next();

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.redirect(new URL('/admin/login', req.url));

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  // ── MAINTENANCE MODE CHECK ─────────────────────────────────────────────────
  if (!isExcluded) {
    // Allow ?debugMaintenance=true to force the maintenance screen in dev
    const debugMode =
      req.nextUrl.searchParams.get('debugMaintenance') === 'true';
    const isMaintenance = debugMode || (await getMaintenanceMode());

    if (isMaintenance) {
      // Admins with a valid session can still browse the live site
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const isAdmin = token ? !!(await verifyToken(token)) : false;

      if (!isAdmin) {
        const url = new URL('/maintenance', req.url);
        const response = NextResponse.redirect(url);
        response.headers.set(
          'Cache-Control',
          'no-store, no-cache, must-revalidate, max-age=0'
        );
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