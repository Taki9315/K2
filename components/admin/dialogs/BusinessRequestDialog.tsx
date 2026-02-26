"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockUsers } from "@/lib/admin-mock-data";

interface BusinessRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (req: { userName: string; role: string; type: string; description: string }) => void;
}

export function BusinessRequestDialog({ open, onOpenChange, onSave }: BusinessRequestDialogProps) {
  const preferredUsers = mockUsers.filter((u) => u.preferred);
  const [userId, setUserId] = useState(preferredUsers[0]?.id || "");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!type.trim() || !description.trim()) return;
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) return;
    onSave({ userName: user.name, role: user.role, type, description });
    onOpenChange(false);
    setType(""); setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>New Business Request</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>User</Label>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card">
                {preferredUsers.map((u) => (
                  <SelectItem key={u.id} value={u.id}>{u.name} ({u.role})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Request Type <span className="text-red-500">*</span></Label>
            <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g. Refinancing, Partnership" className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Description <span className="text-red-500">*</span></Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the request..." className="bg-secondary" required />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gradient-green text-primary-foreground">Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
