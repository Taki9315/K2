"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Resource } from "@/lib/admin-mock-data";

interface ResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource?: Resource | null;
  onSave: (res: Omit<Resource, "id" | "createdAt"> & { id?: string }) => void;
}

export function ResourceDialog({ open, onOpenChange, resource, onSave }: ResourceDialogProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Resource["type"]>("link");
  const [url, setUrl] = useState("");
  const [tagsStr, setTagsStr] = useState("");

  useEffect(() => {
    if (resource) {
      setTitle(resource.title);
      setType(resource.type);
      setUrl(resource.url);
      setTagsStr(resource.tags.join(", "));
    } else {
      setTitle(""); setType("link"); setUrl(""); setTagsStr("");
    }
  }, [resource, open]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({ id: resource?.id, title, type, url, tags: tagsStr.split(",").map((t) => t.trim()).filter(Boolean) });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>{resource ? "Edit Resource" : "Add Resource"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Title <span className="text-red-500">*</span></Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Resource title" className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as Resource["type"])}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Tags (comma-separated)</Label>
            <Input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="intro, education" className="bg-secondary" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gradient-green text-primary-foreground">{resource ? "Save" : "Add Resource"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
