"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Document } from "@/lib/admin-mock-data";

interface DocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: Document | null;
  onSave: (doc: Omit<Document, "id" | "createdAt"> & { id?: string }) => void;
}

export function DocumentDialog({ open, onOpenChange, document, onSave }: DocumentDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Document["category"]>("template");

  useEffect(() => {
    if (document) {
      setTitle(document.title);
      setDescription(document.description);
      setCategory(document.category);
    } else {
      setTitle(""); setDescription(""); setCategory("template");
    }
  }, [document, open]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({ id: document?.id, title, description, category, fileUrl: document?.fileUrl ?? "#" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>{document ? "Edit Document" : "Upload Document"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Title <span className="text-red-500">*</span></Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document title" className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description" className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Document["category"])}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="template">Template</SelectItem>
                <SelectItem value="guide">Guide</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="form">Form</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gradient-green text-primary-foreground">{document ? "Save" : "Upload"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
