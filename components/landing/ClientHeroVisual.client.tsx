"use client";

import Image from 'next/image';
import { motion } from '@/lib/motion';
import { BoltIcon } from '@heroicons/react/24/outline';

export default function ClientHeroVisual() {
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.96, rotate: -3 },
        show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] } },
    } as const;

    return (
        <motion.div initial="hidden" animate="show" variants={imageVariants} className="relative h-full w-full">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-100/40 via-white to-teal-100/40 dark:from-emerald-900/40 dark:via-slate-950 dark:to-teal-900/40 blur-xl" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm shadow-2xl">
                <Image
                    src="/readme/hero1.png"
                    alt="Electric vehicle technician cohort reviewing battery diagnostics in Addis Ababa workshop"
                    fill
                    priority
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 dark:from-slate-950/40 via-transparent to-transparent" />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }} className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/70 dark:bg-slate-900/70 px-4 py-3 backdrop-blur-md shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 dark:bg-emerald-700 text-white shadow">
                        <BoltIcon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        Practical EV Workshops & Training Live
                        <span className="ml-2 inline-block animate-pulse text-emerald-600">●</span>
                    </p>
                </motion.div>

                <motion.span className="absolute top-6 left-6 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-300" animate={{ y: [0, -8, 0], rotate: [0, 8, -4, 0] }} transition={{ duration: 8, repeat: Infinity }}>
                    <BoltIcon className="h-5 w-5" />
                </motion.span>
            </div>
        </motion.div>
    );
}
