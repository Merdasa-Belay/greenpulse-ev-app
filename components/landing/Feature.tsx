"use client";
import { motion } from '@/lib/motion';
import { ReactNode } from 'react';
import { FaBatteryFull, FaLeaf, FaTools, FaChargingStation } from 'react-icons/fa';

interface FeatureItem { icon: ReactNode; title: string; desc: string; }

const items: FeatureItem[] = [
    { icon: <FaBatteryFull className="text-emerald-600 dark:text-emerald-400 text-2xl" />, title: 'Battery Intelligence', desc: 'Health diagnostics & thermal awareness for safer longevity.' },
    { icon: <FaChargingStation className="text-emerald-600 dark:text-emerald-400 text-2xl" />, title: 'Smart Charging', desc: 'Optimized charging strategies & connector standards.' },
    { icon: <FaTools className="text-emerald-600 dark:text-emerald-400 text-2xl" />, title: 'Hands‑On Skills', desc: 'Guided procedures & interactive practice modules.' },
    { icon: <FaLeaf className="text-emerald-600 dark:text-emerald-400 text-2xl" />, title: 'Sustainability', desc: 'Circular maintenance mindset & energy efficiency.' },
];

export default function FeatureSection() {
    return (
        <section id="features" className="py-20 bg-white dark:bg-slate-900 transition-colors">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Platform <span className="text-emerald-600 dark:text-emerald-400">Features</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Everything you need to understand, service, and optimize EV systems—built for emerging markets.
                    </p>
                </motion.div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.1 }}
                            className="relative rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-800/60 backdrop-blur-sm p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                                {f.icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{f.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
