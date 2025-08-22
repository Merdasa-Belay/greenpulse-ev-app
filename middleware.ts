import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('next-auth.session-token')?.value
  const role = request.cookies.get('role')?.value as 'teacher' | 'student' | 'admin' | undefined
  const { pathname } = request.nextUrl

  const isAuthPage =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')

  // Public routes for marketing/SEO and auth
  const isPublicRoute =
    isAuthPage ||
    pathname === '/landing' ||
  pathname === '/google0dd8049ac7666f2d.html' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'

  // If user is signed in and on an auth page, send them to home
  if (currentUser && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is not signed in and trying to access a protected route, redirect to sign-in
  if (!currentUser && !isPublicRoute) {
    // First load: send unauthenticated users hitting root to the landing page
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/landing', request.url))
    }
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Role-protected routes
  if (currentUser) {
    // Admin-only area
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // Example teacher-only area
    if (pathname.startsWith('/teacher') && role !== 'teacher') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // Example student-only area
    if (pathname.startsWith('/student') && role !== 'student') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except for API routes, static files, image optimization files,
  // and public SEO/meta files.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg)$).*)',
  ],
};
