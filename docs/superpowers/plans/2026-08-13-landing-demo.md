# AcompanhAí Landing Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing foundation home into a polished public landing page that presents AcompanhAí and captures test interest locally, then publish the verified project to GitHub and Vercel.

**Architecture:** Keep the existing Next.js App Router and split the landing into focused components: hero, dashboard mockup, benefits, workflow, interest form and footer. The form is a client-only demonstration with local success state; it does not persist leads or call Supabase. External publication happens only after local verification.

**Tech Stack:** Next.js 15, React 19, TypeScript strict, Tailwind CSS, Vitest, Playwright, GitHub CLI and Vercel.

## Global Constraints

- The official repository is `D:\SatoTech\acompanhai`.
- The primary CTA text is exactly `Quero testar`.
- The page must be in Brazilian Portuguese and may reference prices in Japanese yen.
- The mockup uses fictitious demonstration data and must not imply real user data.
- The first CTA interaction must not persist leads in Supabase.
- Do not create authentication, billing, WhatsApp integration, or AI prescription in this task.
- Never commit `.env.local`, service-role keys, private tokens, or deployment secrets.
- Do not modify `D:\SatoTech\peso leve`.

---

### Task 1: Establish landing component boundaries and content

**Files:**

- Create: `components/landing/hero.tsx`
- Create: `components/landing/dashboard-mockup.tsx`
- Create: `components/landing/benefits.tsx`
- Create: `components/landing/workflow.tsx`
- Create: `components/landing/interest-form.tsx`
- Create: `components/landing/footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**

- `Hero` renders the headline, supporting copy and an anchor link with text `Quero testar` targeting `#quero-testar`.
- `DashboardMockup` renders only static fictitious data and has no props.
- `Benefits` renders four benefit cards and has no props.
- `Workflow` renders the three approved steps and has no props.
- `InterestForm` is a client component, owns `submitted: boolean`, and renders a form with `name`, `email`, and optional `whatsapp` inputs. On submit it prevents navigation, sets `submitted` to `true`, and displays a local confirmation without network calls.
- `Footer` renders the Brasil–Japão context and demonstration disclaimer.
- `HomePage` composes the components in the order hero, mockup, benefits, workflow, interest CTA, footer.

- [ ] Write a focused component structure in `app/page.tsx` that imports the six landing components and does not contain the full visual markup itself.
- [ ] Create the `Hero` component with the exact headline “Seu cliente não precisa se perder no caminho.” and the primary anchor CTA.
- [ ] Create `DashboardMockup` with fictitious values for clientes, check-ins, evolução e atenção, and label the panel as a demonstration.
- [ ] Create `Benefits` with four short benefit cards: organização, presença, menos ferramentas espalhadas and retenção.
- [ ] Create `Workflow` with the exact three steps from the approved specification.
- [ ] Create `InterestForm` with accessible labels, required name/email validation, optional WhatsApp, submit button text `Quero testar` and local success message.
- [ ] Create `Footer` with the product name, Brasil–Japão context and “Demonstração inicial do produto”.

**Verification:** run `pnpm typecheck` and confirm each component has one clear responsibility and no Supabase import.

### Task 2: Apply the dark premium visual system

**Files:**

- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `components/landing/*.tsx`

**Interfaces:**

- The existing `bg-ink`, `bg-panel`, `text-mint`, `text-lilac` and `shadow-glow` tokens remain valid or are replaced consistently across all landing components.
- The document metadata continues to identify the product as AcompanhAí.

- [ ] Preserve the dark background and add layered surfaces, subtle radial gradients, mint action states and lilac progress accents.
- [ ] Add responsive layouts for 375px mobile, tablet and wide desktop without horizontal overflow.
- [ ] Add visible `:focus-visible` treatment for links, buttons and inputs.
- [ ] Use semantic headings in order and ensure every decorative element is `aria-hidden`.
- [ ] Keep the main CTA prominent in the first viewport and repeat it in the final interest section.
- [ ] Avoid external image dependencies; build the product visual with local HTML/CSS.

**Verification:** run `pnpm lint`, inspect the page at mobile and desktop widths, and confirm no hydration or console errors.

### Task 3: Add automated acceptance coverage

**Files:**

