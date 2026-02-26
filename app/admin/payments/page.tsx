"use client";

import { Download } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StatsCard } from "@/components/admin/StatsCard";
import { mockPayments, type Payment } from "@/lib/admin-mock-data";
import { DollarSign, CreditCard, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentsPage() {
  const { toast } = useToast();
  const succeeded = mockPayments.filter((p) => p.status === "succeeded");
  const totalRevenue = succeeded.reduce((s, p) => s + p.amount, 0);
  const failed = mockPayments.filter((p) => p.status === "failed").length;

  const columns = [
    { key: "id", header: "ID", render: (p: Payment) => <span className="font-mono text-xs">{p.id}</span> },
    { key: "userName", header: "Member", render: (p: Payment) => <span className="font-medium text-foreground">{p.userName}</span> },
    { key: "amount", header: "Amount", render: (p: Payment) => `$${p.amount}` },
    { key: "status", header: "Status", render: (p: Payment) => <StatusBadge status={p.status} /> },
    { key: "createdAt", header: "Date" },
  ] satisfies Column<Payment>[];

  return (
    <div>
      <PageHeader title="Payments" description="Track revenue and subscriptions" action={{ label: "Export CSV", icon: Download, onClick: () => toast({ title: "Export started" }) }} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Revenue" value={`$${totalRevenue}`} icon={DollarSign} change="+23%" changeType="positive" />
        <StatsCard title="Transactions" value={mockPayments.length} icon={CreditCard} />
        <StatsCard title="Avg. Revenue" value={`$${Math.round(totalRevenue / (succeeded.length || 1))}`} icon={TrendingUp} />
        <StatsCard title="Failed" value={failed} icon={AlertCircle} changeType="negative" />
      </div>

      <DataTable data={mockPayments} columns={columns} searchKey="userName" searchPlaceholder="Search payments..." />
    </div>
  );
}
