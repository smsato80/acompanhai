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
| Auth            | Especificado         | Implementar fundação e Supabase                           |
| Schema Supabase | Não iniciado         | Modelagem, migrations e RLS                               |
| Organizações    | Especificado         | Schema e RLS                                              |
| Clientes        | Especificado         | CRUD e testes de isolamento                               |
| Planos          | Especificado         | Modelo versionado                                         |
| Convites        | Especificado         | Token, hash, expiração e sessão                           |
| Check-ins       | Especificado         | Idempotência e data de Tóquio                             |
| Painel          | Especificado         | Lista de atenção                                          |
| Billing         | Especificado         | Stripe test mode                                          |
| Privacidade     | Requisitos definidos | Revisão jurídica                                          |
| IA              | Fora do MVP          | Reavaliar após piloto                                     |
| Deploy          | Produção             | GitHub e Vercel publicados e verificados                  |

## Observação sobre a landing

A landing de demonstração está em produção em [acompanhai.vercel.app](https://acompanhai.vercel.app). O repositório oficial é `D:\SatoTech\acompanhai`, publicado no [GitHub](https://github.com/smsato80/acompanhai), com `origin/master` em `14745cc`. O projeto Vercel usa o framework `nextjs` e o deployment está `Ready`.

O formulário confirma o interesse localmente, sem persistência ou chamadas ao Supabase. Os demais fluxos de produto, Auth e schema do Supabase ainda não foram implementados.
