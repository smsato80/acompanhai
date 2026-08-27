# Histórico de mudanças

## 2026-08-27 — Redeploy de produção e verificação pública do piloto

- Verificado o HEAD `78c63ad` no worktree `feature/mvp-app`, sem alterações não commitadas.
- Revalidados `pnpm lint`, `pnpm typecheck`, `pnpm test` (4 testes unitários), `pnpm test:e2e` (11 smoke tests) e `pnpm build`.
- `pnpm format:check` continua pendente por 48 arquivos preexistentes; nenhuma formatação em massa foi aplicada.
- Publicado explicitamente em produção pela CLI autenticada da Vercel: deployment `dpl_BQHZKaxijwJDDaP3iykBoMTcV2So`, estado `READY`.
- Verificados publicamente `https://acompanhai.vercel.app`, `/pricing`, `/login`, `/portal`, `/terms` e `/privacy` com resposta HTTP `200`.
- A homologação com conta sintética autorizada, criação de cliente/plano, convite e check-in continua pendente; nenhum convite externo foi enviado.

## 2026-08-27 — Feedback das ações do painel publicado

- As ações de cadastro de cliente, publicação de plano e salvamento de check-in agora informam sucesso na própria tela após a gravação.
- Falhas de validação, ausência de espaço de trabalho e erro de persistência agora retornam mensagens genéricas e acionáveis, sem falhar silenciosamente.
- Revalidados 11 testes E2E, quatro testes unitários, lint, typecheck e build.
- Publicado o commit `51e3ede` e o deployment `dpl_8B61Xko7arUyTCajbFLKDkJnMnjk` em estado `READY`.

## 2026-08-27 — Captação real de interesse publicada

- O formulário “Quero testar” deixou de ser apenas local e passou a enviar leads para `/api/leads`.
- Adicionado consentimento explícito com link para a Política de privacidade.
- Criada a tabela `public.interest_leads` com RLS forçada, INSERT controlado e sem leitura/edição/exclusão por visitantes.
- Aplicada a migration `interest_leads` no Supabase `xwbfzyoltsbpbvsnlmfg`.
- Atualizada a Política de privacidade para explicar o uso dos dados de demonstração.
- Revalidados 11 testes E2E, quatro testes unitários, lint, typecheck e build.
- Publicado o commit `93ef425` e o deployment `dpl_63589xiiNa1ocAnKWyHfwRK899Wh`.

## 2026-08-27 — Atenção do painel tornada acionável

- A carteira passou a buscar os check-ins sem limitar artificialmente aos 20 registros mais recentes.
- A área “Atenção hoje” agora considera ausência de retorno, status parcial/não concluído, dificuldade igual ou superior a 4 e retorno atrasado no fuso da organização.
- O profissional passou a ver o motivo da atenção e, quando disponível, comentário e dificuldade do último check-in.
- Revalidados 11 testes E2E, quatro testes unitários, lint, typecheck e build.
- Publicado o commit `0246e54` e o deployment `dpl_F9NTMPjLpPHdnxyCjMX54qWWvxQE`.

## 2026-08-27 — Proteção de convites e recuperação de conta publicados

- Alterado o convite para não ser consumido durante o GET: o link abre uma confirmação e o POST realiza o resgate de uso único.
- Criada a tela de confirmação do portal e adicionada cobertura E2E para o comportamento.
- Criado fluxo de recuperação de senha com mensagem anti-enumeração, confirmação via `/auth/confirm` e atualização autenticada.
- Bloqueado redirecionamento externo no parâmetro `next` da confirmação de autenticação.
- Ajustado o logout do portal para voltar ao site em vez de exibir JSON bruto.
- Revalidados 11 testes E2E, quatro testes unitários, lint, typecheck e build.
- Publicado o deployment `dpl_9dcE5TuALAXc4LTE1xyc5oMTTQ6r`.

## 2026-08-27 — Onboarding e checks comerciais publicados

- Publicado o onboarding do profissional em três etapas: cliente, plano e check-in.
- O progresso do onboarding usa contagens reais da organização e aponta para os formulários do painel.
- Adicionados smoke tests para páginas comerciais, landing e portal sem convite válido.
- Revalidados lint, typecheck, quatro testes unitários, dez testes E2E e build.
- Enviado o commit `1012b1c` para `feature/mvp-app` no GitHub.
- Publicado o deployment `dpl_3HSq5uM4cw6NgNFY2qyuivtQsg2b` e verificados os aliases de produção.

