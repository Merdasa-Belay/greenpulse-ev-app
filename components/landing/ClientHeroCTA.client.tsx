"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

export default function ClientHeroCTA() {
    const { user } = useAuth();

    return (
        <div className="flex flex-wrap gap-4">
            {!user && (
                <Link href="/sign-up" className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-8 text-lg font-semibold text-white shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/40 transition-all duration-300 hover:from-emerald-500 hover:via-emerald-500 hover:to-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                    <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-emerald-600/0 via-teal-400/0 to-teal-400/0 opacity-0 blur transition duration-500 group-hover:opacity-60 group-hover:via-teal-400/30" aria-hidden />
                    <span className="relative flex items-center gap-2">
                        <span className="inline-flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-70" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                            </span>
                            Join the Beta
                        </span>
                        <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </Link>
            )}
            <Link href="/sign-in" className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-300/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-900/50 px-8 text-lg font-medium text-slate-900 dark:text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-900/70 hover:border-slate-400 dark:hover:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                <PlayCircleIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <span>View Curriculum</span>
            </Link>
        </div>
    );
}
