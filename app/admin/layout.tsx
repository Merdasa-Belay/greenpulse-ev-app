"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { Toaster } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex w-full flex-col">
          <AdminTopbar />
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
