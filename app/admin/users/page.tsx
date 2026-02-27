"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Eye,
  Pencil,
  Ban,
  Trash2,
  UserPlus,
  Star,
  MessageCircle,
  Calendar,
  Briefcase,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserDialog } from "@/components/admin/dialogs/UserDialog";
import { ViewDialog } from "@/components/admin/dialogs/ViewDialog";
import { ConfirmDialog } from "@/components/admin/dialogs/ConfirmDialog";

// Matches the profiles table shape
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "borrower" | "lender" | "network";
  status: "active" | "inactive" | "suspended";
  preferred: boolean;
  created_at: string;
  updated_at: string;
}

// Adapter so the existing UserDialog (which uses name/createdAt keys) still works
function toDialogUser(p: UserProfile) {
  return {
    id: p.id,
    name: p.full_name ?? "",
    email: p.email,
    role: p.role,
    status: p.status ?? "active",
    preferred: p.preferred ?? false,
    createdAt: p.created_at?.split("T")[0] ?? "",
  };
}

type DialogUser = ReturnType<typeof toDialogUser>;

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const [userDialog, setUserDialog] = useState(false);
  const [editUser, setEditUser] = useState<DialogUser | null>(null);
  const [viewUser, setViewUser] = useState<DialogUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserProfile | null>(null);
  const [disableUser, setDisableUser] = useState<UserProfile | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: UserProfile[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast({ title: "Error", description: "Failed to load users." });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSaveUser = async (
    data: { id?: string; name: string; email: string; role: string; status: string; preferred: boolean }
  ) => {
    try {
      const isNew = !data.id;
      const res = await fetch("/api/admin/users", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isNew
            ? {
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
                preferred: data.preferred,
              }
            : {
                id: data.id,
                full_name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
                preferred: data.preferred,
              }
        ),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || (isNew ? "Failed to create user" : "Failed to update user"));
      }

      toast({
        title: isNew ? "User created" : "User updated",
        description: `${data.name || data.email} has been ${isNew ? "created" : "updated"}.`,
      });
      fetchUsers();
    } catch (err: any) {
      console.error("Save user error:", err);
      toast({ title: "Error", description: err.message || "Failed to save user." });
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    try {
      const res = await fetch(`/api/admin/users?id=${deleteUser.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
      toast({
        title: "User deleted",
        description: `${deleteUser.full_name ?? deleteUser.email} has been removed.`,
      });
    } catch (err) {
      console.error("Delete user error:", err);
      toast({ title: "Error", description: "Failed to delete user." });
    }
    setDeleteUser(null);
  };

  const handleDisable = async () => {
    if (!disableUser) return;
    const newStatus =
      disableUser.status === "suspended" ? "active" : "suspended";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: disableUser.id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === disableUser.id ? { ...u, status: newStatus } : u
        )
      );
      toast({
        title: "User updated",
        description: `${disableUser.full_name ?? disableUser.email} status changed to ${newStatus}.`,
      });
    } catch (err) {
      console.error("Disable user error:", err);
      toast({ title: "Error", description: "Failed to update user status." });
    }
    setDisableUser(null);
  };

  const columns = [
    {
      key: "full_name",
      header: "Name",
      render: (u: UserProfile) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            {u.full_name || u.email}
          </span>
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
      key: "role",
      header: "Role",
      render: (u: UserProfile) => (
        <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold capitalize text-secondary-foreground">
          {u.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (u: UserProfile) => <StatusBadge status={u.status ?? "active"} />,
    },
    {
      key: "created_at",
      header: "Joined",
      render: (u: UserProfile) => (
        <span>{u.created_at?.split("T")[0] ?? "—"}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (u: UserProfile) => {
        const du = toDialogUser(u);
        return (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewUser(du)}
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setEditUser(du);
                setUserDialog(true);
              }}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            {u.preferred && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary"
                  onClick={() =>
                    router.push(
                      `/admin/chat?userId=${u.id}&userName=${encodeURIComponent(u.full_name ?? u.email)}`
                    )
                  }
                  title="Chat"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary"
                  onClick={() =>
                    router.push(
                      `/admin/meetings?userId=${u.id}&userName=${encodeURIComponent(u.full_name ?? u.email)}`
                    )
                  }
                  title="Meeting"
                >
                  <Calendar className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary"
                  onClick={() =>
                    router.push(
                      `/admin/business-requests?userId=${u.id}&userName=${encodeURIComponent(u.full_name ?? u.email)}`
                    )
                  }
                  title="Business Request"
                >
                  <Briefcase className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setDisableUser(u)}
            >
              <Ban className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              onClick={() => setDeleteUser(u)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        );
      },
    },
  ] satisfies Column<UserProfile>[];

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage borrowers, lenders, and networks"
        action={{
          label: "Add User",
          icon: UserPlus,
          onClick: () => {
            setEditUser(null);
            setUserDialog(true);
          },
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading users…</span>
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          searchKey="full_name"
          searchPlaceholder="Search users..."
        />
      )}

      <UserDialog
        open={userDialog}
        onOpenChange={setUserDialog}
        user={editUser}
        onSave={handleSaveUser}
      />
      <ViewDialog
        open={!!viewUser}
        onOpenChange={() => setViewUser(null)}
        title="User Details"
        fields={
          viewUser
            ? [
                { label: "Name", value: viewUser.name || "—" },
                { label: "Email", value: viewUser.email },
                {
                  label: "Role",
                  value: (
                    <span className="capitalize">{viewUser.role}</span>
                  ),
                },
                {
                  label: "Status",
                  value: <StatusBadge status={viewUser.status} />,
                },
                {
                  label: "Preferred",
                  value: viewUser.preferred ? "Yes ⭐" : "No",
                },
                { label: "Joined", value: viewUser.createdAt },
              ]
            : []
        }
      />
      <ConfirmDialog
        open={!!deleteUser}
        onOpenChange={() => setDeleteUser(null)}
        title="Delete User"
        description={`Are you sure you want to delete ${deleteUser?.full_name ?? deleteUser?.email}? This action cannot be undone.`}
        onConfirm={handleDelete}
      />
      <ConfirmDialog
        open={!!disableUser}
        onOpenChange={() => setDisableUser(null)}
        title={
          disableUser?.status === "suspended" ? "Enable User" : "Disable User"
        }
        description={`Are you sure you want to ${disableUser?.status === "suspended" ? "enable" : "suspend"} ${disableUser?.full_name ?? disableUser?.email}?`}
        onConfirm={handleDisable}
        variant="default"
      />
    </div>
  );
}
