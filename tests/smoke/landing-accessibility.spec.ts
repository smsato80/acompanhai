import { expect, test } from '@playwright/test';

test('o formulário de interesse envia o lead com consentimento', async ({ page }) => {
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

  await page.route('**/api/leads', async (route) => {
    await route.fulfill({ status: 201, contentType: 'application/json', body: '{"ok":true}' });
  });

  await page.goto('/');

  await expect(page.getByLabel('Nome')).toBeVisible();
  await expect(page.getByLabel('E-mail')).toBeVisible();

  const initialUrl = page.url();
  await page.getByLabel('Nome').fill('Pessoa de Teste');
  await page.getByLabel('E-mail').fill('pessoa.teste@example.com');
  await page.getByLabel(/WhatsApp/).fill('(11) 99999-9999');
  await page.getByLabel(/Concordo em receber contato/).check();
  await page.getByRole('button', { name: 'Quero testar' }).click();

  await expect(page.getByRole('status')).toContainText('Recebemos seu interesse.');
  await expect(page).toHaveURL(initialUrl);
  expect(leadRequests).toHaveLength(1);
});
