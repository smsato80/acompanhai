# Arquitetura técnica

> Estado vigente: arquitetura recomendada; nenhuma parte está homologada porque o repositório oficial ainda não existe.

## Visão geral

```text
Profissional / cliente
        ↓
Next.js web responsivo/PWA
   ↙        ↓        ↘
Supabase   Stripe    E-mail
Auth/DB    webhooks  transacional
        ↓
Planos, check-ins e painel
```

## Stack recomendada

- Next.js estável, App Router, React e TypeScript strict.
- Tailwind CSS e componentes acessíveis.
- Supabase Auth/PostgreSQL com migrations SQL e RLS.
- React Hook Form + Zod.
- Stripe Checkout, Billing, Customer Portal e webhooks.
- Vitest, Testing Library, Playwright e testes RLS.
- Vercel, Supabase em Tóquio quando disponível e Sentry opcional.

## Organização por área

```text
src/app/          rotas públicas, auth, dashboard, convite e cliente
src/components/   componentes compartilhados
src/features/     auth, organizações, clientes, planos, check-ins, billing
src/lib/          validações, datas, segurança e contratos
src/server/       serviços server-side e integrações
supabase/         migrations, seeds e políticas
tests/            domínio, integração, RLS, E2E e webhooks
```

## Regras arquiteturais

- Toda entidade de negócio tem `organization_id`.
- RLS é obrigatória em tabelas expostas.
- Dados sensíveis e mutações ficam no servidor.
- Tokens de convite são armazenados apenas como hash.
- Instantes usam UTC; data operacional usa `Asia/Tokyo`.
- Eventos Stripe são idempotentes.
- Nenhuma chave server-side chega ao navegador.
