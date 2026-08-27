'use client';

import { useActionState, useState } from 'react';

import { authenticate, requestPasswordReset, type AuthActionState } from './actions';

const initialState: AuthActionState = {};

export function LoginForm() {
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [state, formAction, pending] = useActionState(authenticate, initialState);
  const [recoveryState, recoveryAction, recoveryPending] = useActionState(
    requestPasswordReset,
    initialState,
  );

  if (recoveryMode) {
    return (
      <form action={recoveryAction} className="mt-8 space-y-5">
        <div>
          <label htmlFor="recovery-email" className="text-sm font-medium text-slate-200">
            E-mail da conta
          </label>
          <input
            id="recovery-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@exemplo.com"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
          />
        </div>

        {recoveryState.error ? (
          <p
            role="alert"
            className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
          >
            {recoveryState.error}
          </p>
        ) : null}
        {recoveryState.message ? (
          <p
            role="status"
            className="rounded-2xl border border-mint/20 bg-mint/10 px-4 py-3 text-sm text-mint"
          >
            {recoveryState.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={recoveryPending}
          className="w-full rounded-2xl bg-mint px-4 py-3.5 text-sm font-bold text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
        >
          {recoveryPending ? 'Enviando…' : 'Enviar instruções'}
        </button>
        <button
          type="button"
          onClick={() => setRecoveryMode(false)}
          className="w-full rounded-2xl border border-white/10 px-4 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-white/25 hover:text-white"
        >
          Voltar para entrar
        </button>
      </form>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-slate-200">
          Seu nome
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Ex.: Marcelo Sato"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        />
        <p className="mt-2 text-xs text-slate-500">Obrigatório somente ao criar uma conta.</p>
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="voce@exemplo.com"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password" className="text-sm font-medium text-slate-200">
            Senha
          </label>
          <span className="text-xs text-slate-500">mínimo de 6 caracteres</span>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-mint/60 focus:ring-2 focus:ring-mint/20"
        />
      </div>
      <button
        type="button"
        onClick={() => setRecoveryMode(true)}
        className="text-xs font-semibold text-mint transition hover:text-white"
      >
        Esqueci minha senha
      </button>

      {state.error ? (
        <p
          role="alert"
          className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
        >
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p
          role="status"
          className="rounded-2xl border border-mint/20 bg-mint/10 px-4 py-3 text-sm text-mint"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          name="intent"
          value="login"
          disabled={pending}
          className="rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-sm font-semibold text-white transition hover:border-mint/40 hover:bg-white/[0.1] disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? 'Aguarde…' : 'Entrar'}
        </button>
        <button
          type="submit"
          name="intent"
          value="signup"
          disabled={pending}
          className="rounded-2xl bg-mint px-4 py-3.5 text-sm font-bold text-ink transition hover:bg-white disabled:cursor-wait disabled:opacity-60"
        >
          Criar minha conta
        </button>
      </div>
    </form>
  );
}
