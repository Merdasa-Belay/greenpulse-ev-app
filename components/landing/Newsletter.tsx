"use client";

import { motion } from "@/lib/motion";
import { useState } from "react";
import { FaEnvelope } from 'react-icons/fa';

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire to real subscription endpoint
        // keep simple UX for now
        setEmail("");
    };

    return (
        <section className="py-16 bg-gradient-to-b from-emerald-50/60 to-white dark:from-emerald-900/6 dark:to-slate-900">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-3xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-emerald-100 dark:border-emerald-900/30 rounded-2xl px-6 py-10 text-center shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
                            <FaEnvelope className="h-5 w-5" />
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold">Get local EV & training updates</h3>
                    </div>
                    <p className="mb-6 text-sm text-gray-700 dark:text-gray-300">Practical tips, workshop dates and bite-sized learning — once a month.</p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3"
                        aria-label="Subscribe to newsletter"
                    >
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="Email address"
                                className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-900 placeholder-gray-500 transition"
                            />
                            <span className="absolute left-3 top-3 text-emerald-500">📧</span>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none font-medium shadow-sm"
                        >
                            Subscribe
                        </motion.button>
                    </form>

                    <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">No spam — unsubscribe any time.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
