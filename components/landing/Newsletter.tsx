"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // handle newsletter submission logic here
        alert(`Subscribed with ${email}`);
        setEmail("");
    };

    return (
        <section className="py-16 bg-gray-800 text-white">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Stay Charged with Local Insights
                    </h3>
                    <p className="mb-8 text-gray-300">
                        Monthly EV maintenance, solar integration and workforce readiness signals for the Ethiopian market.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3"
                    >
                        <motion.div
                            className="relative w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-gray-800 transition-all duration-300 placeholder-gray-400"
                            />
                            <motion.span
                                className="absolute left-3 top-3 text-green-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: email ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                📧
                            </motion.span>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none font-medium shadow-md transition-all duration-300"
                        >
                            Subscribe
                        </motion.button>
                    </form>


                    <p className="mt-4 text-sm text-gray-400">
                        No spam. Just actionable learning & adoption updates.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
