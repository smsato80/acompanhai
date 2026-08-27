'use client';

import { useActionState } from 'react';

import { updatePasswordAction, type AuthActionState } from '@/app/login/actions';

const initialState: AuthActionState = {};

export function UpdatePasswordForm() {
  const [state, formAction, pending] = useActionState(updatePasswordAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-200">
          Nova senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        />
      </div>
      <div>
        <label htmlFor="confirmation" className="text-sm font-medium text-slate-200">
          Confirme a nova senha
        </label>
        <input
          id="confirmation"
          name="confirmation"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-mint px-4 py-3.5 text-sm font-bold text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Salvando…' : 'Salvar nova senha'}
      </button>
    </form>
  );
}
