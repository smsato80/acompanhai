# Marco de fundação — AcompanhAí

**Data:** 2026-08-13  
**Status:** concluído localmente

## Entregue

- Repositório oficial em `D:\SatoTech\acompanhai`.
- Documentação modular importada no mesmo padrão usado no Peso Leve.
- Aplicação web mínima com Next.js, TypeScript estrito e Tailwind.
- Home inicial dark moderna em português brasileiro.
- Scripts de lint, formatação, typecheck, teste unitário e build.
- Smoke test Playwright configurado.
- Clientes Supabase separados para browser e server, sem service role no frontend.
- Projeto Supabase `acompanhai` criado na região `ap-northeast-1` (Tóquio), saudável e sem tabelas de negócio.

## Verificações

- `pnpm lint`: aprovado.
- `pnpm typecheck`: aprovado.
- `pnpm test`: aprovado.
- `pnpm build`: aprovado.
- `pnpm test:e2e`: ainda precisa de uma execução dedicada com o servidor local disponível; a tentativa automatizada excedeu o limite de tempo.

## Próximo marco

Implementar autenticação, organizações, profissionais, clientes, links de acesso e RLS em migrations revisadas. A cobrança, IA e integrações externas continuam fora desta etapa.
