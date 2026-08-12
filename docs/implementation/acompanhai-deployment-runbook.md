# Runbook de deploy

> Ainda não há produção. Este documento define o procedimento futuro.

## Pré-requisitos

1. Repositório Git oficial criado.
2. Projeto Supabase de desenvolvimento e homologação.
3. Migrations aplicadas em homologação.
4. Vercel configurada com banco separado.
5. Stripe Japão em test mode.
6. Domínio e e-mail autenticados.
7. Termos, privacidade, contato e cancelamento revisados.
8. Backup e restauração ensaiados.

## Validação antes de publicar

```powershell
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Depois, testar login, cliente, plano, convite, check-in, painel, assinatura test mode, link inválido, logout, refresh e responsividade.

## Publicação

1. Abrir pull request.
2. CI verde.
3. Revisar migration e variáveis.
4. Publicar preview.
5. Executar smoke test.
6. Aplicar migration aprovada.
7. Publicar produção somente com autorização.
8. Registrar commit, deployment e resultado.

## Rollback

Rollback de frontend e banco são operações diferentes. Não sobrescrever banco, `.env` ou dados sem backup e aprovação. Em alteração de schema, ter plano de restauração antes da aplicação.

## Pós-deploy

- Conferir rotas diretas.
- Conferir headers e cookies.
- Conferir logs sem PII.
- Conferir webhook Stripe.
- Conferir RLS com duas contas.
- Conferir convite usado/expirado.
- Registrar versão no histórico.
