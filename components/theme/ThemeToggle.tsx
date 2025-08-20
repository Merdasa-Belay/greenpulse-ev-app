"use client";
import React from 'react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from '@/lib/motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

/**
 * Accessible theme toggle.
 * - aria-pressed reflects dark mode state
 * - Animates icon transitions
 */
export const ThemeToggle: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => {
    const { resolvedTheme, toggleTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`relative inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white/70 backdrop-blur-sm transition-colors hover:bg-white dark:border-emerald-400/40 dark:bg-slate-800/70 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 h-10 w-10 ${className}`}
        >
            <AnimatePresence initial={false} mode="wait">
                {isDark ? (
                    <motion.span
                        key="moon"
                        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.8, 0.36, 1] }}
                        className="text-amber-300"
                    >
                        <MoonIcon style={{ width: size, height: size }} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.8, 0.36, 1] }}
                        className="text-amber-500"
                    >
                        <SunIcon style={{ width: size, height: size }} />
                    </motion.span>
                )}
            </AnimatePresence>
            <span className="pointer-events-none absolute inset-0 rounded-xl shadow-inner shadow-emerald-500/5 dark:shadow-emerald-400/10" />
        </button>
    );
};

export default ThemeToggle;
