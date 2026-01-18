
import { test, expect } from '@playwright/test';

test('Homepage loads gracefully with invalid Sanity config', async ({ page }) => {
  const response = await page.goto('http://localhost:3000');
  expect(response?.status()).toBe(200);
  
  // Check for fallback content
  // "Selected Projects" should be visible even if empty or fallback
  await expect(page.locator('text=Selected Projects')).toBeVisible();
  
  // Check footer exists
  await expect(page.locator('footer')).toBeVisible();
});
