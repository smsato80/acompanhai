alter function public.redeem_client_invite(text, text, timestamptz) set schema private;
alter function public.get_client_portal(text) set schema private;
alter function public.submit_client_check_in(text, text, smallint, text) set schema private;
alter function public.revoke_client_session(text) set schema private;

revoke all on function private.redeem_client_invite(text, text, timestamptz) from public;
revoke all on function private.get_client_portal(text) from public;
revoke all on function private.submit_client_check_in(text, text, smallint, text) from public;
revoke all on function private.revoke_client_session(text) from public;
grant execute on function private.redeem_client_invite(text, text, timestamptz) to anon, authenticated;
grant execute on function private.get_client_portal(text) to anon, authenticated;
grant execute on function private.submit_client_check_in(text, text, smallint, text) to anon, authenticated;
grant execute on function private.revoke_client_session(text) to anon, authenticated;

create or replace function public.redeem_client_invite(
  p_token_hash text,
  p_session_hash text,
  p_session_expires_at timestamptz
)
returns table (client_id uuid, organization_id uuid)
language sql
security invoker
set search_path = ''
as $$
  select * from private.redeem_client_invite($1, $2, $3);
$$;

create or replace function public.get_client_portal(p_session_hash text)
returns jsonb
language sql
security invoker
set search_path = ''
as $$
  select private.get_client_portal($1);
$$;

create or replace function public.submit_client_check_in(
  p_session_hash text,
  p_status text,
  p_difficulty smallint,
  p_comment text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.submit_client_check_in($1, $2, $3, $4);
$$;

create or replace function public.revoke_client_session(p_session_hash text)
returns void
language sql
security invoker
set search_path = ''
as $$
  select private.revoke_client_session($1);
$$;

revoke all on function public.redeem_client_invite(text, text, timestamptz) from public;
revoke all on function public.get_client_portal(text) from public;
revoke all on function public.submit_client_check_in(text, text, smallint, text) from public;
revoke all on function public.revoke_client_session(text) from public;
grant execute on function public.redeem_client_invite(text, text, timestamptz) to anon, authenticated;
grant execute on function public.get_client_portal(text) to anon, authenticated;
grant execute on function public.submit_client_check_in(text, text, smallint, text) to anon, authenticated;
grant execute on function public.revoke_client_session(text) to anon, authenticated;
