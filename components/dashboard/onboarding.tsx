type OnboardingProps = {
  clientsCount: number;
  plansCount: number;
  checkInsCount: number;
};

type StepIconProps = {
  complete: boolean;
  number: number;
};

function StepIcon({ complete, number }: StepIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl border text-sm font-bold ${
        complete
          ? 'border-mint/30 bg-mint/10 text-mint'
          : 'border-white/10 bg-white/[0.04] text-slate-400'
      }`}
    >
      {complete ? (
        <svg viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
          <path d="m5 10 3.2 3.2L15 6.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        String(number).padStart(2, '0')
      )}
    </span>
  );
}

export default function Onboarding({
  clientsCount,
  plansCount,
  checkInsCount,
}: OnboardingProps) {
  const steps = [
    {
      title: 'Cadastre seu primeiro cliente',
      description:
        clientsCount > 0
          ? `${clientsCount} ${clientsCount === 1 ? 'cliente cadastrado' : 'clientes cadastrados'}.`
          : 'Comece reunindo aqui as pessoas que você acompanha.',
      href: '#novo-cliente',
      cta: 'Cadastrar cliente',
      complete: clientsCount > 0,
    },
    {
      title: 'Organize um plano de acompanhamento',
      description:
        plansCount > 0
          ? `${plansCount} ${plansCount === 1 ? 'plano criado' : 'planos criados'}.`
          : 'Defina o próximo passo e deixe o combinado visível para o cliente.',
      href: '#novo-plano',
      cta: 'Criar plano',
      complete: plansCount > 0,
    },
    {
      title: 'Registre o primeiro check-in',
      description:
        checkInsCount > 0
          ? `${checkInsCount} ${checkInsCount === 1 ? 'check-in registrado' : 'check-ins registrados'}.`
          : 'Acompanhe como foi e saiba quem precisa da sua atenção.',
      href: '#novo-checkin',
      cta: 'Registrar check-in',
      complete: checkInsCount > 0,
    },
  ];

  const completedSteps = steps.filter((step) => step.complete).length;
  const nextStepIndex = steps.findIndex((step) => !step.complete);
  const allComplete = completedSteps === steps.length;

  return (
    <section
      aria-labelledby="onboarding-title"
      className="rounded-[2rem] border border-mint/20 bg-gradient-to-br from-mint/[0.09] via-panel to-panel p-6 shadow-panel sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">
            Primeiros passos
          </p>
          <h2 id="onboarding-title" className="mt-2 text-2xl font-semibold tracking-tight">
            {allComplete
              ? 'Seu acompanhamento já está em movimento.'
              : 'Vamos deixar seu espaço pronto.'}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            {allComplete
              ? 'Continue usando os check-ins para manter cada cliente próximo e saber onde agir.'
              : 'Siga estas três etapas para começar a acompanhar seus clientes com clareza.'}
          </p>
        </div>
        <div className="shrink-0 sm:text-right">
          <p className="text-2xl font-semibold tracking-tight text-white">
            {completedSteps}<span className="text-slate-500">/{steps.length}</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">etapas concluídas</p>
        </div>
      </div>

      <div
        className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
        role="progressbar"
        aria-label="Progresso da configuração do acompanhamento"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={completedSteps}
      >
        <div
          className="h-full rounded-full bg-mint transition-[width] duration-500"
          style={{ width: `${(completedSteps / steps.length) * 100}%` }}
        />
      </div>

      <ol className="mt-6 grid gap-3 lg:grid-cols-3" aria-label="Etapas para começar">
        {steps.map((step, index) => {
          const isNext = index === nextStepIndex;

          return (
            <li
              key={step.title}
              aria-current={isNext ? 'step' : undefined}
              className={`flex min-h-[170px] flex-col rounded-2xl border p-4 transition ${
                isNext
                  ? 'border-mint/30 bg-mint/[0.06]'
                  : 'border-white/10 bg-white/[0.025]'
              }`}
            >
              <div className="flex items-start gap-3">
                <StepIcon complete={step.complete} number={index + 1} />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Etapa {index + 1}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-100">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 flex-1 text-xs leading-5 text-slate-400">{step.description}</p>
              {step.complete ? (
                <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-mint">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                    <path d="m5 10 3.2 3.2L15 6.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Concluído
                </p>
              ) : (
                <a
                  href={step.href}
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-2 text-xs font-bold text-mint transition hover:bg-mint hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
                >
                  {step.cta}
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8">
                    <path d="M3 8h9M8 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </li>
          );
        })}
      </ol>

      {!allComplete && (
        <p className="mt-5 text-xs text-slate-500" role="status" aria-live="polite">
          A próxima etapa está destacada. Você pode voltar a ela quando estiver pronto.
        </p>
      )}
    </section>
  );
}
