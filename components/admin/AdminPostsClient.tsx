"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface TagJoin {
    tag: {
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
}

interface PostListItem {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published";
    updatedAt: string;
    createdAt: string;
    category: Category | null;
    tags: TagJoin[];
}

interface PostsResponse {
    posts: PostListItem[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

export default function AdminPostsClient() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<PostsResponse | null>(null);

    const queryString = useMemo(() => {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (status !== "all") params.set("status", status);
        params.set("page", String(page));
        params.set("pageSize", String(pageSize));
        return params.toString();
    }, [query, status, page, pageSize]);

    useEffect(() => {
        let active = true;
        const fetchPosts = async () => {
            setLoading(true);
            const response = await fetch(`/api/admin/posts?${queryString}`);
            if (!response.ok) {
                if (active) {
                    toast.error("Failed to load posts.");
                    setData(null);
                    setLoading(false);
                }
                return;
            }
            const payload: PostsResponse = await response.json();
            if (active) {
                setData(payload);
                setLoading(false);
            }
        };

        fetchPosts();
        return () => {
            active = false;
        };
    }, [queryString]);

    const totalPages = data?.pagination.totalPages ?? 1;

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Blog Posts</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Create, edit, and publish posts for the public blog.
                    </p>
                </div>
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-500">
                    <Link href="/admin/posts/new">New Post</Link>
                </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Input
                    placeholder="Search posts..."
                    value={query}
                    onChange={(event) => {
                        setPage(1);
                        setQuery(event.target.value);
                    }}
                    className="max-w-xs"
                />
                <select
                    value={status}
                    onChange={(event) => {
                        setPage(1);
                        setStatus(event.target.value);
                    }}
                    className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                    <option value="all">All statuses</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="py-8 text-center text-sm text-slate-500">
                                    Loading posts...
                                </TableCell>
                            </TableRow>
                        ) : data?.posts?.length ? (
                            data.posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                                        <div className="flex flex-col">
                                            <span>{post.title}</span>
                                            <span className="text-xs text-slate-400">/{post.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${post.status === "published"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{post.category?.name ?? "—"}</TableCell>
                                    <TableCell>
                                        {new Date(post.updatedAt ?? post.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={`/admin/posts/${post.id}`}>Edit</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="py-10 text-center text-sm text-slate-500">
                                    No posts found. Create your first blog post.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        disabled={page <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={page >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}
