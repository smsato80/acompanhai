# Status de implementação

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
| Produto         | Especificado         | Entrevistas                                               |
| Landing         | Produção             | Manter a demonstração publicada e coletar interesse local |
| Auth            | Implementado localmente | Homologar signup/login com conta de teste                |
| Schema Supabase | Implementado localmente | Teste RLS negativo com duas organizações                 |
| Organizações    | Implementado localmente | Conectar onboarding/editoração do espaço                  |
| Clientes        | Implementado localmente | CRUD completo e testes de isolamento                      |
| Planos          | Implementado localmente | Evoluir editor de conteúdo e publicação                   |
| Convites        | Especificado         | Token, hash, expiração e sessão                           |
| Check-ins       | Implementado localmente | Validar idempotência e jornada do cliente                |
| Painel          | Implementado localmente | Melhorar estados de erro, loading e detalhe              |
| Billing         | Especificado         | Stripe test mode                                          |
| Privacidade     | Requisitos definidos | Revisão jurídica                                          |
| IA              | Fora do MVP          | Reavaliar após piloto                                     |
| Deploy          | Produção             | GitHub e Vercel publicados e verificados                  |

## Observação sobre a landing

A landing de demonstração está em produção em [acompanhai.vercel.app](https://acompanhai.vercel.app). O repositório oficial é `D:\SatoTech\acompanhai`, publicado no [GitHub](https://github.com/smsato80/acompanhai), com `origin/master` em `14745cc`. O projeto Vercel usa o framework `nextjs` e o deployment está `Ready`.

O formulário continua confirmando o interesse localmente, sem persistência. O app funcional está em `/login` e `/dashboard`; a publicação do branch MVP ainda precisa ser executada após a revisão final.
