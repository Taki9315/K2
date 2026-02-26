import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, full_name, role } = body;

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields: id, email" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    // Upsert so it won't fail if the trigger already created the row
    const { error } = await supabase.from("profiles").upsert(
      {
        id,
        email,
        full_name: full_name || null,
        role: role || "borrower",
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Profile upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Create profile error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
