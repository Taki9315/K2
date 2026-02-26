"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Provider } from "@/lib/admin-mock-data";

interface ProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider?: Provider | null;
  onSave: (provider: Omit<Provider, "id"> & { id?: string }) => void;
}

export function ProviderDialog({ open, onOpenChange, provider, onSave }: ProviderDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (provider) {
      setName(provider.name);
      setType(provider.type);
      setState(provider.state);
      setContact(provider.contact);
    } else {
      setName(""); setType(""); setState(""); setContact("");
    }
  }, [provider, open]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ id: provider?.id, name, type, state, contact, approved: provider?.approved ?? false });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>{provider ? "Edit Provider" : "Add Provider"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Company Name <span className="text-red-500">*</span></Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Company name" className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Bank, Credit Union, etc." className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="California" className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="contact@company.com" className="bg-secondary" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gradient-green text-primary-foreground">{provider ? "Save" : "Add Provider"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
