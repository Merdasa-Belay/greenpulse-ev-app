"use client";

import React from 'react';

export interface SocialButtonProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    brand: string; // hex color
    variant?: 'light' | 'dark';
    className?: string;
}

// Reusable social button used in footer (dark) and contact card (light)
export function SocialButton({ href, label, icon, brand, variant = 'dark', className }: SocialButtonProps) {
    const base = 'group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14C88F] focus-visible:ring-offset-2';
    const theming = variant === 'dark'
        ? 'border-white/10 bg-white/5 backdrop-blur-sm text-slate-200 hover:scale-105 focus-visible:ring-offset-gray-900'
        : 'border-gray-200 bg-white text-gray-600 shadow-sm hover:-translate-y-1 hover:shadow-lg';
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`${base} ${theming} ${className || ''}`}
            style={{ '--brand': brand } as React.CSSProperties}
        >
            <span className="absolute inset-0 rounded-xl bg-[var(--brand)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#14C88F]/0 via-[#14C88F]/0 to-[#14C88F]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {icon}
            </span>
        </a>
    );
}

export default SocialButton;
