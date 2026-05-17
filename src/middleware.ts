import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// HARDCODED FALLBACKS (Use these if environment variables are missing)
const FALLBACK_URL = 'https://xohftjaohhkwgxdnouoo.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

// Maintenance mode check logic (Direct fetch to bypass SDK issues in Edge)
async function getMaintenanceMode(): Promise<boolean> {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL).trim().replace(/\/$/, '');
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_KEY).trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

  if (!supabaseUrl) return false;

  const keysToTry = [serviceKey, anonKey].filter(Boolean);

  for (const key of keysToTry) {
    try {
      const baseUrl = supabaseUrl.includes('/rest/v1') ? supabaseUrl : `${supabaseUrl}/rest/v1`;
      const url = `${baseUrl}/site_settings?select=key,value`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apiKey': key,
          'Authorization': `Bearer ${key}`,
          'Accept': 'application/json',
          'Accept-Profile': 'public',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          return data.some((row: any) => {
            const isRelevantKey = ['maintenance_mode', 'site_maintenance', 'maintenance'].includes(row.key);
            if (!isRelevantKey) return false;

            const val = row.value;
            if (val === true || val === 'true' || val === 1 || val === '1') return true;
            if (typeof val === 'string' && (val.toLowerCase() === 'true' || val.toLowerCase() === 'on')) return true;
            return false;
          });
        }
      }
    } catch (err) {
      console.error('Middleware: Maintenance check failed', err);
    }
  }

  return false;
}

export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── EXCLUSIONS ────────────────────────────────────────────────────────────
  const isExcluded = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/api') || 
    pathname === '/maintenance' ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') || 
    pathname === '/favicon.ico';

  // ── ADMIN ROUTE PROTECTION ───────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin') return NextResponse.next();
    
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) return NextResponse.redirect(new URL('/admin', req.url));
    
    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/admin', req.url));
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  // ── MAINTENANCE MODE CHECK ────────────────────────────────────────────────
  if (!isExcluded) {
    const debugMode = req.nextUrl.searchParams.get('debugMaintenance') === 'true';
    const isMaintenance = debugMode || (await getMaintenanceMode());
    
    if (isMaintenance) {
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const isAdmin = token ? !!(await verifyToken(token)) : false;
      
      if (!isAdmin) {
        const response = NextResponse.redirect(new URL('/maintenance', req.url));
        // Force the browser and CDN to never cache this redirect response
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
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};