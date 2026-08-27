# Plano de implementação — Primeiro lançamento vendável do AcompanhAí

> **Para execução:** usar a abordagem subagent-driven quando houver agente disponível. Cada tarefa deve terminar com testes focados e commit pequeno no worktree `D:\SatoTech\acompanhai\.worktrees\mvp-app`.

## Contexto e regras

- Repositório oficial: `D:\SatoTech\acompanhai`.
- Implementação: `D:\SatoTech\acompanhai\.worktrees\mvp-app`.
- Não trabalhar na cópia antiga `C:\Users\DELL\Documents\ChatGPT\Acompanhai`.
- Não alterar Peso Leve nem CarrosserIA.
- O produto se chama somente **AcompanhAí**. Não adicionar “Pilot1” ou “Pilot 1” a título, logo, metadata, UI, rota, copy ou documentação pública.
- Preservar mudanças preexistentes fora do escopo, especialmente `.gitignore` do repositório principal.

## Tarefa 1 — Retomar e validar o ambiente Supabase

**Arquivos:** nenhum arquivo de aplicação; registrar evidência em `docs/implementation/` somente se houver mudança operacional relevante.

**Passos:**

1. Usar a integração Supabase para restaurar o projeto `acompanhai` de ref `xwbfzyoltsbpbvsnlmfg`.
2. Consultar o projeto até confirmar estado saudável/ativo.
3. Verificar que `peso-leve` continua pausado e `carrosseria` continua ativo; não alterar os dois.
4. Listar migrations do projeto e comparar com `supabase/migrations/` local.
5. Executar no worktree:

   ```powershell
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm test:e2e
   pnpm build
   ```

6. Se a restauração falhar, não criar novo projeto; registrar o erro e continuar a implementação local com `.env.local` já configurado.

**Aceite:** AcompanhAí ativo ou falha documentada sem alterar os outros projetos; baseline local conhecido.

## Tarefa 2 — Criar a migration do domínio vendável

**Arquivos:**

- `supabase/migrations/20260827100000_sellable_client_portal.sql`
- `tests/unit/portal-token.test.ts`
- `tests/unit/plan-content.test.ts`

**Implementação:**

1. Criar tabela `public.plan_versions` para snapshots publicados, ligada a `plans` e `organizations`.
2. Criar tabela `public.client_invites` com `client_id`, `organization_id`, `token_hash`, `expires_at`, `redeemed_at`, `revoked_at`, timestamps e índices por hash/cliente.
3. Criar tabela `public.client_sessions` com hash de sessão, cliente, organização, expiração, revogação e último acesso.
4. Criar tabela `public.check_in_items` ou estrutura equivalente para guardar respostas por item sem destruir o check-in atual; manter leitura dos registros antigos.
5. Adicionar colunas de estado necessárias em `clients`, `plans` e `check_ins` somente quando não houver equivalente.
6. Habilitar RLS em todas as tabelas novas.
7. Criar policies do profissional limitadas à organização e policies de portal somente por funções controladas; evitar `anon` com acesso direto às tabelas.
8. Se houver função `SECURITY DEFINER`, usar `set search_path = ''`, nomes totalmente qualificados, revogar execução pública por padrão e conceder apenas o necessário.
9. Não armazenar token ou segredo cru.
10. Adicionar testes unitários para hash determinístico, expiração, diferença entre token inválido e expirado no retorno público e preservação do snapshot.

**Validação:**

```powershell
pnpm test -- portal-token plan-content
pnpm typecheck
```

**Commit:** `feat: add sellable client portal schema`

## Tarefa 3 — Implementar token, sessão e contratos de servidor

**Arquivos:**

- `lib/portal/tokens.ts`
- `lib/portal/types.ts`
- `lib/portal/server.ts`
- `app/api/portal/invites/route.ts`
- `app/api/portal/session/route.ts`
- `app/api/portal/check-in/route.ts`
- `app/api/portal/logout/route.ts`
- `tests/unit/portal-routes.test.ts`

