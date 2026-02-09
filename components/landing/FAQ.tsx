"use client";
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from '@/lib/motion';

interface QA { q: string; a: string; }
interface FAQGroup { category: string; blurb?: string; items: QA[]; }

// Grouped FAQs to cover learning + service + platform concerns (EV services emphasis added)
const faqGroups: FAQGroup[] = [
    {
        category: 'Training & Learning Paths',
        blurb: 'Curriculum depth, starting points, certifications, and in‑person delivery.',
        items: [
            {
                q: 'What EV topics do the learning paths cover?',
                a: 'Battery systems, charging infrastructure, diagnostics, safety protocols, sustainability practices, and practical service procedures adapted to Ethiopian road & climate realities.'
            },
            {
                q: 'Do I need prior experience to start?',
                a: 'No. You can begin with foundational electrical safety and EV architecture modules. The platform gradually unlocks advanced diagnostics and analytics as you progress.'
            },
            {
                q: 'Are classes in-person or online?',
                a: 'All classes are currently in‑person and live. We focus on hands‑on practice and shop-floor learning.'
            },
            {
                q: 'Will you issue certifications?',
                a: 'Yes. We will issue skill badges and completion certificates co‑endorsed by partner institutions as they finalize alignment standards.'
            }
        ]
    },
    {
        category: 'EV Service & Maintenance',
        blurb: 'Hands‑on support, turnaround, warranties, and parts sourcing.',
        items: [
            {
                q: 'What types of EV services do you provide?',
                a: 'Diagnostics, battery health assessment, charge system calibration, software update guidance, component sourcing assistance, and preventive maintenance coaching.'
            },
            {
                q: 'How do I book a maintenance or diagnostic session?',
                a: 'Use the Appointment section to submit a request. You will receive a confirmation email and (during business hours) a follow‑up scheduling call or message.'
            },
            {
                q: 'What is the typical turnaround time?',
                a: 'Basic diagnostic reports: 24–48 hours. Component sourcing or deeper battery analysis can take 3–7 business days depending on part availability and logistics.'
            },
            {
                q: 'Do you offer any service warranty?',
                a: 'Yes. Advisory & calibration sessions carry a 14‑day adjustment window; component‑level work follows supplier or manufacturer terms when applicable.'
            },
            {
                q: 'Can you help source rare EV parts locally?',
                a: 'We leverage partner networks and vetted import channels to identify compatible components, prioritizing safety certifications and cost efficiency.'
            },
            {
                q: 'Do you provide mobile or on‑site service?',
                a: 'Selective mobile diagnostics are piloting in Addis. For more complex interventions we coordinate controlled facility access to ensure tooling quality and safety.'
            }
        ]
    },
    {
        category: 'Platform, Accounts & Data',
        blurb: 'Access, privacy, pricing model, and upcoming capabilities.',
        items: [
            {
                q: 'Who is Green Pulse for?',
                a: 'Students, vocational trainees, educators, fleet managers, and service professionals building applied EV & green tech capability in emerging markets.'
            },
            {
                q: 'How will pricing work?',
                a: 'Core learning modules remain free in beta. Advanced analytics, certification tracks, and premium service tooling will introduce tiered plans later.'
            },
            {
                q: 'How is my data protected?',
                a: 'We limit personal data collection, encrypt sensitive tokens, and follow least‑privilege access. Diagnostic logs are anonymized for aggregate insights.'
            },
            {
                q: 'Can institutions get custom dashboards?',
                a: 'Yes. Partner institutions can request cohort performance dashboards, curriculum alignment mapping, and aggregated skills analytics.'
            },
            {
                q: 'What features are coming next?',
                a: 'Battery degradation forecasting, route energy planner, real‑time charger crowd data, and integrated certification exam scheduling.'
            }
        ]
    }
];

export default function FAQ() {
    const [open, setOpen] = useState<string | null>(null); // use unique key strings now

    return (
        <section
            id="faq"
            aria-labelledby="faq-heading"
            className="relative py-28 md:py-32 bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/60"
        >
            {/* Decorative gradient aura */}
            <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_60%)]" />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <h2
                        id="faq-heading"
                        className="inline-block text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 bg-clip-text text-transparent"
                    >
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-5 text-slate-600 dark:text-slate-300 text-sm md:text-base">
                        Quick clarity on EV training, hands‑on maintenance services, and platform reliability.
                    </p>
                </div>

                <div className="mt-16 space-y-14">
                    {faqGroups.map(group => (
                        <div key={group.category} className="group">
                            <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-medium shadow-sm ring-1 ring-white/20 dark:ring-slate-900/40">
                                            {group.category.slice(0, 2).toUpperCase()}
                                        </span>
                                        {group.category}
                                    </h3>
                                    {group.blurb && (
                                        <p className="mt-2 text-xs md:text-sm text-slate-600 dark:text-slate-400 max-w-prose">{group.blurb}</p>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-emerald-200/70 dark:border-emerald-700/40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm divide-y divide-slate-200 dark:divide-slate-700">
                                {group.items.map((item, idx) => {
                                    const key = group.category + '-' + idx;
                                    const isOpen = open === key;
                                    return (
                                        <div key={key}>
                                            <button
                                                onClick={() => setOpen(isOpen ? null : key)}
                                                className="w-full flex items-start gap-5 text-left px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                                aria-expanded={isOpen}
                                                aria-controls={`faq-panel-${key}`}
                                            >
                                                <span className="flex-1">
                                                    <h4 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                                        {item.q}
                                                    </h4>
                                                </span>
                                                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 bg-white/80 dark:bg-slate-800 transition-colors">
                                                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                                                        <ChevronDownIcon className="h-5 w-5" />
                                                    </motion.span>
                                                </span>
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        id={`faq-panel-${key}`}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: [0.22, 0.8, 0.36, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
