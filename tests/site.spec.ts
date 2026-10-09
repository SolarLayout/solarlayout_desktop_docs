import { test, expect } from "@playwright/test"

/**
 * The SolarLayout Desktop landing surface, rendered at `/docs/solarlayout`
 * (DocsLanding). `/docs` is the company-level index and `/` redirects to it —
 * see tests/bess.spec.ts for the index's assertions.
 */
test("landing renders at /docs/solarlayout", async ({ page }) => {
  await page.goto("/docs/solarlayout")

  await expect(
    page.getByRole("heading", { level: 1, name: /Design a plant with/i }),
  ).toBeVisible()

  // The three sections that make the index useful, not just present.
  await expect(page.getByText("Start here", { exact: true })).toBeVisible()
  await expect(page.getByText("Browse by topic", { exact: true })).toBeVisible()

  await expect(
    page.getByRole("link", { name: /Start reading/i }).first(),
  ).toBeVisible()

  // The "Start here" row must offer three real destinations.
  const startHere = page.getByRole("link", {
    name: /Install SolarLayout Desktop|Prepare your boundary file|Your first layout/,
  })
  await expect(startHere).toHaveCount(3)
})

test("landing links to a page that actually resolves", async ({ page }) => {
  await page.goto("/docs/solarlayout")
  await page.getByRole("link", { name: /Start reading/i }).first().click()
  await expect(page).toHaveURL(/\/docs\/first-layout$/)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
})

test("the SolarLayout Desktop landing links back to the index", async ({ page }) => {
  await page.goto("/docs/solarlayout")
  const back = page.getByRole("link", { name: /All products/i }).first()
  await expect(back).toBeVisible()
  await back.click()
  await expect(page).toHaveURL(/\/docs$/)
})

test("brand fonts are actually served, not silently falling back", async ({
  page,
}) => {
  const failed: string[] = []
  page.on("response", (res) => {
    if (res.url().includes("/fonts/") && !res.ok()) failed.push(res.url())
  })

  await page.goto("/")
  await page.waitForLoadState("networkidle")

  expect(failed, `font requests returned an error: ${failed.join(", ")}`).toEqual(
    [],
  )

  const family = await page.evaluate(() =>
    getComputedStyle(document.documentElement).fontFamily,
  )
  expect(family).toContain("Geist")
})

test("no console errors on the landing page", async ({ page }) => {
  const errors: string[] = []
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text())
  })
  page.on("pageerror", (err) => errors.push(err.message))

  await page.goto("/")
  await page.waitForLoadState("networkidle")

  expect(errors).toEqual([])
})

test("a missing page returns a not-found rather than a broken render", async ({
  page,
}) => {
  const res = await page.goto("/docs/this-page-does-not-exist")
  expect(res?.status()).toBe(404)
})
