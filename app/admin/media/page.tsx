"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface MediaItem {
    id: number;
    url: string;
    createdAt: string;
}

export default function AdminMediaPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        const fetchMedia = async () => {
            const response = await fetch("/api/admin/media");
            if (!response.ok) {
                if (active) {
                    toast.error("Unable to load media.");
                    setLoading(false);
                }
                return;
            }
            const payload = await response.json();
            if (active) {
                setMedia(payload.media ?? []);
                setLoading(false);
            }
        };
        fetchMedia();
        return () => {
            active = false;
        };
    }, []);

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Media Library</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Uploaded images used in blog posts.
                </p>
            </div>

            {loading ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-slate-500">
                    Loading media...
                </div>
            ) : media.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={item.url}
                                    alt="Uploaded"
                                    fill
                                    sizes="(min-width: 1024px) 320px, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="px-4 py-3 text-xs text-slate-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-slate-500">
                    No uploads yet.
                </div>
            )}
        </section>
    );
}
