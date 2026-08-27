'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export function InterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          whatsapp: formData.get('whatsapp'),
          consent: formData.get('consent') === 'on',
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || 'Não foi possível registrar seu interesse agora.');
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível registrar seu interesse agora.',
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      id="quero-testar"
      className="border-t border-white/10 py-20 lg:py-28"
      aria-labelledby="quero-testar-title"
    >
      <div className="relative grid gap-10 overflow-hidden rounded-[2rem] border border-mint/20 bg-mint/[0.06] p-7 shadow-glow sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-mint/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">
            Acesso à demonstração
          </p>
          <h2
            id="quero-testar-title"
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            Quer ver se o AcompanhAí combina com a sua rotina?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Deixe seus dados para manifestar interesse na demonstração inicial do produto.
          </p>
        </div>
        {submitted ? (
          <div
            className="relative rounded-2xl border border-mint/30 bg-ink/60 p-6 shadow-panel"
            role="status"
          >
            <h3 className="text-xl font-semibold text-mint">Recebemos seu interesse.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Obrigado por querer testar o AcompanhAí. A SatoTech recebeu seus dados e poderá entrar
              em contato sobre a demonstração inicial.
            </p>
          </div>
        ) : (
          <form className="relative grid gap-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-ink/70 px-4 py-3 text-white shadow-inner shadow-black/20 transition placeholder:text-slate-500 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
                placeholder="Seu nome"
              />
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
                className="mt-2 w-full rounded-xl border border-white/15 bg-ink/70 px-4 py-3 text-white shadow-inner shadow-black/20 transition placeholder:text-slate-500 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
                placeholder="voce@exemplo.com"
              />
            </div>
            <div>
              <label htmlFor="whatsapp" className="text-sm font-medium text-slate-200">
                WhatsApp <span className="text-slate-500">(opcional)</span>
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                className="mt-2 w-full rounded-xl border border-white/15 bg-ink/70 px-4 py-3 text-white shadow-inner shadow-black/20 transition placeholder:text-slate-500 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
                placeholder="(00) 00000-0000"
              />
            </div>
            <label className="flex items-start gap-3 text-xs leading-5 text-slate-400">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-mint"
              />
              <span>
                Concordo em receber contato sobre o AcompanhAí. Li a{' '}
                <Link href="/privacy" className="font-semibold text-mint hover:text-white">
                  Política de privacidade
                </Link>
                .
              </span>
            </label>
            {error ? (
              <p
                role="alert"
                className="rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
              >
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-ink shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-mint focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? 'Enviando…' : 'Quero testar'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
