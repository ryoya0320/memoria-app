-- Memoria v15 shared room setup only
-- Existing tables and policies are preserved.
create table if not exists public.shared_events (
  id uuid primary key default gen_random_uuid(), room_id uuid not null references public.rooms(id) on delete cascade,
  event_date date not null, title text not null, stamp text default '♡', created_by text, created_at timestamptz default now()
);
create table if not exists public.shared_wishes (
  id uuid primary key default gen_random_uuid(), room_id uuid not null references public.rooms(id) on delete cascade,
  title text not null, done boolean default false, created_by text, created_at timestamptz default now()
);
create table if not exists public.shared_settings (
  room_id uuid primary key references public.rooms(id) on delete cascade,
  anniversary_date date, updated_at timestamptz default now()
);
alter table public.shared_events enable row level security;
alter table public.shared_wishes enable row level security;
alter table public.shared_settings enable row level security;
grant select,insert,update,delete on public.shared_events to anon,authenticated;
grant select,insert,update,delete on public.shared_wishes to anon,authenticated;
grant select,insert,update,delete on public.shared_settings to anon,authenticated;
do $$ begin if not exists(select 1 from pg_policies where schemaname='public' and tablename='shared_events' and policyname='shared_events all') then create policy "shared_events all" on public.shared_events for all using(true) with check(true); end if; end $$;
do $$ begin if not exists(select 1 from pg_policies where schemaname='public' and tablename='shared_wishes' and policyname='shared_wishes all') then create policy "shared_wishes all" on public.shared_wishes for all using(true) with check(true); end if; end $$;
do $$ begin if not exists(select 1 from pg_policies where schemaname='public' and tablename='shared_settings' and policyname='shared_settings all') then create policy "shared_settings all" on public.shared_settings for all using(true) with check(true); end if; end $$;
grant delete on public.memories to anon,authenticated;
do $$ begin if not exists(select 1 from pg_policies where schemaname='public' and tablename='memories' and policyname='memories delete') then create policy "memories delete" on public.memories for delete using(true); end if; end $$;
