export function Hero() {
  return (
    <header className="border-b border-white/10 pb-20 pt-6 lg:pb-28">
      <nav className="flex items-center justify-between" aria-label="Navegação principal">
        <a href="#inicio" className="flex items-center gap-3" aria-label="AcompanhAí, início">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow">
            A
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Acompanh<span className="text-mint">Aí</span>
          </span>
        </a>
        <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 sm:inline-flex">
          Demonstração comercial
        </span>
      </nav>

      <section id="inicio" className="grid gap-12 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
            acompanhamento com intenção
          </p>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-7xl">
            Seu cliente não precisa se perder no caminho.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            O AcompanhAí reúne o que importa para você manter cada cliente presente, orientado e em movimento.
          </p>
          <a
            href="#quero-testar"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-ink"
          >
            Quero testar
            <span className="ml-3" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <p className="max-w-sm border-l border-lilac/40 pl-5 text-sm leading-6 text-slate-400 lg:mb-2">
          Uma demonstração para profissionais que querem transformar constância em uma experiência melhor de acompanhamento.
        </p>
      </section>
    </header>
  );
}
