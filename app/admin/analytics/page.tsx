"use client";

import type { ReactNode } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { userGrowthData, submissionData, revenueData } from "@/lib/admin-mock-data";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-card-foreground">{title}</h3>
      {children}
    </div>
  );
}

const chartStyle = {
  stroke: "hsl(215 20% 91%)",
  tick: { fontSize: 12, fill: "hsl(215 14% 46%)" },
  tooltip: {
    background: "hsl(0 0% 100%)",
    border: "1px solid hsl(215 20% 91%)",
    borderRadius: 8,
    fontSize: 12,
  },
};

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Analytics" description="Platform growth and performance metrics" />

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="User Growth">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.stroke} />
              <XAxis dataKey="month" tick={chartStyle.tick} />
              <YAxis tick={chartStyle.tick} />
              <Tooltip contentStyle={chartStyle.tooltip} />
              <Area type="monotone" dataKey="users" stroke="hsl(217 91% 60%)" fill="hsl(217 91% 60% / 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Submissions">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={submissionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.stroke} />
              <XAxis dataKey="month" tick={chartStyle.tick} />
              <YAxis tick={chartStyle.tick} />
              <Tooltip contentStyle={chartStyle.tooltip} />
              <Bar dataKey="submissions" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Trend">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.stroke} />
              <XAxis dataKey="month" tick={chartStyle.tick} />
              <YAxis tick={chartStyle.tick} />
              <Tooltip contentStyle={chartStyle.tooltip} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
