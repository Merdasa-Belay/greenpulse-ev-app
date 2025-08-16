import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { comparePassword } from '@/lib/jwt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // 2. Look up the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // 3. Compare the submitted password with the stored hash
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // 4. Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-fallback-secret-key',
      { expiresIn: '1h' }
    );

    // 5. Return the token and user info and set an auth cookie for middleware
  // Omit password before sending user back to client
  const { password: _password, ...userWithoutPassword } = user;
    const response = NextResponse.json({ token, user: userWithoutPassword }, { status: 200 });
    response.cookies.set('next-auth.session-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    // Optional: set a readable role cookie (non-HTTP-only) for client-side checks
    response.cookies.set('role', String(user.role), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    return response;

  } catch (error) {
    console.error('Signin Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
