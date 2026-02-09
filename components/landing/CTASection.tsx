import Link from 'next/link';

export default function CTASection() {
    return (
        <section aria-labelledby="cta-heading" className="bg-white dark:bg-slate-950 transition-colors">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 id="cta-heading" className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
                    Join <span className="text-emerald-600 dark:text-emerald-400">Green Pulse</span> – Ethiopia’s EV Knowledge Hub
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
                    We train technicians, service electric vehicles, and support institutions adopting sustainable mobility.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="#appointment"
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-7 text-white font-semibold shadow-sm shadow-emerald-500/30 transition-colors duration-200 hover:from-emerald-500 hover:to-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                        Book Appointment
                    </Link>
                    <Link
                        href="#contact"
                        className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 px-7 text-slate-900 dark:text-slate-100 font-medium transition-colors duration-200 hover:border-emerald-400 dark:hover:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                        Request Service / Consultation
                    </Link>
                    <Link
                        href="#paths"
                        className="inline-flex h-12 items-center justify-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                        Explore Learning Paths →
                    </Link>
                </div>
                <p className="mt-6 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Safety • Skills • Service • Sustainability
                </p>
            </div>
        </section>
    );
}