## 2026-08-27 — Primeiro lançamento vendável publicado

- Removido o marcador provisório do nome público; o produto usa somente AcompanhAí.
- Criado o portal mobile do cliente com plano, check-in e resposta de dificuldade/comentário.
- Criado fluxo de convite com token de uso único, hash no banco, expiração, revogação e sessão HttpOnly.
- Aplicadas as migrations `sellable_client_portal`, `grant_portal_invite_access` e `harden_portal_rpc_exposure` no Supabase `xwbfzyoltsbpbvsnlmfg`.
- Movidas as implementações privilegiadas das RPCs para `private`, com wrappers públicos `SECURITY INVOKER`.
- Atualizada a landing para deixar claro o público, incluir SVGs, mockup funcional e rodapé SatoTech.
- Criadas as páginas públicas de planos, termos e privacidade.
- Adicionado onboarding do profissional em três etapas, com progresso calculado a partir dos dados reais do painel.
- Adicionados seis smoke tests E2E para páginas comerciais, landing e portal sem convite válido.
- Validados `lint`, `typecheck`, dez testes E2E, quatro testes unitários e `build`.
- Publicada a primeira produção no Vercel no deployment `dpl_GiVEja6cGUZzbCWosfAUNKbujK9y`; a atualização posterior está registrada no marco de onboarding acima.
- Registrada a pendência real: homologar o fluxo com uma conta profissional e um cliente controlado.

## 2026-08-27 — Documentação consolidada

- Sincronizados o estado atual, status de implementação, inventário, runbook de deploy, configuração Supabase, arquitetura, testes e README.
- Mantidos os registros históricos de 12 e 13 de agosto, agora distinguidos do estado vigente.
- Registrado que a próxima etapa não é mais publicar o app, e sim homologar a jornada real e testar isolamento entre organizações.

## 2026-08-13 — Landing premium refinada e publicada

- Trocados os indicadores numéricos dos benefícios por ícones SVG inline, mantendo acessibilidade e sem dependências externas.
- Atualizado o rodapé para `Desenvolvido por SatoTech · Soluções Inteligentes`.
- Refeito o mockup com navegação lateral, métricas, carteira de clientes, alertas e gráfico de ritmo semanal usando dados fictícios.
- Tornado explícito no hero e na seção de benefícios que o primeiro público é formado por personal trainers brasileiros que atendem no Japão.
- Publicado o redeploy de produção na Vercel após `lint`, `typecheck`, build e quatro testes E2E aprovados.

## 2026-08-13 — Landing de demonstração implementada localmente

- Implementadas as seções hero, mockup de painel, benefícios, fluxo, formulário de interesse e rodapé.
- Registrado que o formulário confirma localmente, sem persistir dados ou realizar chamadas de rede.
- Adicionada cobertura Playwright para a apresentação da home e para a confirmação local do formulário sem requisição de lead.
- A publicação em GitHub e Vercel continua pendente das próximas tasks; não há URL pública registrada.

## 2026-08-13 — Primeiro marco funcional do MVP

- Criado o branch isolado `feature/mvp-app` para não alterar o `master` diretamente.
- Implementados login/cadastro por e-mail, confirmação de e-mail, proteção de sessão e painel do profissional.
- Implementadas organizações, membros, clientes, planos e check-ins com isolamento por `organization_id`.
- Aplicada a migration `mvp_core_schema` no projeto Supabase de Tóquio, com RLS em todas as tabelas do núcleo.
- Criada migration de endurecimento de `search_path`; advisors de segurança retornaram sem lints.
- Adicionados smoke tests para login e proteção do dashboard.

## 2026-08-13 — Documentação inicial

- Consultado o padrão documental do projeto Peso Leve.
- Definido o AcompanhAí como produto separado, mas potencialmente complementar ao Peso Leve.
- Registrado o posicionamento inicial em profissionais brasileiros no Japão.
- Registrada a moeda JPY.
- Alinhadas as hipóteses iniciais: teste gratuito, ¥980/mês e ¥1.980/mês.
- Criada a documentação modular do produto.

## 2026-08-12 — Estratégia e conceito

- Analisada a ideia do vídeo de SaaS para personal trainers.
- Escolhido o motor de acompanhamento e retenção.
- Criadas as páginas estratégicas Brasil/Japão, Dark Moderno e Premium Sofisticado.
- Criado o plano mestre de produto e implementação.

## Regra do histórico

Registrar decisões e alterações relevantes com data, motivo, evidência e impacto. Não registrar segredos ou dados pessoais.
