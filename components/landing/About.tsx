"use client";

import { FC } from 'react';
import Image from 'next/image';
import { motion } from '@/lib/motion';
import { AcademicCapIcon, GlobeAltIcon, SparklesIcon, BoltIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';
import { IconBadge } from '@/components/ui/IconBadge';
import Cohorts from '@/components/landing/Cohorts';
import Testimonials from '@/components/landing/Testimonials';
import { Button } from '@/components/ui/button';

const parent = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
} as const;

const reveal = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.56, ease: [0.2, 0.8, 0.2, 1] } },
} as const;

const card = {
    hidden: { opacity: 0, y: 6, scale: 0.995 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
} as const;

export const About: FC = () => {
    return (
        <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid grid-cols-1 gap-12">

                    {/* Hero */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
                        <motion.div variants={reveal} className="lg:col-span-7">
                            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">About Green Pulse</h2>
                            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-2xl">Practical EV training, local capacity building, and circular battery stewardship — tailored for Ethiopia’s emerging EV ecosystem.</p>

                            <div className="mt-6 flex gap-3">
                                <Button className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white">Join Us</Button>
                                <a href="#paths" className="inline-flex items-center px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">Learn more</a>
                            </div>
                        </motion.div>

                        <motion.div variants={reveal} className="lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-emerald-200/20 bg-gradient-to-tr from-slate-900 via-emerald-700 to-teal-500">
                                <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-56 xl:h-64">
                                    <Image src="/images/training.png" alt="EV training lab" fill className="object-cover" />
                                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                                        <IconBadge icon={<SparklesIcon className="h-4 w-4 text-emerald-600" />} label="Hands-on" />
                                        <IconBadge icon={<BoltIcon className="h-4 w-4 text-emerald-600" />} label="Charging" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Who we are (swap) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <motion.div variants={reveal} className="order-2 lg:order-1 lg:col-span-7">
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Who we are</h3>
                            <p className="mt-3 text-slate-700 dark:text-slate-300">We train technicians, certify workshops, and partner with local institutions to deliver resilient EV services. Our programs combine classroom learning with real-vehicle labs and diagnostics adapted to local conditions. In addition to training, we directly provide EV service & maintenance support—covering diagnostics, battery health assessment, and safe repair practices—to accelerate ecosystem readiness.</p>
                        </motion.div>
                        <motion.div variants={reveal} className="order-1 lg:order-2 lg:col-span-5">
                            <div className="rounded-2xl overflow-hidden shadow-soft-lg">
                                <div className="relative w-full h-56">
                                    <Image src="/images/evcharging.png" alt="Workshop training" fill className="object-cover" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Vision & Mission */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div variants={card} className="p-5 rounded-2xl bg-white/90 dark:bg-slate-800/80 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg p-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                                    <AcademicCapIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Mission</h4>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Build local maintenance capacity through practical training and certified pathways.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={card} className="p-5 rounded-2xl bg-white/90 dark:bg-slate-800/80 shadow-md">
                            <div className="flex items-start gap-4">
                                <div className="rounded-lg p-3 bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
                                    <GlobeAltIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Vision</h4>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A resilient, low-carbon mobility ecosystem powered by skilled local teams and circular battery stewardship.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Core values */}
                    <div>
                        <h4 className="text-base font-semibold text-slate-900 dark:text-white">Core values</h4>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Card className="p-4 flex items-start gap-3">
                                <div className="rounded-lg p-2 bg-emerald-50 dark:bg-emerald-900/20">
                                    <UsersIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">Community first</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-300">Local partnerships and inclusive access.</div>
                                </div>
                            </Card>

                            <Card className="p-4 flex items-start gap-3">
                                <div className="rounded-lg p-2 bg-emerald-50 dark:bg-emerald-900/20">
                                    <SparklesIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">Practical skills</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-300">Hands-on labs and diagnostics training.</div>
                                </div>
                            </Card>

                            <Card className="p-4 flex items-start gap-3">
                                <div className="rounded-lg p-2 bg-emerald-50 dark:bg-emerald-900/20">
                                    <ChartBarIcon className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">Impact-driven</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-300">Measured outcomes and community impact.</div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Journey / Timeline */}
                    <div className="pb-4 border-b border-emerald-100/60 dark:border-emerald-900/40">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="inline-block size-2 rounded-full bg-emerald-500" />Our journey
                        </h4>
                        <div className="mt-6 relative">
                            <div className="absolute left-3 top-6 bottom-1 w-px bg-gradient-to-b from-emerald-300/70 via-emerald-200/40 to-transparent" aria-hidden />
                            <div className="space-y-8">
                                <motion.div variants={card} className="relative pl-20">
                                    <div className="absolute left-0 top-1 w-14 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-medium">2024</div>
                                    <div className="font-semibold">Founding (Jan 1, 2024)</div>
                                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Green Pulse established to close EV skills gaps & localise maintenance knowledge from day one.</div>
                                </motion.div>

                                <motion.div variants={card} className="relative pl-20">
                                    <div className="absolute left-0 top-1 w-14 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-medium">2024</div>
                                    <div className="font-semibold">EV service offering</div>
                                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Launch of hands-on EV service & maintenance support: diagnostics, battery care & safety.</div>
                                </motion.div>

                                <motion.div variants={card} className="relative pl-20">
                                    <div className="absolute left-0 top-1 w-14 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-medium">2024</div>
                                    <div className="font-semibold">Official platform launch (Jan 3)</div>
                                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Platform & early curriculum released with initial participant onboarding.</div>
                                </motion.div>

                                <motion.div variants={card} className="relative pl-20">
                                    <div className="absolute left-0 top-1 w-14 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-medium">2024</div>
                                    <div className="font-semibold">Scaling cohorts</div>
                                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Expanding training pathways & certifying partner workshops.</div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Spacer & transition before community */}
                    <div className="h-2" aria-hidden />

                    {/* Community & impact */}
                    <div>
                        <h4 className="text-base font-semibold text-slate-900 dark:text-white">Community & impact</h4>
                        <div className="mt-4 flex flex-wrap gap-4 items-center">
                            <div className="inline-flex items-center gap-3 rounded-full bg-white/95 dark:bg-slate-800/70 px-3 py-2 shadow-sm">
                                <ChartBarIcon className="h-5 w-5 text-emerald-500" />
                                <div className="text-sm font-semibold">500+ learners trained</div>
                            </div>

                            <div className="inline-flex items-center gap-3 rounded-full bg-white/95 dark:bg-slate-800/70 px-3 py-2 shadow-sm">
                                <UsersIcon className="h-5 w-5 text-emerald-500" />
                                <div className="text-sm font-semibold">100+ partner workshops</div>
                            </div>

                        </div>

                        <div className="mt-6">
                            <Testimonials />
                        </div>
                    </div>

                    {/* cohorts */}
                    <Cohorts />

                </motion.div>
            </div>
        </section>
    );
};

export default About;
