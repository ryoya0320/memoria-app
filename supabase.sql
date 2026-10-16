-- Supabase SQL Editorで一度だけ実行してください
create extension if not exists pgcrypto;
create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  invite_code text unique not null,
  created_at timestamptz default now()
);
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  title text, event_date date, note text, image_data text,
  created_at timestamptz default now()
);
alter table public.rooms enable row level security;
alter table public.memories enable row level security;
-- デモ用ポリシー。公開前にAuth連携へ強化することを推奨します。
create policy "rooms demo read" on public.rooms for select using (true);
create policy "rooms demo insert" on public.rooms for insert with check (true);
create policy "memories demo read" on public.memories for select using (true);
create policy "memories demo insert" on public.memories for insert with check (true);
