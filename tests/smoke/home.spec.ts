import { expect, test } from '@playwright/test';

test('a home apresenta a proposta principal', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/AcompanhAí/);
  await expect(
    page.getByRole('heading', { name: /Seu cliente não precisa se perder/ }),
  ).toBeVisible();

  const testCtas = page.getByRole('link', { name: /Quero testar/ });
  expect(await testCtas.count()).toBeGreaterThanOrEqual(2);
  await expect(testCtas.first()).toHaveAttribute('href', '#quero-testar');
});
