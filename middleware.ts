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

  // Only auth pages are public per requirement
  const isPublicRoute = isAuthPage

  // If user is signed in and on an auth page, send them to home
  if (currentUser && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is not signed in and trying to access a protected route, redirect to sign-in
  if (!currentUser && !isPublicRoute) {
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
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg)$).*)'],
}
