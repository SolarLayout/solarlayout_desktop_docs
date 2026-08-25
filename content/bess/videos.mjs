/**
 * Video manifest — the single source of truth for the BESS Desktop product
 * video set.
 *
 * `scripts/build-bess-video-index.mjs` reads this file and writes
 * `docs/bess-video-index.xlsx`, the worklist handed to whoever records the
 * clips. Run it with `bun run videos:index:bess`. The manifest is the
 * reviewable artefact; the workbook is generated output.
 *
 * Plain JavaScript rather than TypeScript, because nothing on the site
 * renders these rows yet — so the generator imports this module directly
 * instead of parsing it. If a `<Video id="…" />` component is ever added,
 * move the array to `videos.ts` and give it an interface, the way
 * `screenshots.ts` has one.
 *
 * ⚠️ Every factual sentence in `say` comes from `docs/PRODUCT_FACTS.bess.md`.
 * That file is the only permitted factual source in this repository, and the
 * people recording these clips are being told to speak the `say` lines
 * rather than explain in their own words — so a wrong sentence here becomes
 * a wrong sentence in a published video. Do not add a number, label or
 * behaviour that is not in the fact sheet.
 *
 * `priority` lets the recording happen in waves:
 *   1 — High:   a new customer cannot use the product without it
 *   2 — Medium: a working analyst reaches for it on a real project
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
    id: "install-and-activate",
    file: "getting-started/install-and-activate.mp4",
    page: "/docs/bess/install/windows",
    area: "Getting started",
    title: "Install BESS Desktop and activate this device",
    purpose:
      "Install the application from the Microsoft Store, and request and confirm access for this device.",
    seconds: 165,
    setup:
      "A Windows PC with the application NOT yet installed, signed in to the Microsoft Store. Internet connected, for the browser activation step. Clean desktop, no other windows open.",
    shots: [
      "Open the Microsoft Store from the Start menu and search for BESS Desktop.",
      "Open the listing and stay on it long enough to read the publisher name beneath the application name.",
      "Click Get and let the download and installation finish, until the button reads Open.",
      "Press Start, type the first few letters of the name, and open the application from the results.",
      "Show the main window opening directly, with the input notebook already visible on the left.",
      "Open Help ▸ License… and stay on the window so the status headline and the Device ID field are readable.",
      "Click Copy beside the Device ID field.",
      "Click Get Free Access and show the status headline change.",
      "Switch to the browser page that opened, addressed to this Device ID, and complete activation there.",
      "Return to the License window, click Refresh, and stay on the window until the status headline reads Active.",
    ],
    say: [
      "BESS Desktop is a Windows application, and it comes from the Microsoft Store only.",
      "Search the Store for it by name. The publisher is Rensaar.",
      "Click Get. The Store downloads it and installs it, with no options to choose along the way.",
      "When the button reads Open, the installation is finished, and the application is in the Start menu from now on.",
      "The application opens fully usable, with no start-up window and no activation check before the main window appears.",
      "Every input tab is there to read and change straight away.",
      "Activation is only asked for when you run Simulate, Optimise, or export something.",
      "Open Help, then License, to see this device's status and its Device ID.",
      "The Device ID identifies this installation. Copy it rather than reading it off the screen.",
      "Get Free Access opens an activation page in your browser, addressed to this Device ID.",
      "Complete activation on that page, then come back and click Refresh.",
      "Refresh re-checks the server immediately, so a device just activated shows its new status without waiting.",
      "A device with active access shows Active, with Access Details, Refresh and Close in place of the earlier buttons.",
    ],
    hold:
      "Three seconds on the publisher name on the listing. Four seconds on the status headline changing to Active.",
    avoid:
      "The Device ID must be blurred before this clip is published — record it normally and say so in your delivery note. Keep any email address, sign-in name, or account details out of frame.",
    priority: 1,
  },
  {
    id: "project-types",
    file: "getting-started/project-types.mp4",
    page: "/docs/bess/project-types",
    area: "Getting started",
    title: "Choose a project type",
    purpose:
      "Pick the plant's topology on the Data tab, and see what each of the four options pins to zero and disables.",
    seconds: 150,
    setup: "A fresh main window, Data tab open, no generation CSV loaded yet.",
    shots: [
      "Show the Data tab with the project type radio group and the four options.",
      "Point at option 3, Solar + Wind + BESS, ticked by default.",
      "Click option 1, Solar + BESS, and show the Wind sizing, CAPEX and O&M fields grey out.",
      "Click option 2, Wind + BESS, and show the Solar fields grey out instead.",
      "Click option 4, Standalone BESS (grid-charged), and show both Solar and Wind fields disabled, the CSV loader on the Data tab disabled, and the Peak-Shift dispatch checkbox disabled.",
      "Click back to option 3, Solar + Wind + BESS.",
      "Point at the Peak-Shift dispatch checkbox beneath the radio group, unticked.",
      "Tick option 1 and show the checkbox label read Solar-charged Peak-Shift dispatch; tick option 2 and show Wind-charged Peak-Shift dispatch; tick option 3 and show Solar+Wind-charged Peak-Shift dispatch.",
      "Leave the project type on option 3 and the checkbox unticked.",
    ],
    say: [
      "A radio group on the Data tab sets the plant's topology — which generation sources feed the battery, if any.",
      "The default, ticked at launch, is Solar + Wind + BESS.",
      "Solar + BESS pins Wind to zero megawatts, and disables its sizing, CAPEX and O&M inputs.",
      "Wind + BESS does the same the other way round, pinning Solar to zero and disabling its inputs.",
      "Solar + Wind + BESS keeps both sources active.",
      "Standalone BESS, grid-charged, pins both Solar and Wind to zero and disables their inputs. It also disables the generation-profile loader on the Data tab — the application builds a full year's fifteen-minute calendar internally instead.",
      "Below the radio group, a Peak-Shift dispatch checkbox is off by default, and it's disabled for Standalone BESS.",
      "Its label follows the topology: Solar-charged, Wind-charged, or Solar+Wind-charged Peak-Shift dispatch.",
      "Ticked, generation charges the battery first and any surplus is exported straight away. The battery only discharges inside the Peak window, to meet the Contracted Capacity there, with no obligation outside it.",
      "Left off, the ordinary dispatch applies instead: on Peak hours the battery discharges first and any excess generation then charges it; on Off-Peak hours the battery charges first and the remainder meets the Contracted Capacity.",
    ],
    hold:
      "Three seconds on each topology's disabled fields as you switch to it. Four seconds on the Peak-Shift checkbox label changing.",
    avoid: "—",
    priority: 1,
  },
  {
    id: "first-analysis",
    file: "getting-started/first-analysis.mp4",
    page: "/docs/bess/first-analysis",
    area: "Getting started",
    title: "Your first analysis, start to finish",
    purpose:
      "Take a generation profile to a Simulate result and an exported report in one pass, without stopping to explain every field.",
    seconds: 240,
    setup:
      "An activated device. Application launched fresh, Solar + Wind + BESS project type. A demonstration generation CSV in C:\\BESS Demo. Sizing, BESS, Degrad., CAPEX, OPEX and Finance tabs left at their shipped defaults.",
    shots: [
      "Show the Data tab with Solar + Wind + BESS already ticked.",
      "Click Browse…, open the demonstration CSV, then click Load & Preview CSV and show the status line replaced by a load summary.",
      "Open the Peak tab and point at the 18:00 to 21:00 checkboxes already ticked, leaving them as they are.",
      "Open the Sizing tab and point at Fixed Value under Contracted Capacity, Project / Contract Life, and the five DFR target fields, all left at their shipped values.",
      "Open the BESS, Degrad., CAPEX, OPEX and Finance tabs in turn without changing anything.",
      "Click ▶ Simulate and show the status bar reporting the project year the financial model is on, alongside the progress bar.",
      "Show the result notebook switching on its own to the Dashboard tab when the run finishes.",
      "Read the status bar's single summary line: IRR, NPV, CAPEX, and the Solar, Wind and BESS sizing used.",
      "Open the DFR Table, Financials and Summary tabs in turn.",
      "Open the File menu, click Export PDF Report…, save into the demonstration folder, and open the resulting file.",
    ],
    say: [
      "This is the whole path, from a generation profile to an exported report.",
      "Start on the Data tab. The default project type, Solar + Wind + BESS, stays as it is for this run.",
      "Browse to the generation file and click Load & Preview CSV. The status line starts as No file loaded, and is replaced by a summary once the file reads correctly.",
      "The file needs three columns: a datetime column, and one solar and one wind generation column, each value per one megawatt installed between zero and one.",
      "The application detects fifteen-minute, thirty-minute or hourly rows automatically, and upsamples anything coarser to the fifteen-minute base.",
      "On the Peak tab, eighteen hundred to twenty one hundred hours are ticked as Peak by default, four hours in total, with every other hour Off-Peak. Leave that as it is.",
      "On Peak hours the battery discharges first, to help meet the Contracted Capacity, and any excess generation then charges it. On Off-Peak hours the battery charges first, and the remainder meets the Contracted Capacity.",
      "The Sizing, BESS, Degrad., CAPEX, OPEX and Finance tabs are already filled in with a working default. Leave them, and see what the result looks like before deciding what to change.",
      "Click Simulate. It needs this device activated, and either a loaded generation profile or the Standalone project type.",
      "The run happens on a background thread, so the rest of the window stays usable. The status bar reports which project year the financial model is on, alongside a progress bar.",
      "Simulate re-runs the full fifteen-minute dispatch once for every project year, at that year's own degraded state of health and generation factor.",
      "When it finishes, the status bar carries a single summary line: the result's IRR, NPV and CAPEX, and the Solar, Wind and BESS sizing the run used.",
      "All four result tabs fill in, and the result notebook switches to the Dashboard on its own.",
      "Export PDF Report writes the headline figures, the DFR detail, the financial results and the charts into one file. It needs this device activated, the same as Simulate.",
    ],
    hold:
      "Four seconds on the status bar's summary line once the run finishes. Four seconds on the Dashboard's header strip.",
    avoid:
      "Reading the IRR, NPV or CAPEX figures aloud — they change between recordings. Describe what each figure means and let the viewer read their own screen.",
    priority: 1,
  },

  // ── Inputs ───────────────────────────────────────────────────────────────
  {
    id: "inputs-data",
    file: "inputs/generation-data.mp4",
    page: "/docs/bess/inputs/data",
    area: "Inputs",
    title: "Load the generation CSV",
    purpose:
      "Load a solar and wind generation profile on the Data tab, and know exactly what format the file needs to be in.",
    seconds: 150,
    setup:
      "A fresh main window, Solar + Wind + BESS project type. A demonstration generation CSV in C:\\BESS Demo with a datetime column, a solar column and a wind column.",
    shots: [
      "Show the Data tab's CSV Path field, empty, and the Browse… and Load & Preview CSV buttons.",
      "Click Browse…, select the demonstration CSV, and show the CSV Path field fill in.",
      "Click Load & Preview CSV and show the status line change from No file loaded to a load summary.",
      "Point at the datetime, solar and wind columns in a file preview open beside the application.",
      "Point at the row count in the loaded file.",
      "Switch the project type to Standalone BESS (grid-charged) and show the Browse… and Load & Preview CSV controls disabled.",
      "Switch back to Solar + Wind + BESS.",
    ],
    say: [
      "The Data tab is where a generation-backed project loads the CSV the simulation dispatches against — one row per time step, giving the solar and wind output the plant would produce per megawatt installed.",
      "Browse to the file, then click Load & Preview CSV to read and validate it. The status line starts as No file loaded, and is replaced by a summary once the file reads successfully.",
      "The file needs three columns: a datetime column, one solar generation column and one wind generation column.",
      "The datetime column is found by a keyword in its header — time, date, stamp or datetime — and if none of those match, a fifteen-minute calendar starting on the first of January twenty twenty five is built for you instead.",
      "The solar and wind columns are matched by keyword too — solar, P V, sun or photovoltaic for one; wind, W G, W T G or turbine for the other — falling back to the first and second numeric column if nothing matches.",
      "Values are per one megawatt installed, between zero and one. Anything below zero is clipped to zero on load.",
      "Thirty five thousand and forty rows is native fifteen-minute data. Eight thousand seven hundred and sixty rows is hourly. Thirty-minute rows are accepted too.",
      "The resolution is detected automatically from the timestamps, or from the row count if there's no datetime column, and anything coarser than fifteen minutes is upsampled by repeating each row across its sub-intervals.",
      "A Standalone BESS, grid-charged, project needs none of this. Its loader is disabled, because the application builds a full year's calendar internally instead.",
    ],
    hold:
      "Four seconds on the status line once the file loads. Three seconds on the disabled loader in Standalone mode.",
    avoid:
      "Any real project or customer name in the file path. Save the demonstration file into C:\\BESS Demo.",
    priority: 1,
  },
  {
    id: "inputs-peak-window",
    file: "inputs/peak-window.mp4",
    page: "/docs/bess/inputs/peak-window",
    area: "Inputs",
    title: "Set the Peak window",
    purpose:
      "Mark which hours of the day are Peak, understand the Quick Preset caveat, and see what an empty peak set does.",
    seconds: 165,
    setup: "A fresh main window, Solar + Wind + BESS project type, Peak tab open.",
    shots: [
      "Show the Peak tab: the Quick Preset dropdown at the top, and the 24 hour checkboxes in a grid beneath it.",
      "Point at the Quick Preset dropdown showing Evening 18:00–24:00 (6 hrs), without clicking it.",
      "Point at the 24 hour checkboxes, and at 18:00, 19:00, 20:00 and 21:00 already ticked.",
      "Point at the live counter beneath the grid reading 4.",
      "Open the Quick Preset dropdown, choose Morning 06:00–12:00 (6 hrs), and show the checkboxes update to 06:00 through 11:00.",
      "Choose Custom from the dropdown, then manually tick and untick a few hours.",
      "Untick every one of the 24 hours and show the counter read 0.",
      "Re-tick 18:00 through 21:00 to restore the shipped default.",
    ],
    say: [
      "The Peak tab splits the day into Peak and Off-Peak hours. The split decides how the battery is scheduled.",
      "On Peak hours the battery discharges first, and any generation left over after that then charges it. On Off-Peak hours the roles reverse: the battery charges first, and the remainder of generation meets the contracted load.",
      "At launch, eighteen hundred to twenty one hundred hours are ticked as Peak — four hours — and every other hour is Off-Peak.",
      "A live counter beneath the grid reflects how many hours are currently ticked.",
      "A Quick Preset dropdown above the grid fills the checkboxes with a standard pattern once you pick an option from it — Evening, Morning, Day, Night, All Hours, or Custom.",
      "The dropdown shows Evening eighteen hundred to twenty four hundred, six hours, pre-selected on launch, but that preset is never actually applied at launch. It only takes effect once you pick an option from the dropdown yourself.",
      "The four hours actually ticked in the grid are the real starting point, not what the dropdown shows.",
      "Unticking every one of the twenty four hours is read as an explicitly empty peak set, and switches the dispatch to firming the Contracted Capacity every hour of the day, rather than discharging only inside a window.",
      "The exception is a Standalone, non-cycle, BESS, which requires at least one peak hour and warns instead of accepting an empty set.",
    ],
    hold:
      "Four seconds on the Quick Preset dropdown before it's opened, so the pre-selected label is readable. Three seconds on the counter reading 0 after every hour is unticked.",
    avoid: "—",
    priority: 1,
  },
  {
    id: "inputs-sizing",
    file: "inputs/sizing.mp4",
    page: "/docs/bess/inputs/sizing",
    area: "Inputs",
    title: "Contracted capacity and DFR targets",
    purpose:
      "Set the firm load the plant must serve, the project horizon, the five delivery targets, and the starting Solar, Wind and BESS sizes.",
    seconds: 165,
    setup: "A fresh main window, Solar + Wind + BESS project type, Sizing tab open.",
    shots: [
      "Show the Sizing tab's Contracted Capacity group, with Fixed Value selected and its Value entry.",
      "Switch to CSV Profile and show the Browse CSV… control and its No file loaded status.",
      "Switch back to Fixed Value.",
      "Point at Project / Contract Life.",
      "Point at each of the five DFR target fields in turn: 15-min DFR Target, Peak-hour DFR Target, Off-Peak DFR Target, Overall Monthly DFR, Annual DFR Target.",
      "Point at the Initial Sizing group: Solar Installed, Wind Installed, BESS Energy.",
      "Switch the project type to Solar + BESS and show Wind Installed grey out and pin to zero.",
      "Switch back to Solar + Wind + BESS.",
    ],
    say: [
      "The Sizing tab sets the firm load the plant must serve, how long the project runs for, the minimum delivery-fulfilment ratio required over different windows, and the sizes a run starts from.",
      "Contracted Capacity can be one fixed number or a time-varying profile read from a CSV.",
      "The Fixed Value default is one point six megawatts.",
      "Project / Contract Life defaults to twenty years, and can be set from one to fifty.",
      "Five DFR targets, each a percentage of the required energy that must actually be delivered. Peak-hour DFR Target defaults to ninety per cent, and Off-Peak DFR Target to eighty per cent.",
      "Overall Monthly DFR defaults to ninety per cent.",
      "The fifteen-minute and Annual DFR targets are both off by default, at zero per cent.",
      "Initial sizing sets where Simulate starts from, and what Optimise searches around. Solar Installed defaults to one point eight megawatts, and Wind Installed to three megawatts.",
      "BESS Energy defaults to one megawatt hour.",
      "A source excluded by the project type is pinned to zero and its field disabled here too.",
    ],
    hold:
      "Three seconds on each of the five DFR target fields as you point at it. Three seconds on the Initial Sizing group.",
    avoid: "—",
    priority: 1,
  },
  {
    id: "inputs-bess",
    file: "inputs/bess-parameters.mp4",
    page: "/docs/bess/inputs/bess",
    area: "Inputs",
    title: "The battery parameters",
    purpose:
      "Set round-trip efficiency, depth of discharge, end-of-life, C-rate and how the battery's health declines over the project.",
    seconds: 195,
    setup: "A fresh main window, Solar + Wind + BESS project type, BESS tab open.",
    shots: [
      "Show the BESS tab's RTE Mode radio, Fixed selected, and the Round-Trip Efficiency including Auxiliary field.",
      "Switch to Custom Year-by-Year and open the profile editor, showing its status line.",
      "Switch back to Fixed.",
      "Point at Depth of Discharge (DoD) and Initial State of Health (SOH).",
      "Show the Battery EOL basis radio, In Years selected, and the Battery EOL field.",
      "Switch to In Total Cycles and show Rated Cycle Life and End-of-Warranty SOH @ N appear, plus the Configure Cycles & Charge/Discharge Windows… button.",
      "Switch back to In Years.",
      "Point at C-Rate (Power ÷ Energy).",
      "Show the EOL Strategy radio, Replacement (full swap) selected, then switch to Augmentation (top-up) and show the Automatic and Manual sub-modes.",
      "Open the Edit Augmentation Schedule… editor in Manual mode and show its empty table.",
      "Switch back to Replacement (full swap).",
      "Show the Battery SOH Degradation radio, Linear selected, and the SOH Loss Year-1 and SOH Loss Year-2+ fields.",
      "Switch to Custom Year-by-Year, open its editor, and click Fill from Linear.",
    ],
    say: [
      "The BESS tab describes the battery itself: how efficiently it moves energy round trip, how much of its nameplate energy is usable, its starting health, when it reaches end-of-life, its power-to-energy sizing ratio, and how its health declines over the project.",
      "Round-trip efficiency can be one fixed percentage or a value that varies year by year. Fixed defaults to seventy eight per cent, and its square root is applied separately to both the charge leg and the discharge leg.",
      "Depth of discharge defaults to ninety per cent — the fraction of nameplate energy usable per cycle.",
      "Initial state of health defaults to one hundred per cent, the starting battery health at year zero.",
      "Battery end-of-life can be defined by age or by cumulative cycles. In years, the default, the pack reaches end-of-life at twenty years.",
      "In total cycles, the rated cycle life defaults to six thousand cycles, and end-of-warranty state of health to seventy per cent at that rated count.",
      "C-rate, the power to energy sizing ratio, defaults to zero point two five.",
      "At end-of-life the pack can be fully replaced, the default, or topped up instead. Automatic top-up restores nameplate every end-of-life interval; manual top-up runs from a schedule you set yourself, and each new tranche degrades from its own install year and books its own cost.",
      "Battery health decline can follow a fixed Year-one-plus-annual formula, the default, or a custom year-by-year curve. The linear defaults are two point five per cent loss in year one and two per cent a year after that.",
      "A custom curve starts pre-filled from the linear formula, and a Fill from Linear button repopulates it from those settings at any time.",
    ],
    hold:
      "Three seconds on each end-of-life basis as you switch between them. Four seconds on the augmentation schedule editor.",
    avoid: "—",
    priority: 2,
  },
  {
    id: "inputs-costs",
    file: "inputs/costs-and-revenue.mp4",
    page: "/docs/bess/inputs/capex",
    area: "Inputs",
    title: "Capital cost, operating cost and revenue",
    purpose:
      "Set the per-unit capital cost for each source, the annual operating cost, the tariff and penalty, and the terms for grid charging.",
    seconds: 195,
    setup: "A fresh main window, Solar + Wind + BESS project type, CAPEX tab open.",
    shots: [
      "Show the CAPEX tab's three fields: Solar CAPEX, Wind CAPEX, BESS CAPEX.",
      "Point at the tab's in-panel caption and note it disagrees with the BESS CAPEX field's actual value.",
      "Open the OPEX tab.",
      "Point at Solar O&M, Wind O&M, BESS O&M (fixed), and OPEX Escalation.",
      "Point at PPA Tariff and Penalty Multiplier.",
      "Tick Apply Annual CUF Cap and show the % (of CC × 8760) field become editable.",
      "Untick it again.",
      "Show the Export Price group, Fixed Price selected, then switch to CSV (15-min pricing) and show the unit combobox defaulting to Rs/MWh.",
      "Switch back to Fixed Price.",
      "Point at Grid Charging Price, the Grid charging backup when generation is short checkbox, and Max Grid Charge Limit.",
      "Point at Project Target IRR under Optimisation Target.",
    ],
    say: [
      "The CAPEX tab sets the capital cost the financial model charges for each source, in Crore per unit installed. One Crore is Rs one, zero zero, zero zero, zero zero, zero.",
      "Solar CAPEX defaults to five Crore per megawatt, and Wind CAPEX to seven Crore per megawatt.",
      "BESS CAPEX defaults to one point five Crore per megawatt hour. The tab's own caption says one Crore, but the field itself shows one point five on a fresh launch — treat one point five as the real default.",
      "The OPEX tab sets the plant's operating cost, the tariff and penalty that drive its revenue, the third-party export price, and the terms for grid charging.",
      "Solar O&M defaults to three Lakh per megawatt per year, and Wind O&M to five Lakh per megawatt per year.",
      "BESS O&M is a fixed five Lakh per year, escalated at two per cent a year along with the rest.",
      "PPA Tariff, the contracted price for delivered energy, defaults to five rupees per kilowatt hour.",
      "Penalty Multiplier defaults to one point five times the tariff, applied to the DFR shortfall.",
      "An optional Annual CUF Cap, off by default, ceils how much delivered energy is paid at the PPA tariff — twenty eight per cent of Contracted Capacity times eight thousand seven hundred and sixty hours, when it's switched on. Energy above that cap is paid at the export price instead.",
      "Export price is a flat rate or a fifteen-minute pricing series, for example an exchange clearing price. The flat rate defaults to zero.",
      "Grid Charging Price, the price paid for grid energy used to charge the battery, defaults to zero. It always applies on a Standalone project, and only as backup on a generation-backed one.",
      "A generation-backed plant can also draw grid backup on a low-generation day, capped by Max Grid Charge Limit, which defaults to one hundred per cent — unrestricted.",
      "Project Target IRR, on this same tab, defaults to fifteen per cent, and is what the Optimise search aims for.",
    ],
    hold:
      "Three seconds on the BESS CAPEX field once the caption discrepancy is mentioned. Three seconds on the CUF cap field once ticked.",
    avoid: "—",
    priority: 2,
  },
  {
    id: "inputs-finance",
    file: "inputs/finance.mp4",
    page: "/docs/bess/inputs/finance",
    area: "Inputs",
    title: "Discounting, debt, tax and working capital",
    purpose:
      "Set the discount rate and LCOE basis, understand payment-delay cost, and turn on debt and tax for a levered analysis.",
    seconds: 195,
    setup:
      "A fresh main window, Solar + Wind + BESS project type, Finance tab open, Debt and Tax both left off.",
    shots: [
      "Show the Finance tab's Discounting & Escalation group: Discount Rate (NPV), PPA Tariff Escalation, Terminal / Salvage Value.",
      "Point at the LCOE Energy Basis combobox, showing Energy delivered to load (default) selected.",
      "Open the combobox and show the other two options: Total generation (solar+wind), Delivered + exported energy.",
      "Switch back to Energy delivered to load (default).",
      "Point at Receivable Lag, Working-Capital Rate, Late-Payment Surcharge and WC Facility Fee, with Receivable Lag at zero.",
      "Tick Enable debt (levered analysis) and show the five debt fields become editable: Gearing (Debt), Interest Rate, Repayment Tenor, Moratorium, DSRA.",
      "Untick it again.",
      "Tick Enable tax (post-tax analysis) and show Corporate Tax Rate, MAT Rate, the Tax Depreciation radio and WDV Dep. Rate become editable.",
      "Untick it again.",
      "Point at Plant Availability, Insurance, and BESS Cost Decline (augment.).",
    ],
    say: [
      "The Finance tab holds the assumptions the financial model applies on top of revenue and operating cost.",
      "Discount Rate for NPV defaults to ten per cent.",
      "PPA Tariff Escalation defaults to zero per cent a year, and Terminal or Salvage Value to zero per cent of CAPEX.",
      "LCOE Energy Basis chooses the denominator the levelised cost of energy is measured against — energy delivered to load by default, or total generation, or delivered plus exported energy. The last two need an export price configured, or the model falls back to the delivered basis.",
      "Receivable Lag, the days after billing before the offtaker pays, defaults to zero, which switches the working-capital cost off entirely.",
      "When it's set above zero, Working-Capital Rate, defaulting to eleven per cent a year, prices the cost of carrying those receivables, increased by the WC Facility Fee and offset by any Late-Payment Surcharge.",
      "Debt financing is off by default. Switching it on turns on five fields: Gearing at seventy per cent of CAPEX, Interest Rate at nine per cent, Repayment Tenor at fifteen years, Moratorium at zero years, and DSRA at zero months of debt service.",
      "Tax is off by default too. Switching it on turns on Corporate Tax Rate at twenty five point one seven per cent, MAT Rate at seventeen point one six per cent, and a depreciation method — written-down-value by default, at forty per cent a year.",
      "With both debt and tax off, results match the simple pre-tax project model.",
      "Plant Availability defaults to one hundred per cent, Insurance to zero per cent of CAPEX a year, and BESS Cost Decline, which reduces the unit cost used for later augmentation tranches, to zero per cent a year too.",
    ],
    hold:
      "Three seconds on the five debt fields once enabled. Three seconds on the tax fields once enabled.",
    avoid: "Presenting debt or tax as on by default — both start switched off.",
    priority: 3,
  },

  // ── Analysis ─────────────────────────────────────────────────────────────
  {
    id: "analysis-simulate",
    file: "analysis/simulate.mp4",
    page: "/docs/bess/analysis/simulate",
    area: "Analysis",
    title: "Run Simulate",
    purpose:
      "Run one fixed configuration through the dispatch model and the financial model, and read the run summary it leaves behind.",
    seconds: 150,
    setup:
      "An activated device, Solar + Wind + BESS project type, generation CSV loaded, all input tabs left at their shipped defaults.",
    shots: [
      "Point at ▶ Simulate above the input tabs.",
      "Click it and show the status bar begin reporting the financial model's progress, alongside the progress bar.",
      "Let the run finish and show the status bar's summary line appear.",
      "Show the result notebook switch on its own to the Dashboard tab.",
      "Point at each of the four result tabs in turn: Dashboard, DFR Table, Financials, Summary, all now filled in.",
      "Attempt Simulate on an unactivated device (a second, unactivated session) and show the application offering to open the License window instead.",
    ],
    say: [
      "Simulate runs one case: the dispatch model, the monthly DFR check, and the full financial model, built from whatever Solar, Wind, BESS, Peak-hour and cost inputs are currently set.",
      "It answers what this exact configuration delivers.",
      "It needs a loaded generation file, unless the project type is Standalone BESS, grid-charged, and it needs this device activated, the same as Optimise and every export.",
      "The inputs across every tab are collected first, then the run itself happens on a background thread, so the rest of the window stays usable while it works.",
      "The status bar reports which project year the financial model is on as it steps through them, alongside a progress bar.",
      "Underneath, the financial model re-runs the full fifteen-minute dispatch once per project year, at that year's own degraded state of health and generation factor, rather than scaling a single run.",
      "When it finishes, the status bar carries one summary line: the result's IRR, NPV and CAPEX, and the Solar, Wind and BESS sizing the run used.",
      "A finished run fills all four result tabs, and the result notebook switches to the Dashboard on its own.",
      "On a device without active access, Simulate doesn't run — the application offers to open the License window instead.",
    ],
    hold:
      "Four seconds on the status bar's progress line while the model works through the years. Four seconds on the summary line once it finishes.",
    avoid: "Reading the IRR, NPV or CAPEX figures aloud — they change between recordings.",
    priority: 1,
  },
  {
    id: "analysis-optimise",
    file: "analysis/optimise.mp4",
    page: "/docs/bess/analysis/optimise",
    area: "Analysis",
    title: "Optimise, and the three scenarios",
    purpose:
      "Search Solar, Wind and BESS size for the highest IRR, and compare the three scenarios Optimise produces before applying one.",
    seconds: 210,
    setup:
      "An activated device, Solar + Wind + BESS project type, generation CSV loaded, Project Target IRR left at its default on the OPEX tab.",
    shots: [
      "Point at ⚙ Optimise above the input tabs, beside ▶ Simulate.",
      "Click it and let the search run.",
      "Show Max IRR • Your Peak Hours load into the main view — Dashboard, DFR Table, Financials, Summary — before the comparison window opens.",
      "Show the Optimisation — Scenario Comparison window opening, with one column per scenario.",
      "Point down the row list: Peak Hours Selected, Solar Capacity (MW), Wind Capacity (MW), BESS Energy (MWh), Total CAPEX (Cr), IRR (%), NPV @ 10% (Cr), Gross Rev Yr1 (Cr), Penalty Yr1 (Lac), Pen % of Revenue Yr1, Export MWh Yr1, NCF Yr1 (Cr).",
      "Point at the shaded column header of the highest-IRR scenario, and at the light-green winning cell in a couple of KPI rows.",
      "Point at the banner along the bottom naming the highest-IRR scenario and whether it met the target.",
      "Click ✓ Apply on one scenario's column and show the main view update and the window close.",
    ],
    say: [
      "Optimise doesn't run one fixed case — it searches for a Solar, Wind and BESS mix instead, and hands back three scenarios to choose between rather than a single result.",
      "It needs the same as Simulate: a loaded generation file unless the project type is Standalone BESS, and this device activated.",
      "It also reads Project Target IRR, on the OPEX tab, and falls back to fifteen per cent if that field can't be parsed.",
      "The search runs over three free variables — Solar megawatts, Wind megawatts and BESS megawatt hours — starting from the sizes set on the Sizing tab.",
      "Its bounds respect the project's topology: a source excluded by the project type is pinned to approximately zero megawatts, so the search never adds it back in.",
      "Max IRR, Your Peak Hours finds the highest-IRR mix while keeping the Peak hours you've set on the Peak tab.",
      "Max IRR, Suggested Peak Hours first finds the highest-scoring contiguous block of hours the same length as your own peak-hour count, then searches for the highest-IRR mix on that block instead.",
      "The third scenario searches for a mix whose project IRR lands within half a percentage point of Project Target IRR. It's titled Hits Target IRR when a mix reaches that tolerance, and Closest Achievable to Target when none does.",
      "Max IRR, Your Peak Hours is loaded into the main view before the comparison window even opens.",
      "The comparison window shows one column per scenario, with the winning cell in each KPI row shaded light green, and the highest-IRR column's header shaded green if it meets the target, red if it doesn't.",
      "A banner along the bottom names the highest-IRR scenario, its IRR, the Target IRR, and whether it was met.",
      "Each column has its own Apply button, which carries that scenario's Peak hours, sizes and results into the main view and closes the window.",
    ],
    hold:
      "Four seconds on the three-column comparison table once it opens. Three seconds on the bottom banner.",
    avoid: "Reading the IRR or CAPEX values aloud.",
    priority: 2,
  },
  {
    id: "analysis-sensitivity",
    file: "analysis/sensitivity.mp4",
    page: "/docs/bess/analysis/sensitivity",
    area: "Analysis",
    title: "Sensitivity analysis",
    purpose:
      "Test how a completed Simulate or Optimise result responds to a changed input, across five methods in one window.",
    seconds: 210,
    setup:
      "An activated device with a completed Simulate result already on screen. Debt financing switched on for at least part of the clip, so the debt interest rate appears as a driver.",
    shots: [
      "Open Run ▸ Sensitivity Analysis… and show the window with its five tabs.",
      "Attempt to open it before any Simulate or Optimise result exists (a fresh session) and show the warning message instead.",
      "On the Single Variable Sweep tab, choose a Variable, set Min, Max and Steps, and click ▶ Run Sweep.",
      "Show the resulting table with the base row and the best-IRR row highlighted, and the IRR-vs-variable and NPV-vs-variable plots.",
      "Click 💾 Export CSV and show the save dialog.",
      "Switch to the Tornado Chart tab, leave Variation ± % at 20 and Metric at IRR (%), and click ▶ Run Tornado.",
      "Show the horizontal bar chart sorted by swing size.",
      "Switch to the 2-Variable Heatmap tab, pick an X-Axis and a Y-Axis driver, leave Grid at 8 and Range at ±50%, and click ▶ Run Heatmap.",
      "Show the resulting colour map with contour lines and the base-case marker.",
      "Switch to the Breakeven Solver tab, pick a lever to Solve for, a Target metric, and a target value, and click 🎯 Solve.",
      "Show the solved value and the resulting IRR, NPV, Equity IRR and Min DSCR.",
      "Switch to the Monte Carlo tab, leave Iterations at 500, Seed at 42 and the percentiles at 10/50/90, and click 🎲 Run Monte Carlo.",
      "Show the IRR distribution histogram and the NPV CDF plot, both marked at the base case and the percentiles.",
    ],
    say: [
      "Sensitivity Analysis, on the Run menu, tests how a completed result moves when an input changes, without re-entering and re-running each variation by hand.",
      "It needs a base case first — a completed Simulate or Optimise result. Without one, the window doesn't open, and it says so.",
      "Opening the window, and running any of its five methods, doesn't need this device activated. Only the Single Variable Sweep tab's CSV export does, the same as every other export.",
      "All five methods draw from the same list of drivers: every input that moves NPV or IRR, filtered to the current project type and to drivers whose base value isn't zero.",
      "That list spans the source capacities, the tariffs, each CAPEX and O&M line, the penalty multiplier, availability, the discount rate, the debt interest rate once debt financing is on, module and BESS degradation, and payment lag.",
      "Single Variable Sweep steps one driver across a range you set and reports the IRR and NPV at each step, with the base case and the best-IRR step both highlighted.",
      "Tornado Chart varies every driver in the list one at a time, by the same percentage either side of its base value, defaulting to twenty per cent, and ranks the swings.",
      "2-Variable Heatmap evaluates the model across a grid of two drivers at once, an eight by eight grid by default, and draws the result as an IRR colour map with contour lines and a marker at the base case.",
      "Breakeven Solver finds the value one driver needs to hit a target on IRR, NPV, Equity IRR or minimum DSCR, searching within a range that starts at zero point two to five times the driver's base value.",
      "Monte Carlo draws random variations across every driver at once, five hundred iterations by default, and reports an IRR distribution and an NPV curve, marked at the tenth, fiftieth and ninetieth percentiles by default.",
    ],
    hold:
      "Four seconds on the tornado chart once drawn. Four seconds on the Monte Carlo histogram with its percentile markers.",
    avoid:
      "Reading the numeric results aloud, and claiming the tenth/fiftieth/ninetieth percentiles are fixed — they're editable to any value.",
    priority: 3,
  },

  // ── Reading results ──────────────────────────────────────────────────────
  {
    id: "results-dashboard",
    file: "results/dashboard.mp4",
    page: "/docs/bess/results/dashboard",
    area: "Reading results",
    title: "Read the Dashboard",
    purpose:
      "Read the header strip and the six panels the Dashboard draws after a run, and use the 7-day scroll and Maximize.",
    seconds: 180,
    setup:
      "A completed Simulate result on screen, with at least one day of grid charging in the data so the shaded days are visible.",
    shots: [
      "Point at the navy header strip: Solar, Wind and BESS sizing on the left, IRR and Contracted Capacity on the right.",
      "Point at panel 1, Total Generation vs Contracted Capacity, and its stacked solar and wind fill, the total-generation line, the Contracted Capacity line, the Scheduled/Delivered line and the exported-surplus fill.",
      "Point at panel 2, Battery Charge / Discharge & State of Charge, and its charge, discharge and grid-charge fills against the state-of-charge line on the right axis.",
      "Point at a day shaded purple on both panels 1 and 2.",
      "Drag the Day slider beneath the panels and show both scroll together.",
      "Point at panel 3, Monthly DFR Performance, and its grouped Overall, Peak and Off-Peak bars against their target lines.",
      "Point at panel 4, Monthly DFR Penalty, and a red bar on a month that missed a target.",
      "Point at panel 5, Annual Revenue vs OPEX, and its Gross Revenue, OPEX and Penalty bars plus the net cash-flow line.",
      "Point at panel 6, Cumulative Cashflow, its payback marker, and the IRR badge.",
      "Click ⛶ Maximize and show the same six panels open in an enlarged window.",
      "Press Esc and show the chart return to the tab.",
    ],
    say: [
      "The Dashboard draws a single chart: a header strip of headline figures above six panels.",
      "The header strip reports the run's sizing on the left — Solar, Wind and BESS — and two headline results on the right — IRR and Contracted Capacity.",
      "Panel one plots total generation against Contracted Capacity over a seven-day scrollable window: a stacked solar and wind fill, a total-generation line, the Contracted Capacity line, a Scheduled and Delivered line, and an exported-surplus fill.",
      "Panel two shows battery charge, discharge and grid-charge on the left axis, and state of charge on a twin right axis, over the same seven-day window.",
      "Any day with grid charging is shaded purple on both of those first two panels.",
      "A Day slider beneath them scrolls both panels together across all three hundred and sixty five days.",
      "Panel three groups Overall, Peak and Off-Peak DFR percentage bars, one group per month, against their target lines.",
      "Panel four draws that month's shortfall penalty as a bar, green when Peak, Off-Peak and Overall all passed, red otherwise.",
      "Panel five plots Gross Revenue, OPEX and Penalty bars against a net cash-flow line, one point per project year.",
      "Panel six draws annual and cumulative cash flow, a payback-year marker, and an IRR badge.",
      "That badge is coloured green at fifteen per cent or above and red below it — a fixed benchmark, not the Project Target IRR field on the OPEX tab. The two only agree when that field is left at its own default.",
      "Maximize opens the same six panels in an enlarged window of their own. Press Escape, or close that window, to bring the chart back into the tab.",
    ],
    hold:
      "Three seconds on each panel as you point at it. Four seconds on the maximized window once it opens.",
    avoid:
      "Describing the IRR badge as tracking Project Target IRR — it's a fixed fifteen per cent benchmark.",
    priority: 1,
  },
  {
    id: "results-dfr-table",
    file: "results/dfr-table.mp4",
    page: "/docs/bess/results/dfr-table",
    area: "Reading results",
    title: "Read the DFR Table",
    purpose:
      "Read the DFR Table's column groups and its green and red row shading, one row per calendar month of Year 1.",
    seconds: 150,
    setup:
      "A completed Simulate result with at least one month that missed a DFR target, so both row colours are visible.",
    shots: [
      "Show the DFR Table tab with one row per month of Year 1.",
      "Point at the Month column, then at the Delivery % group: 15min%, Total%, Peak%, Off-Pk%.",
      "Point at the met/missed flags: 15m OK, Pk OK, OffPk OK, Mon OK.",
      "Point at the shortfall columns: ShortPk MWh, ShortOpk MWh, Short15m MWh, on a row that missed.",
      "Point at the penalty columns: Penalty Lac, Pen%Rev.",
      "Point at the export columns: Export MWh, Export Rev Lac.",
      "Point at a row shaded green, then a row shaded red.",
      "Rest the pointer on a column heading and show its tooltip appear.",
    ],
    say: [
      "The DFR Table reports one row per calendar month of Year 1, once a run finishes.",
      "Each row carries that month's Delivery Fulfilment Ratio at every granularity the application tracks, whether each target was met, the shortfall on months that missed, that month's penalty, and its export figures.",
      "Every row starts with the Month, then five groups of columns.",
      "Delivery percentage: the fifteen-minute, Overall, Peak and Off-Peak DFR for that month.",
      "Met or missed flags for each of those four granularities.",
      "Shortfalls: the megawatt-hour gap at Peak, Off-Peak and fifteen-minute granularity, on a month that missed.",
      "Penalty: that month's shortfall penalty in Rupees Lakhs, and its share of revenue.",
      "Export: the energy exported that month and its revenue.",
      "A row is shaded green when that month's Peak, Off-Peak, Overall and fifteen-minute DFR all met target, and red when any one of the four missed.",
      "The colour down the tab is a faster read than the individual flags — scan for red first, then check which flag explains it.",
      "Hovering over any column heading shows a short tooltip explaining what it reports.",
    ],
    hold:
      "Four seconds on a red-shaded row with the flag that explains it. Three seconds on a tooltip once it appears.",
    avoid: "Reading the percentage or MWh values aloud.",
    priority: 2,
  },
  {
    id: "results-financials",
    file: "results/financials.mp4",
    page: "/docs/bess/results/financials",
    area: "Reading results",
    title: "Read the Financials table",
    purpose:
      "Read the Financials tab's headline metrics and its per-year cash-flow table, including its row and text shading.",
    seconds: 180,
    setup:
      "A completed Simulate result with debt financing switched on and at least one negative-NCF or replacement year, so both shading rules are visible.",
    shots: [
      "Show the Financials tab's headline block at the top.",
      "Point at line 1: Total CAPEX, Project IRR, NPV, and the CAPEX split across Solar, Wind and BESS.",
      "Point at line 2: Post-tax IRR, Equity IRR, WACC, DSCR minimum and average.",
      "Point at line 3: LCOE, LCOS, Payback, Discounted Payback, MoIC, PI.",
      "Point at a negative figure painted red inline within the headline block.",
      "Scroll the per-year table and point along its column groups: Yr/Deg%/SOH%, then BESS MWh/Sched MWh/Export MWh, then the revenue, penalty, operating cost, grid-charging, working-capital and cash-flow groups.",
      "Point at a row shaded light red for a negative-NCF year.",
      "Point at a row shaded yellow for a replacement or augmentation year.",
      "Point at a row whose own figures are painted red even though its background isn't shaded.",
      "Rest the pointer on a column heading and show its tooltip.",
    ],
    say: [
      "The Financials tab shows the same run's economics as a table: a headline block at the top, and a per-year cash-flow table beneath it.",
      "Each headline line is shown only when the model has a value to report for it.",
      "Line one: Total CAPEX, Project IRR, NPV at the Finance tab's discount rate, and the CAPEX split across Solar, Wind and BESS.",
      "Line two: Post-tax IRR, Equity IRR, WACC, and DSCR minimum and average across the debt tenor — Equity IRR and WACC only appear once debt financing is enabled.",
      "Line three: LCOE on the basis chosen on the Finance tab, LCOS, Payback, Discounted Payback, MoIC and PI.",
      "Any individual negative figure within these lines is painted red inline.",
      "The per-year table runs one row per project year, in eight column groups: year and battery health, energy, revenue, penalty, operating cost, grid charging, working capital and replacement, and cash flow and financing.",
      "A year's row is shaded light red when that year's net cash flow is negative, and yellow when it's a replacement or augmentation year — the two are mutually exclusive, and a negative-NCF year takes the red shading even if it's also a replacement year.",
      "Independently of the row's background, a row's own figures are painted red wherever any of Gross Revenue, EBITDA, NCF, Equity Cash Flow, Interest, Tax, Penalty, OPEX, Export Revenue or DSCR comes out negative for that year.",
      "Hovering over any column heading shows a short tooltip explaining what it reports.",
    ],
    hold: "Three seconds on the light-red row. Three seconds on the yellow row.",
    avoid: "Reading the IRR, NPV or Crore figures aloud.",
    priority: 2,
  },
  {
    id: "results-summary",
    file: "results/summary.mp4",
    page: "/docs/bess/results/summary",
    area: "Reading results",
    title: "Read the Summary report and its export buttons",
    purpose:
      "Read the Summary tab's plain-text report in its fixed section order, and use its six export buttons.",
    seconds: 165,
    setup: "A completed Simulate result on screen.",
    shots: [
      "Show the Summary tab's dark, console-style panel, filled in with the report.",
      "Scroll to the project header and configuration block.",
      "Scroll to the CAPEX, IRR and NPV headline.",
      "Scroll to the FINANCIAL METRICS block and point at the ABOVE 15% or BELOW 15% tag on the headline IRR line.",
      "Scroll to the MONTHLY DFR COMPLIANCE (Year 1) table.",
      "Scroll to the YEAR-BY-YEAR CASHFLOW table.",
      "Point along the toolbar at the six buttons in order: 📥 Export PDF, 💾 Save Plot, 📄 Save Report, 📊 Save DFR CSV, 🕒 Time-Series CSV, 📈 Sensitivity.",
      "Click 📈 Sensitivity on an unactivated device and show it still opens.",
      "Click 📥 Export PDF on an unactivated device and show the application offering to open the License window instead.",
    ],
    say: [
      "The Summary tab holds a plain-text project report in a dark, console-style panel, filled in once a run finishes, alongside the export buttons used to save it in other forms.",
      "The report runs in a fixed order: a project header and configuration block, a CAPEX, IRR and NPV headline, a FINANCIAL METRICS block, a MONTHLY DFR COMPLIANCE table for Year 1, and a YEAR-BY-YEAR CASHFLOW table.",
      "The FINANCIAL METRICS block carries an ABOVE 15% or BELOW 15% tag on the headline IRR line — compared against the same fixed 15% benchmark as the IRR badge on the Dashboard, not the Project Target IRR field.",
      "Six buttons run along the top of the tab: Export PDF, Save Plot, Save Report, Save DFR CSV, Time-Series CSV, and Sensitivity.",
      "The first five are licence-gated exports, the same requirement as Simulate and Optimise.",
      "Sensitivity is not gated — it opens on an unactivated device, the same as it does from the Run menu.",
    ],
    hold: "Four seconds on the ABOVE 15% or BELOW 15% tag. Three seconds on the six export buttons.",
    avoid: "Reading the report's figures aloud.",
    priority: 2,
  },

  // ── Plant & SLD ──────────────────────────────────────────────────────────
  {
    id: "plant-generate-layout",
    file: "plant/generate-layout.mp4",
    page: "/docs/bess/plant/generate-layout",
    area: "Plant & SLD",
    title: "Generate the plant layout",
    purpose:
      "Fill in the shared equipment form and auto-place containers, PCS, panels and transformers as a scaled layout.",
    seconds: 195,
    setup: "A fresh main window. The 🏗 Plant Layout & SLD designer not yet opened.",
    shots: [
      "Click the banner's 🏗 Plant Layout & SLD button, or open it from Run ▸ BESS Plant Layout & SLD…, and show the designer window open on the Plant Layout tab.",
      "Show the shared input form on the left: BESS Plant Capacity, BESS Container Capacity, Container Size, C-rate, PCS Capacity, PCS per LV Panel, LV Panels per Transformer, MV Panels.",
      "Point at the Equipment size (Length x Width, m) group: PCS, LV Panel, Transformer, MV Panel.",
      "Point at the Spacing & geo-reference group: Container Side Gap, Row Gap (N-S), Latitude, Longitude.",
      "Point at the read-only Transformer Type combobox showing 2 winding.",
      "Change LV Panels per Transformer from 1 to 2 and show Transformer Type auto-sync to 3 winding.",
      "Change it back to 1.",
      "Click ⚙ Generate Layout and show the equipment auto-place onto the canvas: containers at the south, then PCS, LV panels, the transformer, and a row of MV panels at the north.",
      "Point at the right-angled connection buses between equipment.",
      "Read the count label: Containers, PCS, LV Panels, Transformers with its MVA figure, MV Panels.",
      "Click ⤢ Fit to bring the whole layout into view.",
    ],
    say: [
      "Generate Layout, on the Plant Layout tab, builds a scaled plant layout from the shared input form: it auto-places containers, PCS, LV panels, transformers and MV panels to scale, wired together with power buses.",
      "Containers round up to cover the requested BESS Plant Capacity, divided by BESS Container Capacity. Every container gets one PCS.",
      "PCS units are grouped, and each group's LV panel count and transformer count round up to the next whole unit needed to carry that group's PCS.",
      "MV Panels isn't computed — it's fed straight from the field, and all transformers feed into it.",
      "Transformer Type auto-syncs from LV Panels per Transformer: one panel gives a two-winding transformer, two panels give three-winding, four panels give five-winding. Any other count leaves the previously chosen type unchanged.",
      "Equipment is placed as a stack running south to north: containers at the south end, then PCS, then LV panels, then the transformer, with a row of MV panels at the north end.",
      "A container's footprint is looked up in a standard container-size table for twenty, forty and forty five feet, or scaled from the twenty-foot ratio for any other length.",
      "Connections are drawn as right-angled power buses rather than diagonal lines — a stub down from the parent, a horizontal bus, then a drop to each child.",
      "After generating, a count label reports what was built, with the transformer count followed by its typical MVA rating and how many transformers sit on the LV side.",
      "That MVA figure is the rating each transformer carries when PCS divide evenly across transformers. If the total doesn't divide evenly, one transformer's own label on the canvas shows its true, lower figure, while the summary label still shows the full-group maximum.",
    ],
    hold: "Four seconds on the finished layout after Fit. Three seconds on the count label.",
    avoid: "Any real site name in the window title. Use a generic project name.",
    priority: 2,
  },
  {
    id: "plant-generate-sld",
    file: "plant/generate-sld.mp4",
    page: "/docs/bess/plant/generate-sld",
    area: "Plant & SLD",
    title: "Generate the single line diagram",
    purpose:
      "Redraw the same plant topology as IEC schematic symbols, and see why the wires still reach after the symbols shrink.",
    seconds: 165,
    setup:
      "The Plant Layout tab already generated in the same designer session, so Generate SLD has a topology to redraw.",
    shots: [
      "Switch to the Single Line Diagram tab and show the note Uses the same inputs as the Plant Layout tab.",
      "Click ⚙ Generate SLD and show the diagram appear.",
      "Point at a container drawn as a battery symbol, and a PCS unit drawn as a PCS symbol.",
      "Point at the transformer drawn as a two-winding symbol, matching the Transformer Type selected on the form.",
      "Point at an LV panel and an MV panel, still drawn as rectangles at their real footprint.",
      "Zoom to a symbol's edge and show a connection landing exactly on its top or bottom terminal rather than stopping short.",
      "Click ⤢ Fit to bring the whole diagram into view.",
    ],
    say: [
      "Generate SLD, on the Single Line Diagram tab, re-runs the same equipment auto-placement as Generate Layout, then draws the result again — not as scaled rectangles this time, but as IEC schematic symbols on the same connections.",
      "Containers are drawn as a battery symbol, and PCS units as a PCS symbol.",
      "The transformer is drawn as a two-winding, three-winding or five-winding symbol, matching whichever Transformer Type is selected on the shared form.",
      "LV and MV panels aren't converted to symbols — they stay rectangles at their actual length and width.",
      "Containers, PCS and the transformer are each drawn as a fixed three by three metre symbol, regardless of the equipment's real footprint on the Plant Layout tab.",
      "A symbol is smaller than the full-size rectangle its connections were originally routed to. So any connection landing on a symbol's top or bottom edge is re-snapped to the symbol's own top or bottom terminal, so the wires don't stop short.",
    ],
    hold:
      "Four seconds on the finished diagram after Fit. Three seconds zoomed on a re-snapped connection terminal.",
    avoid: "—",
    priority: 2,
  },
  {
    id: "plant-cad-editor",
    file: "plant/cad-editor.mp4",
    page: "/docs/bess/plant/cad-editor",
    area: "Plant & SLD",
    title: "The drawing editor: tools, sheets and importing a background",
    purpose:
      "Use the drawing tools and layer toggles on either canvas, add a sheet border, and import a DXF or KMZ background.",
    seconds: 210,
    setup:
      "A layout already generated on the Plant Layout tab. A demonstration DXF and a demonstration KMZ, both prepared for the designer's Latitude and Longitude fields, in C:\\BESS Demo.",
    shots: [
      "Point along the first toolbar row: ▷ Select, ✥ Move, ✋ Pan, ╱ Line, ▭ Rect, ◯ Circle, ⬡ Polygon, T Text, 📏 Measure, ⟺ Dimension, ⟳ Rotate, ✎ Edit Text.",
      "Draw a rectangle, then a circle, on the canvas.",
      "Select an object and click ⟳ Rotate to turn it 90 degrees immediately.",
      "Place a text label with T Text, then click ✎ Edit Text on it.",
      "Use 📏 Measure between two points, then ⟺ Dimension to place a permanent dimension.",
      "Point along the second toolbar row: ⧉ Copy, ⎘ Paste, 🗑 Delete, ↶ Undo, ↷ Redo, ⤢ Fit, ⌗ Snap, ⊾ Ortho, 📁 Import.",
      "Copy an object, paste it, then delete the copy.",
      "Toggle ⌗ Snap off and back on, then ⊾ Ortho on and back off.",
      "Change the sheet size combobox from A3 to A1, then back to A3.",
      "Click 🗏 Add Sheet and show the ISO sheet border and title block frame the drawing.",
      "Click 📁 Import, open the demonstration DXF, and show it land on the import layer, force-shown, with the canvas zoomed to fit.",
      "Click 📁 Import again, open the demonstration KMZ, and show it projected onto the canvas the same way.",
      "Toggle each of the six layer checkboxes off and on in turn: equipment, connections, sketch, text, import, sheet.",
      "Switch to the Single Line Diagram tab and repeat one tool action there, showing its own undo history is independent of the Plant Layout canvas.",
    ],
    say: [
      "Plant Layout and Single Line Diagram each have their own drawing canvas and toolbar. Because the canvases are independent, the active tool, undo history, snap, ortho and layer visibility on one don't affect the other.",
      "The first toolbar row holds the drawing tools, mutually exclusive, with Select active by default: Move, Pan, Line, Rectangle, Circle, Polygon, Text, Measure, Dimension.",
      "Rotate and Edit Text act immediately on the current selection rather than staying armed as a persistent tool.",
      "The second row holds Copy, Paste, Delete, Undo, Redo, Fit, a Snap toggle that's on by default, an Ortho toggle that's off by default, and Import.",
      "A sheet-size combobox — A zero through A four, A three by default — sets the drawing's paper size. Add Sheet frames the current drawing's bounding box with an ISO sheet border and a title block, on its own layer, so it exports with the drawing.",
      "Six layer toggles control what's visible: equipment, connections, sketch, text, import and sheet — all on by default.",
      "Import opens a file picker for a D X F, K M Z or K M L file, then reads it using the form's Latitude and Longitude fields as the georeferencing anchor.",
      "A D X F import is auto-scaled to metres from the file's own unit setting, reading lines, polylines, circles, arcs and text, and shifted so its bounding-box corner sits at the origin.",
      "A K M Z or K M L import projects every coordinate list in the file from its geographic position to local metres, centred at the form's Latitude and Longitude, then shifted the same way.",
      "Imported entities land on the import layer, which is force-shown, and the canvas zooms to fit them.",
    ],
    hold:
      "Three seconds on the sheet border once Add Sheet is clicked. Four seconds on the imported background once it lands.",
    avoid:
      "Any drawing with a real client title block. Use a plain demonstration DXF and KMZ.",
    priority: 3,
  },

  // ── Exports ──────────────────────────────────────────────────────────────
  {
    id: "exports-reports",
    file: "exports/pdf-and-word-report.mp4",
    page: "/docs/bess/exports/pdf-report",
    area: "Exports",
    title: "Export the PDF report and the Word report",
    purpose:
      "Produce the multi-page PDF and the eight-section Word report from the same run, and know what each one contains.",
    seconds: 210,
    setup:
      "An activated device with a completed Simulate result on screen. A demonstration project name, saved into C:\\BESS Demo.",
    shots: [
      "Open the File menu and point at Export PDF Report…, Export Plot (PNG)…, Save Project Report (Word)…, Export Report (TXT)…, Export DFR CSV…, Export Time-Series CSV (Dashboard Data)….",
      "Click Export PDF Report…, save into the demonstration folder as BESS_Report_<date>.pdf, and open the resulting file.",
      "Page through it: the headline figures, the DFR detail, the financial results and cash-flow table, and the dashboard charts.",
      "Back in the application, click Save Project Report (Word)…, save it, and open the resulting .docx.",
      "Show the title page: logo, title, subtitle, Detailed Project Report (DPR), the generation date, and Prepared with SolarLayout — BESS Project Design Solution.",
      "Page through the eight numbered sections: Executive Summary, Project Configuration, Technical Parameters, Financial Assumptions, Financial Results & Cash-flow, Dashboard & Charts, Analysis & Business Recommendation, and Appendix A.",
      "Point at the bolded Recommendation: verdict in section 7.",
      "Attempt Export PDF Report… on an unactivated device and show the application offering to open the License window instead.",
    ],
    say: [
      "Export PDF Report writes a multi-page PDF covering the run's headline figures, its DFR detail, its financial results, and its charts, in a single file.",
      "The same report comes from two places — the File menu, and the Export PDF button on the Summary tab — and both produce the same file.",
      "The save dialog is titled Save PDF Report, and the file name it suggests follows the pattern BESS underscore Report underscore, then the date.",
      "Save Project Report writes the run as a Detailed Project Report — a Word document laid out in eight sections, in a fixed order, for handing to someone who wasn't at the keyboard for the run itself.",
      "Before the numbered sections, a title page carries the logo, the report's title and subtitle, the line Detailed Project Report, D P R, the generation date, and the line Prepared with SolarLayout, BESS Project Design Solution.",
      "Section one, Executive Summary, carries a narrative paragraph and a headline table: Project IRR, Equity IRR, NPV, Total CAPEX, LCOE, LCOS, Simple Payback, MoIC.",
      "Sections two through four cover Project Configuration, Technical Parameters and Financial Assumptions — the same inputs set across the Data, Sizing, Peak, BESS, CAPEX, OPEX and Finance tabs.",
      "Section five is the year-by-year Financial Results and Cash-flow table, with grid-charging columns added on any year that drew grid energy.",
      "Section six embeds the Dashboard figure as an image, when a plot exists.",
      "Section seven, Analysis and Business Recommendation, carries bulleted commentary and a bolded Recommendation verdict, based on whether the run's Project IRR meets the Project Target IRR field.",
      "Appendix A embeds the same plain-text report as the Summary tab, in full.",
      "Both exports need this device activated, the same requirement as Simulate and Optimise.",
    ],
    hold:
      "Three seconds on each report page as you turn to it. Four seconds on the Word report's title page.",
    avoid:
      "Any file path or title block carrying a personal or customer name. Save into the demonstration folder.",
    priority: 1,
  },
  {
    id: "exports-data",
    file: "exports/data-exports.mp4",
    page: "/docs/bess/exports/data-exports",
    area: "Exports",
    title: "Data exports, and saving a project",
    purpose:
      "Export the dashboard plot, the DFR CSV and the time-series CSV, and save or reopen the whole session as a project file.",
    seconds: 195,
    setup:
      "An activated device with a completed Simulate result on screen and a 15-min DFR target set, so the second DFR CSV file is produced too.",
    shots: [
      "Open the File menu and click Export Plot (PNG)…, showing both .png and .pdf offered in the same save dialog, and save it.",
      "Click Export Report (TXT)…, save it, and open the resulting .txt file.",
      "Click Export DFR CSV…, save it, and show the second <name>_15min.csv file appear alongside it.",
      "Open both CSVs and show their columns.",
      "Click Export Time-Series CSV (Dashboard Data)…, save it, and open the resulting file, scrolling across its columns: solar, wind and total generation, contracted capacity, scheduled/delivered, exported energy, battery charge/discharge, SOC, SOH.",
      "Point at the Summary tab's toolbar and show each of its buttons duplicating a File-menu action, except Export Report (TXT)…, which stays File-menu only.",
      "Click Save Project (.slb)… from the File menu, or the banner's Save icon button, and save it.",
      "Close and relaunch the application, then click Open Project (.slb)… and show the inputs and the Plant Layout/SLD drawing both restored.",
    ],
    say: [
      "Beyond the PDF and Word reports, the application exports the same run as CSV, plot and plain-text files, and saves the whole session as a project file you can reopen later.",
      "Export Plot saves the Dashboard figure as a PNG or a PDF — both extensions are offered in the same save dialog, at 150 D P I.",
      "Export Report, T X T, saves the same plain-text report as the Summary tab.",
      "Export DFR CSV saves the monthly DFR result, and adds a second file with a fifteen-minute detail — roughly thirty five thousand rows — when a fifteen-minute DFR target is set.",
      "Export Time-Series CSV saves a fifteen-minute file of every dashboard series: solar, wind and total generation, contracted capacity, scheduled and delivered energy, exported energy, battery charge and discharge, state of charge, and state of health.",
      "Each of these has a duplicate button on the Summary tab toolbar, except Export Report, T X T, which lives only in the File menu.",
      "Every export on this list needs this device activated, the same requirement as Simulate and Optimise.",
      "Save Project, dot S L B, writes the whole session to one file: your inputs, the loaded generation data, the last run's results, and the Plant Layout or S L D drawing.",
      "Open Project restores your inputs and that drawing from the file.",
      "Neither saving nor opening a project needs this device activated — that stays free, along with loading a generation profile and the plant designer itself.",
      "The dot S L B file isn't plain text. It carries a compressed payload behind its own file signature, so it opens only in the application.",
    ],
    hold:
      "Three seconds on the two DFR CSV files once both appear. Four seconds on the restored project after Open Project.",
    avoid:
      "Any file path carrying a personal or customer name. Save into the demonstration folder.",
    priority: 2,
  },
]
