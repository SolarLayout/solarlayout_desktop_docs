import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"
import { test, expect } from "@playwright/test"

/**
 * Every SolarLayout Rooftop page renders as a real page, is in the sidebar, links only to Rooftop pages that exist, and
 * shows only captured screenshots. The twin of `tests/bess-content.spec.ts` for the flat `content/rooftop` tree; the
 * page list comes off disk, so it grows with the content.
 */
const TREE = path.join(process.cwd(), "content", "rooftop")
const BASE = "/docs/rooftop"
const files = fs.readdirSync(TREE).filter((f) => f.endsWith(".mdx"))
const PAGES = files.map((f) => `${BASE}/${f.replace(/\.mdx$/, "")}`).sort()
const read = (f: string) => fs.readFileSync(path.join(TREE, f), "utf8")

test("there are Rooftop content pages to test", () => {
  expect(PAGES.length).toBeGreaterThan(0)
})

for (const url of PAGES) {
  test(`renders ${url}`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text())
    })
    page.on("pageerror", (err) => consoleErrors.push(err.message))

    const res = await page.goto(url)
    expect(res?.status(), `${url} did not return 200`).toBe(200)
    const h1 = page.getByRole("heading", { level: 1 })
    await expect(h1).toBeVisible()
    expect((await h1.textContent())?.trim()).toBeTruthy()

    const body = await page.locator("body").innerText()
    expect(body, `${url} contains a raw MDX/component artefact`).not.toMatch(
      /<(Screenshot|Callout|Steps|Step|Cards|Card|Tabs|Tab|Accordions|Accordion)\b/,
    )
    expect(body, `${url} leaks frontmatter`).not.toContain("---\ntitle:")
    expect(body, `${url} references an unknown screenshot id`).not.toContain("Unknown screenshot id")
    expect(consoleErrors, `${url} logged console errors`).toEqual([])
  })
}

test("every Rooftop page is in the sidebar, and every sidebar entry is a page", () => {
  const listed = (JSON.parse(read("meta.json")) as { pages: string[] }).pages.map((p) => `${BASE}/${p}`).sort()
  expect(listed).toEqual(PAGES)
})

test("every internal /docs/rooftop link in the content resolves to a real page", () => {
  const valid = new Set([BASE, ...PAGES])
  const broken = files.flatMap((f) =>
    [...read(f).matchAll(/\]\((\/docs\/rooftop[^)\s#]*)|href="(\/docs\/rooftop[^"#]*)"/g)]
      .map((m) => (m[1] ?? m[2]).replace(/\/$/, ""))
      .filter((href) => !valid.has(href))
      .map((href) => `${f}: ${href}`),
  )
  expect(broken).toEqual([])
})

test("every screenshot a Rooftop page shows is in the manifest and on disk", () => {
  const manifest = fs.readFileSync(path.join(TREE, "screenshots.ts"), "utf8")
  const fileOf = new Map([...manifest.matchAll(/id: "([^"]+)",\s*file: "([^"]+)"/g)].map((m) => [m[1], m[2]]))
  const missing = files.flatMap((f) =>
    [...read(f).matchAll(/<Screenshot\s+id="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((id) => !fileOf.has(id) || !fs.existsSync(path.join(process.cwd(), "public", "screenshots", fileOf.get(id)!)))
      .map((id) => `${f}: ${id}`),
  )
  expect(missing).toEqual([])
})

test("every Rooftop fact-sheet citation resolves to a real file:line", () => {
  let out = ""
  try {
    out = execFileSync("node", ["scripts/check-rooftop-facts-citations.mjs"], { encoding: "utf8", env: { ...process.env } })
  } catch (e) {
    throw new Error((e as { stderr?: string }).stderr || String(e))
  }
  expect(out).toMatch(/All \d+ Rooftop fact citations resolve\./)
})
