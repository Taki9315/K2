"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockUsers } from "@/lib/admin-mock-data";

interface MeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (meeting: { userName: string; userId: string; role: string; date: string; time: string; topic: string }) => void;
}

export function MeetingDialog({ open, onOpenChange, onSave }: MeetingDialogProps) {
  const preferredUsers = mockUsers.filter((u) => u.preferred);
  const [userId, setUserId] = useState(preferredUsers[0]?.id || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    if (!date || !time || !topic.trim()) return;
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) return;
    onSave({ userName: user.name, userId: user.id, role: user.role, date, time, topic });
    onOpenChange(false);
    setDate(""); setTime(""); setTopic("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Participant</Label>
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
            <Label>Date <span className="text-red-500">*</span></Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Time <span className="text-red-500">*</span></Label>
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-secondary" required />
          </div>
          <div className="space-y-2">
            <Label>Topic <span className="text-red-500">*</span></Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Meeting topic" className="bg-secondary" required />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gradient-green text-primary-foreground">Schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
