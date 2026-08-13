# AcompanhAí

Fundação do SaaS AcompanhAí: uma experiência simples para profissionais acompanharem clientes, planos e check-ins com mais consistência.

O primeiro recorte atende personal trainers que trabalham com clientes no Brasil e no Japão. A interface usa português brasileiro; referências comerciais futuras serão apresentadas em ienes (¥).

O primeiro app funcional está disponível localmente em `/login` e `/dashboard`. Ele usa Supabase Auth e o schema multi-tenant do MVP para cadastrar clientes, planos e check-ins. A landing pública continua sendo uma demonstração comercial.

## Pré-requisitos

- Node.js 22 ou superior
- pnpm 10 ou superior

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

Em producao, acesse [acompanhai.vercel.app](https://acompanhai.vercel.app).

## Verificações

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

O teste de fumaça do Playwright inicia o servidor automaticamente. Em uma máquina nova, instale o navegador uma vez com `pnpm exec playwright install chromium`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha a chave publicável do projeto Supabase. Não coloque chaves privadas no frontend e nunca versione `.env.local`.

## Documentação

A documentação do produto, arquitetura, dados, segurança, testes e processo está em [`docs/`](./docs/). O registro do primeiro marco funcional está em [`docs/implementation/acompanhai-mvp-app-2026-08-13.md`](./docs/implementation/acompanhai-mvp-app-2026-08-13.md).
