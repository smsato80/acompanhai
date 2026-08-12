# Handoff para o projeto AcompanhAí

## Contexto e forma de trabalho

O projeto é da SatoTech e deve ser desenvolvido em colaboração incremental: investigar estado real, propor mudança pequena, implementar, testar e registrar resultado.

## Regras

- Responder em português brasileiro.
- Ler `docs/README.md` e os documentos diretamente relacionados antes de alterar código.
- Não presumir que uma integração existe.
- Usar `apply_patch` para edições.
- Rodar testes, typecheck e build depois das mudanças.
- Nunca incluir credenciais, `.env`, tokens ou dados reais.
- Não fazer deploy, cobrança ou alteração externa sem autorização explícita.
- Separar implementado, preparado, homologado e produção.

## Produto

O AcompanhAí é um SaaS em português e cobrado em ienes para profissionais brasileiros que atendem clientes no Japão. O primeiro nicho é personal trainer. O cliente usa um link seguro; o profissional acompanha planos e respostas.

## Repositório

O repositório oficial é `D:\SatoTech\acompanhai`. A documentação modular e a fundação técnica já estão presentes.

## Próximo pedido recomendado ao Codex

> Leia `docs/README.md`, `docs/implementation/acompanhai-current-state.md` e `docs/implementation/acompanhai-architecture.md`. O próximo marco é implementar autenticação, organizações, schema, políticas RLS e testes de isolamento. Preserve arquivos existentes, rode as verificações e registre decisões ou bloqueios.
