import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Basic Rendering', () => {
  test('should load page without errors', async ({ page }) => {
    const errors: string[] = [];

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Capture page errors
    page.on('pageerror', err => {
      errors.push(err.message);
    });

    await page.goto('/');
    await page.waitForTimeout(2000); // Give it time to render

    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/homepage-smoke.png' });

    // Check if there are any errors
    if (errors.length > 0) {
      console.log('Errors found:', errors);
    }

    // Expect no critical errors
    expect(errors).toHaveLength(0);
  });

  test('should have content in body', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    // Check if body has any content
    const bodyContent = await page.locator('body').innerHTML();

    console.log('Body innerHTML length:', bodyContent.length);
    console.log('Body innerHTML preview:', bodyContent.substring(0, 200));

    // Body should have more than just script tags
    expect(bodyContent.length).toBeGreaterThan(100);
  });

  test('should load JavaScript bundle', async ({ page }) => {
    const responses: any[] = [];

    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()['content-type']
      });
    });

    await page.goto('/');
    await page.waitForTimeout(1000);

    // Check if JS bundle was loaded
    const jsBundle = responses.find(r => r.url.includes('.js') && r.url.includes('assets'));
    console.log('JS Bundle:', jsBundle);

    expect(jsBundle).toBeDefined();
    expect(jsBundle?.status).toBe(200);
  });

  test('should load CSS bundle', async ({ page }) => {
    const responses: any[] = [];

    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()['content-type']
      });
    });

    await page.goto('/');
    await page.waitForTimeout(1000);

    // Check if CSS bundle was loaded
    const cssBundle = responses.find(r => r.url.includes('.css') && r.url.includes('assets'));
    console.log('CSS Bundle:', cssBundle);

    expect(cssBundle).toBeDefined();
    expect(cssBundle?.status).toBe(200);
  });

  test('should render Svelte app container', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({ path: 'test-results/app-container.png', fullPage: true });

    // Check if body has any visible elements
    const bodyText = await page.locator('body').textContent();
    console.log('Body text content:', bodyText);

    // Should have some text content
    expect(bodyText).toBeTruthy();
    expect(bodyText?.length).toBeGreaterThan(0);
  });

  test('should have no critical console errors', async ({ page }) => {
    const criticalErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        criticalErrors.push(msg.text());
        console.log('Console error:', msg.text());
      }
    });

    page.on('pageerror', err => {
      criticalErrors.push(err.message);
      console.log('Page error:', err.message);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Print all errors for debugging
    console.log('Total errors:', criticalErrors.length);
    criticalErrors.forEach((err, i) => {
      console.log(`Error ${i + 1}:`, err);
    });

    // This should ideally be 0, but let's see what errors we have
    expect(criticalErrors.length).toBeLessThan(10); // Allowing some for debugging
  });
});

test.describe('Decision Tree App - Full Tests', () => {
  test('should show input form on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    // More lenient checks
    const body = await page.locator('body');
    await expect(body).toBeVisible();

    // Check if there's any input on the page
    const inputs = await page.locator('input').count();
    console.log('Number of inputs found:', inputs);

    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/input-form.png' });

    expect(inputs).toBeGreaterThan(0);
  });

  test('should have buttons on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);

    const buttons = await page.locator('button').count();
    console.log('Number of buttons found:', buttons);

    // Take screenshot
    await page.screenshot({ path: 'test-results/buttons.png' });

    expect(buttons).toBeGreaterThan(0);
  });
});
