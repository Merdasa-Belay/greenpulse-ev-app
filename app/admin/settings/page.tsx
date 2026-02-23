"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSaving(true);

        const response = await fetch("/api/admin/update-credentials", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username.trim(), currentPassword, newPassword }),
        });

        if (!response.ok) {
            const payload = await response.json().catch(() => null);
            toast.error(payload?.error ?? "Unable to update settings.");
            setSaving(false);
            return;
        }

        toast.success("Settings updated.");
        setCurrentPassword("");
        setNewPassword("");
        setSaving(false);
    };

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Admin Settings</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                    Update your admin username and password.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="text-sm font-medium text-slate-700">New Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="admin"
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save changes"}
                </button>
            </form>
        </section>
    );
}