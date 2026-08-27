import { expect, test } from '@playwright/test';

test.describe('portal público do cliente', () => {
  test('sem sessão, bloqueia o acesso e orienta a solicitar novo link', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/portal');

    await expect(page).toHaveURL(/\/portal$/);
    await expect(
      page.getByRole('heading', { name: 'Este link não está disponível.' }),
    ).toBeVisible();
    await expect(
      page.getByText('Peça um novo link para continuar seu acompanhamento.'),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Conhecer o AcompanhAí' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  test('token inválido é rejeitado sem criar dados', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/portal/token-invalido');

    await expect(page).toHaveURL(/\/portal\?status=invalid$/);
    await expect(
      page.getByRole('heading', { name: 'Este link não está disponível.' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Conhecer o AcompanhAí' })).toBeVisible();
  });
});
