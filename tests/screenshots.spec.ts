import fs from "node:fs"
import path from "node:path"
import { test, expect } from "@playwright/test"
import { referencedScreenshotIds } from "./helpers"

/**
 * The screenshot placeholder mechanism.
 *
 * This is the one piece of behaviour unique to this site, and the one most
 * likely to regress unnoticed: if the build-time existence check breaks, every
 * page silently shows a placeholder (or a broken image) and still looks
 * plausible. So assert both branches explicitly.
 */

const SHOT_DIR = path.join(process.cwd(), "public", "screenshots")

/** A referenced id whose file is NOT on disk, and one whose file IS. */
function partitionByPresence() {
  const src = fs.readFileSync(
    path.join(process.cwd(), "content", "screenshots.ts"),
    "utf8",
  )
  const fileById = new Map<string, string>()
  const blocks = src.split(/\n {2}\{\n/).slice(1)
  for (const b of blocks) {
    const id = b.match(/^\s*id: "([^"]+)"/m)?.[1]
    const file = b.match(/^\s*file: "([^"]+)"/m)?.[1]
    if (id && file) fileById.set(id, file)
  }

  const referenced = referencedScreenshotIds()
  const pending: { id: string; file: string; page: string }[] = []
  const captured: { id: string; file: string; page: string }[] = []

  for (const { id, file: mdxFile } of referenced) {
    const shot = fileById.get(id)
    if (!shot) continue
    const url =
      "/" +
      path
        .relative(path.join(process.cwd(), "content"), path.join(process.cwd(), mdxFile))
        .replace(/\.mdx$/, "")
        .replace(/\\/g, "/")
    const entry = { id, file: shot, page: url }
    if (fs.existsSync(path.join(SHOT_DIR, shot))) captured.push(entry)
    else pending.push(entry)
  }
  return { pending, captured }
}

const { pending, captured } = partitionByPresence()

test("content actually references screenshots", () => {
  expect(referencedScreenshotIds().length).toBeGreaterThan(0)
})

test("a pending screenshot renders a placeholder carrying its capture brief", async ({
  page,
}) => {
  test.skip(pending.length === 0, "every referenced screenshot is captured")

  const target = pending[0]
  await page.goto(target.page)

  const placeholder = page.locator(
    `[data-screenshot-placeholder="${target.id}"]`,
  )
  await expect(placeholder).toBeVisible()

  // The brief is the point of the placeholder — it must carry all of it.
  await expect(placeholder.getByText("Screenshot pending")).toBeVisible()
  await expect(placeholder.getByText(target.file)).toBeVisible()
  await expect(placeholder.getByText("What it shows")).toBeVisible()
  await expect(placeholder.getByText("How to get there")).toBeVisible()

  // And it must NOT be a broken image.
  await expect(placeholder.locator("img")).toHaveCount(0)
})

test("a captured screenshot renders as a real image that loads", async ({
  page,
}) => {
  test.skip(
    captured.length === 0,
    "no screenshots captured yet — this passes once the first PNG lands",
  )

  const target = captured[0]
  await page.goto(target.page)

  const img = page.locator(`img[src="/screenshots/${target.file}"]`)
  await expect(img).toBeVisible()

  // Loaded, not a broken-image placeholder: natural dimensions are non-zero.
  const size = await img.evaluate((el) => ({
    w: (el as HTMLImageElement).naturalWidth,
    h: (el as HTMLImageElement).naturalHeight,
  }))
  expect(size.w).toBeGreaterThan(0)
  expect(size.h).toBeGreaterThan(0)

  // And no placeholder for the same id is rendered alongside it.
  await expect(
    page.locator(`[data-screenshot-placeholder="${target.id}"]`),
  ).toHaveCount(0)
})

test("no page renders the unknown-id error block", async ({ page }) => {
  // Cheap belt-and-braces over the static check in content.spec.ts, run
  // against the rendered DOM rather than the source.
  const pages = [...new Set(referencedScreenshotIds().map((r) => r.file))]
    .slice(0, 12)
    .map(
      (f) =>
        "/" +
        path
          .relative(path.join(process.cwd(), "content"), path.join(process.cwd(), f))
          .replace(/\.mdx$/, "")
          .replace(/\\/g, "/"),
    )

  for (const url of pages) {
    await page.goto(url)
    await expect(page.getByText("Unknown screenshot id")).toHaveCount(0)
  }
})
