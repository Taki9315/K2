import { cn } from "@/lib/utils";

type StatusVariant = "success" | "warning" | "destructive" | "info" | "default";

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
}

const autoVariant = (status: string): StatusVariant => {
  const s = status.toLowerCase();
  if (["active", "approved", "succeeded"].includes(s)) return "success";
  if (["pending", "reviewing"].includes(s)) return "warning";
  if (["rejected", "suspended", "failed"].includes(s)) return "destructive";
  if (["inactive", "refunded"].includes(s)) return "info";
  return "default";
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const v = variant ?? autoVariant(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
        v === "success" && "bg-success/10 text-success",
        v === "warning" && "bg-warning/10 text-warning",
        v === "destructive" && "bg-destructive/10 text-destructive",
        v === "info" && "bg-info/10 text-info",
        v === "default" && "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}
