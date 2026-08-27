# AcompanhAí

Fundação do SaaS AcompanhAí: uma experiência simples para profissionais acompanharem clientes, planos e check-ins com mais consistência.

O primeiro recorte atende personal trainers que trabalham com clientes no Brasil e no Japão. A interface usa português brasileiro; referências comerciais futuras serão apresentadas em ienes (¥).

O app funcional está publicado em [acompanhai.vercel.app](https://acompanhai.vercel.app). Ele usa Supabase Auth e o schema multi-tenant para cadastrar clientes, publicar planos, gerar convites seguros e receber check-ins no portal mobile do cliente. A cobrança e o envio de mensagens continuam manuais nesta primeira versão.

## Pré-requisitos

- Node.js 22 ou superior
- pnpm 10 ou superior

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

Em produção, acesse [acompanhai.vercel.app](https://acompanhai.vercel.app).

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

A documentação do produto, arquitetura, dados, segurança, testes e processo está em [`docs/`](./docs/). O estado consolidado está em [`docs/implementation/acompanhai-current-state.md`](./docs/implementation/acompanhai-current-state.md), o histórico em [`docs/implementation/acompanhai-change-history.md`](./docs/implementation/acompanhai-change-history.md) e a evidência do lançamento vendável em [`docs/implementation/acompanhai-primeiro-lancamento-vendavel-2026-08-27.md`](./docs/implementation/acompanhai-primeiro-lancamento-vendavel-2026-08-27.md).
