import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-6">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
                <p className="text-slate-600 dark:text-slate-300">The page you’re looking for doesn’t exist.</p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-500"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
