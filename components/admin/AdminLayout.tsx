"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          collapsed ? "lg:ml-16" : "lg:ml-60"
        )}
      >
        <AdminHeader onMenuToggle={() => setCollapsed(!collapsed)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
