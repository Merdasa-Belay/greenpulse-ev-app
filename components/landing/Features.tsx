"use client";

import { motion, useMotionValue, useTransform } from "@/lib/motion";
import {
    MapPinIcon,
    BoltIcon,
    AcademicCapIcon,
    ChartBarIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface FeatureItem {
    title: string;
    desc: string;
    icon: React.ReactNode;
    accent: 'emerald' | 'blue' | 'violet' | 'teal';
    tag?: string;
    highlight?: string;
}

// Animation variants (module scope so both Features & FeatureCard can access)
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
};

const card = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { stiffness: 110, damping: 18 } },
};

export default function Features() {
    const items: FeatureItem[] = [
        {
            title: 'Localized EV Maintenance',
            desc: 'Battery packs, drivetrains & diagnostics—aligned to the vehicles entering Ethiopian roads.',
            icon: (
                <span className="relative flex items-center justify-center">
                    <MapPinIcon className="h-7 w-7" />
                    <BoltIcon className="h-4 w-4 absolute -right-1 -bottom-1" />
                </span>
            ),
            accent: 'emerald',
            tag: 'Core',
            highlight: 'Hands‑On',
        },
        {
            title: 'Certified Training Programs',
            desc: 'Follow structured learning paths designed by industry experts to gain certified EV maintenance skills.',
            icon: <AcademicCapIcon className="h-7 w-7" />,
            accent: 'blue',
            tag: 'Certification',
        },
        {
            title: 'Analytics & Progress',
            desc: 'Educator dashboards tracking module completion, skill gaps & cohort momentum.',
            icon: <ChartBarIcon className="h-7 w-7" />,
            accent: 'violet',
            tag: 'Analytics',
        },
        {
            title: 'In‑Person Practical Labs',
            desc: 'Hands‑on sessions with real tools, vehicles, and guided shop-floor practice.',
            icon: <ShieldCheckIcon className="h-7 w-7" />,
            accent: 'teal',
            tag: 'Access',
        },
    ];

    // container & card variants moved to module scope above

    return (
        <section id="features" aria-labelledby="features-heading" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60">
            {/* Background decorative layers */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[-6rem] left-1/2 -translate-x-1/2 h-72 w-[38rem] rounded-full bg-gradient-to-br from-emerald-100 via-teal-100 to-emerald-200 opacity-40 blur-3xl" />
                <div className="absolute bottom-[-5rem] right-[-10rem] h-80 w-80 rounded-full bg-gradient-to-tr from-violet-200 via-teal-100 to-transparent opacity-30 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_center,rgba(16,185,129,0.3),transparent_60%)]" />
                <div className="absolute inset-0 opacity-[0.07] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [background-image:linear-gradient(to_right,rgba(0,0,0,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:60px_60px]" />
            </div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-28">
                <motion.h2
                    id="features-heading"
                    className="text-center text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Why <span className="text-emerald-600">Green Pulse</span>?
                </motion.h2>
                <motion.p
                    className="mt-5 max-w-2xl mx-auto text-center text-slate-600 text-[15px]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    A platform engineered for practical EV training, adaptive learning, and actionable insights.
                </motion.p>

                <motion.div
                    className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    {items.map((f) => {
                        const accentMap: Record<string, { bg: string; text: string; ring: string; shadow: string; grad: string; }> = {
                            emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-200', shadow: 'shadow-emerald-600/10', grad: 'from-emerald-400 via-teal-400 to-emerald-500' },
                            blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200', shadow: 'shadow-blue-600/10', grad: 'from-blue-400 via-sky-400 to-teal-400' },
                            violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-200', shadow: 'shadow-violet-600/10', grad: 'from-violet-400 via-fuchsia-400 to-pink-400' },
                            teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'ring-teal-200', shadow: 'shadow-teal-600/10', grad: 'from-teal-400 via-emerald-400 to-teal-500' },
                        };
                        const accent = accentMap[f.accent];

                        return (
                            <FeatureCard key={f.title} feature={f} accent={accent} />
                        );
                    })}
                </motion.div>
                {/* Safelist (Tailwind) hidden element to ensure dynamic classes aren't purged */}
                <div className="hidden">
                    bg-emerald-50 bg-blue-50 bg-violet-50 bg-teal-50 text-emerald-600 text-blue-600 text-violet-600 text-teal-600 ring-emerald-200 ring-blue-200 ring-violet-200 ring-teal-200
                </div>
            </div>
        </section>
    );
}

interface AccentDef { bg: string; text: string; ring: string; shadow: string; grad: string; }

function FeatureCard({ feature, accent }: { feature: FeatureItem; accent: AccentDef }) {
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const rX = useTransform(mvY, [-40, 40], [8, -8]);
    const rY = useTransform(mvX, [-40, 40], [-8, 8]);

    function handleMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mvX.set(e.clientX - rect.left - rect.width / 2);
        mvY.set(e.clientY - rect.top - rect.height / 2);
    }

    return (
        <motion.article
            variants={card}
            style={{ rotateX: rX, rotateY: rY, perspective: 1000 }}
            onMouseMove={handleMove}
            onMouseLeave={() => { mvX.set(0); mvY.set(0); }}
            whileHover={{ y: -8 }}
            className="group relative rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus:outline-none"
            tabIndex={0}
        >
            {/* Gradient ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-emerald-400/30 transition" />
            {/* Shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <span className="absolute -left-40 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-700 group-hover:opacity-60 group-hover:translate-x-[140%]" />
            </div>

            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${accent.bg} ${accent.text} ring-1 ${accent.ring} shadow-sm ${accent.shadow} transition-colors duration-300 group-hover:scale-[1.07] group-hover:shadow-md`}
            >
                {feature.icon}
            </div>
            <div className="mt-5 flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900 tracking-tight leading-snug">
                    {feature.title}
                </h3>
                {feature.tag && (
                    <span className="rounded-full bg-slate-900/5 px-2 py-1 text-[10px] font-medium tracking-wide text-slate-600 ring-1 ring-slate-900/5">
                        {feature.tag}
                    </span>
                )}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.desc}
            </p>
            {feature.highlight && (
                <p className={`mt-3 inline-flex items-center gap-1 rounded-md bg-gradient-to-r ${accent.grad} bg-clip-text text-[11px] font-semibold uppercase text-transparent tracking-wider`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                    {feature.highlight}
                </p>
            )}
            {/* gradient underline accent */}
            <span className={`mt-5 block h-[3px] w-0 rounded-full bg-gradient-to-r ${accent.grad} transition-all duration-600 group-hover:w-24`} />

            {/* Glow hover overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-100/0 via-transparent to-emerald-100/40" />
            </div>
        </motion.article>
    );
}
