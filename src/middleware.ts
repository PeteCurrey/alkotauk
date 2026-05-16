import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// HARDCODED FALLBACKS (Use these if environment variables are missing)
const FALLBACK_URL = 'https://xohftjaohhkwgxdnouoo.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';

// Maintenance mode check logic (Direct fetch to bypass SDK issues in Edge)
async function getMaintenanceMode(): Promise<{ active: boolean; error?: string; diagnostics?: any }> {
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL).replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) return { active: false, error: 'Missing Supabase URL' };

  const keysToTry = [
    { name: 'service_role', key: serviceKey },
    { name: 'anon', key: anonKey }
  ].filter(item => !!item.key);

  const diagnosticResults: any[] = [];

  for (const item of keysToTry) {
    const key = item.key!;
    try {
      const url = `${supabaseUrl}/rest/v1/site_settings?key=in.(maintenance_mode,site_maintenance,maintenance)&select=value&t=${Date.now()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const isActive = data.some((row: any) => {
            const val = row.value;
            if (val === true || val === 'true' || val === 1 || val === '1') return true;
            if (typeof val === 'string' && (val.toLowerCase() === 'true' || val.toLowerCase() === 'on')) return true;
            return false;
          });
          return { active: isActive, diagnostics: { source: item.name, data } };
        }
      }
      
      diagnosticResults.push({
        source: item.name,
        status: response.status,
        statusText: response.statusText,
        keyPrefix: key.substring(0, 10)
      });
    } catch (err: any) {
      diagnosticResults.push({
        source: item.name,
        error: err.message || 'Unknown fetch error'
      });
    }
  }

  return { active: false, error: 'All fetch attempts failed', diagnostics: diagnosticResults };
}

export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── DIAGNOSTIC ENDPOINT ──────────────────────────────────────────────────
  if (pathname === '/api/health-check') {
    const status = await getMaintenanceMode();
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      maintenance: status,
      env: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    });
  }

  // ── EXCLUSIONS ────────────────────────────────────────────────────────────
  // We NEVER redirect these paths to maintenance
  const isExcluded = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/api') || 
    pathname === '/maintenance' ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') || // Static files like favicon.ico, images, etc.
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
    // DEBUG OVERRIDE: visiting any page with ?debugMaintenance=true will force the screen
    const debugMode = req.nextUrl.searchParams.get('debugMaintenance') === 'true';
    const maintenanceStatus = await getMaintenanceMode();
    const isMaintenance = debugMode || maintenanceStatus.active;
    
    if (isMaintenance) {
      // Admin bypass: logged in admins can see the live site
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const isAdmin = token ? !!(await verifyToken(token)) : false;
      
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/maintenance', req.url));
      }
    }

    // Add a debug header for internal testing
    const response = NextResponse.next();
    response.headers.set('x-maintenance-status', isMaintenance ? 'active' : 'inactive');
    return response;
  }

  // Allow through
  return NextResponse.next();
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