const metrics = [
  ['24', 'clientes'],
  ['18', 'check-ins'],
  ['78%', 'evolução'],
  ['06', 'atenção'],
];

export function DashboardMockup() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="demonstracao-title">
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute -inset-8 rounded-[3rem] bg-mint/10 blur-3xl" aria-hidden="true" />
        <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-3 shadow-panel backdrop-blur-xl sm:p-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-panel p-5 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
                  Demonstração
                </p>
                <h2 id="demonstracao-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Uma visão clara do seu acompanhamento.
                </h2>
              </div>
              <span className="w-fit rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-xs font-medium text-slate-400">
                Dados fictícios
              </span>
            </div>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <dt className="text-sm text-slate-400">{label}</dt>
                  <dd className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl border border-lilac/20 bg-lilac/5 p-5">
              <p className="text-sm font-medium text-lilac">Atenção para a semana</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Três clientes ainda aguardam seu próximo contato nesta demonstração.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
