"use client";

import { motion } from "framer-motion";
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
    color: "green" | "blue";
    icon: React.ReactNode;
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
        {
            value: "150+",
            label: "Beta Learners",
            color: "blue",
            icon: <UserGroupIcon className="w-8 h-8" />,
        },
        {
            value: "800+",
            label: "Lessons Accessed",
            color: "green",
            icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
        },
        {
            value: "92%",
            label: "Practice Completion",
            color: "blue",
            icon: <HandThumbUpIcon className="w-8 h-8" />,
        },
        {
            value: "12",
            label: "Institutions Engaged",
            color: "green",
            icon: <RocketLaunchIcon className="w-8 h-8" />,
        },
    ];

    // Reverse order visually (already ordered reversed above for clarity, but ensure with slice)
    const displayStats = [...stats];

    const colorClass = (color: string) =>
        color === "green"
            ? {
                border: "border-green-500",
                text: "text-green-500",
                glow: "group-hover:shadow-[0_0_0_3px_rgba(20,200,143,0.15)]",
            }
            : {
                border: "border-blue-500",
                text: "text-blue-500",
                glow: "group-hover:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]",
            };

    return (
        <section className="py-20 bg-gradient-to-b from-white via-white to-green-50/40">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight"
                >
                    Early Impact Metrics
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {displayStats.map((item, idx) => {
                        return (
                            <StatCard key={item.label} item={item} index={idx} colorClass={colorClass(item.color)} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function StatCard({
    item,
    index,
    colorClass,
}: {
    item: StatItem;
    index: number;
    colorClass: { border: string; text: string; glow: string };
}) {
    const [inView, setInView] = useState(false);
    const animatedValue = useCountUp(item.value, inView);

    return (
        <motion.div
            className={`group relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm p-6 md:p-7 border ${colorClass.border} border-t-4 shadow-sm hover:shadow-lg transition-shadow duration-300`} // border top accent
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 0.8, 0.36, 1] }}
        >
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-1 bg-gradient-to-br from-green-100/0 via-white/0 to-green-100/40" />
            </div>

            <div className="flex flex-col items-center text-center">
                <motion.div
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border ${colorClass.border} ${colorClass.glow}`}
                    whileHover={{ rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className={`${colorClass.text}`}>{item.icon}</span>
                </motion.div>
                <div className={`text-4xl md:text-5xl font-extrabold tracking-tight ${colorClass.text}`}>
                    {animatedValue}
                </div>
                <motion.p
                    className="mt-2 text-sm md:text-base font-medium text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                >
                    {item.label}
                </motion.p>
                {/* Accent underline */}
                <motion.span
                    className={`${colorClass.text} mt-4 inline-block h-1 rounded-full bg-current`}
                    initial={{ width: 0 }}
                    animate={{ width: inView ? "50%" : 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                />
            </div>
        </motion.div>
    );
}
