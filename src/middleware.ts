import { NextRequest, NextResponse } from 'next/server';
import { verifySessionTokenEdge } from '@/lib/edge-auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('jejak-admin-session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const session = await verifySessionTokenEdge(token);
    if (!session) {
      // Token invalid or expired — clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.set('jejak-admin-session', '', { maxAge: 0, path: '/' });
      return response;
    }

    return NextResponse.next();
  }

  // Redirect logged-in admin away from login page
  if (pathname === '/admin/login') {
    const token = req.cookies.get('jejak-admin-session')?.value;
    if (token) {
      const session = await verifySessionTokenEdge(token);
      if (session) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
