import { NextRequest, NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import {
  createPortalToken,
  getPortalCookieOptions,
  hashPortalToken,
  PORTAL_COOKIE,
  PORTAL_SESSION_MAX_AGE,
} from '@/lib/portal/tokens';

function isCandidateToken(token: string) {
  return token.length >= 30 && token.length <= 80 && /^[A-Za-z0-9_-]+$/.test(token);
}

export async function GET(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;

  if (!token || !isCandidateToken(token)) {
    return NextResponse.redirect(new URL('/portal?status=invalid', request.url));
  }

  return NextResponse.redirect(
    new URL(`/portal/confirm?token=${encodeURIComponent(token)}`, request.url),
  );
}

export async function POST(request: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;

  if (!token || !isCandidateToken(token)) {
    return NextResponse.redirect(new URL('/portal?status=invalid', request.url));
  }

  const sessionToken = createPortalToken();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc('redeem_client_invite', {
    p_token_hash: hashPortalToken(token),
    p_session_hash: hashPortalToken(sessionToken),
    p_session_expires_at: new Date(Date.now() + PORTAL_SESSION_MAX_AGE * 1000).toISOString(),
  });

  if (error || !Array.isArray(data) || data.length === 0) {
    return NextResponse.redirect(new URL('/portal?status=invalid', request.url));
  }

  const response = NextResponse.redirect(new URL('/portal', request.url));
  response.cookies.set(PORTAL_COOKIE, sessionToken, getPortalCookieOptions());
  return response;
}
