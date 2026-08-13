# Primeiro marco funcional do app

Data: `2026-08-13`

## Entrega

O branch `feature/mvp-app` transforma a landing em uma aplicação inicial utilizável pelo profissional:

- `/login`: criação de conta e login por e-mail e senha.
- `/auth/confirm`: confirmação do token de e-mail do Supabase.
- `/dashboard`: painel protegido com resumo, clientes, planos e check-ins.
- Server Actions para criar cliente, plano, check-in e sair.
- `middleware.ts` para renovar a sessão Supabase em cookies.

## Banco

A migration `supabase/migrations/20260813123000_mvp_core_schema.sql` cria:

- `profiles`
- `organizations`
- `organization_members`
- `clients`
- `plans`
- `check_ins`

O trigger de Auth cria automaticamente o perfil, a organização em trial e a membership owner. Todas as tabelas públicas do núcleo têm RLS habilitada e forçada. As funções privilegiadas ficam no schema `private`, fora da superfície pública.

## Segurança e limites

- Toda consulta do painel filtra a organização do usuário autenticado.
- O banco repete o isolamento com políticas RLS e chaves compostas nas relações de plano/check-in.
- Não há `service_role` no navegador.
- Ainda não há convite seguro de cliente, cobrança, WhatsApp/LINE, IA ou dados clínicos.

## Verificações

- `pnpm typecheck`: aprovado.
- `pnpm lint`: aprovado.
- `pnpm test`: 1 teste aprovado.
- `pnpm test:e2e`: 4 testes aprovados.
- `pnpm build`: aprovado.
- Supabase security advisors: nenhum lint após endurecimento de `search_path`.

## Próximo marco

Homologar uma conta real, validar signup/login e executar testes negativos com duas organizações antes de publicar o branch em produção.

## Publicacao concluida

- Deploy de producao concluido na Vercel: [acompanhai.vercel.app](https://acompanhai.vercel.app).
- O branch de implementacao continua disponivel no GitHub para revisao: [feature/mvp-app](https://github.com/smsato80/acompanhai/tree/feature/mvp-app).
- A checagem online confirmou `/` e `/login` com HTTP 200 e `/dashboard` protegido com redirecionamento para login.

O proximo marco agora e homologar uma conta real, validar cadastro/login com confirmacao de e-mail e executar testes negativos com duas organizacoes. Depois, preparar o primeiro piloto com profissionais brasileiros no Japao.
