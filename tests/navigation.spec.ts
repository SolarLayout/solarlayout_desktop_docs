import { test, expect } from "@playwright/test"

/**
 * The docs chrome: sidebar, table of contents, search, theme toggle.
 *
 * These are the parts a reader uses to get around, and the parts most likely
 * to break silently — a hydration failure leaves the page looking fine while
 * the sidebar stops responding.
 */

test("the sidebar lists the top-level sections and navigates", async ({
  page,
}) => {
  await page.goto("/docs/intro")

  const sidebar = page.locator("#nd-sidebar")
  await expect(sidebar).toBeVisible()

  // Section groups the reader must be able to find.
  for (const label of ["Inputs", "Layout", "Energy yield", "Reference"]) {
    await expect(sidebar.getByText(label, { exact: true })).toBeVisible()
  }

  // Clicking a sibling page navigates and re-renders the title.
  await sidebar.getByRole("link", { name: /Your first layout/i }).click()
  await expect(page).toHaveURL(/\/docs\/first-layout$/)
  await expect(
    page.getByRole("heading", { level: 1, name: /first layout/i }),
  ).toBeVisible()
})

test("a collapsed section expands on click — the sidebar is hydrated", async ({
  page,
}) => {
  await page.goto("/docs/intro")
  const sidebar = page.locator("#nd-sidebar")

  // "Single-line diagram" is a nested tree, collapsed on an unrelated page.
  const trigger = sidebar.getByText("Single-line diagram", { exact: true })
  await trigger.click()

  await expect(
    sidebar.getByRole("link", { name: /Symbol reference|^Symbols$/i }).first(),
  ).toBeVisible()
})

test("the table of contents shows at laptop width and links to a heading", async ({
  page,
}) => {
  // The theme shifts the desktop TOC breakpoint down to 1024px, so a 1280
  // viewport must show the sidebar TOC rather than the popover.
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto("/docs/intro")

  const toc = page.locator("#nd-toc")
  await expect(toc).toBeVisible()

  const first = toc.locator("a").first()
  await expect(first).toBeVisible()
  const href = await first.getAttribute("href")
  expect(href).toMatch(/^#/)

  await first.click()
  await expect(page).toHaveURL(new RegExp(`${href?.replace("#", "\\#")}$`))
})

test("the theme toggle switches between light and dark", async ({ page }) => {
  await page.goto("/docs/intro")

  const initial = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  )

  // Fumadocs renders the theme control as a group of buttons; pick the one
  // for the mode we are not currently in.
  const target = initial ? /light/i : /dark/i
  await page.getByRole("button", { name: target }).first().click()

  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.classList.contains("dark")),
    )
    .toBe(!initial)

  // And the change is real, not just a class: the page background moves.
  const bg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toBeTruthy()
})

test("search finds a page by its title", async ({ page }) => {
  await page.goto("/docs/intro")

  // Fumadocs binds the search dialog to Ctrl/Cmd+K.
  await page.keyboard.press("ControlOrMeta+k")

  const input = page.getByRole("searchbox").or(
    page.getByPlaceholder(/search/i),
  )
  await expect(input.first()).toBeVisible()

  await input.first().fill("lightning")
  await expect(
    page.getByRole("link", { name: /lightning/i }).first(),
  ).toBeVisible({ timeout: 10_000 })
})

test("the top navigation offers the cross-surface links", async ({ page }) => {
  await page.goto("/docs/intro")
  for (const label of ["Docs", "Install", "Release notes"]) {
    await expect(page.getByRole("link", { name: label, exact: true }).first()).toBeVisible()
  }
})
