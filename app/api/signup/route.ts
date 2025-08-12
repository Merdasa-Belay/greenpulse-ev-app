import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
  const { name, email, password, role } = await request.json();

    console.log('Signup request received:', { name, email });

    // 1. Validate input
  if (!name || !email || !password) {
      console.log('Validation failed: Missing fields');
      return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }
  const allowedRoles = ['student', 'teacher', 'admin'] as const;
  type AllowedRole = typeof allowedRoles[number];
  const normalizedRole: AllowedRole = allowedRoles.includes(role as AllowedRole)
    ? (role as AllowedRole)
    : 'student';

    // 2. Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    // 3. Hash the password for security
    console.log('Hashing password...');
    const hashedPassword = await hashPassword(password);
    console.log('Password hashed.');

    // 4. Create the new user in the database
    console.log('Creating user in database...');
  const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: normalizedRole,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    console.log('User created successfully:', user);

    return NextResponse.json({ user }, { status: 201 });

  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
