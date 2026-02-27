-- ============================================================================
-- K2 Commercial Finance - COMBINED Migration: Partner Profiles Setup
-- Run this ENTIRE script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gzcjmlyyljokvzjdzita/sql/new
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- 1. Create set_updated_at() if it doesn't exist
-- ────────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ────────────────────────────────────────────────────────────────────────────
-- 2. Partner profiles table
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.partner_profiles (
  id              uuid primary key default gen_random_uuid(),
  partner_type    text not null check (partner_type in ('lender', 'vendor')),
  slug            text not null unique,
  company_name    text not null,
  logo_url        text,
  tagline         text,
  description     text,
  contact_name    text,
  contact_email   text not null,
  contact_phone   text,
  website_url     text,
  lender_type     text,
  lending_focus   text,
  min_loan        numeric,
  max_loan        numeric,
  property_types  text[],
  states_served   text[],
  service_type    text,
  service_areas   text,
  contact_picture_url text,
  video_url       text,
  documents       jsonb default '[]',
  highlights      jsonb default '[]',
  is_published    boolean not null default false,
  featured        boolean not null default false,
  created_at      timestamptz not null default timezone('utc', now()),
  updated_at      timestamptz not null default timezone('utc', now())
);

create index if not exists partner_profiles_type_idx
  on public.partner_profiles (partner_type, is_published);
create index if not exists partner_profiles_slug_idx
  on public.partner_profiles (slug);

-- ────────────────────────────────────────────────────────────────────────────
-- 3. Partner contact submissions table
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.partner_contacts (
  id              uuid primary key default gen_random_uuid(),
  partner_id      uuid not null references public.partner_profiles (id) on delete cascade,
  user_id         uuid references auth.users (id) on delete set null,
  sender_name     text not null,
  sender_email    text not null,
  sender_phone    text,
  subject         text,
  message         text not null,
  created_at      timestamptz not null default timezone('utc', now())
);

create index if not exists partner_contacts_partner_idx
  on public.partner_contacts (partner_id, created_at desc);

-- ────────────────────────────────────────────────────────────────────────────
-- 4. Row-level security
-- ────────────────────────────────────────────────────────────────────────────
alter table public.partner_profiles enable row level security;
alter table public.partner_contacts enable row level security;

-- Published profiles visible to all authenticated users
drop policy if exists "Published partners visible to authenticated" on public.partner_profiles;
create policy "Published partners visible to authenticated"
  on public.partner_profiles
  for select
  to authenticated
  using (is_published = true);

-- Admins full access (uses is_admin() to avoid recursion)
drop policy if exists "Admins full access to partner profiles" on public.partner_profiles;
create policy "Admins full access to partner profiles"
  on public.partner_profiles
  for all
  to authenticated
  using  ( public.is_admin() )
  with check ( public.is_admin() );

-- Contact form submissions
drop policy if exists "Authenticated users can submit partner contacts" on public.partner_contacts;
create policy "Authenticated users can submit partner contacts"
  on public.partner_contacts
  for insert
  to authenticated
  with check (true);

drop policy if exists "Users see own partner contacts" on public.partner_contacts;
create policy "Users see own partner contacts"
  on public.partner_contacts
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Admins view all partner contacts" on public.partner_contacts;
create policy "Admins view all partner contacts"
  on public.partner_contacts
  for select
  to authenticated
  using ( public.is_admin() );

-- ────────────────────────────────────────────────────────────────────────────
-- 5. Storage bucket
-- ────────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('partner-assets', 'partner-assets', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can read partner assets" on storage.objects;
create policy "Anyone can read partner assets"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'partner-assets');

drop policy if exists "Admins can upload partner assets" on storage.objects;
create policy "Admins can upload partner assets"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'partner-assets'
    and public.is_admin()
  );

drop policy if exists "Admins can delete partner assets" on storage.objects;
create policy "Admins can delete partner assets"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'partner-assets'
    and public.is_admin()
  );

-- ────────────────────────────────────────────────────────────────────────────
-- 6. Auto-update timestamp trigger
-- ────────────────────────────────────────────────────────────────────────────
drop trigger if exists partner_profiles_updated_at on public.partner_profiles;
create trigger partner_profiles_updated_at
  before update on public.partner_profiles
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────────────────────
-- 7. Fix lender_inquiries & vendor_inquiries admin policies (use is_admin())
-- ────────────────────────────────────────────────────────────────────────────
drop policy if exists "Admins can view lender inquiries" on public.lender_inquiries;
create policy "Admins can view lender inquiries"
  on public.lender_inquiries
  for select to authenticated
  using ( public.is_admin() );

drop policy if exists "Admins can update lender inquiries" on public.lender_inquiries;
create policy "Admins can update lender inquiries"
  on public.lender_inquiries
  for update to authenticated
  using  ( public.is_admin() )
  with check ( public.is_admin() );

drop policy if exists "Admins can view vendor inquiries" on public.vendor_inquiries;
create policy "Admins can view vendor inquiries"
  on public.vendor_inquiries
  for select to authenticated
  using ( public.is_admin() );

drop policy if exists "Admins can update vendor inquiries" on public.vendor_inquiries;
create policy "Admins can update vendor inquiries"
  on public.vendor_inquiries
  for update to authenticated
  using  ( public.is_admin() )
  with check ( public.is_admin() );

-- ============================================================================
-- DONE! The partner_profiles table, RLS policies, and storage are ready.
-- ============================================================================
