import { test, expect } from "@playwright/test"

test("the BESS intro page renders with the docs chrome", async ({ page }) => {
  const res = await page.goto("/docs/bess/intro")
  expect(res?.status(), "/docs/bess/intro did not return 200").toBe(200)

  await expect(
    page.getByRole("heading", { level: 1, name: /BESS Desktop/i }),
  ).toBeVisible()

  await expect(page.locator("#nd-sidebar")).toBeVisible()
})

test("the root shows a product picker linking to both apps", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("link", { name: /SolarLayout Desktop/i }).first()).toBeVisible()
  await expect(page.getByRole("link", { name: /BESS Desktop/i }).first()).toBeVisible()
  // The BESS card lands on the BESS tree.
  await page.getByRole("link", { name: /BESS Desktop/i }).first().click()
  await expect(page).toHaveURL(/\/docs\/bess(\/|$)/)
})

test("the /docs/bess landing links into the BESS tree", async ({ page }) => {
  await page.goto("/docs/bess")
  await expect(page.getByRole("link", { name: /What BESS Desktop does|Get started|Start reading/i }).first()).toBeVisible()
})

test("the /docs/bess landing carries a BESS-branded document title", async ({ page }) => {
  await page.goto("/docs/bess")
  await expect(page).toHaveTitle("BESS Desktop Docs")
})

test("a BESS article page is title-branded BESS, not SolarLayout", async ({ page }) => {
  await page.goto("/docs/bess/intro")
  await expect(page).toHaveTitle(/· BESS Desktop Docs$/)
  await expect(page).not.toHaveTitle(/SolarLayout Desktop Docs$/)
})

test("the /docs/bess landing offers a link across to the SolarLayout docs", async ({ page }) => {
  await page.goto("/docs/bess")
  const crossLink = page.getByRole("link", { name: /SolarLayout Desktop docs/i }).first()
  await expect(crossLink).toBeVisible()
  await crossLink.click()
  await expect(page).toHaveURL(/\/docs$/)
})

test("search finds a BESS page from the BESS tree", async ({ page }) => {
  await page.goto("/docs/bess/intro")
  await page.keyboard.press("ControlOrMeta+k")
  const input = page.getByRole("searchbox").or(page.getByPlaceholder(/search/i)).first()
  await expect(input).toBeVisible()
  await input.fill("battery")
  const dialog = page.getByRole("dialog")
  const result = dialog.getByRole("button", { name: /BESS Desktop|Getting started/i }).first()
  await expect(result, "search returned no BESS result — check /api/search indexes bessSource").toBeVisible({ timeout: 15_000 })
  await result.click()
  await expect(page).toHaveURL(/\/docs\/bess\//)
})
