"use client";
import { motion } from "@/lib/motion";
import { ShieldCheckIcon, AcademicCapIcon, GlobeAltIcon, BoltIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from 'react';

interface Badge {
    label: string;
    status: "verified" | "pending";
    description: string;
    icon: ReactNode;
}

const badges: Badge[] = [
    {
        label: "Skill Path Alignment",
        status: "verified",
        description: "Structured learning paths with progressive competency markers.",
        icon: <AcademicCapIcon className="h-6 w-6" />
    },
    {
        label: "Environmental Focus",
        status: "verified",
        description: "Integrates sustainability & circular maintenance principles.",
        icon: <GlobeAltIcon className="h-6 w-6" />
    },
    {
        label: "Safety Emphasis",
        status: "verified",
        description: "High‑voltage & tooling safety embedded in early modules.",
        icon: <ShieldCheckIcon className="h-6 w-6" />
    },
    {
        label: "In‑Person Labs",
        status: "verified",
        description: "Live, hands‑on sessions with real vehicles and shop‑grade tooling.",
        icon: <BoltIcon className="h-6 w-6" />
    }
];

export default function TrustBadges() {
    return (
        <section id="trust" aria-labelledby="trust-heading" className="py-20 bg-white dark:bg-slate-950 transition-colors">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55 }}
                    className="mb-14 text-center max-w-2xl mx-auto"
                >
                    <h2 id="trust-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Learning Integrity & Trust Signals</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">Clear markers that reinforce quality, safety, and real‑world relevance while pending certifications progress.</p>
                </motion.div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {badges.map((b, i) => (
                        <motion.div
                            key={b.label}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.55, delay: i * 0.07 }}
                            className="group relative rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                                    {b.icon}
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${b.status === 'verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}`}>{b.status}</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-tight">{b.label}</h3>
                            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 flex-1">{b.description}</p>
                            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>
                <p className="mt-8 text-center text-[11px] text-slate-500 dark:text-slate-400">* Some external accreditations are in progress; labels shown reflect current platform design focus.</p>
            </div>
        </section>
    );
}
