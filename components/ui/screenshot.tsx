import fs from "node:fs"
import path from "node:path"
import Image from "next/image"
import { Camera, ImageOff } from "lucide-react"
import { SCREENSHOTS_BY_ID } from "@/content/screenshots"

/**
 * `<Screenshot id="…" />` — the only way this site renders a product image.
 *
 * A server component on purpose. Pages are statically generated, so the
 * component can look on disk at build time and decide between two outputs:
 *
 *   • file present  → `next/image`, sized from the file's real intrinsic
 *     dimensions, so nothing has to record width/height by hand and the
 *     page never reflows.
 *   • file absent   → a placeholder carrying the capture brief, so an
 *     un-shot image reads as "pending, and here is what it needs to show"
 *     rather than as a broken page.
 *
 * The consequence worth knowing: dropping a PNG at
 * `public/screenshots/<file>` is the entire act of publishing it. No code
 * or content edit is involved.
 *
 * Every id must exist in `content/screenshots.ts`. An unknown id renders a
 * loud error block rather than failing the build, so one typo in one page
 * cannot block a release — but it is visible immediately in review.
 */
interface ScreenshotProps {
  id: string
  /** Overrides the manifest caption. Rarely needed. */
  caption?: string
  /** Cap the rendered width, for narrow images like a single panel group. */
  maxWidth?: number
}

const SCREENSHOT_ROOT = path.join(process.cwd(), "public", "screenshots")

/** Intrinsic pixel size of an image on disk, or null if it cannot be read. */
function intrinsicSize(absPath: string): { width: number; height: number } | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { imageSize } = require("image-size") as {
      imageSize: (b: Uint8Array) => { width?: number; height?: number }
    }
    const dim = imageSize(fs.readFileSync(absPath))
    if (dim.width && dim.height) return { width: dim.width, height: dim.height }
    return null
  } catch {
    return null
  }
}

export function Screenshot({ id, caption, maxWidth }: ScreenshotProps) {
  const spec = SCREENSHOTS_BY_ID[id]

  if (!spec) {
    return (
      <div className="not-prose my-6 rounded-lg border border-red-500/40 bg-red-500/5 p-4 text-[13px] text-red-600 dark:text-red-400">
        <span className="font-medium">Unknown screenshot id</span>{" "}
        <code className="font-mono">{id}</code> — add it to{" "}
        <code className="font-mono">content/screenshots.ts</code>.
      </div>
    )
  }

  const absPath = path.join(SCREENSHOT_ROOT, spec.file)
  const size = fs.existsSync(absPath) ? intrinsicSize(absPath) : null

  if (!size) {
    return <ScreenshotPlaceholder spec={spec} />
  }

  return (
    <figure className="not-prose my-6" style={maxWidth ? { maxWidth } : undefined}>
      <Image
        src={`/screenshots/${spec.file}`}
        alt={spec.alt}
        width={size.width}
        height={size.height}
        className="h-auto w-full rounded-lg border border-fd-border"
      />
      <figcaption className="mt-[10px] flex items-start gap-[6px] text-[12px] leading-[1.6] text-fd-muted-foreground">
        <Camera className="mt-[3px] size-[12px] shrink-0" aria-hidden />
        <span>{caption ?? spec.title}</span>
      </figcaption>
    </figure>
  )
}

/**
 * The pending state. Deliberately detailed: it doubles as the capture brief,
 * so whoever takes the screenshot can work from the page itself rather than
 * cross-referencing the worklist spreadsheet.
 */
function ScreenshotPlaceholder({
  spec,
}: {
  spec: (typeof SCREENSHOTS_BY_ID)[string]
}) {
  return (
    <figure
      className="not-prose my-6 overflow-hidden rounded-lg border border-dashed border-fd-border bg-fd-muted/40"
      data-screenshot-placeholder={spec.id}
    >
      <div className="flex items-center gap-[8px] border-b border-dashed border-fd-border px-[16px] py-[10px]">
        <ImageOff className="size-[14px] text-fd-muted-foreground" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fd-muted-foreground">
          Screenshot pending
        </span>
        <span className="ml-auto font-mono text-[10px] text-fd-muted-foreground">
          {spec.file}
        </span>
      </div>

      <div className="px-[16px] py-[14px]">
        <div className="text-[13px] font-medium text-fd-foreground">
          {spec.title}
        </div>

        <dl className="mt-[10px] grid gap-[8px] text-[12px] leading-[1.6]">
          <div>
            <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-fd-muted-foreground">
              What it shows
            </dt>
            <dd className="mt-[2px] text-fd-foreground/80">{spec.what}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-fd-muted-foreground">
              How to get there
            </dt>
            <dd className="mt-[2px] text-fd-foreground/80">{spec.state}</dd>
          </div>
          {spec.annotations ? (
            <div>
              <dt className="font-mono text-[10px] tracking-[0.12em] uppercase text-fd-muted-foreground">
                Callouts to add
              </dt>
              <dd className="mt-[2px] text-fd-foreground/80">
                {spec.annotations}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </figure>
  )
}
