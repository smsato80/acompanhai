import { formatYen } from '@/lib/format-currency';

const pillars = [
  {
    number: '01',
    title: 'Clareza para o profissional',
    description:
      'Uma visão objetiva do que precisa de atenção hoje, sem espalhar o trabalho em várias ferramentas.',
  },
  {
    number: '02',
    title: 'Presença para o cliente',
    description:
      'Um espaço simples para registrar evolução, responder check-ins e manter o próximo passo visível.',
  },
  {
    number: '03',
    title: 'Ritmo que gera retenção',
    description:
      'Pequenas interações consistentes formam uma experiência de acompanhamento mais valiosa.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_72%_12%,rgba(116,242,192,0.13),transparent_30%),radial-gradient(circle_at_15%_62%,rgba(170,155,255,0.11),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-6 sm:px-10 lg:px-14">
        <nav
          className="flex items-center justify-between border-b border-white/10 pb-6"
          aria-label="Navegação principal"
        >
          <a href="#inicio" className="flex items-center gap-3" aria-label="AcompanhAí, início">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Acompanh<span className="text-mint">Aí</span>
            </span>
          </a>
          <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-300 sm:inline-flex">
            Fundação do produto · 2026
          </span>
        </nav>

        <section
          id="inicio"
          className="grid gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28"
        >
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
              acompanhamento com intenção
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-7xl">
              O próximo passo do seu cliente{' '}
              <span className="text-mint">não precisa se perder.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              O AcompanhAí está sendo construído para profissionais que querem acompanhar melhor,
              comunicar com clareza e transformar constância em confiança.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#visao"
                className="inline-flex items-center justify-center rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-ink"
              >
                Conhecer a visão{' '}
                <span className="ml-3" aria-hidden="true">
                  →
                </span>
              </a>
              <span className="text-sm text-slate-400">
                Pensado entre Brasil e Japão · a partir de {formatYen(0)}
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-8 rounded-[3rem] bg-mint/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-panel p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Visão de hoje
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Seu ritmo está vivo.</h2>
                  </div>
                  <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-bold text-mint">
                    +12%
                  </span>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    ['24', 'clientes'],
                    ['18', 'check-ins'],
                    ['06', 'atenções'],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <p className="text-2xl font-semibold">{value}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-lilac/20 bg-lilac/5 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Consistência semanal</span>
                    <span className="text-lilac">78%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[78%] rounded-full bg-lilac" />
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    3 clientes aguardam uma mensagem sua.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="visao"
          className="border-t border-white/10 py-20 lg:py-24"
          aria-labelledby="visao-title"
        >
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">
                Uma base para crescer
              </p>
              <h2
                id="visao-title"
                className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
              >
                Menos ruído. Mais presença no acompanhamento.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              A primeira versão será pequena de propósito: uma experiência nítida para validar o que
              realmente ajuda.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-mint/30 hover:bg-white/[0.06]"
              >
                <span className="text-sm font-bold text-mint">{pillar.number}</span>
                <h3 className="mt-12 text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-400">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AcompanhAí. Uma ideia em construção.</p>
          <p>Feito com cuidado entre Brasil e Japão.</p>
        </footer>
      </div>
    </main>
  );
}
