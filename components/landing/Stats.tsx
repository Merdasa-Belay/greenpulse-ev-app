"use client";

import { motion } from "@/lib/motion";
import { useEffect, useState } from "react";
import {
    WrenchScrewdriverIcon,
    HandThumbUpIcon,
    UserGroupIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

interface StatItem {
    value: string; // Raw display (e.g. "1,250+", "98%")
    label: string;
    icon: React.ReactNode;
    hint?: string; // optional subtle descriptor
}

// Helper to animate numbers (counts up once in view)
function useCountUp(target: string, inView: boolean) {
    const [display, setDisplay] = useState<string>(() => target);

    useEffect(() => {
        if (!inView) return; // wait until visible

        // Extract numeric part & any suffix/prefix
        const numericMatch = target.match(/[0-9,]+/);
        if (!numericMatch) return;
        const numberPart = numericMatch[0];
        const suffix = target.replace(numberPart, ""); // keep + or %
        const pureNumber = parseInt(numberPart.replace(/,/g, ""), 10);
        if (isNaN(pureNumber)) return;

        const duration = 1200; // ms
        const start = performance.now();

        function step(now: number) {
            const progress = Math.min(1, (now - start) / duration);
            const current = Math.floor(pureNumber * progress);
            // Re-insert thousands separators
            const formatted = current.toLocaleString();
            setDisplay(formatted + (progress === 1 ? suffix : ""));
            if (progress < 1) requestAnimationFrame(step);
        }
        setDisplay("0");
        const raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, inView]);

    return display;
}

export default function Stats() {
    const stats: StatItem[] = [
        { value: "150+", label: "Beta Learners", icon: <UserGroupIcon className="w-8 h-8" />, hint: "early adoption" },
        { value: "800+", label: "Lessons Accessed", icon: <WrenchScrewdriverIcon className="w-8 h-8" />, hint: "hands‑on modules" },
        { value: "92%", label: "Practice Completion", icon: <HandThumbUpIcon className="w-8 h-8" />, hint: "applied tasks" },
        { value: "12", label: "Institutions Engaged", icon: <RocketLaunchIcon className="w-8 h-8" />, hint: "partnerships" },
    ];

    const displayStats = [...stats];

    return (
        <section id="stats" className="relative py-24 bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden">
            {/* Aura backdrop */}
            <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_65%)]" />
            <div className="relative mx-auto max-w-7xl px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent"
                >
                    Early Impact Metrics
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {displayStats.map((item, idx) => {
                        return <StatCard key={item.label} item={item} index={idx} />;
                    })}
                </div>
            </div>
        </section>
    );
}

function StatCard({
    item,
    index,
}: { item: StatItem; index: number }) {
    const [inView, setInView] = useState(false);
    const animatedValue = useCountUp(item.value, inView);

    return (
        <motion.div
            className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-7 border border-emerald-200/70 dark:border-emerald-700/40 shadow-sm hover:shadow-lg transition-all duration-500"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 0.8, 0.36, 1] }}
        >
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/0 via-teal-300/0 to-emerald-400/25" />
            </div>

            <div className="flex flex-col items-center text-center">
                <motion.div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-emerald-400/10 border border-emerald-300/60 dark:border-emerald-600/50 shadow-inner"
                    whileHover={{ rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-emerald-600 dark:text-emerald-400">{item.icon}</span>
                </motion.div>
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                    {animatedValue}
                </div>
                <motion.p
                    className="mt-2 text-sm md:text-base font-semibold text-slate-700 dark:text-slate-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                >
                    {item.label}
                </motion.p>
                {item.hint && (
                    <motion.p
                        className="mt-1 text-[11px] uppercase tracking-wide text-emerald-600/80 dark:text-emerald-400/80 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: inView ? 1 : 0 }}
                        transition={{ delay: 0.55 + index * 0.1 }}
                    >
                        {item.hint}
                    </motion.p>
                )}
                {/* Accent underline */}
                <motion.span
                    className="mt-4 inline-block h-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? "50%" : 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                />
            </div>
        </motion.div>
    );
}
