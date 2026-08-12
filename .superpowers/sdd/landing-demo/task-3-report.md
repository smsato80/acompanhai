# Task 3 — Automated acceptance coverage report

## Changes

- Updated `tests/smoke/home.spec.ts` for the current landing: title, hero heading, two `Quero testar` controls, and the primary `#quero-testar` anchor.
- Added `tests/smoke/landing-accessibility.spec.ts` to verify the accessible form labels, submit valid fictitious values, assert local confirmation and unchanged URL, and fail if Supabase or lead endpoints receive a request.
- Installed Playwright Chromium locally because it was absent.

## Commands and results

| Command | Result | Output summary |
| --- | --- | --- |
| `pnpm exec playwright install chromium` | Passed | Chromium and Chromium Headless Shell 140.0.7339.16 (Playwright build 1187) installed. |
| `pnpm test` | Passed | Vitest: 1 test file passed; 1 test passed. |
| `pnpm typecheck` | Passed | Next route types generated; `tsc --noEmit` passed. |
| `pnpm test:e2e` | Not conclusive | Initial execution created failure artifacts: the served page exposed mojibake text, so the required Unicode heading assertion did not match; the form test then encountered a client-side application error. Subsequent runs did not produce progress and timed out while leftover Playwright processes were active. Those processes were terminated. |

## Concerns

- The required E2E run is not passing/conclusive. The landing source rendered mojibake text (for example, `AcompanhAÃ­` and `nÃ£o`) while the acceptance requirement requires Unicode text (`AcompanhAí`, `não`). Product files were not changed because they are outside this task's scope.
- The new browser tests intentionally use the required Unicode assertions, so `pnpm test:e2e` will remain blocked until the landing's text encoding/runtime output is corrected by the product owner.
- No network call to Supabase or lead endpoints was observed during the incomplete browser test attempts; the added test enforces this condition on a successful run.

## Fresh verification (2026-08-13)

The earlier E2E result was caused by a stale `next start` process on port 3000, not by the landing output. After that process was stopped, the home smoke test was corrected to count both CTA controls: the hero link and the final form submit button. The hero link continues to assert `href="#quero-testar"`.

| Command | Result | Output summary |
| --- | --- | --- |
| `pnpm test:e2e` | Passed | Playwright Chromium: 2 tests passed in 16.8s. |
| `pnpm test` | Passed | Vitest: 1 test file passed; 1 test passed. |
| `pnpm typecheck` | Passed | Route types generated successfully; `tsc --noEmit` passed. |

## Current concerns

- Next.js emitted a non-blocking development warning that a future major version will require `allowedDevOrigins` for the `127.0.0.1` cross-origin request. It did not affect the acceptance run.
