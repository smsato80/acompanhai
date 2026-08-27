import { NextResponse } from 'next/server';

import { getPortalSessionHash } from '@/lib/portal/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getPortalCookieOptions, PORTAL_COOKIE } from '@/lib/portal/tokens';

export async function POST(request: Request) {
  const sessionHash = await getPortalSessionHash();
  if (sessionHash) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc('revoke_client_session', { p_session_hash: sessionHash });
  }

  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set(PORTAL_COOKIE, '', getPortalCookieOptions(0));
  return response;
}
