export function Hero() {
  return (
    <header className="border-b border-white/10 pb-20 pt-6 lg:pb-28">
      <nav className="flex items-center justify-between" aria-label="Navegação principal">
        <a href="#inicio" className="flex items-center gap-3" aria-label="AcompanhAí, início">
          <span
            className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow"
            aria-hidden="true"
          >
            A
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Acompanh<span className="text-mint">Aí</span>
          </span>
        </a>
        <span className="hidden rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-xs font-medium text-slate-300 sm:inline-flex">
          Demonstração comercial
        </span>
      </nav>

      <section
        id="inicio"
        className="grid gap-12 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pt-28"
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            <span
              className="h-2 w-2 rounded-full bg-mint shadow-[0_0_14px_rgba(119,245,197,0.9)]"
              aria-hidden="true"
            />
            acompanhamento com intenção
          </p>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-balance sm:text-7xl lg:text-[5.5rem]">
            Seu cliente não precisa se perder no caminho.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            O AcompanhAí reúne o que importa para você manter cada cliente presente, orientado e em
            movimento.
          </p>
          <a
            href="#quero-testar"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-ink shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_48px_rgba(119,245,197,0.22)] focus-visible:outline-none"
          >
            Quero testar
            <span className="ml-3" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        <p className="max-w-sm border-l border-lilac/50 pl-5 text-sm leading-6 text-slate-400 lg:mb-4">
          Uma demonstração para profissionais que querem transformar constância em uma experiência
          melhor de acompanhamento.
        </p>
      </section>
    </header>
  );
}
