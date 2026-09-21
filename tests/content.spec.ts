import fs from "node:fs"
import path from "node:path"
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

test("no page carries an unresolved placeholder", () => {
  // Customer-facing docs ship no open questions. A VERIFY comment is invisible
  // in the rendered page, which is exactly why it rots quietly — and a "TBD"
  // passed to a component renders as visible nonsense. Both are caught here so
  // neither can reach a release, whichever way it would have leaked.
  const offenders: string[] = []

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (!entry.name.endsWith(".mdx")) continue
      const src = fs.readFileSync(full, "utf8")
      const rel = path.relative(process.cwd(), full)
      src.split("\n").forEach((line, i) => {
        if (/VERIFY|\bTBD\b|\bTODO\b|\bFIXME\b|\bXXX\b/.test(line)) {
          offenders.push(`${rel}:${i + 1}  ${line.trim().slice(0, 90)}`)
        }
      })
    }
  }
  walk(path.join(process.cwd(), "content", "docs"))

  expect(
    offenders,
    `unresolved placeholders in customer-facing content:\n  ${offenders.join("\n  ")}`,
  ).toEqual([])
})

test("every manifest entry and every referenced screenshot has its file on disk", () => {
  // The site never ships a "Screenshot pending" placeholder: an entry without
  // its image, or a page referencing one, fails here before it can be merged.
  const src = fs.readFileSync(
    path.join(process.cwd(), "content", "screenshots.ts"),
    "utf8",
  )
  const fileById = new Map<string, string>()
  for (const block of src.split(/\n {2}\{\n/).slice(1)) {
    const id = block.match(/^\s*id: "([^"]+)"/m)?.[1]
    const file = block.match(/^\s*file: "([^"]+)"/m)?.[1]
    if (id && file) fileById.set(id, file)
  }
  const shotDir = path.join(process.cwd(), "public", "screenshots")
  const missing = [...fileById.entries()]
    .filter(([, file]) => !fs.existsSync(path.join(shotDir, file)))
    .map(([id, file]) => `${id} -> ${file}`)
  expect(missing, `manifest entries without an image:\n  ${missing.join("\n  ")}`).toEqual([])

  const unfiled = referencedScreenshotIds()
    .filter(({ id }) => {
      const file = fileById.get(id)
      return !file || !fs.existsSync(path.join(shotDir, file))
    })
    .map(({ id, file }) => `${id}  (in ${file})`)
  expect(unfiled, `referenced screenshots without an image:\n  ${unfiled.join("\n  ")}`).toEqual([])
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
