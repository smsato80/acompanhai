# Task 1 — Núcleo Supabase e RLS

## Implementação

Foi criada a migration versionada `supabase/migrations/20260813123000_mvp_core_schema.sql` com o núcleo multi-tenant do MVP:

- `profiles` para preferências mínimas do profissional autenticado.
- `organizations` e `organization_members` para isolar cada tenant.
- `clients`, `plans` e `check_ins` com `organization_id`, constraints de domínio e índices para os acessos previstos.
- trigger `on_auth_user_created` para criar automaticamente `profile`, organização em `trial` e membership `owner` ao entrar um novo usuário no `auth.users`.
- RLS habilitada e forçada em todas as tabelas públicas do núcleo, com leitura por membro da organização e escrita restrita a `owner` ou `platform_admin`.

## Revisão do modelo planejado

Para manter esta etapa pequena e coerente com os docs, o núcleo foi reduzido ao que já sustenta Auth, isolamento e o primeiro fluxo profissional:

- `plan_items` e `plan_versions` ficaram fora desta migration.
- O conteúdo editável do plano foi concentrado em `plans.content jsonb`.
- O contexto histórico do plano no momento da resposta foi concentrado em `check_ins.plan_snapshot` e `check_ins.plan_version`.

Isso preserva a regra documental de não reescrever respostas históricas quando o plano mudar, sem abrir o escopo completo de versionamento nesta tarefa.

## Arquivos alterados

- `supabase/migrations/20260813123000_mvp_core_schema.sql`
- `.superpowers/sdd/mvp-app/task-1-report.md`

## Verificações

- Revisão dos docs-base: `docs/implementation/acompanhai-data-model.md`, `docs/implementation/acompanhai-architecture.md`, `docs/implementation/acompanhai-supabase-setup.md`, `docs/superpowers/plans/2026-08-13-mvp-app.md` e seções do plano completo.
- Verificação local de arquivos e diff no worktree.
- Não foi aplicada nenhuma migration em ambiente remoto.

## Limitações e próximos passos

- Não há teste RLS automatizado ainda; esta tarefa entregou apenas a migration.
- O caminho de `client_session`, convites e versionamento completo de plano permanece para tarefas posteriores.
- Idealmente a próxima etapa deve validar esta migration em Supabase local com testes negativos entre duas organizações antes de qualquer aplicação remota.
