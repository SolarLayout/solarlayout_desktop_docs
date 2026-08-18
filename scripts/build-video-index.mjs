/**
 * Builds `docs/video-index.xlsx` — the product-video worklist.
 *
 * Reads `content/videos.mjs`, which is the reviewable source of truth: the
 * workbook is generated output and is never edited by hand. The manifest is
 * plain JavaScript, so this script imports it rather than parsing it.
 *
 * Run: `bun run videos:index`
 *
 * The people who record these clips know the application well and do not know
 * the product code, so the workbook carries everything they need in one file:
 * the shot list, the sentences to speak, the recording conventions, the audio
 * conventions for the voice pipeline, and how to say the domain terms.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import ExcelJS from "exceljs"
import { VIDEOS } from "../content/videos.mjs"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const CLIP_DIR = path.join(ROOT, "public", "videos")
const OUT = path.join(ROOT, "docs", "video-index.xlsx")

const ACCENT = "FFD36E31" // SolarLayout accent, matching the screenshot index
const PRIORITY_LABEL = { 1: "High", 2: "Medium", 3: "Low" }
const PRIORITY_COLOUR = { 1: "FFB4530A", 2: "FF6B5A2E", 3: "FF4A5568" }

/**
 * Fail loudly rather than emit a workbook that is quietly wrong. Every column
 * below is load-bearing for somebody holding a camera, so a missing field is a
 * build failure, not a blank cell.
 */
function verify(entries) {
  if (entries.length === 0) throw new Error("VIDEOS is empty")

  const seenIds = new Set()
  const seenFiles = new Set()
  for (const e of entries) {
    const where = e.id ?? "<entry with no id>"
    for (const f of [
      "id",
      "file",
      "page",
      "area",
      "title",
      "purpose",
      "setup",
      "hold",
      "avoid",
    ]) {
      if (typeof e[f] !== "string" || e[f] === "") {
        throw new Error(`Video "${where}" is missing required field "${f}"`)
      }
    }
    if (!Number.isFinite(e.seconds) || e.seconds <= 0) {
      throw new Error(`Video "${where}" has no usable target length`)
    }
    if (![1, 2, 3].includes(e.priority)) {
      throw new Error(`Video "${where}" has priority ${e.priority}; expected 1, 2 or 3`)
    }
    for (const f of ["shots", "say"]) {
      if (!Array.isArray(e[f]) || e[f].length === 0) {
        throw new Error(`Video "${where}" has an empty "${f}" list`)
      }
      if (e[f].some((line) => typeof line !== "string" || line === "")) {
        throw new Error(`Video "${where}" has a blank line in "${f}"`)
      }
    }
    if (seenIds.has(e.id)) throw new Error(`Duplicate video id "${e.id}"`)
    if (seenFiles.has(e.file)) throw new Error(`Duplicate video file "${e.file}"`)
    seenIds.add(e.id)
    seenFiles.add(e.file)
  }
}

/** `165` → `2:45`. */
function mmss(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

/** `["a", "b"]` → `"1. a\n2. b"`. */
function numbered(lines) {
  return lines.map((line, i) => `${i + 1}. ${line}`).join("\n")
}

function headerRow(ws, height = 30) {
  const row = ws.getRow(1)
  row.font = { bold: true, color: { argb: "FFFFFFFF" } }
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ACCENT } }
  row.alignment = { vertical: "middle", wrapText: true }
  row.height = height
  return row
}

/** A two-column guidance sheet: a topic and the rule. */
function guidanceSheet(wb, name, rows, topicWidth = 32) {
  const ws = wb.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] })
  ws.columns = [
    { header: "Topic", key: "topic", width: topicWidth },
    { header: "What to do", key: "rule", width: 112 },
  ]
  headerRow(ws)
  for (const [topic, rule] of rows) {
    const r = ws.addRow({ topic, rule })
    r.alignment = { vertical: "top", wrapText: true }
    r.getCell("topic").font = { bold: true }
  }
  return ws
}

