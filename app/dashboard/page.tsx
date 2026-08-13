import Link from 'next/link';

import {
  createCheckInAction,
  createClientAction,
  createPlanAction,
  signOutAction,
} from './actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Client = { id: string; display_name: string; contact_value: string | null; status: string };
type Plan = { id: string; name: string; status: string; client_id: string };
type CheckIn = { client_id: string; status: string; comment: string | null; created_at: string };

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    return null;
  }

  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    return (
      <main className="min-h-screen bg-ink px-6 py-10 text-white sm:px-10 lg:px-14">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-panel p-8 shadow-panel sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Configuração pendente
          </p>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Seu espaço ainda está sendo preparado.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            A conta foi autenticada, mas não encontramos uma organização vinculada. Nenhum dado foi
            exibido sem essa relação de segurança.
          </p>
          <form action={signOutAction} className="mt-8">
            <button className="rounded-full bg-mint px-5 py-3 text-sm font-bold text-ink">
              Sair
            </button>
          </form>
        </div>
      </main>
    );
  }

  const [
    { data: clientsData },
    { data: plansData },
    { data: checkInsData },
    { data: organization },
  ] = await Promise.all([
    supabase
      .from('clients')
      .select('id, display_name, contact_value, status')
      .eq('organization_id', membership.organization_id)
      .order('created_at', { ascending: false }),
    supabase
      .from('plans')
      .select('id, name, status, client_id')
      .eq('organization_id', membership.organization_id)
      .order('created_at', { ascending: false }),
    supabase
      .from('check_ins')
      .select('client_id, status, comment, created_at')
      .eq('organization_id', membership.organization_id)
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('organizations')
      .select('name')
      .eq('id', membership.organization_id)
      .maybeSingle(),
  ]);

  const clients = (clientsData ?? []) as Client[];
  const plans = (plansData ?? []) as Plan[];
  const checkIns = (checkInsData ?? []) as CheckIn[];
  const latestCheckIn = new Map<string, CheckIn>();
  checkIns.forEach((checkIn) => {
    if (!latestCheckIn.has(checkIn.client_id)) latestCheckIn.set(checkIn.client_id, checkIn);
  });
  const pendingAttention = clients.filter((client) => !latestCheckIn.has(client.id)).slice(0, 3);
  const completedCheckIns = checkIns.filter((checkIn) => checkIn.status === 'done').length;
  const displayName =
    user.user_metadata?.display_name || user.email?.split('@')[0] || 'profissional';

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(circle_at_82%_8%,rgba(119,245,197,0.12),transparent_25%),radial-gradient(circle_at_12%_55%,rgba(181,165,255,0.1),transparent_26%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-14">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow"
            >
              A
            </Link>
            <div>
              <p className="text-lg font-semibold tracking-tight">
                Acompanh<span className="text-mint">Aí</span>
              </p>
              <p className="text-xs text-slate-500">
                {organization?.name ?? 'Seu espaço de trabalho'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden text-right text-sm text-slate-400 sm:block">
              Olá, <span className="font-medium text-slate-200">{displayName}</span>
            </p>
            <form action={signOutAction}>
              <button className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-mint/40 hover:text-white">
                Sair
              </button>
            </form>
          </div>
        </header>

        <section className="py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Visão de hoje
          </p>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                Saiba quem precisa de você hoje.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
                Seu acompanhamento começa com uma visão simples de clientes, planos e próximos
                passos.
              </p>
            </div>
            <span className="w-fit rounded-full border border-mint/20 bg-mint/10 px-4 py-2 text-xs font-semibold text-mint">
              MVP em uso
            </span>
          </div>
        </section>

        <section
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Resumo do acompanhamento"
        >
          {[
            ['0' + clients.length, 'clientes ativos', 'Sua carteira atual'],
            ['0' + completedCheckIns, 'check-ins registrados', 'Respostas acompanhadas'],
            ['0' + plans.length, 'planos ativos', 'Estruturas de trabalho'],
            ['0' + pendingAttention.length, 'atenções hoje', 'Próximos contatos'],
          ].map(([value, label, detail]) => (
            <article key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-2 text-sm font-medium text-slate-200">{label}</p>
              <p className="mt-1 text-xs text-slate-500">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[2rem] border border-white/10 bg-panel p-6 shadow-panel sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">
                  Sua carteira
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Clientes acompanhados</h2>
              </div>
              <span className="text-xs text-slate-500">{clients.length} no total</span>
            </div>
            <div className="mt-6 space-y-3">
              {clients.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 p-6 text-sm leading-6 text-slate-400">
                  Cadastre seu primeiro cliente ao lado para começar a construir seu acompanhamento.
                </div>
              ) : (
                clients.map((client) => {
                  const latest = latestCheckIn.get(client.id);
                  return (
                    <div
                      key={client.id}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lilac/15 text-sm font-bold text-lilac">
                        {client.display_name.slice(0, 1).toUpperCase()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-100">
                          {client.display_name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {client.contact_value || 'Sem e-mail informado'}
                        </p>
                      </div>
                      <span
                        className={`hidden rounded-full px-3 py-1 text-[10px] font-bold sm:inline-flex ${latest ? 'bg-mint/10 text-mint' : 'bg-lilac/10 text-lilac'}`}
                      >
                        {latest ? 'Acompanhado' : 'Pedir check-in'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-lilac/20 bg-lilac/[0.07] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">
                Atenção hoje
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Próximos contatos</h2>
              <div className="mt-5 space-y-3">
                {pendingAttention.length === 0 ? (
                  <p className="text-sm leading-6 text-slate-300">
                    Tudo em dia por enquanto. Continue mantendo o ritmo.
                  </p>
                ) : (
                  pendingAttention.map((client) => (
                    <div key={client.id} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-lilac" />
                      <span className="flex-1 truncate">{client.display_name}</span>
                      <span className="text-xs text-lilac">check-in</span>
                    </div>
                  ))
                )}
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-panel p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Próximo passo
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Registre um check-in</h2>
              <form action={createCheckInAction} className="mt-5 space-y-3">
                <select
                  name="clientId"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none focus:border-mint/50"
                >
                  <option value="" className="bg-panel">
                    Selecione o cliente
                  </option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id} className="bg-panel">
                      {client.display_name}
                    </option>
                  ))}
                </select>
                <select
                  name="planId"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none focus:border-mint/50"
                >
                  <option value="" className="bg-panel">
                    Plano relacionado
                  </option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.id} className="bg-panel">
                      {plan.name}
                    </option>
                  ))}
                </select>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Observação do acompanhamento"
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-mint/50"
                />
                <button className="w-full rounded-2xl bg-mint px-4 py-3.5 text-sm font-bold text-ink transition hover:bg-white">
                  Salvar check-in
                </button>
              </form>
            </article>
          </div>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-panel p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">
              Adicionar à carteira
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Novo cliente</h2>
            <form action={createClientAction} className="mt-5 space-y-3">
              <input
                name="name"
                required
                placeholder="Nome do cliente"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-mint/50"
              />
              <input
                name="email"
                type="email"
                placeholder="E-mail (opcional)"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-mint/50"
              />
              <button className="w-full rounded-2xl border border-mint/30 bg-mint/10 px-4 py-3.5 text-sm font-bold text-mint transition hover:bg-mint hover:text-ink">
                Cadastrar cliente
              </button>
            </form>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-panel p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac">
              Seu método
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Novo plano</h2>
            <form action={createPlanAction} className="mt-5 space-y-3">
              <select
                name="clientId"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none focus:border-lilac/50"
              >
                <option value="" className="bg-panel">
                  Selecione o cliente
                </option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id} className="bg-panel">
                    {client.display_name}
                  </option>
                ))}
              </select>
              <input
                name="name"
                required
                placeholder="Ex.: Acompanhamento inicial"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-lilac/50"
              />
              <input
                name="startsOn"
                type="date"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200 outline-none focus:border-lilac/50"
              />
              <textarea
                name="description"
                rows={2}
                placeholder="Objetivo ou observação do plano"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-lilac/50"
              />
              <button className="w-full rounded-2xl border border-lilac/30 bg-lilac/10 px-4 py-3.5 text-sm font-bold text-lilac transition hover:bg-lilac hover:text-ink">
                Criar plano
              </button>
            </form>
          </article>
        </section>

        <footer className="border-t border-white/10 py-8 text-xs text-slate-500">
          AcompanhAí · MVP em construção · Dados de demonstração e uso inicial
        </footer>
      </div>
    </main>
  );
}
