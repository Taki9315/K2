"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BusinessRequestDialog } from "@/components/admin/dialogs/BusinessRequestDialog";
import { ViewDialog } from "@/components/admin/dialogs/ViewDialog";

interface BusinessRequest {
  id: string;
  userName: string;
  role: string;
  type: string;
  description: string;
  status: "pending" | "approved" | "rejected" | "in_progress";
  createdAt: string;
}

const initialRequests: BusinessRequest[] = [
  { id: "BR1", userName: "Mike Chen", role: "lender", type: "New Loan Product", description: "Request to offer micro-loans under $50k", status: "pending", createdAt: "2024-06-05" },
  { id: "BR2", userName: "Emily Davis", role: "borrower", type: "Refinancing", description: "Request to refinance existing SBA loan", status: "approved", createdAt: "2024-05-28" },
  { id: "BR3", userName: "David Brown", role: "network", type: "Partnership", description: "Proposal to integrate referral system", status: "in_progress", createdAt: "2024-05-20" },
  { id: "BR4", userName: "Robert Taylor", role: "lender", type: "Rate Change", description: "Request to adjust lending rates for Q3", status: "rejected", createdAt: "2024-05-15" },
];

export default function BusinessRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewReq, setViewReq] = useState<BusinessRequest | null>(null);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r)));
    toast({ title: "Request approved" });
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)));
    toast({ title: "Request rejected" });
  };

  const handleAdd = (data: { userName: string; role: string; type: string; description: string }) => {
    const newReq: BusinessRequest = { ...data, id: `BR${Date.now()}`, status: "pending", createdAt: new Date().toISOString().split("T")[0] };
    setRequests((prev) => [newReq, ...prev]);
    toast({ title: "Request created" });
  };

  const columns = [
    { key: "userName", header: "User", render: (r: BusinessRequest) => (
      <div>
        <span className="font-medium text-foreground">{r.userName}</span>
        <span className="ml-2 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-secondary-foreground">{r.role}</span>
      </div>
    )},
    { key: "type", header: "Type", render: (r: BusinessRequest) => <span className="font-medium">{r.type}</span> },
    { key: "description", header: "Description", render: (r: BusinessRequest) => <span className="text-muted-foreground text-xs max-w-[200px] truncate block">{r.description}</span> },
    { key: "status", header: "Status", render: (r: BusinessRequest) => <StatusBadge status={r.status.replace("_", " ")} /> },
    { key: "createdAt", header: "Date" },
    {
      key: "actions", header: "Actions",
      render: (r: BusinessRequest) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="text-primary text-xs" onClick={() => setViewReq(r)}>View</Button>
          {r.status === "pending" && (
            <>
              <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={() => handleApprove(r.id)}>Approve</Button>
              <Button variant="ghost" size="sm" className="text-xs text-destructive" onClick={() => handleReject(r.id)}>Reject</Button>
            </>
          )}
        </div>
      ),
    },
  ] satisfies Column<BusinessRequest>[];

  return (
    <div>
      <PageHeader title="Business Requests" description="Manage business requests from preferred users" action={{ label: "New Request", icon: Plus, onClick: () => setDialogOpen(true) }} />
      <DataTable data={requests} columns={columns} searchKey="userName" searchPlaceholder="Search requests..." />
      <BusinessRequestDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleAdd} />
      <ViewDialog open={!!viewReq} onOpenChange={() => setViewReq(null)} title="Business Request Details" fields={viewReq ? [
        { label: "User", value: viewReq.userName },
        { label: "Role", value: <span className="capitalize">{viewReq.role}</span> },
        { label: "Type", value: viewReq.type },
        { label: "Description", value: viewReq.description },
        { label: "Status", value: <StatusBadge status={viewReq.status.replace("_", " ")} /> },
        { label: "Date", value: viewReq.createdAt },
      ] : []} />
    </div>
  );
}
