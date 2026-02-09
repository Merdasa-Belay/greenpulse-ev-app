"use client";

import { motion } from "@/lib/motion";
import type { ReactNode } from 'react';
import Image from "next/image";
import {
    FaCarBattery,
    FaTools,
    FaMicrochip,
    FaServicestack,
    FaCloudDownloadAlt,
    FaChartLine,
    FaCheckCircle,
} from "react-icons/fa";

type Service = {
    icon: ReactNode;
    bg: string; // unified brand background
    title: string;
    text: string;
    features: string[];
    level: number;
    thumb: string;
    alt: string;
};

export default function Services() {
    const services: Service[] = [
        {
            icon: <FaTools className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
            bg: "bg-emerald-100/70 dark:bg-emerald-900/30",
            title: "Foundation Essentials",
            text: "Safety-first basics: electricity, components, and essential tools.",
            features: ["High‑voltage safety", "System components", "Tooling basics"],
            level: 1,
            thumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=60",
            alt: "Hands working with insulated tools inside an electric vehicle component bay",
        },
        {
            icon: <FaCarBattery className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
            bg: "bg-emerald-100/70 dark:bg-emerald-900/30",
            title: "EV Power & Batteries",
            text: "Understand battery packs, BMS basics, and thermal safety.",
            features: ["Cell & module structure", "State of health checks", "Thermal diagnostics"],
            level: 2,
            thumb: "https://images.unsplash.com/photo-1694889648476-3777d917b91c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Macro photo of lithium ion EV battery pack cells and connections",
        },
        {
            icon: <FaMicrochip className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
            bg: "bg-emerald-100/70 dark:bg-emerald-900/30",
            title: "Systems Diagnostics",
            text: "Fast troubleshooting for controls, inverters and charging systems.",
            features: ["Error code logic", "Signal tracing", "Common fault trees"],
            level: 3,
            thumb: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=60",
            alt: "Engineer reviewing diagnostic signals on an electronics bench",
        },
        {
            icon: <FaServicestack className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
            bg: "bg-emerald-100/70 dark:bg-emerald-900/30",
            title: "EV Service Skills",
            text: "Practical, workshop-focused repair & maintenance skills.",
            features: ["Routine maintenance procedures", "Battery replacement & diagnostics", "Charging system inspection"],
            level: 4,
            thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Technician performing maintenance on an electric vehicle platform",
        },
        {
            icon: <FaCloudDownloadAlt className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
            bg: "bg-emerald-100/70 dark:bg-emerald-900/30",
            title: "Industry Readiness",
            text: "Real‑world exposure through partners, shop visits, and live case studies.",
            features: ["On‑site demos", "Mentor feedback", "Real service tickets"],
            level: 5,
            thumb: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=400&q=60",
            alt: "Abstract icon collage representing downloadable learning content",
        },
        {
            icon: <FaChartLine className="text-emerald-600 dark:text-emerald-400 text-2xl" />,
            bg: "bg-emerald-100/70 dark:bg-emerald-900/30",
            title: "Capstone & Progress",
            text: "Project-based capstone and skill tracking for jobs.",
            features: ["Project brief", "Skill badges", "Portfolio export"],
            level: 6,
            thumb: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=60",
            alt: "Developer building an EV analytics dashboard on a laptop",
        },
    ];

    return (
        <section id="paths" className="relative py-24 bg-gradient-to-b from-white via-emerald-50/40 to-teal-50/20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-hidden transition-colors">
            <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_65%)]" />
            <div className="container mx-auto px-6">
                {/* Section Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                        Structured Learning Paths
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Clear, hands-on paths from basics to applied EV skills — fast, practical, and locally relevant.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            className="service-card group bg-white/75 dark:bg-slate-900/55 border border-emerald-200/60 dark:border-emerald-700/50 p-6 rounded-2xl transition duration-300 hover:shadow-xl backdrop-blur-sm relative overflow-hidden"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent" />
                            {/* Mini thumbnail */}
                            <div className="relative mb-5 h-28 w-full overflow-hidden rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                                <Image
                                    src={service.thumb}
                                    alt={service.alt || service.title}
                                    fill
                                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    priority={idx < 2}
                                />
                                <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-slate-900/70 text-white text-[10px] font-medium px-2 py-1 backdrop-blur-sm dark:bg-slate-900/60">
                                    Level {service.level}
                                </span>
                            </div>
                            <div className={`w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-4 shadow-inner ring-1 ring-emerald-500/20 dark:ring-emerald-400/20`}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                                {service.title}
                                <span className="inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-medium px-2 py-0.5">
                                    Path
                                </span>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{service.text}</p>
                            {/* Progress bar illustration */}
                            <div className="mb-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <span
                                    className="block h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400"
                                    style={{ width: `${(service.level / services.length) * 100}%` }}
                                />
                            </div>
                            <ul className="space-y-2">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center text-gray-700 dark:text-gray-200">
                                        <FaCheckCircle className="mr-2 text-emerald-500 dark:text-emerald-400" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-[11px] font-medium tracking-wide text-emerald-600 dark:text-emerald-400">{service.level}/6</span>
                                <button className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                                    Explore
                                    <span className="inline-block h-1 w-1 rounded-full bg-current" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
