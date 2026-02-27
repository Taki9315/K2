import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createServiceRoleClient();

    // Run all queries in parallel
    const [
      usersResult,
      submissionsResult,
      providersResult,
      ordersResult,
      partnersResult,
      recentUsersResult,
      recentSubmissionsResult,
      membershipsResult,
    ] = await Promise.all([
      // Total users
      supabase.from("profiles").select("id, role, status, created_at"),
      // Submissions
      supabase.from("submissions").select("id, created_at"),
      // Providers
      supabase.from("providers").select("id, status, created_at"),
      // Orders / payments
      supabase.from("orders").select("id, amount, status, created_at"),
      // Partners
      supabase.from("partner_profiles").select("id, is_published, created_at"),
      // Recent users (last 10)
      supabase
        .from("profiles")
        .select("id, full_name, email, role, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      // Recent submissions (last 10)
      supabase
        .from("submissions")
        .select("id, user_id, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      // Active memberships
      supabase
        .from("memberships")
        .select("id, status, started_at")
        .eq("status", "active"),
    ]);

    // ── Compute stats ──

    const users = usersResult.data ?? [];
    const submissions = submissionsResult.data ?? [];
    const providers = providersResult.data ?? [];
    const orders = ordersResult.data ?? [];
    const partners = partnersResult.data ?? [];
    const recentUsers = recentUsersResult.data ?? [];
    const recentSubmissions = recentSubmissionsResult.data ?? [];
    const memberships = membershipsResult.data ?? [];

    // Revenue from succeeded orders
    const succeededOrders = orders.filter(
      (o: any) => o.status === "completed" || o.status === "succeeded"
    );
    const totalRevenue = succeededOrders.reduce(
      (sum: number, o: any) => sum + (o.amount || 0),
      0
    );

    // Pending providers
    const pendingProviders = providers.filter(
      (p: any) => p.status === "pending"
    ).length;

    // User counts by role
    const roleCounts: Record<string, number> = {};
    users.forEach((u: any) => {
      roleCounts[u.role] = (roleCounts[u.role] || 0) + 1;
    });

    // Monthly data for charts (last 6 months)
    const now = new Date();
    const monthLabels: string[] = [];
    const monthKeys: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthLabels.push(d.toLocaleString("en-US", { month: "short" }));
      monthKeys.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      );
    }

    // Users per month
    const userGrowth = monthKeys.map((key, idx) => {
      const count = users.filter((u: any) => {
        const d = u.created_at?.substring(0, 7);
        return d <= key;
      }).length;
      return { month: monthLabels[idx], users: count };
    });

    // Revenue per month
    const revenueByMonth = monthKeys.map((key, idx) => {
      const total = succeededOrders
        .filter((o: any) => o.created_at?.substring(0, 7) === key)
        .reduce((s: number, o: any) => s + (o.amount || 0), 0);
      return { month: monthLabels[idx], revenue: total };
    });

    // Submissions per month
    const submissionsByMonth = monthKeys.map((key, idx) => {
      const count = submissions.filter(
        (s: any) => s.created_at?.substring(0, 7) === key
      ).length;
      return { month: monthLabels[idx], submissions: count };
    });

    // Build recent activity feed from real data
    const activity: { action: string; detail: string; time: string }[] = [];

    recentUsers.forEach((u: any) => {
      activity.push({
        action: "User registered",
        detail: `${u.full_name || u.email} created an account`,
        time: u.created_at,
      });
    });

    recentSubmissions.forEach((s: any) => {
      activity.push({
        action: "New submission",
        detail: `Submission ${s.id.substring(0, 8)}... received`,
        time: s.created_at,
      });
    });

    // Sort activity by time desc, take 8
    activity.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    const recentActivity = activity.slice(0, 8).map((item) => ({
      ...item,
      time: formatRelativeTime(item.time),
    }));

    return NextResponse.json({
      totalUsers: users.length,
      totalSubmissions: submissions.length,
      totalProviders: providers.length,
      totalPartners: partners.length,
      publishedPartners: partners.filter((p: any) => p.is_published).length,
      totalRevenue,
      totalOrders: orders.length,
      activeMemberships: memberships.length,
      pendingProviders,
      roleCounts,
      revenueByMonth,
      userGrowth,
      submissionsByMonth,
      recentActivity,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json(
      { error: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
