const benefits = [
  {
    number: '01',
    icon: 'users',
    eyebrow: 'Sua carteira',
    title: 'Clientes no radar',
    description: 'Veja quem está avançando, quem respondeu e quem precisa de um contato seu.',
  },
  {
    number: '02',
    icon: 'clipboard',
    eyebrow: 'Seu método',
    title: 'Planos que continuam',
    description: 'Compartilhe o próximo passo do cliente sem depender de planilhas ou mensagens soltas.',
  },
  {
    number: '03',
    icon: 'pulse',
    eyebrow: 'Entre sessões',
    title: 'Check-ins simples',
    description: 'Receba a percepção do cliente e identifique cedo quando algo saiu do ritmo.',
  },
  {
    number: '04',
    icon: 'trend',
    eyebrow: 'Mais valor percebido',
    title: 'Acompanhamento que retém',
    description: 'Uma experiência consistente deixa seu trabalho visível durante toda a jornada.',
  },
];

type BenefitIconName = 'users' | 'clipboard' | 'pulse' | 'trend';

function BenefitIcon({ name }: { name: BenefitIconName }) {
  const props = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (name === 'users') {
    return (
      <svg {...props}>
        <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
        <circle cx="10" cy="8" r="3" />
        <path d="M17 11a3 3 0 1 0-1.2-5.75M20 20v-1.5a3.5 3.5 0 0 0-2.8-3.43" />
      </svg>
    );
  }

  if (name === 'clipboard') {
    return (
      <svg {...props}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h5" />
      </svg>
    );
  }

  if (name === 'pulse') {
    return (
      <svg {...props}>
        <path d="M3 12h3l2-5 4 10 2-5h7" />
        <path d="M12 21a9 9 0 1 1 8.3-5.5" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M4 18V6M4 18h16" />
      <path d="m7 14 3-3 2 2 5-6 3 2" />
      <path d="M17 7h3v3" />
    </svg>
  );
}

export function Benefits() {
  return (
    <section className="border-t border-white/10 py-20 lg:py-28" aria-labelledby="beneficios-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">
          Feito para acompanhar
        </p>
        <h2
          id="beneficios-title"
          className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          Uma central simples para o profissional e um próximo passo claro para cada cliente.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
          O AcompanhAí foi pensado primeiro para personal trainers brasileiros que atendem no Japão,
          presencialmente ou à distância, e querem transformar acompanhamento em uma experiência
          profissional.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {benefits.map((benefit) => (
          <article
            key={benefit.number}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-mint/35 hover:bg-white/[0.06]"
          >
            <span
              className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-mint/[0.035] transition group-hover:bg-mint/[0.08]"
              aria-hidden="true"
            />
            <div className="relative flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-mint/20 bg-mint/10 text-mint shadow-glow">
                <BenefitIcon name={benefit.icon as BenefitIconName} />
              </div>
              <span className="pt-1 text-xs font-bold tracking-[0.18em] text-slate-500">
                {benefit.number}
              </span>
            </div>
            <p className="relative mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-mint/80">
              {benefit.eyebrow}
            </p>
            <h3 className="relative mt-2 text-xl font-semibold">{benefit.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
