function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
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
        <div className="flex items-center gap-3">
          <a
            href="/pricing"
            className="hidden text-sm text-slate-400 transition hover:text-white sm:inline-flex"
          >
            Planos
          </a>
          <a
            href="/login"
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-mint/40 hover:text-mint"
          >
            Entrar
          </a>
        </div>
      </nav>

      <section
        id="inicio"
        className="grid gap-12 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pt-28"
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            <span
              className="h-2 w-2 rounded-full bg-mint shadow-[0_0_14px_rgba(119,245,197,0.9)]"
              aria-hidden="true"
            />
            Para personal trainers e profissionais de acompanhamento
          </p>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-balance sm:text-7xl lg:text-[5.5rem]">
            Seu cliente não precisa se perder no caminho.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            O AcompanhAí reúne clientes, planos e check-ins para você acompanhar a evolução com
            clareza, mesmo entre uma sessão e outra.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-ink shadow-glow transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_48px_rgba(119,245,197,0.22)] focus-visible:outline-2 focus-visible:outline-mint focus-visible:outline-offset-4"
            >
              Quero testar
              <ArrowIcon />
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <CheckIcon />
              Comece com seus primeiros clientes
            </span>
          </div>
        </div>
        <div className="max-w-sm border-l border-lilac/50 pl-5 lg:mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">
            Acompanhamento profissional
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Para quem atende pessoas presencialmente ou à distância e quer transformar cada plano
            em uma experiência contínua, visível e fácil de seguir.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
              Personal trainers
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
              Brasil e Japão
            </span>
          </div>
        </div>
      </section>
    </header>
  );
}
