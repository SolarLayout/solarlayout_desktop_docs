import { test, expect } from "@playwright/test"

test("the BESS intro page renders with the docs chrome", async ({ page }) => {
  const res = await page.goto("/bess/intro")
  expect(res?.status(), "/bess/intro did not return 200").toBe(200)

  await expect(
    page.getByRole("heading", { level: 1, name: /BESS Desktop/i }),
  ).toBeVisible()

  await expect(page.locator("#nd-sidebar")).toBeVisible()
})
