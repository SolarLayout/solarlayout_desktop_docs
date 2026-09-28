# Updating the docs with the `update-docs` skill

When the product changes, the docs in this repo have to follow: new windows,
changed defaults, renamed labels, fixed bugs. The **`update-docs`** skill runs
that whole update for you in [Claude Code](https://claude.com/claude-code). It
works out what changed in the product, checks it against the code, updates the
fact sheet and the pages, sorts out the screenshots, reviews its own work,
runs every gate and opens a pull request.

It lives in this repository at
[`.claude/skills/update-docs/`](.claude/skills/update-docs/SKILL.md), so anyone
who opens the repo in Claude Code has it. There is nothing to install.

---

## Quick start

From the repo root, in Claude Code:

```
/update-docs solarlayout
```

or

```
/update-docs bess
```

You can also just ask in plain words — *"the product shipped the Earthing
fixes, bring the docs up to date"* — and Claude picks up the skill. Name the
product if the request could mean either.

Claude will tell you what changed in the product since the docs were last
checked, ask for the decisions only you can make, and finish with a pull
request. Nothing is deployed; deployment stays manual.

---

## Before you start

### Everyone

| You need | Why |
|---|---|
| **Claude Code**, opened at the root of this repo | the skill is a project skill; it loads from `.claude/skills/` |
| **The product repo `PVlayout_Advance` checked out beside this one** (`../PVlayout_Advance`), on `main` and pulled | the skill reads the product's code — it is the source of every fact. Tell Claude if your checkout lives elsewhere |
| **Bun** 1.3+ and **Node.js** 22+ | the site's gates and the skill's scripts |
| **Git** with push access to this repo | the skill works on a branch and opens a PR |
| **GitHub CLI (`gh`)**, signed in (`gh auth status`) | to open the PR and, if you ask, to file product issues |
| Playwright's browser, once: `bunx playwright install chromium` | for `bun run test:e2e` |

The run is long. A release's worth of product changes takes a few hours:
Claude fans the work out to several agents in parallel and checks back with
you along the way. Plan to stay reachable for its questions.

### SolarLayout Desktop only — screenshots are recaptured

The SolarLayout screenshots are produced by the product itself. The skill
extends and runs the product's capture script (`tools/docs_site_shots.py`),
which renders every window, card and dialog to PNG. For that you need:

| You need | Why |
|---|---|
| **A Windows PC with a real display** | Captures must be taken on Windows with a real screen. Offscreen rendering on Windows produces images with no text, and a Mac renders the wrong fonts. A window flashes on screen for 10–15 minutes during the run |
| **`uv`**, and the product repo's environment working (`uv run python -c "import solarlayout_desktop"` succeeds in `PVlayout_Advance`) | the capture runs the real application |
| **An internet connection** | the capture fetches weather, satellite imagery and elevation data |
| **The test equipment files `Test.PAN` and `Test-S.ond`** | the module and inverter the screenshot set is built on. They are not in either repo; Claude will ask where they are |
| Push access to `PVlayout_Advance` | changes to the capture script go to the product repo as their own small PR |

### BESS Desktop only — a person captures screenshots

The BESS application has no capture script, so its screenshots are taken by
hand. The skill writes a precise capture brief for every image that has to
change, regenerates the worklist `docs/bess-screenshot-index.xlsx`, and tells
you which rows need capturing. Someone then takes those screenshots and drops
the files into `public/screenshots/bess/`. Nothing else is needed for BESS
beyond the "Everyone" list.

---

## What happens during a run

1. **Find what changed.** Claude lists every change merged into the product's
   `main` since the fact sheet was last checked, and which release contains
   each. If nothing changed, it says so and stops. If you mention a fix that
   is not on `main` yet, it tells you so rather than documenting something
   that has not shipped.
2. **Check it against the code.** Several read-only audits, one per feature
   area, read the current code and record every label, default, message and
   behaviour with its file and line. PR descriptions and commit messages are
   only leads.
3. **Update the fact sheet first.** The pages may only state what
   `docs/PRODUCT_FACTS.md` (or `docs/PRODUCT_FACTS.bess.md`) says, so it is
   brought up to date and committed before any page changes. It also records
   product bugs the audits found, which the pages must not describe as
   behaviour.
4. **Screenshots.**
   - **SolarLayout:** the capture script is updated and run, and the frames
     are checked by eye and installed.
   - **BESS:** the capture briefs are written for someone to follow.
5. **Write and revise pages.** New pages for new features and corrections to
   existing ones, split between several writers who never touch the same
   file.
6. **Review.** Independent reviewers check every changed page against the
   fact sheet, and Claude verifies anything they say is wrong in the fact
   sheet itself.
7. **Gates.** It runs the page-rule check, then `lint`, `typecheck`, `build`,
   the browser tests and the screenshot index.
8. **Release notes and the pull request.** Claude asks you for the release
   label and date, commits in logical steps, and opens the PR. The PR lists
   what changed, the screenshots, the gate results and any product issues
   found. It can also file those issues in the product repo, with
   screenshots, if you want.

### Decisions Claude will ask you for

- **The release-notes entry**: its label and date, and whether the changes
  are released yet.
- **Code versus product text**: when a tooltip or message disagrees with
  what the code actually does, which one is intended.
- **Timing**: whether to document product `main` now or wait for a release.
- **BESS screenshots**: hold the PR until they are captured, or ship the text
  first.
- **Product issues**: whether to file the bugs the audit found.

### What you get

- A pull request in this repo, on a branch named
  `docs/<product>-update-<date>`.
- For SolarLayout, usually a second small pull request in `PVlayout_Advance`
  for the capture-script changes.
- Optionally, GitHub issues in `PVlayout_Advance` for product bugs, each with
  background, steps to reproduce, screenshots and a suggested fix.

---

## Smaller jobs

You don't need the full run for everything:

- **A wording fix, a typo, a clearer sentence.** Ask Claude directly; it edits
  the page under the same rules.
- **One product change touching a page or two.** Still use
  `/update-docs <product>` and say which change. The skill scales down: it
  audits and writes that change itself instead of fanning out.
- **"Is there anything to update?"** Ask for a plan only. Claude runs the
  discovery step and reports without editing anything.

The two scripts the skill uses also work on their own, from the repo root:

```bash
# What changed in the product since the fact sheet was last verified
node .claude/skills/update-docs/scripts/product-changes.mjs --product solarlayout --fetch

# Check the pages against the rules (fails on anything that breaks the build or a rule)
node .claude/skills/update-docs/scripts/check-pages.mjs --product solarlayout
```

Use `--product bess` for the BESS tree. `check-pages.mjs --files a.mdx,b.mdx`
checks only the pages you name.

---

## Troubleshooting

<details>
<summary><b>The run says there is nothing to update, but I know the product changed</b></summary>

The change is probably not on the product repo's `main` yet — it may be on a
branch or in an open PR. Merge it, or tell Claude which branch or PR holds it.
Also check that your `PVlayout_Advance` checkout is the right one and is
pulled.
</details>

<details>
<summary><b><code>bun run test:e2e</code> fails with "Set BESS_REPO…"</b></summary>

The BESS fact-sheet citation test needs the product repo's path:
`BESS_REPO=../PVlayout_Advance bun run test:e2e`. The skill sets it for you;
set it yourself when you run the tests by hand.
</details>

<details>
<summary><b>SolarLayout screenshots come out with no text</b></summary>

They were captured offscreen, or not on Windows. Run the capture on a Windows
PC with a real display. The skill never uses `--offscreen` there.
</details>

<details>
<summary><b>The build fails with "Could not parse expression with acorn"</b></summary>

A page has a placeholder written as `{name}` in its prose; MDX treats braces
as code. Write `&lt;name&gt;` instead. `check-pages.mjs` finds these before
the build does.
</details>

---

## Where the rules live

| File | What it holds |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | how Claude works in this repo |
| [`docs/WRITING_GUIDE.md`](docs/WRITING_GUIDE.md) | voice, structure, components, linking |
| [`docs/PRODUCT_FACTS.md`](docs/PRODUCT_FACTS.md), [`docs/PRODUCT_FACTS.bess.md`](docs/PRODUCT_FACTS.bess.md) | the only permitted factual sources |
| [`.claude/skills/update-docs/SKILL.md`](.claude/skills/update-docs/SKILL.md) | the update workflow itself, and the traps it has learned |
| `.claude/skills/update-docs/references/` | per-product details and the briefs Claude hands to its helper agents |
