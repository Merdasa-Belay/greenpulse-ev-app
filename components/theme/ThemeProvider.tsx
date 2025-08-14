"use client";
import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;              // User chosen theme or resolved theme
    resolvedTheme: Theme;      // Actual theme in effect (user or system)
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
    mounted: boolean;          // Prevent hydration mismatch
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'theme';

/**
 * ThemeProvider strategy:
 *  - Inline script in <head> applies class early to avoid FOUC.
 *  - userTheme (null means follow system).
 *  - Listens to system preference changes when user hasn't explicitly chosen.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [userTheme, setUserTheme] = useState<Theme | null>(null);
    const [systemTheme, setSystemTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    const resolvedTheme: Theme = userTheme ?? systemTheme;

    // Apply class to <html>
    useEffect(() => {
        const root = document.documentElement;
        if (resolvedTheme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    }, [resolvedTheme]);

    useEffect(() => {
        const stored = (typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null) as Theme | null;
        if (stored === 'light' || stored === 'dark') {
            setUserTheme(stored);
        }
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const applySystem = () => setSystemTheme(mq.matches ? 'dark' : 'light');
        applySystem();
        const listener = () => {
            if (userTheme == null) applySystem();
        };
        mq.addEventListener('change', listener);
        setMounted(true);
        return () => mq.removeEventListener('change', listener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setTheme = useCallback((t: Theme) => {
        setUserTheme(t);
        try { localStorage.setItem(STORAGE_KEY, t); } catch { }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }, [resolvedTheme, setTheme]);

    const value: ThemeContextValue = {
        theme: userTheme ?? resolvedTheme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        mounted,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
