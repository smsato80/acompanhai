# AcompanhAí Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax so progress can be tracked.

**Goal:** Entregar a fundação local, documental e operacional do AcompanhAí, com uma aplicação web mínima verificável e o projeto Supabase inicial preparado sem dados de negócio.

**Architecture:** Next.js App Router com TypeScript estrito, UI dark premium baseada em tokens, camada de configuração para Supabase separada entre browser/server e documentação mantida em `docs/`.

**Tech Stack:** Next.js, React, TypeScript, pnpm, Tailwind CSS, ESLint, Prettier, Vitest, Playwright e Supabase.

## Global Constraints

- Não tocar no projeto Peso Leve em `D:\SatoTech\peso leve`.
- Não versionar segredos, chaves privadas ou `.env.local`.
- Não criar tabelas de negócio ou políticas RLS incompletas nesta fundação.
- Não adicionar prescrição automática de treino, dieta ou orientação clínica.
- Manter português brasileiro na interface e ienes nas referências comerciais futuras.

---

## Task 1: Documentação e metadados

**Arquivos:** `README.md`, `.gitignore`, `.env.example`, `docs/`.

- [x] Importar a documentação existente de `D:\SatoTech\acompanhai` para `docs/`.
- [x] Criar README raiz com propósito, pré-requisitos, comandos e documentação.
- [x] Criar `.gitignore` para dependências, builds, relatórios, arquivos locais e variáveis secretas.
- [x] Criar `.env.example` apenas com nomes de variáveis públicas necessárias.

**Verificação:** confirmar que os documentos existem e que nenhum segredo foi copiado.

## Task 2: Aplicação web mínima

**Arquivos:** `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `app/*`, `tailwind.config.ts`, `postcss.config.mjs`.

- [x] Configurar Next.js App Router com TypeScript estrito.
- [x] Criar home dark premium com copy em português, CTA honesto e responsividade básica.
- [x] Definir tokens de cor, superfícies e estados de foco.
- [x] Garantir semântica acessível e `lang="pt-BR"`.

**Verificação:** build de produção concluído sem erro.

## Task 3: Qualidade automatizada

**Arquivos:** `.eslintrc.json`, `.prettierrc.json`, `vitest.config.ts`, `playwright.config.ts`, `tests/`.

- [x] Adicionar scripts `lint`, `format:check`, `typecheck`, `test`, `test:e2e` e `build`.
- [x] Criar teste unitário para formatação de ienes.
- [x] Criar smoke test Playwright para a home.
- [x] Executar lint, typecheck, teste unitário, formatação e build.

**Verificação:** todas as verificações locais, exceto a tentativa de smoke test que excedeu o tempo de inicialização, foram aprovadas.

## Task 4: Integração segura com Supabase

**Arquivos:** `lib/supabase/config.ts`, `lib/supabase/browser.ts`, `lib/supabase/server.ts`, `docs/implementation/acompanhai-supabase-setup.md`.

- [x] Criar o projeto Supabase `acompanhai` na região `ap-northeast-1`.
- [x] Registrar project ref, URL pública, região e status sem registrar segredos.
- [x] Criar clientes Supabase separados para browser e server usando chave publicável.
- [x] Confirmar que o schema público ainda não tem tabelas de negócio.
- [ ] Criar migrations de Auth, organizações, clientes, planos, links e check-ins no próximo marco.

**Verificação:** projeto Supabase saudável e sem tabelas de produto.

## Task 5: Revisão e primeiro marco

**Arquivos:** `docs/implementation/acompanhai-foundation-2026-08-13.md`, documentação de estado e histórico.

- [x] Revisar a estrutura com subagente independente.
- [x] Corrigir encoding e configuração encontrados durante a revisão.
- [x] Registrar o estado atual e o próximo marco.
- [ ] Criar o primeiro commit do marco Fundação AcompanhAí.

**Verificação:** lint, typecheck, teste unitário, formatação e build passam; a documentação aponta Auth, organizações, schema e RLS como próxima etapa.
