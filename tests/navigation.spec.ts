import { test, expect } from '@playwright/test';

test('navigation should work when clicking buttons', async ({ page }) => {
  await page.goto('/');

  // Click example button
  await page.getByRole('button', { name: /exemplo|example/i }).click();

  // Wait for URL to change
  await page.waitForURL(/tree=/);

  console.log('URL after example:', page.url());

  // Wait for page to load
  await page.waitForTimeout(1000);

  // Should see the decision tree title
  const title = await page.locator('h1').first().textContent();
  console.log('Title:', title);

  // Find and click the first alternative button
  const buttons = page.locator('button.card');
  const buttonCount = await buttons.count();
  console.log('Number of alternative buttons:', buttonCount);

  expect(buttonCount).toBeGreaterThan(0);

  // Click the first button
  const firstButton = buttons.first();
  const buttonText = await firstButton.textContent();
  console.log('Clicking button:', buttonText?.substring(0, 50));

  const urlBefore = page.url();
  await firstButton.click();

  // Wait a bit for the URL to change
  await page.waitForTimeout(500);

  const urlAfter = page.url();
  console.log('URL before click:', urlBefore);
  console.log('URL after click:', urlAfter);

  // URL should have changed
  expect(urlAfter).not.toBe(urlBefore);
  expect(urlAfter).toContain('/');
});
