/**
 * SolarLayout Rooftop screenshot manifest, the twin of `content/bess/screenshots.ts` (same `ScreenshotSpec` shape).
 * Rooftop runs in the browser, so its images are taken with Playwright from rooftop.solarlayout.app at a device scale
 * of 2 (`.claude/skills/update-docs/references/rooftop.md`, "Screenshots"). Ids are always `rooftop-`-prefixed.
 */
import type { ScreenshotSpec } from "@/content/screenshots"

export const SCREENSHOTS: ScreenshotSpec[] = [
  {
    id: "rooftop-home",
    file: "rooftop/home/desktop.png",
    page: "/docs/rooftop/getting-started",
    title: "Home",
    alt: "Rooftop's Home: the headline Find your roof, the search with Find my roof, Import a drawing, Open a project and the demo's card.",
    what: "Home at 1440 × 900 with nothing kept on this device.",
    state: "Open rooftop.solarlayout.app in a fresh browser profile.",
    annotations: "",
    priority: 1,
  },
  {
    id: "rooftop-studio-desktop",
    file: "rooftop/studio/array-desktop.png",
    page: "/docs/rooftop/workspace",
    title: "The Studio on a computer",
    alt: "The Studio's Array lens on a computer: the top bar, the lens rail at the left, the demo roof in 3D, the figures under it and the lens's settings at the right.",
    what: "The demo in the Array lens at 1440 × 900, its run landed.",
    state: "Fresh profile: Home, Open the demo, then the Array lens; wait until the figures show numbers.",
    annotations: "",
    priority: 1,
  },
  {
    id: "rooftop-studio-phone",
    file: "rooftop/studio/array-phone.png",
    page: "/docs/rooftop/workspace",
    title: "The Studio on a phone",
    alt: "The Studio's Array lens on a phone: the roof in 3D above, the bottom sheet at half height with its lens switch, and the tab bar.",
    what: "The demo in the Array lens at 390 × 844 with touch, its run landed.",
    state: "Fresh profile on a phone-sized window: Home, Open the demo, then the Array lens; wait until the figures show numbers.",
    annotations: "",
    priority: 1,
  },
  {
    id: "rooftop-home-designs",
    file: "rooftop/home/designs-desktop.png",
    page: "/docs/rooftop/projects",
    title: "Designs on this device",
    alt: "Home's On this device section with two design cards, the demo and its copy, each with its plan, roof, capacity and energy.",
    what: "Home at 1440 × 900 scrolled to On this device, with two designs kept.",
    state: "Open the demo, let it run, make one edit (the system voltage to 1000 V and back), then Duplicate it from its card's Menu; back on Home.",
    annotations: "",
    priority: 2,
  },
]

/** Lookup used by `<Screenshot id="…" />`. */
export const SCREENSHOTS_BY_ID: Record<string, ScreenshotSpec> =
  Object.fromEntries(SCREENSHOTS.map((s) => [s.id, s]))
