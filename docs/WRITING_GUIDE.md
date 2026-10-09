# Writing guide

Read this and [`PRODUCT_FACTS.md`](./PRODUCT_FACTS.md) before writing or
editing any page. `content/docs/intro.mdx` is the worked example — match it.

---

## 1. Who you are writing for

A **solar plant developer or design engineer**, not a software person. They
know solar, civil and electrical engineering. They do not know — and should
never need to know — anything about how the application is built.

Consequences:

- **Never name a source file, class, function, module, or code identifier.**
  Not `layout_engine.py`, not `LayoutParameters`, not `usable_polygon`.
  Describe the behaviour instead: "the usable area", "the layout settings".
- **Never say "render", "widget", "dialog class", "dataclass", "parse".**
  Say "draw", "window", "read".
- Domain vocabulary is welcome and expected: GCR, pitch, tilt, P90, PR, CUF,
  MPPT, Voc, LID, DC/AC ratio, MMS, ICR, LA. Define each on first use in a
  page, then use it freely.
- **Never mention:** operating systems other than Windows, portable or zip
  builds, GitHub, source builds, product tiers or editions ("Pro", "Pro
  Plus"), the cloud product, the BESS product, this being a stopgap or a
  flagship, roadmaps, or internal team names.
- **The download page is the one install link.** Where a page needs to send
  the reader to get the application, link `solarlayout.app/downloads/<app>`
  and nothing else. That page owns the choice of install route; the docs
  describe only the Store. See the fact sheet's Install section.

### Writing for the BESS tree

Everything above — voice, structure, components, linking, the "before you
finish" checklist — applies equally to pages under `content/bess/`. Nothing in
this guide is SolarLayout-specific unless it names SolarLayout explicitly.
Three things differ for a BESS page, and only these three:

- **The fact source is [`PRODUCT_FACTS.bess.md`](./PRODUCT_FACTS.bess.md)**,
  not `PRODUCT_FACTS.md`. The same rule applies: if a number, label, default,
  range or behaviour is not in that file, do not state it.
- **The reader is a battery-storage / hybrid-renewable-energy developer** —
  someone sizing and financing solar-plus-storage or wind-plus-storage
  projects — not a solar-only plant developer. Domain vocabulary follows the
  same pattern as §1: define it on first use in a page (e.g. C-rate, DoD,
  round-trip efficiency, PPA, curtailment), then use it freely.
- **The "never mention" list inverts.** A BESS page never mentions the
  SolarLayout product — not by name, not as "the other product", not as a
  cross-sell. A SolarLayout page continues to never mention BESS, per the rule
  above. The two product families cross-link only from the shared shell (the
  landing page, the product picker, the top nav) — never from inside a content
  page in either tree.

Do not weaken any SolarLayout rule in this guide to accommodate BESS content;
add a BESS-specific note instead, as above.

### Three products: names, order and the shared shell

SolarLayout makes three products, and these docs cover each in its own tree:
SolarLayout Desktop (`content/docs`), BESS Desktop (`content/bess`) and, as
its pages arrive, SolarLayout Rooftop (`/docs/rooftop`). Approved by Arun on
2026-10-09 (#19).

**Names.**

| Say | Never | Where |
|---|---|---|
| **SolarLayout** | the vendor, the team, we | The company, and the supplier a reader writes to |
| **SolarLayout Desktop**, then *the application* | SolarLayout alone for the product, the desktop tool | Full name at a page's first mention |
| **BESS Desktop**, then *the application* | BESS Tool, the BESS product | As above |
| **SolarLayout Rooftop**, then *Rooftop* | Rooftop Desktop, the rooftop tool, the web version, the cloud product | As above. Rooftop is a browser app and always will be: no platform word in its name |
| **products** (the three together) | tools, apps (in shared places), suites, editions, tiers | The index, the landings, search |

- **Order of weight.** Wherever the three appear together (the index, the
  search filter, any list): SolarLayout Desktop, BESS Desktop, SolarLayout
  Rooftop.
- **Industry words.** *Rooftop solar* or *rooftop PV*, never a bare
  "rooftops" (it reads as roofing); *utility-scale PV plant*; *battery storage*.
  Never *bankable*, anywhere.
- **Each tree stands alone.** A content page never names, links or compares
  another product: the SolarLayout–BESS rule above, extended to three.
  Products cross only in the shared shell: the index at `/docs`, the landings'
  **All products** link, the header, search.
- **The shell's words** name what the reader gets, never claims: *Guides and
  reference*, *Start here*, *Open the docs*, *All products*, *Search the
  documentation*, *Search in*. Each product's one line says what it designs,
  in the reader's terms.
- **Each app opens its own docs**, never the index: SolarLayout Desktop at
  `/docs/solarlayout`, BESS Desktop at `/docs/bess`, SolarLayout Rooftop at
  `/docs/rooftop`. The index is for a reader who has not picked a product.

### Writing for the SolarLayout Rooftop tree

Everything in this guide applies, with these differences:

- **The fact source is `PRODUCT_FACTS.rooftop.md`**, every fact cited
  `file:line` into the Rooftop repository (`rooftop-design-app`), written
  before the pages. The app's in-app help topics are its own words: the docs
  go deeper (walkthroughs, the engineering, troubleshooting), never contradict
  them, and each topic links to its page.
- **The reader** is a rooftop installer, C&I solar EPC, design consultant or
  sales engineer: someone who knows rooftop PV, not software. Define each term
  on first use in a page (string, MPPT, DC/AC ratio, PR, P90, setback), then
  use it freely.
- **Platforms and the action.** Any browser on a phone, tablet or computer.
  The one link to the app is `rooftop.solarlayout.app` and the action is
  **Open Rooftop**. It is *added to the home screen*, never "installed" or
  "downloaded". (The two desktop trees keep §1: Windows only, the download
  page the one install link.)
- **Access, said one way:** "Free, no account needed. Your designs are kept on
  this device." Every page that touches access, saving or sharing says it in
  these words, and says what follows from it: a design on one device is not on
  another; the project file carries it across.
- **Release notes** are a *What's new* page: one dated entry per update that
  changes what users meet, no version numbers.

## 2. Voice

**Define the noun, state the requirement, link the reference.** Nothing warm,
nothing salesy, no exclamation marks, no "simply", no "just", no "easily", no
"powerful", no "seamless".

- Second person. Imperative for instructions: "Click **Generate Layout**."
- Present tense for behaviour: "The layout rebuilds." Not "will rebuild".
- Sentence case for every heading. `## Row pitch and tilt`, not `## Row Pitch And Tilt`.
- No subtitle sentence under a heading that only restates the heading.
- Lead with the answer. The first sentence of a page says what the thing is
  or does. No "In this guide we will…".
- Prefer a table to a paragraph when you are listing values, defaults, or
  options. Prefer a `<Steps>` block to prose when the reader must act in order.
- State limits and failure modes plainly. If something cannot be done, say so
  in one sentence and say what to do instead.
- British spelling for reader-facing prose to match the application's own
  labels: *licence* (noun), *optimise*, *metre*, *colour*, *centre*.
  Exception: quote UI strings exactly as the application spells them
  (**Maximize placement**, **Optimise placement** — check `PRODUCT_FACTS.md`).

### Quoting the interface

- **Bold** for anything the reader clicks or a field they fill:
  **Generate Layout**, **Perimeter road width**.
- Use `▸` for menu paths: **Help ▸ License / Subscription…**.
- Keep the application's own capitalisation and punctuation inside bold,
  including the ellipsis on menu items that open a window.
- `code font` only for file names, extensions, paths, and file content:
  `.slp`, `.docx`, `%APPDATA%`, `.PAN`.

## 3. Facts

**`PRODUCT_FACTS.md` is the only permitted factual source.**

- If a number, label, default, range or behaviour is not in that file, **do
  not state it**. Describe the capability without the number.
- Never infer a default from what seems sensible. Never carry a number over
  from another page — look it up.
- The product's own README, docstrings, code comments and in-app F1 guide are
  **stale in known places**, including descriptions of the interface from
  before the 2026-09 rebuild. `PRODUCT_FACTS.md` §18 lists them. Do not repeat
  any of them, even if you find them somewhere authoritative-looking.
- If you genuinely need a fact that is missing, leave exactly this, and keep
  writing around it:
  `{/* VERIFY: <the precise question> */}`
  These are collected and resolved in a follow-up pass. Use them sparingly —
  a page full of them is not a finished page.

## 4. Page structure

Frontmatter, every page:

```mdx
---
title: Sentence case, short, no product name
description: One sentence, under ~160 characters, states what the page covers.
---
```

`title` becomes the sidebar label and the `<h1>` — keep it short enough for a
240px sidebar. `description` shows under the title and in search results.

Then:

1. **One or two opening paragraphs.** What this is, why it matters to the
   design. No heading above them.
2. **The body**, in `##` sections. `###` only where a section genuinely has
   sub-parts.
3. **A closing cross-link block** — a `<Cards>` grid of two to four related
   pages, or a short "Where to go next" list. Every page must offer somewhere
   to go.

Aim for 120–400 lines of MDX. A reference page may be mostly table. A
walkthrough may be mostly `<Steps>`.

## 5. Components available in MDX

No imports needed — all of these are registered globally.

### `<Screenshot id="..." />`

The only way to show a product image.

- `id` **must** exist in `content/screenshots.ts`. An unknown id renders a
  visible error block.
- Only use ids whose `page` field matches the page you are writing, unless
  an image from elsewhere is genuinely the right illustration.
- Every id has its file on disk; the browser tests fail otherwise. Never add
  an entry to the manifest without its image — the site does not ship
  "Screenshot pending" placeholders.
- Do **not** pass `alt`, `width` or `height` — they come from the manifest.
- Optional `caption="…"` overrides the manifest title; optional
  `maxWidth={320}` caps a narrow image such as a single panel group.
- Place it immediately after the prose that describes it, or inside the
  `<Step>` it belongs to.
- Never write "as shown in the screenshot below" — the image speaks for
  itself. Never describe an image the manifest does not contain.

### `<Callout>`

```mdx
<Callout type="warn">
Cable calculation can take a long time on a large plant.
</Callout>
```

`type` is `info` (default), `warn`, or `error`. One or two per page at most —
a page of callouts has no emphasis left. Use `warn` for things that cost the
reader time or produce a wrong design; `error` for things that block them.

### `<Steps>` / `<Step>`

```mdx
<Steps>
<Step>
### Load the boundary file

Click **Browse…** and pick your file.
</Step>
</Steps>
```

Every `<Step>` opens with a `###` heading in imperative mood. Use for any
ordered procedure the reader performs in the application.

### `<Cards>` / `<Card>`

```mdx
<Cards>
  <Card title="Cable routing" href="/docs/layout/cables" description="How DC, AC and MV runs are routed" />
</Cards>
```

`description` is a sentence fragment, no trailing full stop.

### `<Tabs>` / `<Tab>`

```mdx
<Tabs items={["Fixed Tilt", "Single Axis Tracker"]}>
<Tab value="Fixed Tilt">…</Tab>
<Tab value="Single Axis Tracker">…</Tab>
</Tabs>
```

Use when the same task differs between the two mounting types or the two
inverter topologies. Do not use it to hide content the reader needs regardless.

### `<Accordions>` / `<Accordion>`

```mdx
<Accordions>
<Accordion title="License expired on …">
What it means and what to do.
</Accordion>
</Accordions>
```

Use for a long list of independent error messages or edge cases the reader
scans rather than reads. Troubleshooting pages, mainly.

### `<Release>`

Release-notes page only:

```mdx
<Release version="1.2.0" date="2026-08-12" tag="current">
### What's new
- …
</Release>
```

## 6. Linking

- Internal links are absolute and start `/docs/`: `[Cable routing](/docs/layout/cables)`.
- Link the first mention of another page's topic, then stop — one link per
  target per page.
- **Every link must resolve to a page in the navigation tree.** The full list
  is in the `meta.json` files under `content/docs/`. A link to a page that
  does not exist is a build-clean but broken page, and the Playwright link
  crawl will fail on it.
- Deep links to a heading are fine: `/docs/inputs/kmz-requirements#common-mistakes`.
  Match the heading's slug exactly.
- No external links except where the reader genuinely must leave: the
  Microsoft Store, Google Earth. Never link to a code repository.

## 7. Tables

- Header row in sentence case.
- Put the unit in the column header (`Default`, `Range`, `Unit`), not repeated
  in every cell.
- Order rows the way the application orders the fields, top to bottom. The
  reader is looking at the panel while reading.
- For a parameter table, the columns are: **Field**, **Default**, **Range**,
  and **What it does** — in that order.

## 8. Things that recur across pages

Say these the same way everywhere:

- **The supplier is "SolarLayout".** Never "the vendor" — it reads as a
  placeholder to a customer who is looking for someone to write to. Reserve
  "vendor" for equipment suppliers, where it is the correct industry word: *the
  structure vendor*, *the tracker vendor*.
- **The contact address is `sales@solarlayout.app`**, written as a mail link.
  Give it once per page, on the pages where the reader must act — activation,
  licence troubleshooting, support. Elsewhere just say SolarLayout.

- The plant boundary is **shrunk inward by the perimeter road width** to give
  the **usable area**; obstructions and terrain exclusions are then subtracted.
- A table or tracker unit is placed only where it fits **entirely** inside the
  usable area.
- Rows run **east to west**; panels face the **equator** — south in the
  northern hemisphere, north in the southern.
- All internal geometry is in **metres**, projected to the site's local UTM
  zone. Say this once per page at most, and only where it matters.
- **Generate Layout** needs a valid licence. Mention it only on the licence
  pages and once in the first-layout walkthrough.
- Auto-calculated tilt and pitch carry a trailing asterisk in the Summary view.
- Inputs live on five stage tabs — **Site · Array · Electrical · Yield · Tools** —
  under the pinned **Generate Layout** button; results are the views
  **Layout · Summary · Energy · BOM · SLD**. Name the tab or view a control is
  on the first time a page sends the reader to it.

## 9. Before you finish a page

- Every number traceable to `PRODUCT_FACTS.md`.
- Every `<Screenshot id>` present in `content/screenshots.ts`.
- Every internal link resolves to a real page in a `meta.json`.
- No file names, class names, or code identifiers.
- No tier language, no non-Windows platform, no repository references.
- Frontmatter `title` and `description` both present.
- A closing cross-link block.
