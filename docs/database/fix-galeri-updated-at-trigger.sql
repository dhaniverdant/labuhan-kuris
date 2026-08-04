-- Fixes gallery updates failing with:
--   record "new" has no field "updatedAt"
--
-- Run this file once in the Supabase SQL Editor. It is safe to run again.

begin;

alter table public.galeri
  add column if not exists updated_at timestamptz not null default now();

-- Remove only triggers on public.galeri whose function still expects the
-- obsolete camelCase column. A shared trigger function may be used by other
-- tables, so the function itself is deliberately left untouched.
do $repair$
declare
  faulty_trigger record;
begin
  for faulty_trigger in
    select trigger_info.tgname
    from pg_trigger as trigger_info
    join pg_class as table_info
      on table_info.oid = trigger_info.tgrelid
    join pg_namespace as schema_info
      on schema_info.oid = table_info.relnamespace
    where schema_info.nspname = 'public'
      and table_info.relname = 'galeri'
      and not trigger_info.tgisinternal
      and pg_get_functiondef(trigger_info.tgfoid) ilike '%updatedAt%'
  loop
    execute format(
      'drop trigger %I on public.galeri',
      faulty_trigger.tgname
    );
  end loop;
end
$repair$;

create or replace function public.set_galeri_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

drop trigger if exists set_galeri_updated_at on public.galeri;

create trigger set_galeri_updated_at
before update on public.galeri
for each row
execute function public.set_galeri_updated_at();

commit;
