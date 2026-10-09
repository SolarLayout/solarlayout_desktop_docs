import { test, expect } from "@playwright/test"

test("the BESS intro page renders with the docs chrome", async ({ page }) => {
  const res = await page.goto("/docs/bess/intro")
  expect(res?.status(), "/docs/bess/intro did not return 200").toBe(200)

  await expect(
    page.getByRole("heading", { level: 1, name: /BESS Desktop/i }),
  ).toBeVisible()

  await expect(page.locator("#nd-sidebar")).toBeVisible()
})

test("the root redirects to the index, which opens each product's docs", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveURL(/\/docs$/)
  await expect(page).toHaveTitle("SolarLayout Docs")
  const products = page.getByRole("heading", { level: 2 })
  await expect(products).toHaveText(["SolarLayout Desktop", "BESS Desktop"])
  const open = page.getByRole("link", { name: /Open the docs/i })
  await expect(open.nth(0)).toHaveAttribute("href", "/docs/solarlayout")
  await open.nth(1).click()
  await expect(page).toHaveURL(/\/docs\/bess$/)
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

test("the /docs/bess landing links back to the index", async ({ page }) => {
  await page.goto("/docs/bess")
  const back = page.getByRole("link", { name: /All products/i }).first()
  await expect(back).toBeVisible()
  await back.click()
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
