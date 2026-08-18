/**
 * Video manifest — the single source of truth for the product video set.
 *
 * `scripts/build-video-index.mjs` reads this file and writes
 * `docs/video-index.xlsx`, the worklist handed to whoever records the clips.
 * The manifest is the reviewable artefact; the workbook is generated output.
 *
 * Plain JavaScript rather than TypeScript, because nothing on the site renders
 * these rows yet — so the generator imports this module directly instead of
 * parsing it. If a `<Video id="…" />` component is ever added, move the array
 * to `videos.ts` and give it an interface, the way `screenshots.ts` has one.
 *
 * ⚠️ Every factual sentence in `say` comes from `docs/PRODUCT_FACTS.md`. That
 * file is the only permitted factual source in this repository, and the people
 * recording these clips are being told to speak the `say` lines rather than
 * explain in their own words — so a wrong sentence here becomes a wrong
 * sentence in a published video. Do not add a number, label or behaviour that
 * is not in the fact sheet.
 *
 * `priority` lets the recording happen in waves:
 *   1 — High:   a new customer cannot use the product without it
 *   2 — Medium: a working designer reaches for it on a real project
 *   3 — Low:    depth for a specific workflow
 */

/**
 * @typedef {object} VideoSpec
 * @property {string}  id        Stable reference id.
 * @property {string}  file      Delivery path, under the videos folder.
 * @property {string}  page      Docs page the clip belongs to.
 * @property {string}  area      Grouping label, used to order the worklist.
 * @property {string}  title     Title of the finished video.
 * @property {string}  purpose   What the viewer can do after watching.
 * @property {number}  seconds   Target length. Treat +30 s as the ceiling.
 * @property {string}  setup     What must be true before recording starts.
 * @property {string[]} shots    On-screen actions, in order.
 * @property {string[]} say      Narration, in order. Speak these sentences.
 * @property {string}  hold      Where to slow down or hold the frame.
 * @property {string}  avoid     What must not appear in this clip.
 * @property {1|2|3}   priority
 */

