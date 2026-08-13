create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.slugify(input text)
returns text
language sql
immutable
as $$
  select nullif(
    trim(both '-' from regexp_replace(lower(coalesce(input, '')), '[^a-z0-9]+', '-', 'g')),
    ''
  );
$$;

create or replace function private.is_platform_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'role', '') = 'platform_admin'
      or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'platform_admin';
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 120),
  locale text not null default 'pt-BR',
  timezone text not null default 'Asia/Tokyo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  slug text not null unique check (slug = public.slugify(slug) and char_length(slug) between 3 and 80),
  timezone text not null default 'Asia/Tokyo',
  status text not null default 'trial' check (status in ('trial', 'active', 'past_due', 'read_only', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create unique index organization_members_one_owner_idx
  on public.organization_members (organization_id)
  where role = 'owner';

create index organization_members_user_id_idx
  on public.organization_members (user_id);

create or replace function private.is_organization_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members organization_member
    where organization_member.organization_id = target_organization_id
      and organization_member.user_id = auth.uid()
  );
$$;

create or replace function private.is_organization_owner(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members organization_member
    where organization_member.organization_id = target_organization_id
      and organization_member.user_id = auth.uid()
      and organization_member.role = 'owner'
  );
$$;

create table public.clients (
  id uuid primary key default extensions.gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 100),
  contact_channel text not null default 'none' check (contact_channel in ('whatsapp', 'line', 'email', 'other', 'none')),
  contact_value text null,
  internal_note text null check (internal_note is null or char_length(internal_note) <= 1000),
  status text not null default 'active' check (status in ('active', 'paused', 'archived')),
  archived_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, id),
  check (contact_channel <> 'none' or contact_value is null),
  check (contact_value is null or char_length(btrim(contact_value)) > 0)
);

create index clients_org_status_name_idx
  on public.clients (organization_id, status, display_name);

create table public.plans (
  id uuid primary key default extensions.gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid not null,
  name text not null check (char_length(btrim(name)) between 1 and 120),
  status text not null default 'draft' check (status in ('draft', 'published', 'paused', 'ended')),
  content jsonb not null default '[]'::jsonb check (jsonb_typeof(content) = 'array'),
  current_version integer not null default 1 check (current_version >= 1),
  starts_on date not null,
  ends_on date null,
  published_at timestamptz null,
  ended_at timestamptz null,
  archived_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, client_id, id),
  foreign key (organization_id, client_id)
    references public.clients (organization_id, id)
    on delete cascade,
  check (ends_on is null or ends_on >= starts_on)
);

create unique index plans_one_active_per_client_idx
  on public.plans (client_id)
  where status in ('published', 'paused')
    and archived_at is null;

create index plans_org_client_status_idx
  on public.plans (organization_id, client_id, status);

create table public.check_ins (
  id uuid primary key default extensions.gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid not null,
  plan_id uuid not null,
  plan_version integer not null default 1 check (plan_version >= 1),
  plan_snapshot jsonb not null default '[]'::jsonb check (jsonb_typeof(plan_snapshot) = 'array'),
  scheduled_on date not null default ((now() at time zone 'Asia/Tokyo')::date),
  status text not null check (status in ('done', 'partial', 'not_done')),
  difficulty smallint null check (difficulty between 1 and 5),
  comment text null check (comment is null or char_length(comment) <= 500),
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, client_id, scheduled_on),
  foreign key (organization_id, client_id)
    references public.clients (organization_id, id)
    on delete cascade,
  foreign key (organization_id, client_id, plan_id)
    references public.plans (organization_id, client_id, id)
    on delete cascade
);

create index check_ins_org_scheduled_on_idx
  on public.check_ins (organization_id, scheduled_on);

create index check_ins_client_scheduled_on_desc_idx
  on public.check_ins (client_id, scheduled_on desc);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_organizations_updated_at
before update on public.organizations
for each row
execute function public.set_updated_at();

create trigger set_clients_updated_at
before update on public.clients
for each row
execute function public.set_updated_at();

create trigger set_plans_updated_at
before update on public.plans
for each row
execute function public.set_updated_at();

create trigger set_check_ins_updated_at
before update on public.check_ins
for each row
execute function public.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  base_display_name text;
  organization_name text;
  organization_slug_seed text;
  organization_slug text;
  user_locale text;
  user_timezone text;
  new_organization_id uuid;
