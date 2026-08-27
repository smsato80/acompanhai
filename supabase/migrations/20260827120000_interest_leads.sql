create table public.interest_leads (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  email text not null check (
    email = lower(btrim(email))
    and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  ),
  whatsapp text null check (
    whatsapp is null
    or char_length(btrim(whatsapp)) between 6 and 40
  ),
  consent_at timestamptz not null default now(),
  source text not null default 'landing' check (source = 'landing'),
  created_at timestamptz not null default now()
);

create index interest_leads_created_at_idx
  on public.interest_leads (created_at desc);

alter table public.interest_leads enable row level security;
alter table public.interest_leads force row level security;

revoke all on table public.interest_leads from anon, authenticated;
grant insert on table public.interest_leads to anon, authenticated;

create policy "Public can submit interest leads"
  on public.interest_leads
  for insert
  to anon, authenticated
  with check (source = 'landing');
