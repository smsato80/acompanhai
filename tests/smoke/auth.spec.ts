import { expect, test } from '@playwright/test';

test('o login apresenta o primeiro acesso do profissional', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/AcompanhAí/);
  await expect(page.getByRole('heading', { name: /Seu acompanhamento começa aqui/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Criar minha conta' })).toBeVisible();
});

test('o painel exige uma sessão autenticada', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page).toHaveURL(/\/login$/);
});
