# Landing de demonstração do AcompanhAí

> Estado vigente: o formulário agora registra leads com consentimento no Supabase. As notas abaixo preservam a descrição da primeira versão local da landing.

## Estado

A landing de demonstração está pública em produção em https://acompanhai.vercel.app.

O código-fonte está disponível em https://github.com/smsato80/acompanhai.

## Seções da página

- **Hero:** apresenta a proposta de acompanhamento e direciona à área de interesse.
- **Mockup de painel:** ilustra métricas e uma chamada de atenção semanal. Todos os valores exibidos no painel são dados fictícios de demonstração.
- **Benefícios:** resume os ganhos de organização e acompanhamento para o profissional.
- **Fluxo:** apresenta, em etapas, como o AcompanhAí apoia a rotina de acompanhamento.
- **Formulário de interesse:** solicita nome e e-mail obrigatórios, WhatsApp opcional e consentimento para registrar a manifestação de interesse.
- **Rodapé:** encerra a página com informações institucionais e de demonstração.

## CTA e formulário

O texto do CTA é exatamente `Quero testar`. Ele direciona à seção do formulário de interesse. Na versão vigente, o envio passa por `/api/leads` e grava somente os dados autorizados na tabela protegida `public.interest_leads`; a interface exibe confirmação após resposta positiva.

## Fora de escopo desta demonstração

- Login e autenticação.
- Caixa de entrada administrativa e atendimento automático dos leads.
- Billing e cobrança.
- Integração com WhatsApp.
- Prescrição por IA.
- Analytics externo.

## Publicação

A landing está pública em produção em https://acompanhai.vercel.app.

O repositório GitHub é https://github.com/smsato80/acompanhai.

O formulário permanece local e não persistente: os dados não são armazenados e não há chamadas de rede no envio.
