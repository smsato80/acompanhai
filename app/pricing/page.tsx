import Link from 'next/link';

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-mint"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_72%_12%,rgba(116,242,192,0.13),transparent_30%),radial-gradient(circle_at_15%_62%,rgba(170,155,255,0.11),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="AcompanhAí, início">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Acompanh<span className="text-mint">Aí</span>
            </span>
          </Link>
          <Link className="text-sm text-slate-400 transition hover:text-mint" href="/">
            Voltar ao início
          </Link>
        </header>

        <section className="py-20 text-center lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Planos simples</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Mais clareza para acompanhar. Mais valor para o seu cliente.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            O AcompanhAí é feito para personal trainers e profissionais que querem organizar sua
            carteira e manter o acompanhamento vivo entre as sessões.
          </p>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 text-left md:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-panel">
              <p className="text-sm font-semibold text-slate-300">Essencial</p>
              <p className="mt-5 text-4xl font-semibold tracking-tight">
                ¥980<span className="ml-2 text-sm font-normal text-slate-500">/mês</span>
              </p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                Para quem quer começar a acompanhar seus primeiros clientes com consistência.
              </p>
              <ul className="mt-7 space-y-4 border-t border-white/10 pt-6 text-sm text-slate-300">
                <li className="flex gap-3"><CheckIcon /> Clientes e planos organizados</li>
                <li className="flex gap-3"><CheckIcon /> Check-ins entre sessões</li>
                <li className="flex gap-3"><CheckIcon /> Visão de atenção da carteira</li>
              </ul>
              <a href="/login" className="mt-8 flex items-center justify-center rounded-full border border-mint/30 px-5 py-3 text-sm font-bold text-mint transition hover:bg-mint hover:text-ink">
                Começar agora
              </a>
            </article>

            <article className="relative rounded-3xl border border-mint/35 bg-mint/[0.07] p-7 shadow-[0_24px_80px_rgba(119,245,197,0.12)]">
              <span className="absolute right-6 top-6 rounded-full bg-mint px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                Mais completo
              </span>
              <p className="text-sm font-semibold text-slate-200">Profissional</p>
              <p className="mt-5 text-4xl font-semibold tracking-tight">
                ¥1.980<span className="ml-2 text-sm font-normal text-slate-400">/mês</span>
              </p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">
                Para profissionais que já têm uma carteira ativa e querem elevar a experiência.
              </p>
              <ul className="mt-7 space-y-4 border-t border-white/10 pt-6 text-sm text-slate-200">
                <li className="flex gap-3"><CheckIcon /> Tudo do plano Essencial</li>
                <li className="flex gap-3"><CheckIcon /> Acompanhamento de evolução</li>
                <li className="flex gap-3"><CheckIcon /> Prioridade para novos recursos</li>
              </ul>
              <a href="/login" className="mt-8 flex items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-bold text-ink transition hover:bg-white">
                Quero testar
              </a>
            </article>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-xs leading-5 text-slate-500">
            A contratação é combinada diretamente nesta fase inicial. Nenhuma cobrança é feita nesta
            página.
          </p>
        </section>

        <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
          Desenvolvido por SatoTech · Soluções Inteligentes
        </footer>
      </div>
    </main>
  );
}
