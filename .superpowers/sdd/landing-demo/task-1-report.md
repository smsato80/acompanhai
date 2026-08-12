# Task 1 — Landing component boundaries and content

## Implementação

A home foi reorganizada em componentes de landing focados, mantendo `app/page.tsx` apenas como composição da página. A sequência implementada é: hero, mockup de dashboard, benefícios, fluxo de trabalho, CTA de interesse e rodapé.

O formulário é um componente cliente local: usa validação nativa para nome e e-mail, não navega ao enviar, exibe confirmação na própria tela e não realiza chamadas de rede nem importa Supabase.

## Arquivos alterados

- `app/page.tsx`
- `components/landing/hero.tsx`
- `components/landing/dashboard-mockup.tsx`
- `components/landing/benefits.tsx`
- `components/landing/workflow.tsx`
- `components/landing/interest-form.tsx`
- `components/landing/footer.tsx`

## Verificações

- `pnpm typecheck`: aprovado (`next typegen && tsc --noEmit`).
- `pnpm lint`: aprovado (`eslint .`).
- `pnpm test`: aprovado (1 arquivo, 1 teste unitário).
- `pnpm build`: aprovado (build de produção concluído; rota `/` pré-renderizada como estática).

## Preocupações

- O teste de fumaça existente ainda espera o título e o link da landing anterior. Ele não foi alterado porque está fora do escopo de arquivos definido para a Task 1. O comando `pnpm test` executa apenas a suíte unitária; portanto, esse teste Playwright não foi incluído nessa verificação.
