export function Footer() {
  return (
    <footer className="flex flex-col gap-5 border-t border-white/10 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-slate-300">AcompanhAí</p>
        <p className="mt-1">Desenvolvido por SatoTech · Soluções Inteligentes</p>
      </div>
      <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Links institucionais">
        <a className="transition hover:text-mint" href="/pricing">
          Planos
        </a>
        <a className="transition hover:text-mint" href="/terms">
          Termos
        </a>
        <a className="transition hover:text-mint" href="/privacy">
          Privacidade
        </a>
      </nav>
    </footer>
  );
}
