import { expect, test } from '@playwright/test';

const commercialPages = [
  {
    path: '/pricing',
    heading: 'Mais clareza para acompanhar. Mais valor para o seu cliente.',
  },
  {
    path: '/terms',
    heading: 'Termos de uso',
  },
  {
    path: '/privacy',
    heading: 'Política de privacidade',
  },
] as const;

test.describe('páginas comerciais públicas', () => {
  for (const { path, heading } of commercialPages) {
    test(`${path} apresenta conteúdo comercial e navegação de retorno`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveTitle(/AcompanhAí/);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute(
        'href',
        '/',
      );
    });
  }
});

test('a landing não exibe o nome provisório do produto', async ({ page }) => {
  await page.goto('/');

  const landingText = (await page.locator('body').innerText()).toLowerCase();

  expect(landingText).not.toContain('pilot1');
  expect(landingText).not.toContain('pilot 1');
});
