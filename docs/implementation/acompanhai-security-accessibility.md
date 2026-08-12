# Segurança, privacidade e acessibilidade

## Segurança

- Nenhum segredo no repositório, frontend ou logs.
- Convite aleatório, uso único, expiração, hash e revogação.
- Cookie de sessão `HttpOnly`, `Secure`, `SameSite=Lax`.
- Rate limit na troca de convite e endpoints sensíveis.
- RLS em todas as tabelas expostas.
- Webhooks Stripe com assinatura e idempotência.
- Logs estruturados sem PII desnecessária.
- Backup e restauração testados.

## Privacidade

- Coletar somente dados necessários ao acompanhamento.
- Não coletar diagnóstico, medicação, lesão, prontuário ou foto corporal no MVP.
- Explicar finalidade ao cliente antes do primeiro uso.
- Oferecer exportação, correção e exclusão conforme processo definido.
- Definir controlador, operador, retenção, suboperadores e transferências.
- Revisar LGPD, APPI e obrigações comerciais japonesas antes do pagamento real.

## Acessibilidade

- HTML semântico e headings em ordem.
- Labels e mensagens de erro associadas aos campos.
- `role="alert"` para erro e `role="status"` para sucesso quando apropriado.
- Foco visível e navegação por teclado.
- Alvos de toque confortáveis.
- Contraste mínimo de 4,5:1 para texto normal.
- Não transmitir significado somente por cor.
- Testar leitor de tela ou ferramenta equivalente.

## IA futura

IA fica fora do fluxo crítico do MVP. Não gerar orientação clínica, treino, dieta ou medicação automaticamente. Todo uso futuro terá revisão humana, política de dados, avaliação e fallback.
