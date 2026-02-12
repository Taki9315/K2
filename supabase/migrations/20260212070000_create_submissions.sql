create extension if not exists "pgcrypto";

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  answers_json jsonb not null,
  summary_text text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists submissions_user_id_created_at_idx
  on public.submissions (user_id, created_at desc);

alter table public.submissions enable row level security;

drop policy if exists "Users can view own submissions" on public.submissions;
create policy "Users can view own submissions"
  on public.submissions
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own submissions" on public.submissions;
create policy "Users can insert own submissions"
  on public.submissions
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own submissions" on public.submissions;
create policy "Users can update own submissions"
  on public.submissions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('loan-packages', 'loan-packages', false)
on conflict (id) do nothing;

drop policy if exists "Users can upload own loan packages" on storage.objects;
create policy "Users can upload own loan packages"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'loan-packages'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can read own loan packages" on storage.objects;
create policy "Users can read own loan packages"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'loan-packages'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
