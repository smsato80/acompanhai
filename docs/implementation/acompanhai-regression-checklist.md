# Checklist de regressão

## Fundação

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] Migrations executam em banco limpo

## Autenticação e isolamento

- [ ] Cadastro e login
- [ ] Recuperação de senha
- [ ] Logout
- [ ] Duas organizações isoladas
- [ ] Cliente não acessa outro cliente
- [ ] Nenhum segredo aparece no navegador

## Fluxo principal

- [ ] Criar cliente
- [ ] Criar e publicar plano
- [ ] Gerar convite
- [ ] Trocar convite por sessão
- [ ] Link usado/expirado/revogado bloqueado
- [ ] Cliente registra check-in
- [ ] Retry não duplica check-in
- [ ] Profissional vê atenção e histórico

## Billing

- [ ] Checkout test mode em JPY
- [ ] Webhook válido processado uma vez
- [ ] Webhook inválido rejeitado
- [ ] Portal abre para assinatura correta
- [ ] Cancelamento mantém acesso até data confirmada

## UX e acessibilidade

- [ ] 390px sem overflow
- [ ] 768px sem overflow
- [ ] Desktop sem cortes
- [ ] Teclado e foco visível
- [ ] Contraste verificado
- [ ] Mensagens em português
- [ ] Leitor de tela revisado

## Privacidade e operação

- [ ] Política e termos publicados
- [ ] Exportação funciona
- [ ] Solicitação de exclusão registrada
- [ ] Logs não contêm PII desnecessária
- [ ] Backup restaurado em ensaio
- [ ] Runbook atualizado
