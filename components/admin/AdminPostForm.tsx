"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Category {
    id: number;
    name: string;
}

interface TagJoin {
    tag: { name: string; slug: string };
}

interface MediaItem {
    id: number;
    url: string;
    createdAt: string;
}

interface PostResponse {
    post: {
        id: number;
        title: string;
        excerpt: string;
        content: string;
        coverImage: string | null;
        status: "draft" | "published";
        seoTitle: string | null;
        seoDescription: string | null;
        categoryId: number | null;
        tags: TagJoin[];
    };
}

interface AdminPostFormProps {
    postId?: number | null;
}

export default function AdminPostForm({ postId }: AdminPostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [categoryId, setCategoryId] = useState<number | "">("");
    const [tags, setTags] = useState("");
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [content, setContent] = useState("<p></p>");
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [mediaLoading, setMediaLoading] = useState(false);
    const [showMediaPicker, setShowMediaPicker] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            LinkExtension.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: "Write your post..." }),
        ],
        immediatelyRender: false,
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-slate max-w-none dark:prose-invert min-h-[240px] focus:outline-none",
            },
        },
    });

    useEffect(() => {
        let active = true;
        const fetchCategories = async () => {
            const response = await fetch("/api/admin/categories");
            if (!response.ok) {
                return;
            }
            const payload = await response.json();
            if (active) {
                setCategories(payload.categories ?? []);
            }
        };
        fetchCategories();
        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        if (!postId) return;
        let active = true;
        const fetchPost = async () => {
            setLoading(true);
            const response = await fetch(`/api/admin/posts/${postId}`);
            if (!response.ok) {
                toast.error("Unable to load post.");
                setLoading(false);
                return;
            }
            const payload: PostResponse = await response.json();
            if (!active) return;
            const post = payload.post;
            setTitle(post.title);
            setExcerpt(post.excerpt);
            setCoverImage(post.coverImage ?? "");
            setStatus(post.status);
            setCategoryId(post.categoryId ?? "");
            setTags(post.tags.map((tag) => tag.tag.slug).join(", "));
            setSeoTitle(post.seoTitle ?? "");
            setSeoDescription(post.seoDescription ?? "");
            setContent(post.content || "<p></p>");
            editor?.commands.setContent(post.content || "<p></p>");
            setLoading(false);
        };
        fetchPost();
        return () => {
            active = false;
        };
    }, [postId, editor]);

    const toolbarActions = useMemo(
        () => [
            {
                label: "Bold",
                action: () => editor?.chain().focus().toggleBold().run(),
                active: editor?.isActive("bold"),
            },
            {
                label: "Italic",
                action: () => editor?.chain().focus().toggleItalic().run(),
                active: editor?.isActive("italic"),
            },
            {
                label: "Heading",
                action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
                active: editor?.isActive("heading", { level: 2 }),
            },
            {
                label: "Bullet",
                action: () => editor?.chain().focus().toggleBulletList().run(),
                active: editor?.isActive("bulletList"),
            },
            {
                label: "Numbered",
                action: () => editor?.chain().focus().toggleOrderedList().run(),
                active: editor?.isActive("orderedList"),
            },
            {
                label: "Link",
                action: () => {
                    const url = window.prompt("Enter URL");
                    if (url) {
                        editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                    }
                },
                active: editor?.isActive("link"),
            },
        ],
        [editor]
    );

    const savePost = async () => {
        if (!editor) return;
        setSaving(true);
        const payload = {
            title,
            excerpt,
            content,
            coverImage,
            status,
            categoryId: categoryId === "" ? null : Number(categoryId),
            tags: tags
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean),
            seoTitle,
            seoDescription,
        };

        const response = await fetch(postId ? `/api/admin/posts/${postId}` : "/api/admin/posts", {
            method: postId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            toast.error("Unable to save post.");
            setSaving(false);
            return;
        }

        const result = await response.json();
        toast.success("Post saved.");
        setSaving(false);
        if (!postId) {
            router.replace(`/admin/posts/${result.post.id}`);
        }
    };

    const handleCoverUpload = async (file: File) => {
        setSaving(true);
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/admin/media", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            toast.error("Image upload failed.");
            setSaving(false);
            return;
        }
        const result = await response.json();
        setCoverImage(result.media.url);
        toast.success("Image uploaded.");
        setSaving(false);
    };

    const openMediaPicker = async () => {
        setShowMediaPicker(true);
        if (mediaItems.length) return;
        setMediaLoading(true);
        const response = await fetch("/api/admin/media");
        if (!response.ok) {
            toast.error("Unable to load media library.");
            setMediaLoading(false);
            return;
        }
        const payload = await response.json();
        setMediaItems(payload.media ?? []);
        setMediaLoading(false);
    };

    return (
        <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        {postId ? "Edit Post" : "New Post"}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Craft the story you want to publish on the blog.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/posts">Back to Posts</Link>
                    </Button>
                    <Button
                        onClick={savePost}
                        disabled={saving || loading}
                        className="bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                        {saving ? "Saving..." : "Save Post"}
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-slate-500">
                    Loading post details...
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
                            <Input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2" />
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Excerpt</label>
                            <Textarea
                                value={excerpt}
                                onChange={(event) => setExcerpt(event.target.value)}
                                className="mt-2 min-h-[120px]"
                            />
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <div className="flex flex-wrap items-center gap-2">
                                {toolbarActions.map((action) => (
                                    <Button
                                        key={action.label}
                                        type="button"
                                        size="sm"
                                        variant={action.active ? "default" : "outline"}
                                        onClick={action.action}
                                    >
                                        {action.label}
                                    </Button>
                                ))}
                            </div>
                            <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                                <EditorContent editor={editor} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Status</label>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value as "draft" | "published")}
                                className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Category</label>
                            <select
                                value={categoryId}
                                onChange={(event) => setCategoryId(event.target.value ? Number(event.target.value) : "")}
                                className="mt-2 h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <option value="">Uncategorized</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Tags</label>
                            <Input
                                value={tags}
                                onChange={(event) => setTags(event.target.value)}
                                className="mt-2"
                                placeholder="charging, training, community"
                            />
                            <p className="mt-2 text-xs text-slate-500">Separate tags with commas.</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Cover Image</label>
                            <Input
                                value={coverImage}
                                onChange={(event) => setCoverImage(event.target.value)}
                                className="mt-2"
                                placeholder="https://..."
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-3 text-sm text-slate-500"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (file) {
                                        handleCoverUpload(file);
                                    }
                                }}
                            />
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={openMediaPicker}>
                                    Choose from library
                                </Button>
                                {coverImage && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setCoverImage("")}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>
                            {coverImage && (
                                <div className="relative mt-4 h-48 w-full overflow-hidden rounded-xl border border-slate-200">
                                    <Image
                                        src={coverImage}
                                        alt="Cover preview"
                                        fill
                                        sizes="(min-width: 1024px) 360px, 100vw"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            {showMediaPicker && (
                                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <div className="mb-3 flex items-center justify-between">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            Media Library
                                        </p>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => setShowMediaPicker(false)}>
                                            Close
                                        </Button>
                                    </div>
                                    {mediaLoading ? (
                                        <p className="text-sm text-slate-500">Loading media...</p>
                                    ) : mediaItems.length ? (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {mediaItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setCoverImage(item.url);
                                                        setShowMediaPicker(false);
                                                    }}
                                                    className="group relative h-28 w-full overflow-hidden rounded-lg border border-slate-200"
                                                >
                                                    <Image
                                                        src={item.url}
                                                        alt="Media"
                                                        fill
                                                        sizes="(min-width: 1024px) 200px, 50vw"
                                                        className="object-cover transition group-hover:scale-105"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500">No uploads available.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">SEO Title</label>
                            <Input value={seoTitle} onChange={(event) => setSeoTitle(event.target.value)} className="mt-2" />
                            <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">
                                SEO Description
                            </label>
                            <Textarea
                                value={seoDescription}
                                onChange={(event) => setSeoDescription(event.target.value)}
                                className="mt-2 min-h-[100px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
