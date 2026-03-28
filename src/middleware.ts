import { auth } from '@/auth';
import { NextResponse } from 'next/server';

/**
 * Next.js 16.2.1 Proxy (Renamed from Middleware)
 * Handles protected route logic for the Dealer Portal.
 */
const proxyHandler = auth((req) => {
  const { pathname } = req.nextUrl;
  const requestHeaders = new Headers(req.headers);
  
  // 1. Inject the current pathname for server-side layout logic (Splash/Maintenance bypass)
  requestHeaders.set('x-url', pathname);

  // 2. Protected portal routes — redirect to login if no session
  if (pathname.startsWith('/portal') && pathname !== '/portal/login') {
    if (!req.auth) {
      const loginUrl = new URL('/portal/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export default proxyHandler;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