- Modify: `tests/smoke/home.spec.ts`
- Create: `tests/smoke/landing-accessibility.spec.ts`

**Interfaces:**

- The existing smoke test covers the page title, hero heading and primary CTA.
- The accessibility smoke test checks CTA anchors, form labels, required fields and local success state.

- [ ] Update the home smoke test to assert title `/AcompanhAí/`, hero heading `/Seu cliente não precisa se perder/`, at least two `Quero testar` controls and the `#quero-testar` target.
- [ ] Add a Playwright test that opens `/`, verifies labels for `Nome` and `E-mail`, submits valid fictitious values, and expects the local confirmation text without making a network request.
- [ ] Install the Chromium browser if the environment does not have it: `pnpm exec playwright install chromium`.
- [ ] Run `pnpm test`, then `pnpm test:e2e` with the configured Next.js web server.

**Verification:** unit tests and both browser tests pass.

### Task 4: Update documentation for the landing demo

**Files:**

- Modify: `docs/implementation/acompanhai-current-state.md`
- Modify: `docs/implementation/acompanhai-implementation-status.md`
- Modify: `docs/implementation/acompanhai-change-history.md`
- Modify: `docs/implementation/acompanhai-deployment-runbook.md`
- Create: `docs/implementation/acompanhai-landing-demo.md`

**Interfaces:**

- Documentation must identify the landing as implemented locally, the form as non-persistent demo behavior, and deployment as pending until Vercel reports a successful production URL.

- [ ] Record the landing sections, CTA behavior and out-of-scope items in `acompanhai-landing-demo.md`.
- [ ] Update current state and implementation status without claiming lead capture, auth or billing are implemented.
- [ ] Add a dated change-history entry for the landing page.
- [ ] Add GitHub/Vercel deployment steps that never instruct committing `.env.local`.

**Verification:** run `pnpm format:check` and confirm every status label distinguishes local implementation from production deployment.

### Task 5: Verify and create the GitHub repository

**Files:**

- Modify: `.gitignore` only if generated deployment artifacts are missing from ignore rules.
- Repository remote: `origin` → `https://github.com/smsato80/acompanhai.git`

**Interfaces:**

- The GitHub repository name is `acompanhai` under owner `smsato80`.
- The first pushed branch is `master`, preserving the existing local history.

- [ ] Run `git diff --check` and the complete local suite: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`, `pnpm build`.
- [ ] Confirm `git status --short` does not show `.env.local`, `node_modules`, `.next`, Playwright reports or test results.
- [ ] Create the GitHub repository using the authenticated GitHub CLI: `gh repo create smsato80/acompanhai --public --source=. --remote=origin --push`.
- [ ] Verify the remote and repository through GitHub and record the URL in the deployment documentation.

**Verification:** `git ls-remote origin` returns the pushed branch and the GitHub repository opens successfully.

### Task 6: Publish the demo on Vercel

**Files:**

- Modify: `docs/implementation/acompanhai-deployment-runbook.md`
- Deployment project: Vercel project named `acompanhai`

**Interfaces:**

- Vercel imports `smsato80/acompanhai` as a Next.js project from the repository root.
- No private environment variable is required by the non-persistent landing form.
- Public Supabase variables remain optional and must not include service-role credentials.

- [ ] Connect the authenticated Vercel account to the GitHub repository `smsato80/acompanhai`.
- [ ] Create or import the Vercel project with framework preset Next.js and root directory `.`.
- [ ] Deploy the production branch only after the GitHub push and local checks pass.
- [ ] Open the generated public URL and verify hero, CTA, form success state and mobile layout.
- [ ] Record the final Vercel URL, deployment timestamp and verification result in the deployment runbook.

**Verification:** Vercel reports a successful production deployment and the public URL serves the landing page without console errors.

### Task 7: Final review and commit

**Files:**

- All landing files and documentation changed by Tasks 1–6.

- [ ] Run the complete verification suite one final time.
- [ ] Check that no accidental references to `C:\Users\DELL\Documents\ChatGPT\Acompanhai` remain in official repository documentation.
- [ ] Confirm `D:\SatoTech\peso leve` has not changed.
- [ ] Create a focused commit: `feat: criar landing demo do acompanhai`.
- [ ] Report GitHub URL, Vercel URL, commit hash, test results and any remaining limitation.
