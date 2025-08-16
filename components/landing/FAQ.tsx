"use client";
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface QA { q: string; a: string; }

const faqs: QA[] = [
    {
        q: 'What EV topics do the learning paths cover?',
        a: 'Battery systems, charging infrastructure, diagnostics, safety protocols, sustainability practices, and practical service procedures contextualized for Ethiopian conditions.'
    },
    {
        q: 'Is offline access available?',
        a: 'Yes. You can download compressed lesson packs, quizzes, and reference sheets to continue learning during connectivity gaps.'
    },
    {
        q: 'Who is Green Pulse for?',
        a: 'Students, vocational trainees, educators, and service professionals seeking hands-on EV & green tech skills in emerging markets.'
    },
    {
        q: 'Do I need prior experience?',
        a: 'No. Foundational modules start with core electrical safety and system basics, then progress to advanced diagnostics.'
    },
    {
        q: 'Will you issue certifications?',
        a: 'Yes. Skill badges and completion certificates are planned for beta participants and will align with partner institution standards.'
    }
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" aria-labelledby="faq-heading" className="relative bg-gradient-to-b from-white via-white to-emerald-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900/40 py-24 md:py-28">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Frequently Asked Questions</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm md:text-base">Answers to common questions about EV maintenance training, access, and platform features.</p>
                </div>
                <div className="mt-14 flex flex-col divide-y divide-slate-200 dark:divide-slate-700 rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm">
                    {faqs.map((item, idx) => {
                        const isOpen = open === idx;
                        return (
                            <div key={item.q} className="group">
                                <button
                                    onClick={() => setOpen(isOpen ? null : idx)}
                                    className="w-full flex items-start gap-4 text-left px-6 py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${idx}`}
                                >
                                    <span className="flex-1">
                                        <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">{item.q}</h3>
                                    </span>
                                    <span className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 bg-white/70 dark:bg-slate-800 transition-colors`}>
                                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                                            <ChevronDownIcon className="h-5 w-5" />
                                        </motion.span>
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-panel-${idx}`}
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
        </section>
    );
}
