import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/(?:^|; )next-auth\.session-token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const secret = process.env.JWT_SECRET || 'your-fallback-secret-key';
  const payload = jwt.verify(token, secret) as { userId: number | string; email: string; role?: 'teacher' | 'student' | 'admin' };

    return NextResponse.json({
      user: {
        id: String(payload.userId),
        email: payload.email,
        name: '',
        role: payload.role ?? 'student',
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
