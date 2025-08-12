import Link from 'next/link';

export default function CTASection() {
    return (
        <section aria-labelledby="cta-heading" className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 id="cta-heading" className="text-2xl font-bold text-slate-900 md:text-3xl">
                    Ready to charge smarter?
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                    Join Green Pulse and make every journey efficient and sustainable.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <Link
                        href="/sign-up"
                        className="inline-flex h-12 items-center justify-center rounded-lg bg-slate-900 px-6 text-white shadow-sm transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                        Create your account
                    </Link>
                    <Link
                        href="/companions"
                        className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 px-6 text-slate-900 transition-colors duration-200 hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                        Explore companions
                    </Link>
                </div>
            </div>
        </section>
    );
}
