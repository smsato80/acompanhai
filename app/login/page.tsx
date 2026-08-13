import Link from 'next/link';
import { redirect } from 'next/navigation';

import { LoginForm } from './login-form';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-ink px-6 py-6 text-white sm:px-10 lg:px-14">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Voltar para o início">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-lg font-black text-ink shadow-glow">
              A
            </span>
            <span className="text-lg font-semibold tracking-tight">
              Acompanh<span className="text-mint">Aí</span>
            </span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 transition hover:text-white">
            Voltar ao site
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Primeiro acesso ao MVP
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              Seu acompanhamento começa aqui.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
              Crie seu espaço de trabalho para organizar clientes, planos e check-ins em um único
              painel.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-400">
              {[
                'Painel pensado para personal trainers',
                'Dados separados por profissional',
                'Sem prescrição automática de treino ou dieta',
              ].map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-mint/10 text-xs text-mint">
                    ✓
                  </span>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-panel/90 p-6 shadow-panel backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold text-white">Entrar ou criar conta</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use seu e-mail para acessar o ambiente do profissional.
            </p>
            <LoginForm />
            <p className="mt-6 text-xs leading-5 text-slate-500">
              O AcompanhAí está em MVP. Não use ainda dados reais de clientes sem revisar os termos
              e a política de privacidade.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