/** @type {VideoSpec[]} */
export const VIDEOS = [
  // ── Getting started ─────────────────────────────────────────────────────
  {
    id: "install-and-licence",
    file: "getting-started/install-and-licence.mp4",
    page: "/docs/install/windows",
    area: "Getting started",
    title: "Install SolarLayout Desktop and load your licence",
    purpose:
      "Install the application from the Microsoft Store, find the Device ID, and load a licence file so layout generation works.",
    seconds: 150,
    setup:
      "A Windows PC with the application NOT yet installed, signed in to the Microsoft Store. A licence file for that PC saved as license.lic in C:\\SolarLayout Demo. Clean desktop, no other windows open.",
    shots: [
      "Open the Microsoft Store from the Start menu and search for the application by name.",
      "Open the listing and stay on it long enough to read the publisher name and the Get button.",
      "Click Get and let the download and installation finish, until the button reads Open.",
      "Press Start, type the first few letters of the name, and open the application from the results.",
      "At the design-mode window, pick Fixed Tilt with String Inverter so the main window opens.",
      "Open Help ▸ License / Subscription… and stay on the window so the Device ID row and the buttons are readable.",
      "Select the Device ID and copy it.",
      "Click Load License File…, choose license.lic from C:\\SolarLayout Demo, and open it.",
      "Stay on the confirmation and the date the licence runs until, then close the window.",
    ],
    say: [
      "SolarLayout Desktop is a Windows application, and it comes from the Microsoft Store only.",
      "Search the Store for it by name. The publisher is Rensaar.",
      "Click Get. The Store downloads it, installs it and keeps it updated for you.",
      "When the button reads Open, the installation is finished. The application is also in the Start menu from now on.",
      "The application is licensed for one computer, for a subscription period.",
      "It opens without a licence, but it will not generate a layout until a licence is loaded.",
      "Open Help, then License and Subscription.",
      "This is the Device ID. It identifies this computer.",
      "Copy it, and email it to SolarLayout with your email address. You will receive a licence file back.",
      "Load that file here. The window confirms the licence and shows the date it runs until.",
      "Layout generation now works on this computer.",
    ],
    hold:
      "Three seconds on the publisher name and the Get button. Three seconds on the licence confirmation and its expiry date.",
    avoid:
      "The Device ID must be blurred before this clip is published — record it normally and say so in your delivery note. Keep your Microsoft account name, your email address, and any price or plan out of frame.",
    priority: 1,
  },
  {
    id: "design-modes",
    file: "getting-started/design-modes.mp4",
    page: "/docs/design-modes",
    area: "Getting started",
    title: "Choose a design mode, and compare two of them",
    purpose:
      "Pick the mounting type and inverter topology at launch, and open a second window to compare two design modes side by side.",
    seconds: 120,
    setup:
      "Application closed. A layout already generated and saved as a project on the demonstration site, so the second window has something to compare against — open that project after launching.",
    shots: [
      "Launch the application so the four-card window appears.",
      "Rest the pointer on each of the four cards in turn, about two seconds each, without clicking.",
      "Click Fixed Tilt with String Inverter.",
      "Show the input panel with the MMS-Table Configuration and Spacing & Tilt groups visible.",
      "Open File ▸ Move to String / Central Window… and stay on the four cards again.",
      "Choose Fixed Tilt with Central Inverter.",
      "Arrange the two windows side by side on screen.",
      "In the new window, point at the SMB – String Monitoring Box group and at Max SMB per Central Inverter.",
    ],
    say: [
      "Every launch begins with this choice, before the main window opens.",
      "It is a combination of two things: how the modules are mounted, and how the plant is wired.",
      "Fixed Tilt or Single Axis Tracker for the mounting. String Inverter or Central Inverter for the electrical side.",
      "The chain printed on each card is the path from the modules to the grid.",
      "The single axis tracker is horizontal, with a north-south axis, so the panels sweep east to west.",
      "The choice decides which input groups you get, so make it deliberately.",
      "This clip takes Fixed Tilt with a string inverter. The panel shows MMS-Table Configuration and Spacing and Tilt.",
      "To work in another mode, use File, then Move to String or Central Window. The toolbar has the same command.",
      "It shows the same four cards, so you can change the mounting type as well as the electrical side.",
      "It opens a second, independent window. The session you were in stays open beside it, so two design modes can be compared.",
      "Nothing is applied to the work already open. Each window is its own design.",
      "In central inverter mode the inverter group becomes S M B, String Monitoring Box, and it adds Max S M B per Central Inverter.",
    ],
    hold:
      "Three seconds on the four cards, wide enough that all four chains are readable. Three seconds on the two windows side by side.",
    avoid: "—",
    priority: 1,
  },
  {
    id: "main-window-tour",
    file: "getting-started/main-window-tour.mp4",
    page: "/docs/getting-started",
    area: "Getting started",
    title: "Tour of the main window",
    purpose:
      "Find your way around the input panel, the plot, the summary table, the toolbar and the view switches.",
    seconds: 165,
    setup:
      "The demonstration site loaded, a layout generated and energy calculated, so the summary row is fully populated. Application maximised. Internet connected, for the satellite view.",
    shots: [
      "Show the whole window, then point at the three areas in turn: the input panel on the left, the plot on the right, the summary table beneath the plot.",
      "Scroll the input panel slowly from the top group to the bottom group.",
      "Point along the toolbar buttons in order: Save(Project), Expand Plot, Satellite, Wireframe, Piles, Sketch Mode, BOM, SLD.",
      "Turn Wireframe on, then off.",
      "Turn Satellite on, wait for the imagery, then off.",
      "Turn the AC Cables, DC Cables and Lightning Arresters switches on and off in turn.",
      "Turn Plant Layout off, then on. Turn Legend off, then on.",
      "Zoom in with the plot toolbar, pan, then press Home.",
      "Click Expand Plot, then Return to Main Window.",
      "Click Maximize on the summary table, then close that window.",
    ],
    say: [
      "The window has three areas. Inputs on the left, the plant drawing on the right, and the Layout and Energy Summary underneath.",
      "The input panel runs top to bottom in the order you fill it in: the boundary file first, then the equipment, then the site, then energy.",
      "The toolbar holds the tools that change what you are working on rather than what you are designing.",
      "Wireframe draws the tables as outlines only. It is the quickest way to see the spacing on a dense plant.",
      "Satellite puts aerial imagery behind the layout, lined up to the coordinates in your boundary file. It needs an internet connection.",
      "Satellite and Piles stay switched off until a layout exists, because there is nothing to draw them against.",
      "These switches control what is drawn. Cables, terrain contours, the plant itself, the legend, the arresters and the summary.",
      "They all start off except the plant layout, the legend and the summary.",
      "The plot has the usual zoom and pan controls. The Home button is different here: it fits the view to the whole plant.",
      "Expand Plot opens the drawing in a large window, with a button to come back.",
      "The summary has its own maximise button, which is the comfortable way to read a wide plant.",
    ],
    hold:
      "Two seconds on each of the three areas when you point at them. Three seconds on the satellite imagery once it has drawn.",
    avoid:
      "Any customer or site name in the window title or the file path. Use a generic project name.",
    priority: 1,
  },
  {
    id: "first-layout",
    file: "getting-started/first-layout.mp4",
    page: "/docs/first-layout",
    area: "Getting started",
    title: "Your first layout, start to finish",
    purpose:
      "Take a boundary file to a generated plant and a saved project in one pass, without stopping to explain every field.",
    seconds: 270,
    setup:
      "A licensed machine. Application launched fresh, Fixed Tilt with String Inverter chosen. The demonstration KMZ, the demonstration PAN file and the demonstration OND file all in C:\\SolarLayout Demo. Leave Calculate Cables for PV Power Plant unticked.",
    shots: [
      "Click Browse… next to Input KMZ File and open the demonstration KMZ. Wait for the boundary to draw.",
      "In Module Specifications, click Load .PAN, open the demonstration module file, and choose Manual at the prompt.",
      "Set Modules per row and Rows per MMS-Table, and leave the gaps as they are.",
      "In Site Parameters, leave Perimeter road width and ICR Block at their values.",
      "In the inverter group, click Load .OND and open the demonstration inverter file.",
      "Leave Calculate Cables for PV Power Plant unticked.",
      "Click Generate Layout and let it finish.",
      "Press Home on the plot toolbar so the whole plant is in view.",
      "Read across the summary row: area, table count, modules, DC capacity, tilt, pitch, ICR count.",
      "Point at the inline auto values that appeared under Override tilt angle and Override row pitch.",
      "Click Calculate Energy, wait, and show the yield columns filling in.",
      "Open File ▸ Save Project…, save as a generic name in the demonstration folder.",
      "Open File ▸ New Project, then File ▸ Open Project… and reopen the file you just saved.",
    ],
    say: [
      "This is the whole path, from a boundary file to a saved design.",
      "Start with the boundary. Browse to your K M Z file and the plant outline draws on the right.",
      "Next the module. Loading a P A N file fills in the wattage and both module dimensions for you.",
      "Then the table: how many modules across a row, and how many rows in one M M S table.",
      "Site parameters hold the perimeter road width and the I C R block size. The defaults are sensible for a first run.",
      "Load the inverter file. Its maximum A C power sets the plant's A C capacity.",
      "Leave cable calculation switched off for a first run. It is the slow step, and you do not need it to see whether the layout is right.",
      "Generate Layout. The application shrinks the boundary inward by the road width, subtracts the water bodies and the corridors, and fills what is left with tables.",
      "A table is placed only where it fits entirely inside that usable area.",
      "Press Home to fit the drawing to the plant.",
      "The summary is the answer: plant area, table count, module count, D C capacity, tilt, row pitch and the number of inverter control rooms.",
      "The tilt and the pitch were calculated from your latitude, and they have been filled into the override boxes so you can adjust and re-run.",
      "Calculate Energy fetches the weather data and fills in the yield columns.",
      "Save the project. The file keeps the whole session, so the inputs, the layout, the diagram and the materials list all come back together.",
    ],
    hold:
      "Five seconds on the finished plant after Home. Five seconds on the summary row, wide enough to read the headers.",
    avoid:
      "Hunting for files. Have the folder open at the right place so each Browse takes one click. Do not read numbers off the screen while narrating — they change between recordings.",
    priority: 1,
  },

  // ── Boundary input ──────────────────────────────────────────────────────
  {
    id: "boundary-kmz",
    file: "inputs/boundary-kmz.mp4",
    page: "/docs/inputs/kmz-requirements",
    area: "Boundary input",
    title: "Load a KMZ boundary, and what the application reads from it",
    purpose:
      "Prepare a KMZ so the boundary, the water bodies, the canals and the transmission lines are all recognised — and fix one the application rejects.",
    seconds: 180,
    setup:
      "The demonstration KMZ open in Google Earth in one window, with the placemark names visible in its places panel. A second KMZ prepared with one open boundary ring, for the validation part. The application at a fresh main window.",
    shots: [
      "In Google Earth, show the places list so the named features are readable: the boundary, a pond, a canal, a transmission line.",
      "Switch to the application, click Browse… next to Input KMZ File and open the demonstration file.",
      "Show the drawn result: the gold boundary, the blue water body, the red obstruction, and the corridor along the line.",
      "Click the ⓘ button beside the field to show the preparation guide, then close it.",
      "Click Browse… again and open the file with the open ring, so the Boundary Validation Issues window appears.",
      "Tick the problem boundary to exclude it, and continue.",
    ],
    say: [
      "The boundary file decides everything downstream, so it is worth preparing properly.",
      "The plant boundary must be a closed polygon. The first and last point of the ring must be the same point.",
      "Any polygon that sits fully inside a boundary becomes an obstacle. Everything in the file must lie inside a boundary.",
      "The application reads what each feature is from its name, and it is not case sensitive.",
      "A polygon named pond, lake, reservoir or water is treated as a water body.",
      "A line named canal, drain, nala or river is treated as a canal. A line named transmission, power line or two twenty k V is treated as a transmission line.",
      "A polygon with no water word in its name is treated as a plain obstruction, which is what you want for a building or a substation.",
      "A line is given a corridor on each side, so the strip cleared of tables is twice the setback you set.",
      "A line named as a road is different. It is cleared to its own width, taken from the width recorded on the placemark, or five metres if there is none.",
      "The information button beside the field opens the preparation guide at any time.",
      "If a ring is left open, the application tells you which boundary is at fault rather than guessing.",
      "You can tick the bad boundary to leave it out and carry on with the rest, or cancel and fix the file. Fixing the file is the better habit.",
    ],
    hold:
      "Four seconds on the Google Earth places list. Four seconds on the drawn boundary with the water body and the corridor both visible.",
    avoid:
      "Real site or customer names in the Google Earth places list — rename the features generically first.",
    priority: 1,
  },
  {
    id: "boundary-cad-image",
    file: "inputs/boundary-cad-image.mp4",
    page: "/docs/inputs/cad-boundary",
    area: "Boundary input",
    title: "Start from a CAD drawing or a scanned image",
    purpose:
      "Use a DXF or an image as the boundary, give it a position and a scale, and know what you lose by skipping the coordinates.",
    seconds: 165,
    setup:
      "A DXF whose boundary is a closed polyline, with one interior ring. An image of a site plan with a clear closed outline. Both in C:\\SolarLayout Demo.",
    shots: [
      "Click Browse… and open the DXF, so the DXF Site Coordinates window appears.",
      "Enter the site latitude and longitude and continue. Show the boundary drawing.",
      "Generate the layout, then point at the tilt and pitch values in the summary.",
      "Load the same DXF again, and this time skip the coordinates.",
      "Rest the pointer on the Calculate Energy button so its tooltip appears, showing that it is disabled.",
      "Click Browse… and open the image, so the Image Boundary — Scale & Coordinates window appears.",
      "Show the default scale of one hundred metres of site against ten millimetres of drawing, change it to match the drawing, and continue.",
    ],
    say: [
      "A boundary does not have to be a K M Z. A C A D drawing or a scanned plan works too.",
      "A C A D drawing carries no position on the earth, so the application asks for the site latitude and longitude.",
      "Give it. The shape and the area are preserved exactly, and the drawing is placed at your coordinates.",
      "If you skip the coordinates the layout is still generated, but from a fallback position, not your site.",
      "That matters, because the automatic tilt and the automatic row pitch are worked out from latitude. On a site far from that fallback they will be wrong. Override both if you must work this way.",
      "Energy calculation is properly blocked in that case, so no wrong yield figure can be produced. The button explains why.",
      "Two more things about C A D boundaries. Every closed ring inside the boundary becomes a hard obstacle. Water cannot be told apart, because there are no names to read.",
      "And the boundary must be drawn as a closed polyline. Circles, splines, arcs and plain lines are not read.",
      "For an image, the application asks how a real distance on site maps to a distance on the drawing.",
      "It starts at one hundred metres of site for ten millimetres of drawing. Change both numbers to match your plan.",
      "The largest closed outline in the image becomes the boundary.",
    ],
    hold:
      "Four seconds on the Calculate Energy tooltip. Three seconds on the scale window with your values entered.",
    avoid:
      "Any drawing with a real client title block. Use a plain demonstration drawing.",
    priority: 2,
  },

  // ── Equipment inputs ────────────────────────────────────────────────────
  {
    id: "module-and-pan",
    file: "inputs/module-and-pan.mp4",
    page: "/docs/inputs/module",
    area: "Equipment inputs",
    title: "Module specifications, PAN files and bifacial modules",
    purpose:
      "Enter a module by hand or load it from a PVsyst PAN file, read the file in the viewer, and switch on bifacial gain.",
    seconds: 165,
    setup:
      "A fresh main window in Fixed Tilt with String Inverter. A PAN file for a bifacial module in C:\\SolarLayout Demo.",
    shots: [
      "Show the Module Specifications group. Point at Length for the long side and Width for the short side.",
      "Change the wattage by hand, then undo it.",
      "Click Load .PAN and open the module file.",
      "Show the fields that filled in: wattage, long side, short side, and the Bifacial module tick with its bifaciality factor.",
      "Point at the temperature loss row in the energy group, which was recalculated.",
      "Choose Manual at the prompt asking whether to calculate the modules in series automatically.",
      "Click View and step through the tabs, ending on Graphs so the curve is visible. Close the viewer.",
      "Untick Bifacial module to show the bifaciality factor greying out, then tick it again.",
    ],
    say: [
      "The module is described by three numbers: its long side, its short side and its wattage.",
      "Length is always the long side and Width is always the short side, whichever way you end up mounting it.",
      "You can type them, but loading the manufacturer's P A N file is safer. It fills in the wattage and both dimensions.",
      "If the file says the module is bifacial, the application ticks the bifacial box and fills in the bifaciality factor for you.",
      "It also recalculates the temperature loss in the energy section from the file's own coefficients.",
      "After a P A N load it offers to work out the number of modules in series for you. That is string sizing, and it has its own video.",
      "View opens the file read only, the way P V syst shows it, including the current and power curves.",
      "The bifaciality factor is the share of the front output that the rear face produces. A typical value is between nought point six five and nought point eight.",
      "A bifacial module typically gains between five and fifteen per cent over a monofacial one, depending on the ground and the row spacing.",
    ],
    hold: "Three seconds on the filled-in fields after the PAN load. Three seconds on the Graphs tab.",
    avoid:
      "Naming the module manufacturer or model out loud, and any file path with a personal name in it.",
    priority: 1,
  },
  {
    id: "string-sizing",
    file: "inputs/string-sizing.mp4",
    page: "/docs/inputs/string-sizing",
    area: "Equipment inputs",
    title: "Automatic string sizing",
    purpose:
      "Let the application work out how many modules can go in series, and read which constraint sets each end of the range.",
    seconds: 180,
    setup:
      "A PAN file and an OND file whose MPPT window is declared. Load the OND file first, then the PAN file, and choose Auto at the prompt so the sizing window opens.",
    shots: [
      "Load the inverter OND file first.",
      "Load the module PAN file and choose Auto at the prompt.",
      "Show the whole sizing window.",
      "Point at the read-only rows: the module's open-circuit and maximum-power voltages, and the inverter's MPPT window.",
      "Point at System voltage, then at the site minimum and maximum temperatures.",
      "Switch the cell temperature model from Sandia to the NOCT model and back.",
      "Change the site minimum temperature by five degrees and let the green result line update.",
      "Stay on the detail line that names the upper and the lower limit.",
      "Pick a series count and a number of parallel strings, and accept.",
      "Show the values landing in Modules per row and Rows per MMS-Table.",
    ],
    say: [
      "String sizing answers one question: how many modules can be wired in series on this site with this inverter.",
      "It needs both files. The module file gives the voltages, and the inverter file gives the M P P T window.",
      "Three limits decide the answer, and all three are judged at the temperature of the cell, not the air.",
      "First, the open-circuit voltage of the whole string on the coldest morning must stay under the system voltage. That is the insulation limit, and it is absolute.",
      "Second, on that same cold morning the operating voltage must still sit inside the M P P T window, so the inverter can track it.",
      "Third, on the hottest afternoon the operating voltage must not fall below the window, or the inverter loses the string.",
      "So the cold case sets the longest string you may build, and the hot case sets the shortest that still works.",
      "Set your site's minimum and maximum temperatures. These are the two numbers that move the answer most.",
      "The cell temperature model converts air temperature to cell temperature. Sandia uses wind speed; the other option uses the module's nominal operating temperature.",
      "The green line gives the feasible range. If nothing is feasible, the line turns red and names the reason, and you enter the counts yourself.",
      "This detail line is the part worth reading. It gives the cold and hot cell temperatures, and then names which limit is holding each end of the range.",
      "Choose your series count and how many strings run in parallel, and they are written into the table configuration for you.",
    ],
    hold:
      "Five seconds on the detail line naming the upper and lower limits. Three seconds on the fields it wrote into.",
    avoid:
      "Reading the numbers aloud. Explain what each line means and let the viewer read the values.",
    priority: 2,
  },
  {
    id: "table-tilt-pitch",
    file: "inputs/table-tilt-pitch.mp4",
    page: "/docs/inputs/table",
    area: "Equipment inputs",
    title: "MMS-Table configuration, tilt and row pitch",
    purpose:
      "Build the table, set or override the tilt and the row pitch, and use maximize placement and half tables to fill an awkward boundary.",
    seconds: 195,
    setup:
      "Fixed Tilt with String Inverter, the demonstration site loaded, one layout already generated so the automatic tilt and pitch are shown.",
    shots: [
      "Show the MMS-Table Configuration group. Switch Orientation from Portrait to Landscape and back.",
      "Change Modules per row, then Rows per MMS-Table, and let the table size line update.",
      "Point at the two module gap fields, then at Gap between MMS-Tables.",
      "Show the Spacing & Tilt group with the automatic values displayed inline.",
      "Tick Override tilt angle, change the tilt, and regenerate.",
      "Tick Override row pitch, change the pitch, regenerate, and point at the GCR in the summary.",
      "Tick Maximize placement, regenerate, and zoom into a diagonal edge of the boundary so the extra tables and the unaligned columns are both visible.",
      "Tick Add half tables in leftover space, regenerate, and zoom into a corner where half units appear.",
      "Point at the full and half table counts in the summary.",
    ],
    say: [
      "The table is built from the module outwards. Its orientation, how many modules sit across a row, and how many rows the table carries.",
      "Portrait puts the module's short side east to west. Landscape turns it, and the table gets wider and shorter.",
      "The two module gap fields are the clearances between modules inside the table, east to west and north to south.",
      "Gap between M M S tables is different. It is the east-west gap between neighbouring tables in the same row.",
      "There is no north-south gap between tables. North-south spacing is the row pitch, and that is the next group.",
      "Tilt and pitch are calculated for you unless you override them. The tilt comes from your latitude.",
      "The pitch is the row spacing at which the rows do not shade each other at midday on the shortest day of the year.",
      "After a run, both calculated values are shown here and filled into the override boxes, so adjusting them is a small change rather than a fresh guess.",
      "Ground coverage ratio is the table height divided by the row pitch. Widen the pitch and the ratio falls, along with the row-to-row shading.",
      "In the summary, an asterisk on the tilt or the pitch means the application worked that value out rather than you entering it.",
      "Maximize placement positions each row independently so it hugs the boundary edge. On a diagonal or curved fence it fits more tables.",
      "The trade-off is real: the table columns no longer line up north to south, and a large site takes longer to compute.",
      "Half tables fill what is left over. A half table is half the east-west width and carries half the strings.",
      "Both are switched off as shipped, and the summary counts full and half units separately.",
    ],
    hold:
      "Four seconds zoomed into the diagonal edge with maximize placement on. Four seconds on a corner with half tables placed.",
    avoid:
      "Changing the boundary file or the module part-way through — the counts must stay comparable across the clip.",
    priority: 1,
  },
  {
    id: "tracker-config",
    file: "inputs/tracker-config.mp4",
    page: "/docs/inputs/tracker",
    area: "Equipment inputs",
    title: "Tracker configuration for a single axis plant",
    purpose:
      "Configure a horizontal single axis tracker plant and understand what the preview line does and does not tell you.",
    seconds: 150,
    setup:
      "Launch and choose Single Axis Tracker with String Inverter. The demonstration site loaded, the demonstration PAN file loaded.",
    shots: [
      "Show the input panel with the single Tracker Configuration group in place of the two fixed-tilt groups.",
      "Point at the fields in order: strings per tracker, modules across the tracker, module orientation, modules per string, the two gaps, the east-west pitch, the north-south service gap, the maximum rotation angle, and the tracker height.",
      "Change the number of strings per tracker and let the preview line update.",
      "Switch module orientation from P config to L config and back.",
      "Set the east-west pitch to a value below the tracker aperture, generate, and point at the resulting GCR in the summary.",
      "Set a sensible pitch, generate, and show the placed tracker plant.",
      "Point at Full Trk and Half Trk in the summary.",
    ],
    say: [
      "Choosing the single axis tracker replaces both fixed-tilt groups with one Tracker Configuration group.",
      "The tracker is horizontal with a north-south axis. The panels rotate east to west through the day, up to the maximum angle you set here.",
      "A tracker unit is described along its two directions. Across the torque tube, how many modules sit side by side. Along it, how many modules make a string, and how many strings the unit carries.",
      "P config puts the module's long side east to west. L config turns it, so the long edge runs north to south along the torque tube.",
      "East-west pitch is the spacing between tracker columns. The north-south service gap is the space between units in the same column.",
      "The preview line under the fields is indicative, not exact. It leaves the module gaps out of its length figures, so the placed unit is slightly longer than the preview says.",
      "The east-west pitch has a floor. If you ask for a pitch at or below the aperture, it is quietly raised to the aperture plus half a metre.",
      "That matters because the ground coverage ratio is reported against the pitch actually used, so a very tight pitch will not give you the ratio you asked for.",
      "The maximum rotation angle and the tracker height are reference figures for shading work.",
      "Maximize placement and half units work as they do on a fixed-tilt plant, and the summary counts full and half trackers.",
    ],
    hold:
      "Four seconds on the summary GCR after the too-tight pitch. Four seconds on the finished tracker plant.",
    avoid:
      "Calling the tracker vertical or two-axis. It is a horizontal, single axis, north-south tracker.",
    priority: 2,
  },

  // ── Site and ground ─────────────────────────────────────────────────────
  {
    id: "site-parameters",
    file: "inputs/site-parameters.mp4",
    page: "/docs/inputs/site",
    area: "Site and ground",
    title: "Site parameters, and lightning arresters",
    purpose:
      "Set the perimeter road, the ICR block size and the transmission line corridor, and switch on lightning arresters.",
    seconds: 150,
    setup: "The demonstration site loaded with a layout already generated, Fixed Tilt.",
    shots: [
      "Show the Site Parameters group.",
      "Increase Perimeter road width, regenerate, and show the wider band around the boundary and the changed table count.",
      "Change ICR Block, regenerate, and point at the ICR count in the summary.",
      "Increase Transmission line corridor, regenerate, and zoom to the widened strip along the line.",
      "Tick Place Lightning Arresters, leave the radius, regenerate.",
      "Turn on the Lightning Arresters switch so the arresters and their coverage circles are drawn.",
      "Zoom in so the overlapping circles and one arrester footprint are both visible.",
    ],
    say: [
      "Site parameters are the four numbers that shape the ground before a single table is placed.",
      "Perimeter road width shrinks the boundary inward. What is left is the usable area, and that is where tables can go.",
      "Widen it and you lose tables around the edge, so it is worth setting to your actual civil requirement rather than leaving it.",
      "I C R block is the capacity served by one inverter control room. The number of control rooms is the plant capacity divided by this block size, rounded up.",
      "Transmission line corridor is the setback on each side of a line, so the cleared strip is twice this value. Raise it for a higher voltage line.",
      "Lightning arresters are off as shipped, and with them off the tables fill the whole usable area.",
      "Switch them on and set the protection radius. Each arrester protects a circle of that radius around itself.",
      "They are laid out on a square grid spaced by the radius, so neighbouring circles overlap and no part of the plant is left outside a circle.",
      "Any table that ends up beyond the radius of every arrester gets one of its own, at the nearest valid position.",
      "On a fixed-tilt plant the arrester footprint clears the tables underneath it. On a tracker plant it is a slim pole, tucked into the gap between tracker columns, and no tracker units are removed.",
      "One thing to know for later: on the exported drawing the arresters are always shown and the coverage circles never are, whatever this switch says.",
    ],
    hold:
      "Three seconds on the widened perimeter band. Four seconds zoomed into the overlapping protection circles.",
    avoid:
      "Claiming an effect for the arrester height or its pile diameter. Those are recorded figures only; they change nothing in the layout.",
    priority: 1,
  },
  {
    id: "structures-shadows-terrain",
    file: "inputs/structures-shadows-terrain.mp4",
    page: "/docs/inputs/structures-and-shadow",
    area: "Site and ground",
    title: "Structures, keep-clear shadows, street lights and steep ground",
    purpose:
      "Size the control rooms, keep tables out of their year-round shadow, add perimeter street lights, and exclude ground that is too steep to build on.",
    seconds: 195,
    setup:
      "The demonstration site with a layout generated. An MCR already placed, so its shadow is visible. Internet connected, for the elevation data. A contour CSV of longitude, latitude and elevation in C:\\SolarLayout Demo.",
    shots: [
      "Show the Structures & Shadow group with the four footprint rows.",
      "Change the ICR length and width, regenerate, and show the footprint changing on the plot.",
      "Point at the Shadow Window fields, then at Clear tables inside shadows.",
      "Untick Clear tables inside shadows, regenerate, and show tables appearing inside the control room shadow. Tick it again and regenerate.",
      "Tick Street lights, regenerate, and zoom to the perimeter so the poles and the cleared strip are visible.",
      "Tick Avoid steep / unsuitable ground, leave the satellite fetch on, and regenerate.",
      "Turn on the Terrain switch so the contours draw, and point at the excluded area figure.",
      "Change the maximum north-south slope, regenerate, and show the excluded area growing.",
      "Switch Contour data to a file, browse to the CSV, and regenerate.",
    ],
    say: [
      "Buildings occupy ground, and they also cast a shadow that no table should sit in. This group covers both.",
      "Each structure is sized as a length east to west and a width north to south, plus a height. The height is what drives the shadow.",
      "There are four: the inverter control room, the main control room, the unit substation, and a general object for anything else on site.",
      "Shadow Window is the band of solar hours you want kept clear, and the shadow footprint is worked out across the whole year within that band.",
      "Clear tables inside shadows is on as shipped, and it removes any table falling inside that year-round footprint.",
      "Street lights place poles along the perimeter, just inside the fence, spaced by the span you set, and clear the tables their shadow touches.",
      "Now the ground itself. Avoid steep or unsuitable ground excludes land the structures cannot reasonably be built on.",
      "With no contour file, the elevation is fetched from public satellite data, which needs an internet connection.",
      "Three limits define unsuitable: the north-south slope in degrees, the east-west slope as a percentage, and the height variation allowed within one table footprint. That last one is the pile reveal your structure can absorb.",
      "The Terrain switch draws the contours, green for low ground through to red for high, and the excluded area is reported in acres.",
      "You can supply your own contours instead: a C A D contour file in the project's coordinates, or a plain list of longitude, latitude and elevation.",
      "If the elevation data cannot be reached, the layout is still generated. It simply proceeds without the terrain exclusion.",
    ],
    hold:
      "Three seconds on a table sitting in the shadow with the clearing switched off, then three on the same spot cleared. Four seconds on the drawn contours.",
    avoid:
      "Suggesting the arrester is shadow-cleared, and suggesting a flood or reduced-level band can be set. Neither is in the application.",
    priority: 3,
  },

  // ── Electrical ──────────────────────────────────────────────────────────
  {
    id: "inverter-and-ond",
    file: "inputs/inverter-and-ond.mp4",
    page: "/docs/inputs/inverter",
    area: "Electrical",
    title: "Inverters or SMBs, and loading an OND file",
    purpose:
      "Set the string limit per inverter, load a PVsyst OND file, and see how the group changes in central inverter mode.",
    seconds: 150,
    setup:
      "Two sessions ready: one in String Inverter mode and one in Central Inverter mode, both on the demonstration site with a layout generated. The demonstration OND file in C:\\SolarLayout Demo.",
    shots: [
      "In the string-inverter session, show the inverter group and point at Max strings per inverter.",
      "Click Load .OND and open the inverter file.",
      "Point at the status line and at the DC/AC ratio in the summary.",
      "Click View and step through the viewer tabs, ending on the efficiency curve. Close it.",
      "Point at the String Inverter efficiency field in the loss breakdown, unchanged by the file.",
      "Switch to the central-inverter session and show the group renamed to SMB – String Monitoring Box.",
      "Point at Max strings per SMB and at Max SMB per Central Inverter.",
      "Point at the SMB and central inverter columns in the summary.",
    ],
    say: [
      "One string here means one row of modules within an M M S table.",
      "Max strings per inverter is the limit the application respects when it works out how many inverters the plant needs.",
      "Loading the inverter's O N D file sets the plant's A C capacity from the inverter's maximum A C power.",
      "It also updates the D C to A C ratio in the summary, which is the figure most reviewers look for first.",
      "One thing the file does not do is set the inverter efficiency in the loss breakdown. That stays at whatever you entered, so check it yourself.",
      "View opens the file read only, including the efficiency curve.",
      "In central inverter mode the same group becomes the S M B group, the string monitoring box.",
      "You set the strings per box, and then how many boxes one central inverter can take. The central inverter capacity is the box capacity times that number.",
      "The central inverter itself sits inside the control room, and one control room can house up to four of them.",
      "The summary follows the mode, so you get box and central inverter columns instead of string inverter columns.",
    ],
    hold: "Three seconds on the DC/AC ratio after the OND load. Three seconds on the renamed SMB group.",
    avoid: "Naming the inverter manufacturer or model out loud.",
    priority: 2,
  },
  {
    id: "cables",
    file: "layout/cables.mp4",
    page: "/docs/layout/cables",
    area: "Electrical",
    title: "Cable calculation, and the DC, AC and MV runs",
    purpose:
      "Turn cable calculation on at the right moment, read the three kinds of run, and edit a trench by hand.",
    seconds: 195,
    setup:
      "The demonstration site with a layout generated, cables off, and an MCR already placed so there is an MV run to show. String inverter mode.",
    shots: [
      "Point at the cable columns in the summary showing a dash.",
      "Tick Calculate Cables for PV Power Plant so the performance notice appears. Read the two buttons, then click Enable Now.",
      "Generate the layout and let the cable calculation finish.",
      "Turn on the DC Cables switch and zoom to one inverter so the string runs are visible.",
      "Turn on the AC Cables switch and follow one inverter run to its control room.",
      "Turn on the MV Cables switch and show the shared trunk from the control rooms to the main control room.",
      "Point at the cable and trench columns in the summary.",
      "Enter Sketch Mode, pick Del Trench, and delete one automatic trench.",
      "Pick MV Trench, draw a short trench by hand, and leave Sketch Mode.",
      "Click Generate Layout and show that the cables were kept rather than re-routed.",
    ],
    say: [
      "Cable calculation is switched off as shipped, and the cable columns show a dash until you turn it on.",
      "When you tick it, the application warns you that it is the slow step on a large or complex layout, and offers to leave it off.",
      "Take that advice on a first run. Get the layout right, then enable cables for the final run.",
      "With it on, three kinds of run are calculated. D C string cables from each table to its inverter, counted for both the positive and the negative conductor.",
      "A C cables from each inverter to its nearest control room, counted once, because that leg is three phase.",
      "In central inverter mode there is no A C leg at all, because the central inverter sits inside the control room. Instead a D C trunk runs from each box to the room.",
      "A C routes are horizontal and vertical only, never diagonal, and every candidate route is checked against the usable area before it is used.",
      "Cables may run within the perimeter road band, but never outside the plant fence.",
      "Medium voltage cables run from the control rooms to the main control room over a shared tree, so nearby rooms merge into one trench instead of running parallel lines.",
      "That is why the trench totals are not the cable totals. Many cables share one trench, and the summary reports both.",
      "You can edit trenches by hand in Sketch Mode: delete an automatic one, or draw your own.",
      "The moment you do, cable routing is frozen. Generate keeps your cables instead of re-routing them, so your edits survive.",
      "There is no way to unfreeze it. If you want the automatic routing back, generate a fresh layout or start a new project.",
    ],
    hold:
      "Four seconds zoomed on the DC runs at one inverter. Four seconds on the merged medium voltage trunk.",
    avoid:
      "Quoting how long the cable calculation took. It depends on the plant, and a number here becomes a promise.",
    priority: 1,
  },

  // ── Layout results ──────────────────────────────────────────────────────
  {
    id: "generate-and-summary",
    file: "layout/generate-and-summary.mp4",
    page: "/docs/reference/summary-columns",
    area: "Layout results",
    title: "Generate the layout, and read the summary",
    purpose:
      "Understand the order the plant is built in, and read every part of the Layout and Energy Summary with confidence.",
    seconds: 180,
    setup:
      "The demonstration site, all inputs set, cables on and energy already calculated once so every column has a value. Summary maximised for the reading section.",
    shots: [
      "Click Generate Layout and let it run. Point at the status line when it reports the plant count and the area.",
      "Press Home so the whole plant is in view.",
      "Click Maximize on the summary so the full row is readable.",
      "Move along the row in groups, resting on each group: area and boundary, table and module counts, DC capacity, tilt and pitch, control rooms.",
      "Continue: inverter or box counts, cable lengths, trench lengths, arresters, street lights, robots, piles.",
      "Continue: AC capacity, inverter capacity, DC to AC ratio, the three yield columns, CUF and the lifetime total.",
      "Point at an asterisk on the tilt or pitch value.",
      "Point at a column showing a dash.",
      "Scroll to the TOTAL row.",
    ],
    say: [
      "Generate builds the plant in a fixed order, and knowing the order explains most surprises.",
      "The boundary is read, projected into metres, and shrunk inward by the perimeter road width.",
      "The water bodies, the obstructions and the line corridors are subtracted, then the terrain exclusions if you enabled them.",
      "What remains is the usable area. The table grid is laid across it with the rows running east to west and the panels facing the equator.",
      "A table is placed only where it fits entirely inside that area. Nothing is clipped.",
      "Then the control rooms are placed and any table overlapping one is removed, so the capacity is checked again against what is left.",
      "Then the inverters, the cables if enabled, and the arresters if enabled, each recomputing the capacity after it clears ground.",
      "The summary is one row per plant. Read it left to right as area, quantity, capacity, geometry, equipment, cable, then yield.",
      "Plant area is the gross area inside the boundary, before the road setback. It does not fall when obstructions grow.",
      "An asterisk on the tilt or the pitch means the application calculated it rather than you entering it.",
      "A dash means not computed. Cable columns show a dash until cable calculation is switched on.",
      "The three yield columns are named from the exceedance probabilities you set, so they follow your own P values.",
      "The last column is the lifetime total at your first exceedance probability. Its header text says twenty five years, but the figure follows your plant lifetime setting, which is thirty years as shipped.",
      "On a multi-plot file, a TOTAL row adds every plant together.",
    ],
    hold:
      "Five seconds on each group of summary columns as you rest on it. Four seconds on the lifetime column while its caveat is spoken.",
    avoid:
      "Reading the values aloud. Name what each group of columns means and let the viewer read their own numbers.",
    priority: 1,
  },
  {
    id: "icr-mcr-multiplot",
    file: "layout/icr-mcr-multiplot.mp4",
    page: "/docs/layout/site-equipment",
    area: "Layout results",
    title: "Control rooms, unit substations, objects, and a file with several plots",
    purpose:
      "Place and move the control rooms and other site equipment, and generate a site whose boundary file holds several plots.",
    seconds: 195,
    setup:
      "The demonstration site with a layout generated, no MCR yet. The multi-boundary demonstration KMZ ready to load afterwards.",
    shots: [
      "Point at the control rooms already placed on the plot and at the ICR count in the summary.",
      "Click and hold one control room, drag it to another valid spot inside the perimeter road, and release. Let the layout rebuild.",
      "Drag one outside the usable area and release, so it snaps back.",
      "Click Place MCR, showing the button change to Cancel Placement, then click a spot on the plot.",
      "Click Place MCR again and click outside the boundary, so the refusal message appears.",
      "Click Place Object, drop an object, then use Remove Objects.",
      "Load the multi-boundary KMZ and generate.",
      "Show the several plants drawn, then the summary with one row per plant and the TOTAL row.",
      "Place the MCR in one plot, regenerate, and zoom to another plot to show its unit substation.",
    ],
    say: [
      "The inverter control rooms are placed for you. The number comes from your I C R block size, and each one sits at the centre of the group of tables it serves.",
      "Each room must fit entirely inside the usable area, and any table overlapping its footprint is removed.",
      "You can move one. With no pan or zoom tool active, hold it, drag it inside the perimeter road and release. The layout rebuilds around the new position.",
      "Drop it somewhere invalid and it snaps back, so you cannot leave the design in a state that will not build.",
      "The main control room is placed by you. Click Place M C R and then click the spot. The button reads Cancel Placement while it is waiting.",
      "It has to be inside the boundary, and the application says so plainly if you click outside.",
      "Place Object is for anything else that occupies ground and casts a shadow, and it can be removed the same way.",
      "A boundary file can hold more than one plot, and the application treats each as its own plant.",
      "Every plot is laid out separately, and the summary gives one row per plant with a total across all of them.",
      "The main control room belongs to one plot. Every other plot gets a unit substation instead, and that plot's control rooms route their medium voltage cables to it.",
      "The link from a unit substation back to the main control room is an overhead line or a buried cable, and it is handled outside the automatic routing.",
    ],
    hold:
      "Four seconds on the layout rebuilding after the drag. Four seconds on the multi-plot summary with the TOTAL row visible.",
    avoid: "—",
    priority: 2,
  },

  // ── Editing the layout ──────────────────────────────────────────────────
  {
    id: "sketch-mode",
    file: "editing/sketch-mode.mp4",
    page: "/docs/editing/sketch-mode",
    area: "Editing the layout",
    title: "Sketch Mode: obstructions, hand edits and annotations",
    purpose:
      "Edit the plant by hand, draw the constraints the boundary file did not carry, annotate the drawing, and know exactly what a re-generate keeps.",
    seconds: 240,
    setup:
      "The demonstration site with a layout generated. Maximize placement switched on before recording, so the re-generate behaviour can be shown honestly.",
    shots: [
      "Click Sketch Mode and show the tool palette.",
      "With Move, click a table, then Shift-click two more, then drag a rubber band around a group and move the selection.",
      "Use Ctrl and an arrow key to nudge the selection.",
      "Use Copy on a selection, then Delete on a table.",
      "Add a table, a half table and an arrester with the add tools.",
      "Draw an obstruction rectangle across part of the plant and show the tables under it disappear.",
      "Draw a transmission line with the T-Line tool, entering a corridor width when asked, and right-click to finish.",
      "Draw a line, a rectangle and a circle, change the colour, and drop a text label.",
      "Add a layer, hide it, show it again, then group two annotations.",
      "Use Measure on two points to show the distance and bearing, then a third point for the running total. Place one dimension.",
      "Type a command alias into the command line to start a tool.",
      "Add the scale bar and north arrow.",
      "Leave Sketch Mode and point at the recomputed totals in the summary.",
      "Click Generate Layout and show the result: the obstruction and the line survive, the hand-placed tables do not, and the grid is aligned.",
    ],
    say: [
      "Sketch Mode is where the design meets the site. It is for the constraints and the details the boundary file never carried.",
      "Move selects. Click one object, shift click to add more, or drag a band around a group, then move them together. Control and an arrow key nudges the selection by one metre.",
      "Copy duplicates a selection a few metres away. Delete removes whatever you click.",
      "You can add a full table, a half table or an arrester by hand. An arrester clears the tables under its footprint, as it does when the application places one.",
      "The obstruction tools are the important ones. Draw a rectangle or a polygon over anything the file did not include, and the tables inside it are removed.",
      "The transmission line tool asks for a corridor width and clears a strip of exactly that width. Note that this is not the corridor setback in Site Parameters, which applies to lines that came from the file.",
      "The drawing tools are the ones you would expect: lines, polylines, rectangles, circles, arcs, ellipses, splines, fills and text, with colour, snapping, orthogonal mode, a grid, and undo and redo.",
      "Annotations sit on layers you can hide, and can be grouped so they move together.",
      "Measure gives you a distance and a bearing from two points, and a running total if you keep clicking. Dimension places a permanent dimension on the drawing.",
      "If you are used to C A D, the command line takes short aliases for the same tools.",
      "You can also import a C A D drawing as a reference. It is placed at its own coordinates in project metres, with no scaling and no re-centring, so it must already be in the project's coordinate system or it will land somewhere else entirely.",
      "Leaving Sketch Mode recomputes the plant totals, so the module count and the capacity follow your edits.",
      "Now the part to get right. Generate re-places every table, tracker, inverter and control room from scratch.",
      "So tables you placed or deleted by hand do not survive a re-generate.",
      "But the obstructions, the corridors and the main control room you drew do survive. They are fed back in as keep-out areas, and the plant is rebuilt around them. That is the point of re-generating.",
      "One more effect: the rebuild is forced onto the aligned grid, so maximize placement is switched off for it. That keeps the pile coordinates uniform for construction.",
    ],
    hold:
      "Four seconds on the tool palette. Five seconds on the plant after the re-generate, with the surviving obstruction visible.",
    avoid:
      "Suggesting there is a way to refresh the numbers while keeping hand-placed tables. There is not.",
    priority: 2,
  },
  {
    id: "piles",
    file: "editing/piles.mp4",
    page: "/docs/editing/piles",
    area: "Editing the layout",
    title: "Define the pile layout",
    purpose:
      "Define a pile pattern on one reference table, stamp it across the plant, and export the pile drawing.",
    seconds: 150,
    setup:
      "The demonstration site with a layout generated, no pile pattern defined yet, and at least a few half tables present so the caveat can be shown.",
    shots: [
      "Point at the Piles button on the toolbar, then click it so the Pile Layout editor opens.",
      "Show the reference table with its origin at the bottom-left corner.",
      "Enter the first pile position and radius, and add it.",
      "Add the rest of the pattern, then accept.",
      "Show the piles drawn across the whole plant, then zoom to one table.",
      "Turn Plant Layout off to show the piles remaining visible on their own.",
      "Point at the Piles column in the summary.",
      "Zoom to a half table so its pile positions are visible.",
      "Reopen the editor from Edit-Pile ▸ Define Pile Layout… and adjust one position.",
      "Click Export PDF (with Piles) and open the resulting file at the pile drawing.",
    ],
    say: [
      "The pile layout is defined once, on one reference table, and then stamped onto every table in the plant.",
      "The button is inactive until a layout exists, because there is nothing to stamp the pattern onto.",
      "The origin is the bottom-left corner of the table, the south-west corner. X runs east across the table, Y runs north up it.",
      "Enter each pile as a position and a radius. Everything you add builds the pattern for one table.",
      "Accept it and the pattern appears under every table, so a pile's position on the ground is the table's position plus the offset you entered.",
      "The piles stay visible even with the plant layout switched off, which is the view a civil team wants.",
      "The summary reports the total pile count as the table count times the piles per table.",
      "One caveat to know before you hand the count to anyone. A half table receives the full pattern and is counted as a whole table.",
      "So on a plant with half-table infill the pile count is optimistic, and some stamped piles can fall outside the narrower footprint of a half table. Check those by eye.",
      "Reopen the editor at any time from the Edit-Pile menu.",
      "Export P D F with piles produces the pile drawing, rendered at a higher resolution than the standard report page.",
    ],
    hold:
      "Four seconds on one table zoomed in with its piles. Four seconds on the half table while the caveat is spoken.",
    avoid: "—",
    priority: 3,
  },

  // ── Energy yield ────────────────────────────────────────────────────────
  {
    id: "energy-weather-and-losses",
    file: "energy/weather-and-losses.mp4",
    page: "/docs/energy/losses",
    area: "Energy yield",
    title: "Weather data and the loss breakdown",
    purpose:
      "Choose where the irradiance comes from, set every loss in the performance ratio, and check row-to-row shading against the shadow view.",
    seconds: 210,
    setup:
      "The demonstration site with a layout generated and a PAN file loaded. An hourly CSV of timestamp, GHI and ambient temperature, a full year long, in C:\\SolarLayout Demo. Internet connected.",
    shots: [
      "Show the Energy Yield group and the two weather data options.",
      "Leave the API option selected and point at the GHI and in-plane irradiance fields that fill in on calculation.",
      "Select the hourly file option so the browse row appears, and read the format reminder that pops up.",
      "Browse to the CSV and load it.",
      "Move down the loss breakdown, resting on each row: inverter efficiency, the two cable losses, soiling, temperature, mismatch, shading.",
      "Point at the auto-compute tick beside shading, showing the shading field is not editable while it is on.",
      "Untick auto-compute, type a shading value, then tick it again.",
      "Point at the module temperature shown beside the temperature loss row, and at the trace underneath.",
      "Continue down: ground clearance, availability, transformer losses, other losses.",
      "Click Shadow View (row spacing) and move both sliders so the shaded part of the rear row changes. Close it.",
    ],
    say: [
      "Everything in this group turns irradiance into energy, so it is worth being deliberate about all of it.",
      "The irradiance itself comes from one of two places. By default it is fetched automatically for your coordinates when you calculate.",
      "If that service has no data for your site, a second public source is used instead.",
      "Or you supply your own hourly file. It needs three columns in order: an hourly timestamp, global horizontal irradiance in watts per square metre, and ambient temperature in degrees.",
      "A full year is eight thousand seven hundred and sixty rows. A header row is optional and is detected for you.",
      "When your file carries temperature, the monthly averages come from the file instead of from a seasonal model.",
      "The losses below make up the performance ratio. They are combined by multiplying, not by adding up, so the total is slightly smaller than the sum of the parts.",
      "Inverter efficiency, then the cable losses on the D C and A C sides.",
      "Soiling is dust, dirt and droppings. Set it from your own site experience and cleaning cycle.",
      "The temperature loss is calculated for you once a module file is loaded. The module temperature it used is shown beside it, with the working underneath.",
      "Row-to-row shading is calculated from your ground coverage ratio by default, so the field is read only. Untick the automatic option if you want to enter your own figure.",
      "Availability, transformer losses and other losses cover downtime, the transformer and the auxiliary consumption.",
      "Two fields do less than they look like they do. Ground albedo affects only the bifacial gain, not a monofacial calculation.",
      "And module ground clearance feeds the shadow view, not the loss figure.",
      "The shadow view is a cross-section of three adjacent rows. Move the sliders through the year and the day, and watch how much of the row behind is shaded.",
      "It uses the same model as the shading loss, so the picture and the number always agree.",
    ],
    hold:
      "Four seconds on the file format reminder. Five seconds on the shadow view with a low winter sun and a visibly shaded rear row.",
    avoid:
      "Describing ground clearance or ground albedo as loss inputs for a monofacial plant.",
    priority: 2,
  },
  {
    id: "energy-calculate",
    file: "energy/calculate.mp4",
    page: "/docs/energy/overview",
    area: "Energy yield",
    title: "Calculate energy, and read the yield",
    purpose:
      "Run the energy calculation, read the yield, degradation and P values, and take the numbers away as a chart or a time series.",
    seconds: 210,
    setup:
      "The demonstration site with a layout generated, a PAN file loaded, weather source set to the automatic fetch, and internet connected.",
    shots: [
      "Point at the Degradation fields, then at the Probabilistic Yield fields with the three exceedance probabilities.",
      "Click Calculate Energy and let it finish.",
      "Show the yield columns filling in the summary, and point at the three P columns and their headers.",
      "Change the second exceedance probability, recalculate, and show the header changing with it.",
      "Point at the CUF column, then at the lifetime column.",
      "Click Show Energy Chart. Stay on the daily view, move the day slider, and move the crosshair so the readout changes.",
      "Switch to the monthly view and show the twelve bars and the annual totals. Close the window.",
      "Click Export TMY data CSV, choose an interval, and save.",
      "Open the CSV so its columns are visible, and scroll to a night-time hour and then to midday.",
    ],
    say: [
      "Two groups shape the yield before you calculate. Degradation, and the probability you want to report at.",
      "First year degradation covers the initial drop. Annual degradation applies every year after that, over the plant lifetime you set.",
      "The three probabilities are the exceedance levels you want reported: the central case, and two more conservative ones.",
      "Combined uncertainty is how confident you are in the whole calculation. The wider it is, the further the conservative cases fall below the central one.",
      "Calculate Energy fetches the irradiance, applies the performance ratio, and fills the summary.",
      "Specific yield is the in-plane irradiance times the performance ratio. Multiply by the plant capacity for the first year energy, then apply the first year degradation.",
      "C U F is the first year energy against what the plant would make running flat out all year.",
      "The three yield columns are named from your own probabilities, so they change when you change them.",
      "The last column is the lifetime total. Its header text is fixed, but the figure follows your plant lifetime setting.",
      "One thing about the shading loss: it is calculated when you generate the layout, not when you calculate energy, because it depends on the geometry.",
      "The energy chart has two views. The daily view gives twenty four hourly bars, with the energy stacked over the in-plane irradiance, and a slider that walks you through all three hundred and sixty five days.",
      "The crosshair gives you the time, the energy and the irradiance at any point.",
      "The monthly view gives twelve bars and the annual totals, which is the view for a report.",
      "Export T M Y data writes the full year of irradiance and energy as a spreadsheet, at the interval you choose.",
      "The timestamps are local time, so the values are zero at night and peak around solar noon. That export needs an hourly series, so either load a file or let the automatic hourly fetch run.",
    ],
    hold:
      "Four seconds on the summary yield columns. Four seconds on the daily chart with the crosshair readout visible.",
    avoid:
      "Reading the yield figures aloud, and any claim about how long the calculation takes.",
    priority: 1,
  },

  // ── Simulation ──────────────────────────────────────────────────────────
  {
    id: "sim-ac-capacity",
    file: "simulation/ac-capacity.mp4",
    page: "/docs/simulation/ac-capacity",
    area: "Simulation",
    title: "Size the plant to an AC capacity",
    purpose:
      "Work backwards from a target AC capacity and DC to AC ratio to a plant that delivers it.",
    seconds: 165,
    setup:
      "The demonstration site with one layout already generated, a PAN file and an OND file both loaded, so the simulation button is available.",
    shots: [
      "Point at the Simulation with AC Capacity button, noting it appeared after the first layout.",
      "Open it and show the inputs.",
      "Enter a target AC capacity and a target DC to AC ratio, and show the resulting inverter count and DC capacity.",
      "Raise the ratio above the practical ceiling to show the limit applied.",
      "Accept a target DC at or below the first run's DC, so the offer to regenerate capped to the target appears, and accept it.",
      "Show the regenerated plant and the DC capacity and ratio in the summary.",
      "Run it again with a target DC above what the site can hold, and show the advice given instead.",
    ],
    say: [
      "This tool works the other way round from the rest of the application. You give it the plant you have been asked for, and it sizes the design to match.",
      "The button appears only after a first layout, because it needs to know what the site can hold.",
      "Give it a target A C capacity and the D C to A C ratio you are designing to. It needs both the module and the inverter file.",
      "The inverter count is rounded up, never down, so the installed A C capacity lands at or above your target rather than short of it.",
      "There is a practical ceiling on the ratio: one point five for string inverters and one point four for central inverters. You can adjust it.",
      "That ceiling is a design overload limit, not the inverter's nameplate. Utility plants are routinely overloaded on the D C side, and the inverter simply clips the surplus at the peak.",
      "If your target D C fits within what the site already produced, the application offers to regenerate the layout capped to that target.",
      "The delivered D C lands at or just above your target, never below, or the ratio you designed to would not hold.",
      "Later stages clear more ground after the trim, so trimmed tables are held back and put in again afterwards wherever the ground is still free.",
      "If your target is more than the site can hold, it tells you so, and the fix is to reduce the A C capacity or the ratio.",
    ],
    hold:
      "Four seconds on the calculated inverter count and DC capacity. Four seconds on the summary after the capped regenerate.",
    avoid: "Presenting the ratio ceiling as an inverter specification.",
    priority: 3,
  },
  {
    id: "sim-robotic-cleaning",
    file: "simulation/robotic-cleaning.mp4",
    page: "/docs/simulation/robotic-cleaning",
    area: "Simulation",
    title: "Robotic module cleaning",
    purpose:
      "Size a cleaning robot fleet for the plant, decide which gaps get a bridge, and carry the result into the materials list.",
    seconds: 180,
    setup:
      "The demonstration site with a layout generated, arresters placed and at least one obstruction drawn, so the gap list has entries in both categories.",
    shots: [
      "Click Robotic Module Cleaning and show the Robot group.",
      "Point at each input in turn: travel per charge, the to-and-fro tick, the standard bridge span, and the minimum tables per line.",
      "Show the gap list, with the two groups: gaps blocked by equipment, and gaps in open ground.",
      "Tick one open-ground gap and show the fleet count fall.",
      "Untick it and show the count rise again.",
      "Set a travel per charge shorter than a row, and show the fleet count rise.",
      "Set travel per charge back to zero.",
      "Accept, and point at the Robots column in the summary.",
      "Open BOM mode and point at the cleaning rows.",
    ],
    say: [
      "A cleaning robot drives along the module frames of one cleaning line. On a fixed-tilt plant those lines run west to east. On a tracker plant they run north to south.",
      "Travel per charge is how far one robot goes before it needs charging. Leave it at zero and there is no battery limit, which gives you one robot per cleaning segment.",
      "Tick the to-and-fro option if the robot must clean out and return on the same charge. That doubles the distance it has to cover, so it needs more range to finish a row.",
      "Standard bridge span is the widest gap your standard bridge crosses. It starts from your own geometry, the table gap on a fixed-tilt plant or the service gap on a tracker plant.",
      "Any gap wider than that is listed individually, with its measured span and where it is, split into gaps blocked by equipment and gaps in open ground.",
      "Tick a gap and you are saying you will install a supported bridge there. The robot drives across, the line stays whole, and the fleet count falls.",
      "Leave it unticked and the line breaks at that point. That stretch keeps a robot of its own.",
      "Nothing is bridged unless you tick it. The application never assumes a bridge you have not paid for.",
      "The fleet starts at one robot per row and grows for two reasons: broken lines, and battery range.",
      "A very short segment does not justify its own robot. Set the minimum tables per line and anything at or below it is not counted. A half unit counts as a half.",
      "Everything recalculates as you change it. The result feeds the robots column in the summary, and the cleaning equipment and bridges in the bill of materials.",
      "The materials list never carries a fleet you did not ask for, so run this before you export the bill of materials.",
    ],
    hold:
      "Five seconds on the gap list with both categories visible. Four seconds on the fleet count changing as a gap is ticked.",
    avoid: "—",
    priority: 3,
  },

  // ── Single line diagram ─────────────────────────────────────────────────
  {
    id: "sld",
    file: "sld/single-line-diagram.mp4",
    page: "/docs/sld/overview",
    area: "Single line diagram",
    title: "Build the single line diagram",
    purpose:
      "Auto-build a diagram from the plant, edit it with the symbol set, bring in an existing drawing or a custom symbol, and export it.",
    seconds: 240,
    setup:
      "The demonstration site with a layout generated and the bill of materials built, so auto-build has ratings to use. An existing SLD as a PDF and a symbol image in C:\\SolarLayout Demo.",
    shots: [
      "Click SLD to enter the mode and show the empty sheet: the border, the zone grid and the right-hand band.",
      "Click auto-build and let the starter diagram appear.",
      "Zoom in on the multiplicities and ratings on the symbols.",
      "Use Move to reposition a symbol, then Wire to connect two symbols.",
      "Rotate a symbol with the ninety degree button, then type an angle and apply it.",
      "Place a text label. Group two symbols, then ungroup them.",
      "Use Fit to bring the whole sheet back into view.",
      "Click Import PDF / DXF and open the existing diagram, so it appears as a background.",
      "Place a symbol and a wire over the background, then click Remove BG.",
      "Click Import Image Symbol, open the symbol image, tidy the traced outline in the editor with the pen and eraser, and accept it.",
      "Place the new symbol on the sheet.",
      "Click Export SLD to PDF and open the file. Then click Export SLD to DWG.",
    ],
    say: [
      "S L D mode is a drawing surface for the single line diagram, and it is part of the same project as the layout.",
      "The sheet is an A three landscape frame with a zone grid, a legend and notes band, and a blank title block.",
      "Start with auto-build. It reads the plant's own equipment counts and the ratings from the bill of materials, and lays out a starter diagram.",
      "On a string inverter plant the chain runs from the modules through the string inverters, the A C combiner boxes and the transformer to the medium voltage panel and the grid.",
      "On a central inverter plant it runs through the string monitoring boxes and the central inverters instead.",
      "The multiplicities and ratings are written onto the symbols, so the diagram states how many of each item the plant has.",
      "Auto-build needs no energy calculation. Generating the layout is enough, because the ratings come from the materials list.",
      "From there it is an ordinary drawing. Move symbols, draw wires between them, rotate by ninety degrees or by any angle you type, add text, and group what belongs together.",
      "The symbol set covers the plant: modules, inverters, monitoring boxes, combiner boxes, transformers up to five windings, panels, arresters, isolators, instrument transformers, meters, breakers and relays.",
      "The inverter and the transformers arrive already rotated to sit on a horizontal bus, so they line up without you turning them.",
      "You can bring in a diagram you already have. A vector P D F cannot be turned back into editable symbols, so its first page is placed as a background image.",
      "You then draw editable symbols and wires on top, and the whole thing carries into the exported P D F. Remove the background when you no longer need it.",
      "You can also add your own symbol from an image. It is traced into real line work rather than pasted as a picture, so it stays crisp and exports as vectors.",
      "The editor opens first so you can clean up the trace before accepting it. Your symbols are kept for future sessions.",
      "Export the sheet as a P D F, or as a C A D drawing. On a large plant the paper size grows while the drawing keeps its proportions.",
    ],
    hold:
      "Five seconds on the auto-built diagram fitted to the sheet. Four seconds on the traced symbol in the editor before accepting.",
    avoid:
      "Any real client title block on the imported PDF. Use a demonstration drawing.",
    priority: 2,
  },

  // ── Bill of materials ───────────────────────────────────────────────────
  {
    id: "bom",
    file: "bom/bill-of-materials.mp4",
    page: "/docs/bom/overview",
    area: "Bill of materials",
    title: "The bill of materials, templates and exports",
    purpose:
      "Read the automated materials list, edit it, overlay a template, and export it for procurement.",
    seconds: 165,
    setup:
      "The demonstration site with a layout generated, cables on, an MCR placed, arresters on, and the cleaning tool already run, so the list is as complete as it gets.",
    shots: [
      "Click BOM to enter the mode and show the table with its five columns.",
      "Scroll the whole list from the capacity rows to the cleaning rows.",
      "Edit a quantity and a remark in place.",
      "Add a row, then delete it.",
      "Click Rebuild from Layout and show the list return to the computed values.",
      "Choose a template from the list and click Load Template, so it opens in its own window beside the automated list.",
      "Edit a line in the template window, then click Overlap into Plant BOM and confirm.",
      "Show the main list now carrying the template content.",
      "Click Rebuild from Layout to get the computed list back.",
      "Click Export BOM to Excel and open the file. Then click Export BOM to PDF.",
    ],
    say: [
      "The bill of materials is computed from the layout, and it is fully editable.",
      "Five columns: a serial number, the material description, the quantity, the unit, and a remark that carries the basis of the number.",
      "It runs in order from the plant capacities, through the modules, inverters and tables, to the cables and trenches, the switchgear and transformers, the control rooms, and finally the arresters, street lights and cleaning equipment.",
      "A row is left out entirely when its quantity is zero, so a short list means the plant genuinely has none of that item, not that something failed.",
      "The cleaning rows only appear once you have run the cleaning tool, and the A C capacity row shows a dash until an inverter file is loaded.",
      "You can edit any cell, add rows and delete rows. Rebuild from layout throws your edits away and returns the computed list, so use it deliberately.",
      "There are also built-in templates, for a few common plant configurations.",
      "Loading one opens it in its own window beside the automated list, so you can compare the two.",
      "Overlap into plant B O M replaces the automated list with the template, after it asks you to confirm. That also changes the materials page of the exported report, so do it once you are settled.",
      "Export to a spreadsheet for procurement, or to a P D F to issue.",
    ],
    hold:
      "Four seconds scrolling the full list. Three seconds on the confirmation before the template is overlaid.",
    avoid:
      "Any real supplier name or price. Nothing in this list is priced, and it should stay that way.",
    priority: 2,
  },

  // ── Exports ─────────────────────────────────────────────────────────────
  {
    id: "exports",
    file: "exports/exports.mp4",
    page: "/docs/exports/pdf-report",
    area: "Exports",
    title: "Export the report, the Google Earth file and the CAD drawing",
    purpose:
      "Produce the three deliverables the rest of the project runs on, and know exactly what each one carries.",
    seconds: 195,
    setup:
      "The demonstration site with a layout generated, cables on, arresters on, an MCR placed, a pile pattern defined, an SLD built, and energy calculated — so every page and every layer is present. Google Earth and a CAD viewer installed.",
    shots: [
      "Click Export PDF (Layout + Summary), save, and open the file.",
      "Page through the report: the drawing with its border, north arrow and title block, the summary pages, the diagram, the materials pages, and the energy pages.",
      "Back in the application, click Export PDF (with Piles), save, and open it at the pile drawing.",
      "Click Export KMZ and save.",
      "Open the file in Google Earth and expand the folders: the plant folder, then the overall summary folder.",
      "Click the summary placemark so its capacity, area, pitch and table count are visible.",
      "Back in the application, click Export DXF and save.",
      "Open the drawing in a CAD viewer and show the layer list.",
      "Turn a few layers off and on, then select one table to show it is a block reference.",
    ],
    say: [
      "Three exports carry the design out of the application: the report, the Google Earth file and the C A D drawing.",
      "The report is A three landscape throughout. The first page is the engineering drawing, with a border, a north arrow, a title block and a plant details table you can fill in.",
      "Then the summary pages, with the design parameters and the cable summary broken down per control room.",
      "Then your single line diagram, then the bill of materials across as many pages as it needs.",
      "The energy pages appear only if you have calculated energy. Without it the report is still complete, just without them.",
      "There is a second report button that adds the pile drawing, rendered at a higher resolution for that page.",
      "The Google Earth file gives one folder per plant, holding the boundary, the exclusion zones and the tables, plus a summary placemark with the capacity, the area, the pitch and the table count.",
      "There is also an overall summary folder covering every plant in the file. The inverters, the control rooms, the arresters and the cables are all written.",
      "Three things are not in the Google Earth file: the street lights, the piles and the terrain contours. They are on the drawing and in the C A D export, but not here.",
      "The C A D export is in metres, in the site's own coordinate system, on named layers: the boundary, the perimeter road band, the obstacles, the water, the terrain, the tables, the control rooms, the inverters, the shadows, the trenches and the annotations.",
      "Cable layers appear only if you calculated cables, the arrester layer only if arresters were placed, and the pile layer only once a pile pattern exists.",
      "Two things worth telling a drafting team. Every table is a block reference, not loose lines, so editing the block updates every table in the plant at once.",
      "And every annotation lands on one sketch layer, whatever layer you drew it on inside the application.",
    ],
    hold:
      "Three seconds on each report page as you turn to it. Four seconds on the Google Earth summary placemark. Four seconds on the CAD layer list.",
    avoid:
      "Any file path or title block carrying a personal or customer name. Save into the demonstration folder.",
    priority: 1,
  },
]
