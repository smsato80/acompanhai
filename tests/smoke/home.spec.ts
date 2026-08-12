import { expect, test } from '@playwright/test';

test('a home apresenta a proposta principal', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/AcompanhAí/);
  await expect(
    page.getByRole('heading', { name: /Seu cliente não precisa se perder/ }),
  ).toBeVisible();

  const heroCta = page.getByRole('link', { name: /Quero testar/ });
  const finalCta = page.getByRole('button', { name: /Quero testar/ });

  expect(await heroCta.or(finalCta).count()).toBeGreaterThanOrEqual(2);
  await expect(heroCta).toHaveAttribute('href', '#quero-testar');
});
