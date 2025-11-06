import { test, expect } from '@playwright/test';

test('debug page load', async ({ page }) => {
  const errors: string[] = [];
  const consoleMessages: string[] = [];

  // Capture all console messages
  page.on('console', msg => {
    const text = `[${msg.type()}] ${msg.text()}`;
    consoleMessages.push(text);
    console.log(text);

    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Capture page errors
  page.on('pageerror', err => {
    const text = `[PAGE ERROR] ${err.message}\n${err.stack}`;
    errors.push(text);
    console.log(text);
  });

  // Capture request failures
  page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED] ${request.url()} - ${request.failure()?.errorText}`);
  });

  // Capture responses
  page.on('response', response => {
    if (!response.ok()) {
      console.log(`[RESPONSE ${response.status()}] ${response.url()}`);
    }
  });

  console.log('Navigating to /');
  await page.goto('/');

  console.log('Waiting 1 second for page to load...');
  await page.waitForTimeout(1000);

  // Try to get HTML early using page.content() instead
  try {
    const html = await page.content();
    console.log('\n=== PAGE CONTENT AFTER 1s (first 500 chars) ===');
    console.log(html.substring(0, 500));
  } catch (e) {
    console.log('\n=== FAILED TO GET PAGE CONTENT AFTER 1s ===');
    console.log(e);
  }

  console.log('Waiting 3 more seconds...');
  await page.waitForTimeout(3000);

  console.log('\n=== FINAL STATE ===');
  console.log('Total console messages:', consoleMessages.length);
  console.log('Total errors:', errors.length);

  if (errors.length > 0) {
    console.log('\n=== ERRORS ===');
    errors.forEach((err, i) => {
      console.log(`\nError ${i + 1}:`);
      console.log(err);
    });
  }

  // Get page content
  try {
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('\n=== BODY HTML (first 500 chars) ===');
    console.log(bodyHTML.substring(0, 500));
  } catch (e) {
    console.log('\n=== FAILED TO GET BODY HTML ===');
    console.log(e);
  }
});
