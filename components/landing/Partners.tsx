"use client";

import { motion } from "@/lib/motion";
import Link from "next/link";
import Image from 'next/image';

type PartnerTier = 'founding' | 'strategic' | 'community';
interface Partner {
    name: string;
    url: string;
    role: string; // short descriptor
    description: string; // short contribution line
    tier: PartnerTier;
    logoSrc?: string; // path to svg/png when available
    pilot?: boolean;
}

const partnersByTier: Record<PartnerTier, Partner[]> = {
    founding: [
        {
            name: 'Ministry of Transport & Logistics',
            url: '#',
            role: 'Policy Alignment',
            description: 'Aligns technician pathways with national EV & safety standards.',
            tier: 'founding'
        },
        {
            name: 'Ethiopian Electric Power',
            url: '#',
            role: 'Grid Insight',
            description: 'Provides charging & grid resilience context for curriculum.',
            tier: 'founding'
        },
    ],
    strategic: [
        {
            name: 'GreenTech Assemblers',
            url: '#',
            role: 'Assembly Exposure',
            description: 'Real component handling & assembly environment (pilot).',
            tier: 'strategic',
            pilot: true
        },
        {
            name: 'EV Owners Association',
            url: '#',
            role: 'Operational Feedback',
            description: 'Shares real maintenance & usage pain points for training.',
            tier: 'strategic'
        },
    ],
    community: [
        {
            name: 'Addis Technical College',
            url: '#',
            role: 'Pilot Training Site',
            description: 'Hosts blended labs validating learning pathways.',
            tier: 'community'
        },
        {
            name: 'Marcon Import & Export',
            url: '#',
            role: 'Supply Chain Support',
            description: 'Facilitates tooling & component access for service modules.',
            tier: 'community'
        },
        {
            name: 'Renewable Skills Hub',
            url: '#',
            role: 'Energy Integration',
            description: 'Extends scenarios with hybrid / solar charging contexts.',
            tier: 'community'
        },
        {
            name: 'Urban Mobility Cooperative',
            url: '#',
            role: 'Adoption Catalyst',
            description: 'Links training outcomes to growing local EV usage.',
            tier: 'community'
        },
    ],
};

const tierBadgeStyles: Record<PartnerTier, string> = {
    founding: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    strategic: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    community: 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
};

export default function Partners() {
    const ordered: PartnerTier[] = ['founding', 'strategic', 'community'];
    return (
        <section id="partners" aria-labelledby="partners-heading" className="relative py-24 bg-white dark:bg-slate-950 transition-colors">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(circle_at_center,rgba(16,185,129,0.25),transparent_60%)]" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-14 max-w-3xl text-center"
                >
                    <h2 id="partners-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Partners & Collaborators
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                        Cross‑sector alignment powering Ethiopia’s EV talent, service capability & sustainable adoption.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {ordered.map((tier, tierIndex) => (
                        <div key={tier}>
                            <div className="mb-6 flex items-center gap-2">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-500 dark:text-slate-400">
                                    {tier === 'founding' && 'Founding / Policy'}
                                    {tier === 'strategic' && 'Strategic / Tech'}
                                    {tier === 'community' && 'Community / Local Integration'}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {partnersByTier[tier].map((p, i) => (
                                    <motion.div
                                        key={p.name}
                                        initial={{ opacity: 0, y: 32 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.55, delay: (tierIndex * 0.1) + i * 0.06 }}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-xl"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold text-lg tracking-tight ring-2 ring-emerald-400/40 dark:ring-emerald-600/50">
                                                    {p.logoSrc ? (
                                                        <Image src={p.logoSrc as string} alt={p.name + ' logo'} width={40} height={40} className="h-10 w-10 object-contain grayscale group-hover:grayscale-0 transition" />
                                                    ) : (
                                                        p.name.split(/\s+/).slice(0, 2).map(w => w[0]).join("")
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                                                        <Link
                                                            href={p.url}
                                                            target={p.url.startsWith('http') ? '_blank' : undefined}
                                                            rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                            className="outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm"
                                                        >
                                                            {p.name}
                                                        </Link>
                                                    </h4>
                                                    <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                                                        {p.role}{p.pilot && ' \u2022 Pilot'}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 ${tierBadgeStyles[tier]}`}>
                                                {tier}
                                            </span>
                                        </div>
                                        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">{p.description}</p>
                                        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sr-only" aria-hidden>
                    Partners & Collaborators listed across Founding/Policy, Strategic/Tech and Community tiers supporting Ethiopia&rsquo;s EV talent development.
                </div>
            </div>
        </section>
    );
}

// Presentation Copy Suggestions:
// Title Ideas: "Trusted Partners", "Collaborative Network", "Partners & Collaborators", "In Collaboration With", "Supported By".
// Slide Tagline: Cross‑sector collaboration aligning Ethiopia’s EV & green energy skills with technology, infrastructure and policy.
// Website copy kept concise in component.
