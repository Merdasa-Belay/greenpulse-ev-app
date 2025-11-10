"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { FaTiktok, FaTwitter, FaYoutube, FaTelegramPlane } from 'react-icons/fa';
import SocialButton from "../ui/SocialButton";
import { motion } from "@/lib/motion";


const Contact = () => {
    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="py-24 bg-gradient-to-b from-white via-emerald-50/40 to-white dark:from-slate-950 dark:via-emerald-900/10 dark:to-slate-950 transition-colors"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Connect With <span className="text-emerald-600 dark:text-emerald-400">Green Pulse</span>
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Questions about training, service or deployment support? We’ll help you move forward confidently.
                    </p>
                </div>

                {/* Main content */}
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Contact Info */}
                    <motion.div
                        className="lg:w-1/2 relative overflow-hidden rounded-2xl border border-emerald-100/70 dark:border-emerald-800/40 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm p-8 md:p-10 shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-transparent pointer-events-none" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Contact Information</h3>
                        <div className="space-y-7 text-sm">
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300"><MapPinIcon className="h-6 w-6" /></span>
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">Location</h4>
                                    <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">Around Totot Traditional Food Hall | Gerji</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300"><PhoneIcon className="h-6 w-6" /></span>
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">Phone</h4>
                                    <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-300">
                                        <li>+251 911 758 111</li>
                                        <li>+251 912 072 341</li>
                                        <li>+251 913 024 687</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300"><EnvelopeIcon className="h-6 w-6" /></span>
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">Email</h4>
                                    <ul className="mt-1 space-y-1 text-slate-600 dark:text-slate-300">
                                        <li>info@greenpulse.com</li>
                                        <li>service@greenpulse.com</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300"><ClockIcon className="h-6 w-6" /></span>
                                <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">Hours</h4>
                                    <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">Mon–Fri: 8:00–18:00<br />Sat: 9:00–16:00<br />Sun: Emergency Only</p>
                                </div>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="mt-10">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Follow Us</h4>
                            <ul className="flex flex-wrap gap-4">
                                <li><SocialButton href="https://www.tiktok.com/@greenpulseaddis" label="TikTok" brand="#010101" icon={<FaTiktok className="text-[1.05rem]" />} /></li>
                                <li><SocialButton href="https://twitter.com/yourhandle" label="Twitter" brand="#1DA1F2" icon={<FaTwitter className="text-[1.05rem]" />} /></li>
                                <li><SocialButton href="https://www.youtube.com/@greenpulse-addis" label="YouTube" brand="#FF0000" icon={<FaYoutube className="text-[1.05rem]" />} /></li>
                                <li><SocialButton href="https://t.me/Evcarsethio" label="Telegram" brand="#0088CC" icon={<FaTelegramPlane className="text-[1.05rem]" />} /></li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:w-1/2 relative overflow-hidden rounded-2xl border border-emerald-100/70 dark:border-emerald-800/40 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm p-8 md:p-10 shadow-lg"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-400/10 to-transparent pointer-events-none" />
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Send Us a Message</h3>
                        <form className="space-y-6" aria-describedby="contact-help">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="first-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                                    <input id="first-name" name="firstName" type="text" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Hana" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="last-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                                    <input id="last-name" name="lastName" type="text" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Bekele" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="contact-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                <input id="contact-email" name="email" type="email" autoComplete="email" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="you@example.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label>
                                <input id="subject" name="subject" type="text" className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Training, Service, Consultation..." />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                <textarea id="message" name="message" rows={5} className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="How can we support you?" />
                            </div>
                            <p id="contact-help" className="text-[11px] text-slate-500 dark:text-slate-400">We respond within 1 business day. Your details remain private.</p>
                            <button
                                type="submit"
                                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-500/25 ring-1 ring-emerald-400/40 transition-colors hover:from-emerald-500 hover:to-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                <span className="absolute -inset-px rounded-xl opacity-0 blur transition group-hover:opacity-60 group-hover:bg-teal-400/20" aria-hidden />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
