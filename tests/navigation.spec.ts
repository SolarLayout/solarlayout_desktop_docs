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

test("the theme toggle changes the theme and the painted background", async ({
  page,
}) => {
  await page.goto("/docs/intro")

  // Fumadocs renders a single control labelled "Toggle Theme" that cycles
  // through the modes — not one button per mode. So assert that the theme
  // CHANGED, rather than that it reached a particular one.
  const toggle = page.getByRole("button", { name: /toggle theme/i }).first()
  await expect(toggle).toBeVisible()

  const readState = () =>
    page.evaluate(() => ({
      dark: document.documentElement.classList.contains("dark"),
      bg: getComputedStyle(document.body).backgroundColor,
    }))

  const before = await readState()

  // Cycle until the resolved theme flips. Three clicks covers a
  // light/dark/system cycle from any starting point.
  for (let i = 0; i < 3; i += 1) {
    await toggle.click()
    const now = await readState()
    if (now.dark !== before.dark) break
  }

  const after = await readState()
  expect(
    after.dark,
    "the .dark class on <html> did not change after cycling the theme control",
  ).not.toBe(before.dark)

  // The class change must actually repaint — this is what catches a broken
  // theme bridge in app/global.css, which a class-only assertion would miss.
  expect(
    after.bg,
    "the theme class changed but the page background did not, so the token bridge is not applying",
  ).not.toBe(before.bg)
})

test("search returns a real result, not just an empty dialog", async ({
  page,
}) => {
  // Worth asserting a result rather than the dialog: without the /api/search
  // route the dialog still opens and accepts typing, and every query silently
  // returns nothing. That reads as "search is bad" rather than "search is
  // broken", so only a positive result proves the backend is wired.
  await page.goto("/docs/intro")

  await page.keyboard.press("ControlOrMeta+k")

  const input = page
    .getByRole("searchbox")
    .or(page.getByPlaceholder(/search/i))
    .first()
  await expect(input).toBeVisible()

  await input.fill("lightning")

  // Results render as buttons inside the dialog, not as anchors — so match on
  // the button role rather than the link role.
  const dialog = page.getByRole("dialog")
  const result = dialog
    .getByRole("button", { name: /lightning arresters/i })
    .first()

  await expect(
    result,
    "search returned no result for a term that appears in a page title — check /api/search",
  ).toBeVisible({ timeout: 15_000 })

  // And the result must navigate somewhere real. Which page ranks first is the
  // search engine's business — several pages mention arresters — so assert the
  // invariant that matters: it lands on a docs page that renders.
  await result.click()
  await expect(page).toHaveURL(/\/docs\//)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
})

test("the top navigation offers the cross-surface and product-switch links", async ({ page }) => {
  await page.goto("/docs/intro")
  for (const label of ["Docs", "Install", "Release notes"]) {
    await expect(page.getByRole("link", { name: label, exact: true }).first()).toBeVisible()
  }
  // The product switcher: a link to the BESS tree.
  await expect(page.getByRole("link", { name: "BESS Desktop", exact: true }).first()).toBeVisible()
})
