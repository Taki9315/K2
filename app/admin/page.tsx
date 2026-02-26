"use client";

import { Users, FileText, Building2, DollarSign } from "lucide-react";
import Image from "next/image";
import { StatsCard } from "@/components/admin/StatsCard";
import { mockUsers, mockSubmissions, mockProviders, mockPayments, revenueData } from "@/lib/admin-mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const totalRevenue = mockPayments
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + p.amount, 0);

  const recentActivity = [
    { action: "New submission", detail: "Emily Davis submitted a loan application", time: "2 hours ago" },
    { action: "User registered", detail: "David Brown created an account", time: "5 hours ago" },
    { action: "Payment received", detail: "Robert Taylor paid $199", time: "1 day ago" },
    { action: "Provider approved", detail: "First National Lending was approved", time: "2 days ago" },
    { action: "Submission reviewed", detail: "Lisa Anderson's application is under review", time: "3 days ago" },
  ];

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
        <StatsCard title="Total Users" value={mockUsers.length} change="+12% from last month" changeType="positive" icon={Users} />
        <StatsCard title="Submissions" value={mockSubmissions.length} change="+8% from last month" changeType="positive" icon={FileText} />
        <StatsCard title="Providers" value={mockProviders.length} change="2 pending approval" changeType="neutral" icon={Building2} />
        <StatsCard title="Revenue" value={`$${totalRevenue.toLocaleString()}`} change="+23% from last month" changeType="positive" icon={DollarSign} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {/* Revenue chart */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
          {/* Dot pattern decorator */}
          <div className="dot-pattern absolute inset-0 opacity-30 pointer-events-none" />
          <div className="relative">
            <h3 className="text-sm font-semibold text-card-foreground">Revenue Overview</h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly revenue trend</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={revenueData}>
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
              {recentActivity.map((item, i) => (
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
    </div>
  );
}
