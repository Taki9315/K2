import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon }: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20">
      {/* Decorative corner accent */}
      <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-card-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-1 text-sm font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className="rounded-xl gradient-green green-glow p-3">
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
