"use client";

import { useState } from "react";
import { Calendar, Clock, Video, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MeetingDialog } from "@/components/admin/dialogs/MeetingDialog";
import { ConfirmDialog } from "@/components/admin/dialogs/ConfirmDialog";

interface Meeting {
  id: string;
  userId: string;
  userName: string;
  role: string;
  date: string;
  time: string;
  topic: string;
  status: "scheduled" | "completed" | "cancelled";
}

const initialMeetings: Meeting[] = [
  { id: "MT1", userId: "2", userName: "Mike Chen", role: "lender", date: "2024-06-15", time: "10:00 AM", topic: "Lending portfolio review", status: "scheduled" },
  { id: "MT2", userId: "3", userName: "Emily Davis", role: "borrower", date: "2024-06-14", time: "2:00 PM", topic: "Loan application discussion", status: "scheduled" },
  { id: "MT3", userId: "8", userName: "David Brown", role: "network", date: "2024-06-10", time: "11:00 AM", topic: "Partnership opportunities", status: "completed" },
  { id: "MT4", userId: "6", userName: "Robert Taylor", role: "lender", date: "2024-06-08", time: "3:00 PM", topic: "Rate adjustments", status: "completed" },
];

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteMeeting, setDeleteMeeting] = useState<Meeting | null>(null);
  const { toast } = useToast();

  const statusColor: Record<string, string> = {
    scheduled: "bg-primary/10 text-primary",
    completed: "bg-muted text-muted-foreground",
    cancelled: "bg-destructive/10 text-destructive",
  };

  const handleAdd = (data: { userName: string; userId: string; role: string; date: string; time: string; topic: string }) => {
    const newMeeting: Meeting = { ...data, id: `MT${Date.now()}`, status: "scheduled" };
    setMeetings((prev) => [newMeeting, ...prev]);
    toast({ title: "Meeting scheduled", description: `Meeting with ${data.userName} on ${data.date}` });
  };

  const handleCancel = (id: string) => {
    setMeetings((prev) => prev.map((m) => (m.id === id ? { ...m, status: "cancelled" as const } : m)));
    toast({ title: "Meeting cancelled" });
  };

  const handleDelete = () => {
    if (!deleteMeeting) return;
    setMeetings((prev) => prev.filter((m) => m.id !== deleteMeeting.id));
    toast({ title: "Meeting deleted" });
    setDeleteMeeting(null);
  };

  return (
    <div>
      <PageHeader title="Meetings" description="Schedule and manage meetings with preferred users" action={{ label: "New Meeting", icon: Plus, onClick: () => setDialogOpen(true) }} />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {meetings.map((m) => (
          <div key={m.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-green text-primary-foreground font-bold">{m.userName.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold">{m.userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{m.role}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColor[m.status]}`}>{m.status}</span>
            </div>
            <p className="text-sm font-medium text-foreground mb-3">{m.topic}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {m.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {m.time}</span>
            </div>
            <div className="mt-4 flex gap-2">
              {m.status === "scheduled" && (
                <>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 text-primary border-primary/20 hover:bg-primary/5" onClick={() => toast({ title: "Joining meeting...", description: m.topic })}>
                    <Video className="h-3.5 w-3.5" /> Join
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive/5" onClick={() => handleCancel(m.id)}>
                    Cancel
                  </Button>
                </>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive ml-auto" onClick={() => setDeleteMeeting(m)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <MeetingDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleAdd} />
      <ConfirmDialog open={!!deleteMeeting} onOpenChange={() => setDeleteMeeting(null)} title="Delete Meeting" description={`Delete meeting "${deleteMeeting?.topic}"?`} onConfirm={handleDelete} />
    </div>
  );
}
