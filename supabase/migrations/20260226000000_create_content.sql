-- ============================================================================
-- K2 Commercial Finance – Content table
-- Migration: 20260226000000_create_content.sql
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- 1. Content table (videos, articles, PDFs managed by admin)
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.content (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  description     text not null default '',
  type            text not null default 'video'
    check (type in ('video', 'article')),
  access_level    text not null default 'public'
    check (access_level in ('public', 'members_only')),
  category        text not null default 'General',
  video_url       text,
  article_content text,
  file_url        text,
  thumbnail_url   text,
  view_count      integer not null default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default timezone('utc', now()),
  updated_at      timestamptz not null default timezone('utc', now())
);

create index if not exists content_slug_idx on public.content (slug);
create index if not exists content_access_level_idx on public.content (access_level);
create index if not exists content_category_idx on public.content (category);
create index if not exists content_is_published_idx on public.content (is_published);

alter table public.content enable row level security;

-- Public can read published public content
drop policy if exists "Anyone can read public content" on public.content;
create policy "Anyone can read public content"
  on public.content
  for select
  to anon, authenticated
  using (is_published = true);

-- Admins can do everything
drop policy if exists "Admins can manage content" on public.content;
create policy "Admins can manage content"
  on public.content
  for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- ────────────────────────────────────────────────────────────────────────────
-- 2. Content views table (for tracking)
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.content_views (
  id          uuid primary key default gen_random_uuid(),
  content_id  uuid not null references public.content(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default timezone('utc', now())
);

create index if not exists content_views_content_id_idx on public.content_views (content_id);

alter table public.content_views enable row level security;

drop policy if exists "Authenticated users can insert views" on public.content_views;
create policy "Authenticated users can insert views"
  on public.content_views
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────────────
-- 3. Increment view count function
-- ────────────────────────────────────────────────────────────────────────────
create or replace function public.increment_view_count(content_id uuid)
returns void
language plpgsql security definer
as $$
begin
  update public.content
  set view_count = view_count + 1
  where id = content_id;
end;
$$;

-- ────────────────────────────────────────────────────────────────────────────
-- 4. Content storage bucket
-- ────────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('content-files', 'content-files', true)
on conflict (id) do nothing;

drop policy if exists "Admins can upload content files" on storage.objects;
create policy "Admins can upload content files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'content-files'
    and exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

drop policy if exists "Anyone can read content files" on storage.objects;
create policy "Anyone can read content files"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'content-files');

-- ────────────────────────────────────────────────────────────────────────────
-- 5. Updated_at trigger
-- ────────────────────────────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists content_updated_at on public.content;
create trigger content_updated_at
  before update on public.content
  for each row
  execute function public.handle_updated_at();
