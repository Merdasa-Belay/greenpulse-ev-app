"use client";

import { motion } from "framer-motion";

export default function Stats() {
    const stats = [
        { value: "1,250+", label: "EVs Serviced", color: "green" },
        { value: "98%", label: "Customer Satisfaction", color: "blue" },
        { value: "50+", label: "Certified Technicians", color: "green" },
        { value: "15+", label: "Future Models Coming", color: "blue" },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {stats.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className={`stats-item bg-gray-50 p-6 rounded-lg text-center border-b-4 border-${item.color}-500`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`text-${item.color}-500 text-4xl font-bold mb-2`}
                            >
                                {item.value}
                            </div>
                            <p className="text-gray-600">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
