# AcompanhAí — Configuração inicial do Supabase

**Atualizado em:** 2026-08-27
**Status:** projeto restaurado e saudável; núcleo e portal aplicados

## Projeto

- **Nome:** `acompanhai`
- **Project ref:** `xwbfzyoltsbpbvsnlmfg`
- **Região:** `ap-northeast-1` (Tóquio)
- **Banco:** PostgreSQL 17
- **URL pública:** `https://xwbfzyoltsbpbvsnlmfg.supabase.co`
- **Status no momento da criação:** `ACTIVE_HEALTHY`

## Estado atual

O projeto foi restaurado na organização conectada do Supabase Free e está em `ACTIVE_HEALTHY`. O núcleo multi-tenant e o portal do cliente estão aplicados como migrations versionadas. O projeto Peso Leve permanece pausado para manter dois projetos ativos no plano Free.

## Variáveis locais

O arquivo `.env.example` deve conter somente os nomes abaixo:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Os valores reais devem ficar apenas em `.env.local` ou no gerenciador de secrets do ambiente de deploy. A chave `service_role` nunca deve ser usada no navegador nem colocada em `NEXT_PUBLIC_*`.

## Migrations aplicadas

- `mvp_core_schema`
- `harden_function_search_paths`
- `sellable_client_portal`
- `grant_portal_invite_access`
- `harden_portal_rpc_exposure`

## Próximo passo Supabase

O próximo marco é executar homologação com conta profissional e cliente controlados, testar revogação/expiração e realizar o teste negativo de isolamento entre duas organizações. Novas alterações devem continuar como migrations versionadas depois de revisão de segurança.

## Observação de operação

A região de Tóquio foi escolhida para reduzir a latência do operador no Japão e do público brasileiro no primeiro estágio. A experiência para usuários no Brasil deverá ser medida antes de decidir qualquer arquitetura multi-região.
