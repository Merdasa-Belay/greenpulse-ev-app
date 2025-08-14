// This is a simple in-memory database for demonstration
// In production, replace this with your actual database (PostgreSQL, MongoDB, etc.)

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  role: 'teacher' | 'student' | 'admin';
  name: string;
  profileImage?: string; // URL to profile image (uploaded or generated)
  createdAt: Date;
  updatedAt?: Date;
}

export interface PasswordResetToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  used: boolean;
}

// In-memory storage (replace with actual database)
const users: User[] = [
  // Sample users for testing (passwords: Teacher123!, Student123!, Admin123!)
  {
    id: '1',
    email: 'teacher@example.com',
    password: '$2b$12$znoSUJ86sEXyHLyCDsNQjOaNSxr/1K/E8T152171mAqBv1e2kkd..', // Teacher123!
    role: 'teacher',
    name: 'John Teacher',
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'student@example.com',
    password: '$2b$12$G4nGS8qowNxToJsMnntXZOQQBzffDp/LW/bLsT9c9rDsK1KyA0pWK', // Student123!
    role: 'student',
    name: 'Jane Student',
    createdAt: new Date(),
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: '$2b$12$6fXOy/F2Ig.YV2jCX.rR1uV572.FeLZY3v3piH.bmQY5LO8ce5C.y', // Admin123!
    role: 'admin',
    name: 'Admin User',
    createdAt: new Date(),
  },
];

let passwordResetTokens: PasswordResetToken[] = [];

// User operations
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  return users.find(user => user.id === id) || null;
};

export const updateUserPassword = async (userId: string, hashedPassword: string): Promise<boolean> => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex].password = hashedPassword;
    return true;
  }
  return false;
};

// Password reset token operations
export const createPasswordResetToken = async (token: PasswordResetToken): Promise<void> => {
  // Remove any existing tokens for this user
  passwordResetTokens = passwordResetTokens.filter(t => t.userId !== token.userId);
  passwordResetTokens.push(token);
};

export const findPasswordResetToken = async (token: string): Promise<PasswordResetToken | null> => {
  return passwordResetTokens.find(t => t.token === token && !t.used && t.expiresAt > new Date()) || null;
};

export const markTokenAsUsed = async (tokenId: string): Promise<void> => {
  const tokenIndex = passwordResetTokens.findIndex(t => t.id === tokenId);
  if (tokenIndex !== -1) {
    passwordResetTokens[tokenIndex].used = true;
  }
};

// Create a new user
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const newUser: User = {
    id: (users.length + 1).toString(),
    ...userData,
    createdAt: new Date(),
  };
  
  users.push(newUser);
  return newUser;
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<Pick<User, 'name' | 'profileImage'>>): Promise<User | null> => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date(),
    };
    return users[userIndex];
  }
  return null;
};

// Get all users (for admin purposes)
export const getAllUsers = async (): Promise<User[]> => {
  return users.map(user => ({ ...user, password: '[REDACTED]' })) as User[];
};

// Cleanup expired tokens (you might want to run this periodically)
export const cleanupExpiredTokens = async (): Promise<void> => {
  const now = new Date();
  passwordResetTokens = passwordResetTokens.filter(t => t.expiresAt > now);
};
