'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getUserAvatarUrl, generateUIAvatar } from '@/lib/avatarUtils';

interface AvatarProps {
  user: {
    name: string;
    email: string;
    role: 'teacher' | 'student' | 'admin';
    profileImage?: string;
  };
  size?: number;
  className?: string;
  showOnlineIndicator?: boolean;
  fallbackClassName?: string;
}

export default function Avatar({
  user,
  size = 40,
  className = '',
  showOnlineIndicator = false,
  fallbackClassName = '',
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get the primary avatar URL
  const primaryAvatarUrl = getUserAvatarUrl(user);

  // Fallback avatar URL (always use UI Avatars as ultimate fallback)
  const fallbackAvatarUrl = generateUIAvatar(user.name, {
    size,
    background: 'f3f4f6',
    color: '374151',
    rounded: true,
    bold: true,
  });

  // Choose which URL to display
  const displayUrl = imageError ? fallbackAvatarUrl : primaryAvatarUrl;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.warn(`Failed to load avatar for ${user.name}, using fallback`);
    setImageError(true);
    setIsLoading(false);
  };

  const avatarClassName = `
    relative inline-block rounded-full object-cover bg-gray-200
    ${className}
  `.trim();

  const containerStyle = {
    width: size,
    height: size,
  };

  return (
    <div className="relative inline-block" style={containerStyle}>
      {/* Loading placeholder */}
      {isLoading && (
        <div
          className={`absolute inset-0 rounded-full bg-gray-200 animate-pulse ${fallbackClassName}`}
          style={containerStyle}
        />
      )}

      {/* Avatar Image */}
      <Image
        src={displayUrl}
        alt={`${user.name}'s avatar`}
        width={size}
        height={size}
        className={avatarClassName}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={size >= 64} // Prioritize larger avatars
        unoptimized={displayUrl.includes('ui-avatars.com')} // UI Avatars already optimized
      />

      {/* Online indicator */}
      {showOnlineIndicator && (
        <div
          className="absolute bg-green-500 border-2 border-white rounded-full"
          style={{
            width: Math.max(8, size * 0.25),
            height: Math.max(8, size * 0.25),
            bottom: 0,
            right: 0,
            transform: 'translate(25%, 25%)',
          }}
        />
      )}
    </div>
  );
}

// Specialized variants for common use cases
export function NavbarAvatar({ user }: { user: AvatarProps['user'] }) {
  return (
    <Avatar
      user={user}
      size={32}
      showOnlineIndicator={true}
      className="ring-2 ring-white hover:ring-gray-300 transition-all duration-200"
    />
  );
}

export function ProfileAvatar({ user }: { user: AvatarProps['user'] }) {
  return (
    <Avatar
      user={user}
      size={96}
      className="ring-4 ring-gray-200 shadow-lg"
    />
  );
}

export function SmallAvatar({ user }: { user: AvatarProps['user'] }) {
  return (
    <Avatar
      user={user}
      size={24}
      className="ring-1 ring-gray-200"
    />
  );
}

export function LargeAvatar({ user }: { user: AvatarProps['user'] }) {
  return (
    <Avatar
      user={user}
      size={128}
      className="ring-4 ring-white shadow-2xl"
      showOnlineIndicator={true}
    />
  );
}
