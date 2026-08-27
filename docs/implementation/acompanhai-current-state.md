# Estado atual do AcompanhAí

**Atualizado em:** 2026-08-27
**Fonte principal:** branch `feature/mvp-app` no repositório oficial

## Resumo executivo

O AcompanhAí deixou a fase de landing e possui uma primeira versão web vendável em produção. O profissional pode criar clientes e planos, gerar um convite de uso único, compartilhar o link manualmente e receber um check-in no portal mobile do cliente.

O produto continua direcionado primeiro a personal trainers e profissionais brasileiros que acompanham clientes no Brasil e no Japão. A interface está em português e os preços de referência estão em ienes.

## Repositório e publicação

- Repositório oficial: `D:\SatoTech\acompanhai`.
- Worktree de implementação: `D:\SatoTech\acompanhai\.worktrees\mvp-app`.
- Branch: `feature/mvp-app`.
- HEAD de código verificado: `78c63ad` (`docs: refresh deployment runbook`).
- Site: [acompanhai.vercel.app](https://acompanhai.vercel.app).
- Deployment de produção validado nesta execução: `dpl_9piYZhXPHacn69sNUpvFoVbfFbDj`.
- Estado do deployment: `READY`.

## O que existe hoje

- Landing dark premium com público explícito, benefícios em SVG, mockup de plano/check-in/atenção e rodapé SatoTech.
- Formulário “Quero testar” com consentimento explícito e persistência controlada de leads no Supabase.
- `/login` com cadastro e entrada por e-mail/senha.
- Recuperação de senha por e-mail e atualização de senha após confirmação segura.
- `/dashboard` protegido para o profissional.
- Clientes, planos publicados e check-ins persistidos por organização.
- Convites com token aleatório, hash SHA-256 persistido, validade de sete dias e uso único; o GET apenas mostra confirmação e o resgate ocorre no POST.
- Sessão do cliente por cookie HttpOnly, com validade de 24 horas.
- `/portal` com plano vigente, itens do acompanhamento e formulário de check-in.
- Onboarding do profissional em três etapas, com progresso baseado em clientes, planos e check-ins reais.
- Atenção acionável no painel: falta de retorno, retorno parcial/não concluído, dificuldade alta e retorno atrasado, com motivo e comentário visíveis.
- Ações de cliente, plano e check-in com feedback explícito de sucesso ou erro na própria tela do painel.
- `/pricing`, `/terms` e `/privacy` publicados.
- Migrations versionadas em `supabase/migrations/`.
- Documentação do produto, arquitetura, segurança, testes e processo em `docs/`.

## Estado Supabase Free

Projeto AcompanhAí: `xwbfzyoltsbpbvsnlmfg`, região `ap-northeast-1`, estado `ACTIVE_HEALTHY`.

Na mesma organização:

- `acompanhai`: ativo.
- `carrosseria`: ativo.
- `peso-leve`: pausado e preservado.

As migrations de portal, grants e endurecimento das RPCs foram aplicadas no projeto AcompanhAí. O advisor de segurança não aponta RPC pública `SECURITY DEFINER`; resta apenas o aviso informativo sobre `client_sessions` sem policy direta, pois a tabela não é acessível diretamente pelas roles de aplicação.

## Classificação de implementação

| Área | Estado | Evidência ou pendência |
| --- | --- | --- |
| Produto e posicionamento | Em validação comercial | Público inicial e preços de referência definidos |
| Landing | Produção | Captação de interesse publicada; medir conversão e atendimento |
| Auth | Implementado e publicado | Homologar cadastro, login e recuperação com conta real |
| Organizações e RLS | Implementado | Isolamento negativo com duas contas ainda é teste pendente |
| Clientes | Implementado | CRUD básico e convite manual |
| Planos | Implementado básico | Criação publica um item estruturado; editor avançado é próximo passo |
| Convites | Implementado | Confirmação antes do resgate, token único, hash, expiração, revogação e sessão |
| Portal do cliente | Implementado | `/portal` e endpoints de resgate/check-in publicados |
| Check-ins | Implementado | Status, dificuldade, comentário e snapshot do plano |
| Painel | Implementado/publicado | Onboarding, carteira, atenção, geração de link e feedback das ações |
| Billing | Manual | Sem Stripe, cobrança automática ou webhook |
| Privacidade | Publicada | Revisão jurídica profissional ainda pendente |
| IA | Fora da primeira versão | Avaliar após validação do fluxo principal |
| Deploy | Produção | GitHub, Vercel e rotas públicas verificados |
| Leads | Implementado/publicado | Consultar e atender os registros no Supabase; rate limit ainda pendente |

## Validação realizada

```text
pnpm lint       PASS
pnpm typecheck  PASS
pnpm test       PASS — 3 arquivos, 4 testes
pnpm test:e2e   PASS — 11 testes
pnpm build      PASS
```

Verificação online no deployment `dpl_9piYZhXPHacn69sNUpvFoVbfFbDj`: `/`, `/pricing`, `/login`, `/portal`, `/terms` e `/privacy` retornaram `200`; o deployment está `READY` e foi associado ao alias de produção. A suíte E2E local cobriu 11 smoke tests, incluindo proteção do dashboard, confirmação do portal sem resgate automático, token inválido, páginas comerciais, landing e consentimento do lead. A homologação com conta autorizada continua pendente.

## Próxima validação obrigatória

Executar o fluxo com uma conta autorizada e dados controlados: criar conta, cadastrar cliente, criar plano, gerar convite, abrir no celular e enviar check-in. Depois testar revogação/expiração e isolamento entre duas organizações.

## Limites conhecidos

- Envio de mensagens, ativação comercial e cobrança são manuais.
- Não há integração automática com WhatsApp/LINE, Stripe, IA ou aplicativo nativo.
- Rate limit dos endpoints sensíveis ainda não foi implementado; leads podem ser consultados no painel do Supabase, mas ainda não há caixa de entrada administrativa no app.
- A primeira versão não deve receber dados clínicos, fotos, documentos ou informações sensíveis desnecessárias.
