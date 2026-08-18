import { test, expect } from "@playwright/test"
import {
  allDocsPaths,
  internalLinks,
  manifestIds,
  navSlugs,
  referencedScreenshotIds,
} from "./helpers"

/**
 * Every content page must render as a real page: a heading, a description, no
 * MDX fallout, and no unknown-screenshot error block.
 *
 * The page list comes off disk, so this grows with the content on its own.
 */
const PAGES = allDocsPaths()

test("there are content pages to test", () => {
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

    // A title, and a non-empty one.
    const h1 = page.getByRole("heading", { level: 1 })
    await expect(h1).toBeVisible()
    expect((await h1.textContent())?.trim()).toBeTruthy()

    const body = await page.locator("body").innerText()

    // Raw MDX or an unresolved component leaking into the rendered text.
    expect(body, `${url} contains a raw MDX/component artefact`).not.toMatch(
      /<(Screenshot|Callout|Steps|Step|Cards|Card|Tabs|Tab|Accordions|Accordion|Release)\b/,
    )
    // The frontmatter fence escaping into the body.
    expect(body, `${url} leaks frontmatter`).not.toContain("---\ntitle:")
    // The Screenshot component's own error state for an unknown id.
    expect(body, `${url} references an unknown screenshot id`).not.toContain(
      "Unknown screenshot id",
    )

    expect(consoleErrors, `${url} logged console errors`).toEqual([])
  })
}

test("every page is reachable from the sidebar navigation", () => {
  const nav = navSlugs()
  const listed = new Set<string>()
  for (const { section, pages } of nav) {
    for (const p of pages) {
      listed.add(section ? `/docs/${section}/${p}` : `/docs/${p}`)
      // A root entry naming a directory stands for that whole section.
      if (!section) listed.add(`/docs/${p}`)
    }
  }

  const sectionNames = new Set(nav.map((n) => n.section).filter(Boolean))
  const orphans = PAGES.filter((p) => {
    if (listed.has(p)) return false
    // `/docs/<section>/<page>` is covered when the section itself is listed
    // at the root AND the page is listed in that section's own meta.
    const parts = p.split("/").filter(Boolean) // ["docs", section?, page]
    if (parts.length === 3 && sectionNames.has(parts[1])) {
      const sec = nav.find((n) => n.section === parts[1])
      return !sec?.pages.includes(parts[2])
    }
    return true
  })

  expect(
    orphans,
    `these pages exist but are not listed in any meta.json, so nothing links to them: ${orphans.join(", ")}`,
  ).toEqual([])
})

test("every internal link in the content resolves to a real page", () => {
  const valid = new Set(PAGES)
  valid.add("/docs")

  const broken = internalLinks().filter(({ href }) => {
    const withoutHash = href.split("#")[0].replace(/\/$/, "")
    if (withoutHash === "" || withoutHash === "/docs") return false
    return !valid.has(withoutHash)
  })

  const detail = broken
    .map(({ href, file }) => `${href}  (in ${file})`)
    .sort()
    .join("\n  ")

  expect(broken, `broken internal links:\n  ${detail}`).toEqual([])
})

test("every referenced screenshot id exists in the manifest", () => {
  const known = new Set(manifestIds())
  const unknown = referencedScreenshotIds().filter(({ id }) => !known.has(id))

  const detail = unknown
    .map(({ id, file }) => `${id}  (in ${file})`)
    .sort()
    .join("\n  ")

  expect(unknown, `unknown screenshot ids:\n  ${detail}`).toEqual([])
})
