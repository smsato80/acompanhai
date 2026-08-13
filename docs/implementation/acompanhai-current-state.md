# Estado atual do AcompanhAí

Atualizado em 2026-08-13 após a implementação do primeiro marco funcional do MVP.

## Resumo executivo

O AcompanhAí possui definição de produto, MVP, arquitetura recomendada, fluxos, riscos, métricas e roadmap. A landing está publicada em produção em [acompanhai.vercel.app](https://acompanhai.vercel.app). O primeiro marco funcional agora inclui login/cadastro, sessão protegida, organizações, clientes, planos e check-ins persistidos no Supabase com RLS.

O material visual produzido nesta fase é estratégico. As páginas Dark Moderno, Premium Sofisticado e Brasil/Japão não são o produto SaaS.

## O que existe hoje

- Plano mestre de produto e implementação.
- Documentação modular em `docs/acompanhai/`.
- Documentação espelhada no padrão do Peso Leve em `docs/implementation/`.
- Três páginas HTML estratégicas em `outputs/`.
- Repositório oficial em `D:\SatoTech\acompanhai`, publicado no [GitHub](https://github.com/smsato80/acompanhai), com o MVP implementado no branch `feature/mvp-app`.
- Landing de demonstração em Next.js publicada em [acompanhai.vercel.app](https://acompanhai.vercel.app), com Vercel configurado como `nextjs` e deployment `Ready`.
- Formulário de interesse da landing com confirmação local, sem persistência ou chamadas ao Supabase.
- App MVP em `/login` e `/dashboard`, com Auth por e-mail/senha e operações de cliente, plano e check-in.
- Migration `mvp_core_schema` aplicada no Supabase; seis tabelas de negócio com RLS habilitada e advisors de segurança sem lints.
- Hipótese de mercado: profissionais brasileiros no Japão.
- Hipótese de preço: teste gratuito, ¥980/mês Inicial e ¥1.980/mês Profissional.

## O que ainda não existe

- Convite seguro de cliente em produção.
- Teste E2E de cadastro/login com uma conta real.
- Convite seguro em produção.
- Stripe, webhook e cobrança real.
- Piloto com personal trainers.
- Termos e política de privacidade revisados juridicamente.
- IA incorporada ao produto.

## Classificação de implementação

| Área                   | Estado                   | Observação                                                |
| ---------------------- | ------------------------ | --------------------------------------------------------- |
| Visão e posicionamento | Documentado              | Ainda depende de entrevistas                              |
| MVP                    | Implementado localmente | Auth, painel, clientes, planos e check-ins                |
| Interface              | Produção                 | Landing publicada; painel funcional no branch MVP         |
| Banco e Auth           | Implementado localmente | Schema aplicado no Supabase; Auth/RLS aguardam homologação  |
| Convites               | Planejado                | Token de uso único e sessão segura                        |
| Painel                 | Implementado localmente | `/dashboard` com dados reais da organização autenticada    |
| Billing                | Planejado                | Stripe em JPY, inicialmente test mode                     |
| IA                     | Fora do MVP              | Só após validar o fluxo central                           |
| Deploy                 | Produção                 | GitHub publicado e Vercel `nextjs` com deployment `Ready` |
