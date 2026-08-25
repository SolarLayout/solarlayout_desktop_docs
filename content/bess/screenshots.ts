/**
 * BESS screenshot manifest — the single source of truth for every image the
 * `/bess` docs tree references.
 *
 * A standalone twin of `content/screenshots.ts` (same `ScreenshotSpec` shape,
 * imported rather than redeclared to avoid drift), kept as its own file
 * because the two products' capture worklists ship on independent schedules
 * and must never cross-reference each other's rows.
 *
 * Two consumers read this file, which is why it exists at all:
 *
 *   1. `<Screenshot id="…" />` (components/ui/screenshot.tsx) renders the
 *      image when the file is present under `public/screenshots/`, and a
 *      placeholder carrying `what` + `state` when it is not.
 *   2. `scripts/build-bess-screenshot-index.mjs` emits
 *      `docs/bess-screenshot-index.xlsx` — the capture worklist handed to
 *      whoever takes the screenshots.
 *
 * Because both read the same rows, the worklist can never drift from the
 * pages, and a captured file needs no code change: drop it at
 * `public/screenshots/<file>` and it appears.
 *
 * BESS ids are always `bess-`-prefixed, so they can never collide with a
 * SolarLayout id in the merged lookup `<Screenshot>` resolves against.
 *
 * `priority` lets the capture work happen in waves:
 *   1 — essential; the page does not make sense without it
 *   2 — valuable; explains something the prose can only describe
 *   3 — nice to have; polish
 */
import type { ScreenshotSpec } from "@/content/screenshots"

export const SCREENSHOTS: ScreenshotSpec[] = []

/** Lookup used by `<Screenshot id="…" />`. */
export const SCREENSHOTS_BY_ID: Record<string, ScreenshotSpec> =
  Object.fromEntries(SCREENSHOTS.map((s) => [s.id, s]))
