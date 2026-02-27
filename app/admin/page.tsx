"use client";

import { useState, useEffect } from "react";
import { Users, FileText, Building2, DollarSign, Handshake, CreditCard, Loader2 } from "lucide-react";
import Image from "next/image";
import { StatsCard } from "@/components/admin/StatsCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardStats {
  totalUsers: number;
  totalSubmissions: number;
  totalProviders: number;
  totalPartners: number;
  publishedPartners: number;
  totalRevenue: number;
  totalOrders: number;
  activeMemberships: number;
  pendingProviders: number;
  roleCounts: Record<string, number>;
  revenueByMonth: { month: string; revenue: number }[];
  userGrowth: { month: string; users: number }[];
  submissionsByMonth: { month: string; submissions: number }[];
  recentActivity: { action: string; detail: string; time: string }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();
        setStats(data);
      } catch (err: any) {
        console.error("Dashboard stats error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <p className="text-destructive font-medium">Failed to load dashboard data</p>
        <p className="text-sm text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }

  // Calculate change text
  const providerChange = stats.pendingProviders > 0
    ? `${stats.pendingProviders} pending approval`
    : "All approved";

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl h-[160px]">
        <Image src="/assets/dashboard-hero.jpg" alt="" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/30" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="text-2xl font-bold text-card sm:text-3xl">Welcome back, Admin</h1>
            <p className="mt-1 text-sm text-card/70">Here&apos;s what&apos;s happening on your platform today.</p>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-primary/30" />
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-primary/20" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Users" value={stats.totalUsers} change={`${stats.activeMemberships} active memberships`} changeType="positive" icon={Users} />
        <StatsCard title="Submissions" value={stats.totalSubmissions} change={`${stats.totalOrders} total orders`} changeType="positive" icon={FileText} />
        <StatsCard title="Providers" value={stats.totalProviders} change={providerChange} changeType={stats.pendingProviders > 0 ? "neutral" : "positive"} icon={Building2} />
        <StatsCard title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} change={`${stats.publishedPartners} published partners`} changeType="positive" icon={DollarSign} />
      </div>

      {/* Secondary stats row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-green">
            <Handshake className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{stats.totalPartners}</p>
            <p className="text-xs text-muted-foreground">Total Partners</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
            <CreditCard className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">{stats.totalOrders}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <Users className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <div className="flex gap-3">
              {Object.entries(stats.roleCounts).map(([role, count]) => (
                <span key={role} className="text-xs text-muted-foreground">
                  <span className="font-semibold text-card-foreground">{count}</span> {role}s
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Users by Role</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* Revenue chart */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
          <div className="dot-pattern absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative">
            <h3 className="text-sm font-semibold text-card-foreground">Revenue Overview</h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly revenue trend (last 6 months)</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(0 0% 90%)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="hsl(152 69% 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent activity */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
          <div className="relative">
            <h3 className="text-sm font-semibold text-card-foreground">Recent Activity</h3>
            <p className="text-xs text-muted-foreground mb-4">Latest platform events</p>
            <div className="space-y-4">
              {stats.recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No recent activity yet</p>
              )}
              {stats.recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full gradient-green green-glow transition-transform group-hover:scale-125" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Growth & Submissions charts */}
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
          <div className="relative">
            <h3 className="text-sm font-semibold text-card-foreground">User Growth</h3>
            <p className="text-xs text-muted-foreground mb-4">Cumulative users over time</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(0 0% 90%)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="users" fill="hsl(217 91% 60%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
          <div className="relative">
            <h3 className="text-sm font-semibold text-card-foreground">Submissions</h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly submissions received</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.submissionsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(0 0% 45%)" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(0 0% 90%)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="submissions" fill="hsl(38 92% 50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
