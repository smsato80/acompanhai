import Link from 'next/link';

type ConfirmationPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export const dynamic = 'force-dynamic';

export default async function PortalConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-6 py-10 text-white">
        <section className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-panel p-8 text-center shadow-panel sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Link do AcompanhAí
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Este link não está disponível.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Peça um novo link para continuar seu acompanhamento.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-mint/50 hover:text-white"
          >
            Conhecer o AcompanhAí
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 py-10 text-white">
      <section className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-panel p-8 shadow-panel sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-xl font-black text-ink shadow-glow">
          A
        </div>
        <p className="mt-7 text-center text-xs font-semibold uppercase tracking-[0.2em] text-mint">
          Seu acompanhamento
        </p>
        <h1 className="mt-3 text-center text-3xl font-semibold tracking-tight">
          Abrir seu espaço de acompanhamento.
        </h1>
        <p className="mt-4 text-center text-sm leading-7 text-slate-400">
          Você recebeu um convite para acompanhar seu próximo passo com clareza. Confirme abaixo
          para abrir o portal.
        </p>
        <form action={`/portal/${encodeURIComponent(token)}`} method="post" className="mt-7">
          <button
            type="submit"
            className="w-full rounded-2xl bg-mint px-4 py-3.5 text-sm font-bold text-ink transition hover:bg-white"
          >
            Abrir acompanhamento
          </button>
        </form>
        <Link
          href="/"
          className="mt-4 block text-center text-xs font-semibold text-slate-500 transition hover:text-white"
        >
          Conhecer o AcompanhAí
        </Link>
      </section>
    </main>
  );
}
