# Processo de desenvolvimento

## Forma de trabalho

1. Inspecionar o estado real do repositório.
2. Ler o documento de contexto e os documentos diretamente relacionados.
3. Fazer uma mudança pequena e verificável.
4. Rodar testes proporcionais ao risco.
5. Registrar o que mudou, o que foi validado e o que ficou pendente.
6. Só publicar, cobrar ou alterar dados externos com autorização explícita.

## Regras

- Responder e documentar em português brasileiro.
- Usar `apply_patch` para edições.
- Preservar alterações locais existentes.
- Nunca colocar chaves, tokens, `.env`, dados reais ou senhas no Git.
- Não tratar mock como integração real.
- Não declarar recurso pronto sem teste ou evidência.
- Separar claramente implementado, preparado, parcial e pendente.

## Ordem recomendada

1. Fundação do repositório.
2. Auth, organização e isolamento.
3. Cliente, plano e publicação.
4. Convite e sessão do cliente.
5. Check-in e painel.
6. Stripe em modo de teste.
7. Privacidade, observabilidade e piloto.

## Escopo protegido

Não adicionar agenda, marketplace, chat, app nativo, dados clínicos ou IA de prescrição apenas porque parecem interessantes. Cada expansão precisa de evidência comercial e revisão de risco.
