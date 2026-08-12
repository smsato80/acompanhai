# Estado atual do AcompanhAí

Atualizado em 2026-08-13 após consulta ao padrão documental do Peso Leve e revisão do plano de produto.

## Resumo executivo

O AcompanhAí possui definição de produto, MVP, arquitetura recomendada, fluxos, riscos, métricas e roadmap. A landing de demonstração está implementada localmente; ela ainda não foi homologada nem publicada em produção. Os demais fluxos do produto continuam sem implementação funcional.

O material visual produzido nesta fase é estratégico. As páginas Dark Moderno, Premium Sofisticado e Brasil/Japão não são o produto SaaS.

## O que existe hoje

- Plano mestre de produto e implementação.
- Documentação modular em `docs/acompanhai/`.
- Documentação espelhada no padrão do Peso Leve em `docs/implementation/`.
- Três páginas HTML estratégicas em `outputs/`.
- Landing de demonstração local em Next.js, com formulário de interesse sem persistência.
- Hipótese de mercado: profissionais brasileiros no Japão.
- Hipótese de preço: teste gratuito, ¥980/mês Inicial e ¥1.980/mês Profissional.

## O que ainda não existe

- Repositório oficial do AcompanhAí.
- Frontend funcional além da landing de demonstração.
- Banco Supabase aplicado e homologado.
- Login real e RLS testada.
- Convite seguro em produção.
- Stripe, webhook e cobrança real.
- Piloto com personal trainers.
- Termos e política de privacidade revisados juridicamente.
- IA incorporada ao produto.

## Classificação de implementação

| Área                   | Estado                   | Observação                                           |
| ---------------------- | ------------------------ | ---------------------------------------------------- |
| Visão e posicionamento | Documentado              | Ainda depende de entrevistas                         |
| MVP                    | Especificado             | Nenhum fluxo implementado                            |
| Interface              | Implementado localmente  | Landing de demonstração, sem homologação ou produção |
| Banco e Auth           | Planejado                | Supabase recomendado                                 |
| Convites               | Planejado                | Token de uso único e sessão segura                   |
| Painel                 | Referência demonstrativa | Mockup da landing com dados fictícios                |
| Billing                | Planejado                | Stripe em JPY, inicialmente test mode                |
| IA                     | Fora do MVP              | Só após validar o fluxo central                      |
| Deploy                 | Não iniciado             | URLs de GitHub e Vercel pendentes das próximas tasks |
