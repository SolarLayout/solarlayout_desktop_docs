# SolarLayout Rooftop — verified product facts

**This file is the only permitted factual source for the SolarLayout Rooftop
pages** (`/docs/rooftop`). If a number, label or behaviour is not here, do not
state it on a page. Every value was read from the product's code in the
`rooftop-design-app` repository and carries a `file:line` citation.

**Verified against `main` at `c6aeb66` on 2026-10-13** (the last change to the app's code is `e1faa19`, #246, which
production and staging both run), **re-verified at `6d6d41f` the same day after #248** (Waaree's 159 module files in the
library), which the owner deployed to staging and production the same day: both report commit `6d6d41f`. Written again from the code for V2, the rebuilt app: the five steps, Find as Roof's
first part, the Sun view, the result chip, the words of each screen (D108, D112), Performance, Handover, Home and Present.
Nothing was carried over from the sheet written at `5d710ae`. Each part was written by one reader of the code and checked
row by row by another; where they could, both ran the product's own code headless (the engine on the demo, the web's
word functions, the API's project-file opening) and say so in the row.

Where the app's own in-app help, a code comment or a design document says something the code contradicts, it is listed
under the area's *Known-stale* heading and must not be repeated. Product defects noticed while reading are listed under
*Product issues noticed*: never describe them as behaviour.

The app's 32 in-app help topics are its own words for each section; the docs go deeper and never contradict them, and
each topic links to its docs page and heading (D111; the map is in part 1, "In-app help: the topics"). A fact the help
states and the code confirms is cited to the code.

Citations are relative to the repository root, shortened:

| Short | Path |
|---|---|
| `WEB` | `apps/web` (the browser app) |
| `API` | `apps/api/src/rooftop_api` (the web API) |
| `CORE` | `apps/api/src/rooftop_core` (the engine) |
| `HELP` | `apps/web/content/help` (the in-app help topics) |

Other paths (`docs/`, `plan/`, `infra/`, `apps/api/tests/`, `e2e/`) are from the repository root. In quoted interface
text, `{braces}` and `<angle brackets>` stand for a value the app fills in, such as a name or a number.

## Decisions that bind the pages

Product decisions that are not in the code, recorded by the owner on SolarLayout/solarlayout_desktop_docs#19
(2026-10-09), in this repo's `docs/WRITING_GUIDE.md`, in the product's `plan/README.md` and in this rewrite (2026-10-13).
Pages follow them as they follow the code.

| Decision | What pages say | Source |
|---|---|---|
| Access at launch | Free, no sign-in. Said one way: "Free, no account needed. Your designs are kept on this device." The code proves no sign-in (part 1); it says nothing about price, so "free" rests on this decision | #19, decision 1; writing guide, "Writing for the SolarLayout Rooftop tree" |
| The action | **Open Rooftop**, to `https://rooftop.solarlayout.app`. It is added to the home screen, never installed or downloaded | #19, decision 1; writing guide |
| Name | **SolarLayout Rooftop**, then *Rooftop*; "the app" for the software otherwise. Never "Rooftop Desktop", a tool, the web version or the cloud product | #19, decision 2; plan/v2/voice.md:177 |
| One name a thing | The vocabulary of plan/v2/voice.md §6 (D108). The roof types: "Flat, rows facing south" (north south of the equator), "Flat, rows facing east and west", "Sloped"; on the Roof step's buttons "Tilted rows", "East-west", "Sloped". "Modules per string". "Height above the roof" (D112) | plan/README.md:145,149 |
| No "every" | The word "every" appears in no page, as in no screen of the app, save the field the app labels **Walkway every**, whose label #246 keeps (its voice scan allows that phrase alone) | The owner, 2026-10-13; #246 (e1faa19); WEB/lib/studio/roof-fields.ts:39-40 |
| The tree | Seventeen pages, flat, their `##` headings as approved; each help topic links to its page and heading | The owner, 2026-10-13 (this rewrite) |
| Help and docs | The 32 help topics are the app's own words; the docs go deeper and never contradict them; the app's help-upkeep rule extends to the docs | #19, decision 8; D107, D111 |
| Release notes | A *What's new* page of dated entries, one per update that changes what users meet; no version numbers | #19, decision 9 |

## Contents

1. The app: identity, access, the steps and the top bar, saving, Home, help, data and limits
2. Find: the roof on the map (the Roof step's first part)
3. The Studio, and its Roof and Array steps
4. The Sun view and the Strings step
5. Performance
6. Handover, the project file and Present

Each part ends with its own *Known-stale*, *Facts we do not have* and *Product issues noticed* lists.

<!-- help-map -->
Part 1 owns the in-app help as a whole. No topic belongs to this part's own controls; each topic's content is
covered by the part that owns its section (2 = Find, 3 = Roof and Array, 4 = Sun and Strings). The table under
"### In-app help: the topics" (this part) is the list with its citations. Ids, titles and summaries verbatim from
WEB/lib/help/manifest.gen.ts (generated from HELP/*.mdx front matter).

| Id | Title | Summary | Docs (page#section the app links to) | Covered by |
|---|---|---|---|---|
| app.section.obstacles | Obstacles | Add what stands on the roof with its height, so modules keep clear of it and its shade counts. | roof#Obstacles | part 3 (and 2 for drawing them) |
| app.section.roof-type | Roof type | Choose how the modules sit: rows facing south, rows facing east and west, or flush on a slope. | roof#Roof type | parts 2 and 3 |
| find.section.edges | Edges | Type a length you measured to correct one edge of the outline. | find#Outline the roof | part 2 |
| find.section.place | Place | Set where a roof entered by hand stands: search for it, or type its latitude and longitude. | find#By hand | part 2 |
| find.section.shape | Shape | Type the roof's length and width, or its corners in metres. | find#By hand | part 2 |
| find.tool.box | Add a box | Drag over a stair room or a plant room, then type its height above the roof. | find#What stands on the roof | part 2 |
| find.tool.building | Add a building beside the roof | Outline a building next to the roof and type its height, so its shadow on the roof counts. | find#What stands on the roof | part 2 |
| find.tool.corners | Outline by its corners | Click each corner of the roof, then the first corner again to close the outline. | find#Outline the roof | part 2 |
| find.tool.detect | Detect the building | Click inside the building to get its outline, then drag the corners onto the roof. | find#Outline the roof | part 2 |
| find.tool.find-the-roof | Find the roof | Search an address, paste coordinates or a maps link, then outline the roof on the map. | find#Find the building | part 2 (Home's search: part 1 "### Home") |
| find.tool.move-an-obstacle | Move, turn or remove an obstacle | Select an obstacle on the map, then drag it, turn it by its handle, or remove it. | find#What stands on the roof | part 2 |
| find.tool.move-the-roof | Move or turn the roof | Drag the roof to move it, or its round handle to turn it. Its obstacles move with it. | find#Move or turn the roof | part 2 |
| find.tool.rectangle | Draw a rectangle | Drag from one corner of the roof to the opposite one, then turn it to fit. | find#Outline the roof | part 2 |
| find.tool.tank | Add a tank | Drag from the middle of a round tank to its edge, then type its height. | find#What stands on the roof | part 2 |
| find.tool.tree | Add a tree | Drag from the middle of a tree to the edge of its crown, then type its height. | find#What stands on the roof | part 2 |
| find.tool.wall | Add a wall | Click each point of the wall, end on the last one, then type its height. | find#What stands on the roof | part 2 |
| studio.section.design-day | Design day | The day the rows are spaced for. The winter solstice has the longest shadows. | sun#The day | part 3/4 |
| studio.section.edges-and-access | Edges and access | Set the parapet height and the strips kept free of modules at the edges and round obstacles. | roof#Edges and access | part 3 |
| studio.section.inverter | Inverter | Choose the inverter the strings are sized for, from the library or your own file (OND). | strings#Inverter | part 4 |
| studio.section.module | Module | Choose the module. Its size sets the layout; its ratings set the strings and the energy. | array#Module | part 3 |
| studio.section.modules-per-string | Modules per string | How many modules one string can hold at your system voltage, and what limits it. | strings#Modules in series | part 4 |
| studio.section.mounting | Mounting | Set the modules' tilt, their orientation, and how many stand in each row's height. | array#Mounting | part 3 |
| studio.section.mppt-loading | MPPT loading | The strings on each input of the inverter, and their current against its limit. | strings#MPPT loading | part 4 |
| studio.section.on-the-roof | On the roof | Choose what the Sun view draws: the sun's arc, its shade-free hours, shadow outlines, the shade map. | sun#On the roof | part 4 |
| studio.section.options | Options | Choose how the modules are wired to the inverter. The best option comes first. | strings#Options | part 4 |
| studio.section.outline | Outline | Where the roof is, its size and its corners. Edit the corners in Plan. | roof#Location | part 3 |
| studio.section.shade-free-hours | Shade-free hours | Set the hours of the design day in which rows and obstacles must not shade the modules. | array#Shade-free window | part 3 |
| studio.section.shade-map | Shade map | Each module coloured by its loss to shade over the year, to see where shade costs most. | sun#Shade map | part 4 |
| studio.section.shade-over-the-year | Shade over the year | How much energy shade costs in a year, by its cause: rows and obstacles, strings, the horizon. | sun#Shading over the year | part 4 |
| studio.section.spacing | Spacing | How far apart the rows stand so they do not shade each other in the shade-free hours. | array#Spacing | part 3 |
| studio.section.system-voltage | System voltage | The highest DC voltage of the system. It caps the modules in a string; it starts from your country. | strings#System voltage | part 4 (default-setting: part 1 "### Country and the system voltage a design starts with") |
| studio.section.the-sun-at-the-time | The sun at the time | Where the sun stands at the time on the timeline: how high, and from which direction. | sun#The sun at the hour | part 4 |
<!-- /help-map -->

## 1. The app: identity, access, the steps and the top bar, saving, Home, help, data and limits

Verified against `rooftop-design-app` `main` at `c6aeb66` (last code change `e1faa19`, #246) on 2026-10-13.
Production and staging were both checked read-only the same day: `GET /api/health` on each answered
`"commit":"e1faa1969202e12ee9a35f24f07910e781789a4a"`, and each Home served "Rooftop PV design" (so both run V2).

### Identity

| Item | Value | Source |
|---|---|---|
| Product name | **SolarLayout Rooftop** | WEB/lib/brand/brand.ts:7 |
| Short name (under the icon on a home screen; Apple title) | **Rooftop** | WEB/lib/brand/brand.ts:8; WEB/app/metadata.ts:11; WEB/app/manifest.ts:9 |
| Description (page meta and manifest) | "Rooftop PV design." | WEB/app/metadata.ts:10; WEB/app/manifest.ts:10 |
| Wordmark | Mark (rounded square, accent fill, a roof ridge) then "SolarLayout **Rooftop**" ("Rooftop" lighter, in secondary text). In the top bar the words show on desktop only; on Home from tablet up; the mark alone otherwise. The mark's accessible name is "SolarLayout Rooftop" | WEB/components/shell/Logo.tsx:4-5,12-20 |
| Icons | Manifest: 192×192 and 512×512 PNG (purpose "any", rounded corners), 512×512 maskable PNG, under `/app-icons/`; Apple touch icon 180×180, square (iOS rounds it); a favicon `icon.svg` | WEB/lib/brand/app-icons.ts:11-20; WEB/app/apple-icon.tsx:5-11; WEB/app/icon.svg (file) |
| Theme and background colour | `#0B0E13` (the dark ground); the page's theme is one dark theme, "dusk" | WEB/lib/brand/brand.ts:9; WEB/app/manifest.ts:15-16; WEB/app/viewport.ts:13; WEB/app/layout.tsx:14 |
| Page language | English (`lang="en"`) | WEB/app/layout.tsx:14 |
| Production address | https://rooftop.solarlayout.app | docs/deployment.md:11 |
| Staging address | https://rooftop.staging.solarlayout.app | docs/deployment.md:11 |
| Hosting, in plain terms | The web app is served by Vercel from region `bom1` (Mumbai); the computing (the API) runs on AWS Lambda in `ap-south-1` (Mumbai). The browser talks only to the app's own address: Vercel forwards `/api/*` to the API | docs/deployment.md:12-13,18-19; infra/aws/README.md:7; WEB/vercel.json:3; WEB/next.config.ts:39-41; plan/README.md:101 (D58) |
| Development-only pages | `/kit`, `/kit/part-2`, `/kit/shell`, `/kit/help` answer "not found" outside development | WEB/app/kit/page.tsx:10; WEB/app/kit/part-2/page.tsx:10; WEB/app/kit/shell/page.tsx:10; WEB/app/kit/help/page.tsx:10 |

### Places, addresses and tab titles

| Place | Address | Browser tab title | Source |
|---|---|---|---|
| Home | `/` | "SolarLayout Rooftop" | WEB/lib/routes.ts:54; WEB/app/page.tsx:4 |
| Find the roof (the first part of the Roof step) | `/find`; `/find?at=<lat>,<lon>` for a place given by coordinates; `/find?at=<lat>,<lon>&place=<label>` for a place found by words; `/find?by=hand` opens its by-hand column | "Find the roof · SolarLayout Rooftop" | WEB/lib/routes.ts:73,90-102; WEB/app/find/page.tsx:5,9 |
| Studio, one address per step: Roof, Array, Strings | `/studio/roof`, `/studio/array`, `/studio/strings`; `/studio` alone goes to `/studio/roof` | "Roof · SolarLayout Rooftop", "Array · SolarLayout Rooftop", "Strings · SolarLayout Rooftop" | WEB/lib/routes.ts:14-18,50; WEB/app/(workspaces)/studio/page.tsx:4-7; WEB/app/(workspaces)/studio/[lens]/page.tsx:11-14 |
| `/studio/sun` (the Sun lens's address before V2) | Turns the Sun view on and replaces the address with the step that was in hand (the last Studio step; Roof at first). Sun is a view, not a step | (no title of its own) | WEB/app/(workspaces)/studio/[lens]/page.tsx:18-19; WEB/components/studio/SunOfBefore.tsx:8-15; WEB/lib/routes.ts:20-21 |
| Performance | `/performance` | "Performance · SolarLayout Rooftop" | WEB/lib/flow/steps.ts:34; WEB/app/(workspaces)/performance/page.tsx:4 |
| Handover, the list | `/handover` | "Handover · SolarLayout Rooftop" | WEB/lib/routes.ts:60; WEB/app/(workspaces)/handover/page.tsx:4 |
| Handover, one file | `/handover/<item>`, items in list order: `report` Design report, `single-line-diagram` Single-line diagram, `bill-of-materials` Bill of materials, `cable-schedule` Cable schedule, `cad-layout` CAD layout, `project-file` Project file, `hourly-data` Hourly data, `earth-model` Google Earth model | "<Item> · Handover · SolarLayout Rooftop", e.g. "Cable schedule · Handover · SolarLayout Rooftop" | WEB/lib/routes.ts:26-35,51; WEB/app/(workspaces)/handover/[item]/page.tsx:10-13 |
| Present | `/present`, reachable by its address on every size; its button is at the heads of Performance and Handover on tablet and desktop only | "Present · SolarLayout Rooftop" | WEB/lib/routes.ts:63; WEB/app/present/page.tsx:4; WEB/components/shell/TopBar.tsx:49-62; plan/README.md:150 (D113) |
| An unknown step or Handover item | Not found (the framework's own not-found page; the app has no `not-found` page of its own) | — | WEB/app/(workspaces)/studio/[lens]/page.tsx:20; WEB/app/(workspaces)/handover/[item]/page.tsx:18; WEB/app (no not-found file) |
| What the places share | Studio, Performance and Handover share one design, one top bar, the notes, the toasts and the help (the "shell"). Home, Find and Present stand outside it; Find has a top bar of its own | WEB/app/(workspaces)/layout.tsx:4-6; WEB/components/shell/Shell.tsx:98-139; WEB/components/find/FindBar.tsx:12-24 |
| A place opened without a design | Studio, Performance, Handover (and Present) open the design remembered as open on this device, else the demo (see "### Where designs are kept") | WEB/components/shell/use-opens-what-belongs.ts:9-25; WEB/lib/device/opening.ts:24-36 |

### Access, devices and the home screen

| Item | Value | Source |
|---|---|---|
| Account, sign-in | None. No auth library in the web app's dependencies; the API's Function URL has auth type `NONE`; decision D5 "No database, no auth" | WEB/package.json (dependencies); infra/aws/README.md:115,128; plan/README.md:48 (D5) |
| What the UI says about price or accounts | Nothing: no string mentions price, "free", an account or signing in (searched WEB/components, WEB/lib, WEB/app, HELP) | (search, no match) |
| Sizes | Phone under 640 px wide; tablet 640 px to 1100 px; desktop from 1101 px. Each screen is laid out for the three | WEB/app/globals.css:132-133; WEB/components/shell/use-screen-size.ts:5-17 |
| Added to a home screen | Web app manifest: name, short name "Rooftop", `display: "standalone"` (opens without the browser's bars), `id`, `start_url` and `scope` all `/`. Checked on production: `/manifest.webmanifest` serves these values | WEB/app/manifest.ts:6-23; runtime check of https://rooftop.solarlayout.app/manifest.webmanifest |
| iPhone and iPad Home Screen | `apple-mobile-web-app-capable`, title "Rooftop", status bar "black-translucent"; the page covers the whole screen (`viewportFit: "cover"`) and keeps clear of the clock, the notch and the home bar by the safe areas | WEB/app/metadata.ts:4-12; WEB/app/viewport.ts:4-14 |
| Install prompt | None: no `beforeinstallprompt` handler, no install words in the app | (searched WEB: no match) |
| 3D needs WebGL | Without it the stage says "This browser cannot draw the roof in 3D." and draws the plan instead; if the browser takes the 3D away: "The browser stopped drawing the roof in 3D." The same two lines in Present. While the plan stands in, the stage's view controls (3D/Plan, Fit, north, Sun, Imagery, Show panel) are not shown | WEB/components/studio/stage-words.ts:4-5; WEB/components/studio/Stage.tsx:108,116,125-129,155; WEB/components/present/Present.tsx:64-67 |
| The map needs WebGL too | Find's map needs the app's Esri key and WebGL. Without the key: "The map is not available" / "Enter the roof by hand instead."; without WebGL: "This browser cannot draw the map" / "Try another browser, or enter the roof by hand."; either way the by-hand column opens (detail: part 2) | WEB/components/find/Find.tsx:152-155; WEB/lib/map/map-state.ts:15-23,31-34 |
| Keeping designs needs IndexedDB | Without it every read or write fails with the browser part of its words "this browser cannot save designs", e.g. "The design could not be saved on this device: this browser cannot save designs." | WEB/lib/device/designs-db.ts:24,39,66,82 |
| Data kept by the browser besides designs (localStorage, per device) | `rooftop.open-design` (id of the open design); `rooftop.steps-seen` (steps opened, per design); `rooftop.words-met` (app words already explained); `rooftop.panel-hidden` (work column hidden on desktop); `rooftop.sections-open` (work-column sections opened or closed); `rooftop.tips-gone` (Find's map line dismissed); `rooftop.performance-tab` (Performance tab opened last). A storage that refuses (private window, quota) only means these are forgotten | WEB/lib/device/remembered.ts:5; WEB/lib/device/progression.ts:4,8-11,28-35; WEB/lib/device/tips-seen.ts:6; WEB/components/performance/PerformanceTabs.tsx:19 |

### The top bar

The bar of Studio, Performance and Handover. 56 px high on desktop and phone, 60 px on tablet; fixed while the page between it and the tab bar scrolls.

| Item | Value | Source |
|---|---|---|
| Order, left to right | Logo (link home), a divider (desktop), the design's name with its saved mark (opens the project menu), the five steps (tablet and desktop), the result chip (desktop and phone), Docs (desktop) | WEB/components/shell/TopBar.tsx:90-116 |
| Height | `--size-topbar` 56 px; `--size-topbar-tablet` 60 px | WEB/app/globals.css:136-137; WEB/components/shell/TopBar.tsx:42-47 |
| Logo | A link to Home on every size, accessible name "Home"; on touch a 44 px target round the 28 px mark | WEB/components/shell/TopBar.tsx:76-88 |
| The design's name | A button showing the saved mark, then the name (truncated), then a chevron; its tooltip is the saving words (below). While no design is open a skeleton stands in the name's place and the button is named "Project". Arrow Down or Arrow Up on it opens the menu | WEB/components/shell/ProjectSwitcher.tsx:38-58,252-266 |
| Saved mark and its words | Saved: a green pulsing dot, "Saved on this device". Saving: a small ring, "Saving". Not kept on the device yet (the demo, any design before its first edit, a deleted one): a hollow dot, "Not saved". The device refused the write: the note mark, "Not saved". The two "Not saved" states differ only by the mark: the voice's vocabulary has two words for the saved state, "Saved on this device" and "Not saved" (never "Kept", "Not kept"). In the bar the mark alone stands before the name, the words are its tooltip (desktop pointer or keyboard focus); the words show under the name in the project menu | WEB/components/shell/SaveState.tsx:17-24,60-68; WEB/lib/device/saving.ts:19-20; WEB/components/shell/ProjectSwitcher.tsx:49,253; plan/v2/voice.md:172 |
| Docs | A quiet link with a book icon, "Docs", desktop only; opens in a new tab. Where it goes: on `rooftop.<site>` it opens `https://<site>/docs/rooftop` (production: https://solarlayout.app/docs/rooftop; staging: https://staging.solarlayout.app/docs/rooftop); on any other host (local development) production's | WEB/components/shell/TopBar.tsx:64-74; WEB/lib/docs/docs.ts:8-15; WEB/components/shell/use-docs-home.ts:1-9 |
| What is not in the bar | No Export and no Present (Present is at the heads of Performance and Handover; Handover's primary is Download all); no search | WEB/components/shell/TopBar.tsx:49-52; docs/design/information-architecture.md:24; plan/README.md:132 (D95) |
| Tablet | Mark alone (no wordmark), the name, the five steps (each step's name with its mark, the lines between steps hidden); no result chip in the bar (in the Studio it is a row under the stage); no Docs in the bar (Docs is in the project menu) | WEB/components/shell/Logo.tsx:18; WEB/components/shell/StepNav.tsx:32,52; WEB/components/shell/TopBar.tsx:110-114 |
| Phone | Mark, the name, the result chip; no steps (they are the tab bar at the foot); no Docs (in the project menu) | WEB/components/shell/TopBar.tsx:108-114; WEB/components/shell/StepNav.tsx:38 |
| Find's top bar | Mark (link home), "New design" as plain words (no menu), the five steps with Roof in hand (tablet and desktop), Docs (desktop). On phone the five steps are Find's own tab bar at the foot, Roof in hand, the others grey. No result chip, no saved mark. The steps' states on Find are fixed: Roof to do, the four after it "after the roof is built", whatever design is open | WEB/components/find/FindBar.tsx:9-24; WEB/components/find/Find.tsx:63-64,321,375 |
| Tab order | The bar's controls are in the page in the order they are read, left to right; on Find the column comes before the map in the focus order (D98) | WEB/components/shell/TopBar.tsx:93-115; plan/README.md:135 (D98) |

### The five steps and their states

| Item | Value | Source |
|---|---|---|
| The steps, in order | **Roof**, **Array**, **Strings**, **Performance**, **Handover**. Find is the first part of Roof; Sun is a view of the Studio's stage, not a step | WEB/lib/flow/steps.ts:1-11; plan/README.md:132 (D95) |
| Where each leads | Roof `/studio/roof`, Array `/studio/array`, Strings `/studio/strings`, Performance `/performance`, Handover `/handover`. On Find the Roof step is the one in hand | WEB/lib/flow/steps.ts:33-46 |
| Where they stand | Tablet and desktop: a segmented row in the top bar (name "Steps"), the step in hand pressed; desktop draws a short line between steps. Phone: a tab bar at the foot, five icons with their names, the step in hand in the accent | WEB/components/shell/StepNav.tsx:35-69,73-108 |
| The mark of each step | Done: a tick. Needs you: the note mark (exclamation). To do: its number in a circle (1 to 5). On the phone's tab bar the tick or note sits on the icon's corner; a to-do step shows no number there | WEB/components/shell/StepNav.tsx:21-30,84-95 |
| What "done" means | Gone past: every step before the furthest step opened for this design on this device (or before the step in hand), unless something in it waits. Not a check that the step is complete | WEB/lib/flow/steps.ts:15-20,56-64 |
| What "needs you" means | A note to review leads to that step (module or layout notes: Array; weather notes: Performance; the chosen option outside its DC/AC target: Strings), or no option fits (Strings). Notes of a failed call and "Not saved" mark no step | WEB/lib/flow/steps.ts:69-78; WEB/components/shell/notes-view.ts:69-72,166-190 |
| Steps opened, remembered | Per design id on this device (`rooftop.steps-seen`); opening a step records it | WEB/components/shell/use-progression.ts:47-56; WEB/lib/device/progression.ts:42-53 |
| When a step cannot be gone to | On Find before Build this roof (no design yet): Array, Strings, Performance and Handover are grey, are not links, and a screen reader hears "after the roof is built". Roof shows as the step in hand, to do | WEB/lib/flow/steps.ts:17-18,59; WEB/components/shell/StepNav.tsx:19,53-57,97-100; WEB/components/find/Find.tsx:64 |
| Tooltip of a step (desktop pointer, or keyboard focus) | Each step's D96 line (see "### The app's own words, explained once"), e.g. Handover "The files for the client, the installer and the utility." No tooltip on a step that cannot be gone to | WEB/components/shell/StepNav.tsx:58-62; WEB/lib/words/explain.ts:5-23 |
| Screen-reader words after the name | ", done", ", needs you", ", to do", ", after the roof is built" | WEB/components/shell/StepNav.tsx:19,47 |

### The step's primary and "Next:"

| Item | Value | Source |
|---|---|---|
| One primary per step, named for the next | Roof: **Continue to Array**; Array: **Continue to Strings**; Strings: **Continue to Performance**; Performance: **Continue to Handover**; Handover: **Download all** (Handover's own, part 6). Find's primary is **Build this roof** (part 2). On Strings, when no string length fits at the voltage set and a higher one fits, the primary becomes **Use {V} V** with the line "Check first that the site's code allows it." under it in place of "Next:"; pressed, it sets that voltage as the user's choice (part 4) | WEB/components/studio/Studio.tsx:44-75; WEB/lib/errors/problem-of.ts:88; WEB/components/performance/PerformanceHeader.tsx:12,27-31; WEB/components/handover/HandoverHead.tsx:42-58 |
| Where it stands | Studio: at the foot of the work column (desktop and tablet), pinned at the phone sheet's foot at every stop; floating at the stage's foot while the column is hidden. Performance: at the head's right on tablet and desktop (Present before it), pinned over the tab bar on phone. Handover: Download all at the head's right on desktop (Present before it); on tablet pinned at the list's foot with Present before it; on phone pinned over the tab bar, alone | WEB/components/studio/Studio.tsx:135-139,156-166; WEB/components/performance/PerformanceHeader.tsx:27-46; WEB/components/handover/HandoverHead.tsx:53-68 |
| "Next:" line | Under the Studio's primary: "Next: {Step}, {its line, first letter lower case}." until that next step has been opened once for this design. Shown on desktop and tablet (and on the floating primary); never on the phone sheet's foot. The three that occur: "Next: Array, the modules on the roof, how they are mounted and spaced.", "Next: Strings, how the modules are wired to the inverter.", "Next: Performance, the energy the design makes in a year, and where it is lost." Performance's "Continue to Handover" has no "Next:" line | WEB/components/studio/Studio.tsx:41-43,65,164; WEB/lib/words/explain.ts:25-29 |

### The app's own words, explained once (D96)

One module holds every line: WEB/lib/words/explain.ts:5-18. A line is shown as a sentence (its full stop added, WEB/lib/words/explain.ts:23).

| Word | Its line, verbatim (as shown, with the full stop) | Where the app shows it | Source |
|---|---|---|---|
| Roof | "The roof's outline, its edges and what stands on it." | Tooltip of the step; under the stage's title on desktop the first time on this device | WEB/lib/words/explain.ts:6; WEB/components/shell/StepNav.tsx:58; WEB/components/studio/Stage.tsx:44,145 |
| Array | "The modules on the roof, how they are mounted and spaced." | Step tooltip; first-time line under the stage's title (desktop); "Next:" under Roof's primary | WEB/lib/words/explain.ts:7; WEB/components/studio/Studio.tsx:65 |
| Strings | "How the modules are wired to the inverter." | Step tooltip; first-time line (desktop); "Next:" under Array's primary | WEB/lib/words/explain.ts:8 |
| Performance | "The energy the design makes in a year, and where it is lost." | Step tooltip; first-time line under Performance's title (every size); "Next:" under Strings' primary | WEB/lib/words/explain.ts:9; WEB/components/performance/PerformanceHeader.tsx:23-24 |
| Handover | "The files for the client, the installer and the utility." | Step tooltip; first-time line under Handover's title (every size) | WEB/lib/words/explain.ts:10; WEB/components/handover/HandoverHead.tsx:50-51 |
| Sun | "Shadows at any hour, and the shade on each module over the year." | First-time line under the stage's title on desktop when the Sun view is on (title then "{Step} · Sun"). The Sun button has no tooltip | WEB/lib/words/explain.ts:11; WEB/components/studio/Stage.tsx:145; WEB/components/studio/Studio.tsx:129; WEB/components/studio/ViewControls.tsx:66-68 |
| Options | "Ways to wire the modules to the inverter, the best first." | Not shown anywhere at `c6aeb66` | WEB/lib/words/explain.ts:12 (no other use) |
| Your own option | "Your own number of modules per string and strings." | Not shown anywhere | WEB/lib/words/explain.ts:13 |
| To review | "Values outside the usual range. Each one says how to fix it." | The same words are written separately as the notes list's intro, shown only when a note carries a field | WEB/lib/words/explain.ts:14; WEB/components/shell/notes-view.ts:128-129 |
| Project file | "The whole design in one file, to open again in the app." | Not shown anywhere (other wordings are shown, see Product issues) | WEB/lib/words/explain.ts:15 |
| Design day | "The day the rows are spaced for, so they do not shade each other." | Not shown anywhere | WEB/lib/words/explain.ts:16 |
| Present | "The design as a tour on the whole screen, for a client." | Not shown anywhere | WEB/lib/words/explain.ts:17 |
| First-time rule | A line under a title shows the first time the word is met on this device (`rooftop.words-met`); fixed for that page load, so it shows again each time that title is shown until the page is reloaded; after that the tooltip and the ? say it | WEB/components/shell/FirstMeeting.tsx:7-35; WEB/lib/device/progression.ts:55-63 |

### The result chip and its summary

| Item | Value | Source |
|---|---|---|
| Where | Top bar's right on desktop and phone (Studio, Performance, Handover); on tablet a 56 px row under the Studio's stage, the chip at the left and "{modules} modules · {DC} kWp" at the right. Not on Find | WEB/components/shell/TopBar.tsx:110-114; WEB/components/studio/Studio.tsx:129-134; WEB/components/shell/result-view.ts:49-54 |
| State: computing | A ring and "Computing the energy" (the words from tablet up) | WEB/components/shell/result-view.ts:33; WEB/components/shell/ResultChip.tsx:82-86 |
| State: the result | The energy of year 1 of the chosen option, one decimal, "MWh" and on desktop " a year": e.g. "617.8 MWh a year" | WEB/components/shell/result-view.ts:19,27; WEB/components/shell/ResultChip.tsx:36-45; WEB/lib/format/vitals.ts:15 |
| State: updating | The last figure dimmed with a ring beside it, while a newer run is on its way; "{n} to review" is not shown meanwhile | WEB/components/shell/ResultChip.tsx:79-80; WEB/components/shell/vitals-view.ts:47,117-120,135 |
| State: to review | The note mark and "{n} to review" before the figure (on phone the figure is hidden then). {n} counts every note of the list (below): module, layout and weather notes, the chosen option outside its DC/AC target, a layout call that failed, and a refused save | WEB/components/shell/ResultChip.tsx:33,73-79; WEB/components/shell/vitals-view.ts:103-108,129; WEB/components/shell/stores.tsx:157-167 |
| State: not computed | The note mark and "Energy not computed" ("No energy" on phone) when a run failed with nothing before it, or when no option can be made (no voltage, no length fits, no positions) | WEB/components/shell/result-view.ts:28-32; WEB/components/shell/ResultChip.tsx:30-31,93-98; WEB/lib/errors/problem-of.ts:32-35,65-67 |
| State: showing the last result | The note mark, the last figure dimmed with "MWh", and "Showing the last result" (from tablet up) when a newer run failed | WEB/components/shell/result-view.ts:26; WEB/components/shell/ResultChip.tsx:87-92; WEB/components/shell/vitals-view.ts:72 |
| Accessible name | "Result: {figure} MWh a year" (", {n} to review" added), or the state's words | WEB/components/shell/ResultChip.tsx:56,64 |
| Pressed | A panel "The result" with a × ("Close"); on phone and tablet a bottom sheet | WEB/components/shell/ResultChip.tsx:101-106; WEB/components/ui/FloatingPanel.tsx:13-16,21-24 |
| The summary, seven figures in order | "Energy in year 1" ({x.x} MWh), "Modules" ({used} of {positions}), "DC capacity" ({x.xx} kWp), "AC capacity" ({x} kW), "DC/AC ratio" ({x.xx}), "Performance ratio (PR)" ({x.x} %), "Yield" ({x} kWh/kWp) | WEB/components/shell/result-view.ts:36-47; WEB/components/shell/vitals-view.ts:81-95; WEB/lib/format/vitals.ts:15-25 |
| Also in the panel | "{n} to review" (opens the notes) when notes wait; **Open Performance** (to `/performance`) except in the not-computed state; while computing, the words "Computing the energy" in place of the figures | WEB/components/shell/ResultChip.tsx:116-144 |
| A failed or stale chip | The panel shows the problem: title ("Energy not computed" or "Energy not updated"), cause and remedy, its buttons (Try again; or "Open {step}" where no option can be made) and "Details". Causes: "The server could not be reached." + "Check your connection, then try again." (with a result before: "The server could not be reached after your last change. The result shown is from before the change."); "The server did not answer." + "Try again in a moment."; "The app could not finish this step." + "Try again." (these two with a result before add " The result shown is from before the change."); a refusal of the API in its own words, with no Try again. Where no option can be made: title "Energy not computed", the API's words, and "Open Roof" (no module position) or "Open Strings" | WEB/components/shell/ResultChip.tsx:107-115; WEB/lib/errors/problem-of.ts:32-67; WEB/lib/flow/no-options.ts:7-9; WEB/components/ui/Problem.tsx:17-76 |

### Notes to review

| Item | Value | Source |
|---|---|---|
| What a note is | Notes of the module file, of the layout and of the weather (the API's words), the chosen option when its DC/AC is outside its target, a call that failed, and a design the device refused to save | WEB/components/shell/notes-view.ts:1-6,166-190 |
| How the list opens | From the result chip's panel ("{n} to review"), and from "Not saved" (the saved state, a button in the project menu) | WEB/components/shell/ResultChip.tsx:128-139; WEB/components/shell/SaveState.tsx:36-43 |
| The list | Title "{n} to review", or "Notes to review" with none; with none, one row "Nothing to review" with a tick. Phone: a bottom sheet (up to 3/4 of the height, with a grip); tablet and desktop: a panel from the right, 384 px wide, under the top bar. Escape, the × ("Close") or a press beside it closes it | WEB/components/shell/notes-view.ts:125-126; WEB/components/shell/NotesDrawer.tsx:23-27,80-104,108-148 |
| A note's row | Its title, its reason, where it belongs (e.g. "Module · Array step", "Layout · Array step", "Weather · Performance", "Option {letter} · Strings step", "This design · on this device"), and one action: "Open Array", "Open Strings", "Open Performance" or "Try again" | WEB/components/shell/notes-view.ts:67-72,153,168-188; WEB/components/shell/NotesDrawer.tsx:29-77 |
| A value outside the usual range | Title "{thing} outside the usual range", reason "Usually {low} to {high} {unit} for this kind of module. Enter the datasheet's value.", the field in the note (today only "Voc coefficient", %/°C, −0.999 to −0.001) with "From the module file · Array step" under it, and "Keep {value}"; the list then says "Values outside the usual range. Each one says how to fix it." | WEB/components/shell/notes-view.ts:20-26,101-132; WEB/components/shell/NotesDrawer.tsx:39-55 |
| Failed calls | "Energy not computed"/"Energy not updated" or "Layout not computed"/"Layout not updated", the cause and remedy, where "Showing the last result", "There is no result yet", "Showing the last positions" or "There are no positions yet"; action "Try again" | WEB/components/shell/notes-view.ts:159-180 |
| Marks | Exclamation (note) in the accent, amber `#FFB020`, never a red cross | plan/README.md:54 (D11); WEB/components/shell/NotesDrawer.tsx:34; WEB/app/globals.css:249 |

### Hide panel and Show panel (D99)

| Item | Value | Source |
|---|---|---|
| Where | Desktop only, in the Studio (Roof, Array, Strings). Find's column has no Hide panel | WEB/components/studio/Studio.tsx:87,149-153; (no use in WEB/components/find) |
| The work column | 384 px wide on desktop, at the right of the stage | WEB/app/globals.css:138; WEB/components/studio/Studio.tsx:142-147 |
| Hide panel | An icon button at the column's top right, tooltip "Hide panel" with the key "⌘ \"; the stage then takes the whole width | WEB/components/studio/Studio.tsx:149-153 |
| Show panel | A button "Show panel" beside the view controls at the stage's top right while the column is hidden | WEB/components/studio/ViewControls.tsx:70-78 |
| The key | ⌘ \ or Ctrl \ (either, on any computer; not with Alt or Shift), from anywhere in the Studio, toggles the column; not while a field, a slider, a menu, a list, a combobox or a dialog takes the keys. The tooltip shows "⌘ \" on every computer | WEB/lib/studio/panel-key.ts:1-7; WEB/components/studio/use-panel.ts:12,34-43; WEB/components/studio/Studio.tsx:150 |
| While hidden | The step's primary floats at the stage's foot (with its "Next:" line); the result stays in the top bar | WEB/components/studio/Studio.tsx:135-139 |
| Remembered | On this device (`rooftop.panel-hidden`) | WEB/components/studio/use-panel.ts:20-32; WEB/lib/device/progression.ts:65-69 |
| When the column comes back by itself | When the Studio opens a design opened in no more than one step on this device (its first open), when the step in hand needs you, and when an object on the roof is selected. Coming back this way also clears the remembered "hidden" | WEB/components/studio/use-panel.ts:16-31; WEB/components/studio/Studio.tsx:116; WEB/lib/stores/view-store.ts:161-162 |

### Who set a value, and Reset

| Item | Value | Source |
|---|---|---|
| The four words | "Default" (the app's), "From the weather" (the site's weather), "Set for {country}" (the user's country, e.g. "Set for India", "Set for the United States"), "Yours" | WEB/lib/studio/set-by.ts:1-28; WEB/lib/country/country.ts:11-12,32-34 |
| Where | At the right of a section's summary row, and under a field (the field's hint) | WEB/components/shell/SummaryRow.tsx:20,53; WEB/components/studio/SetByHint.tsx:11-27 |
| Under a field you changed | "Yours · default {value with unit}" then **Reset**, e.g. "Yours · default 0.90 m · Reset" | WEB/lib/studio/set-by.ts:30-31; WEB/components/studio/SetByHint.tsx:11-24 |
| Reset | Gives the app's value back, as one edit that undo takes back | WEB/components/studio/SetByHint.tsx:7,13 |
| A section's word | "Yours" when any of its fields is yours; else the first source that is not the app's default; else "Default" | WEB/lib/studio/set-by.ts:43-48 |
| Quiet while the app's | Three fields of Array's spacing (the row pitch, the azimuth, allowing shaded positions) say nothing under them while the app's value stands, since the control already says what the app did; once changed they say "Yours · default …" with Reset | WEB/components/studio/inspector-look.tsx:57-63; WEB/components/studio/ArraySpacing.tsx:112,142,146 |
| Module and inverter | "Default" until a file of your own is read, then "Yours" | WEB/lib/studio/set-by.ts:50-51 |

### Toasts, undo and redo

| Item | Value | Source |
|---|---|---|
| Toasts | One at a time, at the bottom centre (on phone above the tab bar). A toast of something done has a tick and leaves after 5 s (held while the pointer is over it or the focus inside); a note has the exclamation mark and stays until its × ("Close") | WEB/components/ui/toast-queue.ts:1-2,32-38; WEB/components/ui/design-numbers.ts:9; WEB/components/ui/Toaster.tsx:17-18,26-71; WEB/components/ui/Toast.tsx:26-60 |
| The toast with Undo | "Your stringing no longer fits. Option {letter} is used." with **Undo** (takes back the edit that removed the chosen stringing) and **Choose another** (opens the Strings step). It is the only toast with Undo | WEB/lib/flow/choice-gone.ts:38-40; WEB/components/shell/use-says-choice-gone.ts:9-38 |
| Other toasts of this part | "That design is no longer on this device."; "{the device's words} The demo is open instead."; the device's words when another design's write or the list fails, e.g. "The designs on this device could not be read: {reason}." | WEB/lib/device/opening.ts:16-22,38-46; WEB/lib/device/saving.ts:110-125,268-272; WEB/lib/device/designs-db.ts:73 |
| Undo and redo keys | ⌘ Z or Ctrl Z undoes the last committed edit; ⌘ ⇧ Z or Ctrl ⇧ Z redoes it; Ctrl Y redoes too. In the Studio, on Performance and on Handover. A key pressed in a field belongs to the field; one in an open dialog (the help sheet) to the dialog | WEB/components/shell/use-history-keys.ts:7-37; WEB/components/shell/keys-held.ts:1-15; WEB/components/studio/Studio.tsx:118; WEB/components/performance/Performance.tsx:54; WEB/components/handover/Handover.tsx:80 |
| How far back | 50 edits; opening another design clears the history | WEB/lib/stores/project-store.ts:42-43,65-68 |
| Undo button | None in the Studio, on Performance or Handover (Find's outline has its own Undo, part 2) | (no use of `canUndo` of the project store in WEB/components); WEB/components/find/OutlineTools.tsx:77 |
| What counts as an edit | Every committed change of the design, the name too; the weather the app loads for an edit is no edit | WEB/lib/stores/project-store.ts:13-33; WEB/components/shell/Shell.tsx:114-115 |

### Where designs are kept

| Item | Value | Source |
|---|---|---|
| Where | In this browser, on this device: IndexedDB database `rooftop`, store `designs`, one record per design id, indexed by last edit. Nothing is kept on a server | WEB/lib/device/designs-db.ts:1-11,38-49; plan/README.md:48 (D5) |
| One record | The id (a random UUID made when it is first kept), the name, the whole design, the card's facts (the roof in words, DC kWp and year-1 MWh of the last run), a 320×180 plan thumbnail (SVG), last edited, last opened | WEB/lib/device/kept-design.ts:8-30; WEB/lib/device/saving.ts:90 |
| Results | Never kept: a design opened runs again | WEB/lib/device/kept-design.ts:1-3 |
| When it is saved | Automatically, 600 ms after the last committed edit (edits close together are one write), after an undo or redo, and when a run or a layout lands; at once when the page is left (reload, tab closed) | WEB/lib/device/saving.ts:1-8,142-150,183-199; WEB/components/ui/design-numbers.ts:68-69; WEB/components/shell/Shell.tsx:77-82 |
| The demo and new designs | Not kept until their first edit; then kept under a new id | WEB/lib/device/saving.ts:4-5,19,176-181 |
| A write the device refuses | The saved mark becomes the note and "Not saved"; a note "Not saved" with the device's words (e.g. "The design could not be saved on this device: {reason}."), "This design · on this device" and "Try again"; the next edit tries again too. No quota check of its own | WEB/lib/device/saving.ts:8,120-124,261-266; WEB/components/shell/notes-view.ts:181-188; WEB/lib/device/designs-db.ts:53-70,81-85 |
| Another tab | A change of the database blocked by another open tab fails with "the app is open in another tab, which blocks the change" | WEB/lib/device/designs-db.ts:48 |
| After a reload | The design remembered as open (`rooftop.open-design`) is read from the device and runs again; else the demo opens. A remembered design no longer there opens the demo without a word; one that cannot be read opens the demo with "{the device's words} The demo is open instead." | WEB/components/shell/use-opens-what-belongs.ts:9-25; WEB/lib/device/opening.ts:1-36 |
| Another browser or device | Designs live in this browser only. To move one: Download the project file (.rtd) on one device, Open a project file on the other | WEB/lib/home/cards.ts:23-29; WEB/components/shell/OpenProject.tsx:17-19 |
| Delete | Home, a card's menu, Delete: dialog "Delete {name}?" with "It is saved on this device only.", buttons **Cancel** (has the focus) and **Delete**. A deleted design that is open stays open, no longer kept ("Not saved", hollow dot); its next edit keeps it again under a new id | WEB/lib/home/cards.ts:53-56; WEB/components/home/OnThisDevice.tsx:26-74; WEB/lib/device/saving.ts:51-55,241-255 |
| Leaving while a file downloads | While a Handover file or Download all is on its way the browser asks, in its own words, before the page is left | WEB/lib/device/leaving.ts:1-8; WEB/components/shell/Shell.tsx:65-75 |

### The project menu

Opened by the design's name in the top bar (a floating menu on desktop, a bottom sheet on phone and tablet).

| Row | What it does | Source |
|---|---|---|
| "This design" | The name with a tick, the saved state under it ("Saved on this device", "Saving", "Not saved"; the refused "Not saved" is a button to the notes); a pencil, **Rename**, turns the name into a field (Enter or leaving commits, Escape gives the name back, empty refused "A name is needed", at most 200 characters). The rename is an edit undo takes back | WEB/components/shell/ProjectSwitcher.tsx:102-143; WEB/lib/flow/name-field.ts:6-9; WEB/components/shell/Shell.tsx:114-115 |
| "On this device" | The other designs kept here, newest edited first, each with its name and under it its figures ("{x.x} MWh a year · {x.xx} kWp") or, before a run, its roof in words; pressed, it opens. With none: "No other designs". The open design is listed once, as This design | WEB/components/shell/ProjectSwitcher.tsx:145-189; WEB/components/shell/switcher-view.ts:1-19; WEB/lib/device/card-figures.ts:6-9 |
| **New design** · "Find the roof" | Goes to `/find` | WEB/components/shell/ProjectSwitcher.tsx:69 |
| **Open a project file** · ".rtd" | Opens the Open a project file dialog | WEB/components/shell/ProjectSwitcher.tsx:70 |
| **Import a drawing** · "KMZ, KML, DXF" | Opens the import dialog (part 2) | WEB/components/shell/ProjectSwitcher.tsx:71 |
| **Download the project file** · ".rtd" | Downloads the open design's .rtd | WEB/components/shell/ProjectSwitcher.tsx:72; WEB/components/shell/Shell.tsx:116 |
| **Home** | Goes to `/` | WEB/components/shell/ProjectSwitcher.tsx:73 |
| **Docs** (external mark) | The docs (same address as the top bar's Docs) in a new tab | WEB/components/shell/ProjectSwitcher.tsx:74-75,204-207 |
| A design that cannot be opened | "That design is no longer on this device." or the device's words; the open design stays | WEB/lib/device/opening.ts:38-46 |

### Home

`/`, outside the shell. A start screen in a column of 960 px.

| Element (top to bottom) | Value | Source |
|---|---|---|
| Header | The logo (mark; wordmark from tablet up; not a link) at the left; **Docs** (book icon) at the right on every size, phone included, to the docs in a new tab. 56 px high, 60 px from tablet up | WEB/components/home/Home.tsx:94-101 |
| Title | "Rooftop PV design" | WEB/lib/home/home-view.ts:8; WEB/components/home/Home.tsx:105 |
| Line | "Outline a roof on the map. The app lays out the modules, the shade, the strings and the energy of a year." | WEB/lib/home/home-view.ts:9; WEB/components/home/Home.tsx:106 |
| The search | A field 56 px high, placeholder "Address or coordinates" (accessible name "Search an address or paste coordinates"), with **Find the roof** beside it (under it on phone, as wide as it). The largest thing on the page | WEB/components/shell/Search.tsx:51,64-72,232-270; WEB/lib/home/home-view.ts:10-11 |
| What the search does | With nothing typed, Find the roof is a link to `/find`. Words typed: Find the roof (or Enter) searches the address; up to 5 places are listed with their kind; one chosen opens `/find?at=<lat>,<lon>&place=<label>`. Coordinates or a maps link typed are read back as one row "Coordinates"; taken, they open `/find?at=<lat>,<lon>`. What looks like coordinates but cannot be read is refused with the reason, and a swapped reading offered as "Swapped" when it fits. Home's search shows no examples | WEB/components/shell/Search.tsx:97-136,261-346; WEB/components/home/Home.tsx:57-59,110; WEB/lib/places/esri.ts:17,49-59; WEB/lib/routes.ts:96-102 |
| Search messages | "Searching for “{query}”"; "Nothing found for “{query}”. Try a fuller address, or paste coordinates."; "The address search cannot be reached. Check your connection, then try again."; "The address search did not answer. Try again in a moment."; "Address search is not available. Paste coordinates or a maps link." (no key, or the service answered with an error); "The search failed. Try again." | WEB/components/shell/Search.tsx:112,336,344; WEB/lib/places/esri.ts:19-20,36-40,75,77; WEB/lib/errors/problem-of.ts:92-93 |
| A place found by words names the design | The place's name, the label before its first comma ("Pune" of "Pune, Maharashtra, India"), becomes the design's place name when the roof is built; a place given by coordinates has none (D114) | WEB/lib/outline/place-name.ts:1-26; WEB/components/find/Find.tsx:210 |
| The ways in, as links under the search | **Use my location** (the browser's location, high accuracy, waits 15 s; found, Find opens at it; refused: "Your location is not available. Allow it in the browser, or search for the address." under the field); **Enter the roof by hand** (to `/find?by=hand`); **Import a drawing** (its dialog); **Open a project file** (its dialog) | WEB/lib/home/home-view.ts:14-21; WEB/components/home/Home.tsx:61-66,111-120; WEB/components/shell/Search.tsx:54,180-195 |
| Open a project file dialog | Title "Open a project file"; line "A design downloaded from the app as one file."; drop zone "Drop the project file here" / "An .rtd file"; buttons **Cancel** and **Open** (waits until the file is read). The file is read at once (by the API); read, it shows the project's name and its roof in words, and any notes on files the project names but does not carry. Refusals: "Choose a project file (.rtd)."; "This file is larger than any project file the app saves. Choose another." (over 6,291,456 bytes as sent); "The file could not be read. Choose another."; the API's own words; **Try again** when the server was not reached. Open keeps it on this device as a new design and opens the Studio at its last step (part 6 has the file itself) | WEB/components/shell/OpenProject.tsx:17-21,48-132; WEB/lib/flow/open-project.ts:9-68 |
| "Your designs · on this device" (only when there are some) | Head "Your designs · on this device" with "{n} design" / "{n} designs"; the cards, three a row on desktop, two on tablet, one on phone, newest edited first. With designs, this section comes first under the search, and the search stays at the top as the page scrolls | WEB/lib/home/home-view.ts:29-35; WEB/components/home/OnThisDevice.tsx:26-56; WEB/components/home/Home.tsx:108-109,122-136 |
| A design card | The plan thumbnail across the top (opens the design; accessible name "Open {name}"); the name (opens it); a "Menu" button (⋯); the roof in words, e.g. "90.0 × 40.0 m flat roof, tilted rows" (other types: "flat roof, east-west", "sloped roof"; a roof that is no rectangle gives its area "{n} m²"); its figures after a run, "{x.x} MWh a year · {x.xx} kWp" (none before a run, never 0); "Edited moments ago", "Edited {n} minute(s)/hour(s) ago", "Edited yesterday", "Edited {n} days ago", then "Edited 17 Sep 2026" | WEB/components/home/DesignCard.tsx:40-137; WEB/lib/home/cards.ts:11-48; WEB/lib/device/kept-design.ts:32-42,77-92; WEB/lib/geometry/roof-card.ts:32-38; WEB/lib/device/card-figures.ts:6-9 |
| The card's one menu | **Open**, **Rename**, **Duplicate**, **Download the project file**, **Delete** | WEB/lib/home/cards.ts:23-30; WEB/components/home/DesignCard.tsx:30-31,77-99 |
| Open | Opens it from the device; it runs again, in the Studio at the Studio step (Roof, Array or Strings) last opened in this visit, Roof after a reload (the view keeps it in memory only) | WEB/components/home/Home.tsx:68-76; WEB/lib/stores/view-store.ts:52-53,128 |
| Rename | The name becomes a field in place: Enter or leaving commits, Escape gives it back, empty refused "A name is needed", at most 200 characters | WEB/components/home/DesignCard.tsx:41-46,109-120; WEB/lib/flow/name-field.ts:6-9 |
| Duplicate | A copy "Copy of {name}" (cut to 200 characters), kept under a new id and opened in the Studio at once | WEB/lib/home/cards.ts:50-51; WEB/components/home/Home.tsx:78-84 |
| Download the project file | Downloads that design's .rtd (made by the API) without opening it | WEB/components/home/Home.tsx:86-90 |
| Delete | Asks first (see "### Where designs are kept") | WEB/components/home/OnThisDevice.tsx:57-74 |
| "Try the demo" card (always, last) | Title "Try the demo"; line "A finished design on a 90 × 40 m roof in Pune, to look around before you start your own."; **Open the demo** opens the demo in the Studio at the Studio step last opened in this visit (Roof at first). No figures on Home | WEB/lib/home/home-view.ts:23-27; WEB/components/home/DemoCard.tsx:11-27; WEB/components/home/Home.tsx:50-54 |
| Empty state | With no designs on the device, Home is the title, the line, the search with its ways in, and the demo card: there is no designs section and no empty-state sentence | WEB/lib/home/home-view.ts:31-32 |
| Toasts on Home | A design that could not be opened, a file that could not be downloaded | WEB/components/home/Home.tsx:141-142 |
| No help, no top bar of steps | Home has no ? discs and no step bar | WEB/components/home/Home.tsx:92-144 |

### The demo design

| Item | Value | Source |
|---|---|---|
| Name and place name | "Pune demo roof"; place name "Pune" (D114) | CORE/demo.py:48; plan/README.md:151 (D114) |
| Roof | 90 × 40 m flat roof, rows tilted (`flat_tilted`), at 18.52° N, 73.86° E (Pune), entered as a 90 × 40 m rectangle, long side facing 180° | CORE/demo.py:8,21-23,52 |
| Obstacles | "Stair room" (box 5 × 4 m, 3 m high), "Water tank" (cylinder 2.5 m across, 2 m high), "AC unit 1" to "AC unit 4" (boxes 1.5 × 1 m, 1.2 m high) | CORE/demo.py:24-30 |
| Array | Two modules in each row's height; the rest a new design's defaults | CORE/demo.py:34-38 |
| Equipment | Module file `insolation-ina-144mhc-tf-560.PAN`, inverter file `wattpower-wp-330ktl-h1.OND` (the samples) | CORE/resources.py:8-10 |
| Weather | Bundled with the demo (source "pvgis", label "PVGIS TMY"), so it runs without fetching weather | CORE/demo.py:41-49; CORE/samples/pune_weather.json (head) |
| System voltage | 1500 V, marked the user's choice | CORE/demo.py:50-51 |
| How it is opened | `GET /api/demo`; Home's Open the demo, or any shell page opened with no design remembered | API/routers/demo.py:11-14; WEB/components/home/Home.tsx:50-54; WEB/lib/device/opening.ts:24-36 |
| Kept | Not until its first edit; then a design like any other under a new id | WEB/lib/device/saving.ts:4-5 |
| A new design's name | The API's default is "Untitled roof" (a roof found by coordinates, a maps link or Use my location); a roof found by words takes the place's whole label as its name (e.g. "Pune, Maharashtra, India"), and its place name is the part before the first comma ("Pune") | API/schemas/project.py:65; WEB/lib/outline/build-request.ts:33; WEB/lib/outline/place-name.ts:11-15; plan/README.md:92 (D49) |

### Country and the system voltage a design starts with

Only the default-setting. The Strings step's voltage section is part 4.

| Item | Value | Source |
|---|---|---|
| How the country is found | 1) the country Vercel reads from the connection (`x-vercel-ip-country`), asked once per visit at `GET /country`, kept nowhere (`Cache-Control: no-store`); 2) until it answers, or if it fails, the browser's time zone; 3) else India (`IN`). Checked on production: `/country` answered `{"country":"IN"}` with `cache-control: no-store` | WEB/app/country/route.ts:3-9; WEB/lib/country/country.ts:5-6,16-25,63-79; WEB/components/shell/stores.tsx:44-50,106-108 |
| 600 V countries | US, PR, GU, VI, AS, MP (the United States and its territories) and CA (Canada) | WEB/lib/country/country.ts:8-9,27-29 |
| Elsewhere | 1000 V | WEB/lib/country/country.ts:27-29 |
| When it applies | When any design without a system voltage is opened (built on Find, imported, opened from a file): the country's voltage, marked set by the app | WEB/lib/stores/project-store.ts:3-4,50-55,65-68; WEB/components/shell/stores.tsx:51 |
| What the user sees | "Set for {country}" while the app's value is the country's; "Default" if the app set it and it is not the current country's; "Yours" once chosen | WEB/lib/studio/voltage-words.ts:87; WEB/lib/studio/set-by.ts:16-28 |
| Never raised | Equipment rated lower never moves the voltage up; a higher voltage is only offered (D88) | plan/README.md:125 (D88) |
| The demo | 1500 V, the user's choice | CORE/demo.py:50-51 |

### In-app help: how it works

| Item | Value | Source |
|---|---|---|
| Where it is | On Find and in the Studio (Roof, Array, Strings, the Sun view). Not on Home, Performance, Handover or Present (no topics, no discs there) | WEB/components/shell/Shell.tsx:121; WEB/components/find/Find.tsx:319; (HelpDisc used only in WEB/components/find and WEB/components/studio, shell rows) |
| The ? disc | A quiet ring with "?" beside a section's name (and on Find's tools and sections). At rest in the line colour; while its topic is shown, in the accent. 20 px in a 24 px target on desktop, 44 px on touch. Accessible name "Help: {title}" | WEB/components/shell/help/help-disc-look.ts:3-15; WEB/components/shell/help/HelpDisc.tsx:20-46 |
| Its tooltip | The topic's summary, then "Click for more" (pointer and keyboard focus; never on touch; 400 ms after the pointer comes) | WEB/components/shell/help/HelpDisc.tsx:27; WEB/components/ui/Tooltip.tsx:65-69; WEB/components/ui/design-numbers.ts:6 |
| The help sheet | Desktop: from the right edge, full height, 440 px wide; tablet: 480 px; phone: from the bottom, the full height but 48 px, with a grip. The browser's dialog: Escape, the × ("Close help") or a press beside it closes it | WEB/components/shell/help/HelpSheet.tsx:18-23,61-82 |
| The sheet's head | "Back" (after a link was followed), then where it is: "{Kind} · {Screen}", e.g. "Section · Roof step", "Tool · Find", "Section · Strings step" | WEB/components/shell/help/HelpSheet.tsx:79-82; WEB/lib/help/where.ts:6-15 |
| The topic | Title, summary; for a one-choice section its options, each with what it means, the section's own value marked ("Your choice", or its who-set-it words such as "Set for India"); the body; at the foot one list, **Related** | WEB/components/shell/help/HelpSheet.tsx:84-108; WEB/lib/help/help-state.ts:6,49 |
| The body | Loaded when opened (skeleton lines meanwhile); if it cannot load: "This part of the help did not load. Check the connection and try again." with **Try again** | WEB/components/shell/help/HelpBody.tsx:13-55 |
| Sections' structure | Three headings: "What to set", "What it changes", "When to change it" (15 topics; Place has the first two). Topics that read a result use "Reading it" first (Modules per string, MPPT loading, Shade map, Shade over the year, The sun at the time); Options uses "Choosing one", "What a card says", "How the options are made", "Add your own option" | HELP/*/section/*.mdx (headings); WEB/lib/help/types.ts:10-12 |
| How-tos (Find's tools) | Numbered steps, each with words for a mouse or for touch, a picture with numbered callouts and their words under it, and sometimes a clip; then "Undo" (and "Keys", "Remove it" where they apply) | HELP/find/tool/*.mdx; WEB/components/shell/help/help-steps.tsx:25-129 |
| Pictures | 25 pictures (.jpg) under `/help/find/` for 10 how-tos (Find the roof has none). On touch a picture is pressed to open it larger ("Open the picture larger: {alt}"), where it pinches ("Pinch to look closer", × "Close the picture" or Escape); on desktop it does not open larger. A picture that does not load says "The picture did not load" with **Try again** | WEB/public/help/find/ (25 .jpg); WEB/components/shell/help/help-steps.tsx:57-111; WEB/components/shell/help/PictureLarge.tsx:24-28,76-80; WEB/components/shell/help/picture-parts.tsx:49-63 |
| Clips | 7 clips (.mp4, H.264): corners 1, move-an-obstacle 2, move-the-roof 2, rectangle 2. At rest the picture with a play button and the clip's length; nothing loads until pressed; muted and looping, a line of the accent at the foot; a press pauses; under reduced motion it plays once; on touch a magnifier opens it larger. Failed: "The clip did not load. The picture shows the step." | WEB/public/help/find/ (7 .mp4); WEB/components/shell/help/PictureClip.tsx:25-131; plan/README.md:121 (D83) |
| Links inside a topic | Another topic's name opens it in the sheet; **Back** returns | WEB/components/shell/help/help-kit.tsx:19-27; WEB/lib/help/help-state.ts:34-39 |
| Related | Two or three related topics by their titles (each opens in the sheet), then one row "{section}, in the docs" with a book icon that opens the docs in a new tab | WEB/lib/help/related.ts:1-17; WEB/components/shell/help/HelpSheet.tsx:118-146 |
| How the docs row links | `{docs home}/{page}#{anchor of the section}`: the anchor is the section heading lower-cased, punctuation dropped, spaces to hyphens. E.g. Spacing → https://solarlayout.app/docs/rooftop/array#spacing; Shade-free hours → https://solarlayout.app/docs/rooftop/array#shade-free-window. The app holds its own list of the docs' pages and headings (those of the docs at `98d8629`, 2026-10-10) and a gate checks each topic's place against it | WEB/lib/docs/docs.ts:1-26,28-132 |
| Shareable address | The open topic is in the address as `?help=<id>`; a link with it opens the topic; an old id opens its topic by alias (e.g. `studio.section.modules-in-series` → Modules per string); an unknown one is dropped | WEB/lib/help/address.ts:1-17; WEB/components/shell/help/HelpProvider.tsx:41-56; WEB/lib/help/manifest.gen.ts (ALIASES) |

### In-app help: the topics

32 topics: 2 shared (`app`), 3 Find sections, 11 Find tool how-tos, 16 Studio sections. Titles and summaries are in the help-map above (verbatim). Kinds, structure and media:

| Id | Kind | Headings of the body | Pictures / clips | Source |
|---|---|---|---|---|
| app.section.obstacles | section | What to set, What it changes, When to change it | — | HELP/app/section/obstacles.mdx |
| app.section.roof-type | section (options "Flat, rows facing south", "Flat, rows facing east and west", "Sloped") | What to set, What it changes, When to change it | — | HELP/app/section/roof-type.mdx |
| find.section.edges | section | What to set, What it changes, When to change it | — | HELP/find/section/edges.mdx |
| find.section.place | section | What to set, What it changes | — | HELP/find/section/place.mdx |
| find.section.shape | section (options Rectangle, Corners) | What to set, What it changes, When to change it | — | HELP/find/section/shape.mdx |
| find.tool.box | tool | steps, Undo | 3 / 0 | HELP/find/tool/box.mdx |
| find.tool.building | tool | steps, Undo | 2 / 0 | HELP/find/tool/building.mdx |
| find.tool.corners | tool | steps, Undo, Keys | 3 / 1 | HELP/find/tool/corners.mdx |
| find.tool.detect | tool | steps, Undo | 3 / 0 | HELP/find/tool/detect.mdx |
| find.tool.find-the-roof | tool | steps, Other ways to start, What the search reads, Keys, Without a map | 0 / 0 | HELP/find/tool/find-the-roof.mdx |
| find.tool.move-an-obstacle | tool | steps, Remove it, Undo | 3 / 2 | HELP/find/tool/move-an-obstacle.mdx |
| find.tool.move-the-roof | tool | steps, Undo | 3 / 2 | HELP/find/tool/move-the-roof.mdx |
| find.tool.rectangle | tool | steps, Undo | 2 / 2 | HELP/find/tool/rectangle.mdx |
| find.tool.tank | tool | steps, Undo | 2 / 0 | HELP/find/tool/tank.mdx |
| find.tool.tree | tool | steps, Undo | 2 / 0 | HELP/find/tool/tree.mdx |
| find.tool.wall | tool | steps, Undo | 2 / 0 | HELP/find/tool/wall.mdx |
| studio.section.design-day | section | What to set, What it changes, When to change it | — | HELP/studio/section/design-day.mdx |
| studio.section.edges-and-access | section | What to set, What it changes, When to change it | — | HELP/studio/section/edges-and-access.mdx |
| studio.section.inverter | section | What to set, What it changes, When to change it | — | HELP/studio/section/inverter.mdx |
| studio.section.module | section | What to set, What it changes, When to change it | — | HELP/studio/section/module.mdx |
| studio.section.modules-per-string | section | Reading it, What sets the ends, When no length fits | — | HELP/studio/section/modules-per-string.mdx |
| studio.section.mounting | section | What to set, What it changes, When to change it | — | HELP/studio/section/mounting.mdx |
| studio.section.mppt-loading | section | Reading it, How it is worked out, When a limit is not known | — | HELP/studio/section/mppt-loading.mdx |
| studio.section.on-the-roof | section | What to set, What it changes, When to change it | — | HELP/studio/section/on-the-roof.mdx |
| studio.section.options | section | Choosing one, What a card says, How the options are made, Add your own option | — | HELP/studio/section/options.mdx |
| studio.section.outline | section | What to set, What it changes, When to change it | — | HELP/studio/section/outline.mdx |
| studio.section.shade-free-hours | section | What to set, What it changes, When to change it | — | HELP/studio/section/shade-free-hours.mdx |
| studio.section.shade-map | section | Reading it, One module, When it waits | — | HELP/studio/section/shade-map.mdx |
| studio.section.shade-over-the-year | section | Reading it, What it counts, What changes it | — | HELP/studio/section/shade-over-the-year.mdx |
| studio.section.spacing | section | What to set, What it changes, When to change it | — | HELP/studio/section/spacing.mdx |
| studio.section.system-voltage | section (options 600 V, 1000 V, 1500 V) | What to set, What it changes, When to change it | — | HELP/studio/section/system-voltage.mdx |
| studio.section.the-sun-at-the-time | section (options 21 Dec, 21 Mar, 21 Jun, Any date) | Reading it, The day, The time, Keys | — | HELP/studio/section/the-sun-at-the-time.mdx |
| Totals | 32 topics; 25 pictures, 7 clips, all present on disk (every `src` and `clip` a topic names exists under WEB/public) | | | WEB/lib/help/manifest.gen.ts:4-36; checked by listing WEB/public/help |

### Data that leaves the device

| Destination (provider) | When | What is sent | Source |
|---|---|---|---|
| The app's own site (Vercel) | Every visit | Requests for the pages, scripts, fonts, help pictures and clips, the equipment library (`/equipment/catalog.json` and its PAN/OND files); `GET /country` (Vercel reads the connection's country; the answer is not stored) | WEB/app/country/route.ts:3-9; WEB/public/equipment (catalog.json, modules, inverters); WEB/lib/equipment/library-file.ts:20-22 |
| The app's API (AWS Lambda, ap-south-1), always through the site's `/api/*` | See below | JSON over HTTPS | WEB/lib/api/client.ts:57-71; WEB/next.config.ts:39-41; docs/deployment.md:18-19 |
| API `GET /demo` | The demo opens | Nothing | API/routers/demo.py:11; WEB/lib/api/client.ts:104 |
| API `POST /roof/from-map` | Build this roof on Find | The outline and obstacles as longitude/latitude, their heights and sizes, the roof type, the source, the name (the place's label when found by words) | API/routers/roof.py:18; API/schemas/roof_map.py:16-39; WEB/lib/api/client.ts:110 |
| API `POST /roof/import` | Import a drawing | The KMZ, KML or DXF file (base64), its name, the units and the place for a DXF | API/routers/roof.py:12; API/schemas/roof_import.py:11-18; WEB/lib/flow/import-drawing.ts:28-31 |
| API `POST /layout`, `POST /design`, `POST /export/{kind}`, `POST /export/report-pages` | After every committed edit (layout, then the run), the report's preview, every Handover file, Download the project file | The whole design: name, place name, roof outline and obstacles with latitude/longitude, array, losses, the module and inverter file text when your own, the weather source and any CSV weather text, the embedded weather, the system voltage and the rest of the project | API/routers/layout.py:12; API/routers/design.py:16; API/routers/export.py:25,36; API/schemas/project.py:55-91 |
| API `POST /sun` | The Sun view and the shadows | Latitude, longitude, the day, the hours, the roof for the shadows | API/routers/sun.py:12; API/schemas/sun.py:13-34 |
| API `POST /weather` | Loading the weather | The source, latitude, longitude, a CSV's name and text | API/routers/weather.py:12; API/schemas/weather.py:39-46 |
| API `POST /equipment/module`, `/equipment/inverter` | Choosing a module or inverter, from the library or your own file | The file's name and its content (base64) | API/routers/equipment.py:12,18; API/schemas/equipment.py:17-19; WEB/lib/equipment/library-file.ts:20-31 |
| API `POST /project/open` | Open a project file | The .rtd's name and text | API/routers/project.py:12; WEB/lib/flow/open-project.ts:32-35 |
| PVGIS (European Commission JRC, `re.jrc.ec.europa.eu`), asked by the API | Weather "PVGIS" (the default source) is loaded for a design | Latitude and longitude (typical year and horizon) | CORE/weather.py:28,135-181; API/schemas/project.py:79 |
| NASA POWER (`power.larc.nasa.gov`), asked by the API | Weather "NASA POWER" is loaded | Latitude, longitude, year 2023 | CORE/weather.py:29,183-210 |
| Esri World Imagery (`ibasemaps-api.arcgis.com`) | Find's map; the Studio's ground while **Imagery** is on (off at first: the plain grid) | Tile requests for the area viewed, with the app's public key | WEB/lib/places/esri.ts:8-10,22-23,62-66; WEB/components/scene/Ground.tsx:15-16,75-77; WEB/lib/stores/view-store.ts:128 |
| Esri geocoding (`geocode-api.arcgis.com`) | Words typed in a search (Home, Find, the import's place) | The typed text, at most 5 results asked, the map's centre when there is one, the app's key | WEB/lib/places/esri.ts:11-17,49-59 |
| Overture Maps (`tiles.overturemaps.org`, release 2026-09-23.1) | Only while Detect building is the tool on Find | Range reads of the zoom-14 building tiles of the area viewed | WEB/lib/map/overture.ts:8-12; WEB/components/find/OutlineLayer.tsx:361-364 |
| The device's location | Use my location only | Read by the browser; the coordinates move the map (and go to the API with the design built there) | WEB/components/shell/Search.tsx:180-195 |
| Analytics, telemetry, cookies | None: no analytics package among the dependencies, no cookie written, no middleware | WEB/package.json (dependencies); (searched WEB for analytics, document.cookie, gtag, posthog, sentry: no match) |

What the API keeps:

| Item | Value | Source |
|---|---|---|
| Stated design | "Stateless: every response is a pure function of the request." No database, nothing per user | API/main.py:25-29; plan/README.md:48-49 (D5, D6) |
| Memory caches (per running instance, never written to disk, lost when it stops) | Weather downloads of up to 64 sites; shading up to 64 MB, options up to 64 MB, operating points up to 32 MB, keyed by a fingerprint of the inputs; report page images up to 32,000,000 bytes | API/services/weather.py:12; CORE/memo.py:40-42; API/services/export.py:38 |
| Logs | One line per request: method, path, status, time (no query string, no body); CloudWatch, kept 30 days | API/timing.py:1-8,29-31; docs/deployment.md:71 |

### Limits that apply app-wide

| Item | Value | Source |
|---|---|---|
| Any request to the deployed API | 6,291,456 bytes (6 MiB), the Function URL's limit; the app checks the project file and the drawing before sending | WEB/lib/flow/open-project.ts:14-19; WEB/lib/flow/import-drawing.ts:25-26; API/schemas/limits.py:1-4 |
| Project file (.rtd) | Refused before sending over 6,291,456 bytes as sent: "This file is larger than any project file the app saves. Choose another."; the API takes up to 5,000,000 characters of text; file name 1 to 255 characters | WEB/lib/flow/open-project.ts:19-22; API/schemas/limits.py:13-14; API/schemas/project_file.py:15-16 |
| Drawing (KMZ, KML, DXF) | About 4.7 MB of file at most: "The app can send a drawing of about 4.7 MB at most. Save this one with only the roof and its obstacles, then choose it again." (the API schema takes base64 up to 28,000,000 characters, more than the 6 MiB request allows) | WEB/lib/flow/import-drawing.ts:25-26; API/schemas/roof_import.py:11,18 |
| Module (PAN) or inverter (OND) file of your own | 256,000 bytes: "{file} is over 256 KB, larger than any module or inverter file. Choose another." | WEB/lib/equipment/library-file.ts:25-31; API/schemas/limits.py:8-10 |
| Weather CSV | 3,000,000 bytes: "The file is over 3 MB. A year of weather is under 3 MB, even at 15-minute steps. Choose a file of one year."; at most 8,784 hours | WEB/lib/performance/weather-csv.ts:19-25; API/schemas/limits.py:6-7; API/schemas/weather.py:24 |
| Roof size | 30,000 m² ("about 3 MWp"); over it the API says "This outline covers {n} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." | CORE/geometry.py:29; CORE/errors.py:37-51 |
| Design name, place name | 200 characters each; an empty name is refused ("A name is needed") | API/schemas/limits.py:11-12; API/schemas/project.py:65-71; WEB/lib/flow/name-field.ts:6-9 |
| Downloaded file names | At most 80 characters of the design's name | API/services/export.py:29,235-238 |
| Place search | At most 5 places | WEB/lib/places/esri.ts:17 |
| Undo | 50 edits | WEB/lib/stores/project-store.ts:42-43 |
| Use my location | Waits 15 s | WEB/components/shell/Search.tsx:193 |
| Weather downloads (API) | PVGIS waits 60 s, NASA POWER 120 s | CORE/weather.py:135,195 |
| A run | Begins 500 ms after a committed edit (edits close together are one run); streams its progress; Vercel keeps the line open while a byte comes every 120 s, and the API's event stream sends a keep-alive ping after 15 s without an event (FastAPI's own `_PING_INTERVAL = 15.0` in the installed `fastapi/sse.py:241`); a run at the roof limit takes about 6 s | WEB/components/ui/design-numbers.ts:20-21; docs/deployment.md:78-80; API/routers/design.py:16 |
| The API function | 1,769 MB of memory, one vCPU, one simulation thread; 900 s timeout; reserved concurrency 50 on staging and 100 on production | docs/deployment.md:16,80; infra/aws/README.md:104,130; apps/api/Dockerfile:38 |

#### Known-stale (this area)

- docs/deployment.md:15 gives each function 10,240 MB. The functions run at 1,769 MB (docs/deployment.md:80; infra/aws/README.md:130; apps/api/Dockerfile:38; D67).
- "Stateless" (API/main.py:28) is true of the answers, but each instance holds memory caches of weather, shading, options and report page images (API/services/weather.py:12; CORE/memo.py:40-42; API/services/export.py:38). A privacy page must not say the API holds nothing.
- D99 (plan/README.md:136) says Find's work column can be hidden as well as the Studio's. The code has Hide panel and ⌘ \ in the Studio only (WEB/components/studio/Studio.tsx:149-153; WEB/components/studio/use-panel.ts; nothing in WEB/components/find).
- D96 (plan/README.md:133) and voice §12 (plan/v2/voice.md, "## 12") say each app word's line is used in every place, the help included. Six of the twelve lines are shown nowhere (Options, Your own option, Project file, Design day, Present; To review only as a separately written copy) (WEB/lib/words/explain.ts:12-17); the Options topic's summary is different ("Choose how the modules are wired to the inverter. The best option comes first.", HELP/studio/section/options.mdx front matter) from its line ("Ways to wire the modules to the inverter, the best first.").
- docs/design/information-architecture.md:36 and :49-50 name a "Layers" view control and "The Layers button switches between them". The control is the toggle **Imagery** (WEB/components/studio/ViewControls.tsx:28-29,88; D103).
- docs/design/information-architecture.md:76-77 (Flow, step 5) says the user chooses the system voltage on the Strings step and "Nothing is preselected". A design without a voltage gets its country's (WEB/lib/stores/project-store.ts:50-55; D87).
- docs/design/information-architecture.md:28 says the result chip is "a row under the stage on tablet". That holds in the Studio only; on tablet Performance and Handover show no result chip at all (WEB/components/shell/TopBar.tsx:110-114; only WEB/components/studio/Studio.tsx:129-134 draws the tablet row).
- WEB/components/shell/help/SectionHeading.tsx:19 says a section heading is "in the heading's orange". D94 reversed it: headings are primary text (WEB/components/ui/section-look.ts:1-3).
- WEB/lib/docs/docs.ts:2-3 and its DOCS_PAGES (WEB/lib/docs/docs.ts:28-119) are the OLD docs' pages and headings (at 98d8629, before V2): e.g. the help's Shade-free hours links to `array#shade-free-window`, Modules per string to `strings#modules-in-series`, Outline to `roof#location`. A V2 docs rewrite that renames pages or headings breaks these links unless the app's list (and each topic's `docs:`) changes with it.
- The browser suites describe the screens before V2 and must not be cited for V2 behaviour: e.g. e2e/tests/home.e2e.ts:85-104 ("Find your roof.", "Find my roof", "Demo project", "On this device"), e2e/tests/shell.e2e.ts:152-159 ("Export leads to Handover"), e2e/tests/device.e2e.ts:94 ("Not kept on this device"); plan/STATE.md:128 and :220 record them as not brought up to date (#238 item 23).
- plan/STATE.md:128 says the place's figure in Present is the coordinates because no design keeps its place's name. Superseded: D114 built (CORE/project.py:36; WEB/lib/outline/place-name.ts; WEB/lib/present/scene-panel.ts:60).
- plan/STATE.md:128 notes "on phone a Docs link of the top bar stands past the right edge". The top bar's Docs is desktop-only now (WEB/components/shell/TopBar.tsx:64-74).
- The old fact sheet's "31 topics" and its Home, card, Open-project, project-switcher and save-state words (docs repo docs/PRODUCT_FACTS.rooftop.md §1) are all superseded by the rows above; D111 (plan/README.md:148) also says 31, the code has 32 (Add a tree added).

#### Facts we do not have (this area)

- Price and terms: the code proves there is no sign-in; it says nothing about the app being free.
- A list of supported browsers. The code requires WebGL for 3D and the map, and IndexedDB for keeping designs; nothing else is checked.
- How much the browser lets IndexedDB store, and what happens at the limit beyond the generic "Not saved" note.
- What Vercel, AWS, Esri, Overture, PVGIS and NASA log at their own level (IP addresses, retention).
- Whether Present's ground uses the imagery as the Studio's Imagery toggle leaves it (Present is not this part's; not checked).
- The demo's capacity and energy figures: worked out at run time; Home no longer shows them.

#### Product issues noticed (this area)

- On tablet, Performance and Handover have no result chip and no "{n} to review": the bar hides the chip on tablet (WEB/components/shell/TopBar.tsx:110-114) and only the Studio draws the tablet row (WEB/components/studio/Studio.tsx:129-134). There the notes list cannot be opened (except a refused save's "Not saved"). Verified by reading every use of `ResultChip`.
- For a design not kept on the device (the demo before its first edit, any new design before its first edit), the steps opened are not remembered: `useProgression` reads and writes the seen steps by the saving id, which is null then (WEB/components/shell/use-progression.ts:41,45-56; WEB/lib/device/saving.ts:19). So a step's tick follows only the step in hand, "Next:" always shows, and the work column always opens. Verified by reading.
- The first-time lines of Roof, Array, Strings and Sun stand under the stage's title on desktop only (`hidden ... desktop:block`, WEB/components/studio/Stage.tsx:145), but the word is recorded as met on every size (WEB/components/shell/FirstMeeting.tsx:29-33). A user who starts on a phone or tablet never sees these lines, and later on desktop is not shown them either. Verified by reading.
- Three wordings of what a project file is: the D96 line "The whole design in one file, to open again in the app" (shown nowhere, WEB/lib/words/explain.ts:15), the dialog's "A design downloaded from the app as one file." (WEB/components/shell/OpenProject.tsx:19), and Handover's row "The whole design, to open again in the app" (WEB/lib/flow/deliverables/items.ts:67). Against D96's one line per word.
- Home cards, the project menu (before a run) and the Open a project file dialog (its read-back lines) say the roof type in the old words "flat roof, tilted rows", "flat roof, east-west", "sloped roof" (WEB/lib/device/kept-design.ts:33-42; WEB/lib/flow/open-project.ts:52-54), not D112's long names "in every line and list" ("Flat, rows facing south" or north, "Flat, rows facing east and west", "Sloped"; plan/README.md:149; WEB/lib/geometry/roof-types.ts:13-16).
- The help sheet's Roof type options always read "Flat, rows facing south" (WEB/lib/help/manifest.gen.ts:55; drawn as is, WEB/components/shell/help/HelpSheet.tsx:93-98), also for a roof south of the equator, where D112 and the rest of the app say "north" (WEB/lib/geometry/roof-types.ts:15). Verified by reading.
- The Hide panel tooltip shows the key "⌘ \" on every computer (WEB/components/studio/Studio.tsx:150, a fixed string); on Windows and Linux the key is Ctrl \ (the handler takes either, WEB/lib/studio/panel-key.ts:6). Minor.
- No undo on touch in the Studio, Performance or Handover: undo is keys only (WEB/components/shell/use-history-keys.ts) and no button uses the project store's `canUndo` (searched WEB/components). On a phone the only way back is a field's Reset or the choice-gone toast's Undo.
- On Find on phone and tablet the docs are reached only through a help topic's Related row: Find's bar shows Docs on desktop only (WEB/components/find/FindBar.tsx:22; WEB/components/shell/TopBar.tsx:68) and Find has no project menu. Minor.
- When no option can be made because no module position exists (`no_positions`), the remedy leads to Roof (WEB/lib/flow/no-options.ts:7-9), but the step marked "needs you" is Strings (WEB/lib/flow/steps.ts:76). Verified by reading.
- The roof-size refusal says "SolarLayout designs one roof at a time" (CORE/errors.py:47), against the voice's "the app" (plan/v2/voice.md:177, "The company's software": never "SolarLayout Rooftop" but in the logo and the page title).
- While the stage cannot draw 3D, the view controls are gone, Show panel with them (WEB/components/studio/Stage.tsx:155); a hidden column then comes back only by ⌘ \ or a selection. Minor, by reading.

<!-- help-map -->
<!--
Help topics of this area (apps/web/content/help), with the ### of this part that covers each. "docs:" is the page and
heading of the docs site the topic links to (its front matter, through WEB/lib/docs/docs.ts); the docs page must keep
those headings (see "Find: help topics and the docs headings the app links to").

| Topic id | Title | Summary (verbatim) | docs: | Covered in |
|---|---|---|---|---|
| find.tool.find-the-roof | Find the roof | Search an address, paste coordinates or a maps link, then outline the roof on the map. | find · Find the building | Find: the first step and the search; Find: place search |
| find.tool.corners | Outline by its corners | Click each corner of the roof, then the first corner again to close the outline. | find · Outline the roof | Find: outlining by corners; Find: Undo, Clear and the keys |
| find.tool.rectangle | Draw a rectangle | Drag from one corner of the roof to the opposite one, then turn it to fit. | find · Outline the roof | Find: outlining by rectangle |
| find.tool.detect | Detect the building | Click inside the building to get its outline, then drag the corners onto the roof. | find · Outline the roof | Find: Detect building (Overture footprints) |
| find.section.edges | Edges | Type a length you measured to correct one edge of the outline. | find · Outline the roof | Find: Edges (the closed outline) |
| find.tool.move-the-roof | Move or turn the roof | Drag the roof to move it, or its round handle to turn it. Its obstacles move with it. | find · Move or turn the roof | Find: moving and turning the roof |
| find.tool.box | Add a box | Drag over a stair room or a plant room, then type its height above the roof. | find · What stands on the roof | Find: obstacles |
| find.tool.tank | Add a tank | Drag from the middle of a round tank to its edge, then type its height. | find · What stands on the roof | Find: obstacles |
| find.tool.wall | Add a wall | Click each point of the wall, end on the last one, then type its height. | find · What stands on the roof | Find: obstacles |
| find.tool.tree | Add a tree | Drag from the middle of a tree to the edge of its crown, then type its height. | find · What stands on the roof | Find: obstacles |
| find.tool.building | Add a building beside the roof | Outline a building next to the roof and type its height, so its shadow on the roof counts. | find · What stands on the roof | Find: obstacles |
| find.tool.move-an-obstacle | Move, turn or remove an obstacle | Select an obstacle on the map, then drag it, turn it by its handle, or remove it. | find · What stands on the roof | Find: obstacles |
| app.section.obstacles | Obstacles | Add what stands on the roof with its height, so modules keep clear of it and its shade counts. | roof · Obstacles | Find: obstacles (its Find half; the Roof step's half is part 3's) |
| app.section.roof-type | Roof type | Choose how the modules sit: rows facing south, rows facing east and west, or flush on a slope. | roof · Roof type | Find: the roof type question |
| find.section.place | Place | Set where a roof entered by hand stands: search for it, or type its latitude and longitude. | find · By hand | Find: by hand |
| find.section.shape | Shape | Type the roof's length and width, or its corners in metres. | find · By hand | Find: by hand |

16 topics. Help source lines: HELP/find/tool/*.mdx:2-3, HELP/find/section/*.mdx:2-3, HELP/app/section/roof-type.mdx:2-3,
HELP/app/section/obstacles.mdx:2-3; keys in WEB/lib/help/manifest.gen.ts.
-->

## 2. Find: the roof on the map (the Roof step's first part)

Read at product `main` c6aeb66 (last code change e1faa19, #246). Prefixes: WEB = apps/web, API = apps/api/src/rooftop_api,
CORE = apps/api/src/rooftop_core, HELP = apps/web/content/help. Runtime checks: a few on production
(https://rooftop.solarlayout.app, read-only, 2026-10-13) and three small `bun` scripts over the web's pure modules; each
is said where used.

### Find: ways in, the address, and what is kept

| Item | Value | Source |
|---|---|---|
| Route and tab title | `/find`; the tab reads "Find the roof · SolarLayout Rooftop" | WEB/lib/routes.ts:73; WEB/app/find/page.tsx:5 |
| Find is for a new roof only | There is no way to re-outline an existing design on Find (the old `/find?edit=roof` is gone, #245). The outline of a built design is edited in the Roof step (part 3). | WEB/components/find/FindBar.tsx:9; WEB/components/find/Find.tsx:201 |
| From Home's search | Home's field (placeholder "Address or coordinates") with the primary **Find the roof** beside it (under it on phone). With nothing typed the button is a link to `/find`. With words typed it searches them and the places list under the field; choosing one opens `/find?at={lat},{lon}&place={label}`. Coordinates or a maps link typed are read back and taken: `/find?at={lat},{lon}` (no `place`). | WEB/lib/home/home-view.ts:10-11; WEB/components/home/Home.tsx:57-59, :110; WEB/components/shell/Search.tsx:261-271; WEB/lib/routes.ts:97-102 |
| Home's search has no location bias | Home's search asks the geocoder with no `near` (Find's asks near the map's centre) | WEB/components/home/Home.tsx:27, :110; WEB/lib/places/esri.ts:56 |
| From Home: **Use my location** | The device's position, taken as `/find?at={lat},{lon}` (no place name). A failure shows Home's note under its search (see Messages). | WEB/lib/home/home-view.ts:17; WEB/components/home/Home.tsx:62; WEB/components/shell/Search.tsx:180-195 |
| From Home: **Enter the roof by hand** | Opens `/find?by=hand`: Find opens once on its by-hand column, the place empty | WEB/lib/home/home-view.ts:18; WEB/components/home/Home.tsx:63; WEB/lib/routes.ts:91, :94; WEB/components/find/Find.tsx:194-199 |
| From Home: **Import a drawing** | Not Find: a dialog over Home that opens the drawing as a new design in the Studio's Roof step (see "Find: import a drawing") | WEB/lib/home/home-view.ts:19; WEB/components/home/Home.tsx:64, :139 |
| From the project menu | **New design** (its fact "Find the roof") goes to `/find`; **Import a drawing** (fact "KMZ, KML, DXF") opens the import dialog | WEB/components/shell/ProjectSwitcher.tsx:69, :71 |
| A place carried in the address | `?at=<lat>,<lon>` with exactly two numbers, \|lat\| ≤ 90, \|lon\| ≤ 180; else ignored and Find starts at its first step. `&place=<label>` marks the place as found by words. With a place Find opens at **Outline the roof**, the map at roof zoom on it. | WEB/lib/routes.ts:108-117; WEB/components/find/Find.tsx:112, :120-121, :147-150 |
| Start view without a place | India from far: lon 78.5, lat 21.5, zoom 4. If a design is open, the map opens at that design's place at roof zoom (the design is not shown or changed). | WEB/components/find/Find.tsx:72, :147-150 |
| Nothing on Find is saved | The outline, obstacles, roof type and by-hand entries live in the page only: leaving Find (the mark, or the **Roof** step) or reloading loses them. **Docs** opens a new tab and leaves Find as it is. The design exists only after **Build this roof**. | WEB/components/find/Find.tsx:122-131; WEB/components/find/Find.tsx:202-216; WEB/components/shell/TopBar.tsx:69 |
| Kept on the device by Find | Only two things: the map line gone for good (`rooftop.tips-gone`), and whether the **Edges** row was left open (`find.edges`) | WEB/lib/device/tips-seen.ts:6; WEB/components/find/Find.tsx:295; WEB/components/shell/SummaryRow.tsx:35 |

### Find: the top bar and the steps

| Item | Value | Source |
|---|---|---|
| Top bar | The mark (a link to Home, labelled "Home"), a divider (desktop), the design's name **New design** (always these words on Find), the five steps, and **Docs** (desktop only, a new tab). No project menu, no result chip, no notes, no search. | WEB/components/find/FindBar.tsx:10-24; WEB/components/shell/TopBar.tsx:65-88 |
| The docs from Find on tablet and phone | No **Docs** in the bar and no project menu below desktop: the way to the docs is a help topic's "{section}, in the docs" row | WEB/components/shell/TopBar.tsx:68; WEB/components/find/FindBar.tsx:15-23; WEB/lib/help/related.ts:16 |
| The steps on Find | **Roof** pressed (the step in hand), its mark the number 1. **Array**, **Strings**, **Performance**, **Handover** cannot be gone to: drawn greyed with their numbers, not links (`aria-disabled`); a screen reader hears "{step}, after the roof is built". | WEB/components/find/Find.tsx:63-64; WEB/lib/flow/steps.ts:56-64; WEB/components/shell/StepNav.tsx:19, :22-30, :53-56 |
| Roof's tooltip (desktop, pointer resting) | "The roof's outline, its edges and what stands on it." | WEB/lib/words/explain.ts:6, :23; WEB/components/shell/StepNav.tsx:58 |
| Pressing **Roof** on Find | It is a link to `/studio/roof`: it leaves Find and drops what was drawn. The Studio then shows the design already open in the page, else opens the one remembered as open on the device, else the demo. (See Product issues.) | WEB/components/shell/StepNav.tsx:58-61; WEB/lib/flow/steps.ts:33-37; WEB/components/shell/use-opens-what-belongs.ts:14-25 |
| Desktop and tablet | The steps in the top bar (`StepNav`, shown from tablet up) | WEB/components/shell/StepNav.tsx:38 |
| Phone | The steps in a tab bar at the screen's foot, each with its icon; Roof in the accent; the others greyed and not links. The top bar holds the mark and **New design** only. | WEB/components/shell/StepNav.tsx:74-109; WEB/components/find/Find.tsx:375 |

### Find: layout by size, and the column's head by the step

| Item | Value | Source |
|---|---|---|
| Sizes | Phone under 640 px, tablet 640 to 1100 px, desktop from 1101 px | WEB/components/shell/use-screen-size.ts:9-10 |
| Desktop | Map on the left; the work column at the right, 384 px, with a border; the column scrolls; **Build this roof** pinned at the column's foot. The column comes first in the keyboard order. There is no **Hide panel** on Find (the Studio has it). | WEB/components/find/Find.tsx:322-331; WEB/app/globals.css:138; WEB/components/studio/Studio.tsx:150-151 |
| Tablet | The map on top, 440 px high; under it a bottom sheet whose half stop meets the map's foot; Build pinned at the sheet's foot. Map buttons and scale bar shown. | WEB/components/find/Find.tsx:144, :332-341; WEB/components/shell/use-share-under.ts:11-28 |
| Phone | The map on top takes what the sheet leaves. The sheet's stops: peek 156 px (handle, the step's instruction, the primary), half (the map keeps 40 % of the screen's height), full (a strip of 120 px of map stays). Opens at half. Build pinned at the sheet's foot at every stop. No map buttons, no scale bar ("the map is pinched and turned by hand"). | WEB/components/find/Find.tsx:142, :145, :358-359; WEB/components/ui/sheet-stops.ts:37-53; WEB/components/ui/design-numbers.ts:72; WEB/components/find/RoofMap.tsx:40-41 |
| Touch words | On a coarse pointer (phone or tablet) instructions say "Press" where desktop says "Click" | WEB/components/find/Find.tsx:137; WEB/lib/outline/find-head.ts:19 |
| Head: first step | Title **Find the roof**; line "Search for the building, then outline its roof on the map." | WEB/lib/outline/find-head.ts:21-22 |
| Head: outline open | Title **Outline the roof**; line "Click each corner of the roof. Click the first corner again to close the outline." (touch: "Press each corner of the roof. Press the first corner again to close the outline.") The head follows the step, never the tool in hand. | WEB/lib/outline/find-head.ts:23-24 |
| Head: outline closed | Title **Add the obstacles**; line "The roof is outlined: {area} m², {n} corners. Add its obstacles, choose its type, then build." (area whole m² with a thousands comma, e.g. "3,600 m²") | WEB/lib/outline/find-head.ts:25-29; WEB/lib/outline/find-head.test.ts:19-23 |
| Head: by hand | Title **Enter the roof by hand**; line "Type the roof's length and width. Add its obstacles in the Studio." | WEB/lib/outline/find-head.ts:30-31 |
| The ? beside the title | Opens the how-to of what the hand can do now: first step `find.tool.find-the-roof`; outline open: the tool in hand's topic; closed: the tool's topic, or `find.tool.move-an-obstacle` with an obstacle selected, `find.tool.move-the-roof` with the roof picked up. None by hand (Place and Shape have their own ?). | WEB/components/find/Find.tsx:174, :271; WEB/lib/outline/how-to.ts:11-16 |
| Column contents by step | First step: the search, then **Use my location** and **Enter the roof by hand**. Outline open: the outline tools, the count of corners, Undo, Clear, then **Enter the roof by hand**. Closed: Obstacles, Roof type, Edges, then **Enter the roof by hand**. By hand: Place, Shape, Roof type, then **Draw on the map instead** (only when a map can be shown). | WEB/components/find/Find.tsx:284-314 |
| **Enter the roof by hand** (outline open or closed) | A quiet button with a pencil. It switches to the by-hand column at the place found; the outline drawn is replaced (see By hand). | WEB/components/find/Find.tsx:306-309, :185-191 |
| **Draw on the map instead** | Back to the map; shown by hand only while a map can be shown. A roof typed by hand that was complete comes to the map as a closed outline at the place (the column is then **Add the obstacles**); an incomplete one leaves the map with no outline (**Outline the roof**). | WEB/components/find/Find.tsx:310-313, :158; WEB/lib/outline/outline-state.ts:349-358 |

### Find: the first step and the search

| Item | Value | Source |
|---|---|---|
| The field | First in the column, 48 px high. Placeholder **Address or coordinates**; its accessible name "Search an address or paste coordinates". | WEB/components/shell/Search.tsx:51-53, :58, :236, :241 |
| Beside the field | Nothing while it is empty. Once something is typed, a primary **Search** (Enter does the same). | WEB/lib/places/beside-the-field.ts:9-13; WEB/components/shell/Search.tsx:285-290 |
| **Examples** | While the field is empty and has the focus (or is pressed), its list shows "Examples": `Koregaon Park, Pune` · An address; `18.53621, 73.89380` · Coordinates; `google.com/maps/@18.53621,73.89380` · A maps link. Pressing one puts it in the field (the link as `https://www.google.com/maps/@18.53621,73.89380,19z`) and does not search. | WEB/lib/outline/first-step.ts:11-15; WEB/components/shell/Search.tsx:153-155, :295-308 |
| Other ways, under the search (list "Other ways to start") | **Use my location** · "When you are at the building"; **Enter the roof by hand** · "Type its length and width" | WEB/lib/outline/first-step.ts:17-20; WEB/components/find/FirstStep.tsx:21-33 |
| After a place is chosen | The map flies to it at roof zoom; the column becomes **Outline the roof** with Corners in hand. Without a map the by-hand column opens at that place. The search is not shown again on Find. | WEB/components/find/Find.tsx:219-226, :284; WEB/lib/outline/first-step.ts:26 |
| Places near the map come first | Find's search sends the map's centre to the geocoder | WEB/components/find/Find.tsx:228-232; WEB/lib/places/esri.ts:56 |

### Find: place search (what it reads, results, my location)

| Item | Value | Source |
|---|---|---|
| Geocoder | Esri World geocoding (`findAddressCandidates`, ArcGIS Location Platform), asked from the browser with the app's key; at most 5 places, in Esri's order | WEB/lib/places/esri.ts:11-12, :17, :50-59 |
| A result row | A pin, the place's label (Esri's address) and its kind (Esri's `Type`, e.g. "Park", "District", "Hotel", "City"; empty when Esri gives none). Seen on production for "Koregaon Park, Pune": 5 rows, kinds Park, District, Hotel, (none), City. | WEB/lib/places/esri.ts:41-46; WEB/components/shell/Search.tsx:313-325, :354-362; runtime on production |
| Keys in the list | The first place is marked. ↓ ↑ move the mark, Home and End go to the ends, Enter takes the marked place, a press takes any, Esc closes the list and keeps the words | WEB/lib/places/search-state.ts:35-37, :51-66; WEB/components/shell/Search.tsx:157-178 |
| While searching | A ring in the field (labelled "Searching") and the row "Searching for “{words}”" | WEB/components/shell/Search.tsx:253-254, :339-345 |
| Words vs coordinates | What looks like coordinates (digits, °, ′, ″, signs, N/S/E/W, commas, semicolons only) is never sent to the geocoder. Whole numbers with only spaces between them are words (a postcode: `411001`, `18 61 10 73 53 37` are searched as words). | WEB/lib/places/place-input.ts:67-74, :270-279; bun check of placeInputOf |
| Decimal coordinates | Latitude first; a comma, a semicolon or a space between; signs allowed. Two numbers with decimal commas and nothing else are read with decimal points (`12,914094 77,491989`). | WEB/lib/places/place-input.ts:59-65, :104-113, :131-138 |
| Degrees, minutes, seconds | ° ′ ″ (typographic or ASCII, `º˚`, `''` for ″ also read), N/S/E/W before or after each angle; only the last part may have a fraction (`18° 32.17′ N, 73° 53.63′ E` read; `12.5°30′` not); letters set which is which, so `E … N` order is swapped to latitude first | WEB/lib/places/place-input.ts:48-57, :152-189, :241-248; bun check |
| Maps links (must start http:// or https://) | Google `@lat,lon`, `q=`, `query=`, `ll=`, `destination=`, `center=`; OpenStreetMap `#map=z/lat/lon` and `mlat=`/`mlon=`; Apple `ll=`; Bing `cp=lat~lon` (a comma or `%2C` between). A link without its `https://` is searched as words: the example as the list shows it, `google.com/maps/@18.53621,73.89380`, typed by hand goes to the geocoder. | WEB/lib/places/place-input.ts:16-24, :29-39, :274-278; bun check of placeInputOf (review) |
| Read back as typed | Coordinates or a link show at once as one row marked **Coordinates**, written to 5 decimals with N/S/E/W ("18.53621° N, 73.89380° E"); Enter, **Search** or a press takes it, with no request | WEB/components/shell/Search.tsx:139-148, :209, :309-312; WEB/lib/format/place.ts:18-20 |
| Refused coordinates | On Enter or **Search** (not while typing), a note under the field says why (Messages); nothing is sent. Where a latitude over 90 fits as a longitude and no letters were given, the swapped pair is offered as a row marked **Swapped**; Enter takes it. | WEB/lib/places/place-input.ts:254-258; WEB/components/shell/Search.tsx:128-134, :163-166, :326-334 |
| Swapped pairs both under 90 | Not detected: `73.89380, 18.53621` is taken as latitude 73.89380 | bun check of placeInputOf; WEB/lib/places/place-input.ts:252-262 |
| **Use my location** | Browser geolocation, high accuracy, 15 s timeout; the map flies to the position at roof zoom. Nothing shows while it waits on Find or Home: the ring is drawn only in the round button beside a form's search (the DXF place of the import), which Find's column and Home do not show (see Product issues). | WEB/components/shell/Search.tsx:180-195, :216, :272-284; WEB/lib/places/beside-the-field.ts:11; WEB/components/find/Find.tsx:287 |
| The design's names from the place | Found by words: the design is named the place's full label (API `name`), and its place name (D114) is the label before its first comma, at most 200 characters ("Koregaon Park" of "Koregaon Park, Pune"). Coordinates, a link, Use my location: no place name, and the API's name "Untitled roof". | WEB/lib/outline/build-request.ts:33; WEB/lib/outline/place-name.ts:12-26; API/services/roof_map.py:13, :42; WEB/components/find/Find.tsx:208-210 |
| By hand, the place name | Kept only while the Place fields still hold the place found by words; typing another place there drops it | WEB/lib/outline/place-name.ts:22-25; WEB/components/find/Find.tsx:209 |

### Find: the map

| Item | Value | Source |
|---|---|---|
| Kind | Satellite imagery only (no street map), drawn with MapLibre (WebGL), labelled "Satellite map" for screen readers | WEB/components/find/RoofMap.tsx:65-86, :139-141 |
| Imagery | Esri World Imagery (ArcGIS Location Platform), 256 px tiles, native to zoom 19, enlarged above | WEB/lib/places/esri.ts:9-10, :66; WEB/lib/places/provider.ts:9-10 |
| Attribution (bottom left, always) | "Powered by Esri · Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community"; while **Detect building** is in hand a second line "© Overture Maps Foundation, ODbL" | WEB/lib/places/esri.ts:15; WEB/lib/map/overture.ts:14; WEB/components/find/Find.tsx:349; WEB/components/find/RoofMap.tsx:156-159 |
| Roof zoom | 18 in MapLibre's count (the imagery's native 19), about 0.3 m a pixel; the map flies here to a place found | WEB/components/ui/design-numbers.ts:23-24; WEB/components/find/Find.tsx:222 |
| Maximum zoom | 21.5 | WEB/components/find/RoofMap.tsx:33 |
| Map buttons (tablet and desktop, bottom right) | "North up" (turns the map back to north), "Zoom in", "Zoom out". Phone has none. | WEB/components/find/MapButtons.tsx:18-30; WEB/components/find/Find.tsx:359 |
| Scale bar (tablet and desktop, bottom left) | The largest round length (1, 2, 5, 10, 20, 50 … m, then km) that fits in 124 px | WEB/lib/map/scale-bar.ts:6, :19-25; WEB/components/ui/design-numbers.ts:27; WEB/components/find/RoofMap.tsx:41 |
| Cursor | Open hand; closed hand while the map or what is picked is dragged; crosshair while a drawing tool needs the press; move cursor over what is picked | WEB/lib/outline/map-cursor.ts:15-19; WEB/components/find/OutlineLayer.tsx:580-584 |
| Panning | A drag pans the map, except while a tool draws by dragging (Rectangle with no corner yet; Box, Tank, Tree on the closed roof) | WEB/lib/outline/draws.ts:13-31; WEB/components/find/OutlineLayer.tsx:549-552 |
| What draws the outline | The roof's fill and line in the accent; corners as white dots with an accent ring (18 px desktop, 22 px touch) in 44 px targets; a dot in each edge's middle; each edge's length "{n} m" (1 decimal) 18 px below its middle | WEB/components/find/OutlineLayer.tsx:78-91, :612-639, :848-854 |
| Frame of the drawing | The browser draws in a flat frame of metres about the first corner (WGS84 ellipsoid metres a degree). Build sends WGS84 corners; the API projects them through the site's UTM zone, so the design's y is UTM grid north, within the grid convergence of true north (0.36° at Pune; under 1° for a roof). | WEB/lib/outline/frame.ts:1-20; CORE/geo.py:2-7 |
| Without a map: when | No imagery key (checked first), no WebGL, or the tiles fail before any has shown | WEB/lib/map/map-state.ts:31-36; WEB/components/find/RoofMap.tsx:93-104, :165-167 |
| Without a map: what shows | A note at the column's head (title and reason, Messages) and the by-hand column; the stage shows the plan of the roof (see By hand). The map is not tried again until the page is reloaded. | WEB/components/find/Find.tsx:152-155, :275-283, :342-354 |

### Find: outlining by corners

| Item | Value | Source |
|---|---|---|
| Tools while the outline is open | Toolbar "Outline tools": **Corners** (in hand at first), **Rectangle**, **Detect building**, each an icon and its word; the one in hand pressed | WEB/components/find/OutlineTools.tsx:14-18, :38-48, :59; WEB/components/find/Find.tsx:123, :126 |
| Under the tools | The count of corners ("No corners yet", "1 corner", "{n} corners"), **Undo** and **Clear** | WEB/lib/outline/find-head.ts:70; WEB/components/find/OutlineTools.tsx:60-65 |
| Place a corner | Each click (press on touch) places a corner. The first press sets the drawing's frame there. | WEB/components/find/OutlineLayer.tsx:428-431 |
| Snapping while placing or dragging | A corner snaps to a right angle with the edge before it (while **Square the corners** is on), else to run parallel to any edge drawn, when within 3° and within 4 px of the pointer. The first corner never snaps. | WEB/lib/outline/snap.ts:47-72; WEB/lib/outline/outline-state.ts:210-213; WEB/components/ui/design-numbers.ts:29-33 |
| Close the outline | At least 3 corners, then press the first corner (its 44 px target, or within 12 px; 20 px on touch) or press Enter. The tools then become the obstacles, with **Box** in hand. | WEB/components/find/OutlineLayer.tsx:786-790; WEB/lib/outline/outline-state.ts:220-238; WEB/components/ui/design-numbers.ts:35-39; WEB/components/find/OutlineTools.tsx:30 |
| Closing squares a near-rectangle | With **Square the corners** on, 4 corners all within 3° of right angles are made an exact rectangle on closing; the first edge is kept | WEB/lib/outline/outline-state.ts:102-130 |
| Fewest corners | 3 (the API also refuses fewer) | WEB/lib/outline/outline-state.ts:100; API/schemas/roof_map.py:32 |
| Drag a corner | Any time (open or closed); the snaps above apply. On touch a loupe, 104 px, the imagery twice as large with a cross at the corner, stands 92 px above the finger. | WEB/components/find/OutlineLayer.tsx:108-113, :777-814 |
| Add a corner | Press the dot in the middle of an edge ("Add a corner on edge {n}"), or drag it to add one and move it | WEB/components/find/OutlineLayer.tsx:816-846 |
| Select a corner | Click it ("Corner {n}, selected" to a screen reader); it pulses | WEB/components/find/OutlineLayer.tsx:616-622, :786-791 |

### Find: outlining by rectangle

| Item | Value | Source |
|---|---|---|
| Draw | With **Rectangle** in hand and no corner placed, drag from one corner of the roof to the opposite one: a box square to north, closed when let go. With corners placed the tool draws nothing (press **Clear** first). | WEB/lib/outline/draws.ts:16-17; WEB/components/find/OutlineLayer.tsx:439-467; WEB/lib/outline/rectangle.ts:5-17 |
| Turn it | A round handle ("Turn the rectangle") 44 px above the middle of its top edge, on a stem; drag it round the middle. Within 3° of north it snaps straight. | WEB/components/find/OutlineLayer.tsx:97, :199-206, :1035-1056; WEB/lib/outline/rectangle.ts:35-39 |
| Edges named by side | A closed outline of 4 corners, each within 1° of a right angle (however it was drawn: Rectangle, Corners, a footprint), has its edges named by the side they face: North, North-east, East, South-east, South, South-west, West, North-west; any other outline's "Edge 1", "Edge 2" … | WEB/lib/outline/outline-state.ts:475-489; WEB/lib/geometry/typed-length.ts:6-20 |
| It stops being a rectangle | Dragging one of its corners makes it an outline of corners: the turn handle goes (to turn it then, pick the roof up). A typed edge length keeps it a rectangle while Square the corners is on. | WEB/lib/outline/outline-state.ts:174-177, :314-318 |

### Find: Detect building (Overture footprints)

| Item | Value | Source |
|---|---|---|
| Tool | **Detect building**, while the outline is open. In hand, the known footprints show faintly (a light fill and a dashed line in the accent) and the Overture attribution line is added. | WEB/components/find/OutlineTools.tsx:17; WEB/components/find/OutlineLayer.tsx:361-386; WEB/components/find/Find.tsx:349 |
| Source | Overture Maps building footprints, pinned release `2026-09-23.1`, one PMTiles archive read from `tiles.overturemaps.org` by range; the tiles are made at zoom 14 and enlarged. Coarseness the app says: about 0.6 m. | WEB/lib/map/overture.ts:1-16 |
| A press inside a building | The footprint under the press is taken at once as the roof's outline, closed (it replaces any corners placed; Undo brings them back). A building in pieces gives its largest piece; one cut by a tile edge gives the piece under the press. | WEB/components/find/OutlineLayer.tsx:393-406; WEB/lib/map/overture.ts:2-3, :19-26; WEB/lib/outline/outline-state.ts:345-347 |
| The note, found | "Footprint found · {n} corners · {area} m²" / "Taken as the roof's outline, from Overture Maps, accurate to about 0.6 m. Drag its corners to the roof's edge." with **Undo** (takes the footprint back and closes the note) and × "Close" (the footprint stays) | WEB/components/find/DetectedCallout.tsx:50-67; WEB/components/find/Find.tsx:360-371 |
| The note, nothing found | "No footprint known here" / "Outline the roof by corners or by a rectangle instead." with × "Close". Seen on production on a building in Koregaon Park, Pune. | WEB/components/find/DetectedCallout.tsx:52, :57-59; runtime on production |
| How long the note stands | A found note stands while the outline is still the footprint: once a corner moves it goes (its Undo would take back more). A not-found note stands until closed or another tool is taken. | WEB/lib/outline/footprint-note.ts:29-36; WEB/components/find/Find.tsx:234-236 |
| Where the note stands | 32 px below and right of the press; above or left where there is no room; held 8 px inside the map | WEB/lib/outline/footprint-note.ts:8-27 |
| After a footprint | The outline is closed: the tools are the obstacles, Box in hand; its corners drag as any roof's | WEB/components/find/Find.tsx:125-126 |

### Find: Undo, Clear and the keys

| Item | Value | Source |
|---|---|---|
| **Undo** | In the column on every size: beside the count of corners while the outline is open, under the obstacle kinds once it is closed. Disabled with nothing to undo. Takes back one step: a corner, a drag, a typed length, a footprint, a rectangle or its turn, an obstacle added, moved, turned, reshaped or removed, a move or turn of the roof, a Clear. | WEB/components/find/OutlineTools.tsx:70-85; WEB/components/find/ObstacleList.tsx:38-40; WEB/lib/outline/history.ts:9-33 |
| **Clear** | Takes off every corner and every obstacle as one step (Undo brings them back); disabled when there is neither. The outline is open again, Corners in hand. | WEB/lib/outline/find-head.ts:73; WEB/lib/outline/outline-state.ts:310-312 |
| Redo | Keyboard only: ⇧ ⌘ Z / Shift Ctrl Z. No Redo button. | WEB/components/find/use-outline-keys.ts:14; WEB/components/find/OutlineTools.tsx:74-85 |
| Keys (while the map is in hand: not by hand, not while the height card is open, not inside a field or a dialog) | Enter: close the outline, or end a wall or building. Esc: take back the last corner while the outline is open, the last point of a wall or building, or put the picked roof down. Delete or Backspace: remove the selected obstacle, else the selected corner while at least 4 remain. ← ↑ → ↓: nudge the picked roof, else the selected obstacle, else the selected corner, 0.1 m (1 m with Shift). ⌘ Z / Ctrl Z: undo. | WEB/components/find/use-outline-keys.ts:12-35; WEB/components/find/Find.tsx:160; WEB/lib/outline/outline-state.ts:233-238, :267-296; WEB/lib/outline/nudge.ts:15-20; WEB/components/ui/design-numbers.ts:41-45 |
| On touch | No keys: Undo and Clear in the column are the only way back | WEB/components/find/OutlineTools.tsx:70-73; HELP/find/tool/corners.mdx:48 |

### Find: Edges (the closed outline)

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| Row **Edges** (with ? `find.section.edges`), shown once the outline is closed on the map; closed at first, remembered open or closed on the device | — | — | One line of facts: "{n} edges · long side faces {deg}° {compass}" (e.g. "4 edges · long side faces 180° S"); pressed, it opens the fields below | WEB/components/find/Find.tsx:295-297; WEB/lib/outline/find-head.ts:76-80; WEB/components/shell/SummaryRow.tsx:34-62; runtime on production |
| Each edge's length (named North … or Edge 1 …), in metres, two per row | as drawn | 0.1–2000 m, 1 decimal | Makes that edge the length typed: both its ends move along it by the same amount (the edge grows or shrinks about its middle). On a rectangle (every corner within 1° of square) with **Square the corners** on, the opposite edge follows. | WEB/components/find/OutlinePanel.tsx:13, :21-32; WEB/lib/geometry/typed-length.ts:6-43 |
| **Square the corners** · "Snaps to 90° when you are within 3°" | On | switch | Right-angle snapping while placing and dragging corners, the squaring on close, and the opposite edge following a typed length. Off: corners still snap parallel to edges drawn. Not saved. | WEB/components/find/OutlinePanel.tsx:34-40; WEB/lib/outline/outline-state.ts:137, :320-321; WEB/lib/outline/snap.ts:60-71 |
| "Long side faces" (in the row's facts) | — | — | The outward normal of the longest edge, taken toward the equator (north or south by the hemisphere of the frame's centre); east where neither normal is nearer the equator. Compass to 8 points. The rows' own azimuth comes from the minimum rotated rectangle and can differ (HELP/find/section/edges.mdx:29 says so). | WEB/lib/geometry/measure.ts:70-95; WEB/lib/outline/find-head.ts:77-78 |
| Out-of-range or non-number entry | — | — | The field corrects itself and says: "The highest is 2,000.0 m." / "The lowest is 0.1 m." / "Enter a number from 0.1 to 2,000.0 m." | WEB/components/ui/number-entry.ts:45-57, :76-85; bun check of saidOf |
| By hand | — | — | No Edges row: the by-hand fields are the measurements | WEB/components/find/Find.tsx:291-305 |

### Find: moving and turning the roof

| Item | Value | Source |
|---|---|---|
| Pick it up | Once closed, with **Box**, **Tank** or **Tree** in hand, click (press) a clear spot inside the roof (not on an obstacle). With **Wall** or **Building** in hand the same press places a point. | WEB/components/find/OutlineLayer.tsx:408-426; WEB/lib/outline/outline-state.ts:404-406 |
| Picked look | Brighter fill, thicker line and a glow. A round handle ("Turn the roof"; 32 px desktop, 44 px touch) on a 44 px stem square off the middle of the edge whose outside faces nearest north. | WEB/components/find/OutlineLayer.tsx:100-103, :284-320, :651-659; WEB/lib/outline/roof-move.ts:51-78; WEB/components/ui/design-numbers.ts:47-48 |
| Move | Drag from inside (one finger; two fingers move the map). Its obstacles move with it. A dashed outline shows where it stood; a label at its middle "{x} m E · {y} m N" (W/S for negative; 1 decimal). Arrow keys nudge 0.1 m, 1 m with Shift. | WEB/components/find/OutlineLayer.tsx:512-543; WEB/lib/outline/roof-move.ts:26-28, :97-99; WEB/lib/outline/lifted.ts:27-45 |
| Turn | Drag the handle round the roof's middle, obstacles with it. Label beside the handle: "{deg}° · long side faces {deg}° {compass}" (turn to 1 decimal, clockwise positive). Snaps square when the handle's edge comes within 3° of facing N, E, S or W. | WEB/lib/outline/roof-move.ts:30-34, :85-94, :102-107; WEB/components/find/OutlineLayer.tsx:995-1033 |
| Put it down | Click outside it (Box, Tank or Tree in hand), take another tool, or Esc. While picked, no obstacle can be drawn. Each move or turn is one Undo step; a lift that ends where it began is none. | WEB/components/find/OutlineLayer.tsx:423-425; WEB/components/find/Find.tsx:234-239; WEB/lib/outline/outline-state.ts:164, :290-292, :433-439 |
| The line on the map | Once the outline is closed (and nothing is drawn or awaits a height), one line at the top of the map: "Click the roof, then drag it to move it · drag ○ to turn it". It goes for good on the device once the roof is moved or turned. Same words on touch. | WEB/lib/outline/find-head.ts:36; WEB/lib/outline/tips.ts:9-18; WEB/components/find/Find.tsx:162-172, :355-357 |
| Build takes it where it stands | — | HELP/find/tool/move-the-roof.mdx:43; WEB/lib/outline/build-request.ts:12-19 |

### Find: obstacles

| Item | Value | Source |
|---|---|---|
| Where | Once the outline is closed on the map: section **Obstacles · {n}** (? `app.section.obstacles`), line "Choose a kind, then draw it on the map.", toolbar "Obstacle kinds": **Box**, **Tank**, **Wall**, **Tree**, **Building**; Box in hand at first; Undo and Clear under them. None by hand ("Add its obstacles in the Studio."). | WEB/components/find/ObstacleList.tsx:31-49; WEB/components/find/OutlineTools.tsx:21-30; WEB/lib/outline/find-head.ts:31 |
| **Box** | Drag from one corner to the opposite one (a drag of at least 4 px; less is a click that picks). Drawn square to north; turn it after by its handle. | WEB/components/find/OutlineLayer.tsx:469-510, :76; WEB/lib/outline/obstacles.ts:34-36 |
| **Tank** (round) | Drag from its middle to its edge: the diameter is twice the drag | WEB/lib/outline/obstacles.ts:79-84 |
| **Tree** | As a tank: from the middle to the edge of its crown. Its crown starts at 2.0 m above the roof (the engine's default; `Crown starts at` is set only in the Studio). | WEB/components/find/OutlineLayer.tsx:470-472; API/services/roof_map.py:86-90; CORE/geometry.py:46, :66-69; HELP/find/tool/tree.mdx:34 |
| **Wall** | Click each point; end it by clicking the last point again (within 12 px, 20 px touch) or Enter. At least 2 points. Esc takes back the last point. | WEB/lib/outline/outline-state.ts:370-378, :233-235, :290-293; WEB/lib/outline/obstacles.ts:25 |
| **Building** (beside the roof) | Click each corner; close it on the first corner or Enter. At least 3 corners. | WEB/lib/outline/outline-state.ts:370-378; WEB/lib/outline/obstacles.ts:25 |
| Where they may stand | Anywhere on the map once the roof is closed (no check that a box, tank, tree or wall is on the roof) | WEB/lib/outline/outline-state.ts:164, :361-378 |
| The height card | A dialog named "Height of the {kind}" beside the shape (at its right, centred), the field focused: title the kind ("Box", "Tank", …); field **Height above the roof** (m) with the hint "Above the roof's surface, not the ground"; **Cancel** and **Add**. Empty at first: Add waits for a number. Enter adds; Esc or Cancel takes the shape off. Nothing else is drawn while it is open. | WEB/components/find/HeightDialog.tsx:21-86; WEB/lib/outline/obstacles.ts:30-31; WEB/lib/outline/outline-state.ts:164, :380-388; WEB/components/find/OutlineLayer.tsx:410 |
| Height range | 0.05–200 m, 2 decimals. Out of range: "The highest is 200.00 m." / "The lowest is 0.05 m."; not a number: "Enter a number from 0.05 to 200.00 m." | WEB/lib/outline/obstacles.ts:28; WEB/components/ui/number-entry.ts:76-85; bun check |
| Name | "{Kind} {n}", n the number of that kind already listed plus one ("Box 1", "Tank 2"), so a name can repeat after a removal (Product issues); renamed in the Studio | WEB/lib/outline/obstacles.ts:22, :87-89; WEB/lib/outline/outline-state.ts:383 |
| After Add | The obstacle is listed and selected; its label "{name} · {h} m high" (1 decimal) hangs under it on the map | WEB/lib/outline/outline-state.ts:380-385; WEB/lib/outline/obstacles.ts:107-109 |
| The list | One row each: the kind's icon, the name, and "{Kind} · {size} · {h} m high": box "{a} × {b} m", tank or tree "{d} m across", wall "{L} m long", building "{A} m²" (e.g. "Box · 5.0 × 4.0 m · 3.0 m high"). Pressing a row selects it (again: lets go); its bin "Remove {name}" removes it. Heights cannot be changed on Find. | WEB/components/find/ObstacleList.tsx:41-70; WEB/lib/outline/find-head.ts:51-64; WEB/lib/outline/find-head.test.ts:45-54 |
| Labels on the map | Placed clear of the edges' lengths and of each other (under, else above, right, left); obstacles close together of one name and height share one ("Box 2–5 · 1.2 m high"); a label with no room is hidden until selected or zoomed in | WEB/lib/outline/label-places.ts:1-7; WEB/lib/outline/obstacles.ts:126-128; WEB/components/find/OutlineLayer.tsx:883-920 |
| Select on the map | Click it with **Box**, **Tank** or **Tree** in hand (a wall within 4 px of its line); with Wall or Building in hand a click places a point | WEB/components/find/OutlineLayer.tsx:186-196, :408-422 |
| Move | Drag from inside the selected one; arrows nudge it (0.1 m, Shift 1 m). Moves in 0.1 m steps. One that is wholly on the roof stays on it, sliding along the edge it meets; one not on the roof moves freely. Label under it "{name} · {x} m E · {y} m N"; a dashed outline where it stood. | WEB/lib/outline/obstacle-move.ts:10-57, :65-66; WEB/lib/outline/lifted.ts:35-51 |
| Turn | Box and building only, by a round handle ("Turn the obstacle") off their north-facing edge; snaps as the roof's. Label "{name} · {size} · turned {deg}°". Tank, tree and wall only move. | WEB/lib/outline/obstacle-move.ts:59-69; WEB/lib/outline/lifted.ts:18-24; WEB/components/find/OutlineLayer.tsx:657 |
| Reshape | Drag a corner of the selected one ("Corner {n} of the obstacle"): a box stays a rectangle; a tank's or tree's one handle at its east edge sets the diameter; a wall's or building's points move freely | WEB/lib/outline/outline-state.ts:445-455; WEB/components/find/OutlineLayer.tsx:242-247, :944-968 |
| Small on the screen | Corner handles take a press over their 24 px target (44 on touch) only while the obstacle's shortest side is at least two targets; on the dot alone down to 1.5 dots; below that no handles show, so a drag from inside moves it | WEB/lib/outline/handle-reach.ts:18-27; WEB/components/find/OutlineLayer.tsx:85-86, :921-932 |
| Remove | Delete or Backspace while selected, or the row's bin; Undo brings it back | WEB/lib/outline/outline-state.ts:283-284, :401-402 |
| What each counts for (engine) | No module on it or within its clearance; the area its shadow covers in the shade-free hours of the design day kept clear (unless shaded positions are allowed); its shadow counted hour by hour in shading. A building beside the roof takes no room unless its clearance reaches the roof. | HELP/app/section/obstacles.mdx:25-31 (detail in part 3) |
| What Build sends | Each obstacle's name, kind (`box`, `cylinder` for a tank, `wall`, `tree`, `building`), points in WGS84, diameter (tank, tree) and height | WEB/lib/outline/obstacles.ts:140-151; API/schemas/roof_map.py:16-25 |

### Find: the roof type question

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| Section **Roof type** (? `app.section.roof-type`, the sheet marks the choice), a group of three radio rows; shown once the outline is closed, and by hand | **Flat, rows facing south** (north of the equator) / **Flat, rows facing north** (south of it), tagged "Default" | the three below | Sent with Build as the design's roof type; not remembered (a fresh Find starts at the default) | WEB/components/find/RoofTypeChoice.tsx:26-73; WEB/components/find/Find.tsx:128, :294, :303 |
| Flat, rows facing south / north · "Tilted rows, the usual for a flat roof" | default | — | Tilted rows facing the equator | WEB/lib/outline/find-head.ts:41-47; WEB/lib/geometry/roof-types.ts:14-17 |
| Flat, rows facing east and west · "Low rows back to back: more modules, less from each" | — | — | East-west units | WEB/lib/outline/find-head.ts:44 |
| Sloped · "Modules follow the roof pitch" | — | — | Flush on a pitched roof. Build gives it a parapet of 0 m and a roof pitch of 10°; the slope's direction is the engine's default 180° (south) in either hemisphere. | WEB/lib/outline/find-head.ts:45; API/services/roof_map.py:47-54; CORE/geometry.py:106-107 |
| Hemisphere | — | — | From the latitude of the drawing's frame, else the Place's latitude (set by any place found), else the open design's, else where the map opened (India from far, latitude 21.5; not the map's live centre); latitude 0 counts as north | WEB/components/find/Find.tsx:241, :72, :147-150, :177-179; WEB/lib/geometry/roof-types.ts:15 |
| Keys | — | — | Tab stops at the one chosen; the arrows move through them | WEB/components/find/RoofTypeChoice.tsx:30-40, :56 |
| Short names elsewhere (D112) | — | — | The Roof step's buttons say Tilted rows, East-west, Sloped | WEB/lib/geometry/roof-types.ts:7-11; plan/README.md:149 |

### Find: Build this roof

| Item | Value | Source |
|---|---|---|
| The button | Primary, full width, pinned at the column's foot (the sheet's on touch, at every stop). Shown only once the outline is closed on the map, and by hand; not on the first step nor while the outline is open. "Build this roof · {area} m²" (whole m², thousands comma) once closed; by hand "Build this roof", disabled, until the place and the shape are complete. Under it: "Opens the roof in 3D with the array on it." While working: a ring and "Building the roof", disabled. | WEB/components/find/Find.tsx:75, :242-263; WEB/lib/outline/find-head.ts:16, :67 |
| What it sends | `POST /api/roof/from-map`: the corners in WGS84 in drawn order, the obstacles, the roof type, `source` "map" (or "coordinates" by hand), and the place's label as `name` when found by words | WEB/lib/outline/build-request.ts:12-35; WEB/lib/api/client.ts:110; API/routers/roof.py:18-22 |
| What the API does | Projects through the site's UTM zone about the first corner; refuses a self-crossing outline; orients it counter-clockwise; puts the design's place at the outline's centroid and the outline in metres about it; checks the area limit (30,000 m²); converts each obstacle (a box must make a rectangle: within 2 % of its rectangle's area, at most 5 points); everything else at its defaults (flat: parapet 0.9 m, setback 1.0 m, walkway 0.6 m every 24 modules or 4 rows, clearance 0.5 m, albedo 0.20, pitch 0°). Name: the label, else "Untitled roof". | API/services/roof_map.py:19-44, :57-91; CORE/io/roof_import.py:248-260; CORE/geometry.py:29, :95-109, :156-164 |
| Then | The new design opens (replacing the one open), its place name set (D114), and the app goes to `/studio/roof`: the Roof step's first open (part 3) | WEB/components/find/Find.tsx:207-212 |
| A refusal | Said above the button with the note mark, in the API's words (Messages); the outline stays to correct | WEB/components/find/Find.tsx:213-215, :245-250 |
| Not checked before Build | The area limit and self-crossing are checked only by the API on Build | API/services/roof_map.py:23-30 |

### Find: by hand

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| Section **Place** (? `find.section.place`); always shown by hand | — | — | Where the roof stands; the place found by the search, else empty (from Home's by-hand link). Hint: "North and east positive, to 5 decimals. A pair or a maps link pasted fills both." | WEB/components/find/ByHandPanel.tsx:52-61; WEB/lib/outline/by-hand.ts:12; WEB/components/find/Find.tsx:131, :185-191, :225 |
| Latitude (°) | found place, else empty | −90–90, 5 decimals | — | WEB/components/find/ByHandPanel.tsx:21, :57 |
| Longitude (°) | found place, else empty | −180–180, 5 decimals | — | WEB/components/find/ByHandPanel.tsx:22, :58 |
| Paste into either | — | — | Coordinates or a maps link, read as the search reads them, fill both fields; anything else is typed as usual | WEB/components/find/ByHandPanel.tsx:37-43; WEB/lib/outline/by-hand.ts:78-81 |
| Section **Shape** (? `find.section.shape`, the sheet marks the choice): **Rectangle** · **Corners** | Rectangle | — | — | WEB/components/find/ByHandPanel.tsx:63-67; WEB/lib/outline/shapes.ts:6-9; WEB/lib/outline/by-hand.ts:40 |
| Length (m) | empty | 0.1–2000, 2 decimals | The longer of Length and Width is the long side, whichever field it is in | WEB/components/find/ByHandPanel.tsx:24, :70; WEB/lib/outline/by-hand.ts:53-65 |
| Width (m) | empty | 0.1–2000, 2 decimals | — | WEB/components/find/ByHandPanel.tsx:71 |
| **The long side faces**: South · East · North · West | South | 4 choices (180°, 90°, 0°, 270°) | The direction the long side looks. South and North give the same rectangle, as do East and West. | WEB/components/find/ByHandPanel.tsx:72-81; WEB/lib/outline/by-hand.ts:31-46, :53-65 |
| Corner table (Corners): columns Corner · East · North; **Add a corner** adds a row; a bin "Remove corner {n}" each. Hint: "Type each corner in metres east and north of the place, in order. At least 3." | no rows | −5000–5000 m, 2 decimals | The corners about the place typed or found; a row with a blank is left out; fewer than 3 complete rows draw nothing | WEB/components/find/ByHandPanel.tsx:26, :83-103; WEB/lib/outline/by-hand.ts:15, :70-72, :84-95 |
| Roof type | as on the map | — | The same question (above) | WEB/components/find/Find.tsx:303 |
| The stage by hand (with or without a map) | — | — | A plan of the roof, north up, on a 10 m grid, the roof filling 60 % of the stage's shorter side (at most 5 px a metre, at least a 20 m extent), each edge's length "{n} m", a north mark and a scale bar. Empty: "No roof yet" / "Type the roof's length and width, or its corners." | WEB/components/find/PlanView.tsx:19-26, :35-79, :111; WEB/components/find/Find.tsx:342-354 |
| When the roof appears | Once the place and the shape are both complete; each change is a step of the outline | WEB/lib/outline/by-hand.ts:84-95; WEB/lib/outline/outline-state.ts:349-359; WEB/components/find/Find.tsx:177-182 |
| Switching from the map | **Enter the roof by hand** takes the place found (not where the drawing began): the drawn outline and its obstacles go, and the by-hand roof starts empty | WEB/components/find/Find.tsx:185-191, :219-226; WEB/lib/outline/outline-state.ts:349-358 |
| Obstacles | None are added by hand; the Studio's Roof step adds them | WEB/lib/outline/find-head.ts:31 |
| Build | Sent with `source` "coordinates"; the place becomes the outline's centroid, so corners not centred on the typed place move the design's place | WEB/components/find/Find.tsx:203; API/services/roof_map.py:26-28; HELP/find/section/place.mdx:27 |
| Range messages | — | — | e.g. "The lowest is −90.00000°." / "The highest is 2,000.00 m." / "Enter a number from −5,000.00 to 5,000.00 m." | WEB/components/ui/number-entry.ts:76-85; bun check |

### Find: import a drawing

Not on Find: a dialog from Home and the project menu; the drawing becomes a new design that opens in the Studio's Roof
step (the roof type is the default; there is no roof type question).

| Item | Value | Source |
|---|---|---|
| Ways in | Home's **Import a drawing**; the project menu's **Import a drawing** (fact "KMZ, KML, DXF") | WEB/lib/home/home-view.ts:19; WEB/components/shell/ProjectSwitcher.tsx:71 |
| Dialog | Title "Import a drawing"; a drop field "Drop the drawing here" / "KMZ, KML or DXF" with **Choose a file** (the picker takes `.kmz`, `.kml`, `.dxf`); while a file is held over it "Let go to load the file" / "KMZ, KML or DXF"; buttons **Cancel** and **Open the roof** (waits for a file, and for a DXF's place) | WEB/components/shell/ImportDrawing.tsx:118-129; WEB/components/ui/FileDrop.tsx:88-153 |
| What the app reads (listed under the drop) | "Roof: the largest closed shape" · "Obstacles: the other closed shapes, circles as tanks, lines in a KMZ or KML as walls" · "Heights: from a shape's name, as h=2.5" | WEB/components/shell/ImportDrawing.tsx:35-39, :130-134 |
| A file held | Its name and "{KIND} · {n} KB" (e.g. "DXF · 48 KB"), **Choose another**; read only when **Open the roof** is pressed ("Reading the file") | WEB/lib/flow/import-drawing.ts:51-60; WEB/components/ui/FileDrop.tsx:99-135 |
| KMZ, KML | The first `.kml` inside a KMZ (≤ 20 MB). Every Placemark's Polygon (outer boundary) and LineString. The largest polygon is the roof; its centroid is the design's place. Other polygons: a box when a rectangle (within 2 % of the area, at most 5 points), else a building; LineStrings: walls. Names from the placemark's name, else "Obstacle {n}". The app's own exported folder "Modules ({n})" is skipped. | CORE/io/roof_import.py:81-148, :208-245, :248-260 |
| DXF | Modelspace closed LWPOLYLINE and POLYLINE, and CIRCLE (a tank). The largest closed polyline is the roof. Names from the layer. ASCII or binary DXF. Open lines, arcs and blocks are not read. | CORE/io/roof_import.py:151-205 |
| Heights | `h=2.5` or `h:2.5` (any case, spaces allowed round the sign) in the name, or in a KMZ placemark's description; removed from the name. Without one: 1.0 m, and the obstacles listed to review in the Roof step, whose note says "The file has no height for these obstacles. The app uses 1.0 m." (the Roof step's own words; the API's copy of the note comes back with the answer and the dialog does not show it). | CORE/io/roof_import.py:29, :45-47, :225-229; API/services/roof_files.py:11, :33-35; WEB/lib/flow/import-drawing.ts:42-47; WEB/components/shell/ImportDrawing.tsx:108; WEB/lib/studio/review-heights.ts:7 |
| **DXF units**: m · mm | "m" suggested once a DXF is held; disabled otherwise. Hint "For a DXF" / "If the drawing is in millimetres, choose mm". mm scales by 0.001. | WEB/components/shell/ImportDrawing.tsx:20-26, :135-141; CORE/io/roof_import.py:187 |
| The DXF's place ("Where is the roof?") | For a DXF only: **Place** with "Where is the roof?" (after a search: "From the search"), a search field (placeholder "Search an address or paste coordinates", Use my location beside it while empty) and **Latitude** (° N) and **Longitude** (° E), 5 decimals. **Open the roof** waits for both. The place given becomes the roof's centroid. | WEB/components/shell/ImportDrawing.tsx:41-46, :73-76, :142-156; CORE/io/roof_import.py:208-218 |
| Design | Named after the file without its ending; source "kmz" or "dxf"; everything else at its defaults (roof type flat, tilted rows) | API/services/roof_files.py:38-54 |
| Limits | The app refuses a drawing whose request passes 6,291,456 bytes (about 4.7 MB of file) before sending; the API takes base64 up to 28,000,000 characters and a name up to 255 characters; KML inside a KMZ ≤ 20 MB; roof ≤ 30,000 m² | WEB/lib/flow/import-drawing.ts:25-39; WEB/lib/flow/open-project.ts:19; API/schemas/roof_import.py:11, :17-18; CORE/io/roof_import.py:30, :89-91; API/services/roof_files.py:32 |
| A refusal | In the drop field: "File not loaded" with the reason (Messages) and **Choose another** | WEB/components/ui/FileDrop.tsx:137-145; WEB/components/shell/ImportDrawing.tsx:102-115 |
| After | The design opens at `/studio/roof` with the missing heights to review | WEB/components/shell/ImportDrawing.tsx:108-110; WEB/lib/flow/import-drawing.ts:42-47 |

### Find: messages

| Message (verbatim) | When | Source |
|---|---|---|
| **The map is not available** / "Enter the roof by hand instead." | No imagery key | WEB/lib/map/map-state.ts:16-19 |
| **This browser cannot draw the map** / "Try another browser, or enter the roof by hand." | No WebGL | WEB/lib/map/map-state.ts:20-23 |
| **The imagery does not load** / "Check your connection and try again, or enter the roof by hand." | Tiles fail before any has shown | WEB/lib/map/map-state.ts:24-27 |
| "Address search is not available. Paste coordinates or a maps link." | The geocoder answers with an error or in a shape the app does not read; or words searched without a key (on Home or in the DXF place: without a key Find has no map, so opens by hand with no search) | WEB/lib/errors/problem-of.ts:93; WEB/lib/places/esri.ts:19-20, :35-40; WEB/components/shell/Search.tsx:103-105 |
| "The address search cannot be reached. Check your connection, then try again." | The geocoder cannot be reached | WEB/lib/places/esri.ts:75 |
| "The address search did not answer. Try again in a moment." | The geocoder answers with an HTTP error | WEB/lib/places/esri.ts:77 |
| "The search failed. Try again." | Any other fault of the search | WEB/components/shell/Search.tsx:112 |
| "Nothing found for “{words}”. Try a fuller address, or paste coordinates." | No place found | WEB/components/shell/Search.tsx:335-336 |
| "Your location is not available. Allow it in the browser, or search for the address." | Geolocation refused, failed or timed out (15 s) | WEB/components/shell/Search.tsx:54, :187-192 |
| "These look like coordinates, but they cannot be read. Write them as 12°54′50.74″N 77°29′31.16″E, or 12.91409, 77.49199." (also "… but the latitude cannot be read …" / "… but the longitude cannot be read …") | Coordinates that do not parse | WEB/lib/places/place-input.ts:43-45, :219-238 |
| "Only the latitude is here. Add the longitude after it: 12°54′50.74″N 77°29′31.16″E." / "Only the longitude is here. Add the latitude before it: 12°54′50.74″N 77°29′31.16″E." | One angle | WEB/lib/places/place-input.ts:224-229 |
| "Both are marked {N / S / E / W / N or S / E or W}. The latitude takes N or S, the longitude E or W." | Two angles of one axis | WEB/lib/places/place-input.ts:243-246 |
| "−{n} is marked {N / E}, and a minus means {south / west}. Keep the minus or the letter, not both." ({n} to 5 decimals) | A minus with N or E | WEB/lib/places/place-input.ts:202-207 |
| "Minutes and seconds go up to 59. The {latitude / longitude} has {n}′ / {n}″: check where it was copied from." | Minutes or seconds ≥ 60 | WEB/lib/places/place-input.ts:208-211 |
| "The latitude comes first, and {n} is more than 90°. Did you mean this?" with the **Swapped** row | Latitude over 90 that fits as a longitude, no letters | WEB/lib/places/place-input.ts:254-258 |
| "A latitude goes up to 90°, and this one is {n}°. Check where it was copied from." / "A longitude goes up to 180°, and this one is {n}°. Check where it was copied from." | Out of range | WEB/lib/places/place-input.ts:259-261 |
| "Footprint found · {n} corners · {area} m²" / "Taken as the roof's outline, from Overture Maps, accurate to about 0.6 m. Drag its corners to the roof's edge." · Undo | Detect found a footprint | WEB/components/find/DetectedCallout.tsx:52, :58, :63-65 |
| "No footprint known here" / "Outline the roof by corners or by a rectangle instead." | Detect found none | WEB/components/find/DetectedCallout.tsx:52, :59 |
| "Click the roof, then drag it to move it · drag ○ to turn it" | The line on the map, first closed outline | WEB/lib/outline/find-head.ts:36 |
| "The outline crosses itself. Move the corners so that no two edges cross." | Build, self-crossing outline | API/services/roof_map.py:16, :23-24 |
| "This outline covers {area} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." ({area} rounded up, thousands comma) | Build or import over 30,000 m² | CORE/errors.py:36-51; CORE/geometry.py:29, :156-164 |
| "The corners of a box must make a rectangle." | Build, a box not a rectangle | API/services/roof_map.py:76-81 |
| "A {kind} on the map needs at least {n} points; this one has {m}." / "A {kind} needs its diameter." | Build, an obstacle short of points or diameter (not reachable from Find's tools) | API/services/roof_map.py:60-72 |
| "{field}: {reason}" (+ ". {n} more value is refused" / "values are refused") | Build or import refused by the API's validation (e.g. a name over 200 characters) | API/errors.py:103-113, :140-142 |
| "The roof could not be built. Try again." | Build fails with no answer of the API's | WEB/components/find/Find.tsx:214 |
| "The server could not be reached. Check your connection, then try again." | The API cannot be reached (Build, import) | WEB/lib/api/errors.ts:4, :26-28 |
| "The server did not answer. Try again in a moment." | The API answers in a form the app does not read | WEB/lib/api/errors.ts:30-33 |
| "{name} is not a KMZ, KML or DXF file. Choose a file with one of these endings." | Import, wrong ending | API/services/roof_files.py:17-23 |
| "A DXF drawing does not say where the roof is. Give its latitude and longitude." | Import, DXF without a place (the dialog prevents it) | API/services/roof_files.py:61-68 |
| "{file} has no KML file inside." / "{file}: the KML inside is larger than 20 MB. Export the roof and its obstacles alone." | Import, KMZ faults | CORE/io/roof_import.py:87-91 |
| "{file} is not a KML file that can be read: {parser's words}" / "{file} has no polygon to use as the roof." | Import, KML faults | CORE/io/roof_import.py:116-119, :141-143 |
| "{file} is not a DXF file that can be read: {parser's words}" / "{file} has no closed polyline to use as the roof." | Import, DXF faults | CORE/io/roof_import.py:175-176, :201-203 |
| "The content of {name} is not valid base64." | Import, bad upload | API/services/uploads.py:12-19 |
| "The app can send a drawing of about 4.7 MB at most. Save this one with only the roof and its obstacles, then choose it again." | Import, drawing too large to send | WEB/lib/flow/import-drawing.ts:26 |
| "The file could not be read. Choose another." | Import fails with no answer of the API's | WEB/components/shell/ImportDrawing.tsx:114 |
| "The file has no height for these obstacles. The app uses 1.0 m." | Import, obstacles without heights (shown in the Roof step, from its own copy of the words) | WEB/lib/studio/review-heights.ts:7; API/services/roof_files.py:11 |
| Field corrections: "The highest is {max}.", "The lowest is {min}.", "Enter a number from {min} to {max}." (with the unit, minus as U+2212) | Any number field on Find | WEB/components/ui/number-entry.ts:76-85 |

### Find: what leaves the device

| Item | Value | Source |
|---|---|---|
| The search's words, with the map's centre | To Esri's geocoder (`geocode-api.arcgis.com`) with the app's key, from the browser | WEB/lib/places/esri.ts:11-12, :50-59 |
| Imagery tiles | From `ibasemaps-api.arcgis.com` with the app's key | WEB/lib/places/esri.ts:9-10, :66 |
| Footprints (Detect building in hand) | Ranges of one archive at `tiles.overturemaps.org` | WEB/lib/map/overture.ts:8-9; runtime on production (requests seen) |
| The device's position | Not sent as such: the map flies there, so Esri's imagery tiles around it are asked for, and the roof's corners reach the app's API on Build. From Home it is carried in Find's address (`/find?at={lat},{lon}`). | WEB/components/shell/Search.tsx:180-195; WEB/components/find/Find.tsx:219-222; WEB/lib/routes.ts:97-102 |
| On Build | The outline, obstacles, roof type, source and name to the app's API (`/api/roof/from-map`) | WEB/lib/outline/build-request.ts:25-35 |
| A drawing imported | The file as base64 (and a DXF's units and place) to `/api/roof/import` | WEB/lib/flow/import-drawing.ts:29-31; WEB/lib/api/client.ts:108 |

### Find: help topics and the docs headings the app links to

| Item | Value | Source |
|---|---|---|
| ? discs on Find | The head's (by the step, above); **Obstacles** (`app.section.obstacles`), **Roof type** (`app.section.roof-type`), **Edges** (`find.section.edges`), **Place** (`find.section.place`), **Shape** (`find.section.shape`) | WEB/components/find/Find.tsx:271, :295; WEB/components/find/ObstacleList.tsx:35; WEB/components/find/RoofTypeChoice.tsx:44; WEB/components/find/ByHandPanel.tsx:53, :64 |
| A topic's foot | "Related", its related topics, then "{section}, in the docs" opening the docs in a new tab | WEB/lib/help/related.ts:10-16 |
| Docs page and headings the app links for Find | Page `find` ("Find the roof"), headings "Find the building", "Outline the roof", "Move or turn the roof", "What stands on the roof", "The roof type", "Build this roof", "By hand", "Import a drawing", "When something goes wrong"; anchors are the heading lower-cased, punctuation dropped, spaces as hyphens. Roof type and Obstacles link to page `roof` headings "Roof type" and "Obstacles". A heading renamed in the docs must be renamed in `docs.ts`. | WEB/lib/docs/docs.ts:1-3, :17-26, :37-51; the help topics' `docs:` front matter |

#### Known-stale (this area)
- HELP/find/section/place.mdx:27 says "After `Enter the roof by hand` from a roof drawn on the map, the place is where the first corner was placed, and the obstacles drawn there stay while the place does", and HELP/find/section/place.mdx:14 that `Place` holds "where the roof drawn on the map stood". The code takes the place found by the search (WEB/components/find/Find.tsx:219-226 fills the Place fields on every place found; WEB/components/find/Find.tsx:185-191 then prefers them; the outline can only be drawn after a place is found, :120, :224), which is never where the first corner was pressed (the frame's centre, WEB/components/find/OutlineLayer.tsx:428-431), so the drawn outline and its obstacles go (WEB/lib/outline/outline-state.ts:349-358). Confirmed by reading and by the review's bun check (an outline closed 32 m east of the place: by hand it is gone, 0 corners). The help is wrong for every flow.
- Code comment: WEB/components/find/Find.tsx:103 still names the closed head "Add what stands on the roof"; the screen says **Add the obstacles** (WEB/lib/outline/find-head.ts:27).
- plan/README.md:135 (D98) names the closed-outline head "Add what stands on the roof"; the code says **Add the obstacles** (WEB/lib/outline/find-head.ts:27). D98's no-map words "The map is not available. Enter the roof's measurements instead." differ from the code's reason "Enter the roof by hand instead." (WEB/lib/map/map-state.ts:17-18).
- plan/README.md:136 (D99) says Find's work column can be hidden (Hide panel, ⌘ \); Find has neither (only WEB/components/studio/Studio.tsx:150-151 and WEB/components/studio/use-panel.ts).
- docs/design/information-architecture.md:68-69 says a detected footprint is "accepted"; the code takes it at once on the press and offers Undo (WEB/components/find/DetectedCallout.tsx:28-32).
- plan/v2/voice.md:93 rewrites the corner hint as "… east and north of the roof's centre"; the screen says "… of the place, in order. At least 3." (WEB/lib/outline/by-hand.ts:15), which is the truth (corners are about the place, not their centre).
- Incomplete rather than wrong: the import dialog's line "Heights: from a shape's name, as h=2.5" (WEB/components/shell/ImportDrawing.tsx:38) leaves out that a KMZ/KML placemark's description is read too, and that a DXF shape's "name" is its layer (CORE/io/roof_import.py:191, :225).
- Find's browser tests and help-picture tools still describe the old Find (plan/STATE.md:128; issue #238 item 23): e.g. e2e/tests/find-screens.e2e.ts:77 ("Add the tank"), :96 ("Enter dimensions by hand instead"), :103 ("Long side faces" as a typed 180), e2e/tests/find.e2e.ts:46 ("back, the search, the steps").
- Comment only: WEB/components/find/OutlineLayer.tsx:416 says a press "with the box or the tank in hand" picks; the tree picks too (kindOfTool, :408-426). WEB/components/shell/ImportDrawing.tsx:60 says "from the project switcher"; Home opens it too.
- The old fact sheet's Find part (docs repo, PRODUCT_FACTS.rooftop.md §2) is stale throughout: Back button, Steps pill, "Step N of 3", Find my roof, Start here cards, The search understands, Three steps, Redo button, Show the tips, tip cards, Use this outline, Height dialog with Name and "Add the {kind}", no tree on Find, `/find?edit=roof`, the roof type names "Flat, tilted rows" / "Sloped, flush".

#### Facts we do not have (this area)
- Esri geocoder coverage, language and ranking by country; the code sends only the words and the map's centre (WEB/lib/places/esri.ts:50-59).
- Imagery date and resolution by region; Overture footprint coverage by region (on production a press on a building in Koregaon Park, Pune found none).
- What the user sees when the Overture archive fails to load: there is no state of its own, so it reads as "No footprint known here" (WEB/components/find/OutlineLayer.tsx:394-398). Below map zoom 14 the footprint tiles are not drawn (source `minzoom` 14, :364), so a press there would also read as none: by reading, not tried.
- How the engine's shading treats a tree whose crown starts above its top (a Find tree under 2.0 m tall, see Product issues).
- Whether Build saves the new design to the device at once (the saving flow is part 1's).
- Runtime oddity not counted as an issue: twice during the production checks the browser pane went to Home after a drag or typing; not reproduced when controls were pressed by reference, and most likely the pane resetting its viewport under the pointer.

#### Product issues noticed (this area)
- **Undo after going by hand and back moves the outline.** Draw and close an outline, press **Enter the roof by hand**, then **Draw on the map instead** and **Undo**: the outline comes back displaced by the distance between the found place and the first corner, because the frame changed and is not part of the history. Verified twice with `bun` over `outlineAfter` (the writer's, and the review's: a first corner 32 m east of the place came back 32.0 m west of where it was drawn). WEB/lib/outline/outline-state.ts:298-302, :349-358; WEB/components/find/Find.tsx:185-191.
- **The Roof step on Find is a live link that leaves Find.** On desktop, tablet and phone, pressing **Roof** goes to `/studio/roof`, drops the outline without asking, and shows the design open in the page, else the remembered design, else the demo. WEB/components/shell/StepNav.tsx:53-62, :97-105; WEB/lib/flow/steps.ts:33-37, :59; WEB/components/shell/use-opens-what-belongs.ts:14-25 (by reading).
- **No search after a place is chosen.** Once a place is found, Find's column never shows the search again (Clear does not bring it back); a wrong place is left only by going Home, or by typing coordinates by hand. WEB/components/find/Find.tsx:120, :224, :284 (by reading).
- **"The imagery does not load … try again" cannot be tried again.** Once the tiles fail, the map is unmounted and the state never clears; only a reload brings the map back. WEB/components/find/Find.tsx:118, :152, :342-351 (by reading).
- **Use my location shows nothing while it waits.** On Find (the row under the search) and on Home (the link under the well) no ring, words or disabled state shows during the up to 15 s the browser takes: `isLocating` is drawn only in the round button beside a form's search, which only the import's DXF place shows. WEB/components/shell/Search.tsx:182, :216, :272-284; WEB/lib/places/beside-the-field.ts:11; WEB/components/find/FirstStep.tsx:21-33; WEB/components/home/Home.tsx:62 (by reading).
- **The map line says "Click" on touch, and on phone overflows.** The line is one constant with no touch wording, drawn `whitespace-nowrap`. WEB/lib/outline/find-head.ts:36; WEB/components/find/Find.tsx:356 (by reading). The writer saw it at 375 × 812 on production run past both edges and cover the rectangle's turn handle; not re-checked in review (no browser).
- **An obstacle's name can repeat.** A new obstacle is numbered by the count of its kind plus one, so after removing Box 1 of Box 1 and Box 2 the next box is a second "Box 2" (review's `bun` check over `outlineAfter`: names `["Box 2", "Box 2"]`). The shared map labels then run on one number. WEB/lib/outline/obstacles.ts:87-89; WEB/lib/outline/outline-state.ts:383.
- **A Find tree under 2.0 m gets a crown above its top.** Find has no `Crown starts at`; the engine's default 2.0 m stands, so a 1.5 m tree's crown is a prism from 2.0 m down to 1.5 m. CORE/geometry.py:46, :66-69; API/services/roof_map.py:86-90; API/schemas/roof.py:30; heights from 0.05 m are accepted (WEB/lib/outline/obstacles.ts:28). By reading; the shading effect is not checked.
- **By hand, the design keeps the searched place's full name after another place is typed.** The place name is dropped (WEB/lib/outline/place-name.ts:22-25) but the API name still gets the searched label (WEB/lib/outline/build-request.ts:33 with WEB/components/find/Find.tsx:203). By reading.
- **Small roofs at roof zoom are hard to draw on.** The edges' length labels and handles stand over the roof's inside and take the press, so a drag that starts on one draws nothing. Seen once by the writer on production (tablet size, a 29 × 18 m rectangle, a box drag that did not start), not re-checked in review; the cause is by reading (markers are not the canvas: WEB/components/find/OutlineLayer.tsx:115-118, :487).
- **An imported obstacle marked `h=0` gets 1.0 m.** `_height(name) or _height(desc)` treats 0 as missing; the review list then names it with its `h=0` left in while the obstacle itself is named without it. Review's Python check over `read_kmz` (a KML with "Stair h=0"): obstacle `('Stair', 'box', 1.0)`, missing heights `['Stair h=0']`. CORE/io/roof_import.py:224-229.
- **The DXF place fields say "° N" and "° E" but take negatives.** Their range is −90 to 90 and −180 to 180, so a southern or western place is typed as a negative beside the unit "° N" or "° E". WEB/components/shell/ImportDrawing.tsx:44-45, :152-153 (by reading).
- **A sloped roof built south of the equator faces south (away from the equator) by default.** The slope's direction is 180° whatever the hemisphere, while the tilted rows' default faces the equator; the Roof step's change of type does the same (WEB/lib/geometry/roof-type-rule.ts:8-11). API/services/roof_map.py:53-54; CORE/geometry.py:107 (by reading; the Roof step can change it).
- Minor: the Examples list shows the maps link without `https://` (`google.com/maps/@18.53621,73.89380`); pressed it fills the full link, but typed as shown it is searched as words. WEB/lib/outline/first-step.ts:14; WEB/lib/places/place-input.ts:30 (review's `bun` check).
- Known and accepted by the help: Edges' "long side faces" (the longest edge's normal) can differ from the rows' azimuth (the minimum rotated rectangle's), issue #238 item 15; HELP/find/section/edges.mdx:29.
- Dropped in review: "Swapped decimal pairs under 90 are taken as typed" is not a product issue: both readings are valid coordinates, the app cannot know, and the fact is kept as the row "Swapped pairs both under 90" (WEB/lib/places/place-input.ts:252-262).

<!-- help-map -->
<!--
Help topics of this part (HELP = apps/web/content/help). Each topic's title and summary as its front matter has them,
and the ### of this part that covers it. The docs page and section each topic links to is in "### Help topics of this
area and their docs links".

| Topic id | Title | Summary | Covered by |
|---|---|---|---|
| studio.section.outline (alias studio.section.location) | Outline | "Where the roof is, its size and its corners. Edit the corners in Plan." | ### Roof step: outline; ### Studio: selecting, dragging and editing on the roof |
| app.section.roof-type | Roof type | "Choose how the modules sit: rows facing south, rows facing east and west, or flush on a slope." | ### Roof step: roof type; ### How the layout is placed |
| studio.section.edges-and-access | Edges and access | "Set the parapet height and the strips kept free of modules at the edges and round obstacles." | ### Roof step: edges and access |
| app.section.obstacles | Obstacles | "Add what stands on the roof with its height, so modules keep clear of it and its shade counts." | ### Roof step: obstacles; ### Studio: selecting, dragging and editing on the roof |
| studio.section.module | Module | "Choose the module. Its size sets the layout; its ratings set the strings and the energy." | ### Array step: module; ### Array step: the library picker and your own module file (PAN) |
| studio.section.mounting | Mounting | "Set the modules' tilt, their orientation, and how many stand in each row's height." | ### Array step: mounting |
| studio.section.spacing | Spacing | "How far apart the rows stand so they do not shade each other in the shade-free hours." | ### Array step: spacing, shade-free hours and design day; ### How the layout is placed |
| studio.section.shade-free-hours (alias studio.section.shade-free-window) | Shade-free hours | "Set the hours of the design day in which rows and obstacles must not shade the modules." | ### Array step: spacing, shade-free hours and design day; ### How the layout is placed |
| studio.section.design-day (alias studio.section.day) | Design day | "The day the rows are spaced for. The winter solstice has the longest shadows." | ### Array step: spacing, shade-free hours and design day (the control lives on the Array step, in Spacing) |
-->

## 3. The Studio, and its Roof and Array steps

Verified against `rooftop-design-app` `main` at `c6aeb66` (last code change `e1faa19`, #246) on 2026-10-13, by reading
the code; the engine was run headless with the repo's Python on the Pune demo (script `/tmp/rooftop-v2/scripts/p3_layout.py`,
`-I`, no bytecode written); the demo's Roof and Array columns were read once on production
(`https://rooftop.solarlayout.app/studio/roof` and `/studio/array`, 1024 × 768, read-only, no clicks in the column) and
agreed with the code. Where a value below says "demo", it comes from those two checks.

### Studio: the steps, the frame and the sizes

| Item | Value | Source |
|---|---|---|
| Steps in the Studio | **Roof**, **Array**, **Strings**, at `/studio/roof`, `/studio/array`, `/studio/strings`. Sun is not a step: it is a view of the stage on each of them | WEB/lib/routes.ts:13-18,50 |
| The order of work | Five steps, **Roof**, **Array**, **Strings**, **Performance**, **Handover**; Find (`/find`) is the first part of Roof | WEB/lib/flow/steps.ts:5-11,40-46 |
| `/studio` | Goes to `/studio/roof` | WEB/app/(workspaces)/studio/page.tsx:5-6; WEB/lib/routes.ts:39 |
| `/studio/sun` (the old Sun lens's address) | Turns the Sun view on and goes to the step that was in hand | WEB/app/(workspaces)/studio/[lens]/page.tsx:18-19; WEB/components/studio/SunOfBefore.tsx:12-15 |
| Any other `/studio/<x>` | Not found | WEB/app/(workspaces)/studio/[lens]/page.tsx:20 |
| Browser tab title | `{Step} · SolarLayout Rooftop` ("Roof · SolarLayout Rooftop") | WEB/app/(workspaces)/studio/[lens]/page.tsx:13 |
| The step that opens | The Studio comes back to the step opened last (the view store remembers it for the session) | WEB/components/studio/Studio.tsx:114-115; WEB/lib/stores/view-store.ts:52-53 |
| A workspace with no design open | Opens the design remembered on this device, else the demo | WEB/lib/device/opening.ts:25-34 |
| Sizes | Phone under 640 px wide; tablet 640 to 1100; desktop 1101 and over | WEB/components/shell/use-screen-size.ts:9-10 |
| The step's state in the top bar (tablet and desktop) | Each step a link with a mark: a tick when **done** (gone past, nothing waits), the note mark when it **needs you** (a note leads to it), else its number (**to do**). On Find before Build, the steps after Roof cannot be pressed (screen reader: "after the roof is built"). The step in hand is shown pressed | WEB/lib/flow/steps.ts:15-20,56-64; WEB/components/shell/StepNav.tsx:19-30,36-69 |
| Which notes make a step "needs you" | The step each note's action leads to; Strings also when the design has no option. Module notes and layout notes lead to Array | WEB/lib/flow/steps.ts:70-77; WEB/components/shell/notes-view.ts:70,168-169 |
| Step tooltip (desktop, tablet) | The step's line: Roof "The roof's outline, its edges and what stands on it.", Array "The modules on the roof, how they are mounted and spaced.", Strings "How the modules are wired to the inverter." | WEB/components/shell/StepNav.tsx:58; WEB/lib/words/explain.ts:5-8,23 |
| Phone | The five steps are the tab bar at the foot, each an icon and its name, a tick or note mark on the icon when done or needs you | WEB/components/shell/StepNav.tsx:73-108 |
| The step's word under the stage title | On desktop, the first time the device meets the word: "The roof's outline, its edges and what stands on it." (Roof) or "The modules on the roof, how they are mounted and spaced." (Array); "Shadows at any hour, and the shade on each module over the year." while the Sun view is on. Then never again on this device | WEB/components/studio/Stage.tsx:43-44,145; WEB/components/shell/FirstMeeting.tsx:26-35; WEB/lib/words/explain.ts:6-11 |
| Undo and redo | ⌘ Z or Ctrl Z undoes the last committed edit; Shift with it, or Ctrl Y, redoes. Not while typing in a field or in an open dialog. 50 edits are kept | WEB/components/shell/use-history-keys.ts:7-19,24-33; WEB/lib/stores/project-store.ts:43 |
| Undo on screen | None in the Studio: undo is by the keys alone. The only Undo buttons in the app are Find's (under the corners and the obstacle kinds, and in the detected-footprint callout) and the toast of a stringing choice an edit took away (grep of `Undo` in WEB/components and WEB/lib, 2026-10-13) | WEB/components/shell/use-history-keys.ts:22-36; WEB/components/find/OutlineTools.tsx:74-78; WEB/components/find/DetectedCallout.tsx:63-64; WEB/components/shell/use-says-choice-gone.ts:26-30 |
| What a change re-runs | A change of the array, the module, or any roof value but the albedo lays the roof out again and runs the design; the albedo runs the design alone; the name runs nothing | WEB/lib/flow/edit-parts.ts:5-41 |
| What is in the design (and its project file) | The roof (outline, type, edges, obstacles), the array, the module file's text and name | API/schemas/roof.py:42-59; API/schemas/array.py:14-30; CORE/project.py:40-42 |
| What is not in the design | The view: camera, ground, Sun view, selection, panel hidden, time | WEB/lib/stores/view-store.ts:1-2,51-92 |
| What the device remembers (localStorage) | The steps opened per design, the app's words met, the panel hidden, the sections opened or closed | WEB/lib/device/progression.ts:1-11,42-79 |

### Studio: the work column (head, status, sections, fields, primary)

| Item | Value | Source |
|---|---|---|
| Three weights | The step's head (instruction, line, first-open status); the sections, each a summary row that opens; the fields inside an open row | WEB/components/studio/Studio.tsx:100-112; WEB/components/studio/StepHead.tsx:20-25 |
| Roof step head | **Check the roof** / "Built from {your outline \| your file \| your corners}. The app set the edges: check the parapet, it shades the first row." (outlined on the map: "your outline"; KMZ or DXF: "your file"; by hand: "your corners") | WEB/components/studio/step-heads.ts:8,12-13 |
| Array step head | **Choose the module** / "The module, how it is mounted, how rows are spaced." | WEB/components/studio/step-heads.ts:14-15 |
| Strings step head | **Check the strings** / "How the modules are wired to the inverter." | WEB/components/studio/step-heads.ts:16-17 |
| First-open status, when | On the Roof step, while no other step of this design was opened on this device | WEB/components/studio/first-open.ts:27-28; WEB/components/studio/Studio.tsx:97 |
| First-open status, line 1 | Tick, **The array is on the roof**, then "{n} modules · {kWp} kWp" once the run has an option, or "{n} positions" before | WEB/components/studio/first-open.ts:11,14-20 |
| First-open status, line 2 while running | Ring, **Computing the energy** / "Shading the modules over the year. A few seconds." | WEB/components/studio/first-open.ts:9,22-24 |
| First-open status, line 2 when done | Tick, **{MWh} MWh in year 1** / "The energy follows each change you make." | WEB/components/studio/first-open.ts:10,24 |
| First-open status when the run failed or found no option | Line 1 alone; the problem is said where problems are. Before any layout (no positions, no modules) the status is empty | WEB/components/studio/first-open.ts:19,21; WEB/components/studio/first-open.test.ts:50-52 |
| Units of the status | Energy always in MWh to 1 decimal; DC in kWp to 2 decimals; counts whole with thousands commas | WEB/lib/format/vitals.ts:15-16,26 |
| Demo | "The array is on the roof · 638 modules · 357.28 kWp", "617.8 MWh in year 1 · The energy follows each change you make." Read on production 2026-10-13. The figures are the engine's for the demo with its bundled weather and are held by the API's tests (638 modules, 357.28 kWp, 617.8 MWh); the web unit test types the same figures in as its fixture | apps/api/tests/api/test_design.py:123-124,131,162-165; WEB/components/studio/first-open.test.ts:44-47 |
| A problem of the result in the head | When an energy run failed after an earlier result, the head shows the problem under the line with **Try again** (e.g. "Energy not updated", "The server could not be reached after your last change. The result shown is from before the change.", "Check your connection, then try again.") | WEB/components/studio/Studio.tsx:109; WEB/components/shell/result-view.ts:26; WEB/lib/errors/problem-of.ts:32-61 |
| Summary row | The section's name with its ? disc, its facts on one line under it, who set it at the right, a chevron; the whole row opens and closes it. 56 px high on desktop, 64 on touch | WEB/components/shell/SummaryRow.tsx:29-62 |
| Who set it (the word at the right and in field hints) | **Default**, **From the weather**, **Set for {country}**, **Yours**; a field the user set reads "Yours · default {value}" with **Reset**, which gives the default back as one edit | WEB/lib/studio/set-by.ts:16-31; WEB/components/studio/SetByHint.tsx:11-26 |
| A section's word | "Yours" when any of its fields is the user's; else the first source not the app's own; else "Default" | WEB/lib/studio/set-by.ts:43-48 |
| Open at first | A section never touched opens as its step says: on the Array step **Module** opens the first time; no Roof section does. Then each is as the user left it on this device | WEB/components/studio/ArrayInspector.tsx:62; WEB/components/studio/RoofInspector.tsx:153-194; WEB/lib/device/progression.ts:71-79; WEB/components/shell/use-section-open.ts:29-40 |
| Held open | **Obstacles** is open while an obstacle is selected or heights wait for review | WEB/components/studio/RoofInspector.tsx:188 |
| Number fields | A typed value is a draft; Enter or leaving the field commits it, Escape gives it up, ↑ and ↓ step it. Out of range it is set to the end and the field says "The highest is {max} {unit}." or "The lowest is {min} {unit}."; not a number: "Enter a number from {min} to {max} {unit}." | WEB/components/ui/use-number-entry.ts:22-26,37-61; WEB/components/ui/number-entry.ts:45-57,74-85 |
| Sliders | A drag or a key changes what is shown; the value commits when the drag ends or the key is released | WEB/components/ui/Slider.tsx:27-29 |
| Stepper | Minus and plus (named "Fewer" and "More"), each disabled at its end of the range; a press commits at once | WEB/components/ui/Stepper.tsx:31-42 |
| The primary, at the column's foot | **Continue to Array** on Roof, **Continue to Strings** on Array (an arrow icon), named for the next step | WEB/components/studio/Studio.tsx:43-72; WEB/lib/flow/steps.ts:48-51 |
| "Next:" line | "Next: Array, the modules on the roof, how they are mounted and spaced." (Roof) and "Next: Strings, how the modules are wired to the inverter." (Array), until that step has been opened once for this design; not on phone | WEB/components/studio/Studio.tsx:65,164; WEB/lib/words/explain.ts:26-29 |
| Where the primary stands | Desktop: pinned at the column's foot, full width, the line above it. Tablet: a foot bar, the line at the left, the button at the right. Phone: the sheet's foot, the button alone | WEB/components/studio/Studio.tsx:52,63-71,156-158,164 |
| Desktop column | At the right, 384 px, its sections scroll, the primary stays at the foot; labelled "{Step} work column" | WEB/app/globals.css:138; WEB/components/studio/Studio.tsx:142-159 |
| **Hide panel** (desktop) | A quiet icon button at the column's top right, tooltip "Hide panel" with "⌘ \"; ⌘ \ or Ctrl \ toggles it from anywhere except a field, a slider, a menu, a list or a combobox | WEB/components/studio/Studio.tsx:149-153; WEB/lib/studio/panel-key.ts:5-7; WEB/components/studio/use-panel.ts:12,34-43 |
| Panel hidden | The stage takes the whole width; the primary floats at the stage's foot, right, in a 384-px card; **Show panel** stands in the view controls | WEB/components/studio/Studio.tsx:87,126-139; WEB/components/studio/ViewControls.tsx:71-78 |
| Panel hidden is remembered | On this device. It is shown again on a design's first open (no other step opened yet), when the step in hand needs you, and when something on the roof is selected | WEB/components/studio/use-panel.ts:16-32; WEB/components/studio/Studio.tsx:116; WEB/lib/stores/view-store.ts:161-162; WEB/lib/device/progression.ts:65-69 |
| The column in the Sun view | Desktop: the step's sections stay; the Sun view's card is on the stage. Tablet and phone: the column holds the Sun view's content in place of the step's head and sections; the primary stays | WEB/components/studio/Studio.tsx:99-112; WEB/components/studio/Stage.tsx:156-157 |

### Studio: the stage and its view controls

| Item | Value | Source |
|---|---|---|
| Title over the stage | The step's name, "{Step} · Sun" in the Sun view; shown on desktop, for screen readers only on tablet and phone | WEB/components/studio/Studio.tsx:129; WEB/components/studio/Stage.tsx:143-145 |
| Line under the title, Roof (desktop) | "{area} m² · {area} m² inside the edge margin · {n} obstacles" ("no obstacles", "1 obstacle"). Demo: "3,600 m² · 3,344 m² inside the edge margin · 6 obstacles" | WEB/components/studio/stage-view.ts:14-22; WEB/components/studio/Stage.tsx:146-151; production read |
| Line under the title, Array (desktop) | "{n} positions · {n} tables · {n} rows · {area} m² of modules". Demo: "790 positions · 28 tables · 6 rows · 2,038 m² of modules" (read on production; held by the API's tests: 790, 28, 6 and 790 × 2.277 × 1.133 m²; and by the e2e test `e2e/tests/stage.e2e.ts:41`). The area is of all positions, not of the modules the chosen option uses | WEB/components/studio/stage-view.ts:23-25; apps/api/tests/api/test_layout.py:20,28; WEB/components/studio/stage-view.test.ts:33-35 |
| While a new layout is on its way | The line is dimmed with a ring; the modules of before stay | WEB/components/studio/stage-view.ts:71-75; WEB/components/studio/Stage.tsx:147-150 |
| Line in the Sun view | "{day} · {winter solstice …} · shade-free from {hh:mm} to {hh:mm}" | WEB/components/studio/Stage.tsx:97-101; WEB/lib/flow/sun-time.ts:163-166 |
| View controls | Top right of the stage: **3D** / **Plan** (a segmented control named "View"; "3D view", "Plan view"), **Fit** (named "Fit the roof"), the north control, **Sun**, **Imagery**, and **Show panel** while the column is hidden (desktop) | WEB/components/studio/ViewControls.tsx:20-23,45-79 |
| Phone | 3D, Plan, Sun, Imagery; Fit and north are tablet and desktop only. Sun stands alone on a line at the top right, the others under it | WEB/components/studio/ViewControls.tsx:25-26,47,63-69 |
| **3D** | Perspective, from the south-west, above the roof; 45° field of view | WEB/lib/scene/camera.ts:51-53; WEB/components/scene/CameraRig.tsx:123 |
| **Plan** | Straight down, north up; pans and zooms, does not turn | WEB/lib/scene/camera.ts:43; WEB/components/scene/CameraRig.tsx:28-29,120-131 |
| **Fit** | Frames the roof again (the Sun path's dome in the Sun view with the path on), as the 3D view from the south-west: pressed in Plan it leaves Plan, and the View control then shows **3D** | WEB/components/studio/ViewControls.tsx:40,48-50; WEB/lib/scene/camera.ts:23-30,42-53 |
| North control | Its needle turns with the view; pressed, the view turns north-up (keeping distance and height). Name: "North: the view looks north", "… south", "… {n}° east of north", "… {n}° west of north" | WEB/components/studio/ViewControls.tsx:51-61; WEB/lib/scene/projection.ts:38-44; WEB/components/scene/CameraRig.tsx:109-116 |
| **Sun** | Toggles the Sun view on the step in hand (pressed state); leaving it puts the time back to the design day's noon and the Sun view's tab back to the shadows | WEB/components/studio/ViewControls.tsx:63-69; WEB/lib/stores/view-store.ts:158-159 |
| Time outside the Sun view | Still: the design day at 12:00 solar time; the stage's light is that hour's. No time control is shown outside the Sun view. Demo: "21 Dec, 12:00 solar time, sun 48.0° high, due south" | WEB/lib/stores/view-store.ts:125-126; WEB/components/studio/Stage.tsx:158-159; production read |
| Touch | In 3D one finger orbits, two pan and pinch; in Plan one finger pans | WEB/components/scene/CameraRig.tsx:24-26,131 |
| Mouse | Not set by the app: the defaults of drei 10.7.7's OrbitControls, which is three-stdlib 2.36.1's. Left-drag orbits; Shift, Ctrl or ⌘ with left-drag pans; right-drag pans; the wheel zooms. In Plan, where turning is off, a plain left-drag does nothing (pan with right-drag or Shift-drag). Read in the library's code, not run | WEB/components/scene/CameraRig.tsx:125-137; `node_modules/.bun/three-stdlib@2.36.1+f8f6383268478940/node_modules/three-stdlib/controls/OrbitControls.js:73-78,664-695` |
| Limits | The orbit never goes below the roof plane; distance from max(2 m, 0.2 × roof radius) to 12 × roof radius; Plan zoom from 1/12 to 5 × the zoom that fits; damped movement | WEB/components/scene/CameraRig.tsx:128-136; WEB/lib/scene/camera.ts:61-74 |
| Edits and the camera | An edit never moves the camera; only a preset does | WEB/components/scene/CameraRig.tsx:70-91 |
| The Strings step and the camera | Opening Strings from 3D turns to Plan; leaving Strings turns back to 3D if Strings did it | WEB/lib/stores/view-store.ts:147-157 |
| Edge lengths | A label "{n.n} m" at the middle of each roof edge; of two parallel edges with the same length one is labelled (the one further south and west). Drawn on the Roof step alone, and in the Sun view only in Plan | WEB/lib/scene/projection.ts:46-58; WEB/lib/scene/what-is-drawn.ts:9-12 |
| Kept-clear areas | Drawn on every step outside the Sun view | WEB/lib/scene/what-is-drawn.ts:11-12 |
| Without 3D | A flat plan, north up, stands in; it says "This browser cannot draw the roof in 3D." or "The browser stopped drawing the roof in 3D."; no view controls then | WEB/components/studio/stage-words.ts:4-5; WEB/components/studio/Stage.tsx:116,125-127,155 |
| Text for screen readers ("On the roof") | "Roof, {n} corners, {area} m², parapet {h} m"; each obstacle "{name}, {kind and size}, {h} m high"; "{n} modules in {n} rows"; the ground; the sun; each kept-clear area "Kept clear · {n} positions: {cause} shades this area between {hh:mm} and {hh:mm}" | WEB/components/studio/Stage.tsx:166-256; WEB/lib/geometry/obstacles.ts:68-81 |

### Studio: the ground

| Item | Value | Source |
|---|---|---|
| **Imagery** | One toggle in the view controls (pressed state). Pressed: the satellite imagery is the ground; again: the plain grid. Of the view, not of the design | WEB/components/studio/ViewControls.tsx:28-29,83-97 |
| At first | The plain grid, on every load; the choice is not remembered and not in the project file | WEB/lib/stores/view-store.ts:39-43,91,128 |
| No imagery possible | Without the app's map key there is no imagery, whatever the toggle says | WEB/lib/stores/view-store.ts:230-234; WEB/components/scene/Scene.tsx:43-44,75-76 |
| Plain ground | Colour `#12161D`, grid lines `#1B222D` every 10 m; at least 60 m across and 6 × the roof's radius | WEB/components/scene/Ground.tsx:30-34; WEB/lib/geometry/scene-palette.ts:8-9 |
| Imagery | The map's tiles within 150 m of the roof's centroid, stitched into one picture; until they come, and for a tile that fails, the plain ground | WEB/lib/scene/ground.ts:11; WEB/components/scene/Ground.tsx:60-66,74-93 |
| Attribution | While the imagery is drawn, bottom left of the stage: "Powered by Esri · Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community" | WEB/components/studio/Stage.tsx:114-115,130-134; WEB/lib/places/esri.ts:15 |
| A press on the ground | Clears the selection | WEB/components/scene/Ground.tsx:26-27; WEB/lib/scene/pick.ts:18-23 |

### Studio: selecting, dragging and editing on the roof

| Item | Value | Source |
|---|---|---|
| What a press selects | The roof, an obstacle, a kept-clear area or a module (on Strings, a string); a press is a pointer that moved 4 px or less, so an orbit that ends on a thing selects nothing | WEB/lib/scene/pick.ts:14-28; WEB/components/scene/Scene.tsx:153-159 |
| Selecting shows the column | A selection shows the hidden work column again (desktop) | WEB/lib/stores/view-store.ts:161-162 |
| Escape | Clears the selection and drops a draft obstacle; not from inside a field or an open dialog | WEB/components/studio/use-escape-clears.ts:8-25 |
| Callout of the roof | **Roof · selected** / "{a} × {b} m · {area} m²" for a rectangle, "{n} corners · {area} m²" otherwise | WEB/lib/scene/pick.ts:54-60 |
| Callout of a module | **Position {n}** / "Row {r} · {tilt}° to the {direction}" ("Unit {r}" on east-west roofs; eight directions) | WEB/lib/scene/pick.ts:30-45 |
| Callout of a kept-clear area | **Kept clear · {n} positions** ("Shaded · {n} positions" with shaded positions allowed) / "{The parapet \| obstacle's name} shades this area between {hh:mm} and {hh:mm}" (the shade-free hours) | WEB/lib/geometry/keepout.ts:29-36 |
| Callout of an obstacle | **{name} · selected** / "{size} · {h} m high. Drag to move it." (box, tank, tree; a tree "{crown …} · {start} to {h} m high.") or "… Move it by its points in the list." (wall, building). Draft: **{name} · draft** / "{size} · no height yet". To review: "{size} · height to review" | WEB/lib/geometry/obstacles.ts:86-116 |
| Moving an obstacle | Select it, then drag it: box, tank and tree; walls and buildings move by their points in the list. Moves snap to 0.1 m and stay inside the roof's bounding box. A live label says "East {x} m · North {y} m". The drop is one edit | WEB/lib/geometry/obstacles.ts:99-100; WEB/lib/stores/drag.ts:1-3,12,33-51,71-72; WEB/components/scene/Obstacles.tsx:158-169; WEB/components/scene/Scene.tsx:182-186 |
| Handles of a selected box | A handle at each top corner resizes it with the opposite corner held ("{l} × {w} m"); a turn handle on a stem off its north edge turns it, snapping to a right angle within 3° ("Rotation {n}°"); a height handle on a stem up from its middle ("{h} m high"). Snap 0.1 m; at least 0.1 m a side, 0.05 m high | WEB/lib/scene/handles.ts:15-17,28-59,61-73,88-110; WEB/components/ui/design-numbers.ts:30; WEB/lib/stores/drag.ts:73-75 |
| Handle of a tank or tree | One at the east of its edge sets the diameter ("{d} m across", "crown {d} m across") | WEB/lib/scene/handles.ts:75-78,97; WEB/lib/stores/drag.ts:76 |
| Editing the outline | In Plan, on the Roof step, outside the Sun view, with the roof selected (by **Edit it in Plan**, or by pressing the roof in Plan), each corner is a handle. Drag one: a live label gives the two edges it joins, "{a} m · {b} m". Let go: the corner snaps to 0.1 m and the outline is one edit | WEB/components/scene/Scene.tsx:83,122-123; WEB/components/studio/OutlineHandles.tsx:26-31,53-57,84-90; WEB/lib/geometry/outline-edit.ts:31-39 |
| Outline refused | An outline that would cross itself, or close to under 1 m², is refused with a note toast: "The outline cannot cross itself. The roof stays as it was." | WEB/lib/geometry/outline-edit.ts:8,37-38; WEB/components/studio/OutlineHandles.tsx:21-22,88 |
| A press with a draft standing | A press on the roof places the draft there | WEB/components/scene/Scene.tsx:49-50,153-156; WEB/lib/geometry/obstacle-fields.ts:164-173 |

### Studio: phone and tablet

| Item | Value | Source |
|---|---|---|
| Tablet stage | Full width, 440 px high; under it a result row 56 px: the result chip at the left, "{n} modules · {kWp} kWp" at the right once the run has an option | WEB/components/studio/Studio.tsx:129-134; WEB/components/shell/result-view.ts:50-54 |
| Tablet column | Under the stage in two halves: the step's head at the left, its sections at the right; the primary in a foot bar | WEB/components/studio/Studio.tsx:106-111,156 |
| Phone sheet | The work column is a bottom sheet ("Work column") with a grip; the step's head and sections in it, the primary pinned at its foot at every stop; it opens at half | WEB/components/studio/Studio.tsx:88,161-166; WEB/components/ui/Sheet.tsx:35-82 |
| Phone stops | Peek: 156 px (the grip, the step's instruction, the primary). Half: the stage keeps 40 % of the screen's height. Full: a 120-px strip of the roof stays above the sheet. The stage takes what the sheet leaves | WEB/components/ui/design-numbers.ts:72; WEB/components/ui/sheet-stops.ts:37-53; WEB/components/shell/use-phone-sheet.ts:7-28 |
| Grip | Drag it; a press goes one stop further; keys ↑ ↓ Home End Enter Space; read as "Closed", "Half open", "Open" | WEB/components/ui/sheet-stops.ts:87-133 |
| Phone stage before the sheet is measured | 40 % of the viewport height | WEB/app/globals.css:150; WEB/components/studio/Studio.tsx:129 |
| Fields on phone | One per row, the label before the field (obstacle cards); two per row with the label inside on tablet and desktop | WEB/components/studio/inspector-look.tsx:12-16; WEB/components/studio/ObstaclePanel.tsx:159-172 |

### Roof step: outline

Section **Outline**, last on the Roof step, ? = `studio.section.outline`, no who-set-it word (WEB/components/studio/RoofInspector.tsx:192-194).

| Item | Value | Source |
|---|---|---|
| Facts (closed) | "{lat}° N, {lon}° E · {area} m² · Edit it in Plan" (2 decimals; the area once a layout gave it). Demo: "18.52° N, 73.86° E · 3,600 m² · Edit it in Plan" | WEB/lib/studio/roof-fields.ts:114-122; production read |
| Card line 1 | Latitude and longitude to 5 decimals with N, S, E, W | WEB/lib/geometry/roof-card.ts:49; WEB/lib/format/place.ts:17-20 |
| Card line 2 | How the outline was made: "Outlined on satellite", "By hand", "From a file" | WEB/lib/geometry/roof-card.ts:20-25 |
| Card line 3 | "{n} corners · {n} obstacles" (no obstacle part with none) | WEB/lib/geometry/roof-card.ts:46-51 |
| Card line 4 | A rectangle (4 corners, right angles within 1°) "{long} × {short} m", any other outline "{area} m²"; then " · long side faces {deg}° {compass}": the outward side of the longest edge nearer the equator (east where neither is) | WEB/lib/geometry/roof-card.ts:31-44; WEB/lib/geometry/typed-length.ts:7,10-21; WEB/lib/geometry/measure.ts:74-95 |
| Card line 5 | The drawing's file name, for a roof read from a KMZ or DXF | WEB/lib/geometry/roof-card.ts:53 |
| **Edit it in Plan** | Turns the stage to Plan and selects the roof: its corners become handles (see "Editing the outline"). Find is for a new roof alone. With the Sun view on (desktop, where the step's sections stay) the corners are not handles: the roof's callout "Roof · selected" stands instead (see issues) | WEB/components/studio/RoofInspector.tsx:73-87,128-132; WEB/components/scene/Scene.tsx:83,123-124 |
| Largest roof | 30,000 m². A larger outline is refused: "This outline covers {area} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." | CORE/geometry.py:28-29,156-164; CORE/errors.py:43-50; API/convert.py:43 |
| Another roof | **New design** in the project menu opens Find | WEB/components/shell/ProjectSwitcher.tsx:69 |

### Roof step: roof type

Section **Roof type**, first on the Roof step (after the heights note, if any), ? = `app.section.roof-type` with the type's own line, word **Yours** always (Find asked for it) (WEB/components/studio/RoofInspector.tsx:152-155).

| Item | Value | Source |
|---|---|---|
| Buttons | Segmented, full width: **Tilted rows**, **East-west**, **Sloped** | WEB/lib/geometry/roof-types.ts:7-11; WEB/components/studio/RoofInspector.tsx:154 |
| Facts (the long name) | "Flat, rows facing south" ("… north" south of the equator); "Flat, rows facing east and west · back to back, low tilt"; "Sloped · modules follow the roof pitch". Demo: "Flat, rows facing south" | WEB/lib/studio/roof-fields.ts:88-92; WEB/lib/geometry/roof-types.ts:13-17; production read |
| Default of the API | `flat_tilted` | API/schemas/roof.py:48 |
| Help's line per type | flat_tilted "Rows of tilted modules on a flat roof, facing its edge nearest the equator, spaced to keep clear of each other's shade."; flat_ew "Low rows back to back on a flat roof, one face turned east and one west. More modules, less energy from each."; sloped_flush "Modules laid on a pitched roof, at its pitch and facing the way it slopes, with no gap for shade." | HELP/app/section/roof-type.mdx:5-8 |
| Choosing **Sloped** | Sets the parapet to 0, and the roof pitch to 10° if it was 0 | WEB/lib/geometry/roof-type-rule.ts:5-12 |
| Choosing another type | Changes the type alone | WEB/lib/geometry/roof-type-rule.ts:9-10 |
| A sloped roof built on Find | Parapet 0, pitch 10° | API/services/roof_map.py:47-54 |
| Tilted rows: what it lays out | Rows of tables at the array's **Tilt**, facing the array azimuth; row spacing shade-free unless typed; walkway after N modules along a row | CORE/placement.py:169-190 |
| East-west: what it lays out | Units of two sides back to back at the **East-west tilt**, one side facing azimuth + 90°, the other − 90°, one module a side (width up the slope); a gap between units only where the shade-free hours need it; walkway after N units | CORE/placement.py:236-292 |
| Sloped: what it lays out | Modules flush at the **Roof pitch**, facing **Direction (azimuth)** of the Roof step (an array azimuth is not used); rows one after another with the module gap alone; lower edge 0.1 m above the roof | CORE/placement.py:133-137,155,170,191-193; API/schemas/array.py:26 |
| Defaults that follow the type | Heat loss factor Uc 29 (tilted), 20 (east-west), 15 (sloped); cell rise for string sizing 25, 25, 35 °C; no bifacial rear gain on sloped | CORE/simulation.py:31,107; CORE/stringing.py:26 |

### Roof step: edges and access

Section **Edges and access**, ? = `studio.section.edges-and-access` (WEB/components/studio/RoofInspector.tsx:156-181).

Facts (closed): "Parapet {h} m · edge margin {s} m", or "No parapet · edge margin {s} m". Demo: "Parapet 0.90 m · edge margin 1.00 m", word "Default" (WEB/lib/studio/roof-fields.ts:96-100; production read).
Groups, with their heading in secondary text, 8 apart inside and 24 between: **At the edges**, **Access**, **Around obstacles**, and on a sloped roof **Sloped roof** (WEB/lib/studio/roof-fields.ts:63-74; WEB/components/studio/RoofInspector.tsx:157-174).
The hint under each field is who set it, with the usual thing after "Default"; the user's value: "Yours · default {value} {unit} · Reset" (WEB/lib/studio/roof-fields.ts:25-33,52-58).

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Parapet height** (At the edges) | 0.90 m (0 on a sloped roof). Hint "Default · measure it on site" | 0–5 m, 2 decimals | Walls 0.2 m thick along the inside of each edge (their centre line 0.1 m in); they cast shadows like obstacles, kept clear in the shade-free hours, and count in the energy's shade. 0: no parapet | WEB/lib/studio/roof-fields.ts:27,36; WEB/lib/studio/defaults.ts:9,36-39; CORE/geometry.py:27,123-135; API/schemas/roof.py:49 |
| **Edge margin (setback)** (At the edges) | 1.00 m. Hint "Default · usually 0.5 to 1.5 m" | 0–10 m, 2 decimals | The roof is shrunk inward by it, sharp corners kept; if that splits the roof, the largest piece is used | WEB/lib/studio/roof-fields.ts:28,37; CORE/geometry.py:120-121,167-170; API/schemas/roof.py:50 |
| **Walkway width** (Access) | 0.60 m. Hint "Default · room to clean and repair the modules" | 0–3 m, 2 decimals | The path's width | WEB/lib/studio/roof-fields.ts:29,38; API/schemas/roof.py:51 |
| **Walkway every** (Access), Tilted rows | 24 modules. Hint "Default · counted in modules along a row" | 0–500 modules, whole | After N modules along each row, an aisle the walkway's width across the rows. 0: none | WEB/lib/studio/roof-fields.ts:30,39,49; CORE/placement.py:190,196-204; API/schemas/roof.py:52 |
| **Walkway every** (Access), East-west and Sloped | 4 rows. Hint "Default · counted in rows" | 0–500 rows, whole | After N rows (sloped) or N units (east-west), the walkway's width is added. 0: none | WEB/lib/studio/roof-fields.ts:31,40,49; CORE/placement.py:193,205-212,253-259; API/schemas/roof.py:53 |
| **Clearance** (Around obstacles) | 0.50 m. Hint "Default · kept free all round" | 0–5 m, 2 decimals | Each obstacle's footprint is grown by it (round at the corners: the default buffer); no module may stand in it | WEB/lib/studio/roof-fields.ts:32,41; CORE/placement.py:148-149,157; API/schemas/roof.py:54 |
| **Roof pitch** (Sloped roof) | 10° (the rule for a roof made sloped; the API's own default is 0). Hint "Default" | 0–60°, whole | The modules' tilt on a sloped roof | WEB/lib/studio/roof-fields.ts:43,51; WEB/lib/studio/defaults.ts:16,38; CORE/placement.py:170; API/schemas/roof.py:55 |
| **Direction (azimuth)** (Sloped roof) | 180°. Hint "Default" | 0–359.9°, 1 decimal | The way the slope faces, clockwise from north; the modules face it | WEB/lib/studio/roof-fields.ts:44,51; CORE/placement.py:137; API/schemas/roof.py:56 |

| Item | Value | Source |
|---|---|---|
| Roof albedo | Not a field here: a line under the fields, "Roof albedo {0.20} · in Performance, Assumptions" with an arrow, which opens Performance. Default 0.20 (range there 0.05–0.9) | WEB/components/studio/RoofInspector.tsx:175-179; WEB/lib/studio/roof-fields.ts:42,76-77; API/schemas/roof.py:57 |
| A change | Lays the roof out again, then runs the design; Undo takes it back | WEB/lib/flow/edit-parts.ts:31-41 |

### Roof step: obstacles

Section **Obstacles · {n}**, ? = `app.section.obstacles`, word **Yours** when there is one (WEB/components/studio/RoofInspector.tsx:182-191).

| Item | Value | Source |
|---|---|---|
| Facts (closed) | The names in their order, those of one stem counted once: "Stair room, water tank, 4 AC units" (demo); none: "None on the roof" | WEB/lib/studio/roof-fields.ts:102-112; production read |
| Empty list | "None on the roof yet." | WEB/components/studio/ObstaclePanel.tsx:313 |
| A row | The kind's icon; the name; under it "{Kind} · {size} · {h} m high" (box "{l} × {w} m", tank "{d} m across", tree "crown {d} m across", wall "{len} m long", building "{area} m²"). Those of one kind, size and height and a shared stem count in one row ("AC units" / "4 boxes · 1.5 × 1.0 m · 1.2 m high") until one is selected. A press selects | WEB/lib/studio/obstacle-lines.ts:16-70; WEB/components/studio/ObstaclePanel.tsx:181-193 |
| Add | Under "Add one: choose its kind, then place it on the roof.", a group "Add an obstacle" of buttons **Box**, **Tank**, **Wall**, **Tree**, **Building** | WEB/components/studio/ObstaclePanel.tsx:208-225; WEB/lib/geometry/obstacle-fields.ts:43-50 |
| A new one (draft) | Stands at the roof's centroid: box 2 × 2 m, tank ⌀ 2 m, tree crown ⌀ 4 m with the crown at 2 m, wall 6 m east-west, 0.2 m thick, building 10 × 10 m from 3 to 13 m east of the centre. Named "{Kind} {n}". No height | WEB/components/studio/ObstaclePanel.tsx:245-248; WEB/lib/geometry/obstacle-fields.ts:122-157 |
| Draft card | Opens with the focus in **Height above the roof**; foot **Cancel** and **Add the {box \| tank \| wall \| tree \| building}**. Add, or Enter in the card, adds it with the typed height and selects it; Add does nothing while there is no height; leaving the field only fills it. A press on the roof moves it there | WEB/components/studio/ObstaclePanel.tsx:250-260,288-311; WEB/lib/geometry/obstacle-fields.ts:15-19 |
| Selected obstacle's card | Its name, editable (Enter or leaving commits, Escape gives up); its kind's word; a bin "Remove {name}"; its fields | WEB/components/studio/ObstaclePanel.tsx:58-87,134-179 |
| Fields by kind | Box: **Length**, **Width**, **Height above the roof**, **Rotation**, **East**, **North**. Tank: **Diameter**, Height above the roof, East, North. Tree: **Crown diameter**, Height above the roof, **Crown starts at**, East, North. Wall: Height above the roof, **Thickness**, its points. Building: Height above the roof, its points | WEB/lib/geometry/obstacle-fields.ts:35-41,112-120 |
| Ranges | Length, Width 0.1–500 m; Height above the roof 0.05–200 m; Rotation −180 to 180°, whole (counter-clockwise); East, North −5,000 to 5,000 m; Diameter 0.1–100 m; Crown starts at 0–100 m; Thickness 0.05–5 m (2 decimals for metres) | WEB/lib/geometry/obstacle-fields.ts:21-33; CORE/geometry.py:42 |
| Points (wall, building) | A table **Point**, **East**, **North**; **Add a point**; a bin per point, disabled at 2 points (wall) or 3 (building); "Type each point in metres east and north of the roof's centre, in order. At least {2 \| 3}." | WEB/components/studio/ObstaclePanel.tsx:91-119; WEB/lib/geometry/obstacle-fields.ts:54-88 |
| Height | Above the roof surface, never the ground | API/schemas/roof.py:18; HELP/app/section/obstacles.mdx:18 |
| Tree | Footprint and keep-clear are the whole crown (at least 0.3 m across); shade from a 0.3-m trunk up to **Crown starts at**, then the crown up to the height | CORE/geometry.py:56-57,66-69 |
| Building beside the roof | Takes room only where it (with its clearance) overlaps the roof; its shade counts | CORE/placement.py:147-157 |
| Heights to review (after an import) | A note at the top of the column: "The file has no height for these obstacles. The app uses 1.0 m.", "{n} to review", **Review** (selects the first). The row has a note mark "Height to review"; the card says "Not in the file. Enter the real height." with **Next**. A typed height takes it off the list | WEB/components/studio/RoofInspector.tsx:89-108,134-137,151; WEB/lib/studio/review-heights.ts:6-12; WEB/components/studio/ObstaclePanel.tsx:195-206,267-272,329-339 |
| Parapet row | At the end, while the parapet is over 0: "Parapet, all edges", "{h} m high" | WEB/components/studio/ObstaclePanel.tsx:349-355 |
| A change | Lays the roof out again, then runs the design | WEB/lib/flow/edit-parts.ts:31-41 |

### Array step: module

Section **Module**, open the first time, ? = `studio.section.module` (WEB/components/studio/ArrayInspector.tsx:62-70).

| Item | Value | Source |
|---|---|---|
| Facts (closed) | "{model} · {Wp} Wp". Demo: "INA-144MHC-TF-560 · 560 Wp" | WEB/lib/studio/module-card.ts:26-27; production read |
| Word | "Default" while the design carries no module file of its own, "Yours" once it does | WEB/lib/studio/set-by.ts:50-51; WEB/components/studio/ArrayInspector.tsx:62 |
| Card | The model (bold); "{maker} · {Wp} Wp · {length} × {width} m" (2 decimals; the maker as people know it, e.g. "Insolation", "Canadian Solar"); **Change** | WEB/lib/studio/module-card.ts:13-16; WEB/components/studio/ModuleCard.tsx:84-98; WEB/lib/equipment/makers.ts:6-29 |
| Demo card | "INA-144MHC-TF-560", "Insolation · 560 Wp · 2.28 × 1.13 m" (read on production; the sample file gives 2.277 × 1.133 m, shown to 2 decimals) | WEB/lib/studio/module-card.ts:16; WEB/lib/equipment/makers.ts:14; CORE/resources.py:9 |
| **Change** | Opens "Choose a module"; tooltip "Choose from {278} modules, or use a module file (PAN)" ("Choose a module, or use a module file (PAN)" while the library loads) | WEB/components/studio/ChangeButton.tsx:10-18; WEB/lib/equipment/card-words.ts:5-14 |
| **Details** | Opens: "Open-circuit voltage (Voc)" {V, 2 dec}, "Short-circuit current (Isc)" {A, 2 dec}, "Bifacial, rear gain" {factor} for a bifacial module, "Voc coefficient" {%/°C, 3 dec} | WEB/components/studio/ModuleCard.tsx:33-55,105; WEB/lib/studio/module-card.ts:17-22 |
| Notes under the card | Each of the engine's notes on the module, with a note mark, minus signs true: the Voc note and the no-size note (see messages) | WEB/components/studio/ModuleCard.tsx:99-104; API/services/equipment.py:26-29 |
| Before any module is known | A skeleton with "Loading the module" | WEB/components/studio/ModuleCard.tsx:63-81 |
| A new design's module | The bundled `insolation-ina-144mhc-tf-560.PAN`: INSOLATION GREEN ENERGY PVT. LTD. INA-144MHC-TF-560, 560 Wp, 2.277 × 1.133 m, bifaciality 0.80, Voc 49.95 V, Isc 14.3 A; not in the library | CORE/resources.py:9; CORE/project.py:131-139; engine run; catalog grep (0 hits) |
| The demo | Carries the same sample's text as its own file, so its Module reads "Yours" | API/services/demo.py:11-16; production read |
| What the module sets | Its size with the orientation sets each position's footprint; its Voc, coefficients and highest voltage the string length; its currents the strings per MPPT; its power the kWp and the energy | CORE/placement.py:105-109,172; HELP/studio/section/module.mdx:28-33 |
| A new module | Lays the roof out again and runs the design; the card shows the file read until the run with it lands | WEB/lib/flow/edit-parts.ts:6; WEB/components/studio/ArrayInspector.tsx:49-53; WEB/lib/studio/array-view.ts:67-77 |
| Saved | The file's text and name in the design (`pan_text`, `pan_path`) | WEB/components/studio/ArrayInspector.tsx:51; CORE/project.py:40-42 |

### Array step: the library picker and your own module file (PAN)

| Item | Value | Source |
|---|---|---|
| Dialog | Title **Choose a module**; wide | WEB/components/studio/ModulePicker.tsx:35; WEB/components/studio/EquipmentPicker.tsx:216 |
| Library | 278 modules, 300–730 Wp, from 6 makers (Canadian Solar, ET Solar, Heliene, Silfab, Trina Solar, Waaree). Waaree publishes no PAN files: its 159 are fitted to the one-diode model from its 22 datasheets, each file's source naming its datasheet (D115, #248) | WEB/public/equipment/catalog.json:2-281 (count run 2026-10-13 at 6d6d41f); WEB/lib/equipment/makers.ts:6-22; plan/README.md:152; docs/equipment-library.md:43-67 |
| Line over the list | "{278} modules from {6} makers, or your own module file (PAN)"; searched or filtered: "{shown} of {total} modules", then " · Clear the filters" | WEB/lib/equipment/picker.ts:160-168; WEB/components/studio/EquipmentPicker.tsx:285-300 |
| Search | First, with the list. Placeholder "Maker, model or power"; named "Search the maker, the model or the power"; each word typed must be found in the maker (its file's or everyday name), the model, the file's name or "{Wp} Wp"; a clear button "Clear the search" | WEB/components/studio/PickerSearch.tsx:14-33; WEB/lib/equipment/picker.ts:15-21,34-37 |
| **Filter** | A button beside the search; it shows the **Power** range slider (Wp, steps of 5, from the library's lowest to its highest rounded out to 50; ticks 300, 400, 500, 650 except on phone). It reads "Filter · on" while the slider narrows the list. Each opening of the picker starts with the filters put away and at rest | WEB/components/studio/EquipmentPicker.tsx:116-117,219-225; WEB/lib/equipment/picker.ts:27-32,154-158; WEB/components/studio/ModulePicker.tsx:70-84 |
| Columns | **Module** (model; maker under it, with the data source where one model comes in two files), **Wp**, **Efficiency %** (1 dec), **Size m** ("{l} × {w}", 2 dec), **Bifacial** (desktop only; "–" monofacial). Heads sort except Size; first press: figures high to low, names A to Z | WEB/components/studio/ModulePicker.tsx:37-44; WEB/lib/equipment/rows.ts:29-44; WEB/lib/equipment/picker.ts:77-82,97-107 |
| Order | Opens by power, low to high. On phone the heads are hidden and a select **Order** stands in, its options in this order: "Model, A to Z", "Model, Z to A", "Power, low to high", "Power, high to low", "Efficiency, high to low", "Efficiency, low to high", "Bifaciality, high to low", "Bifaciality, low to high"; each row's figures on one line "{Wp} Wp · {eff} % · {l × w} m" | WEB/lib/equipment/picker.ts:91-92,120-133; WEB/components/studio/EquipmentPicker.tsx:297,357; WEB/lib/equipment/rows.ts:41 |
| Choosing | Click a row (a tick) and **Use this module**, or double-click, or Enter in the list (↑ ↓ Home End move). The design's own library module is tagged "In this design" and the list opens on it; Use is waiting for it | WEB/components/studio/EquipmentPicker.tsx:125-140,171-205,207-211,327-372 |
| While reading | The primary reads "Reading" | WEB/components/studio/EquipmentPicker.tsx:210 |
| Your own file, tablet and desktop | A strip under the list: "Or drop your own module file (PAN) here", **Choose a file**; over it "Let go to load the file"; reading "Reading the file {name}" | WEB/components/studio/EquipmentPicker.tsx:407-463 |
| Your own file, phone | A dialog action **Choose your own module file (PAN)** | WEB/components/studio/EquipmentPicker.tsx:207-209 |
| File types | The chooser offers `.pan`, `.PAN` | WEB/components/studio/ModulePicker.tsx:35 |
| Size limit | Over 256,000 bytes is refused before it is sent: "{name} is over 256 KB, larger than any module or inverter file. Choose another." (the API takes 256,000 characters of text, or the same file as base64) | WEB/lib/equipment/library-file.ts:25-31; API/schemas/limits.py:8-10; API/schemas/equipment.py:17-19 |
| Encodings | UTF-8, then Latin-1, then cp1252 | CORE/io/pvsyst.py:17,20-27 |
| What is read | Manufacturer, Model, PNom, Width and Height (values of 100 or more are millimetres; the longer side is the length), Technol, NCelS, NCelP, NDiode, half-cell layout, Isc, Voc, Imp, Vmp, muISC, muVocSpec or muVoc (V/°C turned to mV/°C), muPmpp, the one-diode parameters, VMaxIEC or VMaxUL (1000 V when absent), BifacialityFactor, LID loss, the IAM profile | CORE/io/pvsyst.py:175-216 |
| Refused | Without PNom, Voc or Isc: "{file} is not a module file (PAN): PNom, Voc or Isc is missing." | CORE/io/pvsyst.py:217-218 |
| Refused, shown | A note in the picker: **Module not changed** / the reason (a full stop added if it has none). The module of before stays | WEB/components/studio/EquipmentPicker.tsx:271-279,87-91 |
| A file without a size | Read, with the note "{file} gives no size of the module (Width and Height). The layout needs it: choose a PAN file that has it."; the layout then refuses it in the same words | API/services/equipment.py:15-29; API/services/layouts.py:38-46 |
| Nothing found | "No module in the library matches “{search}”." or "No module in the library fits these filters.", "Or choose your own module file (PAN) below.", **Clear the search** or **Clear the filters** | WEB/components/studio/EquipmentPicker.tsx:394-405 |
| Library not loaded | "Loading the library"; on failure "The equipment library did not load. Details: HTTP {n}" with **Try again** | WEB/components/studio/EquipmentPicker.tsx:374-392; WEB/lib/equipment/catalog.ts:87 |
| A library file not loaded | "{file} did not load from the library. Try again. Details: HTTP {n}" | WEB/lib/equipment/library-file.ts:21 |
| Not base64 | "The content of {file} is not valid base64." | API/services/uploads.py:12-19 |
| Closing | **Cancel**, or closing the dialog, gives up a file being read | WEB/components/studio/EquipmentPicker.tsx:142-151,207-208 |

### Array step: mounting

Section **Mounting**, ? = `studio.section.mounting` (WEB/components/studio/ArrayInspector.tsx:73-75).
Facts: Tilted rows "Tilt {t}° · {portrait \| landscape} · {n} in tilt" (demo "Tilt 15° · portrait · 2 in tilt", word "Yours"); East-west "East-west {t}° · ridge gap {g} m"; Sloped "Flush at {pitch}° · {orientation} · {n} in tilt" (WEB/lib/studio/array-fields.ts:137-143; production read).
Fields by roof type: Tilted rows: Tilt, Orientation, Modules in tilt, Clearance under the lower edge. East-west: East-west tilt, Ridge gap, Clearance under the lower edge. Sloped: a Tilt read-out, Orientation, Modules in tilt (WEB/lib/studio/array-fields.ts:32-37; WEB/components/studio/ArrayMounting.tsx:61-72).
Under each: "Default" (with "· {usual}" where given) or "Yours · default {value} · Reset" (WEB/lib/studio/array-fields.ts:109-117,145-149; WEB/components/studio/ArrayMounting.tsx:67-71).

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Tilt** (slider, commits on release) | 15°. Hint "Default · low for wind on a flat roof" | 0–45°, steps of 1 (API 0–90) | The modules' angle from flat on tilted rows | WEB/components/studio/ArrayMounting.tsx:28,42; WEB/lib/studio/array-fields.ts:20,146; API/schemas/array.py:10,17 |
| **Orientation** (segmented) | Portrait. Yours: "Yours · default portrait" | **Portrait**, **Landscape** | Portrait: the module's long side up the slope; Landscape: its short side. Not on east-west | WEB/components/studio/ArrayMounting.tsx:23-26,45-51; WEB/lib/studio/array-fields.ts:114; CORE/placement.py:105-109 |
| **Modules in tilt** (stepper) | 1. Hint "Default · one module up each row". (The demo has 2: "Yours · default 1") | 1–4 | Modules one above another in a row; table depth up the slope = n × side + (n − 1) × 0.02 m | WEB/components/studio/ArrayMounting.tsx:52-53; WEB/lib/studio/array-fields.ts:21,146; CORE/placement.py:171-173; CORE/demo.py:34-38 |
| **Clearance under the lower edge** | 0.50 m. Hint "Default" | 0–3 m, 2 decimals | The lower edge's height above the roof (tilted, east-west); the height at which obstacle and parapet shadows are worked out | WEB/components/studio/ArrayMounting.tsx:54-55; WEB/lib/studio/array-fields.ts:22; CORE/placement.py:150-156; CORE/keepout_parts.py:32-34 |
| **East-west tilt** (slider) | 10°. Hint under the slider "Each side, away from the ridge" | 0–30°, steps of 1 | Each side's tilt on east-west | WEB/components/studio/ArrayMounting.tsx:29,44; WEB/lib/studio/array-fields.ts:24; API/schemas/array.py:24 |
| **Ridge gap** | 0.30 m | 0–2 m, 2 decimals | The space between the two sides at the ridge | WEB/components/studio/ArrayMounting.tsx:56-57; WEB/lib/studio/array-fields.ts:25; CORE/placement.py:243-244 |
| **Tilt** read-out (sloped) | "{pitch}°", with "Roof pitch {pitch}° facing {deg}° {compass}, from the Roof step" | – | Follows the Roof step's pitch and direction | WEB/lib/studio/array-view.ts:32-38; WEB/components/studio/ArrayMounting.tsx:61,66 |

| Item | Value | Source |
|---|---|---|
| Set with no control | Module gap 0.02 m; a sloped roof's lower edge 0.1 m above the roof; east-west modules always one a side, width up the slope | API/schemas/array.py:22,26; CORE/placement.py:238 |
| A change | Lays the roof out again, then runs the design | WEB/lib/flow/edit-parts.ts:5-6,36-41 |

### Array step: spacing, shade-free hours and design day

Section **Spacing**, ? = `studio.section.spacing` (WEB/components/studio/ArrayInspector.tsx:76-78). The design day control is here, on the Array step, not in the Sun view (WEB/components/studio/ArraySpacing.tsx:129-140). The shade-free hours and the design day have their own ? discs beside their labels (WEB/components/studio/ArraySpacing.tsx:119,134).

Facts: Tilted rows "Rows {p} m apart · shade-free hours {hh:mm} to {hh:mm}" (demo "Rows 6.45 m apart · shade-free hours 09:00 to 16:00", word "Default"); East-west "Direction {az}° · shade-free hours …"; Sloped "Shade-free hours …"; none before a layout (WEB/lib/studio/array-fields.ts:151-157; production read).

The sentence at the top (tilted rows, once a layout came): "Rows stand {p} m apart so that they do not shade each other from {hh:mm} to {hh:mm} on {21 Dec}." (demo: 6.45 m, 09:00 to 16:00, 21 Dec); with a spacing typed: "Rows stand {p} m apart. The shade-free spacing is {f} m." (WEB/lib/studio/array-fields.ts:164-173; WEB/lib/studio/array-fields.test.ts:165).

Order: the sentence, Row spacing (tilted only), Shade-free hours, Design day, Direction (tilted and east-west), Allow shaded positions (WEB/components/studio/ArraySpacing.tsx:103-151; WEB/lib/studio/array-fields.ts:39-44).

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Row spacing from the shade-free hours** (switch) | On (the app decides; null in the design). While on: the label and the switch, no value, and the line under the label reads "Off: type the spacing yourself" (it says what Off does); no who-set-it hint while on | Off: a field **Row spacing**, 0.5–30 m, 2 decimals, filled with the last layout's spacing; the line "Shade-free spacing {f} m" (or "On: the shade-free hours decide it" when the layout gives no shade-free spacing); hint "Yours · default shade-free · Reset". Reset or the switch on gives the spacing back to the app | Row spacing · row pitch: plan distance from one row's front edge to the next's. On: shade-free over the hours on the design day | WEB/components/studio/ArraySpacing.tsx:80-89,111-115; WEB/lib/studio/array-fields.ts:26,48-68,119-125; API/schemas/array.py:23 |
| **Shade-free hours** (two-handle slider, "solar time") | 09:00 to 16:00, read out at the right of the label as "09:00 – 16:00 solar time". Hint "Default"; yours "Yours · default 09:00 to 16:00 · Reset" | One track 05 to 19 by the quarter hour, ticks 05, 08, 12, 16, 19; handles at least 15 min apart. Either handle can be dragged past noon; on release the start is set to 12:00 at the latest and the end to 12:00 at the earliest (a start let go at 14:00 commits 12:00) | The hours of the design day in which rows, obstacles and the parapet must not shade the modules | WEB/components/studio/ArraySpacing.tsx:116-128; WEB/lib/studio/array-fields.ts:29-30,127-135; WEB/lib/studio/array-view.ts:44-52; WEB/components/ui/RangeSlider.tsx:19-20,33; API/schemas/array.py:28-39 |
| **Design day** (segmented) | The winter solstice of the roof's side: north **21 Dec**, south **21 Jun**. Under it "The day the rows are spaced for. {21 Dec} has the longest shadows.", then the hint "Default"; yours "Yours · default winter solstice · Reset" | North: **21 Dec**, **21 Jun**, **21 Mar**; south: **21 Jun**, **21 Dec**, **21 Mar** (day 355 / 172 / 80) | The day the hours are on: sets the row spacing, the east-west gap and the kept-clear areas | WEB/components/studio/ArraySpacing.tsx:75-76,129-140; WEB/lib/studio/array-fields.ts:77-95,132,159-162; WEB/lib/flow/sun-time.ts:85-88; CORE/geometry.py:263-264 |
| **Direction (azimuth)** with switch **Follow the roof edge** | On: "{deg}° {compass}" with "From the roof edge nearest the equator" (east-west: "Ridges square to the roof edge nearest the equator") | Off: a field 0–359.9°, 1 decimal, filled with the last layout's; the line "Roof edge nearest the equator: {deg}° {compass}"; hint "Yours · default the roof edge's · Reset" | The way the rows face, clockwise from north. Tilted rows and east-west only | WEB/components/studio/ArraySpacing.tsx:90-99,141-145; WEB/lib/studio/array-view.ts:11-30; WEB/lib/studio/array-fields.ts:23,70-75,120 |
| **Allow shaded positions** (switch) | Off: "Off: positions shaded in the shade-free hours stay empty". On: "On: positions shaded in the shade-free hours are used too"; yours "Yours · default off · Reset" | Off / On | Off: the kept-clear areas hold no modules; on: they do, and their shade counts in the energy | WEB/components/studio/ArraySpacing.tsx:146-150; WEB/lib/studio/array-view.ts:40-42; WEB/lib/studio/array-fields.ts:133; CORE/placement.py:158-159 |

| Item | Value | Source |
|---|---|---|
| East-west | No row spacing: units stand side by side, a gap only where the hours need one (with a note) | WEB/lib/studio/array-fields.ts:41; CORE/placement.py:245-250,290-292 |
| Sloped | Neither row spacing nor direction: rows follow up the roof and face the slope | WEB/lib/studio/array-fields.ts:42 |
| Who set the section | "Yours" when any of spacing, direction, hours, design day or shaded positions is the user's | WEB/components/studio/ArrayInspector.tsx:57 |
| Solar time | The hours are the sun's: noon is when it stands highest; no clock time zone | CORE/geometry.py:267-278; HELP/studio/section/shade-free-hours.mdx:18 |
| Design day in the Sun view | The Sun view shows the design day unless another day is chosen there (that day is the view's, part 4) | HELP/studio/section/design-day.mdx:22 |
| A change | Each lays the roof out again, then runs the design | WEB/lib/flow/edit-parts.ts:5-6 |

### How the layout is placed

The layout reads the roof, the array and the module; not the weather, the inverter or the voltage (API/services/layouts.py:18-27).

| Item | Value | Source |
|---|---|---|
| 1. The frame | The roof is turned about its centroid so that the array faces frame-south; rows run along frame-x (east-west units along frame-y) | CORE/placement.py:1-8,130-145 |
| Azimuth the app takes | The outward normal of the roof's minimum rotated rectangle nearest the equator (180° north, 0° south), to 0.1°; on a sloped roof the slope's direction | CORE/geometry.py:137-153; CORE/placement.py:133-137 |
| 2. Where modules may stand | The roof inside the edge margin (largest piece), less every obstacle grown by its clearance, less the kept-clear area unless shaded positions are allowed | CORE/placement.py:147-161 |
| Kept-clear area | The union of the shadows of the parapet and every obstacle, cast on the plane of the lower edge (tilted, east-west: Clearance under the lower edge; sloped: 0.1 m), with the sun every 15 minutes through the shade-free hours of the design day | CORE/geometry.py:281-295; CORE/placement.py:150-156 |
| Sun | Solar time, Cooper's declination δ = 23.45° sin(360° (284 + n)/365), hour angle 15° (h − 12); shadows use an elevation of at least 0.5° | CORE/geometry.py:174-178,267-278 |
| 3. The grid | From the corner of the usable area's bounding box in the frame; every row shares the columns. A table (all its modules up the slope) is placed only where its whole footprint lies inside the usable area. East-west: each side of a unit is tested alone | CORE/placement.py:194-231,252-273 |
| Tilted rows, row spacing (pitch) | ψ_min: the lowest sun profile angle, ψ = atan(tan el / cos(az_sun − az_rows)), over the hours' 15-minute samples with the sun up and in front of the rows; at least 1°. Pitch = L (cos β + sin β / tan ψ_min), L = n × side + (n − 1) × 0.02 m, β = tilt; rounded up to 5 cm; never under the depth on plan L cos β + 0.3 m | CORE/placement.py:112-127,171-189 |
| Demo check | L = 2 × 2.277 + 0.02 = 4.574 m, β = 15°, ψ_min = 30.54°, row spacing 6.45 m (6.45 also the shade-free spacing), GCR 0.709, 790 positions, 28 tables, 6 rows, azimuth 180°. Engine run headless 2026-10-13 (reviewer re-ran it: same). 790, 28, 6, 6.45 m and the design day 355 are held by the API's tests; L = 4.574 and 6.45 by the engine's | apps/api/tests/api/test_layout.py:20-21; apps/api/tests/api/test_convert.py:241-244; apps/api/tests/engine/test_placement_shading.py:69 |
| A new design's array on the demo roof | One module in tilt: 808 positions at 3.20 m (engine run; not held by a test) | CORE/demo.py:34-38; CORE/placement.py:30 |
| A typed spacing under the floor | Raised to L cos β + 0.3 m, with the note "Row spacing {p} m is less than a row's depth plus 0.3 m. The app uses {q} m." (demo: 1.00 typed, 4.72 used) | CORE/placement.py:179-189; engine run |
| Columns (tilted, sloped) | Step = module side along the row + 0.02 m; on tilted rows, after N modules the step grows to the walkway width | CORE/placement.py:195-204 |
| Sloped rows | Step = L cos β + 0.02 cos β; after N rows the walkway width is added; GCR 1.0 | CORE/placement.py:191-193,205-212,233 |
| East-west units | Each side one module, width up the slope; unit width W = 2 d + ridge gap, d = width × cos tilt. Gap g = the larger over both faces of H / tan ψ − d (H = width × sin tilt), at least 0, rounded up to 5 cm; units step W + g, the walkway after N units; modules along a unit step length + 0.02 m. GCR 2L / (W + g). Demo made east-west: g = 0, 940 positions, 64 tables, 32 units, GCR 0.895 (940 held by a test) | CORE/placement.py:236-289; apps/api/tests/api/test_layout.py:116 |
| Demo made sloped (10°, 180°, no parapet) | 1,068 positions, 15 tables, 8 rows, GCR 1.0 (engine run; not held by a test) | CORE/placement.py:191-193,233 |
| East-west note | Only when g > 0: "Unit gap {g} m keeps east-west units free of shade in the shade-free hours." | CORE/placement.py:290-292 |
| Counts | Positions = modules placed; tables: runs of adjacent columns in a row, an aisle or a gap ending one (tilted, sloped); on east-west, blocks of 10 module places along a unit (each place holds up to two modules, one a side, so up to 20 modules a table); rows: rows or units with a module | CORE/placement.py:232-235,286-289,324-336 |
| Kept-clear areas by cause | One for the parapet and one per obstacle (left out when empty on the roof), each with the positions it keeps clear: those of the same layout with shaded positions allowed that touch it (a position on two counts in both). Demo: parapet 12, Stair room 18, Water tank 9, AC units 0, 0, 0, 1 | CORE/keepout_parts.py:37-66; engine run and production read |
| No cap | `place` sets no limit on the number of modules | CORE/placement.py:130-301 |
| Refusals | Outline with no area; outline crossing itself; over 30,000 m²; a module with no size | API/services/layouts.py:14-15,30-46; API/convert.py:43 |
| No module fits | The design has no options: the result chip reads "Energy not computed" with "The roof has no room for a module inside the edge margin and clear of shade. Check the outline, the edge margin and the obstacles." and **Open Roof** | API/services/design.py:28-33,228-229; WEB/components/shell/result-view.ts:29-32; WEB/lib/errors/problem-of.ts:65-67; WEB/lib/flow/no-options.ts:7-15 |

### Studio (Roof, Array): messages

| Where | Exact text | Source |
|---|---|---|
| Stage chip, layout failed | **Layout not updated** · {the API's words} · **Try again**; the same title when no layout came before (see issues); Escape closes it until the next failure; the last positions stay | WEB/components/studio/stage-view.ts:79-83; WEB/components/studio/LayoutFailed.tsx:17-64 |
| Notes list, layout failed | Title "Layout not updated" (or "Layout not computed" with nothing before), the cause and remedy, under "Showing the last positions" or "There are no positions yet", **Try again** | WEB/components/shell/notes-view.ts:174-177; WEB/lib/errors/problem-of.ts:32-61 |
| API, no area | "The roof outline encloses no area. Give at least three corners that are not on one line." | API/services/layouts.py:14 |
| API, crosses itself | "The roof outline crosses itself. Give the corners in order around the roof." | API/services/layouts.py:15 |
| API, too large | "This outline covers {area} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." | CORE/errors.py:46-50 |
| Outline edit refused (toast) | "The outline cannot cross itself. The roof stays as it was." | WEB/components/studio/OutlineHandles.tsx:22,88 |
| Layout note, typed spacing | "Row spacing {p} m is less than a row's depth plus 0.3 m. The app uses {q} m." (notes list: title "Row spacing", where "Layout · Array step", **Open Array**) | CORE/placement.py:185-188; WEB/components/shell/notes-view.ts:74-87,134-143,169 |
| Layout note, east-west | "Unit gap {g} m keeps east-west units free of shade in the shade-free hours." (title "Unit gap") | CORE/placement.py:292 |
| Module note, Voc (card) | "Voc coefficient {x} %/°C is outside the usual −0.35 to −0.20 %/°C for crystalline silicon. Check the datasheet and enter it if it differs." Demo: −0.164 | CORE/onediode.py:24-25,114-117; WEB/components/studio/ModuleCard.tsx:99-104; production read |
| Module note, Voc (notes list) | Title "Voc coefficient outside the usual range", "Usually −0.35 to −0.20 %/°C for this kind of module. Enter the datasheet's value.", with its field (value "From the module file"), where "Module · Array step", **Open Array** | WEB/components/shell/notes-view.ts:100-123,168 |
| Module note / layout refusal, no size | "{file} gives no size of the module (Width and Height). The layout needs it: choose a PAN file that has it." | API/services/equipment.py:19-23 |
| Picker refusal | **Module not changed** / "{file} is not a module file (PAN): PNom, Voc or Isc is missing." | WEB/components/studio/EquipmentPicker.tsx:271-279; CORE/io/pvsyst.py:218 |
| Picker, file too large | "{name} is over 256 KB, larger than any module or inverter file. Choose another." | WEB/lib/equipment/library-file.ts:30 |
| Picker, not text | "The app cannot read the file as text: it is in none of utf-8, latin-1, cp1252." | CORE/io/pvsyst.py:27 |
| Picker, not base64 | "The content of {file} is not valid base64." | API/services/uploads.py:18 |
| Picker, browser could not read | "The file could not be read: {reason}. Choose another." | WEB/components/studio/EquipmentPicker.tsx:90 |
| Picker, library file | "{file} did not load from the library. Try again. Details: HTTP {n}" | WEB/lib/equipment/library-file.ts:21 |
| Picker, catalog | "Loading the library"; "The equipment library did not load. Details: HTTP {n}" · **Try again** | WEB/components/studio/EquipmentPicker.tsx:374-392; WEB/lib/equipment/catalog.ts:87 |
| Picker, nothing found | "No module in the library matches “{search}”." / "No module in the library fits these filters." · "Or choose your own module file (PAN) below." · **Clear the search** / **Clear the filters** | WEB/components/studio/EquipmentPicker.tsx:394-405 |
| Picker, own file | "Or drop your own module file (PAN) here" · "Let go to load the file" · "Reading the file {name}" | WEB/components/studio/EquipmentPicker.tsx:446-457 |
| Module card, before | "Loading the module" | WEB/components/studio/ModuleCard.tsx:78 |
| Heights review | "The file has no height for these obstacles. The app uses 1.0 m." · "{n} to review" · **Review**; "Height to review"; "Not in the file. Enter the real height." · **Next** | WEB/lib/studio/review-heights.ts:7-12; WEB/components/studio/ObstaclePanel.tsx:196-206,334-336 |
| Number fields | "The highest is {max} {unit}." · "The lowest is {min} {unit}." · "Enter a number from {min} to {max} {unit}." | WEB/components/ui/number-entry.ts:74-85 |
| No 3D | "This browser cannot draw the roof in 3D." · "The browser stopped drawing the roof in 3D." | WEB/components/studio/stage-words.ts:4-5 |
| No module fits | "Energy not computed" · "The roof has no room for a module inside the edge margin and clear of shade. Check the outline, the edge margin and the obstacles." · **Open Roof** | API/services/design.py:28-33; WEB/lib/errors/problem-of.ts:65-67 |

### Help topics of this area and their docs links

Each help topic links to a page and a section of the docs; the app holds a copy of the docs' pages and headings, taken at
docs `98d8629`, and the anchor is the heading lower-cased, punctuation dropped, spaces as hyphens. A docs heading renamed
must be renamed in the app too, or the topic's link lands on the page top (WEB/lib/docs/docs.ts:1-27,29-60).

| Topic | Links to (page · section) | Source |
|---|---|---|
| studio.section.outline | roof · Location | HELP/studio/section/outline.mdx:9-11 |
| app.section.roof-type | roof · Roof type | HELP/app/section/roof-type.mdx:13-15 |
| studio.section.edges-and-access | roof · Edges and access | HELP/studio/section/edges-and-access.mdx:9-11 |
| app.section.obstacles | roof · Obstacles | HELP/app/section/obstacles.mdx:9-11 |
| studio.section.module | array · Module | HELP/studio/section/module.mdx:9-11 |
| studio.section.mounting | array · Mounting | HELP/studio/section/mounting.mdx:9-11 |
| studio.section.spacing | array · Spacing | HELP/studio/section/spacing.mdx:9-11 |
| studio.section.shade-free-hours | array · Shade-free window | HELP/studio/section/shade-free-hours.mdx:9-11 |
| studio.section.design-day | sun · The day | HELP/studio/section/design-day.mdx:9-11 |
| The app's copy of those pages | roof "The Roof lens": Location, Roof type, Edges and access, Obstacles, When something goes wrong; array "The Array lens": Module, Mounting, Spacing, Shade-free window, How the layout is placed, When something goes wrong; sun "The Sun lens": The day, … | WEB/lib/docs/docs.ts:51-58 |

#### Known-stale (this area)
- `docs/design/information-architecture.md:36` lists the view controls as "3D, Plan, Fit, north, Sun, Layers" (phone "3D, Plan, Sun and Layers"), and `:49-50` says the ground is satellite imagery when the project has a location and that a **Layers** button switches it. The code: one toggle, **Imagery**, and every load starts on the plain grid (WEB/components/studio/ViewControls.tsx:28-29,83-97; WEB/lib/stores/view-store.ts:91,128). Code comments still say "Layers panel" too (WEB/lib/stores/view-store.ts:91; WEB/components/scene/Scene.tsx:75; WEB/components/studio/stage-view.ts:143).
- `docs/design/information-architecture.md:44` lists for the Roof step "Location and outline (with Edit, back to Find and outline)" and "albedo". The code's outline is edited in Plan on the stage (**Edit it in Plan**), Find is for a new roof alone, and the albedo is a link line to Performance (WEB/components/studio/RoofInspector.tsx:73-87,175-179). Its Array row (`:45`) says "row pitch" and "shade-free window"; the app says **Row spacing** and **Shade-free hours** (WEB/components/studio/ArraySpacing.tsx:83,87,118).
- `plan/README.md:134` (D97) says the step's sections open the first time. Only **Module** (Array) and one Strings section pass `opensFirst`; no Roof section opens at first (WEB/components/studio/RoofInspector.tsx:153-194; WEB/components/studio/ArrayInspector.tsx:62; WEB/components/studio/StringsInspector.tsx:177).
- `plan/README.md:140` (D103) names the label "Walkway every 24 modules" and the group "Round obstacles". The code: label **Walkway every** with the unit "modules" or "rows", group **Around obstacles** (WEB/lib/studio/roof-fields.ts:39-40,70). The help's summary of Edges and access says "round obstacles" in running text (HELP/studio/section/edges-and-access.mdx:3); the group's name is **Around obstacles**.
- The help topic `studio.section.shade-free-hours` links to the docs section "Shade-free window" (HELP/studio/section/shade-free-hours.mdx:9-11), a name the voice retires (plan/v2/voice.md §6; WEB/lib/words/voice-scan.ts:15-16). `studio.section.outline` links to "Location" (HELP/studio/section/outline.mdx:9-11) though the section is **Outline**. `studio.section.design-day` links to the Sun page's "The day" (HELP/studio/section/design-day.mdx:9-11) though the control is on the Array step. The app's copy of the docs still titles the pages "The Roof lens", "The Array lens", "The Sun lens" (WEB/lib/docs/docs.ts:51-58). If the docs rename these headings, the app's map must change with them.
- HELP/app/section/obstacles.mdx:35 says the heights note stands "over the obstacles"; the note stands at the top of the Roof step's column, above Roof type (WEB/components/studio/RoofInspector.tsx:151). Wording only.
- The comment in WEB/components/studio/ArraySpacing.tsx:65 says "The ground coverage ratio and the profile angle are in the help"; the spacing help names the profile angle but not the GCR (HELP/studio/section/spacing.mdx:29). The GCR is no longer shown anywhere on the Array step (the read-out's value is null, WEB/components/studio/ArraySpacing.tsx:84).
- The e2e test `e2e/tests/array-lens.e2e.ts:206-240` (last changed in #47) still looks for V1's words: a "Row pitch" read-out with "Shade-free · GCR 0.71 · profile angle 30.5°", the switch "Shade-free row pitch", the group "Shade-free window", "Follows the roof edge closest to the equator", "Shade-free would be 6.45 m", and in Mounting "Follows the roof pitch · 10° facing 180° S · set in the Roof lens" and "Lower-edge clearance" (:198-202). None of these is in the app (WEB/components/studio/ArraySpacing.tsx:83-95,118; WEB/lib/studio/array-view.ts:16-20,36). Do not take wording from it.
- The old fact sheet's Array rows (tilt hint "Latitude … suggests …", "Shade-free row pitch" switch, "Winter solstice" option, `mod` unit, "Layers" panel, vitals bar, "Picker, file refused: This module was not loaded") are all gone in V2; none may be copied. ("Winter solstice" survives only in the design kit's sample page, WEB/components/kit/Choices.tsx:16, not in the Studio.)

#### Facts we do not have (this area)
- The mouse mapping was read in three-stdlib's code (see "Mouse"), not tried in a browser.
- The exact text of an over-length PAN refused by the API's schema (not by the app's own 256 KB check): it is Pydantic's validation text, not in our code.
- The production commit. The production reads matched this code at every point checked, but production's commit was not read.
- What the Sun view's day control and its card say (part 4).
- The Find side of Build this roof (the roof type question, its default and the roof made): part 2.

#### Product issues noticed (this area)
- **Spacing's facts and sentence disagree for a spacing under the floor.** With a typed Row spacing under a row's depth plus 0.3 m, the closed row says "Rows {typed} m apart" (array.row_pitch_m) while the sentence says "Rows stand {used} m apart" (layout.pitch) (WEB/lib/studio/array-fields.ts:154 against :167; the engine raises it at CORE/placement.py:189). Verified by reading, and by the engine run: 1.00 typed, 4.72 used, with the note.
- **The demo's own module reads "Yours".** The demo carries the bundled sample's text as its file, so Module says "Yours" (and so does any design opened from it) though it is the app's module (API/services/demo.py:14; WEB/lib/studio/set-by.ts:50-51; WEB/components/studio/ArrayInspector.tsx:62). Seen on production 2026-10-13. The help says "Default for the app's module" (HELP/studio/section/module.mdx:24).
- **No module fits marks Strings, not Roof.** Any `no_options`, including no positions, makes Strings "needs you" (WEB/components/shell/use-progression.ts:44,58; WEB/lib/flow/steps.ts:76), while the chip's remedy for no positions opens Roof (WEB/lib/flow/no-options.ts:8; API/services/design.py:228-229). The Roof step is never marked "needs you": no note leads to it (WEB/components/shell/notes-view.ts:166-189). Read in code.
- **No Undo on screen in the Studio.** Undo and redo are the keys alone (WEB/components/shell/use-history-keys.ts:22-36); on a phone or a tablet without a keyboard an edit on the Roof or Array step cannot be undone except by Reset or by typing back. The help says "Undo takes the change back" (HELP/studio/section/outline.mdx:31) and "Undo takes either back" (HELP/studio/section/edges-and-access.mdx:37). Verified by grep: no Undo control outside Find and one toast.
- **Hide panel's tooltip always shows "⌘ \".** On Windows and Linux the key is Ctrl \ (WEB/components/studio/Studio.tsx:150; WEB/lib/studio/panel-key.ts:6); the app detects no platform anywhere (grep of `navigator.platform`, `userAgentData`, `isMac` in WEB: none).
- **Edit it in Plan in the Sun view (desktop) gives no handles.** It turns the stage to Plan and selects the roof, but the corners become handles only outside the Sun view, so the roof's callout "Roof · selected" stands instead and the outline cannot be dragged until Sun is turned off (WEB/components/studio/RoofInspector.tsx:129-132; WEB/components/scene/Scene.tsx:83,123-124). On tablet and phone the column holds the Sun view's content then, so the button is not there. Read in code, not run.
- **The Voc note leads to the Array step.** Its action is **Open Array** (WEB/components/shell/notes-view.ts:70,168), where the module card repeats the note, while the coefficient is entered under Sizing temperatures in the Strings step (WEB/lib/studio/sizing-fields.ts:59; HELP/studio/section/module.mdx:37). The notes list holds the field itself, so the user can fix it there. Read in code.
- **Roof step head always says the app set the edges.** "Built from … The app set the edges: check the parapet, it shades the first row." on every open, after the user changed the edges, and on a sloped roof whose parapet is 0 (WEB/components/studio/step-heads.ts:13; the head has no input but the roof's source).
- **In Plan a plain left-drag does nothing (desktop).** Rotation is off in Plan (`enableRotate={!isPlan}`) and the mouse is left at OrbitControls' defaults, so left-drag, which would orbit, is refused; panning needs right-drag or Shift-drag, while on touch one finger pans (WEB/components/scene/CameraRig.tsx:26,130-131; three-stdlib 2.36.1 `controls/OrbitControls.js:671-683`). Read in code, not run.
- **The module card's note is in the old voice.** The card shows the engine's sentence "… Check the datasheet and enter it if it differs." (CORE/onediode.py:116-117; WEB/components/studio/ModuleCard.tsx:99-104), the form plan/v2/voice.md §11 replaces; the card has no field to enter it in. The notes list says it in V2's words (WEB/components/shell/notes-view.ts:113-123).
- **The stage's layout chip says "not updated" when nothing came before.** The chip's title is always "Layout not updated" (WEB/components/studio/stage-view.ts:82), while the notes list says "Layout not computed" when there are no positions yet (WEB/components/shell/notes-view.ts:174-177; WEB/lib/errors/problem-of.ts:32-35, the "not computed / not updated" pair of D101). Found by this review; read in code.

<!-- help-map
Topics of this area (HELP = apps/web/content/help), with the ### of this part that covers each.

| Topic id | Title | Summary (verbatim) | Covered in |
|---|---|---|---|
| studio.section.design-day | Design day | "The day the rows are spaced for. The winter solstice has the longest shadows." | Its disc is in the Array step's Spacing (WEB/components/studio/ArraySpacing.tsx:134), not in the Sun view; the Sun view's "Design day: …" line is in 4.3 Sun view: the day. The Array part owns the field. |
| studio.section.the-sun-at-the-time | The sun at the time | "Where the sun stands at the time on the timeline: how high, and from which direction." | Opened from the **Day** section's disc (WEB/components/studio/SunInspector.tsx:53). 4.2, 4.3, 4.4 |
| studio.section.on-the-roof | On the roof | "Choose what the Sun view draws: the sun's arc, its shade-free hours, shadow outlines, the shade map." | 4.5 |
| studio.section.shade-map | Shade map | "Each module coloured by its loss to shade over the year, to see where shade costs most." | 4.6 |
| studio.section.shade-over-the-year | Shade over the year | "How much energy shade costs in a year, by its cause: rows and obstacles, strings, the horizon." | 4.7, 4.8 |
| studio.section.system-voltage | System voltage | "The highest DC voltage of the system. It caps the modules in a string; it starts from your country." | 4.16 |
| studio.section.inverter | Inverter | "Choose the inverter the strings are sized for, from the library or your own file (OND)." | 4.14, 4.15 |
| studio.section.modules-per-string | Modules per string | "How many modules one string can hold at your system voltage, and what limits it." | 4.11, 4.17 (its disc stands only on the **Modules per string** bar, shown only when there are no options) |
| studio.section.options | Options | "Choose how the modules are wired to the inverter. The best option comes first." | 4.10, 4.12, 4.13 |
| studio.section.mppt-loading | MPPT loading | "The strings on each input of the inverter, and their current against its limit." | 4.18 |
-->

## 4. The Sun view and the Strings step

Verified at product `main` c6aeb66 (last code change e1faa19). Prefixes: WEB = apps/web, API = apps/api/src/rooftop_api,
CORE = apps/api/src/rooftop_core, HELP = apps/web/content/help. Demo figures were confirmed by running the engine headless
(`apps/api/.venv/bin/python`, `rooftop_api.services.design.result` on `rooftop_api.services.demo.demo()`), and the web's word
functions were run on that result with `bun` (they are pure). The production site was not used: the browser pane was shared
with other runs and could not be driven reliably.

### 4.1 Sun view: turning it on, and what it changes on the stage

| Item | Value | Source |
|---|---|---|
| What it is | A view of the stage on every Studio step (Roof, Array, Strings), not a step. The Studio's steps are `roof`, `array`, `strings` only | WEB/lib/routes.ts:13-18; plan/README.md:132 (D95) |
| The control | **Sun** button (sun icon) in the view controls at the stage's top right; `aria-pressed` while on; drawn with the active fill while on. Pressed again it turns the view off | WEB/components/studio/ViewControls.tsx:63-69 |
| Place of the Sun button by size | Tablet and desktop: in the row 3D/Plan · Fit · north · **Sun** · **Imagery**; on desktop alone **Show panel** follows while the work column is hidden. Phone: **Sun** alone at the top right, the others (3D/Plan, Imagery) on a line under it; Fit and the north control are not on phone | WEB/components/studio/ViewControls.tsx:25-26, 45-79; Show panel desktop only: WEB/components/studio/ViewControls.tsx:72-77 |
| Tooltip on Sun | None (the button has no Tooltip) | WEB/components/studio/ViewControls.tsx:66-68 |
| Keyboard shortcut to turn it on | None found: the only callers of `showSunView` are the button and `/studio/sun` | WEB/components/studio/ViewControls.tsx:66; WEB/components/studio/SunOfBefore.tsx:13 |
| `/studio/sun` | The Sun lens's old address: turns the Sun view on and replaces the address with the step that was opened last (`/studio/roof` at the start of a session) | WEB/lib/routes.ts:20-21; WEB/app/(workspaces)/studio/[lens]/page.tsx:18-19; WEB/components/studio/SunOfBefore.tsx:8-16; WEB/lib/stores/view-store.ts:128 |
| Stays on across steps | The view store keeps `isSunView` when the step changes; nothing turns it off but the button | WEB/lib/stores/view-store.ts:148-157, 159 |
| Time at first | The design day at 12:00 solar time (`STILL`). Outside the Sun view the steps draw the design day's noon, still; turning the view off puts the time back to it and the shade map off | WEB/lib/stores/view-store.ts:125-128, 158-159 |
| Stage title | `{Step} · Sun`, e.g. **Strings · Sun** (visible on desktop; screen-reader only on tablet and phone) | WEB/components/studio/Studio.tsx:129; WEB/components/studio/Stage.tsx:144 |
| First meeting line (desktop, once per device) | "Shadows at any hour, and the shade on each module over the year." | WEB/components/studio/Stage.tsx:145; WEB/lib/words/explain.ts:11, 23; WEB/components/shell/FirstMeeting.tsx:26-35 |
| Line under the title (desktop) | `{date long} · {winter solstice / summer solstice / equinox} · shade-free from {hh:mm} to {hh:mm}`; days 355 and 172 are named by hemisphere, 80 and 266 "equinox", other days have no name. Demo: "21 December · winter solstice · shade-free from 09:00 to 16:00" | WEB/components/studio/Stage.tsx:97-101, 147; WEB/lib/flow/sun-time.ts:154-166 |
| Kept-clear areas | Not drawn in the Sun view (so not selectable there) | WEB/lib/scene/what-is-drawn.ts:9-13; WEB/components/scene/Scene.tsx:205 |
| Edge labels | In the Sun view only on the Roof step in Plan | WEB/lib/scene/what-is-drawn.ts:12 |
| Camera | While the Sun view is on with **Sun path** on, the camera frames the sun path's dome (1.3 × the roof's radius) | WEB/lib/stores/view-store.ts:207; WEB/lib/scene/camera.ts:28-30; WEB/lib/scene/sun-path.ts:10-11 |
| Light and shadows | The scene's sun light follows the sun at the view's hour; until the day has come, a light from the south-east, 55° high, without shadows; shadows fade out at the horizon | WEB/components/scene/SunLight.tsx:18-34 |
| Strings' legend | Hidden while the Sun view is on (all sizes) | WEB/components/studio/Stage.tsx:136 |
| Work column, desktop | Keeps the step's own sections; the Sun view's content is the card on the stage (4.7) | WEB/components/studio/Studio.tsx:101-112; WEB/components/studio/Stage.tsx:156-157 |
| Work column, tablet and phone | Replaced by the Sun view's content (`SunCardBody`): the step's head and sections are not shown while the view is on; the step's primary stays at the foot | WEB/components/studio/Studio.tsx:101-105, 156-166 |
| Order of the Sun view's content | Phone: the timeline first; then **Shade over the year**, **On the roof**, **Shade map** (while its switch is on), **Day** | WEB/components/studio/SunInspector.tsx:125-136 |
| Saved in the design | Nothing of the Sun view: the view store "is not in the .rtd document" | WEB/lib/stores/view-store.ts:1-2 |

### 4.2 Sun view: the time

| Item | Value | Source |
|---|---|---|
| Where | Desktop and tablet: the timeline across the stage's foot, 28 over the stage's bottom. Phone: the time pill (play button with the time) at the stage's top left, and the timeline at the head of the sheet | WEB/components/studio/Stage.tsx:57-63, 158-159; WEB/components/studio/SunInspector.tsx:129-130 |
| Only in the Sun view | The time controls show only while the Sun view is on | WEB/components/studio/Stage.tsx:158-159 |
| Solar time | Every time is solar time: noon is when the sun stands highest. The timeline says "solar time" under the time | WEB/lib/flow/sun-time.ts:1-2; WEB/components/studio/Time.tsx:173-183; HELP/studio/section/the-sun-at-the-time.mdx:31 |
| Timeline (desktop, tablet) | A card 64 high: round play button, the time in title size with "solar time" under it, the track, and on desktop at the right the sun at the time (4.4) | WEB/components/studio/Time.tsx:215-231 |
| Track | Slider "Time of day", from sunrise to sunset each taken inward to the quarter hour; the whole day (00:00–24:00) where the sun stays up or stays down. Step a quarter hour; Page Up/Page Down an hour. Value said as `{hh:mm} solar time`. The shade-free hours are the filled part of the track | WEB/components/studio/Time.tsx:72-95; WEB/lib/flow/sun-day.ts:36-50 |
| Ticks | `{hh:mm} sunrise`, the start of the shade-free hours, `12:00`, their end, `sunset {hh:mm}`; the shade-free ends in a stronger colour; on a day without sunrise or sunset `00:00` and `24:00`. Demo design day: "06:33 sunrise", "09:00", "12:00", "16:00", "sunset 17:27" | WEB/lib/flow/sun-time.ts:60-76; WEB/components/studio/Time.tsx:53-62; headless: CORE/sunpath.py:43-58 gives 6.557 h and 17.443 h for lat 18.52, day 355 |
| Tablet | Sunrise and sunset stand beside the track, the time over the word, after a vertical rule; no sun line at the right | WEB/components/studio/Time.tsx:142-151, 168, 224-228 |
| Phone timeline (sheet head) | Play button, the time with "solar time", at the right a swatch, "Shade-free hours" and `{hh:mm} – {hh:mm}`; the track with the sunrise, noon and sunset ticks only | WEB/components/studio/Time.tsx:194-212 |
| Phone time pill | One button: play icon and `{day short} · {hh:mm}` (e.g. "21 Dec · 12:00"); its name `Play the day, {…} solar time` or `Pause, {…} solar time`; a press plays or pauses | WEB/components/studio/Time.tsx:104-124 |
| Play button | Name "Play the day", or "Pause" while playing; disabled until the day's sun has come | WEB/components/studio/Time.tsx:37-51 |
| Play | A quarter hour every 250 ms to the end of the day's hours, where it stops; Play at the end starts from the start. Under reduced motion an hour a second. Any time set by something else (a drag, a key, another day) stops it | WEB/lib/flow/play.ts:1-10, 43-66 |
| Keys (Sun view only) | `,` `.` an hour back and forward, held to the day; `[` `]` a day back and forward, round a 365-day year (365 → 1); not with ⌘/Ctrl/Alt, not while a field, an open dialog, a slider, a menu, a list or a combobox has the focus. On the focused timeline `←` `→` a quarter hour. A key stops play | WEB/components/studio/use-sun-keys.ts:10-35; WEB/lib/flow/sun-time.ts:130-141; WEB/components/studio/Time.tsx:20-25 |
| Timeline tooltip | The keys: `,` `.` "an hour"; `[` `]` "a day"; `←` `→` "a quarter hour" | WEB/components/studio/Time.tsx:20-25, 185 |
| Day without sunrise or sunset | Under the time: "The sun stays below the horizon all day" / "The sun stays above the horizon all day" | WEB/components/studio/Time.tsx:153-158 |
| The time kept inside the day | When a new day comes, the hour is moved to the nearest quarter hour inside its hours | WEB/lib/flow/design-flow.ts:191-195; WEB/lib/flow/sun-time.ts:78-82 |
| Where the day's sun comes from | `POST /sun` for the day, a quarter hour apart, asked when the place or the day changes, never for the hour; the design day is the array's `design_doy`, else `design_day` (the winter solstice of the hemisphere) | WEB/lib/flow/design-flow.ts:161-203; API/schemas/sun.py:24-40 |
| The year's shading does not use this time | It is worked out from the sun at each hour of the weather | HELP/studio/section/the-sun-at-the-time.mdx:39; CORE/weather.py:326-328 |

### 4.3 Sun view: the day

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Day** (segmented control, fills the width; ? disc → studio.section.the-sun-at-the-time, the sheet marking the day shown) | The design day | **21 Dec** (day 355), **21 Mar** (80), **21 Jun** (172), **Any date**, in that order in both hemispheres | Sets the day of the sun, its path and the shadows the view shows. It changes what is seen, not the design | WEB/components/studio/SunInspector.tsx:32-77; WEB/lib/flow/day-choices.ts:4-11; HELP/studio/section/the-sun-at-the-time.mdx:27 |
| **Any date** → **Day** (number, label inside) | The day shown | 1–31, whole | With the month, the day of the year; a day past the month's end is its last day; the year has 365 days | WEB/components/studio/SunInspector.tsx:66-71; WEB/lib/flow/sun-time.ts:13-14, 111-115 |
| **Any date** → **Month** (list) | The month shown | January … December | As above. On phone the two stand one under the other | WEB/components/studio/SunInspector.tsx:22-23, 67-70 |

| Item | Value | Source |
|---|---|---|
| Line under the Day control | "Design day: {d Month}, the winter solstice in this hemisphere" when the array has no design day of its own; "Design day: {d Month}, set in the Array step" when it has. With **Any date**: `Day {day of year} · design day {d Month}` | WEB/lib/flow/sun-time.ts:100-104; WEB/components/studio/SunInspector.tsx:72-74 |
| The design day by hemisphere | Latitude ≥ 0: 21 Dec (355); below 0: 21 Jun (172) | WEB/lib/flow/sun-time.ts:84-88; CORE/geometry.py:263-264 |
| The Day choices by hemisphere | The same three days in the same order north and south (21 Dec, 21 Mar, 21 Jun, then Any date); only the line under them and the names in the stage line follow the hemisphere. No choice is marked as the design day: `daysOf` works out `isDesignDay` but the control is given only value and label. (The Array step's own **Design day** list orders its days by hemisphere: another control.) | WEB/lib/flow/sun-time.ts:95-98; WEB/components/studio/SunInspector.tsx:56-65; HELP/studio/section/design-day.mdx:18 |
| A day chosen that is not one of the three | **Any date** stays selected (also when the array's own design day is another date) | WEB/components/studio/SunInspector.tsx:42-44 |
| Choosing the design day's date | Stored as "the design day", so the view follows the array when its design day changes | WEB/lib/flow/sun-time.ts:106-109 |
| Day names in lines | 355 "winter solstice" north / "summer solstice" south; 172 the reverse; 80 and 266 "equinox" | WEB/lib/flow/sun-time.ts:154-160 |
| Day values in the help sheet | `21 Dec` "21 December, a solstice. North of the equator its shadows are the longest of the year, south of it the shortest."; `21 Mar` "21 March, the equinox. …"; `21 Jun` "21 June, a solstice. South of the equator …"; `Any date` "Any day of the year, by its day and its month." | HELP/studio/section/the-sun-at-the-time.mdx:5-9 |

### 4.4 Sun view: the sun at the time, the arc and its marks

| Item | Value | Source |
|---|---|---|
| Sun at the time, desktop | At the right of the timeline: `Sun {e}° high, from {az}° ({point})`, the point one of eight (north … north-west); while it is down "The sun is down". Demo 16:00: "Sun 18.0° high, from 237° (south-west)"; 12:00: "Sun 48.0° high, from 180° (south)" | WEB/components/studio/Time.tsx:228-230; WEB/lib/flow/sun-time.ts:45-52; headless CORE/geometry.py:267-278 |
| Sun at the time, tablet | No line by the timeline; the marker's callout gives it | WEB/components/studio/Time.tsx:228; WEB/components/studio/SunMarks.tsx:79 |
| Sun at the time, phone | Not shown on screen (no timeline line, no callout); the screen-reader list says `{d Mon}, {hh:mm} solar time, sun {e}° high, {bearing}` | WEB/components/studio/Time.tsx:194-212; WEB/components/studio/SunMarks.tsx:79; WEB/components/studio/Stage.tsx:226; WEB/lib/flow/sun-time.ts:38-43 |
| The arc | Drawn while the Sun view is on and **Sun path** is on: the day's positions on a dome about the roof's centroid, 1.3 × the roof's radius, from the horizon at sunrise to the horizon at sunset, in the sun colour, never lit nor shadowed. Width 2 px (1.5 on phone) | WEB/components/scene/Scene.tsx:169; WEB/lib/stores/view-store.ts:208; WEB/components/scene/SunPath.tsx:25-79; WEB/lib/scene/sun-path.ts:10-52 |
| Shade-free hours on the arc | The part inside the shade-free hours drawn thicker, 5 px (4 on phone), while **Shade-free hours** is on | WEB/components/scene/SunPath.tsx:27-28, 51, 74-76 |
| Hour marks (tablet, desktop) | A ring and a chip at sunrise ("{hh:mm} sunrise"), the shade-free start, noon (unless it is an end of the window), the shade-free end, and sunset ("sunset {hh:mm}"); none on phone. The mark at the marker's hour gives way to the marker's callout | WEB/lib/scene/sun-marks.ts:19-50; WEB/components/studio/SunMarks.tsx:21-24, 63-72 |
| Marker | A disc of the sun at the view's hour (20 px, 14 px on phone); none while the sun is down | WEB/components/studio/SunMarks.tsx:26-28, 73-77; WEB/lib/scene/sun-path.ts:54-58 |
| Marker callout (tablet, desktop; nothing selected) | Title `{hh:mm}`, or `{hh:mm} · start of the shade-free hours` / `{hh:mm} · end of the shade-free hours`; detail `Sun {e}° high, {bearing}`, the bearing from the nearer of south and north (`56.6° W of south`, `due south`, `due north`, `due east`, `due west`). Demo 16:00: "16:00 · end of the shade-free hours" / "Sun 18.0° high, 56.6° W of south". Something selected wins over it | WEB/lib/flow/sun-time.ts:23-36, 168-177; WEB/components/studio/SunMarks.tsx:39-95 |
| Sun path failed | Chip on the stage: "Sun path not updated", the API's message, **Try again**; Escape closes it until the next failure; the light of the day before stays | WEB/components/studio/stage-view.ts:85-89; WEB/components/studio/LayoutFailed.tsx:17-71 |

### 4.5 Sun view: On the roof

Section **On the roof** (? disc → studio.section.on-the-roof). Each row: the label, a line, a switch. Of the view, not of the design.

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Sun path** — "The arc the sun follows on this day" | On | on/off | Draws the arc (4.4) and makes the camera frame its dome | WEB/components/studio/SunInspector.tsx:81-82; WEB/lib/stores/view-store.ts:128, 207-208 |
| **Shade-free hours** — "The thick part of the arc, {hh:mm} to {hh:mm}" (demo "09:00 to 16:00") | On | on/off; dimmed and disabled while **Sun path** is off | Draws the shade-free part of the arc thicker | WEB/components/studio/SunInspector.tsx:83, 99, 107-111; WEB/components/scene/SunPath.tsx:51 |
| **Shadow outlines** — "The shadows the app computed, dashed, to compare" | Off | on/off | Asks the API for the shadows of the parapet and the obstacles on the roof surface at the day and hour shown, once the time has stood still 150 ms; draws them dashed in the kept-clear line colour, no fill, over the rendered shadows; shown only while they are of the time on screen. A request that fails shows nothing (the store keeps the failure; no component reads it) | WEB/components/studio/SunInspector.tsx:84; WEB/lib/flow/design-flow.ts:112-153; WEB/components/ui/design-numbers.ts:56-57; WEB/components/scene/ShadowOutlines.tsx:14-42; WEB/lib/stores/results-store.ts:203-206; failure: WEB/lib/stores/results-store.ts:99, 178 |
| **Shade map on the modules** — "Each module coloured by its loss to shade" | Off | on/off | Colours each module by its near shading over the year and adds the **Shade map** section and the stage legend (4.6). Turning the Sun view off turns it off | WEB/components/studio/SunInspector.tsx:85, 108, 111, 133; WEB/lib/stores/view-store.ts:158-159, 201 |

| Item | Value | Source |
|---|---|---|
| Layout by size | Desktop: rows 12 apart; touch: rows divided by lines, taller | WEB/components/studio/SunInspector.tsx:105, 110 |
| The shade-free hours' values | Set in the Array step (window_start_h, window_end_h); a new design's 09:00 to 16:00 | HELP/studio/section/on-the-roof.mdx:25; API/schemas/array.py:28-29 |
| The help's advice | Keep the first two on and the other two off unless checking the shade | HELP/studio/section/on-the-roof.mdx:16 |

### 4.6 Sun view: the shade map

| Item | Value | Source |
|---|---|---|
| What is coloured | Every position of the layout, also those the chosen option does not use, by its near shading over the year from the design run (`shading.near_pct_by_module`); the horizon is not in it | WEB/lib/scene/shade-map.ts:1-4, 42-52; HELP/studio/section/shade-map.mdx:16; API/services/design.py:101-106 |
| Scale | From 0 to the first of 1, 2, 5, 10, 20, 50, 100 % that holds the largest loss, in five equal steps of one hue | WEB/lib/scene/shade-map.ts:8-22 |
| When it waits | Until the run is of the layout shown (its edit not older, the same number of positions) nothing is coloured and the legend reads "Waits for the run" with a ring | WEB/lib/scene/shade-map.ts:42-52, 65-71; WEB/components/studio/ShadeLegend.tsx:45-50 |
| Stage legend | Title "Near shading over the year", five swatches, marks `0 … {top} %`, foot `Of all {n} positions`. Phone: only the two end marks, no foot. Desktop/tablet: 12 over the timeline at the left; phone: the stage's bottom left | WEB/components/studio/ShadeLegend.tsx:15-53; WEB/lib/scene/shade-map.ts:68-76; WEB/components/studio/Stage.tsx:65-66, 160 |
| **Shade map** section (? disc → studio.section.shade-map) | Line: `Loss to rows and obstacles over the year, on all {n} positions. Select a module for its value.` ("Tap" on tablet and phone), or "Waits for the run". Then one row per step: swatch, `{a} to {b} %`, `{count} position` / `positions` | WEB/components/studio/SunShading.tsx:59-98 |
| A module selected (shade map on) | Callout title `Position {n} · row {r}` (`unit {r}` on an east-west roof); detail `Near shading {x.xx} % over the year`, then with an option ` · string S{k}, {y.yy} %` (the string's shading) or ` · not used by option {L}` | WEB/lib/scene/shade-map.ts:54-61; WEB/components/studio/Callout.tsx:55-58, 98-99 |
| The string's figure in that callout | `shade_pct`: the string's beam-weighted electrical loss over the year, Σ(E·B)/ΣB × 100 | API/convert.py:241; CORE/simulation.py:421 |
| Strings coloured instead | The shade map's colours win over the strings' colours | WEB/components/scene/use-strings.ts:30-43 |
| Demo | Top 5 %: steps 0–1, 1–2, 2–3, 3–4, 4–5 % hold 778, 8, 2, 2 and 0 of 790 positions; largest 3.57 % | headless run of the demo with WEB/lib/scene/shade-map.ts |

### 4.7 Sun view: Shade over the year (the card, the chip, the sheet)

| Item | Value | Source |
|---|---|---|
| Desktop: the card | On the stage under the title at the left, 320 wide, from under the title to over the timeline, scrolling inside when longer; holds **Shade over the year**, **On the roof**, **Shade map** (when on) and **Day**; a × at its top right named "Close Shade over the year" | WEB/components/studio/ShadeCard.tsx:12-51; WEB/components/studio/Stage.tsx:156-157 |
| Desktop: the chip | × folds the card to a chip in its place: "Shade over the year", the three losses added `{x.xx} %` (none until there is a chosen option), a chevron; a press opens the card again. The arc and the timeline stay | WEB/components/studio/ShadeCard.tsx:17-43; WEB/lib/studio/sun-figures.ts:33-37, 52 |
| Open or folded | Remembered on this device (key `sun.card` in `rooftop.sections-open`), open at first | WEB/components/studio/ShadeCard.tsx:24; WEB/components/shell/use-section-open.ts:29-40; WEB/lib/device/progression.ts:11, 71-83 |
| Tablet and phone | No card: the same content is the work column (tablet) / the sheet (phone) while the Sun view is on | WEB/components/studio/Studio.tsx:101-105; plan/README.md:146 (D109) |
| Section heading | **Shade over the year** (? disc → studio.section.shade-over-the-year), line "The energy lost to shade, by its cause." | WEB/components/studio/SunShading.tsx:32-42 |
| Tiles | **Rows and obstacles** (near shading) %, **Strings** (string shading loss, electrical) %, **Horizon** (horizon shading) %, **Area kept clear** m², two decimals for %, whole m² | WEB/components/studio/SunShading.tsx:43-48; WEB/lib/studio/sun-figures.ts:30-31, 41 |
| With a chosen option | The three % are the option's loss-chain steps "Near shading, linear", "Electrical shading", "Far shading, horizon", over the option's modules; line `Of the {n} modules of option {L}` | WEB/lib/studio/sun-figures.ts:25-28, 45-52; CORE/simulation.py:384-385, 392 |
| Before an option | Rows and obstacles and Horizon over all positions (`shading.near_pct`, `far_pct`); **Strings** shows why there are no options (the API's title, e.g. "No string length fits at 600 V"); line `Of all {n} positions` | WEB/lib/studio/sun-figures.ts:54-62 |
| Before any run | Skeletons in the tiles | WEB/components/studio/SunShading.tsx:16-25 |
| Area kept clear | The roof inside the edge margin that the shadows of the parapet and the obstacles cover in the shade-free hours of the design day (layout readout `keepout_area_m2`) | WEB/components/studio/ShadeCard.tsx:27; WEB/components/studio/SunShading.tsx:35; CORE/placement.py:100-101, 132, 156; HELP/studio/section/shade-over-the-year.mdx:23 |
| Horizon line (second line under the tiles) | "Horizon from PVGIS, highest {x.x}°"; "Horizon not counted: the weather for this site came without one" (PVGIS weather without its horizon); "Horizon not counted: this weather has none" (NASA POWER, a CSV file) | CORE/readouts.py:254-260; API/services/design.py:100; WEB/components/studio/SunShading.tsx:49-54 |
| Demo (option A) | Rows and obstacles 0.33 %, Strings 0.56 %, Horizon 0.04 %, Area kept clear 150 m²; "Of the 638 modules of option A"; "Horizon from PVGIS, highest 2.7°"; folded chip "Shade over the year 0.93 %" | headless run of the demo with WEB/lib/studio/sun-figures.ts |
| What changes it | The obstacles and their heights, the parapet, the row spacing, the chosen option, the weather; the design runs again and the card follows | HELP/studio/section/shade-over-the-year.mdx:31-33 |

### 4.8 Engine: the sun and the shading

| Item | Value | Source |
|---|---|---|
| The view's sun | Solar time, Cooper declination `23.45° · sin(360° · (284 + doy)/365)`, hour angle 15°/h from noon; azimuth clockwise from north | CORE/geometry.py:267-278 |
| Sunrise and sunset | The hours at which that model gives 0° elevation (bisection, symmetric about noon); none where the sun stays up or down | CORE/sunpath.py:1-5, 43-58 |
| The year's sun | pvlib's solar position at the middle of each weather hour (true position, not the solar-time model) | CORE/weather.py:326-328; CORE/simulation.py:85-89 |
| Near shading, rows | Analytic: the edge in front (height H above the table's lower edge, distance D) shades the table up to u* = (H − D·tanψ)/(sinβ + cosβ·tanψ), ψ the sun's profile angle; modules alike share a class | CORE/shading.py:4-6, 124-158 |
| Near shading, obstacles and parapet | Their prisms' shadows projected on the plane at each module's mid height and intersected with its footprint; sun positions binned 1° in elevation, 2.5° in azimuth | CORE/shading.py:7-9, 38, 161-223 |
| Near shading, combined | Beam fraction shaded 1 − (1 − f_row)(1 − f_obj) | CORE/shading.py:99-103 |
| Sky (diffuse) hidden | 36 sectors; each sector's highest blocking elevation h (obstacle tops sampled along their outlines every 1 m, and the horizon) removes sin²h; for modules with a row in front a Passias row-masking angle is added. The part the horizon alone hides, the same for every module, is booked as horizon shading | CORE/geometry.py:298-357; CORE/shading.py:240-244, 258 |
| Horizon shading | Beam lost while 0 < sun elevation < the horizon's elevation at its azimuth (interpolated round the circle), plus the sky the horizon hides | CORE/shading.py:246-250; CORE/shade_summary.py:3-7, 47 |
| Where the horizon comes from | PVGIS `printhorizon` for the site, fetched with the PVGIS typical year; if it fails the weather has none (and is not cached, so the next load asks again). NASA POWER and CSV weather have no horizon | CORE/weather.py:142-146, 166-180; CORE/readouts.py:254-260 |
| Weather note when PVGIS gave no horizon | "The weather for this site came without a horizon. The run leaves horizon shading out." (a note to review, "Weather · Performance") | API/services/design.py:129-134; WEB/components/shell/notes-view.ts:168 |
| String shading loss (electrical) | Per module per hour: shaded fractions under 1 % ignored; portrait loses the whole module (half-cell: halves, ⌈2f⌉/2); landscape ⌈f·n⌉/n of its bypass sections; never less than the linear loss. A string takes its weakest module's loss (max over its modules); the extra over the linear loss, weighted by the beam's share of the irradiance, comes off the string's power | CORE/shading.py:10-13, 106-121; CORE/simulation.py:225-226, 334-339 |
| The three percentages' bases | Horizon: % of the irradiation in plane; Rows and obstacles: % of what passes the horizon; Strings: % of the energy after the temperature step. The chip adds them as shown | CORE/simulation.py:381-406; CORE/shade_summary.py:46-54; WEB/lib/studio/sun-figures.ts:33-37 |
| Shade map values | Per position: irradiation lost to near shading, % of what passes the horizon | CORE/shade_summary.py:20-24, 46-51 |
| Area kept clear (layout) | Union of the parapet's and obstacles' shadows on the plane of the modules' lower edge (clearance), every 15 min across the shade-free hours of the design day; modules are kept out of it unless **Allow shaded positions** is on | CORE/geometry.py:281-295; CORE/placement.py:150-159 |

### 4.9 Strings step: head, primary, state

| Item | Value | Source |
|---|---|---|
| Address | `/studio/strings`; page title `Strings · SolarLayout Rooftop` | WEB/lib/routes.ts:50; WEB/app/(workspaces)/studio/[lens]/page.tsx:11-14 |
| Step head | "Check the strings" / "How the modules are wired to the inverter." | WEB/components/studio/step-heads.ts:16-17 |
| Tooltip and first-meeting line of the word | "How the modules are wired to the inverter." | WEB/lib/words/explain.ts:8, 23; WEB/components/shell/StepNav.tsx:58 |
| Camera | Entering the step from 3D puts the camera in Plan; leaving takes it back to 3D when the step put it there | WEB/lib/stores/view-store.ts:147-157 |
| Primary | **Continue to Performance**, with "Next: Performance, the energy the design makes in a year, and where it is lost." under it until Performance has been opened once (not on phone) | WEB/components/studio/Studio.tsx:43-72; WEB/lib/words/explain.ts:9, 26-29 |
| Primary when no string length fits and a higher voltage fits | **Use {V} V** (e.g. **Use 1000 V**), line "Check first that the site's code allows it."; pressing it sets the voltage as the user's | WEB/components/studio/Studio.tsx:50-62; WEB/lib/errors/problem-of.ts:88 |
| State in the progression | "needs you" when the run has no options, or a note leads to the Strings step (the chosen option outside the DC/AC target); the work column is shown again on desktop when the step needs the user | WEB/lib/flow/steps.ts:15-17, 54-62, 70-78; WEB/components/studio/Studio.tsx:116; WEB/components/shell/notes-view.ts:145-157 |
| Order of the work column | (Problem if no length fits) · ("Sizing the strings · a few seconds") · phone: colour switch and legend · **Options** with Add your own option and How the options are made · **Inverter** · **System voltage** · **MPPT loading** · **Sizing temperatures** · **Inverter limits and cabling** | WEB/components/studio/StringsInspector.tsx:114-205 |
| Summary rows (name, facts, who set it) | **Inverter** `{model} · {kW} kW · {n} MPPT`, Default/Yours; **System voltage** `{V} V`, `Set for {country}` / Default / Yours, open the first time; **MPPT loading** (with options only); **Sizing temperatures** `{tmin} to {tmax} °C`, From the weather / Yours; **Inverter limits and cabling** `{x.x} A · {m} m` / `not known · {m} m`, Default / Yours | WEB/components/studio/StringsInspector.tsx:159-203; WEB/lib/studio/inverter-card.ts:68-69; WEB/lib/studio/sizing-fields.ts:69-75; WEB/lib/studio/inverter-fields.ts:54-78; WEB/components/shell/SummaryRow.tsx:29-62 |
| ? discs | Options, Modules per string (bar only), Inverter, System voltage, MPPT loading. None on Sizing temperatures, Inverter limits and cabling | WEB/components/studio/StringOptions.tsx:151, 174, 194; WEB/components/studio/SeriesRange.tsx:29; WEB/components/studio/StringsInspector.tsx:159, 172, 182, 190, 193 |
| Rows open or closed | Remembered on the device by id (`strings.inverter`, `strings.voltage`, `strings.mppt`, `strings.sizing`, `strings.limits`) | WEB/components/shell/use-section-open.ts:29-40; WEB/components/studio/StringsInspector.tsx:159-193 |
| Line under the title (desktop) | `{n} strings of {s} modules · {k} inverter(s), {m} MPPT[ each] · {u} positions not used` (or "all positions used"); without options `{n} positions ready · no strings yet / no string length fits / too few for a string`; first run `{n} positions · sizing the strings`. Demo: "22 strings of 29 modules · 1 inverter, 6 MPPT · 152 positions not used" | WEB/components/studio/stage-view.ts:31-63; WEB/components/studio/Stage.tsx:96-106 |

### 4.10 Strings step: options

| Item | Value | Source |
|---|---|---|
| Section | **Options** (? disc), a radio group of cards, best first | WEB/components/studio/StringOptions.tsx:116-167 |
| A card | Letter (A…E; your own takes the next letter), caption, facts `{series} × {strings} · {kWp 2 dp} kWp` plus ` · {k} inverters` when more than one, the energy of year 1 `{x.x}` MWh, a mark (tick or exclamation mark, never a cross) | WEB/components/studio/StringOptions.tsx:27-53; WEB/lib/studio/option-cards.ts:36-53; WEB/components/ui/StatusMark.tsx:4-5 |
| Captions (engine) | `Recommended` (first option, in target); `Your own option`; outside the target the note capitalised: `Below target`, `Above target`, `Heavy clipping` (the engine adds `, {k} inverters`, the card drops it as the facts say it); `Fills the inverter` / `Fills the inverters` (strings = inverters × strings per inverter); `Less clipping` (less clipping than the recommended); otherwise none, and the card says `Option {L}` | CORE/readouts.py:147-165; WEB/lib/studio/option-cards.ts:27-31 |
| "Least clipping" | Not produced anywhere in the code | grep of apps/web, apps/api: no match |
| Mark's words (screen reader) | "In target"; "Below the DC/AC target" / "Above the DC/AC target" / "Heavy clipping"; in target but an MPPT over its limit or a limit not known: "MPPT current over its limit, or the limit not known" | WEB/lib/studio/option-cards.ts:33-48; WEB/components/shell/notes-view.ts:95-99 |
| Choosing | A press, or the arrow keys between cards (focus follows). Nothing runs again: the run's answer holds every option | WEB/components/studio/StringOptions.tsx:134-140; WEB/components/studio/StringsInspector.tsx:103-106; WEB/lib/flow/edit-parts.ts:11-17; WEB/lib/flow/design-flow.ts:365-368 |
| Options outside the target | Folded under one line with an exclamation mark, `{n} more, below the DC/AC target` (or `above`, or `outside` for a mix), a chevron; open from the start when the chosen one is among them; when every option misses, none is folded | WEB/components/studio/StringOptions.tsx:124-130, 156-163; WEB/lib/studio/option-cards.ts:55-61 |
| Chosen card, fits line | Under it: tick and `{n} modules per string fits at {V} V`, or exclamation mark and `{n} modules per string at {V} V` when the option misses the target or an MPPT limit; **Why** with a chevron opens the proof (4.11) | WEB/components/studio/StringOptions.tsx:81-106; WEB/lib/studio/fit-proof.ts:26-33 |
| While a newer run is on its way | The options and the MPPT table stand dimmed | WEB/components/studio/StringsInspector.tsx:55-56, 150, 183 |
| First run, nothing before | "Sizing the strings · a few seconds" with a ring, and **Options** with three breathing blocks where the cards will be | WEB/components/studio/StringsInspector.tsx:70-71, 131-141; WEB/components/studio/StringOptions.tsx:169-182 |
| A saved choice the run no longer holds | The first option is shown and chosen; a toast "Your stringing no longer fits. Option {L} is used." with **Undo** and **Choose another** (to the Strings step) | CORE/project.py:340-343; WEB/lib/flow/choice-gone.ts:25-41; WEB/components/shell/use-says-choice-gone.ts:9-38 |
| Chosen option outside the target | A note to review: title "Below the DC/AC target" (etc.), the verdict's detail, "Option {L} · Strings step" | WEB/components/shell/notes-view.ts:145-157 |
| Demo at 1500 V | A Recommended 29 × 22 · 357.28 kWp 617.8 MWh (chosen); B Fills the inverter 26 × 24 · 349.44 kWp 607.7; C Less clipping 28 × 22 · 344.96 kWp 602.9; D Below target 28 × 28 · 439.04 kWp · 2 inverters 785.0; E Below target 29 × 27 · 438.48 kWp · 2 inverters 784.5; folded "2 more, below the DC/AC target" | headless run of the demo |

### 4.11 Strings step: why it fits (the proof behind Why)

| Item | Value | Source |
|---|---|---|
| Heading | `Modules per string at {V} V` | WEB/lib/studio/fit-proof.ts:34 |
| Track | The lengths that fit as a band, ends `{min} at least` and `{max} at most`, a marker at the chosen length | WEB/components/studio/StringOptions.tsx:55-69; WEB/lib/studio/fit-proof.ts:35-36; WEB/lib/studio/series-bar.ts:30-50 |
| Coldest hour | "On the coldest morning, {t} °C" / `A string of {n} reaches {Voc} V, under the {limit} V limit` (or "over") | WEB/lib/studio/fit-proof.ts:37-40 |
| Hottest hour | "On the hottest afternoon, {t} °C in the cell" / `It gives {Vmp} V, over the inverter's {min} V minimum` (or "under") | WEB/lib/studio/fit-proof.ts:41-44 |
| What the two hours are | Coldest: Voc at 1000 W/m² and a cell at the year's lowest ambient; hottest: Vmp at 1000 W/m² and a cell at the highest ambient + the cell rise (any hour of the year, not literally a morning or an afternoon) | CORE/stringing.py:53-59; CORE/onediode.py:75-84 |
| Detail of an option that misses | The engine's verdict detail: `Voc at {t} °C is {x} V, limit {L} V. Vmp at a cell temperature of {t} °C is {x} V, MPPT minimum {m} V. {s} strings on {k} inverter(s), DC/AC ratio {r}[, {note}].` then a current sentence where one applies | CORE/readouts.py:54-82; WEB/components/studio/StringOptions.tsx:76 |
| Current sentences | "The inverter file (OND) gives no current limit per MPPT. Enter the datasheet's value."; or `INV-{i} · MPPT {list} carries/carry {x} A, over the limit of {L} A.` and `… has/have an Isc of {x} A, over the limit of {L} A.`; three or more MPPTs in a run as `1 to 6` | CORE/readouts.py:22, 85-145 |
| Demo A | "29 modules per string fits at 1500 V"; "14 at least" / "29 at most"; "On the coldest morning, 11.9 °C" / "A string of 29 reaches 1,480 V, under the 1500 V limit"; "On the hottest afternoon, 64.3 °C in the cell" / "It gives 1,097 V, over the inverter's 500 V minimum" | headless run with WEB/lib/studio/fit-proof.ts |

### 4.12 Strings step: how the options are made

UI: **How the options are made** with a chevron, under the cards, opens a box with three numbered lines read from the engine's note, and a line for the options that miss the target.

| Item | Value | Source |
|---|---|---|
| Line 1 | `The options in the DC/AC target, {1.10} to {1.30}, come first; those outside it come after, marked.` | WEB/lib/studio/options-rules.ts:39 |
| Line 2 | `An MPPT takes at most {p} strings: {p} strings of {Imp} A stay under {I} A.`; without a current limit `The inverter file gives no current limit per MPPT: one string for each of its {n} inputs at most, {p} per MPPT, so one inverter takes {s} strings. Enter the datasheet value of the current per MPPT.` | WEB/lib/studio/options-rules.ts:14-15, 40; CORE/readouts.py:236-246 |
| Line 3 | "The least shaded strings are used first." | WEB/lib/studio/options-rules.ts:16, 41 |
| Missed line | `{D and E} are under the target: their DC/AC ratio is {0.80}.` (one ratio, one side), else `{L} ({r}) is under the target; …` | WEB/lib/studio/options-rules.ts:20-29 |
| Engine's note (source of the numbers) | `Target DC/AC 1.10–1.30, warning above 1.40. At most {p} strings per MPPT ({p} × {Imp} A ≤ {I} A), so one inverter takes {s} strings. The run uses the least shaded strings in a row first, then those across rows.[ ! {L}: DC/AC {r}, {note}; ….]` | CORE/readouts.py:230-251 |
| Demo | "An MPPT takes at most 4 strings: 4 strings of 13.58 A stay under 65.0 A."; "D and E are under the target: their DC/AC ratio is 0.80." | headless run |
| DC/AC | strings × modules per string × module Pnom ÷ (inverters × inverter AC Pnom). Target 1.10–1.30; under 1.10 "below target"; 1.30–1.40 "above target"; over 1.40 "heavy clipping" | CORE/options.py:70-78, 112; CORE/stringing.py:27-28 |
| Lengths tried | Up to three, longest first: the one nearest the inverter's nominal MPP voltage (round(VmppNom ÷ Vmp at STC), clamped into the range; the longest when the file has none), the longest, and from the nominal up the one that places the most modules (nearest the nominal on a tie); the longest but one when two coincide. Shorter than the nominal is never tried for the fill | CORE/stringing.py:65-66, 178-190; CORE/options.py:166 |
| Strings formed | Along one row, out on the top line and back on the bottom; what rows leave at their ends runs on into the next row of the same tilt and azimuth (across rows); east-west: along one side of a unit, snaking into the same side of the next, never mixing east and west | CORE/stringing.py:99-160 |
| Strings ranked | Those within a row before those across rows; each group least shaded first (beam-weighted annual electrical loss); an option takes the first s | CORE/options.py:90-109 |
| Strings per MPPT, per inverter | Per MPPT max(1, min(⌊I limit ÷ Imp⌋, ⌊Isc limit ÷ Isc⌋)), or inputs ÷ MPPT when no current limit is known; per inverter min(MPPT × per MPPT, inputs) | CORE/stringing.py:78-86 |
| How options add inverters | For a length with `avail` strings: try k = 1 … max(⌈avail ÷ per inverter⌉, ⌊avail × string W ÷ (1.10 × AC W)⌋); each k takes s = min(avail, k × per inverter, ⌊1.30 × k × AC W ÷ string W⌋), valid when s ≥ k and DC/AC ≥ 1.10; the k with the most strings is kept; then the strings that fill those inverters; then every string on the fewest inverters that take them | CORE/options.py:129-153 |
| Simulated, sorted, kept | Each candidate simulated for a full year; in target first, then the most energy; five at most, lettered A–E; the first is Recommended only when in target; your own option after them | CORE/options.py:156-194; CORE/project.py:313-343 |

### 4.13 Strings step: your own option

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Modules per string** (focus here on open) | The design's own option, else the chosen option's, else the length the API says fits (too few positions), else the shortest that fits | The lengths that fit; hint `{min} to {max} fit` | Modules in series | WEB/components/studio/StringOptions.tsx:218-234; WEB/lib/studio/custom-fields.ts:17-39 |
| **Strings** | As above | min(inverters, held) to held, held = strings of that length the roof holds; hint `Strings of {n}: {a} to {b} fit`, or `No string of {n} fits on the roof` | Strings in parallel | WEB/lib/studio/custom-fields.ts:31-37 |
| **Inverters** | As above | 1 to min(200, strings); hint `1 to {n}` | Inverters the strings are shared among | WEB/lib/studio/custom-fields.ts:11-12, 38 |

| Item | Value | Source |
|---|---|---|
| Opening it | **Add your own option** (dashed button with a plus) under the cards, in view | WEB/components/studio/StringOptions.tsx:264-270; WEB/components/studio/StringsInspector.tsx:149-153 |
| Form | Heading "Your own option"; the three fields; the verdict; **Cancel** and **Add option** (or **Change option** when one exists) | WEB/components/studio/StringOptions.tsx:225-247, 263 |
| Verdict before Add | `Fits · {kWp} kWp · DC/AC ratio {r}`, `Under the DC/AC target · …`, `Over the DC/AC target · …` (tick or exclamation mark). Demo starting values 29/22/1: "Fits · 357.28 kWp · DC/AC ratio 1.30" | WEB/lib/studio/custom-fields.ts:67-80 |
| Add | Saves it in the design and chooses it; the design runs again; its card's caption "Your own option" | WEB/lib/studio/custom-fields.ts:42-45; CORE/readouts.py:154-155 |
| Afterwards | **Change** and **Remove** under its card; Remove brings back the run's first option when it was chosen | WEB/components/studio/StringOptions.tsx:272-295; WEB/lib/studio/custom-fields.ts:47-50 |
| Not held to the MPPT limits | The run's options never put more strings on an MPPT than the limits allow; your own option's strings are spread evenly regardless, and its card then carries the exclamation mark | CORE/options.py:222-228; CORE/stringing.py:214-230; HELP/studio/section/mppt-loading.mdx:23 |
| Refused (not simulated), card with exclamation mark | Letter, "Your own option", `{s} × {t} · {k} inverter(s)`, then the engine's title and detail: `A string of {n} does not fit at {V} V` / `At most {max} fit: Voc at {t} °C is {x} V, over the limit of {L} V. Change your option or remove it.`; `… Vmp at {t} °C is {x} V, over the inverter's MPPT maximum of {m} V. …`; `At least {min} are needed: Vmp at a cell temperature of {t} °C is {x} V, under the MPPT minimum of {m} V. …`; `{s} string(s) cannot fill {k} inverter(s)` / "Each inverter needs at least 1 string. Change your option or remove it." | WEB/lib/studio/custom-fields.ts:52-65; WEB/components/studio/StringOptions.tsx:274-285; CORE/readouts.py:168-200; CORE/options.py:207-219 (headless: 31/10/1, 10/10/1 and 29/1/2 at 1500 V give these) |
| No length fits | No option is built, your own included | CORE/project.py:313-320; HELP/studio/section/modules-per-string.mdx:40 |
| Too few positions | The API's "Too few positions for a string" stands in **Options**, and **Add your own option** under it when a length fits | WEB/components/studio/StringsInspector.tsx:145-148; WEB/lib/studio/strings-view.ts:48 |

### 4.14 Strings step: inverter

| Item | Value | Source |
|---|---|---|
| Card | An inverter drawing; the model (bold); `{maker as people know it} · {kW} kW · {n} MPPT`; `{x.x} A per MPPT[, entered] · {n} inputs`; **Change**; the file's name under the card. No current known: `Current per MPPT not in the inverter file · {n} inputs` on its own line under the rest, with an exclamation mark. Skeletons before a run | WEB/components/studio/InverterCard.tsx:30-80; WEB/lib/studio/inverter-card.ts:19-37 |
| Who set it | Default until the design holds an inverter file's text (`ond_text`), then Yours (any file read, from the library or one's own) | WEB/lib/studio/set-by.ts:50-51; WEB/lib/studio/inverter-card.ts:63-66 |
| Default inverter | The bundled `wattpower-wp-330ktl-h1.OND`, for the demo and for every new design (Find makes the project with no OND text, so the engine reads the bundled one): WP-330KTL-H1, WattPower, 275 kW (PNomConv; PMaxOUT 330 kW), 6 MPPT, 28 inputs, MPPT 500–1500 V, nominal 1080 V, VAbsMax 1500 V, IMaxDC 390 A, no IMaxMPPT → 65.0 A per MPPT. Not in the library. The default module beside it: `insolation-ina-144mhc-tf-560.PAN`, INA-144MHC-TF-560, 560 W | CORE/project.py:128-147; CORE/resources.py:9-10; API/services/roof_map.py:42-44; the OND file in CORE/samples (read); headless run; WEB/public/equipment/catalog.json (no WattPower entry) |
| Demo card | "WP-330KTL-H1" / "WattPower · 275 kW · 6 MPPT" / "65.0 A per MPPT · 28 inputs" / `wattpower-wp-330ktl-h1.OND` | headless run with WEB/lib/studio/inverter-card.ts |
| Change tooltip (desktop) | `Choose from {388} inverters, or use an inverter file (OND)` (`Choose an inverter, or use an inverter file (OND)` before the library loads) | WEB/components/studio/ChangeButton.tsx:9-18; WEB/lib/equipment/card-words.ts:5-14 |
| Picker | Dialog "Choose an inverter": search first, **Filter** (reads "Filter · on" while a slider narrows) opens **AC power** (kW), **MPPT**, **Max DC** (V) range sliders; count line `388 inverters from 8 makers, or your own inverter file (OND)`, or `{shown} of 388 inverters · Clear the filters`; on phone an **Order** list instead of the column heads | WEB/components/studio/InverterPicker.tsx:37-155; WEB/components/studio/EquipmentPicker.tsx:215-299; WEB/lib/equipment/picker.ts:150-168; library count by running makerOf on catalog.json |
| Columns | **Inverter** (model, maker under it), **AC kW**, **MPPT**, **MPPT V** (`{min}–{max}`), **Max DC V** (desktop only); opens sorted by AC power, low to high; heads sort; phone rows add `{kW} kW · {n} MPPT · {min}–{max} V` | WEB/components/studio/InverterPicker.tsx:39-46; WEB/lib/equipment/rows.ts:46-60; WEB/lib/equipment/picker.ts:85-93 |
| Search | Every word must be found in the maker (as the file says it or as people know it), the model, the file's name or the power `{kW} kW` | WEB/lib/equipment/picker.ts:15-21, 66-75 |
| Tags and marks on rows | `In this design`; `Preliminary` (27 files); a row rated under the system voltage: exclamation mark and `Up to {r} V: strings sized to {r} V, not {V} V` | WEB/components/studio/EquipmentPicker.tsx:329-363; WEB/lib/equipment/rows.ts:62-66; catalog.json |
| Using a row | Choose a row, then **Use this inverter** ("Reading" while it is read; disabled with no row, the current one, or while reading); a double click or Enter uses it | WEB/components/studio/EquipmentPicker.tsx:171-211, 329-343 |
| Your own file | Tablet and desktop: under the list "Or drop your own inverter file (OND) here" with **Choose a file**; while dragging "Let go to load the file"; while reading "Reading the file {name}". Phone: **Choose your own inverter file (OND)**. Accepts `.ond`, `.OND` | WEB/components/studio/EquipmentPicker.tsx:207-211, 407-463; WEB/components/studio/InverterPicker.tsx:37 |
| Size limit | Over 256,000 bytes refused before it is sent: `{name} is over 256 KB, larger than any module or inverter file. Choose another.`; the API reads at most 256,000 characters | WEB/lib/equipment/library-file.ts:25-31; API/schemas/limits.py:9-10 |
| Refusals | "Inverter not changed" with the reason; a file without PNomConv or VMPPMax: `{file} is not an inverter file (OND): PNomConv or VMPPMax is missing.`; in none of UTF-8, Latin-1, CP1252: "The app cannot read the file as text: it is in none of utf-8, latin-1, cp1252."; bad base64: `The content of {name} is not valid base64.`; a library file that did not load: `{file} did not load from the library. Try again. Details: HTTP {status}` | WEB/components/studio/EquipmentPicker.tsx:87-91, 271-279; CORE/io/pvsyst.py:20-27, 317-318; API/services/uploads.py:12-19; WEB/lib/equipment/library-file.ts:19-23 |
| Library states | "Loading the library" with a ring; failed: "The equipment library did not load. Details: HTTP {status}" with **Try again**; empty: `No inverter in the library matches “{q}”.` / "No inverter in the library fits these filters." + "Or choose your own inverter file (OND) below." + **Clear the search** / **Clear the filters** | WEB/components/studio/EquipmentPicker.tsx:374-405; WEB/lib/equipment/catalog.ts:87 |
| A new inverter | Its text and name go into the design, any current per MPPT entered is cleared, the design runs again; the card shows the file read until that run lands | WEB/lib/studio/inverter-card.ts:52-66; WEB/components/studio/StringsInspector.tsx:96-101 |
| What the inverter sets | MPPT window: the shortest string, and can set the longest; VAbsMax: one of the Voc limits; AC power: each option's DC/AC and so its inverters; MPPTs, inputs and current: strings per inverter | HELP/studio/section/inverter.mdx:24-26; CORE/stringing.py:53-86 |

### 4.15 Strings step: inverter limits and cabling

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Current per MPPT** (A) | Empty: the file's IMaxMPPT, else IMaxDC ÷ MPPT; detail `{x.x} A · from the inverter file` / `{x.x} A · max DC current {n} A ÷ {m} MPPT` / `not in the inverter file`; a value entered: detail "entered" and **Use the file's {x.x} A** (or **Use the file's**) | 1–2000, 1 decimal (API: > 0) | Replaces both the Imp and the Isc limit per MPPT; the run follows | WEB/components/studio/InverterLimits.tsx:28-58; WEB/lib/studio/inverter-fields.ts:12-47; CORE/project.py:179-186; API/schemas/project.py:88 |
| **AC cable per inverter** (m) | 30; detail "1 to 2000 m" | 1–2000, 2 decimals (API: ≥ 0) | The AC cable in the bill of materials | WEB/lib/studio/inverter-fields.ts:12-15, 49-52, 72-73; API/schemas/project.py:92 |

| Item | Value | Source |
|---|---|---|
| Note under the current (file's value not stated by the OND) | "Not in the OND: IMaxDC {n} A ÷ {m} MPPT. Enter the datasheet value if it differs."; or "Not in the OND, and the OND has no IMaxDC to work it out from. Enter the datasheet value." | API/services/equipment.py:9-12, 71-83; WEB/lib/studio/inverter-fields.ts:46 |
| Demo | Detail "65.0 A · max DC current 390 A ÷ 6 MPPT", note "Not in the OND: IMaxDC 390 A ÷ 6 MPPT. Enter the datasheet value if it differs."; row "65.0 A · 30 m", Default | headless run |

### 4.16 Strings step: system voltage

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **System voltage** (segmented control, fills the width; ? disc, the sheet marking the voltage with who set it) | Set for the visitor's country on a new design: 600 V in the US, PR, GU, VI, AS, MP and Canada, 1000 V elsewhere; the country from the request (`x-vercel-ip-country`), else the device's time zone, else India. The demo: 1500 V, the user's | **600 V**, **1000 V**, **1500 V** | Caps the modules in a string (with the inverter's and the module's ratings); names the DC cable in the bill of materials. A press makes it the user's; the design runs again | WEB/components/studio/SystemVoltage.tsx:9-51; WEB/lib/country/country.ts:5-29; WEB/app/country/route.ts:1-10; WEB/lib/stores/project-store.ts:50-55; WEB/lib/studio/voltage-choice.ts:4-8; CORE/demo.py:50-51; CORE/readouts.py:296-312 |

| Item | Value | Source |
|---|---|---|
| Who set it (right of the row, and the mark in the help sheet) | `Set for {country}` (the app's value, the country's own; "Set for the United States", "Set for India", "Set for Canada"); `Default` (the app's value but not the visitor's country's now); `Yours` (chosen by the user, or a file of before) | WEB/lib/studio/voltage-words.ts:82-91; WEB/lib/studio/set-by.ts:16-28; WEB/lib/country/country.ts:10-35; CORE/project.py:87-89 |
| Line under the choice (app's value only) | 600 V, the country's: `600 V, the limit for homes in {country} (NEC 690.7). Change it if the site allows more.` (e.g. "the United States"; a territory by its own name) / `… in Canada (CE Code, Section 64). …`; 600 V not the country's: `… in the United States and Canada. …`; 1000 V the country's: `1000 V, the usual limit for rooftops in {country}. Change it if the site needs another.`; not the country's: `… outside the United States and Canada. …` | WEB/lib/studio/voltage-words.ts:52-60 |
| The equipment never moves it (D88) | Strings are sized to the lowest of the system voltage, the inverter's VAbsMax (else VMPPMax) and the module's VMaxIEC (else VMaxUL, else 1000 V taken) | CORE/stringing.py:60; CORE/io/pvsyst.py:150-151, 210-211, 290; plan/README.md:125 (D88) |
| Rated under, app's value | Plain line `Strings sized to {r} V, this inverter's limit.` (or module's); `Strings sized to {r} V, the app's value for a module file without a limit.` | WEB/lib/studio/voltage-words.ts:92 |
| Rated under, user's value | Note with exclamation mark: `Strings sized to {r} V, this inverter's limit` (or `…, the app's value for this module`) / `[The module file gives no limit, so the app takes {r} V. ]Your system voltage is {V} V, and the bill of materials uses it.` and **Use {m} V**, m the highest of 600/1000/1500 at or under the rating | WEB/lib/studio/voltage-words.ts:85-100; WEB/components/studio/SystemVoltage.tsx:31-42 |
| Offer up | Rating above the voltage: `This inverter takes up to {r} V. Raise it only if the site's code allows.` (or `The module file gives no limit, so the app takes {r} V. …`) with **Use {next} V**; no length fits and a higher voltage within the rating fits: `No string length fits at {V} V. One fits at {W} V. Raise it only if the site's code allows.` with **Use {W} V**. The app never raises it | WEB/lib/studio/voltage-words.ts:62-80; WEB/components/studio/SystemVoltage.tsx:43-58 |
| Values in the help sheet | `600 V` "Strings stay at or under 600 V on the coldest morning. The app sets it in the United States, its territories and Canada."; `1000 V` "… outside …"; `1500 V` "… The app never sets it; choose it only where the site's code allows." | HELP/studio/section/system-voltage.mdx:5-8 |
| Without a voltage | Only from a project from elsewhere: the app gives every design opened without one its country's voltage. The API's words "Choose a system voltage to size the strings" / "600, 1000 or 1500 V." | WEB/lib/stores/project-store.ts:50-55; CORE/readouts.py:19-20; API/services/design.py:34-36 |
| With the default equipment (computed) | 1500 V: 14–29 fit. 1000 V: 14–19 fit, and at most 24 strings × 19 × 560 W = 255.36 kWp per 275 kW inverter (DC/AC ≤ 0.93): every option below target, none Recommended (demo roof: A–D all "Below target"). 600 V: at most 11 fit, at least 14 needed: no length fits. The DC/AC target's low end, 1.10 × 275 kW = 302.5 kWp on one inverter, takes about 540 modules (19 strings of 29 at 1500 V), so a smaller roof is below target at any voltage (a new 40 × 30 m roof at Pune, 288 positions: 1500 V A 26 × 11, DC/AC 0.58) | headless runs at 600, 1000 and 1500 V, on the demo and on a plain new design; CORE/options.py:129-153 |

### 4.17 Strings step: modules per string and sizing temperatures

| Item | Value | Source |
|---|---|---|
| How the range is worked out | Shortest = ⌈MPPT min ÷ Vmp(1000 W/m², highest ambient + cell rise)⌉; Voc limit = ⌊limit ÷ Voc(1000 W/m², lowest ambient)⌋; MPPT maximum = ⌊MPPT max ÷ Vmp(1000 W/m², lowest ambient)⌋; longest = the smaller of the two | CORE/stringing.py:4-5, 53-75 |
| Cold Voc | The module's one-diode model; with a Voc coefficient entered, Voc STC × (1 + μ/100 × (Tmin − 25)) (IEC 62548-1 Annex F) | CORE/onediode.py:75-84 |
| **Modules per string** bar (only when there are no options; ? disc) | Heading's right `{min} to {max} fit` or `None fit`; ends `{min} · MPPT minimum` and `{max} · Voc limit` (or `· MPPT maximum`; Voc limit when its cap ≤ the MPPT cap); none fitting: the two ends as ticks, the smaller at the left; under it the verdict (exclamation mark, the engine's title and detail) | WEB/components/studio/SeriesRange.tsx:15-71; WEB/components/studio/StringsInspector.tsx:142; WEB/lib/studio/series-bar.ts:28-50; API/convert.py:225 |
| Limit note (API) | `Limit {L} V: the lowest of the system's, the module's ({m} V) and the inverter's ({i} V) ratings.` (`{m} V by default, as its file gives none`) | CORE/readouts.py:216-227 |

**Sizing temperatures** (summary row, closed `{tmin} to {tmax} °C`; who set it From the weather, Yours once one is entered):

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Lowest ambient** (°C) | Empty; hint `From the weather · {t} °C`: the weather year's lowest air temperature (5 °C with no weather) | −50 to 40, 1 decimal (API −90 to 60) | Sets cold Voc and cold Vmp: the longest string | WEB/lib/studio/sizing-fields.ts:14-16, 62; CORE/weather.py:43-45; CORE/project.py:235-239; API/schemas/project.py:86 |
| **Highest ambient** (°C) | Empty; `From the weather · {t} °C` (40 °C with no weather) | 0 to 60, 1 decimal (API −90 to 70) | With the cell rise, hot Vmp: the shortest string | WEB/lib/studio/sizing-fields.ts:16, 63; CORE/weather.py:47-49; CORE/project.py:241-245; API/schemas/project.py:87 |
| **Cell rise** (°C) | Empty; `Default · {25} °C by roof type: {long name}`; 25 flat (both), 35 sloped | 0 to 60, 1 decimal (API 0 to 100) | Added to the highest ambient for the hottest cell | WEB/lib/studio/sizing-fields.ts:17, 37-38, 64; CORE/stringing.py:26; API/schemas/project.py:85 |
| **Voc coefficient** (%/°C) | Empty; `Default · {x.xxx} %/°C, computed from the module file` (the one-diode model's, whatever the PAN states) | −0.999 to −0.001, 3 decimals | Cold Voc by the datasheet's way | WEB/lib/studio/sizing-fields.ts:18, 55-60, 65; WEB/components/shell/notes-view.ts:24-26; CORE/onediode.py:86-92 |

| Item | Value | Source |
|---|---|---|
| A value entered | Hint `Yours · default {value}` with **Reset**; kept even when equal to the default; the run follows | WEB/components/studio/SizingTemperatures.tsx:11-24; WEB/components/studio/SetByHint.tsx:11-26; WEB/lib/studio/sizing-fields.ts:45-52, 77-80 |
| Voc note | Under the field while none is entered, with an exclamation mark: "Voc coefficient {x} %/°C is outside the usual −0.35 to −0.20 %/°C for crystalline silicon. Check the datasheet and enter it if it differs." (the engine's module note, minus signs made true) | WEB/lib/studio/sizing-fields.ts:40-41, 60, 65; WEB/components/studio/SizingTemperatures.tsx:17-22; CORE/onediode.py:116-117 |
| Demo | "11.9 to 39.3 °C"; From the weather 11.9 °C and 39.3 °C; "Default · 25 °C by roof type: Flat, rows facing south"; "Default · −0.164 %/°C, computed from the module file" with the note | headless run with WEB/lib/studio/sizing-fields.ts |

### 4.18 Strings step: MPPT loading

| Item | Value | Source |
|---|---|---|
| Shown when | With options, for the chosen option (summary row **MPPT loading**, ? disc) | WEB/components/studio/StringsInspector.tsx:181-187 |
| Closed row | `{4, 4, 4, 4, 3 and 3} strings · within limits` / `· over a limit` / `· a limit not known` | WEB/lib/studio/mppt-table.ts:81-90 |
| Table | Caption `Option {L}: {n} strings on {m} MPPT[ of {k} inverters], at {V} V`; one row per MPPT with strings: **MPPT** (`MPPT {j}`, `INV-{i}` under), **Strings**, **Current** (Imp and Isc, each `{x} of {limit} A`, or `{x} A` with no limit), **kWp** (2 dp) with the mark; on phone cards titled `INV-{i} · MPPT {j}` | WEB/components/studio/MpptTable.tsx:8-54; WEB/lib/studio/mppt-table.ts:36-79 |
| Marks | Tick "Fits"; exclamation mark "Over the limit" or "Limit not known" | WEB/lib/studio/mppt-table.ts:44-47 |
| Figures | Imp = strings × module Imp; Isc = strings × module Isc; kWp = strings × modules per string × module Pnom ÷ 1000; limits: IMaxMPPT (or IMaxDCMPPT), else IMaxDC ÷ MPPT; Isc: IscMaxMPPT (or ISCMax), else the Imp limit; a value entered replaces both; tolerance 1e-6 A | CORE/readouts.py:263-293; CORE/io/pvsyst.py:252-260, 295-296; CORE/project.py:183-186 |
| Sharing | The option's strings, sorted by azimuth, row and start, go to the inverters in contiguous blocks, then over each inverter's MPPTs as evenly as they go | CORE/stringing.py:214-230 |
| Limit not known | The file's note under the table and **Enter the current per MPPT** (arrow), which opens **Inverter limits and cabling** with the focus in **Current per MPPT** | WEB/components/studio/MpptTable.tsx:39-53; WEB/components/studio/StringsInspector.tsx:90-94 |
| Demo A | "Option A: 22 strings on 6 MPPT, at 1500 V"; MPPT 1–4: 4 strings, Imp "54.3 of 65.0 A", Isc "57.2 of 65.0 A", 64.96 kWp; MPPT 5–6: 3 strings, "40.7 of 65.0 A", "42.9 of 65.0 A", 48.72 kWp; all Fits | headless run with WEB/lib/studio/mppt-table.ts |

### 4.19 Strings step: strings on the roof, the legend, inverter markers

| Item | Value | Source |
|---|---|---|
| Shown when | On the Strings step while the run has a chosen option of the layout shown (also in the Sun view, where the legend is hidden); never on other steps | WEB/lib/stores/view-store.ts:212-213; WEB/components/scene/use-strings.ts:13-28 |
| **Colour the strings by** | **String** · **MPPT** · **Inverter**; MPPT at first; of the view | WEB/components/studio/StringLegend.tsx:14-38; WEB/lib/stores/view-store.ts:72, 128 |
| Colours | Six series colours in a fixed order, the seventh category the first again; by MPPT the MPPT's number within its inverter; positions the option does not use grey, "Not used" | WEB/lib/stores/string-colours.ts:16-37, 58-66 |
| Legend: where | Desktop and tablet: a bar at the stage's foot, never over the roof, the switch beside the entries; phone: the switch and a compact legend at the head of the sheet | WEB/components/studio/StringLegend.tsx:96-135; WEB/components/studio/Stage.tsx:122-137; WEB/components/studio/StringsInspector.tsx:137-138 |
| Legend: words | One entry per series colour, at most six, then "Not used" while positions are unused: by MPPT `MPPT 1` (with more than six, `MPPT 1 · 7`); by inverter `INV-1` (`INV-1 · 7`); by string the strings of the colour (`S1 · S7 · S13 · S19`); past four in a colour the first three, `…`, the last; by string also the note `By string: {n} colours in turn along the rows`; compact: lead `MPPT` / `INV` and the numbers; while the strings are not of the layout shown "Wiring the strings" with a ring | WEB/lib/scene/string-legend.ts:23-70; WEB/components/studio/StringLegend.tsx:79-94 |
| Hover and select | Hover (a device that can hover) traces a string; a press (tap) selects it; the traced or selected string white, the rest dimmed 55 % toward the stage | WEB/components/scene/Scene.tsx:95-107, 160-163; WEB/lib/stores/string-colours.ts:55-66; WEB/components/ui/design-numbers.ts:59-60 |
| String callout | `String S{n} · MPPT {j}` (`String S{n} · INV-{i}, MPPT {j}` with more than one inverter), swatch; `{m} modules · {x.x} % shaded · Voc cold {v} V · {l} m of cable` (the % the mean near shading of its modules). Demo S1: "String S1 · MPPT 1" / "29 modules · 0.0 % shaded · Voc cold 1,480 V · 132 m of cable" | WEB/lib/scene/pick.ts:92-103; WEB/components/studio/Callout.tsx:46-51, 98-99; headless run |
| Inverter markers | A box 2 m east × 1 m north × 1.2 m high with a chip `INV-{i}`, at the point of the edge-margin line nearest the middle of its strings' starts | WEB/lib/scene/inverter-markers.ts:1-23; CORE/stringing.py:231-239; API/convert.py:245-246 |
| Demo | INV-1 at 31.0 m east, 39.0 m north (the north edge-margin line) | headless run |

### 4.20 Strings step: when nothing fits, and other messages

| Message (verbatim) | When | Where | Source |
|---|---|---|---|
| "No string length fits at {V} V" / "This inverter needs at least {n} modules in a string. At {V} V a string holds at most {m}." with **Choose another inverter** (opens the picker) and **Change the sizing temperatures** (opens Sizing temperatures) | The shortest string the inverter needs is longer than the longest the voltage allows | Head of the Strings work column (exclamation mark); the step's primary becomes **Use {W} V** when a higher voltage within the rating fits | WEB/lib/errors/problem-of.ts:72-90; WEB/components/studio/StringsInspector.tsx:116-130; WEB/components/ui/Problem.tsx:20-76 |
| Bar: "None fit", ends `{max} · Voc limit` and `{min} · MPPT minimum`; verdict "No string length fits at {V} V" / "A string needs at least {n} modules for the inverter's {m} V MPPT minimum. At most {k} fit under {L} V." (or "fit the inverter's {x} V MPPT maximum") | The same | **Modules per string** in place of the options | WEB/components/studio/SeriesRange.tsx:22-71; CORE/stringing.py:67-73; CORE/readouts.py:61-62; API/services/design.py:233-234 |
| Demo at 600 V | "No string length fits at 600 V" / "This inverter needs at least 14 modules in a string. At 600 V a string holds at most 11."; offer "No string length fits at 600 V. One fits at 1000 V. Raise it only if the site's code allows." with **Use 1000 V**; primary **Use 1000 V** | Headless run | API answer + WEB word functions |
| "Too few positions for a string" / "The roof holds {n} positions, and a string takes {a} to {b} modules. A string of {s} fits. Add it as your own option." (or "No string of that length fits.") | No candidate length forms an option | **Options**, exclamation mark | API/services/design.py:238-254; WEB/components/studio/StringOptions.tsx:184-207 |
| "No module fits on this roof" / "The roof has no room for a module inside the edge margin and clear of shade. Check the outline, the edge margin and the obstacles." | Empty layout | **Options** | API/services/design.py:28-33 |
| "Sizing the strings · a few seconds" | First run on its way, nothing before | Under the step head, with a ring | WEB/components/studio/StringsInspector.tsx:131-136 |
| "Wiring the strings" | Strings not of the layout shown | Legend | WEB/components/studio/StringLegend.tsx:87-92 |
| "Your stringing no longer fits. Option {L} is used." · **Undo** · **Choose another** | An edit took the chosen stringing away | Toast | WEB/lib/flow/choice-gone.ts:38-41; WEB/components/shell/use-says-choice-gone.ts:9-38 |
| "Inverter not changed" + reason | The API refused the file | Picker | WEB/components/studio/EquipmentPicker.tsx:271-279 |
| "Current per MPPT not in the inverter file" | No IMaxMPPT, no IMaxDC, nothing entered | Inverter card, exclamation mark | WEB/lib/studio/inverter-card.ts:28 |
| Step's stage subline "… · no string length fits" / "… · too few for a string" / "… · no strings yet" | No options | Under the title (desktop) | WEB/components/studio/stage-view.ts:31-37 |

### 4.21 Saved in the design, remembered on the device, what re-runs

| Item | Value | Source |
|---|---|---|
| In the design / project file | `system_voltage`, `system_voltage_by` (app/user), `chosen_option` (key such as `29x22x1`, or `custom`), `custom` (series, strings, inverters), `t_min_override`, `t_max_override`, `cell_rise_c`, `voc_coefficient_pct`, `imax_mppt_override`, `ac_cable_m`, `ond_text`, `ond_path` | API/schemas/project.py:83-92; CORE/project.py:40-56 |
| On the device only | Shade card open or folded (`sun.card`), the work column's rows open or closed, words met (first-meeting lines), the panel hidden, the steps opened per design (the ticks, "Next:") | WEB/lib/device/progression.ts:1-11, 42-83 |
| Neither (lost on reload) | The Sun view on/off, its day and time, play, the On the roof switches, the shade map switch, the strings' colouring, the selection | WEB/lib/stores/view-store.ts:1-2, 51-92 |
| What re-runs | An edit runs the design 500 ms after it (edits close together are one run); choosing an option runs nothing; the voltage, the inverter, the sizing temperatures, the current per MPPT, the cable, your own option re-run the design (not the layout) | WEB/lib/flow/edit-parts.ts:5-42; WEB/lib/flow/design-flow.ts:356-373; WEB/components/ui/design-numbers.ts:20-21 |
| The Sun view's own requests | `/sun` for a new place or day; shadow outlines after 150 ms of still time; none for the hour | WEB/lib/flow/design-flow.ts:112-203 |

### 4.22 The help's links to the docs (these pages)

| Item | Value | Source |
|---|---|---|
| How a help topic links | `{docs home}/{page}#{anchor of the section heading}`; anchor = heading lower-cased, punctuation dropped, spaces to hyphens; docs home `https://solarlayout.app/docs/rooftop` (or the app's host's) | WEB/lib/docs/docs.ts:5-26 |
| Pages and headings the app expects | `sun` "The Sun lens": The day, The sun at the hour, On the roof, Shade map, Shading over the year, How shading is worked out. `strings` "The Strings lens": System voltage, Inverter, Modules in series, Options, MPPT loading, Strings on the roof, When something goes wrong (as the docs were at 98d8629) | WEB/lib/docs/docs.ts:1-3, 56-63 |
| Topics' targets | design-day → sun "The day"; the-sun-at-the-time → sun "The sun at the hour"; on-the-roof → sun "On the roof"; shade-map → sun "Shade map"; shade-over-the-year → sun "Shading over the year"; system-voltage → strings "System voltage"; inverter → strings "Inverter"; modules-per-string → strings "Modules in series"; options → strings "Options"; mppt-loading → strings "MPPT loading" | HELP/studio/section/*.mdx front matter (`docs:`) |

#### Known-stale (this area)

- **"Least clipping" caption.** plan/README.md:139 (D102) and plan/v2/issues/06-v2-6-the-strings-step.md:35 list `Least clipping` among the option captions. The engine has no such caption: it gives Recommended, Your own option, Below/Above target, Heavy clipping, Fills the inverter(s), Less clipping, or none (CORE/readouts.py:147-165); no file in apps/web or apps/api contains "Least clipping".
- **The time at first.** WEB/lib/stores/view-store.ts:124 says "the design day at 10:30"; the store starts at `STILL`, 12:00 (WEB/lib/stores/view-store.ts:126-128).
- **TimePill's comment** (WEB/components/studio/Time.tsx:99-103) calls it "the time on the stage of the Roof, Array and Strings lenses"; it shows only on phone in the Sun view (WEB/components/studio/Stage.tsx:158-159).
- **docs/design/information-architecture.md**: the Sun row (docs/design/information-architecture.md:46) has "Shadows or shade map, day, sun height and bearing" in the inspector (no tabs and no height/bearing tiles exist; `sunAtOf` in WEB/lib/flow/sun-time.ts:145-152 is unused); the Strings row (docs/design/information-architecture.md:47) says "modules in series" (the label is **Modules per string**); flow step 5 (docs/design/information-architecture.md:76-77) says the user chooses the system voltage and "Nothing is preselected", which D87 replaced (WEB/lib/stores/project-store.ts:50-55).
- **The help on the inverter's word**: HELP/studio/section/inverter.mdx:16 says the app's own inverter is "marked `Default`"; on the demo the row says "Yours" (product issue 2). True for a new design from Find.
- **Voice §5 example** (plan/v2/voice.md, the table under §5) gives "The module library did not load. · Try again · Details: 500"; the picker shows "The equipment library did not load. Details: HTTP {status}" in one line (WEB/lib/equipment/catalog.ts:87; WEB/components/studio/EquipmentPicker.tsx:374-383).
- **The app's docs map** (WEB/lib/docs/docs.ts:1-3, 56-63) holds the old page titles "The Sun lens" and "The Strings lens" and the headings "The sun at the hour", "Shading over the year", "Modules in series"; any heading the rewrite renames breaks the help's "In the docs" link unless the app's map changes with it.
- HELP/studio/section/options.mdx:30-34 explains the rules in its own three lines; the app's three lines differ in words (WEB/lib/studio/options-rules.ts:39-41). They do not contradict.
- Test fixture only: WEB/lib/studio/sun-figures.test.ts:14 uses the old note "Far shading: PVGIS horizon, highest 2.7°" (code: CORE/readouts.py:260).

#### Facts we do not have (this area)

- Whether the open Shade card and the shade map's stage legend overlap on desktop: by the classes the card's room ends 104 px over the stage's foot (`bottom-26`, left 24) and the legend's foot stands at the same 104 px, growing upward, at left 20, both at `z-stage-overlay` (WEB/components/studio/ShadeCard.tsx:15; WEB/components/studio/Stage.tsx:66). With the shade map on, the card holds its longest content, so an overlap at the card's lower left is likely. Not seen at runtime (the shared browser pane was not used).
- The production site's version; nothing was checked against it (the shared browser pane kept navigating).
- The exact pixel layout of the Sun view on tablet (where the timeline, the legend and the work column meet).
- How the result chip shows the run's step names ("Sizing strings and simulating the options", CORE/progress.py:15) — the chip belongs to another part.
- Whether the strings' colours in the Sun view on the Strings step (4.19) are intended; no board or decision says.
- The full module side of the equipment picker (owned by the Array part).

#### Product issues noticed (this area)

1. **The default inverter never gives an option in target at either voltage the app sets.** Re-verified by review on a plain new design (not the demo): a 40 × 30 m flat roof at Pune (18.52, 73.86), "Flat, rows facing south", every other value at the engine's default (as `from_map` makes it, API/services/roof_map.py:42-44), the bundled Pune weather (11.9 to 39.3 °C), the default module INA-144MHC-TF-560 (560 W) and the default inverter WP-330KTL-H1 (275 kW AC, 6 MPPT, 28 inputs, MPPT 500–1500 V, 65.0 A per MPPT from IMaxDC), target DC/AC 1.10–1.30. Results: **600 V** (the app's value for the US, its territories and Canada): no options, "No string length fits at 600 V" / "A string needs at least 14 modules for the inverter's 500 V MPPT minimum. At most 11 fit under 600 V." (also at −20 °C / 10 °C sizing temperatures: 13 needed, 11 fit). **1000 V** (everywhere else): A 18 × 16 × 1, DC/AC 0.59, and B 19 × 15 × 1, 0.58, both "Below target"; on a 100 × 80 m roof (1,992 positions) A–D all "Below target", the best 0.93 (19 × 24 × 1); with a lowest ambient of 25 °C, 20 fit and still 0.58. The bound is the inverter: 4 strings per MPPT × 6 = 24 strings × 19 (20) × 560 W = 255 (269) kWp per 275 kW, DC/AC ≤ 0.93 (0.98) < 1.10 (CORE/stringing.py:78-86; CORE/options.py:129-153). So no option is Recommended, the chosen option is a note to review ("Below the DC/AC target", Strings step needs you) on every new design outside North America, and every new design in North America has no option. Even at **1500 V**, which the app never sets, the 40 × 30 m roof gives only "Below target" (A 26 × 11, 0.58); one inverter needs about 540 modules (19 strings of 29) to reach 1.10. Script: /tmp/rooftop-v2/rev4/newdesign.py. Confirmed.
2. **The demo's inverter and module say "Yours".** The demo carries the bundled PAN and OND as text (API/services/demo.py:11-16), and "Yours" is any design with `ond_text` / `pan_text` (WEB/lib/studio/set-by.ts:50-51; WEB/components/studio/StringsInspector.tsx:159); the help says the app's own is "marked `Default`" (HELP/studio/section/inverter.mdx:16). A new design from Find has no OND text and says Default. Confirmed by reading.
3. **Times can read ":60".** `hourOf` rounds the minutes without carrying (WEB/lib/geometry/keepout.ts:18-22). The engine's sunrise at the demo's latitude on day 263 is 5.99549 h and its sunset on day 264 17.99549 h (re-run: CORE/sunpath.py:43-58), which read "05:60 sunrise" and "sunset 17:60" on the timeline's ticks (WEB/lib/flow/sun-time.ts:69-74), the arc's hour marks (WEB/lib/scene/sun-marks.ts:42-43) and the sun path's screen-reader line. Confirmed.
4. **Strings stay coloured without their legend in the Sun view.** On the Strings step with the Sun view on and the shade map off, the modules keep the strings' colours (WEB/lib/stores/view-store.ts:213; WEB/components/scene/use-strings.ts:34-42) but the legend is hidden (WEB/components/studio/Stage.tsx:136). Confirmed by reading.
5. **The D96 lines of the app's words are shown only for the five steps and Sun.** `FirstMeeting` is used for Roof, Array, Strings, Sun (WEB/components/studio/Stage.tsx:145), Performance and Handover, and the step tooltips use `lineOf` (WEB/components/shell/StepNav.tsx:58); the lines of Options, Your own option, Design day, To review, Project file and Present (WEB/lib/words/explain.ts:12-17) are read nowhere, and no section name has the tooltip D96 asks for (plan/README.md:133). Confirmed by grep of apps/web.
6. **Semicolons in the interface** against voice §7 (plan/v2/voice.md:197): How the options are made, line 1, and the mixed "missed" line (WEB/lib/studio/options-rules.ts:28, 39). Confirmed.
7. **A machine word in the first line** against voice §5 (plan/v2/voice.md:119, "not HTTP"): "The equipment library did not load. Details: HTTP {status}" and "{file} did not load from the library. Try again. Details: HTTP {status}" stand in one line, with no Details disclosure (WEB/lib/equipment/catalog.ts:87; WEB/lib/equipment/library-file.ts:21). Confirmed.
8. **MPPT colours repeat across inverters.** By MPPT the colour is the MPPT's number within its inverter, so INV-1 MPPT 1 and INV-2 MPPT 1 share a colour and one legend entry "MPPT 1" (WEB/lib/stores/string-colours.ts:34-37; WEB/lib/scene/string-legend.ts:62-68). Confirmed by reading; the code says it means it ("within its inverter"), so it may be by design, but the legend cannot tell the two apart.
9. **Dead paths.** `SeriesRange` renders only when the run has no options, and then always with a range, so its "Sizing the strings for {V} V" and its skeleton never show (WEB/components/studio/StringsInspector.tsx:142; WEB/components/studio/SeriesRange.tsx:53-69; WEB/lib/studio/strings-view.ts:42-49); `sunAtOf` is unused (WEB/lib/flow/sun-time.ts:145-152). Not user-facing. Confirmed.
10. **On tablet and phone the Sun view hides the step's problem.** With no length fitting, the problem and its buttons leave the column while the Sun view is on, and only the primary **Use {W} V** remains (WEB/components/studio/Studio.tsx:101-105). Confirmed by reading; may be intended.

<!-- help-map -->
<!--
No topic of the 32 in HELP is Performance's own: none has `performance` as its place, and no section of the
Performance screen carries a ? disc (WEB/lib/help/manifest.gen.ts:5-36, 42-333 lists app.*, find.*, studio.* only;
`grep "help=" WEB/components/performance` finds nothing). Topics that refer to Performance or to what it shows:

- app.section.roof-type · "Roof type" · "Choose how the modules sit: rows facing south, rows facing east and west, or flush
  on a slope." · names the `Heat loss factor (Uc)` "in Performance" and "no rear gain" on a sloped roof
  (HELP/app/section/roof-type.mdx:35) → covered by "### Performance: All 21 steps and the summary" (Uc, rear gain) and
  "### Performance: the model the run computes".
- studio.section.edges-and-access · "Edges and access" · "Set the parapet height and the strips kept free of modules at
  the edges and round obstacles." · the line `Roof albedo` … `in Performance, Assumptions`, "Press it to set it in
  Performance" (HELP/studio/section/edges-and-access.mdx:27) → covered by "### Performance: Assumptions".
- studio.section.options · "Options" · "Choose how the modules are wired to the inverter. The best option comes first." ·
  "Each option is simulated for a full year … five at most are kept" (HELP/studio/section/options.mdx:34) → covered by
  "### Performance: the Option select" and "### Performance: how a run starts and what waits".
- studio.section.shade-over-the-year · "Shade over the year" · "How much energy shade costs in a year, by its cause: rows
  and obstacles, strings, the horizon." · `Horizon not counted` when the weather brought no horizon
  (HELP/studio/section/shade-over-the-year.mdx:27) → covered by "### Performance: the Weather select and the sources".
- studio.section.modules-per-string · "Modules per string" · "How many modules one string can hold at your system voltage,
  and what limits it." · `Lowest ambient` and `Highest ambient` "come from the weather"
  (HELP/studio/section/modules-per-string.mdx:36) → touched in "### Performance: CSV weather" (a CSV without temperature).
-->

## 5. Performance

### Performance: how a run starts and what waits

| Item | Value | Source |
|---|---|---|
| No Run button | Every committed edit is followed by itself: the layout is asked for at once (only when the roof, the array or the module changed), the design run after a pause | WEB/lib/flow/design-flow.ts:1-4, 341-372; docs/design/information-architecture.md:4-5 |
| The pause | 500 ms after a committed edit; edits closer together than that make one run. What was on its way is given up (aborted) | WEB/components/ui/design-numbers.ts:20-21; WEB/lib/flow/design-flow.ts:90-97, 332-339 |
| A design just opened (new, demo, from the device, from a file) | Its run starts at once, with no pause; the results of before are cleared | WEB/lib/flow/design-flow.ts:352-359, 370-371 |
| `/performance` in a browser with no design open | Opens the design remembered as open on the device, else the demo | WEB/lib/device/opening.ts:1-4, 25-36 |
| Edits that ask for no run | Choosing an option (the run's answer holds every option) and renaming the design. Every other edit runs the design again | WEB/lib/flow/edit-parts.ts:11-17, 36-41 |
| Edits on Performance that do not lay the roof out again | Roof albedo (read by the run only), every loss, every assumption, the weather | WEB/lib/flow/edit-parts.ts:5-9, 31-40 |
| Undo and redo on Performance | ⌘ Z or Ctrl Z undoes the last committed edit, with Shift redoes it; Ctrl Y redoes too; keys typed in a field are the field's | WEB/components/shell/use-history-keys.ts:7-18; WEB/components/performance/Performance.tsx:53-54 |
| Transport | `POST /design` answers a stream of server-sent events: `progress` (the step and the fraction of the run, as each step begins), then one `result` or `error`. A project that cannot be run is refused with 422 before the stream begins | API/routers/design.py:16-28; API/services/design.py:67-83 |
| Refused before the stream | No outline, no module, an OND that cannot be read, a CSV that cannot be used, and weather that is missing (`weather_not_loaded`) | API/services/design.py:56-64, 122-126, 137-143; CORE/project.py:190-213 |
| Weather that is missing | When the run is refused with `weather_not_loaded`, the app loads the weather of the design's source for its site, puts it into the document of that edit (no step of undo) and runs again, once per edit; a second refusal is the run's failure | WEB/lib/flow/design-flow.ts:5-7, 49-51, 265-292, 310 |
| Weather kept in the design | Used again while its source is the design's and its latitude and longitude are each within 0.001° of the roof's; otherwise it must be loaded again | CORE/project.py:215-218 |
| The engine's progress steps | "Fitting modules on the roof" · "Loading {PVGIS TMY / NASA POWER / CSV file} weather" · "Computing the hourly shading of the modules" · "Applying the losses" · "Sizing strings and simulating the options". Through the API "Loading … weather" is never streamed: the API reads the design's weather before the stream begins, so the engine finds it there. **None of these words is shown by the V2 app** (Performance draws the run row only for a weather it loads itself; the chip and the Studio's first-open status say "Computing the energy") | CORE/progress.py:12-15, 28-30; CORE/project.py:268-309; API/services/design.py:63; WEB/components/performance/Performance.tsx:73-78; WEB/components/shell/UnderTheTitle.tsx:11-21 (its only uses); WEB/components/shell/result-view.ts:33; WEB/components/studio/first-open.ts:9 |
| What waits without a system voltage | The run stops after the shading: no options, no energy, nothing chosen; the answer's `no_options` is **"Choose a system voltage to size the strings"** / "600, 1000 or 1500 V." | API/routers/design.py:24-25; API/services/design.py:34-36, 230-231; CORE/readouts.py:19-20; CORE/project.py:297-310 (runtime check: the demo with no voltage gives these words) |
| In the web app a design always has a voltage | A design opened without one gets the user's country's (600 V for the US and its territories and Canada, 1000 V elsewhere), set by the app; the demo carries 1500 V, the user's | WEB/lib/stores/project-store.ts:50-55, 65-67; WEB/lib/country/country.ts:8-9, 28; CORE/demo.py:50-51 |
| The four reasons for no options, and where each leads | `no_positions` → the Roof step (**Open Roof**); `system_voltage_missing`, `no_string_length_fits`, `too_few_positions` → the Strings step (**Open Strings**) | API/services/design.py:224-235; WEB/lib/flow/no-options.ts:7-15 |
| Options simulated | Every candidate is simulated over the whole year; sorted with those in the DC/AC target first, then by energy, highest first; at most 5 kept, lettered A, B, C …; A is "Recommended" when it is in the target. The user's own option, when it can be built, is simulated after them and takes the next letter. A chosen option no longer among them gives way to the first | CORE/options.py:157, 188-193; CORE/project.py:329-337, 340-343 |
| An option chosen while a run is on its way | It is the one the run lands with | WEB/lib/flow/design-flow.ts:304-305 |
| A choice an edit took away | The document is brought to the option the run shows, with no step of undo and nothing run again; a toast says so (Strings part) | WEB/lib/flow/design-flow.ts:318-330 |

### Performance: the result chip (six states)

The result in one place of the shell, made of the same view as the old vitals (WEB/components/shell/result-view.ts:1-3).

| Item | Value | Source |
|---|---|---|
| Where it shows | At the top bar's right on desktop and phone; on tablet in the Studio alone, in a row of 56 under the stage with "{modules} modules · {kWp} kWp" at its right. **On tablet, Performance and Handover show no chip** (the top bar hides it from 640 to 1100 px and only the Studio draws the row) | WEB/components/shell/TopBar.tsx:110-114; WEB/components/studio/Studio.tsx:130-134; WEB/components/shell/result-view.ts:49-54; WEB/components/shell/use-screen-size.ts:9-10 |
| 1. Computing | Before there is any energy and no failure: a turning ring, and "Computing the energy" from tablet up (ring alone on phone). Pressed: the card says "Computing the energy" | WEB/components/shell/result-view.ts:33; WEB/components/shell/ResultChip.tsx:82-86, 125-126 |
| 2. The result | The energy of year 1, one decimal, and "MWh a year" ("a year" from desktop width only; "MWh" on tablet and phone) | WEB/components/shell/result-view.ts:19, 27; WEB/components/shell/ResultChip.tsx:36-45, 79 |
| 3. Updating | The result dimmed with a ring beside it, while a run is waiting for its pause or on its way | WEB/components/shell/ResultChip.tsx:79-80; WEB/components/shell/vitals-view.ts:112, 135 |
| 4. To review | A note mark and "{n} to review" before the result, a line between them (tablet up). On phone the figure is hidden and the chip says "{n} to review" alone | WEB/components/shell/ResultChip.tsx:33, 73-79 |
| 5. Not computed | No result to show: the note mark and "Energy not computed" (tablet up), "No energy" on phone. Also where the design has no options: the chip then says "Energy not computed" too, and its problem has the API's message as the cause (not the API's title), no remedy, and **Open Roof** or **Open Strings** | WEB/components/shell/ResultChip.tsx:30-31, 93-98; WEB/components/shell/result-view.ts:28-32; WEB/lib/errors/problem-of.ts:65-67 |
| 6. Showing the last result | A run failed while a result stands: the note mark, the last figure dimmed with "MWh", and "Showing the last result" (tablet up) | WEB/components/shell/result-view.ts:26; WEB/components/shell/vitals-view.ts:71-72; WEB/components/shell/ResultChip.tsx:87-92 |
| Screen-reader name | "Result: {figure} MWh a year" with ", {n} to review", or the state's words | WEB/components/shell/ResultChip.tsx:56, 64 |
| Pressed | A card under the chip: **The result** with a close button (**Close**); for states 5 and 6 the problem first (title, cause and remedy, **Try again** where it can help, **Details**); then the seven figures; the button "{n} to review" when notes wait; **Open Performance** (not in state 5) | WEB/components/shell/ResultChip.tsx:101-146 |
| The seven figures, in order | **Energy in year 1** ({x} MWh) · **Modules** ({used} of {positions}) · **DC capacity** ({x} kWp, 2 decimals) · **AC capacity** ({x} kW) · **DC/AC ratio** ({x}, 2 decimals) · **Performance ratio (PR)** ({x} %, 1 decimal) · **Yield** ({x} kWh/kWp, whole) | WEB/components/shell/result-view.ts:36-47; WEB/components/shell/vitals-view.ts:81-96; WEB/lib/format/vitals.ts:15-25 |
| A failed run's problem (chip, notes) | Title "Energy not computed" (nothing before) or "Energy not updated" (a result stands). Server not reached: "The server could not be reached." (or "… after your last change. The result shown is from before the change.") · "Check your connection, then try again." · **Try again** · Details "No answer". Server fault or no answer: "The server did not answer." (+ " The result shown is from before the change.") · "Try again in a moment." · Details {status}. App fault: "The app could not finish this step." · "Try again." · Details {the fault}. A refusal of the API: its own message, no remedy, no button | WEB/lib/errors/problem-of.ts:32-62 |
| The Studio's step head | A stale chip's problem stands at the head of the Studio step too, with Try again | WEB/components/studio/Studio.tsx:109 |
| Notes to review that are Performance's | The weather's notes, each "Weather · Performance" with **Open Performance**; they make the Performance step "needs you" | WEB/components/shell/notes-view.ts:72, 171; WEB/lib/flow/steps.ts:69-77 |

### Performance: the screen, top to bottom (by size)

Route `/performance`, page title "Performance · SolarLayout Rooftop" (WEB/app/(workspaces)/performance/page.tsx:4). Sizes: phone under 640 px, tablet 640 to 1100, desktop from 1101 (WEB/components/shell/use-screen-size.ts:9-10).

| Item | Value | Source |
|---|---|---|
| Order | The head · the energy of year 1 with Option and Weather · the three figures · the four tabs · on phone the pinned primary | WEB/components/performance/Performance.tsx:94-143 |
| Desktop | The selects at the right of the energy, in one row, each 200 wide; the figures as three tiles; the tabs in a card | WEB/components/performance/Kpis.tsx:31, 67-68; WEB/components/performance/OptionSwitch.tsx:33; WEB/components/performance/PerformanceTabs.tsx:72 |
| Tablet | Head with Present and Continue to Handover; the selects under the energy, side by side; three tiles; the tabs without the card; no result chip | WEB/components/performance/Kpis.tsx:31, 68, 87; WEB/components/performance/PerformanceHeader.tsx:27 |
| Phone | Head with the title alone; the selects side by side under the energy, Option's value its letter alone; the figures a list; **Continue to Handover** pinned across the width over the tab bar; no Present | WEB/components/performance/PerformanceHeader.tsx:27, 37-46; WEB/components/performance/OptionSwitch.tsx:31; WEB/lib/performance/header.ts:33-34; WEB/components/performance/Kpis.tsx:99-112 |
| At the first load (no result yet) | The energy's label, skeletons for the figure and the line under it and for the three figures; no selects, no tabs | WEB/components/performance/Kpis.tsx:60-64, 117-129; WEB/lib/performance/page-view.ts:70-71; WEB/components/performance/Performance.tsx:80-90, 104 |
| A run on its way | "Updating" with a 16 px ring beside the label "Energy to the grid in year 1"; the figures, the tabs' values and bars of before stay, dimmed; labels and fields stay as they are | WEB/components/performance/Kpis.tsx:12-13, 35-40; WEB/lib/performance/page-view.ts:72-76; WEB/components/performance/EnergySteps.tsx:12-13 |
| A run that failed | Under the title, a note: "Energy not updated" · "Showing the last result ·" · **Try again** (or, with nothing before, "Energy not computed" · "There is no result yet ·" · **Try again**), the failure's message under them. The values of before stay, not dimmed. Try again runs at once | WEB/components/shell/UnderTheTitle.tsx:27-43; WEB/components/shell/vitals-view.ts:73-74; WEB/lib/performance/page-view.ts:60-68; WEB/lib/flow/design-flow.ts:386-392 |
| Before options | The energy's label alone, the Weather select (no Option select), a card with the API's title and message word for word and **Open Roof** or **Open Strings**, then Assumptions on their own (no tabs, nothing of energy) | WEB/components/performance/Performance.tsx:83-84, 105, 125-129; WEB/components/shell/NoOptionsCard.tsx:16-39 |

### Performance: the head

| Item | Value | Source |
|---|---|---|
| Title | **Performance** | WEB/components/performance/PerformanceHeader.tsx:23 |
| Its line, the first time on the device | "The energy the design makes in a year, and where it is lost." under the title, once per device (then only the step's tooltip says it) | WEB/components/performance/PerformanceHeader.tsx:24; WEB/components/shell/FirstMeeting.tsx:22-35; WEB/lib/words/explain.ts:9, 23 |
| Step tooltip (desktop) | The same line on the Performance step of the top bar | WEB/components/shell/StepNav.tsx:58; WEB/lib/words/explain.ts:9 |
| Present | A secondary button with a play icon, **Present**, to `/present`; tablet and desktop only | WEB/components/shell/TopBar.tsx:49-62; WEB/components/performance/PerformanceHeader.tsx:28 |
| The primary | **Continue to Handover** with an arrow, to Handover; at the head's right on tablet and desktop, pinned at the foot over the tab bar on phone | WEB/components/performance/PerformanceHeader.tsx:12, 27-31, 37-46 |
| No "Next:" line | Performance shows no "Next: Handover, …" line under its primary (the Studio's primaries alone have it) | WEB/components/studio/Studio.tsx:65; WEB/components/performance/PerformanceHeader.tsx:19-35 |

### Performance: the energy of year 1

| Item | Value | Source |
|---|---|---|
| Label | **Energy to the grid in year 1** (also the section's screen-reader name) | WEB/components/performance/Kpis.tsx:31, 34; WEB/lib/performance/kpis.ts:42 |
| The figure | The chosen option's energy to the grid in year 1, 1 decimal, at the display size (64 px on desktop, 48 px on tablet and phone), unit "MWh" | WEB/components/performance/Kpis.tsx:44-47; WEB/lib/format/vitals.ts:15; WEB/app/globals.css:23, 29 |
| Likely | "Likely" then the P50, "{x} MWh". It is the year-1 energy itself (P50 = E) | WEB/lib/performance/kpis.ts:26, 44; WEB/components/performance/Kpis.tsx:48-50; CORE/simulation.py:444 |
| Conservative | "Conservative (P{level})" with "{x} MWh" and what it means in years, for the highest level above 50 the design asks for: P90 "9 years in 10 at least"; P75 "3 years in 4 at least"; P95 "19 years in 20 at least" (the level and 100 reduced by their common divisor). None when no level is above 50 | WEB/lib/performance/kpis.ts:30-36, 39, 45; WEB/components/performance/Kpis.tsx:51-57 |
| Other levels | Not on the page's head; on the page every level the design asks for (P50 · P75 · P90 by default) stands only in the summary row **Energy, year 1** behind All 21 steps | CORE/export/summary.py:55 |
| Whose figures | Always the chosen option's | WEB/lib/performance/page-view.ts:44-47 |

### Performance: the Option select

| Item | Value | Source |
|---|---|---|
| Label | **Option**, above the field | WEB/components/performance/OptionSwitch.tsx:26-29 |
| Items | One per option of the run: "{letter} · {caption}" (the letter alone where the caption is empty), each with its mark | WEB/components/performance/OptionSwitch.tsx:22; WEB/lib/performance/header.ts:33-43 |
| Captions (the engine's) | "Recommended" · "Your own option" · the miss of the target capitalised, with ", {n} inverters" when more than one (e.g. "Below target, 2 inverters") · "Fills the inverter" / "Fills the inverters" · "Less clipping" · empty | CORE/readouts.py:147-165 |
| Marks | A tick "In target"; a note "{Below/Above} the DC/AC target" (or "Outside the DC/AC target"); a note "MPPT current over its limit, or the limit not known" for an option in target whose MPPT loading does not fit | WEB/lib/studio/option-cards.ts:34, 44-48; WEB/components/shell/notes-view.ts:94-99 |
| The trigger on phone | The chosen option's letter alone | WEB/components/performance/OptionSwitch.tsx:31; WEB/lib/performance/header.ts:33-34 |
| A press | Chooses at once from the run's answer; nothing runs again; undoable | WEB/components/performance/Performance.tsx:65; WEB/lib/flow/edit-parts.ts:11-12; WEB/lib/flow/design-flow.ts:367-368 |
| Before options | Not shown | WEB/components/performance/Performance.tsx:83 |

### Performance: the Weather select and the sources

| Item | Value | Source |
|---|---|---|
| Label | **Weather**, above the field | WEB/components/performance/WeatherSelect.tsx:34-36 |
| The three choices, each with its fact | **Typical year** · "From PVGIS, with the site's horizon"; **2023, measured** · "From NASA POWER, without a horizon"; **Your file** · "A CSV of hourly weather" | WEB/lib/flow/weather-source.ts:10-21 |
| The trigger's words | The design's source by that name; for a CSV the file's name ("Your file" if it has none) | WEB/lib/flow/weather-source.ts:23-27 |
| Default | Typical year (`pvgis`) | API/schemas/project.py:80; CORE/project.py:44 |
| Choosing Typical year or 2023 | The trigger says the new name at once, with a turning ring in place of the chevron; under the title a row with a turning ring: "Loading the typical year from PVGIS" or "Loading 2023's weather from NASA POWER"; "Updating" beside the energy. When the hours come, the source and its hours are one edit (undoable) and the run follows. The weather is asked for the roof's latitude and longitude | WEB/components/performance/WeatherSelect.tsx:27-45; WEB/lib/flow/weather-source.ts:34-37, 54-56; WEB/components/performance/use-weather-load.ts:50-69; WEB/components/performance/Performance.tsx:76-78, 100 |
| While a weather loads | The select cannot be opened | WEB/components/ui/Select.tsx:150-151 |
| A load that failed | Under the selects a note: **Weather not loaded** with the API's words (or "The app could not finish this step. Try again."); the weather of before stays | WEB/components/performance/WeatherSelect.tsx:19, 47-61; WEB/components/performance/use-weather-load.ts:19-23, 63-68 |
| Leaving the page | Gives a load on its way up | WEB/components/performance/use-weather-load.ts:41 |
| Choosing Your file | Opens the dialog **Load weather from a CSV** (next section); nothing changes until Use this weather | WEB/components/performance/WeatherSelect.tsx:28-31; WEB/components/performance/Performance.tsx:131-141 |
| Choosing the source already in use | Does nothing (the select only reports a different choice), so a second CSV cannot be loaded over a first without choosing another source first | WEB/components/ui/Select.tsx:157-160; WEB/components/performance/WeatherSelect.tsx:38 |
| PVGIS | PVGIS API v5.3, `/tmy` (a typical meteorological year, hourly) asked with lat, lon and JSON output only; columns G(h), Gb(n), Gd(h), T2m, WS10m; times `time(UTC)`; months placed on one calendar year (2019). The horizon from `/printhorizon` (its azimuth turned from south-based to north-based). Timeout 60 s each | CORE/weather.py:28, 135-139, 142-159, 166-177 |
| PVGIS without a horizon | If the horizon request fails the weather loads with none and is not kept in the server's cache. The run's weather note: "The weather for this site came without a horizon. The run leaves horizon shading out." | CORE/weather.py:173-179; API/services/design.py:129-134 |
| NASA POWER | Hourly point data for 2023, community RE, UTC: ALLSKY_SFC_SW_DWN, ALLSKY_SFC_SW_DNI, ALLSKY_SFC_SW_DIFF, T2M, WS10M; missing values (−999) interpolated from both sides; irradiance clipped at 0. No horizon. Timeout 120 s. The engine labels it "NASA POWER 2023" | CORE/weather.py:183-212 |
| The horizon the run counts | "Horizon from PVGIS, highest {x}°"; "Horizon not counted: the weather for this site came without one" (PVGIS without one); "Horizon not counted: this weather has none" (NASA, CSV). Shown in the Sun view's card | CORE/readouts.py:254-260; API/services/design.py:100; WEB/lib/studio/sun-figures.ts:44 |
| Server cache | Downloads kept in memory for 64 sites, keyed by source and lat/lon to 4 decimals | API/services/weather.py:12-21; CORE/weather.py:79-104, 168, 186 |
| Downloads switched off on a server | "Downloads of weather are off on this server: {PVGIS TMY / NASA POWER} was not asked. Load a CSV file, or turn downloads on." | API/services/weather.py:66-75; API/settings.py:17-20 |
| Kept in the design | The source, the CSV's name and text, and the hours themselves (`weather_json`, each value rounded to 2 decimals), so the design opens and runs offline | CORE/project.py:44-46, 60; CORE/weather.py:55-62; WEB/lib/flow/weather-source.ts:50-56 |
| Times | Every source as one table indexed by the hour's start in UTC, values taken as hourly averages; the sun placed at the middle of each hour | CORE/weather.py:2-9, 326-328 |

### Performance: CSV weather

| Item | Value | Source |
|---|---|---|
| Dialog | Title **Load weather from a CSV**; text "A year of values, hourly or more often, times in UTC. Columns: the time and the global irradiance, then beam, diffuse, air temperature and wind if you have them. The app averages rows of less than an hour into hours."; drop zone **Drop the weather file here** · "A CSV of a year's weather, 3 MB at most" · **Choose a file**; buttons **Cancel** · **Use this weather** (waits until a file is read) | WEB/lib/performance/weather-csv.ts:8-16; WEB/components/performance/WeatherCsvDialog.tsx:104-115; WEB/components/ui/FileDrop.tsx:146-154 |
| Dragging over | "Let go to load the file" · "Let go to read the file" | WEB/components/ui/FileDrop.tsx:89-96; WEB/lib/performance/weather-csv.ts:13 |
| Reading | "Reading the file" with the file's name and a ring | WEB/components/ui/FileDrop.tsx:127-135 |
| Read | The file's name and three lines: "{hours} hours · {GHI} kWh/m² on the ground" · "beam {x} · diffuse {y} kWh/m²" · "{tmin} to {tmax} °C" (1 decimal), the notes under it, **Choose another** | WEB/lib/performance/weather-csv.ts:32-38; WEB/components/performance/WeatherCsvDialog.tsx:96-123 |
| Use this weather | The source, the file's name and text and its hours in one edit; the run follows | WEB/components/performance/WeatherCsvDialog.tsx:62-67; WEB/components/performance/use-weather-load.ts:43-48 |
| File types | `.csv`, `.CSV`, `.txt` | WEB/lib/performance/weather-csv.ts:14 |
| Size limit | 3,000,000 bytes, checked before sending: "The file is over 3 MB. A year of weather is under 3 MB, even at 15-minute steps. Choose a file of one year." The API caps `csv_text` at 3,000,000 characters | WEB/lib/performance/weather-csv.ts:22-30; API/schemas/limits.py:7; API/schemas/weather.py:46 |
| A refused file | Stays in the dialog with its name and size, and a problem **This file cannot be used** with the reason in the API's words; Details "{status} · {code}" (e.g. 422 · not_a_weather_csv). A server not reached or that did not answer, or a fault of the app: **The file was not loaded** with the cause and remedy a failed run has ("The server could not be reached." · "Check your connection, then try again."; "The server did not answer." · "Try again in a moment."; "The app could not finish this step." · "Try again."), no button. An empty file is refused with the code `csv_missing`, any other refusal `not_a_weather_csv`. The weather of before stays | WEB/components/performance/WeatherCsvDialog.tsx:26-31, 69-94, 116; WEB/lib/errors/problem-of.ts:95-111; API/services/weather.py:57-63 |
| Columns (header names trimmed, any case; for each quantity the first name of its list that the file has is taken) | time: `time`, `time(utc)`, `datetime`, `date`, `timestamp`, `date/time` · GHI: `ghi`, `g(h)`, `gh`, `global_horizontal`, `allsky_sfc_sw_dwn`, `irradiance` · DNI: `dni`, `gb(n)`, `bn`, `allsky_sfc_sw_dni` · DHI: `dhi`, `gd(h)`, `dh`, `diffuse`, `allsky_sfc_sw_diff` · air temperature: `temp_air`, `t2m`, `temp`, `temperature`, `tamb`, `t_amb`, `ambient_temp` · wind: `wind_speed`, `ws10m`, `wind`, `ws`. Time and GHI required | CORE/weather.py:215-222, 235-241, 270-276 |
| Units | Irradiance W/m², air °C, wind m/s | API/schemas/weather.py:17 |
| Separator, comments | The separator is detected; lines beginning with `#` and blank lines are left out | CORE/weather.py:230-232; CORE/csv_weather.py:56-64 |
| Times | Read as `YYYYMMDD:HHMM`; if more than half fail, as any common date-time. A time without an offset is taken as UTC (the API sends no offset of its own); a time written with one (e.g. `2019-01-01 00:00+05:30`) keeps it, so the hour is placed at its true UTC time (runtime check: such a file is accepted, 8,760 hours, first index 00:00+05:30). A row's time is the start of its period | CORE/weather.py:244-250, 276-277, 291-294; CORE/csv_weather.py:30 |
| Time step | Hourly or finer: rows less than an hour apart (by the median gap) are averaged into the hour they begin in, with a note | CORE/weather.py:253-258, 291-295; CORE/csv_weather.py:164-171 |
| Without DNI or DHI (either missing) | Both worked out from GHI with the Erbs model, the sun at mid-hour for the roof's place, with a note | CORE/weather.py:286-301; CORE/csv_weather.py:150-154 |
| Without temperature / wind | 25 °C / 1 m/s taken for every hour, with a note (the strings then sized for 25 °C) | CORE/weather.py:283-284; CORE/csv_weather.py:155-163 |
| Gaps | A blank or unreadable GHI cell is refused; DNI and DHI too when both are given; gaps in some temperature rows are filled from the hours either side (noted); a gap left in any column after reading is refused; irradiance below zero is taken as 0 (noted) | CORE/csv_weather.py:98-134, 176-193; CORE/weather.py:278, 289-290, 303 |
| Length | 8,760 or 8,784 hours after averaging; anything else refused | CORE/csv_weather.py:21, 137-145 |
| Repeated hours | Refused | CORE/csv_weather.py:88-95 |
| The same checks in the run | A design whose source is a CSV is checked again from its text at every run; its notes become the run's weather notes | API/services/design.py:137-143 |
| On phone | The dialog is a bottom sheet with a handle; its actions stand under each other, the last (Use this weather) on top. A panel in the middle of the screen from tablet up | WEB/components/ui/Dialog.tsx:46, 55, 63 |

### Performance: the three figures

| Figure | Value and its words | Source |
|---|---|---|
| **System size** | DC capacity "{x} kWp" (2 decimals), words "{y} kW of inverter" (AC, whole) | WEB/lib/performance/kpis.ts:48; WEB/lib/format/vitals.ts:16-17 |
| **Yield** | "{x} kWh/kWp" (whole), words "A year, for each kWp" | WEB/lib/performance/kpis.ts:49; WEB/lib/format/vitals.ts:25 |
| **Performance ratio (PR)** | "{x} %" (1 decimal), words "Of its rated output, in this sunlight" | WEB/lib/performance/kpis.ts:50; WEB/lib/format/vitals.ts:23-24 |
| Look | Tiles (label, figure with unit, words) on tablet and desktop; on phone a list, label and words at the left, the figure at the right | WEB/components/performance/Kpis.tsx:82-115 |

### Performance: the four tabs

| Item | Value | Source |
|---|---|---|
| Tabs, in order | **By month** · **Over 25 years** · **Where the energy goes** · **Assumptions**; one view at a time; group named "The design's energy in detail" | WEB/components/performance/PerformanceTabs.tsx:7-12, 72-75 |
| Remembered | The tab opened last, on this device (localStorage `rooftop.performance-tab`); By month the first time, or when the storage refuses | WEB/components/performance/PerformanceTabs.tsx:18-43; WEB/lib/device/remembered-choice.ts:1-20 |
| Keys | ← → Home End move between tabs | WEB/components/ui/Tabs.tsx:40, 69-82 |
| All 21 steps | Opens in Where the energy goes' place; going to another tab brings back the eleven steps | WEB/components/performance/PerformanceTabs.tsx:53-64 |
| A narrow screen | The tab row scrolls sideways where the four do not fit (phone) | WEB/components/ui/Tabs.tsx:86-87 |

### Performance: By month

| Item | Value | Source |
|---|---|---|
| Title | "Energy to the grid each month of year 1"; **Chart** · **Table** at its right ("Show the months as") | WEB/components/performance/MonthlyChart.tsx:20, 86; WEB/components/performance/chart-card.tsx:14-17 |
| Chart | 12 bars from zero on an axis in MWh labelled at about four round steps (1, 2 or 5 × a power of ten), "MWh" over it; only the highest and lowest month carry their value (1 decimal) | WEB/lib/performance/month-bars.ts:43-66; WEB/lib/performance/chart-axis.ts:1-35; WEB/components/performance/chart-card.tsx:39-53 |
| Month names | Initials (J F M …) on phone and tablet, "Jan" … "Dec" on desktop | WEB/components/performance/MonthlyChart.tsx:132-139 |
| Tooltip | Hover, focus or tap: "{MWh} MWh · {kWh/kWp} kWh/kWp" over the month; Escape closes; a second tap closes | WEB/lib/performance/month-bars.ts:63-64; WEB/components/performance/MonthlyChart.tsx:66-80 |
| A month's yield | Its MWh × 1000 / DC kWp, whole | WEB/lib/performance/month-bars.ts:40-41 |
| Table | Caption "Each month of year 1, and the year"; columns **Month** · **Energy, MWh** · **Yield, kWh/kWp**; last row **Year** (the year's energy and yield) | WEB/components/performance/MonthlyChart.tsx:143-150; WEB/lib/performance/month-bars.ts:69-80 |
| Months | The year's hourly energy to the grid summed by calendar month | CORE/simulation.py:413 |

### Performance: Over 25 years

| Item | Value | Source |
|---|---|---|
| Title and line | "Energy each year"; under it "{total} MWh in all · {d} % less each year" (total whole, d 1 decimal), or "… · the same each year" at 0; **Chart** · **Table** at its right ("Show the years as"). The line reads the document's degradation, the figures the run's | WEB/components/performance/YearsChart.tsx:24, 100, 111; WEB/lib/performance/year-line.ts:55-59 |
| Chart | One line of the 25 years with a wash under it, on an MWh axis fitted to the years (not from zero) so the fall is seen; year 1's and year 25's energy at the line's ends; years 1, 5, 10, 15, 20, 25 marked under it, "Year" under them | WEB/lib/performance/year-line.ts:29-53, 61-64; WEB/components/performance/YearsChart.tsx:103-167 |
| Tooltip | A crosshair snaps to the nearest year: "{x} MWh" over "Year {n}"; the plot takes the focus, ← ↓ → ↑ move a year, Home and End go to 1 and 25, Escape closes | WEB/components/performance/YearsChart.tsx:28-29, 68-80; WEB/lib/performance/year-line.ts:66-80 |
| Table | Caption "Years 1, 5, 10, 15, 20 and 25, and the total"; columns **Year** · **Energy, MWh**; rows "Year 1", "Year 5", "Year 10", "Year 15", "Year 20", "Year 25" (1 decimal), then "Total, 25 years" (whole) | WEB/lib/performance/year-line.ts:82-95 |
| Degradation | Year n = year-1 energy × (1 − d)^(n−1), d the design's degradation (default 0.5 %/yr); set in Assumptions › Ageing | CORE/simulation.py:44, 445-446; WEB/lib/performance/degradation.ts:1-13 |
| First-year loss | No separate first-year step: year 1 is the simulated year, which already holds LID (the PAN's or 1.5 %); degradation begins in year 2 | CORE/simulation.py:342-344, 446 |
| Total | Σ of the 25 years | API/convert.py:280-281 |

### Performance: Where the energy goes

The engine's 21 rows said as eleven plain steps, each holding one or more of the engine's (by the start of their labels); its change is theirs composed, (Π(1 + pct) − 1), so the eleven compose to the engine's chain. Two columns on desktop, **Before the modules** and **In the system**, one on touch; each step's name, its change ("+9.60 %", "−2.22 %", "0.00 %" under 0.005, two decimals) and a bar on a scale of 10 % (a change of 10 % fills it), gain or loss colour; the engine's steps a step holds are the row's title (the browser's own tooltip on hover, "Far shading, horizon · Near shading, linear") (WEB/components/performance/EnergySteps.tsx:26; WEB/lib/performance/energy-steps.ts:1-5, 50-109; WEB/components/performance/EnergySteps.tsx:22-97; WEB/lib/performance/loss-chain.ts:32-36; WEB/lib/format/cascade.ts:9-12).

| Step | Engine's rows it holds | Source |
|---|---|---|
| Before the modules: **Sunlight on the tilted modules** | Transposition to plane | WEB/lib/performance/energy-steps.ts:57 |
| **Shade from rows, obstacles and the horizon** | Far shading, horizon · Near shading, linear | WEB/lib/performance/energy-steps.ts:58 |
| **Dirt on the glass (soiling)** | Soiling | WEB/lib/performance/energy-steps.ts:59 |
| **Light reflected off the glass** | IAM | WEB/lib/performance/energy-steps.ts:60 |
| **Light on the back of the modules** | Bifacial rear gain | WEB/lib/performance/energy-steps.ts:61 |
| Total: **The modules' rated output** | Array nominal energy at STC, "{x} MWh" | WEB/lib/performance/energy-steps.ts:102-106 |
| In the system: **Heat** | Temperature | WEB/lib/performance/energy-steps.ts:64 |
| **Low light and module quality** | Irradiance level · Module quality · LID · Mismatch | WEB/lib/performance/energy-steps.ts:65 |
| **Shade on a string** | Electrical shading | WEB/lib/performance/energy-steps.ts:66 |
| **Cables** | DC ohmic · AC ohmic | WEB/lib/performance/energy-steps.ts:67 |
| **Inverter** | Inverter efficiency · Inverter clipping · Night consumption | WEB/lib/performance/energy-steps.ts:68 |
| **Downtime** | Availability | WEB/lib/performance/energy-steps.ts:69 |
| Total: **To the grid** | Energy to grid, "{x} MWh" | WEB/lib/performance/energy-steps.ts:107 |
| Link | **All 21 steps** with a chevron, under the columns | WEB/components/performance/EnergySteps.tsx:91-94 |

Fields on the eleven steps (each a chip field with "%" and who set it beside it, "Default" or "Yours"; a value equal to the default at the field's decimals is the app's):

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Soiling** (on Dirt on the glass) | 2.00 % | 0–30 %, 2 decimals | The front irradiance × (1 − soiling); not the rear | WEB/lib/performance/energy-steps.ts:16-20, 59, 72; WEB/lib/performance/loss-defaults.ts:8; CORE/simulation.py:216, 246 |
| **Mismatch between modules** (on Low light and module quality) | 1.00 % | 0–10 %, 2 decimals | DC power × (1 − mismatch) | WEB/lib/performance/energy-steps.ts:16-20, 65, 72; WEB/lib/performance/loss-defaults.ts:9; CORE/simulation.py:345 |
| **Downtime** (on Downtime) | 0.50 % | 0–20 %, 2 decimals | Stored as availability = 100 − downtime; the grid energy × availability | WEB/lib/performance/energy-steps.ts:16-20, 74-78, 111-116; WEB/lib/performance/loss-defaults.ts:10; CORE/simulation.py:372 |
| Who set it | "Default" or "Yours" beside the field; no Reset on Performance | WEB/lib/performance/energy-steps.ts:80-84; WEB/lib/studio/set-by.ts:17-28; WEB/components/performance/EnergySteps.tsx:41-43 |

### Performance: All 21 steps and the summary

| Item | Value | Source |
|---|---|---|
| Head | **11 steps** with a back chevron · "All 21 steps, as the report lists them" · legend **Gain** · **Loss** · **Editable** | WEB/components/performance/LossChain.tsx:22-40, 60-69 |
| Rows, in order (the engine's words) | Global horizontal irradiation · Transposition to plane ({tilt}°) · Far shading, horizon · Near shading, linear · IAM · Soiling · Bifacial rear gain · Array nominal energy at STC · Irradiance level · Temperature · Electrical shading · Module quality · LID (or LID (PAN) while the PAN's holds) · Mismatch · DC ohmic · Inverter efficiency · Inverter clipping · Night consumption · AC ohmic · Availability · Energy to grid | CORE/simulation.py:381-409 |
| Each row | Its label, its field where the user may change it, the change against the step before (2 decimals, "+" a gain, "−" a loss, "0.00 %" under 0.005), a bar on a cascade (from the running total before to the one after, in percent of the GHI chained through; the energy rows continue from where the irradiance ended), the running total (1 decimal). Totals (GHI, nominal energy, energy to grid) carry "kWh/m²" or "MWh" and a marker | WEB/lib/performance/loss-chain.ts:32-57; WEB/lib/format/cascade.ts:1-52; WEB/components/performance/LossRow.tsx:109-144 |
| Readout | Pointer 400 ms over a row, its field's focus, or a tap: "{total} {unit} · {change}" over the label; Escape closes | WEB/lib/performance/loss-chain.ts:41-45; WEB/components/performance/use-readout.ts:27-28, 72, 91; WEB/components/ui/design-numbers.ts:5-6 |
| Under it | "Summary, as in the report": a table **Item** · **Value** (caption "Summary of the chosen option"), the engine's rows; on phone each row a card, the item its title and the value under it | WEB/components/performance/SummaryTable.tsx:12-22; WEB/lib/performance/summary.ts:32-35 |
| Summary rows, in order | **Site** ("{lat}° {N/S}, {lon}° {E/W}", 5 decimals; the number keeps its sign) · **Roof** ("{roof type's long name} · {area} m² · usable {x} m²") · **Structure** ("Fixed tilt {t}°, {n}P/L, lower edge {c} m"; "East-west {t}°, 1L back-to-back, ridge gap {g} m"; "Flush rails at the roof pitch {p}°") · **Module** ("{maker} {model} · {Wp} Wp") · **Inverter** ("{maker} {model} · {kW} kW · {n} MPPT") · **Stringing** ("{n} in series × {s} strings on {k} inverter(s)") · **DC capacity** ("{x} kWp ({n} modules)") · **AC capacity** ("{x} kW · DC/AC {r}") · **Weather** ("{engine label} · GHI {x} kWh/m² · in-plane {y} kWh/m²") · **Losses** ("Clipping {x} % · LID {y} % · uncertainty σ {z} %", LID and σ 2 decimals) · **Energy, year 1** ("P50 {x} MWh · P75 … · P90 …") · **Yield** ("{x} kWh/kWp · PR {y} % · CUF {z} % AC") · **Module area** ("{x} m² · {y} % of the roof") · **CO₂ avoided** ("{x} t/yr at {f} t/MWh") | CORE/export/summary.py:14-62; CORE/readouts.py:23, 315-324 |
| Weather's label in the summary | The engine's: "PVGIS TMY", "NASA POWER 2023", or the CSV file's name (not the select's plain names) | CORE/weather.py:159, 210, 304; CORE/export/summary.py:53 |

Fields in the 21 steps (LID and Uc are empty while their default holds and say it inside themselves; every other field shows its value; a chain field has no Default/Yours words):

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Soiling** | 2.0 % | 0–30 %, 1 decimal | As above (the same value as the eleven steps' Soiling) | WEB/lib/performance/loss-fields.ts:15-16, 62-63; CORE/simulation.py:37 |
| **Bifacial rear gain** (switch) | On | On/off. Cannot be used with a module that is not bifacial: "The module is not bifacial: no rear gain."; nor on a Sloped roof: "Flush modules lie on the roof: no rear gain." | Adds the rear irradiance × bifaciality × (1 − rear loss) | WEB/lib/performance/loss-fields.ts:73-78, 112-116; WEB/components/performance/LossRow.tsx:52-66; CORE/simulation.py:48, 107-112, 217 |
| **Rear shading and mismatch** (under the switch) | 10.0 % | 0–50 %, 1 decimal; disabled when the switch cannot be used (a module that is not bifacial, a Sloped roof), not when it is turned off | The rear's structure shading and mismatch | WEB/lib/performance/loss-fields.ts:100-109; WEB/lib/performance/assumption-fields.ts:16; CORE/simulation.py:49 |
| **Heat loss factor (Uc)** (on Temperature) | By roof type: 29 (Tilted rows), 20 (East-west), 15 (Sloped) W/m²K, said inside the field; Uv 0, no field | 5–60 W/m²K, whole. Entered: "Roof type gives {x} W/m²K" · **Use the roof type's** | The PVsyst cell-temperature model's constant loss factor | WEB/lib/performance/loss-fields.ts:90-98; WEB/lib/performance/assumption-fields.ts:15; CORE/simulation.py:31, 45-46, 259-260; API/services/design.py:191-193 |
| **Module quality** | 0.0 % (negative is a gain) | −5 to 10 %, 1 decimal | DC power × (1 − quality) | WEB/lib/performance/loss-fields.ts:17, 64; CORE/simulation.py:39, 340 |
| **LID** / **LID (PAN)** | The module file's value (inside the field "PAN {x}" %), else "default 1.5" % | 0–10 %, 1 decimal. Entered: "Module file gives {x} %" · **Use the module file's**, or **Use the default** | DC power × (1 − LID), in every year | WEB/lib/performance/loss-fields.ts:18, 65-66, 82-88; CORE/simulation.py:32, 38, 55-58, 342-344, 394 |
| **Mismatch** | 1.0 % | 0–10 %, 1 decimal | As above (the same value) | WEB/lib/performance/loss-fields.ts:19, 67; CORE/simulation.py:40 |
| **DC ohmic** | 1.5 % at STC power | 0–10 %, 1 decimal | The share lost scales with the string's power over its STC power, capped at 2× | WEB/lib/performance/loss-fields.ts:20, 68; CORE/simulation.py:41, 347 |
| **AC ohmic** | 1.0 % at nominal AC power | 0–10 %, 1 decimal | Scaled by the inverters' load, capped at 2× | WEB/lib/performance/loss-fields.ts:21, 69; CORE/simulation.py:42, 371 |
| **Availability** | 99.5 % | 80–100 %, 1 decimal | Grid energy × availability (the eleven steps' Downtime is 100 less it) | WEB/lib/performance/loss-fields.ts:22, 70; CORE/simulation.py:43, 372 |
| Not editable | Far shading, near shading, IAM (`iam_b0` 0.05 has no field), irradiance level, electrical shading, inverter efficiency, clipping, night consumption | — | From the weather, the layout and the equipment files | CORE/simulation.py:47, 381-402; API/schemas/losses.py:26 |
| A field's corrections | Out of range: clamped, with "The highest is {max} {unit}." / "The lowest is {min} {unit}."; not a number: "Enter a number from {min} to {max} {unit}." | — | — | WEB/components/ui/number-entry.ts:44-57, 74-85 |

### Performance: Assumptions

Five summary rows (title, facts on one line, who set it at the right, a chevron), each opening its fields in place; read across in two columns on desktop (Weather, Ageing, Grid CO₂ per MWh at the left; Roof albedo, Uncertainty at the right), one column on touch. Open or closed is remembered per device (`performance.{id}`); none opens by itself; no ? disc. Shown before options too (WEB/components/performance/Assumptions.tsx:60-99; WEB/components/shell/SummaryRow.tsx:29-63; WEB/components/shell/use-section-open.ts:29-39).

| Row | Facts and who set it | Source |
|---|---|---|
| **Weather** | "{Typical year / 2023, measured / Your file} · {PVGIS / NASA POWER / the file's name} · {GHI} kWh/m² on the ground"; "Default" for Typical year, else "Yours". Opened: "{hours} hours · {tmin} to {tmax} °C · horizon up to {x}°" (or "no horizon"), the run's weather notes with a note mark, and "At the top of the page, choose the weather beside the energy." | WEB/lib/performance/assumption-rows.ts:15-25, 42, 55-59; WEB/components/performance/Assumptions.tsx:71-82 |
| **Roof albedo** | "{x} · how much light the roof reflects" (2 decimals); Default or Yours | WEB/lib/performance/assumption-rows.ts:43 |
| **Ageing** | "{d} % less each year" (1 decimal); Default or Yours | WEB/lib/performance/assumption-rows.ts:44 |
| **Uncertainty** | "{σ} % · sets Likely and Conservative", σ = √(weather² + model²), 2 decimals; Default only while both σ and the levels are the defaults | WEB/lib/performance/assumption-rows.ts:27-35, 45 |
| **Grid CO₂ per MWh** | "{f} t · India's grid" with "Set for India" while the default holds; else "{f} t", "Yours" | WEB/lib/performance/assumption-rows.ts:40, 46-51 |

| Field | Default | Range | What it does | Source |
|---|---|---|---|---|
| **Roof albedo** (Roof albedo) | 0.20 | 0.05–0.9, 2 decimals | The ground-reflected light in the transposition and the rear-side model; its one home (the Roof step shows "Roof albedo {x} · in Performance, Assumptions", a link to `/performance`) | WEB/lib/performance/assumption-fields.ts:17, 68; WEB/lib/studio/defaults.ts:15; WEB/lib/studio/roof-fields.ts:77; WEB/components/studio/RoofInspector.tsx:175-179; CORE/simulation.py:100, 110 |
| **Less each year** (Ageing) | 0.50 % | 0–3 %, 2 decimals | The degradation of Over 25 years | WEB/lib/performance/assumption-fields.ts:69; WEB/lib/performance/degradation.ts:7; CORE/simulation.py:445-446 |
| **Weather variability** (Uncertainty) | 3.0 % | 0–20 %, 1 decimal | σ of the weather year | WEB/lib/performance/assumption-fields.ts:18, 71; CORE/simulation.py:50 |
| **Model and data** (Uncertainty) | 3.0 % | 0–20 %, 1 decimal | σ of the model and its inputs | WEB/lib/performance/assumption-fields.ts:19, 72; CORE/simulation.py:51 |
| **Likely and conservative levels** (Uncertainty) | P50 · P75 · P90 | Three fields "P" + 50–99, whole; on commit sorted and each kept once (an equal one merges and its field empties) | The exceedance levels computed; the highest above 50 is Conservative | WEB/lib/performance/assumption-fields.ts:24-27, 66, 73, 89-96; WEB/components/performance/Assumptions.tsx:27-42; CORE/simulation.py:52, 444 |
| **Grid CO₂** (Grid CO₂ per MWh) | 0.716 t/MWh (India's grid, CEA) | 0–2 t/MWh, 3 decimals | CO₂ avoided = E × factor (summary row) | WEB/lib/performance/assumption-fields.ts:20, 55-56, 75; CORE/simulation.py:53, 447 |
| Hint under each field | "Default", "Yours · default {x}" or "Set for India"; no Reset | — | — | WEB/lib/performance/assumption-fields.ts:58-61; WEB/lib/studio/set-by.ts:30-31; WEB/components/performance/Assumptions.tsx:52 |

### Performance: the model the run computes

Hourly over every hour of the weather, in PVsyst's loss order (CORE/simulation.py:1-9). pvlib 0.16.1 is the locked version (apps/api/uv.lock:508-509); its defaults named below were read from that install.

| Item | Value | Source |
|---|---|---|
| Sun | pvlib solar position (NREL SPA numpy, pvlib's default method) at the middle of each hour, apparent zenith and elevation | CORE/weather.py:326-328; CORE/simulation.py:86-89 |
| Transposition | pvlib `get_total_irradiance`, Perez model (pvlib's default coefficient set, `allsitescomposite1990`), with extraterrestrial DNI, relative airmass (pvlib's default, Kasten-Young 1989) and the roof albedo; one computation per (tilt, azimuth) group (east-west has two) | CORE/simulation.py:91-101 |
| Far shading (horizon) | Beam set to zero in hours when the sun is above 0° but below the horizon line (interpolated around 360°); the share of isotropic diffuse the horizon hides (sin² of its height, averaged over 36 sectors) is booked in this row | CORE/shading.py:246-250, 258; CORE/geometry.py:339-357; CORE/simulation.py:218, 240, 250 |
| Near shading, linear | Row-to-row analytic from the profile angle; obstacle and parapet shadows projected at each module's mid-height, sun positions binned 1° elevation × 2.5° azimuth; linear loss 1 − (1 − f_row)(1 − f_obj); the diffuse each module sees reduced by obstacles (36 sectors) and, for a module with a row in front, Passias masking; a string's value is its modules' mean | CORE/shading.py:2-13, 38-40, 99-103, 236-245; CORE/simulation.py:222-226, 234, 251 |
| IAM | The PAN's IAM profile (3 points or more, interpolated), else ASHRAE with b0 0.05; diffuse at equivalent angles 59.7 − 0.1388β + 0.001497β² (sky) and 90 − 0.5788β + 0.002693β² (ground) | CORE/simulation.py:47, 72-77, 115-117 |
| Soiling | Front irradiance × (1 − soiling) | CORE/simulation.py:216, 246 |
| Bifacial rear gain | pvlib infinite sheds, isotropic, rear irradiance at GCR, pitch and the module's mid-height × PAN bifaciality × (1 − rear loss); only with the switch on, a bifacial module, a roof not Sloped, 0 < GCR < 1 | CORE/simulation.py:106-112, 217, 246 |
| Array nominal energy at STC | Σ effective irradiance / 1000 × Pnom of the string | CORE/simulation.py:328 |
| Module model | PVsyst one-diode (pvlib `calcparams_pvsyst`), IL_ref and I0_ref fitted to the PAN's Isc and Voc at STC with its Rs, Rsh, Rsh(0), Rsh exponent, Gamma and μGamma, EgRef 1.121 eV; MPP by Newton; zero power under 1 W/m². Strings operate at their modules' mean irradiance and cell temperature | CORE/onediode.py:2-8, 22, 39-69; CORE/simulation.py:257-263, 293-309 |
| Irradiance level | The one-diode power at 25 °C against nominal | CORE/simulation.py:329, 390 |
| Cell temperature | pvlib `pvsyst_cell` with Uc (by roof type or entered), Uv 0 and the module's efficiency (absorption pvlib's default, 0.9) | CORE/simulation.py:257-260 |
| Electrical shading | A shaded share under 1 % ignored; portrait: a whole module, or half of a half-cell one; landscape: one bypass substring per share; never less than the linear loss. A string runs at its weakest module: (its worst module's loss − its mean linear loss) applied to the beam's share of its irradiance | CORE/shading.py:106-121; CORE/simulation.py:226, 333-339 |
| Module quality, LID, mismatch, DC ohmic | Multiplied in that order; DC ohmic scaled by load (above) | CORE/simulation.py:340-348 |
| Inverter | Per inverter: the OND's efficiency curves by input power, interpolated by the power-weighted string voltage between curves; without curves its euro efficiency, else 97 %; zero below its threshold power; clipped at its nominal AC power; night consumption in hours with no DC input | CORE/simulation.py:124-145, 351-370 |
| AC ohmic, availability | As in the fields | CORE/simulation.py:371-372 |
| Performance ratio | E × 1000 / (kWp × in-plane irradiation), the in-plane value the transposed one before any shading, IAM, soiling or rear gain | CORE/simulation.py:411-412 |
| Yield, capacity factors | E × 1000 / kWp; CUF AC = E × 1000 / (kW AC × 8,760) × 100; CUF DC likewise with kWp | CORE/simulation.py:425-427 |
| P-values | P_x = E × (1 − z(x/100) × σ), z the normal quantile, σ = √(weather σ² + model σ²); at the defaults σ 4.24 % and P50 = E | CORE/simulation.py:443-444 |
| Years | E × (1 − d)^(n−1), n = 1 to 25 | CORE/simulation.py:445-446 |
| CO₂ | E × the grid factor, t/yr | CORE/simulation.py:447 |
| Clipping % (summary) | 1 − clipped output / inverter output | CORE/simulation.py:422 |
| Edits that do not simulate the year again | Degradation, the two σ, the levels and the CO₂ factor: the server's memo leaves them out of its key and recomputes the figures after the year | CORE/simulation.py:434-441; CORE/memo.py:46, 143-151; CORE/project.py:338-340 |
| Albedo and shading | Albedo is not part of the shading's key (only the simulation reads it) | CORE/memo.py:44 |
| API ranges | The API accepts wider ranges than the fields (percentages 0–100, quality −100 to 100, levels 1–99, Uc > 0, CO₂ ≥ 0, albedo 0–1) | API/schemas/losses.py:9-32; API/schemas/roof.py:57 |

### Performance: what is saved

| Item | Value | Source |
|---|---|---|
| In the design and its project file | Every loss (soiling, LID, quality, mismatch, DC and AC ohmic, availability, degradation, Uc, Uv, IAM b0, bifacial, rear loss, the two σ, the levels, the CO₂ factor), the roof albedo, the weather source, the CSV's name and text, the hours (`weather_json`), the chosen option, the system voltage | CORE/project.py:33-60; CORE/simulation.py:35-53 |
| On the device only | The tab opened last; which Assumptions rows are open; whether the line under the title was met | WEB/components/performance/PerformanceTabs.tsx:18-19; WEB/components/shell/use-section-open.ts:29-39; WEB/components/shell/FirstMeeting.tsx:22-33 |

### Performance: the demo's figures

The demo ("Pune demo roof", place "Pune"): a 90 × 40 m flat roof at 18.52, 73.86, roof type "Flat, rows facing south" (`flat_tilted`, two modules in tilt), a stair room, a water tank and four AC units, the bundled PVGIS TMY weather with its horizon, 1500 V the user's (CORE/demo.py:21-31, 38, 41-53; CORE/geometry.py:21-25). Fixed in the engine's test (apps/api/tests/engine/test_demo_numbers.py) and in the web's unit tests from the same answer (WEB/lib/performance/test-fixtures.ts:1-3); the rest computed at run time, confirmed by running the engine headless at c6aeb66.

| Figure | Value | Source |
|---|---|---|
| Positions, rows, tables, pitch | 790, 6, 28, 6.45 m | apps/api/tests/engine/test_demo_numbers.py:22-28 |
| Options, in order | 29x22x1 "Recommended", 26x24x1 "Fills the inverter", 28x22x1 "Less clipping", 28x28x2 and 29x27x2 "Below target, 2 inverters" | apps/api/tests/engine/test_demo_numbers.py:11, 31-32 (keys); captions at run time (CORE/readouts.py:147-165) |
| Option A | 29 in series × 22 strings × 1 inverter; 357.28 kWp; DC/AC 1.30; 638 modules of 790; 275 kW | apps/api/tests/engine/test_demo_numbers.py:35-42; run time for 638 and 275 |
| Energy to the grid in year 1 | 617.8 MWh | apps/api/tests/engine/test_demo_numbers.py:48; WEB/lib/performance/kpis.test.ts:8 |
| Likely / Conservative | 617.8 MWh / Conservative (P90) 584.2 MWh, "9 years in 10 at least"; P75 600.2 | apps/api/tests/engine/test_demo_numbers.py:13, 60-65; WEB/lib/performance/kpis.test.ts:12-13 |
| PR, yield | 86.6 %, 1,729 kWh/kWp | apps/api/tests/engine/test_demo_numbers.py:49; WEB/lib/performance/month-bars.test.ts:64 |
| Monthly, Jan–Dec | 62.0, 58.8, 68.4, 64.1, 54.9, 46.9, 31.5, 38.5, 37.5, 53.4, 53.5, 48.5 MWh (highest Mar, lowest Jul) | apps/api/tests/engine/test_demo_numbers.py:12, 52-57 |
| Over 25 years | Year 1 617.8, year 25 547.8 MWh; 14,554 MWh in all; axis 540–620 by 20 | WEB/lib/performance/year-line.test.ts:29; WEB/lib/performance/chart-axis.test.ts:16-17; total at run time |
| Eleven steps | +9.60, −0.37, −2.00, −2.22, +3.65 % → 706.4 MWh; −4.08, −1.67, −0.56, −1.70, −4.65, −0.50 % → 617.8 MWh | WEB/lib/performance/energy-steps.test.ts:20, 25, 47-48 |
| 21 steps (run time) | GHI 1,822.9 kWh/m²; Transposition to plane (15°) +9.60 % → 1,998.0; far −0.04; near −0.33; IAM −2.22; soiling −2.00; rear +3.65; nominal 706.4 MWh; irradiance level −0.48; temperature −4.08; electrical −0.56; quality 0.00; LID (PAN) −0.20; mismatch −1.00; DC ohmic −0.95; inverter efficiency −1.33; clipping −3.36; night consumption "0.00 %" (−0.003, under the 0.005 threshold); AC ohmic −0.76; availability −0.50; 617.8 MWh | WEB/lib/performance/loss-chain.test.ts:14-22; the rest at run time (re-run by the reviewer at c6aeb66, same figures) |
| Weather | Typical year · PVGIS · 1,822.9 kWh/m² on the ground; 8,760 hours · 11.9 to 39.3 °C · horizon up to 2.7° | WEB/lib/performance/test-fixtures.ts:8-20 |
| Summary (run time) | Losses "Clipping 3.4 % · LID 0.20 % · uncertainty σ 4.24 %"; Yield "1,729 kWh/kWp · PR 86.6 % · CUF 25.6 % AC"; Module area "1,646 m² · 45.7 % of the roof"; CO₂ avoided "442.4 t/yr at 0.716 t/MWh" | run time (CORE/readouts.py:315-324; CORE/export/summary.py:26-62) |
| The demo at 600 V | No options: "No string length fits at 600 V" / "A string needs at least 14 modules for the inverter's 500 V MPPT minimum. At most 11 fit under 600 V." | run time (API/services/design.py:232-234; CORE/stringing.py:67-73) |

### Performance: messages

| Where | Exact words | Source |
|---|---|---|
| Lead, updating | "Updating" | WEB/components/performance/Kpis.tsx:38 |
| Run failed (under the title) | "Energy not updated" · "Showing the last result ·" · "Try again" / "Energy not computed" · "There is no result yet ·" · "Try again"; then the failure's message | WEB/components/shell/vitals-view.ts:70-74; WEB/components/shell/UnderTheTitle.tsx:27-43 |
| Messages a failed run can carry | "The server could not be reached. Check your connection, then try again." · "The server did not answer. Try again in a moment." · "The app could not finish this step." · "The server could not finish this step. Try again." (a fault of the server inside the stream) · "The run ended before its result arrived. Try again." (the stream ended without a result) · or the API's refusal | WEB/lib/api/errors.ts:4, 31; WEB/lib/flow/design-flow.ts:53-59; API/errors.py:28; API/services/design.py:151-158; WEB/lib/api/client.ts:42, 126, 129 |
| No options | "No module fits on this roof" / "The roof has no room for a module inside the edge margin and clear of shade. Check the outline, the edge margin and the obstacles." · "Choose a system voltage to size the strings" / "600, 1000 or 1500 V." · "No string length fits at {V} V" / "A string needs at least {n} modules for the inverter's {v} V MPPT minimum. At most {m} {fit the inverter's {v} V MPPT maximum / fit under {v} V}." · "Too few positions for a string" / "The roof holds {n} position(s), and a string takes {min} to {max} modules. {A string of {k} fits. Add it as your own option. / No string of that length fits.}" | API/services/design.py:28-36, 224-253; CORE/readouts.py:19-20, 60-62; CORE/stringing.py:68-73 |
| No-options button | "Open Roof" / "Open Strings" | WEB/lib/flow/no-options.ts:11-15 |
| Weather loading | "Loading the typical year from PVGIS" · "Loading 2023's weather from NASA POWER" | WEB/lib/flow/weather-source.ts:34-37 |
| Weather not loaded (under the selects) | "Weather not loaded" + the reason | WEB/components/performance/WeatherSelect.tsx:19, 57 |
| Weather download refusals | "{PVGIS TMY / NASA POWER} has no weather for {lat}, {lon}: {the service's words}. Check the site, or choose another weather source." · "… could not be reached. Check the connection and try again, or choose another weather source." · "… answered in a form that cannot be read. Try again later, or choose another weather source." · "… failed: it answered {status}. Try again later, or choose another weather source." · "Downloads of weather are off on this server: {label} was not asked. Load a CSV file, or turn downloads on." | API/services/weather.py:13, 66-111 |
| Weather missing (engine; normally answered by the app itself) | "This project has no weather for {lat}, {lon} yet. Load the {source} weather first." / "The weather in this project is {label} for {lat}, {lon}, not for this site or source. Load the {source} weather for {lat}, {lon}." | CORE/project.py:220-227 |
| No horizon (run note) | "The weather for this site came without a horizon. The run leaves horizon shading out." | API/services/design.py:130 |
| CSV too large | "The file is over 3 MB. A year of weather is under 3 MB, even at 15-minute steps. Choose a file of one year." | WEB/lib/performance/weather-csv.ts:25 |
| CSV problem titles | "This file cannot be used" · "The file was not loaded" | WEB/lib/errors/problem-of.ts:96, 110 |
| CSV refusals (runtime-checked) | "Choose a CSV weather file." · "{file}: no column named any of {names, comma-separated}" · "{file} cannot be read as a table of hours: {reason}." · "{file} has a header and no rows of hours." · "{file}: the app cannot read the time in {n} row(s). The first is on line {L}: {value}. Write it as 2023-06-01 13:00, in UTC." · "{file}: {n} hour appears / hours appear more than once. The first is {YYYY-MM-DD HH:MM}. Keep each hour once." · "{file}: {column as the file names it} is empty in {n} row(s). The first is on line {L}. Fill the gaps in the irradiance column." (DNI/DHI: "… Fill the gaps, or leave out both beam and diffuse."; any other: "… Fill the gaps, or leave the column out.") · "{file} has {n} hours. A year has 8,760, a leap year 8,784. Give a whole year." | CORE/csv_weather.py:36-37, 46-50, 72-145; CORE/weather.py:270-274 |
| CSV notes (runtime-checked) | "{file} has no beam and diffuse irradiance. The app works them out from the global irradiance, less exactly than a measurement (Erbs model)." · "{file} has no air temperature. The app takes 25 °C for all hours and sizes the strings for 25 °C. In the Strings step, enter the site's lowest and highest ambient." · "{file} has no wind speed. The app takes 1 m/s for all hours." · "{file} gives the weather in steps of {m} minutes. The app averages the rows of each hour: the run takes one row an hour." · "{file} has irradiance below zero in {n} row(s). The app takes it as 0." · "{file} has no air temperature in {n} row(s). The app takes it from the hours on either side." | CORE/csv_weather.py:148-193 |
| File field | "Choose a file" · "Reading the file" · "Choose another" · "Let go to load the file" | WEB/components/ui/FileDrop.tsx:94, 106, 132, 153 |
| Rear gain switch notes | "The module is not bifacial: no rear gain." · "Flush modules lie on the roof: no rear gain." | WEB/lib/performance/loss-fields.ts:76-78 |
| Chain resets | "Use the roof type's" · "Use the module file's" · "Use the default" · "Roof type gives {x} W/m²K" · "Module file gives {x} %" | WEB/lib/performance/loss-fields.ts:82-98 |
| Table captions | "Each month of year 1, and the year" · "Years 1, 5, 10, 15, 20 and 25, and the total" · "Summary of the chosen option" | WEB/components/performance/MonthlyChart.tsx:144; WEB/lib/performance/year-line.ts:89; WEB/components/performance/SummaryTable.tsx:20 |

#### Known-stale (this area)
- **The browser suites describe the V1 page.** `e2e/tests/performance.e2e.ts` (and `performance-chain`, `-charts`, `-screens`, `-weather`) look for "run-line", "Energy to grid, year 1", P-value cells, the tiles PR / Specific yield / Capacity factor / In-plane / 25 years / CO₂, "Energy was not updated" · "Values are of the design before", "Open the Strings lens", the "Workspaces" navigation (e2e/tests/performance.e2e.ts:56-64, 153-168, 215, 246, 265-266, 49). The page has none of them (WEB/components/performance/*); plan/STATE.md:128 says so ("still describe the old page"). Do not use them for behaviour.
- **components.md's chain words.** docs/design/components.md:375-400 says "Eleven steps", "All 21 steps, in the engine's words", a legend "that boxed values can be changed", "Thermal Uc", "PAN gives 0.2 %", "Use the PAN's", and that only a monofacial module disables the switch. The code: "11 steps", "All 21 steps, as the report lists them", "Editable", "Heat loss factor (Uc)", "Module file gives {x} %", "Use the module file's", and a Sloped roof disables it too (WEB/components/performance/LossChain.tsx:36, 63, 66; WEB/lib/performance/loss-fields.ts:76-98).
- **components.md's chip.** docs/design/components.md:246-247 says "MWh a year" (MWh on phone); the code shows "a year" only from desktop width, so the tablet row says "MWh" too; and on phone a chip with notes hides the figure (WEB/components/shell/ResultChip.tsx:38-41, 79).
- **The IA's flow says nothing is preselected.** docs/design/information-architecture.md:76-77 ("the user chooses the system voltage … Nothing is preselected") contradicts D87 and the code, which give every design the country's voltage at open (WEB/lib/stores/project-store.ts:50-55).
- **The guidelines put the exports at Performance's head.** docs/design/guidelines.md:96 ("Present and the exports live at the heads of Performance and Handover"); Performance's head has Present and Continue to Handover only (WEB/components/performance/PerformanceHeader.tsx:27-31).
- **STATE's watch item on the run line.** plan/STATE.md:289 discusses "The Performance line of the run says 'PVGIS weather'"; V2 has no run line (WEB/components/performance/Performance.tsx:94-143).
- **The issue's example degradation.** plan/v2/issues/08-v2-8-performance.md:41 writes "0.7 % less each year"; the default is 0.5 (CORE/simulation.py:44). Its line 42 names LossChain/LossRow for the eleven steps; they are `EnergySteps` (WEB/components/performance/EnergySteps.tsx:84-97).
- **Code comments.** WEB/lib/performance/page-view.ts:13-14, 30-31 and WEB/components/shell/UnderTheTitle.tsx:6-9 describe the engine's step under the title during a run; Performance never draws it (WEB/components/performance/Performance.tsx:73-78). WEB/lib/performance/header.ts:11, 23 name the caption "Your own" and three CSV notes; the engine says "Your own option" and writes up to six CSV notes plus the no-horizon note (CORE/readouts.py:155; CORE/csv_weather.py:148-193; API/services/design.py:130). WEB/components/performance/use-weather-load.ts:28 ("A choice made while another loads gives the first up") cannot happen: the select will not open while busy (WEB/components/ui/Select.tsx:150-151).
- **Docstrings.** API/routers/weather.py:14 "A year of hourly weather" and CORE/simulation.py:2 "8,760-hour": a CSV may be finer than hourly (averaged) and 8,784 hours long (CORE/weather.py:291-295; CORE/csv_weather.py:21).
- **The old fact sheet's Performance part** (docs repo `docs/PRODUCT_FACTS.rooftop.md` §5) is entirely superseded: the run line, the six tiles, the "Stringing option" segmented control, "PVGIS TMY / NASA POWER 2023 / CSV file" select names and facts, "Thermal Uc", the CSV words and refusals, and its two issues (horizon diffuse booked in near shading; the rear-gain switch on sloped roofs) are all changed or fixed (CORE/simulation.py:250; WEB/lib/performance/loss-fields.ts:76-78, 114).
- **The help is consistent with the code** on everything it says of Performance (HELP/app/section/roof-type.mdx:35; HELP/studio/section/edges-and-access.mdx:27; HELP/studio/section/options.mdx:34); see the albedo link under Product issues.

#### Facts we do not have (this area)
- **PVGIS's database, years and horizon use.** The app sends PVGIS `/tmy` only lat, lon and the format (CORE/weather.py:172), so PVGIS's own defaults apply. Which database and year range, and whether PVGIS already applies its horizon to the TMY's irradiance by default (which would make the far-shading row count the horizon twice), are not in the code and were not checked against PVGIS.
- **Run times.** The code states none besides the 500 ms pause and the download timeouts (60 s PVGIS, 120 s NASA). The Studio's first-open line says "Shading the modules over the year. A few seconds." (WEB/components/studio/first-open.ts:9). Headless on this Mac the demo's whole run took 1.4 s; the deployed API's time is not known. The web client sets no timeout on the run.
- **Whether the page fits 1440 × 900 without scrolling** (D104's aim) was not measured; no browser was run.
- **Time strings with mixed offsets** in one CSV (some rows with an offset, some without, or two offsets): not tested. A file whose every time carries the same offset was tested and is honoured (see CSV weather, Times).
- **pvlib internals** beyond the defaults named (the Perez coefficient values, the Erbs implementation) are pvlib 0.16.1's, not this repository's.
- **Whether the bug list #238 already holds the issues below**: GitHub was not read.

#### Product issues noticed (this area)
- **A second CSV cannot be loaded directly.** With "Your file" in use, choosing "Your file" again does nothing (the select reports only a different choice), so replacing one CSV with another needs a detour through Typical year (WEB/components/ui/Select.tsx:157-160; WEB/components/performance/WeatherSelect.tsx:27-38). Verified by reading.
- **No result chip on tablet Performance and Handover.** The top bar hides the chip from 640 to 1100 px and only the Studio draws the tablet result row, so on tablet the notes' count and the stale state are not shown on those pages (WEB/components/shell/TopBar.tsx:110-114; WEB/components/studio/Studio.tsx:130-134). Verified by reading; may be intended since Performance shows the energy itself.
- **No Reset on Performance.** Its fields say "Yours · default {x}" but offer no Reset, unlike the Studio's (D97: "Yours (with the default and Reset)"); only Undo or retyping gives the default back (WEB/components/performance/Assumptions.tsx:52; WEB/components/performance/EnergySteps.tsx:30-44; WEB/components/studio/SetByHint.tsx:11-21).
- **The failed run under the title is not V2's Problem shape.** It shows "Energy not updated · Showing the last result · Try again" with the raw message under it, not the title/cause/remedy/Details of D101 that the chip uses for the same failure (WEB/components/shell/UnderTheTitle.tsx:27-43; WEB/lib/errors/problem-of.ts:42-62).
- **The albedo link lands on the remembered tab.** The Roof step's "Roof albedo {x} · in Performance, Assumptions" goes to `/performance` without opening Assumptions or its row; the help says "Press it to set it in Performance" (WEB/components/studio/RoofInspector.tsx:176; HELP/studio/section/edges-and-access.mdx:27).
- **Decimals that differ for one value.** Soiling and Mismatch take 2 decimals in the eleven steps and 1 in the 21 steps (WEB/lib/performance/energy-steps.ts:16-20; WEB/lib/performance/loss-fields.ts:15-23); degradation takes 2 decimals but its row and the chart's line say 1 ("0.3 % less each year" for 0.25) (WEB/lib/performance/assumption-rows.ts:44; WEB/lib/performance/year-line.ts:57).
- **Machine words in messages.** "{file}: no column named any of time, time(utc), …" lists internal aliases and has no full stop; "{label} failed: it answered {status}" puts a status code in the cause (CORE/weather.py:273; API/services/weather.py:106-111), against voice §5.
- **"PAN" alone inside the LID field** ("PAN 0.2") while voice §6 names it "Module file (PAN)" and lists "PAN alone" as the word not to use; the reset says "Use the module file's" (WEB/lib/performance/loss-fields.ts:86-87; plan/v2/voice.md:159).
- **"Hourly" in the CSV choice's fact.** "A CSV of hourly weather" (WEB/lib/flow/weather-source.ts:20), though the dialog rightly says "hourly or more often" (WEB/lib/performance/weather-csv.ts:10).
- **CUF on a leap-year CSV** divides by 8,760 hours even for 8,784 (CORE/simulation.py:426-427).
- **No "Next:" line** under Performance's primary, where D96 puts one under every primary until the next step has been opened (WEB/components/performance/PerformanceHeader.tsx:19-35; WEB/components/studio/Studio.tsx:65). May be the board's choice.
- **No module fits marks Strings as needing the user.** `no_positions` leads to Roof, but the step states mark Strings "needs you" whenever there are no options (WEB/lib/flow/steps.ts:76; WEB/lib/flow/no-options.ts:7-8).
- **The engine's progress fraction and steps are streamed and stored but not shown** anywhere in V2 (WEB/lib/performance/page-view.ts:55-79 computes `run`; nothing draws it). Not a fault to document; noted so that pages do not describe a progress line.
- **A weather service's failure reads differently in the chip and on the page.** When the app loads a design's weather itself and PVGIS or NASA POWER cannot be reached or fails, the API answers 502 with its words ("PVGIS TMY could not be reached. Check the connection and try again, or choose another weather source."). The note under Performance's title shows those words, but the chip's problem treats every status of 500 or more as "The server did not answer." · "Try again in a moment." (API/services/weather.py:80-93, 106-111; WEB/lib/flow/design-flow.ts:281-282; WEB/lib/errors/problem-of.ts:54-55; WEB/components/shell/UnderTheTitle.tsx:39). Verified by reading.
- **A fault inside the run's stream gets no Try again in the chip.** A server fault after the stream began, and a stream cut short, arrive with the stream's status 200 and the codes `internal_error` or `run_cut_short`, so `problemOfFailure` takes them for a refusal: their own words ("… Try again.") as the cause, no remedy, no Try again button (WEB/lib/api/client.ts:42, 126, 129; API/services/design.py:151-158; WEB/lib/errors/problem-of.ts:60-61). Performance's note under the title still has Try again. Verified by reading.
- **A southern or western site reads with a double sign in the summary.** The Site row writes the signed number and then the hemisphere: "-33.86000° S" (CORE/export/summary.py:32-35). Verified by reading.
- **With a module that is not bifacial the rear-gain switch shows the document's value** (on by default) while disabled (WEB/lib/performance/loss-fields.ts:113-115). Verified by reading; minor.

<!-- help-map -->
<!--
Help topics of this area: none. Of the 32 topics in HELP (2 app, 3 find/section, 11 find/tool, 16 studio/section) none
is about Handover, a file of Handover, the project file, opening a project file or Present (searched HELP for Handover,
handover, Present, project file, .rtd, Download). One topic touches the area in one sentence:
- find.tool.find-the-roof · "Find the roof" · summary "Search an address, paste coordinates or a maps link, then outline
  the roof on the map." · HELP/find/tool/find-the-roof.mdx:41 says a place found by its address or name gives the design
  its place's name, "The design keeps it, and Present shows it", and that coordinates, a link and `Use my location` give
  no name. Covered by ### Present: the six scenes (scene 1) and ### The project file (.rtd): what it holds (place_name).
  The code agrees (WEB/lib/outline/place-name.ts:12-26; WEB/lib/present/scene-panel.ts:58-61).
No help topic's `docs:` place points at the docs pages `handover`, `present` or `projects`; the app's map of the docs
(WEB/lib/docs/docs.ts:78-104) still lists those pages and their section headings as of docs 98d8629.
-->

## 6. Handover, the project file and Present

Verified against `rooftop-design-app` `main` at `c6aeb66` (last code change `e1faa19`, #246) on 2026-10-13. `WEB` =
`apps/web`, `API` = `apps/api/src/rooftop_api`, `CORE` = `apps/api/src/rooftop_core`, `HELP` = `apps/web/content/help`;
other paths from the repository root. Sizes: tablet is 640 px wide and up, desktop 1101 px and up, phone under 640
(WEB/app/globals.css:132-133). Runtime checks: the demo's eight files and the zip were exported headless with the repo's
own Python (`rooftop_api.services.export.export`, day 2026-10-13) and their bytes read; `POST /project/open` was called
through FastAPI's test client with seven texts. Both are cited as "headless run" below. Reviewed on 2026-10-13 against the same commit: every cited line opened, the exports' bytes re-read (the PDF's text with pypdf, the DXF with ezdxf, the KMZ, CSVs and zip directly) and `POST /project/open` re-run. The browser suites
`e2e/tests/handover*.e2e.ts`, `home*.e2e.ts` and `present.e2e.ts` describe the screens before V2 (plan/STATE.md:128) and
are not used as sources.

### Handover: reaching it, the address and the page title

| Item | Value | Source |
|---|---|---|
| Addresses | `/handover` (the list) and `/handover/<item>` (one file). `<item>` is one of `report`, `single-line-diagram`, `bill-of-materials`, `cable-schedule`, `cad-layout`, `project-file`, `hourly-data`, `earth-model`; any other is the app's not-found page | WEB/lib/routes.ts:26-35, WEB/lib/routes.ts:51, WEB/lib/routes.ts:60; WEB/app/(workspaces)/handover/[item]/page.tsx:16-19 |
| Browser tab title | **Handover · SolarLayout Rooftop** at the list; **{file name} · Handover · SolarLayout Rooftop** at a file (e.g. "Design report · Handover · SolarLayout Rooftop") | WEB/app/(workspaces)/handover/page.tsx:4; WEB/app/(workspaces)/handover/[item]/page.tsx:10-13 |
| How it is reached | The fifth step **Handover** in the top bar (tab bar on phone); **Continue to Handover**, the primary at the head of Performance (pinned over the tab bar on phone) | WEB/lib/flow/steps.ts:10, WEB/lib/flow/steps.ts:33-36; WEB/components/performance/PerformanceHeader.tsx:12, WEB/components/performance/PerformanceHeader.tsx:29-31, WEB/components/performance/PerformanceHeader.tsx:38-45 |
| The step's tooltip and first-meeting line | "The files for the client, the installer and the utility." Under the page title **Handover** the first time the word is met on this device, then not again (remembered in the browser's storage) | WEB/lib/words/explain.ts:10, WEB/lib/words/explain.ts:23; WEB/components/shell/StepNav.tsx:58; WEB/components/shell/FirstMeeting.tsx:26-35; WEB/components/handover/HandoverHead.tsx:50-51 |
| The step's mark | Handover is the last step: it is never "done" (done means gone past). It shows its number unless something waits there | WEB/lib/flow/steps.ts:56-63 |
| With no design open | Handover, like every workspace, opens the design remembered as open on this device, else the demo; a kept design that cannot be read opens the demo and says so in a toast ("{the device's words} The demo is open instead.") | WEB/components/shell/use-opens-what-belongs.ts:9-25; WEB/lib/device/opening.ts:16-35 |
| Keys | ⌘ Z or Ctrl Z undoes, with Shift or Ctrl Y redoes, the page's edits (the project name) | WEB/components/handover/Handover.tsx:79-80; WEB/components/shell/use-history-keys.ts:14-18 |

### Handover: the head (title, Present, Download all)

| Item | Value | Source |
|---|---|---|
| Title | **Handover** | WEB/components/handover/HandoverHead.tsx:50 |
| Desktop head | Title at the left; at the right **Present** (secondary, play icon) then **Download all** (the page's one primary, size xl, download icon) | WEB/components/handover/HandoverHead.tsx:46-58 |
| Download all's words | **Download all** until the zip's size is known, then **Download all · {size}** (the demo: "Download all · 373 KB") | WEB/components/handover/HandoverHead.tsx:18-21; headless run: the demo's zip is 382,022 bytes |
| Size format | Under 1,000 KB: whole KB, at least 1 ("1 KB", "98 KB"); above: MB with one decimal ("1.0 MB", "3.2 MB"); 1 KB = 1,024 bytes | WEB/lib/flow/deliverables/items.ts:78-83; WEB/lib/flow/deliverables/items.test.ts:86 |
| Where the size comes from | The zip of every file is asked for once per edit of the design as soon as the run has an option; its central directory gives every file's size and its own length the zip's size; Download all then saves those same bytes | WEB/components/handover/Handover.tsx:86-90; WEB/lib/handover/zip-sizes.ts:1-3, WEB/lib/handover/zip-sizes.ts:57-65; WEB/lib/stores/downloads-store.ts:126-138 |
| When Download all can be used | There is a chosen option, the run did not fail, and at least one file other than the project file does not wait. Otherwise it is shown and cannot be used (`aria-disabled`) | WEB/components/handover/Handover.tsx:88, WEB/components/handover/Handover.tsx:142-147; WEB/components/handover/HandoverHead.tsx:23-31 |
| While the zip is on its way | A turning ring replaces the icon; a second press does nothing | WEB/components/handover/HandoverHead.tsx:24-36; WEB/lib/stores/downloads-store.ts:158-160 |
| Tablet and phone, at `/handover` | The head shows the title alone; **Download all** is pinned across the foot of the list (over the tab bar on phone), full width on phone; on tablet **Present** stands before it | WEB/components/handover/HandoverHead.tsx:53, WEB/components/handover/HandoverHead.tsx:61-69; WEB/components/handover/Handover.tsx:212 |
| Tablet and phone, at `/handover/<item>` | The head and the pinned bar are not shown: neither Download all nor Present is on the screen; the file's own Download is | WEB/components/handover/Handover.tsx:151-153, WEB/components/handover/Handover.tsx:212 |
| Not on this page | No Export and no Save a copy: the project file is a file of the list | WEB/components/handover/HandoverHead.tsx:41-45 |

### Handover: the list of files

| Item | Value | Source |
|---|---|---|
| Groups, in order | **For the client**: Design report. **For the utility**: Single-line diagram. **For the installer**: Bill of materials, Cable schedule, CAD layout. **For you**: Project file, Hourly data, Google Earth model | WEB/lib/flow/deliverables/items.ts:45-61, WEB/lib/flow/deliverables/items.ts:132-133; WEB/lib/routes.ts:26-35; WEB/lib/flow/deliverables/items.test.ts:14 |
| A row | The file's name; under it one line of what it is, with " · {size}" once the zip has told it; at its right its format badge and its own download button. The row is a link to `/handover/<item>`; the download button beside it saves the file and opens nothing | WEB/components/handover/DeliverableRow.tsx:25-26, WEB/components/handover/DeliverableRow.tsx:38-67; WEB/lib/flow/deliverables/items.ts:105, WEB/lib/flow/deliverables/items.ts:126 |
| Badges | Design report **PDF**; Single-line diagram **PNG**; Bill of materials **CSV**; Cable schedule **CSV**; CAD layout **DXF**; Project file **RTD**; Hourly data **CSV**; Google Earth model **KMZ** | WEB/lib/flow/deliverables/items.ts:50-59 |
| Row download button | Icon alone, named **Download {file name}** (e.g. "Download Design report"); while its file is on its way a ring named "Preparing" stands in its place; while the row waits it is shown and cannot be used | WEB/components/handover/DeliverableRow.tsx:41, WEB/components/handover/DeliverableRow.tsx:59-65 |
| Lines (with an option) | Design report: "A4 landscape" until the pages are counted, then "{n} pages, A4 landscape". Single-line diagram: "{n} inverter(s), {m} MPPT, {s} string(s)". Bill of materials: "{n} modules, {k} inverter(s), {l} line(s)". Cable schedule: "{s} string(s), {m} m of DC cable" (m: the bill of materials' DC cable lines summed). CAD layout: "The roof and its strings, in metres". Project file: "The whole design, to open again in the app". Hourly data: "{h} hours of sunlight, temperature and power" (h: the weather's hours). Google Earth model: "The roof and the modules on the map". Plurals by count ("1 inverter", "22 strings") | WEB/lib/flow/deliverables/items.ts:66-103 |
| The demo's lines with sizes | From the demo's zip (headless run, day 2026-10-13; sizes by `sizeOf`): "6 pages, A4 landscape · 99 KB"; "1 inverter, 6 MPPT, 22 strings · 63 KB"; "638 modules, 1 inverter, 7 lines · 1 KB"; "22 strings, 1,681 m of DC cable · 1 KB"; "The roof and its strings, in metres · 254 KB"; "The whole design, to open again in the app · 680 KB"; "8,760 hours of sunlight, temperature and power · 482 KB"; "The roof and the modules on the map · 19 KB". The zip's entries in bytes: PDF 101,581; DXF 260,471; KMZ 19,752; CSV 493,104; PNG 64,303; BOM 509; cables 1,416; RTD 696,549; the zip 382,022 ("Download all · 373 KB"). The unit test's fixture sizes ("98 KB" for the report, "3 KB" for the cable schedule) are not the demo's | WEB/lib/flow/deliverables/items.ts:78-83, WEB/lib/flow/deliverables/items.ts:105; WEB/lib/flow/deliverables/items.test.ts:35-64; headless run |
| Before a run (first load) | Every row's line is a skeleton bar | WEB/lib/flow/deliverables/items.ts:120; WEB/components/handover/DeliverableRow.tsx:46-48 |
| Before options (no option fits, no voltage …) | Every row but the project file waits: its line is the run's no-options title word for word (e.g. "Choose a system voltage to size the strings"), its download cannot be used | WEB/lib/flow/deliverables/items.ts:121-125; WEB/lib/flow/deliverables/items.test.ts:96 |
| The project file's row | Never waits once a design is open: it can be downloaded with no option, no voltage, no weather and no run. Before a design is open its line is a skeleton | WEB/lib/flow/deliverables/items.ts:116-119; API/routers/export.py:50-51 |
| Which row looks open | At `/handover/<item>` that row (outlined, `aria-current="page"`). At `/handover` on desktop the first row, Design report, looks open, since its preview stands beside the list | WEB/components/handover/DeliverableList.tsx:22-25; WEB/components/handover/DeliverableRow.tsx:31-35; WEB/components/handover/Handover.tsx:92 |
| Row height | 60 px on desktop, 64 px on touch | WEB/components/handover/DeliverableRow.tsx:25-30 |

### Handover: list and preview on each size

| Item | Value | Source |
|---|---|---|
| Desktop (1101 and up) | The head across the page; the list, 420 wide, at the left; the preview of the open file the rest of the width, in a card. At `/handover` the preview shows the first file, Design report | WEB/components/handover/Handover.tsx:42-51, WEB/components/handover/Handover.tsx:92, WEB/components/handover/Handover.tsx:155-165; docs/design/information-architecture.md:63-68 |
| Tablet and phone | At `/handover` the list is the screen (no preview). A file opens at its own address pushed over the list, with a back row **Handover** at its top (chevron, named "Back to Handover"; hidden on desktop) | WEB/components/handover/Handover.tsx:52-57, WEB/components/handover/Handover.tsx:151-171 |
| The preview's head | The file's name; under it "{who it is for} · {its line}" (the demo: "For the client · 6 pages, A4 landscape · 99 KB"); at the right the file's own **Download {FORMAT}** ("Download PDF", "Download PNG", "Download CSV", "Download DXF", "Download RTD", "Download KMZ"), a secondary button; on phone its visible word is **Download** alone (named for its format). Report and tables add their own tools before it (below) | WEB/components/handover/Preview.tsx:41-83; WEB/lib/flow/deliverables/items.ts:114-115; WEB/lib/flow/deliverables/items.test.ts:68-69 |
| Before options, the head's line | Report: "For the client · A4 landscape"; CAD layout: "For the installer · The roof and its strings, in metres"; the other waiting files: the no-options title | WEB/lib/flow/deliverables/items.ts:121-125 |
| Before options, the preview's body | The card of the decision: the run's no-options title and message word for word, and a button to the step that puts it right, **Open Roof** (no module fits) or **Open Strings** (no voltage, no length fits, too few positions) | WEB/components/handover/Preview.tsx:86-87; WEB/components/shell/NoOptionsCard.tsx:16-39; WEB/lib/flow/no-options.ts:7-15 |
| The no-options words (from the API) | "No module fits on this roof" / "The roof has no room for a module inside the edge margin and clear of shade. Check the outline, the edge margin and the obstacles." · "Choose a system voltage to size the strings" / "600, 1000 or 1500 V." · "No string length fits at {V} V" / {the range's message} · "Too few positions for a string" / "The roof holds {n} position(s), and a string takes {min} to {max} modules. {A string of {k} fits. Add it as your own option. \| No string of that length fits.}" | API/services/design.py:28-36, API/services/design.py:224-251; CORE/readouts.py:19-20, CORE/readouts.py:62 |
| While a new run is on its way | What is shown stays, dimmed: the head's line, the diagram, the bill of materials, the cable schedule | WEB/lib/handover/page-view.ts:63-65; WEB/components/handover/Preview.tsx:58; WEB/components/handover/BillOfMaterials.tsx:22 |
| At the first load | The file's body is a breathing block (the report and the hourly data have their own of their shape) | WEB/components/handover/Preview.tsx:88-89; WEB/lib/handover/page-view.ts:79 |
| Download from the preview | The same file as the row's download, of the same edit; cannot be used while the file waits, at the first load, or while it is on its way (ring before the words) | WEB/components/handover/Preview.tsx:42-44, WEB/components/handover/Preview.tsx:78-82; WEB/components/handover/Handover.tsx:94 |

### Handover: how a download works and the file names

| Item | Value | Source |
|---|---|---|
| A press | The browser asks the API for the file with the design as it is now and the reader's day, then saves it under the name the API gives. Nothing is said when it succeeds: the browser shows its download. A second press while it is on its way does nothing | WEB/lib/stores/downloads-store.ts:154-175; WEB/lib/flow/deliverables/save-file.ts:4-16 |
| Kept per edit | A file asked for is kept for that edit of the design: the preview's Download and the row's save the bytes the preview read; any edit asks again | WEB/lib/stores/downloads-store.ts:126-138, WEB/lib/stores/downloads-store.ts:217-221 |
| Which option a file is of | The option the run shows: the user's choice while the run has it, else the run's first (recommended). The project file is the design as it is, unchanged | WEB/lib/stores/downloads-store.ts:33-47; CORE/project.py:342-343 |
| The reader's day | The browser's local date, sent as `day=YYYY-MM-DD` with every file; the report prints it on page 1 (in the zip too). Without it the server's date | WEB/lib/flow/deliverables/day.ts:1-12; API/routers/export.py:47-49 |
| Leaving while a file comes | While any file or Download all is on its way the browser asks before the page is left; the report's pages do not count | WEB/lib/device/leaving.ts:1-8; WEB/components/shell/Shell.tsx:55, WEB/components/shell/Shell.tsx:73 |
| Retries | An export or the report's pages are asked again, up to three tries in all, when the answer is not the API's (code `unexpected_answer`) | WEB/lib/api/client.ts:44, WEB/lib/api/client.ts:86-100, WEB/lib/api/client.ts:133-145 |
| File name | `{stem}{ending}`. The stem is the project's name split at runs of whitespace, `\ / : * ? " < > \|` and control characters, dots trimmed from both ends of each word, the words joined with "-", cut to 80 characters, trailing "-" or "." removed; an empty result is `rooftop-design`. The demo: `Pune-demo-roof` | API/services/export.py:26-30, API/services/export.py:235-238; WEB/lib/flow/deliverables/file-name.ts:5-21; headless run |
| Endings | Design report `-report.pdf`; CAD layout `-layout.dxf`; Google Earth model `.kmz`; Hourly data `-hourly.csv`; Single-line diagram `-single-line-diagram.png`; Bill of materials `-bill-of-materials.csv`; Cable schedule `-cable-schedule.csv`; Project file `.rtd`; Download all `.zip` | API/services/export.py:109-118, API/services/export.py:154 |
| The demo's names | `Pune-demo-roof-report.pdf`, `Pune-demo-roof-layout.dxf`, `Pune-demo-roof.kmz`, `Pune-demo-roof-hourly.csv`, `Pune-demo-roof-single-line-diagram.png`, `Pune-demo-roof-bill-of-materials.csv`, `Pune-demo-roof-cable-schedule.csv`, `Pune-demo-roof.rtd`, `Pune-demo-roof.zip` | headless run |
| A name outside ASCII | Sent as `filename*` (UTF-8, percent-encoded) with `rooftop-design{ending}` as the plain name beside it; the app takes `filename*` first, and never a path | API/services/export.py:94-100; WEB/lib/api/download.ts:6-31 |
| When the header names no file | `rooftop-design-report.pdf`, `rooftop-design-layout.dxf`, `rooftop-design.kmz`, `rooftop-design-hourly.csv`, `rooftop-design-single-line-diagram.png`, `rooftop-design-bill-of-materials.csv`, `rooftop-design-cable-schedule.csv`, `rooftop-design.rtd`, `rooftop-design.zip` | WEB/lib/api/client.ts:45-55, WEB/lib/api/client.ts:135 |
| Media types | PDF `application/pdf`; DXF `image/vnd.dxf`; KMZ `application/vnd.google-earth.kmz`; CSVs `text/csv; charset=utf-8`; PNG `image/png`; RTD `application/json`; zip `application/zip` | API/services/export.py:109-118, API/services/export.py:154 |
| API refusals of a file | No options: "{no-options title}. {its message}" (code the no-options code; field `system_voltage` when the voltage is missing). No option named: "Choose an option first. This design has {keys}." Option not in the design: "This design has no option {key}. It has {keys}. Choose one of them." {keys} are the options' keys, not their letters (the demo's first is `29x22x1`), listed "a, b and c". The app always sends the option the run shows, so these two are the API's alone | API/services/export.py:220-232, API/services/export.py:241-242; WEB/lib/stores/downloads-store.ts:44-47; headless run (`chosen_option` "29x22x1") |

### Design report (PDF)

| Item | Value | Source |
|---|---|---|
| Format | PDF, A4 landscape (11.69 × 8.27 in), one figure a page, saved page after page | CORE/export/report.py:27, CORE/export/report.py:38-44; CORE/export/files.py:39-48 |
| Needs | A layout and a chosen option; else "Generate the layout and choose a stringing option first." (the API refuses before it, see the refusals) | CORE/export/report.py:47-52; API/services/export.py:199-204 |
| Pages, in order | 1 Summary, 2 Layout, 3 Shadows, 4 Energy, 5 Schedule, then one "Schedule (continued)" page for every 40 strings after the first 28, then SLD last. 28 strings or fewer: 6 pages (the demo, 22 strings: 6) | CORE/export/report.py:28-29, CORE/export/report.py:55-71, CORE/export/report.py:227-232; headless run |
| Page 1, Summary | Title "{project name} · rooftop PV design"; line "SolarLayout Rooftop · {dd Mon YYYY}" (the reader's day); a table of: Site, Roof, Structure, Module, Inverter, Stringing, DC capacity, AC capacity, Weather, Energy, year 1, Yield, Module area, CO₂ avoided; "Note: {warning}" at the foot when the module's coefficients carry one | CORE/export/report.py:93-104; CORE/export/summary.py:26-62 |
| Roof row (D112) | "{Flat, rows facing south \| Flat, rows facing north \| Flat, rows facing east and west \| Sloped} · {area} m² · usable {area} m²"; north for a latitude below 0 | CORE/export/summary.py:36-40; CORE/geometry.py:21-25 |
| Structure row | Tilted rows: "Fixed tilt {t}°, {n}P\|L, lower edge {c} m"; east-west: "East-west {t}°, 1L back-to-back, ridge gap {g} m"; sloped: "Flush rails at the roof pitch {s}°" | CORE/export/summary.py:14-23 |
| Other rows | Site "{lat:.5f}° N\|S, {lon:.5f}° E\|W"; Module "{maker} {model} · {Wp} Wp"; Inverter "{maker} {model} · {kW} kW · {n} MPPT"; Stringing "{n} in series × {s} strings on {k} inverter(s)"; DC capacity "{kWp} kWp ({n} modules)"; AC capacity "{kW} kW · DC/AC {ratio}"; Weather "{label} · GHI {x} kWh/m² · in-plane {y} kWh/m²"; Energy, year 1 "P50 … MWh · P75 … MWh · P90 … MWh"; Yield "{kWh/kWp} kWh/kWp · PR {x} % · CUF {y} % AC"; Module area "{m²} m² · {share} % of the roof"; CO₂ avoided "{t} t/yr at {f} t/MWh" (default 0.716) | CORE/export/summary.py:26-62; CORE/simulation.py:52-53 |
| The demo's page 1 | Site "18.52000° N, 73.86000° E"; Roof "Flat, rows facing south · 3,600 m² · usable 3,184 m²"; Structure "Fixed tilt 15°, 2P, lower edge 0.5 m"; Stringing "29 in series × 22 strings on 1 inverter"; DC capacity "357.28 kWp (638 modules)"; AC capacity "275 kW · DC/AC 1.30"; Weather "PVGIS TMY · GHI 1,822.9 kWh/m² · in-plane 1,998.0 kWh/m²"; Energy, year 1 "P50 617.8 MWh · P75 600.2 MWh · P90 584.2 MWh"; Yield "1,729 kWh/kWp · PR 86.6 % · CUF 25.6 % AC"; Module area "1,646 m² · 45.7 % of the roof"; CO₂ "442.4 t/yr at 0.716 t/MWh"; and the note "Note: Voc coefficient -0.164 %/°C is outside the usual -0.35 to -0.20 %/°C for crystalline silicon. Check the datasheet and enter it if it differs." | headless run (CORE/export/summary.py:26-62) |
| Page 2, Layout | Title "Layout and strings": the plan with the strings. The demo's page also carries a north mark "N", a "10 m" scale, the string labels S1 to S22, the obstacles labelled "Stair room · h 3 m", "Water tank · h 2 m", "AC unit 1–4 · h 1.2 m", and "INV-1" | CORE/export/report.py:107-114; headless run (the PDF's text) |
| Page 3, Shadows | Title "Shadows at {end}:00 solar time on the design day (window {start}:00–{end}:00)" (the demo: 16:00, window 9:00–16:00); the plan in shadow at the end hour, dimmed; one line "Near shading, linear {±x.xx} % · electrical beyond linear {±x.xx} % · far (horizon) {±x.xx} % · keep-out left empty {m²} m²" | CORE/export/report.py:117-145; headless run |
| Page 4, Energy | The loss diagram, headed "Loss diagram · year 1", 21 lines from "Global horizontal irradiation" to "Energy to grid" in the engine's labels ("Far shading, horizon", "Near shading, linear", "Electrical shading" among them); "Monthly energy to grid", a bar a month with the highest and lowest months' values written over them (the demo 68.4 and 31.5 MWh); and a table "Energy / MWh": Year 1, 5, 10, 15, 20, 25, "25-year total", then P50, P75, P90 (the demo: 617.8 … 547.8, 14,554, 617.8, 600.2, 584.2) | CORE/export/report.py:35, CORE/export/report.py:148-164; CORE/plots.py:207-211; CORE/simulation.py:52; headless run (the PDF's text) |
| Page 5, Schedule | Title "String schedule and bill of materials": the first 28 strings of the schedule (String, Inverter, MPPT, Modules, "Voc cold, V" whole volts, "Isc, A" 2 decimals, "DC cable, m" 1 decimal, "Drop, %" 2 decimals, Cable), then the bill of materials (Item, Specification, Qty, Unit) | CORE/export/report.py:28-33, CORE/export/report.py:167-193, CORE/export/report.py:252-259 |
| Continued pages | "String schedule, continued: S{first} to S{last}", 40 strings a page | CORE/export/report.py:29, CORE/export/report.py:196-208 |
| Last page, SLD | The single-line diagram as its PNG draws it | CORE/export/report.py:211-223 |
| The tables' page in the app | "In the report, page 5" (the BOM's and the schedule's previews) | WEB/lib/handover/in-the-report.ts:1-4 |
| Preview | The engine's pages as PNGs at 150 dpi (1753 × 1240), the same drawing as the PDF of the same day; the page in a paper frame, under it the thumbnails (96 wide on desktop, 72 tablet, 56 phone, scrolling sideways) captioned "{n} · {title}" on tablet and desktop ("2 · Layout"), the number alone on phone, each named "Page {n}, {title}" | API/services/export.py:27, API/routers/export.py:25-33; CORE/export/report.py:78-84; WEB/components/handover/ReportPreview.tsx:22-38, WEB/components/handover/ReportPreview.tsx:81-98; WEB/lib/handover/report-view.ts:62-72 |
| Preview's head | On tablet and desktop "Page {n} of {count} · {title}" ("Page 1 of 6 · Summary") stands in the line's place, with **Previous page** and **Next page** (icon buttons, dim at the ends) before Download PDF. On phone the head keeps the line, and previous, the page's words and next stand in a row under the paper | WEB/lib/handover/report-view.ts:96-98; WEB/components/handover/ReportPreview.tsx:69-79, WEB/components/handover/ReportPreview.tsx:126-132; WEB/components/handover/Handover.tsx:178-186; WEB/components/handover/Preview.tsx:55-69 |
| Keys | ← and → on the focused paper or thumbnails turn the page, held at the ends | WEB/lib/handover/report-view.ts:58, WEB/lib/handover/report-view.ts:104-108; WEB/components/handover/ReportPreview.tsx:110-117 |
| When the pages are asked | Once per edit as soon as the run has an option, whatever file is open (the row counts the pages from the page's open); the page chosen is kept for those pages, new pages start at page 1 | WEB/components/handover/Handover.tsx:115-126; WEB/lib/handover/page-view.ts:83-88; WEB/lib/handover/report-view.ts:87 |
| While they come | A breathing page and six thumbnail blocks; after an edit the pages of before stay, dimmed, until the new ones come | WEB/components/handover/ReportPreview.tsx:44-65; WEB/lib/handover/report-view.ts:89-100 |
| Drawn once | The API keeps drawn pages per project and day (about 32 MB of them); one drawing at a time | API/services/export.py:31-45, API/services/export.py:157-170 |

### Single-line diagram (PNG)

| Item | Value | Source |
|---|---|---|
| File | PNG, A4 landscape at 200 dpi: 2338 × 1654 px | CORE/export/files.py:55-65; headless run |
| What it shows | Strings → MPPT → inverter → ACDB → meter → grid | CORE/plots.py:214-215 |
| Title | "Single-line diagram · {n} strings of {s} × {Wp} Wp" (the demo: "… · 22 strings of 29 × 560 Wp") | CORE/plots.py:223-224; WEB/lib/handover/sld.ts:118 |
| Per inverter | A box "INV-{i}" with "{kW} kW · {n} MPPT" | CORE/plots.py:228-230 |
| Per MPPT | A block "{strings} × {s} mod" on a line "MPPT {j} · DC"; an MPPT with no string "MPPT {j} · not used" | CORE/plots.py:231-242 |
| AC side | A line "AC" to the "ACDB" box, then a "kWh" box labelled "Net meter", then "Grid / LT panel" | CORE/plots.py:243-256 |
| Preview | The same diagram drawn by the app as a drawing in a card, titled as the PNG, scaled to the card; under the phone's width the AC side runs down; each MPPT block coloured by its MPPT's number as the Strings step colours strings (the seventh takes the first colour again). Caption under it: "The PNG is A4, as in the report" | WEB/components/handover/SingleLineDiagram.tsx:19, WEB/components/handover/SingleLineDiagram.tsx:41-48, WEB/components/handover/SingleLineDiagram.tsx:97-166; WEB/lib/handover/sld.ts:56-76 |
| A block's tooltip | Hover (mouse), tap (touch; a second tap takes it away) or keyboard focus shows the block's strings ("S1 · S2 · S3 · S4") and its load: "Imp {x} of {limit} A", or "Imp {x} A · limit not known"; Esc takes it away. Each block is named "MPPT {j}, {n} string(s)" | WEB/components/handover/SingleLineDiagram.tsx:79-93; WEB/lib/handover/sld.ts:78-105 |
| Screen readers | A hidden list of every inverter with every MPPT, and "AC · ACDB · Net meter (kWh) · Grid / LT panel" | WEB/components/handover/SingleLineDiagram.tsx:167-182 |

### Bill of materials (CSV)

| Item | Value | Source |
|---|---|---|
| File | CSV, UTF-8, "\n" line ends; head `Item,Specification,Quantity,Unit`; one line an item, quantities without trailing zeros | CORE/export/files.py:79-91 |
| Lines, in order | PV module; String inverter; Mounting structure; DC cable (one line a cable size, the smallest first); DC connector pair; AC cable; AC distribution board | CORE/bom.py:110-127 |
| PV module | "{maker} {model}, {Wp} Wp", with ", bifacial {x.xx}" for a bifacial module. Quantity: the modules the option uses (modules in series × strings), pcs | CORE/bom.py:115-117; CORE/stringing.py:207-209 |
| String inverter | "{maker} {model}, {kW} kW, {n} MPPT". Quantity: the option's inverters, pcs | CORE/bom.py:118-119 |
| Mounting structure | The structure words of the report (above). Quantity in "tables": tilted rows and sloped roofs count, row by row, each unbroken run of used modules along the row; an east-west roof counts the rows that hold a used module | CORE/bom.py:72-84, CORE/bom.py:120; CORE/export/summary.py:14-23 |
| DC cable | "{4, 6 or 10} mm² Cu, {system voltage} V DC, red + black". Quantity: the lengths of that size's strings in the cable schedule, summed, rounded to a whole metre, m | CORE/bom.py:64-69, CORE/bom.py:87-89, CORE/bom.py:121-122 |
| DC connector pair | "MC4-compatible, matched to the module". Quantity: 2 × strings, pairs | CORE/bom.py:123 |
| AC cable | "Inverter to ACDB, sized for {I} A at {V} V AC"; where the inverter file (OND) gives no output voltage, "Inverter to ACDB, sized for {I} A at 415 V AC by default, as the inverter file (OND) gives no output voltage". I: the OND's maximum AC current, else P / (√3 × V). Quantity: the AC cable length per inverter × inverters, m (the length is the design's, default 30 m, set from 1 to 2,000 m) | CORE/bom.py:124, CORE/bom.py:135-150; CORE/project.py:56; WEB/lib/studio/inverter-fields.ts:14 |
| AC distribution board | "{n} incomer(s), 1 outgoing". Quantity 1, pcs | CORE/bom.py:125, CORE/bom.py:130-132 |
| The demo's file | PV module "INSOLATION GREEN ENERGY PVT. LTD. INA-144MHC-TF-560, 560 Wp, bifacial 0.80" 638 pcs; String inverter "WattPower Systems Pvt.Ltd WP-330KTL-H1, 275 kW, 6 MPPT" 1 pcs; Mounting structure "Fixed tilt 15°, 2P, lower edge 0.5 m" 27 tables; DC cable "4 mm² Cu, 1500 V DC, red + black" 1681 m; DC connector pair 44 pairs; AC cable "Inverter to ACDB, sized for 240 A at 800 V AC" 30 m; AC distribution board "1 incomer, 1 outgoing" 1 pcs | headless run |
| Preview | A table: Item, Specification, Qty (comma between thousands, no decimals), Unit, the engine's lines in its order; caption "The bill of materials of option {letter}"; on phone each line a card | WEB/lib/handover/bom-view.ts:22-41; WEB/components/handover/BillOfMaterials.tsx:20-26; WEB/components/ui/Table.tsx:52, WEB/components/ui/Table.tsx:62, WEB/components/ui/Table.tsx:128 |
| Head tools | "In the report, page 5" (in the head on tablet and desktop, over the table on phone) and **Copy** (secondary, copy icon, its word on every size), before **Download CSV** | WEB/components/handover/Handover.tsx:100-107; WEB/components/handover/CopyAsTable.tsx:16, WEB/components/handover/CopyAsTable.tsx:36-41; WEB/components/handover/BillOfMaterials.tsx:23 |
| Copy | Puts the table on the clipboard as tab-separated text, a header line then one line a row, as shown; toast "Copied"; if the clipboard refuses, the note "The table could not be copied. Select it and copy by hand." Shown and not usable before options | WEB/lib/handover/copy-table.ts:7-25; WEB/lib/handover/bom-view.ts:32; WEB/components/handover/CopyAsTable.tsx:23-35; WEB/components/handover/Handover.tsx:104 |
| Report vs file | The report's page 5 and the CSV are made by the same function from the same option | CORE/export/report.py:176-185; CORE/readouts.py:296-307 |

### Cable schedule (CSV): the DC string cables

| Item | Value | Source |
|---|---|---|
| File | CSV, UTF-8; head `String,Inverter,MPPT,Modules,Voc cold (V),Isc (A),DC cable (m),Drop (%),Cable`; one row a string; Voc 1 decimal, Isc 2, length 1, drop 2 | CORE/export/files.py:94-100; headless run |
| Row values | String "S{n}"; inverter "INV-{n}"; MPPT from 1 within its inverter; Modules = modules in series; Voc cold = one module's Voc at the lowest ambient × modules in series; Isc = the module's Isc; DC cable = the string's cable length; Drop = its voltage drop; Cable = "{size} mm² Cu, {system voltage} V DC" | CORE/bom.py:92-107 |
| String order | By azimuth, then row, then the x of the string's first module | CORE/stringing.py:217 |
| Where each inverter stands | The point on the setback line nearest the mean of its strings' first-module centres | CORE/stringing.py:231-240 |
| How a length is worked out | 2 × (the east-west plus the north-south distance from the string's first module to its inverter, + 2 m of slack) for the + and − home runs; the string's own extent (its first module to its farthest) is added when the layout is single-line (east-west, or every module in one line), for the return leg; rounded to 0.1 m | CORE/stringing.py:243-251; CORE/bom.py:102 |
| How a size is chosen | Each string's own: the smallest of 4, 6 and 10 mm² copper that carries 1.25 × the module's Isc (IEC 60364-7-712) within the rating of EN 50618 cable, two loaded cables side by side on a surface at 60 °C ambient (44, 57, 79 A), and drops no more than 1 % of the string's voltage at its maximum power point at STC over its length. Resistance: IEC 60228 class 5 tinned copper, 5.09, 3.39, 1.95 Ω/km at 20 °C, raised to a conductor at 70 °C (× 1.1965). Imp and Vmp from the module file (its Isc and Voc where it gives none). If no size holds the drop, 10 mm² with its drop | CORE/bom.py:12-19, CORE/bom.py:50-61, CORE/bom.py:94-99 |
| The demo | 22 strings, all 4 mm² ("4 mm² Cu, 1500 V DC"), Voc cold 1480.1 V, Isc 14.30 A, lengths 20.7 to 131.9 m, drops 0.14 to 0.91 % | headless run |
| Preview | A table of the nine columns, heads as the CSV's ("Voc cold (V)", "Isc (A)", "DC cable (m)", "Drop (%)"), Voc cold in whole volts (the CSV has 1 decimal), Isc 2 decimals, length 1, drop 2; sortable on the first eight (a press sorts upwards, a second downwards, a third gives the engine's order back; not on phone, where each string is a card); a last row "{n} string(s)" with the lengths' sum (1 decimal). Caption "The cable schedule of option {letter}, by string"; sorted: "Sorted by {column}, upwards\|downwards" | WEB/lib/handover/schedule-view.ts:49-102; WEB/components/ui/table-sort.ts:24-28; WEB/components/handover/CableSchedule.tsx:21-27 |
| Drop over 1 % | The drop carries the note mark labelled "Over 1 % even at 10 mm². Shorten the run or move the inverter nearer." | WEB/lib/handover/schedule-view.ts:42-44, WEB/lib/handover/schedule-view.ts:57-64 |
| Head tools, Copy | As the bill of materials: "In the report, page 5", **Copy** (what is shown, in the order shown, with the total row), toast "Copied", then **Download CSV** | WEB/components/handover/Handover.tsx:97-107; WEB/lib/handover/schedule-view.ts:40, WEB/lib/handover/schedule-view.ts:99-102 |
| Not in the energy | The drop is the cable's alone; the energy's DC ohmic loss is the percentage set in Performance | CORE/simulation.py:347 |

### CAD layout (DXF)

| Item | Value | Source |
|---|---|---|
| Format | DXF AutoCAD 2010 (R2010, `AC1024`), units metres; local roof metres, x east, y north | CORE/export/files.py:118-124; headless run; CLAUDE.md rule 2 |
| Layers (colour) | `ROOF` (7): the outline. `SETBACK` (8): the line inside the edge margin, when not empty. `OBSTACLES` (1): each obstacle's footprint. `KEEPOUT` (30): the areas kept clear, within the roof. `MODULES_UNUSED` (9): the positions the option does not use. `INVERTERS` (40): a rectangle at each inverter. `TEXT` (7): "{obstacle name} h={height}" at each footprint's centre (height 0.4) and "INV-{n}" 0.2 m north of its rectangle's north edge (height 0.5). `STRING_S01` … one layer a string with its modules' outlines, colours 2 to 7 in turn | CORE/export/files.py:125-156 |
| The inverter's rectangle | Its width (east-west) and depth as the inverter file gives them; where it gives none a 2 × 1.2 m block, labelled "INV-{n} (symbol, not to scale)" | CORE/export/files.py:107-115, CORE/export/files.py:152-156 |
| The demo's file | `AC1024`, `$INSUNITS` 6 (metres); the SETBACK outline present; 22 string layers of 29 modules (colours 2, 3, 4, 5, 6, 7, 2 …); 152 unused positions; 6 obstacles; 4 kept-clear areas; one inverter rectangle 1.048 × 0.395 m (its size from the demo's OND, so no "(symbol, not to scale)"); text "Stair room h=3", "Water tank h=2", "AC unit 1 h=1.2" to "AC unit 4 h=1.2", "INV-1" | headless run (read back with ezdxf) |
| Preview | The report's Layout page in a paper frame (560 wide on desktop) at the left, and **What is in the file**, a line that opens: "Layers" with ROOF "the outline", SETBACK "the edge margin", OBSTACLES "{n} outline(s)", KEEPOUT "the areas kept clear", MODULES_UNUSED "{n} position(s)", INVERTERS "{n}", TEXT "the names and heights, INV-1, …", "STRING_S01 to STRING_S{nn}" "{s} modules each"; caption "AutoCAD 2010 (R2010) · metres · x east, y north". The plan waits for the report's pages (breathing block; their refusal with Try again) | WEB/components/handover/CadPreview.tsx:18-57; WEB/lib/handover/cad-view.ts:24-54 |

### Google Earth model (KMZ)

| Item | Value | Source |
|---|---|---|
| Container | A zip holding `doc.kml` alone | CORE/export/files.py:190-193; headless run |
| Document | Named after the project; folder "Roof" with the placemark "Roof" and one "{obstacle name} h={height}" per obstacle; folder "Modules ({n})" with one "Module {k}" per position the option uses, {k} the position's own number in the layout (from 1), so the numbers skip the unused positions (the demo: "Modules (638)", its first "Module 2"; 645 placemarks in all) | CORE/export/files.py:174-189; headless run |
| Geometry | Polygons in WGS84 longitude, latitude (8 decimals), altitude 0, the roof's centroid placed at the roof's lat and lon | CORE/export/files.py:168-172 |
| Not in it | Unused positions, inverters, wiring, kept-clear areas; heights only in the names | CORE/export/files.py:178-189 |
| Preview | "In the file": "Roof" the outline; each "{name} h={height}" "the {box\|tank\|wall\|tree\|building}'s outline, its height in the name"; "Modules ({n})" "the positions used, one by one"; then "Google Earth draws the shapes flat. Heights are in the names." | WEB/lib/handover/earth-view.ts:24-61; WEB/components/handover/EarthPreview.tsx:14-23 |

### Hourly data (CSV)

| Item | Value | Source |
|---|---|---|
| Columns, by plain name (unit · file's name) | **Hour** (UTC · `time_utc_hour_start`): the hour's start. **Sunlight on the ground** (W/m² · `ghi_w_m2`): global horizontal irradiance. **Sunlight on the modules** (W/m² · `poa_eff_w_m2`): effective plane-of-array irradiance, the mean over the strings. **Cell temperature** (°C · `t_cell_c`): the mean over the strings. **DC power** (kW · `p_dc_kw`): at the inverters' inputs, after the DC losses. **AC power** (kW · `p_ac_kw`): to the grid, after the inverter, clipping, night consumption, AC ohmic and availability | WEB/lib/handover/csv-columns.ts:13-27; CORE/export/files.py:72-76; CORE/simulation.py:347-372, CORE/simulation.py:414-420 |
| Format | UTF-8, "\n" line ends, values rounded to 3 decimals; time as "2019-01-01 00:00:00+00:00" (the demo's typical year) | CORE/export/files.py:76; headless run |
| Rows | One an hour of the design's weather (the demo: 8,760) | WEB/lib/flow/deliverables/items.ts:98-99; headless run |
| Night | AC power is negative at night by the inverter's night consumption (the demo: -0.005 kW, 4,484 hours) | CORE/simulation.py:364-372; headless run |
| Preview | A table of the first 5 hours, each column's plain name in bold with "{unit} · {file name}" under it; the hour as "1 Jan 02:00", figures with 1 decimal (under 0.05 shown as 0); caption "First 5 of {n} hours"; the table scrolls sideways where it must and takes the focus for the keyboard. Asked once per edit while the file is open, and kept for its Download | WEB/components/handover/HourlyPreview.tsx:20-81; WEB/lib/handover/csv-head.ts:20-52; WEB/components/handover/Handover.tsx:111-112 |

### Download all (the zip)

| Item | Value | Source |
|---|---|---|
| Name | `{stem}.zip` (the demo `Pune-demo-roof.zip`) | API/services/export.py:135, API/services/export.py:154; headless run |
| Contents, in order | The seven files of the option and the project file, each named as its own download: `-report.pdf`, `-layout.dxf`, `.kmz`, `-hourly.csv`, `-single-line-diagram.png`, `-bill-of-materials.csv`, `-cable-schedule.csv`, `.rtd`; compressed (deflate) | API/services/export.py:108-118, API/services/export.py:138-151; headless run |
| The project file inside | Of the design as sent for the zip, which names the option the run shows | API/services/export.py:149; WEB/lib/stores/downloads-store.ts:44-47 |
| Needs | A chosen option (the API refuses otherwise) | API/routers/export.py:50; API/services/export.py:143 |
| Failure | A toast with the API's words and **Try again** | WEB/lib/stores/downloads-store.ts:164-169, WEB/lib/stores/downloads-store.ts:177 |

### The project file (.rtd): what it holds

| Item | Value | Source |
|---|---|---|
| Format | JSON, indented, with `"format": 2`; the engine's one writer | CORE/project.py:27-30, CORE/project.py:62-65, CORE/project.py:93-95; API/services/export.py:103-105 |
| What it holds | The name; the place's name (D114); the roof (outline, lat, lon, roof type, parapet height, edge margin, walkways, obstacle clearance, roof albedo, slope and its azimuth, its source, the obstacles); the array; the losses; the module file's name and its text (PAN); the inverter file's name and its text (OND); the weather source, the weather CSV's name and text; the weather itself, embedded; the system voltage and who set it (app or user); the cell temperature rise, the coldest and hottest temperature, the MPPT current limit and the Voc coefficient where set; the chosen option; your own option (modules per string, strings, inverters); the AC cable length; how the roof was entered | CORE/project.py:33-60; API/schemas/project.py:62-94; headless run (keys of the demo's file) |
| What it does not hold | No results: no layout, no energy, no options computed, no files. The design runs again once opened | API/routers/export.py:43-44; WEB/lib/flow/open-project.ts:47-51; WEB/lib/device/kept-design.ts:1-3 |
| Its row and preview | Row line "The whole design, to open again in the app"; badge RTD; **Download RTD**. The preview: a **Name** field (the design's name, at most 200 characters, "A name is needed" when emptied; committed it renames the design and can be undone); under it the file's name in mono, following the name as it is typed (`{stem}.rtd`), its size in KB, "Format version 2"; then "What is in it": Module file, Inverter file (the file's name, or "The app's sample" when the design names none), Weather ("{weather name} · {n} hours", a skeleton before a run), System voltage ("{V} V", or without one the run's no-options title), Chosen option ("{letter} · {n} × {s} on {k} inverter(s)", or "None yet"; this is the run's option, which may not be the one written in the file: see the issues) | WEB/lib/flow/deliverables/items.ts:56, WEB/lib/flow/deliverables/items.ts:68; WEB/components/handover/ProjectFilePreview.tsx:47-81; WEB/lib/handover/project-file.ts:35-68; WEB/lib/flow/name-field.ts:6-14 |
| A rename | Reads neither the layout nor the run; every file is asked again for the new edit (the report prints the name) | WEB/lib/flow/edit-parts.ts:14-15; WEB/components/handover/Handover.tsx:118-136 |
| Size | The demo's file 680 KB, most of it the embedded year of weather (`weather_json`, about 529,000 characters): 696,542 bytes as the demo's document holds it (`chosen_option` ""), 696,549 inside the zip (`chosen_option` "29x22x1") | headless run |
| Other ways to download it | **Download the project file** in the project menu (any workspace) and in a design card's menu on Home | WEB/components/shell/ProjectSwitcher.tsx:68-76; WEB/components/shell/Shell.tsx:116; WEB/lib/home/cards.ts:23-30; WEB/components/home/Home.tsx:86-89 |
| Failure | A toast with the API's words and **Try again** | WEB/lib/stores/downloads-store.ts:164-169, WEB/lib/stores/downloads-store.ts:179-187 |

### Opening a project file

| Item | Value | Source |
|---|---|---|
| Where | **Open a project file** on Home (a link under the search, with Use my location, Enter the roof by hand, Import a drawing) and in the project menu (folder icon, fact ".rtd") | WEB/lib/home/home-view.ts:16-21; WEB/components/home/Home.tsx:65, WEB/components/home/Home.tsx:140; WEB/components/shell/ProjectSwitcher.tsx:70; WEB/components/shell/Shell.tsx:113, WEB/components/shell/Shell.tsx:133 |
| The dialog | Title **Open a project file**; line "A design downloaded from the app as one file."; a drop area "Drop the project file here" / "An .rtd file" with **Choose a file** (takes `.rtd`); actions **Cancel** and **Open** | WEB/components/shell/OpenProject.tsx:17-21, WEB/components/shell/OpenProject.tsx:98-110 |
| The drop area's states | Dragging over: "Let go to load the file" / "An .rtd file". Reading: "Reading the file" with the file's name. Read: the file's name, then the project's name and its roof ("90.0 × 40.0 m flat roof, tilted rows"), **Choose another**. Refused: "File not loaded" with the reason, **Choose another** | WEB/components/ui/FileDrop.tsx:88-153; WEB/lib/flow/open-project.ts:47-54; WEB/lib/device/kept-design.ts:33-42 |
| What happens | The file is read as soon as it is chosen or dropped: by the browser as text, then by the API with the engine's reader (formats 1 and 2). **Open** waits until it is read; then the design is kept on this device as a new design (a new id; the design that was open stays as it was) and opens in the Studio at the step last opened in the app (`/studio/roof`, `/array` or `/strings`; the file holds no step), where it runs | WEB/components/shell/OpenProject.tsx:26-36, WEB/components/shell/OpenProject.tsx:48-70, WEB/components/shell/OpenProject.tsx:91-96; WEB/lib/device/saving.ts:220-223; API/routers/project.py:12-21 |
| Restored and run again | Everything in the file comes back; the layout, the shading, the options and the energy are computed again. The embedded weather is used when its source is the design's and it is within 0.001° of the roof's place; else the weather is loaded again | CORE/project.py:199-218 |
| A file without a system voltage | Gets the user's country's voltage, set by the app (600 V in the US and Canada, 1000 V elsewhere) | WEB/lib/stores/project-store.ts:50-55, WEB/lib/stores/project-store.ts:65-68; CLAUDE.md rule 3 |
| A file without a format | Read as format 1. Unknown keys of the file, its roof, array and losses are dropped. Any file without `system_voltage_by` (format 1 or 2) gets "user" when it has a voltage, none when it has none | CORE/project.py:67-91, CORE/project.py:105-107; headless run (a format-2 file with 1000 V and no `system_voltage_by` came back "user") |
| Notes on a format-1 file | One note per file it names by path without the text, in the dialog under the drop area, before Open: "The module file {name} (PAN) is not included in this project. Choose it again."; "The inverter file {name} (OND) is not included in this project. Choose it again."; "The CSV weather file {name} is not included in this project. Choose it again." ({name} without its folder). The design asks for the file again until it is chosen | API/services/project_files.py:29-39; CORE/project.py:110-113; WEB/components/shell/OpenProject.tsx:118-129; headless run |
| Size limit | A request over 6,291,456 bytes (the file's name and text as JSON) is refused in the dialog before it is sent; the API takes a text of at most 5,000,000 characters | WEB/lib/flow/open-project.ts:14-22, WEB/lib/flow/open-project.ts:37-45; API/schemas/project_file.py:15-16; API/schemas/limits.py:13-14 |
| Roof limit | An outline over 30,000 m² is refused (field `roof.outline`) | CORE/geometry.py:29, CORE/geometry.py:156-164; API/services/project_files.py:23-25 |
| Try again | Offered only when the API was not reached or its answer could not be read; it reads the same file again | WEB/lib/flow/open-project.ts:56-68; WEB/components/shell/OpenProject.tsx:111-117 |
| A second file | Chosen while the first is read, it replaces it: an answer for the first changes nothing | WEB/components/shell/OpenProject.tsx:43-44, WEB/components/shell/OpenProject.tsx:55, WEB/components/shell/OpenProject.tsx:61 |

### Opening a project file: refusals, verbatim

| Message | When | Source |
|---|---|---|
| "Choose a project file (.rtd)." | The file's name does not end in .rtd (any case); no request is made | WEB/lib/flow/open-project.ts:11-12, WEB/lib/flow/open-project.ts:27-30; WEB/components/shell/OpenProject.tsx:72-81 |
| "This file is larger than any project file the app saves. Choose another." | Over 6,291,456 bytes as a request | WEB/lib/flow/open-project.ts:21-22 |
| "The file could not be read. Choose another." | The browser could not read it, or a fault that is not the API's | WEB/lib/flow/open-project.ts:24-25, WEB/lib/flow/open-project.ts:65-68 |
| "The file is not a project file (.rtd): it is not JSON." | Not JSON | API/services/project_files.py:12, API/services/project_files.py:42-46; headless run |
| "The file is not a project file (.rtd): its JSON is not an object." | JSON, not an object | API/services/project_files.py:47-48; headless run |
| "The file is not a project file (.rtd): it has no {key}." (e.g. "it has no roof.") | A key the reader needs is missing | API/services/project_files.py:52-57; headless run |
| "The file is not a project file (.rtd): it cannot be read as one ({error})." | A value of the wrong kind | API/services/project_files.py:58-59 |
| "The project file cannot be opened: {field}: {reason}" (with ". {n} more value(s) are refused" after it when more than one is) | A value out of range for a request | API/services/project_files.py:13, API/services/project_files.py:62-67; API/errors.py:109-112 |
| "The server could not finish this step. Try again." (no Try again button: see the issues) | A value the reader takes but the roof's limit check cannot (e.g. an outline that is not a list of points) | API/services/project_files.py:22-25; WEB/lib/flow/open-project.ts:63-66; headless run (500, code `internal_error`) |
| "This project file is format {n}. This version reads formats 1 and 2. Open it with a newer version of the app." | Another format | CORE/project.py:67-75; headless run |
| "This outline covers {A} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." | The roof over 30,000 m² (A the next whole m²) | CORE/errors.py:36-51; headless run (60,000 m²) |
| "text: String should have at most 5000000 characters" | A text over 5,000,000 characters that still fits the request | API/schemas/project_file.py:16; API/errors.py:109; headless run |
| "The server could not be reached. Check your connection, then try again." | No answer (Try again offered) | WEB/lib/api/errors.ts:4, WEB/lib/api/errors.ts:26-28 |
| "The server did not answer. Try again in a moment." | An answer that is not the API's (Try again offered) | WEB/lib/api/errors.ts:30-33 |

### Handover: every message, verbatim

| Message | Where and when | Source |
|---|---|---|
| "Files not made" · **Try again**, the API's words under it | The first run failed (no result ever): over the list on phone (hidden from 640 px); under the preview's head wherever a preview stands (desktop always; tablet and phone at `/handover/<item>`). On tablet at `/handover` neither stands, so the note is not on the screen (see the issues) | WEB/lib/handover/page-view.ts:15-16, WEB/lib/handover/page-view.ts:58-61; WEB/components/handover/DeliverableList.tsx:34; WEB/components/handover/Preview.tsx:85; WEB/components/shell/UnderTheTitle.tsx:27-43 |
| "Not made" | The line of each row that waits after a first run that failed (the project file keeps its own); the preview's body is empty | WEB/lib/handover/page-view.ts:17-22; WEB/lib/handover/page-view.ts:76-81 |
| "Files not updated" · "Showing the last result ·" · **Try again**, the API's words under it | A run failed after one that worked: the files of before stay. Shown where "Files not made" is | WEB/lib/handover/page-view.ts:14, WEB/lib/handover/page-view.ts:58-61; WEB/components/handover/Handover.tsx:162 |
| "Pages not made" · **Try again**, the API's words | The report's pages did not come (in the report's and the CAD layout's previews) | WEB/lib/handover/report-view.ts:13, WEB/lib/handover/report-view.ts:74-78; WEB/components/handover/CadPreview.tsx:40-41 |
| "Pages not updated" · "Showing the last result ·" · **Try again** | New pages did not come; those of before stay, dimmed | WEB/lib/handover/report-view.ts:11, WEB/lib/handover/report-view.ts:100 |
| "Hourly data not made" · **Try again**, the API's words | The CSV for the preview did not come | WEB/lib/handover/csv-head.ts:54-58; WEB/components/handover/HourlyPreview.tsx:66-67 |
| The API's words · **Try again** (toast, note) | A download or Download all failed | WEB/lib/stores/downloads-store.ts:164-169 |
| "Copied" (toast, done) | Copy of a table | WEB/lib/handover/bom-view.ts:32; WEB/lib/handover/schedule-view.ts:40 |
| "The table could not be copied. Select it and copy by hand." (toast, note) | The clipboard refused | WEB/lib/handover/copy-table.ts:7-8 |
| "Over 1 % even at 10 mm². Shorten the run or move the inverter nearer." | A string's drop over 1 % | WEB/lib/handover/schedule-view.ts:44 |
| The no-options title and message · **Open Roof** / **Open Strings** | Before options | WEB/components/shell/NoOptionsCard.tsx:16-39 |
| "The app could not finish this step." | A fault of the app itself (its detail behind Details elsewhere) | WEB/lib/flow/design-flow.ts:54-58 |
| "Not built yet" | Fallback body of a preview with no body to show | WEB/components/handover/Handover.tsx:206-207; WEB/components/shell/NotBuiltYet.tsx:3 |

### Present: how it starts

| Item | Value | Source |
|---|---|---|
| The button | **Present** (secondary, play icon, its word) at the head of Performance (beside Continue to Handover) and of Handover (desktop head; on tablet in the bar pinned at the list's foot); shown from 640 px wide, so on tablet and desktop; never on phone | WEB/components/shell/TopBar.tsx:49-62; WEB/components/performance/PerformanceHeader.tsx:27-28; WEB/components/handover/HandoverHead.tsx:53-55, WEB/components/handover/HandoverHead.tsx:65-66; WEB/app/globals.css:132 |
| By address | `/present` opens it on any size, phone too (D113) | WEB/lib/routes.ts:62-63; WEB/app/present/page.tsx:1-10; plan/README.md:150 |
| Browser tab title | **Present · SolarLayout Rooftop** | WEB/app/present/page.tsx:4 |
| What it is | The Studio's 3D scene on the whole screen without the app's bars: a tour of the design that is open, in six scenes, looping | WEB/components/present/Present.tsx:42-52; WEB/lib/present/tour.ts:76-154 |
| The app's line for the word | "The design as a tour on the whole screen, for a client" (written, not shown anywhere: see the issues) | WEB/lib/words/explain.ts:17 |
| Full screen | The browser's full screen is asked for on entry where it is allowed (a refusal is nothing) and left on exit; leaving the browser's full screen (its Esc) leaves Present | WEB/components/present/Present.tsx:132-146 |
| With no design open | Opens the design remembered as open, else the demo, as the workspaces do | WEB/components/present/Present.tsx:56; WEB/components/shell/use-opens-what-belongs.ts:9-25 |
| Asks nothing of the API | The tour reads the results already held; it pauses the Sun view's play | WEB/components/present/Present.tsx:48-52, WEB/components/present/Present.tsx:87-93 |
| The tour waits | Until the layout, the day's sun and a chosen option are there. Meanwhile the line at the foot says "Updating energy" while a run is on its way, or the run's no-options title; otherwise nothing | WEB/components/present/Present.tsx:82-85; WEB/lib/present/words.ts:31-36; WEB/components/shell/vitals-view.ts:68 |

### Present: the six scenes

| # | Scene (panel name · track) | Time | What the stage does | The panel: figure · label | The foot's noun | Source |
|---|---|---|---|---|---|---|
| 1 | The place · Place | 4 s | The camera moves from plan to 3D over the satellite; nothing of the building yet | The place's name (D114) · "{lat}° N\|S · {lon}° E\|W" (2 decimals); a design without a place's name: the coordinates · "Latitude · longitude". The demo: "Pune" · "18.52° N · 73.86° E" | "The roof from above" | WEB/lib/present/tour.ts:77-88; WEB/lib/present/scene-panel.ts:51-61 |
| 2 | The roof · Roof | 4 s | The building rises in the first half, the obstacles in the second | "{area} m²" · "Roof area" or "Roof area · {n} obstacle(s)". The demo: "3,600 m²" · "Roof area · 6 obstacles" | "The roof in 3D" | WEB/lib/present/tour.ts:89-100; WEB/lib/present/scene-panel.ts:62-63 |
| 3 | The array · Array | 6 s | The modules fill in over the scene | "{positions}" · "Module positions · {n} row(s)". The demo: "790" · "Module positions · 6 rows" | "The array" | WEB/lib/present/tour.ts:101-112; WEB/lib/present/scene-panel.ts:64-66; headless run (790 positions, 6 rows) |
| 4 | The sun · {day} · Sun | 12 s | The hour runs from the first quarter-hour after sunrise to the last before sunset (00:00 to 24:00 on a day the sun does not set or rise), the sun moving along its arc (the sun path drawn) with the shadows | Name "The sun · {d Month}" (the Sun view's day, the design day unless changed; the demo "21 December"); figure the solar time "HH:MM"; label "Solar time · sun {x}° high", or "Solar time" while the sun is down | "Shadows over the day" | WEB/lib/present/tour.ts:113-124, WEB/lib/present/tour.ts:198; WEB/lib/present/scene-panel.ts:67-73; WEB/lib/flow/sun-day.ts:40-50; WEB/lib/flow/design-flow.ts:130 |
| 5 | The strings · Strings | 4 s | The modules coloured by MPPT; the hour back to the Studio's | "{kWp} kWp" · "{n} string(s) of {s} modules". The demo: "357.28 kWp" · "22 strings of 29 modules" | "The strings" | WEB/lib/present/tour.ts:125-136; WEB/lib/present/scene-panel.ts:74-76 |
| 6 | The energy · Energy | 10 s | Coloured by MPPT; the energy counts up over the first 6 s, eased out, then holds | "{MWh} MWh" counting up in the place of its final value · "Energy to the grid in year 1". The demo: "617.8 MWh" | "Energy over the year" | WEB/lib/present/tour.ts:73-74, WEB/lib/present/tour.ts:137-148; WEB/lib/present/scene-panel.ts:77-81; WEB/lib/present/counting.ts:7-24 |

| Item | Value | Source |
|---|---|---|
| A loop | 40 s; then the first scene again | WEB/lib/present/tour.ts:153-154, WEB/lib/present/tour.ts:176-186 |
| The panel | At the stage's top left (16 px from the edges on phone, 40 on tablet and desktop) on a dim, blurred panel: the scene's name, its one figure, the figure's label; it fades in with its scene. A scene whose facts are not there shows no panel | WEB/components/present/PresentPanel.tsx:15-45; WEB/lib/present/scene-panel.ts:54 |
| The foot's left | The design's name, DC capacity and energy, "{name} · {kWp} kWp · {MWh} MWh a year" (the demo "Pune demo roof · 357.28 kWp · 617.8 MWh a year"; the name alone before a run with an option); under it the scene's noun, or why the tour waits; they rise above the controls while those show | WEB/components/present/Present.tsx:170-193; WEB/lib/present/words.ts:16-22 |
| The imagery's attribution | Under the words while the satellite imagery is the ground (the Layers choice, as in the Studio) | WEB/components/present/Present.tsx:195-208 |
| The keys' line | "Space pauses · ← → move between scenes · Esc leaves" at the foot's right, on desktop only, during the first loop while the controls are hidden; then gone | WEB/lib/present/controls.ts:10-11, WEB/lib/present/controls.ts:37; WEB/components/present/Present.tsx:210-221 |
| Screen readers | A hidden list "On the roof": "{revealed} of {n} modules in {rows} rows", "The ground is the satellite imagery" or "The ground is plain, with a grid", the sun's line ("{d Mon}, {HH:MM} solar time, sun {x}° high, {bearing}" or "…, the sun is down"), the strings | WEB/components/present/Present.tsx:233-261; WEB/lib/flow/sun-time.ts:39-43 |
| Leaving | The tour stops and gives back the hour and the camera it found; the presentation is cleared | WEB/lib/present/create-tour.ts:129-138 |

### Present: the presenter's controls and keys

| Item | Value | Source |
|---|---|---|
| The bar | At the foot (16 px from the edges on phone, 40 on tablet and desktop) on a dim, blurred panel: **Scene before** (chevron, tooltip "Scene before" ←), **Pause** / **Play** (round, 48, filled in the text colour with the icon in the ground's; tooltip with "Space"), **Scene after** (chevron, tooltip "Scene after" →), "Paused" while paused, the track of six, **Leave** (with an "Esc" key cap on desktop) | WEB/components/present/PresentControls.tsx:16-33, WEB/components/present/PresentControls.tsx:84-116 |
| The track | Six segments, the scenes done full, the current one filling as it plays, the rest empty; each a press to its scene from its start, named "Scene {n}: {name}"; the short name under each on tablet and desktop (Place, Roof, Array, Sun, Strings, Energy), bars alone on phone | WEB/components/present/PresentControls.tsx:35-58; WEB/lib/present/controls.ts:27-35 |
| When the bar shows | On a move of the pointer, a press, a touch, a key of the tour, or Tab (which also puts the focus on its first control); hidden 3 s after the last of them while the tour plays; held while paused or while the focus is in it. Hidden, it is out of the way of the pointer and the focus | WEB/components/present/Present.tsx:39-40, WEB/components/present/Present.tsx:104-113; WEB/components/present/PresentControls.tsx:71-81, WEB/components/present/PresentControls.tsx:93-98; WEB/lib/present/controls.ts:7-8, WEB/lib/present/controls.ts:50-83 |
| Keys | Space: pause or play. ←: the scene before. →: the scene after. Esc: leave. Any other key, and any key held with Alt, Ctrl or ⌘, does nothing | WEB/lib/present/controls.ts:13-23; WEB/components/present/Present.tsx:115-130 |
| Before and after | Each goes to a scene's start. After the last: the first of the next loop. Before the first: the last scene (of this loop in the first loop, else of the loop before). Pressed while paused (or a press on the track), the tour goes to that scene's start and stands there; Pause alone holds the moment it is at | WEB/lib/present/tour.ts:208-227; WEB/lib/present/create-tour.ts:94-116, WEB/lib/present/create-tour.ts:139-151 |
| The bar while the tour waits | Not shown: the controls stand only while the tour runs, so before the layout, the day's sun and an option are there only Esc (or leaving the browser's full screen) leaves (see the issues) | WEB/components/present/PresentControls.tsx:83; WEB/components/present/Present.tsx:87-93, WEB/components/present/Present.tsx:116-130 |
| A touch or a click on the stage | Shows the controls; it does not leave | WEB/components/present/Present.tsx:39-40, WEB/components/present/Present.tsx:107-108 |
| Where Leave and Esc return | Always to the Studio, at the step last opened there (`/studio/roof`, `/studio/array` or `/studio/strings`), not to the page Present was opened from: from Performance or Handover, Leave lands on a Studio step (see the issues). Leaving the browser's full screen does the same | WEB/components/present/Present.tsx:95-102; WEB/lib/routes.ts:50 |

### Present: reduced motion and when 3D cannot be drawn

| Item | Value | Source |
|---|---|---|
| Reduced motion (the system's setting) | Each scene a still held for its time and changed with a fade: the camera cut, never moved (scene 1 in plan, the others in 3D); the building, obstacles and modules whole from the start of their scenes; the day scene at the hour the Studio holds, under the sun's arc; the energy at its final figure | WEB/lib/present/tour.ts:156-174; WEB/lib/present/create-tour.ts:123; WEB/components/present/Present.tsx:223-231 |
| When 3D cannot be drawn | The plan of the roof (north up) stands in for the scene with "This browser cannot draw the roof in 3D." (no WebGL) or "The browser stopped drawing the roof in 3D." (the context lost); the sun's marks and the attribution go; the tour, the panel, the words and the controls go on | WEB/components/present/Present.tsx:64-67, WEB/components/present/Present.tsx:150-162; WEB/components/studio/stage-words.ts:1-5; WEB/components/studio/PlanFallback.tsx:25-48 |

#### Known-stale (this area)

| Claim | Truth | Source |
|---|---|---|
| D93 and STATE: a waiting row after a failed first run says "Not made · the run failed"; issue #216's scope: "Not made: the run failed" | The row says "Not made"; the note's title is "Files not made" with the API's words | plan/README.md:130; plan/STATE.md:140; plan/v2/issues/09-v2-9-handover-and-home.md (Scope in, 4); WEB/lib/handover/page-view.ts:16-18 |
| Issue #216's scope: the Earth line "Heights are in the names; Google Earth draws the shapes flat." | "Google Earth draws the shapes flat. Heights are in the names." | plan/v2/issues/09-v2-9-handover-and-home.md (Scope in, 3); WEB/lib/handover/earth-view.ts:29 |
| The list's route comments: "on desktop and tablet with the first item's preview beside it" | On tablet `/handover` is the list alone; only desktop shows the first file beside it (as the IA doc says) | WEB/lib/routes.ts:56-58; WEB/app/(workspaces)/handover/page.tsx:6; WEB/app/(workspaces)/handover/[item]/page.tsx:15; WEB/components/handover/Handover.tsx:165; docs/design/information-architecture.md:65-68 |
| STATE: Handover's project file "opens again here" | The line is "The whole design, to open again in the app" | plan/STATE.md:34; WEB/lib/flow/deliverables/items.ts:68 |
| API docs: "csv: the 8,760 hours" | One row a weather hour (the count the weather has) | API/routers/export.py:41; WEB/lib/flow/deliverables/items.ts:98-99 |
| The zip's docstring: "the five files of the option the project has chosen, and the project file" | Seven files of the option and the project file (the router's docstring says so) | API/services/export.py:139-141; API/services/export.py:109-118; API/routers/export.py:44-45 |
| Comments naming "Save a copy" for the project file's download | The words are "Download the project file" (menu) and "Download RTD" (Handover) | WEB/lib/stores/downloads-store.ts:4-5; WEB/components/shell/TopBar.tsx:33; WEB/components/shell/ProjectSwitcher.tsx:62; WEB/components/shell/ProjectSwitcher.tsx:72 |
| Comments: "Copy as table", toast "Bill of materials copied as a table" | The button is "Copy", the toast "Copied" | WEB/components/handover/CopyAsTable.tsx:10, WEB/components/handover/CopyAsTable.tsx:19; WEB/components/handover/CopyAsTable.tsx:16; WEB/lib/handover/bom-view.ts:32 |
| Preview's comment: the head's action "44 square with the icon alone on phone"; CopyAsTable's: "on phone an icon button of 44 with the words as its name" | Both show their word on every size: **Download** (named "Download {FORMAT}") and **Copy** | WEB/components/handover/Preview.tsx:36-37, WEB/components/handover/Preview.tsx:77-81; WEB/components/handover/CopyAsTable.tsx:19-21, WEB/components/handover/CopyAsTable.tsx:37-40 |
| CableSchedule comment: "the engine's eight columns" | Nine columns, eight of them sort | WEB/components/handover/CableSchedule.tsx:18; WEB/lib/handover/schedule-view.ts:49-66 |
| ProjectFilePreview comment: "Format 2" | "Format version 2" | WEB/components/handover/ProjectFilePreview.tsx:44; WEB/lib/handover/project-file.ts:38 |
| Issue #220's scope: track "dots on phone" | Bars without names on phone | plan/v2/issues/13-v2-13-present.md (Scope in, 3); WEB/components/present/PresentControls.tsx:35, WEB/components/present/PresentControls.tsx:53 |
| The Present browser test: Present in the top bar, "Press any key or touch the screen to return", the old scene words ("The satellite from above tilts into 3D" …), any key or touch returns | Present is at the heads of Performance and Handover; only Esc or Leave leaves; the nouns are "The roof from above" … (the test describes the old Present, plan/STATE.md:128) | e2e/tests/present.e2e.ts:6-8, e2e/tests/present.e2e.ts:22-33, e2e/tests/present.e2e.ts:141-192; WEB/lib/present/tour.ts:76-149; WEB/lib/present/controls.ts:15-23 |
| `open-project.ts` cites D5 for "the results are never in the file" | D5 is "No database, no auth"; that the file holds no results is the export router's | WEB/lib/flow/open-project.ts:49; plan/README.md:48; API/routers/export.py:43-44 |

#### Facts we do not have (this area)

- How the report's plan, shadow plan, loss diagram and monthly chart are drawn in detail (colours, legends, labels); only the titles, tables and lines are read here (`CORE/plots.py` not read in full).
- How well the DXF opens in particular CAD programs, and how Google Earth renders the KMZ.
- The coordinate origin of the DXF for a roof imported from a drawing or entered by hand (local metres, x east, y north, but where 0,0 lies was not traced).
- Whether the browser grants full screen on entry to Present on each browser (iPhone Safari has no element full screen); the code asks and ignores a refusal.
- The exact day Present's sun scene shows when the user picked "Any date" in the Sun view: the code takes the Sun view's day (`sunTime.day`, the design day by default); only the default was traced.
- Present's camera paths and how the dome is framed (D72); not read (`lib/scene/camera-move.ts`).
- What a very large design (many strings) looks like in the preview's single-line diagram, and the report's number of pages beyond the formula.
- Production (`rooftop.solarlayout.app`) was not opened; every runtime fact is from the headless run of `c6aeb66` (the writer's, and the reviewer's re-run of the exports' bytes, `POST /project/open` and the demo's document).
- The browser's own sizes: the headless zip was made from the demo document with `chosen_option` set; the browser's request carries the document as the app holds it, so a byte or two may differ (the KB shown were the same in every case checked).
- Whether a note toast queued on Present (issue 8) is still on the screen when the Studio opens after Leave: note toasts stay until closed (WEB/components/ui/toast-queue.ts:32-37), so it should show there; not seen in a browser.

#### Product issues noticed (this area)

Reviewed 2026-10-13: 1 to 8 and 10 confirmed (some widened), 9 dropped, 11 to 15 added by the review.

1. **"10:60" in Present's sun scene.** Confirmed: `hourOf` rounds the minutes alone, `hourOf(10.999)` → "10:60" (re-run with bun). The day scene's hour moves in 50 ms ticks over the day's hours, about 2.75 minutes a tick on an 11-hour day, so some ticks land within half a minute of an hour and the panel's figure and the screen reader's line show ":60" for that tick. WEB/lib/geometry/keepout.ts:17-21; WEB/lib/present/scene-panel.ts:71; WEB/lib/present/create-tour.ts:15; WEB/lib/present/tour.ts:198.
2. **On tablet a file's own page has neither Download all nor Present.** Confirmed by reading: below desktop the head is hidden at `/handover/<item>` and the pinned bar stands only at `/handover`; D113 keeps Present at the head of Handover on tablet. Arguably the design (the file is pushed over the list), but D113's words cover it. WEB/components/handover/Handover.tsx:151-153, WEB/components/handover/Handover.tsx:212; WEB/components/handover/HandoverHead.tsx:53, WEB/components/handover/HandoverHead.tsx:61-69; plan/README.md:150.
3. **The roof's words in the Open dialog, and on the design cards, do not use D112's names.** Confirmed: `roofWordsOf` writes "flat roof, tilted rows", "flat roof, east-west", "sloped roof", and the same words are the cards' facts on Home and in the project menu (`roofWords`); D112 asks for Find's long names in every line and list. WEB/lib/device/kept-design.ts:33-42, WEB/lib/device/kept-design.ts:52; WEB/lib/flow/open-project.ts:52-54; plan/README.md:149.
4. **The report is not in V2's vocabulary.** Confirmed in the PDF's text: page 3 "Near shading, linear … electrical beyond linear … far (horizon) … keep-out left empty" and "(window 9:00–16:00)"; page 4's loss diagram "Far shading, horizon", "Near shading, linear", "Electrical shading"; page 1 "Weather · PVGIS TMY". Voice §6 keeps the trade's terms in the report but lists exactly these as "Not" ("Near, linear", "Far shading", "Electrical, beyond linear", "Shade-free window", "PVGIS TMY … as names"); "Area kept clear" is D103's. Issue #216 scoped the report's content out (V2-95). CORE/export/report.py:117-145; CORE/export/summary.py:51-54; plan/v2/voice.md (§6, the rows "Shade-free hours", "Near shading", "Horizon shading", "String shading loss", "Weather"); headless run.
5. **The project file's size and option can differ between the row, the preview and the file.** Confirmed headless: the row's size is of the `.rtd` inside the zip, which names the run's option (the demo: `chosen_option` "29x22x1", 696,549 bytes); Download RTD and the preview's size are of the document as it is (the untouched demo: `chosen_option` "", 696,542 bytes), formatted by another rule (whole KB, never MB). Both read 680 KB for the demo. The preview's "Chosen option" row says the run's option ("A · 29 × 22 on 1 inverter") while the downloaded file names none until the user chooses. WEB/lib/flow/deliverables/items.ts:78-83, WEB/lib/flow/deliverables/items.ts:117; WEB/lib/handover/project-file.ts:48-59; WEB/lib/stores/downloads-store.ts:44-47; WEB/components/shell/stores.tsx:67-71.
6. **"1 strings".** Confirmed and widened: the single-line diagram's title "Single-line diagram · {n} strings of …" (PNG, report, preview) and the report's Stringing row "{n} in series × {s} strings on …" do not follow the count. CORE/plots.py:223; WEB/lib/handover/sld.ts:118; CORE/export/summary.py:44-48.
7. **Two of the app's own words are written and never shown.** Confirmed: "Present" and "Project file" have their D96 lines in `EXPLAIN`; nothing passes either to `lineOf` or `FirstMeeting` (searched WEB). The Handover title's first-meeting line has no ? disc after it (D96: "then behind the quiet ? disc"). The "Project file" line ("The whole design in one file, to open again in the app") also differs from the row's line. WEB/lib/words/explain.ts:15-17; WEB/components/handover/HandoverHead.tsx:49-52; WEB/lib/flow/deliverables/items.ts:68.
8. **On Present a design that cannot be opened from the device is not said there.** Confirmed: Present opens the demo instead and queues the note "… The demo is open instead.", but `/present` renders no toaster; the note waits in the queue and would appear only in the Studio after Leave. WEB/components/present/Present.tsx:56, WEB/components/present/Present.tsx:148-167; WEB/components/shell/use-opens-what-belongs.ts:23; WEB/components/shell/Shell.tsx:135.
9. *Dropped.* "A download with no design open would say 'The app could not finish this step.'" The words are real (WEB/lib/stores/downloads-store.ts:128 through WEB/lib/flow/design-flow.ts:54-58), but no screen reaches them: `saved` returns before asking when no design is open (WEB/lib/stores/downloads-store.ts:159), and the page's own asks run only with a design and an option (WEB/components/handover/Handover.tsx:88-89, WEB/components/handover/Handover.tsx:108, WEB/components/handover/Handover.tsx:131). Dead words, not behaviour.
10. **The demo's own module raises a warning in its report.** Confirmed in the PDF: page 1 ends "Note: Voc coefficient -0.164 %/°C is outside the usual -0.35 to -0.20 %/°C for crystalline silicon. Check the datasheet and enter it if it differs." A demo-data oddity rather than a fault of the report; every screenshot of the demo's page 1 shows it. CORE/export/report.py:102-103; headless run.
11. **On tablet, Handover's list says nothing of a run that failed.** Added: the note "Files not made" / "Files not updated" with Try again stands over the list only under 640 px (`tablet:hidden`) and in the preview, which at `/handover` is hidden below desktop; so on tablet at `/handover` the rows read "Not made" with no reason and no Try again until a file is opened. Read, not seen in a browser. WEB/components/handover/DeliverableList.tsx:16-17, WEB/components/handover/DeliverableList.tsx:34; WEB/components/handover/Handover.tsx:162, WEB/components/handover/Handover.tsx:165; WEB/components/handover/Preview.tsx:85.
12. **A project file with a malformed outline is refused as a server fault.** Added, headless: `{"roof": {"outline": "abc", …}}` gets 500 `internal_error` "The server could not finish this step. Try again.", since the roof's limit is checked after the reader's own refusals; the dialog shows those words under "File not loaded" and offers no Try again (only `api_unreachable` and `unexpected_answer` get one), and trying again would fail the same way. API/services/project_files.py:22-25, API/services/project_files.py:52-59; CORE/geometry.py:156-164; WEB/lib/flow/open-project.ts:63-66.
13. **While Present's tour waits there is no Leave on the screen.** Added: the controls render only while the tour runs, and the tour starts only once the layout, the day's sun and an option are there; before that (a run on its way, no options) a tablet without a keyboard has no Leave, only leaving the browser's full screen where it was granted, or the browser's Back. WEB/components/present/PresentControls.tsx:83; WEB/components/present/Present.tsx:83-93. Read, not seen in a browser.
14. **Leave returns to the Studio even from Performance and Handover.** Added: Leave, Esc and leaving full screen push the Studio's last lens (phase 10's rule, when Present stood in the Studio's top bar); in V2 Present's buttons are on Performance and Handover, so the presenter lands on Roof, Array or Strings rather than the page they left. WEB/components/present/Present.tsx:95-102; WEB/components/shell/TopBar.tsx:49-52. An oddity to put to the owner, not documented as an issue of behaviour until answered.
15. **An opened project file may have an empty name.** Added, headless: `POST /project/open` accepts `"name": ""` (the schema has no minimum), the dialog's read line is then empty, and the files are named `rooftop-design…`; the app's Name field never allows an empty name ("A name is needed"). API/schemas/project.py:65; WEB/lib/flow/name-field.ts:9; API/services/export.py:238.

## Confirmed while writing and reviewing the pages (at `c6aeb66`)

Facts the page writers and reviewers needed, read in the code (2026-10-13) and checked again here.

| Item | Value | Source |
|---|---|---|
| Ground cover ratio | Tilted rows: the table's length up its slope (the modules in tilt and the gaps between them) over the row spacing; East-west and Sloped: 1.0 | CORE/placement.py:173,233 |
| East-west GCR's L | The module's width, its side up the slope: GCR = 2 × the module's width / (W + g) | CORE/placement.py:238-239,287 |
| Row-to-row shading | The edge in front shades the table from its lower edge up to u* = (H − D·tanψ) / (sinβ + cosβ·tanψ), ψ the sun's profile angle | CORE/shading.py:4-6,141-155 |
| The sky's diffuse light | Taken as isotropic: each of the sky's sectors blocked to an elevation h loses sin²h of it, averaged over the sectors | CORE/geometry.py:317-322,355-357 |
| No horizon | With no horizon there is no far block, and the sky lost to it is zero: Horizon reads zero | CORE/shading.py:245-249; CORE/geometry.py:339-357 |
| A draft obstacle's starting values | Rotation 0°, diameter 4 m for a tree and 2 m otherwise, no height, thickness 0.2 m, the crown starting 2 m up | WEB/lib/geometry/obstacle-fields.ts:149-153 |
| Escape in a draft's height field | Gives up the typed value; it does not drop the draft (Cancel does) | WEB/components/studio/ObstaclePanel.tsx:82 |
| Preliminary | The library marks a file its maker calls preliminary | WEB/lib/equipment/catalog.ts:31 |
| An outline edit refused | "The outline cannot cross itself. The roof stays as it was." also when a dragged corner would leave the roof under 1 m² | WEB/lib/geometry/outline-edit.ts:8,38 |
| A field given what is not a number | Keeps the value it had | WEB/components/ui/number-entry.ts:46 |
| "Fills the inverter" | Given only to an option in the target whose strings fill its inverters ("Fills the inverters" with more than one) | CORE/readouts.py:159-161 |
| The string lengths tried | Up to three lengths, the longest first; the inverter's nominal MPP voltage gives one of them | CORE/stringing.py:65-66,178-190 |
| Performance's summary and the report | The summary under All 21 steps holds the rows of the report's first page with a Losses row added; the report's page has no Losses row | CORE/export/summary.py:26-62; CORE/readouts.py:315-324 |
| The time a run takes | docs/deployment.md gives about 6 s for a roof at the limit, measured in the API's image (Phase 13); the time a deployed run takes on a user's connection is not known (part 5). Pages state no run time | docs/deployment.md:78-79 |
| A project file opened twice | Each opening keeps it as a design of its own, under a new id: two designs | WEB/components/shell/OpenProject.tsx:93; WEB/lib/device/saving.ts:220-223 |
| A design card's picture | A plan of the roof alone until a layout exists, then of the roof with its module positions | WEB/lib/device/kept-design.ts:24,60 |
