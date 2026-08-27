'use client';

import { useState } from 'react';

type CheckInFormProps = {
  existingStatus?: 'done' | 'partial' | 'not_done';
};

const options = [
  { value: 'done', label: 'Concluí', description: 'Fiz o combinado.' },
  { value: 'partial', label: 'Fiz em parte', description: 'Consegui avançar um pouco.' },
  { value: 'not_done', label: 'Não consegui', description: 'Preciso de ajuda para retomar.' },
] as const;

export function CheckInForm({ existingStatus }: CheckInFormProps) {
  const [status, setStatus] = useState<CheckInFormProps['existingStatus']>(existingStatus);
  const [difficulty, setDifficulty] = useState(3);
  const [comment, setComment] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function submit() {
    if (!status) {
      setErrorMessage('Escolha como foi seu acompanhamento.');
      setState('error');
      return;
    }

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/portal/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, difficulty, comment }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(payload.error ?? 'Não foi possível registrar agora.');
        setState('error');
        return;
      }

      setState('success');
    } catch {
      setErrorMessage('Confira sua conexão e tente novamente.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="rounded-3xl border border-mint/20 bg-mint/10 p-6">
        <p className="text-sm font-semibold text-mint">Check-in enviado.</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Seu profissional já pode acompanhar como foi esta semana. Obrigado por manter o ritmo.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Seu retorno</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Como foi esta semana?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Leva menos de um minuto e ajuda seu profissional a ajustar o próximo passo.
        </p>
      </div>

      <div className="mt-6 grid gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStatus(option.value)}
            aria-pressed={status === option.value}
            className={`rounded-2xl border px-4 py-3 text-left transition ${status === option.value ? 'border-mint/60 bg-mint/10' : 'border-white/10 bg-white/[0.025] hover:border-white/25'}`}
          >
            <span className="block text-sm font-semibold text-white">{option.label}</span>
            <span className="mt-1 block text-xs text-slate-500">{option.description}</span>
          </button>
        ))}
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-slate-200">Qual foi a dificuldade?</legend>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setDifficulty(value)}
              aria-label={`Dificuldade ${value} de 5`}
              aria-pressed={difficulty === value}
              className={`rounded-xl border py-2.5 text-sm font-semibold transition ${difficulty === value ? 'border-lilac/60 bg-lilac/15 text-lilac' : 'border-white/10 text-slate-500 hover:border-white/25'}`}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block text-sm font-semibold text-slate-200" htmlFor="portal-comment">
        Quer contar mais? <span className="font-normal text-slate-500">(opcional)</span>
      </label>
      <textarea
        id="portal-comment"
        value={comment}
        onChange={(event) => setComment(event.target.value.slice(0, 500))}
        rows={3}
        maxLength={500}
        placeholder="Ex.: senti dificuldade no segundo dia..."
        className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-mint/50"
      />
      <p className="mt-2 text-right text-[11px] text-slate-600">{comment.length}/500</p>

      {state === 'error' ? (
        <p role="alert" className="mt-4 rounded-2xl bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="button"
        onClick={submit}
        disabled={state === 'loading'}
        className="mt-5 w-full rounded-2xl bg-mint px-4 py-3.5 text-sm font-bold text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
      >
        {state === 'loading' ? 'Enviando…' : 'Enviar meu check-in'}
      </button>
    </div>
  );
}
