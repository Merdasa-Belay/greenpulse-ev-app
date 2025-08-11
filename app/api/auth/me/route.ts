import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserById } from '@/lib/database';
import { getUserAvatarUrl } from '@/lib/avatarUtils';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const authToken = request.cookies.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(authToken, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
      name: string;
    };

    // Get user from database to ensure they still exist
    const user = await findUserById(decoded.userId);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Return user data (without password)
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: getUserAvatarUrl({
          profileImage: user.profileImage,
          name: user.name,
          email: user.email,
          role: user.role as 'teacher' | 'student' | 'admin',
        }),
      }
    });

  } catch (error) {
    console.error('Error verifying authentication:', error);
    return NextResponse.json({ error: 'Invalid authentication' }, { status: 401 });
  }
}

// Helper function to generate profile image URL
// You can customize this to use your own profile image logic
function getProfileImageUrl(email: string, name: string): string {
  // Option 1: Use Gravatar (requires MD5 hash)
  const crypto = require('crypto');
  const emailHash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=100&d=identicon`;
  
  // Option 2: Use UI Avatars (simple text-based avatars)
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const uiAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=100&background=14C88F&color=ffffff&bold=true`;
  
  // You can switch between these or implement your own logic
  return uiAvatarUrl; // Using UI Avatars for better customization
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
