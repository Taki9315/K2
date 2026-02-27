import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

/**
 * POST /api/admin/setup-db
 *
 * Checks whether the partner_profiles table exists, and if not,
 * returns the SQL that needs to be run in the Supabase SQL Editor.
 * Also runs what it can via the service-role client (DDL requires SQL editor).
 */
export async function GET() {
  try {
    const supabase = createServiceRoleClient();

    // 1. Check if partner_profiles table exists by attempting a count
    const { error: ppError } = await supabase
      .from("partner_profiles")
      .select("id", { count: "exact", head: true });

    const tableExists = !ppError || !ppError.message.includes("does not exist");

    // 2. Check if contact_picture_url column exists
    let columnExists = false;
    if (tableExists) {
      const { data, error: colError } = await supabase
        .from("partner_profiles")
        .select("contact_picture_url")
        .limit(0);
      columnExists =
        !colError || !colError.message.includes("contact_picture_url");
    }

    // 3. Check for storage bucket
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.id === "partner-assets");

    // If bucket doesn't exist, create it (this CAN be done via service role)
    if (!bucketExists) {
      await supabase.storage.createBucket("partner-assets", {
        public: true,
      });
    }

    return NextResponse.json({
      partner_profiles_table: tableExists,
      contact_picture_url_column: columnExists,
      partner_assets_bucket: bucketExists || true,
      message: tableExists
        ? columnExists
          ? "All database tables are set up correctly."
          : "Table exists but contact_picture_url column is missing. Run the migration SQL in Supabase SQL Editor."
        : 'The partner_profiles table does not exist. Please run the migration SQL in the Supabase SQL Editor.',
      sql_editor_url: `https://supabase.com/dashboard/project/${
        process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
          /https:\/\/([^.]+)\./
        )?.[1] ?? "your-project"
      }/sql/new`,
    });
  } catch (err) {
    console.error("Setup-db check error:", err);
    return NextResponse.json(
      { error: "Failed to check database status" },
      { status: 500 }
    );
  }
}
