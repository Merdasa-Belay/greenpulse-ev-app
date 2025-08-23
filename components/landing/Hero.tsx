import Link from "next/link";
// Image is used in the client visual only; keep this server file import-free to avoid extra bundle weight.
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import ClientVisualLoader from './ClientVisualLoader.client';
import ClientCTALoader from './ClientCTALoader.client';

export default function Hero() {
    // Server component: keep markup light and static. Client-only interactivity
    // (auth checks, motion) is split into small client components dynamically loaded.

    return (
        <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden bg-white dark:bg-slate-950 scroll-mt-24 md:scroll-mt-28">
            <div className="absolute inset-0 -z-10">
                <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-emerald-300/20 dark:bg-emerald-800/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-teal-300/20 dark:bg-teal-800/20 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:60px_60px] dark:[background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white dark:from-slate-950/70 dark:via-slate-950/40 dark:to-slate-950" />
            </div>

            <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-28 pb-12 md:pb-16 sm:px-6 lg:px-8">
                <div className="grid items-center gap-20 md:grid-cols-2">
                    <div className="relative">
                        <div className="mb-7 flex flex-wrap items-center gap-3">
                            {/* Static badges - lightweight icons (no motion) */}
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-700/60 bg-white/60 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm shadow-sm">
                                <span className="text-emerald-600"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" /></svg></span>
                                EV Maintenance
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-700/60 bg-white/60 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm shadow-sm">
                                <span className="text-emerald-600"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="currentColor" /></svg></span>
                                EV training
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-700/60 bg-white/60 dark:bg-slate-900/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 backdrop-blur-sm shadow-sm">
                                <span className="text-emerald-600"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" /></svg></span>
                                Practical EV Workshops
                            </span>
                        </div>

                        <h1 id="hero-heading" className="text-balance text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
                            EV Training & Maintenance in Addis Ababa, Ethiopia | Green Pulse
                        </h1>

                        <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
                            Hands-on electric vehicle training, EV maintenance services and battery diagnostics in Addis Ababa, Ethiopia—practical pathways that build local technician and electric mobility capacity.
                        </p>

                        <div className="mt-12 flex flex-wrap gap-4">
                            {/* Client-only CTA handles auth state and interactions */}
                            <ClientCTALoader />
                            <Link
                                href="/sign-in"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-300/70 dark:border-slate-700/70 bg-white/50 dark:bg-slate-900/50 px-8 text-lg font-medium text-slate-900 dark:text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:hover:bg-slate-900/70 hover:border-slate-400 dark:hover:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                            >
                                <PlayCircleIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                <span>View Curriculum</span>
                            </Link>
                        </div>

                        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                            Limited early access • Localized content • Founding member recognition.
                        </p>
                    </div>

                    {/* Visual (client-only, dynamically loaded) */}
                    <ClientVisualLoader />
                </div>
            </div>
        </section>
    );
}

