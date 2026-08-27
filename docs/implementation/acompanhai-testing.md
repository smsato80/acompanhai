# Testes e validação

> Atualizado em 2026-08-27: lint, typecheck, 4 testes unitários, 11 smoke E2E e build passam; `format:check` ainda aponta 48 arquivos preexistentes; a homologação com conta real e teste negativo de RLS continuam pendentes.

## Comandos esperados

```powershell
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

## Cobertura necessária

- Validação de domínio e schemas.
- Datas em `Asia/Tokyo`.
- Convites expirados, usados e revogados.
- Sessão sem acesso a outro cliente.
- Check-in idempotente e edição após 24 horas.
- RLS com duas organizações.
- Webhook Stripe válido, repetido e inválido.
- Assinatura cancelada e inadimplente.
- Exportação e exclusão.
- Estados loading, vazio, sucesso e erro.
- Feedback de sucesso e erro nas ações principais do painel.
- Páginas comerciais, remoção do nome provisório e bloqueio do portal sem convite válido.
- Confirmação do convite antes do resgate, recuperação de senha sem enumeração e proteção do redirecionamento de autenticação.
- Teclado, foco, contraste e telas de 390px, 768px e desktop.

## Gates

### Fundação

Lint, tipos, testes e build verdes; migrations aplicadas; RLS habilitada; advisor sem alertas públicos de RPC `SECURITY DEFINER`. O aviso informativo de `client_sessions` sem policy direta é intencional. O isolamento negativo com duas contas ainda é gate de homologação.

### Homologação vendável

Fluxo profissional/cliente E2E com conta autorizada, convite usado/expirado/revogado, RLS testada, suporte e ativação manual definidos.

### Produção paga

Stripe live, webhook verificado, termos e privacidade publicados, impostos e cancelamento aprovados, cinco pilotos concluídos.

## O que não contar como aprovado

- Build verde sem teste de RLS.
- Mock de Stripe sem webhook real em test mode.
- Teste unitário sem comportamento observado.
- Inspeção CSS sem renderização visual.
- Teste com uma única organização.
