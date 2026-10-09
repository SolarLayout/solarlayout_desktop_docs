import { test, expect } from "@playwright/test"

test("the Rooftop intro page renders with the docs chrome", async ({ page }) => {
  const res = await page.goto("/docs/rooftop/intro")
  expect(res?.status(), "/docs/rooftop/intro did not return 200").toBe(200)
  await expect(page.getByRole("heading", { level: 1, name: /SolarLayout Rooftop/i })).toBeVisible()
  await expect(page.locator("#nd-sidebar")).toBeVisible()
})

test("the /docs/rooftop landing carries a Rooftop title, starts reading and opens the app", async ({ page }) => {
  await page.goto("/docs/rooftop")
  await expect(page).toHaveTitle("SolarLayout Rooftop Docs")
  await expect(page.getByText("Free, no account needed. Your designs are kept on this device.")).toBeVisible()
  await expect(page.getByRole("link", { name: /Open Rooftop/ }).first()).toHaveAttribute("href", "https://rooftop.solarlayout.app")
  await page.getByRole("link", { name: /Start reading/i }).first().click()
  await expect(page).toHaveURL(/\/docs\/rooftop\/getting-started$/)
})

test("a Rooftop article page is title-branded Rooftop", async ({ page }) => {
  await page.goto("/docs/rooftop/getting-started")
  await expect(page).toHaveTitle(/· SolarLayout Rooftop Docs$/)
})

test("the /docs/rooftop landing links back to the index", async ({ page }) => {
  await page.goto("/docs/rooftop")
  await page.getByRole("link", { name: /All products/i }).first().click()
  await expect(page).toHaveURL(/\/docs$/)
})

test("the product switcher lists the three products and All products, and switches", async ({ page }) => {
  await page.goto("/docs/rooftop/getting-started")
  await page.locator("#nd-sidebar").getByRole("button", { name: /SolarLayout Rooftop/ }).first().click()
  for (const name of ["SolarLayout Desktop", "BESS Desktop", "SolarLayout Rooftop", "All products"]) {
    await expect(page.getByRole("link", { name: new RegExp(name) }).last()).toBeVisible()
  }
  await page.getByRole("link", { name: /BESS Desktop/ }).last().click()
  await expect(page).toHaveURL(/\/docs\/bess/)
})

test("search in SolarLayout Rooftop finds a Rooftop page", async ({ page }) => {
  await page.goto("/docs/rooftop/intro")
  await page.keyboard.press("ControlOrMeta+k")
  const input = page.getByRole("searchbox").or(page.getByPlaceholder(/search/i)).first()
  await expect(input).toBeVisible()
  await input.fill("project file")
  const dialog = page.getByRole("dialog")
  await dialog.getByRole("button", { name: "SolarLayout Rooftop", exact: true }).click()
  const result = dialog.getByRole("button", { name: /SolarLayout Rooftop/ }).filter({ hasText: /designs|project file/i }).first()
  await expect(result, "search returned no Rooftop result — check /docs/api/search indexes rooftopSource").toBeVisible({ timeout: 15_000 })
  await result.click()
  await expect(page).toHaveURL(/\/docs\/rooftop\//)
})
