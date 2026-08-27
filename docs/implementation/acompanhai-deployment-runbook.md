# Runbook de deploy

> Atualizado em 2026-08-27: landing e primeira versão vendável do app publicadas e verificadas no deployment `dpl_BQHZKaxijwJDDaP3iykBoMTcV2So`. A homologação real do fluxo profissional/cliente continua pendente.

## Estado da landing de demonstração

A landing de demonstração está pública em produção: https://acompanhai.vercel.app.

## Registro histórico da publicação de código

- Repositório: https://github.com/smsato80/acompanhai
- Commit local publicado: `d71cdaf2e317c1a7484caf6cef59a21b5b9c50c2`.
- Branch: `master`.
- Caminho de publicação: CLI autenticado a partir de `D:\SatoTech\acompanhai`; não foi usada integração automática do GitHub.

## Registro histórico do redeploy Vercel após a correção do preset

- Projeto: `acompanhai` (`prj_TLXI5apuCZ4OHMuGm7334VIq5w1z`).
- Framework preset: `nextjs`, confirmado via API.
- Deployment: `dpl_BUxWM55dyV5gbdK9j4onecVVUNZC`.
- Status: `READY`.
- URL do deployment: https://acompanhai-q5v8atpm4-smsato80s-projects.vercel.app
- Alias de produção: https://acompanhai.vercel.app
- A proteção SSO foi desativada para tornar a demonstração pública.

## Estado atual do app vendável

- Branch de implementação: `feature/mvp-app`.
- Rotas publicadas: `/login`, `/auth/confirm`, `/auth/update-password`, `/dashboard`, `/portal`, `/portal/confirm`, `/pricing`, `/terms` e `/privacy`.
- Supabase: migration `mvp_core_schema` e endurecimento de `search_path` aplicados no projeto `xwbfzyoltsbpbvsnlmfg`.
- Supabase: migrations `sellable_client_portal`, `grant_portal_invite_access` e `harden_portal_rpc_exposure` aplicadas no projeto `xwbfzyoltsbpbvsnlmfg`.
- Supabase: migration `interest_leads` aplicada no projeto `xwbfzyoltsbpbvsnlmfg`, com RLS forçada e INSERT controlado.
- Vercel: deployment de produção atual do branch MVP `dpl_BQHZKaxijwJDDaP3iykBoMTcV2So`, estado `READY`.
- Variáveis necessárias no deploy: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` e `NEXT_PUBLIC_SITE_URL`.

### Verificação pública atual

- HTTP: `200 OK` em `https://acompanhai.vercel.app`.
- Título: `AcompanhAí — acompanhamento que continua`.
- Headline: `Seu cliente não precisa se perder no caminho.`
- CTA: `Quero testar` visível.
- Checks locais aprovados: `lint`, `typecheck`, `test` (4 unitários), `test:e2e` (11) e `build`.
- `/pricing`, `/terms`, `/privacy`, `/login` e `/portal` retornaram `200`; o deployment foi inspecionado como `READY` e associado ao alias de produção.
- `/dashboard` sem sessão continua protegido e o fluxo autenticado completo aguarda uma conta de teste autorizada.
- O painel agora devolve feedback explícito para sucesso ou erro ao criar cliente, publicar plano e salvar check-in.

## Pré-requisitos

1. Repositório Git oficial criado.
2. Projeto Supabase AcompanhAí restaurado e ativo no Free.
3. Migrations do núcleo e do portal aplicadas.
4. Vercel configurada com as variáveis públicas do projeto.
5. Stripe Japão em test mode.
6. Domínio e e-mail autenticados.
7. Termos, privacidade, contato e cancelamento revisados.
8. Backup e restauração ensaiados.

## Publicar a landing demo via GitHub e Vercel

1. Confirmar que a árvore de trabalho não contém `.env.local`, chaves privadas, tokens ou dados reais de leads.
2. Criar ou selecionar o repositório GitHub oficial e enviar apenas os arquivos versionáveis por meio de uma sessão autenticada segura.
3. Nunca adicionar, versionar ou enviar `.env.local`, chaves privadas ou tokens para o GitHub.
4. No Vercel, importar o repositório GitHub e conferir as configurações de build do projeto Next.js.
5. Caso variáveis sejam necessárias em tasks futuras, cadastrá-las exclusivamente nas configurações seguras do Vercel; não copiá-las para commits, documentação ou logs.
6. Publicar um preview, validar a landing e registrar a URL somente após a confirmação do Vercel.
7. A produção já foi publicada com autorização; registrar cada novo deployment, commit e resultado.

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
8. Registrar commit, deployment e resultado em `acompanhai-current-state.md` e `acompanhai-change-history.md`.

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
