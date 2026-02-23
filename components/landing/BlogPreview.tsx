import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/blogQueries";

type BlogPost = Awaited<ReturnType<typeof getPublishedPosts>>[number];

export default async function BlogPreview() {
    const dbConfigured = Boolean(process.env.DATABASE_URL);
    const posts = await getPublishedPosts(3);

    return (
        <section id="blog" className="py-24 bg-white dark:bg-slate-950 transition-colors">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-emerald-600">Blog</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Latest Updates</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl">
                            Training highlights, service announcements, and community stories.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center rounded-xl border border-emerald-200 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
                    >
                        View all posts
                    </Link>
                </div>

                {!dbConfigured && (
                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        Database is not connected yet. Set `DATABASE_URL` to show blog posts.
                    </div>
                )}

                {posts.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-10 text-slate-500">
                        No blog posts yet. Add your first update from the admin panel.
                    </div>
                ) : (
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {posts.map((post: BlogPost) => (
                            <article
                                key={post.id}
                                className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm"
                            >
                                {post.coverImage && (
                                    <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            sizes="(min-width: 1024px) 320px, 100vw"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <p className="text-xs font-medium text-slate-500">
                                    {new Date(post.publishedAt ?? post.createdAt).toISOString().split("T")[0]}
                                </p>
                                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="mt-4 inline-flex text-sm font-semibold text-emerald-600 hover:underline"
                                >
                                    Read more
                                </Link>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-500"
                    >
                        Read the blog
                    </Link>
                    <Link
                        href="/admin"
                        className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                        Manage posts
                    </Link>
                </div>
            </div>
        </section>
    );
}
