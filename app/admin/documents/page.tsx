"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Eye, EyeOff } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ContentDialog, type ContentRow } from "@/components/admin/dialogs/ContentDialog";
import { ConfirmDialog } from "@/components/admin/dialogs/ConfirmDialog";

export default function ContentPage() {
  const [items, setItems] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<ContentRow | null>(null);
  const [deleteItem, setDeleteItem] = useState<ContentRow | null>(null);

  const fetchContent = useCallback(async () => {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItems(data as ContentRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleDelete = async () => {
    if (!deleteItem) return;
    const { error } = await supabase.from("content").delete().eq("id", deleteItem.id);
    if (!error) {
      setItems((prev) => prev.filter((c) => c.id !== deleteItem.id));
      toast({ title: "Content deleted", description: deleteItem.title });
    }
    setDeleteItem(null);
  };

  const togglePublish = async (item: ContentRow) => {
    const { error } = await supabase
      .from("content")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    if (!error) {
      setItems((prev) =>
        prev.map((c) =>
          c.id === item.id ? { ...c, is_published: !c.is_published } : c
        )
      );
      toast({ title: item.is_published ? "Unpublished" : "Published" });
    }
  };

  const columns = [
    {
      key: "title",
      header: "Title",
      render: (c: ContentRow) => (
        <div>
          <span className="font-medium text-foreground">{c.title}</span>
          <p className="text-xs text-muted-foreground truncate max-w-[250px]">{c.description}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (c: ContentRow) => (
        <Badge variant="outline" className="capitalize">
          {c.type}
        </Badge>
      ),
    },
    {
      key: "access_level",
      header: "Access",
      render: (c: ContentRow) => (
        <Badge
          variant={c.access_level === "public" ? "secondary" : "default"}
          className="text-xs"
        >
          {c.access_level === "public" ? "Free" : "Members Only"}
        </Badge>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (c: ContentRow) => (
        <Badge variant="secondary">{c.category}</Badge>
      ),
    },
    {
      key: "is_published",
      header: "Status",
      render: (c: ContentRow) => (
        <Badge variant={c.is_published ? "default" : "outline"} className="text-xs">
          {c.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "view_count",
      header: "Views",
      render: (c: ContentRow) => (
        <span className="text-sm text-muted-foreground">{c.view_count}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (c: ContentRow) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => togglePublish(c)}
            title={c.is_published ? "Unpublish" : "Publish"}
          >
            {c.is_published ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            asChild
          >
            <a href={`/content/${c.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setEditItem(c);
              setDialogOpen(true);
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => setDeleteItem(c)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ] satisfies Column<ContentRow>[];

  return (
    <div>
      <PageHeader
        title="Content"
        description="Manage videos, articles, and resources for the Content Hub"
        action={{
          label: "Add Content",
          icon: Plus,
          onClick: () => {
            setEditItem(null);
            setDialogOpen(true);
          },
        }}
      />
      {loading ? (
        <p className="text-muted-foreground py-12 text-center">Loading content...</p>
      ) : (
        <DataTable
          data={items}
          columns={columns}
          searchKey="title"
          searchPlaceholder="Search content..."
        />
      )}
      <ContentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        content={editItem}
        onSaved={() => {
          fetchContent();
          toast({ title: editItem ? "Content updated" : "Content created" });
        }}
      />
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={() => setDeleteItem(null)}
        title="Delete Content"
        description={`Are you sure you want to delete "${deleteItem?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
