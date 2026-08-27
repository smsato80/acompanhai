const clients = [
  { initials: 'MS', name: 'Marina Sato', detail: 'Check-in atrasado', tone: 'lilac' },
  { initials: 'RO', name: 'Rafael Oliveira', detail: 'Plano em andamento', tone: 'mint' },
  { initials: 'BL', name: 'Bianca Lima', detail: 'Respondeu hoje', tone: 'amber' },
];

const weekBars = [42, 58, 48, 67, 55, 82, 72];

function DashboardIcon({ type }: { type: 'grid' | 'users' | 'clipboard' | 'pulse' | 'bell' }) {
  const props = {
    'aria-hidden': true,
    className: 'h-4 w-4 shrink-0',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (type === 'grid') {
    return (
      <svg {...props}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (type === 'users') {
    return (
      <svg {...props}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-1.5A3.5 3.5 0 0 1 7 15h4a3.5 3.5 0 0 1 3.5 3.5V20M16 5.5a3 3 0 0 1 0 5.5M18 15a3.5 3.5 0 0 1 2.5 3.5V20" />
      </svg>
    );
  }

  if (type === 'clipboard') {
    return (
      <svg {...props}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h5" />
      </svg>
    );
  }

  if (type === 'pulse') {
    return (
      <svg {...props}>
        <path d="M3 12h3l2-5 4 10 2-5h7" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </svg>
  );
}

export function DashboardMockup() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="demonstracao-title">
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Por dentro do AcompanhAí
          </p>
          <h2 id="demonstracao-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Do plano do cliente à próxima ação do profissional.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Uma visão prática para saber quem está em dia, quem enviou check-in e quem precisa de
            atenção antes do próximo encontro.
          </p>
        </div>
        <span className="w-fit rounded-full border border-mint/20 bg-mint/5 px-3 py-1.5 text-xs font-medium text-mint">
          Dados fictícios · demonstração
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="absolute -inset-8 rounded-[3rem] bg-mint/10 blur-3xl" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#10161b] p-2 shadow-panel sm:p-3">
          <div className="flex min-h-[33rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1015]">
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
                  <DashboardIcon type="grid" />
                  Visão geral
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                  <DashboardIcon type="users" />
                  Clientes
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                  <DashboardIcon type="clipboard" />
                  Planos
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-500">
                  <DashboardIcon type="pulse" />
                  Check-ins
                </div>
              </div>
              <div className="mt-24 rounded-2xl border border-lilac/15 bg-lilac/5 p-3">
                <div className="flex items-center gap-2 text-lilac">
                  <DashboardIcon type="bell" />
                  <p className="text-[10px] font-semibold">Seu foco hoje</p>
                </div>
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
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Bom dia, Christian.
                  </h3>
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
                  ['78%', 'Planos em andamento', '+12% vs. anterior'],
                  ['06', 'Pedem atenção', '3 urgentes'],
                ].map(([value, label, note]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
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
                        O próximo contato sugerido para cada cliente.
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
                          <p className="truncate text-xs font-semibold text-slate-200">{client.name}</p>
                          <p className="mt-1 truncate text-[10px] text-slate-500">{client.detail}</p>
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
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">Plano da Marina</h3>
                      <p className="mt-1 text-[10px] text-slate-500">Semana 04 · força e mobilidade</p>
                    </div>
                    <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[10px] font-bold text-mint">
                      4 de 5
                    </span>
                  </div>
                  <div className="mt-5 space-y-2.5 text-xs">
                    {['Treino A concluído', 'Alongamento enviado', 'Check-in da semana'].map((item, index) => (
                      <div key={item} className="flex items-center gap-2.5 text-slate-300">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-full ${index < 2 ? 'bg-mint text-ink' : 'border border-amber-200/30 text-amber-200'}`}
                        >
                          {index < 2 ? '✓' : '·'}
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Evolução da semana</span>
                      <span className="font-bold text-mint">78%</span>
                    </div>
                    <div className="mt-3 flex h-12 items-end gap-1.5" aria-label="Gráfico fictício de evolução semanal">
                      {weekBars.map((height, index) => (
                        <span
                          key={index}
                          className={`w-full rounded-t-md ${index === 5 ? 'bg-mint shadow-[0_0_16px_rgba(119,245,197,0.35)]' : 'bg-mint/20'}`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
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
