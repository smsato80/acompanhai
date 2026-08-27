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
| Landing         | Produção               | Coletar interesse e testar mensagem                       |
| Auth            | Implementado/publicado | Homologar signup/login com conta controlada               |
| Schema Supabase | Implementado/publicado | Teste RLS negativo com duas organizações                  |
| Organizações    | Implementado            | Evoluir onboarding conforme entrevistas                   |
| Clientes        | Implementado            | Melhorar edição, arquivamento e isolamento E2E            |
| Planos          | Implementado básico     | Evoluir editor, ordenação e versionamento                 |
| Convites        | Implementado             | Homologar link usado, expirado e revogado                 |
| Check-ins       | Implementado             | Homologar idempotência e jornada do cliente               |
| Painel          | Implementado/publicado | Melhorar estados e detalhe da atenção                     |
| Billing         | Manual                   | Validar disposição a pagar antes de Stripe                |
| Privacidade     | Publicada                | Revisão jurídica e contato oficial                        |
| IA              | Fora da primeira versão  | Reavaliar após validar o fluxo central                    |
| Deploy          | Produção                 | Verificar cada release e registrar deployment             |

## Observação sobre a landing

O site está em [acompanhai.vercel.app](https://acompanhai.vercel.app). O repositório oficial está no [GitHub](https://github.com/smsato80/acompanhai), na branch `feature/mvp-app`, com produção validada no deployment `dpl_GiVEja6cGUZzbCWosfAUNKbujK9y`. O app funcional inclui `/login`, `/dashboard` e `/portal`.
