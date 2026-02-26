"use client";

import { useState } from "react";
import { Eye, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockSubmissions, type Submission } from "@/lib/admin-mock-data";
import { useToast } from "@/hooks/use-toast";
import { ViewDialog } from "@/components/admin/dialogs/ViewDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [viewSub, setViewSub] = useState<Submission | null>(null);
  const { toast } = useToast();

  const updateStatus = (id: string, status: Submission["status"]) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    toast({ title: "Status updated", description: `Submission ${id} set to ${status}` });
  };

  const columns = [
    { key: "id", header: "ID", render: (s: Submission) => <span className="font-mono text-xs">{s.id}</span> },
    { key: "userName", header: "Borrower", render: (s: Submission) => <span className="font-medium text-foreground">{s.userName}</span> },
    { key: "businessName", header: "Business" },
    { key: "loanAmount", header: "Amount", render: (s: Submission) => `$${s.loanAmount.toLocaleString()}` },
    { key: "status", header: "Status", render: (s: Submission) => (
      <Select value={s.status} onValueChange={(v) => updateStatus(s.id, v as Submission["status"])}>
        <SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger>
        <SelectContent className="bg-card">
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="reviewing">Reviewing</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    )},
    { key: "createdAt", header: "Date" },
    {
      key: "actions", header: "",
      render: (s: Submission) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewSub(s)}><Eye className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast({ title: "Notes", description: s.notes || "No notes yet" })}><MessageSquare className="h-3.5 w-3.5" /></Button>
        </div>
      ),
    },
  ] satisfies Column<Submission>[];

  return (
    <div>
      <PageHeader title="Borrower Submissions" description="Review and manage loan applications" />
      <DataTable data={submissions} columns={columns} searchKey="userName" searchPlaceholder="Search by borrower..." />
      <ViewDialog open={!!viewSub} onOpenChange={() => setViewSub(null)} title="Submission Details" fields={viewSub ? [
        { label: "ID", value: viewSub.id },
        { label: "Borrower", value: viewSub.userName },
        { label: "Business", value: viewSub.businessName },
        { label: "Amount", value: `$${viewSub.loanAmount.toLocaleString()}` },
        { label: "Status", value: <StatusBadge status={viewSub.status} /> },
        { label: "Notes", value: viewSub.notes || "None" },
        { label: "Date", value: viewSub.createdAt },
      ] : []} />
    </div>
  );
}
