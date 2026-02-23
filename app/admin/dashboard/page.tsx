import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Admin Dashboard | Green Pulse",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminDashboardPage() {
    const [totalPosts, draftPosts, publishedPosts] = process.env.DATABASE_URL
        ? await Promise.all([
            prisma.post.count(),
            prisma.post.count({ where: { status: "draft" } }),
            prisma.post.count({ where: { status: "published" } }),
        ])
        : [0, 0, 0];

    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard Overview</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                    Quick stats and recent content performance.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Total posts</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{totalPosts}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Draft posts</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{draftPosts}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Published posts</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{publishedPosts}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Site visits</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">—</p>
                </div>
            </div>
        </section>
    );
}
