"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { User } from "@/lib/admin-mock-data";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSave: (user: Omit<User, "id" | "createdAt"> & { id?: string }) => void;
}

export function UserDialog({ open, onOpenChange, user, onSave }: UserDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User["role"]>("borrower");
  const [status, setStatus] = useState<User["status"]>("active");
  const [preferred, setPreferred] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
      setPreferred(user.preferred);
    } else {
      setName("");
      setEmail("");
      setRole("borrower");
      setStatus("active");
      setPreferred(false);
    }
  }, [user, open]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;
    onSave({ id: user?.id, name, email, role, status, preferred });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as User["role"])}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="borrower">Borrower</SelectItem>
                <SelectItem value="lender">Lender</SelectItem>
                <SelectItem value="network">Network</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as User["status"])}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="preferred">Preferred Status</Label>
            <Switch id="preferred" checked={preferred} onCheckedChange={setPreferred} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gradient-green text-primary-foreground">{user ? "Save Changes" : "Add User"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
