-- STATISTIK SUMMARY
insert into public.statistik_summary (
  label,
  value,
  suffix,
  display_order,
  is_published
) values
  ('Jumlah Penduduk', 3245, 'Jiwa', 1, true),
  ('Jumlah KK', 980, 'KK', 2, true),
  ('Luas Wilayah', 12.5, 'Km²', 3, true),
  ('Jumlah Dusun', 9, 'Dusun', 4, true);

-- RSL POLICIES & PENDUDUK PER DUSUN
create table if not exists public.statistik_summary (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value double precision not null default 0,
  suffix text,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.statistik_summary enable row level security;

create policy "public can read published statistik summary"
on public.statistik_summary
for select
to anon, authenticated
using (is_published = true);

create policy "admin can read all statistik summary"
on public.statistik_summary
for select
to authenticated
using (private.is_admin());

create policy "admin can insert statistik summary"
on public.statistik_summary
for insert
to authenticated
with check (private.is_admin());

create policy "admin can update statistik summary"
on public.statistik_summary
for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "admin can delete statistik summary"
on public.statistik_summary
for delete
to authenticated
using (private.is_admin());


create table if not exists public.penduduk_per_dusun (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  penduduk integer not null default 0,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.penduduk_per_dusun enable row level security;

create policy "public can read published penduduk per dusun"
on public.penduduk_per_dusun
for select
to anon, authenticated
using (is_published = true);

create policy "admin can read all penduduk per dusun"
on public.penduduk_per_dusun
for select
to authenticated
using (private.is_admin());

create policy "admin can insert penduduk per dusun"
on public.penduduk_per_dusun
for insert
to authenticated
with check (private.is_admin());

create policy "admin can update penduduk per dusun"
on public.penduduk_per_dusun
for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

create policy "admin can delete penduduk per dusun"
on public.penduduk_per_dusun
for delete
to authenticated
using (private.is_admin());

