import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

export interface PasswordResetPayload {
  userId: string;
  email: string;
  tokenId: string;
  iat?: number;
  exp?: number;
}

// Generate a secure random token ID
export const generateTokenId = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Create a JWT token for password reset
export const createPasswordResetToken = (userId: string, email: string): { token: string; tokenId: string } => {
  const tokenId = generateTokenId();
  
  const payload: PasswordResetPayload = {
    userId,
    email,
    tokenId,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
    issuer: 'greenpulse-ev',
    subject: 'password-reset',
  });

  return { token, tokenId };
};

// Verify and decode a password reset token
export const verifyPasswordResetToken = (token: string): PasswordResetPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'greenpulse-ev',
      subject: 'password-reset',
    }) as PasswordResetPayload;

    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
};

// Check if a token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET);
    return false;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return true;
    }
    return true; // Consider invalid tokens as expired
  }
};

// Hash a password using bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import('bcryptjs');
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// Compare a password with its hash
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
};
