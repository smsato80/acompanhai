'use client';

import { FormEvent, useState } from 'react';

export function InterestForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="quero-testar" className="border-t border-white/10 py-20 lg:py-24" aria-labelledby="quero-testar-title">
      <div className="grid gap-10 rounded-[2rem] border border-mint/20 bg-mint/5 p-7 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Acesso à demonstração</p>
          <h2 id="quero-testar-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Quer ver se o AcompanhAí combina com a sua rotina?
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Deixe seus dados para manifestar interesse na demonstração inicial do produto.
          </p>
        </div>
        {submitted ? (
          <div className="rounded-2xl border border-mint/30 bg-ink/40 p-6" role="status">
            <h3 className="text-xl font-semibold text-mint">Recebemos seu interesse.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Obrigado por querer testar o AcompanhAí. Esta é uma demonstração local e nenhum dado foi enviado.
            </p>
          </div>
        ) : (
          <form className="grid gap-5" onSubmit={handleSubmit}>
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
                className="mt-2 w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-mint focus:ring-2 focus:ring-mint/30"
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
                className="mt-2 w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-mint focus:ring-2 focus:ring-mint/30"
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
                className="mt-2 w-full rounded-xl border border-white/15 bg-ink/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-mint focus:ring-2 focus:ring-mint/30"
                placeholder="(00) 00000-0000"
              />
            </div>
            <button
              type="submit"
              className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-ink"
            >
              Quero testar
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
