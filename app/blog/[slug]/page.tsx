import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/lib/blogQueries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post not found | Green Pulse",
            description: "This post could not be found.",
        };
    }

    const title = post.seoTitle ?? post.title;
    const description = post.seoDescription ?? post.excerpt;

    return {
        title: `${title} | Green Pulse`,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            images: post.coverImage ? [{ url: post.coverImage }] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const publishedDate = post.publishedAt ?? post.createdAt;
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://greenpulse-ev.com";
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seoDescription ?? post.excerpt,
        datePublished: publishedDate.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        author: {
            "@type": "Person",
            name: post.author.name,
        },
        image: post.coverImage ? [post.coverImage] : undefined,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/blog/${post.slug}`,
        },
    };

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 px-6 py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="mx-auto max-w-3xl space-y-10">
                <div className="space-y-4">
                    <Link href="/blog" className="text-sm font-semibold text-emerald-600 hover:underline">
                        ← Back to Blog
                    </Link>
                    <p className="text-xs font-medium text-emerald-600">{post.category?.name ?? "Blog"}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{post.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span>{publishedDate.toLocaleDateString()}</span>
                        <span>{post.readTime} min read</span>
                        <span>By {post.author.name}</span>
                    </div>
                </div>

                {post.coverImage && (
                    <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 768px, 100vw"
                            className="object-cover"
                        />
                    </div>
                )}

                <div
                    className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-24"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </main>
    );
}
