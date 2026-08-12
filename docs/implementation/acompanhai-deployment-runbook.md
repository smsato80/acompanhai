# Runbook de deploy

> Produção da landing de demonstração publicada e verificada.

## Estado da landing de demonstração

A landing de demonstração está pública em produção: https://acompanhai.vercel.app.

## Registro da publicação GitHub

- Repositório: https://github.com/smsato80/acompanhai
- Publicado em: 2026-08-13T03:55:32+09:00
- Estado: código publicado; deploy de produção no Vercel confirmado.

## Registro do deploy Vercel

- Projeto: `acompanhai` (`prj_TLXI5apuCZ4OHMuGm7334VIq5w1z`).
- Deployment: `dpl_5L2qBYw2WTKYM52XgMSXKvD65faE`.
- Status: Ready.
- Produção: https://acompanhai.vercel.app
- Alias do deployment: https://acompanhai-anm8srg7w-smsato80s-projects.vercel.app
- Criado em: 2026-08-13T04:24:37+09:00 (JST).
- Build: Next.js aprovado.
- A proteção SSO foi desativada para tornar a demonstração pública.

### Verificação pública

- HTTP: `200 OK` em `https://acompanhai.vercel.app`.
- Título: `AcompanhAí — acompanhamento que continua`.
- Headline: `Seu cliente não precisa se perder no caminho.`
- CTA: `Quero testar` visível.

## Pré-requisitos

1. Repositório Git oficial criado.
2. Projeto Supabase de desenvolvimento e homologação.
3. Migrations aplicadas em homologação.
4. Vercel configurada com banco separado.
5. Stripe Japão em test mode.
6. Domínio e e-mail autenticados.
7. Termos, privacidade, contato e cancelamento revisados.
8. Backup e restauração ensaiados.

## Publicar a landing demo via GitHub e Vercel

1. Confirmar que a árvore de trabalho não contém `.env.local`, chaves privadas, tokens ou dados reais de leads.
2. Criar ou selecionar o repositório GitHub oficial e enviar apenas os arquivos versionáveis por meio de uma sessão autenticada segura.
3. Nunca adicionar, versionar ou enviar `.env.local`, chaves privadas ou tokens para o GitHub.
4. No Vercel, importar o repositório GitHub e conferir as configurações de build do projeto Next.js.
5. Caso variáveis sejam necessárias em tasks futuras, cadastrá-las exclusivamente nas configurações seguras do Vercel; não copiá-las para commits, documentação ou logs.
6. Publicar um preview, validar a landing e registrar a URL somente após a confirmação do Vercel.
7. Publicar em produção apenas com autorização e após as tasks pendentes; registrar então a URL de produção, o commit e o resultado.

## Validação antes de publicar

```powershell
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Depois, testar login, cliente, plano, convite, check-in, painel, assinatura test mode, link inválido, logout, refresh e responsividade.

## Publicação

1. Abrir pull request.
2. CI verde.
3. Revisar migration e variáveis.
4. Publicar preview.
5. Executar smoke test.
6. Aplicar migration aprovada.
7. Publicar produção somente com autorização.
8. Registrar commit, deployment e resultado.

## Rollback

Rollback de frontend e banco são operações diferentes. Não sobrescrever banco, `.env` ou dados sem backup e aprovação. Em alteração de schema, ter plano de restauração antes da aplicação.

## Pós-deploy

- Conferir rotas diretas.
- Conferir headers e cookies.
- Conferir logs sem PII.
- Conferir webhook Stripe.
- Conferir RLS com duas contas.
- Conferir convite usado/expirado.
- Registrar versão no histórico.
