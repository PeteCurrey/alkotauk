import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// Edge-compatible Supabase client for middleware
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key to bypass RLS in middleware (it's server-side)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail-safe initialization for middleware
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

// Maintenance mode cache
let maintenanceModeCache: { value: boolean; expiresAt: number } | null = null;

async function getMaintenanceMode(): Promise<boolean> {
  const now = Date.now();
  // Shorten cache to 10s for better responsiveness during testing
  if (maintenanceModeCache && maintenanceModeCache.expiresAt > now) {
    return maintenanceModeCache.value;
  }

  if (!supabase) return false;

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'maintenance_mode')
      .maybeSingle();

    if (error) throw error;
    
    const isActive = data?.value === 'true';
    
    maintenanceModeCache = {
      value: isActive,
      expiresAt: now + 10000 // 10 second cache
    };

    return isActive;
  } catch (err) {
    console.error('Maintenance check error:', err);
    return false;
  }
}

export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow admin and api routes through regardless of maintenance
  const isExcluded = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/api') || 
    pathname === '/maintenance' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico';

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

  // ── MAINTENANCE MODE CHECK ────────────────────────────────────────────────
  if (!isExcluded) {
    const isMaintenance = await getMaintenanceMode();
    if (isMaintenance) {
      // Check if user is an admin — if so, bypass maintenance redirect
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const isAdmin = token ? !!(await verifyToken(token)) : false;
      
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/maintenance', req.url));
      }
    }
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