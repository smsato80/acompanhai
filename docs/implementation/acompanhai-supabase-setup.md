# AcompanhAí — Configuração inicial do Supabase

**Atualizado em:** 2026-08-13  
**Status:** projeto criado e saudável; schema de negócio ainda não aplicado

## Projeto

- **Nome:** `acompanhai`
- **Project ref:** `xwbfzyoltsbpbvsnlmfg`
- **Região:** `ap-northeast-1` (Tóquio)
- **Banco:** PostgreSQL 17
- **URL pública:** `https://xwbfzyoltsbpbvsnlmfg.supabase.co`
- **Status no momento da criação:** `ACTIVE_HEALTHY`

## Estado atual

O projeto foi criado na organização conectada do Supabase com custo mensal informado de ¥0 na criação. Nenhuma tabela de produto, função, bucket ou política RLS foi criada nesta etapa.

## Variáveis locais

O arquivo `.env.example` deve conter somente os nomes abaixo:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Os valores reais devem ficar apenas em `.env.local` ou no gerenciador de secrets do ambiente de deploy. A chave `service_role` nunca deve ser usada no navegador nem colocada em `NEXT_PUBLIC_*`.

## Próximo passo Supabase

O próximo marco é modelar organizações, profissionais, clientes, links de acesso, planos e check-ins. Antes de expor qualquer tabela pelo Data API, cada tabela deverá ter RLS e políticas que restrinjam o acesso ao tenant correto. A modelagem deve ser criada como migration versionada depois de uma revisão de segurança.

## Observação de operação

A região de Tóquio foi escolhida para reduzir a latência do operador no Japão e do público brasileiro no primeiro estágio. A experiência para usuários no Brasil deverá ser medida antes de decidir qualquer arquitetura multi-região.
