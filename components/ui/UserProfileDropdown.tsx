'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth, User } from '@/contexts/AuthContext';
import { ChevronDownIcon, UserIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Avatar, { NavbarAvatar, ProfileAvatar } from './Avatar';

interface UserProfileDropdownProps {
  user: User;
}

export default function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {/* Profile Avatar */}
        <NavbarAvatar user={user} />

        {/* User Name */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900 truncate max-w-32">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {user.role}
          </p>
        </div>

        {/* Chevron Icon */}
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Avatar user={user} size={48} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {user.email}
                  </p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1 ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <UserIcon className="w-4 h-4" />
                View Profile
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <Cog6ToothIcon className="w-4 h-4" />
                Settings
              </Link>

              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  onClick={() => setIsOpen(false)}
                >
                  <Cog6ToothIcon className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 w-full text-left"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
