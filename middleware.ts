import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function getMaintenanceMode(req: NextRequest): Promise<boolean> {
  try {
    const url = new URL('/api/site-settings', req.url);
    const res = await fetch(url.toString(), { next: { revalidate: 0 } });
    if (res.ok) {
      const data = await res.json();
      return data.maintenance_mode === 'true' || data.maintenance_mode === true;
    }
  } catch {
    // If fetch fails, default to false to prevent lockout
  }
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Static assets and internal routes
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/favicon') || 
    pathname.startsWith('/assets') || 
    pathname.includes('.');

  if (isStaticAsset) {
    return NextResponse.next();
  }

  // Admin and API routes bypass maintenance check
  const isAdminOrApi = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/api') || 
    pathname === '/maintenance';

  if (!isAdminOrApi) {
    const isMaintenanceMode = await getMaintenanceMode(req);
    if (isMaintenanceMode) {
      return NextResponse.redirect(new URL('/maintenance', req.url));
    }
  }

  // Admin protection
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
  }

  // Set x-url header
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
