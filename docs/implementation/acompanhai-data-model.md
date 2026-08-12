# Modelo de dados

## Entidades previstas

| Entidade               | Responsabilidade                          |
| ---------------------- | ----------------------------------------- |
| `profiles`             | identidade e preferências do profissional |
| `organizations`        | unidade de cobrança e isolamento          |
| `organization_members` | vínculo e papel do usuário                |
| `clients`              | clientes acompanhados                     |
| `plan_templates`       | modelos reutilizáveis                     |
| `plans`                | versão ativa ou encerrada para cliente    |
| `plan_items`           | atividades do plano                       |
| `plan_versions`        | histórico imutável de publicação          |
| `client_invites`       | hash, validade, uso e revogação           |
| `client_sessions`      | sessão limitada do cliente                |
| `check_ins`            | respostas diárias e observações           |
| `subscriptions`        | estado da assinatura SaaS                 |
| `stripe_events`        | idempotência e auditoria de webhooks      |
| `audit_logs`           | ações sensíveis                           |
| `privacy_requests`     | exportação, correção e exclusão           |

## Regras

- Chaves primárias UUID.
- `organization_id` em entidades de negócio.
- Datas de sistema em `timestamptz`.
- Data do check-in como `date` em `Asia/Tokyo`.
- Comentário do cliente limitado a 500 caracteres.
- Convite nunca armazena token em texto puro.
- Respostas históricas não mudam quando o plano é editado.
- RLS e testes negativos por organização.

## Papéis

- `platform_admin`: operação excepcional e auditada.
- `owner`: controle da própria organização.
- `member`: reservado para pós-MVP.
- `client_session`: acesso apenas ao cliente correspondente.
- `service_role`: exclusivamente server-side.
