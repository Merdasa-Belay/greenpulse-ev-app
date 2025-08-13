"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
    const reduceMotion = useReducedMotion();

    // Animation variants for the main container
    const containerVariants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 15 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7, // Slightly longer duration for a smoother feel
                ease: [0.25, 1, 0.5, 1], // Custom ease for a more natural bounce
                when: "beforeChildren",
                staggerChildren: reduceMotion ? 0 : 0.1, // Stagger children for sequential animation
            },
        },
    } as const;

    // Animation variants for individual text/button items
    const itemVariants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
    } as const;

    // Animation variants for the main image
    const imageVariants = {
        hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.95, rotate: reduceMotion ? 0 : -3 },
        show: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8, // Longer duration for a more impactful entrance
                ease: [0.25, 1, 0.5, 1], // Custom ease
            },
        },
    } as const;

    return (
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
            {/* Subtle branded background accents - improved for visual depth */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-28 h-80 w-80 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(closest-side, #14C88F44, transparent)" }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-28 h-80 w-80 rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(closest-side, #0ea5e944, transparent)" }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }} // Adjust viewport amount for earlier trigger
                className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8" // Increased vertical padding
            >
                <div className="grid items-center gap-16 md:grid-cols-2"> {/* Increased gap */}
                    {/* Copy */}
                    <div className="relative">
                        <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3"> {/* Increased margin-bottom */}

                        </motion.div>

                        <motion.h1
                            id="hero-heading"
                            variants={itemVariants}
                            className="text-balance text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl" // Larger and bolder headline
                        >
                            Smarter EV Journeys,{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                                Optimized for You.
                            </span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="mt-6 max-w-xl text-xl leading-relaxed text-slate-600"> {/* Larger text and margin */}
                            Plan routes, optimize charging, and track your EV journey with intelligent insights.
                            Built for sustainable travel and learning.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4"> {/* Increased margin and gap */}
                            <Link
                                href="/sign-up"
                                className="inline-flex h-14 items-center justify-center rounded-lg bg-slate-900 px-8 text-lg text-white shadow-lg transition-all duration-300 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2" // Larger, more prominent primary CTA
                            >
                                Get Started Today
                            </Link>
                            <Link
                                href="/sign-in"
                                className="inline-flex h-14 items-center justify-center rounded-lg border border-slate-300 px-8 text-lg text-slate-900 transition-all duration-300 hover:border-slate-400 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2" // Larger secondary CTA
                            >
                                Learn More
                            </Link>
                        </motion.div>

                        <motion.p variants={itemVariants} className="mt-4 text-sm text-slate-500"> {/* Adjusted margin */}
                            No credit card required. Free trial available.
                        </motion.p>
                    </div>

                    {/* Visual */}
                    <motion.div variants={imageVariants} className="relative h-80 md:h-[500px] will-change-transform"> {/* Increased height */}
                        <div className="absolute inset-0 transition-transform duration-500 ease-out motion-safe:hover:scale-105"> {/* More pronounced hover effect */}
                            <Image
                                src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Electric vehicle in motion, representing smart EV routing and charging"
                                fill
                                priority
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover rounded-lg shadow-2xl" // Changed to object-cover, added rounded corners and shadow
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

