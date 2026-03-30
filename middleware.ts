import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

// Maintenance mode cache
let maintenanceModeCache: { value: boolean; expiresAt: number } | null = null;

async function getMaintenanceMode(req: NextRequest): Promise<boolean> {
  // Use cache to avoid DB hit on every request (30s TTL)
  if (maintenanceModeCache && Date.now() < maintenanceModeCache.expiresAt) {
    return maintenanceModeCache.value;
  }
  try {
    const url = new URL('/api/site-settings', req.url);
    const res = await fetch(url.toString(), { next: { revalidate: 30 } });
    if (res.ok) {
      const data = await res.json();
      const isOn = data.maintenance_mode === 'true';
      maintenanceModeCache = { value: isOn, expiresAt: Date.now() + 30_000 };
      return isOn;
    }
  } catch {
    // If fetch fails, assume not in maintenance mode to avoid locking everyone out
  }
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── ADMIN ROUTE PROTECTION ───────────────────────────────────────────────
  // Protect all /admin/* routes except the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
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
    return NextResponse.next();
  }

  // Allow all /api/admin/* through (they handle their own auth)
  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/site-settings')) {
    return NextResponse.next();
  }

  // Always allow the maintenance page itself
  if (pathname === '/maintenance') {
    return NextResponse.next();
  }

  // ── MAINTENANCE MODE CHECK ───────────────────────────────────────────────
  // Skip for static assets, API routes, and admin
  const isStaticAsset = pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.startsWith('/assets') || pathname.includes('.');
  if (!isStaticAsset) {
    const isMaintenanceMode = await getMaintenanceMode(req);
    if (isMaintenanceMode) {
      return NextResponse.redirect(new URL('/maintenance', req.url));
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
