import Link from 'next/link';

import { createSupabaseServerClient } from '@/lib/supabase/server';

import { UpdatePasswordForm } from './update-password-form';

export const dynamic = 'force-dynamic';

export default async function UpdatePasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

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
          <Link href="/login" className="text-sm text-slate-400 transition hover:text-white">
            Voltar ao login
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
              Segurança da conta
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              Defina uma nova senha.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
              Escolha uma senha que você ainda não tenha usado e volte ao seu espaço profissional.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-panel/90 p-6 shadow-panel backdrop-blur-xl sm:p-8">
            {data.user ? (
              <>
                <p className="text-sm font-semibold text-white">Atualizar senha</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Depois de salvar, você será levado de volta ao painel.
                </p>
                <UpdatePasswordForm />
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-white">Link indisponível</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Este link expirou ou já foi utilizado. Solicite uma nova recuperação pelo login.
                </p>
                <Link
                  href="/login"
                  className="mt-7 inline-flex rounded-full bg-mint px-5 py-3 text-sm font-bold text-ink transition hover:bg-white"
                >
                  Solicitar novo link
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
