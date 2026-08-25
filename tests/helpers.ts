import fs from "node:fs"
import path from "node:path"

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs")
const BESS_CONTENT_ROOT = path.join(process.cwd(), "content", "bess")

/**
 * Every docs URL, derived from the MDX files on disk rather than a hard-coded
 * list — so a page added later is tested without touching the suite, and a
 * page deleted later cannot leave a stale assertion passing.
 */
export function allDocsPaths(): string[] {
  const out: string[] = []

  const walk = (dir: string, prefix: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full, `${prefix}${entry.name}/`)
      } else if (entry.name.endsWith(".mdx")) {
        out.push(`/docs/${prefix}${entry.name.replace(/\.mdx$/, "")}`)
      }
    }
  }

  walk(CONTENT_ROOT, "")
  return out.sort()
}

/**
 * Slugs listed in the `meta.json` sidebar files. Used to catch a page that
 * exists on disk but was never added to the navigation — it would render at
 * its URL while being unreachable by clicking.
 */
export function navSlugs(): { section: string; pages: string[] }[] {
  const out: { section: string; pages: string[] }[] = []

  const read = (file: string, section: string) => {
    if (!fs.existsSync(file)) return
    const meta = JSON.parse(fs.readFileSync(file, "utf8")) as {
      pages?: string[]
    }
    out.push({ section, pages: meta.pages ?? [] })
  }

  read(path.join(CONTENT_ROOT, "meta.json"), "")
  for (const entry of fs.readdirSync(CONTENT_ROOT, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      read(path.join(CONTENT_ROOT, entry.name, "meta.json"), entry.name)
    }
  }
  return out
}

/** Ids declared in the screenshot manifest. */
export function manifestIds(): string[] {
  const src = fs.readFileSync(
    path.join(process.cwd(), "content", "screenshots.ts"),
    "utf8",
  )
  return [...src.matchAll(/^ {4}id: "([^"]+)"/gm)].map((m) => m[1])
}

/** Screenshot ids actually referenced by content pages. */
export function referencedScreenshotIds(): { id: string; file: string }[] {
  const out: { id: string; file: string }[] = []

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith(".mdx")) {
        const src = fs.readFileSync(full, "utf8")
        for (const m of src.matchAll(/<Screenshot\s+id="([^"]+)"/g)) {
          out.push({ id: m[1], file: path.relative(process.cwd(), full) })
        }
      }
    }
  }

  walk(CONTENT_ROOT)
  return out
}

/** Internal links written in the content, with the file that wrote them. */
export function internalLinks(): { href: string; file: string }[] {
  const out: { href: string; file: string }[] = []

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
      // Markdown links: [text](/docs/…)
      for (const m of src.matchAll(/\]\((\/docs\/[^)\s]*)\)/g)) {
        out.push({ href: m[1], file: rel })
      }
      // Card / component props: href="/docs/…"
      for (const m of src.matchAll(/href="(\/docs\/[^"]*)"/g)) {
        out.push({ href: m[1], file: rel })
      }
    }
  }

  walk(CONTENT_ROOT)
  return out
}

/**
 * `/bess`-tree variants of the helpers above. Kept parallel rather than
 * generalising the `/docs` helpers, since those are hard-coded to
 * `content/docs` and the `/docs/` prefix throughout.
 */

/**
 * Every BESS docs URL, derived from the MDX files on disk — see
 * `allDocsPaths()`.
 */
export function allBessDocsPaths(): string[] {
  const out: string[] = []

  const walk = (dir: string, prefix: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full, `${prefix}${entry.name}/`)
      } else if (entry.name.endsWith(".mdx")) {
        out.push(`/bess/${prefix}${entry.name.replace(/\.mdx$/, "")}`)
      }
    }
  }

  walk(BESS_CONTENT_ROOT, "")
  return out.sort()
}

/** Slugs listed in the `content/bess/**\/meta.json` sidebar files. */
export function bessNavSlugs(): { section: string; pages: string[] }[] {
  const out: { section: string; pages: string[] }[] = []

  const read = (file: string, section: string) => {
    if (!fs.existsSync(file)) return
    const meta = JSON.parse(fs.readFileSync(file, "utf8")) as {
      pages?: string[]
    }
    out.push({ section, pages: meta.pages ?? [] })
  }

  read(path.join(BESS_CONTENT_ROOT, "meta.json"), "")
  for (const entry of fs.readdirSync(BESS_CONTENT_ROOT, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      read(path.join(BESS_CONTENT_ROOT, entry.name, "meta.json"), entry.name)
    }
  }
  return out
}

/** Ids declared in the BESS screenshot manifest. */
export function bessManifestIds(): string[] {
  const src = fs.readFileSync(
    path.join(process.cwd(), "content", "bess", "screenshots.ts"),
    "utf8",
  )
  return [...src.matchAll(/^ {4}id: "([^"]+)"/gm)].map((m) => m[1])
}

/** Screenshot ids actually referenced by BESS content pages. */
export function bessReferencedScreenshotIds(): { id: string; file: string }[] {
  const out: { id: string; file: string }[] = []

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith(".mdx")) {
        const src = fs.readFileSync(full, "utf8")
        for (const m of src.matchAll(/<Screenshot\s+id="([^"]+)"/g)) {
          out.push({ id: m[1], file: path.relative(process.cwd(), full) })
        }
      }
    }
  }

  walk(BESS_CONTENT_ROOT)
  return out
}

/** Internal `/bess/…` links written in the BESS content, with the file that wrote them. */
export function bessInternalLinks(): { href: string; file: string }[] {
  const out: { href: string; file: string }[] = []

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
      // Markdown links: [text](/bess/…)
      for (const m of src.matchAll(/\]\((\/bess\/[^)\s]*)\)/g)) {
        out.push({ href: m[1], file: rel })
      }
      // Card / component props: href="/bess/…"
      for (const m of src.matchAll(/href="(\/bess\/[^"]*)"/g)) {
        out.push({ href: m[1], file: rel })
      }
    }
  }

  walk(BESS_CONTENT_ROOT)
  return out
}
