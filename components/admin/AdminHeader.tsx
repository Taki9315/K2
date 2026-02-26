"use client";

import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter();
  const { user } = useAuth();

  const displayName = (() => {
    if (!user) return "Admin User";
    const metadata = user.user_metadata as Record<string, unknown> | undefined;
    const fullName =
      (metadata?.full_name as string | undefined) ??
      (metadata?.name as string | undefined) ??
      (metadata?.user_name as string | undefined);
    if (fullName && fullName.trim().length > 0) return fullName.trim();
    if (user.email) return user.email.split("@")[0];
    return "Admin User";
  })();

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="w-64 rounded-xl bg-secondary pl-9 text-sm border-transparent focus:border-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full gradient-green" />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-xl">
            <AvatarFallback className="rounded-xl gradient-green text-xs text-primary-foreground">
              {initials || "AU"}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
