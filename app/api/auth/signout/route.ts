import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Clear the session cookie
  response.cookies.set('next-auth.session-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  path: '/',
    maxAge: 0,
  });
  response.cookies.set('role', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
