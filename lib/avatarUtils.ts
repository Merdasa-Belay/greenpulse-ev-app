import crypto from 'crypto';

export interface AvatarConfig {
  size?: number;
  background?: string;
  color?: string;
  bold?: boolean;
  rounded?: boolean;
  fontSize?: number;
  length?: number;
}

/**
 * Generates a UI Avatars URL based on user's name
 * @param name - User's full name
 * @param config - Configuration options for the avatar
 * @returns URL string for the generated avatar
 */
export function generateUIAvatar(name: string, config: AvatarConfig = {}): string {
  const {
    size = 100,
    background = '14C88F', // Your brand green color
    color = 'ffffff',
    bold = true,
    rounded = true,
    fontSize = 0.5,
    length = 2,
  } = config;

  const params = new URLSearchParams({
    name: name || 'User',
    size: size.toString(),
    background,
    color,
    bold: bold.toString(),
    rounded: rounded.toString(),
    'font-size': fontSize.toString(),
    length: length.toString(),
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
}

/**
 * Generates a Gravatar URL based on user's email
 * @param email - User's email address
 * @param size - Size of the avatar (default: 100)
 * @param defaultType - Default image type if no gravatar exists
 * @returns URL string for the Gravatar
 */
export function generateGravatar(
  email: string,
  size: number = 100,
  defaultType: 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank' = 'identicon'
): string {
  const emailHash = crypto
    .createHash('md5')
    .update(email.toLowerCase().trim())
    .digest('hex');

  return `https://www.gravatar.com/avatar/${emailHash}?s=${size}&d=${defaultType}`;
}

/**
 * Gets role-specific avatar configuration
 * @param role - User's role
 * @returns Avatar configuration object
 */
export function getRoleAvatarConfig(role: 'teacher' | 'student' | 'admin'): AvatarConfig {
  const configs = {
    teacher: {
      background: '3B82F6', // Blue for teachers
      color: 'ffffff',
      bold: true,
    },
    student: {
      background: '10B981', // Green for students
      color: 'ffffff',
      bold: true,
    },
    admin: {
      background: 'EF4444', // Red for admins
      color: 'ffffff',
      bold: true,
    },
  };

  return configs[role] || configs.student;
}

/**
 * Determines the best avatar URL for a user
 * @param user - User object with profile data
 * @returns The best available avatar URL
 */
export function getUserAvatarUrl(user: {
  profileImage?: string | null;
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'admin';
}): string {
  // Priority 1: User-uploaded profile image
  if (user.profileImage && user.profileImage.trim()) {
    return user.profileImage;
  }

  // Priority 2: Generate UI Avatar with role-specific colors
  const roleConfig = getRoleAvatarConfig(user.role);
  return generateUIAvatar(user.name, {
    size: 100,
    rounded: true,
    bold: true,
    ...roleConfig,
  });
}

/**
 * Validates if a URL is a valid image URL
 * @param url - URL to validate
 * @returns boolean indicating if URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObject = new URL(url);
    
    // Check if it's from allowed domains
    const allowedDomains = [
      'ui-avatars.com',
      'gravatar.com',
      'www.gravatar.com',
      'your-cdn-domain.com',
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
      'localhost', // For development
    ];

    const isAllowedDomain = allowedDomains.some(domain => 
      urlObject.hostname === domain || urlObject.hostname.endsWith(`.${domain}`)
    );

    if (!isAllowedDomain) {
      return false;
    }

    // Check for common image extensions or known avatar services
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
    const isAvatarService = urlObject.hostname.includes('ui-avatars.com') || 
                           urlObject.hostname.includes('gravatar.com');

    return imageExtensions.test(urlObject.pathname) || isAvatarService;
  } catch {
    return false;
  }
}

/**
 * Generates multiple avatar options for a user
 * @param user - User object
 * @returns Array of avatar options with labels
 */
export function getAvatarOptions(user: {
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'admin';
}) {
  const roleConfig = getRoleAvatarConfig(user.role);
  
  return [
    {
      label: 'UI Avatar (Role Color)',
      url: generateUIAvatar(user.name, { ...roleConfig, size: 100, rounded: true }),
    },
    {
      label: 'UI Avatar (Brand Color)',
      url: generateUIAvatar(user.name, { 
        background: '14C88F', 
        size: 100, 
        rounded: true,
        bold: true 
      }),
    },
    {
      label: 'Gravatar',
      url: generateGravatar(user.email, 100, 'identicon'),
    },
    {
      label: 'Initials Only',
      url: generateUIAvatar(user.name, { 
        background: 'f3f4f6', 
        color: '374151',
        size: 100, 
        rounded: true,
        bold: true 
      }),
    },
  ];
}
