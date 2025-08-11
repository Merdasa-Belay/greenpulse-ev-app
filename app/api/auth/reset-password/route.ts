import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findPasswordResetToken, markTokenAsUsed, updateUserPassword, findUserById } from '@/lib/database';
import { verifyPasswordResetToken, hashPassword } from '@/lib/jwt';

// Validation schemas
const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// GET: Verify if a token is valid
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Validate token format
    const result = verifyTokenSchema.safeParse({ token });
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 400 });
    }

    // Verify JWT token
    const payload = verifyPasswordResetToken(token);
    if (!payload) {
      return NextResponse.json({ 
        error: 'Invalid or expired token',
        expired: true 
      }, { status: 400 });
    }

    // Check if token exists in database and hasn't been used
    const tokenRecord = await findPasswordResetToken(token);
    if (!tokenRecord) {
      return NextResponse.json({ 
        error: 'Token has been used or does not exist',
        expired: true 
      }, { status: 400 });
    }

    // Get user info for display
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found',
        expired: true 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      valid: true, 
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying the token' },
      { status: 500 }
    );
  }
}

// POST: Reset password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = resetPasswordSchema.safeParse(body);
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

    const { token, password } = result.data;

    // Verify JWT token
    const payload = verifyPasswordResetToken(token);
    if (!payload) {
      return NextResponse.json({ 
        error: 'Invalid or expired token',
        expired: true 
      }, { status: 400 });
    }

    // Check if token exists in database and hasn't been used
    const tokenRecord = await findPasswordResetToken(token);
    if (!tokenRecord) {
      return NextResponse.json({ 
        error: 'Token has been used or does not exist',
        expired: true 
      }, { status: 400 });
    }

    // Verify the user exists
    const user = await findUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ 
        error: 'User not found' 
      }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update user password
    const updated = await updateUserPassword(user.id, hashedPassword);
    if (!updated) {
      return NextResponse.json({ 
        error: 'Failed to update password' 
      }, { status: 500 });
    }

    // Mark token as used
    await markTokenAsUsed(tokenRecord.id);

    return NextResponse.json({ 
      message: 'Password has been successfully reset. You can now sign in with your new password.',
      success: true
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resetting your password. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
