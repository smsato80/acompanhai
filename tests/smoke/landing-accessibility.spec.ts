import { expect, test } from '@playwright/test';

test('o formulário de interesse confirma localmente sem enviar dados', async ({ page }) => {
  const leadRequests: string[] = [];

  page.on('request', (request) => {
    const url = new URL(request.url());

    if (
      url.hostname.endsWith('.supabase.co') ||
      /\/(?:api\/)?(?:leads?|interest|signup)\b/i.test(url.pathname)
    ) {
      leadRequests.push(request.url());
    }
  });

  await page.goto('/');

  await expect(page.getByLabel('Nome')).toBeVisible();
  await expect(page.getByLabel('E-mail')).toBeVisible();

  const initialUrl = page.url();
  await page.getByLabel('Nome').fill('Pessoa de Teste');
  await page.getByLabel('E-mail').fill('pessoa.teste@example.com');
  await page.getByLabel(/WhatsApp/).fill('(11) 99999-9999');
  await page.getByRole('button', { name: 'Quero testar' }).click();

  await expect(page.getByRole('status')).toContainText('Recebemos seu interesse.');
  await expect(page).toHaveURL(initialUrl);
  expect(leadRequests).toEqual([]);
});