**Implementação:**

1. Criar gerador de token com `crypto.randomBytes`/Web Crypto e hash SHA-256.
2. Criar helpers para expiração, cookie seguro, leitura e revogação de sessão.
3. Implementar a criação de convite autenticada pelo profissional, validando que o cliente pertence à organização atual.
4. Implementar troca de convite por cookie `HttpOnly`, `Secure` em produção, `SameSite=Lax`, `Path=/portal` e TTL curto.
5. Implementar check-in validando sessão, cliente, plano vigente, payload e limite de tamanho.
6. Implementar logout revogando a sessão e limpando cookie.
7. Usar apenas dados mínimos nas respostas; nunca retornar token hash, token cru, service role ou linhas de outras organizações.
8. Preferir RPCs controladas para operações privilegiadas. Se a rota precisar do service role, manter a importação em módulo server-only, validar toda entrada e testar que nenhum módulo cliente o importa.
9. Responder com mensagens genéricas para token inválido, revogado ou expirado.

**Validação:**

```powershell
pnpm test -- portal-routes
pnpm lint
pnpm typecheck
```

**Commit:** `feat: add secure client portal session flow`

## Tarefa 4 — Evoluir o painel profissional

**Arquivos:**

- `app/dashboard/page.tsx`
- `app/dashboard/actions.ts`
- `app/dashboard/dashboard-client.tsx` (criar se a interação exigir)
- `components/dashboard/client-list.tsx`
- `components/dashboard/plan-builder.tsx`
- `components/dashboard/attention-card.tsx`
- `components/dashboard/invite-dialog.tsx`
- `components/ui/*` somente se um componente compartilhado for realmente necessário
- `tests/smoke/dashboard-flow.spec.ts`

**Implementação:**

1. Preservar autenticação, layout e operações já existentes.
2. Reorganizar o painel em “Comece por aqui”, clientes, planos e atenção da semana.
3. Criar editor simples de itens de plano com adicionar, reordenar, editar e publicar.
4. Depois da publicação, criar snapshot e exibir versão ativa.
5. Adicionar ação “Gerar convite” e modal com link copiável e mensagem pronta para WhatsApp/LINE/e-mail.
6. Mostrar estado do convite: não enviado, vigente, resgatado, expirado ou revogado.
7. Exibir check-in mais recente por cliente e motivo de atenção.
8. Implementar estados loading, vazio, erro e confirmação sem depender de números fictícios.
9. Manter o texto claro para personal trainer, mas usar componentes reutilizáveis.

**Validação:**

```powershell
pnpm test:e2e -- dashboard-flow
pnpm lint
pnpm typecheck
```

**Commit:** `feat: complete professional follow-up workflow`

## Tarefa 5 — Criar o portal mobile do cliente

**Arquivos:**

- `app/portal/[token]/page.tsx` ou rota equivalente definida pela implementação
- `app/portal/page.tsx`
- `components/portal/client-plan.tsx`
- `components/portal/check-in-form.tsx`
- `components/portal/portal-shell.tsx`
- `tests/smoke/client-portal.spec.ts`

**Implementação:**

1. Criar tela de entrada do link com estados válido, expirado, revogado e já utilizado.
2. Após a troca, direcionar para sessão sem expor o token na navegação além do necessário para o resgate.
3. Exibir nome do profissional, saudação, objetivo, itens do plano e próximo passo.
4. Implementar check-in com botões acessíveis para status, escala de dificuldade e comentário.
5. Confirmar sucesso sem revelar dados técnicos e permitir voltar ao plano.
6. Não disponibilizar menu administrativo ou navegação para o dashboard.
7. Testar viewport móvel, teclado, foco visível, labels e contraste.

**Validação:**

```powershell
pnpm test:e2e -- client-portal
pnpm lint
pnpm typecheck
```

**Commit:** `feat: add mobile client portal`

## Tarefa 6 — Onboarding e prontidão comercial

**Arquivos:**

