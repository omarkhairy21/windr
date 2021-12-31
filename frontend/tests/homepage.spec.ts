import { test, expect } from '@playwright/test'

test('Should go to the homepage', async ({ page }) => {
  await page.goto('/')
  await page.locator('text=Create Site').click()
  await expect(page).toHaveURL(/\/auth/)
})
