"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        const response = await fetch("/api/admin/categories");
        if (!response.ok) {
            toast.error("Unable to load categories.");
            return;
        }
        const payload = await response.json();
        setCategories(payload.categories ?? []);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const createCategory = async () => {
        if (!name.trim()) return;
        setLoading(true);
        const response = await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.trim() }),
        });
        setLoading(false);
        if (!response.ok) {
            toast.error("Unable to create category.");
            return;
        }
        setName("");
        toast.success("Category created.");
        fetchCategories();
    };

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Categories</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Organize blog posts by topic.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Input
                    placeholder="Category name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="max-w-xs"
                />
                <Button
                    onClick={createCategory}
                    disabled={loading}
                    className="bg-emerald-600 text-white hover:bg-emerald-500"
                >
                    {loading ? "Saving..." : "Add Category"}
                </Button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                {categories.length ? (
                    <ul className="space-y-3">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-2 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-200"
                            >
                                <span>{category.name}</span>
                                <span className="text-xs text-slate-400">/{category.slug}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-slate-500">No categories yet.</p>
                )}
            </div>
        </section>
    );
}
