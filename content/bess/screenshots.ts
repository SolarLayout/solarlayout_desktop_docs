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

export const SCREENSHOTS: ScreenshotSpec[] = [
  // ── Install and updates ────────────────────────────────────────────────
  {
    id: "bess-install-store-listing",
    file: "bess/install/store-listing.png",
    page: "/bess/install/windows",
    title: "Microsoft Store listing",
    alt: "The BESS Desktop listing in the Microsoft Store, showing the publisher and the Get button.",
    what: "The Microsoft Store app open on the BESS Desktop listing, with the Rensaar publisher name and the Get / Install button visible.",
    state: "Open the Microsoft Store and search for BESS Desktop. Capture before installing so the button reads Get or Install.",
    annotations: "",
    priority: 1,
  },
  {
    id: "bess-install-store-updates",
    file: "bess/install/store-updates.png",
    page: "/bess/install/updates",
    title: "Store Library and updates",
    alt: "The Microsoft Store Library page listing installed applications and any updates waiting for them.",
    what: "The Store's Library page, with BESS Desktop listed and the Get updates button visible.",
    state: "Open the Microsoft Store, then the Library from the left-hand navigation.",
    annotations: "",
    priority: 2,
  },
  // ── Onboarding ─────────────────────────────────────────────────────────
  {
    id: "bess-intro-window",
    file: "bess/intro/window.png",
    page: "/bess/intro",
    title: "The main window",
    alt: "The BESS Desktop main window, with the input notebook on the left and the result notebook on the right.",
    what: "The whole main window: the navy top banner with its title, the left input notebook with the Simulate and Optimise buttons above its tabs, and the right result notebook with its four tabs showing a completed run.",
    state: "Run Simulate to completion first, so the Dashboard tab has real charts in it rather than an empty panel. Maximise the window before capturing.",
    annotations: "",
    priority: 1,
  },
  {
    id: "bess-getting-started-window",
    file: "bess/getting-started/window.png",
    page: "/bess/getting-started",
    title: "The main window before an analysis",
    alt: "The main window straight after launch, before a generation profile is loaded or a run has been made.",
    what: "The whole window at first launch: the top banner, the menu bar, the left input notebook on its first tab, and the empty right-hand result notebook.",
    state: "Launch the app fresh, before loading a generation profile or clicking Simulate. Maximise the window.",
    annotations: "Bracket the left third and label it Input notebook; bracket the right and label it Result notebook.",
    priority: 1,
  },
  {
    id: "bess-getting-started-tabs",
    file: "bess/getting-started/tabs.png",
    page: "/bess/getting-started",
    title: "The input and result tab strips",
    alt: "The eight input tabs on the left and the four result tabs on the right, side by side.",
    what: "A close view of both tab strips: Data, Peak, Sizing, BESS, Degrad., CAPEX, OPEX, Finance on the left; Dashboard, DFR Table, Financials, Summary on the right.",
    state: "Straight after launch, with both notebooks showing their default first tab.",
    annotations: "Number the input tabs 1 to 8 in order.",
    priority: 2,
  },
  {
    id: "bess-first-analysis-simulate",
    file: "bess/first-analysis/simulate.png",
    page: "/bess/first-analysis",
    title: "Running Simulate",
    alt: "The status bar reporting the financial model's year-by-year progress while Simulate runs.",
    what: "The Simulate button and, below it, the status bar reporting Financial model: year <n>/<total>… with the progress bar advancing.",
    state: "With a generation profile loaded (or Standalone BESS chosen) and the default peak window left as-is, click Simulate and capture while the status bar is still updating.",
    annotations: "",
    priority: 2,
  },
  {
    id: "bess-first-analysis-dashboard",
    file: "bess/first-analysis/dashboard.png",
    page: "/bess/first-analysis",
    title: "The Dashboard after a run",
    alt: "The Dashboard tab after Simulate finishes, showing the header strip and all six panels.",
    what: "The whole Dashboard tab after a completed run: the header strip reporting Solar/Wind/BESS size and IRR/Contracted Capacity, all six panels, and the day slider beneath the first two.",
    state: "Run Simulate to completion. The result notebook switches to the Dashboard tab on its own.",
    annotations: "Number the six panels 1 to 6 in reading order.",
    priority: 1,
  },
  {
    id: "bess-project-types-radio",
    file: "bess/project-types/radio.png",
    page: "/bess/project-types",
    title: "The project type radio group",
    alt: "The four project type options on the Data tab, with Solar + Wind + BESS selected.",
    what: "The project type radio group with all four options readable, plus the Peak-Shift dispatch checkbox beneath it.",
    state: "Open the Data tab. Nothing changed from the default selection.",
    annotations: "Outline the selected option.",
    priority: 1,
  },
  // ── Access ─────────────────────────────────────────────────────────────
  {
    id: "bess-access-license-window",
    file: "bess/access/license-window.png",
    page: "/bess/access/activate",
    title: "The License window",
    alt: "The License window on a device with no active access, showing the Device ID field, its Copy button, and the Get Free Access button.",
    what: "Help ▸ License… on a device with no active access: the ✗ No access status headline and message, the Your Device ID (identifies this computer to SolarLayout:) field with its Copy button, and the Get Free Access, Contact Us, Refresh and Close buttons.",
    state: "Launch the app on a device with no active access, then open Help ▸ License…",
    annotations: "Number the Device ID field 1, the Copy button 2, and Get Free Access 3. Blur the Device ID value.",
    priority: 1,
  },
  {
    id: "bess-access-web-activation",
    file: "bess/access/web-activation.png",
    page: "/bess/access/activate",
    title: "The web activation page",
    alt: "The browser page opened by Get Free Access, addressed to this device's Device ID.",
    what: "The browser page that opens after clicking Get Free Access, addressed to this device's Device ID.",
    state: "In the License window, click Get Free Access and capture the browser page it opens.",
    annotations: "",
    priority: 2,
  },
]

/** Lookup used by `<Screenshot id="…" />`. */
export const SCREENSHOTS_BY_ID: Record<string, ScreenshotSpec> =
  Object.fromEntries(SCREENSHOTS.map((s) => [s.id, s]))
