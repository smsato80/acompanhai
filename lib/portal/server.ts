import { cookies } from 'next/headers';

import { createSupabaseServerClient } from '@/lib/supabase/server';

import { hashPortalToken, PORTAL_COOKIE } from './tokens';

export async function getPortalSessionHash(): Promise<string | null> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(PORTAL_COOKIE)?.value;

  return rawToken ? hashPortalToken(rawToken) : null;
}

export async function getPortalPayload() {
  const sessionHash = await getPortalSessionHash();
  if (!sessionHash) return { data: null, error: new Error('portal session missing') };

  const supabase = await createSupabaseServerClient();
  return supabase.rpc('get_client_portal', { p_session_hash: sessionHash });
}