function build() {
  verify(VIDEOS)

  const sorted = [...VIDEOS].sort(
    (a, b) => a.priority - b.priority || a.file.localeCompare(b.file),
  )
  const recorded = new Set(
    sorted.filter((e) => fs.existsSync(path.join(CLIP_DIR, e.file))).map((e) => e.id),
  )
  const totalSeconds = sorted.reduce((sum, e) => sum + e.seconds, 0)
  const countBy = (p) => sorted.filter((e) => e.priority === p).length
  const minutesBy = (p) =>
    Math.round(
      sorted.filter((e) => e.priority === p).reduce((s, e) => s + e.seconds, 0) / 60,
    )

  const wb = new ExcelJS.Workbook()
  wb.creator = "SolarLayout Desktop docs"
  wb.created = new Date(0) // fixed, so a rebuild with no changes is a no-op diff

  // ── Sheet 1: Start here ─────────────────────────────────────────────────
  const start = guidanceSheet(
    wb,
    "Start here",
    [
      [
        "What this workbook is",
        `The list of product videos for SolarLayout Desktop — ${sorted.length} clips, about ${Math.round(totalSeconds / 60)} minutes of finished video in total. One row is one clip. Everything you need for that clip is on its row.`,
      ],
      [
        "Who it is for",
        "Somebody who uses the application confidently and is recording it for customers. You are not expected to know anything about how the software is built.",
      ],
      [
        "Read these two sheets once",
        "Before your first recording, read 'How to record' and 'Narration and audio' end to end. They apply to every clip and are not repeated on the rows.",
      ],
      [
        "The order to work in",
        `Filter the Priority column. Record every 'High' row first — those ${countBy(1)} clips are what a new customer needs to use the product at all (about ${minutesBy(1)} minutes). Then 'Medium' (${countBy(2)} clips, ${minutesBy(2)} minutes), then 'Low' (${countBy(3)} clips, ${minutesBy(3)} minutes).`,
      ],
      [
        "What the columns mean",
        "Target length — aim for this; treat 30 seconds over as the ceiling. What the video must show — do these things on screen, in this order. What to say — speak these sentences, in this order. Set up before you record — get the application into this state first. Hold or slow down on — where to stay still so the viewer can read. Do not show — what must not appear in this clip.",
      ],
      [
        "Speak the sentences as written",
        "The 'What to say' column is not a rough guide. Every sentence in it has been checked against the product. Say them in your own voice and your own accent, but do not add explanations, numbers or opinions of your own. If a step needs something the column does not say, leave it out and tell whoever gave you this workbook.",
      ],
      [
        "Do not read numbers off the screen",
        "Table counts, capacities and yields change between recordings. Say what a figure means, not what it says. The viewer can read their own screen.",
      ],
      [
        "One clip per row",
        "Do not join two rows into one file, and do not split one row into two files unless you are asked to. The file names are how the clips get attached to the help pages.",
      ],
      [
        "Where the files go",
        "Save each clip with exactly the file name in its row, including the folder in front of the name — for example getting-started/first-layout.mp4. Put them where the person who gave you this workbook tells you. Do not rename anything.",
      ],
      [
        "The Status column",
        "It reads 'Recorded' automatically when a file with that name is present in the project's videos folder. If you are delivering to a shared drive instead, mark it yourself as you go.",
      ],
      [
        "Prepare the demonstration files first",
        "Every clip uses the same small set of prepared files, kept in one folder called C:\\SolarLayout Demo. Set that folder up before you record anything — see the 'How to record' sheet for the list. Using the same site across every clip is what makes the set look like one product rather than twenty.",
      ],
      [
        "When the application does not match the row",
        "Stop and ask. Do not improvise a different route to the same result, and do not explain the difference on camera. A row that does not match means either the row is wrong or the application has changed, and both need fixing before that clip is published.",
      ],
      [
        "What happens to your audio",
        "You record your own voice while you work. That recording is later replaced with a professional voice, generated from what you said. Grammar, filler words, repetition and accent are all handled at that stage — see 'Narration and audio'. Your job is clear, complete, correctly-ordered content, not a perfect performance.",
      ],
    ],
    30,
  )
  start.getColumn("rule").width = 118

  // ── Sheet 2: the worklist ───────────────────────────────────────────────
  const ws = wb.addWorksheet("Videos", { views: [{ state: "frozen", ySplit: 1, xSplit: 5 }] })
  ws.columns = [
    { header: "#", key: "n", width: 5 },
    { header: "Priority", key: "priority", width: 10 },
    { header: "Status", key: "status", width: 11 },
    { header: "Video file name", key: "file", width: 40 },
    { header: "Title", key: "title", width: 44 },
    { header: "Feature area", key: "area", width: 20 },
    { header: "Target length", key: "length", width: 13 },
    { header: "What the viewer can do after watching", key: "purpose", width: 56 },
    { header: "What the video must show, in order", key: "shots", width: 80 },
    { header: "What to say — speak these sentences, in order", key: "say", width: 84 },
    { header: "Set up before you record", key: "setup", width: 58 },
    { header: "Hold or slow down on", key: "hold", width: 44 },
    { header: "Do not show", key: "avoid", width: 46 },
    { header: "Help page it belongs to", key: "page", width: 34 },
    { header: "Reference id", key: "id", width: 26 },
  ]
  headerRow(ws, 34)

  sorted.forEach((e, i) => {
    const isRecorded = recorded.has(e.id)
    const row = ws.addRow({
      n: i + 1,
      priority: PRIORITY_LABEL[e.priority],
      status: isRecorded ? "Recorded" : "Pending",
      file: e.file,
      title: e.title,
      area: e.area,
      length: mmss(e.seconds),
      purpose: e.purpose,
      shots: numbered(e.shots),
      say: numbered(e.say),
      setup: e.setup,
      hold: e.hold,
      avoid: e.avoid,
      page: e.page,
      id: e.id,
    })
    row.alignment = { vertical: "top", wrapText: true }
    row.getCell("priority").font = { bold: true, color: { argb: PRIORITY_COLOUR[e.priority] } }
    row.getCell("status").font = {
      bold: true,
      color: { argb: isRecorded ? "FF1A6E3C" : "FFB4530A" },
    }
    row.getCell("title").font = { bold: true }
    row.getCell("file").font = { name: "Consolas", size: 10 }
    row.getCell("id").font = { name: "Consolas", size: 10 }
    row.getCell("length").alignment = { vertical: "top", horizontal: "center" }
  })

  ws.autoFilter = { from: "A1", to: `O${sorted.length + 1}` }

  // ── Sheet 3: how to record ──────────────────────────────────────────────
  guidanceSheet(wb, "How to record", [
    [
      "Shape and size",
      "16:9, exactly 1920 x 1080. Nothing else. Do not record a 4:3 window, do not record a vertical clip for a phone, and do not record at 4K.",
    ],
    [
      "Frame rate and format",
      "30 frames per second. MP4. Deliver the file the recorder produces — do not re-compress it, do not convert it, and do not shrink it to save space.",
    ],
    [
      "What to capture",
      "The whole screen, or the whole application window maximised. Never point a phone or a camera at the monitor.",
    ],
    [
      "Screen setup",
      "A 1920 x 1080 or larger display at 100% Windows display scaling. Fractional scaling makes the text soft and it looks wrong next to the sharp clips. Do not resize the application part-way through a clip.",
    ],
    [
      "A clean background",
      "Plain desktop wallpaper, no photographs. Hide the desktop icons. Close every other application — mail, chat, browser tabs, media players. Turn on Do not disturb so no notification appears. Silence your phone.",
    ],
    [
      "Nothing personal on screen",
      "No email addresses, no customer or site names, no folder path containing a person's name, no company logo that is not ours. Use a generic project name and keep the demonstration files in C:\\SolarLayout Demo.",
    ],
    [
      "The demonstration file set",
      "Prepare these once, in C:\\SolarLayout Demo, and use them in every clip: a single-boundary KMZ of roughly 50 to 100 acres carrying one water body and one transmission line; a second KMZ with several boundaries; a third with one deliberately unclosed boundary; a CAD boundary drawn as a closed polyline with one interior ring; an image of a site plan with a clear outline; a module PAN file for a bifacial module; an inverter OND file that declares its MPPT window; an hourly weather CSV covering a full year; a contour CSV of longitude, latitude and elevation; an existing single line diagram as a PDF; and one image to trace as a custom symbol.",
    ],
    [
      "Use the same site every time",
      "Every clip that shows a layout uses the same boundary file, so the plant shape is recognisable from clip to clip. Use the multi-boundary file only where the row asks for it.",
    ],
    [
      "Keep the numbers stable",
      "Once you start recording the set, do not change the module, the table configuration or the site parameters between clips unless a row asks you to. A viewer moving between two clips should see the same capacity.",
    ],
    [
      "Before the first action",
      "Start recording, then wait three seconds before you touch anything. At the end, stay on the final result for three seconds before you stop. Those seconds are what make the clip editable.",
    ],
    [
      "Fit the plot first",
      "Before you show the plant drawing, press the Home button on the plot toolbar so the view is fitted to the plant.",
    ],
    [
      "Move the mouse slowly",
      "Move deliberately, and pause for about half a second on a button before you click it. Do not circle the pointer to point at things — move to the item and stop. Never drag the window around while talking.",
    ],
    [
      "Waiting for the application",
      "When something takes time — generating a layout, calculating cables, fetching weather data — keep recording and say nothing. The wait is cut out later. Do not fill it with talk.",
    ],
    [
      "No added effects",
      "No click sounds, no keystroke overlays, no webcam bubble, no zoom or wipe transitions, no music, no intro or outro animation, and no text captions of your own. Titles and highlights are added afterwards.",
    ],
    [
      "One take, no editing",
      "Deliver the raw recording. Do not trim beyond the very start and end, do not cut mid-clip, and do not stitch two attempts together. If a take goes wrong, record the whole clip again.",
    ],
    [
      "If it runs long",
      "If a clip cannot be done within its target plus 30 seconds, record it anyway and say so in your delivery note. It will be split into two rows rather than rushed.",
    ],
    [
      "Anything that needs blurring",
      "One clip shows the Device ID in the licence window. Record it normally and flag it in your delivery note so it can be blurred. Do not attempt the blur yourself, and do not cover it with a window or a sticky note.",
    ],
    [
      "Check before you send",
      "Watch the clip through once. Confirm: 16:9 and 1080 tall, no notification appeared, nothing personal on screen, your voice is audible the whole way through, and every step on the row actually happened.",
    ],
  ])

  // ── Sheet 4: narration and audio ────────────────────────────────────────
  guidanceSheet(wb, "Narration and audio", [
    [
      "What happens to your voice",
      "You record yourself explaining while you work. That audio is then turned into a professional narration by an AI voice, using your words. So the words matter and the performance does not.",
    ],
    [
      "So stop worrying about",
      "Your accent. Your grammar. Saying 'um' or 'so'. Starting a sentence twice. Sounding nervous. All of it is cleaned up afterwards. Do not re-record a whole clip because of a stumble.",
    ],
    [
      "So do worry about",
      "Saying the right thing, in the right order, clearly enough to be understood, with no background noise. Those four are the only things that cannot be fixed later.",
    ],
    [
      "Speak the sentences on the row",
      "The 'What to say' column has been checked against the product. Say those sentences. Do not add a number, a default value, a time estimate or an opinion of your own — anything extra risks being wrong, and wrong narration in a published video is worse than no video.",
    ],
    [
      "One idea per sentence",
      "Short sentences. Full stop, small pause, next sentence. Long winding sentences are the hardest thing for the voice pipeline to reproduce well.",
    ],
    [
      "The rhythm to use",
      "Say what you are about to do, do it, then say what happened. Three short beats per action. It gives the viewer time to follow the pointer.",
    ],
    [
      "Leave gaps",
      "About one second of silence before and after each sentence, and a clear pause between steps. The gaps are where the narration gets aligned to the picture.",
    ],
    [
      "Retakes",
      "If you fumble a sentence, stop, pause for two seconds, say the word 'retake', pause again, then say the whole sentence properly. The bad take is removed. Do not start the clip over.",
    ],
    [
      "A quiet room",
      "Close the door and the window. Switch off the fan and the air conditioner if you can. No traffic, no other voices, no keyboard tapping right next to the microphone. Silence your phone, including vibration.",
    ],
    [
      "Room tone",
      "At the very start of every clip, record five seconds of complete silence — no typing, no talking, no moving. It is used to remove the background hiss from the whole clip. Do not skip it.",
    ],
    [
      "The microphone",
      "A headset or earphone microphone is better than the laptop's built-in one. Keep it about a hand's width from your mouth and slightly to one side, so your breath does not hit it directly. Do not touch it or the cable while recording.",
    ],
    [
      "Keep the level steady",
      "Stay the same distance from the microphone the whole way through. Do not lean back to think and then lean in to talk. Do not shout, and do not drop to a whisper at the end of a sentence.",
    ],
    [
      "Talk to one person",
      "Explain it the way you would to one colleague sitting beside you. Do not read the sentences in a flat voice, and do not present as if to a hall.",
    ],
    [
      "Never say",
      "Prices, plans, licence duration, dates, version numbers, your own name, your company name, a customer's name, a supplier's name, or how long anything takes. None of them belong in these clips.",
    ],
    [
      "Say numbers as words",
      "Say 'six metres', not 'six m'. Say 'twenty per cent', not 'twenty percent sign'. Say 'one point five', not 'one full stop five'. Say units in full: metres, degrees, watts peak, megawatt peak.",
    ],
    [
      "Say abbreviations letter by letter",
      "Say 'K M Z', 'D X F', 'I C R'. Do not say 'kimz' or 'dixif'. The 'Words to say clearly' sheet lists every term in the set.",
    ],
    [
      "Silence is fine",
      "If you have nothing to say while the application works, say nothing. Dead air is easy to cut. Filler talk is not.",
    ],
  ])

  // ── Sheet 5: words to say clearly ───────────────────────────────────────
  const words = wb.addWorksheet("Words to say clearly", {
    views: [{ state: "frozen", ySplit: 1 }],
  })
  words.columns = [
    { header: "Written as", key: "term", width: 34 },
    { header: "Say it as", key: "spoken", width: 52 },
    { header: "What it is", key: "note", width: 76 },
  ]
  headerRow(words)

  const WORDS = [
    ["SolarLayout Desktop", "solar layout desktop", "The product. Never spell out letters, and never call it 'the tool' or 'the software'."],
    ["MMS-Table", "M M S table", "The module mounting structure that carries the modules."],
    ["ICR", "I C R, inverter control room", "Say the words in full the first time in a clip, then the letters."],
    ["MCR", "M C R, main control room", "One per site. Placed by the user."],
    ["USS", "U S S, unit substation", "Stands in for the main control room in the other plots of a multi-plot site."],
    ["SMB", "S M B, string monitoring box", "Central inverter plants only."],
    ["SLD", "single line diagram", "Say the words in full the first time, then S L D. Never S L D for the product name."],
    ["BOM", "bill of materials", "Say the words in full the first time, then B O M."],
    ["LA / arrester", "lightning arrester", "Say the words. Do not say 'L A'."],
    ["GCR", "G C R, ground coverage ratio", "Table height divided by row pitch."],
    ["KMZ / KML", "K M Z / K M L", "The Google Earth boundary file."],
    ["DXF / DWG", "D X F / D W G", "CAD drawing files."],
    [".PAN", "P A N file", "The PVsyst module file."],
    [".OND", "O N D file", "The PVsyst inverter file."],
    [".slp", "S L P project file", "The application's own project file."],
    ["PVGIS", "P V G I S", "The public weather service the application fetches irradiance from."],
    ["GHI", "G H I, global horizontal irradiance", "Irradiance on flat ground."],
    ["GTI", "G T I, in-plane irradiance", "Irradiance on the tilted module."],
    ["PR", "performance ratio", "Say the words. Do not say 'P R'."],
    ["CUF", "C U F, capacity utilisation factor", "Yield against the plant running flat out all year."],
    ["P50 / P75 / P90", "P fifty / P seventy five / P ninety", "Exceedance probabilities on the yield."],
    ["DC/AC ratio", "D C to A C ratio", "Never 'D C slash A C'."],
    ["MPPT", "M P P T", "The inverter's tracking voltage window."],
    ["Voc", "V O C, open circuit voltage", "The string voltage with no load."],
    ["Vmp", "V M P, maximum power voltage", "The operating voltage at peak power."],
    ["MWp / kWp / Wp", "megawatt peak / kilowatt peak / watt peak", "DC capacity units."],
    ["MWac", "megawatt A C", "AC capacity."],
    ["TMY", "T M Y", "The typical-year irradiance and energy time series."],
    ["Single Axis Tracker", "single axis tracker", "Horizontal, north-south axis. Then just 'tracker'."],
    ["Fixed Tilt", "fixed tilt", "The other mounting type."],
    ["Maximize placement", "maximize placement", "Read the on-screen label as it is spelt, with a z."],
    ["Rensaar", "Rensaar", "The publisher name on the Microsoft Store listing."],
  ]
  for (const [term, spoken, note] of WORDS) {
    const r = words.addRow({ term, spoken, note })
    r.alignment = { vertical: "top", wrapText: true }
    r.getCell("term").font = { name: "Consolas", size: 10 }
    r.getCell("spoken").font = { bold: true }
  }

  wb.xlsx.writeFile(OUT).then(() => {
    const pending = sorted.length - recorded.size
    console.log(
      `Wrote ${path.relative(ROOT, OUT)} — ${sorted.length} videos, ` +
        `${Math.round(totalSeconds / 60)} min total ` +
        `(${recorded.size} recorded, ${pending} pending)`,
    )
    console.log(
      `By priority — high: ${countBy(1)} (${minutesBy(1)} min), ` +
        `medium: ${countBy(2)} (${minutesBy(2)} min), ` +
        `low: ${countBy(3)} (${minutesBy(3)} min)`,
    )
  })
}

build()
