import React from 'react';
import { Card } from '@/components/ui/Card';
import { AcademicCapIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const Cohorts = () => {
    const items = [
        {
            title: '2025 • Institution Beta',
            tone: 'from-emerald-600 to-teal-600 text-white',
            icon: <AcademicCapIcon className="h-5 w-5" />,
            tag: 'Full'
        },
        {
            title: '2025 • Pilot Cohort',
            tone: 'from-white/90 via-white/80 to-white/90 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 text-slate-900 dark:text-white',
            icon: <BoltIcon className="h-5 w-5 text-emerald-600" />,
            tag: 'Open'
        },
        {
            title: '2026+ • Regional Labs',
            tone: 'from-white/90 via-white/80 to-white/90 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-800 text-slate-900 dark:text-white',
            icon: <GlobeAltIcon className="h-5 w-5 text-sky-500" />,
            tag: 'Planned'
        },
    ];

    return (
        <section aria-labelledby="cohorts-heading" className="mt-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h3 id="cohorts-heading" className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="inline-block size-2 rounded-full bg-emerald-500" />Pilot cohorts
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 max-w-sm">Progressive rollout across academic partners and applied lab hubs. Apply early to secure placement in an evaluation cycle.</p>
                </div>
                <a href="#apply" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">View all →</a>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {items.map((it) => (
                    <Card
                        key={it.title}
                        className={`relative p-4 flex flex-col gap-4 overflow-hidden bg-gradient-to-br ${it.tone} group shadow-sm hover:shadow-xl transition-shadow rounded-xl border border-emerald-100/40 dark:border-emerald-900/30`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg p-2 bg-white/10 dark:bg-white/5 flex items-center justify-center ring-1 ring-white/10 backdrop-blur-sm">
                                {it.icon}
                            </div>
                            <div className="text-sm font-semibold leading-tight truncate flex-1">{it.title}</div>
                            <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/90 text-white font-medium tracking-wide shadow-sm">{it.tag}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-[11px] text-slate-700 dark:text-slate-300">
                            <span className="flex items-center gap-1">{it.tag === 'Open' ? 'Accepting candidates' : it.tag === 'Full' ? 'Waitlist active' : 'Roadmapping phase'}</span>
                            <button className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">Details</button>
                        </div>
                        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition" />
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Cohorts;
