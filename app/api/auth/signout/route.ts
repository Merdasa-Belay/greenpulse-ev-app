import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Sign out successful'
    });

    // Clear the auth cookie
    response.headers.set('Set-Cookie', 'authToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');

    return response;

  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json(
      { error: 'An error occurred while signing out' },
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
