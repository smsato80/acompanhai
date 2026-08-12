const benefits = [
  {
    number: '01',
    title: 'Organização',
    description: 'Cada cliente, plano e próximo passo em um lugar fácil de consultar.',
  },
  {
    number: '02',
    title: 'Presença',
    description: 'Mantenha o acompanhamento vivo mesmo entre uma sessão e outra.',
  },
  {
    number: '03',
    title: 'Menos ferramentas espalhadas',
    description: 'Reduza o vai e volta entre listas, mensagens e anotações soltas.',
  },
  {
    number: '04',
    title: 'Retenção',
    description: 'Uma experiência consistente ajuda o cliente a continuar avançando.',
  },
];

export function Benefits() {
  return (
    <section className="border-t border-white/10 py-20 lg:py-24" aria-labelledby="beneficios-title">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Feito para acompanhar</p>
        <h2 id="beneficios-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          Mais clareza para o seu trabalho e para o caminho de cada cliente.
        </h2>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {benefits.map((benefit) => (
          <article
            key={benefit.number}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-mint/30 hover:bg-white/[0.06]"
          >
            <span className="text-sm font-bold text-mint">{benefit.number}</span>
            <h3 className="mt-10 text-xl font-semibold">{benefit.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
