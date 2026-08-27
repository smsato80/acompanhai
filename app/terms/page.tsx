import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-3xl px-6 py-6 sm:px-10 lg:py-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Acompanh<span className="text-mint">Aí</span>
          </Link>
          <Link className="text-sm text-slate-400 transition hover:text-mint" href="/">
            Voltar ao início
          </Link>
        </header>
        <article className="prose prose-invert max-w-none py-16 prose-headings:tracking-tight prose-p:text-slate-400 prose-li:text-slate-400">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Informações legais</p>
          <h1>Termos de uso</h1>
          <p>Última atualização: 27 de agosto de 2026</p>
          <h2>1. Sobre o AcompanhAí</h2>
          <p>
            O AcompanhAí é uma ferramenta de organização para personal trainers e profissionais que
            acompanham clientes. Ele ajuda a reunir planos, check-ins e próximos contatos em um só lugar.
          </p>
          <h2>2. Uso responsável</h2>
          <p>
            O profissional é responsável pelas informações que cadastra, pela orientação oferecida a seus
            clientes e pelo uso adequado da plataforma. O AcompanhAí não substitui avaliação médica,
            nutricional ou qualquer atendimento de saúde.
          </p>
          <h2>3. Conta e acesso</h2>
          <p>
            Mantenha seus dados de acesso protegidos e comunique qualquer uso não autorizado. Podemos
            suspender acessos que violem estes termos ou coloquem outras pessoas em risco.
          </p>
          <h2>4. Disponibilidade</h2>
          <p>
            Trabalhamos para manter o serviço disponível e seguro, mas podem ocorrer manutenções,
            atualizações ou indisponibilidades temporárias.
          </p>
          <h2>5. Contato</h2>
          <p>
            Para dúvidas sobre estes termos, entre em contato com a SatoTech pelos canais informados no
            atendimento do produto.
          </p>
        </article>
        <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
          Desenvolvido por SatoTech · Soluções Inteligentes
        </footer>
      </div>
    </main>
  );
}
