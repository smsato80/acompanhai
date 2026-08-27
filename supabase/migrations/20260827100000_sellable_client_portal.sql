create table public.client_invites (
  id uuid primary key default extensions.gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid not null,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz not null,
  redeemed_at timestamptz null,
  revoked_at timestamptz null,
  created_at timestamptz not null default now(),
  foreign key (organization_id, client_id)
    references public.clients (organization_id, id)
    on delete cascade,
  check (expires_at > created_at)
);

create index client_invites_org_client_idx
  on public.client_invites (organization_id, client_id, created_at desc);

create table public.client_sessions (
  id uuid primary key default extensions.gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid not null,
  session_hash text not null unique check (session_hash ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz not null,
  revoked_at timestamptz null,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  foreign key (organization_id, client_id)
    references public.clients (organization_id, id)
    on delete cascade,
  check (expires_at > created_at)
);

create index client_sessions_client_idx
  on public.client_sessions (client_id, created_at desc);

alter table public.client_invites enable row level security;
alter table public.client_sessions enable row level security;
alter table public.client_invites force row level security;
alter table public.client_sessions force row level security;

create policy "client_invites_select_owner"
  on public.client_invites
  for select
  using (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "client_invites_insert_owner"
  on public.client_invites
  for insert
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "client_invites_update_owner"
  on public.client_invites
  for update
  using (private.is_organization_owner(organization_id) or private.is_platform_admin())
  with check (private.is_organization_owner(organization_id) or private.is_platform_admin());

create policy "client_invites_delete_owner"
  on public.client_invites
  for delete
  using (private.is_organization_owner(organization_id) or private.is_platform_admin());

revoke all on table public.client_sessions from anon, authenticated;

create or replace function public.redeem_client_invite(
  p_token_hash text,
  p_session_hash text,
  p_session_expires_at timestamptz
)
returns table (client_id uuid, organization_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
declare
  invite_record record;
  safe_session_expiry timestamptz;
begin
  if p_token_hash is null
    or p_session_hash is null
    or p_token_hash !~ '^[0-9a-f]{64}$'
    or p_session_hash !~ '^[0-9a-f]{64}$' then
    raise exception 'invalid invitation';
  end if;

  safe_session_expiry := least(
    coalesce(p_session_expires_at, now() + interval '24 hours'),
    now() + interval '24 hours'
  );

  if safe_session_expiry <= now() then
    raise exception 'invalid invitation';
  end if;

  select invite.*
    into invite_record
    from public.client_invites as invite
   where invite.token_hash = p_token_hash
     and invite.redeemed_at is null
     and invite.revoked_at is null
     and invite.expires_at > now()
   for update;

  if not found then
    raise exception 'invalid invitation';
  end if;

  insert into public.client_sessions (
    organization_id,
    client_id,
    session_hash,
    expires_at
  )
  values (
    invite_record.organization_id,
    invite_record.client_id,
    p_session_hash,
    safe_session_expiry
  );

  update public.client_invites
     set redeemed_at = now()
   where id = invite_record.id;

  return query
  select invite_record.client_id, invite_record.organization_id;
exception
  when unique_violation then
    raise exception 'invalid invitation';
end;
$$;

create or replace function public.get_client_portal(p_session_hash text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  portal_payload jsonb;
begin
  if p_session_hash is null or p_session_hash !~ '^[0-9a-f]{64}$' then
    return '{}'::jsonb;
  end if;

  update public.client_sessions
     set last_seen_at = now()
   where session_hash = p_session_hash
     and revoked_at is null
     and expires_at > now();

  select jsonb_build_object(
    'client', jsonb_build_object(
      'id', client_record.id,
      'name', client_record.display_name
    ),
    'professional', jsonb_build_object(
      'name', coalesce(profile_record.display_name, organization_record.name)
    ),
    'plan', case
      when plan_record.id is null then null
      else jsonb_build_object(
        'id', plan_record.id,
        'name', plan_record.name,
        'version', plan_record.current_version,
        'content', plan_record.content,
        'startsOn', plan_record.starts_on,
        'endsOn', plan_record.ends_on
      )
    end,
    'checkIn', case
      when check_in_record.id is null then null
      else jsonb_build_object(
        'status', check_in_record.status,
        'difficulty', check_in_record.difficulty,
        'comment', check_in_record.comment,
        'submittedAt', check_in_record.submitted_at
      )
    end
  )
    into portal_payload
    from public.client_sessions as session_record
    join public.clients as client_record
      on client_record.id = session_record.client_id
     and client_record.organization_id = session_record.organization_id
    join public.organizations as organization_record
      on organization_record.id = session_record.organization_id
    left join public.organization_members as owner_record
      on owner_record.organization_id = session_record.organization_id
     and owner_record.role = 'owner'
    left join public.profiles as profile_record
      on profile_record.id = owner_record.user_id
    left join lateral (
      select plan.*
        from public.plans as plan
       where plan.organization_id = session_record.organization_id
         and plan.client_id = session_record.client_id
         and plan.status in ('published', 'paused')
         and plan.archived_at is null
       order by plan.published_at desc nulls last, plan.created_at desc
       limit 1
    ) as plan_record on true
    left join lateral (
      select check_in.*
        from public.check_ins as check_in
       where check_in.organization_id = session_record.organization_id
         and check_in.client_id = session_record.client_id
       order by check_in.scheduled_on desc, check_in.submitted_at desc
       limit 1
    ) as check_in_record on true
   where session_record.session_hash = p_session_hash
     and session_record.revoked_at is null
     and session_record.expires_at > now();

  return coalesce(portal_payload, '{}'::jsonb);
end;
$$;

create or replace function public.submit_client_check_in(
  p_session_hash text,
  p_status text,
  p_difficulty smallint,
  p_comment text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  session_record record;
  plan_record record;
  organization_timezone text;
  scheduled_date date;
  check_in_id uuid;
begin
  if p_session_hash is null or p_session_hash !~ '^[0-9a-f]{64}$'
    or p_status not in ('done', 'partial', 'not_done')
    or p_difficulty is null
    or p_difficulty < 1
    or p_difficulty > 5
    or (p_comment is not null and char_length(p_comment) > 500) then
    raise exception 'invalid check-in';
  end if;

  select session.*
    into session_record
    from public.client_sessions as session
   where session.session_hash = p_session_hash
     and session.revoked_at is null
     and session.expires_at > now();

  if not found then
    raise exception 'invalid check-in';
  end if;

  select organization.timezone
    into organization_timezone
    from public.organizations as organization
   where organization.id = session_record.organization_id;

  scheduled_date := (now() at time zone coalesce(organization_timezone, 'Asia/Tokyo'))::date;

  select plan.id, plan.current_version, plan.content
    into plan_record
    from public.plans as plan
   where plan.organization_id = session_record.organization_id
     and plan.client_id = session_record.client_id
     and plan.status in ('published', 'paused')
     and plan.archived_at is null
   order by plan.published_at desc nulls last, plan.created_at desc
   limit 1;

  if not found then
    raise exception 'no active plan';
  end if;

  insert into public.check_ins (
    organization_id,
    client_id,
    plan_id,
    plan_version,
    plan_snapshot,
    scheduled_on,
    status,
    difficulty,
    comment,
    submitted_at
  )
  values (
    session_record.organization_id,
    session_record.client_id,
    plan_record.id,
    plan_record.current_version,
    plan_record.content,
    scheduled_date,
    p_status,
    p_difficulty,
    nullif(btrim(p_comment), ''),
    now()
  )
  on conflict (organization_id, client_id, scheduled_on)
  do update set
    plan_id = excluded.plan_id,
    plan_version = excluded.plan_version,
    plan_snapshot = excluded.plan_snapshot,
    status = excluded.status,
    difficulty = excluded.difficulty,
    comment = excluded.comment,
    submitted_at = now(),
    updated_at = now()
  returning id into check_in_id;

  update public.client_sessions
     set last_seen_at = now()
   where id = session_record.id;

  return check_in_id;
end;
$$;

create or replace function public.revoke_client_session(p_session_hash text)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.client_sessions
     set revoked_at = coalesce(revoked_at, now())
   where session_hash = p_session_hash
     and p_session_hash ~ '^[0-9a-f]{64}$';
$$;

revoke all on function public.redeem_client_invite(text, text, timestamptz) from public;
revoke all on function public.get_client_portal(text) from public;
revoke all on function public.submit_client_check_in(text, text, smallint, text) from public;
revoke all on function public.revoke_client_session(text) from public;
grant execute on function public.redeem_client_invite(text, text, timestamptz) to anon, authenticated;
grant execute on function public.get_client_portal(text) to anon, authenticated;
grant execute on function public.submit_client_check_in(text, text, smallint, text) to anon, authenticated;
grant execute on function public.revoke_client_session(text) to anon, authenticated;
