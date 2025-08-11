"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import UserProfileDropdown from "./UserProfileDropdown";
import Avatar from "./Avatar";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, loading, logout } = useAuth();

    // Hide Navbar on auth pages
    if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up") || pathname?.startsWith("/forgot-password") || pathname?.startsWith("/reset-password")) {
        return null;
    }

    return (
        <>
            {/* Fixed Top Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 bg-white`}
            >

                <div className="container mx-auto flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/images/logo.svg"
                            alt="Green Pulse Logo"
                            width={46}
                            height={44}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <span
                            className="text-lg font-bold select-none"
                            style={{ color: "#14C88F" }}
                        >
                            Green Pulse
                        </span>
                    </Link>

                    {/* Center Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className="hover:text-green-500 transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/companions"
                            className="hover:text-green-500 transition-colors duration-200"
                        >
                            Companions
                        </Link>
                        <Link
                            href="/my-journey"
                            className="hover:text-green-500 transition-colors duration-200"
                        >
                            My Journey
                        </Link>
                    </div>

                    {/* Right Side - User Profile or Auth Buttons */}
                    <div className="flex items-center gap-4">
                        {loading ? (
                            // Loading state
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        ) : user ? (
                            // User is signed in - show profile dropdown
                            <UserProfileDropdown user={user} />
                        ) : (
                            // User is not signed in - show auth buttons
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    href="/sign-in"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
                            aria-label="Toggle Menu"
                            onClick={() => setIsOpen(true)}
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            />


            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 text-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ backgroundColor: "#14C88F" }}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        className="p-2 rounded hover:bg-white/10 focus:outline-none"
                        aria-label="Close Menu"
                        onClick={() => setIsOpen(false)}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* User Profile Section (Mobile) */}
                {user && (
                    <div className="px-4 py-3 border-b border-white/20">
                        <div className="flex items-center gap-3">
                            <Avatar user={user} size={40} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-white/80 capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="flex flex-col p-4 space-y-2">
                    <Link
                        href="/"
                        className="block px-2 py-1 rounded hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/companions"
                        className="block px-2 py-1 rounded hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        Companions
                    </Link>
                    <Link
                        href="/my-journey"
                        className="block px-2 py-1 rounded hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                    >
                        My Journey
                    </Link>

                    {user ? (
                        // User is signed in - show user menu items
                        <>
                            <div className="border-t border-white/20 my-2"></div>
                            <Link
                                href="/profile"
                                className="block px-2 py-1 rounded hover:bg-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                View Profile
                            </Link>
                            <Link
                                href="/settings"
                                className="block px-2 py-1 rounded hover:bg-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                Settings
                            </Link>
                            {user.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="block px-2 py-1 rounded hover:bg-white/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={async () => {
                                    await logout();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-2 py-1 rounded hover:bg-white/10 text-red-200"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        // User is not signed in - show auth links
                        <>
                            <div className="border-t border-white/20 my-2"></div>
                            <Link
                                href="/sign-in"
                                className="block px-2 py-1 rounded hover:bg-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="block px-2 py-1 rounded hover:bg-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
}
