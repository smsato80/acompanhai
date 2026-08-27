import { NextResponse } from 'next/server';

import { createPortalToken, hashPortalToken } from '@/lib/portal/tokens';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { clientId?: unknown };
    const clientId = typeof body.clientId === 'string' ? body.clientId : '';

    if (!clientId) {
      return NextResponse.json({ error: 'Cliente inválido.' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      return NextResponse.json({ error: 'Sessão expirada.' }, { status: 401 });
    }

    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id, role')
      .eq('user_id', userData.user.id)
      .eq('role', 'owner')
      .limit(1)
      .maybeSingle();

    if (!membership) {
      return NextResponse.json({ error: 'Espaço não encontrado.' }, { status: 403 });
    }

    const { data: client } = await supabase
      .from('clients')
      .select('id, display_name')
      .eq('id', clientId)
      .eq('organization_id', membership.organization_id)
      .eq('status', 'active')
      .maybeSingle();

    if (!client) {
      return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 });
    }

    await supabase
      .from('client_invites')
      .update({ revoked_at: new Date().toISOString() })
      .eq('organization_id', membership.organization_id)
      .eq('client_id', client.id)
      .is('redeemed_at', null)
      .is('revoked_at', null);

    const rawToken = createPortalToken();
    const { error } = await supabase.from('client_invites').insert({
      organization_id: membership.organization_id,
      client_id: client.id,
      token_hash: hashPortalToken(rawToken),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: 'Não foi possível gerar o convite.' }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const link = `${origin}/portal/${rawToken}`;
    const message = `Oi, ${client.display_name}! Seu acompanhamento está aqui: ${link}`;

    return NextResponse.json({ link, message, expiresInDays: 7 });
  } catch {
    return NextResponse.json({ error: 'Não foi possível gerar o convite.' }, { status: 400 });
  }
}
