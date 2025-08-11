import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail } from '@/lib/database';
import { comparePassword } from '@/lib/jwt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

// Validation schema
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = signInSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: result.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      );
    }

    const { email, password, rememberMe } = result.data;

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: rememberMe ? '30d' : '24h', // 30 days if remember me, otherwise 24 hours
      issuer: 'greenpulse-ev',
      subject: 'user-auth',
    });

    // Create response
    const response = NextResponse.json({
      message: 'Sign in successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

    // Set HTTP-only cookie for authentication
    const cookieOptions = [
      `authToken=${token}`,
      'HttpOnly',
      'Path=/',
      'SameSite=Strict',
      rememberMe ? 'Max-Age=2592000' : 'Max-Age=86400', // 30 days or 24 hours
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ].filter(Boolean).join('; ');

    response.headers.set('Set-Cookie', cookieOptions);

    return response;

  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'An error occurred while signing in. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
