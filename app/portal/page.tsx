import Link from 'next/link';

import { CheckInForm } from '@/components/portal/check-in-form';
import { getPortalPayload } from '@/lib/portal/server';
import { normalizePlanItems, type PortalPayload } from '@/lib/portal/types';

export const dynamic = 'force-dynamic';

export default async function ClientPortalPage() {
  const { data } = await getPortalPayload();
  const payload = data as PortalPayload | null;

  if (!payload?.client?.name) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-6 py-10 text-white">
        <section className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-panel p-8 text-center shadow-panel sm:p-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-xl font-black text-ink shadow-glow">
            A
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Link do AcompanhAí
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Este link não está disponível.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Ele pode ter expirado, já ter sido usado ou ter sido revogado pelo seu profissional.
            Peça um novo link para continuar seu acompanhamento.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-mint/50 hover:text-white"
          >
            Conhecer o AcompanhAí
          </Link>
        </section>
      </main>
    );
  }

  const planItems = normalizePlanItems(payload.plan?.content);

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_82%_8%,rgba(119,245,197,0.12),transparent_25%),radial-gradient(circle_at_12%_55%,rgba(181,165,255,0.1),transparent_26%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-5 py-6 sm:px-8 sm:py-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="AcompanhAí, início">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Acompanh<span className="text-mint">Aí</span>
            </span>
          </Link>
          <form action="/api/portal/logout" method="post">
            <button className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-white/25 hover:text-white">
              Sair
            </button>
          </form>
        </header>

        <section className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Seu acompanhamento
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Olá, {payload.client.name}.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
            {payload.professional.name} deixou este espaço para você acompanhar o próximo passo com
            clareza.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-white/10 bg-panel p-6 shadow-panel sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">
                  Plano da semana
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {payload.plan?.name ?? 'Seu próximo passo'}
                </h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold text-slate-400">
                {payload.plan ? `v${payload.plan.version}` : 'Aguardando'}
              </span>
            </div>

            {planItems.length > 0 ? (
              <ol className="mt-7 space-y-3">
                {planItems.map((item, index) => (
                  <li
                    key={`${item.title}-${index}`}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-mint/10 text-xs font-bold text-mint">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{item.instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-7 rounded-2xl border border-dashed border-white/15 p-5 text-sm leading-6 text-slate-400">
                Seu profissional ainda está preparando os itens deste plano.
              </p>
            )}
          </article>

          <div className="space-y-5">
            <CheckInForm existingStatus={payload.checkIn?.status} />
            <article className="rounded-3xl border border-lilac/15 bg-lilac/[0.06] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">
                Por que responder?
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Seu retorno mostra o que funcionou, onde ficou difícil e ajuda seu profissional a
                preparar uma orientação mais útil para você.
              </p>
            </article>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 py-8 text-xs text-slate-500">
          AcompanhAí · seu espaço de acompanhamento
        </footer>
      </div>
    </main>
  );
}
