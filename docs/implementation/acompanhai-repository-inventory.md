# Inventário do repositório

## Estado atual

O repositório oficial existe em `D:\SatoTech\acompanhai` e está publicado em https://github.com/smsato80/acompanhai. A implementação do app está na branch `feature/mvp-app`; a produção está em https://acompanhai.vercel.app.

## Artefatos históricos do workspace temporário

- `docs/acompanhai-plano-completo.md`: plano mestre.
- `docs/acompanhai/`: documentação modular inicial.
- `outputs/estrategia-acompanha-ai-brasil-japao.html`: página estratégica.
- `outputs/acompanha-ai-dark-moderno.html`: variação Dark.
- `outputs/acompanha-ai-premium-sofisticado.html`: variação Premium.

## Estrutura atual do repositório oficial

```text
acompanhai/
├─ app/                 # landing, auth, dashboard e portal
├─ components/          # landing, dashboard e portal
├─ docs/implementation/ # estado, histórico, runbooks e evidências
├─ docs/superpowers/    # specs e planos aprovados
├─ lib/                 # Supabase, tokens e contratos do portal
├─ supabase/migrations/ # schema, RLS e funções controladas
├─ tests/               # unitários e smoke E2E
├─ .env.example
└─ package.json
```

## Regra de inventário

Atualizar este arquivo quando uma área for criada, removida, publicada ou mudar de estado. Não incluir `node_modules`, `.env`, dumps, tokens ou anexos temporários.
