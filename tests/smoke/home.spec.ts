import { expect, test } from '@playwright/test';

test('a home do AcompanhAí apresenta a proposta principal', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/AcompanhAí/);
  await expect(page.getByRole('heading', { name: /O próximo passo do seu cliente/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Conhecer a visão/ })).toHaveAttribute(
    'href',
    '#visao',
  );
});
