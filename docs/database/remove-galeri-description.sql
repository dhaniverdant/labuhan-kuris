-- Deploy the application changes before running this in Supabase SQL Editor.
-- Permanently removes existing gallery descriptions; titles and images are retained.
begin;

alter table public.galeri
  drop column if exists description;

notify pgrst, 'reload schema';

commit;
