-- ============================================================================
-- K2 Commercial Finance - Profiles RLS + Auto-create Trigger
-- Migration: 20260226100000_profiles_rls_and_trigger.sql
--
-- Fixes 401 on profile insert during signup by:
--   1. Adding RLS policies so users can manage their own profile row
--   2. Adding a trigger on auth.users that auto-creates a profiles row
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- 1. Ensure RLS is enabled
-- ────────────────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- ────────────────────────────────────────────────────────────────────────────
-- 2. RLS policies for profiles
-- ────────────────────────────────────────────────────────────────────────────

-- Users can read their own profile
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can read own profile'
  ) then
    create policy "Users can read own profile"
      on public.profiles for select
      using (auth.uid() = id);
  end if;
end $$;

-- Users can insert their own profile (id must match auth.uid)
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can insert own profile'
  ) then
    create policy "Users can insert own profile"
      on public.profiles for insert
      with check (auth.uid() = id);
  end if;
end $$;

-- Users can update their own profile
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
      on public.profiles for update
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;
end $$;

-- Admins can read all profiles
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Admins can read all profiles'
  ) then
    create policy "Admins can read all profiles"
      on public.profiles for select
      using (
        exists (
          select 1 from public.profiles p
          where p.id = auth.uid() and p.role = 'admin'
        )
      );
  end if;
end $$;

-- Admins can update all profiles
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'profiles' and policyname = 'Admins can update all profiles'
  ) then
    create policy "Admins can update all profiles"
      on public.profiles for update
      using (
        exists (
          select 1 from public.profiles p
          where p.id = auth.uid() and p.role = 'admin'
        )
      );
  end if;
end $$;

-- ────────────────────────────────────────────────────────────────────────────
-- 3. Trigger function: auto-create profile on new user sign-up
--    Runs as SECURITY DEFINER so it bypasses RLS.
-- ────────────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'borrower')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop existing trigger if present, then recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
