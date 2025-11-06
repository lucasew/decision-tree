import { test, expect } from '@playwright/test';

test('UI improvements - back button and exit button', async ({ page }) => {
  await page.goto('/');

  // Click example button
  await page.getByRole('button', { name: /exemplo|example/i }).click();
  await page.waitForURL(/tree=/);
  await page.waitForTimeout(500);

  // Should see exit button (larger now)
  const exitButton = page.getByRole('button', { name: /sair|exit/i });
  await expect(exitButton).toBeVisible();
  console.log('Exit button found');

  // Should NOT see back button on root
  const backButtonBefore = page.getByRole('button', { name: /voltar|back/i });
  await expect(backButtonBefore).not.toBeVisible();
  console.log('No back button on root - correct');

  // Click first alternative
  const firstButton = page.locator('button.card').first();
  await firstButton.click();
  await page.waitForTimeout(500);

  // Now should see back button
  const backButtonAfter = page.getByRole('button', { name: /voltar|back/i });
  await expect(backButtonAfter).toBeVisible();
  console.log('Back button visible in sub-route - correct');

  // Click back button
  await backButtonAfter.click();
  await page.waitForTimeout(500);

  // Should be back to root (back button hidden)
  await expect(page.getByRole('button', { name: /voltar|back/i })).not.toBeVisible();
  console.log('Back button hidden after going back - correct');
});
