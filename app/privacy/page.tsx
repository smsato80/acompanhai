import Link from 'next/link';

export default function PrivacyPage() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Informações legais
          </p>
          <h1>Política de privacidade</h1>
          <p>Última atualização: 27 de agosto de 2026</p>
          <h2>1. Quais informações usamos</h2>
          <p>
            Usamos dados necessários para criar a conta profissional, organizar clientes e registrar
            o acompanhamento solicitado dentro da plataforma. Evite cadastrar informações de saúde,
            documentos ou dados sensíveis que não sejam indispensáveis ao seu serviço.
          </p>
          <h2>2. Interesse na demonstração</h2>
          <p>
            Quando você solicita uma demonstração, podemos receber seu nome, e-mail e WhatsApp
            opcional para responder ao contato e entender o interesse inicial no produto. O envio
            depende do seu consentimento, e esses dados não são usados para criar uma conta ou
            acessar o portal do cliente.
          </p>
          <h2>3. Para que usamos os dados</h2>
          <p>
            Os dados são usados para autenticar o acesso, apresentar clientes e planos ao
            profissional responsável, receber check-ins e melhorar a segurança e a experiência do
            produto.
          </p>
          <h2>4. Compartilhamento e segurança</h2>
          <p>
            Não vendemos dados pessoais. O acesso é limitado às funções necessárias da conta e
            adotamos medidas técnicas para proteger as informações. O profissional deve compartilhar
            links de acompanhamento somente com o cliente correto.
          </p>
          <h2>5. Retenção e solicitações</h2>
          <p>
            Mantemos as informações pelo tempo necessário para prestar o serviço ou cumprir
            obrigações aplicáveis. Para solicitar correção, exportação ou exclusão, fale com o
            atendimento da SatoTech.
          </p>
          <h2>6. Atualizações</h2>
          <p>
            Podemos atualizar esta política quando o produto ou a legislação mudar. A data no topo
            indica a versão vigente nesta página.
          </p>
        </article>
        <footer className="border-t border-white/10 py-8 text-sm text-slate-500">
          Desenvolvido por SatoTech · Soluções Inteligentes
        </footer>
      </div>
    </main>
  );
}
