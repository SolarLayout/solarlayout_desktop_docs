/**
 * Builds `docs/bess-screenshot-index.xlsx` — the BESS screenshot capture
 * worklist.
 *
 * Reads the same manifest the site renders from
 * (`content/bess/screenshots.ts`), so the worklist can never disagree with
 * the pages. Also checks each file on disk, so the Status column tells
 * whoever is capturing what is still outstanding.
 *
 * The twin of `scripts/build-screenshot-index.mjs` for the SolarLayout
 * manifest — kept as a separate script rather than a shared one parameterised
 * by product, since the two capture worklists ship on independent schedules.
 *
 * Run: `bun run screenshots:index:bess`
 *
 * The manifest is TypeScript, and this is a plain Node script, so the entries
 * are extracted by parsing the object literals rather than importing the
 * module. That avoids adding a TS loader to a one-file script; the trade-off
 * is that the manifest must keep its current shape — a `SCREENSHOTS` array of
 * flat object literals with string and number values. `verifyShape()` below
 * fails loudly if that stops being true, rather than silently emitting a
 * short spreadsheet.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ExcelJS from "exceljs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const MANIFEST = path.join(ROOT, "content", "bess", "screenshots.ts")
const SHOT_DIR = path.join(ROOT, "public", "screenshots")
const OUT = path.join(ROOT, "docs", "bess-screenshot-index.xlsx")

const FIELDS = [
  "id",
  "file",
  "page",
  "title",
  "alt",
  "what",
  "state",
  "annotations",
  "priority",
]

/** Pull the object literals out of the `SCREENSHOTS` array. */
function readManifest() {
  const src = fs.readFileSync(MANIFEST, "utf8")
  const start = src.indexOf("export const SCREENSHOTS:")
  if (start === -1) throw new Error("SCREENSHOTS array not found in manifest")

  const entries = []
  // Each entry starts at a line that is exactly `  {` inside the array.
  const body = src.slice(start)
  const blocks = body.split(/\n {2}\{\n/).slice(1)

  for (const block of blocks) {
    const raw = block.split(/\n {2}\},?/)[0]
    const entry = {}
    for (const field of FIELDS) {
      // Matches `field: "value",` with escaped quotes, or `field: 1,`.
      const str = raw.match(new RegExp(`\\n?\\s*${field}:\\s*"((?:[^"\\\\]|\\\\.)*)",`))
      if (str) {
        entry[field] = str[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        continue
      }
      const num = raw.match(new RegExp(`\\n?\\s*${field}:\\s*(\\d+)\\s*,`))
      if (num) entry[field] = Number(num[1])
    }
    if (entry.id) entries.push(entry)
  }
  return entries
}

/**
 * Guard against a silently short or malformed extraction. The count check
 * compares against the number of `id:` keys in the file, which is the one
 * thing a regex miss cannot fake.
 */
function verifyShape(entries) {
  const src = fs.readFileSync(MANIFEST, "utf8")
  const expected = (src.match(/^\s{4}id: "/gm) ?? []).length
  if (entries.length !== expected) {
    throw new Error(
      `Extracted ${entries.length} entries but the manifest declares ${expected}. ` +
        "The manifest shape changed — update scripts/build-bess-screenshot-index.mjs.",
    )
  }
  const required = ["id", "file", "page", "title", "what", "state", "priority"]
  for (const e of entries) {
    for (const f of required) {
      if (e[f] === undefined || e[f] === "") {
        throw new Error(`Entry "${e.id ?? "?"}" is missing required field "${f}"`)
      }
    }
  }
}

const PRIORITY_LABEL = {
  1: "1 — Essential",
  2: "2 — Valuable",
  3: "3 — Nice to have",
}

function build() {
  const entries = readManifest()
  verifyShape(entries)

  const wb = new ExcelJS.Workbook()
  wb.creator = "SolarLayout Desktop docs"
  wb.created = new Date(0) // fixed, so a rebuild with no changes is a no-op diff

  // ── Sheet 1: the worklist ───────────────────────────────────────────────
  const ws = wb.addWorksheet("Screenshots", {
    views: [{ state: "frozen", ySplit: 1 }],
  })

  ws.columns = [
    { header: "#", key: "n", width: 5 },
    { header: "Priority", key: "priority", width: 16 },
    { header: "Status", key: "status", width: 11 },
    { header: "Image file name", key: "file", width: 40 },
    { header: "Title", key: "title", width: 38 },
    { header: "What the image must show", key: "what", width: 68 },
    { header: "How to get the app into that state", key: "state", width: 62 },
    { header: "Callouts to add after capture", key: "annotations", width: 48 },
    { header: "Docs page", key: "page", width: 42 },
    { header: "Alt text (already written)", key: "alt", width: 62 },
    { header: "Reference id", key: "id", width: 30 },
  ]

  const sorted = [...entries].sort(
    (a, b) => a.priority - b.priority || a.file.localeCompare(b.file),
  )

  let present = 0
  sorted.forEach((e, i) => {
    const exists = fs.existsSync(path.join(SHOT_DIR, e.file))
    if (exists) present += 1
    const row = ws.addRow({
      n: i + 1,
      priority: PRIORITY_LABEL[e.priority] ?? String(e.priority),
      status: exists ? "Captured" : "Pending",
      file: e.file,
      title: e.title,
      what: e.what,
      state: e.state,
      annotations: e.annotations || "—",
      page: e.page,
      alt: e.alt,
      id: e.id,
    })
    row.alignment = { vertical: "top", wrapText: true }
    row.getCell("status").font = {
      bold: true,
      color: { argb: exists ? "FF1A6E3C" : "FFB4530A" },
    }
    row.getCell("file").font = { name: "Consolas", size: 10 }
    row.getCell("id").font = { name: "Consolas", size: 10 }
  })

  const header = ws.getRow(1)
  header.font = { bold: true, color: { argb: "FFFFFFFF" } }
  header.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFD36E31" }, // SolarLayout accent
  }
  header.alignment = { vertical: "middle", wrapText: true }
  header.height = 30
  ws.autoFilter = { from: "A1", to: `K${sorted.length + 1}` }

  // ── Sheet 2: conventions ────────────────────────────────────────────────
  const conv = wb.addWorksheet("How to capture")
  conv.columns = [
    { header: "Topic", key: "topic", width: 30 },
    { header: "Convention", key: "rule", width: 108 },
  ]
  conv.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }
  conv.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFD36E31" },
  }

  const CONVENTIONS = [
    [
      "Where to put the files",
      "public/screenshots/ in this repository, at exactly the path in the 'Image file name' column, including the sub-folder. Create the sub-folder if it does not exist.",
    ],
    [
      "File format",
      "PNG. No JPEG — text in the interface must stay crisp. Do not resize or crop after capture unless the row asks for a detail view.",
    ],
    [
      "Nothing else is needed",
      "Drop the file in and it appears on the page. Image dimensions are read from the file, so nothing has to be recorded anywhere.",
    ],
    [
      "Window size",
      "Maximise the application on a 1920x1080 or larger display before capturing a whole-window image. Keep the same size across a set so the images look consistent on the page.",
    ],
    [
      "Display scaling",
      "Use 100% Windows display scaling. Fractional scaling produces soft text that looks wrong next to the sharp images.",
    ],
    [
      "Panel and dialog images",
      "Capture only the group or window the row names, with a few pixels of surrounding space. Do not include the whole window unless the row says so.",
    ],
    [
      "Fitting the plot",
      "Before capturing the plot area, press the Home button on the plot toolbar so the view is fitted to the plant.",
    ],
    [
      "Use one demonstration site",
      "Use the same boundary file for every layout image so the plant shape is recognisable from page to page. Roughly 50 to 100 acres, single boundary, with at least one water body and one transmission line, works best. Use a separate multi-boundary file only for the rows that ask for one.",
    ],
    [
      "Keep the numbers stable",
      "Once you start a set, do not change the input values between captures. A reader comparing two images should see the same capacity and the same table count.",
    ],
    [
      "Callouts",
      "Add only what the 'Callouts to add' column asks for. Use a 2px red outline for an outline, a red arrow for a pointer, and small numbered red circles for numbered callouts. Keep the same style across every image.",
    ],
    [
      "What to hide",
      "Blur or replace anything identifying: customer and site names, file paths containing a personal name, email addresses, and the Device ID in the licence window. A generic project name is fine.",
    ],
    [
      "Do not annotate the interface itself",
      "No text added over the interface explaining what a button does — that is what the page prose is for.",
    ],
    [
      "Working in waves",
      "Filter the Priority column. Capture every '1 — Essential' row first: those pages do not make sense without their image. Then 2, then 3.",
    ],
    [
      "Checking your progress",
      "Re-run the index generator after adding files and the Status column updates. Or open the site — a captured image replaces its placeholder immediately.",
    ],
  ]
  for (const [topic, rule] of CONVENTIONS) {
    const r = conv.addRow({ topic, rule })
    r.alignment = { vertical: "top", wrapText: true }
  }

  wb.xlsx.writeFile(OUT).then(() => {
    const pending = sorted.length - present
    console.log(
      `Wrote ${path.relative(ROOT, OUT)} — ${sorted.length} screenshots ` +
        `(${present} captured, ${pending} pending)`,
    )
    const byPriority = { 1: 0, 2: 0, 3: 0 }
    for (const e of sorted) {
      if (!fs.existsSync(path.join(SHOT_DIR, e.file))) byPriority[e.priority] += 1
    }
    console.log(
      `Pending by priority — essential: ${byPriority[1]}, ` +
        `valuable: ${byPriority[2]}, nice to have: ${byPriority[3]}`,
    )
  })
}

build()
