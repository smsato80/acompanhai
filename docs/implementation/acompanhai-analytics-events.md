# Eventos e analytics

## Princípio

Instrumentar aprendizado do produto sem coletar nomes, contatos, comentários, tokens, dados de saúde ou conteúdo de check-in.

## Eventos planejados

- `professional_signed_up`
- `client_created`
- `plan_published`
- `invite_issued`
- `invite_exchanged`
- `checkin_submitted`
- `attention_opened`
- `checkout_started`
- `subscription_activated`
- `export_requested`

## Propriedades permitidas

- ID pseudônimo.
- Ambiente.
- Timestamp.
- Versão do produto.
- Tipo de plano.
- Estado agregado.
- Região ampla, somente se necessária.

## Propriedades proibidas

- Nome, e-mail, telefone e LINE/WhatsApp.
- Token ou URL de convite.
- Comentário do cliente.
- Diagnóstico, peso, lesão ou qualquer dado clínico.
- Chaves, cookies ou dados de cartão.

## Métricas principais

Ativação do profissional, primeiro check-in, clientes com check-in semanal, uso recorrente, economia de tempo percebida e conversão de piloto para pagamento.

## Status

Analytics externo ainda não implementado. Durante o MVP, pode haver registro local ou nenhum analytics até a política e o fornecedor serem aprovados.
