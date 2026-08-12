# Status de implementação

## Legenda

- **Não iniciado:** não existe código funcional.
- **Especificado:** requisitos e critérios definidos.
- **Em desenvolvimento:** código em trabalho, sem garantia de conclusão.
- **Implementado localmente:** funciona em ambiente local, ainda precisa de homologação.
- **Homologado:** testado no ambiente correspondente.
- **Produção:** publicado e verificado.

## Status atual

| Área         | Estado                  | Próximo passo                            |
| ------------ | ----------------------- | ---------------------------------------- |
| Produto      | Especificado            | Entrevistas                              |
| Landing      | Implementado localmente | Homologar e publicar nas próximas tasks  |
| Auth         | Especificado            | Fundação e Supabase                      |
| Organizações | Especificado            | Schema e RLS                             |
| Clientes     | Especificado            | CRUD e testes de isolamento              |
| Planos       | Especificado            | Modelo versionado                        |
| Convites     | Especificado            | Token, hash, expiração e sessão          |
| Check-ins    | Especificado            | Idempotência e data de Tóquio            |
| Painel       | Especificado            | Lista de atenção                         |
| Billing      | Especificado            | Stripe test mode                         |
| Privacidade  | Requisitos definidos    | Revisão jurídica                         |
| IA           | Fora do MVP             | Reavaliar após piloto                    |
| Deploy       | Não iniciado            | Concluir GitHub e Vercel; URLs pendentes |

## Observação sobre a landing

A landing é uma demonstração implementada apenas no ambiente local. Ela não está homologada nem em produção. O formulário confirma o interesse localmente, sem persistência ou chamadas de rede.
