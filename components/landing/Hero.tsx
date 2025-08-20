"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRightIcon, PlayCircleIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function Hero() {
    // IMPORTANT: Removed useReducedMotion conditionals because they produce
    // different server vs client variant values (server can't know user media preference)
    // which was triggering hydration warnings. We now use fixed variants and rely on
    // CSS media queries (Tailwind motion-reduce:*) to respect user preferences without
    // affecting the server HTML.

    const containerVariants = {
        hidden: { opacity: 0, y: 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                ease: [0.25, 1, 0.5, 1],
                when: "beforeChildren",
                staggerChildren: 0.09,
            },
        },
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
    } as const;

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.92, rotate: -4 },
        show: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
        },
    } as const;

    const badges = [
        { label: "EV Maintenance", icon: <BoltIcon className="h-4 w-4" /> },
        { label: "EV training", icon: <ShieldCheckIcon className="h-4 w-4" /> },
        { label: "Practical EV Workshops", icon: <PlayCircleIcon className="h-4 w-4" /> },
    ];

    return (
        <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden bg-white dark:bg-slate-950">
            {/* Decorative background layers */}
            <div className="absolute inset-0 -z-10">
                {/* radial glows */}
                <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-emerald-300/20 dark:bg-emerald-800/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-teal-300/20 dark:bg-teal-800/20 blur-3xl" />
                {/* subtle grid overlay */}
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
                {/* gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white dark:from-slate-950/70 dark:via-slate-950/40 dark:to-slate-950" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                /* Reduced bottom padding to better align adjacent section spacing */
                className="mx-auto max-w-7xl px-4 pt-10 md:pt-16 pb-12 md:pb-16 sm:px-6 lg:px-8"
            >
                <div className="grid items-center gap-20 md:grid-cols-2"> {/* Increased gap */}
                    {/* Copy */}
                    <div className="relative">
                        {/* Accent floating badge row */}
                        <motion.div variants={itemVariants} className="mb-7 flex flex-wrap items-center gap-3">
                            {badges.map((b, i) => (
                                <motion.span
                                    key={b.label}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-700/60 bg-white/60 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm shadow-sm hover:bg-white/80 dark:hover:bg-slate-900/80"
                                >
                                    <span className="text-emerald-600">{b.icon}</span>
                                    {b.label}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.h1
                            id="hero-heading"
                            variants={itemVariants}
                            className="text-balance text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl motion-reduce:transition-none"
                        >
                            Accelerate Ethiopia’s<span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent"> EV & Green Tech Skills</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300 motion-reduce:transition-none">
                            EV service and green tech training—practical, local, and hands-on for Ethiopia’s emerging workforce.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-4 motion-reduce:transition-none">
                            <Link
                                href="/sign-up"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-slate-900 dark:bg-emerald-700 px-8 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-slate-800 dark:hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                <span>Join the Beta</span>
                                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/sign-in"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 px-8 text-lg font-medium text-slate-900 dark:text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                <PlayCircleIcon className="h-6 w-6 text-emerald-600" />
                                <span>View Curriculum</span>
                            </Link>
                        </motion.div>

                        <motion.p variants={itemVariants} className="mt-5 text-sm text-slate-500 dark:text-slate-400 motion-reduce:transition-none">
                            Limited early access • Localized content • Founding member recognition.
                        </motion.p>
                    </div>

                    {/* Visual */}
                    <motion.div variants={imageVariants} className="relative h-80 md:h-[520px] will-change-transform">
                        {/* layered card */}
                        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-100/40 via-white to-teal-100/40 dark:from-emerald-900/40 dark:via-slate-950 dark:to-teal-900/40 blur-xl" />
                        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Electric vehicle gliding along a smart, sustainable route"
                                fill
                                priority
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover" />
                            {/* subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 dark:from-slate-950/40 via-transparent to-transparent" />
                            {/* floating highlight */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1, duration: 0.7 }}
                                className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/70 dark:bg-slate-900/70 px-4 py-3 backdrop-blur-md shadow-md"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 dark:bg-emerald-700 text-white shadow">
                                    <BoltIcon className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                    Practical EV Workshops & Training Live
                                    <span className="ml-2 inline-block animate-pulse text-emerald-600">●</span>
                                </p>
                            </motion.div>

                            {/* Floating animated icons */}
                            <motion.span
                                className="absolute top-6 left-6 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-300"
                                animate={{ y: [0, -8, 0], rotate: [0, 8, -4, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <BoltIcon className="h-5 w-5" />
                            </motion.span>
                            <motion.span
                                className="absolute top-10 right-8 hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow border border-teal-200 dark:border-teal-700 text-teal-600 dark:text-teal-300"
                                animate={{ y: [0, 10, 0], rotate: [0, -6, 3, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                            >
                                <ShieldCheckIcon className="h-6 w-6" />
                            </motion.span>
                            <motion.span
                                className="absolute bottom-28 -left-2 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-700 dark:to-teal-700 text-white shadow-lg"
                                animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }}
                                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                            >
                                <PlayCircleIcon className="h-7 w-7" />
                            </motion.span>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="mt-14 flex justify-center"
                >
                    <a href="#features" className="group flex flex-col items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <span className="inline-flex h-10 w-6 items-start justify-center rounded-full border border-slate-300/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/70 p-1 backdrop-blur-sm shadow">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        </span>
                        Scroll
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}

