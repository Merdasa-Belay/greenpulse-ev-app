"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export default function AdminTopbar() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/auth/me");
      const data = (await response.json()) as { user: AdminUser | null };
      setUser(data.user);
    };
    void load();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6">
      <div>
        <p className="text-xs font-medium uppercase text-slate-500">Admin Dashboard</p>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Welcome back{user ? `, ${user.name}` : ""}</h1>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <div className="text-right text-sm">
            <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="rounded-lg border border-emerald-200 px-3 py-1.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
