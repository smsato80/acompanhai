# Arquitetura técnica

> Estado vigente: arquitetura recomendada para o repositório oficial existente. A primeira implementação está publicada; homologação real e alguns serviços futuros continuam pendentes.

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
app/               rotas públicas, auth, dashboard, convite e portal do cliente
components/        componentes compartilhados da landing, dashboard e portal
lib/               Supabase, tokens, validações e contratos
supabase/          migrations, RLS e funções controladas
tests/             domínio, integração, RLS, E2E e webhooks
```

## Regras arquiteturais

- Toda entidade de negócio tem `organization_id`.
- RLS é obrigatória em tabelas expostas.
- Dados sensíveis e mutações ficam no servidor.
- Tokens de convite são armazenados apenas como hash.
- Instantes usam UTC; data operacional usa `Asia/Tokyo`.
- Eventos Stripe são idempotentes.
- Nenhuma chave server-side chega ao navegador.
