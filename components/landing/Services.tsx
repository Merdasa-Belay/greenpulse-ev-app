"use client";

import { motion } from "framer-motion";
import {
    FaCarBattery,
    FaTools,
    FaMicrochip,
    FaServicestack,
    FaCloudDownloadAlt,
    FaChartLine,
    FaCheckCircle,
} from "react-icons/fa";

export default function Services() {
    const services = [
        {
            icon: <FaTools className="text-green-500 text-2xl" />,
            bg: "bg-green-100",
            title: "Foundation Essentials",
            text: "Core electrical safety, EV architecture & terminology to build a solid base.",
            features: [
                "High‑voltage safety",
                "System components",
                "Tooling basics",
            ],
            color: "green",
        },
        {
            icon: <FaCarBattery className="text-blue-500 text-2xl" />,
            bg: "bg-blue-100",
            title: "EV Power & Batteries",
            text: "Battery pack anatomy, BMS logic & thermal management fundamentals.",
            features: [
                "Cell & module structure",
                "State of health checks",
                "Thermal diagnostics",
            ],
            color: "blue",
        },
        {
            icon: <FaMicrochip className="text-green-500 text-2xl" />,
            bg: "bg-green-100",
            title: "Systems Diagnostics",
            text: "Troubleshooting drivetrains, inverters, charging & control systems.",
            features: [
                "Error code logic",
                "Signal tracing",
                "Common fault trees",
            ],
            color: "green",
        },
        {
            icon: <FaServicestack className="text-blue-500 text-2xl" />,
            bg: "bg-blue-100",
            title: "EV Service Skills",
            text: "Hands-on training for practical EV service and repair.",
            features: [
                "Routine maintenance procedures",
                "Battery replacement & diagnostics",
                "Charging system inspection",
            ],
            color: "blue",
        },
        {
            icon: <FaCloudDownloadAlt className="text-green-500 text-2xl" />,
            bg: "bg-green-100",
            title: "Offline Access",
            text: "Low‑bandwidth optimized & downloadable lesson packs for unstable grids.",
            features: [
                "Compressed media",
                "Sync later mode",
                "Lightweight quizzes",
            ],
            color: "green",
        },
        {
            icon: <FaChartLine className="text-blue-500 text-2xl" />,
            bg: "bg-blue-100",
            title: "Capstone & Progress",
            text: "Applied project build + tracked competencies for employability.",
            features: [
                "Project brief",
                "Skill badges",
                "Portfolio export",
            ],
            color: "blue",
        },
    ];

    return (
        <section id="paths" className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors">
            <div className="container mx-auto px-6">
                {/* Section Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Structured <span className="text-green-600 dark:text-emerald-400">Learning Paths</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Guided progression from fundamentals to applied EV & green energy skill readiness.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            className="service-card bg-white dark:bg-slate-800/70 border border-transparent dark:border-slate-700 p-8 rounded-lg transition duration-300 hover:shadow-lg"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`w-16 h-16 ${service.bg} rounded-full flex items-center justify-center mb-6`}
                            >
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{service.text}</p>
                            <ul className="space-y-2">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-200">
                                        <FaCheckCircle className={`mr-2 ${service.color === 'green' ? 'text-green-500 dark:text-emerald-400' : 'text-blue-500 dark:text-blue-400'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
