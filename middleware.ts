import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('next-auth.session-token')?.value
  const { pathname } = request.nextUrl

  // If user is signed in and tries to access anything other than /home, redirect to /home
  if (currentUser && !pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // If user is NOT signed in and tries to access anything other than /sign-in or /sign-up, redirect to /sign-in
  if (
    !currentUser &&
    !pathname.startsWith('/sign-in') &&
    !pathname.startsWith('/sign-up')
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
