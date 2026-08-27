import { NextResponse } from 'next/server';

import { getPortalSessionHash } from '@/lib/portal/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const allowedStatuses = new Set(['done', 'partial', 'not_done']);

export async function POST(request: Request) {
  try {
    const sessionHash = await getPortalSessionHash();
    if (!sessionHash) {
      return NextResponse.json({ error: 'Sessão expirada.' }, { status: 401 });
    }

    const body = (await request.json()) as {
      status?: unknown;
      difficulty?: unknown;
      comment?: unknown;
    };
    const status = typeof body.status === 'string' ? body.status : '';
    const difficulty = Number(body.difficulty);
    const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

    if (
      !allowedStatuses.has(status) ||
      !Number.isInteger(difficulty) ||
      difficulty < 1 ||
      difficulty > 5 ||
      comment.length > 500
    ) {
      return NextResponse.json({ error: 'Confira as respostas e tente novamente.' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc('submit_client_check_in', {
      p_session_hash: sessionHash,
      p_status: status,
      p_difficulty: difficulty,
      p_comment: comment || null,
    });

    if (error) {
      return NextResponse.json({ error: 'Não foi possível registrar agora.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Não foi possível registrar agora.' }, { status: 400 });
  }
}
