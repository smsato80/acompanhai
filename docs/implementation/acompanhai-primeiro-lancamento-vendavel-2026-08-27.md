# Evidência de implementação — Primeiro lançamento vendável

**Data:** 27 de agosto de 2026  
**Produto:** AcompanhAí  
**Repositório oficial:** `D:\SatoTech\acompanhai`  
**Worktree:** `D:\SatoTech\acompanhai\.worktrees\mvp-app`

## Estado entregue nesta etapa

- O nome público do produto é somente **AcompanhAí**.
- Landing com público explícito: personal trainers e profissionais de acompanhamento.
- Benefícios com ícones SVG consistentes.
- Mockup que demonstra clientes, planos, check-ins e atenção.
- Rodapé com o texto exato: `Desenvolvido por SatoTech · Soluções Inteligentes`.
- Páginas públicas `/pricing`, `/terms` e `/privacy`.
- Convite de cliente com token aleatório, hash SHA-256 persistido e validade de sete dias.
- Sessão de cliente em cookie HttpOnly, Secure em produção, SameSite=Lax e validade de 24 horas.
- Portal mobile em `/portal` com plano vigente e check-in.
- Check-in com status, dificuldade de 1 a 5 e comentário de até 500 caracteres.
- RPCs do portal com implementação privilegiada no schema `private` e wrappers públicos `SECURITY INVOKER`.
- Criação de plano no painel já publica um primeiro item estruturado para tornar o fluxo demonstrável.

## Supabase

Projeto AcompanhAí: `xwbfzyoltsbpbvsnlmfg`, região `ap-northeast-1`, estado confirmado `ACTIVE_HEALTHY` após restauração.

Projetos da organização no Free:

- `acompanhai`: ativo e saudável.
- `carrosseria`: ativo e saudável.
- `peso-leve`: pausado, preservado sem exclusão.

Migrations aplicadas remotamente:

- `sellable_client_portal`
- `grant_portal_invite_access`
- `harden_portal_rpc_exposure`

O advisor de segurança não aponta mais RPC pública `SECURITY DEFINER`. O único aviso restante é informativo e intencional: `client_sessions` tem RLS habilitado sem policy direta, além de não possuir grants para `anon`/`authenticated`; o acesso ocorre exclusivamente pelas funções controladas.

## Validação executada

No worktree de implementação:

```text
pnpm lint       PASS
pnpm typecheck  PASS
pnpm test       PASS — 3 arquivos, 4 testes
pnpm test:e2e   PASS — 4 testes
pnpm build      PASS
```

Busca de regressão de marca:

```text
rg -n -i "pilot1|pilot 1" app components lib supabase tests
PASS — nenhuma referência no produto ou testes
```

O build ainda mostra o aviso conhecido do Supabase Realtime sendo incluído no Middleware Edge; isso já existia na base e não impede a compilação.

## Limites conhecidos

- Convite e ativação comercial ainda são manuais.
- Não há Stripe, mensagens automáticas, WhatsApp/LINE oficial ou IA em produção.
- A criação de plano está simples nesta primeira versão; o próximo incremento pode adicionar editor/reordenação de itens.
- O fluxo de homologação com uma conta profissional e um cliente real ainda precisa ser executado no ambiente de preview/produção com usuário autorizado.

## Publicação realizada

- Commit: `1857e03 feat: prepare acompanhai for first sellable release`.
- GitHub: branch `feature/mvp-app` enviada para `https://github.com/smsato80/acompanhai`.
- Vercel deployment: `dpl_GiVEja6cGUZzbCWosfAUNKbujK9y`.
- Produção: `https://acompanhai.vercel.app`.
- Alias do deployment: `https://acompanhai-cnw0s50sx-smsato80s-projects.vercel.app`.
- Estado do deployment: `READY`.

Verificação HTTP em produção:

- `/` → `200`.
- `/pricing` → `200`.
- `/terms` → `200`.
- `/privacy` → `200`.
- `/portal` → `200`.
- `/dashboard` sem sessão → `307` para login.
- Landing contém o rodapé SatoTech, o público de personal trainers e o mockup de plano/check-in.
- Landing não contém o nome removido do produto.

## Próximo passo de homologação

Executar com uma conta profissional autorizada: criar cliente, criar plano, gerar convite, abrir o link em celular e enviar o primeiro check-in. Essa é a única validação ainda pendente para confirmar o fluxo completo com dados reais de teste controlados.
