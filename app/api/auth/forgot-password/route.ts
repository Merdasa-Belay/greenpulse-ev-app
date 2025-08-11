import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail, createPasswordResetToken } from '@/lib/database';
import { createPasswordResetToken as createJWT } from '@/lib/jwt';
import { sendPasswordResetEmail } from '@/lib/email';

// Validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = forgotPasswordSchema.safeParse(body);
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

    const { email } = result.data;

    // Find user by email
    const user = await findUserByEmail(email);
    
    // Always return success message for security (don't reveal if email exists)
    const successMessage = 'If an account with that email exists, we sent you a password reset link.';
    
    if (!user) {
      // Still return success to prevent email enumeration attacks
      return NextResponse.json({ message: successMessage });
    }

    // Generate JWT token
    const { token, tokenId } = createJWT(user.id, user.email);

    // Create database record for the token
    await createPasswordResetToken({
      id: tokenId,
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      createdAt: new Date(),
      used: false,
    });

    // Send email
    const emailSent = await sendPasswordResetEmail(user.email, token, user.name);
    
    if (!emailSent) {
      console.error('Failed to send password reset email to:', user.email);
      // Don't reveal email sending failure to the client for security
    }

    return NextResponse.json({ message: successMessage });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again.' },
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
