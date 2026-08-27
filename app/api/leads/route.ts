import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

function response(body: { ok?: boolean; error?: string }, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      whatsapp?: unknown;
      consent?: unknown;
    };
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const whatsapp = typeof body.whatsapp === 'string' ? body.whatsapp.trim() : '';

    if (
      name.length < 2 ||
      name.length > 100 ||
      !email ||
      email.length > 254 ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
      whatsapp.length > 40 ||
      body.consent !== true
    ) {
      return response({ error: 'Confira os dados e autorize o contato.' }, 400);
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('interest_leads').insert({
      name,
      email,
      whatsapp: whatsapp || null,
      source: 'landing',
    });

    if (error) {
      return response({ error: 'Não foi possível registrar seu interesse agora.' }, 400);
    }

    return response({ ok: true }, 201);
  } catch {
    return response({ error: 'Não foi possível registrar seu interesse agora.' }, 400);
  }
}
