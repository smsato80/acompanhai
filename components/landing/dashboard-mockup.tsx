const clients = [
  { initials: 'MS', name: 'Marina Sato', detail: 'Check-in atrasado', tone: 'lilac' },
  { initials: 'RO', name: 'Rafael Oliveira', detail: 'Respondeu hoje', tone: 'mint' },
  { initials: 'BL', name: 'Bianca Lima', detail: 'Plano termina sexta', tone: 'amber' },
];

const weekBars = [42, 58, 48, 67, 55, 82, 72];

export function DashboardMockup() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="demonstracao-title">
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Por dentro do AcompanhAí
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Um painel para o profissional enxergar o que está acontecendo com cada cliente antes do
            próximo encontro.
          </p>
        </div>
        <span className="w-fit rounded-full border border-mint/20 bg-mint/5 px-3 py-1.5 text-xs font-medium text-mint">
          Dados fictícios · demonstração
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="absolute -inset-8 rounded-[3rem] bg-mint/10 blur-3xl" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#10161b] p-2 shadow-panel sm:p-3">
          <div className="flex min-h-[31rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1015]">
            <aside className="hidden w-52 shrink-0 border-r border-white/10 bg-white/[0.025] p-5 md:block">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-sm font-black text-ink">
                  A
                </span>
                <span className="text-sm font-semibold">
                  Acompanh<span className="text-mint">Aí</span>
                </span>
              </div>
              <div className="mt-10 space-y-2 text-xs">
                <div className="flex items-center gap-3 rounded-xl bg-mint/10 px-3 py-2.5 font-semibold text-mint">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  Visão geral
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  Clientes
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  Planos
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  Check-ins
                </div>
              </div>
              <div className="mt-24 rounded-2xl border border-lilac/15 bg-lilac/5 p-3">
                <p className="text-[10px] font-semibold text-lilac">Seu foco hoje</p>
                <p className="mt-2 text-[10px] leading-4 text-slate-400">
                  3 clientes aguardam uma mensagem.
                </p>
              </div>
            </aside>

            <div className="min-w-0 flex-1 p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Visão geral · terça-feira
                  </p>
                  <h2
                    id="demonstracao-title"
                    className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
                  >
                    Bom dia, Christian.
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Aqui está o que merece sua atenção hoje.
                  </p>
                </div>
                <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Painel do profissional
                </span>
              </div>

              <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ['24', 'Clientes ativos', '+3 este mês'],
                  ['18', 'Check-ins recebidos', '75% da carteira'],
                  ['78%', 'Ritmo semanal', '+12% vs. anterior'],
                  ['06', 'Pedem atenção', '3 urgentes'],
                ].map(([value, label, note]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                  >
                    <dt className="text-[11px] text-slate-500">{label}</dt>
                    <dd className="mt-3 text-2xl font-semibold tracking-tight text-white">
                      {value}
                    </dd>
                    <p className="mt-2 text-[10px] text-mint/80">{note}</p>
                  </div>
                ))}
              </dl>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">Atenção para hoje</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Próximos contatos sugeridos pelo seu acompanhamento.
                      </p>
                    </div>
                    <span className="rounded-full bg-lilac/10 px-2.5 py-1 text-[10px] font-bold text-lilac">
                      3 pendentes
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {clients.map((client) => (
                      <div
                        key={client.name}
                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[10px] font-bold ${client.tone === 'mint' ? 'bg-mint/10 text-mint' : client.tone === 'lilac' ? 'bg-lilac/10 text-lilac' : 'bg-amber-300/10 text-amber-200'}`}
                        >
                          {client.initials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-slate-200">
                            {client.name}
                          </p>
                          <p className="mt-1 truncate text-[10px] text-slate-500">
                            {client.detail}
                          </p>
                        </div>
                        <span className="text-slate-600" aria-hidden="true">
                          →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-mint/15 bg-mint/[0.04] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-200">Ritmo da semana</h3>
                    <span className="text-sm font-bold text-mint">78%</span>
                  </div>
                  <div
                    className="mt-7 flex h-28 items-end gap-2"
                    aria-label="Gráfico fictício de evolução semanal"
                  >
                    {weekBars.map((height, index) => (
                      <span
                        key={index}
                        className={`w-full rounded-t-md transition ${index === 5 ? 'bg-mint shadow-[0_0_16px_rgba(119,245,197,0.35)]' : 'bg-mint/20'}`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                    <span>seg</span>
                    <span>dom</span>
                  </div>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-xs leading-5 text-slate-400">
                      A consistência está subindo. O próximo passo é falar com quem ficou para trás.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
