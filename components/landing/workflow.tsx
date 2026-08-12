const steps = [
  'Cadastre seus clientes.',
  'Acompanhe planos e check-ins.',
  'Saiba quem precisa da sua atenção.',
];

export function Workflow() {
  return (
    <section className="border-t border-white/10 py-20 lg:py-24" aria-labelledby="como-funciona-title">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac">Como funciona</p>
          <h2 id="como-funciona-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Simples para começar. Útil para continuar.
          </h2>
        </div>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lilac/15 text-sm font-bold text-lilac">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="pt-1 text-lg font-medium text-slate-100">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
