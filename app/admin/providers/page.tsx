"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockProviders, type Provider } from "@/lib/admin-mock-data";
import { useToast } from "@/hooks/use-toast";
import { ProviderDialog } from "@/components/admin/dialogs/ProviderDialog";
import { ConfirmDialog } from "@/components/admin/dialogs/ConfirmDialog";

export default function ProvidersPage() {
  const [providers, setProviders] = useState(mockProviders);
  const { toast } = useToast();
  const [providerDialog, setProviderDialog] = useState(false);
  const [editProvider, setEditProvider] = useState<Provider | null>(null);
  const [deleteProvider, setDeleteProvider] = useState<Provider | null>(null);

  const toggleApproval = (id: string) => {
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, approved: !p.approved } : p)));
    toast({ title: "Provider updated" });
  };

  const handleSave = (data: Omit<Provider, "id"> & { id?: string }) => {
    if (data.id) {
      setProviders((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data } as Provider : p)));
      toast({ title: "Provider updated" });
    } else {
      setProviders((prev) => [...prev, { ...data, id: `P${Date.now()}` } as Provider]);
      toast({ title: "Provider added", description: `${data.name} has been added.` });
    }
  };

  const handleDelete = () => {
    if (!deleteProvider) return;
    setProviders((prev) => prev.filter((p) => p.id !== deleteProvider.id));
    toast({ title: "Provider deleted", description: `${deleteProvider.name} has been removed.` });
    setDeleteProvider(null);
  };

  const columns = [
    { key: "name", header: "Company", render: (p: Provider) => <span className="font-medium text-foreground">{p.name}</span> },
    { key: "type", header: "Type" },
    { key: "state", header: "State" },
    { key: "contact", header: "Contact" },
    { key: "approved", header: "Status", render: (p: Provider) => <StatusBadge status={p.approved ? "approved" : "pending"} /> },
    {
      key: "actions", header: "",
      render: (p: Provider) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleApproval(p.id)}>
            {p.approved ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5 text-success" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditProvider(p); setProviderDialog(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteProvider(p)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      ),
    },
  ] satisfies Column<Provider>[];

  return (
    <div>
      <PageHeader title="Providers" description="Manage lending providers" action={{ label: "Add Provider", icon: Plus, onClick: () => { setEditProvider(null); setProviderDialog(true); } }} />
      <DataTable data={providers} columns={columns} searchKey="name" searchPlaceholder="Search providers..." />
      <ProviderDialog open={providerDialog} onOpenChange={setProviderDialog} provider={editProvider} onSave={handleSave} />
      <ConfirmDialog open={!!deleteProvider} onOpenChange={() => setDeleteProvider(null)} title="Delete Provider" description={`Are you sure you want to delete ${deleteProvider?.name}?`} onConfirm={handleDelete} />
    </div>
  );
}