begin
  base_display_name := coalesce(
    nullif(btrim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
    'Novo profissional'
  );

  user_locale := coalesce(
    nullif(btrim(new.raw_user_meta_data ->> 'locale'), ''),
    'pt-BR'
  );

  user_timezone := coalesce(
    nullif(btrim(new.raw_user_meta_data ->> 'timezone'), ''),
    'Asia/Tokyo'
  );

  organization_name := coalesce(
    nullif(btrim(new.raw_user_meta_data ->> 'organization_name'), ''),
    nullif(btrim(new.raw_user_meta_data ->> 'company_name'), ''),
    base_display_name || ' Studio'
  );

  organization_slug_seed := coalesce(
    public.slugify(organization_name),
    public.slugify(base_display_name),
    'org'
  );

  organization_slug := left(organization_slug_seed, 71)
    || '-'
    || right(replace(new.id::text, '-', ''), 8);

  insert into public.profiles (id, display_name, locale, timezone)
  values (new.id, base_display_name, user_locale, user_timezone)
  on conflict (id) do nothing;

  insert into public.organizations (name, slug, timezone, status)
  values (organization_name, organization_slug, user_timezone, 'trial')
  returning id into new_organization_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (new_organization_id, new.id, 'owner')
  on conflict (organization_id, user_id) do nothing;

  return new;
end;
$$;

revoke all on function private.is_platform_admin() from public;
revoke all on function private.is_organization_member(uuid) from public;
revoke all on function private.is_organization_owner(uuid) from public;
revoke all on function private.handle_new_user() from public;

grant usage on schema private to anon, authenticated;
grant execute on function private.is_platform_admin() to anon, authenticated;
grant execute on function private.is_organization_member(uuid) to anon, authenticated;
grant execute on function private.is_organization_owner(uuid) to anon, authenticated;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function private.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.clients enable row level security;
alter table public.plans enable row level security;
alter table public.check_ins enable row level security;

alter table public.profiles force row level security;
alter table public.organizations force row level security;
alter table public.organization_members force row level security;
alter table public.clients force row level security;
alter table public.plans force row level security;
alter table public.check_ins force row level security;

create policy "profiles_select_self"
  on public.profiles
  for select
  using (id = auth.uid() or private.is_platform_admin());

create policy "profiles_update_self"
  on public.profiles
  for update
  using (id = auth.uid() or private.is_platform_admin())
  with check (id = auth.uid() or private.is_platform_admin());

create policy "organizations_select_member"
  on public.organizations
  for select
  using (private.is_organization_member(id) or private.is_platform_admin());

create policy "organizations_update_owner"
  on public.organizations
  for update
  using (private.is_organization_owner(id) or private.is_platform_admin())
  with check (private.is_organization_owner(id) or private.is_platform_admin());

create policy "organization_members_select_member"
  on public.organization_members
  for select
  using (
    user_id = auth.uid()
    or private.is_organization_member(organization_id)
    or private.is_platform_admin()
  );

create policy "clients_select_member"
  on public.clients
  for select
  using (private.is_organization_member(organization_id) or private.is_platform_admin());

create policy "clients_insert_owner"
  on public.clients
  for insert
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "clients_update_owner"
  on public.clients
  for update
  using (private.is_organization_owner(organization_id) or private.is_platform_admin())
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "clients_delete_owner"
  on public.clients
  for delete
  using (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "plans_select_member"
  on public.plans
  for select
  using (private.is_organization_member(organization_id) or private.is_platform_admin());

create policy "plans_insert_owner"
  on public.plans
  for insert
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "plans_update_owner"
  on public.plans
  for update
  using (private.is_organization_owner(organization_id) or private.is_platform_admin())
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "plans_delete_owner"
  on public.plans
  for delete
  using (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "check_ins_select_member"
  on public.check_ins
  for select
  using (private.is_organization_member(organization_id) or private.is_platform_admin());

create policy "check_ins_insert_owner"
  on public.check_ins
  for insert
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "check_ins_update_owner"
  on public.check_ins
  for update
  using (private.is_organization_owner(organization_id) or private.is_platform_admin())
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "check_ins_delete_owner"
  on public.check_ins
  for delete
  using (private.is_organization_owner(organization_id) or private.is_platform_admin());
