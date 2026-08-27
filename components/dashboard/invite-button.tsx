'use client';

import { useState } from 'react';

export function InviteButton({ clientId, clientName }: { clientId: string; clientName: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  async function createInvite() {
    setState('loading');
    try {
      const response = await fetch('/api/portal/invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      });
      const payload = (await response.json()) as { link?: string; message?: string };

      if (!response.ok || !payload.link) {
        setState('error');
        return;
      }

      setLink(payload.link);
      setMessage(payload.message ?? '');
      setState('ready');
    } catch {
      setState('error');
    }
  }

  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
  }

  if (state === 'ready') {
    return (
      <div className="mt-3 rounded-2xl border border-mint/20 bg-mint/5 p-3">
        <p className="text-xs font-semibold text-mint">Convite pronto para {clientName}</p>
        <p className="mt-2 break-all text-[11px] leading-5 text-slate-400">{link}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => copy(link)}
            className="rounded-full bg-mint px-3 py-1.5 text-[11px] font-bold text-ink"
          >
            Copiar link
          </button>
          <button
            type="button"
            onClick={() => copy(message)}
            className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-slate-300"
          >
            Copiar mensagem
          </button>
        </div>
        <p className="mt-2 text-[10px] text-slate-600">Válido por 7 dias e de uso único.</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={createInvite}
        disabled={state === 'loading'}
        className="rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-[11px] font-semibold text-mint transition hover:bg-mint hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {state === 'loading' ? 'Gerando…' : 'Gerar link do cliente'}
      </button>
      {state === 'error' ? (
        <p role="alert" className="mt-2 text-[11px] text-rose-200">
          Não foi possível gerar agora. Tente novamente.
        </p>
      ) : null}
    </div>
  );
}
