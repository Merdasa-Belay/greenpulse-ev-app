import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { findUserByEmail, createUser } from '@/lib/database';
import { hashPassword } from '@/lib/jwt';

// Validation schema
const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  role: z.enum(['teacher', 'student', 'admin']).optional().default('student'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = signUpSchema.safeParse(body);
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

    const { name, email, password, role } = result.data;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Return success (without sensitive data)
    return NextResponse.json({
      message: 'Account created successfully! You can now sign in.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating your account. Please try again.' },
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
