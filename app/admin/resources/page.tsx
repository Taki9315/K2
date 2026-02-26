"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Plus, ExternalLink, Pencil, Trash2, Video, FileText, Link } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockResources, type Resource } from "@/lib/admin-mock-data";
import { useToast } from "@/hooks/use-toast";
import { ResourceDialog } from "@/components/admin/dialogs/ResourceDialog";
import { ConfirmDialog } from "@/components/admin/dialogs/ConfirmDialog";

const typeIcons: Record<string, ReactNode> = {
  video: <Video className="h-3.5 w-3.5" />,
  pdf: <FileText className="h-3.5 w-3.5" />,
  link: <Link className="h-3.5 w-3.5" />,
};

export default function ResourcesPage() {
  const [resources, setResources] = useState(mockResources);
  const { toast } = useToast();
  const [resDialog, setResDialog] = useState(false);
  const [editRes, setEditRes] = useState<Resource | null>(null);
  const [deleteRes, setDeleteRes] = useState<Resource | null>(null);

  const handleSave = (data: Omit<Resource, "id" | "createdAt"> & { id?: string }) => {
    if (data.id) {
      setResources((prev) => prev.map((r) => (r.id === data.id ? { ...r, ...data } as Resource : r)));
      toast({ title: "Resource updated" });
    } else {
      setResources((prev) => [...prev, { ...data, id: `R${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] } as Resource]);
      toast({ title: "Resource added" });
    }
  };

  const handleDelete = () => {
    if (!deleteRes) return;
    setResources((prev) => prev.filter((r) => r.id !== deleteRes.id));
    toast({ title: "Resource deleted" });
    setDeleteRes(null);
  };

  const columns = [
    { key: "title", header: "Title", render: (r: Resource) => <span className="font-medium text-foreground">{r.title}</span> },
    { key: "type", header: "Type", render: (r: Resource) => (
      <div className="flex items-center gap-1.5 capitalize">{typeIcons[r.type]}<span>{r.type}</span></div>
    )},
    { key: "tags", header: "Tags", render: (r: Resource) => (
      <div className="flex gap-1 flex-wrap">{r.tags.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}</div>
    )},
    { key: "createdAt", header: "Added" },
    {
      key: "actions", header: "",
      render: (r: Resource) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(r.url, "_blank")}><ExternalLink className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditRes(r); setResDialog(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteRes(r)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      ),
    },
  ] satisfies Column<Resource>[];

  return (
    <div>
      <PageHeader title="Resource Library" description="Videos, PDFs, and links for members" action={{ label: "Add Resource", icon: Plus, onClick: () => { setEditRes(null); setResDialog(true); } }} />
      <DataTable data={resources} columns={columns} searchKey="title" searchPlaceholder="Search resources..." />
      <ResourceDialog open={resDialog} onOpenChange={setResDialog} resource={editRes} onSave={handleSave} />
      <ConfirmDialog open={!!deleteRes} onOpenChange={() => setDeleteRes(null)} title="Delete Resource" description={`Are you sure you want to delete "${deleteRes?.title}"?`} onConfirm={handleDelete} />
    </div>
  );
}
