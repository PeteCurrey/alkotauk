import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from './lib/auth';

// Maintenance mode check logic (Direct fetch to bypass SDK issues in Edge)
async function getMaintenanceMode(): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGZ0amFvaGhrd2d4ZG5vdW9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg2NzU5MywiZXhwIjoyMDkwNDQzNTkzfQ.65YGsr1ZbSgECaM0nUZ8-sJR7lezQPd7xWxwTDirZD4';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) return false;

  // Attempt fetch with Service Role Key first, fallback to Anon Key
  const keysToTry = [serviceKey, anonKey].filter(Boolean);

  for (const key of keysToTry) {
    try {
      const url = `${supabaseUrl}/rest/v1/site_settings?key=in.(maintenance_mode,site_maintenance,maintenance)&select=value&t=${Date.now()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'apikey': key!,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          return data.some((row: any) => {
            const val = row.value;
            return val === 'true' || val === true || String(val).toLowerCase() === 'true';
          });
        }
      }
    } catch (err) {
      console.error('Middleware: Fetch attempt failed', err);
    }
  }

  return false;
}

export const runtime = 'experimental-edge';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
    const isMaintenance = debugMode || (await getMaintenanceMode());
    
    if (isMaintenance) {
      // Admin bypass: logged in admins can see the live site
      const token = req.cookies.get(COOKIE_NAME)?.value;
      const isAdmin = token ? !!(await verifyToken(token)) : false;
      
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/maintenance', req.url));
      }
    }
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