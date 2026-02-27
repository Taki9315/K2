import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

// GET /api/admin/users – list all profiles
export async function GET() {
  try {
    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch users error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Admin users GET error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/users – create a new user (auth + profile)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, status, preferred, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Missing required field: email" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    // 1. Create the auth user with default password "123456"
    //    (triggers the handle_new_user trigger which auto-creates a profiles row)
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password: password || "123456",
        email_confirm: false,
        user_metadata: {
          full_name: name || "",
          role: role || "borrower",
        },
      });

    if (authError) {
      console.error("Create auth user error:", authError);
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    const userId = authData.user.id;

    // 2. Send a confirmation / invite email so the user can verify
    const { error: inviteError } =
      await supabase.auth.admin.inviteUserByEmail(email);
    if (inviteError) {
      console.error("Invite email error:", inviteError);
      // Non-fatal – user was created, admin can resend later
    }

    // 2. Update the auto-created profile with additional fields
    const profileUpdates: Record<string, unknown> = {};
    if (name) profileUpdates.full_name = name;
    if (role) profileUpdates.role = role;
    if (status) profileUpdates.status = status;
    if (typeof preferred === "boolean") profileUpdates.preferred = preferred;

    if (Object.keys(profileUpdates).length > 0) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", userId);

      if (profileError) {
        console.error("Update new user profile error:", profileError);
        // User was created in auth but profile update failed – still return success
        // so admin can fix the profile later
      }
    }

    // 3. Return the full profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return NextResponse.json(profile, { status: 201 });
  } catch (err) {
    console.error("Admin users POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users – update a user profile
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update user error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Admin users PATCH error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users – delete a user profile
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing required param: id" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    const { error } = await supabase.from("profiles").delete().eq("id", id);

    if (error) {
      console.error("Delete user error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin users DELETE error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
