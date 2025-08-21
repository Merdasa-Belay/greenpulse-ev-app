"use client";

import Image from "next/image";
import { FC } from "react";
import { motion } from '@/lib/motion';
import { BoltIcon, CheckBadgeIcon, UsersIcon, GlobeAltIcon, AcademicCapIcon, SparklesIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

const parent = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
} as const;

const reveal = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }
} as const;

const card = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
} as const;

const About: FC = () => {
    return (
        <section id="about" aria-labelledby="about-heading" className="bg-gradient-to-b from-gray-50 via-white to-white dark:from-slate-900 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

                    {/* Left: content */}
                    <div className="lg:col-span-7">
                        <motion.h2 variants={reveal} id="about-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            About Us
                        </motion.h2>

                        <motion.div variants={reveal} className="mt-3 flex items-center gap-3 text-sm text-emerald-600">
                            <SparklesIcon className="h-5 w-5 flex-none" />
                            <span className="font-medium">Practical EV training · Local partnerships · Circular battery care</span>
                        </motion.div>

                        <motion.p variants={reveal} className="mt-4 text-slate-700 dark:text-slate-300 text-lg leading-relaxed max-w-2xl">
                            We’re Green Pulse EV — Ethiopia’s platform for EV diagnostics, maintenance training and practical workforce development. We train technicians, partner with workshops, and help organizations deploy electric mobility with confidence.
                        </motion.p>

                        {/* mission + vision sub-cards */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                            <motion.div variants={card} className="flex gap-4 items-start rounded-2xl bg-white/80 dark:bg-slate-800/80 p-5 shadow-md border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1 backdrop-blur-sm">
                                <div className="flex-none rounded-lg p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md ring-1 ring-emerald-100/30">
                                    <AcademicCapIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Mission</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Accelerate safe EV adoption by building local maintenance capacity, delivering hands-on training, and enabling sustainable service networks.</p>
                                </div>
                            </motion.div>

                            <motion.div variants={card} className="flex gap-4 items-start rounded-2xl bg-white/80 dark:bg-slate-800/80 p-5 shadow-md border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1 backdrop-blur-sm">
                                <div className="flex-none rounded-lg p-3 bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-md ring-1 ring-emerald-100/30">
                                    <GlobeAltIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Vision</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A resilient, low-carbon mobility ecosystem in Ethiopia powered by skilled local teams and circular battery stewardship.</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Why choose us - trust cards */}
                        <div className="mt-8">
                            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Why choose us</h4>
                            <motion.div variants={parent} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                                <motion.article variants={card} className="flex gap-4 items-start rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1">
                                    <div className="flex-none rounded-lg p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md ring-1 ring-emerald-100/30">
                                        <BoltIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Hands-on training</h5>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Real-vehicle labs and diagnostics built for local conditions.</p>
                                    </div>
                                </motion.article>

                                <motion.article variants={card} className="flex gap-4 items-start rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1">
                                    <div className="flex-none rounded-lg p-3 bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-md ring-1 ring-emerald-100/30">
                                        <CheckBadgeIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Certified pathways</h5>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Stackable credentials that link to industry recognition.</p>
                                    </div>
                                </motion.article>

                                <motion.article variants={card} className="flex gap-4 items-start rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1">
                                    <div className="flex-none rounded-lg p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md ring-1 ring-emerald-100/30">
                                        <UsersIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Partner network</h5>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Workshops, fleets and institutions collaborate to scale services.</p>
                                    </div>
                                </motion.article>

                                <motion.article variants={card} className="flex gap-4 items-start rounded-2xl bg-white dark:bg-slate-800 p-4 shadow-sm border border-transparent hover:border-emerald-100 transition-transform hover:-translate-y-1">
                                    <div className="flex-none rounded-lg p-3 bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-md ring-1 ring-emerald-100/30">
                                        <GlobeAltIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-900 dark:text-white">Sustainability focus</h5>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Battery care, reuse strategies and efficient charging reduce lifecycle impact.</p>
                                    </div>
                                </motion.article>
                            </motion.div>
                        </div>

                        {/* small stats badges */}
                        <div className="mt-6">
                            <motion.div variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex flex-wrap gap-3 items-center">
                                <motion.span variants={card} className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-800/60 px-3 py-1 text-sm font-medium text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5">
                                    <ChartBarIcon className="h-4 w-4 text-emerald-500" />
                                    <span>50+ trainings</span>
                                </motion.span>

                                <motion.span variants={card} className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-800/60 px-3 py-1 text-sm font-medium text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5">
                                    <UsersIcon className="h-4 w-4 text-emerald-500" />
                                    <span>100+ partners</span>
                                </motion.span>

                                <motion.span variants={card} className="inline-flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-800/60 px-3 py-1 text-sm font-medium text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-900/5">
                                    <ClockIcon className="h-4 w-4 text-emerald-500" />
                                    <span>5k+ practical hours</span>
                                </motion.span>
                            </motion.div>
                        </div>

                        {/* CTA mini-footer */}
                        <motion.div variants={reveal} className="mt-8 rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-md border border-transparent flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">Join the EV revolution — train your team, certify your workshop, or partner with us.</p>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 text-sm font-medium shadow hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400">Partner with us →</a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: visual - EV image with icon badges */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-emerald-200/30 bg-gradient-to-tr from-slate-900 via-emerald-700 to-teal-500 p-6 flex items-center">
                            <div className="relative flex items-center justify-center w-full">
                                <div className="w-full h-full max-w-md">
                                    <Image src="/readme/hero.png" alt="EV training and diagnostics" width={1200} height={900} className="w-full h-full rounded-xl object-cover" priority />
                                </div>

                                {/* icon badges */}
                                <div className="absolute inset-0 flex items-start justify-end p-4 pointer-events-none sm:pointer-events-auto">
                                    <div className="flex flex-col gap-3">
                                        <motion.span role="img" aria-label="Electric vehicle" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-flex items-center gap-1 rounded-full bg-white/90 text-emerald-600 px-2 py-1 text-xs font-semibold shadow"> 
                                            <BoltIcon className="h-3 w-3" />
                                            <span className="sr-only">EV</span>
                                            <span aria-hidden>EV</span>
                                        </motion.span>

                                        <motion.span role="img" aria-label="Certified pathways" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-flex items-center gap-1 rounded-full bg-white/90 text-slate-700 px-2 py-1 text-xs font-medium shadow">
                                            <CheckBadgeIcon className="h-3 w-3 text-emerald-500" />
                                            <span className="sr-only">Certified</span>
                                            <span aria-hidden>Certified</span>
                                        </motion.span>

                                        <motion.span role="img" aria-label="Local partnerships" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-flex items-center gap-1 rounded-full bg-white/90 text-slate-700 px-2 py-1 text-xs font-medium shadow">
                                            <SparklesIcon className="h-3 w-3 text-amber-400" />
                                            <span className="sr-only">Local</span>
                                            <span aria-hidden>Local</span>
                                        </motion.span>
                                    </div>
                                </div>

                                {/* bottom-left small badge */}
                                <div className="absolute left-4 bottom-4">
                                    <motion.span role="img" aria-label="Partners" whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} className="inline-flex items-center gap-1 rounded-full bg-white/90 text-slate-700 px-2 py-1 text-xs font-medium shadow">
                                        <UsersIcon className="h-3 w-3 text-emerald-500" />
                                        <span className="sr-only">Partners</span>
                                        <span aria-hidden>Partners</span>
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
