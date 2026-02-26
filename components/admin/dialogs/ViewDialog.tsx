"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: { label: string; value: React.ReactNode }[];
}

export function ViewDialog({ open, onOpenChange, title, fields }: ViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {fields.map((f, i) => (
            <div key={i} className="flex justify-between items-start gap-4">
              <span className="text-sm font-medium text-muted-foreground shrink-0">{f.label}</span>
              <span className="text-sm text-foreground text-right">{f.value}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
