"use client";

import { useState } from "react";
import { Eye, Pencil, Ban, Trash2, UserPlus, Star, MessageCircle, Calendar, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockUsers, type User } from "@/lib/admin-mock-data";
import { useToast } from "@/hooks/use-toast";
import { UserDialog } from "@/components/admin/dialogs/UserDialog";
import { ViewDialog } from "@/components/admin/dialogs/ViewDialog";
import { ConfirmDialog } from "@/components/admin/dialogs/ConfirmDialog";

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const { toast } = useToast();
  const router = useRouter();

  const [userDialog, setUserDialog] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [disableUser, setDisableUser] = useState<User | null>(null);

  const handleSaveUser = (data: Omit<User, "id" | "createdAt"> & { id?: string }) => {
    if (data.id) {
      setUsers((prev) => prev.map((u) => (u.id === data.id ? { ...u, ...data } as User : u)));
      toast({ title: "User updated", description: `${data.name} has been updated.` });
    } else {
      const newUser: User = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString().split("T")[0] } as User;
      setUsers((prev) => [...prev, newUser]);
      toast({ title: "User added", description: `${data.name} has been added.` });
    }
  };

  const handleDelete = () => {
    if (!deleteUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
    toast({ title: "User deleted", description: `${deleteUser.name} has been removed.` });
    setDeleteUser(null);
  };

  const handleDisable = () => {
    if (!disableUser) return;
    setUsers((prev) => prev.map((u) => (u.id === disableUser.id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" as User["status"] } : u)));
    toast({ title: "User updated", description: `${disableUser.name} status changed.` });
    setDisableUser(null);
  };

  const columns = [
    {
      key: "name", header: "Name",
      render: (u: User) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{u.name}</span>
          {u.preferred && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              <Star className="h-3 w-3 fill-primary" /> Preferred
            </span>
          )}
        </div>
      ),
    },
    { key: "email", header: "Email" },
    {
      key: "role", header: "Role",
      render: (u: User) => (
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold capitalize text-secondary-foreground">{u.role}</span>
      ),
    },
    { key: "status", header: "Status", render: (u: User) => <StatusBadge status={u.status} /> },
    { key: "createdAt", header: "Joined" },
    {
      key: "actions", header: "Actions",
      render: (u: User) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewUser(u)}><Eye className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditUser(u); setUserDialog(true); }}><Pencil className="h-3.5 w-3.5" /></Button>
          {u.preferred && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary"
                onClick={() => router.push(`/admin/chat?userId=${u.id}&userName=${encodeURIComponent(u.name)}`)}
                title="Chat"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary"
                onClick={() => router.push(`/admin/meetings?userId=${u.id}&userName=${encodeURIComponent(u.name)}`)}
                title="Meeting"
              >
                <Calendar className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary"
                onClick={() => router.push(`/admin/business-requests?userId=${u.id}&userName=${encodeURIComponent(u.name)}`)}
                title="Business Request"
              >
                <Briefcase className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDisableUser(u)}><Ban className="h-3.5 w-3.5" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteUser(u)}><Trash2 className="h-3.5 w-3.5" /></Button>
        </div>
      ),
    },
  ] satisfies Column<User>[];

  return (
    <div>
      <PageHeader title="Users" description="Manage borrowers, lenders, and networks" action={{ label: "Add User", icon: UserPlus, onClick: () => { setEditUser(null); setUserDialog(true); } }} />
      <DataTable data={users} columns={columns} searchKey="name" searchPlaceholder="Search users..." />

      <UserDialog open={userDialog} onOpenChange={setUserDialog} user={editUser} onSave={handleSaveUser} />
      <ViewDialog open={!!viewUser} onOpenChange={() => setViewUser(null)} title="User Details" fields={viewUser ? [
        { label: "Name", value: viewUser.name },
        { label: "Email", value: viewUser.email },
        { label: "Role", value: <span className="capitalize">{viewUser.role}</span> },
        { label: "Status", value: <StatusBadge status={viewUser.status} /> },
        { label: "Preferred", value: viewUser.preferred ? "Yes ⭐" : "No" },
        { label: "Joined", value: viewUser.createdAt },
      ] : []} />
      <ConfirmDialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)} title="Delete User" description={`Are you sure you want to delete ${deleteUser?.name}? This action cannot be undone.`} onConfirm={handleDelete} />
      <ConfirmDialog open={!!disableUser} onOpenChange={() => setDisableUser(null)} title={disableUser?.status === "suspended" ? "Enable User" : "Disable User"} description={`Are you sure you want to ${disableUser?.status === "suspended" ? "enable" : "suspend"} ${disableUser?.name}?`} onConfirm={handleDisable} variant="default" />
    </div>
  );
}
