import { test, expect } from "@playwright/test"

/**
 * Cross-app check: this site is also reachable at `solarlayout.app/docs`, via a
 * rewrite in solarlayout_web. That path has its own failure mode which no
 * amount of local testing catches — with a relative asset prefix, the proxied
 * HTML resolves `/_next/static/*` against the apex and lands in
 * solarlayout_web's chunk namespace, so every request 404s and the page renders
 * unstyled and unhydrated. That shipped once (2026-08-18).
 *
 * Opt-in, because it depends on a live deployment of a DIFFERENT app and would
 * otherwise make the default suite fail for reasons unrelated to this repo:
 *
 *   E2E_PROXY_URL=https://solarlayout.app bun run test:e2e
 *
 * Assertions are on computed style and a hydrated control, not on HTTP status —
 * a stylesheet can return 200 and still not apply.
 */
const PROXY_URL = process.env.E2E_PROXY_URL

test.describe("proxied through solarlayout.app/docs", () => {
  test.skip(!PROXY_URL, "set E2E_PROXY_URL to run the cross-app proxy check")

  test("the docs index renders styled, with every asset loading", async ({
    page,
  }) => {
    const failed: string[] = []
    page.on("response", (r) => {
      if (!r.ok() && /_next|\/fonts\/|\/screenshots\//.test(r.url())) {
        failed.push(`${r.status()} ${r.url()}`)
      }
    })

    await page.goto(`${PROXY_URL}/docs`, { waitUntil: "networkidle" })

    expect(
      failed,
      `asset requests failed through the proxy — check NEXT_PUBLIC_ASSET_PREFIX:\n  ${failed.join("\n  ")}`,
    ).toEqual([])

    // Proof the stylesheet applied, not merely that it returned 200.
    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    )
    expect(bg, "body has no background colour — the theme CSS did not apply").not.toBe(
      "rgba(0, 0, 0, 0)",
    )

    const family = await page.evaluate(
      () => getComputedStyle(document.documentElement).fontFamily,
    )
    expect(family, "Geist is not applied — the font CSS did not load").toContain(
      "Geist",
    )

    await expect(
      page.getByRole("heading", { level: 1, name: /Design a plant with/i }),
    ).toBeVisible()
  })

  test("a content page is styled and its sidebar hydrated", async ({ page }) => {
    await page.goto(`${PROXY_URL}/docs/intro`, { waitUntil: "networkidle" })

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()

    const sidebar = page.locator("#nd-sidebar")
    await expect(sidebar).toBeVisible()

    // Expanding a collapsed section proves the JS chunks loaded and ran — the
    // half of the bug a screenshot of a styled page would still miss.
    await sidebar.getByText("Single-line diagram", { exact: true }).click()
    await expect(
      sidebar.getByRole("link", { name: /Symbol/i }).first(),
    ).toBeVisible()
  })
})
