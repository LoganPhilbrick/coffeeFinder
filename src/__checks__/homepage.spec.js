import { expect, test } from "@playwright/test";

test("Visit home page", async ({ page }) => {
  const response = await page.goto("https://checklyhq.com");

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
});
