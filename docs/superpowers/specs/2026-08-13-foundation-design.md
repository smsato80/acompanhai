# AcompanhAí — Especificação da fundação do projeto

**Data:** 2026-08-13  
**Status:** aprovada pelo usuário para início da implementação

## Objetivo

Criar a fundação técnica e documental do AcompanhAí em `D:\SatoTech\acompanhai`, preparando a primeira entrega funcional sem misturar ainda regras de negócio, autenticação completa ou dados reais de clientes.

## Contexto

AcompanhAí será um SaaS em português brasileiro, operado a partir do Japão, inicialmente voltado para personal trainers que acompanham alunos remotamente. O produto usa ienes nas referências comerciais e poderá expandir depois para outros profissionais de acompanhamento recorrente.

O primeiro recorte funcional é:

- profissional cria e acompanha clientes;
- cliente acessa um link seguro e simples;
- profissional registra plano, orientação e check-ins;
- o sistema prepara uma base para retenção e comunicação;
- IA entra depois como apoio operacional, não como substituta de orientação profissional.

## Escopo desta fundação

### Incluído

- importar a documentação oficial de `D:\SatoTech\acompanhai`;
- configurar aplicativo Next.js com App Router e TypeScript estrito;
- estabelecer scripts de desenvolvimento, lint, formatação, testes, typecheck e build;
- criar uma home mínima, acessível e coerente com a identidade dark premium;
- preparar variáveis de ambiente para Supabase sem incluir segredos no Git;
- preparar integração futura com Supabase usando cliente publicável e separação browser/server;
- criar o projeto Supabase inicial na região adequada ao Japão, quando autorizado;
- registrar documentação de execução, qualidade e decisões.

### Fora do escopo imediato

- autenticação completa e recuperação de senha;
- modelagem final de organizações, profissionais, clientes e planos;
- políticas RLS de produção;
- cobrança, marketplace, WhatsApp e integrações externas;
- prescrição automática de treino, dieta ou atendimento clínico;
- painel administrativo completo;
- publicação em produção.

## Decisões técnicas

- **Aplicação:** Next.js com App Router e TypeScript estrito.
- **Gerenciador:** pnpm, com lockfile versionado.
- **UI:** Tailwind CSS, componentes acessíveis e tokens visuais dark premium.
- **Dados e autenticação futura:** Supabase, usando variáveis de ambiente e cliente publicável no navegador; nenhuma service role no frontend.
- **Qualidade:** ESLint, Prettier, Vitest, Playwright, `tsc --noEmit` e build de produção.
- **Documentação:** esquema semelhante ao Peso Leve, preservando produto, arquitetura, dados, segurança, testes, processo e histórico.

## Regras de segurança

- Nunca versionar `.env.local` ou qualquer chave privada.
- A chave `service_role`/secret nunca será exposta em `NEXT_PUBLIC_*`.
- Toda tabela exposta pelo Data API deverá ter RLS antes de receber acesso de usuários.
- Toda decisão de autorização será baseada em dados controlados pelo servidor ou app metadata, nunca em `user_metadata` editável pelo usuário.
- A região efetivamente escolhida no Supabase deve ser registrada na documentação.

## Critério de pronto

A fundação estará pronta quando o repositório tiver documentação importada, aplicação iniciando localmente, home renderizando, scripts de qualidade passando, teste unitário passando, arquivo `.env.example` sem segredos, projeto Supabase criado e configuração inicial documentada. O próximo marco será Auth, organizações, schema e RLS.
