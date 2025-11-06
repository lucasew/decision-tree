import { test, expect } from '@playwright/test';

test.describe('Decision Tree App', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    // Should show the input form (checking for URL input instead of specific text)
    await expect(page.locator('input#tree-url')).toBeVisible();

    // Check for heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should show example button and load button', async ({ page }) => {
    await page.goto('/');

    // Check for buttons - looking for Portuguese text
    await expect(page.getByRole('button', { name: /carregar|load/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /exemplo|example/i })).toBeVisible();
  });

  test('should load example decision tree', async ({ page }) => {
    await page.goto('/');

    // Click example button
    await page.getByRole('button', { name: /exemplo|example/i }).click();

    // Wait for navigation
    await page.waitForURL(/tree=/);

    // Should show decision tree content
    await expect(page.locator('h1')).toContainText(/Teste|trabson/i);

    // Should show alternatives
    await expect(page.getByText(/Alternativa A/i)).toBeVisible();
    await expect(page.getByText(/Alternativa B/i)).toBeVisible();

    // Should show exit button
    await expect(page.getByRole('button', { name: /sair|exit/i })).toBeVisible();
  });

  test('should navigate through decision tree', async ({ page }) => {
    await page.goto('/');

    // Load example
    await page.getByRole('button', { name: /exemplo|example/i }).click();
    await page.waitForURL(/tree=/);

    // Click on first alternative (using the card button)
    await page.locator('button').filter({ hasText: /Alternativa A/i }).click();

    // Wait for navigation
    await page.waitForTimeout(500);

    // URL should change
    expect(page.url()).toContain('/a');

    // Should show end of line message (no more alternatives)
    await expect(page.locator('.alert-info')).toBeVisible();
  });

  test('should reset decision tree', async ({ page }) => {
    await page.goto('/');

    // Load example
    await page.getByRole('button', { name: /exemplo|example/i }).click();
    await page.waitForURL(/tree=/);

    // Click exit button
    await page.getByRole('button', { name: /sair|exit/i }).click();

    // Should go back to input form
    await page.waitForTimeout(500);
    await expect(page.locator('input#tree-url')).toBeVisible();
    expect(page.url()).not.toContain('tree=');
  });

  test('should apply Tailwind and DaisyUI styles', async ({ page }) => {
    await page.goto('/');

    // Check if main container has card classes
    const cardElement = page.locator('.card').first();
    await expect(cardElement).toBeVisible();

    // Check if buttons have DaisyUI styling
    const button = page.getByRole('button', { name: /exemplo|example/i });
    await expect(button).toHaveClass(/btn/);
  });

  test('should handle markdown rendering', async ({ page }) => {
    await page.goto('/');

    // Load example with markdown
    await page.getByRole('button', { name: /exemplo|example/i }).click();
    await page.waitForURL(/tree=/);

    // Check if markdown is rendered (should have <strong> or <em> tags from "**eoq**")
    const content = page.locator('.prose');
    await expect(content).toBeVisible();

    // The markdown "**eoq**" should be rendered as bold
    const boldText = page.locator('strong');
    await expect(boldText).toBeVisible();
  });
});
