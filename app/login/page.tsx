"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema } from "@/lib/validators/admin";
import type { AdminLoginInput } from "@/lib/validators/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AdminLoginInput>({
        resolver: zodResolver(adminLoginSchema),
    });

    const onSubmit = async (values: AdminLoginInput) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            toast.error("Invalid username or password.");
            return;
        }

        toast.success("Welcome back!");
        router.replace("/admin/dashboard");
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
                <p className="mt-2 text-sm text-slate-600">Sign in to manage blog posts and content.</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Username</label>
                        <input
                            type="text"
                            {...register("username")}
                            placeholder="admin"
                            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                        />
                        {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </main>
    );
}
