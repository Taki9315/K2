"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  BookOpen,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  ChevronLeft,
  Leaf,
  MessageCircle,
  Calendar,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Users", path: "/admin/users", icon: Users },
  { title: "Submissions", path: "/admin/submissions", icon: FileText },
  { title: "Chat", path: "/admin/chat", icon: MessageCircle },
  { title: "Meetings", path: "/admin/meetings", icon: Calendar },
  { title: "Business Requests", path: "/admin/business-requests", icon: Briefcase },
  { title: "Content", path: "/admin/documents", icon: FolderOpen },
  { title: "Resources", path: "/admin/resources", icon: BookOpen },
  { title: "Providers", path: "/admin/providers", icon: Building2 },
  { title: "Payments", path: "/admin/payments", icon: CreditCard },
  { title: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", path: "/admin/settings", icon: Settings },
  { title: "Partners", path: "/admin/partners", icon: Building2 },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname() ?? "";

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
      style={{
        backgroundImage: `linear-gradient(180deg, hsl(0 0% 4% / 0.92) 0%, hsl(0 0% 6% / 0.88) 50%, hsl(0 0% 4% / 0.95) 100%), url(/assets/dashboard-hero.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-green green-glow">
              <Leaf className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight text-sidebar-active-foreground">
              K2 Admin
            </span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl gradient-green green-glow">
            <Leaf className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navItems.map((item) => {
          const isActive =
            item.path === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "gradient-green text-primary-foreground green-glow"
                  : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-xl p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-hover hover:text-sidebar-accent-foreground"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>
    </aside>
  );
}
