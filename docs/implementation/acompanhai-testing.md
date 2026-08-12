# Testes e validação

> Nenhum teste de aplicação existe ainda; esta é a matriz planejada.

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
- Teclado, foco, contraste e telas de 390px, 768px e desktop.

## Gates

### Fundação

Lint, tipos, testes e build verdes; migration limpa; isolamento comprovado.

### Piloto

Fluxo profissional/cliente E2E, convite seguro, backup restaurado, RLS testada e suporte definido.

### Produção paga

Stripe live, webhook verificado, termos e privacidade publicados, impostos e cancelamento aprovados, cinco pilotos concluídos.

## O que não contar como aprovado

- Build verde sem teste de RLS.
- Mock de Stripe sem webhook real em test mode.
- Teste unitário sem comportamento observado.
- Inspeção CSS sem renderização visual.
- Teste com uma única organização.
