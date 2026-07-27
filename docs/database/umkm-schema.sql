-- Jalankan file ini satu kali melalui Supabase SQL Editor.
-- Aman dijalankan kembali: tabel, bucket, kebijakan, dan data awal bersifat idempotent.

create extension if not exists "pgcrypto";

create table if not exists public.umkm_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  producer text,
  price text,
  measure text,
  image_path text,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Menambahkan ukuran/isi untuk instalasi versi sebelumnya.
alter table public.umkm_products
  add column if not exists measure text;

-- Menghapus kolom kontak per produk dari instalasi versi sebelumnya.
alter table public.umkm_products drop column if exists contact;

alter table public.umkm_products enable row level security;

drop policy if exists "public can read published umkm products"
  on public.umkm_products;
create policy "public can read published umkm products"
  on public.umkm_products
  for select
  to anon, authenticated
  using (
    is_published = true
    or private.is_admin()
  );

drop policy if exists "admins can insert umkm products"
  on public.umkm_products;
create policy "admins can insert umkm products"
  on public.umkm_products
  for insert
  to authenticated
  with check (private.is_admin());

drop policy if exists "admins can update umkm products"
  on public.umkm_products;
create policy "admins can update umkm products"
  on public.umkm_products
  for update
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists "admins can delete umkm products"
  on public.umkm_products;
create policy "admins can delete umkm products"
  on public.umkm_products
  for delete
  to authenticated
  using (private.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'umkm',
  'umkm',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins can upload umkm images" on storage.objects;
create policy "admins can upload umkm images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'umkm'
    and private.is_admin()
  );

drop policy if exists "admins can update umkm images" on storage.objects;
create policy "admins can update umkm images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'umkm'
    and private.is_admin()
  )
  with check (
    bucket_id = 'umkm'
    and private.is_admin()
  );

drop policy if exists "admins can delete umkm images" on storage.objects;
create policy "admins can delete umkm images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'umkm'
    and private.is_admin()
  );

-- Produk awal sesuai kebutuhan halaman. Lengkapi harga, kontak, dan gambar dari admin.
insert into public.umkm_products (
  name,
  description,
  is_published,
  display_order
)
select
  'Madu Lokal',
  'Madu lokal hasil produksi masyarakat Desa Labuhan Kuris.',
  true,
  1
where not exists (
  select 1 from public.umkm_products where name = 'Madu Lokal'
);

insert into public.umkm_products (
  name,
  description,
  is_published,
  display_order
)
select
  'Garam Lokal',
  'Garam lokal yang dihasilkan dan diolah oleh masyarakat Desa Labuhan Kuris.',
  true,
  2
where not exists (
  select 1 from public.umkm_products where name = 'Garam Lokal'
);
