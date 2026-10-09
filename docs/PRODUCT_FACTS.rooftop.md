# SolarLayout Rooftop — verified product facts

**This file is the only permitted factual source for the SolarLayout Rooftop
pages** (`/docs/rooftop`). If a number, label or behaviour is not here, do not
state it on a page. Every value was read from the product's code in the
`rooftop-design-app` repository and carries a `file:line` citation.

**Verified against `main` at `cd3f0ae` on 2026-10-09** (written at `75591f2` the same day, re-verified after #172 to #178). Where the app's own
in-app help, a code comment or a design document says something the code
contradicts, it is listed under the area's *Known-stale* heading and must not
be repeated. Product defects noticed while reading are listed under *Product
issues noticed*: never describe them as behaviour.

The app's 31 in-app help topics are its own words for each section; the docs
go deeper and never contradict them, and each topic links to its docs page
(writing guide, "Writing for the SolarLayout Rooftop tree"). A fact the help
states and the code confirms is cited to the code.

Citations are relative to the repository root, shortened:

| Short | Path |
|---|---|
| `WEB` | `apps/web` (the browser app) |
| `API` | `apps/api/src/rooftop_api` (the web API) |
| `CORE` | `apps/api/src/rooftop_core` (the engine) |
| `HELP` | `apps/web/content/help` (the in-app help topics) |

Other paths (`docs/`, `plan/`, `infra/`, `apps/api/tests/`) are from the repository root. In quoted
interface text, `{braces}` and `<angle brackets>` stand for a value the app fills in, such as a name or a number.

## Decisions that bind the pages

Product decisions that are not in the code, recorded by Arun on
SolarLayout/solarlayout_desktop_docs#19 (2026-10-09) and in this repo's
`docs/WRITING_GUIDE.md`. Pages follow them as they follow the code.

| Decision | What pages say | Source |
|---|---|---|
| Access at launch | Free, no sign-in, as the app is today. Said one way: "Free, no account needed. Your designs are kept on this device." The code proves no sign-in (§ Access, devices and install); it says nothing about price, so "free" rests on this decision | #19, decision 1; `docs/WRITING_GUIDE.md`, "Writing for the SolarLayout Rooftop tree" |
| The action | **Open Rooftop**, to `https://rooftop.solarlayout.app`. It is added to the home screen, never installed or downloaded | #19, decision 1; writing guide |
| Name | **SolarLayout Rooftop**, then *Rooftop*. Never "Rooftop Desktop", a tool, the web version or the cloud product | #19, decision 2; writing guide, "Names" |
| Where the pages live | `/docs/rooftop`; the app's Docs link and each help topic open its page, never the index at `/docs` | #19, decisions 6, 8, 12 |
| Help and docs | The 31 help topics are the app's own words; the docs go deeper and never contradict them; one source of facts; the app's help-upkeep rule extends to the docs | #19, decision 8 |
| Release notes | A *What's new* page of dated entries, one per update that changes what users meet; no version numbers | #19, decision 9 |

## Contents

1. The app: identity, access, storage, Home, help, Present, data and limits
2. Find: the roof on the map
3. The Studio, and its Roof and Array lenses
4. The Sun and Strings lenses
5. Performance
6. Handover and the project file

Each part ends with its own *Known-stale*, *Facts we do not have* and *Product issues noticed* lists.

## 1. The app: identity, access, storage, Home, help, Present, data and limits

### Identity and areas

| Item | Value | Source |
|---|---|---|
| Product name | **SolarLayout Rooftop** | WEB/lib/brand/brand.ts:7 |
| Short name (under the installed icon) | **Rooftop** | WEB/lib/brand/brand.ts:8; WEB/app/metadata.ts:11 |
| Description (page and manifest) | "Rooftop PV design." | WEB/app/metadata.ts:10; WEB/app/manifest.ts:10 |
| Wordmark in the app | "SolarLayout Rooftop" ("Rooftop" in a lighter weight) | WEB/components/shell/Logo.tsx:12,19 |
| Icons | 192×192 and 512×512 PNG ("any"), 512×512 maskable PNG, under `/app-icons/`; Apple touch icon 180×180 | WEB/lib/brand/app-icons.ts:11-20; WEB/app/apple-icon.tsx:6-10 |
| Theme / background colour | `#0B0E13` (dark) | WEB/lib/brand/brand.ts:9; WEB/app/manifest.ts:15-16 |
| Production address | https://rooftop.solarlayout.app | docs/deployment.md:11 |
| Staging address | https://rooftop.staging.solarlayout.app | docs/deployment.md:11 |
| Hosting | Web app on Vercel (region `bom1`); API on AWS Lambda in `ap-south-1`, reached only through the web origin at `/api/*` | docs/deployment.md:12-13,18-19; WEB/vercel.json:3; WEB/next.config.ts:39-41 |
| Page language | English (`lang="en"`), one dark theme | WEB/app/layout.tsx:14 |

Areas (each has its own address):

| Area (user-facing name) | Address | Browser tab title | Source |
|---|---|---|---|
| Home | `/` | "SolarLayout Rooftop" | WEB/lib/routes.ts:51-52; WEB/app/page.tsx:4 |
| Find and outline | `/find` (or `/find?at=<lat>,<lon>&place=<label>`) | "Find and outline · SolarLayout Rooftop" | WEB/lib/routes.ts:70-92; WEB/app/find/page.tsx:5 |
| Studio, with four lenses: **Roof**, **Array**, **Sun**, **Strings** | `/studio/roof`, `/studio/array`, `/studio/sun`, `/studio/strings`; `/studio` goes to Roof | "<Lens> · Studio · SolarLayout Rooftop" | WEB/lib/routes.ts:14-19,48; WEB/app/(workspaces)/studio/page.tsx:5-7; WEB/app/(workspaces)/studio/[lens]/page.tsx:12 |
| Performance | `/performance` | "Performance · SolarLayout Rooftop" | WEB/lib/routes.ts:67; WEB/app/(workspaces)/performance/page.tsx:4 |
| Handover (items: Design report, Single-line diagram, Bill of materials, DC cable schedule, CAD layout, Google Earth model, Hourly data, Project file) | `/handover`, `/handover/<item>` | "Handover · SolarLayout Rooftop" / "<Item> · Handover · SolarLayout Rooftop" | WEB/lib/routes.ts:24-33,58; WEB/app/(workspaces)/handover/page.tsx:4; WEB/app/(workspaces)/handover/[item]/page.tsx:12 |
| Present | `/present` | "Present · SolarLayout Rooftop" | WEB/lib/routes.ts:61; WEB/app/present/page.tsx:4 |

Moving between areas:

| Item | Value | Source |
|---|---|---|
| Workspaces | Studio, Performance and Handover are "the three workspaces"; they share one design and one top bar | WEB/lib/routes.ts:4-9; WEB/app/(workspaces)/layout.tsx:4-6 |
| Workspaces on tablet and desktop | A segmented control in the top bar ("Workspaces") | WEB/components/shell/WorkspaceNav.tsx:13-16,24-42 |
| Workspaces on phone | A tab bar at the bottom with icons: Studio, Performance, Handover | WEB/components/shell/WorkspaceNav.tsx:51-71; WEB/components/shell/Shell.tsx:103 |
| Studio is entered at | The lens opened last | WEB/lib/routes.ts:63-68 |
| Lenses | Desktop: rail at the left; tablet: row floating over the 3D view; phone: a four-way switch at the top of the bottom sheet | WEB/components/shell/LensNav.tsx:6; WEB/components/studio/Studio.tsx:52,56,69 |
| Back to Home | The logo in the top bar ("Home"), on every size; also **Home** in the project switcher | WEB/components/shell/TopBar.tsx:79-87; WEB/components/shell/ProjectSwitcher.tsx:75 |
| Project switcher rows | **New design** (Find the roof, goes to `/find`), **Open a project** (.rtd), **Import a drawing** (KMZ, KML, DXF), **Save a copy** (.rtd), **Home** | WEB/components/shell/ProjectSwitcher.tsx:71-75 |
| Top-bar buttons | **Present** (play icon; word shown from desktop width) and **Export** (leads to Handover) | WEB/components/shell/TopBar.tsx:49-71,115-118 |
| Home and Find | Outside the workspaces' shell: no top bar, no tab bar | WEB/components/home/Home.tsx:56-62; WEB/app/(workspaces)/layout.tsx:4-6 |

### Access, devices and install

| Item | Value | Source |
|---|---|---|
| Sign-in / account | None. No auth library, no middleware, no auth dependency on any API route; the Function URL is public (`auth-type NONE`) | WEB/package.json (dependencies); API/main.py:25-35; infra/aws/README.md:115,117; plan/README.md:48 (D5 "No database, no auth") |
| What the UI says about cost or accounts | Nothing: no copy mentions price, "free" or accounts | (searched WEB/components, WEB/lib, WEB/app, HELP: no match) |
| Phone / tablet / desktop breakpoints | Phone under 640 px; tablet 640 px to 1100 px; desktop from 1101 px | WEB/app/globals.css:209-210; docs/design/information-architecture.md:29 |
| Top-bar width steps | "tablet-wide" at a shell width of 820 px; "desktop-wide" at 1360 px | WEB/app/globals.css:211-212,812-821 |
| Installable | Web app manifest: `display: "standalone"` (opens without the browser's bars), `start_url` and `scope` `/` | WEB/app/manifest.ts:6-16 |
| iPhone/iPad Home Screen | `appleWebApp.capable: true`, title "Rooftop", status bar "black-translucent"; the page covers the whole screen (`viewportFit: "cover"`) and keeps clear of the notch and home bar | WEB/app/metadata.ts:8-12; WEB/app/viewport.ts:9-14 |
| Install prompt | None in the app (no `beforeinstallprompt`, no install copy) | (searched WEB: no match) |
| Browser needs | 3D needs WebGL; without it: "This browser cannot draw the roof in 3D." and a plan view instead; if lost: "The browser stopped drawing the roof in 3D." | WEB/components/studio/stage-words.ts:4-5; WEB/components/present/Present.tsx:65,116-117 |
| Device storage needed | IndexedDB to keep designs; without it the error is "this browser has no IndexedDB" | WEB/lib/device/designs-db.ts:24,39 |

### Where designs are kept

| Item | Value | Source |
|---|---|---|
| Mechanism | The browser's IndexedDB: database `rooftop`, store `designs`, keyed by the design's id, indexed by last edit | WEB/lib/device/designs-db.ts:1-11,44 |
| What one record holds | id (random UUID), name, the whole design document, card facts (roof in words, DC kWp and year-1 MWh of the last run), a 320×180 SVG plan thumbnail, edited time, opened time | WEB/lib/device/kept-design.ts:17-30; WEB/lib/device/saving.ts:90 |
| What is never kept | Results: a design opened runs again | WEB/lib/device/kept-design.ts:1-3; WEB/lib/flow/open-project.ts:26-27 |
| localStorage keys | `rooftop.open-design` (id of the open design, to reopen it after a reload); `rooftop.demo-run` (the demo's DC kWp and MWh, for the Home card); `rooftop.tips-gone` (map tips dismissed) | WEB/lib/device/remembered.ts:1-5; WEB/lib/device/demo-run.ts:1-9; WEB/lib/device/tips-seen.ts:1-6 |
| When a design is saved | Automatically, 600 ms after the last edit (and after a run or layout lands); also at once when the page is left | WEB/lib/device/saving.ts:1-8,58-62; WEB/components/ui/design-numbers.ts:75 |
| Demo and new designs | Not kept until their first edit; then kept under a new id | WEB/lib/device/saving.ts:4-5,19,176-181 |
| Save state words | "Saved on this device", "Saving", "Not kept on this device", "Not saved" | WEB/components/shell/SaveState.tsx:17-24 |
| A write that fails | Note "Not saved on this device", with the browser's reason, "This design · on this device", and a try-again action; the next edit tries again | WEB/components/shell/notes-view.ts:123-130; WEB/lib/device/saving.ts:8,56-57 |
| Quota / private window | No quota check of its own: a failed IndexedDB write shows "Not saved" with the browser's words; a refused localStorage is ignored silently (the open design is just not remembered) | WEB/lib/device/designs-db.ts:52-67; WEB/lib/device/remembered.ts:1-3,23-25 |
| After a reload | The design remembered as open is reopened from the device, else the demo; a kept design that cannot be read opens the demo and says "<reason> The demo is open instead." | WEB/components/shell/use-opens-what-belongs.ts:9-25; WEB/lib/device/opening.ts:16-36 |
| Another browser or device | Designs live in this browser only. Copy shown: "Your designs are kept on this device." Moving a design: **Save a copy** (.rtd) then **Open a project** on the other device ("A saved .rtd file, from this device or a colleague") | WEB/lib/home/home-view.ts:25-33; WEB/components/home/Home.tsx:37 |
| Delete | Home card menu > **Delete**: dialog title "Delete <name>?", body "It is kept on this device alone.", buttons **Cancel** (focused) and **Delete**. An open design that is deleted stays open, no longer kept; its next edit keeps it again under a new id | WEB/lib/home/cards.ts:49-52; WEB/components/home/OnThisDevice.tsx:28-73; WEB/lib/device/saving.ts:51-55,241-250 |
| Server-side storage | None: no database; the API keeps nothing per user (see "Data that leaves the device" for its in-memory caches) | plan/README.md:48-49 |

### Home

| Item | Value | Source |
|---|---|---|
| Headline | "Find your roof." / "Design it in 3D." | WEB/components/home/Home.tsx:28 |
| Subtitle | "Search the map, outline your roof, and get layout, shading, stringing and 8,760-hour energy yield on one live model." | WEB/components/home/Home.tsx:29 |
| Search | Search field with **Find my roof**; a place found or coordinates pasted lead to Find at that place | WEB/components/home/Home.tsx:30,93-96,148 |
| What the search reads | An address, coordinates ("18.53621, 73.89380"), degrees ("18°32′10.4″N 73°53′37.7″E") or a maps link | WEB/lib/outline/first-step.ts:18-27 |
| **Import a drawing** | "KMZ, KML or DXF with the roof and its obstacles" | WEB/components/home/Home.tsx:36 |
| **Open a project** | "A saved .rtd file, from this device or a colleague" | WEB/components/home/Home.tsx:37 |
| Open a project dialog | Text "A project saved by this app. It opens in the Studio and runs again here."; drop zone "Drop the project file here" / "An .rtd file saved by this app" / "It is read, and opens as a new design on this device"; buttons **Cancel**, **Open**; **Try again** when the server was not reached | WEB/components/shell/OpenProject.tsx:17-18,96-114 |
| What Open restores | The project in the file (read by the API, formats 1 and 2), kept on this device as a new design and opened in the Studio at the last lens; it runs again (results are not in the file). The dialog shows the project's name and "Capacity and energy come with the run in the Studio", plus notes on files the project names but does not carry | WEB/lib/flow/open-project.ts:1-5,26-27,50-55; WEB/components/shell/OpenProject.tsx:23-33,88-93,115-125 |
| Open refusals | Not .rtd: "Choose a project file (.rtd)."; too large: "This file is larger than any project this app saves, so it cannot be opened."; unreadable: "The file could not be read. Choose another." | WEB/lib/flow/open-project.ts:11,21,24 |
| Demo card | Label "Demo project", the demo's name and roof; **Open the demo**. Capacity and "Energy, year 1" appear only after the demo has run on this device; before that: "Capacity and energy come with the run in the Studio" | WEB/components/home/DemoCard.tsx:19-20,52-62; WEB/lib/home/home-view.ts:17-23 |
| The demo | "Pune demo roof": 90 × 40 m flat roof, tilted rows, in Pune (18.52, 73.86); obstacles: Stair room, Water tank, AC unit 1–4; bundled PVGIS TMY weather; module file `insolation-ina-144mhc-tf-560.PAN`, inverter file `wattpower-wp-330ktl-h1.OND`; system voltage 1500 V marked as the user's choice | CORE/demo.py:2,8,21-31,41-53; CORE/resources.py:9-10; CORE/samples/pune_weather.json (source "pvgis", label "PVGIS TMY") |
| "On this device" section | Heading "On this device"; with none kept: "Designs you save appear here. Your designs are kept on this device."; otherwise "Your designs are kept on this device." Cards: three per row on desktop, two on tablet, one on phone, newest edited first | WEB/components/home/OnThisDevice.tsx:26,28-55; WEB/lib/home/home-view.ts:25-33; WEB/lib/home/cards.ts:41-44 |
| A design card | Plan thumbnail, name, roof words (e.g. "flat roof, tilted rows"), Capacity and "Energy, year 1" of the last run, or "Waiting for a system voltage" / "Not run yet"; "Edited just now", "Edited 5 minutes ago", "Edited yesterday", "Edited 17 Sep 2026" … | WEB/components/home/DesignCard.tsx:113-145; WEB/lib/home/cards.ts:24-38; WEB/lib/device/kept-design.ts:33-37,79-92 |
| Card menu | **Open**, **Rename**, **Duplicate**, **Save a copy** (.rtd), **Delete** | WEB/components/home/DesignCard.tsx:33-39 |
| Rename | Name becomes a field in place; Enter or leaving commits, Escape cancels; empty refused with "A name is needed"; at most 200 characters | WEB/components/home/DesignCard.tsx:49-54,114-124; WEB/lib/flow/name-field.ts:7,9 |
| Duplicate | A copy named "Copy of <name>", kept under a new id and opened in the Studio | WEB/lib/home/cards.ts:46-47; WEB/components/home/Home.tsx:110-116 |
| Save a copy | Downloads the design's .rtd, made by the API | WEB/components/home/Home.tsx:118-122; API/routers/export.py:12,36-49 |
| Opening a card | Opens from the device and runs again, in the Studio at its last lens; a missing one: "That design is no longer on this device." | WEB/components/home/Home.tsx:103-108; WEB/lib/device/opening.ts:38-47 |
| New design entry | **Find my roof** on Home; **New design** in the project switcher | WEB/components/home/Home.tsx:148; WEB/components/shell/ProjectSwitcher.tsx:71 |
| Layout by size | Illustration at the right on desktop, a strip under the subtitle on tablet, none on phone | WEB/components/home/Home.tsx:56-62,126-146 |

### Country and system voltage

| Item | Value | Source |
|---|---|---|
| How the country is found | 1) the request's country as Vercel sees it (`x-vercel-ip-country`), asked once per visit at `GET /country`, answer not stored (`Cache-Control: no-store`); 2) else the browser's time zone; 3) else India (`IN`) | WEB/app/country/route.ts:3-9; WEB/lib/country/country.ts:5-6,16-25,44-79; WEB/components/shell/stores.tsx:46-51,113 |
| 600 V countries | US, PR, GU, VI, AS, MP (US and its territories) and CA | WEB/lib/country/country.ts:8-9,27-29 |
| Everywhere else | 1000 V | WEB/lib/country/country.ts:27-29 |
| When it is applied | When a design without a voltage is opened (new, imported, opened from a file): set to the country's voltage and marked "set by the app" | WEB/lib/stores/project-store.ts:50-55,65-67; WEB/components/shell/stores.tsx:52 |
| Choices | 600, 1000, 1500 V | WEB/lib/studio/voltages.ts:4-5 |
| What the user sees beside the heading (Strings lens) | "Set for <country>" (e.g. "Set for the United States", "Set for India"); "Set by the app" if the app's value is not the current country's; "Your choice" once the user chooses | WEB/lib/studio/voltage-words.ts:77-84; WEB/lib/country/country.ts:11-12,31-34 |
| Line under the choice (app-set) | 600 V: "600 V, the limit for homes in <the United States (NEC 690.7) / Canada (CE Code, Section 64)>. Change it if the site allows more."; 1000 V: "1000 V, the usual limit for rooftops in <country>. Change it if the site needs another." | WEB/lib/studio/voltage-words.ts:48-56 |
| Never moved, never raised | Equipment rated lower: strings sized to the rating ("Strings sized to <n> V, this <inverter/module>'s limit."); a higher voltage is only offered ("… Raise it only if the site's code allows.") | WEB/lib/studio/voltage-words.ts:1-3,64-91; plan/README.md:125 (D88) |
| The demo | 1500 V, marked the user's choice (so it shows "Your choice") | CORE/demo.py:50-51 |

### In-app help

| Item | Value | Source |
|---|---|---|
| How it opens | An orange **?** disc beside a section heading (and on Find's tools); hover shows the topic's summary and "Click for more"; pressing opens the help sheet. Button name "Help: <title>" | WEB/components/shell/help/HelpDisc.tsx:30-46 |
| Other ways in | A tip's **Show me how** opens the how-to of its move | WEB/components/shell/help/ways-in.tsx:7-21 |
| The sheet | Desktop and tablet: from the right edge, full height, 420 px wide; phone: from the bottom, full height but 48 px, with a grip. Closes with Escape, the × ("Close help") or a press beside it | WEB/components/shell/help/HelpSheet.tsx:15-28,74-78 |
| Shareable link | The open topic is in the address as `?help=<key>`; a shared link opens it | WEB/lib/help/address.ts:1-4 |
| Topics | 31: 2 shared (Obstacles, Roof type), 13 for Find (3 sections + 10 tool how-tos), 16 Studio sections. No topics for Home, Performance, Handover or Present | WEB/lib/help/manifest.gen.ts:4-36; HELP/ (31 .mdx files) |
| How-to pictures and clips | 26 pictures (.jpg) and 7 clips (.mp4), all for the 10 Find how-tos (box, building, corners, detect, find-the-roof, move-an-obstacle, move-the-roof, rectangle, tank, wall); a picture opens larger, × or Escape closes it | WEB/public/help/find/ (directory listing); WEB/components/shell/help/PictureLarge.tsx:26,79 |
| Clip format | H.264 in MP4 | plan/README.md:121 (D83) |

### Present

| Item | Value | Source |
|---|---|---|
| What it is | The Studio's 3D scene on the whole screen without the app's bars, a guided tour of the open design that loops | WEB/components/present/Present.tsx:42-50; WEB/lib/routes.ts:60-61 |
| How it starts | **Present** (play icon) in the top bar; shown only when the bar is at least 820 px wide, so not on phone. The browser's full screen is asked for where allowed | WEB/components/shell/TopBar.tsx:49-56,115-117; WEB/app/globals.css:812-816; WEB/components/present/Present.tsx:105-111 |
| Scenes (one loop = 40 s) | 1 "The satellite from above tilts into 3D" (4 s); 2 "The building and the obstacles rise" (4 s); 3 "The modules fill row by row" (6 s); 4 "The day plays with its shadows" (12 s, with the sun path); 5 "The strings light up by MPPT" (4 s); 6 "The energy counts up" (10 s) | WEB/lib/present/tour.ts:73-145 |
| Panel per scene | "1 · The place", "2 · The roof", "3 · The array", "4 · The sun, <date>", "5 · The strings", "6 · The energy" (lead "Energy to grid, year 1") | WEB/lib/present/scene-panel.ts:124,133,143,153,163,174; WEB/lib/present/figures.ts:10 |
| Words on screen | Bottom left: "<name> · <kWp> · <MWh> a year", then the scene's words; bottom right: "Press any key or touch the screen to return" (fades after the first loop) | WEB/lib/present/words.ts:16-22; WEB/components/present/Present.tsx:35-36,133-173 |
| How it ends | Any key, pointer press or touch: back to the Studio's last lens, full screen left | WEB/components/present/Present.tsx:39-40,92-110 |
| Before a run | Shows the name and waits, saying why (the run on its way, or the run's no-options title) | WEB/components/present/Present.tsx:79-82; WEB/lib/present/words.ts:31-36 |
| Reduced motion | Each scene is a cut held for its time; the day in 12 cuts | WEB/lib/present/tour.ts:147-170 |

### Data that leaves the device

| Destination (provider) | When | What is sent | Source |
|---|---|---|---|
| The app's own site (Vercel) | Every visit | Page and assets, help pictures/clips, the equipment library files; `GET /country` (Vercel reads the connection's country; not stored) | WEB/app/country/route.ts:3-9; WEB/lib/equipment/catalog.ts:38-42; docs/deployment.md:12 |
| SolarLayout Rooftop API (AWS Lambda, ap-south-1), via `/api/*` | See rows below | JSON over HTTPS through the Vercel rewrite | WEB/lib/api/client.ts:1,57-65; WEB/next.config.ts:39-41; docs/deployment.md:13,18-19 |
| API `GET /demo` | Home and when the demo opens | Nothing | API/routers/demo.py:11; WEB/lib/api/client.ts:104 |
| API `POST /roof/from-map`, `/roof/on-map` | Building a roof on Find | Outline and obstacles as longitude/latitude, roof type, name | API/routers/roof.py:18,25; API/schemas/roof_map.py:16-39 |
| API `POST /roof/import` | Import a drawing | The KMZ/KML/DXF file (base64), its name, units, a place for a DXF | API/routers/roof.py:12; API/schemas/roof_import.py:14-21 |
| API `POST /layout`, `/design`, `/export/{kind}`, `/export/report-pages` | Every layout and run (after each edit), every Handover file, the report preview, Save a copy | The whole design document: name, roof outline (local metres) with latitude/longitude, obstacles, array, losses, module and inverter file text, weather source, CSV weather text, embedded weather, system voltage | API/routers/layout.py:12; API/routers/design.py:16; API/routers/export.py:25,36; API/schemas/project.py:55-87 |
| API `POST /sun` | Sun lens, shadows | Latitude, longitude, day, hours, roof for shadows | API/routers/sun.py:12; API/schemas/sun.py:24-34 |
| API `POST /weather` | Loading weather | Source, latitude, longitude, CSV file name and text | API/routers/weather.py:12; API/schemas/weather.py:39-46 |
| API `POST /equipment/module`, `/equipment/inverter` | Choosing a module or inverter (library or own file) | File name and text/base64 of the PAN/OND | API/routers/equipment.py:9-18; API/schemas/equipment.py:17-19 |
| API `POST /project/open` | Open a project | The .rtd's name and text | API/routers/project.py:9-12; WEB/lib/flow/open-project.ts:34-37 |
| PVGIS (European Commission JRC, re.jrc.ec.europa.eu) | Sent by the API when weather "PVGIS" is loaded (the default source) | Latitude, longitude (TMY and horizon) | CORE/weather.py:28,142-143,166-177; API/schemas/project.py:73 |
| NASA POWER (power.larc.nasa.gov) | Sent by the API when weather "NASA POWER" is loaded | Latitude, longitude, year 2023 | CORE/weather.py:29,181-195 |
| Esri World Imagery (ibasemaps-api.arcgis.com) | Find's map; the 3D ground in the Studio and Present | Tile requests (area viewed) with the app's public key | WEB/lib/places/esri.ts:7-9,21-22,65; WEB/components/find/RoofMap.tsx:73-84; WEB/components/scene/Ground.tsx:39 |
| Esri geocoding (geocode-api.arcgis.com) | Typing a place in the search | The typed text, up to 5 results asked, the map's centre when there is one, the app's key | WEB/lib/places/esri.ts:10-16,48-58 |
| Overture Maps (tiles.overturemaps.org) | Only while **Detect building** is the tool | Range reads of the zoom-14 building tiles (area viewed) | WEB/lib/map/overture.ts:8-12; WEB/components/find/OutlineLayer.tsx:344-347 |
| Device location | **Use my location** only | Read by the browser and used locally to move the map; not sent by itself | WEB/components/shell/Search.tsx:177-191 |
| Analytics, telemetry, cookies | None: no analytics package, no `document.cookie`, no middleware | WEB/package.json (dependencies); (searched WEB, API: no match) |

What the API keeps:

| Item | Value | Source |
|---|---|---|
| Stated design | "Stateless: every response is a pure function of the request." No database | API/main.py:25-30; plan/README.md:48-49 |
| In-memory caches (per running instance, not written to disk) | Weather downloads of up to 64 sites, keyed by coordinates; shading, options and operating points up to 64/64/32 MB, keyed by a fingerprint of the inputs; report page images up to 32 MB (about 30 sets), keyed by project and day. Evicted oldest first; lost when the instance stops | API/services/weather.py:12-21; CORE/weather.py:78-104; API/services/design.py:39-45; CORE/memo.py:1-13,40-42,111-121; API/services/export.py:30-38 |
| Logs | One line per request: method, path, status, time (no query string, no body); unexpected errors logged with method, path and traceback; CloudWatch, kept 30 days | API/timing.py:1-8,29-31,54; API/errors.py:148-150; docs/deployment.md:71; infra/aws/README.md:101 |

### Limits

| Item | Value | Source |
|---|---|---|
| Any request to the deployed API | 6,291,456 bytes (6 MiB), the Lambda Function URL's limit | WEB/lib/flow/open-project.ts:13-18; docs/deployment.md:75 |
| Project file opened | Request over 6 MiB refused before sending ("This file is larger than any project this app saves, so it cannot be opened."); API takes text up to 5,000,000 characters; name 1–255 characters | WEB/lib/flow/open-project.ts:21,44-47; API/schemas/limits.py:12; API/schemas/project_file.py:15-16 |
| Weather CSV | 3,000,000 characters at the API; refused in the app over 3,000,000 bytes: "This file is over 3 MB, more than a year of weather takes. Choose a file of hourly values." Rows under an hour apart are averaged into hours | API/schemas/limits.py:6-7; WEB/lib/performance/weather-csv.ts:16-27; docs/deployment.md:76-77 |
| Weather hours | At most 8,784 | API/schemas/weather.py:13,24 |
| Module (PAN) / inverter (OND) file | 256,000 characters (or the same as base64); file name 1–255 characters | API/schemas/limits.py:8-10; API/schemas/equipment.py:17-19 |
| Drawing import | base64 up to 28,000,000 characters at the API; a KML inside a KMZ at most 20 MB | API/schemas/roof_import.py:11,18; CORE/io/roof_import.py:30,89-90 |
| Roof size | 30,000 m² ("about 3 MWp"); over it: "This outline covers <n> m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." | CORE/geometry.py:28-29; CORE/errors.py:36-51 |
| Design name | At most 200 characters; empty refused ("A name is needed") | API/schemas/project.py:65; WEB/lib/flow/name-field.ts:7,9 |
| Downloaded file names | At most 80 characters from the design's name | API/services/export.py:28,235 |
| Place search | Up to 5 results | WEB/lib/places/esri.ts:16 |
| Weather download waits | PVGIS 60 s, NASA POWER 120 s | CORE/weather.py:135-136,195 |
| Concurrent API instances | 50 on staging, 100 on production (reserved concurrency) | docs/deployment.md:16 |
| A long run | Streams progress; the connection stays open while a byte comes every 120 s; the API sends a keep-alive every 15 s | docs/deployment.md:78-80 |

#### Known-stale (this area)

- docs/design/information-architecture.md:66-67 says the user chooses the system voltage in the Strings lens and "Nothing is preselected". In the code, a design without a voltage gets the country's (600 V or 1000 V), marked as set by the app (WEB/lib/stores/project-store.ts:50-55; D87, plan/README.md:124).
- docs/design/information-architecture.md:24 lists Present in the top bar on every size. In the code, Present shows only when the bar is at least 820 px wide, never on phone (WEB/components/shell/TopBar.tsx:49,115-117).
- docs/deployment.md:15 gives each function 10,240 MB. The functions run at 1,769 MB (docs/deployment.md:80; apps/api/Dockerfile comment; D67, plan/README.md:110; infra/aws/README.md:130).
- "Stateless" (API/main.py:28; CLAUDE.md (repo root):3; infra/aws/README.md:3) is true of the answers, but each instance holds memory caches of weather, shading/options and report page images (see "What the API keeps"). The privacy policy must not say the API holds nothing.

#### Facts we do not have (this area)

- Price and terms: the code proves there is no sign-in, but says nothing about the app being free, now or later.
- A list of supported browsers. The code only requires WebGL for 3D and IndexedDB for keeping designs.
- How much a browser lets IndexedDB store, and what the app does at the limit, beyond the generic "Not saved" note.
- What Vercel, AWS, Esri, Overture, PVGIS and NASA log at their own level (IP addresses, retention). This is outside the code.
- An install prompt or install instructions in the app: there are none.
- The demo's capacity and energy figures: they are worked out at run time and appear on the Home card only after the demo has run on the device.

#### Product issues noticed (this area)

- Import a drawing has no size check in the app. The API schema accepts up to 28,000,000 base64 characters (API/schemas/roof_import.py:11), but the deployed Function URL refuses anything over 6 MiB. A drawing over about 4.7 MB is therefore probably refused before the API sees it, and the user gets the generic "The server answered 413 in a form that cannot be read. Try again; if it fails again, report it." (WEB/lib/api/errors.ts:30-33). This was not checked at run time.
- A user's own PAN/OND file over 256,000 characters has no check in the app. The API refuses it with a generic validation message (API/errors.py:137-139; API/schemas/equipment.py:18-19).
- `/studio` without a lens always goes to Roof (WEB/app/(workspaces)/studio/page.tsx:5-7), while the workspace links go to the last lens (WEB/lib/routes.ts:63-68). This is minor.

## 2. Find: the roof on the map

### Find: entering and the map

**Ways in**

| Item | Value | Source |
|---|---|---|
| Route and tab title | `/find`; title "Find and outline · SolarLayout Rooftop" | WEB/lib/routes.ts:71, WEB/app/find/page.tsx:5 |
| From Home's search | The primary action is **Find my roof**. With nothing typed it links to `/find`. A place that is chosen opens `/find?at=<lat>,<lon>`, plus `&place=<label>` when the place was found by words. Find then opens at the Outline step, at that place. | WEB/components/home/Home.tsx:30, :93-96, :148; WEB/lib/routes.ts:86-92; WEB/components/find/Find.tsx:109, :116 |
| From the project switcher | **New design** (fact "Find the roof") goes to `/find` | WEB/components/shell/ProjectSwitcher.tsx:71 |
| From the Studio's Roof lens | **Edit** (desktop/tablet), or the row labelled "Edit the outline" (phone), goes to `/find?edit=roof`. The open design's outline and obstacles are drawn on the map, its roof type is selected, and the screen starts at Outline. | WEB/components/studio/RoofInspector.tsx:32, :80, :91-93; WEB/components/find/Find.tsx:218-239 |
| Back | Round button labelled "Back to home", top left | WEB/components/find/Find.tsx:300-302 |
| Steps | **Find**, **Outline**, **Build**. Desktop and tablet show a pill: done steps get a tick, the current step is raised. Phone and tablet show "Step N of 3" in the panel. | WEB/components/find/Steps.tsx:5-9, :21-37; WEB/components/find/Find.tsx:304, :360 |
| Start view | Without a place, the map shows India from far (lon 78.5, lat 21.5, zoom 4). With a place, or with a design open, it opens at roof zoom. | WEB/components/find/Find.tsx:63-64, :139-142 |

**Layout by size**

| Size | What it shows | Source |
|---|---|---|
| Desktop | Full-screen map. Panel floats at the right. Top bar: back button, search, Steps pill. Map buttons at the bottom right. Toolbar at the bottom centre. Scale bar and attribution at the bottom left. | WEB/components/find/Find.tsx:299-307, :346-348; WEB/components/find/RoofMap.tsx:146-159 |
| Tablet | Panel is a bottom sheet of 384 px, and the map ends above it. Steps pill, map buttons and scale bar are shown. Toolbar buttons have an icon and a name. Tips show over the map. | WEB/components/find/Find.tsx:82-84, :99, :303, :306; WEB/components/find/OutlineTools.tsx:66-68; WEB/components/find/RoofMap.tsx:41 |
| Phone | Bottom sheet. No Steps pill, no map buttons ("the map is pinched and turned by hand") and no scale bar. Toolbar shows short names (**Detect** for **Detect building**) and **Undo** only. A tip shows at the top of the sheet. Roof type is a segmented control. | WEB/components/find/Find.tsx:101, :305-306; WEB/components/find/OutlineTools.tsx:27, :72-74; WEB/components/find/RoofMap.tsx:40-41; WEB/components/find/RoofTypeChoice.tsx:26, :47-53 |

**First step panel** (title **Find the roof**)

| Item | Value | Source |
|---|---|---|
| Lead (with a map) | "Find the building first: the map flies to it, close enough to outline its roof." | WEB/lib/outline/first-step.ts:31 |
| **Start here** cards | **Search for the building** / "An address, coordinates or a maps link"; **Use my location** / "When you are at the building"; **Enter dimensions by hand** / "The roof is measured already" | WEB/lib/outline/first-step.ts:26-28, :32; WEB/components/find/FirstStep.tsx:34 |
| **The search understands** | Address `Koregaon Park, Pune`; Coordinates `18.53621, 73.89380`; Degrees `18°32′10.4″N 73°53′37.7″E`; Maps link `google.com/maps/@18.53621,73.89380`. Pressing one puts it in the search without searching: "Press one to put it in the search." | WEB/lib/outline/first-step.ts:19-24; WEB/components/find/FirstStep.tsx:51, :62 |
| **Three steps** | "Find: the map flies to the building" · "Outline: trace the roof, then what stands on it" · "Build: the Studio opens, the array on the roof" | WEB/lib/outline/first-step.ts:34-38 |
| Without a map | Lead: "The map cannot be shown here. The roof can still be entered by its measurements, at a place you search or type." Only the by-hand card is offered ("Its place, then its length, width and facing"). No examples. | WEB/lib/outline/first-step.ts:41-50 |

**The map**

| Item | Value | Source |
|---|---|---|
| Kind | Satellite imagery only; there is no street-map switch. The map is labelled "Satellite map". Drawn with MapLibre (WebGL). | WEB/components/find/RoofMap.tsx:43-47, :73-85, :140-141 |
| Imagery provider | Esri World Imagery (ArcGIS Location Platform), 256 px tiles, native to zoom 19 | WEB/lib/places/esri.ts:1-9, :65 |
| Attribution shown | "Powered by Esri · Source: Esri, Vantor, Earthstar Geographics, and the GIS User Community". While **Detect building** is in hand a second line is added: "© Overture Maps Foundation, ODbL". | WEB/lib/places/esri.ts:14; WEB/lib/map/overture.ts:14; WEB/components/find/Find.tsx:288; WEB/components/find/RoofMap.tsx:156-159 |
| Roof zoom | 18 (MapLibre count, the imagery's native 19, about 0.3 m per pixel). The map flies here when a place is found. | WEB/components/ui/design-numbers.ts:23-24; WEB/components/find/Find.tsx:264 |
| Maximum zoom | 21.5; above 19 the tiles are enlarged | WEB/components/find/RoofMap.tsx:33; WEB/lib/places/provider.ts:9 |
| Map buttons | "North up", "Zoom in", "Zoom out" | WEB/components/find/MapButtons.tsx:20-29 |
| Scale bar | Largest round length that fits in 124 px | WEB/components/ui/design-numbers.ts:27; WEB/lib/map/scale-bar.ts:18-25 |
| Cursor | Open hand; closed hand while dragging; crosshair while a tool draws; move cursor over what is picked | WEB/lib/outline/map-cursor.ts:14-19 |
| No map | The screen says why and offers **Enter dimensions by hand instead** (see Messages). Without a map the stage shows a plan of the roof, north up, on a 10 m grid, with a north mark and a scale bar. | WEB/components/find/NoMap.tsx:8-17; WEB/components/find/PlanView.tsx:33-37, :27 |

### Find: place search

| Item | Value | Source |
|---|---|---|
| Field | Placeholder and label "Search an address or paste coordinates". A **Search** button appears once text is typed; Enter does the same. Before anything is typed, a "Use my location" button stands beside the field. | WEB/components/shell/Search.tsx:48, :238, :280-298; WEB/lib/places/beside-the-field.ts:8-12 |
| Geocoder | Esri World geocoding, `findAddressCandidates`; at most 5 places; places near the map's centre come first | WEB/lib/places/esri.ts:10-11, :16, :49-58; WEB/components/find/Find.tsx:270-274 |
| Results | A list under the field shows each place's label and its kind (Type). Up and down arrows, Home and End move the mark; Enter or a press takes the place; Esc closes. While searching: Searching for “…”. | WEB/components/shell/Search.tsx:154-175, :307-319, :333-339; WEB/lib/places/search-state.ts:50-66 |
| Decimal coordinates | Latitude first. Comma, semicolon or space between. Decimal commas are accepted when there are exactly two numbers ("12,914094 77,491989"). A sign is allowed. | WEB/lib/places/place-input.ts:59-65, :104-113, :216-263 |
| DMS and DDM | Degrees, minutes and seconds with ° ′ ″ (typographic or ASCII marks) and N/S/E/W before or after. Only the last part may have a fraction. Minutes and seconds go up to 59. Lat/lon order is swapped when the letters say so. | WEB/lib/places/place-input.ts:48-57, :152-189, :201-212, :243-248 |
| Maps links (http/https) | Google (`@lat,lon`, `q=`, `query=`, `ll=`, `destination=`, `center=`), OpenStreetMap (`#map=z/lat/lon`, `mlat`/`mlon`), Apple (`ll=`), Bing (`cp=lat~lon`) | WEB/lib/places/place-input.ts:16-24, :29-39 |
| Read-back | Coordinates and links are read as they are typed. One option shows under the field, marked "Coordinates", formatted to 5 decimals, e.g. `18.53621° N, 73.89380° E`. | WEB/components/shell/Search.tsx:139-149, :303-306; WEB/lib/format/place.ts:17-20 |
| What looks like coordinates | Never sent to the geocoder. It is refused with the reason, or offered swapped (marked "Swapped"; Enter takes it). | WEB/components/shell/Search.tsx:129-135, :160-164, :320-327 |
| Use my location | Browser geolocation, high accuracy, 15 s timeout | WEB/components/shell/Search.tsx:177-192 |
| After a place is chosen | The map flies to it at roof zoom and Outline begins. Without a map, the by-hand entry opens with the place filled. | WEB/components/find/Find.tsx:260-268; WEB/lib/outline/first-step.ts:58-59 |
| Design name | The place's label when it was found by words; otherwise the API's "Untitled roof" | WEB/lib/outline/build-request.ts:31; API/services/roof_map.py:15, :43; plan/README.md:92 (D49) |
| Without a key | Words cannot be searched; coordinates and links still work | WEB/components/shell/Search.tsx:29, :104-107 |

### Find: outlining the roof

Panel title **Outline the roof**. The tool's lead text sits under it.

| Tool (toolbar label) | How it works | Source |
|---|---|---|
| **Corners** (default) | Lead: "Click each corner. Drag a corner to adjust it, or type a length you have measured." Each press places a corner. Pressing the first corner again closes the outline once there are at least 3 corners (within 12 px, 20 px on touch); Enter also closes. | WEB/components/find/Find.tsx:71, :119; WEB/components/find/OutlineLayer.tsx:411-414, :753-758; WEB/lib/outline/outline-state.ts:221-239; WEB/components/ui/design-numbers.ts:36-39 |
| **Rectangle** | Lead: "Drag a box across the roof, then turn it to the building by its handle. Drag a corner to adjust it." A drag draws a box while no corners exist; it is closed when released. Its round handle ("Turn the rectangle") turns it and snaps to north within 3°. | WEB/components/find/Find.tsx:72; WEB/components/find/OutlineLayer.tsx:422-450, :923-944; WEB/lib/outline/rectangle.ts:31-39 |
| **Detect building** (phone: **Detect**) | Lead: "Click inside the building. Where its footprint is known, it is proposed as the outline, to accept or adjust." While the tool is in hand, known footprints show faintly. A press takes the footprint under it as a closed outline and replaces any outline already drawn. A building in pieces gives its largest piece. | WEB/components/find/Find.tsx:73; WEB/components/find/OutlineLayer.tsx:344-389; WEB/lib/map/overture.ts:19-26; WEB/lib/outline/outline-state.ts:346-348 |
| Detect: footprint source | Overture Maps building footprints, release `2026-09-23.1` (PMTiles, tiles end at zoom 14). A building cut by a tile edge is proposed as the piece under the press. Footprints are approximate, "about 0.6 m". | WEB/lib/map/overture.ts:1-16 |
| Detect: callout | Found: "Footprint found · N corners · A m²", then "From Overture Maps · approximate, about 0.6 m. Accept it, or drag the corners to the roof edge you see.", with **Use this outline** and **Adjust**. Not found: "No footprint known here" / "Outline the roof by corners or by a rectangle instead." | WEB/components/find/DetectedCallout.tsx:30-48 |
| **Enter dimensions by hand instead** | Lead: "Type what you have measured. The roof is drawn as you type; Faces is where its long side looks." Title **Enter the roof by hand**. **Draw on the map instead** returns while a map exists. | WEB/components/find/Find.tsx:79, :405-413 |

**Editing the outline**

| Item | Value | Source |
|---|---|---|
| Drag a corner | Snaps to a right angle or to a parallel edge within 3° and within 4 px of the pointer. On touch, a 2× loupe (104 px) shows above the finger. | WEB/components/find/OutlineLayer.tsx:100-105, :761-779; WEB/components/ui/design-numbers.ts:30-33 |
| Add a corner | Press (or drag) the dot in the middle of an edge ("Add a corner on edge N") | WEB/components/find/OutlineLayer.tsx:783-813 |
| Keys (pointer) | Enter closes. Esc takes back the last corner. The arrows nudge the selected corner 0.1 m (1 m with Shift). Delete or Backspace removes the selected corner but keeps at least 3. ⌘/Ctrl+Z undoes; with Shift it redoes. | WEB/components/find/use-outline-keys.ts:12-20; WEB/lib/outline/outline-state.ts:284-297; WEB/components/ui/design-numbers.ts:42-45 |
| Toolbar | **Undo**, **Redo**, **Clear outline** (bin; clears the corners and obstacles as one undoable step). "Show the tips" once the roof is closed (tablet/desktop). Phone has **Undo** only. | WEB/components/find/OutlineTools.tsx:72-86; WEB/lib/outline/outline-state.ts:311-313 |
| Edge labels on the map | Length of each edge, `"{n} m"`, 1 decimal | WEB/components/find/OutlineLayer.tsx:612-620 |
| Minimum corners | 3 | WEB/lib/outline/outline-state.ts:101; API/schemas/roof_map.py:32 |
| Area limit | 30,000 m², checked by the API on **Build this roof**. There is no check while drawing. | CORE/geometry.py:29, :156-164; API/services/roof_map.py:31-32 |
| Self-crossing | Refused on Build | API/services/roof_map.py:18, :24-26 |

**Leaving Find for the Studio**

| Item | Value | Source |
|---|---|---|
| Button | **Build this roof**. It is disabled until the outline is closed. While working it shows "Building the roof". | WEB/components/find/Find.tsx:396-405 |
| What happens | New design: the API returns a whole project with defaults, which is opened. From Edit: outline, place, obstacles, source and roof type go into the open design and the rest is kept. Then the Studio opens at `/studio/roof`. | WEB/components/find/Find.tsx:242-258, :424-428; WEB/lib/routes.ts:48; plan/README.md:86 (D43) |
| Place of the built roof | The centroid of the outline. The outline is stored in local metres around it. | API/services/roof_map.py:27-30 |
| Roof type on Find | **Flat, tilted rows** (default) · **Flat, east-west** · **Sloped, flush**. Captions: "Rows facing the equator", "Back-to-back, low tilt", "Modules follow the roof pitch". Short labels on phone/tablet: Tilted rows / East-west / Sloped. | WEB/components/find/Find.tsx:125, :382-387; WEB/lib/geometry/roof-types.ts:6-10 |
| Source recorded | "Outlined on satellite" (map) or "Entered by hand" (by hand) | WEB/lib/geometry/roof-card.ts:20-25; WEB/components/find/Find.tsx:243 |

### Find: shape and edges

**Edges** (roof drawn on the map)

| Item | Default | Range | Unit | Source |
|---|---|---|---|---|
| Edge length fields (after closing). Rectangle edges are named by side (North, South-east…); others "Edge 1", "Edge 2"… | as drawn | 0.1–2000, 1 decimal | m | WEB/components/find/OutlinePanel.tsx:17, :55-70; WEB/lib/outline/outline-state.ts:486-497 |
| What a typed length does | The edge scales about its middle. On a rectangle (within 1°) with **Square the corners** on, the opposite edge follows. | — | — | WEB/lib/geometry/typed-length.ts:6-7, :24-43 |
| **Square the corners**: "Snaps to 90° when you are within 3°" | On | switch | — | WEB/components/find/OutlinePanel.tsx:80-86; WEB/lib/outline/outline-state.ts:138 |
| Closing 4 near-square corners with it on | Made an exact rectangle; the first edge is kept | — | — | WEB/lib/outline/outline-state.ts:103-131 |
| Status before closing | "Click the first corner of the roof." / "N of at least 3 corners placed." / "N corners placed. Click the first corner, or press Enter, to close the outline." | — | — | WEB/components/find/OutlinePanel.tsx:72-78 |
| Tiles | **Area** (m², whole), **Faces** ("{deg}° {compass}": the outward normal of the longest edge, toward the equator), **Corners** | — | — | WEB/components/find/OutlinePanel.tsx:35-45; WEB/lib/geometry/measure.ts:74-95 |
| Heights, parapet | Not set on Find. A new roof gets the engine's parapet of 0.9 m and a pitch of 0°, both changed in the Studio. | — | — | CORE/geometry.py:100, :106; API/services/roof_map.py:35-43 |

**By hand: Place and Shape**

| Item | Default | Range | Unit | Source |
|---|---|---|---|---|
| **Place**: Latitude / Longitude. Caption: "From the search above, or typed. Five decimals; north and east are positive." | the found place, else where the drawn roof stands | −90–90 / −180–180, 5 decimals | ° | WEB/components/find/ByHandPanel.tsx:23-24, :47-55; WEB/components/find/Find.tsx:209-216 |
| **Shape** | **Rectangle** | Rectangle / Corners | — | WEB/lib/outline/shapes.ts:6-9; WEB/lib/outline/by-hand.ts:24 |
| Length, Width (the longer is the long side) | empty | 0.1–2000, 2 decimals | m | WEB/components/find/ByHandPanel.tsx:26, :64-67; WEB/lib/outline/by-hand.ts:32-49 |
| **Long side faces** | empty | 0–359, whole | ° clockwise from north | WEB/components/find/ByHandPanel.tsx:28, :68 |
| Corner table: East / North of the middle of the roof; **Add a corner**; a bin per row. Caption: "Metres east and north of the middle of the roof, in order around it. Three at least." | none | −5000–5000, 2 decimals | m | WEB/components/find/ByHandPanel.tsx:30, :71-90 |
| Drawing | The roof appears once the place and the shape are complete; incomplete rows are left out. Without a map: "The plan of the roof is drawn here" / "Enter its length and width, or its corners." | — | — | WEB/lib/outline/by-hand.ts:53-70; WEB/components/find/PlanView.tsx:61-66 |

Out-of-range entries are clamped and the field says "{max} is the highest that can be set." / "{min} is the lowest that can be set."; text that is not a number gets "Enter a number, from {min} to {max}." (WEB/components/ui/number-entry.ts:45-57, :74-84).

### Find: moving the roof

| Item | Value | Source |
|---|---|---|
| Pick up | Once closed: click or press inside the roof with **Box** or **Tank** in hand (Box is the tool given on closing). With **Wall** or **Building** in hand, a press places a point instead. | WEB/components/find/OutlineLayer.tsx:391-409; WEB/components/find/OutlineTools.tsx:38-39 |
| Picked look | A brighter, thicker outline. A round handle ("Turn the roof") stands 44 px off the edge that faces nearest north. | WEB/components/find/OutlineLayer.tsx:267-303, :632-640; WEB/lib/outline/roof-move.ts:51-78; WEB/components/ui/design-numbers.ts:48 |
| Move | Drag inside it (one finger on touch; two fingers move the map). Arrows nudge 0.1 m, 1 m with Shift. Obstacles go with it. A dashed line marks where it stood. Label: "{x} m E · {y} m N". | WEB/components/find/OutlineLayer.tsx:494-525; WEB/lib/outline/outline-state.ts:268-274, :416-418; WEB/lib/outline/roof-move.ts:96-99 |
| Turn | Drag the handle. It snaps square to N/E/S/W within 3°. Label: "{deg}° · faces {deg}° {compass}". | WEB/lib/outline/roof-move.ts:80-94, :101-107; WEB/lib/outline/outline-state.ts:420-425 |
| Let go | Esc drops the pick. Each move or turn is one Undo step. | WEB/lib/outline/outline-state.ts:291-293, :441-447 |
| Tip card **Move or turn the roof** | Pointer: "Click / inside the roof to pick it up", "Drag / inside it to move it", "◯ / drag the round handle to turn it", "← ↑ → ↓ / nudge 0.1 m, with Shift 1 m". Buttons **Got it** (gone for good on the device), **Show me how**, × "Hide the tips". | WEB/lib/outline/tips.ts:12-27; WEB/components/ui/Tip.tsx:35, :45-49 |

### Find: obstacles

Obstacle tools appear once the roof is closed: **Box**, **Tank**, **Wall**, **Building** (WEB/components/find/OutlineTools.tsx:30-36). There is no tree tool on Find. Trees are added only in the Roof lens (HELP/app/section/obstacles.mdx:23).

| Kind | How drawn | Min points | Lead text | Source |
|---|---|---|---|---|
| Box | Drag corner to corner, drawn north-aligned, then turned by its handle | 4 | "Drag a box across the thing on the roof, then turn it by its handle. Its height is asked right after." | WEB/components/find/Find.tsx:74; WEB/lib/outline/obstacles.ts:22, :27-30 |
| Tank (cylinder) | Drag from the middle to the edge; diameter = 2 × the drag | 1 + diameter | "Drag from the middle of the tank to its edge. Its height is asked right after." | WEB/components/find/Find.tsx:75; WEB/lib/outline/obstacles.ts:73-78 |
| Wall | Press each point; press the last again, or Enter, to end | 2 | "Click each point of the wall; click the last again, or press Enter, to end it. …" | WEB/components/find/Find.tsx:76; WEB/lib/outline/outline-state.ts:378-386 |
| Building beside the roof | Press each corner; press the first again (or Enter) to close | 3 | "Click the corners of the building beside the roof; click the first again to close it. …" | WEB/components/find/Find.tsx:77; WEB/lib/outline/outline-state.ts:234-236 |

| Item | Default | Range | Unit | Source |
|---|---|---|---|---|
| Height dialog: "Height of the {box/tank/wall/building}", body "The imagery cannot give it. Enter its height above the roof surface." Fields **Name** (suggested) and **Height**; buttons **Remove** and **Add the {kind}** (waits for a height). Closing the dialog discards the shape. | empty, nothing preselected | 0.05–200, 2 decimals | m above the roof surface | WEB/components/find/HeightDialog.tsx:21-25, :53-76; WEB/lib/outline/obstacles.ts:24-25 |
| Name | "{Box/Tank/Wall/Building} {n}" | API ≤ 200 chars | — | WEB/lib/outline/obstacles.ts:19, :80-83; API/schemas/roof_map.py:13 |
| List **Obstacles · N** | Row: name plus facts — box "a × b · h H m", tank "⌀ D · h H m", wall "L m · h H m", building "A m² · h H m". Pressing a row selects it on the map; a bin per row removes it. Heights are not edited here. | — | — | WEB/components/find/ObstacleList.tsx:23-56; WEB/lib/outline/obstacles.ts:85-103 |
| Map label | "{name} · h {H} m" | — | — | WEB/lib/outline/obstacles.ts:105-108 |
| Pick | Click or press it on the map (Box or Tank in hand), or its row | — | — | WEB/components/find/OutlineLayer.tsx:399-405 |
| Move | Drag, in 0.1 m steps. One on the roof stays on it, sliding along the edge it meets; one off the roof moves freely. Arrows nudge it. | — | — | WEB/lib/outline/obstacle-move.ts:10-14, :31-57; WEB/lib/outline/outline-state.ts:275-279 |
| Turn | Boxes and buildings only, by the round handle (snap 3°). Tanks and walls only move. | — | — | WEB/lib/outline/obstacle-move.ts:59-62 |
| Reshape | Selected obstacle's corners drag: a box stays a rectangle, a tank's single handle sets its diameter, wall and building points bend | — | — | WEB/lib/outline/outline-state.ts:453-463 |
| Remove | Delete/Backspace while picked, or the row's bin. Undoable. | — | — | WEB/lib/outline/outline-state.ts:284-285, :409-410 |
| Tip **Move or turn an obstacle** | Pointer: "Click / an obstacle to pick it", "Drag / it to move it", "◯ / turns a box or a building", "Delete / removes it" | — | — | WEB/lib/outline/tips.ts:28-41 |
| How heights are used | No modules on its footprint or clearance. Its shadow sweep through the shade-free window is kept clear. Its shadow counts hour by hour in shading. A building beside the roof also takes its height above the roof. | — | — | HELP/app/section/obstacles.mdx:13-15 |

### Find: importing a drawing

Import is not done on Find. It opens from Home's **Import a drawing** ("KMZ, KML or DXF with the roof and its obstacles") and from the project switcher (fact "KMZ, KML, DXF"). The result opens in the Studio's Roof lens (WEB/components/home/Home.tsx:36; WEB/components/shell/ProjectSwitcher.tsx:73; WEB/components/shell/ImportDrawing.tsx:92).

| Item | Value | Source |
|---|---|---|
| Dialog | "Import a drawing". Drop zone: "Drop the drawing here" / "KMZ, KML or DXF"; while dragging over: "It becomes the roof of a new design". Buttons **Cancel** and **Open the roof**. A file that is held reads "{KIND} · {n} KB · read when the roof is opened". | WEB/components/shell/ImportDrawing.tsx:101-112; WEB/lib/flow/import-drawing.ts:40-43 |
| Text in the dialog | "The largest closed shape is the roof; the other closed shapes are obstacles, named by their layer. A KMZ or KML says where the roof is; a DXF does not, so its place is asked." | WEB/components/shell/ImportDrawing.tsx:28 |
| KMZ/KML | First `.kml` inside a KMZ. Every Placemark Polygon (outer boundary) and LineString is read. The largest polygon is the roof. Other polygons become a box when they are a rectangle (within 2 % of the area, ≤5 points), otherwise a building. LineStrings become walls. The app's own exported "Modules (N)" folder is skipped. Names come from the placemark name; unnamed ones are "Obstacle N". | CORE/io/roof_import.py:81-148, :208-245, :248-260 |
| Heights from the file | `h=2.5` or `h:2.5` (case-insensitive) in the name or description, removed from the name. Missing heights are set to 1.0 m, with the note "These obstacles have no height in the file and were set to 1.0 m." They are listed for review in the Roof lens. | CORE/io/roof_import.py:29, :225-229; API/services/roof_files.py:11, :33-35; WEB/lib/flow/import-drawing.ts:28 |
| DXF | Modelspace closed LWPOLYLINE and POLYLINE, and CIRCLE (which becomes a tank). The largest closed polyline is the roof. Names come from the layer. ASCII or binary DXF. | CORE/io/roof_import.py:151-205 |
| DXF units | **DXF units** m / mm, suggested "m", enabled only for a DXF | WEB/components/shell/ImportDrawing.tsx:20-26, :113-119; CORE/io/roof_import.py:187 |
| DXF place | Required. Use the search or **Latitude** (° N) and **Longitude** (° E), 5 decimals. **Open the roof** waits until both are set. The place given becomes the roof's centroid. | WEB/components/shell/ImportDrawing.tsx:63-64, :120-133; API/services/roof_files.py:61-69; CORE/io/roof_import.py:208-218 |
| KMZ place | The roof polygon's centroid, from the file's coordinates | CORE/io/roof_import.py:144-148, :212-213 |
| Limits | base64 ≤ 28,000,000 chars; KML inside a KMZ ≤ 20 MB; name ≤ 255 chars; roof ≤ 30,000 m² | API/schemas/roof_import.py:11, :17-18; CORE/io/roof_import.py:30, :89-91; API/services/roof_files.py:32 |
| Design name | The file name without its ending | API/services/roof_files.py:41-42 |
| Refusal | Shown in the drop zone: "This file was not loaded", with the API's words | WEB/components/ui/FileDrop.tsx:136-143; WEB/components/shell/ImportDrawing.tsx:93-97 |

### Find: messages

| Message (exact) | Trigger | Source |
|---|---|---|
| The map is not available / This app has no key for the imagery. The roof can still be entered by its measurements. | No imagery key | WEB/lib/map/map-state.ts:16-19 |
| This browser cannot draw the map / It has no WebGL. Try another browser, or enter the roof by its measurements. | No WebGL | WEB/lib/map/map-state.ts:20-23 |
| The imagery does not load / Check the connection and try again, or enter the roof by its measurements. | Tiles fail before any has shown | WEB/lib/map/map-state.ts:24-27; WEB/components/find/RoofMap.tsx:99-104 |
| Words cannot be searched for without a map key. Paste coordinates or a maps link instead. | Words typed with no key | WEB/components/shell/Search.tsx:49 |
| Your location is not available. Allow it in the browser, or search for the address. | Geolocation refused or failed | WEB/components/shell/Search.tsx:50 |
| Nothing found for “{q}”. Try a fuller address, or paste coordinates. | No results | WEB/components/shell/Search.tsx:330 |
| The address search is not available right now. Paste coordinates or a maps link instead. | Geocoder returned an error | WEB/lib/places/esri.ts:19, :38 |
| The search cannot be reached. Check the connection and try again. | Network failure | WEB/lib/places/esri.ts:74 |
| The search answered {status}. Try again in a moment. | HTTP not ok | WEB/lib/places/esri.ts:76 |
| The search answered in a shape that cannot be read. | Malformed answer | WEB/lib/places/esri.ts:35, :39 |
| The search failed. Try again. | Any other error | WEB/components/shell/Search.tsx:113 |
| These look like coordinates, but {they / the latitude / the longitude} cannot be read. Write them as 12°54′50.74″N 77°29′31.16″E, or 12.91409, 77.49199. | Coordinates that cannot be parsed | WEB/lib/places/place-input.ts:43-45 |
| Only the latitude is here. Add the longitude after it: 12°54′50.74″N 77°29′31.16″E. (or "Only the longitude is here. Add the latitude before it: …") | Only one angle | WEB/lib/places/place-input.ts:227-229 |
| Both are marked {N/E/N or S/E or W}. The latitude takes N or S, the longitude E or W. | Same axis twice | WEB/lib/places/place-input.ts:243-246 |
| −{n} is marked {N/E}, and a minus means {south/west}. Keep the minus or the letter, not both. | Minus with N or E | WEB/lib/places/place-input.ts:203-207 |
| Minutes and seconds go up to 59. The {axis} has {n′/n″}: check where it was copied from. | Minutes or seconds ≥ 60 | WEB/lib/places/place-input.ts:208-211 |
| The latitude comes first, and {n} is more than 90°. Did you mean this? (offers the swap) | Latitude > 90 that fits as a longitude | WEB/lib/places/place-input.ts:256-258 |
| A latitude goes up to 90°, and this one is {n}°. Check where it was copied from. / A longitude goes up to 180°, … | Out of range | WEB/lib/places/place-input.ts:259-261 |
| No footprint known here / Outline the roof by corners or by a rectangle instead. | Detect press with no footprint | WEB/components/find/DetectedCallout.tsx:31, :38 |
| The outline could not be shown on the map. | Edit: `/roof/on-map` fails with a non-API error | WEB/components/find/Find.tsx:234 |
| The roof could not be built. Try again. | Build fails with a non-API error | WEB/components/find/Find.tsx:256 |
| The outline crosses itself. Move the corners so that no two edges cross. | Build with a self-crossing outline | API/services/roof_map.py:18, :25-26 |
| This outline covers {n} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design. | Area > 30,000 m² (Build, Edit, import) | CORE/errors.py:43-51; CORE/geometry.py:29 |
| The server cannot be reached. Check the connection and try again. | API unreachable | WEB/lib/api/errors.ts:4 |
| {name} is not a KMZ, KML or DXF file. Choose a file with one of these endings. | Wrong file ending | API/services/roof_files.py:18-23 |
| A DXF drawing does not say where the roof is. Give its latitude and longitude. | DXF without lat/lon | API/services/roof_files.py:62-68 |
| {file} has no KML file inside. / {file}: the KML inside is larger than 20 MB. Export the roof and its obstacles alone. | KMZ faults | CORE/io/roof_import.py:88, :90-91 |
| {file} is not a KML file that can be read: {detail} / {file} has no polygon to use as the roof. | KML faults | CORE/io/roof_import.py:119, :143 |
| {file} is not a DXF file that can be read: {detail} / {file} has no closed polyline to use as the roof. | DXF faults | CORE/io/roof_import.py:176, :203 |
| The content of {name} is not valid base64. | Bad upload | API/services/uploads.py:18 |
| The file could not be read. Choose another. | Import fails with a non-API error | WEB/components/shell/ImportDrawing.tsx:96 |

#### Known-stale (this area)
- The map tip WEB/lib/outline/tips.ts:16, :22 ("Click inside the roof to pick it up") leaves out a condition. The roof is picked only with **Box** or **Tank** in hand; with **Wall** or **Building** in hand the same press places a point (WEB/components/find/OutlineLayer.tsx:391-409). Box is the tool given when the roof closes. The help topic HELP/find/tool/move-the-roof.mdx:12-13 says so.
- WEB/components/find/DetectedCallout.tsx:12-13 (comment: Adjust "takes the corners tool"): Find wires **Use this outline** and **Adjust** both to close the callout only (WEB/components/find/Find.tsx:328-331). The footprint's corners drag either way.

#### Facts we do not have (this area)
- Geocoder coverage, language and country bias. The code only sends the map centre as `location` (WEB/lib/places/esri.ts:55).
- Imagery date and resolution by region; Overture footprint coverage by region.
- The effective size limit for importing a drawing in deployment. The code has no check before sending. The deployed API takes requests of at most 6 MiB (WEB/lib/flow/open-project.ts:13-18; docs/deployment.md:75), and base64 adds about a third.
- What the user sees when the Overture footprint tiles fail to load. The code has no separate state, so it would read as "No footprint known here" (WEB/components/find/OutlineLayer.tsx:377-381).

#### Product issues noticed (this area)
- Trees are lost when a roof is edited on Find and built again: `obstaclesOfMap` drops them when the roof is shown on the map again, and the build takes the map's obstacles (WEB/lib/outline/obstacles.ts:136; WEB/components/find/Find.tsx:227, 249). Already logged at plan/phase-14-in-app-help.md:165.
- **Long side faces** 0 and 180 give the same roof (WEB/lib/outline/by-hand.ts:37-49). Logged at plan/phase-14-in-app-help.md:166.
- The by-hand corner table is centred again on Build: the place becomes the polygon's centroid, not the typed point (API/services/roof_map.py:27-30). Logged at plan/phase-14-in-app-help.md:167.
- The import dialog's text (WEB/components/shell/ImportDrawing.tsx:28) is inaccurate. KMZ/KML LineStrings (open) become walls, DXF circles become tanks, and KMZ obstacles are named by placemark name, not layer (CORE/io/roof_import.py:137-140, :198-200, :127-128).
- Importing a drawing has no size check before sending. A file over the deployed 6 MiB request limit would likely be refused with the generic "The server answered 413 in a form that cannot be read. Try again; if it fails again, report it." (WEB/lib/api/errors.ts:30-32; WEB/components/shell/ImportDrawing.tsx:84-97). The Open-project and weather dialogs do check first (WEB/lib/flow/open-project.ts:18-21).
- **Use this outline** and **Adjust** do exactly the same thing (WEB/components/find/Find.tsx:328-331).
- Obstacle heights cannot be edited on Find after they are added (WEB/components/find/ObstacleList.tsx:41-56). Logged as deferred at plan/STATE.md:211.

## 3. The Studio, and its Roof and Array lenses

### Studio: lenses and the 3D view

**The four lenses**, in this order: **Roof**, **Array**, **Sun**, **Strings** (WEB/lib/routes.ts:14-19). Each lens has its own address, `/studio/<lens>` (WEB/lib/routes.ts:48). `/studio` on its own opens the first lens, Roof (WEB/app/(workspaces)/studio/page.tsx:5-6). The browser tab title is `<Lens> · Studio · SolarLayout Rooftop` (WEB/app/(workspaces)/studio/[lens]/page.tsx:12). The Studio reopens on the lens that was open last (WEB/components/studio/Studio.tsx:43-44; WEB/lib/routes.ts:63).

| Size | How lenses are switched | Where the inspector is | Source |
|---|---|---|---|
| Desktop (≥1101 px) | A rail of icons with labels at the left | A panel at the right | WEB/components/studio/Studio.tsx:52,60-65; WEB/components/shell/LensNav.tsx:6,19-20; WEB/components/studio/use-size.ts:9-10 |
| Tablet (640–1100 px) | A row of icon buttons floating at the top left of the stage | Under the stage and vitals | WEB/components/studio/Studio.tsx:56,60-65 |
| Phone (<640 px) | A four-way switch at the top of the bottom sheet | In the bottom sheet (label "Inspector"), which opens at half height | WEB/components/studio/Studio.tsx:34,67-71 |

The lens title and the line of read-outs under it appear only on desktop. On smaller sizes the title is for screen readers only (WEB/components/studio/Stage.tsx:135-137).

**Line under the title** (WEB/components/studio/stage-view.ts:20-27):
- Roof: `<area> m² · <area> m² inside the setback · <n> obstacles` (or `no obstacles`, or `1 obstacle`).
- Array: `<n> positions · <n> tables · <n> rows · <area> m² of modules`.
- While a new layout is being worked out, the line is dimmed and a progress ring shows (WEB/components/studio/Stage.tsx:137-139).

**View controls** sit at the top right of the stage (WEB/components/studio/ViewControls.tsx:45-73):

| Control | What it does | Sizes | Source |
|---|---|---|---|
| **3D** / **Plan** (segmented control labelled "View") | 3D: a perspective view from the south-west, above the roof. Plan: straight down, north up, can pan and zoom but cannot turn | All | WEB/components/studio/ViewControls.tsx:27-30,53; WEB/lib/scene/camera.ts:42-54; WEB/components/scene/CameraRig.tsx:40-41,120-131 |
| **Fit** (aria "Fit the roof") | Frames the whole roof again | Tablet, desktop | WEB/components/studio/ViewControls.tsx:33,55-57 |
| North control | Its needle shows where north is. Pressing it turns the view north-up. Its aria label reads e.g. "North: the view looks 30° east of north" | Tablet, desktop | WEB/components/studio/ViewControls.tsx:58-68; WEB/lib/scene/projection.ts:38-44; WEB/components/scene/CameraRig.tsx:109-116 |
| **Layers** | Opens a panel with one switch, **Satellite imagery**, captioned "Off: the plain grid". It is off at first (plain grid). It belongs to the view, not to the design | All | WEB/components/studio/ViewControls.tsx:35-38,83-130; WEB/lib/stores/view-store.ts:40-43,115 |

**Orbit and zoom**:
- In 3D, one finger orbits and two fingers pan and pinch. In Plan, one finger pans (CameraRig.tsx:24-26).
- The view never goes below the roof plane (CameraRig.tsx:132; WEB/lib/scene/camera-move.ts:9).
- How close and how far the camera may go depends on the roof's size: the distance runs from max(2 m, 0.2 × roof radius) to 12 × roof radius. Plan zoom runs from 1/12 to 5 × the zoom that fits (camera.ts:61-74).
- Movement is damped (CameraRig.tsx:128-129).
- Editing the design does not move the camera. Only presets do (CameraRig.tsx:38-40).

**Labels**: each roof edge carries a label with its length, `<n.n> m`, at the middle of the edge (WEB/lib/scene/projection.ts:46-52; WEB/components/studio/Labels.tsx:83-87). Edge labels and the kept-clear (keep-out) areas are drawn in every lens except Sun. In Sun, edge labels show only in Plan (WEB/lib/scene/what-is-drawn.ts:9-12).

**Selecting things**: pressing the roof, an obstacle, a kept-clear area or a module selects it and shows a callout:
- Module: `Position <n>` / `Row <r> · <tilt>° to the <direction>`. On east-west roofs it says `Unit` instead of `Row` (WEB/lib/scene/pick.ts:41-45).
- Roof: `Roof · selected` / `<a> × <b> m · <area> m²` (pick.ts:54-60).
- Escape clears the selection (WEB/components/studio/use-escape-clears.ts:9-21).

**When 3D cannot be drawn**: a flat plan, north up, stands in for the 3D view. It says `This browser cannot draw the roof in 3D.` or `The browser stopped drawing the roof in 3D.` (WEB/components/studio/stage-words.ts:4-5; WEB/components/studio/PlanFallback.tsx:25-50).

**What carries over between lenses**:
- The design itself.
- The camera preset, which starts at 3D.
- The Layers choice, which starts at the plain grid.
- The sun time, which starts at the design day, 10:30.
- The selection.
- Source: WEB/lib/stores/view-store.ts:115.

**What is reset when you leave a lens**: the Sun lens's tab, and the traced or selected string (view-store.ts:132-135).

**Shortcuts in every lens**:
- Cmd/Ctrl+Z undoes. Shift+Cmd/Ctrl+Z or Ctrl+Y redoes (WEB/components/shell/use-history-keys.ts:7-18; WEB/components/studio/Studio.tsx:45-46).
- `,` and `.` move the time by an hour. `[` and `]` move it by a day (Studio.tsx:47-48).
- The time pill shows in every lens; in the Sun lens on tablet and desktop a timeline replaces it (Stage.tsx:146).

**Vitals (always visible)** (WEB/components/shell/vitals-view.ts:75-114):
- Once a design run has a chosen option, they show **Energy, year 1** (MWh), **DC capacity** (kWp), **AC capacity** (kW), **DC/AC** (with a tick or a note mark), **Modules** (`<used> of <positions>`), **PR** (%) and **Yield** (kWh/kWp).
- Before that, they show the layout alone: **Roof** (m²), **Positions** (modules), and **If all were used** (kWp, once a run has read the module).
- The last cell shows, in turn:
  - the notes count, `Nothing to review` / `Every check of the design fits.` when there are none;
  - while a run is going, `Updating energy` or `Opening <name>`;
  - if a run failed, `Energy was not updated` / `Energy was not computed`;
  - if there are no options, the API's title, which links to the Strings lens.
  - Source: WEB/components/shell/vitals-view.ts:63-67,109-136.
- Units and decimals: WEB/lib/format/vitals.ts:15-31.
- Layout: on phone a sideways-scrolling row with Energy first; on tablet a grid; on desktop a floating bar (WEB/components/shell/Vitals.tsx:17-43).

### Roof lens: roof type

The **Roof type** section is a segmented control labelled **Tilted rows** / **East-west** / **Sloped**. Find shows the same choice under its full names (WEB/components/studio/RoofInspector.tsx:154-169; WEB/lib/geometry/roof-types.ts:6-10). The default is `flat_tilted` (API/schemas/roof.py:48).

| Type (full name / short) | Caption | What it changes | Source |
|---|---|---|---|
| **Flat, tilted rows** / **Tilted rows** | "Rows facing the equator" | Rows of tables at the array **Tilt**. Row pitch is shade-free unless you set it. The walkway comes every N **modules** along a row. The edge field **Every** has unit `mod` | WEB/lib/geometry/roof-types.ts:7; CORE/placement.py:162-176; WEB/lib/studio/roof-fields.ts:28 |
| **Flat, east-west** / **East-west** | "Back-to-back, low tilt" | Back-to-back units: one side faces az+90°, the other az−90°, each one module (width up the slope). Units sit with no gap unless the window needs one. The walkway comes every N **units**. The edge field **Every** has unit `rows` | WEB/lib/geometry/roof-types.ts:8; CORE/placement.py:222-276 |
| **Sloped, flush** / **Sloped** | "Modules follow the roof pitch" | Modules lie on the roof at the roof's **Pitch**, facing **Faces** unless the array has its own azimuth. Rows follow each other separated only by the module gap. Lower edge sits 0.1 m above the roof. Adds **Pitch** and **Faces** to Edges and access. GCR is reported as 1.0 | WEB/lib/geometry/roof-types.ts:9; CORE/placement.py:130-131,149,177-179,219; WEB/lib/studio/roof-fields.ts:30; API/schemas/array.py:26 |

- **Choosing Sloped in the Roof lens** sets the parapet to 0 and, if the pitch was 0, sets it to 10° (WEB/lib/geometry/roof-type-rule.ts:5-10).
- **Choosing any other type** changes only the type (roof-type-rule.ts:9).
- **Sloped chosen on Find** gives the same roof. A new design built on Find as **Sloped, flush** gets parapet 0 and pitch 10° (API/services/roof_map.py:42, 49-56). A design built again on Find goes through the same rule as the Roof lens: its type changed to Sloped sets the parapet to 0 and a pitch of 10° where it had none; an unchanged type keeps its parapet and pitch (WEB/lib/geometry/roof-type-rule.ts:15-20; WEB/components/find/Find.tsx:249).
- **Defaults that depend on roof type**:
  - Thermal Uc: 29 (tilted), 20 (east-west), 15 (sloped) (CORE/simulation.py:31).
  - Cell rise for string sizing: 25 / 25 / 35 °C (CORE/stringing.py:26).
  - Bifacial rear gain is not counted on sloped roofs (CORE/simulation.py:107).

**Location card**, the first section, headed **Location** (RoofInspector.tsx:148-151):
- Latitude and longitude to 5 decimals (WEB/lib/geometry/roof-card.ts:49; WEB/lib/format/place.ts:18-19).
- How the roof was entered: `Outlined on satellite` / `Entered by hand` / `From a file` (roof-card.ts:20-25).
- `<n> corners · <n> obstacles` (roof-card.ts:46-51).
- Size: a rectangle as `a × b m`, any other outline in m². Then `· faces <deg>° <compass>`: the side of the longest edge that faces the equator (roof-card.ts:32-44; WEB/lib/geometry/measure.ts:78-94).
- The file name, if the roof came from a KMZ or DXF (roof-card.ts:53).
- **Edit** opens `/find?edit=roof` (RoofInspector.tsx:32,91-93). On phone the whole row is the link, labelled "Edit the outline" (RoofInspector.tsx:80).

Largest roof accepted: **30,000 m²** (CORE/geometry.py:29).

### Roof lens: edges and access

Section **Edges and access** (RoofInspector.tsx:171-182):
- Order: Parapet, Setback, Walkway, Every, Clearance, Albedo, then Pitch and Faces on sloped roofs (roof-fields.ts:26-32).
- Layout: two per row with the label inside on tablet and desktop; one per row on phone (WEB/components/studio/inspector-look.tsx:14).
- A value is committed on Enter or when you leave the field. An out-of-range value is clamped to the nearest end, with a message (WEB/components/ui/number-entry.ts:44-57,74-84).

| Field (label) | Default | Range in UI | Unit | Decimals | Source (UI range / default) |
|---|---|---|---|---|---|
| **Parapet** | 0.9 | 0 – 5 | m | 2 | WEB/lib/studio/roof-fields.ts:15 / API/schemas/roof.py:49 |
| **Setback** | 1.0 | 0 – 10 | m | 2 | WEB/lib/studio/roof-fields.ts:16 / API/schemas/roof.py:50 |
| **Walkway** | 0.6 | 0 – 3 | m | 2 | WEB/lib/studio/roof-fields.ts:17 / API/schemas/roof.py:51 |
| **Every** (tilted rows) | 24 | 0 – 500 | mod | 0 | WEB/lib/studio/roof-fields.ts:18 / API/schemas/roof.py:52 |
| **Every** (east-west, sloped) | 4 | 0 – 500 | rows | 0 | WEB/lib/studio/roof-fields.ts:19 / API/schemas/roof.py:53 |
| **Clearance** (around obstacles) | 0.5 | 0 – 5 | m | 2 | WEB/lib/studio/roof-fields.ts:20 / API/schemas/roof.py:54 |
| **Albedo** | 0.20 | 0.05 – 0.9 | (fraction) | 2 | WEB/lib/studio/roof-fields.ts:21 / API/schemas/roof.py:57 |
| **Pitch** (sloped only) | 10 for a roof made sloped, on Find or in the Roof lens; 0 in the API's schema | 0 – 60 | ° | 0 | WEB/lib/studio/roof-fields.ts:22 / API/schemas/roof.py:55; WEB/lib/geometry/roof-type-rule.ts:10; API/services/roof_map.py:52-56 |
| **Faces** (sloped only) | 180 | 0 – 359.9 | ° | 1 | WEB/lib/studio/roof-fields.ts:23 / API/schemas/roof.py:56 |

What each one does in the engine:
- **Parapet**:
  - It becomes 0.2 m thick walls just inside every edge.
  - They cast shadows like obstacles, and those shadows are kept clear of modules (CORE/geometry.py:27,123-135,286-295).
  - 0 means no parapet (geometry.py:124-125).
- **Setback**:
  - The roof is shrunk inward by this distance with sharp (mitred) corners.
  - If that splits the roof into pieces, only the **largest piece** is used (geometry.py:120-121,167-170).
- **Walkway / Every**:
  - Tilted rows: after every N modules along a row there is an aisle of exactly the walkway width across the rows (placement.py:189-190).
  - Sloped: after every N rows the walkway width is added (placement.py:197-198).
  - East-west: after every N units the walkway width is added (placement.py:244-245).
  - 0 means no walkway (placement.py:189,197,244).
- **Clearance**: every obstacle's footprint is grown by this distance, and no module may stand in it (placement.py:142-143,151).
- **Albedo**: used only by the energy run. Changing it does not lay out the roof again (WEB/lib/flow/edit-parts.ts:8-9,31-33).
- **Pitch / Faces**: the module tilt and default azimuth on sloped roofs (placement.py:130-131,163).
- Every other change lays out the roof again and re-runs the design (edit-parts.ts:36-40).

Other sections in this lens:
- When an imported drawing had obstacles without heights, a note shows under the card: `These obstacles have no height in the file and were set to 1.0 m.`, then `<n> to review` and a **Review** button (RoofInspector.tsx:102-117; WEB/lib/studio/review-heights.ts:7,12).
- The **Obstacles · <n>** panel follows (WEB/components/studio/ObstaclePanel.tsx:327-329). It is not covered here.

### Array lens: module

Section **Module** (WEB/components/studio/ArrayInspector.tsx:56-67).

**Card contents** (WEB/lib/studio/module-card.ts:9-19; WEB/components/studio/ModuleCard.tsx:58-87):
- The model.
- `<maker> · <Wp> Wp`. Makers are shown by their everyday names, e.g. "Canadian Solar Inc." becomes "Canadian Solar" (WEB/lib/equipment/makers.ts:6-29).
- `<length> × <width> m`, to 3 decimals, plus `· bifacial <factor>` for bifacial modules.
- `Voc … V · Isc … A · <n> diodes`, plus `· twin half-cell` where it applies.
- `Coefficients (<source>): Voc <x>, Vmp <x>, Pmpp <x> %/°C`. The source is `PAN file`, `one-diode model` or `entered` (API/convert.py:155-156; API/schemas/equipment.py:10).
- The engine's notes on the module, each in a note box, with an exclamation mark beside the coefficients.
- The file name.
- **Change**.
- Before the first run there is a skeleton with `Reading the module with the first run` (ModuleCard.tsx:37-55).

**Default module of a new design**: the bundled sample `insolation-ina-144mhc-tf-560.PAN` (CORE/resources.py:9; CORE/project.py:137-138). It is INA-144MHC-TF-560, 560 Wp, 2.277 × 1.133 m, bifaciality 0.80 (CORE/samples/insolation-ina-144mhc-tf-560.PAN:9,11-12,27,30). It is not one of the library's modules (WEB/public/equipment/catalog.json:3-121).

**Library ("Choose a module")** (WEB/components/studio/ModulePicker.tsx:34-112; WEB/components/studio/EquipmentPicker.tsx):
- **119 modules** (catalog.json:3-121), 300–650 Wp, from 5 makers (docs/equipment-library.md:44).
- Search (placeholder "Maker or model"). Every word typed must appear in the maker (either name), the model or the file name (WEB/components/studio/PickerSearch.tsx:23-24; WEB/lib/equipment/picker.ts:16-21).
- **Power** range slider in Wp, steps of 5, from the library's lowest to its highest power rounded out to the nearest 50 (picker.ts:28-32). Ticks at 300/400/500/650, not on phone (ModulePicker.tsx:71-81).
- Columns: **Module**, **Wp**, **Efficiency %**, **Size m** (to 2 decimals), **Bifacial** (desktop only; "–" when monofacial) (ModulePicker.tsx:37-43; WEB/lib/equipment/rows.ts:29-44).
- Initial order: power, low to high (picker.ts:92).
- Click a column heading to sort. On phone, an **Order** select replaces the headings, with options such as "Power, high to low" (picker.ts:77-82,124-133; WEB/components/studio/EquipmentPicker.tsx:279).
- When one model comes in two files, the second line adds the data source (rows.ts:39).
- The count reads `<shown> of <total> modules` (EquipmentPicker.tsx:272-277).
- The design's own module is tagged `In this design` (EquipmentPicker.tsx:314).
- Choosing a row: **Use this module**, double-click, or Enter. The button is disabled for the module already in use (EquipmentPicker.tsx:112,156-159,186-195,324).
- The **Change** tooltip reads `Choose from 119 modules, or use a PAN file` (WEB/lib/equipment/card-words.ts:10-14).

**Your own PAN file**:
- Tablet and desktop: a drop strip, `Or drop a PAN file of your own here`, with **Choose a file** (EquipmentPicker.tsx:422-445).
- Phone: the action **Choose a PAN file of your own** (EquipmentPicker.tsx:194).
- The file chooser offers `.pan,.PAN` files (ModulePicker.tsx:34).
- The file is sent as base64 (WEB/lib/equipment/library-file.ts:9-13).
- **Size limit**: 256,000 characters of text, or 341,336 characters of base64 (API/schemas/limits.py:9-10; API/schemas/equipment.py:17-19).
- **Encodings**: UTF-8, then Latin-1, then cp1252 (CORE/io/pvsyst.py:17-27).
- **What is read**:
  - Manufacturer, Model, PNom, Width/Height. Values ≥100 are treated as millimetres. The longer side is the length (pvsyst.py:178-190).
  - Isc, Voc, Imp, Vmp, muISC, muVoc (V/°C values are converted to mV/°C), muPmpp, cell counts, diodes, twin half-cell, the one-diode parameters, VMaxIEC (default 1000), BifacialityFactor, LID, and the IAM profile (pvsyst.py:191-213).
- **When a file is refused**: it must have PNom, Voc and Isc (pvsyst.py:215-216). On refusal the old module stays (EquipmentPicker.tsx:249-258).
- **A file without a size** loads, but carries a note, and the layout then refuses it (API/services/equipment.py:15-29; API/services/layouts.py:38-46).
- **What the module is used for**:
  - Its size and orientation set each position's footprint (placement.py:101-105,165).
  - It sets string sizing and energy (HELP/studio/section/module.mdx:20).
  - A new module lays out the roof again and re-runs the design (edit-parts.ts:6; WEB/components/studio/ArrayInspector.tsx:47-51).

### Array lens: mounting

Section **Mounting** (WEB/components/studio/ArrayMounting.tsx:62-68). Fields by roof type (WEB/lib/studio/array-fields.ts:37-41):
- Tilted rows: Tilt, Orientation, Modules in tilt, Lower-edge clearance.
- East-west: East-west tilt, Ridge gap, Lower-edge clearance.
- Sloped: a **Tilt** read-out, then Orientation and Modules in tilt.

| Field | Control | Default | Range in UI | Unit | Source (UI / default) |
|---|---|---|---|---|---|
| **Tilt** (tilted rows) | Slider, step 1; committed when released | 15 | 0 – 45 | ° | WEB/lib/studio/array-fields.ts:15; WEB/components/studio/ArrayMounting.tsx:27,41 / API/schemas/array.py:17 |
| **Orientation** | **Portrait** / **Landscape** | Portrait | – | – | WEB/components/studio/ArrayMounting.tsx:22-25,44-50 / API/schemas/array.py:19 |
| **Modules in tilt** | Stepper | 1 | 1 – 4 | – | WEB/lib/studio/array-fields.ts:16; WEB/components/studio/ArrayMounting.tsx:52 / API/schemas/array.py:20 |
| **Lower-edge clearance** | Number field | 0.5 | 0 – 3 | m | WEB/lib/studio/array-fields.ts:17 / API/schemas/array.py:21 |
| **East-west tilt** | Slider, step 1 | 10 | 0 – 30 | ° | WEB/lib/studio/array-fields.ts:19; WEB/components/studio/ArrayMounting.tsx:43 / API/schemas/array.py:24 |
| **Ridge gap** | Number field | 0.3 | 0 – 2 | m | WEB/lib/studio/array-fields.ts:20 / API/schemas/array.py:25 |

- **Tilt hint**: `Latitude <lat>° N|S suggests <t>°`, where t is |latitude| held between 5° and 15° and rounded (array-fields.ts:27-34).
- **East-west tilt hint**: `Each side, away from the ridge` (ArrayMounting.tsx:43).
- **Sloped Tilt read-out**: `<pitch>°` with the line `Follows the roof pitch · <pitch>° facing <bearing> · set in the Roof lens` (WEB/lib/studio/array-view.ts:32-37).
- **Settings with no control**:
  - Module gap: 0.02 m (array.py:22).
  - Sloped lower-edge height: 0.1 m (array.py:26).
  - East-west modules always have their width up the slope, so Orientation and Modules in tilt do not apply there (placement.py:224).
- **Tables**:
  - Table depth up the slope = n × module side + (n−1) × 0.02 m (placement.py:164-166).
  - **Lower-edge clearance** is also the height at which the shadows of obstacles and the parapet are worked out (placement.py:144-150; CORE/keepout_parts.py:32-34).

### Array lens: spacing and the shade-free window

**Spacing** section (WEB/components/studio/ArraySpacing.tsx:105-110; WEB/lib/studio/array-fields.ts:44-48):
- Tilted rows: Row pitch and Azimuth.
- East-west: Azimuth only.
- Sloped: no Spacing section.
- Each value has a switch. On, the engine decides it. Off, a number field appears, filled with the last layout's value (array-fields.ts:65-77; WEB/components/studio/ArraySpacing.tsx:41-63).

| Field | Switch label | Default | Range when entered | Unit | Source |
|---|---|---|---|---|---|
| **Row pitch** | **Shade-free row pitch** | Engine decides (null) | 0.5 – 30 (2 decimals) | m | WEB/components/studio/ArraySpacing.tsx:76-86; WEB/lib/studio/array-fields.ts:21; API/schemas/array.py:23 |
| **Azimuth** | **Follow the roof edge** | Engine decides (null) | 0 – 359.9 (1 decimal) | ° clockwise from north | WEB/components/studio/ArraySpacing.tsx:87-97; WEB/lib/studio/array-fields.ts:18; API/schemas/array.py:18 |

**Row pitch**:
- Engine read-out: `<pitch> m` with `Shade-free · GCR <g> · profile angle <a>°` (array-fields.ts:53-63).
- How the engine works it out:
  - It takes the lowest sun profile angle in the window, with the sun in front of the rows, checked every 15 min and never below 1°. Pitch = L·(cos β + sin β / tan ψ) (placement.py:108-123; CORE/geometry.py:281).
  - It rounds up to the next 5 cm (placement.py:174).
  - It never lets the pitch fall below the table's depth on plan + 0.3 m. This floor also applies to a pitch you enter (placement.py:175).
- With the switch off, the line under it reads `Shade-free would be <pitch> m` (array-fields.ts:62).

**Azimuth**:
- Engine read-out: `<deg>° <compass>` with `Follows the roof edge closest to the equator`. On east-west roofs the line reads `The ridges run square to the roof edge closest to the equator` (array-view.ts:16-28).
- The engine's azimuth is the normal of the roof's minimum bounding rectangle that points closest to the equator (geometry.py:137-153). On sloped roofs it is **Faces** (placement.py:130-131).
- With the switch off, the line reads `The roof edge closest to the equator faces <bearing>` (array-view.ts:28).

**Shade-free window** section (ArraySpacing.tsx:111-132):

| Field | Default | Range / options | Unit | Source |
|---|---|---|---|---|
| **Shade-free window** (two-handle slider, captioned "solar time") | 09:00 – 16:00 | Track 05:00–19:00 in steps of 0.25 h. Start capped at 12:00, end at least 12:00 when committed. Ticks at 05, 08, 12, 16, 19 | solar hours | API/schemas/array.py:28-29; WEB/lib/studio/array-fields.ts:24-25; WEB/lib/studio/array-view.ts:43-51 |
| **Design day** | **Winter solstice** | **Winter solstice** / **21 Jun** (day 172) / **21 Mar** (day 80) | – | WEB/components/studio/ArraySpacing.tsx:24-28; WEB/lib/studio/array-fields.ts:79-93 |
| **Allow shaded positions** (switch) | Off | Off: `Off: positions shaded inside the window stay empty`. On: `On: positions shaded inside the window are used too` | – | API/schemas/array.py:27; WEB/lib/studio/array-view.ts:39-41 |

- Winter solstice is day 355 in the northern hemisphere and day 172 in the southern (geometry.py:263-264; CORE/placement.py:128).
- The sun is computed in solar time with Cooper's declination, every 15 minutes through the window (geometry.py:267-283).
- The API refuses a window whose end is not after its start (array.py:32-39).

What the window sets:
- **Kept-clear areas**: the union of every shadow cast by obstacles and the parapet across the window, worked out at lower-edge height (geometry.py:286-295).
- **Row pitch** on tilted rows (above).
- **The gap between east-west units**: computed for both faces and rounded up to 5 cm; zero unless needed (placement.py:231-236).

### How the layout is placed

The engine lays the modules out from the roof, the array settings and the module. Weather, inverter and system voltage play no part (API/routers/layout.py:12-15; API/services/layouts.py:18-27).

1. **Turn to face the azimuth.** The roof is turned so the array faces "down" the frame (placement.py:129-138).
2. **Find where modules may stand.** Start from the roof inside the setback, keeping only the largest piece if the setback splits it. Remove every obstacle grown by **Clearance**. Unless **Allow shaded positions** is on, also remove the kept-clear area (placement.py:141-155).
3. **Lay a grid.**
   - Columns and rows start at the corner of the usable area's bounding box. Every row shares the same columns (placement.py:180-198).
   - A table (all its modules up the slope) is placed only if its whole footprint lies **entirely inside** the usable area (placement.py:199-217).
   - East-west: each side of a unit is tested on its own (placement.py:250-259).
4. **Spacing.**
   - Tilted rows: column step = module side + 0.02 m, with walkway aisles. Row step = the pitch (placement.py:181-198).
   - Sloped: rows follow directly. Pitch = table depth + gap·cos(tilt) (placement.py:177-179).
   - East-west: units are 2 × side depth + ridge gap wide, plus the shade gap and walkways. Modules along a unit have a 0.02 m gap (placement.py:226-249).
5. **What is counted.**
   - Positions = modules placed.
   - Tables: on tilted and sloped roofs, unbroken runs of adjacent columns in a row. On east-west roofs, groups of 10 positions along a unit.
   - Rows: rows (or units) with at least one module.
   - GCR: L/pitch for tilted rows; 1.0 for sloped; 2L/(unit + gap) for east-west.
   - Source: CORE/placement.py:218-221,272-275,307-319.
6. **Kept-clear areas, by cause.** The parapet and each obstacle get their own kept-clear area. Each records how many positions it keeps clear, counted from the same layout with shaded positions allowed (CORE/keepout_parts.py:37-66). Callout: `Kept clear · <n> positions` (`Shaded in the window · …` when allowed) / `<obstacle or "The parapet"> shades this area between <hh:mm> and <hh:mm>` (WEB/lib/geometry/keepout.ts:24-36).
7. **Limits.**
   - There is no cap on the number of modules.
   - The outline must have area and must not cross itself (layouts.py:30-35).
   - Outlines over 30,000 m² are refused (CORE/geometry.py:29,156-164; API/convert.py:43).
   - The module must have a size (layouts.py:44-45).
   - A roof with no positions yields `No module fits on this roof` (API/services/design.py:28-32,226-227).

### Studio (Roof, Array): messages

| Where | Exact text | Source |
|---|---|---|
| Number field, clamped | `<max> <unit> is the highest that can be set.` / `<min> <unit> is the lowest that can be set.` / `Enter a number, from <min> to <max> <unit>.` | WEB/components/ui/number-entry.ts:77-80 |
| Stage chip, layout failed | **The layout was not updated** · <API message> · **Try again**. Escape closes it | WEB/components/studio/stage-view.ts:77-80; WEB/components/studio/LayoutFailed.tsx:23-56 |
| Notes, layout failed | `Layout was not updated`, under `The positions shown are of the design before` or `There are no positions yet` | WEB/components/shell/notes-view.ts:102-109 |
| API, outline has no area | `The roof outline encloses no area. Give at least three corners that are not on one line.` | API/services/layouts.py:14 |
| API, outline crosses itself | `The roof outline crosses itself. Give the corners in order around the roof.` | API/services/layouts.py:15 |
| API, roof too large | `This outline covers <area> m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design.` | CORE/errors.py:47-49 |
| Vitals, no positions | `No module fits on this roof` / `Inside the edge setback and clear of shadows there is no room for a module. Check the outline, the setback and the obstacles.` | API/services/design.py:28-32; WEB/components/shell/vitals-view.ts:131-133 |
| Layout note (east-west) | `Unit gap <g> m keeps east-west units shade-free in the window.` | CORE/placement.py:276 |
| Module note, Voc coefficient | `Voc coefficient <x> %/°C is outside the usual -0.35 to -0.20 %/°C for crystalline silicon. Check the datasheet and enter it if it differs.` (minus shown as a true minus) | CORE/onediode.py:25,107-108; WEB/components/studio/ModuleCard.tsx:78 |
| Module note / layout refusal, no size | `<file> gives no size of the module (Width and Height). The layout needs it: choose a PAN file that has it.` | API/services/equipment.py:19-23 |
| Picker, file refused | **This module was not loaded** / `<reason>. The module of before is kept.` | WEB/components/studio/EquipmentPicker.tsx:249-258 |
| Refusal reason, not a PAN | `<file>: not a PVsyst module file (PNom, Voc or Isc missing)` | CORE/io/pvsyst.py:216 |
| Refusal reason, bad base64 | `The content of <file> is not valid base64.` | API/services/uploads.py:18 |
| Refusal reason, library file | `<file> could not be loaded from the app's library (HTTP <n>). Try again.` | WEB/lib/equipment/library-file.ts:20 |
| Picker, catalog | `Loading the library`; on failure `The equipment catalog could not be loaded (HTTP <n>). Try again.` with **Try again** | WEB/components/studio/EquipmentPicker.tsx:356-374; WEB/lib/equipment/catalog.ts:87 |
| Picker, nothing found | `No module in the app matches “<search>”.` or `No module in the app within these filters.` / `The search reads the maker, the model and the file’s name. A PAN file of your own is taken below.` / **Clear the search** or **Clear the filters** | WEB/components/studio/EquipmentPicker.tsx:376-389 |
| Picker, own file | `Reading the file <name>` / `Let go to load the file` | WEB/components/studio/EquipmentPicker.tsx:432-440 |
| Import review | `These obstacles have no height in the file and were set to 1.0 m.` · `<n> to review` · **Review** | WEB/lib/studio/review-heights.ts:7,12 |
| No 3D | `This browser cannot draw the roof in 3D.` / `The browser stopped drawing the roof in 3D.` | WEB/components/studio/stage-words.ts:4-5 |

#### Known-stale (this area)
- None found at `cd3f0ae`.

#### Facts we do not have (this area)
- Mouse and trackpad mapping for orbit, pan and zoom (e.g. which button pans). The code uses drei `OrbitControls` defaults and sets only touch (CameraRig.tsx:25-26,125-140).
- The exact text shown for a PAN file over the size limit. It is Pydantic's validation text, prefixed with `base64:` (API/errors.py:100-111), and its wording is not in our code.
- The exact layout values in pixels per size beyond those cited. The breakpoints are 640 / 1101 px (use-size.ts:9-10).

#### Product issues noticed (this area)
- **Read-out lines echo your own value.** With the switch off, the Row pitch line `Shade-free would be <pitch> m` and the Azimuth line `The roof edge closest to the equator faces <bearing>` read `layout.pitch` and `layout.azimuth` (array-fields.ts:62; WEB/lib/studio/array-view.ts:28). Once the layout made with your own value comes back, those are the values the engine used, i.e. yours (CORE/placement.py:129,170-175,281-282), so the lines repeat your own number rather than the shade-free or edge value.
- **An entered row pitch can be silently raised.** A pitch below table depth + 0.3 m is raised by the engine (placement.py:175), but the field still shows the number you typed (array-fields.ts:61-62).
- **East-west designs always have a note.** Every east-west layout adds the Unit gap note, even when the gap is 0.00 m (placement.py:276). Layout notes count as notes to review (notes-view.ts:100), so an east-west design never shows `Nothing to review`.
- **A hidden azimuth carries into Sloped.** An array azimuth set while the roof was flat carries over when the roof becomes Sloped. The Sloped Array lens has no Spacing section to clear it (array-fields.ts:46), yet placement uses it in place of **Faces** (placement.py:130-131). The Tilt read-out still says `facing <Faces>` (array-view.ts:35).
- **No-positions link goes to the wrong lens.** The `No module fits on this roof` vitals cell links to the Strings lens (vitals-view.ts:133), though the fix (outline, setback, obstacles) is in the Roof lens.

## 4. The Sun and Strings lenses

### Sun lens: the day and the hour

The Sun lens has two tabs at the top of its inspector: **Shadows** and **Shade map** (WEB/components/studio/SunInspector.tsx:144-147). It opens on **Shadows**, and leaving the lens takes it back there (WEB/lib/stores/view-store.ts:115, 135). **Shadows** holds **Day**, **Sun at …**, **Shading over the year** and **On the roof**. **Shade map** holds **Shade map** and **Shading over the year** (WEB/components/studio/SunInspector.tsx:162-182).

**Time zone.** Every time in the Sun lens is solar time, not clock time: noon is when the sun stands highest. No time zone is used (WEB/lib/flow/sun-time.ts:1-2; API/schemas/common.py:14; HELP/studio/section/sun-at-the-hour.mdx:16). The timeline says "solar time" (WEB/components/studio/Time.tsx:177-179, 136).

**Sun model.** The sun of the view is a solar-time model using the Cooper declination over a 365-day year (CORE/geometry.py:267-278). Sunrise and sunset are the hours at which that model puts the sun at 0° (CORE/sunpath.py:43-58). The app asks for a whole day at quarter-hour steps (WEB/lib/flow/design-flow.ts:186; WEB/lib/flow/sun-day.ts:7).

#### Day

| Field | Default | Range | Unit | Source |
|---|---|---|---|---|
| **Day** (segmented control) | The design day | **21 Dec** (day 355), **21 Mar** (80), **21 Jun** (172), **Any date** | day of year | WEB/lib/flow/day-choices.ts:4-11; WEB/lib/stores/view-store.ts:115 |
| Design day, when the array has none of its own | 21 Dec where latitude ≥ 0, 21 Jun where latitude < 0 (the winter solstice of the hemisphere) | n/a | n/a | WEB/lib/flow/sun-time.ts:75-79; CORE/geometry.py:263-264 |
| **Any date** → **Day** field | The day shown | 1–31, whole | day | WEB/components/studio/SunInspector.tsx:71 |
| **Any date** → **Month** list | The month shown | January–December | n/a | WEB/components/studio/SunInspector.tsx:25-26, 72 |

- A day past the end of its month is taken as the month's last day. The year has 365 days and no leap day (WEB/lib/flow/sun-time.ts:13-14, 102-106).
- The line under the control reads `21 December is the design day: the winter solstice for this hemisphere` or `<date> is the design day of the array`. With **Any date** it reads `Day <n> · the design day is <date>` (WEB/lib/flow/sun-time.ts:91-95; WEB/components/studio/SunInspector.tsx:75-77).
- Choosing the date of the design day keeps the view on "the design day", so the view follows the array if its design day changes later (WEB/lib/flow/sun-time.ts:97-100).
- Keys: `[` and `]` step one day back or forward and wrap round the year (365 → 1) (WEB/lib/flow/sun-time.ts:125-131).
- The line under the Sun lens title reads, for example, `21 December · winter solstice · shade-free from 09:00 to 16:00`. Days 355 and 172 are named by hemisphere, and days 80 and 266 are named "equinox" (WEB/lib/flow/sun-time.ts:145-157; WEB/components/studio/Stage.tsx:99-101).
- The day changes only the view. The layout keeps the design day, and the shading figures cover the whole year (HELP/studio/section/day.mdx:21).

#### Sun at the hour

| Field | Default | Range | Step | Source |
|---|---|---|---|---|
| Hour (timeline, **Time of day** slider) | 10:30 solar time | Sunrise to sunset, each rounded inward to the quarter hour. The whole day (00:00–24:00) where the sun stays up or stays down | 0.25 h. Page Up/Down: 1 h | WEB/lib/stores/view-store.ts:115; WEB/lib/flow/sun-day.ts:40-50; WEB/components/studio/Time.tsx:71-94 |
| Keys | n/a | n/a | `,` `.`: 1 h, held to the day. `←` `→`: a quarter hour. `[` `]`: a day | WEB/components/studio/Time.tsx:20-24; WEB/lib/flow/sun-time.ts:125-131 |
| Play | Off | Runs to the end of the day's hours, then stops. Play from the end starts again at the start | 0.25 h every 250 ms; 1 h per second under reduced motion | WEB/lib/flow/play.ts:1-10, 56-66 |

- The heading reads **Sun at <hh:mm>** (WEB/components/studio/SunInspector.tsx:91-93). It shows two tiles:
  - **Height**: elevation in degrees to 0.1°.
  - **Bearing**: measured from the nearer of south and north, for example `56.6° W of south`. Along a compass line it reads `due south`, `due north`, `due east` or `due west` (WEB/lib/flow/sun-time.ts:23-36, 136-143).
- With no tiles, the section reads `The sun is down`, `The sun was not fetched` or `The sun's day is on its way` (WEB/components/studio/SunInspector.tsx:100).
- Under the timeline, a day without sunrise or sunset reads `The sun stays below the horizon all day` or `The sun stays above the horizon all day` (WEB/components/studio/Time.tsx:153-157).
- Timeline ticks: `<hh:mm> sunrise`, the window's ends, `12:00` (noon), and `sunset <hh:mm>` (WEB/lib/flow/sun-time.ts:56-67).
- On a phone the timeline sits at the top of the sheet and shows **Shade-free** `<from> – <to>` (WEB/components/studio/Time.tsx:192-209; WEB/components/studio/SunInspector.tsx:161).
- Callout at the sun marker (tablet and desktop): the title is `<hh:mm>`, or `<hh:mm> · start of the shade-free window` / `<hh:mm> · end of the shade-free window`. The detail is `Sun <x>° high, <bearing>` (WEB/lib/flow/sun-time.ts:163-168; WEB/components/studio/SunMarks.tsx:56, 78-94).
- Hour marks on the drawn path: sunrise, the start of the window, noon, the end of the window, and sunset (WEB/lib/scene/sun-marks.ts:24-54).

#### On the roof (Sun lens switches)

| Switch | Default | What it draws | Source |
|---|---|---|---|
| **Sun path** | On | `The arc the sun follows on this day` | WEB/components/studio/SunInspector.tsx:109; WEB/lib/stores/view-store.ts:115 |
| **Shade-free window** | On | `Thick part of the arc, <from> to <to>`. Dimmed and disabled while **Sun path** is off | WEB/components/studio/SunInspector.tsx:110, 132-135; WEB/lib/stores/view-store.ts:115 |
| **Calculated shadow outlines** | Off | `The engine's shadows, drawn over what you see`: the shadows of the parapet and the obstacles on the roof surface at the day and hour shown | WEB/components/studio/SunInspector.tsx:111; WEB/lib/flow/design-flow.ts:122-158 |

- The outlines are requested once the hour has stood still for 150 ms (WEB/lib/flow/design-flow.ts:143; WEB/components/ui/design-numbers.ts:57). They are shown only while they belong to the hour on screen (HELP/studio/section/on-the-roof.mdx:19).
- The shade-free window is set in the Array lens. A new project's default is 09:00 to 16:00 solar time (API/schemas/array.py:28-29).

### Sun lens: shade map and shading over the year

#### How shading is computed (engine)

- Shading is worked out for every hour of the weather year, with the sun placed at the middle of each hour (pvlib solar position) (CORE/weather.py:326-328; CORE/project.py:281-290).
- Weather given at steps shorter than an hour is averaged to hours (CORE/csv_weather.py:109-115).
- Note: this annual sun is not the Cooper solar-time model that the Sun lens draws (CORE/geometry.py:267-278).
- **Row-to-row shading** is analytic: the edge of the row in front shades the table from its lower edge up (CORE/shading.py:4-6, 135-151).
- **Obstacle and parapet shadows** are projected at each module's mid height and intersected with its footprint. Sun positions are binned to 1° of elevation and 2.5° of azimuth (CORE/shading.py:7-9, 38, 160-222).
- **Sky (diffuse)** loss comes from the hidden part of the sky. Modules with a row in front also get a row-masking angle (Passias) (CORE/shading.py:237-243).
- **Electrical loss** follows the bypass layout:
  - A shadow band on a portrait module costs the whole module, or half of a half-cell module.
  - In landscape it costs one substring per diode.
  - Fractions under 1% are ignored.
  - A string runs at its weakest module (CORE/shading.py:10-13, 113-120).
- **Far shading (horizon):** beam is lost while the sun is under the horizon profile. Only PVGIS weather fetches a horizon (CORE/shading.py:245-249; CORE/weather.py:173-176).

#### Shade map (tab)

- Each position of the layout is coloured by its **near shading over the year** from the design run. The value is the irradiation lost to near shading (shaded beam plus hidden sky), as a % of what passes the horizon. Every position is coloured, also those the chosen option leaves unused (CORE/shade_summary.py:27-54; API/schemas/design.py:25-34; HELP/studio/section/shade-map.mdx:12).

| Field | Value | Source |
|---|---|---|
| Scale top | The first of 1, 2, 5, 10, 20, 50, 100 % that holds the largest loss | WEB/lib/scene/shade-map.ts:8-17 |
| Steps | 5 equal steps, from 0 to the top | WEB/lib/scene/shade-map.ts:16, 20-22 |
| Legend title | `Near shading over the year` | WEB/lib/scene/shade-map.ts:67 |
| Legend marks | 0 … top, the last with ` %` (phone: the two ends only) | WEB/lib/scene/shade-map.ts:69-72; WEB/components/studio/ShadeLegend.tsx:26 |
| Legend foot | `Of all <n> positions` | WEB/lib/scene/shade-map.ts:72 |

- Inspector text: `Each module is coloured by its near shading over the year, of all <n> positions. Select a module for its value.` (`Tap` instead of `Select` on tablet and phone). Then each step reads `<a> to <b> %` with `<count> position(s)` (WEB/components/studio/SunShading.tsx:75-92).
- Module callout: title `Position <n> · row <r>` (`unit` on an east-west roof). Detail `Near shading <x.xx> % over the year`, plus ` · string S<k>, <y.yy> %` or ` · not used by option <L>` when there is an option (WEB/lib/scene/shade-map.ts:55-61).
- While the run is not of the layout shown, it reads `The shade map follows the design run` with a ring and colours nothing (WEB/lib/scene/shade-map.ts:46-47, 68; WEB/components/studio/ShadeLegend.tsx:46-49).

#### Shading over the year (tiles)

| Tile | Unit | Before an option | With the chosen option | Source |
|---|---|---|---|---|
| **Near, linear** | % (2 decimals) | All positions (`shading.near_pct`) | Option's loss step "Near shading, linear" | WEB/lib/studio/sun-figures.ts:23-52; WEB/components/studio/SunShading.tsx:43 |
| **Electrical, beyond linear** | % | Waits, showing the reason there are no options (its title) | Option's step "Electrical shading" | WEB/lib/studio/sun-figures.ts:47 |
| **Far, horizon** | % | All positions (`shading.far_pct`) | Option's step "Far shading, horizon" | WEB/lib/studio/sun-figures.ts:26, 48 |
| **Kept clear** | m² (whole) | The layout's area left empty for shade | same | WEB/components/studio/SunShading.tsx:46; WEB/lib/studio/sun-figures.ts:33 |

- Lines under the tiles say what is counted: `Of the <n> modules of option <L>` or `Of all <n> positions` (WEB/lib/studio/sun-figures.ts:43, 50).
- The second line is the horizon note: `Far shading: PVGIS horizon, highest <x.x>°`; `Far shading: not counted, PVGIS sent no horizon for this site` when PVGIS sent its weather without one; or `Far shading: no horizon profile for this weather source` for the others (CORE/readouts.py:246-251).
- Near loss is a share of the light past the horizon. Far loss is a share of the light with no horizon (CORE/shade_summary.py:22-24, 51-53).

### Strings lens: location and system voltage

- **Country, not roof location, sets the starting voltage.** The country is the visitor's: from the request header `x-vercel-ip-country`, else the browser's time zone, else India (`IN`) (WEB/lib/country/country.ts:5-6, 16-25, 63-79).
- The roof's own latitude and longitude set the sun, the weather and so the sizing temperatures, but not the voltage.
- The **Location** card (HELP/studio/section/location.mdx) belongs to the Roof lens (WEB/lib/geometry/roof-card.ts:1-3).
- A design made or opened without a voltage gets the country's voltage, marked as set by the app (WEB/lib/stores/project-store.ts:45-55, 67; WEB/components/shell/stores.tsx:52).
- The engine and the API have no default. Without a voltage nothing is sized (CORE/project.py:46; API/schemas/project.py:15-23, 76).

| Field | Default | Options | Unit | Source |
|---|---|---|---|---|
| **System voltage** | 600 V for US, PR, GU, VI, AS, MP and CA. 1000 V elsewhere (fallback IN → 1000) | **600 V**, **1000 V**, **1500 V** (segmented control) | V | WEB/lib/country/country.ts:9, 27-29; WEB/lib/studio/voltages.ts:4-5; WEB/components/studio/SystemVoltage.tsx:11, 36 |

- A press makes the voltage the user's own ("user"). The app never moves it again (WEB/lib/studio/voltage-choice.ts:4-8).
- **Beside the heading (who set it):**
  - `Your choice`, for a value the user chose or one from an older file.
  - `Set for <country>`, for an app-set value that equals the visitor's country default (e.g. `Set for the United States`, `Set for India`).
  - `Set by the app` otherwise (WEB/lib/studio/voltage-words.ts:83; WEB/lib/country/country.ts:11-12, 31-34).
- **Line under the choice (app-set only)** (WEB/lib/studio/voltage-words.ts:48-56):
  - 600 V in the country: `600 V, the limit for homes in the United States (NEC 690.7). Change it if the site allows more.` For Canada: `… in Canada (CE Code, Section 64). …`
  - 600 V not the country's: `600 V, the limit for homes in the United States and Canada. Change it if the site allows more.`
  - Other voltage, the country's: `1000 V, the usual limit for rooftops in <country>. Change it if the site needs another.`
  - Other voltage, not the country's: `… the usual limit for rooftops outside the United States and Canada. Change it if the site needs another.`
- **Equipment rated under the voltage.** The rating is the lower of the inverter's highest DC voltage and the module's highest system voltage (WEB/lib/studio/voltage-words.ts:39-46). Strings are sized to it, and the voltage itself does not move (CORE/stringing.py:60).
  - App-set voltage: a plain line, `Strings sized to <n> V, this inverter's limit.` (or `module's`) (WEB/lib/studio/voltage-words.ts:85).
  - User's voltage: a note with an exclamation mark. Title `Strings sized to <n> V, this inverter's limit`. Detail `Your system is set to <v> V. The bill of materials follows the voltage set.` A **Use <m> V** button offers the highest of 600/1000/1500 at or under the rating, where one exists (WEB/lib/studio/voltage-words.ts:81, 86-89; WEB/components/studio/SystemVoltage.tsx:39-50, 61-66).
- **Offer up** (the app never raises the voltage):
  - Rating above the voltage: `This inverter takes up to <r> V. Raise it only if the site's code allows.` (or `module`), with **Use <next> V**.
  - No length fits and a higher voltage would fit one: `No string length fits under <v> V; at <w> V one does. Raise it only if the site's code allows.` (WEB/lib/studio/voltage-words.ts:58-75; WEB/components/studio/SystemVoltage.tsx:51-56).
- **Missing ratings.** The inverter's rating is `VAbsMax`, else `VMPPMax`. The module's is `VMaxIEC`, else `VMaxUL`, else **1000 V assumed** (CORE/io/pvsyst.py:286, 209).
- The DC cable in the bill of materials is named by the voltage set (HELP/studio/section/system-voltage.mdx:33; CORE/readouts.py:287-298).

### Strings lens: inverter

**Card** (WEB/lib/studio/inverter-card.ts:26-37; WEB/components/studio/InverterCard.tsx:51-79):
- Model name.
- `<maker> · <AC kW> · <n> MPPT`.
- `<x.x> A per MPPT · <n> inputs`. A value the user entered reads `, entered`.
- `Current per MPPT not in the OND` with an exclamation mark when no current is known.
- The OND file's name under the card.
- Skeletons show before a run.

**Default inverter.** A design made from Find carries no OND (API/services/roof_map.py:44; CORE/project.py:40-43), so it uses the engine's bundled sample `wattpower-wp-330ktl-h1.OND` (CORE/project.py:142-147; CORE/resources.py:10). That file:
- Rates 275 kW, with MPPT 500–1500 V, VAbsMax 1500 V and VmppNom 1080 V.
- Has 6 MPPT and 28 inputs.
- Gives no IMaxMPPT, so the current comes from IMaxDC 390 A ÷ 6 = 65 A (CORE/samples/wattpower-wp-330ktl-h1.OND:28-46, 134-135; API/services/equipment.py:71-83).

**Change → `Choose an inverter`** (WEB/components/studio/InverterPicker.tsx:36-153):

| Item | Value | Source |
|---|---|---|
| Library size | 388 inverters (119 modules), 12 maker names | WEB/public/equipment/catalog.json; WEB/lib/equipment/catalog.ts:37 |
| Change tooltip | `Choose from <n> inverters, or use an OND file` | WEB/lib/equipment/card-words.ts:11-14 |
| Columns | **Inverter**, **AC kW**, **MPPT**, **MPPT V** (min–max), **Max DC V** (desktop only) | WEB/components/studio/InverterPicker.tsx:39-45 |
| Opening sort | AC power, low to high | WEB/lib/equipment/picker.ts:93 |
| Search | Every word must be found in the maker, the model or the file name | WEB/lib/equipment/picker.ts:15-21 |
| Filters | **AC power** (kW stops), **MPPT** (1 to the library's most, 15), **Max DC** (V stops 420…1500) | WEB/components/studio/InverterPicker.tsx:88-119; WEB/lib/equipment/picker.ts:41-56 |
| Tags | `In this design`, `Preliminary` (27 files) | WEB/components/studio/EquipmentPicker.tsx:314-315 |
| Mark under rating | `Up to <r> V: strings sized under the <v> V set` with an exclamation mark | WEB/lib/equipment/rows.ts:62-66; WEB/components/studio/EquipmentPicker.tsx:340-345 |
| Count | `<shown> of <total> inverters` | WEB/components/studio/EquipmentPicker.tsx:274-275 |
| Buttons | **Cancel**, **Use this inverter** (`Reading` while busy; disabled for the current file), **Choose a file**; on phone **Choose an OND file of your own** | WEB/components/studio/EquipmentPicker.tsx:112, 192-196, 443 |

- **Own file:** drop it on `Or drop an OND file of your own here` (tablet and desktop), or choose it. The drop zone reads `Let go to load the file` and `Reading the file <name>`. Accepted extensions are `.ond`/`.OND` (WEB/components/studio/EquipmentPicker.tsx:36, 161-164, 430-440).
- **File size:** up to 256,000 characters as text, or 341,336 as base64 (API/schemas/limits.py:9-10; API/schemas/equipment.py:14-27).
- **Encodings:** UTF-8, Latin-1 or CP1252 (CORE/io/pvsyst.py:17-27).
- **Refused file:** `This inverter was not loaded` then `<reason>. The inverter of before is kept.` (WEB/components/studio/EquipmentPicker.tsx:250-258). A file without PNomConv or VMPPMax gives `<file>: not a PVsyst inverter file (PNomConv or VMPPMax missing)` (CORE/io/pvsyst.py:311-312).
- **New inverter:** the OND text and name go into the design, any entered current per MPPT is cleared, and the design runs again (WEB/lib/studio/inverter-card.ts:63-66).
- **Number of inverters (#163).** Per series length, the run tries every inverter count from 1 up to the larger of:
  - the fewest that take every string, and
  - the most that keep DC/AC ≥ 1.10.

  It keeps the count that places the most strings within the DC/AC target (CORE/options.py:129-153).

**Inverter limits and cabling** (closed row: `<x.x> A · <cable> m` or `not known · <cable> m`) (WEB/lib/studio/inverter-fields.ts:53-59):

| Field | Default | Range (UI) | Unit | Source |
|---|---|---|---|---|
| **Current per MPPT** | The OND's IMaxMPPT, else IMaxDC ÷ MPPT count | 1–2000 (1 decimal); API: > 0 | A | WEB/lib/studio/inverter-fields.ts:11-14, 32-46; API/schemas/project.py:81 |
| **AC cable per inverter** | 30 | 1–2000 (2 decimals); API: ≥ 0 | m | WEB/lib/studio/inverter-fields.ts:11-14, 48-51; API/schemas/project.py:85 |

- Field details read `<x> A · from the OND` or `<x> A · IMaxDC <n> A ÷ <m> MPPT` or `not in the OND`.
- Notes read `Not in the OND: IMaxDC <n> A ÷ <m> MPPT. Enter the datasheet value if it differs.` or `Not in the OND, and the OND has no IMaxDC to work it out from. Enter the datasheet value.`
- An entered value shows `entered` and the reset **Use the file's <x> A** (API/services/equipment.py:9-12, 71-83; WEB/lib/studio/inverter-fields.ts:43-45).
- An entered value replaces both the Imp and the Isc limit (CORE/project.py:182-186).

### Strings lens: modules in series

**How the series range is derived** (CORE/stringing.py:53-72; CORE/onediode.py:75-84):
- **Shortest** = ⌈MPPT min ÷ Vmp(1000 W/m², highest ambient + cell rise)⌉.
- **Voc limit** = ⌊limit ÷ Voc(1000 W/m², lowest ambient)⌋. The limit is the lowest of the system voltage, the inverter's VAbsMax and the module's VMaxIEC.
- **MPPT maximum** = ⌊MPPT max ÷ Vmp(lowest ambient)⌋.
- **Longest** = the smaller of the Voc limit and the MPPT maximum.
- **Nominal** = round(VmppNom ÷ Vmp at STC), clamped into the range. Without VmppNom it is the longest.
- **Cold Voc without an entered coefficient** comes from the one-diode model.
- **Cold Voc with a coefficient entered** is `Voc_STC × (1 + μ/100 × (Tmin − 25))` (IEC 62548-1 Annex F).

**Sizing temperatures** (closed row: `<tmin> to <tmax> °C`) (WEB/lib/studio/sizing-fields.ts:62-65):

| Field | Default | Range (UI) | Unit | Source |
|---|---|---|---|---|
| **Lowest ambient** | Lowest `temp_air` of the weather year (`<x> °C from the weather`). 5 °C with no weather | −50 to 40 (1 dp); API −90 to 60 | °C | WEB/lib/studio/sizing-fields.ts:12-18, 55; CORE/weather.py:43-45; CORE/project.py:234-238; API/schemas/project.py:79 |
| **Highest ambient** | Highest `temp_air` of the weather year. 40 °C with no weather | 0 to 60; API −90 to 70 | °C | WEB/lib/studio/sizing-fields.ts:14, 56; CORE/weather.py:47-49; CORE/project.py:240-244; API/schemas/project.py:80 |
| **Cell rise** | By roof type: flat tilted 25, flat east-west 25, sloped flush 35 (`25 °C by roof type: flat, open rack`) | 0 to 60; API 0 to 100 | °C | CORE/stringing.py:26; WEB/lib/studio/sizing-fields.ts:34, 57; API/schemas/project.py:78 |
| **Voc coefficient** | Module's (`<x> %/°C from the PAN file` or `from the one-diode model`) | −0.999 to −0.001 (3 dp); API strictly between −1 and 0 | %/°C | WEB/lib/studio/sizing-fields.ts:17, 51-52; API/schemas/project.py:33-40 |

- Resets: **Use the weather's <x> °C**, **Use the roof type's**, **Use the module's** (WEB/lib/studio/sizing-fields.ts:52-57).
- Voc note (exclamation mark) when the module's coefficient lies outside −0.35 to −0.20 %/°C: `Voc coefficient <x> %/°C is outside the usual −0.35 to −0.20 %/°C for crystalline silicon. Check the datasheet and enter it if it differs.` (CORE/onediode.py:25, 104-108; WEB/components/studio/SizingTemperatures.tsx:26-31).

**The bar** (WEB/lib/studio/series-bar.ts:28-50; WEB/components/studio/SeriesRange.tsx:21-70; API/convert.py:225):
- Ends read `<n> · MPPT minimum` and `<n> · Voc limit` or `<n> · MPPT maximum`. The right end is the Voc limit when the Voc cap ≤ the MPPT cap.
- The heading's right side reads `<min> to <max> fit` or `None fit`.
- The marker shows the chosen option's length.
- While the strings are being sized: `Sizing the strings for <v> V` with a ring.

**Verdict under the bar** (CORE/readouts.py:55-80; WEB/components/studio/SeriesRange.tsx:58-65):
- Title: `<n> in series fits: Vmp <x> V at STC, inverter nominal <y> V`. It is shown only when the verdict is not OK.
- Detail: `Voc at <t> °C is <x> V (limit <L> V); Vmp at <t> °C cell is <x> V (MPPT minimum <m> V). <s> strings on <k> inverter(s), DC/AC <r>[ (<note>)].` followed by a current sentence where one applies.
- Mark: tick when DC/AC is in target and every MPPT is within its limits, else exclamation mark.

### Strings lens: options

**Lengths tried (#164)** (CORE/stringing.py:175-187):
- the nominal length;
- the longest;
- the "fill" length: from the nominal up, the length that places the most modules, nearest the nominal on a tie;
- the longest but one, when the fill equals one of the other two.

Lengths below the nominal are never tried for the fill.

**Strings formed** (CORE/stringing.py:96-157; CORE/options.py:90-104):
- Along a row: out on the top line, back on the bottom.
- What rows leave at their ends runs on into the next row of the same orientation (tilt and azimuth), turning back at each row (#160).
- On east-west roofs a string snakes along one side across units and never mixes east and west.
- Ranking: strings in a row come before strings across rows; within each group, least shaded first (beam-weighted annual electrical loss).

**Combinations per length** (CORE/options.py:129-153):
1. The most strings within the DC/AC target, on as many inverters as that needs.
2. The strings that fill those inverters.
3. Every string the roof holds, on the fewest inverters that take them.

**Simulation and ranking** (CORE/options.py:156-194):
- Each combination is simulated for a full year.
- Sort: in target first, then by energy, highest first.
- At most 5 are kept, lettered A…; the first is **Recommended** only if it is in target.
- **Your own** follows with the next letter (CORE/project.py:317-341).

| Value | Setting | Source |
|---|---|---|
| DC/AC | strings × series × module Pnom ÷ (inverters × inverter AC Pnom) | CORE/options.py:112 |
| Target | 1.10–1.30; above 1.40 → `heavy clipping` | CORE/stringing.py:27-28; CORE/options.py:70-78 |
| Strings per inverter | min(MPPT count × strings per MPPT, inputs). Strings per MPPT = max(1, min(⌊Imax/Imp⌋, ⌊Isc limit/Isc⌋)), or inputs ÷ MPPT when no current is known | CORE/stringing.py:75-83 |

**Card** (WEB/lib/studio/option-cards.ts:25-40; WEB/components/studio/StringOptions.tsx:21-79):
- Header: **Options**, with `series × strings · kWp · DC/AC · MWh` on the right.
- Each card: the letter and a caption, then `<series> × <strings> · <kWp 2 dp> · <DC/AC 2 dp>`, then year-1 energy in MWh (1 dp).
- Caption (CORE/readouts.py:145-163; WEB/lib/studio/option-cards.ts:30):
  - `Recommended`.
  - `Your own`.
  - `Below target`, `Above target` or `Heavy clipping`, with `, <k> inverters` when k > 1.
  - `Fills the inverter` or `Fills the inverters`.
  - `Lower clipping` (less clipping than the recommended option).
  - Otherwise `Option <L>`.
- Mark:
  - Tick, `In target`.
  - Exclamation mark, `Below the DC/AC target` / `Above the DC/AC target` / `Heavy clipping`.
  - Exclamation mark, `Over the current of an MPPT, or its limit not known: see the MPPT loading` (WEB/lib/studio/option-cards.ts:23, 33-37; WEB/components/shell/notes-view.ts:67-71).
- A press or an arrow key chooses an option without running again (WEB/components/studio/StringsInspector.tsx:90-93).
- A saved choice that no longer exists falls back to the first option (CORE/project.py:341-342).

**Note under the cards** (CORE/readouts.py:222-243; WEB/components/studio/StringOptions.tsx:203-216):
- `Target DC/AC 1.10–1.30, warning above 1.40. At most <p> strings per MPPT (<p> × <Imp> A ≤ <I> A), so one inverter takes <s> strings. The least shaded strings in a row are used first, then those across rows.`
- Without a current limit, the middle reads instead `The OND gives no current limit per MPPT: one string for each of its <n> inputs at most, <p> per MPPT, so one inverter takes <s> strings. Enter the datasheet value of the current per MPPT.`
- Options that miss the target follow with an exclamation mark: `<L>: DC/AC <r>, <note>; …`.

**Your own** (WEB/components/studio/StringOptions.tsx:114-197; WEB/lib/studio/custom-fields.ts:11-50):
- **Add your own** opens **Series**, **Strings** and **Inverters** (`series × strings × inverters`). The fields start from the design's own option, else the chosen option's numbers; with no option because the roof holds too few positions, at the length that fits × 1 × 1 (WEB/lib/studio/custom-fields.ts:17-23).
- With no options because the roof holds too few positions, yet a string fits, **Add your own** stands under the engine's words in **Options**: the API names that length (`no_options.fits`), and the engine builds the option at it (WEB/lib/studio/strings-view.ts:52; WEB/components/studio/StringsInspector.tsx:123-126; API/schemas/design.py:236-240; API/services/design.py:236-251). When no length fits, or the roof holds no module, there is no **Add your own**.
- Hints and ranges:
  - Series: `<min> to <max> fit`.
  - Strings: `<min(inverters, held)> to <held> of <n> fit`, or `No string of <n> fits on the roof`.
  - Inverters: `1 to <min(200, strings)>`.
- Buttons: **Cancel**, **Add** / **Change**. Under the card: **Change**, **Remove**.
- Saving chooses the option; removing it returns to the run's first option.
- The API takes any three positive whole numbers (API/schemas/project.py:84).
- **Refused** (exclamation-mark card; CORE/readouts.py:166-198):
  - `<s> string(s) cannot fill <k> inverter(s)` / `Each inverter needs a string at least. Change your option or remove it.`
  - `<n> in series does not fit at <V> V` / `At most <n> fit: Voc at <t> °C is <x> V, over the limit of <L> V. Change your option or remove it.`
  - The same with `… Vmp at <t> °C is <x> V, over the inverter's MPPT maximum of <m> V. …`
  - The same with `At least <n> are needed: Vmp at <t> °C cell is <x> V, under the MPPT minimum of <m> V. …`

### Strings lens: MPPT loading

- **Distribution.** The chosen option's strings, sorted by azimuth, row and start, are split across inverters in contiguous blocks. Each inverter's strings are spread over its MPPTs as evenly as they go (CORE/stringing.py:211-227).
- **Per MPPT values** (CORE/readouts.py:254-284):
  - Imp = strings × module Imp.
  - Isc = strings × module Isc.
  - kWp = strings × series × module Pnom ÷ 1000.
- **Limits:**
  - Imp limit: the OND's IMaxMPPT/IMaxDCMPPT, else IMaxDC ÷ MPPT count.
  - Isc limit: the OND's IscMaxMPPT/ISCMax, else the Imp limit.
  - An entered current replaces both (CORE/io/pvsyst.py:248-256, 291-292; CORE/project.py:182-186).
  - Tolerance is 1e-6 A (CORE/readouts.py:25, 281-282).
- **Table** (WEB/lib/studio/mppt-table.ts:40-78; WEB/components/studio/MpptTable.tsx:10-62):
  - **MPPT loading** heading, with `of option <L>` beside it.
  - One row per MPPT that has strings: **MPPT** (`MPPT <j>`, with `INV-<i>` under it), **Strings**, **Current** (Imp and Isc, each `<x> of <limit> A`, or `<x> A` when the limit is unknown), **kWp** (2 dp), and a mark.
  - Marks: tick `Fits`; exclamation mark `Over the limit` or `Limit not known`.
  - Phone: rows as cards titled `INV-<i> · MPPT <j>`.
  - Caption: `Option <L>: <n> strings on <m> MPPT[ of <k> inverters], at <V> V`.
- **Unknown limit.** The file's note stands under the table with **Enter the current per MPPT**, which opens **Inverter limits and cabling** with the focus in the field (WEB/components/studio/MpptTable.tsx:52-60; WEB/components/studio/StringsInspector.tsx:78-81).
- **Verdict sentences** (CORE/readouts.py:83-107, 23):
  - `The OND gives no current limit per MPPT: enter the datasheet value.`
  - Or `INV-<i> · MPPT <list> carries/carry <x> A, over the limit of <L> A.` and `… has/have an Isc of <x> A, over the limit of <L> A.` MPPT runs of three or more are written `1 to 6`.
- **Run options vs your own.** The run's options never exceed per-MPPT limits (CORE/stringing.py:75-83). Your own option is not held to them (CORE/options.py:207-219).

### Strings lens: strings on the roof

- **Shown when.** Strings show in the Strings lens while the run has an option (WEB/lib/stores/view-store.ts:187; WEB/components/studio/StringLegend.tsx:75-80).
- **Colour switch.** **Colour the strings by**: **String** | **MPPT** | **Inverter**, default **MPPT** (WEB/components/studio/StringLegend.tsx:14-18, 34-38; WEB/lib/stores/view-store.ts:115).
- **Colours.** Six series colours in turn: the 7th category takes the 1st colour again (WEB/lib/stores/string-colours.ts:17-23).
  - By MPPT, the colour follows the MPPT number within its inverter, so MPPT 1 of every inverter shares a colour (WEB/lib/stores/string-colours.ts:34-37).
  - Positions the option does not use are grey, **Not used** (WEB/lib/scene/string-legend.ts:32).
- **Legend.**
  - By string: `By string: <n> colours in turn along the rows`, with entries `S1 · S7 …`.
  - By MPPT and by inverter: `MPPT <j>` or `INV-<i>`. The compact form uses the lead `MPPT` or `INV` with numbers.
  - While the run is not of the layout shown: `The strings follow the design run` (WEB/lib/scene/string-legend.ts:31-44; WEB/components/studio/StringLegend.tsx:82-86).
- **Placement by size.** Desktop: a card at the bottom left. Tablet: a card at the bottom right. Phone: the compact legend on the stage, with the switch first in the sheet (WEB/components/studio/StringLegend.tsx:68-126; WEB/components/studio/StringsInspector.tsx:103).
- **Hover and select.** Hover (pointer devices) traces a string. Press selects it. The traced or selected string turns white and the rest dim (WEB/components/scene/Scene.tsx:95-104; WEB/lib/stores/view-store.ts:192-198; WEB/lib/stores/string-colours.ts:56-68).
- **String callout.** `String <n> · INV-<i>, MPPT <j>` / `<m> modules · Voc cold <x> V · <y> m of cable` (WEB/lib/scene/pick.ts:91-94).
- **Inverters.** Each is drawn as a 2 × 1 × 1.2 m box with an `INV-<i>` chip (WEB/lib/scene/inverter-markers.ts:1-8). It is placed on the setback line, nearest the middle of its strings' starts (CORE/stringing.py:228-236).
- **Line under the title.**
  - With an option: `<n> strings of <s> modules · <k> inverter(s), <m> MPPT[ each] · <u> positions not used` (or `every position used`).
  - Without: `<n> positions ready · no strings yet / no string length fits / too few for a string` (WEB/components/studio/stage-view.ts:29-60).

### Studio (Sun, Strings): messages

All marks are a tick (`fits`) or an exclamation mark (`note`). There is no cross (WEB/components/ui/StatusMark.tsx:4-5, 18-22).

| Message (exact) | Trigger | Mark | Source |
|---|---|---|---|
| `The sun is down` / `The sun was not fetched` / `The sun's day is on its way` | No sun tiles at the hour | none | WEB/components/studio/SunInspector.tsx:100 |
| `The sun stays below the horizon all day` / `…above the horizon all day` | Polar day | none | WEB/components/studio/Time.tsx:153-157 |
| `The shade map follows the design run` | Run not of the layout shown | ring | WEB/lib/scene/shade-map.ts:68 |
| `Far shading: not counted, PVGIS sent no horizon for this site` | PVGIS weather that came without its horizon | none | CORE/readouts.py:247-248 |
| `Far shading: no horizon profile for this weather source` | Weather without a horizon (non-PVGIS) | none | CORE/readouts.py:249-250 |
| `Choose a system voltage to size the strings` / `600, 1000 or 1500 V. Nothing is sized until you choose.` | Project without a voltage | n/a | CORE/readouts.py:19-20; API/services/design.py:34-36 |
| `Sizing the strings for <v> V` | Waiting for the run of the voltage | ring | WEB/components/studio/SeriesRange.tsx:53-56 |
| `Strings sized to <n> V, this inverter's/module's limit` (+ `Your system is set to <v> V. The bill of materials follows the voltage set.`) | User's voltage above an equipment rating | ! | WEB/lib/studio/voltage-words.ts:86-89 |
| `This inverter/module takes up to <r> V. Raise it only if the site's code allows.` | Rating above the voltage | none (button) | WEB/lib/studio/voltage-words.ts:74 |
| `No string length fits under <v> V; at <w> V one does. Raise it only if the site's code allows.` | No fit, a higher voltage fits | none (button) | WEB/lib/studio/voltage-words.ts:70 |
| `No string length fits this inverter` / `No string length fits: at least <n> modules are needed for the <m> V MPPT minimum, but at most <k> fit under <L> V.` | Shortest > longest | ! | CORE/readouts.py:21, 62-63; CORE/stringing.py:68-70 |
| `Change the system voltage, the inverter or the sizing temperatures` | Same; shown in **Options** | none | WEB/lib/studio/strings-view.ts:31 |
| `Too few positions for a string` / `The roof holds <n> positions, and a string takes <a> to <b> modules. A string of <s> would fit: add it as your own option.` (or `No string of that length fits.`) | No candidate length forms a string | ! | API/services/design.py:236-251 |
| `No module fits on this roof` / `Inside the edge setback and clear of shadows there is no room for a module. Check the outline, the setback and the obstacles.` | Empty layout | ! | API/services/design.py:28-33 |
| `Over the current of an MPPT, or its limit not known: see the MPPT loading` | Option in target, MPPT not OK | ! | WEB/lib/studio/option-cards.ts:23 |
| `Fits` / `Over the limit` / `Limit not known` | MPPT row | ✓ / ! / ! | WEB/lib/studio/mppt-table.ts:44-47 |
| `Current per MPPT not in the OND` | No IMaxMPPT, no IMaxDC, nothing entered | ! | WEB/lib/studio/inverter-card.ts:28 |
| `This inverter was not loaded` + `<reason>. The inverter of before is kept.` | The API refused the file | ! | WEB/components/studio/EquipmentPicker.tsx:250-258 |
| `No inverter in the app matches "<q>".` / `No inverter in the app within these filters.` + `The search reads the maker, the model and the file's name. An OND file of your own is taken below.` | Empty list | none | WEB/components/studio/EquipmentPicker.tsx:380-386 |
| `Loading the library` / catalog error + **Try again** | Catalog loading or failed | ring | WEB/components/studio/EquipmentPicker.tsx:357-372 |
| `The strings follow the design run` | Run not of the layout shown | ring | WEB/components/studio/StringLegend.tsx:82-86 |
| Voc coefficient note (see Modules in series) | Coefficient outside −0.35…−0.20 | ! | CORE/onediode.py:104-108 |

#### Known-stale (this area)

- None found at `cd3f0ae`.

#### Facts we do not have (this area)

- Whether a **NumberField** clamps or refuses a value outside its range. The ranges are cited, but the behaviour is in WEB/components/ui, which was not read.
- The exact text the app shows for an OND over 256,000 characters. The API answers with pydantic's validation message through API/errors.py:104-112; its wording was not run.
- The hour of the design day's `Kept clear` area beyond "the shade-free window of the design day". The keep-out sweep is CORE/geometry.py:281-290, and its step (0.25 h) is the default of `window_sun`; the caller was not traced.
- Whether 15-minute weather is shaded per hour after averaging. Hours are averaged at CSV read (CORE/csv_weather.py:109-115); the downstream shading steps were not traced beyond that.
- The full list of maker display names (`makerOf`, WEB/lib/equipment/makers.ts) was not read.
- The Sun lens's run-progress words (CORE/progress.py:12-15) were not traced to where the UI shows them.

#### Product issues noticed (this area)

1. **Assumed module rating presented as the module's.** A PAN with no VMaxIEC/VMaxUL is treated as 1000 V (CORE/io/pvsyst.py:209). At 1500 V the lens would say `Strings sized to 1000 V, this module's limit`, though the file gives no limit (WEB/lib/studio/voltage-words.ts:85-88).
2. **Voc coefficient default shown is not the one used.** The field says `<x> %/°C from the PAN file` (WEB/lib/studio/sizing-fields.ts:51). Without an entered value, cold Voc is the one-diode model's, not the PAN coefficient's (CORE/onediode.py:75-84; CORE/project.py:254-255).
3. **Oversize OND refused in raw words.** An OND above 256,000 characters is refused by request validation (API/schemas/equipment.py:18-19). The message is the framework's field-length text, shown verbatim under `This inverter was not loaded` (API/errors.py:104-112, 139-141; WEB/components/studio/EquipmentPicker.tsx:75-78, 250-256).
4. **MPPT colours repeat across inverters.** Colouring by MPPT uses the MPPT number within its inverter, so strings on INV-1 MPPT 1 and INV-2 MPPT 1 look identical, and the legend reads only `MPPT 1` (WEB/lib/stores/string-colours.ts:34-37; WEB/lib/scene/string-legend.ts:26, 41-42).
5. **"fits" beside an exclamation mark.** A verdict that is not OK only because of DC/AC still has the title `<n> in series fits: …`, shown bold next to an exclamation mark (CORE/readouts.py:68-70; WEB/components/studio/SeriesRange.tsx:60-62).
6. **The view's sun and the shading's sun differ.** The Sun lens and the shadow outlines use a Cooper-declination solar-time sun (CORE/geometry.py:267-278). The year's shading uses pvlib positions at each weather hour (CORE/weather.py:326-328). Small differences between what is drawn and what is counted are possible.

## 5. Performance

### Performance: running the simulation

| Item | Value | Unit | Source |
|---|---|---|---|
| How a run starts | Automatically. There is no Run button. A committed edit asks for a run. | — | WEB/lib/flow/design-flow.ts:1-4; docs/design/information-architecture.md:5 |
| Pause after an edit | A run starts 500 ms after a committed edit, so edits made close together become one run. | ms | WEB/components/ui/design-numbers.ts:20-21; WEB/lib/flow/design-flow.ts:340-347 |
| Opening a design | The run starts at once, with no pause. | — | WEB/lib/flow/design-flow.ts:378-380 |
| Edits that ask for no run | Choosing an option (the run's answer already holds every option) and renaming the design. Every other edit asks for a run. | — | WEB/lib/flow/edit-parts.ts:11-17, 36-42 |
| Choosing an option | Shown at once from the run's answer, through the **Stringing option** segmented control on tablet and desktop, or the **Option** select on phone. | — | WEB/components/performance/OptionSwitch.tsx:25-37; WEB/components/performance/Performance.tsx:64-66 |
| What a run needs | A roof outline, a module, and weather for the site. Without a system voltage the run stops after the shading: no options and no energy, and a card says what it waits for. | — | API/services/design.py:56-63; API/routers/design.py:24-25; API/services/design.py:222-233 |
| Weather that is missing | When the API refuses a run with `weather_not_loaded`, the app loads the weather of the design's source for its site, puts it into the design and runs again, once per edit. | — | WEB/lib/flow/design-flow.ts:50-53, 272-295, 318 |
| Weather kept in the design | Weather is used again if its source matches and its lat/lon is within 0.001° of the roof's. Otherwise it is loaded again. | ° | CORE/project.py:200-217 |
| Progress steps (engine words) | **Fitting modules on the roof** · **Loading {source label} weather** · **Computing hourly shading for every module** · **Applying the losses** · **Sizing strings and simulating the options** | — | CORE/progress.py:12-15, 28-30; CORE/project.py:268-309 |
| Progress UI | While a run is on its way, a line under the title shows a 20 px ring with an arc for the fraction done, the title **Updating energy** (**Opening {design name}** or **Opening the design** at the first load), and the engine's step. The values from before stay on screen, dimmed, with a ring beside the energy. At the first load, skeletons stand in place of the KPIs. | — | WEB/components/shell/UnderTheTitle.tsx:11-21; WEB/lib/performance/page-view.ts:57-81; WEB/components/shell/vitals-view.ts:64-65; WEB/components/performance/Kpis.tsx:31, 59-86 |
| Transport | `POST /design` answers with a stream of server-sent events: `progress` (step and fraction), then `result` or `error`. A project that cannot run is refused with 422 before the stream begins. | — | API/routers/design.py:16-28 |
| Options simulated | Candidates are sorted with those that fit first, then by energy, highest first. At most 5 are kept and lettered A, B, C and so on. A is **Recommended** when it fits. | count | CORE/options.py:156-193; CORE/readouts.py:150-151 |
| On error | A note under the title: **Energy was not updated** · **Values are of the design before** · **Try again** (or, with no values yet, **Energy was not computed** · **There are no values yet**), with the API's message under it. The values from before stay, not dimmed. **Try again** reruns at once. | — | WEB/components/shell/vitals-view.ts:66-68; WEB/lib/performance/page-view.ts:62-71; WEB/components/shell/UnderTheTitle.tsx:27-43; WEB/lib/flow/design-flow.ts:394-405 |
| Before options | A card with the API's title and message, word for word, and the button **Open the Strings lens**. No energy is shown. The **Assumptions** card still shows. | — | WEB/components/shell/NoOptionsCard.tsx:20-38; WEB/components/performance/Performance.tsx:104, 118-120 |

### Performance: weather

| Item | Value | Unit | Source |
|---|---|---|---|
| Control | The **Weather** select in the Performance header, with three choices, each with a fact: **PVGIS TMY** ("Typical year · PVGIS horizon"), **NASA POWER 2023** ("The year 2023 · no horizon"), **CSV file** ("Hourly · times read as UTC") | — | WEB/components/performance/WeatherSelect.tsx:33-43; WEB/lib/flow/weather-source.ts:11, 17-21 |
| Default source | `pvgis` | — | API/schemas/project.py:73; CORE/project.py:43 |
| Where it is fetched for | The roof's lat/lon (the middle of its outline) | ° | WEB/components/performance/use-weather-load.ts:60; HELP/find/section/place.mdx:22 |
| PVGIS | PVGIS API v5.3, `/tmy` (a typical meteorological year, hourly), with lat, lon and JSON output only. The horizon comes from `/printhorizon`. Columns: G(h), Gb(n), Gd(h), T2m, WS10m. Months are placed on one calendar year (2019). Request timeout 60 s. | — | CORE/weather.py:28, 135-139, 142-146, 149-159, 166-179 |
| PVGIS horizon | If the horizon request fails, the weather loads with no horizon, and that weather is not kept in the API's cache, so the next load asks PVGIS again. The run then says so in the weather notes: "PVGIS sent no horizon for this site, so far shading is not counted.", shown under the run line in Performance and in the design's notes ("Weather · Performance"). | — | CORE/weather.py:173-179; API/services/design.py:64, 130-134; WEB/lib/performance/header.ts:59; WEB/components/shell/notes-view.ts:102 |
| NASA POWER | Hourly point data for the year 2023, community RE, UTC: ALLSKY_SFC_SW_DWN, ALLSKY_SFC_SW_DNI, ALLSKY_SFC_SW_DIFF, T2M, WS10M. Gaps are interpolated. No horizon. Timeout 120 s. Label "NASA POWER 2023". | — | CORE/weather.py:183-212 |
| Server cache | Downloads are kept in memory for 64 sites, keyed by lat/lon to 4 decimals. | sites | API/services/weather.py:12-21; CORE/weather.py:168 |
| Choosing PVGIS or NASA | The select names the new source at once, with a turning ring. A line under the title reads **Loading {label} weather**. When the hours arrive, the design is edited once. A failure shows under the select, and the weather from before stays. | — | WEB/components/performance/use-weather-load.ts:51-70; WEB/lib/flow/weather-source.ts:35; WEB/components/performance/Performance.tsx:86-88 |
| Choosing CSV | Opens the dialog **Load weather from a CSV**. The file is sent to `/weather` and its summary and notes are shown. Nothing changes until **Use this weather**. | — | WEB/components/performance/WeatherCsvDialog.tsx:37-123; WEB/lib/performance/weather-csv.ts:6-14 |
| CSV size limit | 3,000,000 bytes (3 MB). The app refuses a larger file before sending it. The API caps `csv_text` at 3,000,000 characters. | bytes | WEB/lib/performance/weather-csv.ts:20-28; API/schemas/limits.py:7; API/schemas/weather.py:46 |
| CSV file types accepted | `.csv`, `.CSV`, `.txt` | — | WEB/lib/performance/weather-csv.ts:12 |
| CSV columns (names matched case-insensitively, trimmed) | time: `time`, `time(utc)`, `datetime`, `date`, `timestamp`, `date/time` · GHI: `ghi`, `g(h)`, `gh`, `global_horizontal`, `allsky_sfc_sw_dwn`, `irradiance` · DNI: `dni`, `gb(n)`, `bn`, `allsky_sfc_sw_dni` · DHI: `dhi`, `gd(h)`, `dh`, `diffuse`, `allsky_sfc_sw_diff` · air temperature: `temp_air`, `t2m`, `temp`, `temperature`, `tamb`, `t_amb`, `ambient_temp` · wind: `wind_speed`, `ws10m`, `wind`, `ws`. Time and GHI are required. | — | CORE/weather.py:215-222, 234-240, 269-279 |
| CSV format | The separator is detected. Lines beginning with `#` are skipped. Times are read as `YYYYMMDD:HHMM`, or failing that any common date-time. Times are UTC (no offset from the API). Each row's time is the start of its hour. | — | CORE/weather.py:230-232, 243-249; CORE/csv_weather.py:29-40; API/services/weather.py:59 |
| CSV units | Irradiance W/m², air °C, wind m/s | — | API/schemas/weather.py:17 |
| CSV time step | Hourly or finer. Rows under an hour apart are averaged into the hour they begin in, with a note. | — | CORE/weather.py:261-262, 290-294; CORE/csv_weather.py:108-114 |
| CSV without DNI or DHI | Both are worked out from GHI with the Erbs model, with a note. | — | CORE/weather.py:296-301; CORE/csv_weather.py:94-98 |
| CSV without temperature or wind | 25 °C or 1 m/s is taken for every hour, with a note. | °C, m/s | CORE/weather.py:283-284; CORE/csv_weather.py:101-107 |
| CSV length | 8,760 or 8,784 hours expected. Any other count is accepted, with a note. The API allows at most 8,784 values per series. | hours | CORE/csv_weather.py:20, 115-119; API/schemas/weather.py:13 |
| What the user sees about the source | The run line: "{n} modules in series × {s} strings on {k} inverter(s) · {hours} hours of {PVGIS / NASA POWER / CSV} weather, {tmin} to {tmax} °C, horizon up to {x}°" (or "no horizon"). Before options it starts "{positions} positions ready". The select shows the source name, or the CSV's file name. The CSV notes stand under the run line. The Summary row **Weather** reads "{label} · GHI {x} kWh/m² · in-plane {y} kWh/m²". | — | WEB/lib/performance/header.ts:34-44, 51, 58-59; WEB/lib/flow/weather-source.ts:24-27; WEB/components/performance/PerformanceHeader.tsx:38-47; CORE/export/summary.py:47-50 |
| CSV dialog summary after reading | "{hours} hours · GHI {x} kWh/m²" / "beam {x} · diffuse {y} kWh/m²" / "{tmin} to {tmax} °C" | — | WEB/lib/performance/weather-csv.ts:31-37 |

### Performance: the model and its losses

The simulation is hourly over every hour of the weather. Its order follows PVsyst's loss diagram (CORE/simulation.py:1-9). Each step is a row of the chain, in this order (CORE/simulation.py:381-409):

- **Sun position.** The sun is placed at the middle of each hour (CORE/weather.py:326-328).
- **Transposition.** The Perez model, with the roof's albedo, extraterrestrial DNI and relative airmass (CORE/simulation.py:99-101).
- **Far shading.** The beam is zero in hours when the sun is above 0° but below the PVGIS horizon line (CORE/shading.py:245-249; CORE/simulation.py:218, 240). The diffuse light the horizon hides is counted in the sky loss, which lands in the near-shading row (CORE/geometry.py:315-341; CORE/simulation.py:234, 251).
- **Near shading, linear.** Row-to-row shading is analytic, from the profile angle. The shadows of obstacles and the parapet are projected at each module's mid-height, with sun positions binned to 1° of elevation and 2.5° of azimuth. The sky diffuse each module sees is reduced by the obstacles, the horizon and the row in front (Passias masking) (CORE/shading.py:2-13, 38, 225-243).
- **IAM.** The PAN's IAM profile when it has 3 or more points, otherwise ASHRAE with b0 0.05. Diffuse and ground light use equivalent angles (CORE/simulation.py:72-77, 115-117).
- **Bifacial rear gain.** pvlib infinite sheds (isotropic) × the PAN bifaciality × (1 − rear loss). It applies only to a bifacial module, on roofs other than sloped flush, with GCR between 0 and 1 (CORE/simulation.py:107-112, 217, 246).
- **Module model.** PVsyst one-diode, fitted to the PAN's Isc and Voc at STC with its Rs, Rsh and Gamma (pvlib `calcparams_pvsyst`, EgRef 1.121 eV). Zero power under 1 W/m² (CORE/onediode.py:2-8, 22, 39-69).
- **Cell temperature.** pvlib PVsyst cell model with Uc, Uv and the module's efficiency (CORE/simulation.py:257-260).
- **Electrical shading.** A shaded share under 1 % is ignored. Portrait: a whole module, or half of a half-cell module. Landscape: one bypass substring per share. The result is never less than the linear loss. A string runs at its weakest module, and the loss beyond linear is applied to the beam share (CORE/shading.py:105-120; CORE/simulation.py:226, 333-339).

| Loss | Default | User can change? | Source |
|---|---|---|---|
| Far shading, horizon | From the weather's horizon (PVGIS only) | No, only by choosing a weather source | CORE/shading.py:245-249; WEB/lib/flow/weather-source.ts:18-20 |
| Near shading, linear | From the layout, the obstacles and the parapet | No, not in Performance | CORE/shading.py:225-243 |
| IAM | PAN profile, else ASHRAE b0 = 0.05 | No (API field `iam_b0`, 0–1, has no UI) | CORE/simulation.py:47, 72-77; API/schemas/losses.py:26 |
| **Soiling** | 2.0 %, applied to the front irradiance (not the rear) | Yes, in the chain: 0–30 %, 1 decimal | CORE/simulation.py:37, 216, 246; WEB/lib/performance/loss-fields.ts:13 |
| **Bifacial rear gain** | On. The switch is disabled for a monofacial module | Yes, a switch in the chain | CORE/simulation.py:48; WEB/lib/performance/loss-fields.ts:79-82 |
| Rear shading and mismatch | 10.0 % | Yes, in **Assumptions**: 0–50 %, 1 decimal | CORE/simulation.py:49; WEB/lib/performance/assumption-fields.ts:14, 86 |
| Roof albedo | 0.20 | Yes, in **Assumptions**: 0.05–0.9, 2 decimals | CORE/geometry.py:108; WEB/lib/performance/assumption-fields.ts:15, 87 |
| Irradiance level | One-diode model at 25 °C | No | CORE/simulation.py:329, 390 |
| Temperature (Uc) | By roof type: 29 (Flat, tilted rows), 20 (Flat, east-west), 15 (Sloped, flush) W/m²K. Uv 0 | Uc yes, as **Thermal Uc**: 5–60 W/m²K, whole numbers, with **Use the roof type's** to reset. Uv no | CORE/simulation.py:31, 45-46, 259; WEB/lib/performance/assumption-fields.ts:13, 51-68 |
| Electrical shading | From bypass layout and strings | No | CORE/simulation.py:333-339 |
| **Module quality** | 0.0 % (a negative value is a gain) | Yes: −5 to 10 %, 1 decimal | CORE/simulation.py:39, 340; WEB/lib/performance/loss-fields.ts:14 |
| **LID** | The PAN's value (row labelled **LID (PAN)**), else 1.5 % | Yes: 0–10 %, 1 decimal. Resets with **Use the PAN's** or **Use the default** | CORE/simulation.py:32, 38, 55-58, 342-344, 394; WEB/lib/performance/loss-fields.ts:15, 70-75 |
| **Mismatch** | 1.0 % | Yes: 0–10 %, 1 decimal | CORE/simulation.py:40, 345; WEB/lib/performance/loss-fields.ts:16 |
| **DC ohmic** | 1.5 % at STC power. The loss share scales with the string's power over its STC power (capped at 2×) | Yes: 0–10 %, 1 decimal | CORE/simulation.py:41, 347; WEB/lib/performance/loss-fields.ts:17 |
| Inverter efficiency | The OND efficiency curves, interpolated by input power and by voltage between curves. Without curves, the OND's euro efficiency, else 97 % | No (comes from the OND) | CORE/simulation.py:124-145 |
| Inverter threshold | Output is 0 below the OND's threshold power | No | CORE/simulation.py:363 |
| Inverter clipping | Per inverter, at the OND's nominal AC power | No | CORE/simulation.py:352, 364 |
| Night consumption | The OND's night loss in hours with no DC input | No | CORE/simulation.py:365, 370 |
| **AC ohmic** | 1.0 % at nominal AC power, scaled by load (capped at 2×) | Yes: 0–10 %, 1 decimal | CORE/simulation.py:42, 371; WEB/lib/performance/loss-fields.ts:18 |
| **Availability** | 99.5 % | Yes: 80–100 %, 1 decimal | CORE/simulation.py:43, 372; WEB/lib/performance/loss-fields.ts:19 |
| Degradation | 0.5 %/yr. Used only for the 25 years | Yes, as the **Degradation** field in the **25 years** card: 0–3 %/yr, 2 decimals | CORE/simulation.py:44, 445-446; WEB/lib/performance/degradation.ts:7-9; WEB/components/performance/YearsChart.tsx:109 |
| Weather variability (σ) | 3.0 % | Yes, in **Assumptions**: 0–20 %, 1 decimal | CORE/simulation.py:50; WEB/lib/performance/assumption-fields.ts:16, 88 |
| Model and data (σ) | 3.0 % | Yes, in **Assumptions**: 0–20 %, 1 decimal | CORE/simulation.py:51; WEB/lib/performance/assumption-fields.ts:17, 89 |
| Exceedance levels | P50, P75, P90 | Yes: three fields, P50–P99, whole numbers, sorted, each kept once | CORE/simulation.py:52; WEB/lib/performance/assumption-fields.ts:22-25, 90, 106-112 |
| Grid CO₂ | 0.716 t/MWh | Yes, in **Assumptions**: 0–2 t/MWh, 3 decimals | CORE/simulation.py:53; WEB/lib/performance/assumption-fields.ts:18, 91 |

- **What the chain's boxes are.** Boxed values in the chain are fields of the design. Entering one is an edit, and the run follows (WEB/components/performance/LossChain.tsx:38-51).
- **Edits that do not simulate again.** Degradation, the σ values, the levels and the CO₂ factor change only figures computed after the year. Changing them does not simulate the year again (CORE/simulation.py:434-441).
- **API ranges.** The API accepts wider ranges than the UI (API/schemas/losses.py:9-32).

### Performance: results

The figures are those of the chosen option (WEB/lib/performance/page-view.ts:46-49).

| Item | Value / how computed | Unit, rounding | Source |
|---|---|---|---|
| **Energy to grid, year 1** (lead tile) | The sum of the hourly AC energy after availability | MWh, 1 decimal | WEB/lib/performance/kpis.ts:30; WEB/lib/format/vitals.ts:15; CORE/simulation.py:379 |
| P-values (cells under the lead) | P_x = E × (1 − z(x/100) × σ), σ = √(weather σ² + model σ²). Defaults give σ 4.24 %, and P50 equals year 1. The last cell is labelled "P{level} · σ {σ} %" | MWh, 1 decimal. σ 2 decimals | CORE/simulation.py:443-444; WEB/lib/performance/kpis.ts:31-34; WEB/lib/format/performance.ts:9-11 |
| **Performance ratio** | E × 1000 / (DC kWp × in-plane irradiation), where in-plane is the transposed value before any shading | %, 1 decimal | CORE/simulation.py:411-412; WEB/lib/format/vitals.ts:24 |
| **Specific yield** | E × 1000 / DC kWp | kWh/kWp, whole | CORE/simulation.py:425; WEB/lib/format/vitals.ts:25 |
| **Capacity factor, AC** | E × 1000 / (AC kW × 8,760) × 100, followed by "{x} % DC" from DC kWp | %, 1 decimal | CORE/simulation.py:426-427; WEB/lib/format/performance.ts:13-14 |
| **In-plane irradiation** | Transposed irradiation per module | kWh/m², whole | CORE/simulation.py:323, 411; WEB/lib/format/performance.ts:16 |
| **Energy over 25 years** | Σ of years 1–25, where year n = E × (1 − d)^(n−1) | MWh, whole | CORE/simulation.py:445-446; API/convert.py:280-281; WEB/lib/format/performance.ts:18 |
| **CO₂ avoided** | E × grid CO₂ factor | t/yr, 1 decimal | CORE/simulation.py:447; WEB/lib/format/performance.ts:19 |
| **From sunlight to the grid** (chain) | 21 rows: **Global horizontal irradiation**, **Transposition to plane ({tilt}°)**, **Far shading, horizon**, **Near shading, linear**, **IAM**, **Soiling**, **Bifacial rear gain**, **Array nominal energy at STC**, **Irradiance level**, **Temperature**, **Electrical shading**, **Module quality**, **LID** (or **LID (PAN)**), **Mismatch**, **DC ohmic**, **Inverter efficiency**, **Inverter clipping**, **Night consumption**, **AC ohmic**, **Availability**, **Energy to grid** | Change from the step before: 2 decimals, with a "+" for a gain and "−" for a loss, and "0.00 %" under 0.005. Running total: 1 decimal. Totals carry kWh/m² (irradiance) or MWh (energy) | CORE/simulation.py:381-409; WEB/lib/performance/loss-chain.ts:33-45, 53; WEB/lib/format/cascade.ts:10-12 |
| Chain legend | **Gain** · **Loss** · **Boxed values are yours to change**. The hover readout shows "{total} {unit} · {change}" over the label | — | WEB/components/performance/LossChain.tsx:22-36; WEB/lib/performance/loss-chain.ts:41-45 |
| **Energy to grid by month** | Tabs **Chart** and **Table**, unit "MWh". 12 bars from zero, with only the highest and lowest labelled. Tooltip "{mwh} MWh · {kWh/kWp} kWh/kWp" with the month. Table columns **Month**, **MWh**, **kWh/kWp**, with a last row **Year** | MWh 1 decimal. kWh/kWp whole | WEB/components/performance/MonthlyChart.tsx:20, 94, 158; WEB/components/performance/chart-card.ts:14-16; WEB/lib/performance/month-bars.ts:9, 37-72; CORE/simulation.py:413 |
| **25 years** | A line of all 25 years, scaled to the run's own range rather than to zero. Years 1, 5, 10, 15, 20, 25 labelled. The table shows those six years and "Total, 25 years" | MWh 1 decimal (years), whole (total) | WEB/components/performance/YearsChart.tsx:27, 174; WEB/lib/performance/year-line.ts:33, 40-75 |
| **Summary** (table **Item** / **Value**) | Rows in order: **Site**, **Roof**, **Structure**, **Module**, **Inverter**, **Stringing**, **DC capacity**, **AC capacity**, **Weather**, **Losses** ("Clipping {x} % · LID {y} % · uncertainty σ {z} %"), **Energy, year 1** ("P50 {x} MWh · P75 … · P90 …"), **Specific yield** ("{x} kWh/kWp · PR {y} % · CUF {z} % AC"), **Module area**, **CO₂ avoided** ("{x} t/yr at {f} t/MWh") | As in each row | WEB/components/performance/SummaryTable.tsx:19-22; WEB/lib/performance/summary.ts:32-35; CORE/export/summary.py:34-58; CORE/readouts.py:24, 304-313 |
| Clipping % (Summary) | 1 − clipped output / inverter output | %, 1 decimal | CORE/simulation.py:422; CORE/readouts.py:311 |

### Performance: the demo's figures

The demo is the Pune demo roof: a 90 × 40 m flat roof at 18.52, 73.86, with flat tilted rows. Its obstacles are a stair room, a water tank and 4 AC units. It uses the bundled PVGIS TMY weather with a horizon, and the system voltage is 1500 V (CORE/demo.py:2, 8, 21-31, 41-53). The demo-numbers test (`apps/api/tests/engine/test_demo_numbers.py`) asserts these figures:

| Figure | Value | Source |
|---|---|---|
| System voltage | 1500 V | apps/api/tests/engine/test_demo_numbers.py:18-19 |
| Positions / rows / tables | 790 / 6 / 28. Pitch 6.45 m | apps/api/tests/engine/test_demo_numbers.py:22-28 |
| Options, in order | 29x22x1, 26x24x1, 28x22x1, 28x28x2, 29x27x2 | apps/api/tests/engine/test_demo_numbers.py:11, 31-32 |
| Option A (recommended, chosen) | 29 in series × 22 strings × 1 inverter. 357.28 kWp. DC/AC 1.30 | apps/api/tests/engine/test_demo_numbers.py:35-42 |
| Energy to grid, year 1 | 617.8 MWh (±0.1) | apps/api/tests/engine/test_demo_numbers.py:48 |
| PR | 86.6 % (±0.1) | apps/api/tests/engine/test_demo_numbers.py:49 |
| P50 / P75 / P90 | 617.8 / 600.2 / 584.2 MWh | apps/api/tests/engine/test_demo_numbers.py:13, 60-65 |
| Monthly, Jan–Dec | 62.0, 58.8, 68.4, 64.1, 54.9, 46.9, 31.5, 38.5, 37.5, 53.4, 53.5, 48.5 MWh | apps/api/tests/engine/test_demo_numbers.py:12, 52-57 |

`plan/reference/demo-numbers.md` gives more figures that the test does not assert. Cite that file, not the test, if they are used: 1,729 kWh/kWp, σ 4.24 %, CUF 25.6 % AC / 19.7 % DC, in-plane 1,998.0 kWh/m², 25-year total 14,554 MWh, CO₂ 442.4 t/yr (plan/reference/demo-numbers.md:47, 56-60).

### Performance: messages

| Where | Exact words | Source |
|---|---|---|
| Page title | **Performance** | WEB/components/performance/PerformanceHeader.tsx:35 |
| Run on its way | **Updating energy** · **Opening {name}** / **Opening the design** | WEB/components/shell/vitals-view.ts:64-65 |
| Run failed | **Energy was not updated** · **Values are of the design before** · **Try again** / **Energy was not computed** · **There are no values yet** | WEB/components/shell/vitals-view.ts:66-68 |
| Server fault | "The server could not finish this request. Try again; if it fails again, report it." | API/errors.py:28 |
| App fault | "Something went wrong in the app: {what}. Try again; if it fails again, report it." | WEB/lib/flow/design-flow.ts:56-63; WEB/components/performance/use-weather-load.ts:20-24 |
| No voltage | **Choose a system voltage to size the strings** / "600, 1000 or 1500 V. Nothing is sized until you choose." | CORE/readouts.py:19-20 |
| No positions | **No module fits on this roof** / "Inside the edge setback and clear of shadows there is no room for a module. Check the outline, the setback and the obstacles." | API/services/design.py:28-33 |
| Too few positions | **Too few positions for a string** / "The roof holds {n} positions, and a string takes {min} to {max} modules. A string of {k} would fit: add it as your own option." (or "No string of that length fits.") | API/services/design.py:236-251 |
| No-options button | **Open the Strings lens** | WEB/components/shell/NoOptionsCard.tsx:34 |
| Weather loading | **Loading {PVGIS TMY / NASA POWER 2023} weather** · **Reading {file name}** | WEB/lib/flow/weather-source.ts:35, 38-41 |
| Weather failed (under the select) | **The weather was not loaded**, followed by the API's message | WEB/components/performance/WeatherSelect.tsx:19, 47-61 |
| No weather for site | "{label} has no weather for {lat}, {lon}: {service's words}. Check the site, or choose another weather source." | API/services/weather.py:96-105 |
| Unreachable | "{label} could not be reached. Check the connection and try again, or choose another weather source." | API/services/weather.py:80-86 |
| Unreadable answer | "{label} answered in a form that cannot be read. Try again later, or choose another weather source." | API/services/weather.py:87-93 |
| Service fault | "{label} failed: it answered {status}. Try again later, or choose another weather source." | API/services/weather.py:106-111 |
| Downloads off (a server setting) | "Downloads of weather are off on this server: {label} was not asked. Load a CSV file, or turn downloads on." | API/services/weather.py:68-75; API/settings.py:10-20 |
| Weather missing (engine) | "This project has no weather for {lat}, {lon} yet. Load the {source} weather first." / "The weather in this project is {label} for {lat}, {lon}, not for this site or source. Load the {source} weather for {lat}, {lon}." | CORE/project.py:219-226 |
| CSV dialog | **Load weather from a CSV** · "Hourly values of a year: a time column, global irradiance, and, if you have them, beam, diffuse, air temperature and wind. Times are read as UTC." · **Drop the weather file here** · "A CSV of hourly values, 3 MB at most" · "It is read, and becomes the weather of this design when you use it" · **Cancel** · **Use this weather** | WEB/lib/performance/weather-csv.ts:6-14; WEB/components/performance/WeatherCsvDialog.tsx:107-113 |
| File field | **Choose a file** · **Reading the file** · **This file was not loaded** · **Choose another** | WEB/components/ui/FileDrop.tsx:106, 132, 142, 144, 153 |
| CSV too large | "This file is over 3 MB, more than a year of weather takes. Choose a file of hourly values." | WEB/lib/performance/weather-csv.ts:23 |
| CSV browser failure | "The file could not be read ({error}). Choose another." | WEB/components/performance/WeatherCsvDialog.tsx:26-29 |
| CSV empty | "Choose a CSV weather file." | CORE/csv_weather.py:35-36 |
| CSV missing column | "{file}: no column named any of {names, comma-separated}" | CORE/weather.py:270-274 |
| CSV not a table | "{file} cannot be read as a table of hours: {reason}." | CORE/csv_weather.py:43-47 |
| CSV no rows | "{file} has no hours: below its header there is no row." | CORE/csv_weather.py:57-58 |
| CSV bad times | "{file}: the time cannot be read in {n} rows, the first of them row {r} ({value}). Write it as 2023-06-01 13:00, in UTC." | CORE/csv_weather.py:60-67 |
| CSV repeated hours | "{file}: {n} hours are there more than once, the first of them {YYYY-MM-DD HH:MM}. Every hour may be there once." (with "hour is" for one) | CORE/csv_weather.py:68-75 |
| CSV gaps | "{file}: {column} has no value in {n} rows, the first of them row {r}. Fill the gaps, or leave the column out." | CORE/csv_weather.py:78-89 |
| CSV notes | "{file} has no beam and diffuse irradiance. They were worked out from the global irradiance (Erbs model), which is less exact than measured values." · "{file} has no air temperature. 25 °C was taken for every hour, so the strings are sized for 25 °C. Enter the site's lowest and highest ambient in the Strings lens." · "{file} has no wind speed. 1 m/s was taken for every hour." · "{file} gives the weather every {m} minutes. Each hour is the average of its rows (the simulation takes a row as an hour)." · "{file} has {n} hours, not the 8,760 of a year. Energy of a year needs every hour of it." | CORE/csv_weather.py:92-120 |
| Chain | **From sunlight to the grid** · LID placeholder "PAN {x}" / "default {x}" · "PAN gives {x} %" · **Use the PAN's** · **Use the default** · "The module is monofacial: no rear gain." | WEB/components/performance/LossChain.tsx:57; WEB/lib/performance/loss-fields.ts:65, 70-75 |
| Assumptions | **Assumptions** · **Thermal Uc** ("{x} W/m²K by roof type" when empty, "{x} by roof type" when entered) · **Use the roof type's** · **Rear shading and mismatch** · **Roof albedo** · **Weather variability** · **Model and data** · **Exceedance levels** · **Grid CO₂** | WEB/components/performance/Assumptions.tsx:19; WEB/lib/performance/assumption-fields.ts:51-63, 84-92 |
| Table captions | "The energy to grid of every month, and of the year" · "Every year is in the chart; the table says six of them and the total." · "The design, summed up by the engine" | WEB/components/performance/MonthlyChart.tsx:158; WEB/components/performance/YearsChart.tsx:174; WEB/components/performance/SummaryTable.tsx:22 |

#### Known-stale (this area)
- **Demo options D and E.** `plan/reference/demo-numbers.md:50-51` lists options D and E as 26 x 27 x 2 and 28 x 25 x 2. The test asserts 28x28x2 and 29x27x2 (apps/api/tests/engine/test_demo_numbers.py:11). Use the test's figures.
- **CSV notes comment.** The comment at WEB/lib/performance/header.ts:25 names three CSV notes (no beam and diffuse, no temperature, no wind). The engine also writes notes about the time step and about the hour count, five in all (CORE/csv_weather.py:92-120).
- **Weather route docstring.** API/routers/weather.py:14 says "A year of hourly weather". A CSV may be finer than hourly (it is averaged into hours) and need not be a year (CORE/weather.py:291-295; CORE/csv_weather.py:115-119).
- **Mockup figures.** The figures in the mockups (docs/design/README.md:128-129: soiling 3 %, degradation 0.7, Uc 25, levels P50 · P90 · P99, NASA POWER) are variants drawn for the boards. They are not the shipped defaults (2.0 %, 0.5 %/yr, Uc by roof type, P50/P75/P90, PVGIS; CORE/simulation.py:37-53).

#### Facts we do not have (this area)
- **PVGIS database.** The code sends PVGIS only lat, lon and the output format, so PVGIS's own default database and year range apply (CORE/weather.py:172). Which ones those are is not in the code.
- **Wait times.** The code states no typical or maximum run time. It has only the 500 ms pause, the progress fractions and the download timeouts (60 s for PVGIS, 120 s for NASA).
- **Model constants left at pvlib defaults.** The code does not set the Perez coefficient set or the PVsyst cell model's absorption, so pvlib's defaults apply. Their values are not in this repository.
- **In-app help.** No topic in HELP covers Performance, the weather, the losses or the results, so there is no help text to cite.
- **Request timeouts in the web client.** Not examined.

#### Product issues noticed (this area)
- **Blank irradiance cells.** In a CSV, blank or non-numeric GHI cells become 0 W/m² and negative values become 0. Blank DNI or DHI cells (when the columns exist) become 0. Gaps in temperature are interpolated. None of this is refused or noted, although CORE/csv_weather.py:3-5 says such faults are refused (CORE/weather.py:278, 288-289, 302).
- **Rear-gain switch on sloped flush roofs.** The **Bifacial rear gain** switch stays enabled on a Sloped, flush roof with a bifacial module, but the engine applies no rear gain there and nothing says why (CORE/simulation.py:107; WEB/lib/performance/loss-fields.ts:79-82).
- **Horizon diffuse in the wrong row.** The diffuse light the horizon hides is booked in **Near shading, linear**. **Far shading, horizon** counts only the beam (CORE/geometry.py:315-341; CORE/simulation.py:249-251).
- **Engine column names in the CSV gap message.** The message uses `temp_air`, `wind_speed`, `dni` or `dhi`, not the user's column name. "Row {r}" counts data rows below the header, not lines of the file (CORE/csv_weather.py:80-88).
- **"Hourly" in the copy.** The CSV copy says "hourly" (WEB/lib/performance/weather-csv.ts:8, 10, 23; WEB/lib/flow/weather-source.ts:20), but the engine also accepts sub-hourly rows and averages them (CORE/weather.py:291-295).
- **CSVs shorter than a year.** A CSV that is not a full year is accepted with only a note. "Energy to grid, year 1", PR, the P-values and the 25-year figures are then computed from just those hours (CORE/csv_weather.py:115-119; CORE/simulation.py:379-447).

## 6. Handover and the project file

### Handover: the screen

Repo commit 75591f2. `WEB` = `apps/web`, `API` = `apps/api/src/rooftop_api`, `CORE` = `apps/api/src/rooftop_core`, `HELP` = `apps/web/content/help`. Other paths are from the repo root.

| Item | Value | Source |
|---|---|---|
| Address | `/handover` (the list) and `/handover/<item>` (one item) | WEB/lib/routes.ts:49, WEB/lib/routes.ts:58 |
| Page title and subtitle | **Handover**, then "Everything the installer, the client and the utility need" | WEB/components/handover/DeliverableList.tsx:65-66 |
| Items in order (label · item id · badge) | **Design report** · report · PDF; **Single-line diagram** · single-line-diagram · PNG; **Bill of materials** · bill-of-materials · BOM; **DC cable schedule** · cable-schedule · DC; **CAD layout** · cad-layout · DXF; **Google Earth model** · earth-model · KMZ; **Hourly data** · hourly-data · CSV; **Project file** · project-file · RTD | WEB/lib/routes.ts:24-32; WEB/lib/flow/deliverables/items.ts:41-50 |
| Files and views | Six items are files: report, single-line diagram, CAD layout, Google Earth model, hourly data, project file. **Bill of materials** and **DC cable schedule** are on-screen views with no file of their own. Both tables are printed in the report, on page 5. | WEB/lib/flow/deliverables/items.ts:41-50; WEB/lib/handover/in-the-report.ts:1-4 |
| The list | Seven rows, then **Project file** as a card at the end of the list, with a **Save a copy** button | WEB/components/handover/DeliverableList.tsx:81-106 |
| A row | Format badge, name, and one line of facts. On phone every row ends in a chevron. On tablet and desktop a file row ends in a download icon and a view row in a chevron. A row is a link that opens the item's preview. Pressing a row does not download. | WEB/components/handover/DeliverableRow.tsx:42-73 |
| Desktop (1440) | The list (440 wide, with a line at its right) and the preview stand side by side. At `/handover` the first item (**Design report**) is shown beside the list. | WEB/components/handover/Handover.tsx:39-48, WEB/components/handover/Handover.tsx:83; WEB/lib/routes.ts:38 |
| Tablet (834) | The list (300 wide) stands beside the preview | WEB/components/handover/Handover.tsx:39-47 |
| Phone (390) | The list is the whole screen. An item opens over it as a pushed screen, with a back row **Handover** at the top (accessible name "Back to Handover"). | WEB/components/handover/Handover.tsx:135-152 |
| Preview head | The item's name, its facts line, and the primary action: **Download PDF**, **Download PNG**, **Download DXF**, **Download KMZ**, **Download CSV**, or **Save a copy** for the project file. On phone the action is a 44 px download icon button that carries the same name. | WEB/lib/flow/deliverables/items.ts:117; WEB/lib/flow/deliverables/items.ts:55; WEB/components/handover/Preview.tsx:68-85 |
| Head of a table view | The words "In the report, page 5" (tablet and desktop only) and **Copy as table**. On phone **Copy as table** is an icon button with a tooltip, and "In the report, page 5" stands above the table. | WEB/components/handover/Handover.tsx:92-98; WEB/components/handover/CopyAsTable.tsx:38-50; WEB/components/handover/BillOfMaterials.tsx:23 |
| Copy as table | Copies the rows to the clipboard as tab-separated text: a header line, then one line per row, in the order shown | WEB/lib/handover/copy-table.ts:10-14 |
| How a download works | The browser asks the API for the file and saves it under the name the API gives. A ring ("On its way") replaces the icon or the button's icon until it arrives. A second press while it is on its way does nothing. A download that succeeds shows no message, only the browser's own download. | WEB/lib/stores/downloads-store.ts:1-7, WEB/lib/stores/downloads-store.ts:158-176; WEB/components/handover/DeliverableRow.tsx:63-64; WEB/lib/flow/deliverables/save-file.ts:4-16 |
| Which option a file is of | The option the run shows: the user's choice, or the run's own choice until the user picks one | WEB/lib/stores/downloads-store.ts:38-47; WEB/components/shell/stores.tsx:68-72 |
| File names | `<stem><ending>`. The stem is the project name split at whitespace and at `\ / : * ? " < > \|` and control characters, with dots trimmed from each word's ends, joined with "-", cut to 80 characters, and with trailing "-" or "." removed. An empty result becomes `rooftop-design`. | API/services/export.py:25-29, API/services/export.py:232-235; WEB/lib/flow/deliverables/file-name.ts:5-21 |
| Names outside ASCII | Sent as `filename*` (UTF-8), with `rooftop-design<ending>` as the plain fallback. The app reads `filename*` first. | API/services/export.py:93-99; WEB/lib/api/download.ts:7-10 |
| Endings | Report `-report.pdf`; layout `-layout.dxf`; Earth `.kmz`; hourly `-hourly.csv`; diagram `-single-line-diagram.png`; project `.rtd`; Download all `.zip` | API/services/export.py:108-115, API/services/export.py:151 |
| Report date | The reader's own date (browser local date, YYYY-MM-DD) is sent with every file. Without it, the server's date is used. | WEB/lib/flow/deliverables/day.ts:1-12; API/routers/export.py:46-47 |
| Retries | An export or the report's pages are asked for up to 3 times when the answer is not in a form the app can read | WEB/lib/api/client.ts:46, WEB/lib/api/client.ts:93-100, WEB/lib/api/client.ts:134-145 |
| While a new run is on its way | The diagram, the bill of materials and the cable schedule stay visible but dimmed | WEB/lib/handover/page-view.ts:54-56; WEB/components/handover/BillOfMaterials.tsx:22 |
| Facts lines per row | Report: "A4 landscape · N pages". Diagram: "N strings of S × W Wp · K inverters, M MPPT". BOM: "N modules · N tables · N m DC cable". Schedule: "N strings · Voc cold V V" (the highest string). CAD: "Metres · one layer per string". Earth: "Roof, obstacles with heights, N modules". Hourly: "N rows · irradiance, temperature, power". Project file: "<stem>.rtd · opens again here". | WEB/lib/flow/deliverables/items.ts:65-101, WEB/lib/flow/deliverables/items.ts:114 |

### Handover: design report

| Item | Value | Source |
|---|---|---|
| Format | PDF, A4 landscape (11.69 × 8.27 in), one figure per page | CORE/export/report.py:27; CORE/export/files.py:35-44 |
| Requires | A chosen option and a layout | CORE/export/report.py:45-50; API/services/export.py:196-201 |
| Page list | Summary, Layout, Shadows, Energy, Schedule, then "Schedule (continued)" pages as needed, then SLD. A design of 28 strings or fewer has 6 pages. | CORE/export/report.py:53-69; apps/api/tests/engine/test_export_bytes.py:55-59 |
| Page 1, Summary | Title "{name} · rooftop PV design". Line "SolarLayout Rooftop · {dd Mon YYYY}" with the reader's date. Then a table: Site, Roof, Structure, Module, Inverter, Stringing, DC capacity, AC capacity, Weather, Energy, year 1 (P-values), Specific yield (with PR and CUF AC), Module area, CO₂ avoided. "Note: …" is added when the module coefficients carry a warning. | CORE/export/report.py:91-102; CORE/export/summary.py:26-58 |
| Structure wording | Tilted: "Fixed tilt {t}°, {n}P/L, lower edge {c} m". East-west: "East-west {t}°, 1L back-to-back, ridge gap {g} m". Sloped: "Flush rails at the roof pitch {s}°". | CORE/export/summary.py:14-23 |
| Page 2, Layout | "Layout and strings": the plan with the strings | CORE/export/report.py:105-112 |
| Page 3, Shadows | Title "Shadows at {end}:00 solar time on the design day (window {start}:00–{end}:00)". The plan in shadow. One line: near shading linear %, electrical beyond linear %, far (horizon) %, and the keep-out area left empty in m². | CORE/export/report.py:115-143 |
| Page 4, Energy | The loss diagram; "Monthly energy to grid"; and a table "Energy / MWh" with Year 1, 5, 10, 15, 20, 25, "25-year total" and the P-values | CORE/export/report.py:33, CORE/export/report.py:146-162 |
| Page 5, Schedule | "String schedule and bill of materials". The first 28 strings of the schedule (String, Inverter, MPPT, Modules, "Voc cold, V", "Isc, A", "DC cable, m", Cable), then the bill of materials (Item, Specification, Qty, Unit) | CORE/export/report.py:28-31, CORE/export/report.py:165-191 |
| Continued pages | "String schedule, continued: S29 to S…", 40 strings per page | CORE/export/report.py:29, CORE/export/report.py:194-206, CORE/export/report.py:225-230 |
| Last page, SLD | The same single-line diagram as the PNG | CORE/export/report.py:209-221 |
| Preview | The engine draws the pages as images at 150 dpi (1753 × 1240). The page sits in a paper frame, with thumbnails captioned "2 · Layout" (number only on phone), previous and next buttons ("Previous page", "Next page"), and the Left and Right keys. The head reads "Page 1 of 6 · Summary". Pages are asked for once per edit, as soon as the run has an option. | API/services/export.py:26; CORE/export/report.py:76-82; WEB/lib/handover/report-view.ts:61-101; WEB/components/handover/ReportPreview.tsx:69-72, WEB/components/handover/ReportPreview.tsx:106-141; WEB/components/handover/Handover.tsx:106-113 |
| Preview while pages load | A placeholder of the page and six thumbnails. After an edit, the old pages stay, dimmed, until the new ones arrive. | WEB/components/handover/ReportPreview.tsx:42-65; WEB/lib/handover/report-view.ts:88-99 |

### Handover: single-line diagram

| Item | Value | Source |
|---|---|---|
| File | PNG, A4 landscape at 200 dpi (2338 × 1654 px) | CORE/export/files.py:51-61; apps/api/tests/api/test_export.py:122-127 |
| What it shows | Strings → MPPT → inverter → ACDB → meter → grid | CORE/plots.py:214-215 |
| Title | "Single-line diagram · {n} strings of {s} × {Wp} Wp" | CORE/plots.py:223-224 |
| Per inverter | A box with "INV-{i}" and "{kW} kW · {n} MPPT" | CORE/plots.py:228-230; CORE/export/files.py:56 |
| Per MPPT | A block "{count} × {s} mod" on a line labelled "MPPT {j} · DC". An MPPT with no strings reads "MPPT {j} · not used". | CORE/plots.py:231-242 |
| AC side | A line labelled "AC" to "ACDB", then a "kWh" meter labelled "Net meter", then "Grid / LT panel" | CORE/plots.py:243-256 |
| Preview | The app draws the same diagram as an SVG. Block colours follow the MPPT series colours. Hovering or tapping a block shows its strings and its load ("Imp X of Y A", or "Imp X A · limit not known"). Caption: "The PNG is the engine's drawing on A4". | WEB/lib/handover/sld.ts:1-6, WEB/lib/handover/sld.ts:64-124; WEB/components/handover/SingleLineDiagram.tsx:19, WEB/components/handover/SingleLineDiagram.tsx:98-183 |

### Handover: bill of materials

| Item | Value | Source |
|---|---|---|
| Form | An on-screen table, also printed on report page 5. No file of its own. **Copy as table** copies it. | WEB/lib/flow/deliverables/items.ts:44; WEB/lib/handover/in-the-report.ts:4 |
| Columns | Item, Specification, Qty, Unit. Qty has thousands commas and no decimals. | WEB/lib/handover/bom-view.ts:22-27 |
| Caption | "The bill of materials of option {letter}, as the engine lists it" | WEB/lib/handover/bom-view.ts:38 |
| Phone | Each line is a card | WEB/components/handover/BillOfMaterials.tsx:15-19 |
| PV module | "{maker} {model}, {Wp} Wp", plus ", bifacial {x.xx}" for a bifacial module. Qty: modules used, in pcs. | CORE/bom.py:70-72 |
| String inverter | "{maker} {model}, {kW} kW, {n} MPPT". Qty: inverters, in pcs. | CORE/bom.py:73-74 |
| Mounting structure | The structure wording (see design report). Qty: tables. A table is a contiguous run of used modules in a row; on east-west roofs it is a row in use. | CORE/bom.py:35-47, CORE/bom.py:75 |
| DC cable | "4 mm² Cu, {V} V DC, red + black". Qty: the schedule's lengths summed and rounded to a whole metre. | CORE/bom.py:12, CORE/bom.py:50-52, CORE/bom.py:68, CORE/bom.py:76 |
| DC connector pair | "MC4-compatible, matched to the module". Qty: 2 × strings, in pairs. | CORE/bom.py:77 |
| AC cable | "Inverter to ACDB, sized for {I} A at {V} V AC". Qty: AC cable length per inverter (default 30 m) × inverters. I is the inverter's maximum AC current, or P/(√3·V) when the inverter file lacks it. V is the inverter's output voltage, or 415 when the file lacks it. | CORE/bom.py:78-79, CORE/bom.py:85-88; CORE/project.py:55 |
| AC distribution board | "{n} incomer(s), 1 outgoing". Qty: 1 pcs. | CORE/bom.py:80 |
| Copy message | "Bill of materials copied as a table" | WEB/lib/handover/bom-view.ts:31 |

### Handover: DC cable schedule

| Item | Value | Source |
|---|---|---|
| Form | An on-screen table, also printed on report page 5 and continuation pages. No file of its own. | WEB/lib/flow/deliverables/items.ts:45; CORE/export/report.py:56-68 |
| Columns | String, Inverter, MPPT, Modules, "Voc cold (V)" (0 decimals), "Isc (A)" (2 decimals), "DC cable (m)" (1 decimal), Cable. The first seven sort. The default is the engine's order, by string. | WEB/lib/handover/schedule-view.ts:44-70 |
| Total row | "{n} strings" and the sum of the lengths (1 decimal) | WEB/lib/handover/schedule-view.ts:72-76 |
| Captions | "The DC cable schedule of option {letter}, in the engine's order, by string". When sorted: "Sorted by {column}, upwards/downwards. The order of the engine, by string, is the default". | WEB/lib/handover/schedule-view.ts:78-82 |
| Row values | String "S{n}"; inverter "INV-{n}"; MPPT from 1; modules = modules in series; Voc cold = one module's Voc at the lowest temperature × modules in series; Isc = the module's Isc; cable = "4 mm² Cu, {system V} V DC" | CORE/bom.py:55-62 |
| String order | Sorted by azimuth, then row, then x of the start | CORE/stringing.py:214 |
| Length per string | 2 × (east-west distance + north-south distance from the string's start to its inverter, + 2 m slack). The string's own length is added when the layout is single-line (east-west, or all modules in one line). Rounded to 0.1 m. | CORE/stringing.py:240-248; CORE/bom.py:61 |
| Inverter position | For each inverter: the point on the setback line nearest the mean start of its strings | CORE/stringing.py:228-235; CORE/placement.py:141 |
| Cable size | Always 4 mm² Cu | CORE/bom.py:12 |
| Copy message | "DC cable schedule copied as a table" | WEB/lib/handover/schedule-view.ts:39 |

### Handover: CAD layout (DXF)

| Item | Value | Source |
|---|---|---|
| Format | DXF R2010, units metres | CORE/export/files.py:83-84 |
| Coordinates | Local roof metres, x east, y north. For a roof traced on the map, the origin is the outline's centroid. | CLAUDE.md rule 2; WEB/lib/handover/cad-view.ts:26; API/services/roof_map.py:28-30 |
| ROOF (colour 7) | The outline | CORE/export/files.py:86-94 |
| SETBACK (8) | The inner line inside the setback, when not empty | CORE/export/files.py:95-97 |
| OBSTACLES (1) | Footprints | CORE/export/files.py:98-100 |
| KEEPOUT (30) | Keep-out areas within the roof | CORE/export/files.py:103-104 |
| MODULES_UNUSED (9) | Free positions not used by the option | CORE/export/files.py:105-112 |
| INVERTERS (40) | A 2 × 1.2 m rectangle at each inverter's position | CORE/export/files.py:113-114 |
| TEXT (7) | "{obstacle} h={height}" at each footprint's centre (text height 0.4), and "INV-{n}" (0.5) placed 0.8 m north of each inverter | CORE/export/files.py:101-102, CORE/export/files.py:115 |
| STRING_S01 … | One layer per string, holding its module outlines. Colours cycle 2–7. | CORE/export/files.py:106-112 |
| Preview | The report's Layout page in a paper frame, the layer rows with what is on each, and the caption "R2010 · metres · x east, y north" | WEB/components/handover/CadPreview.tsx:28-50; WEB/lib/handover/cad-view.ts:33-54 |

### Handover: Google Earth model (KMZ)

| Item | Value | Source |
|---|---|---|
| Container | A zip holding `doc.kml` only | CORE/export/files.py:149-152; e2e/tests/handover-files.e2e.ts:184 |
| Document | Named after the project. Folder "Roof" holds the placemark "Roof" and one "{obstacle} h={height}" per obstacle. Folder "Modules ({n})" holds one "Module {k}" per used position. | CORE/export/files.py:137-148 |
| Geometry | Polygons in WGS84 longitude and latitude (8 decimals), altitude 0, with the roof centroid placed at the roof's lat and lon | CORE/export/files.py:128-135; CORE/geo.py:34-38 |
| Not in the file | Unused positions, the inverter and the wiring, heights as shapes | WEB/lib/handover/earth-view.ts:57-62 |
| Read back | The app's import reads the roof outline and the obstacle heights back from this file | apps/api/tests/engine/test_export_bytes.py:80-87 |
| Preview | "In the file" and "Not in the file" lists | WEB/components/handover/EarthPreview.tsx:14-23 |

### Handover: hourly data (CSV)

| Item | Value | Source |
|---|---|---|
| Columns | time_utc_hour_start (the hour's start, UTC); ghi_w_m2 (W/m²); poa_eff_w_m2 (effective plane-of-array, W/m², mean over strings); t_cell_c (°C, mean over strings); p_dc_kw; p_ac_kw | CORE/export/files.py:68-72; CORE/simulation.py:414-420; WEB/lib/handover/csv-columns.ts:6-13 |
| Format | UTF-8, "\n" line ends, values rounded to 3 decimals. Example time: "2019-01-01 00:00:00+00:00". | CORE/export/files.py:72; WEB/lib/handover/csv-head.test.ts:8-11 |
| Rows | One per hour of the design's weather. The API docs say 8,760. | WEB/lib/flow/deliverables/items.ts:97; API/routers/export.py:41 |
| Negative AC power | p_ac_kw can be negative at night (night consumption), e.g. -0.005 | CORE/simulation.py:399; WEB/lib/handover/csv-head.test.ts:10 |
| Preview | The first 8 rows ("The first 8 of N rows"), then a "Columns" list | WEB/lib/handover/csv-head.ts:21, WEB/lib/handover/csv-head.ts:37; WEB/components/handover/HourlyPreview.tsx:65-81 |

### Handover: Download all

| Item | Value | Source |
|---|---|---|
| Label and caption | **Download all**, with the caption "6 files · one zip" | WEB/components/handover/DeliverableList.tsx:59, WEB/components/handover/DeliverableList.tsx:69-78 |
| Zip | `<stem>.zip`, compressed. In order: report PDF, DXF, KMZ, CSV, PNG diagram, `.rtd`. Each entry is named as its own download would be. | API/services/export.py:107-151 |
| Requires | A chosen option. Before one, the button is shown but cannot be used. | WEB/components/handover/DeliverableList.tsx:57-58 |

### The project file (.rtd)

| Item | Value | Source |
|---|---|---|
| Format | JSON with `"format": 2` | CORE/project.py:28-30, CORE/project.py:61-64, CORE/project.py:92-94 |
| Contents | Name, roof (outline, location, obstacles), array, losses, PAN and OND file names and their text, weather source and CSV weather text, the embedded weather, system voltage and who set it, overrides, chosen option, custom stringing, AC cable length, and how the roof was entered | CORE/project.py:33-59; API/schemas/project.py:57-87 |
| Not in it | No results: no layout, energy or files. No view state. | API/routers/export.py:42-43; WEB/lib/stores/view-store.ts:2 |
| Requires | Nothing: no chosen option, voltage, weather or run is needed | API/routers/export.py:49-50; WEB/lib/flow/deliverables/items.ts:113-116 |
| Saving | **Save a copy** on Handover, on a Home card's menu, or in the project switcher. The browser downloads `<stem>.rtd`. | WEB/components/handover/DeliverableList.tsx:102-105; WEB/components/home/DesignCard.tsx:37; WEB/components/shell/ProjectSwitcher.tsx:74 |
| Preview | A Name field (up to 200 characters, "A name is needed"), the file name, its size in KB, "Format 2", and "What is in it": Module file, Inverter file ("the bundled sample" when none), Weather ("{label} · N hours"), System voltage, Chosen option ("None yet") | WEB/components/handover/ProjectFilePreview.tsx:47-81; WEB/lib/handover/project-file.ts:34-67; WEB/lib/flow/name-field.ts:7-9 |
| Opening | **Open a project** on Home ("A saved .rtd file, from this device or a colleague") or in the switcher. A dialog takes a dropped or chosen `.rtd`, which the API reads. **Open** keeps it on this device as a new design and opens it in the Studio. | WEB/components/home/Home.tsx:37; WEB/components/shell/OpenProject.tsx:17-18, WEB/components/shell/OpenProject.tsx:88-107 |
| Restored and recomputed | Everything in the file is restored. Everything else runs again. The embedded weather is reused when its source matches and the location is within 0.001°. | WEB/lib/flow/open-project.ts:26-27; CORE/project.py:200-217 |
| Missing voltage | A file with no voltage gets the user's country voltage, set by the app | WEB/lib/stores/project-store.ts:50-55, WEB/lib/stores/project-store.ts:65-67 |
| Compatibility | Formats 1 and 2 open. A file with no format is read as format 1. Unknown keys are ignored. A format 1 file gets notes for equipment and weather files it lacks. | CORE/project.py:66-106; API/services/project_files.py:29-39 |
| Size limit | Over 6,291,456 bytes is refused before sending | WEB/lib/flow/open-project.ts:18-21 |
| Roof limit | An outline over 30,000 m² is refused | CORE/geometry.py:29, CORE/geometry.py:156-164 |

### Handover: messages

| Message | Where | Source |
|---|---|---|
| "The files were not updated" / "They are of the design before" · **Try again** | A run failed after earlier files | WEB/lib/handover/page-view.ts:14 |
| "The files were not made" / "There are no files yet" · **Try again** | A run failed, no files yet | WEB/lib/handover/page-view.ts:15 |
| The API's no-options title and message, with **Open the Strings lens** | No options yet | WEB/components/shell/NoOptionsCard.tsx:20-38 |
| "The pages were not updated" / "They are of the design before" | Report pages failed after earlier pages | WEB/lib/handover/report-view.ts:11 |
| "The pages were not made" / "There is no preview yet" | Report pages failed | WEB/lib/handover/report-view.ts:12 |
| "The hourly data was not made" / "There is no preview yet" | The CSV preview failed | WEB/lib/handover/csv-head.ts:40 |
| The API's words in a note, with **Try again** | A download failed | WEB/lib/stores/downloads-store.ts:165-169 |
| "Bill of materials copied as a table" | Copied | WEB/lib/handover/bom-view.ts:31 |
| "DC cable schedule copied as a table" | Copied | WEB/lib/handover/schedule-view.ts:39 |
| "The table could not be copied. Select it and copy by hand." | The copy failed | WEB/lib/handover/copy-table.ts:8 |
| "Choose a stringing option first. This design has {keys}." | API | API/services/export.py:224-226 |
| "This design has no option {key}. It has {keys}. Choose one of them." | API | API/services/export.py:227-229 |
| "The server cannot be reached. Check the connection and try again." | No connection | WEB/lib/api/errors.ts:4 |
| "The server answered {status} in a form that cannot be read. Try again; if it fails again, report it." | Unreadable answer | WEB/lib/api/errors.ts:30-32 |
| **Open a project**: "A project saved by this app. It opens in the Studio and runs again here."; "Drop the project file here"; "An .rtd file saved by this app"; "It is read, and opens as a new design on this device"; **Cancel**; **Open** | Open dialog | WEB/components/shell/OpenProject.tsx:17-18, WEB/components/shell/OpenProject.tsx:101-107 |
| "Choose a file"; "Reading the file"; "Let go to load the file"; "This file was not loaded"; "Choose another" | File drop | WEB/components/ui/FileDrop.tsx:94-153 |
| "Capacity and energy come with the run in the Studio" | File read | WEB/lib/flow/open-project.ts:27 |
| "Choose a project file (.rtd)." | Wrong ending | WEB/lib/flow/open-project.ts:11 |
| "This file is larger than any project this app saves, so it cannot be opened." | Too large | WEB/lib/flow/open-project.ts:21 |
| "The file could not be read. Choose another." | Browser read failed | WEB/lib/flow/open-project.ts:24 |
| "The file is not a project file (.rtd): it is not JSON." / "…: its JSON is not an object." / "…: it has no {key}." / "…: it cannot be read as one ({error})." | API | API/services/project_files.py:12, API/services/project_files.py:42-59 |
| "The project file cannot be opened: {reason}" | API | API/services/project_files.py:13, API/services/project_files.py:62-67 |
| "This project file is format {n}. This version reads formats 1 and 2. Open it with a newer version of the app." | API | CORE/project.py:69-74 |
| "The {module/inverter/CSV weather} file {name} ({PAN/OND}) is not included in this project. Choose it again." | Format 1 note | CORE/project.py:109-112 |
| "This outline covers {A} m². SolarLayout designs one roof at a time, up to 30,000 m² (about 3 MWp). For a larger site, outline each building as its own design." | Roof too large | CORE/errors.py:43-51 |

#### Known-stale (this area)

| Claim | Truth | Source |
|---|---|---|
| The API docs say the CSV has "the 8,760 hours" | Rows follow the weather's hours. CSV weather may have another count; the app shows a note when it does. | API/routers/export.py:41; apps/api/src/rooftop_core/csv_weather.py:20, apps/api/src/rooftop_core/csv_weather.py:115-119 |
| Comments cite D5 for "results are never in the file" | D5 says "no database, no auth". That results are not in the file is true per the API docs. | WEB/lib/flow/open-project.ts:26; docs/design/components.md:680; plan/README.md:48; API/routers/export.py:42-43 |
| The deliverable row is described as ending in an icon by type | On phone, every row ends in a chevron | docs/design/components.md:818-820; WEB/components/handover/DeliverableRow.tsx:67-68 |

#### Facts we do not have (this area)

- There is no help topic for Handover or for opening a project in `HELP`.
- The coordinate origin for roofs that were imported or typed in, rather than traced on the map.
- How the loss diagram and plan are drawn in detail.
- How well the DXF works in particular CAD programs.

#### Product issues noticed (this area)

1. After a first run that failed, some previews show "This part is not built yet." while others keep loading forever. (WEB/components/handover/Handover.tsx:171-189; WEB/components/shell/NotBuiltYet.tsx)
2. When the inverter file lacks an output voltage, the AC cable falls back to 415 V without saying so. (CORE/bom.py:78-88)
3. The DC cable is always 4 mm² Cu, whatever the current. (CORE/bom.py:12)
4. The inverter is drawn in the DXF as a fixed 2 × 1.2 m rectangle, not at its real size. (CORE/export/files.py:113-114)
