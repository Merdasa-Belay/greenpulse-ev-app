// components/landing/Appointment.tsx
"use client";

import { motion } from "@/lib/motion";
import { CalendarIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/solid";


const features = [
    {
        icon: CalendarIcon,
        title: "Easy Scheduling",
        description: "24/7 online booking",
    },
    {
        icon: ShieldCheckIcon,
        title: "Certified Experts",
        description: "EV-specific training",
    },
    {
        icon: BoltIcon,
        title: "Loaner Chargers",
        description: "While you wait",
    },
];


const Appointment = () => {
    return (
        <section
            id="appointment"
            aria-labelledby="appointment-heading"
            className="py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-slate-950 dark:via-emerald-900/10 dark:to-slate-950 transition-colors"
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-emerald-100/70 dark:border-emerald-800/40 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-xl">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Info Panel */}
                        <motion.div
                            className="md:w-1/2 relative p-10 md:p-14 text-white"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500" />
                            <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                            <div className="relative">
                                <h2 id="appointment-heading" className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
                                    Book EV Service & Support
                                </h2>
                                <p className="mb-8 text-emerald-50/90 max-w-md">
                                    Green Pulse not only trains—our certified team supports diagnostics, maintenance and deployment for electric & hybrid vehicles.
                                </p>
                                <ul className="space-y-6">
                                    {features.map((feature) => (
                                        <li key={feature.title} className="flex items-start gap-4">
                                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                                                <feature.icon className="h-6 w-6 text-white" />
                                            </span>
                                            <div>
                                                <h3 className="font-semibold text-white text-sm tracking-wide flex items-center gap-2">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-xs text-emerald-50/80 mt-1 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-10 text-[11px] uppercase tracking-wide text-emerald-50/70">
                                    Safety • Diagnostics • Sustainability
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Form Panel */}
                        <motion.div
                            className="md:w-1/2 p-10 md:p-14"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Service Request</h3>
                            <form className="space-y-5" aria-describedby="service-help">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                        <input id="name" name="name" type="text" autoComplete="name" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Meles Kebede" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                        <input id="email" name="email" type="email" autoComplete="email" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="you@example.com" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="phone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                                        <input id="phone" name="phone" type="tel" autoComplete="tel" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="+251 9XX XXX XXX" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="vehicle" className="text-sm font-medium text-slate-700 dark:text-slate-300">Vehicle Make / Model</label>
                                        <input id="vehicle" name="vehicle" type="text" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. BYD Qin, Hyundai Kona" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="service" className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Needed</label>
                                    <select id="service" name="service" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                        <option>Battery Diagnostics</option>
                                        <option>Routine Maintenance</option>
                                        <option>Charger Installation</option>
                                        <option>Software Update</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="notes" className="text-sm font-medium text-slate-700 dark:text-slate-300">Additional Notes (Optional)</label>
                                    <textarea id="notes" name="notes" rows={3} className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Describe issue, warning lights, prior work..." />
                                </div>
                                <p id="service-help" className="text-[11px] text-slate-500 dark:text-slate-400">We respond within one business day. Your details stay confidential.</p>
                                <button
                                    type="submit"
                                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 ring-1 ring-emerald-400/40 transition-colors hover:from-emerald-500 hover:to-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                                >
                                    <span className="absolute -inset-px rounded-xl opacity-0 blur transition group-hover:opacity-60 group-hover:bg-teal-400/20" aria-hidden />
                                    Schedule Appointment
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;
