import Link from "next/link";
import { getPublishedPosts } from "@/lib/blogQueries";
import Image from "next/image";

type BlogPost = Awaited<ReturnType<typeof getPublishedPosts>>[number];

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Blog | Green Pulse",
    description: "Updates, announcements, and training highlights from Green Pulse.",
};

export default async function BlogPage() {
    const dbConfigured = Boolean(process.env.DATABASE_URL);
    const posts = await getPublishedPosts();

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 px-6 py-16">
            <div className="mx-auto max-w-5xl space-y-10">
                <header className="space-y-4">
                    <p className="text-sm font-medium text-emerald-600">Blog</p>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Green Pulse Updates</h1>
                    <p className="text-slate-600 dark:text-slate-300">
                        News, training highlights, and service announcements.
                    </p>
                </header>

                {!dbConfigured && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        Database is not connected yet. Set `DATABASE_URL` to show blog posts.
                    </div>
                )}

                {posts.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-slate-500">
                        No blog posts yet.
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {posts.map((post: BlogPost) => (
                            <article
                                key={post.id}
                                className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm"
                            >
                                {post.coverImage && (
                                    <div className="relative mb-4 h-56 w-full overflow-hidden rounded-xl">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            sizes="(min-width: 1024px) 768px, 100vw"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <span className="text-xs text-slate-500">
                                        {new Date(post.publishedAt ?? post.createdAt).toISOString().split("T")[0]}
                                    </span>
                                </div>
                                <p className="mt-3 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                                    <span>{post.readTime} min read</span>
                                    {post.category?.name && <span>{post.category.name}</span>}
                                </div>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="mt-4 inline-flex text-sm font-semibold text-emerald-600 hover:underline"
                                >
                                    Read the full story
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                <Link href="/" className="text-sm font-semibold text-emerald-600 hover:underline">
                    ← Back to Home
                </Link>
            </div>
        </main>
    );
}
