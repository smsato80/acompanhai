# Estado atual do AcompanhAí

Atualizado em 2026-08-13 após consulta ao padrão documental do Peso Leve e revisão do plano de produto.

> **Decisão operacional:** desenvolvimento pausado em 13/08/2026. A landing, o repositório, o Supabase e a documentação foram preservados para retomada futura; não há autorização implícita para continuar construindo ou cobrar.

O AcompanhAí é independente do Peso Leve e do CarrosserIA. O CarrosserIA pode apoiar a divulgação do Peso Leve, mas não existe dependência técnica entre os produtos.

## Resumo executivo

O AcompanhAí possui definição de produto, MVP, arquitetura recomendada, fluxos, riscos, métricas e roadmap. A landing de demonstração está publicada em produção em [acompanhai.vercel.app](https://acompanhai.vercel.app), com deployment Vercel em estado `Ready` e framework `nextjs`. Os demais fluxos do produto, incluindo Auth e o schema do Supabase, continuam sem implementação funcional.

O material visual produzido nesta fase é estratégico. As páginas Dark Moderno, Premium Sofisticado e Brasil/Japão não são o produto SaaS.

## O que existe hoje

- Plano mestre de produto e implementação.
- Documentação modular em `docs/acompanhai/`.
- Documentação espelhada no padrão do Peso Leve em `docs/implementation/`.
- Três páginas HTML estratégicas em `outputs/`.
- Repositório oficial em `D:\SatoTech\acompanhai`, publicado no [GitHub](https://github.com/smsato80/acompanhai), com `origin/master` em `14745cc`.
- Landing de demonstração em Next.js publicada em [acompanhai.vercel.app](https://acompanhai.vercel.app), com Vercel configurado como `nextjs` e deployment `Ready`.
- Formulário de interesse da landing com confirmação local, sem persistência ou chamadas ao Supabase.
- Hipótese de mercado: profissionais brasileiros no Japão.
- Hipótese de preço: teste gratuito, ¥980/mês Inicial e ¥1.980/mês Profissional.

## O que ainda não existe

- Frontend funcional além da landing de demonstração.
- Schema do Supabase aplicado e homologado.
- Login real, Auth e RLS testados.
- Convite seguro em produção.
- Stripe, webhook e cobrança real.
- Piloto com personal trainers.
- Termos e política de privacidade revisados juridicamente.
- IA incorporada ao produto.

## Classificação de implementação

| Área                   | Estado                   | Observação                                                |
| ---------------------- | ------------------------ | --------------------------------------------------------- |
| Visão e posicionamento | Documentado              | Ainda depende de entrevistas                              |
| MVP                    | Especificado             | Nenhum fluxo implementado                                 |
| Interface              | Produção                 | Landing de demonstração publicada; formulário local       |
| Banco e Auth           | Planejado                | Schema Supabase, Auth e RLS não implementados             |
| Convites               | Planejado                | Token de uso único e sessão segura                        |
| Painel                 | Referência demonstrativa | Mockup da landing com dados fictícios                     |
| Billing                | Planejado                | Stripe em JPY, inicialmente test mode                     |
| IA                     | Fora do MVP              | Só após validar o fluxo central                           |
| Deploy                 | Produção                 | GitHub publicado e Vercel `nextjs` com deployment `Ready` |
