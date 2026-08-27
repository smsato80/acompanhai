# Status de implementação

**Atualizado em:** 2026-08-27
**Documento consolidado:** para detalhes e evidências, consulte [acompanhai-current-state.md](./acompanhai-current-state.md) e [acompanhai-primeiro-lancamento-vendavel-2026-08-27.md](./acompanhai-primeiro-lancamento-vendavel-2026-08-27.md).

## Legenda

- **Não iniciado:** não existe código funcional.
- **Especificado:** requisitos e critérios definidos.
- **Em desenvolvimento:** código em trabalho, sem garantia de conclusão.
- **Implementado localmente:** funciona em ambiente local, ainda precisa de homologação.
- **Homologado:** testado no ambiente correspondente.
- **Produção:** publicado e verificado.

## Status atual

| Área            | Estado               | Próximo passo                                             |
| --------------- | -------------------- | --------------------------------------------------------- |
| Produto         | Em validação comercial | Entrevistas com profissionais iniciais                  |
| Landing         | Produção               | Atender leads e medir conversão da mensagem               |
| Auth            | Implementado/publicado | Homologar signup/login/reset com conta controlada         |
| Schema Supabase | Implementado/publicado | Teste RLS negativo com duas organizações                  |
| Organizações    | Implementado            | Evoluir onboarding conforme entrevistas                   |
| Clientes        | Implementado            | Melhorar edição, arquivamento e isolamento E2E            |
| Planos          | Implementado básico     | Evoluir editor, ordenação e versionamento                 |
| Convites        | Implementado             | Homologar confirmação, link usado, expirado e revogado    |
| Check-ins       | Implementado             | Homologar idempotência e jornada do cliente               |
| Painel          | Implementado/publicado | Homologar onboarding, atenção e feedback das ações com conta profissional |
| Billing         | Manual                   | Validar disposição a pagar antes de Stripe                |
| Privacidade     | Publicada                | Revisão jurídica e contato oficial                        |
| IA              | Fora da primeira versão  | Reavaliar após validar o fluxo central                    |
| Deploy          | Produção                 | Verificar cada release e registrar deployment             |
| Leads           | Implementado/publicado  | Criar rotina de atendimento e avaliar rate limit           |

## Observação sobre a landing

O site está em [acompanhai.vercel.app](https://acompanhai.vercel.app). O repositório oficial está no [GitHub](https://github.com/smsato80/acompanhai), na branch `feature/mvp-app`, com produção validada no deployment `dpl_8B61Xko7arUyTCajbFLKDkJnMnjk`. O app funcional inclui `/login`, `/dashboard`, `/portal`, confirmação de convite e recuperação de senha; o painel também apresenta onboarding, atenção baseada nos dados reais da organização e feedback explícito para as ações principais.
