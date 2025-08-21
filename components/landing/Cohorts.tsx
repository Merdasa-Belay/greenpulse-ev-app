import React from 'react';
import { Card } from '@/components/ui/Card';
import { AcademicCapIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const Cohorts = () => {
    const items = [
        { title: '2025 • Institution Beta', tone: 'bg-emerald-600 text-white', icon: <AcademicCapIcon className="h-5 w-5" /> },
        { title: '2025 • Pilot Cohort', tone: 'bg-white/90 dark:bg-slate-800 text-slate-900 dark:text-white', icon: <BoltIcon className="h-5 w-5 text-amber-500" /> },
        { title: '2026+ • Regional Labs', tone: 'bg-white/90 dark:bg-slate-800 text-slate-900 dark:text-white', icon: <GlobeAltIcon className="h-5 w-5 text-sky-500" /> },
    ];

    return (
        <section aria-labelledby="cohorts-heading" className="mt-8">
            <h3 id="cohorts-heading" className="text-sm font-semibold text-slate-900 dark:text-white">Pilot cohorts</h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {items.map((it) => (
                    <Card key={it.title} className={`p-3 flex items-center gap-3 justify-between ${it.tone}`}>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg p-2 bg-white/10 flex items-center justify-center">{it.icon}</div>
                            <div className="text-sm font-semibold truncate">{it.title}</div>
                        </div>
                        <div className="text-xs opacity-90">Apply</div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Cohorts;