- `components/dashboard/onboarding.tsx`
- `app/terms/page.tsx`
- `app/privacy/page.tsx`
- `app/pricing/page.tsx` ou seção equivalente da landing
- `components/landing/hero.tsx`
- `components/landing/benefits.tsx`
- `components/landing/dashboard-mockup.tsx`
- `components/landing/footer.tsx`
- `app/layout.tsx`
- `tests/smoke/landing-accessibility.spec.ts`
- `tests/smoke/home.spec.ts`

**Implementação:**

1. Deixar explícito acima da dobra que o produto é para personal trainers e profissionais que acompanham clientes.
2. Trocar benefícios abstratos por casos visíveis: plano, check-in, atenção e mensagem de retorno.
3. Usar ícones SVG inline ou componentes SVG locais, com `aria-hidden` quando decorativos e sem dependência de emojis.
4. Atualizar o mockup para mostrar uma cliente, seu plano semanal, um check-in recebido e a ação recomendada.
5. Trocar o rodapé para exatamente: `Desenvolvido por SatoTech · Soluções Inteligentes`.
6. Remover “Pilot1”, “Pilot 1” e equivalentes de todo o produto, metadata, títulos e documentação pública.
7. Exibir preços em ienes e indicar que a ativação inicial é manual.
8. Criar Termos e Política com escopo simples e honesto; não inserir promessas jurídicas ou clínicas não verificadas.
9. Revisar título, description, Open Graph e favicon para AcompanhAí.

**Validação:**

```powershell
rg -n -i "pilot1|pilot 1" app components lib supabase tests
pnpm test:e2e -- home landing-accessibility
pnpm lint
pnpm typecheck
```

O `rg` deve retornar zero ocorrências em código, testes e conteúdo público. A especificação e este plano podem mencionar o termo apenas como regra interna de remoção.

**Commit:** `feat: make acompanhai landing commercially clear`

## Tarefa 7 — Revisão de segurança e integração

**Arquivos:**

- `supabase/migrations/*` novas migrations, sem editar migrations aplicadas
- `tests/security/tenant-isolation.spec.ts`
- `tests/security/portal-token.spec.ts`
- `docs/implementation/acompanhai-primeiro-lancamento-vendavel-2026-08-27.md`
- `.env.example`

**Implementação:**

1. Adicionar teste de duas organizações para impedir leitura, convite e check-in cruzados.
2. Testar token único, revogação, expiração, replay e cookie sem acesso JavaScript.
3. Conferir que variáveis privadas não começam com `NEXT_PUBLIC_`.
4. Aplicar migration no projeto AcompanhAí restaurado e confirmar policies/funções com o advisor de segurança.
5. Atualizar `.env.example` sem valores reais.
6. Documentar fluxo de homologação, limites conhecidos, ativação manual e rollback.

**Validação:**

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

**Commit:** `test: harden sellable release flow`

## Tarefa 8 — Deploy e verificação de produção

**Passos:**

1. Conferir diff final e status do worktree.
2. Fazer push da branch de implementação para o GitHub.
3. Configurar no Vercel apenas as variáveis necessárias, mantendo segredos no ambiente apropriado.
4. Deploy em preview e executar o fluxo profissional/cliente no preview.
5. Promover para produção somente após os testes passarem.
6. Verificar:
   - `/` retorna 200;
   - `/login` retorna 200;
   - `/dashboard` redireciona sem sessão;
   - `/terms` e `/privacy` retornam 200;
   - convite válido abre portal;
   - convite revogado/expirado é bloqueado;
   - check-in aparece no profissional correto.
7. Registrar URLs, commit, deployment ID, ambiente Supabase, limitações e próximos passos no documento de implementação.

**Commit final:** `docs: record sellable release evidence`

## Sequência de execução

Executar na ordem 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. Uma tarefa que falhar deve ser corrigida no próprio escopo antes da próxima. Não mascarar falhas de autenticação, RLS, build ou deploy como concluídas.
